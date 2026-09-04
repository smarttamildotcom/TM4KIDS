"use client";

import { useMemo, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { AdminSectionHeading } from "@/components/admin/AdminCard";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { SearchInput } from "@/components/admin/SearchInput";
import { useAdminData } from "@/hooks/admin/useAdminData";
import { formatDate } from "@/services/admin/format";
import { downloadCertificatePdf } from "@/services/admin/certificate";

export function CertificatesView() {
  const admin = useAdminData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!admin) return [];
    const term = query.trim().toLowerCase();
    if (!term) return admin.data.certificates;
    return admin.data.certificates.filter((certificate) =>
      [certificate.name, certificate.certificateNumber]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [admin, query]);

  if (!admin) return <AdminLoading />;

  return (
    <div>
      <AdminSectionHeading
        title="Certificates"
        description="Issued completion certificates."
        action={
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search certificates…"
          />
        }
      />

      <div className="overflow-x-auto rounded-3xl border border-detective-blue-100 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-detective-blue-50/70 text-xs uppercase tracking-wide text-detective-blue-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Certificate Number</th>
              <th className="px-4 py-3 font-semibold">Completion Date</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-detective-blue-50">
            {filtered.map((certificate) => (
              <tr key={certificate.id} className="text-detective-blue-900">
                <td className="px-4 py-3 font-semibold">{certificate.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-detective-blue-500">
                  {certificate.certificateNumber}
                </td>
                <td className="px-4 py-3">
                  {formatDate(certificate.completionDate)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        downloadCertificatePdf(
                          certificate.name,
                          certificate.certificateNumber,
                          certificate.completionDate,
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-detective-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-detective-blue-700"
                    >
                      <Download className="h-4 w-4" /> Download PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => admin.reissueCertificate(certificate.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-detective-blue-200 px-4 py-2 text-xs font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
                    >
                      <RefreshCw className="h-4 w-4" /> Reissue
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-detective-blue-500"
                >
                  No certificates issued yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
