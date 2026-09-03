"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuestyExpression } from "@/components/illustrations/QuestyExpression";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { whyKidsLoveFeatures } from "@/lib/home-content";

/** Four colourful capability cards that lift and tilt on hover/focus. */
export function FeatureCards() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why kids love it"
          title="Why Kids Love Brand Quest"
          subtitle="Four reasons every mission feels like play, not homework."
        />

        <motion.ul
          variants={staggerContainer}
          {...inViewOnce}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyKidsLoveFeatures.map((feature) => (
            <motion.li key={feature.title} variants={fadeUp}>
              <motion.article
                whileHover={{ y: -10, scale: 1.03 }}
                whileFocus={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                tabIndex={0}
                className={`h-full rounded-3xl border-2 p-6 shadow-sm transition-shadow hover:shadow-xl ${feature.surface}`}
              >
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-white shadow-md"
                >
                  <QuestyExpression mood={feature.mood} size={76} />
                </motion.span>

                <h3 className="mt-5 font-display text-xl font-bold text-detective-blue-900">
                  <span aria-hidden="true" className="mr-2">
                    {feature.emoji}
                  </span>
                  {feature.title}
                </h3>
                <p className="mt-2 text-detective-blue-700/85">{feature.description}</p>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
