"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Award,
  Gamepad2,
  GraduationCap,
  Heart,
  Lightbulb,
  Puzzle,
  Search,
  Sprout,
  Sparkles,
  Trophy,
} from "lucide-react";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { AboutIconName, TimelineStep } from "@/lib/about-content";

const iconByName = {
  award: Award,
  gamepad: Gamepad2,
  "graduation-cap": GraduationCap,
  heart: Heart,
  lightbulb: Lightbulb,
  puzzle: Puzzle,
  search: Search,
  sprout: Sprout,
  sparkles: Sparkles,
  trophy: Trophy,
} satisfies Record<AboutIconName, typeof Award>;

/** Vertical step-by-step timeline used by "Our Learning Method". */
export function LearningTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <motion.ol
      variants={staggerContainer}
      {...inViewOnce}
      className="mx-auto flex max-w-md flex-col items-center"
    >
      {steps.map((step, index) => {
        const Icon = iconByName[step.icon];
        const isLast = index === steps.length - 1;

        return (
          <motion.li key={step.label} variants={fadeUp} className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="flex w-full items-center gap-4 rounded-3xl border-2 border-detective-blue-100 bg-white px-6 py-4 shadow-md"
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-detective-blue-500 to-detective-blue-700 text-white shadow-md"
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-bold text-detective-blue-900">
                {step.label}
              </span>
            </motion.div>

            {!isLast && (
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="my-2 text-detective-orange-500"
              >
                <ArrowDown className="h-6 w-6" />
              </motion.span>
            )}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
