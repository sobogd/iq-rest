// Head-level hreflang alternates. Mirrors the logic in `app/sitemap.ts` so the
// <head> and the sitemap agree on every locale URL. Sitemap-only hreflang works
// for Google, but emitting it in <head> too is a stronger international signal
// and survives sitemap truncation/caching.
//
// URL convention (must match the canonical Next.js emits):
//   - en home  → https://iq-rest.com           (NO trailing slash)
//   - xx home  → https://iq-rest.com/<locale>
//   - feature  → https://iq-rest.com[/<locale>]/<localized-slug>

import { locales } from "@/i18n/routing";
import { LOCALE_SLUG_OVERRIDES } from "@/lib/locale-slug-overrides";
import { localePath } from "@/lib/locale-paths";

const SITE = "https://iq-rest.com";

const homeUrl = (locale: string) => (locale === "en" ? SITE : `${SITE}/${locale}`);

// Alternates for the per-locale home page. Identical map for every locale.
export function homeAlternates(): Record<string, string> {
  const languages: Record<string, string> = { "x-default": homeUrl("en") };
  locales.forEach((locale) => {
    languages[locale] = homeUrl(locale);
  });
  return languages;
}

// Alternates for a feature page, keyed by its SHARED route (e.g. "/digital-menu").
export function featureAlternates(routeKey: string): Record<string, string> {
  const overrideMap = LOCALE_SLUG_OVERRIDES[routeKey];
  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    const slug = overrideMap?.[locale] ?? routeKey;
    languages[locale] = `${SITE}${localePath(locale, slug)}`;
  });
  const enSlug = overrideMap?.en ?? routeKey;
  languages["x-default"] = `${SITE}${localePath("en", enSlug)}`;
  return languages;
}

// Reverse-lookup the shared route key from a feature page's canonical URL.
// Lets `buildFeatureMetadata` derive alternates without each content.ts having
// to declare its route key.
export function routeKeyFromCanonical(canonical: string): string | undefined {
  let path = canonical.replace(SITE, "").replace(/\/$/, "");
  // Strip a leading "/<locale>" segment if present.
  const seg = path.match(/^\/([a-z]{2})(\/|$)/);
  if (seg && (locales as readonly string[]).includes(seg[1])) {
    path = path.slice(seg[1].length + 1); // drop "/<locale>", keep leading slash on slug
  }
  // Override values carry a leading slash (e.g. "/digital-menu-for-restaurants"),
  // so compare against `path` verbatim.
  const found = Object.entries(LOCALE_SLUG_OVERRIDES).find(([, m]) =>
    Object.values(m).includes(path),
  );
  return found?.[0];
}
