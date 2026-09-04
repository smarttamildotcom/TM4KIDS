"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useGame } from "@/lib/gamification/GameProvider";
import { supabase } from "@/lib/supabase";
import type { ProgressRow } from "@/lib/supabase/types";
import {
  clearAuthCookies,
  loadCurrentUser,
  loadProgress,
  loginWithPassword,
  loginWithProvider,
  registerAccount,
  requestPasswordReset,
  signOut,
  writeMembershipCookie,
  writeSessionCookie,
} from "./supabase-auth";
import type {
  AuthResult,
  AuthUser,
  LoginInput,
  MembershipStatus,
  RegisterInput,
} from "./types";

type AuthContextValue = {
  user: AuthUser | null;
  /** The signed-in detective's world progress from Supabase. */
  progress: ProgressRow[];
  /** False during the first client render, before the session is read. */
  isLoaded: boolean;
  login: (input: LoginInput) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  loginWith: (provider: "google" | "apple") => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  setMembershipStatus: (status: MembershipStatus) => void;
  /** Re-reads the profile, membership and progress from Supabase. */
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Supabase-backed auth session provider. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setProfile } = useGame();
  const isRefreshing = useRef(false);

  const syncFromSupabase = useCallback(async () => {
    if (isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      const nextUser = await loadCurrentUser();
      setUser(nextUser);

      if (nextUser) {
        writeSessionCookie(true);
        writeMembershipCookie(nextUser.membershipStatus);
        setProgress(await loadProgress(nextUser.id));
      } else {
        clearAuthCookies();
        setProgress([]);
      }
    } finally {
      isRefreshing.current = false;
      setIsLoaded(true);
    }
  }, []);

  // Initial load plus reaction to Supabase auth changes (sign in/out, refresh).
  useEffect(() => {
    void syncFromSupabase();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncFromSupabase();
    });
    return () => subscription.unsubscribe();
  }, [syncFromSupabase]);

  // Re-check membership when the tab regains focus, so an admin approval
  // unlocks premium worlds without a hard refresh.
  useEffect(() => {
    function onFocus() {
      void syncFromSupabase();
    }
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [syncFromSupabase]);

  // Keep the detective profile name in sync with the signed-in account.
  useEffect(() => {
    if (user) setProfile({ name: user.studentName });
  }, [user, setProfile]);

  const login = useCallback(async (input: LoginInput) => {
    const result = await loginWithPassword(input);
    if (result.ok) {
      setUser(result.user);
      writeSessionCookie(true);
      writeMembershipCookie(result.user.membershipStatus);
      void loadProgress(result.user.id).then(setProgress);
    }
    return result;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const result = await registerAccount(input);
    if (result.ok) {
      setUser(result.user);
      writeSessionCookie(true);
      writeMembershipCookie(result.user.membershipStatus);
      void loadProgress(result.user.id).then(setProgress);
    }
    return result;
  }, []);

  const loginWith = useCallback(
    (provider: "google" | "apple") => loginWithProvider(provider),
    [],
  );

  const resetPassword = useCallback(
    (email: string) => requestPasswordReset(email),
    [],
  );

  // Optimistic local update used by the contribution flow; the server holds
  // the source of truth and refresh() reconciles it.
  const setMembershipStatus = useCallback((status: MembershipStatus) => {
    setUser((current) => (current ? { ...current, membershipStatus: status } : current));
    writeMembershipCookie(status);
  }, []);

  const refresh = useCallback(() => syncFromSupabase(), [syncFromSupabase]);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setProgress([]);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      progress,
      isLoaded,
      login,
      register,
      loginWith,
      resetPassword,
      setMembershipStatus,
      refresh,
      logout,
    }),
    [
      user,
      progress,
      isLoaded,
      login,
      register,
      loginWith,
      resetPassword,
      setMembershipStatus,
      refresh,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>.");
  }
  return context;
}
