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
    verticals: ["Restaurace","Kavárny","Bary","Pizzerie"],
    title: "Vaše restaurace,",
    titleAccent: "plně digitální za 5 minut.",
    sub: "Krásné digitální menu, kuchyňský displej a rezervace 24/7 — kompletní platforma pro moderní restauraci.",
  },

  heroMicrocopy: "{count} restaurací · 14 dní zdarma · Bez karty",
  seeIncluded: "Co je v ceně",

  trust: [
    { kind: "num", value: 35, label: "Jazyků" },
    { kind: "text", value: "24/7", label: "Rezervace" },
    { kind: "num", value: 5, suffix: " min", label: "Spuštění" },
    { kind: "count", label: "Restaurací" },
  ],

  bundle: {
    heading: "Vše, na čem vaše restaurace běží.",
    headingAccent: "V jedné aplikaci.",
    sub: "Menu, kuchyně a rezervace na jednom místě — moderní, rychlé a vytvořené pro to, jak restaurace doopravdy fungují. Bez doplňků, bez platby za funkci.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitální menu", title: "Menu, které prodává.", bullets: ["35 jazyků s AI","Prémiový design","Ceny ihned aktuální"], image: "/landing/feature-design.webp", imageAlt: "Dva telefony na stole v kavárně: úvodní obrazovka digitálního menu a kontaktní stránka s mapou" },
    { Icon: ChefHat, tag: "Kuchyňský displej", title: "Vařte rychleji, nic nezmeškáte.", bullets: ["Živě na obrazovce","Poznámky a alergeny","Tablet nebo telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet na baru zobrazuje kuchyňský displej s objednávkami podle stolů" },
    { Icon: CalendarCheck, tag: "Rezervace", title: "Rezervace na autopilota.", bullets: ["Samoobslužná rezervace","Automatické potvrzení","Kalendář podle stolů"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dva tablety zobrazují rezervační kalendář: denní pohled podle stolů a měsíční pohled" },
    { Icon: Receipt, tag: "Objednávky u stolu", title: "Objednávky rovnou do kuchyně.", bullets: ["Host nebo číšník","Rovnou do kuchyně","Zapněte kdykoli"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet s obrazovkou objednávek: seznam objednávek a plán sálu s barevně odlišenými stoly." },
  ],

  seeDetails: "Zobrazit detaily",

  extras: {
    heading: "A vše ostatní v ceně.",
    items: [
      { Icon: ScanLine, label: "AI digitalizuje vaše papírové menu za 60 sekund" },
      { Icon: QrCode, label: "Unikátní QR kód pro každý stůl" },
      { Icon: Smartphone, label: "Bez aplikace pro hosty — otevře se v prohlížeči" },
      { Icon: Globe, label: "Vlastní doména s SSL" },
      { Icon: BarChart3, label: "Analýza prodejů: tržby, top jídla, hodiny" },
      { Icon: Palette, label: "Štítky alergenů a diet pro filtrování" },
    ],
  },

  midCta: {
    heading: "Jedna aplikace místo pěti.",
    sub: "Žádné žonglování se samostatnými nástroji pro menu, kuchyni a rezervace — vše na jednom místě, na jakémkoli telefonu či tabletu, bez instalace.",
  },

  platform: {
    hardwareTitle: "Pracujte s vlastním hardwarem",
    hardwareSub: "Nikdy vás nenutíme kupovat hardware od nás. Použijte telefony, tablety a počítače, které už máte.",
    anywhereTitle: "Funguje všude",
    anywhereSub: "Mobil, tablet, notebook, PC. Android, iOS, Windows, Mac, Linux. Funguje v každém moderním prohlížeči, bez instalace.",
  },

  activities: {
    heading: "Jeden systém,",
    headingAccent: "celá vaše restaurace.",
    sub: "Rychlejší obsluha, klidnější kuchyně, nižší náklady a zážitek, který si host zapamatuje — vše na jedné platformě.",
    groups: [
      {
        Icon: Smartphone,
        tag: "U stolu — hosté",
        bullets: [
          "QR menu ve 35 jazycích",
          "Objednávka bez čekání na číšníka",
          "Přivolání číšníka nebo žádost o účet",
          "Rezervace stolu 24/7",
        ],
      },
      {
        Icon: ChefHat,
        tag: "V kuchyni",
        bullets: [
          "Objednávky se objeví na obrazovce okamžitě",
          "Sloupce připravuje se / hotovo / podáno",
          "Alergeny a poznámky zvýrazněny",
          "Tablet nebo telefon — žádné papírové účtenky",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Správa",
        bullets: [
          "Změny menu a cen okamžitě naživo",
          "Překlad pomocí AI na jedno kliknutí",
          "Analýzy prodeje a reporty",
          "Více restaurací na jednom účtu",
        ],
      },
    ],
  },
};
