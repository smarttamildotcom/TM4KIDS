"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { QuestyHeroIllustration } from "@/components/illustrations/QuestyHeroIllustration";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section id="start" className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-8 pb-14 pt-8 sm:pt-10 lg:grid-cols-[55%_45%] lg:gap-10 lg:pb-20 lg:pt-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Ideas Have Superpowers!
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 font-display text-3xl font-bold leading-tight text-detective-blue-900 sm:text-4xl lg:text-5xl">
            Discover the amazing <span className="text-detective-orange-500">ideas hiding all around you.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl lg:mx-0">
            Join Questy to explore how people create, invent, design and build brands through short stories, playful questions and creative rewards.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-2 font-display text-sm font-bold text-detective-blue-800 lg:justify-start">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">🎨 Create</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">💡 Invent</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">⭐ Brand</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">🚀 Imagine</span>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-sm font-semibold text-green-700">✨ All 15 adventures are free to explore.</motion.p>
        </motion.div>
        <QuestyHeroIllustration />
      </Container>
    </section>
  );
}
