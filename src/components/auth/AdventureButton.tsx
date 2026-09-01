"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthProvider";

type AdventureButtonProps = {
  children?: ReactNode;
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

/** Sends guests to login and signed-in detectives to their dashboard. */
export function AdventureButton({
  children = "Start Adventure",
  size = "md",
  variant = "primary",
  className,
}: AdventureButtonProps) {
  const { user, isLoaded } = useAuth();

  return (
    <Button
      href={user ? "/dashboard" : "/login"}
      size={size}
      variant={variant}
      className={className}
      aria-disabled={!isLoaded}
    >
      {children}
    </Button>
  );
}
