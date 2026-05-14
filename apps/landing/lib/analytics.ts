// Thin wrapper around the unified usage analytics API in dashboard-api.
//
// Single sink: POST /api/usage/event — anonymous by default. Server attaches
// companyId from auth cookie when the user is logged in. Server derives geo
// (CF headers) and device/platform (User-Agent). The client sends nothing
// identifiable about itself beyond the event name and timestamp.

import { dashboardApi } from "./dashboard-url";

function track(event: string): void {
  if (typeof window === "undefined") return;
  // document.referrer at this point is the URL the user navigated *from* —
  // for first-page-load events that's the originating Google search / social
  // post. The server-side /api/usage/event classifies it into a coarse bucket
  // (google_search / bing / social / …) and only stores the bucket, not the
  // raw URL.
  const referrer = typeof document !== "undefined" ? document.referrer || null : null;
  fetch(dashboardApi("/api/usage/event"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, occurredAt: Date.now(), referrer }),
    keepalive: true,
  }).catch(() => {});
}

export const analytics = {
  track,
};
