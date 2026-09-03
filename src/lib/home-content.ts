import type { QuestyIconName } from "@/components/illustrations/QuestyIcon";
import type { QuestyMood } from "@/components/illustrations/QuestyExpression";

/** Small trait chips shown beside Questy in the "Meet Questy" section. */
export type QuestyTrait = {
  icon: QuestyIconName;
  label: string;
};

export const questyTraits: QuestyTrait[] = [
  { icon: "badge", label: "Detective Badge" },
  { icon: "star", label: "Gold Stars" },
  { icon: "paw", label: "Paw Prints" },
  { icon: "magnifier", label: "Magnifying Glass" },
  { icon: "notebook", label: "Notebook" },
];

export type WhyKidsLoveFeature = {
  emoji: string;
  title: string;
  description: string;
  /** Questy face shown on the card. */
  mood: QuestyMood;
  surface: string;
  badge: string;
};

/** Four premium feature cards for "Why Kids Love Brand Quest". */
export const whyKidsLoveFeatures: WhyKidsLoveFeature[] = [
  {
    emoji: "🔍",
    title: "Become a Detective",
    description: "Solve fun mysteries in every mission.",
    mood: "thinking",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    emoji: "⭐",
    title: "Earn Rewards",
    description: "Collect stars, badges and certificates.",
    mood: "excited",
    surface: "bg-detective-yellow-100 border-detective-yellow-300",
    badge: "bg-detective-yellow-400 text-detective-blue-900",
  },
  {
    emoji: "🎮",
    title: "Learn Through Games",
    description: "No boring lessons — just playful adventures.",
    mood: "happy",
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
  {
    emoji: "🏆",
    title: "Become a Brand Expert",
    description: "Finish all missions and earn your title.",
    mood: "cool",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-600 text-white",
  },
];

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Questy face shown beside the question. */
  mood?: QuestyMood;
};

export const homeFaqItems: HomeFaqItem[] = [
  {
    id: "age",
    question: "What age is Brand Quest for?",
    answer: "Brand Quest is designed for young detectives aged 7–12, with content that grows with your child.",
    mood: "happy",
  },
  {
    id: "missions",
    question: "How many missions are included?",
    answer: "There are 15 worlds in the adventure map, each unlocking new badges, stars and detective ranks.",
    mood: "thinking",
  },
  {
    id: "teachers",
    question: "Can teachers use it?",
    answer: "Yes! Teachers can use Brand Quest for classroom activities and progress tracking, with every world ready to use in a lesson.",
  },
  {
    id: "siblings",
    question: "Can siblings share an account?",
    answer: "Yes — each detective has their own profile, so siblings can track their own worlds and rewards separately.",
  },
  {
    id: "duration",
    question: "How long does each mission take?",
    answer: "Most missions take 10–15 minutes — perfect for a quick after-school adventure.",
    mood: "excited",
  },
];
