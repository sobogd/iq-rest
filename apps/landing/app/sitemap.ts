import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { FEATURE_PAGES, HOME_META, type PageMeta } from '@/lib/page-meta'

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

  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(route.lastModified),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: buildAlternates(route.path)
      })
    })
  })

  // Italian keyword-targeted landings (single-locale, no hreflang alternates).
  const italianKwPages: RouteConfig[] = [
    { path: '/it/menu-qr-code', lastModified: '2026-05-13', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/it/creare-menu-digitale', lastModified: '2026-05-13', changeFrequency: 'monthly', priority: 0.8 },
  ]
  italianKwPages.forEach(route => {
    sitemapEntries.push({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  })

  // /es absorbed the carta-digital KW page (canonical /es). The PPC variant
  // at /es/lp/carta-digital stays noindex; the old /es/menu-digital and
  // /es/qr-carta KW landings were dropped and 301 to /es (see next.config).

  return sitemapEntries
}
