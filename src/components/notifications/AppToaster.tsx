"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useNotify, type AppToast, type ToastTone } from "@/lib/notifications/NotificationProvider";

const toneStyles: Record<
  ToastTone,
  { className: string; Icon: typeof CheckCircle2 }
> = {
  success: { className: "bg-detective-blue-900 text-white", Icon: CheckCircle2 },
  info: { className: "bg-detective-blue-600 text-white", Icon: Info },
  error: { className: "bg-detective-orange-500 text-white", Icon: XCircle },
};

/** Renders app-wide status toasts near the top of the screen. */
export function AppToaster() {
  const { toasts } = useNotify();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-[110] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }: { toast: AppToast }) {
  const { dismiss } = useNotify();
  const { className, Icon } = toneStyles[toast.tone];

  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, dismiss]);

  return (
    <motion.output
      initial={{ opacity: 0, y: -24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`pointer-events-auto flex max-w-md items-center gap-3 rounded-full px-5 py-3 font-display font-semibold shadow-2xl ${className}`}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => dismiss(toast.id)}
        aria-label="Dismiss notification"
        className="ml-1 grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/20"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.output>
  );
}
