import {
  Award,
  Brain,
  Gamepad2,
  Search,
  Sparkles,
  Shapes,
  Tag,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  emoji: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the card's tinted surface. */
  surface: string;
  /** Tailwind classes for the icon badge. */
  badge: string;
};

export const features: Feature[] = [
  {
    emoji: "🕵️",
    title: "Learn",
    description: "Interactive lessons",
    icon: Search,
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    emoji: "🎮",
    title: "Play",
    description: "Fun games",
    icon: Gamepad2,
    surface: "bg-detective-yellow-100 border-detective-yellow-300",
    badge: "bg-detective-yellow-400 text-detective-blue-900",
  },
  {
    emoji: "🏆",
    title: "Earn",
    description: "Badges and certificates",
    icon: Award,
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
  {
    emoji: "🧠",
    title: "Quiz",
    description: "Test your knowledge",
    icon: Brain,
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-600 text-white",
  },
];

export type Level = {
  id: number;
  label: string;
  title: string;
  blurb: string;
  href: string;
  icon: LucideIcon;
  /** Tailwind gradient for the level number badge. */
  accent: string;
};

export const levels: Level[] = [
  {
    id: 1,
    label: "Level 1",
    title: "What is a Trademark?",
    blurb: "Discover the secret signs that tell you who made something.",
    href: "/levels/what-is-a-trademark",
    icon: Search,
    accent: "from-detective-blue-500 to-detective-blue-700",
  },
  {
    id: 2,
    label: "Level 2",
    title: "Brand Names",
    blurb: "Find out why a name can be a company's biggest treasure.",
    href: "/levels/brand-names",
    icon: Tag,
    accent: "from-detective-yellow-400 to-detective-orange-500",
  },
  {
    id: 3,
    label: "Level 3",
    title: "Logos",
    blurb: "Train your eyes to spot logos hiding all around you.",
    href: "/levels/logos",
    icon: Shapes,
    accent: "from-detective-orange-400 to-detective-orange-600",
  },
  {
    id: 4,
    label: "Level 4",
    title: "Mascots",
    blurb: "Meet the friendly characters that guard famous brands.",
    href: "/levels/mascots",
    icon: Sparkles,
    accent: "from-detective-blue-400 to-detective-blue-600",
  },
  {
    id: 5,
    label: "Level 5",
    title: "Become a BrandQuest Champion",
    blurb: "Solve the final case and earn your BrandQuest certificate.",
    href: "/levels/trademark-master",
    icon: Trophy,
    accent: "from-detective-yellow-500 to-detective-orange-600",
  },
];

export const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];
