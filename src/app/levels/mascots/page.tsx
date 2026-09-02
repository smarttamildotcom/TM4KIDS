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
import { MascotCreator } from "@/components/lesson/MascotCreator";
import { LogoMatchGame } from "@/components/game";
import { MascotQuiz } from "@/components/lesson/MascotQuiz";
import {
  mascotExamples,
  mascotMatchPairs,
  missionQuestion,
  storyScenes,
} from "@/lib/lesson-four";

export const metadata: Metadata = {
  title: "Lesson 4: Mascots | Brand Quest",
  description:
    "Meet the brand heroes, design your own mascot, and earn the Mascot Hero badge.",
};

export default function MascotsPage() {
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
              Level 4 · Meet the Brand Heroes
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold text-detective-blue-900 sm:text-5xl">
              Level 4 – Mascots
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-detective-blue-700/85">
              A convention full of friendly brand characters just lost their
              name tags! Learn what a mascot is, design your own, then help
              every hero find its company.
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
              title="The case of the mixed-up mascots"
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
              title="Why mascots?"
              subtitle="Read each option carefully, then pick the one you think is right."
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
              title="Brand heroes you might already know"
              subtitle="Each of these friendly characters represents a real company."
            />
            <div className="mt-10">
              <ExampleCards examples={mascotExamples} variant="frame" />
            </div>
          </Container>
        </section>

        {/* Interactive mascot creator */}
        <section className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Your turn"
              title="Design your very own mascot!"
              subtitle="Pick an animal, colour, hat and accessory to build your brand hero."
            />
            <div className="mt-10">
              <MascotCreator />
            </div>
          </Container>
        </section>

        {/* Detective mission: mascot match game */}
        <section id="mission" className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Detective mission"
              title="Help every mascot find its company"
              subtitle="Drag each mascot onto the company it belongs to."
            />
            <div className="mt-10">
              <LogoMatchGame pairs={mascotMatchPairs} />
            </div>
          </Container>
        </section>

        {/* Final quiz + badge */}
        <section className="bg-detective-blue-50/70 py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Final challenge"
              title="Five questions to earn your badge"
              subtitle="Answer all five and the Mascot Hero badge is yours."
            />
            <div className="mx-auto mt-10 max-w-3xl">
              <MascotQuiz />
            </div>
          </Container>
        </section>
        </ProtectedRoute>
      </main>

      <SiteFooter />
    </>
  );
}
