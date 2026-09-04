import { AdminShell } from "@/components/admin/AdminShell";
import { MembersView } from "@/components/admin/views/MembersView";

export default function AdminMembersPage() {
  return (
    <AdminShell>
      <MembersView />
    </AdminShell>
  );
}
