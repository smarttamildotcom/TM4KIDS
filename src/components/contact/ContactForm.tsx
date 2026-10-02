"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  role: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", role: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That email address doesn't look quite right.";
  if (!values.role) errors.role = "Please choose one option.";
  if (!values.message.trim()) errors.message = "Please write a short message.";
  else if (values.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

const fieldClasses = "w-full rounded-xl border-2 px-3.5 py-2.5 text-sm font-medium text-detective-blue-900 outline-none transition-colors focus:border-detective-blue-500";

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
      // TODO: Connect to the production email service before launch.
      setSubmitted(true);
      setValues(initialValues);
    }
  }

  if (submitted) {
    return <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status" className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center shadow-sm"><CheckCircle2 className="mx-auto h-10 w-10 text-green-600"/><p className="mt-3 font-display text-lg font-bold text-detective-blue-900">Thank you! Your message has been received.</p><p className="mt-1 text-sm text-detective-blue-700/85">We will get back to you soon.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-4 rounded-full border-2 border-detective-blue-500 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700">Send another message</button></motion.div>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border-2 border-detective-blue-100 bg-white p-4 shadow-md sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}><input type="text" value={values.name} onChange={(e) => handleChange("name", e.target.value)} className={`${fieldClasses} ${errors.name ? "border-detective-orange-500" : "border-detective-blue-200"}`} placeholder="Your name"/></Field>
        <Field label="Email address" error={errors.email}><input type="email" value={values.email} onChange={(e) => handleChange("email", e.target.value)} className={`${fieldClasses} ${errors.email ? "border-detective-orange-500" : "border-detective-blue-200"}`} placeholder="you@example.com"/></Field>
      </div>
      <div className="mt-4"><Field label="I am a…" error={errors.role}><select value={values.role} onChange={(e) => handleChange("role", e.target.value)} className={`${fieldClasses} bg-white ${errors.role ? "border-detective-orange-500" : "border-detective-blue-200"}`}><option value="">Choose one</option><option value="Parent">Parent</option><option value="Educator">Educator</option><option value="School">School</option><option value="Other">Other</option></select></Field></div>
      <div className="mt-4"><Field label="Your message" error={errors.message}><textarea value={values.message} onChange={(e) => handleChange("message", e.target.value)} rows={5} className={`${fieldClasses} resize-none ${errors.message ? "border-detective-orange-500" : "border-detective-blue-200"}`} placeholder="Tell us how we can help…"/></Field></div>
      <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-md hover:bg-detective-orange-600"><Send className="h-4 w-4"/>Send Message</motion.button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1 block font-display text-sm font-semibold text-detective-blue-700">{label}</span>{children}<AnimatePresence>{error && <motion.span initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-1 block text-xs font-medium text-detective-orange-600">{error}</motion.span>}</AnimatePresence></label>;
}
