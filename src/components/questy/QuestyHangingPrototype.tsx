"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import questyImage from "@/Questy Image.png";

export function QuestyHangingPrototype() {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 95, damping: 9, mass: 0.9 });
  const rotate = useTransform(springX, [-180, 0, 180], [-16, 0, 16]);
  const ropeRotate = useTransform(springX, [-180, 0, 180], [-9, 0, 9]);

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-0 z-[90] -translate-x-1/2"
      aria-label="Questy hanging mascot"
    >
      <motion.div
        style={{ rotate: ropeRotate, transformOrigin: "50% 0%" }}
        className="flex flex-col items-center"
      >
        <div className="h-2 w-8 rounded-b-full bg-slate-700/80 shadow-sm" aria-hidden="true" />
        <div
          className="h-20 w-[3px] bg-gradient-to-b from-slate-600 via-slate-400 to-slate-600 shadow-sm sm:h-24"
          aria-hidden="true"
        />

        <motion.button
          type="button"
          drag="x"
          dragConstraints={{ left: -180, right: 180 }}
          dragElastic={0.18}
          dragMomentum
          onDrag={(_, info) => x.set(info.offset.x)}
          onDragEnd={() => x.set(0)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97, cursor: "grabbing" }}
          initial={{ y: -220, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 1, rotate: [0, 5, -4, 3, -2, 0] }}
          transition={{
            y: { type: "spring", stiffness: 75, damping: 11, delay: 0.25 },
            opacity: { duration: 0.25, delay: 0.2 },
            rotate: { duration: 2.8, delay: 0.75, ease: "easeOut" },
          }}
          style={{ x: springX, rotate, transformOrigin: "50% 0%" }}
          className="pointer-events-auto relative -mt-1 h-32 w-32 cursor-grab touch-none select-none border-0 bg-transparent p-0 drop-shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-detective-yellow-400 sm:h-40 sm:w-40"
          title="Drag Questy and let go!"
          aria-label="Drag Questy sideways and release to make him swing"
        >
          <Image
            src={questyImage}
            alt="Questy, the IP2Kids detective cat, hanging from the top of the screen"
            fill
            sizes="(max-width: 640px) 128px, 160px"
            className="pointer-events-none object-contain"
          />
        </motion.button>
      </motion.div>

      <div className="pointer-events-none absolute left-1/2 top-[13.5rem] hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-lg ring-1 ring-slate-200 sm:block">
        Drag Questy ✨
      </div>
    </div>
  );
}
