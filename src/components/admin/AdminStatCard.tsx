import type { LucideIcon } from "lucide-react";

type AdminStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  /** Tailwind classes for the icon badge background/text. */
  accent: string;
};

/** Compact metric tile for the admin dashboard home. */
export function AdminStatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent,
}: AdminStatCardProps) {
  return (
    <div className="rounded-3xl border border-detective-blue-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${accent}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-detective-blue-900">
        {value}
      </p>
      <p className="font-display font-semibold text-detective-blue-900">{label}</p>
      {hint && <p className="mt-1 text-sm text-detective-blue-700/70">{hint}</p>}
    </div>
  );
}
