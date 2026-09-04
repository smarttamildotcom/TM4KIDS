export type ContactCard = {
  id: string;
  title: string;
  description: string;
  email: string;
  surface: string;
  badge: string;
};

/** The single "General Enquiries" contact card shown on the Contact page. */
// TODO: Replace this placeholder email with the production contact address later.
export const contactCard: ContactCard = {
  id: "general",
  title: "General Enquiries",
  description:
    "Have a question about Brand Quest, memberships, schools, partnerships or anything else? We'd love to hear from you.",
  email: "advocatebala.2010@gmail.com",
  surface: "bg-detective-blue-50 border-detective-blue-200",
  badge: "bg-detective-blue-500 text-white",
};

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
      "Just visit the homepage and tap “Start Adventure”. It takes you straight to the 15-world Journey map, and your progress is saved right in your browser.",
  },
  {
    id: "free",
    question: "Is the website free?",
    answer:
      "Yes! Every lesson, game and quiz in Brand Quest is completely free to use.",
  },
  {
    id: "schools",
    question: "Can schools use this?",
    answer:
      "Absolutely. Teachers can use Brand Quest as a classroom activity or homework resource — reach out through School Partnerships and we'll help you get started.",
  },
  {
    id: "certificates",
    question: "How do I earn certificates?",
    answer:
      "Complete lessons and quizzes to earn XP and badges. Finishing your first lesson and completing every level unlocks printable certificates on your dashboard.",
  },
];
