import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/mailer";

export const runtime = "nodejs";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const { name, email, role, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !EMAIL_PATTERN.test(email.trim()) || typeof role !== "string" || !role.trim() || typeof message !== "string" || message.trim().length < 10) return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  const recipient = process.env.CONTACT_EMAIL?.trim() || process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || process.env.NEXT_PUBLIC_MEMBERSHIP_EMAIL?.trim();
  if (!recipient) { console.error("[contact] No CONTACT_EMAIL or administrator recipient configured."); return NextResponse.json({ error: "Contact email is not configured." }, { status: 503 }); }
  const safeName = name.trim().slice(0, 120); const safeEmail = email.trim().slice(0, 200); const safeRole = role.trim().slice(0, 80); const safeMessage = message.trim().slice(0, 5000);
  const result = await sendEmail({ to: recipient, subject: `IP2Kids enquiry from ${safeName}`, text: `New IP2Kids contact enquiry\n\nName: ${safeName}\nEmail: ${safeEmail}\nRole: ${safeRole}\n\nMessage:\n${safeMessage}\n` });
  if (!result.ok) return NextResponse.json({ error: "Unable to send enquiry." }, { status: 503 });
  return NextResponse.json({ ok: true });
}
