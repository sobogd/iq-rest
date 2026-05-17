import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { FEATURE_PAGES, HOME_META, type PageMeta } from '@/lib/page-meta'
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

  // /it absorbed all the KW landings; /it/menu-qr-code and
  // /it/creare-menu-digitale were dropped and 301 to /it (see next.config).
  // PPC lives at /it/lp/menu-digitale-per-ristoranti (noindex).
  //
  // /es absorbed the carta-digital KW page (canonical /es). The PPC variant
  // at /es/lp/carta-digital-para-restaurante stays noindex; the old
  // /es/lp/carta-digital slug 301s to it. /es/menu-digital and
  // /es/qr-carta KW landings were dropped and 301 to /es (see next.config).

  return sitemapEntries
}
