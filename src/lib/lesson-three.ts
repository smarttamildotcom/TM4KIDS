/** Content for Lesson 3 — Logos. Kept separate so copy edits don't touch UI code. */

import type { QuizQuestion } from "@/lib/quiz/types";
import type { StoryScene } from "@/lib/story";
import type { Example } from "@/lib/examples";
import type { LogoPair } from "@/components/game/LogoMatchGame";

export const storyScenes: StoryScene[] = [
  {
    id: "museum-trip",
    chapter: "Chapter 1",
    title: "A trip to the Brand Museum",
    paragraphs: [
      "Detective, today you're visiting the Brand Museum, where famous companies show off their symbols.",
      "But as soon as you walk in, you notice something strange — every symbol looks like it belongs somewhere else!",
    ],
    imageLabel: "A museum hall full of mixed-up company symbols",
    emoji: "🏛️",
  },
  {
    id: "what-is-a-logo",
    chapter: "Chapter 2",
    title: "What is a logo?",
    paragraphs: [
      "A LOGO is a small picture or symbol that stands for a company — just like a name, but made of shapes and colours instead of words.",
      "You don't even need to read anything. One glance at the picture and you know exactly who it belongs to.",
    ],
    imageLabel: "A magnifying glass hovering over a simple symbol",
    emoji: "🔎",
    highlight: { text: "LOGO", tone: "pulse" },
    note: "Logo = a picture that says a company's name without using any words.",
  },
  {
    id: "why-logos",
    chapter: "Chapter 3",
    title: "Why do companies use logos?",
    paragraphs: [
      "Logos are fast! A shopper walking down a busy aisle doesn't have time to read every label.",
      "A bright, simple logo can be spotted in a split second — even from far away, even by someone who can't read yet.",
    ],
    imageLabel: "A child instantly spotting a logo on a busy shelf",
    emoji: "⚡",
    note: "A good logo is simple enough to recognise in the blink of an eye.",
  },
  {
    id: "recognise-by-logo",
    chapter: "Chapter 4",
    title: "Can you recognise a company just by its logo?",
    paragraphs: [
      "Try it yourself: a swoosh tick, a bitten apple, golden arches, a three-pointed star.",
      "Even without a single word, you probably already know every one of those companies. That's the power of a great logo!",
    ],
    imageLabel: "Four mystery symbols waiting to be identified",
    emoji: "🧩",
  },
  {
    id: "the-mixup",
    chapter: "Chapter 5",
    title: "Uh oh — the museum mixed them up!",
    paragraphs: [
      "The museum curator looks worried. \"Someone knocked over our display and now every logo is next to the wrong company name!\"",
      "Time to put on your detective hat and match every logo back to where it belongs.",
    ],
    imageLabel: "A worried museum curator next to a jumbled display",
    emoji: "🕵️",
  },
];

/** The mid-lesson "can you recognise it?" mission question. */
export const missionQuestion: QuizQuestion = {
  id: "recognise-by-logo",
  type: "true-false",
  prompt: "True or false?",
  statement:
    "You can recognise Nike just from its swoosh symbol, without reading any words.",
  correctAnswer: true,
  trueFeedback:
    "Correct, detective! That's exactly why companies design simple, memorable logos.",
  falseFeedback:
    "Actually it's true — most people recognise the Nike swoosh instantly, with no words needed.",
  explanation:
    "A strong logo can be recognised in an instant, even without any text at all.",
};

export const logoExamples: Example[] = [
  {
    emoji: "🍎",
    kind: "Apple",
    description: "A simple bitten apple shape that people recognise around the world.",
  },
  {
    emoji: "✔️",
    kind: "Nike",
    description: "A swoosh tick that means speed and sport, without a single letter.",
  },
  {
    emoji: "🍔",
    kind: "McDonald's",
    description: "Golden arches shaped like the letter M, spotted from the road.",
  },
  {
    emoji: "⭐",
    kind: "Mercedes-Benz",
    description: "A three-pointed star inside a circle, known on cars everywhere.",
  },
];

/** Pairs used by the Logo Match drag-and-drop game. */
export const logoMatchPairs: LogoPair[] = [
  { id: "apple", companyName: "Apple", emoji: "🍎" },
  { id: "nike", companyName: "Nike", emoji: "✔️" },
  { id: "mcdonalds", companyName: "McDonald's", emoji: "🍔" },
  { id: "mercedes", companyName: "Mercedes-Benz", emoji: "⭐" },
];

/** Final five-question quiz. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "What is a logo?",
    choices: [
      {
        id: "a",
        label: "A small picture or symbol that stands for a company.",
        isCorrect: true,
        feedback: "Correct! A logo is a picture version of a company's name.",
      },
      {
        id: "b",
        label: "A list of ingredients on a box.",
        isCorrect: false,
        feedback: "Ingredients tell you what's inside — not who made it.",
      },
      {
        id: "c",
        label: "The price of a product.",
        isCorrect: false,
        feedback: "A price tells you the cost, not the company.",
      },
    ],
  },
  {
    id: "q2",
    type: "true-false",
    prompt: "True or false?",
    statement: "Logos help people recognise a company quickly, without reading any words.",
    correctAnswer: true,
    trueFeedback: "Correct! That's the whole point of a great logo.",
    falseFeedback: "Actually it's true — logos are designed to be understood at a glance.",
  },
  {
    id: "q3",
    type: "image",
    prompt: "Which of these is the real Apple logo?",
    choices: [
      {
        id: "a",
        label: "A bitten apple",
        alt: "A simple apple shape with a bite taken out",
        emoji: "🍎",
        isCorrect: true,
        feedback: "Yes! The bitten apple is one of the most famous logos in the world.",
      },
      {
        id: "b",
        label: "A whole banana",
        alt: "A yellow banana",
        emoji: "🍌",
        isCorrect: false,
        feedback: "Nice try, but that's not Apple's logo!",
      },
      {
        id: "c",
        label: "A slice of pizza",
        alt: "A triangular slice of pizza",
        emoji: "🍕",
        isCorrect: false,
        feedback: "Tasty, but that's not a logo you'd find on a laptop!",
      },
    ],
  },
  {
    id: "q4",
    type: "multiple-choice",
    prompt: "Why do companies use logos instead of only using words?",
    choices: [
      {
        id: "a",
        label: "Pictures can be recognised faster than reading a whole word.",
        isCorrect: true,
        feedback: "Exactly! A logo can be spotted in an instant.",
      },
      {
        id: "b",
        label: "Because words are not allowed on products.",
        isCorrect: false,
        feedback: "That's not true — plenty of products use words too, like brand names.",
      },
      {
        id: "c",
        label: "Because logos are cheaper to print than letters.",
        isCorrect: false,
        feedback: "Cost isn't the reason — recognition and speed are!",
      },
    ],
  },
  {
    id: "q5",
    type: "multiple-choice",
    prompt: "What happened at the Brand Museum in the story?",
    choices: [
      {
        id: "a",
        label: "All the logos got mixed up with the wrong companies.",
        isCorrect: true,
        feedback: "That's right — and you helped match them back!",
      },
      {
        id: "b",
        label: "All the logos disappeared completely.",
        isCorrect: false,
        feedback: "Not quite — the logos were just mixed up, not missing.",
      },
      {
        id: "c",
        label: "The museum closed down forever.",
        isCorrect: false,
        feedback: "Not quite — the museum just needed a detective's help!",
      },
    ],
  },
];
