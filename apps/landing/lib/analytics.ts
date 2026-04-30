// Thin wrapper around the central analytics API in dashboard-api.
// Every event funnels through one endpoint with a client-side UTC
// timestamp and a single apex-domain cookie shared with the dashboard.

const API_BASE = "https://dashboard-api.iq-rest.com";
const GCLID_KEY = "analytics_gclid";

function getGclid(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("gclid");
    if (fromUrl) {
      try { localStorage.setItem(GCLID_KEY, fromUrl); } catch {}
      return fromUrl;
    }
    return localStorage.getItem(GCLID_KEY);
  } catch {
    return null;
  }
}

function track(event: string): void {
  if (typeof window === "undefined") return;
  const gclid = getGclid();
  fetch(`${API_BASE}/api/analytics/event`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, occurredAt: new Date().toISOString(), ...(gclid ? { gclid } : {}) }),
    keepalive: true,
  }).catch(() => {});
}

function linkSession(_userId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  return fetch(`${API_BASE}/api/analytics/identify`, {
    method: "POST",
    credentials: "include",
    keepalive: true,
  })
    .then(() => undefined)
    .catch(() => undefined);
}

export const analytics = {
  track,
  linkSession,
};
