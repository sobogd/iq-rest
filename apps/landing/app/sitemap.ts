import { MetadataRoute } from 'next'
import { locales } from '@/i18n/routing'
import { FEATURE_PAGES, HOME_META, PARTIAL_FEATURE_PAGES, type PageMeta } from '@/lib/page-meta'
import { LOCALE_SLUG_OVERRIDES } from '@/lib/locale-slug-overrides'
import { localeHome, localePath } from '@/lib/locale-paths'
import { HELP_LOCALES } from '@/app/_landing/help/registry'

type RouteConfig = PageMeta & { path: string }

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iq-rest.com'

  const routes: RouteConfig[] = Object.entries(FEATURE_PAGES).map(([path, meta]) => ({
    path,
    ...meta,
  }))

  const sitemapEntries: MetadataRoute.Sitemap = []

  // en home has NO trailing slash to match the canonical Next.js emits
  // (`https://iq-rest.com`). Keeping sitemap + canonical identical avoids
  // Google treating "/" and "" as competing URLs.
  const buildHomeAlternates = () => {
    const languages: Record<string, string> = { 'x-default': baseUrl }
    locales.forEach(locale => {
      languages[locale] = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`
    })
    return { languages }
  }

  locales.forEach(locale => {
    sitemapEntries.push({
      url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
      lastModified: new Date(HOME_META.lastModified),
      changeFrequency: HOME_META.changeFrequency,
      priority: HOME_META.priority,
      alternates: buildHomeAlternates(),
    })
  })

  locales.forEach(locale => {
    routes.forEach(route => {
      const overrideMap = LOCALE_SLUG_OVERRIDES[route.path]
      const slug = overrideMap?.[locale] ?? route.path
      const languages: Record<string, string> = {}
      locales.forEach((other) => {
        const otherSlug = overrideMap?.[other] ?? route.path
        languages[other] = `${baseUrl}${localePath(other, otherSlug)}`
      })
      const enSlug = overrideMap?.en ?? route.path
      languages['x-default'] = `${baseUrl}${localePath('en', enSlug)}`

      sitemapEntries.push({
        url: `${baseUrl}${localePath(locale, slug)}`,
        lastModified: new Date(route.lastModified),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      })
    })
  })

  Object.entries(PARTIAL_FEATURE_PAGES).forEach(([sharedRoute, meta]) => {
    const overrideMap = LOCALE_SLUG_OVERRIDES[sharedRoute]
    if (!overrideMap) return

    const participatingLocales = meta.locales.filter((loc) => overrideMap[loc])
    if (participatingLocales.length === 0) return

    const languages: Record<string, string> = {}
    participatingLocales.forEach((loc) => {
      languages[loc] = `${baseUrl}${localePath(loc, overrideMap[loc])}`
    })
    languages['x-default'] = `${baseUrl}${localePath(participatingLocales[0], overrideMap[participatingLocales[0]])}`

    participatingLocales.forEach((loc) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePath(loc, overrideMap[loc])}`,
        lastModified: new Date(meta.lastModified),
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
        alternates: { languages },
      })
    })
  })

  // Help guide. Same slug ("help") across locales; rolled out per locale via
  // the help registry (HELP_LOCALES). Emitted only for translated locales.
  if (HELP_LOCALES.length > 0) {
    const languages: Record<string, string> = {}
    HELP_LOCALES.forEach((loc) => {
      languages[loc] = `${baseUrl}${localePath(loc, 'help')}`
    })
    languages['x-default'] = languages[HELP_LOCALES[0]]
    HELP_LOCALES.forEach((loc) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePath(loc, 'help')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages },
      })
    })
  }

  // Reference for future maintenance: silence unused-var noise from localeHome.
  void localeHome

  return sitemapEntries
}
