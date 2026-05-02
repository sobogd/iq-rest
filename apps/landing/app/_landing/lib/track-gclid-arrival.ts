// Server-side gclid capture on landing arrival.
// Called from app/<locale>/page.tsx as a fire-and-forget. Lawful without consent —
// no cookies set on user device, gclid stored as anonymous aggregate counter.

import "server-only";
import { cookies } from "next/headers";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const API_BASE = "https://dashboard-api.iq-rest.com";

type SearchParams = Record<string, string | string[] | undefined>;

function pickGclid(searchParams: SearchParams): string | null {
  const raw = searchParams.gclid;
  const v = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
  if (!v || !GCLID_REGEX.test(v)) return null;
  return v;
}

/**
 * Logs a `land_<locale>_gclid_arrival` pulse event when ?gclid=… is present in the
 * landing URL. Geo data taken from cookies set by middleware (geo_country,
 * geo_region) since intermediate nginx would otherwise overwrite cf-* headers.
 *
 * Fire-and-forget — does not block landing render. Failures swallowed silently.
 */
export async function trackGclidArrival(
  searchParams: SearchParams,
  locale: string,
): Promise<void> {
  const gclid = pickGclid(searchParams);
  if (!gclid) return;

  let country = "";
  let region = "";
  try {
    const c = await cookies();
    country = (c.get("geo_country")?.value || "").toUpperCase().slice(0, 2);
    region = (c.get("geo_region")?.value || "").slice(0, 100);
  } catch {
    // ignore — running outside request scope
  }

  // Event name includes locale so admin Pulse timeline can distinguish which
  // landing the click came from (e.g. land_fr_gclid_arrival vs land_de_gclid_arrival).
  // Locale must match /^[a-z]{2}$/ to keep event name in EVENT_REGEX.
  const safeLocale = /^[a-z]{2}$/.test(locale) ? locale : "xx";
  const eventName = `land_${safeLocale}_gclid_arrival`;

  // Fire-and-forget. Do NOT await — must not delay TTFB.
  void fetch(`${API_BASE}/api/analytics/pulse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: eventName,
      gclid,
      ...(country && /^[A-Z]{2}$/.test(country) ? { country } : {}),
      ...(region ? { region } : {}),
    }),
    keepalive: true,
  }).catch(() => {
    // swallow — gclid capture is best-effort
  });
}
