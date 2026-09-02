import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "My Brand Quest Dashboard",
  description:
    "Track your Brand Quest rank, XP, completed lessons and badges.",
};

export default function DashboardPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-detective-blue-600 focus:px-5 focus:py-3 focus:font-display focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main" className="bg-detective-blue-50/50 py-8 sm:py-12">
        <ProtectedRoute>
          <DashboardView />
        </ProtectedRoute>
      </main>

      <SiteFooter />
    </>
  );
}
