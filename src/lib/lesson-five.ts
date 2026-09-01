/** Content for Lesson 5 — Become a BrandQuest Champion. Kept separate from UI code. */

import type { QuizQuestion } from "@/lib/quiz/types";
import type { StoryScene } from "@/lib/story";

export const storyScenes: StoryScene[] = [
  {
    id: "detective-city",
    chapter: "Final Case",
    title: "Trouble in Detective City",
    paragraphs: [
      "An urgent message arrives at headquarters: someone has been copying famous brands all over Detective City!",
      "Fake names, fake logos and fake mascots are popping up everywhere, confusing shoppers all over town.",
    ],
    imageLabel: "Detective City with copied brands popping up everywhere",
    emoji: "🏙️",
  },
  {
    id: "five-cases",
    chapter: "Final Case",
    title: "Five cases. One detective. You.",
    paragraphs: [
      "You've learned everything a Little Brand Detective needs to know — trademarks, brand names, logos and mascots.",
      "Now it's time to prove it. Solve all five cases to become a certified Little Brand Detective.",
    ],
    imageLabel: "A detective case file with five folders lined up",
    emoji: "🗂️",
    highlight: { text: "FIVE CASES", tone: "pulse" },
    note: "Every solved case earns you XP. Solve them all to unlock your certificate!",
  },
];

export type FinalCase =
  | {
      id: string;
      caseNumber: number;
      title: string;
      type: "question";
      question: QuizQuestion;
    }
  | {
      id: string;
      caseNumber: number;
      title: string;
      type: "creative";
      instructions: string;
    };

/** The five detective cases that make up the final challenge. */
export const finalCases: FinalCase[] = [
  {
    id: "find-the-trademark",
    caseNumber: 1,
    title: "Find the trademark",
    type: "question",
    question: {
      id: "case-1",
      type: "image",
      prompt: "Case 1: which of these is a trademark?",
      choices: [
        {
          id: "a",
          label: "Sunny Splash",
          alt: "A juice bottle with a brand name written on it",
          emoji: "🧃",
          isCorrect: true,
          feedback: "Correct! A brand name like “Sunny Splash” is a trademark.",
        },
        {
          id: "b",
          label: "A price tag",
          alt: "A plain price tag",
          emoji: "🏷️",
          isCorrect: false,
          feedback: "A price tells you the cost, not who made the product.",
        },
        {
          id: "c",
          label: "A shopping list",
          alt: "A handwritten shopping list",
          emoji: "📝",
          isCorrect: false,
          feedback: "A shopping list doesn't identify a company at all.",
        },
      ],
    },
  },
  {
    id: "choose-the-logo",
    caseNumber: 2,
    title: "Choose the correct logo",
    type: "question",
    question: {
      id: "case-2",
      type: "image",
      prompt: "Case 2: which logo belongs to a sports shoe company?",
      choices: [
        {
          id: "a",
          label: "A swoosh tick",
          alt: "A simple swoosh tick symbol",
          emoji: "✔️",
          isCorrect: true,
          feedback: "Correct! A swoosh tick is a famous sports logo.",
        },
        {
          id: "b",
          label: "A slice of cake",
          alt: "A slice of birthday cake",
          emoji: "🍰",
          isCorrect: false,
          feedback: "Tasty, but that's not a logo for sports shoes!",
        },
        {
          id: "c",
          label: "A cloud",
          alt: "A simple cloud shape",
          emoji: "☁️",
          isCorrect: false,
          feedback: "A cloud doesn't represent a sports shoe company.",
        },
      ],
    },
  },
  {
    id: "best-brand-name",
    caseNumber: 3,
    title: "Choose the best brand name",
    type: "question",
    question: {
      id: "case-3",
      type: "multiple-choice",
      prompt: "Case 3: which is the best brand name for a new toy robot?",
      choices: [
        {
          id: "a",
          label: "Bolt Buddy",
          isCorrect: true,
          feedback: "Correct! Short, fun and easy to remember.",
        },
        {
          id: "b",
          label: "Product Number 4471",
          isCorrect: false,
          feedback: "That's hard to remember and doesn't sound fun at all.",
        },
        {
          id: "c",
          label: "The Item",
          isCorrect: false,
          feedback: "That name doesn't tell anyone anything special about the toy.",
        },
      ],
    },
  },
  {
    id: "identify-the-mascot",
    caseNumber: 4,
    title: "Identify the mascot",
    type: "question",
    question: {
      id: "case-4",
      type: "image",
      prompt: "Case 4: which of these is a brand mascot?",
      choices: [
        {
          id: "a",
          label: "A smiling cartoon tiger",
          alt: "A smiling cartoon tiger character",
          emoji: "🐯",
          isCorrect: true,
          feedback: "Yes! A friendly character like this is a classic mascot.",
        },
        {
          id: "b",
          label: "A parking sign",
          alt: "A plain parking sign",
          emoji: "🅿️",
          isCorrect: false,
          feedback: "A parking sign gives directions, not brand personality.",
        },
        {
          id: "c",
          label: "A weather forecast",
          alt: "A simple sun and cloud weather icon",
          emoji: "🌤️",
          isCorrect: false,
          feedback: "That's useful for the weather, but it isn't a mascot!",
        },
      ],
    },
  },
  {
    id: "create-your-brand",
    caseNumber: 5,
    title: "Create your own brand",
    type: "creative",
    instructions:
      "Every great detective can also build a brand. Give your new brand a name, a symbol and a colour to finish your very last case.",
  },
];
