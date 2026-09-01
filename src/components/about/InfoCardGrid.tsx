"use client";

import { motion } from "framer-motion";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { InfoCardItem } from "@/lib/about-content";

type InfoCardGridProps = {
  items: InfoCardItem[];
  /** Grid columns at the large breakpoint. */
  columns?: 2 | 4;
};

/** Reusable colourful card grid — powers both the Mission and Why Learn sections. */
export function InfoCardGrid({ items, columns = 4 }: InfoCardGridProps) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className={`grid gap-6 sm:grid-cols-2 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"
      }`}
    >
      {items.map((item) => (
        <motion.li key={item.title} variants={fadeUp}>
          <motion.article
            whileHover={{ y: -10, rotate: -1.5, scale: 1.03 }}
            whileFocus={{ y: -10, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            tabIndex={0}
            className={`h-full rounded-3xl border-2 p-6 shadow-sm transition-shadow hover:shadow-xl sm:p-8 ${item.surface}`}
          >
            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-md ${item.badge}`}
              aria-hidden="true"
            >
              {item.emoji}
            </span>

            <h3 className="mt-5 font-display text-xl font-bold text-detective-blue-900">
              {item.title}
            </h3>
            <p className="mt-2 text-detective-blue-700/85">{item.description}</p>
          </motion.article>
        </motion.li>
      ))}
    </motion.ul>
  );
}
