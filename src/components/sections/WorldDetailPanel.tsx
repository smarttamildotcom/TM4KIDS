"use client";

import { AdventureExperience } from "@/components/sections/AdventureExperience";
import type { World } from "@/lib/worlds";

export function WorldDetailPanel({ world, isCompleted, onComplete, onNextWorld }: { world: World; isCompleted: boolean; onComplete: (correct: number, total: number) => void; onNextWorld: (worldId: number) => void; }) {
  return <AdventureExperience world={world} isCompleted={isCompleted} onComplete={onComplete} onNextWorld={onNextWorld}/>;
}
