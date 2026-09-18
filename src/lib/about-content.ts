export type AboutCard = {
  emoji: string;
  title: string;
  statement: string;
  description: string;
  surface: string;
};

export const whyIpMatters: AboutCard[] = [
  { emoji: "🎨", title: "Creativity", statement: "My creations matter.", description: "Children create stories, drawings, music, games and other original works. Learning about IP helps them recognise that creativity has value and appreciate their own work.", surface: "bg-detective-blue-50 border-detective-blue-200" },
  { emoji: "💡", title: "Innovation", statement: "I can solve problems.", description: "Learning about inventions encourages children to notice problems, imagine solutions and think about how new products and technologies are created.", surface: "bg-detective-yellow-100 border-detective-yellow-300" },
  { emoji: "❤️", title: "Respect", statement: "Other people's creations matter too.", description: "Stories, drawings, music, photographs and videos are made by real people. Using someone else's work responsibly matters.", surface: "bg-detective-orange-100 border-detective-orange-300" },
  { emoji: "™️", title: "Brands", statement: "Why do I recognise this?", description: "Names, logos, symbols and packaging are everywhere. Children discover how brands help us recognise where products and services come from.", surface: "bg-sky-50 border-sky-200" },
  { emoji: "✨", title: "Design", statement: "How something looks can matter.", description: "From toys and bottles to furniture and gadgets, children discover that creativity can shape the appearance of everyday products.", surface: "bg-violet-50 border-violet-200" },
  { emoji: "🚀", title: "Future Thinking", statement: "My creation could become something bigger.", description: "A drawing can become a character. An invention can become a product. A name can become a brand.", surface: "bg-emerald-50 border-emerald-200" },
];

export const everydayIp = [
  { emoji: "™️", clue: "BRAND NAME / LOGO", kind: "Trademark", description: "A distinctive identity clue for a business or product." },
  { emoji: "💡", clue: "NEW INVENTION", kind: "Patent", description: "A technical solution that may qualify for patent protection." },
  { emoji: "©️", clue: "STORY / DRAWING / MUSIC", kind: "Copyright", description: "Original creative work that may be protected by copyright." },
  { emoji: "✨", clue: "PRODUCT APPEARANCE", kind: "Design", description: "Visual features of a product that may qualify for design protection." },
];

export const creatorQuestions = [
  "Who created this?",
  "What makes it original?",
  "How could I improve it?",
  "How should I respect someone else's creation?",
  "How could I protect something I create?",
];

export const learningPromise = [
  { title: "CREATE", description: "Encourage imagination, curiosity and original thinking.", tone: "bg-detective-orange-500 text-white" },
  { title: "UNDERSTAND", description: "Discover how brands, inventions, designs and creative works connect with IP.", tone: "bg-detective-blue-600 text-white" },
  { title: "RESPECT", description: "Recognise and appreciate the creativity and work of others.", tone: "bg-detective-yellow-400 text-detective-blue-900" },
  { title: "PROTECT", description: "Build a basic understanding that different creations may be protected in different ways.", tone: "bg-violet-600 text-white" },
];

export const fourBigIdeas = [
  { emoji: "™️", title: "Trademarks", description: "Protect distinctive brand identities such as names, logos and other signs.", tone: "border-detective-blue-200 bg-detective-blue-50" },
  { emoji: "💡", title: "Patents", description: "Protect qualifying inventions and technical solutions.", tone: "border-detective-yellow-300 bg-detective-yellow-100" },
  { emoji: "©️", title: "Copyright", description: "Protect qualifying original creative works such as stories, drawings, music, photographs and videos.", tone: "border-detective-orange-300 bg-detective-orange-100" },
  { emoji: "✨", title: "Designs", description: "Protect qualifying visual features of products — how they look rather than how they work.", tone: "border-violet-200 bg-violet-50" },
];
