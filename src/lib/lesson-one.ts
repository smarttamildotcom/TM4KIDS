/** Content for Lesson 1 — kept separate so the copy can be edited without touching UI code. */

import type { QuizQuestion } from "@/lib/quiz/types";
import type { StoryScene } from "@/lib/story";
import type { Example } from "@/lib/examples";

export const storyScenes: StoryScene[] = [
  {
    id: "tom-bakes",
    chapter: "Chapter 1",
    title: "Tom bakes delicious cookies",
    paragraphs: [
      "Tom has a tiny bakery on the corner of Maple Street.",
      "Every morning he mixes butter, sugar and lots of chocolate chips, and bakes the crunchiest cookies in town.",
    ],
    imageLabel: "Tom pulling a tray of cookies out of the oven",
    emoji: "👨‍🍳",
  },
  {
    id: "people-love-them",
    chapter: "Chapter 2",
    title: "People love them!",
    paragraphs: [
      "Soon the line outside Tom's bakery goes all the way around the block.",
      "But there is a problem. When people tell their friends about the cookies, they just say “those crunchy cookies”. Nobody knows which bakery they mean!",
    ],
    imageLabel: "A long queue of happy customers outside the bakery",
    emoji: "🧑‍🤝‍🧑",
  },
  {
    id: "the-name",
    chapter: "Chapter 3",
    title: "Tom gives them a name",
    paragraphs: [
      "Tom thinks hard. Then he grabs a pen and writes a name on his cookie box:",
      "Now everybody knows exactly which cookies they love. The name helps people recognise Tom's cookies — and nobody else's.",
    ],
    imageLabel: "A cookie box with a bright hand-lettered name on it",
    emoji: "🍪",
    note: "A name is like a cookie's fingerprint. It tells you who made it.",
    highlight: { text: "Tom's Crunch Cookies", tone: "reveal" },
  },
  {
    id: "trademark",
    chapter: "Chapter 4",
    title: "That special name has a special word",
    paragraphs: [
      "A name, logo or mascot that shows who made something is called a TRADEMARK.",
      "“Tom's Crunch Cookies” is Tom's trademark. It belongs to Tom, just like your name belongs to you.",
    ],
    imageLabel: "A magnifying glass zooming in on the word TRADEMARK",
    emoji: "🔎",
    note: "Trademark = a name, logo or mascot that says “I made this!”",
    highlight: { text: "TRADEMARK", tone: "pulse" },
  },
  {
    id: "the-copycat",
    chapter: "Chapter 5",
    title: "Uh oh… a copycat!",
    paragraphs: [
      "One day, a baker across town starts selling burnt, soggy cookies in a box that also says “Tom's Crunch Cookies”.",
      "Shoppers buy them, take one bite and think Tom's cookies have gone bad. Time to put on your detective hat!",
    ],
    imageLabel: "A sneaky baker copying Tom's cookie box design",
    emoji: "🕵️",
  },
];

/** The mid-lesson "what would happen?" question. */
export const copycatQuestion: QuizQuestion = {
  id: "copycat",
  type: "multiple-choice",
  prompt: "What would happen if another person also used “Tom's Crunch Cookies”?",
  choices: [
    {
      id: "a",
      label: "Nothing at all — names are free for everyone.",
      isCorrect: false,
      feedback:
        "Not quite! A trademark belongs to the person who uses it first. Others can't just borrow it.",
    },
    {
      id: "b",
      label: "People would get confused and might blame Tom for bad cookies.",
      isCorrect: true,
      feedback:
        "Exactly, detective! Copying a trademark confuses shoppers and can hurt the real owner's good name.",
    },
    {
      id: "c",
      label: "Tom would have to invent a brand new name.",
      isCorrect: false,
      feedback:
        "Nope! Tom used the name first, so the law protects him — the copycat is the one who must stop.",
    },
  ],
};

/** Final three-question quiz. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "What is a trademark?",
    choices: [
      {
        id: "a",
        label: "A name, logo or mascot that shows who made something.",
        isCorrect: true,
        feedback: "Spot on! That's exactly what a trademark does.",
      },
      {
        id: "b",
        label: "A secret recipe kept in a safe.",
        isCorrect: false,
        feedback:
          "That's a trade secret — close, but a trademark is the name or logo everyone can see.",
      },
      {
        id: "c",
        label: "A price sticker on a cookie box.",
        isCorrect: false,
        feedback: "A price tells you the cost, not who made the cookies.",
      },
    ],
  },
  {
    id: "q2",
    type: "true-false",
    prompt: "True or false?",
    statement:
      "Tom gave his cookies a name so that people could recognise them and ask for them.",
    correctAnswer: true,
    trueFeedback: "Correct! Names help customers find exactly what they love.",
    falseFeedback:
      "Actually it's true — without a name, nobody could tell Tom's cookies apart.",
  },
  {
    id: "q3",
    type: "image",
    prompt: "Which of these can be a trademark?",
    choices: [
      {
        id: "a",
        label: "A price tag",
        alt: "A price tag showing a number",
        emoji: "🏷️",
        isCorrect: false,
        feedback: "A price tells you the cost, not who made something.",
      },
      {
        id: "b",
        label: "A mascot",
        alt: "A friendly tiger mascot",
        emoji: "🐯",
        isCorrect: true,
        feedback: "Brilliant! Mascots, names and logos can all be trademarks.",
      },
      {
        id: "c",
        label: "A shopping trolley",
        alt: "A supermarket shopping trolley",
        emoji: "🛒",
        isCorrect: false,
        feedback: "Trolleys carry the shopping — they don't say who made it.",
      },
    ],
  },
];

/** Real-world style examples of the three trademark types. */
export const examples: Example[] = [
  {
    emoji: "🔤",
    kind: "A name",
    description:
      "Like “Tom's Crunch Cookies” on the box — words you can read out loud.",
  },
  {
    emoji: "⭐",
    kind: "A logo",
    description:
      "A picture or shape, like a swoosh on trainers or a bitten apple on a laptop.",
  },
  {
    emoji: "🐯",
    kind: "A mascot",
    description:
      "A friendly character on a cereal box who greets you from the shelf.",
  },
];
