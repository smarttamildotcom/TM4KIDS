"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Shield, Sparkles } from "lucide-react";
import { adminFutureModules, adminNavItems } from "@/lib/admin/nav";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Dark, gradient admin sidebar with primary nav, future modules and logout. */
export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { logout, isLoggingOut } = useAdminAuth();

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-detective-blue-900 via-detective-blue-900 to-detective-blue-700 text-white">
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-detective-orange-500 shadow-lg">
          <Shield className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-lg font-bold leading-tight">Brand Quest</p>
          <p className="text-xs text-detective-blue-200">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {adminNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-white/15 text-white shadow-inner"
                  : "text-detective-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
              {active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-detective-orange-400" />
              )}
            </Link>
          );
        })}

        <div className="px-3 pb-2 pt-5">
          <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-detective-blue-300">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> Coming soon
          </p>
        </div>
        {adminFutureModules.map((item) => (
          <span
            key={item.href}
            aria-disabled="true"
            title="Planned module"
            className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-detective-blue-300/70"
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{item.label}</span>
          </span>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={logout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-detective-blue-100 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          {isLoggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>
    </div>
  );
}
