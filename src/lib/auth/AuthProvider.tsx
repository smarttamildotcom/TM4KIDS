"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useGame } from "@/lib/gamification/GameProvider";
import {
  clearSession,
  loginWithPassword,
  loginWithProvider,
  persistMembershipStatus,
  readSession,
  registerAccount,
  requestPasswordReset,
  writeMembershipCookie,
  writeSession,
} from "./mock-auth";
import type {
  AuthResult,
  AuthUser,
  LoginInput,
  MembershipStatus,
  RegisterInput,
} from "./types";

type AuthContextValue = {
  user: AuthUser | null;
  /** False during the first client render, before the session is read. */
  isLoaded: boolean;
  login: (input: LoginInput) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  loginWith: (provider: "google" | "apple") => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  setMembershipStatus: (status: MembershipStatus) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Mock auth session provider. Swap the mock-auth calls for a real API later. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setProfile } = useGame();

  useEffect(() => {
    const session = readSession();
    setUser(session);
    // Keep the middleware cookie in step with a restored session.
    if (session) writeMembershipCookie(session.membershipStatus);
    setIsLoaded(true);
  }, []);

  // Keep the detective profile name in sync with the signed-in account.
  useEffect(() => {
    if (user) setProfile({ name: user.studentName });
  }, [user, setProfile]);

  const applyResult = useCallback(
    (result: AuthResult, remember: boolean): AuthResult => {
      if (result.ok) {
        writeSession(result.user, remember);
        setUser(result.user);
      }
      return result;
    },
    [],
  );

  const login = useCallback(
    async (input: LoginInput) =>
      applyResult(await loginWithPassword(input), input.rememberMe),
    [applyResult],
  );

  const register = useCallback(
    async (input: RegisterInput) => applyResult(await registerAccount(input), true),
    [applyResult],
  );

  const loginWith = useCallback(
    async (provider: "google" | "apple") =>
      applyResult(await loginWithProvider(provider), true),
    [applyResult],
  );

  const resetPassword = useCallback(
    (email: string) => requestPasswordReset(email),
    [],
  );

  const setMembershipStatus = useCallback((status: MembershipStatus) => {
    const updated = persistMembershipStatus(status);
    if (updated) setUser(updated);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoaded,
      login,
      register,
      loginWith,
      resetPassword,
      setMembershipStatus,
      logout,
    }),
    [
      user,
      isLoaded,
      login,
      register,
      loginWith,
      resetPassword,
      setMembershipStatus,
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
