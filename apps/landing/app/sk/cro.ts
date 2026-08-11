import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Reštaurácie","Kaviarne","Bary","Pizzerie"],
    title: "Vaša reštaurácia, digitálne",
    titleAccent: "za 5 min",
    sub: "Digitálne menu, kuchynský displej a rezervácie 24/7 — všetko pre reštauráciu, hotové za 5 minút.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Reštaurácie" },
      { icon: "cafe", label: "Kaviarne" },
      { icon: "bar", label: "Bary" },
      { icon: "pizza", label: "Pizzerie" },
    ],
    title: "Všetko, čo vaša",
    titleAccent: "reštaurácia potrebuje!",
    sub: "Nastavte procesy za 10 minút: spustite online menu, zefektívnite kuchyňu a majte prehľad o obsadenosti stolov.",
    primaryLabel: "Začať zadarmo",
    demoLabel: "Pozrieť demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet s kuchynským displejom: objednávky podľa stolov v stĺpcoch so stavmi" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet s kalendárom rezervácií: mesačný prehľad a rezervácie čakajúce na potvrdenie" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefón s úvodnou stránkou webu reštaurácie: fotka, rezervácie a online menu" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefón s kartou jedla: fotka, cena a štítky alergénov" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Spustenie za 10 minút", sub: "Bez drahého vybavenia a dlhého nastavovania" },
    { Icon: MessagesSquare, title: "Rýchla podpora", sub: "Na chate odpovedáme v priebehu niekoľkých hodín" },
    { Icon: Globe, title: "Voľba {count} podnikov", sub: "Dôverujú nám reštaurácie a kaviarne vo viac ako 15 krajinách" },
    { Icon: Palette, title: "100 % vo vašom štýle", sub: "Dizajn aj rozhranie prispôsobíme štýlu vášho podniku" },
  ],

  menu: {
    heading: "Web a digitálne menu",
    sub: {
      link: "Viac než QR menu!",
      rest: " Získajte plnohodnotný web s jedinečným dizajnom, kontaktmi a rezerváciou stolov.",
    },
    moreLabel: "Zistiť viac",
    mockupAlt: "Dva telefóny: úvodná stránka webu reštaurácie a stránka jedla",
    bullets: [
      { Icon: Languages, title: "Automatický preklad do 35 jazykov", sub: "Obsluhujte zahraničných hostí bez jazykovej bariéry — automatický preklad zariadi všetko" },
      { Icon: ClipboardList, title: "Objednávky priamo od stola", sub: "Zjednodušte obsluhu: prijímajte objednávky od stolov rýchlo a bez čašníka" },
      { Icon: WheatOff, title: "Alergény a diéty", sub: "Označujte alergény a preferencie (vegánske, štipľavé), aby hostia vyberali ľahko a bezpečne" },
    ],
  },

  reservations: {
    heading: "Rezervácia stolov",
    sub: {
      link: "Inteligentná rezervácia stolov!",
      rest: " Automatický rezervačný systém, ktorý sám stráži voľné stoly a váš rozvrh.",
    },
    moreLabel: "Zistiť viac",
    mockupAlt: "Tablet s kalendárom rezervácií: stoly podľa dní a časových slotov",
    bullets: [
      { Icon: CalendarCheck, title: "Prehľadná mapa rezervácií", sub: "Názorný rozvrh podľa dní a stolov — voľné miesta vidíte na prvý pohľad" },
      { Icon: SlidersHorizontal, title: "Flexibilné nastavenia", sub: "Nastavte otváracie hodiny, dĺžku slotov, fotky stolov a zbierajte želania hostí" },
      { Icon: Users, title: "Riadenie toku hostí", sub: "Zvoľte si režim práce s rezerváciami a majte tok hostí úplne pod kontrolou" },
    ],
  },

  heroMicrocopy: "{count} reštaurácií · 14 dní zadarmo · Bez karty",
  seeIncluded: "Čo je v cene",

  trust: [
    { kind: "num", value: 35, label: "Jazykov" },
    { kind: "text", value: "24/7", label: "Rezervácie" },
    { kind: "num", value: 5, suffix: " min", label: "Spustenie" },
    { kind: "count", label: "Reštaurácií" },
  ],

  bundle: {
    heading: "Všetko, na čom vaša reštaurácia beží.",
    headingAccent: "V jednej aplikácii.",
    sub: "Menu, kuchyňa a rezervácie na jednom mieste — moderné, rýchle a vytvorené pre to, ako reštaurácie naozaj fungujú. Bez doplnkov, bez platby za funkciu.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitálne menu", title: "Menu, ktoré predáva.", bullets: ["35 jazykov s AI","Prémiový dizajn","Ceny ihneď aktuálne"], image: "/landing/feature-design.webp", imageAlt: "Dva telefóny na stole v kaviarni: úvodná obrazovka digitálneho menu a kontaktná stránka s mapou" },
    { Icon: ChefHat, tag: "Kuchynský displej", title: "Varte rýchlejšie, nič nezmeškáte.", bullets: ["Naživo na obrazovke","Poznámky a alergény","Tablet alebo telefón"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet na bare zobrazuje kuchynský displej s objednávkami podľa stolov" },
    { Icon: CalendarCheck, tag: "Rezervácie", title: "Rezervácie na autopilota.", bullets: ["Samoobslužná rezervácia","Automatické potvrdenie","Kalendár podľa stolov"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dva tablety zobrazujú rezervačný kalendár: denný pohľad podľa stolov a mesačný pohľad" },
    { Icon: Receipt, tag: "Objednávky pri stole", title: "Objednávky rovno do kuchyne.", bullets: ["Hosť alebo čašník","Rovno do kuchyne","Zapnite kedykoľvek"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet s obrazovkou objednávok: zoznam objednávok a plán sály s farebnými stolmi." },
  ],

  seeDetails: "Zobraziť detaily",

  extras: {
    heading: "A všetko ostatné v cene.",
    items: [
      { Icon: ScanLine, label: "AI digitalizuje vaše papierové menu za 60 sekúnd" },
      { Icon: QrCode, label: "Jedinečný QR kód pre každý stôl" },
      { Icon: Smartphone, label: "Bez aplikácie pre hostí — otvorí sa v prehliadači" },
      { Icon: Globe, label: "Vlastná doména s SSL" },
      { Icon: BarChart3, label: "Analýza predaja: tržby, top jedlá, hodiny" },
      { Icon: Palette, label: "Štítky alergénov a diét na filtrovanie" },
    ],
  },

  midCta: {
    heading: "Jedna aplikácia namiesto piatich.",
    sub: "Žiadne žonglovanie so samostatnými nástrojmi pre menu, kuchyňu a rezervácie — všetko na jednom mieste, na akomkoľvek telefóne či tablete, bez inštalácie.",
  },

  platform: {
    hardwareTitle: "Pracujte s vlastným hardvérom",
    hardwareSub: "Nikdy vás nenútime kupovať hardvér od nás. Použite telefóny, tablety a počítače, ktoré už máte.",
    anywhereTitle: "Funguje všade",
    anywhereSub: "Mobil, tablet, notebook, PC. Android, iOS, Windows, Mac, Linux. Funguje v každom modernom prehliadači, bez inštalácie.",
  },

  activities: {
    heading: "Jeden systém,",
    headingAccent: "celá vaša reštaurácia.",
    sub: "Rýchlejšia obsluha, pokojnejšia kuchyňa, nižšie náklady a zážitok, ktorý si hosť zapamätá — všetko na jednej platforme.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Pri stole — hostia",
        bullets: [
          "QR menu v 35 jazykoch",
          "Objednávka bez čakania na čašníka",
          "Privolanie čašníka alebo žiadosť o účet",
          "Rezervácia stola 24/7",
          "Jedinečný QR kód pre každý stôl",
          "Bez aplikácie pre hostí — otvorí sa v prehliadači",
          "Štítky alergénov a diét na filtrovanie",
        ],
      },
      {
        Icon: ChefHat,
        tag: "V kuchyni",
        bullets: [
          "Objednávky sa okamžite zobrazia na obrazovke",
          "Stĺpce pripravuje sa / hotovo / podané",
          "Alergény a poznámky zvýraznené",
          "Tablet alebo telefón — žiadne papierové bločky",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Správa",
        bullets: [
          "Zmeny menu a cien okamžite naživo",
          "Preklad pomocou AI jedným kliknutím",
          "Analýzy predaja a reporty",
          "Viac reštaurácií na jednom účte",
          "AI digitalizuje vaše papierové menu za 60 sekúnd",
          "Vlastná doména s SSL",
        ],
      },
    ],
  },
};
