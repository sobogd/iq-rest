// Own analytics - sends events to our backend

const SESSION_ID_KEY = "analytics_session_id";

interface GeoData {
  country?: string;
  city?: string;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

function isTrackingDisabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("analytics_disabled") === "true";
}

// Get geo data from Cloudflare cookies (set by middleware)
function getGeoFromCookies(): GeoData | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const geoData: GeoData = {};

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "geo_country" && value) {
      geoData.country = decodeURIComponent(value);
    } else if (name === "geo_city" && value) {
      geoData.city = decodeURIComponent(value);
    }
  }

  return geoData.country || geoData.city ? geoData : null;
}

function trackEvent(event: string, meta?: Record<string, unknown>) {
  if (typeof window === "undefined" || isTrackingDisabled()) return;

  const sessionId = getSessionId();
  const page = window.location.pathname;
  const userAgent = navigator.userAgent;
  const geoData = getGeoFromCookies();

  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      sessionId,
      page,
      userAgent,
      meta: {
        ...meta,
        ...(geoData && { geo: geoData }),
      },
    }),
  }).catch(() => {
    // Silently fail - analytics should never break the app
  });
}

export function disableTracking() {
  if (typeof window !== "undefined") {
    localStorage.setItem("analytics_disabled", "true");
  }
}

export function enableTracking() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("analytics_disabled");
  }
}

export function linkSession(userId: string) {
  if (typeof window === "undefined" || isTrackingDisabled()) return;

  const sessionId = getSessionId();

  fetch("/api/analytics/link-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, userId }),
  }).catch(() => {
    // Silently fail
  });
}

// Page view events
export const page = {
  view: (pageName: string) => {
    // Collect all query params
    let queryParams: Record<string, string> | undefined;
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const paramsObj: Record<string, string> = {};
      params.forEach((value, key) => {
        paramsObj[key] = value;
      });
      if (Object.keys(paramsObj).length > 0) {
        queryParams = paramsObj;
      }
    }

    trackEvent(`page_view_${pageName.replace(/-/g, "_")}`, queryParams ? { params: queryParams } : undefined);
  },
};

// Marketing events (landing page)
export const marketing = {
  heroCreateClick: () => trackEvent("hero_create_click"),
  demoOpen: () => trackEvent("demo_open"),
  demoClose: () => trackEvent("demo_close"),
  // Pricing page
  pricingToggleMonthly: () => trackEvent("pricing_toggle_monthly"),
  pricingToggleYearly: () => trackEvent("pricing_toggle_yearly"),
  pricingComparisonView: () => trackEvent("pricing_comparison_view"),
  pricingPlanClick: (plan: string) => trackEvent("pricing_plan_click", { plan }),
  // Language
  languageSelectorOpen: () => trackEvent("language_selector_open"),
  languageChange: (from: string, to: string) => trackEvent("language_change", { from, to }),
  };

// Auth events
export const auth = {
  emailSubmit: () => trackEvent("auth_email_submit"),
  codeVerify: () => trackEvent("auth_code_verify"),
  signUp: () => trackEvent("auth_signup"),
};

// Section visibility events (landing page sections)
export const section = {
  view: (name: string) => trackEvent(`section_view_${name.replace(/-/g, "_")}`),
};

// Dashboard events
export const dashboard = {
  pageView: (pageName: string) => trackEvent(`dashboard_${pageName}`),
  categoryCreated: () => trackEvent("category_created"),
  itemCreated: () => trackEvent("item_created"),
  restaurantSaved: () => trackEvent("restaurant_saved"),
};

// Export all as analytics object for convenience
export const analytics = {
  trackEvent,
  disableTracking,
  enableTracking,
  linkSession,
  page,
  marketing,
  auth,
  section,
  dashboard,
};
