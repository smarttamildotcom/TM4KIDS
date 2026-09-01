"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, RefreshCw } from "lucide-react";
import { FeedbackBanner } from "@/components/quiz/FeedbackBanner";
import { MultipleChoiceView } from "@/components/quiz/views/MultipleChoiceView";
import { TrueFalseView } from "@/components/quiz/views/TrueFalseView";
import { ImageView } from "@/components/quiz/views/ImageView";
import { DragAndDropView } from "@/components/quiz/views/DragAndDropView";
import type { AnswerResult, QuizQuestion } from "@/lib/quiz/types";

type QuizQuestionCardProps = {
  question: QuizQuestion;
  /** Fires each time an answer is submitted. */
  onAnswer?: (result: AnswerResult) => void;
  /** Offer a "Try again" button after a wrong answer (practice mode). */
  allowRetry?: boolean;
  /** Optional label such as "Question 2 of 3". */
  counter?: string;
};

/**
 * Renders any single quiz question with feedback. Usable on its own for
 * in-lesson practice, and composed by <Quiz /> for scored runs.
 */
export function QuizQuestionCard({
  question,
  onAnswer,
  allowRetry = false,
  counter,
}: QuizQuestionCardProps) {
  const [result, setResult] = useState<AnswerResult | null>(null);
  /** Bumping this remounts the view so its internal selection resets. */
  const [attempt, setAttempt] = useState(0);

  function handleAnswer(answer: AnswerResult) {
    if (result) return;
    setResult(answer);
    onAnswer?.(answer);
  }

  const viewProps = { result, onAnswer: handleAnswer } as const;

  return (
    <motion.div
      animate={
        result && !result.isCorrect ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }
      }
      transition={{ duration: 0.4 }}
      className="rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8"
    >
      {counter && (
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-500">
          {counter}
        </p>
      )}

      <h3 className="mb-6 mt-2 flex items-start gap-3 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl">
        <HelpCircle
          aria-hidden="true"
          className="mt-1 h-6 w-6 shrink-0 text-detective-blue-500"
        />
        {question.prompt}
      </h3>

      <div key={attempt}>
        {question.type === "multiple-choice" && (
          <MultipleChoiceView question={question} {...viewProps} />
        )}
        {question.type === "true-false" && (
          <TrueFalseView question={question} {...viewProps} />
        )}
        {question.type === "image" && (
          <ImageView question={question} {...viewProps} />
        )}
        {question.type === "drag-and-drop" && (
          <DragAndDropView question={question} {...viewProps} />
        )}
      </div>

      <FeedbackBanner result={result} />

      {allowRetry && result && !result.isCorrect && (
        <button
          type="button"
          onClick={() => {
            setResult(null);
            setAttempt((current) => current + 1);
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-detective-blue-600 px-5 py-3 font-display font-semibold text-white transition-colors hover:bg-detective-blue-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      )}
    </motion.div>
  );
}
