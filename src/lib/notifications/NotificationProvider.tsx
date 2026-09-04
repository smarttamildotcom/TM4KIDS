"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Visual tone for an app notification. */
export type ToastTone = "success" | "info" | "error";

export type AppToast = {
  id: string;
  message: string;
  tone: ToastTone;
};

type NotificationContextValue = {
  toasts: AppToast[];
  /** Shows a floating toast. Defaults to the "success" tone. */
  notify: (message: string, tone?: ToastTone) => void;
  dismiss: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

let toastCounter = 0;

/**
 * App-wide toast provider for status messages (logout, etc.). Kept separate
 * from the gamification RewardToaster so page rewards and account messages
 * don't interfere, and mounted above the router so a toast survives navigation.
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((message: string, tone: ToastTone = "success") => {
    toastCounter += 1;
    const id = `app-toast-${toastCounter}`;
    setToasts((current) => [...current, { id, message, tone }]);
  }, []);

  const value = useMemo<NotificationContextValue>(
    () => ({ toasts, notify, dismiss }),
    [toasts, notify, dismiss],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotify(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotify must be used inside a <NotificationProvider>.");
  }
  return context;
}
