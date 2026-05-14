// Thin wrapper around the unified usage analytics API in dashboard-api.
//
// Single sink: POST /api/usage/event — anonymous by default. Server attaches
// companyId from auth cookie when the user is logged in. Server derives geo
// (CF headers) and device/platform (User-Agent). The client sends nothing
// identifiable about itself beyond the event name and timestamp.

import { dashboardApi } from "./dashboard-url";

const GADS_FLAG_KEY = "iqr_gads";
// 30 days mirrors Google Ads' default click-conversion attribution window.
// After that the original gclid no longer attributes a conversion anyway,
// so keeping the flag alive longer would only mislabel later organic visits.
const GADS_FLAG_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Persists a boolean Google-Ads-origin marker in localStorage when the
 *  landing URL carries gclid / gbraid / wbraid. Only the boolean and the
 *  set-time are stored — never the gclid value itself — so the marker is
 *  GDPR-friendly even without a consent banner. The flag expires after
 *  GADS_FLAG_TTL_MS so JS events fired months later don't keep tagging
 *  themselves as Ads-origin. */
function captureGoogleAdsFlag(): void {
  if (typeof window === "undefined") return;
  try {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("gclid") || sp.get("gbraid") || sp.get("wbraid")) {
      window.localStorage.setItem(GADS_FLAG_KEY, String(Date.now()));
    }
  } catch {
    // localStorage unavailable (private mode, quota) — silently skip; the
    // middleware-side SSR row still captures is_google_ads correctly.
  }
}

function readGoogleAdsFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(GADS_FLAG_KEY);
    if (!raw) return false;
    // Backward-compat: pre-TTL entries stored the literal "1". Treat them as
    // fresh once on read and rewrite with a real timestamp so they'll age out
    // normally from that point forward.
    if (raw === "1") {
      window.localStorage.setItem(GADS_FLAG_KEY, String(Date.now()));
      return true;
    }
    const at = Number(raw);
    if (!Number.isFinite(at)) {
      window.localStorage.removeItem(GADS_FLAG_KEY);
      return false;
    }
    if (Date.now() - at > GADS_FLAG_TTL_MS) {
      window.localStorage.removeItem(GADS_FLAG_KEY);
      return false;
    }
    return true;
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
