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
// Issue timestamp (ms) of the cookies above. Only refreshAuthCookies reads it,
// to decide whether the pair is due for a rewrite.
export const AUTH_COOKIE_ISSUED_COOKIE = "iqr_session_at";

// A session is meant to live until an explicit logout, so this is the longest
// max-age browsers actually honour: Chrome 104+ clamps any cookie expiry above
// 400 days. AuthGuard re-issues the cookie on every authenticated request, so
// an account that keeps being used never reaches the ceiling.
export const AUTH_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 400;
// How stale the cookies may get before an authenticated request rewrites them.
const AUTH_COOKIE_REFRESH_AFTER_MS = 1000 * 60 * 60 * 24 * 7;

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

/** Write the auth cookies for a freshly established session. */
export function issueAuthCookies(res: Response, token: string, email: string, domain?: string): void {
  const opts = authCookieOptions(domain);
  const visible = { ...opts, httpOnly: false };
  res.cookie(SESSION_COOKIE, token, opts);
  res.cookie(EMAIL_COOKIE, email, visible);
  res.cookie(LEGACY_SESSION_COOKIE, token, opts);
  res.cookie(LEGACY_EMAIL_COOKIE, email, visible);
  res.cookie(AUTH_COOKIE_ISSUED_COOKIE, String(Date.now()), opts);
}

/** Push the cookie expiry back out so an account in regular use never reaches
 *  the browser's 400-day ceiling, and so a session issued while the cookie was
 *  capped at 7 days gets upgraded on its next request — nobody has to log in
 *  again. Called on every authenticated request, but only actually writes once
 *  a week (tracked by the iqr_session_at stamp).
 *
 *  Rewriting on every request would be wasteful — six Set-Cookie headers on
 *  every API response — and it would let an in-flight request that lands after
 *  a logout resurrect the cookie the logout had just cleared. A weekly refresh
 *  leaves 393 days of slack against the ceiling and shrinks that race to the
 *  one request a week that actually rewrites.
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
  // A missing or unparseable stamp means the session predates the stamp (i.e.
  // it still carries the old 7-day cookie) — refresh it now. A stamp in the
  // future (clock skew) reads as fresh, which is the safe direction.
  const issuedAt = Number(cookies?.[AUTH_COOKIE_ISSUED_COOKIE]);
  if (Number.isFinite(issuedAt) && Date.now() - issuedAt < AUTH_COOKIE_REFRESH_AFTER_MS) return;
  issueAuthCookies(res, session, email, domain);
  // Impersonation markers ride along with the session they belong to; letting
  // them lapse first would leave the admin holding an iqr_session/iqr_email
  // pair that no longer resolves. Impersonation therefore ends only when the
  // admin exits it — by design, there is no timer.
  const opts = authCookieOptions(domain);
  for (const name of [ADMIN_ORIG_SESSION_COOKIE, ADMIN_ORIG_EMAIL_COOKIE, ADMIN_ORIG_USER_ID_COOKIE]) {
    const value = cookies?.[name];
    if (value) res.cookie(name, value, opts);
  }
}
