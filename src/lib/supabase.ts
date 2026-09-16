import { createClient } from "@supabase/supabase-js";

const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
// Supabase supports both legacy anonymous keys and the current publishable keys.
const configuredAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

/**
 * Keep static generation independent from hosting configuration. Authentication
 * calls still fail clearly at runtime until both public Supabase variables are
 * configured with valid values.
 */
function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const isSupabaseConfigured =
  isHttpUrl(configuredUrl) && Boolean(configuredAnonKey);

const supabaseUrl = isHttpUrl(configuredUrl)
  ? configuredUrl
  : "https://placeholder.supabase.co";
const supabaseAnonKey = configuredAnonKey || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
