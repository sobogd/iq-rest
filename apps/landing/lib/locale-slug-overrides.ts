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
};

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

    if (byLocale[target]) return targetPath(target, byLocale[target]);
    return targetHome(target);
  }

  return targetPath(target, rest);
}
