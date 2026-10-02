"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type AdventureButtonProps = {
  children?: ReactNode;
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

/** Sends visitors directly to Questy's Idea Adventures. */
export function AdventureButton({
  children = "Explore Adventures",
  size = "md",
  variant = "primary",
  className,
}: AdventureButtonProps) {
  return (
    <Button href="/#journey" size={size} variant={variant} className={className}>
      {children}
    </Button>
  );
}
