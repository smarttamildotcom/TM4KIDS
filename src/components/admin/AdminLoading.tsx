import { Loader2 } from "lucide-react";

/** Simple centered spinner shown while the admin data store hydrates. */
export function AdminLoading() {
  return (
    <div className="grid min-h-[40vh] place-items-center text-detective-blue-600">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
        <p className="font-display font-semibold">Loading admin data…</p>
      </div>
    </div>
  );
}
