import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/mailer";
import {
  buildMemberEmail,
  type MemberNotificationPayload,
} from "@/lib/email/member-notification";

// Email sending needs the Node.js runtime (nodemailer is not edge-compatible).
export const runtime = "nodejs";

/**
 * Notifies the site owner when a new member registers or submits a membership
 * contribution.
 *
 * The recipient comes from NEXT_PUBLIC_MEMBERSHIP_EMAIL (falling back to
 * ADMIN_NOTIFICATION_EMAIL). Never hard-code the address anywhere else.
 */
export async function POST(request: NextRequest) {
  // Configurable admin recipient — never hard-code the address elsewhere.
  const adminEmail =
    process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;

  let payload: MemberNotificationPayload;
  try {
    payload = (await request.json()) as MemberNotificationPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!payload?.name || !payload?.email) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!adminEmail) {
    console.warn(
      "[notify-member] NEXT_PUBLIC_MEMBERSHIP_EMAIL/ADMIN_NOTIFICATION_EMAIL is not set; skipping member notification.",
    );
    // Registration must still succeed, so report success to the caller.
    return NextResponse.json({ ok: true, delivered: false });
  }

  const email = buildMemberEmail(payload);

  // sendEmail never throws; any failure is logged inside the service. We always
  // return success so registration is never blocked by an email problem.
  const result = await sendEmail({
    to: adminEmail,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  return NextResponse.json({ ok: true, delivered: result.ok });
}
