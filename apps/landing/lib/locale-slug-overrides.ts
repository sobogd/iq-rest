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
    if (byLocale[currentLocale] === rest) {
      // Found mapping. Target may or may not have its own override.
      const targetSlug = byLocale[target] ?? sharedRoute;
      return `/${target}${targetSlug}`;
    }
    // Edge case: current path equals the shared route itself (i.e. the
    // locale didn't override it). Still translate via target's override.
    if (rest === sharedRoute && !byLocale[currentLocale]) {
      const targetSlug = byLocale[target] ?? sharedRoute;
      return `/${target}${targetSlug}`;
    }
  }

  // Not a known override route — assume the slug is shared across locales
  // (e.g. /ai-translation, /reservations). Just swap the first segment.
  return `/${target}${rest}`;
}
