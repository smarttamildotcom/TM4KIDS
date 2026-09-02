import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Brand Quest",
  description:
    "Reset your Brand Quest password and get back to your adventures.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      headline="Lost your secret code?"
      subtitle="Every detective forgets a clue now and then — let's get you back in."
      illustrationLabel="A detective searching for a lost key with a magnifying glass"
      illustrationEmoji="🔑"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
