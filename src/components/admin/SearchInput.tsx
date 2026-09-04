"use client";

import { Search } from "lucide-react";

/** Rounded search field used above admin tables. */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-detective-blue-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-detective-blue-100 bg-white py-2.5 pl-9 pr-4 text-sm text-detective-blue-900 shadow-sm outline-none transition-colors focus:border-detective-blue-400"
      />
    </div>
  );
}
