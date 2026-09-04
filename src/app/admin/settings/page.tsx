import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsView } from "@/components/admin/views/SettingsView";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <SettingsView />
    </AdminShell>
  );
}
