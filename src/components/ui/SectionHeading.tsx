"use client";

import { motion } from "framer-motion";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type SectionHeadingProps = { eyebrow?: string; title: string; subtitle?: string; tone?: "dark" | "light"; };

export function SectionHeading({ eyebrow, title, subtitle, tone = "dark" }: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <motion.div variants={staggerContainer} {...inViewOnce} className="mx-auto max-w-2xl text-center">
      {eyebrow && <motion.p variants={fadeUp} className={`mb-2 font-display text-xs font-semibold uppercase tracking-[0.18em] sm:mb-3 sm:text-sm sm:tracking-[0.2em] ${isLight ? "text-detective-yellow-300" : "text-detective-orange-500"}`}>{eyebrow}</motion.p>}
      <motion.h2 variants={fadeUp} className={`font-display text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl ${isLight ? "text-white" : "text-detective-blue-900"}`}>{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUp} className={`mx-auto mt-3 max-w-xl text-sm leading-6 sm:mt-4 sm:text-lg sm:leading-7 ${isLight ? "text-detective-blue-100" : "text-detective-blue-700/80"}`}>{subtitle}</motion.p>}
    </motion.div>
  );
}
