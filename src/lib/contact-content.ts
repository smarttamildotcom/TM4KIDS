export type ContactCard = { id: string; title: string; description: string; email: string; kind: "general" | "school"; surface: string; badge: string; };

export const contactCards: ContactCard[] = [
  {
    id: "general",
    title: "General Enquiries",
    description: "Questions about IP2Kids, the Adventures or Book Corner? We'd love to hear from you.",
    email: "advocatebala.2010@gmail.com",
    kind: "general",
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    id: "schools",
    title: "Schools & Educators",
    description: "For educational use, school programmes, collaborations and partnership enquiries.",
    email: "advocatebala.2010@gmail.com",
    kind: "school",
    surface: "bg-detective-yellow-50 border-detective-yellow-200",
    badge: "bg-detective-orange-500 text-white",
  },
];

export type FaqItem = { id: string; question: string; answer: string };
export const faqItems: FaqItem[] = [
  {
    id: "ip2kids",
    question: "What is IP2Kids?",
    answer: "IP2Kids is a free educational initiative that gives primary-school children a friendly first introduction to intellectual property through short adventure passages, simple clue questions and Questy's discoveries.",
  },
  {
    id: "schools",
    question: "Is IP2Kids suitable for schools?",
    answer: "Yes. IP2Kids is designed as an introductory educational resource that can support conversations about creativity, ideas, brands, inventions and designs. It is not a substitute for formal classroom or legal instruction.",
  },
  {
    id: "age",
    question: "What age group is IP2Kids designed for?",
    answer: "IP2Kids is designed primarily for primary-school children. The language is intentionally simple, and children can read independently or use the Read to Me option in the Adventures.",
  },
  {
    id: "educators",
    question: "How can educators use IP2Kids?",
    answer: "Educators can use the Adventures as a simple starting point for discussions about creativity and intellectual property, then extend the learning with books, classroom activities or their own teaching materials.",
  },
];
