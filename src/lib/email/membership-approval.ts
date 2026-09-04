/**
 * Email templates for the membership-approval flow. Kept separate from the API
 * route so the same content can be reused by future automated flows.
 */

export type ApprovalEmailPayload = {
  name: string;
  email: string;
};

export type EmailContent = { subject: string; text: string; html: string };

/** The welcome email sent to a member the moment their membership is approved. */
export function buildMemberApprovalEmail(
  payload: ApprovalEmailPayload,
): EmailContent {
  const subject = "Welcome to Brand Quest!";
  const text = [
    `Hi ${payload.name},`,
    "",
    "Congratulations!",
    "Your Brand Quest Membership has been activated.",
    "You now have unlimited access to all 15 detective worlds.",
    "",
    "Happy Learning!",
    "",
    "— Questy",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0b2f5c; line-height: 1.6;">
      <h2 style="color: #e05a05; margin-bottom: 8px;">Welcome to Brand Quest!</h2>
      <p>Hi ${payload.name},</p>
      <p><strong>Congratulations!</strong></p>
      <p>Your Brand Quest Membership has been activated.</p>
      <p>You now have unlimited access to all 15 detective worlds.</p>
      <p>Happy Learning!</p>
      <p style="margin-top: 24px; color: #0a52a1;">— Questy</p>
    </div>
  `.trim();

  return { subject, text, html };
}

/** The notification copy sent to the administrator after an approval. */
export function buildAdminApprovalEmail(
  payload: ApprovalEmailPayload,
): EmailContent {
  const subject = `Membership Approved: ${payload.name}`;
  const text = [
    "A membership has been approved.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "The member now has access to all 15 worlds.",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0b2f5c;">
      <h2 style="color: #e05a05;">Membership Approved</h2>
      <p><strong>${payload.name}</strong> (${payload.email}) now has access to all 15 worlds.</p>
    </div>
  `.trim();

  return { subject, text, html };
}
