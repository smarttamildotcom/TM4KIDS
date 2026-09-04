/** Mock authentication model. No database — accounts live in localStorage only. */

/** Membership tiers. Only ACTIVE accounts may open Worlds 3–15. */
export type MembershipStatus = "FREE" | "PENDING" | "ACTIVE";

export type AuthUser = {
  id: string;
  studentName: string;
  parentName?: string;
  age: number;
  school?: string;
  country: string;
  email: string;
  membershipStatus: MembershipStatus;
};

export type RegisterInput = Omit<AuthUser, "id" | "membershipStatus"> & {
  password: string;
};

export type LoginInput = {
  studentName: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };
