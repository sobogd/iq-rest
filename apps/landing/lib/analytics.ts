// Thin wrapper around the unified usage analytics API in dashboard-api.
//
// Single sink: POST /api/usage/event — anonymous by default. Server attaches
// companyId from auth cookie when the user is logged in. Server derives geo
// (CF headers) and device/platform (User-Agent). The client sends nothing
// identifiable about itself beyond the event name.
//
// Visit-origin enrichment (gclid, is_google_ads, is_search) lives on the
// first-visit SSR row written by middleware; JS-fired events are plain.

import { dashboardApi } from "./dashboard-url";

function track(event: string): void {
  if (typeof window === "undefined") return;
  fetch(dashboardApi("/api/usage/event"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {});
}

export const analytics = {
  track,
};
