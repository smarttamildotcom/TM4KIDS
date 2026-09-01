"use client";

import Image from "next/image";
import { useState } from "react";
import { OptionButton, resolveOptionState } from "@/components/quiz/OptionButton";
import type { ImageQuestion, QuestionViewProps } from "@/lib/quiz/types";

/** Picture answers shown as a grid of tappable tiles. */
export function ImageView({
  question,
  result,
  onAnswer,
}: QuestionViewProps<ImageQuestion>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isAnswered = result !== null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {question.choices.map((choice) => (
        <li key={choice.id}>
          <OptionButton
            layout="tile"
            state={resolveOptionState(
              isAnswered,
              choice.isCorrect,
              choice.id === selectedId,
            )}
            disabled={isAnswered}
            isSelected={choice.id === selectedId}
            ariaLabel={choice.alt}
            onClick={() => {
              setSelectedId(choice.id);
              onAnswer({
                isCorrect: choice.isCorrect,
                feedback: choice.feedback ?? question.explanation,
              });
            }}
          >
            <span className="grid aspect-square w-full place-items-center overflow-hidden rounded-xl bg-white">
              {choice.imageSrc ? (
                <Image
                  src={choice.imageSrc}
                  alt=""
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span aria-hidden="true" className="text-5xl">
                  {choice.emoji}
                </span>
              )}
            </span>
            <span className="font-display font-semibold">{choice.label}</span>
          </OptionButton>
        </li>
      ))}
    </ul>
  );
}
