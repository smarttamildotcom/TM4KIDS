"use client";

import { useState } from "react";
import { Check, HelpCircle, X, CheckCircle2 } from "lucide-react";
import { AdminSectionHeading } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { formatDate, formatMoney } from "@/services/admin/format";

export function RequestsView() {
  const admin = useAdminData();
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!admin) return <AdminLoading />;

  const pending = admin.data.requests.filter(
    (request) => request.status === "Pending" || request.status === "More Info",
  );
  const resolved = admin.data.requests.filter(
    (request) => request.status === "Approved" || request.status === "Rejected",
  );

  function flash(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 3500);
  }

  return (
    <div>
      <AdminSectionHeading
        title="Membership Requests"
        description="Review contributions and unlock full access."
      />

      {feedback && (
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 className="h-5 w-5" /> {feedback}
        </div>
      )}

      {pending.length === 0 ? (
        <p className="rounded-3xl border border-detective-blue-100 bg-white p-8 text-center text-detective-blue-500 shadow-sm">
          No pending memberships.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {pending.map((request) => (
            <article
              key={request.id}
              className="rounded-3xl border border-detective-blue-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-detective-blue-900">
                    {request.name}
                  </h3>
                  <p className="text-sm text-detective-blue-700/80">
                    {request.email}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <Info label="Country" value={request.country} />
                <Info label="Payment Method" value={request.paymentMethod} />
                <Info label="Reference" value={request.transactionReference} />
                <Info
                  label="Amount"
                  value={formatMoney(request.contributionAmount)}
                />
                <Info label="Submitted" value={formatDate(request.dateSubmitted)} />
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    admin.approveRequest(request.id);
                    flash("Membership Approved Successfully");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <Check className="h-4 w-4" /> Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    admin.rejectRequest(request.id);
                    flash("Membership request rejected.");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <X className="h-4 w-4" /> Reject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    admin.requestMoreInfo(request.id);
                    flash("Requested more information.");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-detective-blue-200 px-4 py-2 text-sm font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
                >
                  <HelpCircle className="h-4 w-4" /> Request More Info
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {resolved.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-lg font-bold text-detective-blue-900">
            Resolved
          </h2>
          <div className="overflow-x-auto rounded-3xl border border-detective-blue-100 bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-detective-blue-50/70 text-xs uppercase tracking-wide text-detective-blue-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-detective-blue-50">
                {resolved.map((request) => (
                  <tr key={request.id} className="text-detective-blue-900">
                    <td className="px-4 py-3 font-semibold">{request.name}</td>
                    <td className="px-4 py-3">{request.email}</td>
                    <td className="px-4 py-3">{formatDate(request.dateSubmitted)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={request.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-detective-blue-400">
        {label}
      </dt>
      <dd className="font-semibold text-detective-blue-900">{value}</dd>
    </div>
  );
}
