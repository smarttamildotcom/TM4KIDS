"use client";

import {
  Award,
  CreditCard,
  Gift,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminSectionHeading } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { computeDashboardStats } from "@/services/admin/analytics";
import { formatDate, formatMoney } from "@/services/admin/format";

/** Admin dashboard home: live statistic cards plus recent activity. */
export function DashboardHome() {
  const admin = useAdminData();
  if (!admin) return <AdminLoading />;

  const { data } = admin;
  const stats = computeDashboardStats(data);
  const recentRequests = data.requests.slice(0, 5);

  const cards = [
    {
      icon: Users,
      label: "Total Members",
      value: String(stats.totalMembers),
      accent: "bg-detective-blue-100 text-detective-blue-700",
      hint: "All registered detectives",
    },
    {
      icon: UserPlus,
      label: "Pending Memberships",
      value: String(stats.pendingMemberships),
      accent: "bg-detective-orange-100 text-detective-orange-600",
      hint: "Awaiting verification",
    },
    {
      icon: UserCheck,
      label: "Active Members",
      value: String(stats.activeMembers),
      accent: "bg-green-100 text-green-700",
      hint: "Full access unlocked",
    },
    {
      icon: Award,
      label: "Certificates Issued",
      value: String(stats.certificatesIssued),
      accent: "bg-detective-yellow-100 text-detective-blue-900",
      hint: "Completed all 15 worlds",
    },
    {
      icon: CreditCard,
      label: "Total Contributions",
      value: formatMoney(stats.totalContributions),
      accent: "bg-detective-blue-100 text-detective-blue-700",
      hint: "Approved payments",
    },
    {
      icon: XCircle,
      label: "Rejected Contributions",
      value: String(stats.rejectedContributions),
      accent: "bg-red-100 text-red-700",
      hint: "Could not be verified",
    },
    {
      icon: Gift,
      label: "Total Donations Made",
      value: formatMoney(stats.totalDonationsMade),
      accent: "bg-detective-orange-100 text-detective-orange-600",
      hint: "Given to charities",
    },
  ];

  return (
    <div>
      <AdminSectionHeading
        title="Dashboard"
        description="A live snapshot of the Brand Quest community."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <AdminStatCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            hint={card.hint}
            accent={card.accent}
          />
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-detective-blue-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-lg font-bold text-detective-blue-900">
          Latest membership requests
        </h2>
        {recentRequests.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-detective-blue-50/70 px-4 py-8 text-center text-sm text-detective-blue-600">
            No pending memberships. Requests appear here after a detective submits a
            contribution.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-detective-blue-500">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Submitted</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-detective-blue-50">
                {recentRequests.map((request) => (
                  <tr key={request.id} className="text-detective-blue-900">
                    <td className="py-3 font-semibold">{request.name}</td>
                    <td className="py-3">{request.country}</td>
                    <td className="py-3">{formatDate(request.dateSubmitted)}</td>
                    <td className="py-3">
                      <StatusBadge status={request.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
