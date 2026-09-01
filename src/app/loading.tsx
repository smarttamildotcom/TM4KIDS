import { Search } from "lucide-react";

export default function Loading() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-detective-blue-50/50 px-4 text-center">
      <div role="status">
        <span
          aria-hidden="true"
          className="mx-auto grid h-16 w-16 animate-pulse place-items-center rounded-full bg-detective-yellow-400 text-detective-blue-900 shadow-lg"
        >
          <Search className="h-7 w-7" />
        </span>
        <p className="mt-4 font-display font-semibold text-detective-blue-700">
          Loading your BrandQuest…
        </p>
      </div>
    </main>
  );
}