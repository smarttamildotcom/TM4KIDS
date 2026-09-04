import { AdminShell } from "@/components/admin/AdminShell";
import { RequestsView } from "@/components/admin/views/RequestsView";

export default function AdminRequestsPage() {
  return (
    <AdminShell>
      <RequestsView />
    </AdminShell>
  );
}
