export type ContactCard = { id: string; title: string; description: string; email: string; surface: string; badge: string; };
export const contactCard: ContactCard = {
  id: "general", title: "General Enquiries",
  description: "Have a question about IP2Kids, memberships, schools, partnerships or anything else? We'd love to hear from you.",
  email: "advocatebala.2010@gmail.com", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-500 text-white",
};
export type FaqItem = { id: string; question: string; answer: string };
export const faqItems: FaqItem[] = [
  { id: "ip2kids", question: "What is IP2Kids?", answer: "IP2Kids is an interactive learning adventure that introduces children to intellectual property through games, stories, mysteries and challenges." },
  { id: "learn", question: "What will my child learn?", answer: "Children explore trademarks, patents, copyright and designs using age-appropriate examples." },
  { id: "age", question: "What age is IP2Kids designed for?", answer: "IP2Kids is designed primarily for children aged 7–12." },
  { id: "certificate", question: "Does my child receive a certificate?", answer: "After completing the learning journey, children can receive a personalised Little IP Detective Certificate of Completion." },
  { id: "legal", question: "Is IP2Kids legal advice?", answer: "No. IP2Kids provides general educational information and is not legal advice." },
];
