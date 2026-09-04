import { AdminShell } from "@/components/admin/AdminShell";
import { DashboardHome } from "@/components/admin/views/DashboardHome";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <DashboardHome />
    </AdminShell>
  );
}
