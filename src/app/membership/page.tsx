import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { MembershipView } from "@/components/membership/MembershipView";
import { questyArt } from "@/lib/questy-art";

export const metadata: Metadata = {
  title: "Membership | Brand Quest",
  description:
    "Become a Brand Quest Member — unlock all 15 detective worlds while supporting children's charities in Singapore.",
};

export default function MembershipPage() {
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
                  src={questyArt.detective}
                  alt="Questy the detective mascot holding a magnifying glass"
                  priority
                  sizes="(min-width: 1024px) 260px, 190px"
                  className="h-[190px] w-auto object-contain drop-shadow-2xl lg:h-[260px]"
                />
              </div>

              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">
                  Brand Quest Membership
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl">
                  Become a Brand Quest Member
                </h1>
                <p className="mt-6 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl">
                  Unlock all 15 detective worlds while supporting a meaningful cause.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <MembershipView />
      </main>

      <SiteFooter />
    </>
  );
}
