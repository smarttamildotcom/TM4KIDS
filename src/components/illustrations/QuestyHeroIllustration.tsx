"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import questyImage from "@/Questy Image.png";

const float = (distance: number, duration: number, delay = 0) => ({
  animate: { y: [0, -distance, 0], rotate: [-1, 2, -1] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

/** Hero illustration: Questy the detective cat mascot with floating decorative clues. */
export function QuestyHeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto w-full max-w-[28rem]"
    >
      {/* Rounded light-blue background blob behind Questy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 mx-auto h-[85%] w-[85%] translate-y-4 rounded-[45%] bg-detective-blue-100"
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto h-[340px] w-auto sm:h-[420px] lg:h-[500px]"
      >
        <Image
          src={questyImage}
          alt="Questy, the Brand Quest detective mascot"
          priority
          className="h-full w-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      <motion.span
        aria-hidden="true"
        {...float(12, 4.2)}
        className="absolute left-[2%] top-[6%] grid h-12 w-12 place-items-center rounded-full bg-detective-yellow-400 text-xl shadow-lg"
      >
        ⭐
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(15, 5, 0.4)}
        className="absolute right-[0%] top-[2%] grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-xl"
      >
        🏅
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(10, 3.8, 0.8)}
        className="absolute right-[-2%] top-[45%] grid h-12 w-12 place-items-center rounded-full bg-detective-blue-600 text-xl shadow-lg"
      >
        🔍
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(11, 4.6, 0.2)}
        className="absolute left-[-2%] top-[38%] grid h-12 w-12 place-items-center rounded-full bg-detective-orange-400 text-xl shadow-lg"
      >
        🐾
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(9, 4, 1.1)}
        className="absolute left-[6%] bottom-[6%] grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-lg"
      >
        📓
      </motion.span>
      <motion.span
        aria-hidden="true"
        {...float(13, 4.4, 0.6)}
        className="absolute right-[8%] bottom-[2%] grid h-12 w-12 place-items-center rounded-2xl bg-detective-yellow-100 text-xl shadow-lg"
      >
        🗺️
      </motion.span>
    </motion.div>
  );
}
