// Own analytics - sends events to our backend

const SESSION_ID_KEY = "analytics_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

function setSessionId(id: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
}

function isTrackingDisabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("analytics_disabled") === "true";
}

// Extract gclid and keyword from current URL params (if present)
function getAdParams(): { gclid?: string; keyword?: string } | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  const keyword = params.get("kw");
  if (!gclid && !keyword) return undefined;
  return {
    ...(gclid && { gclid }),
    ...(keyword && { keyword }),
  };
}

function trackEvent(event: string) {
  if (typeof window === "undefined" || isTrackingDisabled()) return;

  const sessionId = getSessionId();
  const adParams = getAdParams();

  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      sessionId,
      ...adParams,
    }),
    keepalive: true,
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

export function linkSession(userId: string): Promise<void> {
  if (typeof window === "undefined" || isTrackingDisabled())
    return Promise.resolve();

  const sessionId = getSessionId();

  return fetch("/api/analytics/link-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, userId }),
    keepalive: true,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
      }
    })
    .catch(() => {
      // Silently fail
    });
}

// Page view events
export const page = {
  view: (pageName: string) => {
    trackEvent(`page_view_${pageName.replace(/-/g, "_")}`);
  },
};

// Marketing events (landing page)
export const marketing = {
  // Demo modal
  demoOpen: () => trackEvent("demo_open"),
  demoClose: () => trackEvent("demo_close"),
};

// Section visibility events (landing page sections)
export const section = {
  view: (name: string) => trackEvent(`section_view_${name.replace(/-/g, "_")}`),
};

// Export all as analytics object for convenience
export const analytics = {
  trackEvent,
  disableTracking,
  enableTracking,
  linkSession,
  page,
  marketing,
  section,
};
