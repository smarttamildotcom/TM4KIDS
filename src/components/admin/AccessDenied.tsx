import Link from "next/link";
import { ShieldAlert } from "lucide-react";

/** 403 screen shown when a non-admin tries to reach an admin route. */
export function AccessDenied() {
  return (
    <div className="grid min-h-screen place-items-center bg-detective-blue-50 px-4 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-100 text-red-600">
          <ShieldAlert className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-6xl font-bold text-detective-blue-900">
          403
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-detective-blue-900">
          Access Denied
        </h1>
        <p className="mt-2 max-w-sm text-detective-blue-700/80">
          You do not have permission to view this page. Only administrators may
          access this area.
        </p>
        <Link
          href="/admin/login"
          className="mt-6 inline-flex rounded-full bg-detective-blue-600 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-detective-blue-700"
        >
          Go to Admin Login
        </Link>
      </div>
    </div>
  );
}
