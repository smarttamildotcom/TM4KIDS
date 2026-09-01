"use client";

import { Field, controlClasses } from "./Field";

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  optional?: boolean;
  placeholder?: string;
};

/** Reusable dropdown matching the shared field styling. */
export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  optional,
  placeholder = "Choose one…",
}: SelectFieldProps) {
  return (
    <Field id={id} label={label} error={error} optional={optional}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClasses(Boolean(error), "bg-white")}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
