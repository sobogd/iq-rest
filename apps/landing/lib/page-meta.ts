// Last-Modified dates + sitemap settings for marketing pages. Single source
// of truth shared by middleware (sends Last-Modified response header) and
// sitemap.ts (publishes <lastmod> and <priority>).

export type PageMeta = {
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

// Home page meta (per-locale `/`).
export const HOME_META: PageMeta = {
  lastModified: "2026-05-20",
  changeFrequency: "weekly",
  priority: 1.0,
};

// Per-feature pages — path is the SHARED route under `/[locale]`, translated
// into a per-locale slug by `LOCALE_SLUG_OVERRIDES` for sitemap/redirects.
export const FEATURE_PAGES: Record<string, PageMeta> = {
  "/digital-menu": { lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.8 },
  "/order-taking": { lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.8 },
  "/bookings": { lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.8 },
  "/kitchen-display": { lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.8 },
  "/pricing": { lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.9 },
};

// Last-Modified lookup keyed on path (`/` or `/<feature>`).
export function lastModifiedFor(path: string): string | undefined {
  if (path === "/") return HOME_META.lastModified;
  return FEATURE_PAGES[path]?.lastModified;
}
