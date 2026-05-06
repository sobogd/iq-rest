import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
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
  ctaText: "Próbálja ki ingyen", ctaSite: "Weboldal készítése",
  demoText: "Élő demó", microcopy: "14 nap ingyen · Kártya nélkül · Bármikor lemondod",
  header: { navFeatures: "Funkciók", navHow: "Hogy működik", navPricing: "Árak", navFaq: "GYIK", signIn: "Belépés", cta: "Próbálja ki ingyen" },
  hero: {
    verticals: ["Éttermek", "Kávézók", "Bárok", "Hotelek", "Pizzériák"],
    qr: { headline: "QR étlap az éttermének 5 perc alatt.", sub: "Közvetlen rendelések, foglalás és 35 nyelv. Jutalék és programozók nélkül." },
    web: { headline: "Profi éttermi weboldal 5 perc alatt.", sub: "Közvetlen rendelések, foglalás és 35 nyelv. Jutalék és programozók nélkül." },
    painBullets: ["0% jutalék: Minden rendelés közvetlenül Önhöz érkezik.", "AI fordítás: 35 nyelv a turisták fogyasztásának növelésére.", "Foglalás 24/7: Teltház felesleges telefonhívások nélkül.", "Rugalmas árak: Frissítse az étlapot pár másodperc alatt."],
    rating: "4,9 · több mint 500 étterem 30+ országban",
  },
  features: {
    heading: "Minden, ami kell.", headingAccent: "Semmi, ami nem.",
    sub: "Éttermeknek építve. Asztalnál használva.",
    items: [
      
      { Icon: ScanLine, title: "Rendelés az asztaltól", desc: "A rendelések azonnal megérkeznek WhatsAppon vagy a panelre asztalszámmal együtt. Gyorsabb kiszolgálás.", tag: "Közvetlen rendelések" },
      { Icon: Languages, title: "AI fordító (35 nyelv)", desc: "Az AI-nk ért a gasztronómiához. A turisták 20%-kal többet rendelnek, ha értik az ételeket.", tag: "AI fordítás" },
      { Icon: CalendarCheck, title: "Asztalfoglalás", desc: "A rendszer fogadja a foglalásokat, amíg Ön a konyhában van. Nincs több elveszített vendég.", tag: "Foglalások" },
      { Icon: Palette, title: "Modern design", desc: "Videó hátterek és étvágygerjesztő fotók. Az étlapja prémium megjelenést kap.", tag: "Egyedi design" },
      { Icon: Smartphone, title: "Gyors szerkesztő", desc: "Kezelje a stop-listát és az árakat közvetlenül a telefonjáról. A változások azonnal élnek.", tag: "Menüszerkesztő" },
      { Icon: ChefHat, title: "Hamarosan: Konyhai kijelző", desc: "Felejtse el a papírblokkokat. A rendelések egyenesen a szakács kijelzőjére mennek.", tag: "Hamarosan" },
    
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
      { q: "Milyen gyorsan változtatok árakat és adok hozzá fogásokat?", a: "Azonnal. Változtass árat a telefonon, a vendégek másodpercek alatt látják. Új fogás? Érintsd meg, írd be, fotó, kész — nincs újranyomtatás, nincs tervező-várakozás." },
      { q: "Hány nyelvet támogattok?", a: "35 nyelvet beépített AI fordítással. Egy érintés lefordítja az egész étlapot, az AI érti a kulináris kontextust — a nevek és leírások természetesen hangoznak minden nyelven. A turisták többet rendelnek, ha tényleg értik." },
    ],
  },
  finalCta: { heading: "2 perc alatt kész.", headingAccent: "14 napig ingyen.", sub: "Kártya nélkül. Bármikor lemondod. Csatlakozz az 500+ étteremhez, ami már IQ Rest-en van." },
  scan: {
    heading: "Papír étlap vagy PDF?",
    headingAccent: "Az AI 60 másodperc alatt digitalizálja.",
    sub: "Töltsd fel — az AI felismeri a kategóriákat, ételeket és árakat.",
    cta: "Étlap beolvasása →",
  },
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
