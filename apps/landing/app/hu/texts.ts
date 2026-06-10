import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "hu",
  htmlDir: "ltr",

  meta: {
    title: "Digitális menü, konyhai kijelző és foglalások — IQ Rest",
    description:
      "Vezesd éttermed egyetlen appból: többnyelvű digitális menü, konyhai kijelző és éjjel-nappali foglalások. 5 perc alatt kész. 14 nap ingyen, kártya nélkül.",
    canonical: "https://iq-rest.com/hu",
    ogLocale: "hu_HU",
    ogTitle: "Digitális menü, konyhai kijelző és foglalások",
    ogDescription:
      "Vezesd éttermed egyetlen appból: többnyelvű digitális menü, konyhai kijelző és éjjel-nappali foglalások. 5 perc alatt kész. 14 nap ingyen, kártya nélkül.",
  },

  ctaText: "Próbáld ki ingyen",
  homeCtaText: "Próbáld ki ingyen",
  demoText: "Nézze meg a demót",
  microcopy: "14 nap ingyenes · Kártya nélkül · Lemondás bármikor",

  header: {
    navFeatures: "Funkciók",
    navHow: "Hogyan működik",
    navPricing: "Árak",
    navFaq: "GYIK",
    signIn: "Bejelentkezés",
    viewFeatures: "Funkciók megtekintése",
    cta: "Próbáld ki ingyen",
  },

  hero: {
    verticals: ["Éttermek", "Kávézók", "Bárok", "Szállodák", "Pizzériák"],
    headline: "Digitális étlap éttermeknek. Élesben 5 perc alatt.",
    sub: "Digitális étlap az Ön éttermének 5 perc alatt. Minden benne van: kód nélküli szerkesztő, nyomtatott étlap AI felismerés, QR kódok az asztalokra és közvetlen rendelések jutalék nélkül.",
    dynamicHeadlines: ["0% jutalék.", "35 AI nyelv.", "Online rendelések.", "Foglalás 24/7.", "Prémium dizájn."],
    painBullets: [
      "0% jutalék: minden rendelés közvetlenül az Ön éttermébe érkezik.",
      "AI fordítás 35 nyelvre — a turisták megértik az étlapot és többet rendelnek.",
      "Foglalás 24/7: a vendégek maguk foglalnak asztalt, telefonhívások nélkül a csúcsidőszakban.",
      "Rugalmas árak: az étlap változások másodpercek alatt élesben.",
    ],
    rating: "Több mint 500 étterem több mint 30 országban",
  },

  features: {
    heading: "Minden, amire szüksége van.",
    headingAccent: "Semmi felesleges.",
    sub: "Éttermekhez készült. Minden nap használják az asztalnál, a konyhában és az étteremben.",
    items: [
      { Icon: Monitor, title: "Digitális étlap", desc: "Étlap a böngészőben fotókkal, árakkal, allergénekkel és leírásokkal. Valós időben frissül a telefonról. A vendégek a saját nyelvükön látják az étlapot; az étterem spórol a nyomtatáson.", tag: "Digitális étlap", href: "/hu/digitalis-etlap-etterem" },
      { Icon: Receipt, title: "Rendelésfelvétel: vendég és pincér", desc: "QR kód az asztalon a vendégnek, vagy a pincér felveszi a rendelést a telefonjáról — mindkettő közvetlenül a konyhába vagy a WhatsAppba kerül. Jutalék nélkül, asztalszámmal minden nyugtán.", tag: "Rendelések", href: "/hu/rendelesi-rendszer-etterem" },
      { Icon: CalendarCheck, title: "Asztalfoglalás 24/7", desc: "A vendégek maguk foglalnak asztalt a weboldalon vagy a QR étlapon keresztül, miközben Ön a teremben elfoglalt. Asztali naptár, automatikus visszaigazolások és emlékeztetők. Egyetlen elveszített vendég sem.", tag: "Foglalás", href: "/hu/asztalfoglalas" },
      { Icon: ChefHat, title: "Konyhai kijelző (KDS)", desc: "A papír blokkok már nem szükségesek. A teremből a rendelések közvetlenül a séf képernyőjére kerülnek — oszlopok „készül / kész / felszolgálva“, allergének és megjegyzések színnel kiemelve. Táblagépen vagy telefonon.", tag: "KDS", href: "/hu/konyhai-kijelzo" },
    ],
  },

  founder: {
    eyebrow: "Vendéglátósok építették",
    quoteStart:
      "A feleségemmel a saját kávézónkat vezettük és személyes tapasztalatból tudjuk, milyen valójában egy étteremnap — rendelésfelvétel, foglalások, terem és konyha munkafolyamata. Egy egyetlen eszközt akartunk: modernet, könnyen elindíthatót és első pillantásra érthetőt —",
    quoteAccent: "így kezdtük el építeni a platformot, amelyet most más vendéglátósoknak fejlesztünk.",
    sign: "Bogdan Sokolov · alapító, korábbi kávézó tulajdonos",
    photoAlt: "Bogdan Sokolov, az IQ Rest alapítója",
  },

  how: {
    heading: "Élesben 5 perc alatt",
    sub: "Négy rövid lépés. Telepítés nélkül, technikai beállítás nélkül.",
    steps: [
      { n: "1", t: "Típus és név", d: "Válassza ki a hely típusát és adja meg a nevet." },
      { n: "2", t: "Mentés", d: "Adja meg e-mail címét vagy jelentkezzen be Google fiókkal." },
      { n: "3", t: "Étlap", d: "Adjon hozzá tételeket kézzel vagy töltsön fel nyomtatott étlapot AI felismeréshez." },
      { n: "4", t: "Kész", d: "Ossza meg a linket vagy QR kódot és kezdje fogadni a rendeléseket." },
    ],
  },

  pricing: {
    badge: "Jutalék nélkül · Szerződés nélkül",
    heading: "Egy csomag.",
    headingAccent: "Minden benne.",
    sub: "QR étlap, rendelésfelvétel, AI fordítás, étterem weboldal és foglalás. Egyetlen átlátható havi díj.",
    monthlyLabel: "Havi",
    yearlyLabel: "Éves",
    saveBadge: "25% megtakarítás",
    perMonth: "havonta",
    billedAnnually: "Éves számlázás: {total}",
    youSave: "Megtakarít {amount}",
    trust: { secure: "Biztonságos fizetés Stripe-on keresztül", noCommitment: "Kötelezettség nélkül", quick: "Percek alatt aktív", restaurants: "500+ étterem" },
  },

  faq: {
    eyebrow: "Vannak kérdései?",
    heading: "Gyakran ismételt",
    headingAccent: "kérdések.",
    sub: "Amit a vendéglátósok kérdeznek regisztráció előtt. Nem találja a kérdését? Írjon nekünk WhatsAppon — valódi emberek válaszolnak, nem bot.",
    whatsappCta: "Kérdezzen WhatsAppon",
    whatsappPrefill: "Üdvözlöm, kérdésem van az IQ Rest-tel kapcsolatban",
    items: [
      { q: "Mit tartalmaz a próbaidőszak és mi történik utána?", a: "Teljes hozzáférés minden funkcióhoz 14 napig, kártya nélkül. 14 nap után a fiók szünetel, ha nem ad meg fizetési módot — soha nem terhelünk automatikusan. Később hozzáadhatja a fizetést és onnan folytathatja, ahol abbahagyta. Lemondás bármikor egy kattintással." },
      { q: "Felszámítanak jutalékot a rendelésekre?", a: "Nem. Minden rendelés a QR étlapról közvetlenül az étterembe érkezik — nincs százalék a mi oldalunkról, nincsenek aggregátor díjak. Egyetlen fix havi díj és semmi más." },
      { q: "Szükségük van a vendégeknek alkalmazásra, nekünk technikai tudásra?", a: "A vendégeknek nincs szükségük alkalmazásra — a telefon kameráját a QR kódra irányítják és az étlap megnyílik a böngészőben. Az éttermeknek sincs szükségük technikai tudásra: az adminisztrációs panel minden modern böngészőben működik telefonon, táblagépen vagy laptopon. Minden művelet kattintással és húzással történik, kód nélkül." },
      { q: "Milyen gyorsan változnak az árak és jelennek meg új ételek?", a: "Azonnal. Változtassa meg az árat a telefonjáról — a vendégek másodperceken belül látják. Egy új étel néhány érintést igényel: név, ár, fotó. Nyomtatás nélkül, designer várakozás nélkül." },
      { q: "Hány nyelv támogatott?", a: "35 nyelv beépített AI fordítással. Egy érintés és az egész étlap lefordításra kerül; az AI érti a kulináris kontextust — a nevek és leírások természetesen hangzanak minden nyelven. A turisták magabiztosabban rendelnek, ha valóban megértik az étlapot." },
    ],
  },

  finalCta: {
    heading: "Élesben 5 perc alatt.",
    headingAccent: "14 nap ingyenes.",
    sub: "Kártya nélkül, lemondás bármikor. Csatlakozzon 500+ étteremhez, amelyek már az IQ Rest-et használják.",
  },

  scan: {
    heading: "Van papír étlapja vagy PDF-je?",
    headingAccent: "Az AI 60 másodperc alatt digitalizálja.",
    sub: "Töltsön fel fotót vagy dokumentumot — az AI automatikusan felismeri a kategóriákat, ételeket és árakat.",
    cta: "Étlap szkennelése →",
  },

  pricingHero: {
    chips: ["Jutalék nélkül", "Szerződés nélkül", "14 nap ingyenes"],
    heading: "Árak.",
    headingAccent: "Rejtett díjak nélkül.",
    sub: "Egyetlen átlátható havi díj. Nincs százalék a rendelésekre és nincs aggregátor jutalék. Lemondja az előfizetést bármikor.",
    popularBadge: "Népszerű",
    perMonthSuffix: "/hó",
    whenAnnualTemplate: "éves számlázás · {total} évente",
    orMonthlyTemplate: "vagy {price}/hó",
    savingsTemplate: "megtakarít {amount} évente",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Étlap, QR rendelések és AI fordítás. Élesben 5 perc alatt.",
        features: [
          "QR étlap minden asztalra",
          "Digitális étlap fotókkal és allergénekkel",
          "AI fordítás 35 nyelvre",
          "Rendelések az étlapról (opcionális)",
          "AI étel fotó generálás",
          "Kezelés bármelyik telefonról vagy táblagépről",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Teljes étterem irányítás: konyhai kijelző és foglalások.",
        features: [
          "Minden a Basic-ből",
          "Konyhai kijelző (KDS)",
          "Online asztalfoglalás 24/7",
          "Prioritásos WhatsApp támogatás",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/hu/digitalis-etlap-etterem", label: "Digitális étlap" },
      { href: "/hu/rendelesi-rendszer-etterem", label: "Rendelések" },
      { href: "/hu/asztalfoglalas", label: "Foglalás" },
      { href: "/hu/konyhai-kijelzo", label: "Konyhai kijelző" },
    ],
    navLinks: [
      { href: "/hu/arak", label: "Árak" },
      { href: "#faq", label: "GYIK" },
      { href: "/hu/languages", label: "Nyelv váltás" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Minden jog fenntartva.",
  },
};
