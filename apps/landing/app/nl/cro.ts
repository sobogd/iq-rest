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
    verticals: ["Restaurants","Cafés","Bars","Pizzeria's"],
    title: "Jouw restaurant,",
    titleAccent: "digitaal in 5 minuten.",
    sub: "Een mooi digitaal menu, een keukenscherm en 24/7 reserveringen — het complete platform voor een modern restaurant.",
  },

  heroMicrocopy: "{count} restaurants · 14 dagen gratis · Geen kaart",
  seeIncluded: "Bekijk wat erin zit",

  trust: [
    { kind: "num", value: 35, label: "Talen" },
    { kind: "text", value: "24/7", label: "Reserveringen" },
    { kind: "num", value: 5, suffix: " min", label: "Opstarten" },
    { kind: "count", label: "Restaurants" },
  ],

  bundle: {
    heading: "Alles waar je restaurant op draait.",
    headingAccent: "In één app.",
    sub: "Menu, keuken en reserveringen op één plek — modern, snel en gemaakt voor hoe restaurants echt werken. Geen add-ons, geen kosten per functie.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitaal menu", title: "Een menu dat verkoopt.", bullets: ["35 AI-talen","Premium design","Prijzen meteen bij"], image: "/landing/feature-design.webp", imageAlt: "Twee telefoons op een cafétafel: het welkomstscherm van het digitale menu en de contactpagina met kaart" },
    { Icon: ChefHat, tag: "Keukenscherm", title: "Kook sneller, mis niets.", bullets: ["Live op het scherm","Notities & allergenen","Tablet of telefoon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet op de bar toont het keukenscherm met bestellingen per tafel" },
    { Icon: CalendarCheck, tag: "Reserveringen", title: "Reserveringen op autopilot.", bullets: ["Zelf reserveren","Automatische bevestiging","Kalender per tafel"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Twee tablets tonen de reserveringskalender: dagweergave per tafel en maandweergave" },
    { Icon: Receipt, tag: "Bestellen aan tafel", title: "Bestellingen direct naar de keuken.", bullets: ["Gast of ober","Direct naar de keuken","Altijd aan/uit"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet met het bestelscherm: bestellijst en plattegrond met gekleurde tafels." },
  ],

  seeDetails: "Bekijk details",

  extras: {
    heading: "En al het andere inbegrepen.",
    items: [
      { Icon: ScanLine, label: "AI digitaliseert je papieren menu in 60 seconden" },
      { Icon: QrCode, label: "Een unieke QR-code voor elke tafel" },
      { Icon: Smartphone, label: "Geen app voor gasten — opent in de browser" },
      { Icon: Globe, label: "Je eigen domein met SSL" },
      { Icon: BarChart3, label: "Verkoopanalyses: omzet, topgerechten, uren" },
      { Icon: Palette, label: "Allergenen- en dieetlabels om te filteren" },
    ],
  },

  midCta: {
    heading: "Eén app in plaats van vijf.",
    sub: "Geen gejongleer met aparte tools voor menu, keuken en reserveringen — alles op één plek, op elke telefoon of tablet, zonder iets te installeren.",
  },

  platform: {
    hardwareTitle: "Werk met je eigen hardware",
    hardwareSub: "We dwingen je nooit om hardware bij ons te kopen. Gebruik de telefoons, tablets en computers die je al hebt.",
    anywhereTitle: "Werkt overal",
    anywhereSub: "Mobiel, tablet, laptop, pc. Android, iOS, Windows, Mac, Linux. Werkt in elke moderne browser, zonder installatie.",
  },

  activities: {
    heading: "Eén systeem,",
    headingAccent: "je hele restaurant.",
    sub: "Snellere bediening, een rustigere keuken, lagere kosten en een gastervaring die bijblijft — alles in één platform.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Aan tafel — gasten",
        bullets: [
          "QR-menu in 35 talen",
          "Bestellen zonder op de ober te wachten",
          "De ober roepen of de rekening vragen",
          "24/7 een tafel reserveren",
        ],
      },
      {
        Icon: ChefHat,
        tag: "In de keuken",
        bullets: [
          "Bestellingen verschijnen direct op het scherm",
          "Kolommen in bereiding / klaar / geserveerd",
          "Allergenen en notities gemarkeerd",
          "Tablet of telefoon — geen papieren bonnen",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Beheer",
        bullets: [
          "Menu- en prijswijzigingen direct live",
          "AI-vertaling met één klik",
          "Verkoopanalyses en rapporten",
          "Meerdere restaurants in één account",
        ],
      },
    ],
  },
};
