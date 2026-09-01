"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/lib/gamification/GameProvider";
import type { RewardKind, RewardToastItem } from "@/lib/gamification/types";

const toastStyles: Record<RewardKind, { icon: string; className: string }> = {
  xp: { icon: "⚡", className: "bg-detective-blue-600 text-white" },
  coins: {
    icon: "🪙",
    className: "bg-detective-yellow-400 text-detective-blue-900",
  },
  badge: { icon: "🏅", className: "bg-detective-orange-500 text-white" },
  certificate: { icon: "📜", className: "bg-detective-blue-900 text-white" },
  streak: { icon: "🔥", className: "bg-detective-orange-400 text-white" },
};

/** Floating reward pop-ups, mounted once near the app root. */
export function RewardToaster() {
  const { toasts } = useGame();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast }: { toast: RewardToastItem }) {
  const { dismissToast } = useGame();
  const style = toastStyles[toast.kind];

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), 2600);
    return () => clearTimeout(timer);
  }, [toast.id, dismissToast]);

  return (
    <motion.output
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`flex items-center gap-2 rounded-full px-5 py-3 font-display text-lg font-bold shadow-2xl ${style.className}`}
    >
      <motion.span
        aria-hidden="true"
        animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 0.6 }}
      >
        {style.icon}
      </motion.span>
      {toast.label}
    </motion.output>
  );
}
