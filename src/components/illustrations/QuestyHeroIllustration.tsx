"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import questyImage from "@/Questy Image.png";

/** Hero illustration: Questy the detective cat mascot. */
export function QuestyHeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto flex w-full max-w-[28rem] justify-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-[85%] w-[85%] translate-y-4 rounded-[45%] bg-detective-blue-100"
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-[340px] w-full items-center justify-center sm:h-[420px] lg:h-[500px]"
      >
        <Image
          src={questyImage}
          alt="Questy, the IP2Kids detective mascot"
          priority
          className="mx-auto block h-full w-auto max-w-full object-contain object-center drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}
