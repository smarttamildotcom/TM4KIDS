"use client";

import Image from "next/image";
import expressionsSheet from "@/7. Expressions Pack.png";
import detectiveQuesty from "@/6. Detective Questy.png";
import { QuestySprite } from "@/components/illustrations/QuestySprite";

export type QuestyMood =
  | "happy"
  | "thinking"
  | "surprised"
  | "excited"
  | "sad"
  | "cool"
  | "quiet"
  | "love"
  | "detective";

/** Column/row of each mood within the 4x2 Expressions Pack sprite sheet. */
const spriteGrid: Record<Exclude<QuestyMood, "detective">, { col: number; row: number }> = {
  happy: { col: 0, row: 0 },
  thinking: { col: 1, row: 0 },
  surprised: { col: 2, row: 0 },
  excited: { col: 3, row: 0 },
  sad: { col: 0, row: 1 },
  cool: { col: 1, row: 1 },
  quiet: { col: 2, row: 1 },
  love: { col: 3, row: 1 },
};

/**
 * A single Questy facial expression cropped from the official Expressions Pack.
 * `mood="detective"` renders the full-body Detective Questy artwork instead.
 */
export function QuestyExpression({
  mood,
  size = 96,
  className = "",
}: {
  mood: QuestyMood;
  size?: number;
  className?: string;
}) {
  if (mood === "detective") {
    return (
      <Image
        src={detectiveQuesty}
        alt="Questy dressed as a detective"
        width={size}
        height={size}
        sizes={`${size}px`}
        className={`h-auto object-contain ${className}`}
        style={{ width: size }}
      />
    );
  }

  const { col, row } = spriteGrid[mood];

  return (
    <QuestySprite
      sheet={expressionsSheet}
      cols={4}
      rows={2}
      col={col}
      row={row}
      size={size}
      label={`Questy looking ${mood}`}
      className={className}
    />
  );
}
