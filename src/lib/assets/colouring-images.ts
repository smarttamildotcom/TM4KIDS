import { WORLD_1_COLOUR_JPEG } from "./world-1-colour-safe";
import { WORLD_3_COLOUR_JPEG } from "./world-3-colour-safe";
import { WORLD_5_COLOUR_JPEG } from "./world-5-colour-safe";
import { WORLD_7_COLOUR_JPEG } from "./world-7-colour-safe";
import { WORLD_9_COLOUR_JPEG } from "./world-9-colour-safe";
import { WORLD_11_COLOUR_JPEG } from "./world-11-colour-safe";
import { WORLD_13_COLOUR_JPEG } from "./world-13-colour-safe";
import { WORLD_15_COLOUR_JPEG } from "./world-15-colour-safe";

const COLOURING_IMAGES: Record<number, string> = {
  1: WORLD_1_COLOUR_JPEG,
  3: WORLD_3_COLOUR_JPEG,
  5: WORLD_5_COLOUR_JPEG,
  7: WORLD_7_COLOUR_JPEG,
  9: WORLD_9_COLOUR_JPEG,
  11: WORLD_11_COLOUR_JPEG,
  13: WORLD_13_COLOUR_JPEG,
  15: WORLD_15_COLOUR_JPEG,
};

export function getColouringImage(worldId: number) {
  return COLOURING_IMAGES[worldId] ?? null;
}
