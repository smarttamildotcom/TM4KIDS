/** Mock authentication model. No database — accounts live in localStorage only. */

export type AuthUser = {
  id: string;
  studentName: string;
  parentName?: string;
  age: number;
  school?: string;
  country: string;
  email: string;
};

export type RegisterInput = Omit<AuthUser, "id"> & { password: string };

export type LoginInput = {
  studentName: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };
