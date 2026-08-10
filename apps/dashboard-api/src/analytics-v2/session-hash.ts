import { createHash } from "crypto";
import type { Request } from "express";

/** Bucket width used to make concurrent "create a visit" races converge on the
 *  same key instead of inserting two rows. */
const KEY_BUCKET_MS = 60_000;

/** Day-scoped device key: sha256(salt | ip | ua | extra). The salt rotates daily
 *  and the old one is destroyed, so the hash is unlinkable across salt-days.
 *  `extra` (see hashEntropy) separates people who share an ip+ua behind a NAT. */
export function sessionHash(salt: string, ip: string, ua: string, extra = ""): string {
  return createHash("sha256").update(`${salt}|${ip}|${ua}|${extra}`).digest("hex");
}

/**
 * Dedup key of one visit: sha256(hash | userId | bucket).
 *
 * The device hash alone cannot be the key — the same device produces many
 * visits (a new one after 30 minutes of silence, and a separate one per human
 * who signs in on it). `bucket` is derived from the visit's start time, so a
 * later visit on the same device gets a different key while two racing requests
 * that start the same visit converge on one.
 */
export function visitKey(hash: string, userId: string | null, startedAt: Date): string {
  const bucket = Math.floor(startedAt.getTime() / KEY_BUCKET_MS);
  return createHash("sha256").update(`${hash}|${userId ?? ""}|${bucket}`).digest("hex");
}

export function readCookie(req: Request, name: string): string | undefined {
  const fromParser = (req.cookies as Record<string, string | undefined> | undefined)?.[name];
  if (fromParser) return fromParser;
  const raw = req.headers.cookie || "";
  const m = raw.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}
