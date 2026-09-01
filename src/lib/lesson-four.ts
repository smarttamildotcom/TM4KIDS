/** Content for Lesson 4 — Mascots. Kept separate so copy edits don't touch UI code. */

import type { QuizQuestion } from "@/lib/quiz/types";
import type { StoryScene } from "@/lib/story";
import type { Example } from "@/lib/examples";
import type { LogoPair } from "@/components/game/LogoMatchGame";

export const storyScenes: StoryScene[] = [
  {
    id: "convention",
    chapter: "Chapter 1",
    title: "Welcome to the Brand Heroes Convention",
    paragraphs: [
      "Detective, today you're backstage at a giant convention where friendly cartoon characters from famous brands meet their fans.",
      "But when you arrive, every character is standing in the wrong spot, and nobody remembers which company they belong to!",
    ],
    imageLabel: "A convention hall full of cartoon brand characters",
    emoji: "🎪",
  },
  {
    id: "what-is-a-mascot",
    chapter: "Chapter 2",
    title: "What is a mascot?",
    paragraphs: [
      "A MASCOT is a friendly character — often an animal or a fun cartoon person — that represents a company.",
      "Mascots smile, wave and tell a little story about the brand, so people feel happy and welcome.",
    ],
    imageLabel: "A cheerful cartoon character waving hello",
    emoji: "🐯",
    highlight: { text: "MASCOT", tone: "pulse" },
    note: "Mascot = a friendly character that stands for a company.",
  },
  {
    id: "why-mascots",
    chapter: "Chapter 3",
    title: "Why do brands create mascots?",
    paragraphs: [
      "Words and logos are great, but a fun character is easy to love — especially for kids!",
      "A good mascot makes a brand feel friendly, memorable and fun to talk about with friends.",
    ],
    imageLabel: "Children laughing and pointing at a mascot",
    emoji: "😄",
    note: "A great mascot makes a brand feel like a friend, not just a company.",
  },
  {
    id: "meet-the-heroes",
    chapter: "Chapter 4",
    title: "Meet a few brand heroes",
    paragraphs: [
      "A round tyre-shaped man, a bold tiger, a cool cheetah, a smiling clown — you've probably met a few brand heroes without even realising it!",
      "Every one of them was created to make a company easy to remember and fun to like.",
    ],
    imageLabel: "A line-up of friendly cartoon brand mascots",
    emoji: "🧸",
  },
  {
    id: "mixed-up-heroes",
    chapter: "Chapter 5",
    title: "Uh oh — the heroes are mixed up!",
    paragraphs: [
      "The convention organiser looks worried. \"The name tags fell off backstage — nobody knows which mascot belongs to which company!\"",
      "Put on your detective hat and help every brand hero find its way home.",
    ],
    imageLabel: "A worried organiser next to mixed-up name tags",
    emoji: "🕵️",
  },
];

/** The mid-lesson mission question. */
export const missionQuestion: QuizQuestion = {
  id: "why-mascots",
  type: "multiple-choice",
  prompt: "Why do brands create mascots?",
  choices: [
    {
      id: "a",
      label: "To make the brand feel friendly and fun to remember.",
      isCorrect: true,
      feedback: "Correct, detective! A likeable mascot makes a brand easy to love.",
    },
    {
      id: "b",
      label: "So the company doesn't need a name anymore.",
      isCorrect: false,
      feedback: "Not quite — brands still use their name and logo alongside a mascot.",
    },
    {
      id: "c",
      label: "Because every company is required to have one.",
      isCorrect: false,
      feedback: "Not quite — mascots are a fun choice, not a rule!",
    },
  ],
};

export const mascotExamples: Example[] = [
  {
    emoji: "🛞",
    kind: "Michelin Man",
    description: "A friendly character made of stacked white tyres.",
  },
  {
    emoji: "🐯",
    kind: "Tony the Tiger",
    description: "A bold, smiling tiger who says breakfast cereal is \"Grrreat!\"",
  },
  {
    emoji: "🐆",
    kind: "Chester Cheetah",
    description: "A cool, sunglasses-wearing cheetah who loves cheesy snacks.",
  },
  {
    emoji: "🤡",
    kind: "Ronald McDonald",
    description: "A cheerful clown character who welcomes families to eat together.",
  },
];

/** Pairs used by the reused Logo Match game — this time, matching mascots to brands. */
export const mascotMatchPairs: LogoPair[] = [
  { id: "michelin", companyName: "Michelin", emoji: "🛞" },
  { id: "tony", companyName: "Frosted Cereal Co.", emoji: "🐯" },
  { id: "chester", companyName: "Cheesy Snacks Co.", emoji: "🐆" },
  { id: "ronald", companyName: "Burger Restaurant", emoji: "🤡" },
];

/** Final five-question quiz. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "What is a mascot?",
    choices: [
      {
        id: "a",
        label: "A friendly character that represents a company.",
        isCorrect: true,
        feedback: "Correct! A mascot gives a brand a fun, friendly face.",
      },
      {
        id: "b",
        label: "The price tag on a product.",
        isCorrect: false,
        feedback: "A price tag tells you the cost, not the company's character.",
      },
      {
        id: "c",
        label: "A secret code only employees know.",
        isCorrect: false,
        feedback: "Mascots are meant to be seen and loved by everyone, not kept secret.",
      },
    ],
  },
  {
    id: "q2",
    type: "true-false",
    prompt: "True or false?",
    statement: "Mascots help make a brand feel friendly and fun to remember.",
    correctAnswer: true,
    trueFeedback: "Correct! That's exactly why companies create mascots.",
    falseFeedback: "Actually it's true — a good mascot makes people smile and remember the brand.",
  },
  {
    id: "q3",
    type: "image",
    prompt: "Which of these is a famous cereal mascot?",
    choices: [
      {
        id: "a",
        label: "Tony the Tiger",
        alt: "A smiling cartoon tiger",
        emoji: "🐯",
        isCorrect: true,
        feedback: "Yes! Tony the Tiger is a well-known cereal mascot.",
      },
      {
        id: "b",
        label: "A plain spoon",
        alt: "A simple metal spoon",
        emoji: "🥄",
        isCorrect: false,
        feedback: "A spoon is useful for breakfast, but it isn't a mascot!",
      },
      {
        id: "c",
        label: "A calculator",
        alt: "A small calculator",
        emoji: "🧮",
        isCorrect: false,
        feedback: "Nice try, but that's not a mascot at all.",
      },
    ],
  },
  {
    id: "q4",
    type: "multiple-choice",
    prompt: "What happened at the Brand Heroes Convention in the story?",
    choices: [
      {
        id: "a",
        label: "The name tags fell off and the mascots got mixed up.",
        isCorrect: true,
        feedback: "That's right — and you helped match them back!",
      },
      {
        id: "b",
        label: "All the mascots went home early.",
        isCorrect: false,
        feedback: "Not quite — they were all still there, just mixed up.",
      },
      {
        id: "c",
        label: "The convention was cancelled.",
        isCorrect: false,
        feedback: "Not quite — the show went on, once you solved the mix-up!",
      },
    ],
  },
  {
    id: "q5",
    type: "multiple-choice",
    prompt: "Which of these is usually true about a good mascot?",
    choices: [
      {
        id: "a",
        label: "It is friendly, memorable and easy to recognise.",
        isCorrect: true,
        feedback: "Exactly! Those qualities make a mascot successful.",
      },
      {
        id: "b",
        label: "It changes its look every single day.",
        isCorrect: false,
        feedback: "Actually, mascots usually keep a consistent look so people remember them.",
      },
      {
        id: "c",
        label: "It never appears in advertisements.",
        isCorrect: false,
        feedback: "Mascots usually appear often, in ads, packaging and more!",
      },
    ],
  },
];
