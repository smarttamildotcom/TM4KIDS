import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProfileView } from "@/components/profile/ProfileView";

export const metadata: Metadata = {
  title: "My Profile | Brand Quest",
  description: "View your detective account details and customise your avatar.",
};

export default function ProfilePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-detective-blue-600 focus:px-5 focus:py-3 focus:font-display focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main" className="bg-detective-blue-50/50 py-10 sm:py-16">
        <ProtectedRoute>
          <Container>
            <SectionHeading
              eyebrow="Detective file"
              title="My Profile"
              subtitle="Your account details and detective identity."
            />
            <div className="mx-auto mt-10 max-w-2xl">
              <ProfileView />
            </div>
          </Container>
        </ProtectedRoute>
      </main>

      <SiteFooter />
    </>
  );
}
