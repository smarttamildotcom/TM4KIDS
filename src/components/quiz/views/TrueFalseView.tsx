"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { OptionButton, resolveOptionState } from "@/components/quiz/OptionButton";
import type { QuestionViewProps, TrueFalseQuestion } from "@/lib/quiz/types";

/** Two big thumbs-up / thumbs-down buttons. */
export function TrueFalseView({
  question,
  result,
  onAnswer,
}: QuestionViewProps<TrueFalseQuestion>) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const isAnswered = result !== null;

  const options = [
    { value: true, label: "True", icon: ThumbsUp },
    { value: false, label: "False", icon: ThumbsDown },
  ];

  return (
    <>
      <p className="mb-5 rounded-2xl bg-detective-blue-50 px-5 py-4 text-lg font-medium text-detective-blue-900">
        “{question.statement}”
      </p>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isCorrectChoice = option.value === question.correctAnswer;

          return (
            <OptionButton
              key={option.label}
              layout="tile"
              state={resolveOptionState(
                isAnswered,
                isCorrectChoice,
                option.value === selected,
              )}
              disabled={isAnswered}
              isSelected={option.value === selected}
              onClick={() => {
                setSelected(option.value);
                onAnswer({
                  isCorrect: isCorrectChoice,
                  feedback:
                    (option.value
                      ? question.trueFeedback
                      : question.falseFeedback) ?? question.explanation,
                });
              }}
            >
              <Icon
                aria-hidden="true"
                className="h-10 w-10 text-detective-blue-600"
              />
              <span className="font-display text-xl font-bold">{option.label}</span>
            </OptionButton>
          );
        })}
      </div>
    </>
  );
}
