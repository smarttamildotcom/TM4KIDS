import type { QuestyIconName } from "@/components/illustrations/QuestyIcon";

export type QuestyTrait = { icon: QuestyIconName; label: string };
export const questyTraits: QuestyTrait[] = [
  { icon: "notebook", label: "Playful Stories" }, { icon: "magnifier", label: "Curious Questions" }, { icon: "paw", label: "Questy Guides You" }, { icon: "star", label: "Creative Discoveries" }, { icon: "badge", label: "Idea Adventures" },
];

export type WhyKidsLoveFeature = { emoji: string; title: string; description: string; surface: string; badge: string; };
export const whyKidsLoveFeatures: WhyKidsLoveFeature[] = [
  { emoji: "📖", title: "Fun Idea Adventures", description: "Meet Questy, explore playful stories and discover why ideas can be special.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-500 text-white" },
  { emoji: "🌍", title: "15 Interactive Adventures", description: "Travel through creativity, brands, inventions, stories and designs with Questy.", surface: "bg-detective-yellow-100 border-detective-yellow-300", badge: "bg-detective-yellow-400 text-detective-blue-900" },
  { emoji: "🔎", title: "Ask & Discover", description: "Answer child-friendly questions, spot clues and discover a new idea in every adventure.", surface: "bg-detective-orange-100 border-detective-orange-400", badge: "bg-detective-orange-500 text-white" },
  { emoji: "🎨", title: "Create & Imagine", description: "Design brands, imagine inventions and explore your own creativity.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-600 text-white" },
  { emoji: "🧩", title: "Learn Through Play", description: "Stories, puzzles and creative activities make intellectual property easier to discover.", surface: "bg-detective-yellow-100 border-detective-yellow-300", badge: "bg-detective-yellow-400 text-detective-blue-900" },
  { emoji: "🏆", title: "The Big Idea Festival", description: "Finish the journey by using everything you discovered across Idea City.", surface: "bg-detective-orange-100 border-detective-orange-400", badge: "bg-detective-orange-500 text-white" },
];

export type HomeFaqItem = { id: string; question: string; answer: string };
export const homeFaqItems: HomeFaqItem[] = [
  { id: "what", question: "What is IP2Kids?", answer: "IP2Kids is a playful introduction to intellectual property. Questy's Idea Adventures uses stories, questions and creative activities to spark children's curiosity about ideas." },
  { id: "learn", question: "What will my child discover?", answer: "Children are introduced to creativity, brands, inventions, copyright and designs through simple, child-friendly adventures." },
  { id: "age", question: "Who is IP2Kids designed for?", answer: "IP2Kids is designed for young learners, especially primary-school children, with simple language and playful examples." },
  { id: "adventures", question: "How many Idea Adventures are there?", answer: "There are 15 interactive Idea Adventures that introduce children to different parts of the world of ideas." },
  { id: "questy", question: "Who is Questy?", answer: "Questy is the friendly IP2Kids mascot who guides children through every Idea Adventure." },
  { id: "start", question: "Does my child need to know anything before starting?", answer: "No. Questy's Idea Adventures starts with familiar everyday ideas and introduces new concepts step by step." },
  { id: "types", question: "What types of intellectual property are introduced?", answer: "The adventures introduce trademarks, patents, copyright and designs using simple fictional examples." },
  { id: "course", question: "Is IP2Kids a school course?", answer: "No. IP2Kids is an introductory educational experience intended to spark curiosity and encourage further reading and learning." },
  { id: "completion", question: "What happens after the final Adventure?", answer: "Children finish at the Big Idea Festival, where they use the main ideas they discovered throughout Idea City." },
  { id: "safe", question: "Are the activities suitable for children?", answer: "Yes. Content uses age-appropriate fictional examples, stories, questions and creative activities." },
  { id: "legal", question: "Is IP2Kids legal advice?", answer: "No. IP2Kids provides general educational information and is not legal advice." },
  { id: "brands", question: "Do children learn using real brands?", answer: "IP2Kids primarily uses fictional examples so children can focus on the ideas without copying real brands." },
];
