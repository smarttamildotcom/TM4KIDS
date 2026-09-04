"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Shield, User } from "lucide-react";

/** Standalone admin login screen. Credentials are verified server-side. */
export function AdminLoginView() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(data?.error ?? "Login failed. Please try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-detective-blue-900 via-detective-blue-700 to-detective-blue-600 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-detective-orange-500 text-white shadow-lg">
            <Shield className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-detective-blue-900">
            Brand Quest Admin
          </h1>
          <p className="mt-1 text-sm text-detective-blue-700/70">
            Sign in to manage the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
              Admin ID
            </span>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-detective-blue-400" />
              <input
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                autoComplete="username"
                required
                className="admin-input pl-9"
                placeholder="Enter admin ID"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-detective-blue-700">
              Password
            </span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-detective-blue-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="admin-input pl-9"
                placeholder="Enter password"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-detective-blue-600 px-5 py-3 font-display font-semibold text-white transition-colors hover:bg-detective-blue-700 disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
