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

  // Per-locale slug overrides: feature pages migrated to a keyword-rich
  // slug for SEO. The old shared slug is dropped for that locale only and
  // the new slug is emitted with its own alternates row. Keys are the old
  // shared `route.path`; values map locale → new slug for the same feature.
  const LOCALE_SLUG_OVERRIDES: Record<string, Record<string, string>> = {
    "/online-orders": {
      en: "/restaurant-online-ordering-system",
      es: "/sistema-de-pedidos-para-restaurantes",
      it: "/tablet-per-ordinazioni-ristorante",
      fr: "/logiciel-prise-de-commande-restaurant",
      de: "/restaurant-bestellsystem",
      pt: "/sistema-de-pedidos-online-restaurante",
      ru: "/sistema-onlayn-zakazov-restorana",
      pl: "/system-zamowien-online-dla-restauracji",
      nl: "/online-bestelsysteem-voor-restaurants",
      ja: "/qr-order-system-restaurant",
      zh: "/qr-ordering-system-restaurant",
      tr: "/restoran-online-siparis-sistemi",
      ar: "/nizam-talabat-online-matam",
      ko: "/restaurant-online-order-system",
      uk: "/onlayn-systema-zamovlen-restoran",
      bg: "/sistema-za-onlayn-porachki-restorant",
      ca: "/sistema-de-comandes-online-restaurant",
      cs: "/online-objednavkovy-system-restaurace",
      da: "/online-bestillingssystem-restaurant",
      el: "/online-systima-paragelion-estiatorio",
      et: "/online-tellimissusteem-restoranile",
      fa: "/sistem-sefaresh-online-restoran",
      fi: "/online-tilausjarjestelma-ravintolalle",
      ga: "/coras-orduithe-ar-line-bialann",
      hr: "/online-sustav-narudzbi-restoran",
      hu: "/online-rendelesi-rendszer-etterem",
      is: "/netpontunarkerfi-veitingastadar",
      lt: "/internetine-uzsakymu-sistema-restoranui",
      lv: "/tiessaistes-pasutijumu-sistema-restoranam",
      no: "/online-bestillingssystem-restaurant",
      ro: "/sistem-comenzi-online-restaurant",
      sk: "/online-objednavkovy-system-restauracia",
      sl: "/spletni-sistem-narocanja-restavracija",
      sr: "/online-sistem-porudzbina-restoran",
    },
  }

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
