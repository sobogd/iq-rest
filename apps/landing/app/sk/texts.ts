import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sk", htmlDir: "ltr",
  meta: {
    title: "QR Jedálny Lístok pre Reštaurácie — Priame Objednávky, Nulová Provízia | IQ Rest",
    description: "Koniec papierovým lístkom a províziám rozvozových aplikácií. QR jedálny lístok, priame objednávky, rezervácie a viacjazyčný web. 14 dní zadarmo, bez karty.",
    canonical: "https://iq-rest.com/sk", ogLocale: "sk_SK",
    ogTitle: "QR Jedálny Lístok pre Reštaurácie — Priame Objednávky, Nulová Provízia",
    ogDescription: "QR jedálny lístok, priame objednávky, rezervácie a AI preklad. Hotové za 2 minúty. 14 dní zadarmo — bez karty.",
  },
  ctaText: "Začni zadarmo →", microcopy: "14 dní zadarmo · Bez karty · Zruš kedykoľvek",
  header: { navFeatures: "Funkcie", navHow: "Ako to funguje", navPricing: "Ceny", navFaq: "FAQ", signIn: "Prihlásiť", cta: "Začni zadarmo →" },
  hero: {
    verticals: ["Reštaurácie", "Kaviarne", "Bary", "Hotely", "Pizzerie"],
    variants: [
      { headline: "Prestaň tlačiť jedálne lístky.", headlineAccent: "Prestaň platiť 30% rozvozovým aplikáciám.", sub: "QR jedálny lístok, priame objednávky, rezervácie a viacjazyčný web. Hotové za 2 minúty — bez karty." },
      { headline: "Tvoja reštaurácia si zaslúži viac než", headlineAccent: "papierový lístok a zmeškané hovory.", sub: "Priame objednávky, okamžité úpravy lístka a rezervácie 24/7. Nastavené za 2 minúty." },
      { headline: "Jeden QR kód.", headlineAccent: "Nulová provízia. Zbohom papier.", sub: "QR jedálny lístok, online objednávky a rezervácie — všetko na jednom mieste. 14 dní zadarmo, bez karty." },
      { headline: "Prijímaj priame objednávky.", headlineAccent: "Vynechaj províziu.", sub: "Hostia skenujú, objednávajú a platia — priamo tebe, bez podielu Wolt. Hotové za 2 minúty." },
      { headline: "Viac objednávok. Viac rezervácií.", headlineAccent: "Bez papiera, bez aplikácií.", sub: "QR lístok + rezervácie + viacjazyčný web na autopilote. 14-dňová skúška zadarmo." },
      { headline: "Turisti nečítajú tvoj lístok?", headlineAccent: "Vyriešené za 2 minúty.", sub: "AI prekladá celý lístok do 35 jazykov. Plus QR objednávky a rezervácie v cene." },
      { headline: "Z papierovej karty na QR kód,", headlineAccent: "kým nevychladne espresso.", sub: "QR jedálny lístok, priame objednávky a rezervácie 24/7. Hotové za 2 minúty — bez karty." },
      { headline: "Osvieživo jednoduchý QR lístok.", headlineAccent: "Ticho silný vnútri.", sub: "Priame objednávky, AI preklad, rezervácie a web — všetko jedným klepnutím v telefóne." },
    ],
    painBullets: ["Bez tlače — meň ceny okamžite", "Nulová provízia — objednávky priamo k tebe", "Bez zmeškaných hovorov — rezervácie 24/7", "35 jazykov — nestratíš turistu"],
    rating: "4,9 · viac ako 500 reštaurácií v 30+ krajinách",
  },
  features: {
    heading: "Všetko čo potrebuješ.", headingAccent: "Nič navyše.",
    sub: "Postavené pre reštaurácie. Používa sa pri stole.",
    items: [
      { Icon: ScanLine, title: "Nechaj si 100% z každej objednávky", desc: "Hostia skenujú, objednávajú a platia — priamo tebe. Žiadne aplikácie na stiahnutie, žiadny 30% podiel rozvozu. Každá objednávka príde v reálnom čase s číslom stola do panela." },
      { Icon: Languages, title: "Predávaj turistom v ich jazyku", desc: "Jedno klepnutie preloží celý lístok do 35 jazykov. AI rozumie kulinárskemu kontextu — hostia objednávajú viac, keď naozaj rozumejú jedlu." },
      { Icon: CalendarCheck, title: "Nestrať rezerváciu, kým varíš", desc: "Hostia rezervujú 24/7, bez hovorov. Auto- alebo manuálne potvrdenie, e-mailové pripomienky — menej neúčastí, nula stresu." },
      { Icon: Palette, title: "Nezabudnuteľné za 1 sekundu", desc: "Daj video kuchyne alebo fotku jedla na pozadie lístka. Hostia prestanú scrollovať. Tvoja značka utkvie." },
      { Icon: Smartphone, title: "Meň v sekundách, nie v dňoch", desc: "Meň ceny, fotky, pridaj denné menu — z mobilu, medzi stolmi. Naživo pre hostí hneď. Žiadne dotlače." },
      { Icon: ListPlus, title: "Ak vieš poslať WhatsApp, zvládneš to", desc: "Klepni na pridanie jedla. Potiahni na preusporiadanie. Vypni vypredané. Bez manuálov, bez tutoriálov, bez krivky učenia." },
    ],
  },
  founder: {
    eyebrow: "Postavil reštauratér",
    quoteStart: "S manželkou sme otvorili kaviareň a týždne sme hľadali systém, ktorý zvláda online objednávky, rezervácie a zároveň vyzerá moderne. Všetko, čo sme skúsili, bolo neohrabané, škaredé alebo chýbala polovica funkcií —",
    quoteAccent: "tak sme postavili to, čo sme sami chceli mať.",
    sign: "Bogdan Sokolov · zakladateľ, ex-majiteľ kaviarne",
    photoAlt: "Bogdan, zakladateľ IQ Rest",
  },
  how: {
    heading: "Spustené za menej ako 2 minúty",
    sub: "Štyri krátke kroky. Žiadne inštalácie, žiadna technická konfigurácia.",
    steps: [
      { n: "1", t: "Registruj sa", d: "E-mail alebo Google. Bez karty. Hotové za 10 sekúnd." },
      { n: "2", t: "Názov reštaurácie", d: "Napíš názov. Objaví sa hore na lístku." },
      { n: "3", t: "Pridaj prvé jedlo", d: "Kategória, názov, cena, fotka. To je všetko." },
      { n: "4", t: "Vyber pozadie a vytlač QR", d: "Vyber pozadie. Vezmi QR. Nalep na stoly." },
    ],
  },
  pricing: {
    badge: "Nulová provízia · Bez zmlúv",
    heading: "Jeden plán.", headingAccent: "Všetko zahrnuté.",
    sub: "QR lístok, objednávky, AI preklad, web reštaurácie a rezervácie. Jedna jednoduchá cena.",
    monthlyLabel: "Mesačne", yearlyLabel: "Ročne", saveBadge: "Ušetri 25%", perMonth: "mesačne",
    billedAnnually: "Ročná fakturácia {total}", youSave: "Ušetríš {amount}",
    trust: { secure: "Bezpečná platba cez Stripe", noCommitment: "Bez záväzkov", quick: "Aktívne za minúty", restaurants: "500+ reštaurácií" },
  },
  faq: {
    eyebrow: "Otázky?", heading: "Časté", headingAccent: "otázky.",
    sub: "Čo sa reštauratéri pýtajú pred registráciou. Nevidíš svoju? Napíš na WhatsApp — odpovedajú skutoční ľudia.",
    whatsappCta: "Spýtaj sa na WhatsApp", whatsappPrefill: "Ahoj, mám otázku o IQ Rest",
    items: [
      { q: "Čo zahŕňa skúšobná doba a čo potom?", a: "14 dní plný prístup, bez karty. Po 14 dňoch sa účet pozastaví, ak nepridáš platobnú metódu — nikdy nestrhávame automaticky. Pridaj platbu neskôr na reaktiváciu. Zruš jedným klikom." },
      { q: "Beriete províziu z objednávok?", a: "Nulu. Každá objednávka z tvojho QR lístka ide rovno tebe — žiadny náš podiel, žiadne poplatky Wolt / Bolt Food. Jedna pevná mesačná cena, to je všetko." },
      { q: "Potrebujú hostia aplikáciu? Potrebujem technické zručnosti?", a: "Žiadne aplikácie pre hostí — skenujú QR fotoaparátom, lístok sa otvorí v prehliadači. Žiadne technické zručnosti pre teba — celý panel funguje na mobile, klepneš na pridanie, potiahneš na preusporiadanie, to je celá krivka." },
      { q: "Môžem spravovať viac reštaurácií z jedného účtu?", a: "Áno. Plán Pro umožňuje viac reštaurácií v jednom účte — oddelené lístky, oddelené QR, oddelená štatistika, jedno prihlásenie. Prepneš na dve klepnutia." },
      { q: "Ako rýchlo zmením ceny a pridám jedlá?", a: "Okamžite. Zmeň cenu na mobile, hostia vidia v sekundách. Nové jedlo? Klepni, napíš, fotka, hotovo — bez dotlačí, bez čakania na grafika." },
      { q: "Koľko jazykov podporujete?", a: "35 jazykov s vstavaným AI prekladom. Jedno klepnutie preloží celý lístok a AI rozumie kulinárskemu kontextu — názvy a popisy znejú prirodzene v každom jazyku. Turisti objednávajú viac, keď naozaj rozumejú." },
    ],
  },
  finalCta: { heading: "Hotové za 2 minúty.", headingAccent: "Zadarmo 14 dní.", sub: "Bez karty. Zruš kedykoľvek. Pridaj sa k 500+ reštauráciám už na IQ Rest." },
  footer: {
    featureLinks: [
      { href: "/sk/online-orders", label: "Online objednávky" }, { href: "/sk/ai-translation", label: "AI preklad" },
      { href: "/sk/reservations", label: "Rezervácie" }, { href: "/sk/mobile-management", label: "Správa z mobilu" },
      { href: "/sk/easy-menu", label: "Editor lístka" }, { href: "/sk/custom-design", label: "Video a foto pozadia" },
      { href: "/sk/color-scheme", label: "Farby značky" }, { href: "/sk/multilingual", label: "Viacjazyčný web" },
      { href: "/sk/ai-images", label: "AI optimalizácia foto" }, { href: "/sk/analytics", label: "Analytika" },
      { href: "/sk/instant-setup", label: "Okamžité nastavenie" }, { href: "/sk/personal-support", label: "Osobná podpora" },
    ],
    navLinks: [
      { href: "#pricing", label: "Ceny" }, { href: "#faq", label: "Otázky" },
      { href: "/sk/contacts", label: "Kontakt" }, { href: "/sk/changelog", label: "Novinky" },
      { href: "/sk/languages", label: "Zmeniť jazyk" },
    ],
    legalLinks: [
      { href: "/sk/terms", label: "Podmienky" }, { href: "/sk/privacy", label: "Súkromie" },
      { href: "/sk/cookies", label: "Cookies" }, { href: "/sitemap.xml", label: "Mapa webu" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Všetky práva vyhradené.",
  },
};
