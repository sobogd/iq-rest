import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { FEATURE_PAGES, HOME_META, PARTIAL_FEATURE_PAGES, type PageMeta } from '@/lib/page-meta'
import { LOCALE_SLUG_OVERRIDES } from '@/lib/locale-slug-overrides'

type RouteConfig = PageMeta & { path: string }

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iq-rest.com'

  // Pull feature-page settings from the shared page-meta module so the
  // sitemap stays in lockstep with the Last-Modified headers in middleware.
  const routes: RouteConfig[] = Object.entries(FEATURE_PAGES).map(([path, meta]) => ({
    path,
    ...meta,
  }))

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Build alternates object for all locales
  const buildAlternates = (path: string = '') => {
    const languages: Record<string, string> = { 'x-default': `${baseUrl}/en${path}` }
    locales.forEach(locale => {
      languages[locale] = `${baseUrl}/${locale}${path}`
    })
    return { languages }
  }

  // Add localized home pages (x-default points to /en as the default)
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(HOME_META.lastModified),
      changeFrequency: HOME_META.changeFrequency,
      priority: HOME_META.priority,
      alternates: buildAlternates()
    })
  })

  // Per-locale slug overrides live in lib/locale-slug-overrides.ts so the
  // sitemap, the next.config redirects, and the client-side region-prompt
  // modal all agree on the same translation table.

  locales.forEach(locale => {
    routes.forEach(route => {
      const override = LOCALE_SLUG_OVERRIDES[route.path]?.[locale]
      const path = override ?? route.path
      // Build alternates that point each locale at its own slug — falling
      // back to the shared route.path when no override exists.
      const overrideMap = LOCALE_SLUG_OVERRIDES[route.path]
      const languages: Record<string, string> = {}
      locales.forEach((other) => {
        languages[other] = `${baseUrl}/${other}${overrideMap?.[other] ?? route.path}`
      })
      languages["x-default"] = `${baseUrl}/en${overrideMap?.en ?? route.path}`

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(route.lastModified),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      })
    })
  })

  // Partial-coverage feature pages (e.g. paid-search landings on IT/ES/PT/CA
  // only). Emit one entry per *participating* locale; hreflang alternates
  // list just those locales (and x-default points at the first one).
  Object.entries(PARTIAL_FEATURE_PAGES).forEach(([sharedRoute, meta]) => {
    const overrideMap = LOCALE_SLUG_OVERRIDES[sharedRoute]
    if (!overrideMap) return

    const participatingLocales = meta.locales.filter((loc) => overrideMap[loc])
    if (participatingLocales.length === 0) return

    const languages: Record<string, string> = {}
    participatingLocales.forEach((loc) => {
      languages[loc] = `${baseUrl}/${loc}${overrideMap[loc]}`
    })
    languages["x-default"] = `${baseUrl}/${participatingLocales[0]}${overrideMap[participatingLocales[0]]}`

    participatingLocales.forEach((loc) => {
      sitemapEntries.push({
        url: `${baseUrl}/${loc}${overrideMap[loc]}`,
        lastModified: new Date(meta.lastModified),
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
        alternates: { languages },
      })
    })
  })

  // Sitemap emits exactly 6 URLs per locale (home + 4 features + pricing) ×
  // 35 locales = 210 entries, plus any partial-coverage paid-search landings
  // declared in PARTIAL_FEATURE_PAGES. All legacy slugs (KW landings, PPC
  // pages, /languages, /changelog, /online-orders, /m/*) are 301'd in
  // next.config.

  return sitemapEntries
}
