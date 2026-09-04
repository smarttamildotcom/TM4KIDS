"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { AdminSectionHeading } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { SearchInput } from "@/components/admin/SearchInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Modal } from "@/components/admin/Modal";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { formatDate } from "@/services/admin/format";
import type { AdminMember, AdminMemberStatus } from "@/services/admin/types";

const STATUS_OPTIONS: AdminMemberStatus[] = ["Active", "Pending", "Free", "Rejected"];

export function MembersView() {
  const admin = useAdminData();
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState<AdminMember | null>(null);
  const [editing, setEditing] = useState<AdminMember | null>(null);
  const [deleting, setDeleting] = useState<AdminMember | null>(null);

  const filtered = useMemo(() => {
    if (!admin) return [];
    const term = query.trim().toLowerCase();
    if (!term) return admin.data.members;
    return admin.data.members.filter((member) =>
      [member.id, member.name, member.email, member.country]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [admin, query]);

  if (!admin) return <AdminLoading />;

  const hasMembers = admin.data.members.length > 0;

  return (
    <div>
      <AdminSectionHeading
        title="Members"
        description="Every registered detective."
        action={
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search members…"
          />
        }
      />

      {!hasMembers ? (
        <p className="rounded-3xl border border-detective-blue-100 bg-white p-10 text-center text-detective-blue-500 shadow-sm">
          No members have registered yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-detective-blue-100 bg-white shadow-sm">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="bg-detective-blue-50/70 text-xs uppercase tracking-wide text-detective-blue-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Member ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Worlds</th>
                <th className="px-4 py-3 font-semibold">Certificate</th>
                <th className="px-4 py-3 font-semibold">Last Login</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-detective-blue-50">
              {filtered.map((member) => (
                <tr key={member.id} className="text-detective-blue-900">
                  <td className="px-4 py-3 font-mono text-xs text-detective-blue-500">
                    {member.id}
                  </td>
                  <td className="px-4 py-3 font-semibold">{member.name}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3">{member.country}</td>
                  <td className="px-4 py-3">{formatDate(member.dateJoined)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-4 py-3">
                    {member.worldsCompleted}/{member.totalWorlds}
                  </td>
                  <td className="px-4 py-3">
                    {member.certificateIssued ? (
                      <span className="inline-flex items-center gap-1 text-green-700">
                        <CheckCircle2 className="h-4 w-4" /> {member.certificateNumber}
                      </span>
                    ) : (
                      <span className="text-detective-blue-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {member.lastLogin ? formatDate(member.lastLogin) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <IconAction
                        label="View"
                        onClick={() => setViewing(member)}
                        icon={Eye}
                        tone="blue"
                      />
                      <IconAction
                        label="Edit"
                        onClick={() => setEditing(member)}
                        icon={Pencil}
                        tone="blue"
                      />
                      <IconAction
                        label="Delete"
                        onClick={() => setDeleting(member)}
                        icon={Trash2}
                        tone="red"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-10 text-center text-detective-blue-500"
                  >
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {viewing && (
        <Modal title="Member details" onClose={() => setViewing(null)}>
          <dl className="space-y-3 text-sm">
            <DetailRow label="Member ID" value={viewing.id} />
            <DetailRow label="Name" value={viewing.name} />
            <DetailRow label="Email" value={viewing.email} />
            <DetailRow label="Country" value={viewing.country} />
            <DetailRow label="Date Joined" value={formatDate(viewing.dateJoined)} />
            <DetailRow label="Status" value={viewing.status} />
            <DetailRow
              label="Worlds Completed"
              value={`${viewing.worldsCompleted}/${viewing.totalWorlds}`}
            />
            <DetailRow
              label="Certificate"
              value={viewing.certificateNumber ?? "Not issued"}
            />
            <DetailRow
              label="Last Login"
              value={viewing.lastLogin ? formatDate(viewing.lastLogin) : "—"}
            />
          </dl>
        </Modal>
      )}

      {editing && (
        <EditMemberModal
          member={editing}
          onClose={() => setEditing(null)}
          onSave={(updated) => {
            admin.updateMember(updated);
            setEditing(null);
          }}
        />
      )}

      {deleting && (
        <Modal
          title="Delete member"
          onClose={() => setDeleting(null)}
          footer={
            <>
              <button
                type="button"
                onClick={() => setDeleting(null)}
                className="rounded-full border border-detective-blue-200 px-5 py-2.5 text-sm font-semibold text-detective-blue-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  admin.deleteMember(deleting.id);
                  setDeleting(null);
                }}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </>
          }
        >
          <p className="text-sm text-detective-blue-700">
            Are you sure you want to permanently delete{" "}
            <strong>{deleting.name}</strong>? This cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="font-semibold text-detective-blue-500">{label}</dt>
      <dd className="text-right text-detective-blue-900">{value}</dd>
    </div>
  );
}

function IconAction({
  label,
  onClick,
  icon: Icon,
  tone,
}: {
  label: string;
  onClick: () => void;
  icon: typeof Eye;
  tone: "blue" | "red";
}) {
  const tones = {
    blue: "text-detective-blue-600 hover:bg-detective-blue-50",
    red: "text-red-600 hover:bg-red-50",
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${tones[tone]}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function EditMemberModal({
  member,
  onClose,
  onSave,
}: {
  member: AdminMember;
  onClose: () => void;
  onSave: (member: AdminMember) => void;
}) {
  const [draft, setDraft] = useState<AdminMember>(member);

  return (
    <Modal
      title="Edit member"
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-detective-blue-200 px-5 py-2.5 text-sm font-semibold text-detective-blue-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="rounded-full bg-detective-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-detective-blue-700"
          >
            Save changes
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Name">
          <input
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            className="admin-input"
          />
        </Field>
        <Field label="Email">
          <input
            value={draft.email}
            onChange={(event) => setDraft({ ...draft, email: event.target.value })}
            className="admin-input"
          />
        </Field>
        <Field label="Country">
          <input
            value={draft.country}
            onChange={(event) => setDraft({ ...draft, country: event.target.value })}
            className="admin-input"
          />
        </Field>
        <Field label="Membership Status">
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft({
                ...draft,
                status: event.target.value as AdminMemberStatus,
              })
            }
            className="admin-input"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
        {label}
      </span>
      {children}
    </label>
  );
}
