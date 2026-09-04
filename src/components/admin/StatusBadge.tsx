/** Coloured pill for member, request and payment statuses. */
const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Paid: "bg-green-100 text-green-700",
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-detective-orange-100 text-detective-orange-600",
  "More Info": "bg-detective-yellow-100 text-detective-blue-900",
  Free: "bg-detective-blue-100 text-detective-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-detective-blue-100 text-detective-blue-700";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}
