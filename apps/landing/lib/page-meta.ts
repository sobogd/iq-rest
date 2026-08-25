// Last-Modified dates + sitemap settings for marketing pages. Single source
// of truth shared by middleware (sends Last-Modified response header) and
// sitemap.ts (publishes <lastmod> and <priority>).

import BLOG_MANIFEST from "../content/blog/manifest.json";

export type PageMeta = {
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

// Last content-review date, published as `dateModified` in the marketing
// JSON-LD (freshness signal for AI answer engines / search). Bump when the
// on-page copy or offer is materially revised.
export const SCHEMA_DATE_MODIFIED = "2026-08-14";

// Home page meta (per-locale `/`).
export const HOME_META: PageMeta = {
  lastModified: "2026-08-14",
  changeFrequency: "weekly",
  priority: 1.0,
};

// Help guide meta. Static date on purpose: sitemap <lastmod> must reflect the
// last content revision, not the build time (`new Date()` re-stamped every
// deploy, which reads as fake freshness). Bump when the guide content changes.
export const HELP_META: PageMeta = {
  lastModified: "2026-08-14",
  changeFrequency: "monthly",
  priority: 0.5,
};

// Per-feature pages — path is the SHARED route under `/[locale]`, translated
// into a per-locale slug by `LOCALE_SLUG_OVERRIDES` for sitemap/redirects.
export const FEATURE_PAGES: Record<string, PageMeta> = {
  "/digital-menu": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.8 },
  "/order-taking": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.8 },
  "/bookings": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.8 },
  "/kitchen-display": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.8 },
  "/menu-qr-code": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.8 },
  "/pricing": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.9 },
  "/about": { lastModified: "2026-08-14", changeFrequency: "monthly", priority: 0.6 },
};

// Partial-coverage pages — only exist on a subset of locales (typically
// paid-search landings targeted at specific markets). Sitemap emits one
// entry per listed locale; hreflang alternates list only those locales.
export type PartialPageMeta = PageMeta & { locales: readonly string[] };

// Currently empty — QR-menu graduated to FEATURE_PAGES (universal). Kept for
// future market-specific landings that don't ship on every locale.
export const PARTIAL_FEATURE_PAGES: Record<string, PartialPageMeta> = {};

// ---------------------------------------------------------------------------
// Blog. The manifest is the per-article source of truth (date/dateModified);
// the index's lastmod follows the newest article automatically.
// ---------------------------------------------------------------------------

type BlogManifestEntry = { id: string; date: string; dateModified?: string };

const blogArticleDate = (e: BlogManifestEntry) => e.dateModified ?? e.date;

const BLOG_LATEST = (BLOG_MANIFEST as BlogManifestEntry[]).reduce(
  (max, e) => (blogArticleDate(e) > max ? blogArticleDate(e) : max),
  "2026-08-25",
);

export const BLOG_INDEX_META: PageMeta = {
  lastModified: BLOG_LATEST,
  changeFrequency: "weekly",
  priority: 0.6,
};

export const BLOG_ARTICLE_META: Pick<PageMeta, "changeFrequency" | "priority"> = {
  changeFrequency: "monthly",
  priority: 0.5,
};

// Last-Modified lookup keyed on path (`/`, `/<feature>`, `/blog[/<slug>]`).
export function lastModifiedFor(path: string): string | undefined {
  if (path === "/") return HOME_META.lastModified;
  if (path === "/blog") return BLOG_INDEX_META.lastModified;
  if (path.startsWith("/blog/")) {
    const entry = (BLOG_MANIFEST as BlogManifestEntry[]).find(
      (e) => e.id === path.slice("/blog/".length),
    );
    return entry ? blogArticleDate(entry) : undefined;
  }
  return FEATURE_PAGES[path]?.lastModified ?? PARTIAL_FEATURE_PAGES[path]?.lastModified;
}
