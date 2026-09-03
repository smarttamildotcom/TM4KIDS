import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WorldRouteGuard } from "@/components/auth/WorldRouteGuard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryPlayer } from "@/components/lesson/StoryPlayer";
import { QuizQuestionCard } from "@/components/quiz";
import { ExampleCards } from "@/components/lesson/ExampleCards";
import { NamingActivity } from "@/components/lesson/NamingActivity";
import { BrandNameQuiz } from "@/components/lesson/BrandNameQuiz";
import {
  brandNameExamples,
  missionQuestion,
  namingChallenges,
  storyScenes,
} from "@/lib/lesson-two";

export const metadata: Metadata = {
  title: "Lesson 2: Brand Names | Brand Quest",
  description:
    "Follow Tom's fruit juice stand, invent a memorable name, and earn the Brand Name Explorer badge.",
};

export default function BrandNamesPage() {
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
        <WorldRouteGuard worldId={2}>
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
              Level 2 · Detective Mission: The Missing Brand Name
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold text-detective-blue-900 sm:text-5xl">
              Level 2 – Brand Names
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-detective-blue-700/85">
              Tom&apos;s juice is delicious, but nobody can remember whose it is!
              Follow the story and help him choose the perfect brand name.
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
              title="The case of the missing brand name"
              subtitle="Tap Next to follow the story, one picture at a time."
            />
            <div className="mt-10">
              <StoryPlayer scenes={storyScenes} finalCtaHref="#mission" />
            </div>
          </Container>
        </section>

        {/* Detective mission: help Tom choose */}
        <section id="mission" className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Detective mission"
              title="Help Tom choose the best brand name"
              subtitle="Read each option carefully, then pick the one you think works best."
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
              title="Famous brand names you already know"
              subtitle="A great brand name is short, catchy and easy to remember."
            />
            <div className="mt-10">
              <ExampleCards examples={brandNameExamples} />
            </div>
          </Container>
        </section>

        {/* Interactive naming activity */}
        <section className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Your turn"
              title="Invent your own brand names!"
              subtitle="These products don't have names yet. Can you give them one?"
            />
            <div className="mt-10">
              <NamingActivity challenges={namingChallenges} />
            </div>
          </Container>
        </section>

        {/* Final quiz + badge */}
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Final challenge"
              title="Five questions to earn your badge"
              subtitle="Answer all five and the Brand Name Explorer badge is yours."
            />
            <div className="mx-auto mt-10 max-w-3xl">
              <BrandNameQuiz />
            </div>
          </Container>
        </section>
        </WorldRouteGuard>
      </main>

      <SiteFooter />
    </>
  );
}
