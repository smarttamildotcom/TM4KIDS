import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { questyArt } from "@/lib/questy-art";
import { InfoCardGrid } from "@/components/about/InfoCardGrid";
import { LearningTimeline } from "@/components/about/LearningTimeline";
import { MascotIntro } from "@/components/about/MascotIntro";
import { ValuesList } from "@/components/about/ValuesList";
import { CallToAction } from "@/components/sections/CallToAction";
import {
  academyValues,
  learningTimeline,
  missionPoints,
  whyLearnCards,
} from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About IP2Kids | Intellectual Property Learning for Kids",
  description: "Discover how IP2Kids helps children aged 7–12 learn about trademarks, patents, copyright and designs through interactive games and detective adventures.",
};

export default function AboutPage() {
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
        {/* 1. Hero banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
            <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
          </div>

          <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
                Inspiring the Next Generation of Little IP Detectives
              </p>

              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl">
                About IP2Kids
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl lg:mx-0">
                Making intellectual property education fun, interactive and easy for children aged 7–12.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-md justify-center">
              <Image
                src={questyArt.reading}
                alt="Questy reading an IP detective casebook"
                priority
                sizes="(min-width: 640px) 360px, 260px"
                className="h-[260px] w-auto object-contain drop-shadow-2xl sm:h-[360px]"
              />
            </div>
          </Container>
        </section>

        {/* 2. Our Mission */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Our mission"
              title="Helping children discover the world of ideas"
              subtitle="IP2Kids introduces children to the exciting world of intellectual property through stories, games, mysteries and interactive challenges."
            />
            <div className="mt-12">
              <InfoCardGrid items={missionPoints} />
            </div>
          </Container>
        </section>

        {/* 3. Why Learn About Intellectual Property? */}
        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Why it matters"
              title="Why Learn About Trademarks?"
              subtitle="Intellectual property helps children understand ideas, creativity and invention all around them."
            />
            <div className="mt-12">
              <InfoCardGrid items={whyLearnCards} />
            </div>
          </Container>
        </section>

        {/* 4. Our Learning Method */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Our learning method"
              title="A journey from curious learner to Little IP Detective"
              subtitle="Discover, learn, play and solve missions with Questy."
            />
            <div className="mt-12">
              <LearningTimeline steps={learningTimeline} />
            </div>
          </Container>
        </section>

        {/* 5. Meet Detective TM */}
        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container>
            <MascotIntro />
          </Container>
        </section>

        {/* 6. Values */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="What we stand for" title="Our Values" />
            <div className="mt-10">
              <ValuesList values={academyValues} />
            </div>
          </Container>
        </section>

        {/* 7. CTA */}
        <CallToAction
          title="Ready to start your IP adventure?"
          subtitle="Join Questy and explore 15 exciting worlds of trademarks, inventions, creativity and designs."
          buttonLabel="Start Adventure"
          buttonHref="/#journey"
        />
      </main>

      <SiteFooter />
    </>
  );
}
