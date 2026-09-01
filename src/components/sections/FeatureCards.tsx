"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { features } from "@/lib/site-content";

/** Four colourful capability cards that lift and tilt on hover/focus. */
export function FeatureCards() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Your Adventure Kit"
          title="Everything you need to crack the case"
          subtitle="Four ways to explore the world of trademarks — learn, play, earn and test yourself."
        />

        <motion.ul
          variants={staggerContainer}
          {...inViewOnce}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.li key={feature.title} variants={fadeUp}>
                <motion.article
                  whileHover={{ y: -10, rotate: -1.5, scale: 1.03 }}
                  whileFocus={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  tabIndex={0}
                  className={`h-full rounded-3xl border-2 p-6 shadow-sm transition-shadow hover:shadow-xl ${feature.surface}`}
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl shadow-md ${feature.badge}`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 font-display text-xl font-bold text-detective-blue-900">
                    <span aria-hidden="true" className="mr-2">
                      {feature.emoji}
                    </span>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-detective-blue-700/85">
                    {feature.description}
                  </p>
                </motion.article>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
