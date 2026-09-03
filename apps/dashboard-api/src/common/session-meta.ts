import type { Request } from "express";
import { clientIp } from "./client-ip";

/** What we record on a Session row about the device that created it. Kept for
 *  the account's own security surface — "log out everywhere" is the blunt
 *  answer to a session left behind, and this is what a per-device list would
 *  be built from. Sessions no longer expire on their own, so a row with no
 *  provenance at all is a row nobody can reason about. */
export interface SessionMeta {
  userAgent: string | null;
  ip: string | null;
}

// Postgres would take a longer string, but a UA header is attacker-controlled
// and nothing downstream needs more than this.
const UA_MAX = 255;

export function sessionMeta(req: Request): SessionMeta {
  const ua = req.headers["user-agent"];
  return {
    userAgent: typeof ua === "string" && ua ? ua.slice(0, UA_MAX) : null,
    ip: clientIp(req) || null,
  };
}
