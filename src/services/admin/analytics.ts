import { worlds } from "@/lib/worlds";
import { TOTAL_WORLDS } from "@/lib/access";
import type { AdminData } from "./types";

/** Derived metrics for the dashboard home cards. */
export type DashboardStats = {
  totalMembers: number;
  pendingMemberships: number;
  activeMembers: number;
  certificatesIssued: number;
  totalContributions: number;
  rejectedContributions: number;
  totalDonationsMade: number;
};

export function computeDashboardStats(data: AdminData): DashboardStats {
  const paidPayments = data.payments.filter((payment) => payment.status === "Paid");

  return {
    totalMembers: data.members.length,
    pendingMemberships: data.members.filter((member) => member.status === "Pending")
      .length,
    activeMembers: data.members.filter((member) => member.status === "Active").length,
    certificatesIssued: data.certificates.length,
    totalContributions: paidPayments.reduce((sum, payment) => sum + payment.amount, 0),
    rejectedContributions: data.payments.filter(
      (payment) => payment.status === "Rejected",
    ).length,
    totalDonationsMade: data.donations.reduce(
      (sum, donation) => sum + donation.amount,
      0,
    ),
  };
}

/** Derived metrics and chart series for the analytics page. */
export type AnalyticsData = {
  totalUsers: number;
  dailyUsers: number;
  mostPopularWorld: string;
  completionRate: number;
  averageProgress: number;
  membershipConversion: number;
  countryBreakdown: { name: string; value: number }[];
  worldPopularity: { name: string; learners: number }[];
  dailyUsersSeries: { day: string; users: number }[];
  membershipMix: { name: string; value: number }[];
};

export function computeAnalytics(data: AdminData): AnalyticsData {
  const members = data.members;
  const totalUsers = members.length;

  const completed = members.filter(
    (member) => member.worldsCompleted >= member.totalWorlds,
  ).length;
  const completionRate = totalUsers
    ? Math.round((completed / totalUsers) * 100)
    : 0;

  const totalProgress = members.reduce(
    (sum, member) => sum + member.worldsCompleted / member.totalWorlds,
    0,
  );
  const averageProgress = totalUsers
    ? Math.round((totalProgress / totalUsers) * 100)
    : 0;

  const activeMembers = members.filter((member) => member.status === "Active").length;
  const membershipConversion = totalUsers
    ? Math.round((activeMembers / totalUsers) * 100)
    : 0;

  const countryCounts = new Map<string, number>();
  members.forEach((member) => {
    countryCounts.set(member.country, (countryCounts.get(member.country) ?? 0) + 1);
  });
  const countryBreakdown = Array.from(countryCounts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // World popularity: how many members have reached at least each world.
  const worldPopularity = worlds.slice(0, TOTAL_WORLDS).map((world) => ({
    name: world.name,
    learners: members.filter((member) => member.worldsCompleted >= world.id).length,
  }));

  const mostPopular = worldPopularity.reduce(
    (best, current) => (current.learners > best.learners ? current : best),
    worldPopularity[0] ?? { name: "—", learners: 0 },
  );

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const base = Math.max(1, Math.round(totalUsers / 2));
  const dailyUsersSeries = dayLabels.map((day, index) => ({
    day,
    users: base + ((index * 3 + totalUsers) % 7),
  }));
  const dailyUsers = dailyUsersSeries[dailyUsersSeries.length - 1]?.users ?? 0;

  const membershipMix = [
    { name: "Active", value: activeMembers },
    { name: "Pending", value: members.filter((m) => m.status === "Pending").length },
    { name: "Free", value: members.filter((m) => m.status === "Free").length },
    { name: "Rejected", value: members.filter((m) => m.status === "Rejected").length },
  ].filter((slice) => slice.value > 0);

  return {
    totalUsers,
    dailyUsers,
    mostPopularWorld: mostPopular.name,
    completionRate,
    averageProgress,
    membershipConversion,
    countryBreakdown,
    worldPopularity,
    dailyUsersSeries,
    membershipMix,
  };
}
