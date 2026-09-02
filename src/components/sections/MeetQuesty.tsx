"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import questyImage from "@/Questy Image.png";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { questyTraits } from "@/lib/home-content";
import { lessons } from "@/lib/lessons";

/** "Meet Questy" — introduces the mascot and invites visitors into their first mission. */
export function MeetQuesty() {
  return (
    <section id="meet-questy" className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-detective-blue-100/60 blur-3xl" />
      </div>

      <Container>
        <motion.p
          variants={fadeUp}
          {...inViewOnce}
          className="text-center font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl lg:text-5xl"
        >
          Meet Questy
        </motion.p>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 mx-auto h-[80%] w-[80%] translate-y-6 rounded-[45%] bg-detective-orange-100"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto h-[280px] w-auto sm:h-[340px]"
            >
              <Image
                src={questyImage}
                alt="Questy the detective mascot waving hello"
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.span
              aria-hidden="true"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-2 grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-lg"
            >
              💬
            </motion.span>
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute left-0 bottom-4 grid h-12 w-12 place-items-center rounded-full bg-detective-yellow-400 text-xl shadow-lg"
            >
              ⭐
            </motion.span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...inViewOnce}
            className="text-center lg:text-left"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl"
            >
              Hi Detective!
              <br />
              I&apos;m Questy!
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-md text-lg text-detective-blue-700/85 lg:mx-0"
            >
              I&apos;ll guide you through exciting missions where you&apos;ll
              discover how famous brands protect their logos, names and
              ideas.
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-3 lg:mx-0 lg:justify-start"
            >
              {questyTraits.map((trait) => (
                <motion.li
                  key={trait.label}
                  variants={fadeUp}
                  className="flex items-center gap-2 rounded-full border-2 border-detective-blue-100 bg-white px-4 py-2 shadow-sm"
                >
                  <span aria-hidden="true" className="text-lg">
                    {trait.emoji}
                  </span>
                  <span className="font-display text-sm font-semibold text-detective-blue-900">
                    {trait.label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8">
              <Button href={lessons[0].href} size="lg">
                Start Your First Mission
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
