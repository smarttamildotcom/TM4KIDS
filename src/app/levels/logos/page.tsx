import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryPlayer } from "@/components/lesson/StoryPlayer";
import { QuizQuestionCard } from "@/components/quiz";
import { ExampleCards } from "@/components/lesson/ExampleCards";
import { LogoMatchGame } from "@/components/game";
import { LogoQuiz } from "@/components/lesson/LogoQuiz";
import {
  logoExamples,
  logoMatchPairs,
  missionQuestion,
  storyScenes,
} from "@/lib/lesson-three";

export const metadata: Metadata = {
  title: "Lesson 3: Logos | Brand Quest",
  description:
    "Visit the mixed-up Brand Museum, learn what a logo is, play Logo Match, and become a Logo Expert.",
};

export default function LogosPage() {
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
              Level 3 · Detective Mission: Find the Hidden Logos
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold text-detective-blue-900 sm:text-5xl">
              Level 3 – Logos
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-detective-blue-700/85">
              The Brand Museum&apos;s logos got all mixed up! Learn what a logo
              is, then help put every symbol back where it belongs.
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
              title="The case of the mixed-up museum"
              subtitle="Tap Next to follow the story, one picture at a time."
            />
            <div className="mt-10">
              <StoryPlayer scenes={storyScenes} finalCtaHref="#think-about-it" />
            </div>
          </Container>
        </section>

        {/* Mid-lesson interactive question */}
        <section id="think-about-it" className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Think like a detective"
              title="Can you recognise it?"
              subtitle="Read the statement carefully, then decide if it's true or false."
            />
            <div className="mx-auto mt-10 max-w-3xl">
              <QuizQuestionCard question={missionQuestion} allowRetry />
            </div>
          </Container>
        </section>

        {/* Examples */}
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Examples"
              title="Logos you probably know already"
              subtitle="Even without any words, these symbols are instantly recognisable."
            />
            <div className="mt-10">
              <ExampleCards examples={logoExamples} variant="frame" />
            </div>
          </Container>
        </section>

        {/* Detective mission: Logo Match game */}
        <section id="mission" className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Detective mission"
              title="Logo Match: put the museum back together"
              subtitle="Drag each logo onto the company it belongs to."
            />
            <div className="mt-10">
              <LogoMatchGame pairs={logoMatchPairs} />
            </div>
          </Container>
        </section>

        {/* Final quiz + badge */}
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Final challenge"
              title="Five questions to earn your badge"
              subtitle="Answer all five and the Logo Expert badge is yours."
            />
            <div className="mx-auto mt-10 max-w-3xl">
              <LogoQuiz />
            </div>
          </Container>
        </section>
        </ProtectedRoute>
      </main>

      <SiteFooter />
    </>
  );
}
