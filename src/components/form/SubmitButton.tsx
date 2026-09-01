"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  loadingLabel?: string;
  disabled?: boolean;
};

/** Large primary submit button with a loading spinner state. */
export function SubmitButton({
  children,
  isLoading = false,
  loadingLabel = "Please wait…",
  disabled = false,
}: SubmitButtonProps) {
  const isBlocked = isLoading || disabled;

  return (
    <motion.button
      type="submit"
      disabled={isBlocked}
      whileHover={isBlocked ? undefined : { scale: 1.02, y: -2 }}
      whileTap={isBlocked ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
