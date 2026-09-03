"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { questyArt } from "@/lib/questy-art";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

/** "Meet Detective TM" mascot introduction. */
export function MascotIntro() {
  return (
    <motion.div
      variants={staggerContainer}
      {...inViewOnce}
      className="grid items-center gap-10 lg:grid-cols-2"
    >
      <motion.div
        variants={fadeUp}
        className="relative mx-auto w-full max-w-sm"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <Image
            src={questyArt.detective}
            alt="Questy, the Brand Quest detective mascot"
            sizes="(min-width: 640px) 320px, 240px"
            className="h-[240px] w-auto object-contain drop-shadow-2xl sm:h-[320px]"
          />
        </motion.div>

        <motion.span
          aria-hidden="true"
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-full bg-detective-yellow-400 text-3xl shadow-xl sm:-right-6 sm:-top-6"
        >
          🔎
        </motion.span>
      </motion.div>

      <motion.div variants={fadeUp} className="text-center lg:text-left">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-500">
          Meet Detective TM
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">
          Your guide through every mission
        </h3>
        <p className="mt-4 text-lg text-detective-blue-700/85">
          Detective TM guides children through exciting BrandQuest adventures —
          cheering on every discovery, every quiz and every badge earned along
          the way.
        </p>
      </motion.div>
    </motion.div>
  );
}
