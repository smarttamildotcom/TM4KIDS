"use client";

import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
import {
  exportToCsv,
  exportToExcel,
  exportToPdf,
  type ExportColumn,
} from "@/services/admin/export";

/** CSV / Excel / PDF export buttons for any admin table. */
export function ExportButtons<Row>({
  filename,
  title,
  columns,
  rows,
}: {
  filename: string;
  title: string;
  columns: ExportColumn<Row>[];
  rows: Row[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => exportToCsv(`${filename}.csv`, columns, rows)}
        className="inline-flex items-center gap-1.5 rounded-full border border-detective-blue-200 bg-white px-4 py-2 text-sm font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
      >
        <FileDown className="h-4 w-4" /> CSV
      </button>
      <button
        type="button"
        onClick={() => exportToExcel(`${filename}.xls`, columns, rows)}
        className="inline-flex items-center gap-1.5 rounded-full border border-detective-blue-200 bg-white px-4 py-2 text-sm font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
      >
        <FileSpreadsheet className="h-4 w-4" /> Excel
      </button>
      <button
        type="button"
        onClick={() => exportToPdf(`${filename}.pdf`, title, columns, rows)}
        className="inline-flex items-center gap-1.5 rounded-full bg-detective-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-detective-orange-600"
      >
        <FileText className="h-4 w-4" /> PDF
      </button>
    </div>
  );
}
