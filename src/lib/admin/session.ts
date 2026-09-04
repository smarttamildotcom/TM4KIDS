/**
 * Stateless admin session tokens signed with HMAC-SHA256.
 *
 * Uses the Web Crypto API so the same code runs in both the Node.js route
 * handlers and the Edge middleware. The token is `base64url(payload).base64url(sig)`;
 * the payload is only trusted after the signature verifies.
 */

const encoder = new TextEncoder();

export type AdminTokenPayload = {
  /** Subject — always "admin" for now. */
  sub: string;
  /** Expiry as epoch milliseconds. */
  exp: number;
};

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array<ArrayBuffer> {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  const binary = atob(base64 + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Signs a payload, returning a compact `body.signature` token. */
export async function signAdminToken(
  secret: string,
  payload: AdminTokenPayload,
): Promise<string> {
  const key = await importKey(secret);
  const body = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/**
 * Verifies a token's signature and expiry. Returns the payload when valid, or
 * null for any tampered, malformed or expired token.
 */
export async function verifyAdminToken(
  secret: string,
  token: string | undefined | null,
): Promise<AdminTokenPayload | null> {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  try {
    const key = await importKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signature),
      encoder.encode(body),
    );
    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(body)),
    ) as AdminTokenPayload;

    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
