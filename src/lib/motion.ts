import type { Variants } from "framer-motion";

/** Fade + rise used by most section entrances. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Parent wrapper that reveals its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** Shared `whileInView` config so every section animates once, on scroll. */
export const inViewOnce = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.25 },
} as const;
