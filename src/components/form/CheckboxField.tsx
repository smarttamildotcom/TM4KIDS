"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type CheckboxFieldProps = {
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
};

/** Reusable checkbox with an animated tick. */
export function CheckboxField({
  id,
  label,
  checked,
  onChange,
  error,
}: CheckboxFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer sr-only"
          />
          <motion.span
            whileTap={{ scale: 0.88 }}
            aria-hidden="true"
            className={`grid h-6 w-6 place-items-center rounded-lg border-2 transition-colors ${
              checked
                ? "border-detective-orange-500 bg-detective-orange-500"
                : error
                  ? "border-detective-orange-500 bg-white"
                  : "border-detective-blue-200 bg-white"
            } peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-detective-blue-600`}
          >
            <AnimatePresence>
              {checked && (
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </span>

        <span className="text-sm font-medium text-detective-blue-700">{label}</span>
      </label>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
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
