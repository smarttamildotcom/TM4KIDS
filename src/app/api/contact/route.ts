import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/mailer";

type ContactBody = { name?: string; email?: string; role?: string; message?: string };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: ContactBody;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  if (!name || !EMAIL.test(email) || !role || message.length < 10 || name.length > 100 || email.length > 200 || role.length > 50 || message.length > 5000) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL?.trim() || process.env.SMTP_USER?.trim();
  if (!recipient) return NextResponse.json({ error: "Message delivery is temporarily unavailable." }, { status: 503 });
  const result = await sendEmail({ to: recipient, subject: `IP2Kids enquiry from ${name}`, text: [`New IP2Kids website enquiry`, ``, `Name: ${name}`, `Email: ${email}`, `Role: ${role}`, ``, `Message:`, message].join("\n"), html: `<h2>New IP2Kids website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Role:</strong> ${escapeHtml(role)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g,"<br>")}</p>` });
  if (!result.ok) return NextResponse.json({ error: "We could not send your message right now. Please try again later." }, { status: 503 });
  return NextResponse.json({ ok: true });
}
function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c] ?? c)); }
