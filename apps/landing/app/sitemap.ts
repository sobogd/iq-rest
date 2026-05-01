import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { CHANGELOG_ENTRIES } from '@/app/_landing/changelog/entries-meta'

type RouteConfig = {
  path: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iq-rest.com'

  // Define all routes with individual settings
  const routes: RouteConfig[] = [
    { path: '/instant-setup', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/mobile-management', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/ai-translation', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/multilingual', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/ai-images', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/easy-menu', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/analytics', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/reservations', lastModified: '2026-02-26', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/custom-design', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/color-scheme', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/personal-support', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/online-orders', lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/faq', lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/changelog', lastModified: CHANGELOG_ENTRIES[0]?.date ?? '2026-05-01', changeFrequency: 'weekly', priority: 0.7 },
    ...CHANGELOG_ENTRIES.map((entry) => ({
      path: `/changelog/${entry.id}`,
      lastModified: entry.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

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
      lastModified: new Date('2026-04-30'),
      changeFrequency: 'weekly',
      priority: 1.0,
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

  return sitemapEntries
}
