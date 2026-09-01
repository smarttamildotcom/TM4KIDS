import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | BrandQuest Kids",
  description:
    "Create your free BrandQuest Kids account and start solving brand mysteries.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      headline="Join BrandQuest Kids!"
      subtitle="Create your detective badge and start solving brand mysteries."
      illustrationLabel="A new detective receiving their first badge"
      illustrationEmoji="🎓"
    >
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
