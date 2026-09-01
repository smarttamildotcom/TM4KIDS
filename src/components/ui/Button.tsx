import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-wide " +
  "transition-transform transition-colors duration-200 ease-out shadow-lg " +
  "hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md";

const variants: Record<Variant, string> = {
  primary:
    "bg-detective-orange-500 text-white shadow-detective-orange-500/30 hover:bg-detective-orange-600",
  secondary:
    "bg-detective-yellow-400 text-detective-blue-900 shadow-detective-yellow-500/30 hover:bg-detective-yellow-300",
  outline:
    "bg-white text-detective-blue-700 border-2 border-detective-blue-500 shadow-detective-blue-500/20 hover:bg-detective-blue-50",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/** Shared pill button. Pass `href` to render an accessible link instead of a button. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: ButtonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: string;
  }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
