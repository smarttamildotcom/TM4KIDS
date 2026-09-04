import type { Metadata } from "next";
import { AdminDataProvider } from "@/hooks/admin/useAdminData";
import { MembershipRequestsProvider } from "@/hooks/admin/useMembershipRequests";

// Keep the entire admin area out of search engines.
export const metadata: Metadata = {
  title: "Brand Quest Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminDataProvider>
      <MembershipRequestsProvider>{children}</MembershipRequestsProvider>
    </AdminDataProvider>
  );
}
