import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/mailer";

export const runtime = "nodejs";

type CertificateRecord = {
  certificate_number: string | null;
  issued_at: string | null;
};

function bearerToken(request: NextRequest): string {
  const header = request.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

async function getMember(request: NextRequest) {
  const token = bearerToken(request);
  if (!token) return { user: null, error: "Not signed in." };

  const supabase = getServiceClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user?.email) return { user: null, error: "Not signed in." };
  return { user, error: null };
}

/** Reads the signed-in member's stored Master Detective certificate. */
export async function GET(request: NextRequest) {
  const member = await getMember(request);
  if (!member.user) {
    return NextResponse.json({ ok: false, error: member.error }, { status: 401 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("certificate_number, issued_at")
    .eq("user_id", member.user.id)
    .order("issued_at", { ascending: false })
    .limit(1)
    .maybeSingle<CertificateRecord>();

  if (error) {
    console.error("[certificates/master] Certificate lookup failed", {
      code: error.code,
      message: error.message,
    });
    return NextResponse.json({ ok: false, error: "Could not load certificate." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, certificate: data });
}

/**
 * Records the final certificate once, then emails a durable download link to
 * the member. The browser creates the initial PDF download separately.
 */
export async function POST(request: NextRequest) {
  const member = await getMember(request);
  if (!member.user) {
    return NextResponse.json({ ok: false, error: member.error }, { status: 401 });
  }

  let certificateNumber = "";
  try {
    const body = (await request.json()) as { certificateNumber?: string };
    certificateNumber = body.certificateNumber?.trim() ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!certificateNumber || certificateNumber.length > 100) {
    return NextResponse.json({ ok: false, error: "Invalid certificate." }, { status: 400 });
  }

  const supabase = getServiceClient();
  const { data: existing, error: lookupError } = await supabase
    .from("certificates")
    .select("certificate_number, issued_at")
    .eq("user_id", member.user.id)
    .order("issued_at", { ascending: false })
    .limit(1)
    .maybeSingle<CertificateRecord>();

  if (lookupError) {
    console.error("[certificates/master] Certificate lookup failed", {
      code: lookupError.code,
      message: lookupError.message,
    });
    return NextResponse.json({ ok: false, error: "Could not save certificate." }, { status: 500 });
  }

  // A previous delivery may have saved the certificate but failed while sending
  // mail. Reuse that award and retry the member email instead of stopping early.
  let certificate: CertificateRecord;
  if (existing) {
    certificate = existing;
  } else {
    const { data: issuedCertificate, error: insertError } = await supabase
      .from("certificates")
      .insert({ user_id: member.user.id, certificate_number: certificateNumber })
      .select("certificate_number, issued_at")
      .single<CertificateRecord>();

    if (insertError || !issuedCertificate) {
      console.error("[certificates/master] Certificate issue failed", {
        code: insertError?.code,
        message: insertError?.message,
      });
      return NextResponse.json({ ok: false, error: "Could not save certificate." }, { status: 500 });
    }

    certificate = issuedCertificate;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || request.nextUrl.origin;
  const downloadUrl = new URL("/certificates/trademark-master", siteUrl).toString();
  const mail = await sendEmail({
    to: member.user.email,
    subject: "Your Brand Quest Master Detective Certificate",
    text: [
      "Congratulations! You completed World 15 of the Brand Quest journey.",
      "",
      "Your Master Detective certificate is ready. Sign in anytime to download it:",
      downloadUrl,
      "",
      `Certificate ID: ${certificate.certificate_number ?? certificateNumber}`,
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;color:#0b2f5c;line-height:1.6">
      <h2 style="color:#e05a05">Your certificate is ready!</h2>
      <p>Congratulations on completing World 15 of the Brand Quest journey.</p>
      <p><a href="${downloadUrl}" style="display:inline-block;background:#0a52a1;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:bold">Download my certificate</a></p>
      <p>Certificate ID: ${certificate.certificate_number ?? certificateNumber}</p>
    </div>`,
  });

  if (!mail.ok) {
    console.error("[certificates/master] Certificate email was not delivered.", mail);
  }

  return NextResponse.json({ ok: true, certificate, emailed: mail.ok });
}
