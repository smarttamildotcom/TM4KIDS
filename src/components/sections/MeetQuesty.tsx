"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import questyImage from "@/5. Reading Questy.png";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QuestyIcon } from "@/components/illustrations/QuestyIcon";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { questyTraits } from "@/lib/home-content";

export function MeetQuesty() {
  return (
    <section id="meet-questy" className="relative overflow-hidden py-12 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-detective-blue-100/60 blur-3xl" /></div>
      <Container>
        <motion.p variants={fadeUp} {...inViewOnce} className="text-center font-display text-2xl font-bold text-detective-blue-900 sm:text-4xl lg:text-5xl">Meet Questy</motion.p>
        <div className="mt-8 grid items-center gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative mx-auto flex w-full max-w-sm justify-center">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 mx-auto h-[80%] w-[80%] translate-y-6 rounded-[45%] bg-detective-orange-100" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="relative flex h-[240px] w-full items-center justify-center sm:h-[340px]">
              <Image src={questyImage} alt="Questy reading an idea book" sizes="(min-width: 640px) 340px, 240px" className="mx-auto block h-full w-auto max-w-full object-contain object-center drop-shadow-2xl" />
            </motion.div>
          </motion.div>
          <motion.div variants={staggerContainer} {...inViewOnce} className="text-center lg:text-left">
            <motion.h2 variants={fadeUp} className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">Hi! I&apos;m Questy.</motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-base text-detective-blue-700/85 sm:text-lg lg:mx-0">I&apos;ll guide you through 15 Idea Adventures where you&apos;ll explore creativity, brands, inventions, copyright and designs through stories, questions and playful activities.</motion.p>
            <motion.ul variants={staggerContainer} className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-3 lg:mx-0 lg:justify-start">{questyTraits.map((trait) => (<motion.li key={trait.label} variants={fadeUp} className="flex items-center gap-2 rounded-full border-2 border-detective-blue-100 bg-white px-4 py-2 shadow-sm"><QuestyIcon name={trait.icon} size={24} /><span className="font-display text-sm font-semibold text-detective-blue-900">{trait.label}</span></motion.li>))}</motion.ul>
            <motion.div variants={fadeUp} className="mt-8"><Button href="/#journey" size="lg">Explore Idea Adventures<ArrowRight className="h-5 w-5" aria-hidden="true" /></Button></motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
