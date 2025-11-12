import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sobogdqr.com'
  const locales = ['en', 'es']

  // Define all routes
  const routes = [
    '',
    '/pricing',
    '/features',
    '/features/ai-translation',
    '/features/analytics',
    '/features/shopping-cart',
    '/features/modern-design',
    '/contacts',
    '/terms',
    '/privacy',
    '/cookies',
  ]

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            es: `${baseUrl}/es${route}`,
          }
        }
      })
    })
  })

  return sitemapEntries
}
