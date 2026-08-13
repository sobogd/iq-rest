import { locales } from "@/lib/locales";
import { localePath } from "@/lib/locale-paths";

// Per-locale slug overrides for the five shared routes that exist on every
// locale: digital-menu, order-taking, bookings, kitchen-display, pricing.
//
// The "shared route" key (e.g. "/digital-menu") is a logical identifier — it
// is NOT a real URL that resolves. The per-locale override under that key
// is the actual slug under `app/<locale>/<slug>/` (with leading slash).
//
// Consumers:
//   - `app/sitemap.ts` — emits per-locale URLs with hreflang alternates
//   - `next.config.ts` `redirects()` — optional 301s from legacy SEO slugs
//   - `middleware.ts` via `swapLocale()` — the `/d` geo deep-link translates
//     the EN slug to the equivalent slug in the target locale (instead of
//     dropping the visitor on a 404).

export const LOCALE_SLUG_OVERRIDES: Record<string, Record<string, string>> = {
  "/digital-menu": {
    ru: "/tsifrovoe-menyu",
    en: "/digital-menu-for-restaurants",
    es: "/menu-digital-restaurantes",
    it: "/menu-digitale-ristoranti",
    fr: "/menu-digital-restaurants",
    de: "/digitale-speisekarte-restaurant",
    pt: "/menu-digital-restaurantes",
    nl: "/digitaal-menu-restaurant",
    pl: "/cyfrowe-menu-restauracja",
    tr: "/dijital-menu-restoran",
    uk: "/tsyfrove-menyu-restoran",
    ja: "/dejitaru-menyu-resutoran",
    ko: "/dijiteol-menyu-resutorang",
    zh: "/shu-zi-cai-dan-can-ting",
    ar: "/qaimat-taam-raqmiya-matam",
    fa: "/menooye-dijital-restoran",
    cs: "/digitalni-menu-restaurace",
    sk: "/digitalne-menu-restauracia",
    hu: "/digitalis-etlap-etterem",
    ro: "/meniu-digital-restaurant",
    el: "/psifiako-menou-estiatoria",
    bg: "/digitalno-menyu-restorant",
    hr: "/digitalni-jelovnik-restoran",
    sr: "/digitalni-meni-restoran",
    sl: "/digitalni-jedilnik-restavracija",
    ca: "/carta-digital-restaurant",
    da: "/digitalt-menu-restaurant",
    no: "/digital-meny-restaurant",
    sv: "/digital-meny-restaurang",
    fi: "/digitaalinen-ruokalista-ravintola",
    et: "/digitaalne-menuu-restoran",
    lt: "/skaitmeninis-meniu-restoranas",
    lv: "/digitala-edienkarte-restorans",
    ga: "/biachlar-digiteach-bialann",
    is: "/stafraen-matsedill-veitingastaur",
  },

  "/order-taking": {
    ru: "/priem-zakazov-restoran",
    en: "/restaurant-ordering-system",
    es: "/sistema-pedidos-restaurante",
    it: "/sistema-ordinazioni-ristorante",
    fr: "/systeme-commandes-restaurant",
    de: "/restaurant-bestellsystem",
    pt: "/sistema-de-pedidos-restaurante",
    nl: "/bestelsysteem-restaurant",
    pl: "/system-zamowien-restauracja",
    tr: "/restoran-siparis-sistemi",
    uk: "/pryjom-zamovlen-restoran",
    ja: "/chumon-shisutemu-resutoran",
    ko: "/juneun-shiseutem-resutorang",
    zh: "/dian-can-xi-tong-can-ting",
    ar: "/nizam-talabat-matam",
    fa: "/sistem-sefaresh-restoran",
    cs: "/objednavkovy-system-restaurace",
    sk: "/objednavkovy-system-restauracia",
    hu: "/rendelesi-rendszer-etterem",
    ro: "/sistem-comenzi-restaurant",
    el: "/systima-paragelion-estiatorio",
    bg: "/sistema-porachki-restorant",
    hr: "/sustav-narudzbi-restoran",
    sr: "/sistem-porudzbina-restoran",
    sl: "/sistem-narocanja-restavracija",
    ca: "/sistema-comandes-restaurant",
    da: "/bestillingssystem-restaurant",
    no: "/bestillingssystem-restaurant",
    sv: "/bestallningssystem-restaurang",
    fi: "/tilausjarjestelma-ravintola",
    et: "/tellimissusteem-restoran",
    lt: "/uzsakymu-sistema-restoranas",
    lv: "/pasutijumu-sistema-restorans",
    ga: "/coras-orduithe-bialann",
    is: "/pontunarkerfi-veitingastaur",
  },

  "/bookings": {
    ru: "/bronirovanie-stolov",
    en: "/table-booking-system",
    es: "/reservas-de-mesas",
    it: "/prenotazione-tavoli",
    fr: "/reservation-tables",
    de: "/tisch-reservierung",
    pt: "/reserva-de-mesas",
    nl: "/tafel-reserveren",
    pl: "/rezerwacja-stolikow",
    tr: "/masa-rezervasyonu",
    uk: "/bronyuvannya-stoliv",
    ja: "/tesuto-yoyaku",
    ko: "/tebeul-yeyak",
    zh: "/yu-ding-zhuo-wei",
    ar: "/hajz-tawilat",
    fa: "/rezerve-miz",
    cs: "/rezervace-stolu",
    sk: "/rezervacia-stolov",
    hu: "/asztalfoglalas",
    ro: "/rezervare-mese",
    el: "/kratisi-trapezi-online",
    bg: "/rezervatsiya-masi",
    hr: "/rezervacija-stolova",
    sr: "/rezervacija-stolova",
    sl: "/rezervacija-miz",
    ca: "/reserva-de-taules",
    da: "/bordreservation",
    no: "/bordreservasjon",
    sv: "/bordsbokning",
    fi: "/poytavaraus",
    et: "/laudade-broneerimine",
    lt: "/staliuku-rezervacija",
    lv: "/galdu-rezervesana",
    ga: "/curfha-bord",
    is: "/bord-bokun",
  },

  "/kitchen-display": {
    ru: "/kds-kuhonnyy-displey",
    en: "/kitchen-display-system",
    es: "/pantalla-de-cocina",
    it: "/display-cucina",
    fr: "/ecran-cuisine",
    de: "/kuechen-display",
    pt: "/display-de-cozinha",
    nl: "/keukenscherm",
    pl: "/ekran-kuchenny",
    tr: "/mutfak-ekrani",
    uk: "/kukhonnyy-displey",
    ja: "/chubo-disupurei",
    ko: "/juhang-diseupeullei",
    zh: "/hou-chu-xian-shi-qi",
    ar: "/shashat-matbakh",
    fa: "/namayeshgar-ashpazkhane",
    cs: "/kuchynsky-displej",
    sk: "/kuchynsky-displej",
    hu: "/konyhai-kijelzo",
    ro: "/display-bucatarie",
    el: "/othoni-mageirio",
    bg: "/kukhnenski-displei",
    hr: "/kuhinjski-ekran",
    sr: "/kuhinjski-ekran",
    sl: "/kuhinjski-zaslon",
    ca: "/pantalla-de-cuina",
    da: "/kokken-skaerm",
    no: "/kjokken-skjerm",
    sv: "/kok-skarm",
    fi: "/keittion-naytto",
    et: "/kook-ekraan",
    lt: "/virtuves-ekranas",
    lv: "/virtuves-ekrans",
    ga: "/scailean-cistine",
    is: "/eldhus-skjar",
  },

  // QR-menu feature page — universal across all 35 locales. Slugs are
  // keyword-rich and transliterated to Latin per locale (CJK/Cyrillic/
  // Arabic included). `en` is served at the root so its value is the bare
  // root path.
  "/menu-qr-code": {
    en: "/qr-code-menu-for-restaurants",
    es: "/codigo-qr-restaurante",
    it: "/menu-qr-code-ristoranti",
    pt: "/qr-code-menu-restaurantes",
    ca: "/codi-qr-restaurant",
    ru: "/qr-menyu-restoran",
    de: "/qr-code-speisekarte-restaurant",
    fr: "/menu-qr-code-restaurant",
    nl: "/qr-code-menukaart-restaurant",
    pl: "/menu-qr-kod-restauracja",
    tr: "/qr-kod-menu-restoran",
    uk: "/qr-menyu-restoran",
    ja: "/qr-menu-resutoran",
    ko: "/qr-menyu-resutorang",
    zh: "/qr-cai-dan-can-ting",
    ar: "/qr-menu-matam",
    fa: "/menooye-qr-restoran",
    cs: "/qr-menu-restaurace",
    sk: "/qr-menu-restauracia",
    hu: "/qr-kod-etlap-etterem",
    ro: "/meniu-qr-cod-restaurant",
    el: "/qr-menou-estiatorio",
    bg: "/qr-menyu-restorant",
    hr: "/qr-meni-restoran",
    sr: "/qr-meni-restoran",
    sl: "/qr-meni-restavracija",
    da: "/qr-kode-menukort-restaurant",
    no: "/qr-kode-meny-restaurant",
    sv: "/qr-kod-meny-restaurang",
    fi: "/qr-koodi-ruokalista-ravintola",
    et: "/qr-kood-menuu-restoran",
    lt: "/qr-kodo-meniu-restoranas",
    lv: "/qr-koda-izvelne-restorans",
    ga: "/biachlar-qr-coda-bialann",
    is: "/qr-matsedill-veitingastadur",
  },

  "/pricing": {
    ru: "/tseny",
    en: "/pricing",
    es: "/precios",
    it: "/prezzi",
    fr: "/tarifs",
    de: "/preise",
    pt: "/precos",
    nl: "/prijzen",
    pl: "/cennik",
    tr: "/fiyatlar",
    uk: "/tsiny",
    ja: "/kakaku",
    ko: "/gagyeok",
    zh: "/jia-ge",
    ar: "/asaar",
    fa: "/ghimat",
    cs: "/ceny",
    sk: "/ceny",
    hu: "/arak",
    ro: "/preturi",
    el: "/times",
    bg: "/tseni",
    hr: "/cijene",
    sr: "/cene",
    sl: "/cene",
    ca: "/preus",
    da: "/priser",
    no: "/priser",
    sv: "/priser",
    fi: "/hinnat",
    et: "/hinnad",
    lt: "/kainos",
    lv: "/cenas",
    ga: "/praghsanna",
    is: "/verd",
  },

  // About / company page — localized slug per language (SEO). Only the locales
  // that ship a built page are listed; others fall back to the route key.
  "/about": {
    ru: "/o-kompanii",
    en: "/about",
    es: "/sobre-nosotros",
    fr: "/a-propos",
    it: "/chi-siamo",
    pt: "/sobre-nos",
  },

  // Help guide — localized slug per language (SEO). Same rollout rule as above.
  "/help": {
    ru: "/help",
    en: "/help",
    es: "/ayuda",
    fr: "/aide",
    it: "/guida",
    pt: "/ajuda",
  },
};

// Auth + legal routes share ONE slug across every locale (login/register live
// under app/[locale]/(auth); privacy/terms/cookies under app/[locale]). They
// are registered here so the mapping is the single source of truth for every
// page type — swapLocale/canonicalisation/deep-links treat them uniformly.
for (const route of ["/login", "/register", "/privacy", "/terms", "/cookies"]) {
  LOCALE_SLUG_OVERRIDES[route] = Object.fromEntries(
    (locales as readonly string[]).map((l) => [l, route]),
  );
}

/**
 * Translate a path from one locale to another, honouring per-locale slug
 * overrides. Falls back to a simple first-segment swap if the rest of the
 * path isn't a known override.
 *
 * Examples (target = "es"):
 *   /it/menu-digitale-ristoranti → /es/menu-digital-restaurantes
 *   /tr/restoran-siparis-sistemi → /es/sistema-pedidos-restaurante
 *   /tr                          → /es
 *   /tr/some/sub/path            → /es/some/sub/path
 */
const KNOWN_LOCALES = new Set(
  Object.values(LOCALE_SLUG_OVERRIDES).flatMap((m) => Object.keys(m)),
);

const targetHome = (target: string) => (target === "en" ? "/" : `/${target}`);
const targetPath = (target: string, slug: string) =>
  target === "en" ? slug : `/${target}${slug}`;

export function swapLocale(pathname: string, target: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return targetHome(target);

  const firstIsLocale = KNOWN_LOCALES.has(segments[0]);
  const currentLocale = firstIsLocale ? segments[0] : "en";
  const rest = firstIsLocale
    ? "/" + segments.slice(1).join("/")
    : "/" + segments.join("/");

  if (rest === "/") return targetHome(target);

  for (const [sharedRoute, byLocale] of Object.entries(LOCALE_SLUG_OVERRIDES)) {
    const matchedAsOverride = byLocale[currentLocale] === rest;
    const matchedAsShared = rest === sharedRoute && !byLocale[currentLocale];
    if (!matchedAsOverride && !matchedAsShared) continue;

    if (byLocale[target]) {
      // auth/legal are always prefixed, even for English.
      if (ALWAYS_PREFIXED.has(sharedRoute)) return `/${target}${byLocale[target]}`;
      return targetPath(target, byLocale[target]);
    }
    return targetHome(target);
  }

  return targetPath(target, rest);
}

// ---------------------------------------------------------------------------
// Registry helpers — the mapping above is the single source of truth for every
// inter-page link, locale switch, slug canonicalisation and ad deep-link.
// ---------------------------------------------------------------------------

/** The localized slug (leading slash) for a route key in a locale, or the
 *  route key itself when the locale ships no override. */
export function slugForRoute(routeKey: string, locale: string): string {
  return LOCALE_SLUG_OVERRIDES[routeKey]?.[locale] ?? routeKey;
}

// Routes that live under `app/[locale]/…` (auth + legal) are ALWAYS prefixed —
// including English (there is no un-prefixed `(en)` variant of these). Marketing
// routes, by contrast, serve English at the root. localizedHref/swapLocale honour
// this so e.g. EN privacy is `/en/privacy`, not `/privacy`.
const ALWAYS_PREFIXED = new Set([
  "/login",
  "/register",
  "/privacy",
  "/terms",
  "/cookies",
]);

/** True when a route lives under app/[locale]/… (auth/legal) and is therefore
 *  prefixed even for English. */
export function isAlwaysPrefixed(routeKey: string): boolean {
  return ALWAYS_PREFIXED.has(routeKey);
}

// EN root slugs for MARKETING routes only — auth/legal are never served at the
// root, so they must NOT be treated as `/`-level English pages. Consumed by
// middleware to recognise root-served pages and legacy `/en/<slug>` redirects.
export const EN_ROOT_SLUGS: ReadonlySet<string> = new Set(
  Object.entries(LOCALE_SLUG_OVERRIDES)
    .filter(([key]) => !ALWAYS_PREFIXED.has(key))
    .map(([, m]) => m.en)
    .filter((v): v is string => !!v),
);

/** Full path for a route key in a locale (marketing: en → unprefixed, others →
 *  /<locale>; auth/legal: always /<locale>). */
export function localizedHref(routeKey: string, locale: string): string {
  const slug = slugForRoute(routeKey, locale);
  if (ALWAYS_PREFIXED.has(routeKey)) return `/${locale}${slug}`;
  return localePath(locale, slug);
}

// The four home/nav feature links, in the fixed order every locale's
// `texts.footer.featureLinks` array uses. Hrefs are derived from the mapping so
// they never point at a stale hardcoded locale (the JSON only carries labels).
export const FEATURE_LINK_ROUTES = [
  "/digital-menu",
  "/order-taking",
  "/bookings",
  "/kitchen-display",
] as const;

/** Re-point a locale's feature-link list at the correct localized hrefs,
 *  keeping each JSON-supplied label. */
export function localizedFeatureLinks<T extends { href: string; label: string }>(
  locale: string,
  links: T[],
): { href: string; label: string }[] {
  return links.map((l, i) =>
    FEATURE_LINK_ROUTES[i]
      ? { href: localizedHref(FEATURE_LINK_ROUTES[i], locale), label: l.label }
      : { href: l.href, label: l.label },
  );
}

// Reverse index: every localized slug (across all locales) → its route key.
// Built after the identical-route assignment so auth/legal slugs are included.
const SLUG_TO_ROUTE: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const [routeKey, byLocale] of Object.entries(LOCALE_SLUG_OVERRIDES)) {
    for (const slug of Object.values(byLocale)) m.set(slug, routeKey);
  }
  return m;
})();

/** Route key owning a slug in ANY locale. Accepts with/without leading slash. */
export function routeKeyFromSlug(slug: string): string | undefined {
  const s = slug.startsWith("/") ? slug : `/${slug}`;
  return SLUG_TO_ROUTE.get(s);
}

/** Route key for a full pathname (strips a leading /<locale>). Returns "/" for
 *  a locale home, the shared route key for a known page, or undefined. */
export function routeKeyFromPath(pathname: string): string | undefined {
  const seg = pathname.split("/").filter(Boolean);
  const firstIsLocale =
    seg.length > 0 && (locales as readonly string[]).includes(seg[0]);
  const rest = firstIsLocale ? `/${seg.slice(1).join("/")}` : `/${seg.join("/")}`;
  if (rest === "/") return "/";
  return SLUG_TO_ROUTE.get(rest);
}

/**
 * Slug-canonicalisation for middleware. Given the locale segment of a URL and
 * the remaining path (`/slug`), if `rest` is a known route slug that is NOT the
 * correct slug for `locale`, returns the corrected full path to 301 to;
 * otherwise null (already canonical or not a known route).
 *
 *   canonicalSlugRedirect("it", "/menu-digital-restaurantes")
 *     → "/it/menu-digitale-ristoranti"   (es slug under it → it's own slug)
 *   canonicalSlugRedirect("it", "/menu-digitale-ristoranti") → null
 */
export function canonicalSlugRedirect(locale: string, rest: string): string | null {
  const routeKey = SLUG_TO_ROUTE.get(rest);
  if (!routeKey) return null;
  const correct = slugForRoute(routeKey, locale);
  if (correct === rest) return null;
  return localePath(locale, correct);
}

/**
 * Ad deep-link resolver (`/d/<slug>`). Resolves a slug in ANY language to the
 * equivalent page in `locale`. Unknown slug → locale home (never a 404).
 */
export function deepLinkPath(slug: string, locale: string): string {
  const routeKey = routeKeyFromSlug(slug);
  if (!routeKey) return locale === "en" ? "/" : `/${locale}`;
  return localizedHref(routeKey, locale);
}
