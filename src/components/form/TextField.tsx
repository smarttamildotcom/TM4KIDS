"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { Field, controlClasses } from "./Field";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  /** Small icon shown inside the left edge of the input. */
  icon?: LucideIcon;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange" | "className"
>;

/** Reusable text input. Pass `type="password"` to get a show/hide toggle. */
export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  icon: Icon,
  type = "text",
  ...rest
}: TextFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional}>
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-detective-blue-400"
          />
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={controlClasses(
            Boolean(error),
            `${Icon ? "pl-12" : ""} ${isPassword ? "pr-12" : ""}`,
          )}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-detective-blue-500 transition-colors hover:bg-detective-blue-50"
          >
            {revealed ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </Field>
  );
}
