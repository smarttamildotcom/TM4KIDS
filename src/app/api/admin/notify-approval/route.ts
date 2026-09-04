import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/mailer";
import {
  buildAdminApprovalEmail,
  buildMemberApprovalEmail,
  type ApprovalEmailPayload,
} from "@/lib/email/membership-approval";

export const runtime = "nodejs";

/**
 * Emails a newly approved member the welcome message and notifies the
 * administrator. Email failures never block approval — the caller treats this
 * as fire-and-forget.
 */
export async function POST(request: NextRequest) {
  let payload: ApprovalEmailPayload;
  try {
    payload = (await request.json()) as ApprovalEmailPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!payload?.name || !payload?.email) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const adminEmail =
    process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;

  const memberEmail = buildMemberApprovalEmail(payload);
  await sendEmail({
    to: payload.email,
    subject: memberEmail.subject,
    text: memberEmail.text,
    html: memberEmail.html,
  });

  if (adminEmail) {
    const notice = buildAdminApprovalEmail(payload);
    await sendEmail({
      to: adminEmail,
      subject: notice.subject,
      text: notice.text,
      html: notice.html,
    });
  }

  return NextResponse.json({ ok: true });
}
