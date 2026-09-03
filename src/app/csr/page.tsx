import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallToAction } from "@/components/sections/CallToAction";
import {
  CharityCards,
  DonationUpdateCards,
  MissionPoints,
  RemembranceCard,
} from "@/components/csr/CsrSections";
import { questyArt } from "@/lib/questy-art";

export const metadata: Metadata = {
  title: "CSR | Brand Quest",
  description:
    "How Brand Quest gives back — supporting children and families affected by cancer in Singapore.",
};

export default function CsrPage() {
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
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white py-16 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
            <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
          </div>

          <Container className="relative">
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:gap-12 lg:text-left">
              <div className="flex shrink-0 justify-center">
                <Image
                  src={questyArt.celebrating}
                  alt="Questy the detective mascot celebrating"
                  priority
                  sizes="(min-width: 1024px) 260px, 190px"
                  className="h-[190px] w-auto object-contain drop-shadow-2xl lg:h-[260px]"
                />
              </div>

              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">
                  Corporate Social Responsibility
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl">
                  Giving Back Through Learning
                </h1>
                <p className="mt-6 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl">
                  Every contribution helps Brand Quest support children and families affected by
                  cancer in Singapore.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Our Mission */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Our mission"
              title="Learning that reaches beyond the classroom"
              subtitle="Giving is built into how Brand Quest works — not added on afterwards."
            />
            <div className="mt-12">
              <MissionPoints />
            </div>
          </Container>
        </section>

        {/* Charity partners */}
        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Where it goes"
              title="Our Charity Partners"
              subtitle="Two Singapore charities supporting children and families through cancer."
            />
            <div className="mx-auto mt-12 max-w-4xl">
              <CharityCards />
            </div>
          </Container>
        </section>

        {/* Why this matters */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Why this matters" title="The reason behind the mission" />
            <div className="mt-12">
              <RemembranceCard />
            </div>
          </Container>
        </section>

        {/* Transparency */}
        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Transparency"
              title="Donation Updates"
              subtitle="We are committed to transparency. Donation summaries, acknowledgements and annual impact updates will be published here so every supporter can see the difference we are making together."
            />
            <div className="mt-12">
              <DonationUpdateCards />
            </div>
          </Container>
        </section>

        <CallToAction
          title="Learn. Play. Give Back."
          subtitle="Start the adventure and help a young detective make a real difference."
          buttonLabel="Start Adventure"
          buttonHref="/#journey"
        />

        <section className="pb-16 sm:pb-24">
          <Container>
            <p className="text-center text-sm text-detective-blue-700/70">
              Together, every young Brand Detective helps make a real difference.
            </p>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
