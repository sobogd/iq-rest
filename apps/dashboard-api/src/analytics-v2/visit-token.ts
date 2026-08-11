import { createHmac, timingSafeEqual } from "crypto";

// Visit continuation token: `<sessionId>.<issuedAtMs>.<hmac>`. The ingest
// response hands it to the client, which keeps it ONLY in a module variable of
// the live page (never in a cookie or any storage — the pipeline stays
// consentless) and echoes it on subsequent batches. It exists because the
// device hash is built from the network prefix + Cloudflare geo, and on mobile
// networks those flap mid-visit: the same person, same tab, produced a second
// hash and therefore a second session row seconds after the first. The token
// pins the batch to the visit row directly, so a hash change no longer splits.
//
// The HMAC only proves WE minted the id — without it anyone could append
// events to an arbitrary session by guessing cuids. `iat` bounds replay; the
// real liveness gate is the row's own lastAt (30-min idle window), checked by
// the visit service.

const TOKEN_TTL_MS = 30 * 60_000;
const TOKEN_MAX_CHARS = 200;
// Domain separation from the device JWTs that share the same secret.
const SCOPE = "visit-v1";

function mac(sessionId: string, iat: number, secret: string): Buffer {
  return createHmac("sha256", secret).update(`${SCOPE}|${sessionId}|${iat}`).digest();
}

export function signVisitToken(sessionId: string, secret: string, now: Date): string {
  const iat = now.getTime();
  return `${sessionId}.${iat}.${mac(sessionId, iat, secret).toString("base64url")}`;
}

/** Returns the sessionId a valid, unexpired token points at, else null. */
export function verifyVisitToken(token: string, secret: string, now: Date): string | null {
  if (token.length > TOKEN_MAX_CHARS) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [sessionId, iatRaw, sig] = parts;
  const iat = Number(iatRaw);
  if (!sessionId || !Number.isFinite(iat)) return null;
  const age = now.getTime() - iat;
  if (age > TOKEN_TTL_MS || age < -60_000) return null;
  let given: Buffer;
  try {
    given = Buffer.from(sig, "base64url");
  } catch {
    return null;
  }
  const expected = mac(sessionId, iat, secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  return sessionId;
}
