"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { AdventureButton } from "@/components/auth/AdventureButton";
import { DetectiveHeroIllustration } from "@/components/illustrations/DetectiveHeroIllustration";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { fadeUp, staggerContainer } from "@/lib/motion";

/** Hero: headline, primary CTA and an animated floating magnifying glass. */
export function Hero() {
  return (
    <section
      id="start"
      className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white"
    >
      {/* Decorative background blobs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-8 pb-14 pt-8 sm:pt-10 lg:grid-cols-[55%_45%] lg:gap-10 lg:pb-20 lg:pt-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            For super-sleuths aged 8–12
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl"
          >
            Become a{" "}
            <span className="text-detective-orange-500">Little Brand Detective!</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg text-detective-blue-700/85 sm:text-xl lg:mx-0"
          >
            Join {BRAND.name} and discover how brands, logos and trademarks tell
            amazing stories around the world.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <AdventureButton size="lg">
              Start Adventure
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </AdventureButton>
            <Button href="#features" size="lg" variant="outline">
              See how it works
            </Button>
          </motion.div>
        </motion.div>

        <DetectiveHeroIllustration />
      </Container>
    </section>
  );
}
