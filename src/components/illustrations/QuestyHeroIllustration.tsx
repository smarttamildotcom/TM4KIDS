"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import questyImage from "@/Questy Image.png";

const float = (distance: number, duration: number, delay = 0) => ({
  animate: { y: [0, -distance, 0], rotate: [-1, 2, -1] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

/** Hero illustration: Questy subtly turns toward the pointer for a playful interactive prototype. */
export function QuestyHeroIllustration() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });
  const lookX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const lookY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const rotateX = useTransform(smoothY, [-1, 1], [2, -2]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centreX = rect.left + rect.width / 2;
      const centreY = rect.top + rect.height / 2;
      pointerX.set(Math.max(-1, Math.min(1, (event.clientX - centreX) / (window.innerWidth * 0.42))));
      pointerY.set(Math.max(-1, Math.min(1, (event.clientY - centreY) / (window.innerHeight * 0.42))));
    };

    const reset = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", reset);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      className="relative mx-auto w-full max-w-[28rem]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 mx-auto h-[85%] w-[85%] translate-y-4 rounded-[45%] bg-detective-blue-100" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto h-[340px] w-auto sm:h-[420px] lg:h-[500px]"
      >
        <motion.div
          style={{ x: lookX, y: lookY, rotateX, rotateY, transformPerspective: 900 }}
          className="h-full w-full"
        >
          <Image src={questyImage} alt="Questy, the IP2Kids detective mascot" priority className="h-full w-auto object-contain drop-shadow-2xl" />
        </motion.div>
      </motion.div>

      <motion.span aria-hidden="true" {...float(12, 4.2)} className="absolute left-[2%] top-[6%] grid h-12 w-12 place-items-center rounded-full bg-detective-yellow-400 text-xl shadow-lg">⭐</motion.span>
      <motion.span aria-hidden="true" {...float(15, 5, 0.4)} className="absolute right-[0%] top-[2%] grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-xl">🏅</motion.span>
      <motion.span aria-hidden="true" {...float(10, 3.8, 0.8)} className="absolute right-[-2%] top-[45%] grid h-12 w-12 place-items-center rounded-full bg-detective-blue-600 text-xl shadow-lg">🔍</motion.span>
      <motion.span aria-hidden="true" {...float(11, 4.6, 0.2)} className="absolute left-[-2%] top-[38%] grid h-12 w-12 place-items-center rounded-full bg-detective-orange-400 text-xl shadow-lg">🐾</motion.span>
      <motion.span aria-hidden="true" {...float(9, 4, 1.1)} className="absolute bottom-[6%] left-[6%] grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-lg">📓</motion.span>
      <motion.span aria-hidden="true" {...float(13, 4.4, 0.6)} className="absolute bottom-[2%] right-[8%] grid h-12 w-12 place-items-center rounded-2xl bg-detective-yellow-100 text-xl shadow-lg">🗺️</motion.span>
    </motion.div>
  );
}
