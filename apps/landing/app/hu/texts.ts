import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "hu", htmlDir: "ltr",
  meta: {
    title: "QR Étlap Éttermeknek — Közvetlen Rendelések, Nulla Jutalék | IQ Rest",
    description: "Vége a papír étlapoknak és a kiszállító appok jutalékainak. QR étlap, közvetlen rendelések, foglalások és többnyelvű weboldal. 14 nap ingyen, kártya nélkül.",
    canonical: "https://iq-rest.com/hu", ogLocale: "hu_HU",
    ogTitle: "QR Étlap Éttermeknek — Közvetlen Rendelések, Nulla Jutalék",
    ogDescription: "QR étlap, közvetlen rendelések, foglalások és AI fordítás. 2 perc alatt kész. 14 nap ingyen — kártya nélkül.",
  },
  ctaText: "Kezdd el ingyen →",
  demoText: "Élő demó", microcopy: "14 nap ingyen · Kártya nélkül · Bármikor lemondod",
  header: { navFeatures: "Funkciók", navHow: "Hogy működik", navPricing: "Árak", navFaq: "GYIK", signIn: "Belépés", cta: "Kezdd el ingyen →" },
  hero: {
    verticals: ["Éttermek", "Kávézók", "Bárok", "Hotelek", "Pizzériák"],
    variants: [
      { headline: "Hagyd abba az étlap nyomtatását.", headlineAccent: "Hagyd abba a 30%-ot a kiszállító appoknak.", sub: "QR étlap, közvetlen rendelések, foglalások és többnyelvű weboldal. 2 perc alatt kész — kártya nélkül." },
      { headline: "Az éttermed többet érdemel, mint", headlineAccent: "papír étlap és elszalasztott hívás.", sub: "Közvetlen rendelések, azonnali étlap-frissítések és foglalások 24/7. 2 perc alatt beállítva." },
      { headline: "Egy QR kód.", headlineAccent: "Nulla jutalék. Búcsú a papírnak.", sub: "QR étlap, online rendelések és foglalások — minden egy helyen. 14 nap ingyen, kártya nélkül." },
      { headline: "Kapj közvetlen rendeléseket.", headlineAccent: "Hagyd ki a jutalékot.", sub: "A vendégek beolvasnak, rendelnek és fizetnek — egyenesen neked, Wolt-szelet nélkül. 2 perc alatt kész." },
      { headline: "Több rendelés. Több foglalás.", headlineAccent: "Nincs papír, nincs app.", sub: "QR étlap + foglalások + többnyelvű weboldal autopilóta. 14 napos ingyenes próba." },
      { headline: "A turisták nem értik az étlapot?", headlineAccent: "2 perc alatt megoldva.", sub: "Az AI 35 nyelvre fordítja le a teljes étlapot. Plusz QR rendelések és foglalások beleértve." },
      { headline: "Papír étlapról QR kódra,", headlineAccent: "mielőtt kihűl az eszpresszó.", sub: "QR étlap, közvetlen rendelések és 24/7 foglalások. 2 perc alatt kész — kártya nélkül." },
      { headline: "Üdítően egyszerű QR étlap.", headlineAccent: "Csendben erős belül.", sub: "Közvetlen rendelések, AI fordítás, foglalások és weboldal — minden egy érintéssel a telefonon." },
    ],
    painBullets: ["Nincs nyomtatás — árakat azonnal módosíthatsz", "Nulla jutalék — rendelések egyenesen hozzád", "Nincs elszalasztott hívás — foglalások 24/7", "35 nyelv — sose veszíts turistát"],
    rating: "4,9 · több mint 500 étterem 30+ országban",
  },
  features: {
    heading: "Minden, ami kell.", headingAccent: "Semmi, ami nem.",
    sub: "Éttermeknek építve. Asztalnál használva.",
    items: [
      { Icon: ScanLine, title: "Tartsd meg minden rendelés 100%-át", desc: "A vendégek beolvasnak, rendelnek és fizetnek — egyenesen neked. Nincs app letöltés, nincs 30%-os szállítási szelet. Minden rendelés valós időben asztalszámmal érkezik a panelba." },
      { Icon: Languages, title: "Adj el a turistáknak az ő nyelvükön", desc: "Egy érintés 35 nyelvre fordítja le az egész étlapot. Az AI érti a kulináris kontextust — a vendégek többet rendelnek, ha tényleg értik az ételt." },
      { Icon: CalendarCheck, title: "Ne veszíts foglalást főzés közben", desc: "A vendégek 24/7 foglalnak, hívás nélkül. Auto vagy kézi megerősítés, email emlékeztetők — kevesebb no-show, nulla stressz." },
      { Icon: Palette, title: "Felejthetetlen 1 másodperc alatt", desc: "Tegyél be egy konyhás videót vagy ételfotót háttérnek. A vendégek leállnak görgetni. A márkád megmarad." },
      { Icon: Smartphone, title: "Másodpercek alatt módosíts, nem napok alatt", desc: "Árak, fotók, napi ajánlat — telefonról, asztalok között. Élőben a vendégeknek azonnal. Soha többé nyomtatás." },
      { Icon: ListPlus, title: "Ha tudsz WhatsApp-ot küldeni, ezt is tudod", desc: "Érintsd meg, hogy hozzáadj egy fogást. Húzd, hogy átrendezd. Kapcsold ki, ami elfogyott. Nincs útmutató, nincs tutorial, nincs tanulási görbe." },
    ],
  },
  founder: {
    eyebrow: "Egy étterem-tulajdonos építette",
    quoteStart: "A feleségemmel kávézót nyitottunk és heteket kerestünk olyan rendszert, ami online rendeléseket, foglalásokat kezel és modernen néz ki. Minden, amit kipróbáltunk, otromba, csúnya volt vagy hiányzott a fél funkciója —",
    quoteAccent: "így megépítettük azt, amit mi magunk akartunk volna.",
    sign: "Bogdan Sokolov · alapító, ex-kávézó tulajdonos",
    photoAlt: "Bogdan, az IQ Rest alapítója",
  },
  how: {
    heading: "Élőben kevesebb mint 2 perc alatt",
    sub: "Négy rövid lépés. Nincs telepítés, nincs technikai beállítás.",
    steps: [
      { n: "1", t: "Regisztrálj", d: "Email vagy Google. Kártya nélkül. 10 másodperc." },
      { n: "2", t: "Étterem neve", d: "Írd be a nevet. Az étlap tetején jelenik meg." },
      { n: "3", t: "Add hozzá az első fogást", d: "Kategória, név, ár, fotó. Ennyi." },
      { n: "4", t: "Válassz hátteret és nyomtasd a QR-t", d: "Válassz hátteret. Vedd a QR-t. Ragaszd az asztalokra." },
    ],
  },
  pricing: {
    badge: "Nulla jutalék · Nincs szerződés",
    heading: "Egy csomag.", headingAccent: "Minden benne.",
    sub: "QR étlap, rendelések, AI fordítás, étterem weboldal és foglalások. Egy egyszerű ár.",
    monthlyLabel: "Havi", yearlyLabel: "Éves", saveBadge: "Spórolj 25%", perMonth: "havonta",
    billedAnnually: "Éves számlázás {total}", youSave: "Spórolsz {amount}",
    trust: { secure: "Biztonságos fizetés Stripe-pal", noCommitment: "Nincs elköteleződés", quick: "Aktív percek alatt", restaurants: "500+ étterem" },
  },
  faq: {
    eyebrow: "Kérdés?", heading: "Gyakori", headingAccent: "kérdések.",
    sub: "Amit éttermesek megkérdeznek regisztráció előtt. Nem látod a tiédet? Írj WhatsApp-on — igazi emberek válaszolnak.",
    whatsappCta: "Kérdezz WhatsApp-on", whatsappPrefill: "Szia, kérdésem van az IQ Rest-ről",
    items: [
      { q: "Mit tartalmaz a próbaidő és mi van utána?", a: "14 nap teljes hozzáférés, kártya nélkül. 14 nap után a fiók szünetel, ha nem adsz meg fizetési módot — soha nem terhelünk automatikusan. Add meg később a fizetési adatokat újraaktiváláshoz. Egy kattintással lemondod." },
      { q: "Veszitek jutalékot a rendelésekből?", a: "Nullát. Minden rendelés a QR étlapodról egyenesen hozzád megy — nincs részünk, nincs Wolt / Foodpanda díj. Egy fix havi ár, ennyi." },
      { q: "Kell app a vendégeknek? Kell technikai tudás?", a: "Nincs app a vendégeknek — kamerával beolvassák a QR-t, az étlap megnyílik a böngészőben. Nincs technikai tudás neked — az egész panel a telefonon megy, érintsd meg hozzáadáshoz, húzd átrendezéshez, ennyi a görbe." },
      { q: "Kezelhetek több éttermet egy fiókból?", a: "Igen. A Pro csomag több éttermet enged egy fiókban — külön étlapok, külön QR-ok, külön statisztikák, egy belépés. Két érintéssel váltasz." },
      { q: "Milyen gyorsan változtatok árakat és adok hozzá fogásokat?", a: "Azonnal. Változtass árat a telefonon, a vendégek másodpercek alatt látják. Új fogás? Érintsd meg, írd be, fotó, kész — nincs újranyomtatás, nincs tervező-várakozás." },
      { q: "Hány nyelvet támogattok?", a: "35 nyelvet beépített AI fordítással. Egy érintés lefordítja az egész étlapot, az AI érti a kulináris kontextust — a nevek és leírások természetesen hangoznak minden nyelven. A turisták többet rendelnek, ha tényleg értik." },
    ],
  },
  finalCta: { heading: "2 perc alatt kész.", headingAccent: "14 napig ingyen.", sub: "Kártya nélkül. Bármikor lemondod. Csatlakozz az 500+ étteremhez, ami már IQ Rest-en van." },
  footer: {
    featureLinks: [
      { href: "/hu/online-orders", label: "Online rendelések" }, { href: "/hu/ai-translation", label: "AI fordítás" },
      { href: "/hu/reservations", label: "Foglalások" }, { href: "/hu/mobile-management", label: "Mobil kezelés" },
      { href: "/hu/easy-menu", label: "Étlap szerkesztő" }, { href: "/hu/custom-design", label: "Videó és fotó hátterek" },
      { href: "/hu/color-scheme", label: "Márka színek" }, { href: "/hu/multilingual", label: "Többnyelvű weboldal" },
      { href: "/hu/ai-images", label: "AI fotó optimalizálás" }, { href: "/hu/analytics", label: "Analitika" },
      { href: "/hu/instant-setup", label: "Azonnali telepítés" }, { href: "/hu/personal-support", label: "Személyes támogatás" },
    ],
    navLinks: [
      { href: "#pricing", label: "Árak" }, { href: "#faq", label: "Kérdések" },
      { href: "/hu/languages", label: "Nyelvváltás" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Minden jog fenntartva.",
  },
};
