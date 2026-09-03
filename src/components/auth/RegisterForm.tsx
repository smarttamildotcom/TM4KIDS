"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Lock, Mail, School, UserPlus, Users } from "lucide-react";
import {
  CheckboxField,
  FormAlert,
  SelectField,
  SubmitButton,
  TextField,
} from "@/components/form";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  email,
  matches,
  minLength,
  numberBetween,
  required,
  validateForm,
} from "@/lib/forms/validation";

type Values = {
  studentName: string;
  parentName: string;
  age: string;
  school: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const initialValues: Values = {
  studentName: "",
  parentName: "",
  age: "",
  school: "",
  country: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

const countries = [
  "Australia",
  "Canada",
  "India",
  "Malaysia",
  "New Zealand",
  "Singapore",
  "United Kingdom",
  "United States",
  "Other",
].map((name) => ({ value: name, label: name }));

/** Mock registration form. Redirects to /dashboard on success. */
export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/#journey";
  const { register } = useAuth();

  const [values, setValues] = useState<Values>(initialValues);
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

    const nextErrors = validateForm(values, {
      studentName: [required("Please enter the student's name.")],
      age: [
        required("Please enter an age."),
        numberBetween(5, 18, "Please enter an age between 5 and 18."),
      ],
      country: [required("Please choose a country.")],
      email: [required("Please enter an email address."), email()],
      password: [
        required("Please choose a password."),
        minLength(8, "Passwords need at least 8 characters."),
      ],
      confirmPassword: [
        required("Please confirm the password."),
        matches(() => values.password, "Those passwords don't match."),
      ],
    });

    if (!values.agreeToTerms) {
      nextErrors.agreeToTerms = "Please agree to the terms to continue.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    const result = await register({
      studentName: values.studentName.trim(),
      parentName: values.parentName.trim() || undefined,
      age: Number(values.age),
      school: values.school.trim() || undefined,
      country: values.country,
      email: values.email.trim(),
      password: values.password,
    });
    setIsLoading(false);

    if (result.ok) {
      router.push(redirectTo);
    } else {
      setFormError(result.error);
    }
  }

  return (
    <>
      <h2 className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
        Create your account
      </h2>
      <p className="mt-1 text-detective-blue-700/85">
        Join Brand Quest and start solving cases today.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <FormAlert message={formError} />

        <TextField
          id="register-student"
          label="Student Name"
          autoComplete="name"
          placeholder="Detective's name"
          value={values.studentName}
          error={errors.studentName}
          onChange={(value) => update("studentName", value)}
        />

        <TextField
          id="register-parent"
          label="Parent Name"
          optional
          autoComplete="name"
          icon={Users}
          placeholder="Parent or guardian"
          value={values.parentName}
          error={errors.parentName}
          onChange={(value) => update("parentName", value)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="register-age"
            label="Age"
            type="number"
            min={5}
            max={18}
            placeholder="10"
            value={values.age}
            error={errors.age}
            onChange={(value) => update("age", value)}
          />

          <SelectField
            id="register-country"
            label="Country"
            options={countries}
            value={values.country}
            error={errors.country}
            onChange={(value) => update("country", value)}
          />
        </div>

        <TextField
          id="register-school"
          label="School"
          optional
          icon={School}
          placeholder="School name"
          value={values.school}
          error={errors.school}
          onChange={(value) => update("school", value)}
        />

        <TextField
          id="register-email"
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
          id="register-password"
          label="Password"
          type="password"
          autoComplete="new-password"
          icon={Lock}
          hint="At least 8 characters."
          placeholder="Create a secret code"
          value={values.password}
          error={errors.password}
          onChange={(value) => update("password", value)}
        />

        <TextField
          id="register-confirm"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          icon={Lock}
          placeholder="Type it once more"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={(value) => update("confirmPassword", value)}
        />

        <CheckboxField
          id="register-terms"
          checked={values.agreeToTerms}
          error={errors.agreeToTerms}
          onChange={(checked) => update("agreeToTerms", checked)}
          label={
            <>
              I agree to the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-detective-blue-600 underline hover:text-detective-orange-500"
              >
                terms and privacy policy
              </Link>
              .
            </>
          }
        />

        <SubmitButton isLoading={isLoading} loadingLabel="Creating your badge…">
          <UserPlus className="h-5 w-5" aria-hidden="true" />
          Create Account
        </SubmitButton>
      </form>

      <p className="mt-8 text-center text-detective-blue-700">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-display font-bold text-detective-orange-500 hover:text-detective-orange-600"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
