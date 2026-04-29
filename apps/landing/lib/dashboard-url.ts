// New SPA dashboard origin. Hardcoded so the landing build does not need a
// separate env var; flip this constant if the dashboard moves.
const DASHBOARD_BASE = "https://dashboard.iq-rest.com";
// Backend API origin. The landing posts analytics events here so that
// events from the marketing site share the same Session/AnalyticsEvent
// rows as the new SPA dashboard (joined by sessionId via the apex
// .iq-rest.com analytics_sid cookie).
const DASHBOARD_API_BASE = "https://dashboard-api.iq-rest.com";

export function isExternalDashboard(): boolean {
  return true;
}

export function dashboardUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  return DASHBOARD_BASE.replace(/\/$/, "") + cleanPath;
}

/**
 * Use this to perform a navigation that may cross origins. Preserves analytics
 * sessionId via querystring so the dashboard adopts the same id.
 */
export function navigateToDashboard(path: string = "") {
  if (typeof window === "undefined") return;
  const url = new URL(dashboardUrl(path), window.location.origin);
  // Forward analytics sessionId so server-set cookie isn't required.
  try {
    const sid =
      localStorage.getItem("analytics_session_id") ||
      sessionStorage.getItem("analytics_session_id");
    if (sid) url.searchParams.set("sid", sid);
  } catch {
    // ignore
  }
  window.location.assign(url.toString());
}

/** Base URL for the dashboard backend API. */
export function dashboardApiBase(): string {
  return DASHBOARD_API_BASE.replace(/\/$/, "");
}

export function dashboardApi(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${DASHBOARD_API_BASE.replace(/\/$/, "")}${clean}`;
}

/**
 * Login URL for the new SPA dashboard, locale-aware. The new SPA's auth flow
 * is authoritative for legacy/non-legacy routing — after a successful
 * sign-in it sends pre-launch users to the old monolith automatically.
 */
export function loginUrl(locale: string): string {
  return DASHBOARD_BASE.replace(/\/$/, "") + `/${locale}/login`;
}

export function navigateToLogin(locale: string) {
  if (typeof window === "undefined") return;
  window.location.assign(loginUrl(locale));
}
