"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#1a86f0",
  "#ffc820",
  "#f97316",
  "#22c55e",
  "#f5b500",
];

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
};

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1.2,
    rotate: Math.random() * 360 - 180,
    color: COLORS[index % COLORS.length],
  }));
}

/**
 * One-shot confetti burst. Mount this component (or flip `replayKey`) to
 * celebrate an achievement, e.g. finishing a quiz.
 */
export function Confetti({
  pieceCount = 42,
  durationMs = 2800,
  replayKey,
}: {
  pieceCount?: number;
  durationMs?: number;
  replayKey?: string | number;
}) {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {
    setPieces(makePieces(pieceCount));
    const timer = setTimeout(() => setPieces(null), durationMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieceCount, durationMs, replayKey]);

  if (!pieces) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          initial={{ top: "-8%", left: `${piece.left}%`, opacity: 1, rotate: 0 }}
          animate={{ top: "110%", rotate: piece.rotate }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: 10,
            height: 14,
            borderRadius: 2,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  );
}
