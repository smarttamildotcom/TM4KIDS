import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | Brand Quest",
  description:
    "Log in to continue your brand adventure at Brand Quest.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      headline="Continue Your Detective Adventure"
      subtitle="Create your free Detective Account to unlock all remaining worlds, save your progress and earn every badge."
      illustrationLabel="Questy the detective mascot holding a magnifying glass"
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
