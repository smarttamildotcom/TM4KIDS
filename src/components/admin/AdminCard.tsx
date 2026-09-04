import type { ReactNode } from "react";

/** Rounded, soft-shadowed surface used across the admin content area. */
export function AdminCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-detective-blue-100 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/** Section heading with an optional description and trailing action slot. */
export function AdminSectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-bold text-detective-blue-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-detective-blue-700/80">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
