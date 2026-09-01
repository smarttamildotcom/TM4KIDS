"use client";

import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { Example } from "@/lib/examples";

type ExampleCardsProps = {
  examples: Example[];
  /** `emoji` shows a floating icon; `frame` shows a dashed image placeholder. */
  variant?: "emoji" | "frame";
};

/** Animated cards showing real-world examples. Reused across lessons. */
export function ExampleCards({ examples, variant = "emoji" }: ExampleCardsProps) {
  return (
    <motion.ul
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-6 sm:grid-cols-3"
    >
      {examples.map((example) => (
        <motion.li key={example.kind} variants={fadeUp}>
          <motion.div
            whileHover={{ y: -8, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full rounded-3xl border-2 border-detective-blue-100 bg-white p-6 text-center shadow-md"
          >
            {variant === "frame" ? (
              <ImagePlaceholder
                label={`${example.kind} logo`}
                emoji={example.emoji}
                className="aspect-square w-full"
              />
            ) : (
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="block text-5xl"
              >
                {example.emoji}
              </motion.span>
            )}
            <h3 className="mt-4 font-display text-xl font-bold text-detective-blue-900">
              {example.kind}
            </h3>
            <p className="mt-2 text-detective-blue-700/85">
              {example.description}
            </p>
          </motion.div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

