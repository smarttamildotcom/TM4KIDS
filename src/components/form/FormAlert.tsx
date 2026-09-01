"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

/** Animated form-level error banner (e.g. wrong password). */
export function FormAlert({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -8 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          role="alert"
          className="overflow-hidden"
        >
          <motion.p
            animate={{ x: [0, -8, 8, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-2 rounded-2xl bg-detective-orange-100 px-4 py-3 text-sm font-medium text-detective-orange-600"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
