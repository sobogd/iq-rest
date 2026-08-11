import type { Request } from "express";
import { UAParser } from "ua-parser-js";

// Everything we derive from the raw request. Kept in one place because both the
// ingest controller and the server-side registration hook need the exact same
// derivation — a mismatch there would put a registration on a different visit
// than the pageviews that led to it.

const LANG_MAX = 35;
/** Accept-Language is used whole (not just the primary tag) as hash entropy;
 *  cap it so a pathological header can't blow up the digest input. */
const LANG_HEADER_MAX = 200;

/** Raw client IP — used ONLY in memory to derive the session hash; it is never
 *  persisted anywhere in the v2 pipeline. */
export function clientIp(req: Request): string {
  const raw =
    (req.headers["cf-connecting-ip"] as string | undefined) ||
    (req.headers["x-forwarded-for"] as string | undefined) ||
    req.ip ||
    "";
  return raw.split(",")[0]?.trim() || "";
}

/**
 * Network the client is on, rather than its exact address: IPv4 keeps the /24,
 * IPv6 the /64.
 *
 * The full address is not stable enough to identify a visit. A phone on a
 * mobile network hands out temporary IPv6 addresses whose low 64 bits rotate
 * between connections, so three page loads six seconds apart arrived as three
 * different addresses — and therefore three different hashes, splitting one
 * visitor into three visits. The /64 is the part the carrier actually assigns
 * and it survives that rotation. Coarsening also means the hash input is no
 * longer a single device's address, which is the direction privacy wants
 * anyway; the entropy lost here is paid back by the locale and geo in
 * hashEntropy().
 */
const IPV4 = /^\d{1,3}(?:\.\d{1,3}){3}$/;
const IPV4_WITH_PORT = /^\d{1,3}(?:\.\d{1,3}){3}:\d{1,5}$/;

/** "0db8" and "db8" are the same group; without this they would hash as two
 *  different networks. */
function normaliseGroup(group: string): string {
  const trimmed = group.replace(/^0+/, "");
  return trimmed === "" ? "0" : trimmed.toLowerCase();
}

export function clientNetwork(req: Request): string {
  const raw = clientIp(req);
  if (!raw) return "";
  // "1.2.3.4:5678" — an x-forwarded-for hop may carry a port. Left in, it would
  // make every request its own network and therefore its own visit.
  const ip = IPV4_WITH_PORT.test(raw) ? raw.slice(0, raw.lastIndexOf(":")) : raw;
  if (ip.includes(":")) {
    const bare = ip.split("%")[0]; // drop any zone id
    // IPv4-mapped IPv6 ("::ffff:203.0.113.9"), which is what req.ip returns on
    // a dual-stack listener whenever the Cloudflare header is absent. Treating
    // it as IPv6 would keep only the leading zero groups, collapsing every such
    // visitor onto the single prefix "0:0:0:0" — one shared bucket for all of
    // them. It is an IPv4 address, so it gets the IPv4 rule.
    const mapped = bare.split(":").pop() ?? "";
    if (IPV4.test(mapped)) return mapped.split(".").slice(0, 3).join(".");

    const [head, tail] = bare.includes("::") ? bare.split("::", 2) : [bare, null];
    const left = (head ? head.split(":") : []).map(normaliseGroup);
    if (tail === null) return left.slice(0, 4).join(":");
    // "::" stands for a run of zero groups. Expanding it matters: leaving an
    // abbreviated address alone would keep the volatile low bits in the hash
    // for exactly the addresses that abbreviate.
    const right = (tail ? tail.split(":") : []).map(normaliseGroup);
    const zeros = Math.max(0, 8 - left.length - right.length);
    return [...left, ...Array(zeros).fill("0"), ...right].slice(0, 4).join(":");
  }
  const octets = ip.split(".");
  return octets.length === 4 ? octets.slice(0, 3).join(".") : ip;
}

export function clientUa(req: Request): string {
  const v = req.headers["user-agent"];
  return typeof v === "string" ? v : "";
}

export function decodeHeader(req: Request, name: string): string {
  const v = req.headers[name];
  if (typeof v !== "string" || !v.length) return "";
  try {
    return decodeURIComponent(v).slice(0, 100);
  } catch {
    return v.slice(0, 100);
  }
}

/** Full primary Accept-Language tag, e.g. "es-ES" (kept as-is, not shortened). */
export function acceptLanguage(req: Request): string | null {
  const raw = req.headers["accept-language"];
  if (typeof raw !== "string" || !raw) return null;
  const tag = raw.split(",")[0]?.split(";")[0]?.trim();
  if (!tag || tag.length > LANG_MAX || !/^[A-Za-z0-9-]+$/.test(tag)) return null;
  return tag;
}

export function classifyDevice(uaString: string): { device: string | null; os: string | null } {
  if (!uaString) return { device: null, os: null };
  try {
    const parser = new UAParser(uaString);
    const dev = parser.getDevice().type;
    const osName = (parser.getOS().name || "").toLowerCase();
    const device = dev === "mobile" || dev === "tablet" ? dev : "desktop";
    let os: string | null = "other";
    if (osName.includes("ios")) os = "ios";
    else if (osName.includes("android")) os = "android";
    else if (osName.includes("windows")) os = "windows";
    else if (osName.includes("mac") || osName.includes("os x")) os = "macos";
    else if (osName.includes("linux") || osName.includes("ubuntu") || osName.includes("fedora") || osName.includes("debian")) os = "linux";
    return { device, os };
  } catch {
    return { device: null, os: null };
  }
}

/** Facts stamped on a visit row when it is created. */
export interface VisitSeed {
  device: string | null;
  os: string | null;
  country: string;
  region: string;
  city: string;
  lang: string | null;
}

export function visitSeed(req: Request): VisitSeed {
  const { device, os } = classifyDevice(clientUa(req));
  return {
    device,
    os,
    country: (req.headers["cf-ipcountry"] as string | undefined) || "XX",
    region: decodeHeader(req, "cf-region"),
    city: decodeHeader(req, "cf-ipcity"),
    lang: acceptLanguage(req),
  };
}

/**
 * Extra hash entropy beyond ip+ua. Behind a carrier CGNAT or an office NAT the
 * ip+ua pair alone is shared by many people at once (a hundred iPhones on the
 * same Safari build look identical), which used to collapse them into a single
 * anonymous visit — and let whichever of them signed in first inherit the
 * others' events and ad click id. The full Accept-Language header plus the
 * Cloudflare country/region split that crowd apart without storing anything on
 * the device.
 */
export function hashEntropy(req: Request): string {
  const rawLang = req.headers["accept-language"];
  const lang = typeof rawLang === "string" ? rawLang.slice(0, LANG_HEADER_MAX) : "";
  const country = (req.headers["cf-ipcountry"] as string | undefined) || "";
  const region = decodeHeader(req, "cf-region");
  return `${lang}|${country}|${region}`;
}
