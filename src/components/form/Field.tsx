"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type FieldProps = {
  /** Input id, so the label and error are wired up correctly. */
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
};

/** Label + error wrapper shared by every form control. */
export function Field({ id, label, error, hint, optional, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block font-display text-sm font-semibold text-detective-blue-700"
      >
        {label}
        {optional && (
          <span className="ml-1 font-normal text-detective-blue-700/60">
            (optional)
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p className="mt-1 text-sm text-detective-blue-700/70">{hint}</p>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id={`${id}-error`}
            role="alert"
            className="mt-1 text-sm font-medium text-detective-orange-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Shared control styling so inputs and selects match across every form. */
export function controlClasses(hasError: boolean, extra = ""): string {
  return `w-full rounded-2xl border-2 px-4 py-3 font-medium text-detective-blue-900 outline-none transition-colors focus:border-detective-blue-500 ${
    hasError ? "border-detective-orange-500" : "border-detective-blue-200"
  } ${extra}`;
}
