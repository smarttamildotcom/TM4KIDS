/** Shared field validators. Each returns an error message, or undefined when valid. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Validator = (value: string) => string | undefined;

export function required(message = "This field is required."): Validator {
  return (value) => (value.trim() ? undefined : message);
}

export function email(message = "That email address doesn't look quite right."): Validator {
  return (value) => (EMAIL_PATTERN.test(value.trim()) ? undefined : message);
}

export function minLength(length: number, message?: string): Validator {
  return (value) =>
    value.trim().length >= length
      ? undefined
      : message ?? `Please use at least ${length} characters.`;
}

export function numberBetween(min: number, max: number, message?: string): Validator {
  return (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
      return message ?? `Please enter a number between ${min} and ${max}.`;
    }
    return undefined;
  };
}

export function matches(other: () => string, message: string): Validator {
  return (value) => (value === other() ? undefined : message);
}

/** Runs validators in order and returns the first failure. */
export function runValidators(
  value: string,
  validators: Validator[] = [],
): string | undefined {
  for (const validate of validators) {
    const error = validate(value);
    if (error) return error;
  }
  return undefined;
}

/** Validates a whole form given a validator map, returning a field->error record. */
export function validateForm<T extends Record<string, string | boolean>>(
  values: T,
  rules: Partial<Record<keyof T, Validator[]>>,
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key of Object.keys(rules) as (keyof T)[]) {
    const value = values[key];
    const error = runValidators(typeof value === "string" ? value : "", rules[key]);
    if (error) errors[key] = error;
  }

  return errors;
}
