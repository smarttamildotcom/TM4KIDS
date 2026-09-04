"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LogIn, Lock, Mail, User } from "lucide-react";
import {
  CheckboxField,
  FormAlert,
  SubmitButton,
  TextField,
} from "@/components/form";
import { AuthDivider, SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useAuth } from "@/lib/auth/AuthProvider";
import { email, required, validateForm } from "@/lib/forms/validation";

type Values = {
  studentName: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

const rules = {
  email: [required("Please enter your email address."), email()],
  password: [required("Please enter your password.")],
};

/** Mock login form. Redirects to /dashboard on success. */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/#journey";
  const { login, loginWith } = useAuth();

  const [values, setValues] = useState<Values>({
    studentName: "",
    email: "",
    password: "",
    rememberMe: true,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [formError, setFormError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setFormError(undefined);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validateForm(values, rules);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    const result = await login(values);
    setIsLoading(false);

    if (result.ok) {
      router.push(redirectTo);
    } else {
      setFormError(result.error);
    }
  }

  async function handleProvider(provider: "google" | "apple") {
    setIsLoading(true);
    const result = await loginWith(provider);
    setIsLoading(false);

    if (result.ok) router.push(redirectTo);
    else setFormError(result.error);
  }

  return (
    <>
      <h2 className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
        Create your Detective Account
      </h2>
      <p className="mt-1 text-detective-blue-700/85">
        Unlock Worlds 3–15 and keep every badge you earn.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <FormAlert message={formError} />

        <TextField
          id="login-student"
          label="Student Name"
          autoComplete="name"
          icon={User}
          placeholder="Detective's name"
          value={values.studentName}
          error={errors.studentName}
          onChange={(value) => update("studentName", value)}
        />

        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          icon={Mail}
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
        />

        <TextField
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          icon={Lock}
          placeholder="Your secret code"
          value={values.password}
          error={errors.password}
          onChange={(value) => update("password", value)}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <CheckboxField
            id="login-remember"
            label="Remember me"
            checked={values.rememberMe}
            onChange={(checked) => update("rememberMe", checked)}
          />
          <Link
            href="/forgot-password"
            className="font-display text-sm font-semibold text-detective-blue-600 hover:text-detective-orange-500"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton isLoading={isLoading} loadingLabel="Opening case file…">
          <LogIn className="h-5 w-5" aria-hidden="true" />
          Continue
        </SubmitButton>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <SocialAuthButtons onSelect={handleProvider} disabled={isLoading} />

      <p className="mt-8 text-center text-detective-blue-700">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-display font-bold text-detective-orange-500 hover:text-detective-orange-600"
        >
          Create Account
        </Link>
      </p>
    </>
  );
}
