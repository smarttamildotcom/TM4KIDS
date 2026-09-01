"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { CheckCircle2, GripVertical, XCircle } from "lucide-react";
import { StarRating } from "@/components/quiz/StarRating";
import { calculateStars } from "@/lib/quiz/scoring";

export type LogoPair = {
  id: string;
  companyName: string;
  /** Emoji stand-in used until real logo artwork is dropped in. */
  emoji: string;
};

type TargetState = "idle" | "correct" | "wrong";

/** Fisher-Yates shuffle so the draggable logos don't line up with their targets. */
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type LogoMatchGameProps = {
  pairs: LogoPair[];
  /** Fires once, when every logo has found its home. */
  onComplete?: (stars: number) => void;
};

/**
 * Drag-and-drop matching game: children drag each logo onto its company
 * name. Reusable for any lesson that needs a "match the pairs" activity.
 */
export function LogoMatchGame({ pairs, onComplete }: LogoMatchGameProps) {
  const [pool] = useState(() => shuffle(pairs));
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [targetStates, setTargetStates] = useState<Record<string, TargetState>>({});
  const targetRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasCompleted = useRef(false);

  const isComplete = matchedIds.length === pairs.length;

  useEffect(() => {
    if (isComplete && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete?.(calculateStars(pairs.length - wrongAttempts, pairs.length));
    }
  }, [isComplete, onComplete, pairs.length, wrongAttempts]);

  function flashTarget(targetId: string, state: TargetState) {
    setTargetStates((current) => ({ ...current, [targetId]: state }));
    if (state === "wrong") {
      setTimeout(() => {
        setTargetStates((current) => ({ ...current, [targetId]: "idle" }));
      }, 600);
    }
  }

  function handleDragEnd(pair: LogoPair, info: PanInfo) {
    const hitTargetId = Object.entries(targetRefs.current).find(([, element]) => {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      );
    })?.[0];

    if (!hitTargetId) return;

    if (hitTargetId === pair.id) {
      setMatchedIds((current) => [...current, pair.id]);
      flashTarget(hitTargetId, "correct");
    } else {
      setWrongAttempts((current) => current + 1);
      flashTarget(hitTargetId, "wrong");
    }
  }

  const remainingLogos = pool.filter((pair) => !matchedIds.includes(pair.id));

  return (
    <div className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-xl sm:p-8">
      <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">
        <GripVertical className="h-4 w-4" aria-hidden="true" />
        Drag each logo onto the company it belongs to
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
            Mixed-up logos
          </h4>
          <div className="flex flex-wrap gap-4">
            {remainingLogos.length === 0 && (
              <p className="text-detective-blue-700/70">
                All logos matched — nice work, detective!
              </p>
            )}
            {remainingLogos.map((pair) => (
              <motion.div
                key={pair.id}
                drag
                dragSnapToOrigin
                dragElastic={0.2}
                dragMomentum={false}
                whileHover={{ scale: 1.08 }}
                whileDrag={{ scale: 1.15, zIndex: 20, boxShadow: "0 12px 24px rgba(0,0,0,0.18)" }}
                onDragEnd={(_event, info) => handleDragEnd(pair, info)}
                className="grid h-20 w-20 cursor-grab place-items-center rounded-2xl border-2 border-detective-blue-200 bg-detective-blue-50 text-4xl shadow-md active:cursor-grabbing"
                role="img"
                aria-label={`${pair.companyName} logo placeholder, draggable`}
              >
                {pair.emoji}
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
            Drop it on the right company
          </h4>
          <ul className="space-y-3">
            {pairs.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              const state = targetStates[pair.id] ?? "idle";

              return (
                <li key={pair.id}>
                  <motion.div
                    ref={(element) => {
                      targetRefs.current[pair.id] = element;
                    }}
                    animate={
                      state === "wrong"
                        ? { x: [0, -8, 8, -5, 5, 0] }
                        : { x: 0 }
                    }
                    className={`flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed px-4 py-4 font-display font-semibold transition-colors ${
                      isMatched
                        ? "border-green-500 bg-green-50 text-green-800"
                        : state === "wrong"
                          ? "border-detective-orange-500 bg-detective-orange-100 text-detective-blue-900"
                          : "border-detective-blue-200 bg-white text-detective-blue-900"
                    }`}
                  >
                    <span>{pair.companyName}</span>
                    {isMatched ? (
                      <span className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-2xl">
                          {pair.emoji}
                        </span>
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-6 w-6 text-green-600"
                        />
                      </span>
                    ) : state === "wrong" ? (
                      <XCircle
                        aria-hidden="true"
                        className="h-6 w-6 text-detective-orange-600"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-10 w-10 rounded-xl border-2 border-dashed border-detective-blue-200"
                      />
                    )}
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-detective-yellow-100/70 py-6 text-center"
        >
          <p className="font-display text-xl font-bold text-detective-blue-900">
            Every logo is back where it belongs!
          </p>
          <StarRating earned={calculateStars(pairs.length - wrongAttempts, pairs.length)} />
        </motion.div>
      )}
    </div>
  );
}
