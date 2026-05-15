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
  lastModified: "2026-04-30",
  changeFrequency: "weekly",
  priority: 1.0,
};

// Per-feature pages — path is the feature segment under `/[locale]`.
export const FEATURE_PAGES: Record<string, PageMeta> = {
  "/instant-setup": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/mobile-management": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/ai-translation": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/multilingual": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/ai-images": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/easy-menu": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/analytics": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/reservations": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/custom-design": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/color-scheme": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/personal-support": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.8 },
  "/online-orders": { lastModified: "2026-05-04", changeFrequency: "monthly", priority: 0.9 },
};

// Last-Modified lookup keyed on path (`/` or `/<feature>`).
export function lastModifiedFor(path: string): string | undefined {
  if (path === "/") return HOME_META.lastModified;
  return FEATURE_PAGES[path]?.lastModified;
}
