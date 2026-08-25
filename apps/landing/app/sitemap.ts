import { MetadataRoute } from 'next'
import { locales } from '@/lib/locales'
import { BLOG_ARTICLE_META, BLOG_INDEX_META, FEATURE_PAGES, HELP_META, HOME_META, PARTIAL_FEATURE_PAGES, type PageMeta } from '@/lib/page-meta'
import { LOCALE_SLUG_OVERRIDES, localizedHref } from '@/lib/locale-slug-overrides'
import { localeHome, localePath } from '@/lib/locale-paths'
import { HELP_LOCALES } from '@/app/_landing/help/registry'
import { BLOG_ARTICLES } from '@/app/_landing/blog/registry'

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

  // Help guide. Localized slug per locale (e.g. /it/guida); rolled out per
  // locale via the help registry (HELP_LOCALES). Emitted only for translated
  // locales, using the same slug source of truth as the pages themselves.
  if (HELP_LOCALES.length > 0) {
    const languages: Record<string, string> = {}
    HELP_LOCALES.forEach((loc) => {
      languages[loc] = `${baseUrl}${localizedHref('/help', loc)}`
    })
    // x-default must be the English guide (`/help`), not whatever locale
    // happens to be first in the registry (ru).
    languages['x-default'] = `${baseUrl}${localizedHref('/help', 'en')}`
    HELP_LOCALES.forEach((loc) => {
      sitemapEntries.push({
        url: `${baseUrl}${localizedHref('/help', loc)}`,
        lastModified: new Date(HELP_META.lastModified),
        changeFrequency: HELP_META.changeFrequency,
        priority: HELP_META.priority,
        alternates: { languages },
      })
    })
  }

  // Blog: one shared English slug per URL across every locale, so alternates
  // are a plain locale-prefix fan-out. Article lastmod comes from the manifest
  // (dateModified ?? date); the index follows the newest article.
  const blogAlternatesFor = (path: string) => {
    const languages: Record<string, string> = {}
    locales.forEach((loc) => {
      languages[loc] = `${baseUrl}${localePath(loc, path)}`
    })
    languages['x-default'] = `${baseUrl}${localePath('en', path)}`
    return { languages }
  }

  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}${localePath(locale, '/blog')}`,
      lastModified: new Date(BLOG_INDEX_META.lastModified),
      changeFrequency: BLOG_INDEX_META.changeFrequency,
      priority: BLOG_INDEX_META.priority,
      alternates: blogAlternatesFor('/blog'),
    })
  })

  BLOG_ARTICLES.forEach((article) => {
    const path = `/blog/${article.id}`
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePath(locale, path)}`,
        lastModified: new Date(article.dateModified ?? article.date),
        changeFrequency: BLOG_ARTICLE_META.changeFrequency,
        priority: BLOG_ARTICLE_META.priority,
        alternates: blogAlternatesFor(path),
      })
    })
  })

  // Reference for future maintenance: silence unused-var noise from localeHome.
  void localeHome

  return sitemapEntries
}
