// Per-locale slug overrides for feature pages that have been migrated to
// keyword-rich SEO URLs. The shared route under the `app/[locale]/...`
// segment is the canonical "logical" path used everywhere (sitemap, ads,
// internal links). The override map says: when locale X visits the
// feature, the URL is the slug listed here instead of the shared route.
//
// Used by:
//   - app/sitemap.ts — emits the locale-specific URL with correct alternates
//   - middleware (next.config redirects) — 301s the shared `/online-orders`
//     to the per-locale slug
//   - RegionPromptModal — when the visitor picks a different locale we
//     translate the current URL into that locale's slug (so e.g.
//     /tr/restoran-online-siparis-sistemi → /es/sistema-de-pedidos-para-restaurantes
//     instead of dropping the visitor on the wrong path).
//
// Each entry's KEY is the shared route ("/online-orders"). The inner map
// is locale → slug for that locale (slug includes the leading slash).

export const LOCALE_SLUG_OVERRIDES: Record<string, Record<string, string>> = {
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
    sv: "/online-bestallningssystem-restaurang",
  },

  // PPC landing pages for the "digital menu" theme. Only shipped for the
  // locales we run paid Google Ads campaigns in. The shared route key
  // (/lp/digital-menu) doesn't resolve to a real URL on its own — it's
  // only used by swapLocale to translate between per-locale LP slugs.
  // Locales without an override fall back to /<target> home via the
  // /lp/* branch in swapLocale.
  // PPC landings for the "QR menu" theme — separate ad groups / keyword
  // (qr menu) targeting users with higher purchase intent. Same SoftwareApplication
  // schema, distinct copy that hammers "QR menu" instead of "digital menu" for ad
  // relevance scoring.
  "/lp/qr-menu": {
    en: "/lp/qr-menu-for-restaurants",
    es: "/lp/menu-qr-para-restaurantes",
    it: "/lp/menu-qr-code-per-ristoranti",
    fr: "/lp/menu-qr-pour-restaurants",
    de: "/lp/qr-speisekarte-fuer-restaurants",
    pt: "/lp/menu-qr-para-restaurantes",
    ru: "/lp/qr-menyu-dlya-restoranov",
    pl: "/lp/menu-qr-dla-restauracji",
    nl: "/lp/qr-menu-voor-restaurants",
    tr: "/lp/restoranlar-icin-qr-menu",
    ar: "/lp/qaimat-qr-lilmataem",
    ja: "/lp/restoran-qr-menu",
    zh: "/lp/restaurant-qr-menu-chinese",
    ko: "/lp/restaurant-qr-menu-korean",
    uk: "/lp/qr-menyu-dlya-restoraniv",
    bg: "/lp/qr-menyu-za-restoranti",
    ca: "/lp/menu-qr-per-restaurants",
    cs: "/lp/qr-menu-pro-restaurace",
    da: "/lp/qr-menu-til-restauranter",
    el: "/lp/qr-menu-gia-estiatoria",
    et: "/lp/qr-menuu-restoranidele",
    fa: "/lp/menooye-qr-baraye-restoranha",
    fi: "/lp/qr-ruokalista-ravintoloille",
    ga: "/lp/biachlar-qr-do-bhialanna",
    hr: "/lp/qr-jelovnik-za-restorane",
    hu: "/lp/qr-etlap-ettermeknek",
    is: "/lp/qr-matsedill-fyrir-veitingastadi",
    lt: "/lp/qr-meniu-restoranams",
    lv: "/lp/qr-edienkarte-restoraniem",
    no: "/lp/qr-meny-for-restauranter",
    ro: "/lp/meniu-qr-pentru-restaurante",
    sk: "/lp/qr-menu-pre-restauracie",
    sl: "/lp/qr-jedilnik-za-restavracije",
    sr: "/lp/qr-meni-za-restorane",
    sv: "/lp/qr-meny-for-restauranger",
  },

  "/lp/digital-menu": {
    de: "/lp/digitale-speisekarte-fuer-restaurants",
    fr: "/lp/menu-digital-pour-restaurants",
    pt: "/lp/menu-digital-para-restaurantes",
    nl: "/lp/digitaal-menu-voor-restaurants",
    pl: "/lp/cyfrowe-menu-dla-restauracji",
    ru: "/lp/tsifrovoe-menyu-dlya-restoranov",
    uk: "/lp/tsyfrove-menyu-dlya-restoraniv",
    sv: "/lp/digital-meny-for-restauranger",
    da: "/lp/digital-menu-til-restauranter",
    no: "/lp/digital-meny-for-restauranter",
    fi: "/lp/digitaalinen-ruokalista-ravintoloille",
    cs: "/lp/digitalni-menu-pro-restaurace",
    el: "/lp/psifiako-menu-gia-estiatoria",
    tr: "/lp/restoranlar-icin-dijital-menu",
    ro: "/lp/meniu-digital-pentru-restaurante",
    hu: "/lp/digitalis-etlap-ettermeknek",
    bg: "/lp/digitalno-menyu-za-restoranti",
    hr: "/lp/digitalni-jelovnik-za-restorane",
    sk: "/lp/digitalne-menu-pre-restauracie",
    sl: "/lp/digitalni-jedilnik-za-restavracije",
    et: "/lp/digitaalne-menuu-restoranidele",
    lv: "/lp/digitala-edienkarte-restoraniem",
    lt: "/lp/skaitmeninis-meniu-restoranams",
    sr: "/lp/digitalni-meni-za-restorane",
    ga: "/lp/biachlar-digiteach-do-bhialanna",
    is: "/lp/stafraenn-matsedill-fyrir-veitingastadi",
    fa: "/lp/menooye-dijital-baraye-restoranha",
    ar: "/lp/qaimat-taam-raqmiya-lilmataem",
    ja: "/lp/restoran-digital-menu",
    ko: "/lp/restaurant-digital-menu-korean",
    zh: "/lp/restaurant-digital-menu-chinese",
    en: "/lp/digital-menu-for-restaurants",
    it: "/lp/menu-digitale-per-ristoranti",
    es: "/lp/carta-digital-para-restaurante",
    ca: "/lp/carta-digital-para-restaurante",
  },
};

/**
 * Translate a path from one locale to another, honouring per-locale slug
 * overrides. Falls back to a simple first-segment swap if the rest of the
 * path isn't a known override.
 *
 * Examples (target = "es"):
 *   /tr/restoran-online-siparis-sistemi → /es/sistema-de-pedidos-para-restaurantes
 *   /tr/ai-translation                  → /es/ai-translation
 *   /tr                                  → /es
 *   /tr/some/sub/path                   → /es/some/sub/path
 */
export function swapLocale(pathname: string, target: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${target}`;

  const currentLocale = segments[0];
  const rest = "/" + segments.slice(1).join("/");

  // Bare locale path (/tr) → swap to /<target>.
  if (segments.length === 1) return `/${target}`;

  // Try to find the shared route that the current path maps to in the
  // override table. If the current path is the override for currentLocale
  // of some shared route, we know what the canonical route is and can ask
  // for target's override.
  for (const [sharedRoute, byLocale] of Object.entries(LOCALE_SLUG_OVERRIDES)) {
    const matchedAsOverride = byLocale[currentLocale] === rest;
    const matchedAsShared = rest === sharedRoute && !byLocale[currentLocale];
    if (!matchedAsOverride && !matchedAsShared) continue;

    // Target has its own slug for this shared route → translate.
    if (byLocale[target]) return `/${target}${byLocale[target]}`;

    // Shared routes starting with /lp/ are PPC landings that don't have
    // a "real" shared URL — only per-locale overrides. If the target
    // doesn't ship that LP, send the visitor to their locale home rather
    // than 404'ing on a slug that doesn't exist.
    if (sharedRoute.startsWith("/lp/")) return `/${target}`;

    // Regular shared route → fall back to it for the target locale.
    return `/${target}${sharedRoute}`;
  }

  // Not a known override route — assume the slug is shared across locales
  // (e.g. /ai-translation, /reservations). Just swap the first segment.
  return `/${target}${rest}`;
}
