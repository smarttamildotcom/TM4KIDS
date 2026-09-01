"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Construction, Undo2 } from "lucide-react";
import type { DragAndDropQuestion, QuestionViewProps } from "@/lib/quiz/types";

/**
 * Placeholder for the drag-and-drop question type. Real pointer dragging is
 * not implemented yet, so this offers an accessible tap-to-match fallback that
 * still scores correctly.
 */
export function DragAndDropView({
  question,
  result,
  onAnswer,
}: QuestionViewProps<DragAndDropQuestion>) {
  const [heldItemId, setHeldItemId] = useState<string | null>(null);
  /** Maps target pair id -> the item pair id dropped on it. */
  const [placements, setPlacements] = useState<Record<string, string>>({});

  const isAnswered = result !== null;
  const placedItemIds = Object.values(placements);

  function handleDrop(targetId: string) {
    if (!heldItemId || isAnswered) return;

    const nextPlacements = { ...placements, [targetId]: heldItemId };
    setPlacements(nextPlacements);
    setHeldItemId(null);

    if (Object.keys(nextPlacements).length === question.pairs.length) {
      const allMatched = question.pairs.every(
        (pair) => nextPlacements[pair.id] === pair.id,
      );
      onAnswer({
        isCorrect: allMatched,
        feedback: allMatched
          ? question.explanation ?? "Every match is spot on. Nice work!"
          : "Not all of those match up. Tap Try again to have another go.",
      });
    }
  }

  return (
    <div>
      <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 text-sm font-semibold text-detective-orange-600">
        <Construction className="h-4 w-4" aria-hidden="true" />
        Drag &amp; drop coming soon — tap to match for now
      </p>

      <p className="mb-4 font-medium text-detective-blue-700/85">
        {question.instructions}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
            Pick one
          </h4>
          <ul className="space-y-2">
            {question.pairs.map((pair) => {
              const isPlaced = placedItemIds.includes(pair.id);
              const isHeld = heldItemId === pair.id;

              return (
                <li key={pair.id}>
                  <motion.button
                    type="button"
                    disabled={isPlaced || isAnswered}
                    onClick={() => setHeldItemId(isHeld ? null : pair.id)}
                    aria-pressed={isHeld}
                    whileHover={isPlaced ? undefined : { scale: 1.02 }}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-medium transition-colors disabled:opacity-40 ${
                      isHeld
                        ? "border-detective-orange-500 bg-detective-orange-100"
                        : "border-detective-blue-100 bg-detective-blue-50/50 hover:border-detective-blue-400"
                    }`}
                  >
                    {pair.itemEmoji && (
                      <span aria-hidden="true" className="text-2xl">
                        {pair.itemEmoji}
                      </span>
                    )}
                    {pair.itemLabel}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
            Drop it here
          </h4>
          <ul className="space-y-2">
            {question.pairs.map((pair) => {
              const placedId = placements[pair.id];
              const placedPair = question.pairs.find((p) => p.id === placedId);
              const isRight = isAnswered && placedId === pair.id;
              const isWrong = isAnswered && placedId !== pair.id;

              return (
                <li key={pair.id}>
                  <button
                    type="button"
                    disabled={isAnswered || (!heldItemId && !placedId)}
                    onClick={() => handleDrop(pair.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed px-4 py-3 text-left font-medium transition-colors ${
                      isRight
                        ? "border-green-500 bg-green-50"
                        : isWrong
                          ? "border-detective-orange-500 bg-detective-orange-100"
                          : "border-detective-blue-200 bg-white hover:border-detective-blue-400"
                    }`}
                  >
                    <span>{pair.targetLabel}</span>
                    <span className="font-display text-sm font-semibold text-detective-blue-700">
                      {placedPair ? placedPair.itemLabel : "—"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {!isAnswered && Object.keys(placements).length > 0 && (
        <button
          type="button"
          onClick={() => setPlacements({})}
          className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 px-4 py-2 font-display text-sm font-semibold text-detective-blue-700 hover:bg-detective-blue-50"
        >
          <Undo2 className="h-4 w-4" aria-hidden="true" />
          Clear matches
        </button>
      )}
    </div>
  );
}
