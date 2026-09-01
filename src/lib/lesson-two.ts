/** Content for Lesson 2 — Brand Names. Kept separate so copy edits don't touch UI code. */

import type { QuizQuestion } from "@/lib/quiz/types";
import type { StoryScene } from "@/lib/story";
import type { Example } from "@/lib/examples";

export const storyScenes: StoryScene[] = [
  {
    id: "tom-juice",
    chapter: "Chapter 1",
    title: "Tom starts selling fruit juice",
    paragraphs: [
      "Tom is trying something new. He squeezes fresh oranges and mangoes into bright, tasty juice.",
      "He pours it into plain bottles and sets up a little stand at the park.",
    ],
    imageLabel: "Tom at a juice stand with plain, unlabelled bottles",
    emoji: "🧃",
  },
  {
    id: "no-name",
    chapter: "Chapter 2",
    title: "But the bottles have no name",
    paragraphs: [
      "The juice is delicious! Kids drink it all up and come back the next week.",
      "But there is a problem — the bottles have no writing on them at all. Nobody can remember whose juice it was!",
    ],
    imageLabel: "Confused children holding plain juice bottles",
    emoji: "🤔",
    note: "Without a name, even a delicious product can get lost or forgotten.",
  },
  {
    id: "friends-idea",
    chapter: "Chapter 3",
    title: "A friend has an idea",
    paragraphs: [
      "Tom's friend Priya watches the mix-up and smiles.",
      "“Let's give your juice a special name,” she says, “so everyone remembers exactly what to ask for!”",
    ],
    imageLabel: "Priya suggesting an idea to Tom, both smiling",
    emoji: "💡",
  },
  {
    id: "sunny-splash",
    chapter: "Chapter 4",
    title: "Tom picks the perfect name",
    paragraphs: [
      "Tom thinks about how his juice makes people feel — bright, happy, and refreshed.",
      "He writes a name on every bottle:",
    ],
    imageLabel: "A juice bottle with a bold new label",
    emoji: "☀️",
    highlight: { text: "Sunny Splash", tone: "reveal" },
  },
  {
    id: "brand-name-explained",
    chapter: "Chapter 5",
    title: "That's called a Brand Name!",
    paragraphs: [
      "A BRAND NAME is the special name a company gives its product so people can recognise and remember it.",
      "Now, whenever a child wants Tom's juice, they simply ask for “Sunny Splash” — and everyone knows exactly what they mean.",
    ],
    imageLabel: "Happy customers asking for Sunny Splash by name",
    emoji: "🔎",
    highlight: { text: "BRAND NAME", tone: "pulse" },
    note: "Brand Name = the special name that helps people recognise a product.",
  },
];

/** The mid-lesson "help Tom choose" mission question. */
export const missionQuestion: QuizQuestion = {
  id: "help-tom-choose",
  type: "multiple-choice",
  prompt: "Detective mission: which name should Tom choose for his juice?",
  choices: [
    {
      id: "a",
      label: "Sunny Splash",
      isCorrect: true,
      feedback:
        "Great choice, detective! “Sunny Splash” is short, fun and easy to remember — perfect for a brand name.",
    },
    {
      id: "b",
      label: "Juice Bottle Number 5",
      isCorrect: false,
      feedback:
        "Not quite — that name is hard to remember and doesn't sound exciting at all.",
    },
    {
      id: "c",
      label: "Tom's Thing",
      isCorrect: false,
      feedback:
        "Close, but “Thing” doesn't tell anyone what makes the juice special.",
    },
  ],
};

export const brandNameExamples: Example[] = [
  {
    emoji: "👟",
    kind: "Nike",
    description: "A short, punchy name found on trainers and sports gear worldwide.",
  },
  {
    emoji: "🧱",
    kind: "LEGO",
    description: "A fun name that instantly makes kids think of colourful building bricks.",
  },
  {
    emoji: "🥛",
    kind: "Milo",
    description: "A friendly, easy-to-say name for a chocolatey malt drink.",
  },
  {
    emoji: "🍪",
    kind: "Oreo",
    description: "A catchy name that makes a chocolate cookie easy to ask for.",
  },
];

export type NamingChallenge = {
  id: string;
  productLabel: string;
  productEmoji: string;
  suggestions: string[];
};

/** The "invent a brand name" activity: four nameless products, three starter ideas each. */
export const namingChallenges: NamingChallenge[] = [
  {
    id: "ice-cream",
    productLabel: "Ice Cream",
    productEmoji: "🍦",
    suggestions: ["Frosty Fun", "Cool Cone", "Snow Pop"],
  },
  {
    id: "toy-robot",
    productLabel: "Toy Robot",
    productEmoji: "🤖",
    suggestions: ["Bolt Buddy", "Robo Pal", "Metal Marvel"],
  },
  {
    id: "sports-shoes",
    productLabel: "Sports Shoes",
    productEmoji: "👟",
    suggestions: ["Speed Stride", "Zoom Step", "Flash Feet"],
  },
  {
    id: "backpack",
    productLabel: "Backpack",
    productEmoji: "🎒",
    suggestions: ["Trail Buddy", "Pack Pal", "Adventure Bag"],
  },
];

/** Final five-question quiz. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "What is a brand name?",
    choices: [
      {
        id: "a",
        label: "The special name a company gives its product.",
        isCorrect: true,
        feedback: "Correct! A brand name helps everyone recognise a product.",
      },
      {
        id: "b",
        label: "The price written on a bottle.",
        isCorrect: false,
        feedback: "A price tells you the cost, not the name of the product.",
      },
      {
        id: "c",
        label: "The shape of a bottle.",
        isCorrect: false,
        feedback: "Shapes can help too, but they aren't the brand name itself.",
      },
    ],
  },
  {
    id: "q2",
    type: "true-false",
    prompt: "True or false?",
    statement: "Tom's friend suggested giving the juice a name so people could remember it.",
    correctAnswer: true,
    trueFeedback: "Correct! Priya's idea helped everyone remember Tom's juice.",
    falseFeedback: "Actually it's true — that's exactly what happened in the story.",
  },
  {
    id: "q3",
    type: "multiple-choice",
    prompt: "Why do companies use brand names?",
    choices: [
      {
        id: "a",
        label: "So customers can recognise and remember their products.",
        isCorrect: true,
        feedback: "Exactly! A good brand name sticks in your memory.",
      },
      {
        id: "b",
        label: "To make the product cost more to make.",
        isCorrect: false,
        feedback: "A name doesn't change how much something costs to make.",
      },
      {
        id: "c",
        label: "Because the law requires every product to rhyme.",
        isCorrect: false,
        feedback: "Nice try, but brand names don't need to rhyme!",
      },
    ],
  },
  {
    id: "q4",
    type: "image",
    prompt: "Which of these is a real, famous brand name?",
    choices: [
      {
        id: "a",
        label: "LEGO",
        alt: "Colourful toy building bricks",
        emoji: "🧱",
        isCorrect: true,
        feedback: "Yes! LEGO is a world-famous brand name for building bricks.",
      },
      {
        id: "b",
        label: "Random Brick Company 12",
        alt: "A plain grey box",
        emoji: "📦",
        isCorrect: false,
        feedback: "That name is too long and forgettable to be a strong brand name.",
      },
      {
        id: "c",
        label: "Thing You Play With",
        alt: "A question mark",
        emoji: "❓",
        isCorrect: false,
        feedback: "That doesn't tell anyone what the product actually is.",
      },
    ],
  },
  {
    id: "q5",
    type: "multiple-choice",
    prompt: "What did Tom finally name his juice?",
    choices: [
      {
        id: "a",
        label: "Sunny Splash",
        isCorrect: true,
        feedback: "That's right — Sunny Splash was the perfect fit!",
      },
      {
        id: "b",
        label: "Orange Water",
        isCorrect: false,
        feedback: "Not quite — that's not the name Tom chose in the story.",
      },
      {
        id: "c",
        label: "Fruit Mix 9000",
        isCorrect: false,
        feedback: "Not quite — that's not the name Tom chose in the story.",
      },
    ],
  },
];
