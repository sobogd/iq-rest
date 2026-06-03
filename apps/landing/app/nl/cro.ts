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
    titleAccent: "in 5 minuten volledig digitaal.",
    sub: "Het complete platform om een modern restaurant te runnen — mooi, alles op één plek, zonder technische kennis.",
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
    { Icon: Languages, tag: "Digitaal menu", title: "Een menu dat op een website lijkt, geen pdf.", bullets: ["35 AI-talen","Premium design","Prijzen meteen bij"], image: "/landing/feature-design.webp", imageAlt: "Twee telefoons op een cafétafel: het welkomstscherm van het digitale menu en de contactpagina met kaart" },
    { Icon: ChefHat, tag: "Keukenscherm", title: "De keuken, eindelijk papierloos.", bullets: ["Live op het scherm","Notities & allergenen","Tablet of telefoon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet op de bar toont het keukenscherm met bestellingen per tafel" },
    { Icon: CalendarCheck, tag: "Reserveringen", title: "Tafels die zichzelf reserveren, 24/7.", bullets: ["Zelf reserveren","Automatische bevestiging","Kalender per tafel"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Twee tablets tonen de reserveringskalender: dagweergave per tafel en maandweergave" },
    { Icon: Receipt, tag: "Bestellen aan tafel", title: "Neem bestellingen op zonder blocnote — optioneel.", bullets: ["Gast of ober","Direct naar de keuken","Altijd aan/uit"], image: "/landing/feature-orders.webp", imageAlt: "Ober neemt aan tafel een bestelling op met de telefoon, die op het keukenscherm verschijnt" },
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

  how: {
    heading: "Klaar in 5 minuten",
    sub: "Vier stappen. Geen installatie, geen technische setup, geen kaart.",
    steps: [
      { n: "1", t: "Type & naam", d: "Type zaak en naam — dat is de hele aanmelding." },
      { n: "2", t: "Inloggen", d: "E-mail of Google. Geen kaart." },
      { n: "3", t: "Menu toevoegen", d: "Typ het in of laat AI je papieren menu scannen." },
      { n: "4", t: "Je staat live", d: "Menu, keuken en reserveringen — klaar." },
    ],
  },
};
