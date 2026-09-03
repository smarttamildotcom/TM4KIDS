import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { MeetQuesty } from "@/components/sections/MeetQuesty";
import { AdventureMap } from "@/components/sections/AdventureMap";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
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
        <Hero />
        <MeetQuesty />
        <AdventureMap />
        <FeatureCards />
        <FAQ />
      </main>

      <SiteFooter />
    </>
  );
}
