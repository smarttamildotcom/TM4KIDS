"use client";

import { jsPDF } from "jspdf";

/**
 * Lightweight table export helpers (CSV, Excel and PDF) used by the admin
 * dashboard. Kept dependency-light: CSV/Excel are generated as text/HTML and
 * PDF uses the jsPDF instance already bundled for certificates.
 */

export type ExportColumn<Row> = {
  header: string;
  value: (row: Row) => string | number;
};

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeCsv(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function exportToCsv<Row>(
  filename: string,
  columns: ExportColumn<Row>[],
  rows: Row[],
): void {
  const header = columns.map((column) => escapeCsv(column.header)).join(",");
  const body = rows
    .map((row) => columns.map((column) => escapeCsv(column.value(row))).join(","))
    .join("\n");
  const content = `${header}\n${body}`;
  triggerDownload(new Blob([content], { type: "text/csv;charset=utf-8;" }), filename);
}

export function exportToExcel<Row>(
  filename: string,
  columns: ExportColumn<Row>[],
  rows: Row[],
): void {
  const head = columns.map((column) => `<th>${column.header}</th>`).join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${columns.map((column) => `<td>${column.value(row)}</td>`).join("")}</tr>`,
    )
    .join("");
  const html = `<table border="1"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  triggerDownload(
    new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" }),
    filename,
  );
}

export function exportToPdf<Row>(
  filename: string,
  title: string,
  columns: ExportColumn<Row>[],
  rows: Row[],
): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const marginX = 40;
  let y = 50;

  doc.setFontSize(16);
  doc.setTextColor(11, 47, 92);
  doc.text(title, marginX, y);
  y += 24;

  const pageWidth = doc.internal.pageSize.getWidth();
  const columnWidth = (pageWidth - marginX * 2) / columns.length;

  doc.setFontSize(10);
  doc.setTextColor(224, 90, 5);
  columns.forEach((column, index) => {
    doc.text(column.header, marginX + index * columnWidth, y);
  });
  y += 8;
  doc.setDrawColor(200);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 14;

  doc.setTextColor(20, 20, 20);
  rows.forEach((row) => {
    if (y > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      y = 50;
    }
    columns.forEach((column, index) => {
      const text = String(column.value(row));
      doc.text(text.slice(0, 24), marginX + index * columnWidth, y);
    });
    y += 18;
  });

  doc.save(filename);
}
