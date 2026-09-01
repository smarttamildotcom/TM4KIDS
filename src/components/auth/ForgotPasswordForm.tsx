"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, KeyRound, Mail, MailCheck } from "lucide-react";
import { FormAlert, SubmitButton, TextField } from "@/components/form";
import { useAuth } from "@/lib/auth/AuthProvider";
import { email as emailRule, required, validateForm } from "@/lib/forms/validation";

/** Mock password reset request with an animated success confirmation. */
export function ForgotPasswordForm() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const errors = validateForm(
      { email },
      { email: [required("Please enter your email address."), emailRule()] },
    );
    setError(errors.email);
    if (errors.email) return;

    setIsLoading(true);
    const result = await resetPassword(email);
    setIsLoading(false);

    if (result.ok) setSentTo(email.trim());
    else setFormError(result.error);
  }

  if (sentTo) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        role="status"
        className="text-center"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100"
        >
          <MailCheck className="h-10 w-10 text-green-600" aria-hidden="true" />
        </motion.span>

        <h2 className="mt-6 font-display text-2xl font-bold text-detective-blue-900">
          Check your inbox!
        </h2>
        <p className="mt-2 text-detective-blue-700/85">
          If an account exists for <strong>{sentTo}</strong>, we&apos;ve sent
          reset instructions to that address.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
        >
          Back to log in
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <h2 className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
        Forgot your password?
      </h2>
      <p className="mt-1 text-detective-blue-700/85">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <FormAlert message={formError} />

        <TextField
          id="reset-email"
          label="Email"
          type="email"
          autoComplete="email"
          icon={Mail}
          placeholder="you@example.com"
          value={email}
          error={error}
          onChange={(value) => {
            setEmail(value);
            setError(undefined);
            setFormError(undefined);
          }}
        />

        <SubmitButton isLoading={isLoading} loadingLabel="Sending reset link…">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
          Reset Password
        </SubmitButton>
      </form>

      <Link
        href="/login"
        className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-detective-blue-600 hover:text-detective-orange-500"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to log in
      </Link>
    </>
  );
}
