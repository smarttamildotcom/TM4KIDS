import type { StaticImageData } from "next/image";
import questyImage from "@/Questy Image.png";
import thinkingQuesty from "@/3. Thinking Questy.png";
import celebratingQuesty from "@/4. Celebrating Questy.png";
import readingQuesty from "@/5. Reading Questy.png";
import detectiveQuesty from "@/6. Detective Questy.png";

export const questyArt = {
  hero: questyImage,
  thinking: thinkingQuesty,
  celebrating: celebratingQuesty,
  reading: readingQuesty,
  detective: detectiveQuesty,
} as const;

type WorldArt = { src: StaticImageData; alt: string };

const detective: WorldArt = { src: detectiveQuesty, alt: "Questy on the case with a magnifying glass" };
const thinking: WorldArt = { src: thinkingQuesty, alt: "Questy thinking hard about a clue" };
const reading: WorldArt = { src: readingQuesty, alt: "Questy reading a detective book" };
const standing: WorldArt = { src: questyImage, alt: "Questy the Brand Quest mascot" };
const celebrating: WorldArt = { src: celebratingQuesty, alt: "Questy celebrating a solved case" };

/** Questy artwork shown on each world card, cycling through the illustration set. */
export const worldQuestyArt: Record<number, WorldArt> = {
  1: detective,
  2: thinking,
  3: reading,
  4: standing,
  5: thinking,
  6: detective,
  7: reading,
  8: standing,
  9: thinking,
  10: detective,
  11: reading,
  12: standing,
  13: thinking,
  14: detective,
  15: celebrating,
};
