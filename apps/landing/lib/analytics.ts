// Own analytics - sends events to our backend

const SESSION_ID_KEY = "analytics_session_id";

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

function trackEvent(event: string, meta?: Record<string, unknown>) {
  if (typeof window === "undefined" || isTrackingDisabled()) return;

  const sessionId = getSessionId();
  const page = window.location.pathname;

  // Fire and forget - don't block UI
  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, sessionId, page, meta }),
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
  view: (pageName: string) => trackEvent(`page_view_${pageName.replace(/-/g, "_")}`),
};

// Marketing events (landing page)
export const marketing = {
  heroCreateClick: () => trackEvent("hero_create_click"),
  demoOpen: () => trackEvent("demo_open"),
  demoClose: () => trackEvent("demo_close"),
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
