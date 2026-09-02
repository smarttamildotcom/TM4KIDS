import {
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  Gamepad2,
  GraduationCap,
  Heart,
  School,
  Search,
  Sparkles,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/** Small trait chips shown beside Questy in the "Meet Questy" section. */
export type QuestyTrait = {
  emoji: string;
  label: string;
};

export const questyTraits: QuestyTrait[] = [
  { emoji: "🥇", label: "Detective Badge" },
  { emoji: "⭐", label: "Gold Stars" },
  { emoji: "🐾", label: "Paw Prints" },
  { emoji: "💬", label: "Speech Bubble" },
  { emoji: "📓", label: "Notebook" },
];

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Mission = {
  id: number;
  title: string;
  badgeEmoji: string;
  difficulty: Difficulty;
  reward: string;
  /** Only real, playable levels have an href — the rest are "coming soon". */
  href?: string;
  isMilestone: boolean;
};

/** The 20-mission adventure map. Missions 1–5 link to real, playable levels. */
export const missions: Mission[] = [
  {
    id: 1,
    title: "What is a Trademark?",
    badgeEmoji: "🔍",
    difficulty: "Easy",
    reward: "+120 XP",
    href: "/levels/what-is-a-trademark",
    isMilestone: false,
  },
  {
    id: 2,
    title: "Brand Names",
    badgeEmoji: "🏷️",
    difficulty: "Easy",
    reward: "+100 XP",
    href: "/levels/brand-names",
    isMilestone: false,
  },
  {
    id: 3,
    title: "Logos",
    badgeEmoji: "🎨",
    difficulty: "Medium",
    reward: "+150 XP",
    href: "/levels/logos",
    isMilestone: false,
  },
  {
    id: 4,
    title: "Mascots",
    badgeEmoji: "🐻",
    difficulty: "Medium",
    reward: "+200 XP",
    href: "/levels/mascots",
    isMilestone: false,
  },
  {
    id: 5,
    title: "Become a BrandQuest Champion",
    badgeEmoji: "🏆",
    difficulty: "Hard",
    reward: "Certificate",
    href: "/levels/trademark-master",
    isMilestone: true,
  },
  { id: 6, title: "Trademark Hunt", badgeEmoji: "🧭", difficulty: "Easy", reward: "+50 XP", isMilestone: false },
  { id: 7, title: "Brand Puzzle", badgeEmoji: "🧩", difficulty: "Easy", reward: "+50 XP", isMilestone: false },
  { id: 8, title: "Sneaky Copycats", badgeEmoji: "🕵️", difficulty: "Medium", reward: "Gold Star", isMilestone: false },
  { id: 9, title: "Colour Code Mystery", badgeEmoji: "🎨", difficulty: "Medium", reward: "+80 XP", isMilestone: false },
  { id: 10, title: "The Fake Logo Case", badgeEmoji: "🗂️", difficulty: "Hard", reward: "Detective Badge", isMilestone: true },
  { id: 11, title: "Slogan Secrets", badgeEmoji: "💬", difficulty: "Easy", reward: "+60 XP", isMilestone: false },
  { id: 12, title: "Mascot Mayhem", badgeEmoji: "🦊", difficulty: "Medium", reward: "+90 XP", isMilestone: false },
  { id: 13, title: "Trademark vs Copyright", badgeEmoji: "⚖️", difficulty: "Medium", reward: "Gold Star", isMilestone: false },
  { id: 14, title: "Global Brand Chase", badgeEmoji: "🌍", difficulty: "Hard", reward: "+120 XP", isMilestone: false },
  { id: 15, title: "The Counterfeit Files", badgeEmoji: "🗃️", difficulty: "Hard", reward: "Detective Badge", isMilestone: true },
  { id: 16, title: "Packaging Puzzles", badgeEmoji: "📦", difficulty: "Medium", reward: "+90 XP", isMilestone: false },
  { id: 17, title: "Sound & Jingle Clues", badgeEmoji: "🎵", difficulty: "Medium", reward: "+90 XP", isMilestone: false },
  { id: 18, title: "Brand Protection Bureau", badgeEmoji: "🏛️", difficulty: "Hard", reward: "+150 XP", isMilestone: false },
  { id: 19, title: "The Final Clue", badgeEmoji: "🔦", difficulty: "Hard", reward: "+200 XP", isMilestone: false },
  { id: 20, title: "Master Brand Detective", badgeEmoji: "🎓", difficulty: "Hard", reward: "Champion Certificate", isMilestone: true },
];

export type WhyKidsLoveFeature = {
  emoji: string;
  title: string;
  description: string;
  icon: LucideIcon;
  surface: string;
  badge: string;
};

/** Four premium feature cards for "Why Kids Love Brand Quest". */
export const whyKidsLoveFeatures: WhyKidsLoveFeature[] = [
  {
    emoji: "🔍",
    title: "Become a Detective",
    description: "Solve fun mysteries in every mission.",
    icon: Search,
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    emoji: "⭐",
    title: "Earn Rewards",
    description: "Collect stars, badges and certificates.",
    icon: Star,
    surface: "bg-detective-yellow-100 border-detective-yellow-300",
    badge: "bg-detective-yellow-400 text-detective-blue-900",
  },
  {
    emoji: "🎮",
    title: "Learn Through Games",
    description: "No boring lessons — just playful adventures.",
    icon: Gamepad2,
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
  {
    emoji: "🏆",
    title: "Become a Brand Expert",
    description: "Finish all missions and earn your title.",
    icon: Trophy,
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-600 text-white",
  },
];

export type PointItem = {
  icon: LucideIcon;
  label: string;
};

export const parentPoints: PointItem[] = [
  { icon: Brain, label: "Encourages critical thinking" },
  { icon: Sparkles, label: "Builds creativity" },
  { icon: Heart, label: "Screen time with purpose" },
  { icon: BookOpen, label: "Easy self-learning" },
];

export const teacherPoints: PointItem[] = [
  { icon: ClipboardList, label: "Printable worksheets" },
  { icon: School, label: "Classroom activities" },
  { icon: BarChart3, label: "Progress tracking" },
  { icon: GraduationCap, label: "Ready-to-use lessons" },
];

export type Testimonial = {
  id: string;
  name: string;
  role: "Parent" | "Teacher";
  avatarEmoji: string;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "amara",
    name: "Amara K.",
    role: "Parent",
    avatarEmoji: "👩",
    review:
      "My daughter begs to do her 'detective missions' every evening. She now spots logos everywhere we go!",
  },
  {
    id: "daniel",
    name: "Daniel R.",
    role: "Teacher",
    avatarEmoji: "👨‍🏫",
    review:
      "The printable worksheets made this the easiest classroom activity I've set up all year.",
  },
  {
    id: "priya",
    name: "Priya S.",
    role: "Parent",
    avatarEmoji: "👩‍🦱",
    review:
      "Finally, screen time I feel good about. He's learning real business ideas without even noticing.",
  },
  {
    id: "michael",
    name: "Michael O.",
    role: "Teacher",
    avatarEmoji: "🧑‍🏫",
    review:
      "Progress tracking helps me see exactly who needs support. My students love earning certificates.",
  },
  {
    id: "grace",
    name: "Grace T.",
    role: "Parent",
    avatarEmoji: "👩‍🦰",
    review:
      "Questy is adorable and the missions are genuinely fun — my twins fight over whose turn it is!",
  },
  {
    id: "samuel",
    name: "Samuel A.",
    role: "Teacher",
    avatarEmoji: "👨‍🦱",
    review:
      "A perfect ready-to-use lesson for teaching brand awareness. Kids are engaged from mission one.",
  },
];

export type PricingPlan = {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaLabel: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Try the first missions for free.",
    features: ["Missions 1–2", "Basic badges", "1 detective profile"],
    isPopular: false,
    ctaLabel: "Start Free",
  },
  {
    id: "explorer",
    name: "Explorer",
    monthlyPrice: 9,
    yearlyPrice: 79,
    description: "Everything a young detective needs.",
    features: [
      "All 20 missions",
      "Stars, badges & certificates",
      "3 detective profiles",
      "Progress dashboard",
    ],
    isPopular: true,
    ctaLabel: "Join Explorer",
  },
  {
    id: "detective-club",
    name: "Detective Club",
    monthlyPrice: 15,
    yearlyPrice: 129,
    description: "For families and small classrooms.",
    features: [
      "Everything in Explorer",
      "Printable worksheets",
      "Up to 6 detective profiles",
      "Priority support",
    ],
    isPopular: false,
    ctaLabel: "Join Detective Club",
  },
];

export type HomeFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const homeFaqItems: HomeFaqItem[] = [
  {
    id: "age",
    question: "What age is Brand Quest for?",
    answer: "Brand Quest is designed for young detectives aged 7–12, with content that grows with your child.",
  },
  {
    id: "missions",
    question: "How many missions are included?",
    answer: "There are 20 missions in the adventure map, each unlocking new badges, stars and detective ranks.",
  },
  {
    id: "teachers",
    question: "Can teachers use it?",
    answer: "Yes! Teachers can use printable worksheets, classroom activities and progress tracking with the Detective Club plan.",
  },
  {
    id: "siblings",
    question: "Can siblings share an account?",
    answer: "Each plan supports multiple detective profiles, so siblings can track their own missions and rewards separately.",
  },
  {
    id: "duration",
    question: "How long does each mission take?",
    answer: "Most missions take 10–15 minutes — perfect for a quick after-school adventure.",
  },
];
