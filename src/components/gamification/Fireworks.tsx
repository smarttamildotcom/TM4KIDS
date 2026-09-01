"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#1a86f0", "#ffc820", "#f97316", "#22c55e", "#f5b500", "#ef4444"];

type Spark = {
  id: number;
  angle: number;
  distance: number;
  color: string;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  delay: number;
  sparks: Spark[];
};

function makeBurst(id: number, sparkCount = 14): Burst {
  return {
    id,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 45,
    delay: id * 0.35,
    sparks: Array.from({ length: sparkCount }, (_, index) => ({
      id: index,
      angle: (index / sparkCount) * 360,
      distance: 60 + Math.random() * 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })),
  };
}

/**
 * One-shot fireworks celebration: a handful of radial bursts across the
 * screen. Mount this alongside <Confetti /> for a big milestone moment.
 */
export function Fireworks({
  burstCount = 5,
  durationMs = 3400,
}: {
  burstCount?: number;
  durationMs?: number;
}) {
  const [bursts, setBursts] = useState<Burst[] | null>(null);

  useEffect(() => {
    setBursts(
      Array.from({ length: burstCount }, (_, index) => makeBurst(index)),
    );
    const timer = setTimeout(() => setBursts(null), durationMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burstCount, durationMs]);

  if (!bursts) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
    >
      {bursts.map((burst) => (
        <div
          key={burst.id}
          style={{ position: "absolute", left: `${burst.x}%`, top: `${burst.y}%` }}
        >
          {burst.sparks.map((spark) => {
            const radians = (spark.angle * Math.PI) / 180;
            const targetX = Math.cos(radians) * spark.distance;
            const targetY = Math.sin(radians) * spark.distance;

            return (
              <motion.span
                key={spark.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                animate={{ x: targetX, y: targetY, opacity: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: burst.delay, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: spark.color,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
