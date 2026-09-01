"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { AdventureButton } from "@/components/auth/AdventureButton";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type CallToActionProps = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

/** Closing call-to-action banner. Reused with different copy across pages. */
export function CallToAction({
  title = "Ready to begin your BrandQuest?",
  subtitle = "Every great detective starts with one clue. Begin your adventure today.",
  buttonLabel = "Start Adventure",
  buttonHref = "/#journey",
}: CallToActionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          variants={staggerContainer}
          {...inViewOnce}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-detective-blue-600 to-detective-blue-900 px-6 py-16 text-center shadow-2xl sm:px-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-detective-yellow-400/25 blur-2xl" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-detective-orange-500/25 blur-2xl" />
          </div>

          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-detective-yellow-400 shadow-xl"
          >
            <Search className="h-10 w-10 text-detective-blue-900" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="relative mx-auto mt-8 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="relative mx-auto mt-5 max-w-xl text-lg text-detective-blue-100"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="relative mt-9">
            {buttonHref === "/#journey" ? (
              <AdventureButton size="lg" variant="secondary">
                {buttonLabel}
              </AdventureButton>
            ) : (
              <Button href={buttonHref} size="lg" variant="secondary">
                {buttonLabel}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
