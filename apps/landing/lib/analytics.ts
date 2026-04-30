// Thin wrapper around the central analytics API in dashboard-api.
// Every event funnels through one endpoint with a client-side UTC
// timestamp and a single apex-domain cookie shared with the dashboard.

const API_BASE = "https://dashboard-api.iq-rest.com";

function endpoint(path: string): string {
  return `${API_BASE}${path}`;
}

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

function trackEvent(event: string): void {
  if (typeof window === "undefined") return;
  const gclid = getGclid();
  fetch(endpoint("/api/analytics/event"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, occurredAt: new Date().toISOString(), ...(gclid ? { gclid } : {}) }),
    keepalive: true,
  }).catch(() => {});
}

function linkSession(_userId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  return fetch(endpoint("/api/analytics/identify"), {
    method: "POST",
    credentials: "include",
    keepalive: true,
  })
    .then(() => undefined)
    .catch(() => undefined);
}

const page = {
  view: (pageName: string) => trackEvent(`page_view_${pageName.replace(/-/g, "_")}`),
};

const marketing = {
  demoOpen: () => trackEvent("clicked_demo_open"),
  demoClose: () => trackEvent("clicked_demo_close"),
  heroImagesClick: () => trackEvent("clicked_hero_images"),
  headerCtaClick: () => trackEvent("clicked_header_cta"),
  heroCtaClick: () => trackEvent("clicked_hero_cta"),
  pricingCtaClick: (_plan?: string) => trackEvent("clicked_pricing_cta"),
  scrollToSection: (_section?: string) => {},
  featureLinkClick: (_featureId?: string) => trackEvent("clicked_feature_link"),
  footerLinkClick: (_link?: string) => trackEvent("clicked_footer_link"),
  whatsappClick: () => trackEvent("clicked_whatsapp"),
  pricingToggle: (_cycle?: string) => trackEvent("clicked_pricing_toggle"),
  scannerUpload: (_count?: string) => trackEvent("scanner_upload"),
  scannerSuccess: (_d?: string) => trackEvent("scanner_success"),
  scannerError: (_r?: string) => trackEvent("scanner_error"),
  scannerCtaClick: () => trackEvent("clicked_scanner_cta"),
  scannerPreviewShown: () => trackEvent("scanner_preview_shown"),
  scannerPreviewReturning: () => trackEvent("scanner_preview_returning"),
  scannerConversion: () => trackEvent("scanner_conversion"),
};

export const analytics = {
  trackEvent,
  linkSession,
  page,
  marketing,
};
