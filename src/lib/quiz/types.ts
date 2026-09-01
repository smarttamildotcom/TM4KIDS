/**
 * Shared quiz model. Every lesson describes its questions with these types,
 * so the same <Quiz /> component can render any lesson's content.
 */

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "image"
  | "drag-and-drop";

type QuestionBase = {
  id: string;
  prompt: string;
  /** Shown once the question has been answered, whatever the outcome. */
  explanation?: string;
};

export type Choice = {
  id: string;
  label: string;
  isCorrect: boolean;
  /** Optional per-choice feedback; falls back to the question explanation. */
  feedback?: string;
};

export type ImageChoice = Choice & {
  /** Emoji stand-in used until real artwork is added. */
  emoji?: string;
  /** Path to real artwork; takes priority over the emoji. */
  imageSrc?: string;
  /** Required alternative text for screen readers. */
  alt: string;
};

export type MultipleChoiceQuestion = QuestionBase & {
  type: "multiple-choice";
  choices: Choice[];
};

export type TrueFalseQuestion = QuestionBase & {
  type: "true-false";
  statement: string;
  correctAnswer: boolean;
  trueFeedback?: string;
  falseFeedback?: string;
};

export type ImageQuestion = QuestionBase & {
  type: "image";
  choices: ImageChoice[];
};

export type DragDropPair = {
  id: string;
  itemLabel: string;
  itemEmoji?: string;
  targetLabel: string;
};

/**
 * Placeholder variant: real pointer dragging is not wired up yet, so the
 * component falls back to an accessible tap-to-match interaction.
 */
export type DragAndDropQuestion = QuestionBase & {
  type: "drag-and-drop";
  instructions: string;
  pairs: DragDropPair[];
};

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ImageQuestion
  | DragAndDropQuestion;

/** Outcome of answering a single question. */
export type AnswerResult = {
  isCorrect: boolean;
  feedback?: string;
};

/** Props shared by every question renderer. */
export type QuestionViewProps<Q extends QuizQuestion> = {
  question: Q;
  /** `null` while the question is still unanswered. */
  result: AnswerResult | null;
  onAnswer: (result: AnswerResult) => void;
};

/** Summary handed to `onComplete` when a quiz finishes. */
export type QuizResult = {
  correct: number;
  total: number;
  percent: number;
  stars: number;
};
