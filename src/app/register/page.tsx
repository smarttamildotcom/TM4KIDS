import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | IP2Kids",
  description:
    "Create your free IP2Kids account and start solving IP mysteries.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      headline="Join IP2Kids!"
      subtitle="Create your detective badge and start solving IP mysteries."
      illustrationLabel="A new detective receiving their first badge"
    >
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
