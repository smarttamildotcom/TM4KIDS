import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AchievementsView } from "@/components/achievements/AchievementsView";

export const metadata: Metadata = {
  title: "My Achievements | Brand Quest",
  description:
    "See every badge and certificate you've earned at Brand Quest.",
};

export default function AchievementsPage() {
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
              eyebrow="Trophy case"
              title="My Achievements"
              subtitle="Every badge and certificate you've earned on your detective journey."
            />
            <div className="mt-10">
              <AchievementsView />
            </div>
          </Container>
        </ProtectedRoute>
      </main>

      <SiteFooter />
    </>
  );
}
