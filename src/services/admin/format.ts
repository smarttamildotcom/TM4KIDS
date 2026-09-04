/** Shared formatting helpers for the admin dashboard. */

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatMoney(amount: number, currency = "SGD"): string {
  return `${currency} ${amount.toLocaleString("en-SG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
