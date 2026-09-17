import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Temporary non-secret diagnostic for the production authentication setup.
 * It deliberately reports only configuration and connectivity status.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const key = publishableKey || anonKey;

  const result = {
    supabaseUrlConfigured: Boolean(url),
    supabaseUrlValid: isHttpUrl(url),
    publicKeyConfigured: Boolean(key),
    publicKeyKind: publishableKey ? "publishable" : anonKey ? "anon" : "missing",
    serverKeyConfigured: Boolean(
      process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
    ),
    serverKeyKind: process.env.SUPABASE_SECRET_KEY
      ? "secret"
      : process.env.SUPABASE_SERVICE_ROLE_KEY
        ? "service-role"
        : "missing",
    authApi: "not-checked" as "not-checked" | "reachable" | "rejected" | "unreachable",
    profileTable: "not-checked" as "not-checked" | "reachable" | "rejected" | "unreachable",
  };

  if (isHttpUrl(url) && key) {
    try {
      const response = await fetch(new URL("/auth/v1/settings", url), {
        headers: { apikey: key },
        cache: "no-store",
      });
      result.authApi = response.ok ? "reachable" : "rejected";
    } catch {
      result.authApi = "unreachable";
    }
  }

  if (result.serverKeyConfigured) {
    try {
      const { error } = await getServiceClient()
        .from("users")
        .select("id", { head: true })
        .limit(1);
      result.profileTable = error ? "rejected" : "reachable";
    } catch {
      result.profileTable = "unreachable";
    }
  }

  return NextResponse.json(result);
}
