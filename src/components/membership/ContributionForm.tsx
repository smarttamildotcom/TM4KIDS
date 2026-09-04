"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import {
  CheckboxField,
  FormAlert,
  SelectField,
  SubmitButton,
  TextField,
} from "@/components/form";
import { useAuth } from "@/lib/auth/AuthProvider";
import { notifyNewMember } from "@/lib/email/notify-member-client";
import { MEMBERSHIP_PRICE } from "@/lib/membership";
import { email as emailRule, required, validateForm } from "@/lib/forms/validation";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  reference: string;
  message: string;
  confirmed: boolean;
};

const initialValues: Values = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  reference: "",
  message: "",
  confirmed: false,
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

/**
 * Contribution confirmation form. On submit it flips the account to PENDING,
 * notifies the site owner, then hands control back so the pending state shows.
 */
export function ContributionForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { user, setMembershipStatus } = useAuth();

  const [values, setValues] = useState<Values>(() => {
    const [first = "", ...rest] = (user?.studentName ?? "").split(" ");
    return {
      ...initialValues,
      firstName: first,
      lastName: rest.join(" "),
      email: user?.email ?? "",
      country: user?.country ?? "",
    };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validateForm(values, {
      firstName: [required("Please enter your first name.")],
      lastName: [required("Please enter your last name.")],
      email: [required("Please enter an email address."), emailRule()],
      country: [required("Please choose a country.")],
    });

    if (!values.confirmed) {
      nextErrors.confirmed = "Please confirm that you have completed your contribution.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);

    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();

    // Notify the site owner. Fire-and-forget: email issues must never block the
    // contributor's journey.
    void notifyNewMember({
      name: fullName,
      email: values.email.trim(),
      country: values.country,
      registrationDate: new Date().toISOString(),
      membershipType: `Membership Contribution (${MEMBERSHIP_PRICE})`,
      paymentStatus: "PENDING — awaiting manual verification",
      transactionId: values.reference.trim() || undefined,
      message: values.message.trim() || undefined,
    });

    // Move the account into manual-verification limbo.
    setMembershipStatus("PENDING");

    setIsLoading(false);
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormAlert message={errors.confirmed} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="contribution-first"
          label="First Name"
          autoComplete="given-name"
          placeholder="First name"
          value={values.firstName}
          error={errors.firstName}
          onChange={(value) => update("firstName", value)}
        />
        <TextField
          id="contribution-last"
          label="Last Name"
          autoComplete="family-name"
          placeholder="Last name"
          value={values.lastName}
          error={errors.lastName}
          onChange={(value) => update("lastName", value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="contribution-email"
          label="Email Address"
          type="email"
          autoComplete="email"
          icon={Mail}
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
        />
        <SelectField
          id="contribution-country"
          label="Country"
          options={countries}
          value={values.country}
          error={errors.country}
          onChange={(value) => update("country", value)}
        />
      </div>

      <TextField
        id="contribution-reference"
        label="Transaction Reference"
        optional
        placeholder="Bank or PayNow reference"
        value={values.reference}
        error={errors.reference}
        onChange={(value) => update("reference", value)}
      />

      <TextField
        id="contribution-message"
        label="Message"
        optional
        placeholder="Anything you'd like us to know"
        value={values.message}
        error={errors.message}
        onChange={(value) => update("message", value)}
      />

      <CheckboxField
        id="contribution-confirm"
        checked={values.confirmed}
        error={errors.confirmed}
        onChange={(checked) => update("confirmed", checked)}
        label={
          <>I confirm that I have completed my {MEMBERSHIP_PRICE} contribution.</>
        }
      />

      <SubmitButton isLoading={isLoading} loadingLabel="Submitting…">
        Submit Contribution
      </SubmitButton>
    </form>
  );
}
