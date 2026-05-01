// Single source of truth for the changelog entry catalogue: id, date, image.
// Per-locale text lives in app/<locale>/changelog/texts.ts.
// Per-entry layout lives in app/_landing/changelog/entries/<id>.tsx.

export type ChangelogEntryMeta = {
  id: string;
  date: string; // YYYY-MM-DD
  image: string; // path under /public, e.g. "/changelog/foo.webp" or "/og-image.png"
};

// Newest first. The list page renders in this order; do not sort downstream.
export const CHANGELOG_ENTRIES: ChangelogEntryMeta[] = [
  // ─── New product launches (Mar–May 2026) ────────────────────────────────
  { id: "ai-dish-photos-restaurant-menu", date: "2026-04-30", image: "/og-image.png" },
  { id: "ai-restaurant-cover-background", date: "2026-04-30", image: "/og-image.png" },
  { id: "three-step-signup-wizard-restaurant-menu", date: "2026-05-01", image: "/og-image.png" },
  { id: "ai-built-sample-menu-on-signup", date: "2026-05-01", image: "/og-image.png" },
  { id: "interactive-menu-tour-first-visit", date: "2026-04-30", image: "/og-image.png" },
  { id: "custom-landing-page-per-country", date: "2026-04-30", image: "/og-image.png" },
  { id: "sign-in-with-google-restaurant-dashboard", date: "2026-04-29", image: "/og-image.png" },
  { id: "multilingual-email-notifications-35-languages", date: "2026-04-29", image: "/og-image.png" },
  { id: "ios-native-feel-mobile-restaurant-management", date: "2026-04-29", image: "/og-image.png" },
  { id: "gdpr-cookie-consent-banner-restaurant-website", date: "2026-05-01", image: "/og-image.png" },
  { id: "privacy-terms-in-modals-no-page-jumps", date: "2026-05-01", image: "/og-image.png" },
  { id: "auto-catalan-language-catalonia-visitors", date: "2026-05-01", image: "/og-image.png" },
  { id: "trial-expired-modal-keep-menu-public", date: "2026-04-26", image: "/og-image.png" },
  { id: "item-renamed-to-dish-clearer-menu-editor", date: "2026-03-10", image: "/og-image.png" },
  { id: "auto-default-category-restaurant-menu-onboarding", date: "2026-03-10", image: "/og-image.png" },
  { id: "skip-restaurant-name-step-onboarding", date: "2026-03-10", image: "/og-image.png" },
  { id: "try-menu-before-signup-anonymous-onboarding", date: "2026-03-09", image: "/og-image.png" },
  { id: "save-menu-progress-via-email-link", date: "2026-03-09", image: "/og-image.png" },
  { id: "one-click-stripe-checkout-returning-users", date: "2026-03-05", image: "/og-image.png" },

  // ─── Existing entries (Nov 2025 – Feb 2026) ─────────────────────────────
  { id: "dashboard-ui-redesign-consistent-cards-navigation", date: "2026-02-26", image: "/og-image.png" },
  { id: "ai-menu-scanner-create-digital-qr-menu", date: "2026-02-18", image: "/og-image.png" },
  { id: "redesigned-dashboard-qr-menu-management", date: "2026-02-14", image: "/og-image.png" },
  { id: "reservation-emails-analytics-digital-qr-menu", date: "2026-02-12", image: "/og-image.png" },
  { id: "multi-currency-geo-pricing-qr-menu", date: "2026-02-10", image: "/og-image.png" },
  { id: "support-qr-menu-restaurant-cafe", date: "2025-12-02", image: "/changelog/support-qr-menu-restaurant.webp" },
  { id: "detailed-analytics-restaurant-qr-menu-website", date: "2025-12-02", image: "/changelog/detailed-analytics-restaurant-qr-menu.webp" },
  { id: "instant-qr-menu-restaurant-website-generator", date: "2025-12-01", image: "/changelog/instant-qr-menu-generator.webp" },
  { id: "subscription-plans-qr-menu-restaurant-website", date: "2025-11-30", image: "/og-image.png" },
  { id: "public-restaurant-qr-menu-website", date: "2025-11-30", image: "/changelog/public-menu-qr-scan-1.webp" },
  { id: "add-items-restaurant-qr-menu-website", date: "2025-11-29", image: "/og-image.png" },
  { id: "qr-menu-restaurant-categories", date: "2025-11-28", image: "/og-image.png" },
  { id: "easy-qr-menu-cafe-control-panel", date: "2025-11-27", image: "/og-image.png" },
  { id: "faq-page-organization", date: "2025-11-26", image: "/og-image.png" },
  { id: "free-restaurant-website-improvements", date: "2025-11-25", image: "/og-image.png" },
  { id: "user-authentication-interface", date: "2025-11-24", image: "/og-image.png" },
];

export function findEntryMeta(id: string): ChangelogEntryMeta | undefined {
  return CHANGELOG_ENTRIES.find((e) => e.id === id);
}

export const CHANGELOG_ENTRY_IDS = CHANGELOG_ENTRIES.map((e) => e.id);
