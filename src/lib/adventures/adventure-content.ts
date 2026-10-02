export type AdventureQuestion = {
  prompt: string;
  options: string[];
  correct: number;
  feedback: string;
};

export type AdventureScene = {
  title: string;
  text: string;
  art: string;
  image?: { landscape: string; portrait: string };
};

export type AdventureContent = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  scenes: AdventureScene[];
  questions: AdventureQuestion[];
  discovery: { title: string; body: string }[];
  miniMission: { title: string; body: string };
  missionPrompt: string;
  missionChoices: { label: string; emoji: string }[];
  missionCorrect: number[];
  reward: string;
  caseFile: string[];
};

import { adventurePart1 } from "./adventure-part-1";
import { adventurePart2 } from "./adventure-part-2";
import { adventurePart3 } from "./adventure-part-3";
import { adventurePart4 } from "./adventure-part-4";
import { adventurePart5 } from "./adventure-part-5";

export const adventureContent: AdventureContent[] = [
  ...adventurePart1,
  ...adventurePart2,
  ...adventurePart3,
  ...adventurePart4,
  ...adventurePart5,
];

export const ultimateIpChallenge: AdventureQuestion[] = [
  {
    "prompt": "Mia draws her own picture of Questy. Who is the creator of the picture?",
    "options": ["The shop", "Mia", "The paper", "Nobody"],
    "correct": 1,
    "feedback": "Correct! Mia made the picture, so she is the creator."
  },
  {
    "prompt": "Sam writes his own story. Someone copies the whole story and puts a different name on it. Which IP idea should Questy explore first?",
    "options": ["Patent", "Trademark", "Copyright", "Design"],
    "correct": 2,
    "feedback": "Correct! Copyright is the IP idea connected with original creative works such as stories."
  },
  {
    "prompt": "Which of these is most closely connected with copyright?",
    "options": ["An original drawing", "A shop name", "A new machine", "A product shape"],
    "correct": 0,
    "feedback": "Yes! An original drawing is a creative work."
  },
  {
    "prompt": "Mia wants customers to recognise her cupcake shop. Which clue would help most?",
    "options": ["The weather", "A distinctive shop name and logo", "Her shoe size", "The time of day"],
    "correct": 1,
    "feedback": "Exactly! Names and logos can help people recognise a brand."
  },
  {
    "prompt": "Two fictional shops have very similar names and logos, and customers think they are connected. Which IP idea should Questy explore first?",
    "options": ["Copyright", "Patent", "Trademark", "Design"],
    "correct": 2,
    "feedback": "Correct! Trademarks are connected with brand signs that help customers recognise a brand or business."
  },
  {
    "prompt": "Ben creates a new machine that picks up toys from the floor. Which IP idea may be relevant to the invention?",
    "options": ["Patent", "Copyright", "Trademark", "Slogan"],
    "correct": 0,
    "feedback": "Correct! Some inventions can be protected by patents if they meet the rules."
  },
  {
    "prompt": "What should an inventor do when the first model does not work well?",
    "options": ["Copy a brand logo", "Test it and improve it", "Pretend it works", "Change the shop name"],
    "correct": 1,
    "feedback": "Yes! Inventors often test, learn and improve their solutions."
  },
  {
    "prompt": "Three lamps all give light, but each has a very different shape and pattern. Which IP idea is about how the product looks?",
    "options": ["Trademark", "Patent", "Copyright", "Design"],
    "correct": 3,
    "feedback": "Correct! Design protection can be connected with a product's appearance."
  },
  {
    "prompt": "Which choice is mainly about how a backpack LOOKS?",
    "options": ["Its special zigzag pocket shape", "A new locking mechanism inside it", "The shop that sells it", "The story printed in a book"],
    "correct": 0,
    "feedback": "Correct! The pocket shape is part of the backpack's visual appearance."
  },
  {
    "prompt": "Questy's new story gadget has an original story, a brand name, a new mechanism and a special outer shape. What does this teach us?",
    "options": ["Only one type of IP can ever be involved", "Different parts can involve different IP ideas", "Everything is automatically patented", "Brands and stories are the same thing"],
    "correct": 1,
    "feedback": "Amazing! One product can involve different IP ideas in different features."
  }
];
