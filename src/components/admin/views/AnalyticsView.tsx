"use client";

import {
  Activity,
  Globe2,
  Percent,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminSectionHeading, AdminCard } from "@/components/admin/AdminCard";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { computeAnalytics } from "@/services/admin/analytics";

const PIE_COLORS = ["#0b68cc", "#f97316", "#ffc820", "#40a3ff", "#0a52a1", "#e05a05"];

export function AnalyticsView() {
  const admin = useAdminData();
  if (!admin) return <AdminLoading />;

  const analytics = computeAnalytics(admin.data);

  if (analytics.totalUsers === 0) {
    return (
      <div>
        <AdminSectionHeading
          title="Analytics"
          description="Engagement and membership insights."
        />
        <p className="rounded-3xl border border-detective-blue-100 bg-white p-10 text-center text-detective-blue-500 shadow-sm">
          No data available yet. Analytics will appear once detectives register.
        </p>
      </div>
    );
  }

  return (
    <div>
      <AdminSectionHeading
        title="Analytics"
        description="Engagement and membership insights."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          icon={Users}
          label="Total Users"
          value={String(analytics.totalUsers)}
          accent="bg-detective-blue-100 text-detective-blue-700"
        />
        <AdminStatCard
          icon={Activity}
          label="Daily Users"
          value={String(analytics.dailyUsers)}
          accent="bg-green-100 text-green-700"
        />
        <AdminStatCard
          icon={Trophy}
          label="Most Popular World"
          value={analytics.mostPopularWorld}
          accent="bg-detective-yellow-100 text-detective-blue-900"
        />
        <AdminStatCard
          icon={Percent}
          label="Completion Rate"
          value={`${analytics.completionRate}%`}
          accent="bg-detective-orange-100 text-detective-orange-600"
        />
        <AdminStatCard
          icon={TrendingUp}
          label="Average Progress"
          value={`${analytics.averageProgress}%`}
          accent="bg-detective-blue-100 text-detective-blue-700"
        />
        <AdminStatCard
          icon={Globe2}
          label="Membership Conversion"
          value={`${analytics.membershipConversion}%`}
          accent="bg-green-100 text-green-700"
        />
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            World popularity
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.worldPopularity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={70}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="learners" fill="#0b68cc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            Daily active users
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.dailyUsersSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            Country breakdown
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.countryBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {analytics.countryBreakdown.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            Membership mix
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.membershipMix}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  label
                >
                  {analytics.membershipMix.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
