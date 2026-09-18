"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type AdventureButtonProps = {
  children?: ReactNode;
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

/** Sends every detective straight to the detective creator. */
export function AdventureButton({
  children = "Start Adventure",
  size = "md",
  variant = "primary",
  className,
}: AdventureButtonProps) {
  return (
    <Button href="/detective" size={size} variant={variant} className={className}>
      {children}
    </Button>
  );
}
