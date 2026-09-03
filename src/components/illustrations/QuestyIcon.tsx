"use client";

import iconPack from "@/8. Questy Icon Pack.png";
import { QuestySprite } from "@/components/illustrations/QuestySprite";

export type QuestyIconName =
  | "questy"
  | "paw"
  | "magnifier"
  | "notebook"
  | "map"
  | "star"
  | "badge"
  | "clue"
  | "cap";

/** Column/row of each icon within the 3x3 Questy Icon Pack sheet. */
const iconGrid: Record<QuestyIconName, { col: number; row: number; label: string }> = {
  questy: { col: 0, row: 0, label: "Questy" },
  paw: { col: 1, row: 0, label: "Paw print" },
  magnifier: { col: 2, row: 0, label: "Magnifying glass" },
  notebook: { col: 0, row: 1, label: "Detective notebook" },
  map: { col: 1, row: 1, label: "Treasure map" },
  star: { col: 2, row: 1, label: "Gold star" },
  badge: { col: 0, row: 2, label: "Detective badge" },
  clue: { col: 1, row: 2, label: "Clue envelope" },
  cap: { col: 2, row: 2, label: "Detective cap" },
};

/** A single icon cropped from the official Questy Icon Pack. */
export function QuestyIcon({
  name,
  size = 40,
  className = "",
}: {
  name: QuestyIconName;
  size?: number;
  className?: string;
}) {
  const { col, row, label } = iconGrid[name];

  return (
    <QuestySprite
      sheet={iconPack}
      cols={3}
      rows={3}
      col={col}
      row={row}
      size={size}
      label={label}
      className={className}
    />
  );
}
