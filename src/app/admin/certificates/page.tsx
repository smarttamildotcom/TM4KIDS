import { AdminShell } from "@/components/admin/AdminShell";
import { CertificatesView } from "@/components/admin/views/CertificatesView";

export default function AdminCertificatesPage() {
  return (
    <AdminShell>
      <CertificatesView />
    </AdminShell>
  );
}
