import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import Link from "next/link";
import { learningWorlds } from "@/lib/learning-worlds";
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
        <section id="journey" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12" aria-labelledby="learning-worlds">
          <h2 id="learning-worlds" className="text-center text-3xl font-bold text-slate-900">Choose your learning world</h2>
          <p className="mt-3 text-center text-slate-600">Three worlds. 45 adventures. Discover at your own pace.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {learningWorlds.map((world,index) => <Link key={world.slug} href={"/learn/"+world.slug} className={["rounded-3xl bg-emerald-800 p-7 text-white shadow-md","rounded-3xl bg-blue-800 p-7 text-white shadow-md","rounded-3xl bg-violet-800 p-7 text-white shadow-md"][index]}>
              <span className="text-5xl" aria-hidden="true">{world.icon}</span>
              <p className="mt-5 text-sm font-semibold">Ages {world.age} · 15 Adventures</p>
              <h3 className="mt-2 text-2xl font-bold">{world.name}</h3>
              <p className="mt-3">{world.description}</p>
              <p className="mt-6 font-bold">Explore world →</p>
            </Link>)}
          </div>
        </section>
        <MeetQuesty />
        <div id="legacy-journey" className="scroll-mt-24"><AdventureMap /></div>
        <FeatureCards />
        <FAQ />
      </main>

      <SiteFooter />
    </>
  );
}
