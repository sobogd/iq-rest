// Server-side gclid capture on landing arrival.
// Called from app/<locale>/page.tsx as an awaited step. Reads the user's CF
// headers directly (these are the visitor's geo, not the API server's), writes
// the event to the shared `usage_events` table via Prisma, then issues a 307
// redirect to a clean URL so the visitor never sees ?gclid in their address bar.
//
// The DB write happens in-process, so geo/UA cannot be misclassified as the
// API server's own request — we feed the API the same fields it would resolve
// itself, only sourced from the visitor's actual request.

import "server-only";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { UAParser } from "ua-parser-js";
import { prisma } from "@/lib/prisma";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;

type SearchParams = Record<string, string | string[] | undefined>;

function pickGclid(searchParams: SearchParams): string | null {
  const candidates = [searchParams.gclid, searchParams.gbraid, searchParams.wbraid];
  for (const raw of candidates) {
    const v = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
    if (v && GCLID_REGEX.test(v)) return v;
  }
  return null;
}

function pickStr(searchParams: SearchParams, key: string, maxLen = 200): string | null {
  const raw = searchParams[key];
  const v = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
  if (!v) return null;
  const trimmed = v.trim().slice(0, maxLen);
  return trimmed || null;
}

/** Same classifier as iq-rest-dashboard-api/src/usage/usage.controller.ts so
 *  the two write paths produce identical (device, platform) pairs. */
function classifyDevice(uaString: string | null): { device: string | null; platform: string | null } {
  if (!uaString) return { device: null, platform: null };
  try {
    const parser = new UAParser(uaString);
    const dev = parser.getDevice().type; // "mobile" | "tablet" | …
    const os = (parser.getOS().name || "").toLowerCase();
    const device = dev === "mobile" || dev === "tablet" ? dev : "desktop";
    let platform: string = "other";
    if (os.includes("ios")) platform = "ios";
    else if (os.includes("android")) platform = "android";
    else if (os.includes("windows")) platform = "windows";
    else if (os.includes("mac") || os.includes("os x")) platform = "macos";
    else if (os.includes("linux") || os.includes("ubuntu") || os.includes("fedora") || os.includes("debian")) platform = "linux";
    return { device, platform };
  } catch {
    return { device: null, platform: null };
  }
}

function decodeCfHeader(raw: string | null): string | null {
  if (!raw) return null;
  try { return decodeURIComponent(raw); } catch { return raw; }
}

/** When ?gclid=... arrives, write the event to usage_events using the
 *  visitor's CF headers (not the SSR's own geo) and redirect to a clean URL. */
export async function trackGclidArrival(
  searchParams: SearchParams,
  locale: string,
): Promise<void> {
  const gclid = pickGclid(searchParams);
  if (!gclid) return;

  const h = await nextHeaders();
  const country = (h.get("cf-ipcountry") || "").toUpperCase().slice(0, 2) || "XX";
  const region = (decodeCfHeader(h.get("cf-region")) || "").slice(0, 100);
  const userAgent = h.get("user-agent");

  const keyword = pickStr(searchParams, "kw");
  const campaign = pickStr(searchParams, "campaign");

  const safeLocale = /^[a-z]{2}$/.test(locale) ? locale : "xx";
  const eventName = `land_${safeLocale}_gclid_arrival`;
  const { device, platform } = classifyDevice(userAgent);
  const id = randomUUID();
  const at = new Date();

  try {
    await prisma.$executeRaw`
      INSERT INTO usage_events (id, at, event, country, region, device, platform, gclid, keyword, campaign, "companyId")
      VALUES (${id}, ${at}, ${eventName}, ${country}, ${region}, ${device}, ${platform}, ${gclid}, ${keyword}, ${campaign}, NULL)
    `;
  } catch {
    // ignore — event capture is best-effort
  }

  // Strip ad-click params, preserve any other searchParams.
  const url = new URL(`/${locale}`, "http://x");
  for (const [key, raw] of Object.entries(searchParams)) {
    if (key === "gclid" || key === "gbraid" || key === "wbraid" || key === "kw" || key === "campaign") continue;
    const v = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
    if (v) url.searchParams.set(key, v);
  }
  redirect(`${url.pathname}${url.search}`);
}
