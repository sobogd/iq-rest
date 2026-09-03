import type { Request } from "express";

// Shared by anything that needs the visitor's actual address: auth's
// Session.ip (via session-meta.ts) and the analytics relay's forwarded `ip`
// field. Previously lived in analytics-v2/request-facts.ts, which was
// deleted along with the rest of that module's local hashing/storage — this
// one small piece of it (raw IP extraction) had a second, unrelated consumer,
// so it moved here instead of disappearing with the rest.
export function clientIp(req: Request): string {
  const raw =
    (req.headers["cf-connecting-ip"] as string | undefined) ||
    (req.headers["x-forwarded-for"] as string | undefined) ||
    req.ip ||
    "";
  return raw.split(",")[0]?.trim() || "";
}
