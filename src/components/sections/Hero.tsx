"use client";

import { useExperience } from "@/lib/experience/ExperienceProvider";
import { Sparkles } from "lucide-react";
import { QuestyHeroIllustration } from "@/components/illustrations/QuestyHeroIllustration";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { t } = useExperience();
  return (
    <section id="start" className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-8 pb-14 pt-8 sm:pt-10 lg:grid-cols-[55%_45%] lg:gap-10 lg:pb-20 lg:pt-12">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> {t.badge}
          </p>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-detective-blue-900 sm:text-4xl lg:text-5xl">
            {t.heading} <span className="text-detective-orange-500">{t.headingAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl lg:mx-0">
            {t.intro}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 font-display text-sm font-bold text-detective-blue-800 lg:justify-start">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">🎨 {t.create}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">💡 {t.invent}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">⭐ {t.brand}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">🚀 {t.imagine}</span>
          </div>
          <p className="mt-4 text-sm font-semibold text-green-700">✨ {t.free}</p>
        </div>
        <div><QuestyHeroIllustration /></div>
      </Container>
    </section>
  );
}
