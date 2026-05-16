import { dashboardApi } from "./dashboard-url";

const SEARCH_HOST_REGEX =
  /(?:^|\.)(google|bing|yandex|duckduckgo|yahoo|baidu|ecosia|qwant|startpage|mojeek|brave)\.[a-z.]+$/i;

// Stamp the search-engine referrer onto the first event of a tab's session
// only. Subsequent track() calls (section observers, SPA navigations to other
// landing pages) skip the lookup so we don't fan out the same is_search row
// across an entire visit. Resets on full page reload — acceptable.
let referrerConsumed = false;

function searchReferrerHost(): string | null {
  try {
    const ref = document.referrer;
    if (!ref) return null;
    const host = new URL(ref).hostname;
    return SEARCH_HOST_REGEX.test(host) ? host : null;
  } catch {
    return null;
  }
}

// In dev we do not want clicks/section views from `npm run dev` polluting
// the prod analytics endpoint. Skip entirely unless either:
//   - the build is production (deployed), OR
//   - the developer has explicitly opted into tracking by setting
//     NEXT_PUBLIC_DASHBOARD_API_BASE (e.g. pointing at a local
//     dashboard-api on http://localhost:3000) — in which case events go
//     to that override host instead.
const TRACKING_ENABLED =
  process.env.NODE_ENV === "production" ||
  Boolean(process.env.NEXT_PUBLIC_DASHBOARD_API_BASE);

function track(event: string): void {
  if (typeof window === "undefined") return;
  if (!TRACKING_ENABLED) {
    if (typeof console !== "undefined") {
      console.debug(`[analytics:disabled] ${event}`);
    }
    return;
  }
  let qs = "";
  if (!referrerConsumed) {
    referrerConsumed = true;
    const host = searchReferrerHost();
    if (host) qs = `?r=${encodeURIComponent(host)}`;
  }
  fetch(dashboardApi(`/api/track/${encodeURIComponent(event)}${qs}`), {
    method: "POST",
    credentials: "include",
    keepalive: true,
  }).catch(() => {});
}

export const analytics = {
  track,
};
