"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look quite right.";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) {
    errors.message = "Please write a short message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  return errors;
}

const fieldClasses =
  "w-full rounded-2xl border-2 px-4 py-3 font-medium text-detective-blue-900 outline-none transition-colors focus:border-detective-blue-500";

/** Contact form with inline validation and an animated success state. */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setValues(initialValues);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        role="status"
        className="rounded-3xl border-2 border-green-200 bg-green-50 p-8 text-center shadow-md"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-bold text-detective-blue-900">
          Message sent!
        </p>
        <p className="mt-2 text-detective-blue-700/85">
          Thanks for reaching out — our team will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-500 bg-white px-6 py-3 font-display font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={`${fieldClasses} ${
              errors.name ? "border-detective-orange-500" : "border-detective-blue-200"
            }`}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={`${fieldClasses} ${
              errors.email ? "border-detective-orange-500" : "border-detective-blue-200"
            }`}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject" error={errors.subject}>
          <input
            type="text"
            value={values.subject}
            onChange={(event) => handleChange("subject", event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            className={`${fieldClasses} ${
              errors.subject ? "border-detective-orange-500" : "border-detective-blue-200"
            }`}
            placeholder="What's this about?"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={errors.message}>
          <textarea
            value={values.message}
            onChange={(event) => handleChange("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            rows={5}
            className={`${fieldClasses} resize-none ${
              errors.message ? "border-detective-orange-500" : "border-detective-blue-200"
            }`}
            placeholder="Tell us how we can help…"
          />
        </Field>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600 sm:w-auto"
      >
        <Send className="h-5 w-5" aria-hidden="true" />
        Send Message
      </motion.button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-display text-sm font-semibold text-detective-blue-700">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-1 block text-sm font-medium text-detective-orange-600"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
