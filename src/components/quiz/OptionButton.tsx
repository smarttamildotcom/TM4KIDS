"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";

type OptionState = "idle" | "correct" | "wrong" | "dimmed";

type OptionButtonProps = {
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
  /** Screen-reader friendly description of the choice. */
  ariaLabel?: string;
  isSelected: boolean;
  /** `list` stacks content horizontally, `tile` centres it for image choices. */
  layout?: "list" | "tile";
  children: ReactNode;
};

const stateStyles: Record<OptionState, string> = {
  idle: "border-detective-blue-100 bg-detective-blue-50/50 hover:border-detective-blue-400 hover:bg-detective-blue-50",
  correct: "border-green-500 bg-green-50",
  wrong: "border-detective-orange-500 bg-detective-orange-100",
  dimmed: "border-detective-blue-100 bg-white opacity-60",
};

/** Shared answer button used by every question type. */
export function OptionButton({
  state,
  disabled,
  onClick,
  ariaLabel,
  isSelected,
  layout = "list",
  children,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`relative flex w-full rounded-2xl border-2 font-medium text-detective-blue-900 transition-colors disabled:cursor-default ${
        stateStyles[state]
      } ${
        layout === "list"
          ? "items-center gap-3 px-4 py-4 text-left"
          : "h-full flex-col items-center gap-2 p-4 text-center"
      }`}
    >
      {children}

      {state === "correct" && (
        <CheckCircle2
          aria-hidden="true"
          className={`h-6 w-6 shrink-0 text-green-600 ${
            layout === "tile" ? "absolute right-2 top-2" : ""
          }`}
        />
      )}
      {state === "wrong" && (
        <XCircle
          aria-hidden="true"
          className={`h-6 w-6 shrink-0 text-detective-orange-600 ${
            layout === "tile" ? "absolute right-2 top-2" : ""
          }`}
        />
      )}
    </motion.button>
  );
}

/** Maps answer state to the visual state of one option. */
export function resolveOptionState(
  isAnswered: boolean,
  isCorrectChoice: boolean,
  isSelected: boolean,
): OptionState {
  if (!isAnswered) return "idle";
  if (isCorrectChoice) return "correct";
  if (isSelected) return "wrong";
  return "dimmed";
}
