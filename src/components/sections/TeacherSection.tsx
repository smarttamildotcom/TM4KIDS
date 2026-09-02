"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { teacherPoints } from "@/lib/home-content";

/** "Perfect for Schools" — mirrors ParentSection's layout with the illustration on the left. */
export function TeacherSection() {
  return (
    <section id="teachers" className="bg-detective-blue-50/70 py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto grid h-56 w-56 place-items-center rounded-[3rem] bg-white shadow-inner sm:h-72 sm:w-72"
        >
          <span aria-hidden="true" className="text-7xl sm:text-8xl">
            🏫
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 bottom-6 grid h-12 w-12 place-items-center rounded-full bg-detective-orange-400 text-xl shadow-lg"
          >
            📒
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute -right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-xl shadow-lg"
          >
            🥇
          </motion.span>
        </motion.div>

        <motion.div variants={staggerContainer} {...inViewOnce} className="text-center lg:text-left">
          <motion.p
            variants={fadeUp}
            className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500"
          >
            For educators
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl"
          >
            Perfect for Schools
          </motion.h2>

          <motion.ul variants={staggerContainer} className="mx-auto mt-6 max-w-md space-y-3 lg:mx-0">
            {teacherPoints.map((point) => {
              const Icon = point.icon;
              return (
                <motion.li
                  key={point.label}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left shadow-sm"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-detective-orange-500 text-white shadow-sm">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-display font-semibold text-detective-blue-900">
                    {point.label}
                  </span>
                  <Icon className="ml-auto hidden h-5 w-5 text-detective-orange-400 sm:block" aria-hidden="true" />
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8">
            <Button href="/contact" size="lg">
              Explore School Plans
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
