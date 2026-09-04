"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { CheckCircle2, Save, Upload } from "lucide-react";
import { AdminSectionHeading, AdminCard } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { useAdminData } from "@/hooks/admin/useAdminData";
import type { AdminSettings } from "@/services/admin/types";

export function SettingsView() {
  const admin = useAdminData();
  const [draft, setDraft] = useState<AdminSettings | null>(null);
  const [saved, setSaved] = useState(false);

  if (!admin) return <AdminLoading />;

  const settings = draft ?? admin.data.settings;

  function update<K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) {
    setDraft({ ...settings, [key]: value });
    setSaved(false);
  }

  function handleQrUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("payNowQrImage", String(reader.result));
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!admin) return;
    if (draft) admin.updateSettings(draft);
    setSaved(true);
    setDraft(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminSectionHeading
        title="Settings"
        description="Manage membership, payment and content settings."
        action={
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-detective-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-detective-blue-700"
          >
            <Save className="h-4 w-4" /> Save changes
          </button>
        }
      />

      {saved && (
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 className="h-5 w-5" /> Settings saved.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            Membership
          </h2>
          <div className="space-y-4">
            <FieldLabel label="Membership Price (SGD)">
              <input
                type="number"
                min={0}
                value={settings.membershipPrice}
                onChange={(event) =>
                  update("membershipPrice", Number(event.target.value))
                }
                className="admin-input"
              />
            </FieldLabel>
            <FieldLabel label="Notification Email">
              <input
                type="email"
                value={settings.notificationEmail}
                onChange={(event) => update("notificationEmail", event.target.value)}
                className="admin-input"
              />
            </FieldLabel>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            PayNow QR
          </h2>
          <div className="flex items-center gap-4">
            <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-detective-blue-100 bg-detective-blue-50">
              {settings.payNowQrImage ? (
                <Image
                  src={settings.payNowQrImage}
                  alt="PayNow QR preview"
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-xs text-detective-blue-400">No image</span>
              )}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-detective-blue-200 px-4 py-2 text-sm font-semibold text-detective-blue-700 hover:bg-detective-blue-50">
              <Upload className="h-4 w-4" /> Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleQrUpload}
                className="hidden"
              />
            </label>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            Bank Details
          </h2>
          <div className="space-y-4">
            <FieldLabel label="Bank Name">
              <input
                value={settings.bankName}
                onChange={(event) => update("bankName", event.target.value)}
                className="admin-input"
              />
            </FieldLabel>
            <FieldLabel label="Account Name">
              <input
                value={settings.accountName}
                onChange={(event) => update("accountName", event.target.value)}
                className="admin-input"
              />
            </FieldLabel>
            <FieldLabel label="Account Number">
              <input
                value={settings.accountNumber}
                onChange={(event) => update("accountNumber", event.target.value)}
                className="admin-input"
              />
            </FieldLabel>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-detective-blue-900">
            Content
          </h2>
          <div className="space-y-4">
            <FieldLabel label="CSR Description">
              <textarea
                rows={3}
                value={settings.csrDescription}
                onChange={(event) => update("csrDescription", event.target.value)}
                className="admin-input"
              />
            </FieldLabel>
            <FieldLabel label="Founder Message">
              <textarea
                rows={3}
                value={settings.founderMessage}
                onChange={(event) => update("founderMessage", event.target.value)}
                className="admin-input"
              />
            </FieldLabel>
          </div>
        </AdminCard>
      </div>
    </form>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
        {label}
      </span>
      {children}
    </label>
  );
}
