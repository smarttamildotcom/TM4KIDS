"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useExperience } from "@/lib/experience/ExperienceProvider";
import { Sparkles } from "lucide-react";
import { QuestyHeroIllustration } from "@/components/illustrations/QuestyHeroIllustration";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const { t, motionEnabled } = useExperience();
  const reduce = useReducedMotion();
  const animate = motionEnabled && !reduce;
  return (
    <section id="start" className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-8 pb-14 pt-8 sm:pt-10 lg:grid-cols-[55%_45%] lg:gap-10 lg:pb-20 lg:pt-12">
        <motion.div variants={staggerContainer} initial={animate ? "hidden" : false} animate="visible" className="text-center lg:text-left">
          <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> {t.badge}
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 font-display text-3xl font-bold leading-tight text-detective-blue-900 sm:text-4xl lg:text-5xl">
            {t.heading} <span className="text-detective-orange-500">{t.headingAccent}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl lg:mx-0">
            {t.intro}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2 font-display text-sm font-bold text-detective-blue-800 lg:justify-start">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">🎨 {t.create}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">💡 {t.invent}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">⭐ {t.brand}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">🚀 {t.imagine}</span>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-sm font-semibold text-green-700">✨ {t.free}</motion.p>
        </motion.div>
        <motion.div animate={animate ? { y: [0,-8,0], rotate:[0,1,0] } : undefined} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><QuestyHeroIllustration /></motion.div>
      </Container>
    </section>
  );
}
