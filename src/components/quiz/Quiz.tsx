"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { QuizQuestionCard } from "@/components/quiz/QuizQuestionCard";
import { QuizResults } from "@/components/quiz/QuizResults";
import { buildQuizResult } from "@/lib/quiz/scoring";
import type { AnswerResult, QuizQuestion, QuizResult } from "@/lib/quiz/types";

type QuizProps = {
  questions: QuizQuestion[];
  /** Called once when the final question has been answered. */
  onComplete?: (result: QuizResult) => void;
  /** Reward artwork (badge, certificate…) shown above the score. */
  reward?: (result: QuizResult) => ReactNode;
  /** Extra actions on the results screen, e.g. a link to the next lesson. */
  resultActions?: ReactNode;
};

/**
 * Reusable, lesson-agnostic quiz runner: one question at a time, animated
 * transitions, then a score-and-stars summary.
 */
export function Quiz({
  questions,
  onComplete,
  reward,
  resultActions,
}: QuizProps) {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);
  /** Bumping this remounts every card so a replay starts fresh. */
  const [attempt, setAttempt] = useState(0);

  const question = questions[step];
  const isLast = step === questions.length - 1;
  const progress = Math.round((step / questions.length) * 100);

  function handleAnswer(result: AnswerResult) {
    setAnswered(true);
    if (result.isCorrect) setCorrect((current) => current + 1);
  }

  function handleNext() {
    setAnswered(false);

    if (!isLast) {
      setStep((current) => current + 1);
      return;
    }

    const result = buildQuizResult(correct, questions.length);
    setFinalResult(result);
    onComplete?.(result);
  }

  function handleReplay() {
    setStep(0);
    setCorrect(0);
    setAnswered(false);
    setFinalResult(null);
    setAttempt((current) => current + 1);
  }

  if (finalResult) {
    return (
      <QuizResults
        result={finalResult}
        onReplay={handleReplay}
        actions={resultActions}
      >
        {reward?.(finalResult)}
      </QuizResults>
    );
  }

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Quiz progress"
        className="mb-6 h-3 w-full overflow-hidden rounded-full bg-detective-blue-100"
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-detective-yellow-400 to-detective-orange-500"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${attempt}-${question.id}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3 }}
        >
          <QuizQuestionCard
            question={question}
            counter={`Question ${step + 1} of ${questions.length}`}
            onAnswer={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>

      {answered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-end"
        >
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
          >
            {isLast ? "See my score" : "Next question"}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
