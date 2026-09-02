"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { parentPoints } from "@/lib/home-content";

/** "Designed for Parents" — trust-building section with a floating badge illustration. */
export function ParentSection() {
  return (
    <section id="parents" className="py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={staggerContainer}
          {...inViewOnce}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500"
          >
            For families
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl"
          >
            Designed for Parents
          </motion.h2>

          <motion.ul variants={staggerContainer} className="mx-auto mt-6 max-w-md space-y-3 lg:mx-0">
            {parentPoints.map((point) => {
              const Icon = point.icon;
              return (
                <motion.li
                  key={point.label}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-2xl bg-detective-blue-50 px-4 py-3 text-left"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-detective-blue-500 text-white shadow-sm">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-display font-semibold text-detective-blue-900">
                    {point.label}
                  </span>
                  <Icon className="ml-auto hidden h-5 w-5 text-detective-blue-400 sm:block" aria-hidden="true" />
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8">
            <Button href="/about" size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative order-1 mx-auto grid h-56 w-56 place-items-center rounded-[3rem] bg-detective-blue-100 shadow-inner sm:h-72 sm:w-72 lg:order-2"
        >
          <span aria-hidden="true" className="text-7xl sm:text-8xl">
            🧠
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-xl shadow-lg"
          >
            ❤️
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute -right-4 bottom-6 grid h-12 w-12 place-items-center rounded-full bg-detective-yellow-400 text-xl shadow-lg"
          >
            ⭐
          </motion.span>
        </motion.div>
      </Container>
    </section>
  );
}
