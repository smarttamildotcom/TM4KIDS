"use client";

import { useState } from "react";
import { OptionButton, resolveOptionState } from "@/components/quiz/OptionButton";
import type {
  MultipleChoiceQuestion,
  QuestionViewProps,
} from "@/lib/quiz/types";

/** Classic A/B/C list of text answers. */
export function MultipleChoiceView({
  question,
  result,
  onAnswer,
}: QuestionViewProps<MultipleChoiceQuestion>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isAnswered = result !== null;

  return (
    <ul className="space-y-3">
      {question.choices.map((choice, index) => (
        <li key={choice.id}>
          <OptionButton
            state={resolveOptionState(
              isAnswered,
              choice.isCorrect,
              choice.id === selectedId,
            )}
            disabled={isAnswered}
            isSelected={choice.id === selectedId}
            onClick={() => {
              setSelectedId(choice.id);
              onAnswer({
                isCorrect: choice.isCorrect,
                feedback: choice.feedback ?? question.explanation,
              });
            }}
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white font-display font-bold text-detective-blue-700 shadow-sm"
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="grow">{choice.label}</span>
          </OptionButton>
        </li>
      ))}
    </ul>
  );
}
