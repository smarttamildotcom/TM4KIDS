import type { Metadata } from "next";
import { AdminDataProvider } from "@/hooks/admin/useAdminData";

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
  return <AdminDataProvider>{children}</AdminDataProvider>;
}
