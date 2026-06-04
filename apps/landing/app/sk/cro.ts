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
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Reštaurácie","Kaviarne","Bary","Pizzerie"],
    title: "Vaša reštaurácia,",
    titleAccent: "úplne digitálna za 5 minút.",
    sub: "Krásne digitálne menu, kuchynský displej a rezervácie 24/7 — kompletná platforma pre modernú reštauráciu.",
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

  how: {
    heading: "Hotovo za 5 minút",
    sub: "Štyri kroky. Bez inštalácie, bez technického nastavenia, bez karty.",
    steps: [
      { n: "1", t: "Typ a názov", d: "Typ podniku a názov — to je celá registrácia." },
      { n: "2", t: "Prihláste sa", d: "E-mail alebo Google. Bez karty." },
      { n: "3", t: "Pridajte menu", d: "Napíšte ho alebo nechajte AI naskenovať papierové menu." },
      { n: "4", t: "Ste online", d: "Menu, kuchyňa a rezervácie — hotovo." },
    ],
  },
};
