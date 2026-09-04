"use client";

import { useState } from "react";
import { Check, X, CheckCircle2 } from "lucide-react";
import { AdminSectionHeading } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useMembershipRequests } from "@/hooks/admin/useMembershipRequests";
import { formatDate } from "@/services/admin/format";

export function RequestsView() {
  const admin = useMembershipRequests();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  if (!admin || admin.loading) return <AdminLoading />;

  const pending = admin.requests;

  function flash(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 3500);
  }

  async function handle(id: string, action: "approve" | "reject") {
    if (!admin) return;
    setBusyId(id);
    const ok =
      action === "approve" ? await admin.approve(id) : await admin.reject(id);
    setBusyId(null);
    flash(
      ok
        ? action === "approve"
          ? "Membership Approved Successfully"
          : "Membership request rejected."
        : "Something went wrong. Please try again.",
    );
  }

  return (
    <div>
      <AdminSectionHeading
        title="Membership Requests"
        description="Review contributions and unlock full access."
      />

      {admin.error && (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {admin.error}
        </div>
      )}

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
                <Info label="School" value={request.school} />
                <Info label="Payment Method" value={request.paymentMethod} />
                <Info label="Payment Reference" value={request.paymentReference} />
                <Info label="Date Submitted" value={formatDate(request.dateSubmitted)} />
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busyId === request.id}
                  onClick={() => handle(request.id, "approve")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-60"
                >
                  <Check className="h-4 w-4" /> Approve
                </button>
                <button
                  type="button"
                  disabled={busyId === request.id}
                  onClick={() => handle(request.id, "reject")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                >
                  <X className="h-4 w-4" /> Reject
                </button>
              </div>
            </article>
          ))}
        </div>
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
