import { createHash, timingSafeEqual } from "crypto";

/**
 * Generate a cryptographically secure session token (64 hex chars).
 */
export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

/**
 * Hash a session token with SHA-256 for storage in DB.
 * We never store raw tokens — only compare hashes.
 */
export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Generate a cryptographically secure 6-digit OTP.
 */
export function generateOTP(): string {
  const array = new Uint8Array(4);
  crypto.getRandomValues(array);
  const num = ((array[0] << 24) | (array[1] << 16) | (array[2] << 8) | array[3]) >>> 0;
  const otp = (num % 900000) + 100000; // 100000–999999
  return otp.toString();
}

/**
 * Hash OTP with SHA-256 for storage in DB.
 */
export function hashOTP(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

/**
 * Constant-time comparison of two hex strings.
 * Prevents timing attacks when comparing session tokens or OTP hashes.
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

/** Max OTP verification attempts before lockout */
export const MAX_OTP_ATTEMPTS = 5;

/** OTP expiry in milliseconds (5 minutes) */
export const OTP_EXPIRY_MS = 5 * 60 * 1000;

/** Cookie options for auth cookies */
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};
