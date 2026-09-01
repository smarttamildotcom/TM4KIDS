export type InfoCardItem = {
  emoji: string;
  title: string;
  description: string;
  surface: string;
  badge: string;
};

/** "Our Mission" — what the academy helps children understand. */
export const missionPoints: InfoCardItem[] = [
  {
    emoji: "🔍",
    title: "What trademarks are",
    description:
      "The names, logos and symbols that show who really made something.",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    emoji: "🏷️",
    title: "Why brands matter",
    description:
      "How a trusted brand helps people find products they already know and love.",
    surface: "bg-detective-yellow-100 border-detective-yellow-300",
    badge: "bg-detective-yellow-400 text-detective-blue-900",
  },
  {
    emoji: "🎭",
    title: "Logos, names and mascots",
    description:
      "How pictures, words and friendly characters all help identify a business.",
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
  {
    emoji: "💡",
    title: "Creativity and innovation",
    description:
      "How new ideas are protected so inventors and creators can keep dreaming big.",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-600 text-white",
  },
];

/** "Why Learn About Trademarks?" four-card grid. */
export const whyLearnCards: InfoCardItem[] = [
  {
    emoji: "🛡️",
    title: "Protect Creativity",
    description: "Trademarks help protect the hard work behind every brand.",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    emoji: "💡",
    title: "Encourage Innovation",
    description: "Knowing ideas are protected inspires people to create more.",
    surface: "bg-detective-yellow-100 border-detective-yellow-300",
    badge: "bg-detective-yellow-400 text-detective-blue-900",
  },
  {
    emoji: "🛍️",
    title: "Recognise Trusted Brands",
    description: "Spotting familiar logos helps you find quality you can trust.",
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
  {
    emoji: "🌍",
    title: "Become Responsible Consumers",
    description: "Understanding brands helps you make smart, informed choices.",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-600 text-white",
  },
];

export type TimelineStep = {
  label: string;
  icon: AboutIconName;
};

export type AboutIconName =
  | "award"
  | "gamepad"
  | "graduation-cap"
  | "heart"
  | "lightbulb"
  | "puzzle"
  | "search"
  | "sprout"
  | "sparkles"
  | "trophy";

/** "Our Learning Method" step-by-step journey. */
export const learningTimeline: TimelineStep[] = [
  { label: "Learn", icon: "graduation-cap" },
  { label: "Play", icon: "gamepad" },
  { label: "Solve Detective Missions", icon: "search" },
  { label: "Earn Badges", icon: "award" },
  { label: "Become a BrandQuest Champion", icon: "trophy" },
];

export type ValueItem = {
  label: string;
  icon: AboutIconName;
};

/** Core values shown as animated chips. */
export const academyValues: ValueItem[] = [
  { label: "Fun", icon: "sparkles" },
  { label: "Creativity", icon: "lightbulb" },
  { label: "Learning", icon: "sprout" },
  { label: "Curiosity", icon: "puzzle" },
  { label: "Respect", icon: "heart" },
];
