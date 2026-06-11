// One-off: clone /app/en → /app/<locale> for every non-en locale, rename
// feature directories to the per-locale slug, and rewrite all locale-bound
// strings (canonical, ogLocale, internal hrefs, JSON-LD `inLanguage`, the
// `LOCALE` const, htmlLang/htmlDir, and analytics track prefixes).
//
// The English copy stays as a placeholder so the site is fully functional
// in every locale immediately; translation happens locale-by-locale after.
//
//   node scripts/scaffold-locales.mjs
import { readdirSync, readFileSync, writeFileSync, rmSync, cpSync, renameSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const APP = join(ROOT, "app");

// Per-shared-route per-locale slug map (mirrors lib/locale-slug-overrides.ts).
const SLUGS = {
  digitalMenu: {
    en: "digital-menu-for-restaurants",
    es: "menu-digital-restaurantes",
    it: "menu-digitale-ristoranti",
    fr: "menu-digital-restaurants",
    de: "digitale-speisekarte-restaurant",
    pt: "menu-digital-restaurantes",
    nl: "digitaal-menu-restaurant",
    pl: "cyfrowe-menu-restauracja",
    tr: "dijital-menu-restoran",
    uk: "tsyfrove-menyu-restoran",
    ja: "dejitaru-menyu-resutoran",
    ko: "dijiteol-menyu-resutorang",
    zh: "shu-zi-cai-dan-can-ting",
    ar: "qaimat-taam-raqmiya-matam",
    fa: "menooye-dijital-restoran",
    cs: "digitalni-menu-restaurace",
    sk: "digitalne-menu-restauracia",
    hu: "digitalis-etlap-etterem",
    ro: "meniu-digital-restaurant",
    el: "psifiako-menou-estiatoria",
    bg: "digitalno-menyu-restorant",
    hr: "digitalni-jelovnik-restoran",
    sr: "digitalni-meni-restoran",
    sl: "digitalni-jedilnik-restavracija",
    ca: "carta-digital-restaurant",
    da: "digitalt-menu-restaurant",
    no: "digital-meny-restaurant",
    sv: "digital-meny-restaurang",
    fi: "digitaalinen-ruokalista-ravintola",
    et: "digitaalne-menuu-restoran",
    lt: "skaitmeninis-meniu-restoranas",
    lv: "digitala-edienkarte-restorans",
    ga: "biachlar-digiteach-bialann",
    is: "stafraen-matsedill-veitingastaur",
  },
  orderTaking: {
    en: "restaurant-ordering-system",
    es: "sistema-pedidos-restaurante",
    it: "sistema-ordinazioni-ristorante",
    fr: "systeme-commandes-restaurant",
    de: "restaurant-bestellsystem",
    pt: "sistema-de-pedidos-restaurante",
    nl: "bestelsysteem-restaurant",
    pl: "system-zamowien-restauracja",
    tr: "restoran-siparis-sistemi",
    uk: "pryjom-zamovlen-restoran",
    ja: "chumon-shisutemu-resutoran",
    ko: "juneun-shiseutem-resutorang",
    zh: "dian-can-xi-tong-can-ting",
    ar: "nizam-talabat-matam",
    fa: "sistem-sefaresh-restoran",
    cs: "objednavkovy-system-restaurace",
    sk: "objednavkovy-system-restauracia",
    hu: "rendelesi-rendszer-etterem",
    ro: "sistem-comenzi-restaurant",
    el: "systima-paragelion-estiatorio",
    bg: "sistema-porachki-restorant",
    hr: "sustav-narudzbi-restoran",
    sr: "sistem-porudzbina-restoran",
    sl: "sistem-narocanja-restavracija",
    ca: "sistema-comandes-restaurant",
    da: "bestillingssystem-restaurant",
    no: "bestillingssystem-restaurant",
    sv: "bestallningssystem-restaurang",
    fi: "tilausjarjestelma-ravintola",
    et: "tellimissusteem-restoran",
    lt: "uzsakymu-sistema-restoranas",
    lv: "pasutijumu-sistema-restorans",
    ga: "coras-orduithe-bialann",
    is: "pontunarkerfi-veitingastaur",
  },
  bookings: {
    en: "table-booking-system",
    es: "reservas-de-mesas",
    it: "prenotazione-tavoli",
    fr: "reservation-tables",
    de: "tisch-reservierung",
    pt: "reserva-de-mesas",
    nl: "tafel-reserveren",
    pl: "rezerwacja-stolikow",
    tr: "masa-rezervasyonu",
    uk: "bronyuvannya-stoliv",
    ja: "tesuto-yoyaku",
    ko: "tebeul-yeyak",
    zh: "yu-ding-zhuo-wei",
    ar: "hajz-tawilat",
    fa: "rezerve-miz",
    cs: "rezervace-stolu",
    sk: "rezervacia-stolov",
    hu: "asztalfoglalas",
    ro: "rezervare-mese",
    el: "kratisi-trapezi-online",
    bg: "rezervatsiya-masi",
    hr: "rezervacija-stolova",
    sr: "rezervacija-stolova",
    sl: "rezervacija-miz",
    ca: "reserva-de-taules",
    da: "bordreservation",
    no: "bordreservasjon",
    sv: "bordsbokning",
    fi: "poytavaraus",
    et: "laudade-broneerimine",
    lt: "staliuku-rezervacija",
    lv: "galdu-rezervesana",
    ga: "curfha-bord",
    is: "bord-bokun",
  },
  kitchenDisplay: {
    en: "kitchen-display-system",
    es: "pantalla-de-cocina",
    it: "display-cucina",
    fr: "ecran-cuisine",
    de: "kuechen-display",
    pt: "display-de-cozinha",
    nl: "keukenscherm",
    pl: "ekran-kuchenny",
    tr: "mutfak-ekrani",
    uk: "kukhonnyy-displey",
    ja: "chubo-disupurei",
    ko: "juhang-diseupeullei",
    zh: "hou-chu-xian-shi-qi",
    ar: "shashat-matbakh",
    fa: "namayeshgar-ashpazkhane",
    cs: "kuchynsky-displej",
    sk: "kuchynsky-displej",
    hu: "konyhai-kijelzo",
    ro: "display-bucatarie",
    el: "othoni-mageirio",
    bg: "kukhnenski-displei",
    hr: "kuhinjski-ekran",
    sr: "kuhinjski-ekran",
    sl: "kuhinjski-zaslon",
    ca: "pantalla-de-cuina",
    da: "kokken-skaerm",
    no: "kjokken-skjerm",
    sv: "kok-skarm",
    fi: "keittion-naytto",
    et: "kook-ekraan",
    lt: "virtuves-ekranas",
    lv: "virtuves-ekrans",
    ga: "scailean-cistine",
    is: "eldhus-skjar",
  },
  pricing: {
    en: "pricing",
    es: "precios",
    it: "prezzi",
    fr: "tarifs",
    de: "preise",
    pt: "precos",
    nl: "prijzen",
    pl: "cennik",
    tr: "fiyatlar",
    uk: "tsiny",
    ja: "kakaku",
    ko: "gagyeok",
    zh: "jia-ge",
    ar: "asaar",
    fa: "ghimat",
    cs: "ceny",
    sk: "ceny",
    hu: "arak",
    ro: "preturi",
    el: "times",
    bg: "tseni",
    hr: "cijene",
    sr: "cene",
    sl: "cene",
    ca: "preus",
    da: "priser",
    no: "priser",
    sv: "priser",
    fi: "hinnat",
    et: "hinnad",
    lt: "kainos",
    lv: "cenas",
    ga: "praghsanna",
    is: "verd",
  },
};

const OG_LOCALE = {
  en: "en_US", es: "es_ES", it: "it_IT", fr: "fr_FR", de: "de_DE",
  pt: "pt_PT", nl: "nl_NL", pl: "pl_PL", tr: "tr_TR", uk: "uk_UA",
  ja: "ja_JP", ko: "ko_KR", zh: "zh_CN", ar: "ar_SA", fa: "fa_IR",
  cs: "cs_CZ", sk: "sk_SK", hu: "hu_HU", ro: "ro_RO", el: "el_GR",
  bg: "bg_BG", hr: "hr_HR", sr: "sr_RS", sl: "sl_SI", ca: "ca_ES",
  da: "da_DK", no: "nb_NO", sv: "sv_SE", fi: "fi_FI", et: "et_EE",
  lt: "lt_LT", lv: "lv_LV", ga: "ga_IE", is: "is_IS",
};

const RTL = new Set(["ar", "fa"]);

const TARGET_LOCALES = Object.keys(OG_LOCALE).filter((l) => l !== "en");

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walkFiles(full, out);
    else if (full.endsWith(".ts") || full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

for (const L of TARGET_LOCALES) {
  const dm = SLUGS.digitalMenu[L];
  const ot = SLUGS.orderTaking[L];
  const bk = SLUGS.bookings[L];
  const kd = SLUGS.kitchenDisplay[L];
  const pr = SLUGS.pricing[L];
  const og = OG_LOCALE[L];

  const target = join(APP, L);

  // Wipe + copy fresh from app/en (preserves any non-en helpers we added).
  rmSync(target, { recursive: true, force: true });
  cpSync(join(APP, "en"), target, { recursive: true });

  // Rename feature directories to the per-locale slug.
  const renames = [
    ["digital-menu-for-restaurants", dm],
    ["restaurant-ordering-system", ot],
    ["table-booking-system", bk],
    ["kitchen-display-system", kd],
    ["pricing", pr],
  ];
  for (const [from, to] of renames) {
    if (from === to) continue;
    renameSync(join(target, from), join(target, to));
  }

  // Rewrite locale-bound strings in every .ts / .tsx.
  const files = walkFiles(target);
  for (const f of files) {
    let c = readFileSync(f, "utf8");
    // Pricing path must be swapped before the generic /en/ → /L/ to avoid
    // double-rewriting.
    c = c.replaceAll(`/en/pricing"`, `/${L}/${pr}"`);
    c = c.replaceAll("digital-menu-for-restaurants", dm);
    c = c.replaceAll("restaurant-ordering-system", ot);
    c = c.replaceAll("table-booking-system", bk);
    c = c.replaceAll("kitchen-display-system", kd);
    c = c.replaceAll("/en/", `/${L}/`);
    c = c.replaceAll(`htmlLang: "en"`, `htmlLang: "${L}"`);
    c = c.replaceAll(`locale: "en"`, `locale: "${L}"`);
    c = c.replaceAll("en_US", og);
    c = c.replaceAll("land_en", `land_${L}`);
    c = c.replaceAll(`LOCALE = "en"`, `LOCALE = "${L}"`);
    c = c.replaceAll(`inLanguage: "en"`, `inLanguage: "${L}"`);
    c = c.replaceAll(`inLanguage: en`, `inLanguage: "${L}"`);
    if (RTL.has(L)) {
      c = c.replaceAll(`htmlDir: "ltr"`, `htmlDir: "rtl"`);
    }
    writeFileSync(f, c);
  }
  console.log(`scaffolded ${L}: ${dm} / ${ot} / ${bk} / ${kd} / ${pr}`);
}

console.log(`\ndone — ${TARGET_LOCALES.length} locales`);
