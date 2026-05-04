// Server-side gclid capture on landing arrival.
// Called from app/<locale>/page.tsx as a fire-and-forget. Forwards user's
// geo cookie + UA so the API can classify accurately (intermediate nginx
// clobbers cf-* headers and the API would otherwise see this server's UA).

import "server-only";
import { cookies, headers } from "next/headers";
import { dashboardApi } from "@/lib/dashboard-url";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;

type SearchParams = Record<string, string | string[] | undefined>;

function pickGclid(searchParams: SearchParams): string | null {
  const raw = searchParams.gclid;
  const v = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : null;
  if (!v || !GCLID_REGEX.test(v)) return null;
  return v;
}

/**
 * Logs a `land_<locale>_gclid_arrival` usage event when ?gclid=… is present in the
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

  let userAgent = "";
  try {
    const h = await headers();
    userAgent = h.get("user-agent") || "";
  } catch {
    // ignore
  }

  const safeLocale = /^[a-z]{2}$/.test(locale) ? locale : "xx";
  const eventName = `land_${safeLocale}_gclid_arrival`;

  // Fire-and-forget. Do NOT await — must not delay TTFB.
  void fetch(dashboardApi("/api/usage/event"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: eventName,
      occurredAt: Date.now(),
      gclid,
      ...(country ? { country } : {}),
      ...(region ? { region } : {}),
      ...(userAgent ? { userAgent } : {}),
    }),
    keepalive: true,
  }).catch(() => {
    // swallow — gclid capture is best-effort
  });
}
