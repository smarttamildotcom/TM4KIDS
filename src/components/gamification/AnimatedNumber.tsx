"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Smoothly animates between values, counting up on first view. */
export function AnimatedNumber({
  value,
  duration = 0.9,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(previous.current, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    previous.current = value;

    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}
