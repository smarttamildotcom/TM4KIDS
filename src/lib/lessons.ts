import { Search, Shapes, Sparkles, Tag, Trophy, type LucideIcon } from "lucide-react";

export type LessonSummary = {
  id: string;
  level: string;
  title: string;
  href: string;
  /** XP paid the first time the lesson is completed. */
  xp: number;
  /** Base coins, before the per-star bonus. */
  coins: number;
  icon: LucideIcon;
};

/** Every lesson in the academy, in play order. */
export const lessons: LessonSummary[] = [
  {
    id: "what-is-a-trademark",
    level: "Level 1",
    title: "What is a Trademark?",
    href: "/levels/what-is-a-trademark",
    xp: 120,
    coins: 10,
    icon: Search,
  },
  {
    id: "brand-names",
    level: "Level 2",
    title: "Brand Names",
    href: "/levels/brand-names",
    xp: 100,
    coins: 15,
    icon: Tag,
  },
  {
    id: "logos",
    level: "Level 3",
    title: "Logos",
    href: "/levels/logos",
    xp: 150,
    coins: 15,
    icon: Shapes,
  },
  {
    id: "mascots",
    level: "Level 4",
    title: "Mascots",
    href: "/levels/mascots",
    xp: 200,
    coins: 20,
    icon: Sparkles,
  },
  {
    id: "trademark-master",
    level: "Level 5",
    title: "Become a BrandQuest Champion",
    href: "/levels/trademark-master",
    xp: 300,
    coins: 25,
    icon: Trophy,
  },
];

export type LessonStatus = "completed" | "current" | "locked";

/** Marks lessons done, unlocks the next one and locks the rest. */
export function getLessonStatuses(
  completedIds: string[],
): { lesson: LessonSummary; status: LessonStatus }[] {
  let currentAssigned = false;

  return lessons.map((lesson) => {
    if (completedIds.includes(lesson.id)) {
      return { lesson, status: "completed" as const };
    }
    if (!currentAssigned) {
      currentAssigned = true;
      return { lesson, status: "current" as const };
    }
    return { lesson, status: "locked" as const };
  });
}
