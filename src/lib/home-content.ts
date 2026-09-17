import type { QuestyIconName } from "@/components/illustrations/QuestyIcon";

export type QuestyTrait = { icon: QuestyIconName; label: string };
export const questyTraits: QuestyTrait[] = [
  { icon: "badge", label: "IP Detective Badge" }, { icon: "star", label: "Gold Stars" }, { icon: "paw", label: "Paw Prints" }, { icon: "magnifier", label: "Magnifying Glass" }, { icon: "notebook", label: "Casebook" },
];

export type WhyKidsLoveFeature = { emoji: string; title: string; description: string; surface: string; badge: string; };
export const whyKidsLoveFeatures: WhyKidsLoveFeature[] = [
  { emoji: "🔍", title: "Fun Detective Missions", description: "Solve mysteries, find clues and complete exciting challenges with Questy.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-500 text-white" },
  { emoji: "🌍", title: "15 Interactive Worlds", description: "Travel through 15 worlds filled with brands, inventions, creativity and designs.", surface: "bg-detective-yellow-100 border-detective-yellow-300", badge: "bg-detective-yellow-400 text-detective-blue-900" },
  { emoji: "⭐", title: "Earn Points & Badges", description: "Complete missions, earn points and collect IP Detective badges along the way.", surface: "bg-detective-orange-100 border-detective-orange-400", badge: "bg-detective-orange-500 text-white" },
  { emoji: "🎨", title: "Create & Discover", description: "Design brands, imagine inventions and explore your own creativity.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-600 text-white" },
  { emoji: "🎮", title: "Learn Through Play", description: "Games, puzzles and challenges make learning about intellectual property easy and fun.", surface: "bg-detective-yellow-100 border-detective-yellow-300", badge: "bg-detective-yellow-400 text-detective-blue-900" },
  { emoji: "🏆", title: "Become an IP Detective", description: "Complete the adventure and earn your Little IP Detective Certificate of Completion.", surface: "bg-detective-orange-100 border-detective-orange-400", badge: "bg-detective-orange-500 text-white" },
];

export type HomeFaqItem = { id: string; question: string; answer: string };
export const homeFaqItems: HomeFaqItem[] = [
  { id: "what", question: "What is IP2Kids?", answer: "IP2Kids is an interactive learning adventure designed to introduce children to intellectual property through games, stories, mysteries and challenges." },
  { id: "learn", question: "What will my child learn?", answer: "Children are introduced to four important areas of intellectual property: trademarks, patents, copyright and designs." },
  { id: "age", question: "What age is IP2Kids designed for?", answer: "IP2Kids is designed primarily for children aged 7–12." },
  { id: "worlds", question: "How many Worlds are there?", answer: "There are 15 interactive Worlds. Children progress from basic IP concepts to trademark, patent, copyright and design challenges before the Great IP Mystery and graduation." },
  { id: "questy", question: "Who is Questy?", answer: "Questy is the friendly detective mascot who guides children through their IP2Kids adventure." },
  { id: "start", question: "Does my child need to know anything before starting?", answer: "No. IP2Kids starts with simple concepts and introduces each topic step by step." },
  { id: "types", question: "What types of intellectual property are covered?", answer: "The adventure introduces trademarks, patents, copyright and designs using simple, age-appropriate examples." },
  { id: "course", question: "Is IP2Kids a school course?", answer: "IP2Kids is an educational learning experience. It is not an accredited academic course." },
  { id: "certificate", question: "Does my child receive a certificate?", answer: "Yes. After completing the learning journey, children can receive a personalised Little IP Detective Certificate of Completion." },
  { id: "safe", question: "Are the activities suitable for children?", answer: "Yes. Content is designed for ages 7–12 and uses child-friendly fictional examples, games and detective activities." },
  { id: "legal", question: "Is IP2Kids legal advice?", answer: "No. IP2Kids provides general educational information and is not legal advice." },
  { id: "brands", question: "Do children learn using real brands?", answer: "IP2Kids primarily uses fictional examples and child-friendly scenarios to explain intellectual property concepts." },
];
