import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sk", htmlDir: "ltr",
  meta: {
    title: "QR Jedálny Lístok pre Reštaurácie — Priame Objednávky, Nulová Provízia | IQ Rest",
    description: "Koniec papierovým lístkom a províziám rozvozových aplikácií. QR jedálny lístok, priame objednávky, rezervácie a viacjazyčný web. 14 dní zadarmo, bez karty.",
    canonical: "https://iq-rest.com/sk", ogLocale: "sk_SK",
    ogTitle: "QR Jedálny Lístok pre Reštaurácie — Priame Objednávky, Nulová Provízia",
    ogDescription: "QR jedálny lístok, priame objednávky, rezervácie a AI preklad. Hotové za 5 minút. 14 dní zadarmo — bez karty.",
  },
  ctaText: "Skúsiť zadarmo",
  demoText: "Pozri si live demo", microcopy: "14 dní zadarmo · Bez karty · Zruš kedykoľvek",
  header: { navFeatures: "Funkcie", navHow: "Ako to funguje", navPricing: "Ceny", navFaq: "FAQ", signIn: "Prihlásiť", cta: "Začať" },
  hero: {
    verticals: ["Reštaurácie", "Kaviarne", "Bary", "Hotely", "Pizzerie"],
    headline: "QR menu za 5 minút.",
    sub: "Hotová webová stránka pre vašu reštauráciu — bez programátorov a dodávateľov. Priame objednávky, rezervácie a analytika hostí v jednom predplatnom.",
    dynamicHeadlines: ["0% provízia.", "35 jazykov s AI.", "Online objednávky.", "Rezervácie 24/7.", "Premium dizajn."],
    painBullets: ["Provízia 0%: Všetky objednávky idú priamo vám.", "AI preklad: 35 jazykov pre vyššie tržby od turistov.", "Rezervácie 24/7: Plná obsadenosť bez zbytočných hovorov.", "Flexibilné ceny: Aktualizujte menu za pár sekúnd."],
    rating: "Viac ako 500 reštaurácií v 30+ krajinách",
  },
  features: {
    heading: "Všetko čo potrebuješ.", headingAccent: "Nič navyše.",
    sub: "Postavené pre reštaurácie. Používa sa pri stole.",
    items: [
      
      { Icon: QrCode, title: "Objednávky od stola", desc: "Objednávky okamžite prichádzajú do WhatsAppu alebo panelu s číslom stola. Obsluha je rýchlejšia.", tag: "Priame objednávky", href: "/sk/online-objednavkovy-system-restauracia" },
      { Icon: Languages, title: "AI prekladač (35 jazykov)", desc: "Naša AI rozumie gastronómii. Turisti objednávajú o 20 % viac, keď rozumejú zloženiu jedál.", tag: "AI preklad" },
      { Icon: CalendarCheck, title: "Rezervácia stolov", desc: "Systém sám prijíma rezervácie, kým ste v kuchyni. Žiaden stratený zákazník.", tag: "Rezervácie" },
      { Icon: Palette, title: "Moderný dizajn", desc: "Video pozadia a lákavé fotky. Vaše menu vyzerá luxusne a vzbudzuje chuť do jedla.", tag: "Vlastný dizajn" },
      { Icon: Smartphone, title: "Rýchly editor", desc: "Spravujte stop-list a ceny priamo z mobilu. Zmeny sú hosťom viditeľné okamžite.", tag: "Editor menu" },
      { Icon: ChefHat, title: "Už čoskoro: Kuchynský displej", desc: "Zabudnite na papierové lístky. Objednávky zo sály idú rovno na obrazovku kuchárovi.", tag: "Čoskoro" },
    
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
    heading: "Spustené za menej ako 5 minút",
    sub: "Štyri krátke kroky. Žiadne inštalácie, žiadna technická konfigurácia.",
    steps: [
      { n: "1", t: "Typ a názov", d: "Vyber typ a zadaj názov." },
      { n: "2", t: "Uloženie", d: "E-mail alebo prihlásenie cez Google." },
      { n: "3", t: "Menu", d: "Vytvor ručne alebo naskenuj papierové." },
      { n: "4", t: "Hotovo", d: "Prezeraj, zdieľaj a prijímaj objednávky." },
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
      { q: "Ako rýchlo zmením ceny a pridám jedlá?", a: "Okamžite. Zmeň cenu na mobile, hostia vidia v sekundách. Nové jedlo? Klepni, napíš, fotka, hotovo — bez dotlačí, bez čakania na grafika." },
      { q: "Koľko jazykov podporujete?", a: "35 jazykov s vstavaným AI prekladom. Jedno klepnutie preloží celý lístok a AI rozumie kulinárskemu kontextu — názvy a popisy znejú prirodzene v každom jazyku. Turisti objednávajú viac, keď naozaj rozumejú." },
    ],
  },
  finalCta: { heading: "Hotové za 5 minút.", headingAccent: "Zadarmo 14 dní.", sub: "Bez karty. Zruš kedykoľvek. Pridaj sa k 500+ reštauráciám už na IQ Rest." },
  scan: {
    heading: "Papierové menu alebo PDF?",
    headingAccent: "AI ho digitalizuje za 60 sekúnd.",
    sub: "Nahraj — AI rozpozná kategórie, jedlá a ceny.",
    cta: "Naskenovať menu →",
  },
  footer: {
    featureLinks: [
      { href: "/sk/online-objednavkovy-system-restauracia", label: "Online objednávkový systém" }, { href: "/sk/ai-translation", label: "AI preklad" },
      { href: "/sk/reservations", label: "Rezervácie" }, { href: "/sk/mobile-management", label: "Správa z mobilu" },
      { href: "/sk/easy-menu", label: "Editor lístka" }, { href: "/sk/custom-design", label: "Video a foto pozadia" },
      { href: "/sk/color-scheme", label: "Farby značky" }, { href: "/sk/multilingual", label: "Viacjazyčný web" },
      { href: "/sk/ai-images", label: "AI optimalizácia foto" }, { href: "/sk/analytics", label: "Analytika" },
      { href: "/sk/instant-setup", label: "Okamžité nastavenie" }, { href: "/sk/personal-support", label: "Osobná podpora" },
    ],
    navLinks: [
      { href: "#pricing", label: "Ceny" }, { href: "#faq", label: "Otázky" },
      { href: "/sk/languages", label: "Zmeniť jazyk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Všetky práva vyhradené.",
  },
};
