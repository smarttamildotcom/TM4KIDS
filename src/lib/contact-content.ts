export type ContactCard = {
  id: string;
  title: string;
  description: string;
  email: string;
  icon: "mail" | "building" | "support";
  surface: string;
  badge: string;
};

/** The four contact cards shown on the Contact page. */
export const contactCards: ContactCard[] = [
  {
    id: "general",
    title: "General Enquiries",
    description: "Questions about BrandQuest Kids, lessons or anything else.",
    email: "hello@brandquestkids.example",
    icon: "mail",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    id: "schools",
    title: "School Partnerships",
    description: "Bring BrandQuest Kids into your classroom or school library.",
    email: "schools@brandquestkids.example",
    icon: "building",
    surface: "bg-detective-yellow-100 border-detective-yellow-300",
    badge: "bg-detective-yellow-400 text-detective-blue-900",
  },
  {
    id: "support",
    title: "Technical Support",
    description: "Trouble with the site, your dashboard or your progress.",
    email: "support@brandquestkids.example",
    icon: "support",
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "register",
    question: "How do I register?",
    answer:
      "Just visit the homepage and tap “Start Adventure”. Your detective profile is created automatically, and your progress is saved right in your browser.",
  },
  {
    id: "free",
    question: "Is the website free?",
    answer:
      "Yes! Every lesson, game and quiz in BrandQuest Kids is completely free to use.",
  },
  {
    id: "schools",
    question: "Can schools use this?",
    answer:
      "Absolutely. Teachers can use BrandQuest Kids as a classroom activity or homework resource — reach out through School Partnerships and we'll help you get started.",
  },
  {
    id: "certificates",
    question: "How do I earn certificates?",
    answer:
      "Complete lessons and quizzes to earn XP and badges. Finishing your first lesson and completing every level unlocks printable certificates on your dashboard.",
  },
];

export type SocialLink = {
  id: string;
  label: string;
  /** Placeholder href until real social profiles are ready. */
  href: string;
  icon: "facebook" | "instagram" | "youtube" | "linkedin";
};

export const socialLinks: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "#", icon: "facebook" },
  { id: "instagram", label: "Instagram", href: "#", icon: "instagram" },
  { id: "youtube", label: "YouTube", href: "#", icon: "youtube" },
  { id: "linkedin", label: "LinkedIn", href: "#", icon: "linkedin" },
];
