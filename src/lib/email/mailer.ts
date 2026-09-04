import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Reusable transactional email service.
 *
 * All configuration comes from environment variables — no credentials are ever
 * hard-coded. When SMTP is not configured (e.g. local development) sending is
 * skipped gracefully so callers never fail because of email.
 */

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export type SendEmailResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "error" };

let cachedTransporter: Transporter | null = null;

/** Reads SMTP settings from the environment and memoises a transporter. */
function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port: Number(port),
      // Port 465 uses implicit TLS; STARTTLS is negotiated on other ports.
      secure: process.env.SMTP_SECURE === "true" || Number(port) === 465,
      auth: { user, pass },
    });
  }

  return cachedTransporter;
}

/**
 * Sends an email. Never throws — failures are reported through the result so
 * the caller can log and continue without breaking the user's flow.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "[email] SMTP is not configured; skipping email send. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS.",
    );
    return { ok: false, reason: "not-configured" };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || input.to,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[email] Failed to send email:", error);
    return { ok: false, reason: "error" };
  }
}
