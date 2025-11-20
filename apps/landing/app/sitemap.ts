import { MetadataRoute } from 'next'

type RouteConfig = {
  path: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sobogdqr.com'
  const locales = ['en', 'es']

  // Define all routes with individual settings
  const routes: RouteConfig[] = [
    { path: '/pricing', lastModified: '2024-11-15', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/features', lastModified: '2024-11-10', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/features/ai-translation', lastModified: '2024-11-10', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/features/analytics', lastModified: '2024-11-10', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/features/shopping-cart', lastModified: '2024-11-10', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/features/modern-design', lastModified: '2024-11-10', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contacts', lastModified: '2024-11-15', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/terms', lastModified: '2024-11-15', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/privacy', lastModified: '2024-11-15', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/cookies', lastModified: '2024-11-15', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/changelog', lastModified: '2025-11-20', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/changelog/free-restaurant-website-improvements', lastModified: '2025-11-20', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/changelog/get-started-page-redesign', lastModified: '2025-11-19', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/changelog/user-authentication-interface', lastModified: '2024-11-19', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/get-started', lastModified: '2025-11-19', changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add root URL with x-default for language negotiation
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date('2025-11-19'),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        'x-default': baseUrl,
      }
    }
  })

  // Add localized home pages
  locales.forEach(locale => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date('2025-11-19'),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          es: `${baseUrl}/es`,
        }
      }
    })
  })

  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(route.lastModified),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route.path}`,
            es: `${baseUrl}/es${route.path}`,
          }
        }
      })
    })
  })

  return sitemapEntries
}
