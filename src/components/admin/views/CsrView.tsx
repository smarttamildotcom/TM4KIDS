"use client";

import { useMemo, useState, type FormEvent } from "react";
import { HeartHandshake, Plus, Wallet, Gift, Building2 } from "lucide-react";
import { AdminSectionHeading, AdminCard } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { Modal } from "@/components/admin/Modal";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { computeDashboardStats } from "@/services/admin/analytics";
import { formatDate, formatMoney } from "@/services/admin/format";

export function CsrView() {
  const admin = useAdminData();
  const [showForm, setShowForm] = useState(false);

  const sortedDonations = useMemo(() => {
    if (!admin) return [];
    return [...admin.data.donations].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [admin]);

  if (!admin) return <AdminLoading />;

  const stats = computeDashboardStats(admin.data);
  const balance = stats.totalContributions - stats.totalDonationsMade;
  const latest = sortedDonations[0];
  const organisations = Array.from(
    new Set(admin.data.donations.map((donation) => donation.organisation)),
  );

  return (
    <div>
      <AdminSectionHeading
        title="CSR Reports"
        description="Corporate social responsibility contributions and donations."
        action={
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-detective-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-detective-orange-600"
          >
            <Plus className="h-4 w-4" /> Add Donation Record
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Wallet}
          label="Total Contributions Received"
          value={formatMoney(stats.totalContributions)}
          accent="bg-detective-blue-100 text-detective-blue-700"
        />
        <SummaryCard
          icon={Gift}
          label="Total Donations Made"
          value={formatMoney(stats.totalDonationsMade)}
          accent="bg-detective-orange-100 text-detective-orange-600"
        />
        <SummaryCard
          icon={HeartHandshake}
          label="Balance Available"
          value={formatMoney(balance)}
          accent="bg-green-100 text-green-700"
        />
        <SummaryCard
          icon={Building2}
          label="Supported Organisations"
          value={String(organisations.length)}
          accent="bg-detective-yellow-100 text-detective-blue-900"
        />
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h2 className="font-display text-lg font-bold text-detective-blue-900">
            Latest Donation
          </h2>
          {latest ? (
            <div className="mt-3 text-sm text-detective-blue-700">
              <p className="font-semibold text-detective-blue-900">
                {latest.organisation}
              </p>
              <p>
                {formatMoney(latest.amount)} · {formatDate(latest.date)}
              </p>
              {latest.notes && <p className="mt-1 text-detective-blue-500">{latest.notes}</p>}
            </div>
          ) : (
            <p className="mt-3 text-sm text-detective-blue-500">No donations yet.</p>
          )}
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-detective-blue-400">
            Next Planned Donation
          </p>
          <p className="text-sm text-detective-blue-700">
            To be scheduled from the available balance.
          </p>
        </AdminCard>

        <AdminCard>
          <h2 className="font-display text-lg font-bold text-detective-blue-900">
            Supported Organisations
          </h2>
          {organisations.length === 0 ? (
            <p className="mt-3 text-sm text-detective-blue-500">None yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {organisations.map((organisation) => (
                <li
                  key={organisation}
                  className="flex items-center gap-2 text-detective-blue-800"
                >
                  <Building2 className="h-4 w-4 text-detective-blue-400" />
                  {organisation}
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-lg font-bold text-detective-blue-900">
          Donation History
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-detective-blue-100 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-detective-blue-50/70 text-xs uppercase tracking-wide text-detective-blue-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Organisation</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
                <th className="px-4 py-3 font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-detective-blue-50">
              {sortedDonations.map((donation) => (
                <tr key={donation.id} className="text-detective-blue-900">
                  <td className="px-4 py-3 font-semibold">{donation.organisation}</td>
                  <td className="px-4 py-3">{formatMoney(donation.amount)}</td>
                  <td className="px-4 py-3">{formatDate(donation.date)}</td>
                  <td className="px-4 py-3 text-detective-blue-600">
                    {donation.notes || "—"}
                  </td>
                  <td className="px-4 py-3 text-detective-blue-600">
                    {donation.receiptName || "—"}
                  </td>
                </tr>
              ))}
              {sortedDonations.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-detective-blue-500"
                  >
                    No contributions recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <AddDonationModal
          onClose={() => setShowForm(false)}
          onSave={(donation) => {
            admin.addDonation(donation);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-3xl border border-detective-blue-100 bg-white p-5 shadow-sm">
      <span className={`grid h-11 w-11 place-items-center rounded-2xl ${accent}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-2xl font-bold text-detective-blue-900">
        {value}
      </p>
      <p className="text-sm font-semibold text-detective-blue-700">{label}</p>
    </div>
  );
}

function AddDonationModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (donation: {
    organisation: string;
    amount: number;
    date: string;
    notes?: string;
    receiptName?: string;
  }) => void;
}) {
  const [organisation, setOrganisation] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [receiptName, setReceiptName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!organisation.trim() || !amount) {
      setError("Please enter an organisation and amount.");
      return;
    }
    onSave({
      organisation: organisation.trim(),
      amount: Number(amount),
      date: new Date(date).toISOString(),
      notes: notes.trim() || undefined,
      receiptName: receiptName || undefined,
    });
  }

  return (
    <Modal title="Add donation record" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
            Organisation
          </span>
          <input
            value={organisation}
            onChange={(event) => setOrganisation(event.target.value)}
            className="admin-input"
            placeholder="Charity or foundation name"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
              Amount (SGD)
            </span>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="admin-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
              Date
            </span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="admin-input"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
            Notes
          </span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={2}
            className="admin-input"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
            Receipt Upload
          </span>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(event) => setReceiptName(event.target.files?.[0]?.name ?? "")}
            className="block w-full text-sm text-detective-blue-600 file:mr-3 file:rounded-full file:border-0 file:bg-detective-blue-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-detective-blue-700"
          />
        </label>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-detective-blue-200 px-5 py-2.5 text-sm font-semibold text-detective-blue-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-detective-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-detective-orange-600"
          >
            Save donation
          </button>
        </div>
      </form>
    </Modal>
  );
}
