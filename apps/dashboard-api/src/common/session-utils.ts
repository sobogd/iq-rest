import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import type { Response } from "express";

export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function generateOTP(): string {
  const buf = randomBytes(4);
  const num = (buf.readUInt32BE(0) % 900000) + 100000;
  return num.toString();
}

export function hashOTP(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

export const MAX_OTP_ATTEMPTS = 5;
export const OTP_EXPIRY_MS = 5 * 60 * 1000;

// Cookie names carrying the session. The legacy pair is mirrored for the old
// iq-rest.com monolith — see the note in auth.controller.
export const SESSION_COOKIE = "iqr_session";
export const EMAIL_COOKIE = "iqr_email";
export const LEGACY_SESSION_COOKIE = "session";
export const LEGACY_EMAIL_COOKIE = "user_email";
export const ADMIN_ORIG_SESSION_COOKIE = "iqr_admin_original_session";
export const ADMIN_ORIG_EMAIL_COOKIE = "iqr_admin_original_email";
export const ADMIN_ORIG_USER_ID_COOKIE = "iqr_admin_original_user_id";

// A session is meant to live until an explicit logout, so this is the longest
// max-age browsers actually honour: Chrome 104+ clamps any cookie expiry above
// 400 days. AuthGuard re-issues the cookie on every authenticated request, so
// an account that keeps being used never reaches the ceiling.
export const AUTH_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 400;

export function authCookieOptions(domain?: string) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.COOKIE_SECURE === "true",
    sameSite: "lax" as const,
    maxAge: AUTH_COOKIE_MAX_AGE_MS, // express-cookie expects ms
    path: "/",
    ...(domain ? { domain } : {}),
  };
}

/** Re-issue the auth cookies with a fresh max-age, echoing the values the
 *  request already carried. Called on every authenticated request, which does
 *  two things: an active user never hits the browser's 400-day ceiling, and a
 *  session issued while the cookie was still capped at 7 days is silently
 *  upgraded on its next request — nobody has to log in again.
 *
 *  Values are echoed verbatim, never re-derived: during admin impersonation
 *  iqr_session holds the admin's token while iqr_email points at the target,
 *  and that pairing must survive the refresh untouched. */
export function refreshAuthCookies(
  res: Response,
  cookies: Record<string, string | undefined> | undefined,
  domain?: string,
): void {
  const session = cookies?.[SESSION_COOKIE];
  const email = cookies?.[EMAIL_COOKIE];
  if (!session || !email) return;
  const opts = authCookieOptions(domain);
  const visible = { ...opts, httpOnly: false };
  res.cookie(SESSION_COOKIE, session, opts);
  res.cookie(EMAIL_COOKIE, email, visible);
  res.cookie(LEGACY_SESSION_COOKIE, session, opts);
  res.cookie(LEGACY_EMAIL_COOKIE, email, visible);
  // Impersonation markers expire together with the session they belong to,
  // otherwise the admin would be left holding an iqr_session/iqr_email pair
  // that no longer resolves once the markers lapse.
  for (const name of [ADMIN_ORIG_SESSION_COOKIE, ADMIN_ORIG_EMAIL_COOKIE, ADMIN_ORIG_USER_ID_COOKIE]) {
    const value = cookies?.[name];
    if (value) res.cookie(name, value, opts);
  }
}
