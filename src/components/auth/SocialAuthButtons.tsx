"use client";

import { motion } from "framer-motion";

type SocialAuthButtonsProps = {
  onSelect: (provider: "google" | "apple") => void;
  disabled?: boolean;
};

const providers = [
  { id: "google", label: "Continue with Google", mark: "G", markClass: "text-[#ea4335]" },
  { id: "apple", label: "Continue with Apple", mark: "⌘", markClass: "text-detective-blue-900" },
] as const;

/** Placeholder OAuth buttons — wired to the mock auth flow, not a real provider. */
export function SocialAuthButtons({ onSelect, disabled }: SocialAuthButtonsProps) {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <motion.button
          key={provider.id}
          type="button"
          onClick={() => onSelect(provider.id)}
          disabled={disabled}
          whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
          whileTap={disabled ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-detective-blue-200 bg-white px-6 py-3 font-display font-semibold text-detective-blue-700 shadow-sm transition-colors hover:bg-detective-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className={`font-display text-xl font-bold ${provider.markClass}`}
          >
            {provider.mark}
          </span>
          {provider.label}
        </motion.button>
      ))}
    </div>
  );
}

/** "or" divider used between the password form and the social buttons. */
export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-0.5 grow rounded-full bg-detective-blue-100" />
      <span className="font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/60">
        {label}
      </span>
      <span className="h-0.5 grow rounded-full bg-detective-blue-100" />
    </div>
  );
}
