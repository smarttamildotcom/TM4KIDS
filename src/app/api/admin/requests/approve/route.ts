import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin/guard";
import { sendEmail } from "@/lib/email/mailer";
import {
  buildAdminApprovalEmail,
  buildMemberApprovalEmail,
} from "@/lib/email/membership-approval";

export const runtime = "nodejs";

type Body = { id?: string; action?: "approve" | "reject" };

/** Sends both approval messages before the serverless request can finish. */
async function sendApprovalEmails(name: string, email: string): Promise<void> {
  const memberEmail = buildMemberApprovalEmail({ name, email });
  const memberDelivery = await sendEmail({
    to: email,
    subject: memberEmail.subject,
    text: memberEmail.text,
    html: memberEmail.html,
  });
  if (!memberDelivery.ok) {
    console.error("[membership/approve] Member approval email was not delivered.", memberDelivery);
  }

  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL;
  if (!adminEmail) {
    console.warn("[membership/approve] No administrator email is configured.");
    return;
  }

  const adminNotice = buildAdminApprovalEmail({ name, email });
  const adminDelivery = await sendEmail({
    to: adminEmail,
    subject: adminNotice.subject,
    text: adminNotice.text,
    html: adminNotice.html,
  });
  if (!adminDelivery.ok) {
    console.error("[membership/approve] Administrator approval email was not delivered.", adminDelivery);
  }
}

/**
 * Approves or rejects a membership request. Approving unlocks Worlds 3–15 for
 * the member by activating their membership (approved = true), and records who
 * approved it and when.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const id = body.id?.trim();
  const action = body.action ?? "approve";
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing request id." }, { status: 400 });
  }

  const supabase = getServiceClient();

  const patch =
    action === "reject"
      ? { approved: false, payment_status: "Rejected" }
      : {
          approved: true,
          payment_status: "Paid",
          approved_at: new Date().toISOString(),
          approved_by: "admin",
        };

  const { data, error } = await supabase
    .from("memberships")
    .update(patch)
    .eq("id", id)
    .select("user_id, users(full_name, email)")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not update the request." },
      { status: 500 },
    );
  }

  if (action === "approve" && data) {
    const joined = data as unknown as {
      users: { full_name: string; email: string } | { full_name: string; email: string }[] | null;
    };
    const member = Array.isArray(joined.users) ? joined.users[0] : joined.users;
    if (member?.email) await sendApprovalEmails(member.full_name, member.email);
  }

  return NextResponse.json({ ok: true });
}
