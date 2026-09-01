"use client";

import { motion } from "framer-motion";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Use light text on dark/coloured backgrounds. */
  tone?: "dark" | "light";
};

/** Reusable animated heading block used at the top of each homepage section. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <motion.div
      variants={staggerContainer}
      {...inViewOnce}
      className="mx-auto max-w-2xl text-center"
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className={`mb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] ${
            isLight ? "text-detective-yellow-300" : "text-detective-orange-500"
          }`}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUp}
        className={`font-display text-3xl font-bold sm:text-4xl lg:text-5xl ${
          isLight ? "text-white" : "text-detective-blue-900"
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 text-base sm:text-lg ${
            isLight ? "text-detective-blue-100" : "text-detective-blue-700/80"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
