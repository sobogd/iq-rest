// Thin wrapper around the unified usage analytics API in dashboard-api.
//
// Single sink: POST /api/usage/event — anonymous by default. Server attaches
// companyId from auth cookie when the user is logged in. Server derives geo
// (CF headers) and device/platform (User-Agent). The client sends nothing
// identifiable about itself beyond the event name and timestamp.

import { dashboardApi } from "./dashboard-url";

const GADS_FLAG_KEY = "iqr_gads";

/** Persists a boolean Google-Ads-origin marker in localStorage when the
 *  landing URL carries gclid / gbraid / wbraid. The value itself is never
 *  stored — only the flag — so the marker is GDPR-friendly even without a
 *  consent banner. Subsequent JS-fired events on later pages of the same
 *  visit read the flag and tag themselves accordingly. */
function captureGoogleAdsFlag(): void {
  if (typeof window === "undefined") return;
  try {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("gclid") || sp.get("gbraid") || sp.get("wbraid")) {
      window.localStorage.setItem(GADS_FLAG_KEY, "1");
    }
  } catch {
    // localStorage unavailable (private mode, quota) — silently skip; the
    // middleware-side SSR row still captures is_google_ads correctly.
  }
}

function readGoogleAdsFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(GADS_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

if (typeof window !== "undefined") {
  captureGoogleAdsFlag();
}

function track(event: string): void {
  if (typeof window === "undefined") return;
  // document.referrer at this point is the URL the user navigated *from* —
  // for first-page-load events that's the originating Google search / social
  // post. The server-side /api/usage/event classifies it into a coarse bucket
  // (google_search / bing / social / …) and only stores the bucket, not the
  // raw URL.
  const referrer = typeof document !== "undefined" ? document.referrer || null : null;
  const isGoogleAds = readGoogleAdsFlag();
  fetch(dashboardApi("/api/usage/event"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, occurredAt: Date.now(), referrer, isGoogleAds }),
    keepalive: true,
  }).catch(() => {});
}

export const analytics = {
  track,
};
