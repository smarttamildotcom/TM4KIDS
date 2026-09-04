/**
 * Builds the admin notification email sent whenever someone registers or
 * purchases membership. Kept separate from the API route so the same template
 * can be reused by future flows (e.g. a real payment webhook).
 */

export type MemberNotificationPayload = {
  name: string;
  email: string;
  country?: string;
  /** ISO date; defaults to now when omitted. */
  registrationDate?: string;
  membershipType: string;
  paymentStatus?: string;
  transactionId?: string;
  message?: string;
};

export type MemberEmailContent = {
  subject: string;
  text: string;
  html: string;
};

function formatDate(iso?: string): string {
  const date = iso ? new Date(iso) : new Date();
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function buildMemberEmail(
  payload: MemberNotificationPayload,
): MemberEmailContent {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Country", payload.country || "—"],
    ["Registration Date", formatDate(payload.registrationDate)],
    ["Membership Type", payload.membershipType],
    ["Payment Status", payload.paymentStatus || "—"],
    ["Transaction ID", payload.transactionId || "—"],
    ["Message", payload.message || "—"],
  ];

  const text = [
    "New Brand Quest Member",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0b2f5c;">
      <h2 style="color: #e05a05;">New Brand Quest Member</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight:bold;">${label}:</td><td>${value}</td></tr>`,
          )
          .join("")}
      </table>
    </div>
  `.trim();

  return {
    subject: `New Brand Quest Member: ${payload.name}`,
    text,
    html,
  };
}
