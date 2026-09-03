"use client";

import Image, { type StaticImageData } from "next/image";

type QuestySpriteProps = {
  sheet: StaticImageData;
  cols: number;
  rows: number;
  col: number;
  row: number;
  /** Rendered square size in pixels. */
  size: number;
  label: string;
  className?: string;
};

/**
 * Crops one tile out of a Questy sprite sheet using next/image, by rendering the
 * full sheet inside a fixed-size window and offsetting it.
 */
export function QuestySprite({
  sheet,
  cols,
  rows,
  col,
  row,
  size,
  label,
  className = "",
}: QuestySpriteProps) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
    >
      <Image
        src={sheet}
        alt=""
        aria-hidden="true"
        width={size * cols}
        height={size * rows}
        sizes={`${size * cols}px`}
        style={{
          position: "absolute",
          left: -col * size,
          top: -row * size,
          maxWidth: "none",
        }}
      />
    </span>
  );
}
