import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | BrandQuest Kids",
  description:
    "Log in to continue your brand adventure at BrandQuest Kids.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      headline="Welcome Back, Detective!"
      subtitle="Continue your trademark adventure."
      illustrationLabel="A young detective waving hello with a magnifying glass"
      illustrationEmoji="🕵️"
    >
      <Suspense
        fallback={
          <div
            role="status"
            className="grid min-h-80 place-items-center text-center"
          >
            <div>
              <span
                aria-hidden="true"
                className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-detective-blue-100 border-t-detective-blue-600"
              />
              <p className="mt-4 font-display font-semibold text-detective-blue-700">
                Opening your case file…
              </p>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
