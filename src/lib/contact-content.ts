export type ContactCard = { id: string; title: string; description: string; email: string; surface: string; badge: string; };
export const contactCard: ContactCard = {
  id: "general", title: "General Enquiries",
  description: "Have a question about IP2Kids, schools, books, partnerships or anything else? We'd love to hear from you.",
  email: "advocatebala.2010@gmail.com", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-500 text-white",
};
export type FaqItem = { id: string; question: string; answer: string };
export const faqItems: FaqItem[] = [
  { id: "ip2kids", question: "What is IP2Kids?", answer: "IP2Kids is a free educational initiative that gives children a playful introduction to intellectual property through short stories, questions, activities and Questy's Idea Adventures." },
  { id: "learn", question: "What will my child discover?", answer: "Children are introduced to ideas behind trademarks, patents, copyright and designs using simple, age-appropriate examples. The aim is curiosity, not legal or classroom instruction." },
  { id: "free", question: "Are the adventures free?", answer: "Yes. All 15 IP2Kids adventures are free to explore. An account is useful for saving progress, XP, badges and certificates." },
  { id: "age", question: "Who is IP2Kids for?", answer: "IP2Kids is designed for young minds. Children can read independently or use the Read to Me feature where available." },
  { id: "books", question: "Are there IP2Kids books?", answer: "The IP2Kids Book Corner is being developed to help children continue their adventure through reading. New book information will be added there as titles become available." },
  { id: "certificate", question: "Does my child receive a certificate?", answer: "Children who complete the learning journey can unlock an IP2Kids Idea Adventurer Certificate of Completion." },
  { id: "legal", question: "Is IP2Kids legal advice?", answer: "No. IP2Kids provides general educational information and is not legal advice or a substitute for formal legal or classroom instruction." },
];
