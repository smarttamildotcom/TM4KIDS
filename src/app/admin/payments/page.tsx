import { AdminShell } from "@/components/admin/AdminShell";
import { PaymentsView } from "@/components/admin/views/PaymentsView";

export default function AdminPaymentsPage() {
  return (
    <AdminShell>
      <PaymentsView />
    </AdminShell>
  );
}
