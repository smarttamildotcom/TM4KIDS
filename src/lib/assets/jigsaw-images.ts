import { WORLD_2_JIGSAW_JPEG } from "./world-2-jigsaw-safe";
import { WORLD_4_JIGSAW_JPEG } from "./world-4-jigsaw-safe";
import { WORLD_6_JIGSAW_JPEG } from "./world-6-jigsaw-safe";
import { WORLD_8_JIGSAW_JPEG } from "./world-8-jigsaw-safe";
import { WORLD_10_JIGSAW_JPEG } from "./world-10-jigsaw-safe";
import { WORLD_12_JIGSAW_JPEG } from "./world-12-jigsaw-safe";
import { WORLD_14_JIGSAW_JPEG } from "./world-14-jigsaw-safe";

const JIGSAW_IMAGES: Record<number, string> = {
  2: WORLD_2_JIGSAW_JPEG,
  4: WORLD_4_JIGSAW_JPEG,
  6: WORLD_6_JIGSAW_JPEG,
  8: WORLD_8_JIGSAW_JPEG,
  10: WORLD_10_JIGSAW_JPEG,
  12: WORLD_12_JIGSAW_JPEG,
  14: WORLD_14_JIGSAW_JPEG,
};

export function getJigsawImage(worldId: number) {
  return JIGSAW_IMAGES[worldId] ?? null;
}
