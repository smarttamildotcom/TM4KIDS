"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import questyImage from "@/Questy Image.png";

type Reaction = "idle" | "left" | "right" | "hello";

export function InteractiveQuesty() {
  const [reaction, setReaction] = useState<Reaction>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotate = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  const scheduleReset = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setReaction("idle");
      x.set(0);
      rotate.set(0);
    }, 2400);
  }, [rotate, x]);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const reactToPointer = useCallback((clientX: number, rect: DOMRect) => {
    const ratio = (clientX - rect.left) / rect.width;
    if (ratio < 0.36) {
      setReaction("left");
      x.set(-8);
      rotate.set(-2.5);
    } else if (ratio > 0.64) {
      setReaction("right");
      x.set(8);
      rotate.set(2.5);
    } else {
      setReaction("hello");
      x.set(0);
      rotate.set(0);
    }
    scheduleReset();
  }, [rotate, scheduleReset, x]);

  const sayHello = useCallback(() => {
    setReaction("hello");
    x.set(0);
    rotate.set(0);
    scheduleReset();
  }, [rotate, scheduleReset, x]);

  const label = reaction === "left" ? "Questy noticed you on the left!" : reaction === "right" ? "Questy noticed you on the right!" : reaction === "hello" ? "Hi Detective!" : "Move your pointer and Questy will notice you";

  return (
    <div
      className="relative mx-auto flex w-full max-w-sm touch-manipulation select-none justify-center"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        reactToPointer(event.clientX, event.currentTarget.getBoundingClientRect());
      }}
      onPointerLeave={scheduleReset}
      onClick={sayHello}
      role="button"
      tabIndex={0}
      aria-label="Interactive Questy. Move your pointer on desktop or tap Questy to say hello."
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") sayHello();
      }}
    >
      <div aria-hidden="true" className="absolute inset-x-4 top-6 -z-10 h-[78%] rounded-[45%] bg-detective-orange-100" />
      <motion.div
        style={{ x, rotate }}
        animate={reaction === "hello" ? { y: [0, -9, 0], scale: [1, 1.025, 1] } : { y: [0, -5, 0] }}
        transition={{ duration: reaction === "hello" ? 0.7 : 4.5, repeat: reaction === "hello" ? 1 : Infinity, ease: "easeInOut" }}
        className="relative flex h-[300px] w-full items-center justify-center sm:h-[360px]"
      >
        <Image src={questyImage} alt="Questy, the IP2Kids detective mascot" priority={false} sizes="(min-width: 640px) 360px, 300px" className="mx-auto block h-full w-auto max-w-full object-contain object-center drop-shadow-2xl" />
      </motion.div>
      <motion.p
        key={reaction}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute -bottom-8 left-1/2 w-max max-w-[92vw] -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-center font-display text-xs font-semibold text-detective-blue-800 shadow-md sm:text-sm"
        aria-live="polite"
      >
        {label}
      </motion.p>
    </div>
  );
}
