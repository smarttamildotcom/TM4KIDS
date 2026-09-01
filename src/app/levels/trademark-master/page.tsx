import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryPlayer } from "@/components/lesson/StoryPlayer";
import { FinalChallenge } from "@/components/lesson/FinalChallenge";
import { storyScenes } from "@/lib/lesson-five";

export const metadata: Metadata = {
  title: "Level 5: Become a BrandQuest Champion | BrandQuest Kids",
  description:
    "Solve five cases across every skill you've learned, then earn the BrandQuest Champion badge and Certificate of Achievement.",
};

export default function TrademarkMasterPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-detective-blue-600 focus:px-5 focus:py-3 focus:font-display focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main">
        <ProtectedRoute>
        {/* Lesson intro */}
        <section className="bg-gradient-to-b from-detective-blue-50 to-white py-12 sm:py-16">
          <Container>
            <Link
              href="/#journey"
              className="inline-flex items-center gap-2 font-display font-semibold text-detective-blue-700 transition-colors hover:text-detective-orange-500"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to the learning journey
            </Link>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Level 5 · The Final Detective Challenge
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold text-detective-blue-900 sm:text-5xl">
              Become a BrandQuest Champion
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-detective-blue-700/85">
              Someone has copied famous brands all over Detective City. Solve
              five final cases to prove you&apos;re a Little Brand Detective.
            </p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display font-semibold text-detective-blue-700 shadow-sm">
              <Clock className="h-4 w-4" aria-hidden="true" />
              About 5 minutes
            </p>
          </Container>
        </section>

        {/* Story */}
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="The story"
              title="Trouble in Detective City"
              subtitle="Tap Next to follow the story, one picture at a time."
            />
            <div className="mt-10">
              <StoryPlayer scenes={storyScenes} finalCtaHref="#cases" />
            </div>
          </Container>
        </section>

        {/* The five-case final challenge */}
        <section id="cases" className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Final challenge"
              title="Five cases stand between you and the Gold Badge"
              subtitle="Solve every case to earn XP, then unlock your certificate."
            />
            <div className="mx-auto mt-10 max-w-3xl">
              <FinalChallenge />
            </div>
          </Container>
        </section>
        </ProtectedRoute>
      </main>

      <SiteFooter />
    </>
  );
}
