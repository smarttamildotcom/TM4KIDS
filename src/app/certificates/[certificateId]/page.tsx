import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CertificateView } from "@/components/gamification/CertificateView";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { certificates } from "@/lib/gamification/config";

export const metadata: Metadata = {
  title: "My Certificate | BrandQuest Kids",
};

export function generateStaticParams() {
  return certificates.map((certificate) => ({
    certificateId: certificate.id,
  }));
}

export default function CertificatePage() {
  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main id="main">
        <ProtectedRoute>
          <CertificateView />
        </ProtectedRoute>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </>
  );
}
