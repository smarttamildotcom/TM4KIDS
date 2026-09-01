import type { ReactNode } from "react";

type ImagePlaceholderProps = {
  /** Short description of the artwork that belongs here. */
  label: string;
  /** Emoji stand-in shown until real artwork is dropped in. */
  emoji: string;
  className?: string;
  children?: ReactNode;
};

/** Dashed frame that reserves space for lesson artwork. */
export function ImagePlaceholder({
  label,
  emoji,
  className = "",
  children,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Illustration placeholder: ${label}`}
      className={`grid place-items-center rounded-3xl border-4 border-dashed border-detective-blue-200 bg-detective-blue-50/60 p-6 text-center ${className}`}
    >
      <div>
        <span aria-hidden="true" className="block text-6xl sm:text-7xl">
          {emoji}
        </span>
        <p className="mt-3 font-display text-sm font-semibold text-detective-blue-700">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
