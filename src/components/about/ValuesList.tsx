"use client";

import { motion } from "framer-motion";
import {
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
import type { AboutIconName, ValueItem } from "@/lib/about-content";

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

/** Animated row of core-value chips. */
export function ValuesList({ values }: { values: ValueItem[] }) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {values.map((value) => {
        const Icon = iconByName[value.icon];

        return (
          <motion.li key={value.label} variants={fadeUp}>
            <motion.span
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex items-center gap-2 rounded-full border-2 border-detective-blue-100 bg-white px-5 py-3 font-display font-semibold text-detective-blue-900 shadow-sm"
            >
              <Icon className="h-5 w-5 text-detective-orange-500" aria-hidden="true" />
              {value.label}
            </motion.span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
