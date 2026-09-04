"use client";

import { useMemo, useState } from "react";
import { AdminSectionHeading } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { SearchInput } from "@/components/admin/SearchInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ExportButtons } from "@/components/admin/ExportButtons";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { formatDate, formatMoney } from "@/services/admin/format";
import type { ExportColumn } from "@/services/admin/export";
import type { Payment, PaymentStatus } from "@/services/admin/types";

const exportColumns: ExportColumn<Payment>[] = [
  { header: "Transaction ID", value: (row) => row.id },
  { header: "Name", value: (row) => row.name },
  { header: "Payment Method", value: (row) => row.method },
  { header: "Amount", value: (row) => row.amount },
  { header: "Status", value: (row) => row.status },
  { header: "Date", value: (row) => formatDate(row.date) },
  { header: "Reference", value: (row) => row.reference },
];

type Filter = "All" | "Approved" | "Pending" | "Rejected";

const FILTERS: Filter[] = ["All", "Approved", "Pending", "Rejected"];

function matchesFilter(status: PaymentStatus, filter: Filter): boolean {
  if (filter === "All") return true;
  if (filter === "Approved") return status === "Paid";
  return status === filter;
}

export function PaymentsView() {
  const admin = useAdminData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (!admin) return [];
    const term = query.trim().toLowerCase();
    return admin.data.payments
      .filter((payment) => matchesFilter(payment.status, filter))
      .filter((payment) =>
        term
          ? [payment.id, payment.name, payment.method, payment.reference, payment.status]
              .join(" ")
              .toLowerCase()
              .includes(term)
          : true,
      );
  }, [admin, query, filter]);

  if (!admin) return <AdminLoading />;

  return (
    <div>
      <AdminSectionHeading
        title="Payments"
        description="All membership contributions and their status."
        action={
          <ExportButtons
            filename="brand-quest-payments"
            title="Brand Quest Payments"
            columns={exportColumns}
            rows={filtered}
          />
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === option
                  ? "bg-detective-blue-600 text-white"
                  : "border border-detective-blue-200 text-detective-blue-700 hover:bg-detective-blue-50"
              }`}
            >
              {option === "Approved" ? "Approved Payments" : option}
            </button>
          ))}
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search payments…"
        />
      </div>

      <div className="overflow-x-auto rounded-3xl border border-detective-blue-100 bg-white shadow-sm">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-detective-blue-50/70 text-xs uppercase tracking-wide text-detective-blue-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Transaction ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Method</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-detective-blue-50">
            {filtered.map((payment) => (
              <tr key={payment.id} className="text-detective-blue-900">
                <td className="px-4 py-3 font-mono text-xs text-detective-blue-500">
                  {payment.id}
                </td>
                <td className="px-4 py-3 font-semibold">{payment.name}</td>
                <td className="px-4 py-3">{payment.method}</td>
                <td className="px-4 py-3">{formatMoney(payment.amount)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-4 py-3">{formatDate(payment.date)}</td>
                <td className="px-4 py-3">{payment.reference}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-detective-blue-500"
                >
                  No contributions recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
