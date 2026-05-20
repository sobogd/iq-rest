import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "sk",
  htmlDir: "ltr",

  meta: {
    title: "QR menu pre reštaurácie — Priame objednávky bez provízií | IQ Rest",
    description:
      "Komplexná platforma pre reštaurácie: digitálne menu, QR objednávky, rezervácia stolov a kuchynský displej. Spustenie za 5 minút. 14 dní zadarmo, bez karty.",
    canonical: "https://iq-rest.com/sk",
    ogLocale: "sk_SK",
    ogTitle: "QR menu pre reštaurácie — Priame objednávky bez provízií",
    ogDescription:
      "Digitálne menu, QR objednávky, rezervácia stolov a AI preklad. Spustenie za 5 minút. 14 dní zadarmo.",
  },

  ctaText: "Vyskúšajte zadarmo",
  demoText: "Pozrieť demo",
  microcopy: "14 dní zadarmo · Bez karty · Zrušenie kedykoľvek",

  header: {
    navFeatures: "Funkcie",
    navHow: "Ako to funguje",
    navPricing: "Ceny",
    navFaq: "Časté otázky",
    signIn: "Prihlásiť sa",
    cta: "Začať",
  },

  hero: {
    verticals: ["Reštaurácie", "Kaviarne", "Bary", "Hotely", "Pizzerie"],
    headline: "Digitálne menu pre reštauráciu. Online za 5 minút.",
    sub: "Digitálne menu pre vašu reštauráciu za 5 minút. Všetko v cene: editor bez kódu, AI rozpoznávanie tlačeného menu, QR kódy pre stoly a priame objednávky bez provízií.",
    dynamicHeadlines: ["0 % provízia.", "35 jazykov s AI.", "Online objednávky.", "Rezervácie 24/7.", "Prémiový dizajn."],
    painBullets: [
      "0 % provízia: každá objednávka ide priamo do vašej reštaurácie.",
      "AI preklad do 35 jazykov — turisti rozumejú menu a objednávajú viac.",
      "Rezervácia 24/7: hostia si rezervujú stoly sami, bez telefonátov v špičke.",
      "Flexibilné ceny: úpravy v menu sú online za pár sekúnd.",
    ],
    rating: "Viac ako 500 reštaurácií vo viac ako 30 krajinách",
  },

  features: {
    heading: "Všetko, čo potrebujete.",
    headingAccent: "Nič navyše.",
    sub: "Vytvorené pre reštaurácie. Používa sa denne pri stole, v kuchyni a v sále.",
    items: [
      { Icon: Monitor, title: "Digitálne menu", desc: "Menu v prehliadači s fotografiami, cenami, alergénmi a popismi. Aktualizuje sa v reálnom čase z telefónu. Hostia vidia menu vo svojom jazyku; reštaurácia šetrí na tlači.", tag: "Digitálne menu", href: "/sk/digitalne-menu-restauracia" },
      { Icon: Receipt, title: "Prijímanie objednávok: hosť a čašník", desc: "QR kód na stole pre hosťa alebo čašník prijíma objednávku z telefónu — obe idú priamo do kuchyne alebo na WhatsApp. Bez provízií, s číslom stola na každom účte.", tag: "Objednávky", href: "/sk/objednavkovy-system-restauracia" },
      { Icon: CalendarCheck, title: "Rezervácia stolov 24/7", desc: "Hostia si rezervujú stoly sami cez web alebo QR menu, zatiaľ čo vy ste zaneprázdnení v sále. Kalendár podľa stola, automatické potvrdenia a pripomienky. Ani jeden zmeškaný hosť.", tag: "Rezervácia", href: "/sk/rezervacia-stolov" },
      { Icon: ChefHat, title: "Kuchynský displej (KDS)", desc: "Papierové bločky už nepotrebujete. Objednávky zo sály idú priamo na obrazovku šéfkuchára — stĺpce „pripravuje sa / hotové / podané“, alergény a poznámky farebne zvýraznené. Na tablete alebo telefóne.", tag: "KDS", href: "/sk/kuchynsky-displej" },
    ],
  },

  founder: {
    eyebrow: "Postavené reštaurátormi",
    quoteStart:
      "S manželkou sme viedli vlastnú kaviareň a z prvej ruky vieme, ako naozaj vyzerá deň v reštaurácii — prijímanie objednávok, rezervácie, tok sály a kuchyne. Chceli sme jeden nástroj: moderný, jednoduchý na spustenie a jasný na prvý pohľad —",
    quoteAccent: "tak sme začali budovať platformu, ktorú teraz vyvíjame pre ostatných reštaurátorov.",
    sign: "Bogdan Sokolov · zakladateľ, bývalý majiteľ kaviarne",
    photoAlt: "Bogdan Sokolov, zakladateľ IQ Rest",
  },

  how: {
    heading: "Online za 5 minút",
    sub: "Štyri krátke kroky. Bez inštalácií, bez technického nastavenia.",
    steps: [
      { n: "1", t: "Typ a názov", d: "Vyberte typ podniku a zadajte názov." },
      { n: "2", t: "Uložiť", d: "Zadajte e-mail alebo sa prihláste cez Google." },
      { n: "3", t: "Menu", d: "Pridajte položky ručne alebo nahrajte tlačené menu pre AI rozpoznávanie." },
      { n: "4", t: "Hotovo", d: "Zdieľajte odkaz alebo QR kód a začnite prijímať objednávky." },
    ],
  },

  pricing: {
    badge: "Bez provízií · Bez zmlúv",
    heading: "Jeden plán.",
    headingAccent: "Všetko v cene.",
    sub: "QR menu, prijímanie objednávok, AI preklad, web reštaurácie a rezervácia. Jeden transparentný mesačný poplatok.",
    monthlyLabel: "Mesačne",
    yearlyLabel: "Ročne",
    saveBadge: "Ušetrite 25 %",
    perMonth: "mesačne",
    billedAnnually: "Ročná platba: {total}",
    youSave: "Ušetríte {amount}",
    trust: { secure: "Bezpečná platba cez Stripe", noCommitment: "Bez záväzku", quick: "Aktívne za pár minút", restaurants: "500+ reštaurácií" },
  },

  faq: {
    eyebrow: "Máte otázky?",
    heading: "Často kladené",
    headingAccent: "otázky.",
    sub: "Čo sa reštaurátori pýtajú pred registráciou. Nenašli ste svoju otázku? Napíšte nám na WhatsApp — odpovedajú skutoční ľudia, nie bot.",
    whatsappCta: "Opýtajte sa na WhatsApp",
    whatsappPrefill: "Dobrý deň, mám otázku o IQ Rest",
    items: [
      { q: "Čo zahŕňa skúšobné obdobie a čo sa stane potom?", a: "Plný prístup ku všetkým funkciám na 14 dní, bez karty. Po 14 dňoch sa účet pozastaví, ak nepridáte spôsob platby — nikdy neúčtujeme automaticky. Platbu môžete pridať neskôr a pokračovať tam, kde ste skončili. Zrušenie kedykoľvek jedným kliknutím." },
      { q: "Beriete províziu z objednávok?", a: "Nie. Každá objednávka z QR menu ide priamo do reštaurácie — žiadne percento z našej strany, žiadne poplatky agregátorov. Jeden pevný mesačný poplatok a nič viac." },
      { q: "Potrebujú hostia aplikáciu, potrebujeme my technické znalosti?", a: "Hostia nepotrebujú aplikáciu — nasmerujú kameru telefónu na QR kód a menu sa otvorí v prehliadači. Reštaurácie tiež nepotrebujú technické znalosti: administračný panel beží v ľubovoľnom modernom prehliadači na telefóne, tablete alebo notebooku. Každá akcia je klikom a presunutím, bez kódu." },
      { q: "Ako rýchlo sa menia ceny a objavujú sa nové jedlá?", a: "Okamžite. Zmeňte cenu z telefónu — hostia ju uvidia za pár sekúnd. Nové jedlo zaberie pár ťuknutí: názov, cena, fotografia. Bez dotlače, bez čakania na grafika." },
      { q: "Koľko jazykov je podporovaných?", a: "35 jazykov so zabudovaným AI prekladom. Jedno ťuknutie a celé menu je preložené; AI rozumie kulinárskemu kontextu — názvy a popisy znejú prirodzene v ktoromkoľvek jazyku. Turisti objednávajú s väčšou istotou, keď naozaj rozumejú menu." },
    ],
  },

  finalCta: {
    heading: "Online za 5 minút.",
    headingAccent: "14 dní zadarmo.",
    sub: "Bez karty, zrušenie kedykoľvek. Pridajte sa k 500+ reštauráciám, ktoré už používajú IQ Rest.",
  },

  scan: {
    heading: "Máte papierové menu alebo PDF?",
    headingAccent: "AI ho digitalizuje za 60 sekúnd.",
    sub: "Nahrajte fotografiu alebo dokument — AI rozpozná kategórie, jedlá a ceny automaticky.",
    cta: "Skenovať menu →",
  },

  pricingHero: {
    chips: ["Bez provízií", "Bez zmlúv", "14 dní zadarmo"],
    heading: "Ceny.",
    headingAccent: "Bez skrytých poplatkov.",
    sub: "Jeden transparentný mesačný poplatok. Žiadne percento z objednávok ani provízie agregátorov. Predplatné môžete zrušiť kedykoľvek.",
    popularBadge: "Obľúbený",
    perMonthSuffix: "/mes.",
    whenAnnualTemplate: "ročná platba · {total} € ročne",
    orMonthlyTemplate: "alebo {price} €/mes.",
    savingsTemplate: "ušetríte {amount} € ročne",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, QR objednávky a AI preklad. Online za 5 minút.",
        features: [
          "QR menu pre každý stôl",
          "Digitálne menu s fotografiami a alergénmi",
          "AI preklad do 35 jazykov",
          "Objednávky z menu (voliteľné)",
          "AI generovanie fotografií jedál",
          "Správa z akéhokoľvek telefónu alebo tabletu",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Plná kontrola nad reštauráciou: kuchynský displej a rezervácie.",
        features: [
          "Všetko z Basic",
          "Kuchynský displej (KDS)",
          "Online rezervácia stolov 24/7",
          "Prioritná WhatsApp podpora",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/sk/digitalne-menu-restauracia", label: "Digitálne menu" },
      { href: "/sk/objednavkovy-system-restauracia", label: "Objednávky" },
      { href: "/sk/rezervacia-stolov", label: "Rezervácia" },
      { href: "/sk/kuchynsky-displej", label: "Kuchynský displej" },
    ],
    navLinks: [
      { href: "/sk/ceny", label: "Ceny" },
      { href: "#faq", label: "Časté otázky" },
      { href: "/sk/languages", label: "Zmeniť jazyk" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Všetky práva vyhradené.",
  },
};
