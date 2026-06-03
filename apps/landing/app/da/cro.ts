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
    verticals: ["Restauranter","Caféer","Barer","Pizzeriaer"],
    title: "Din restaurant,",
    titleAccent: "helt digital på 5 minutter.",
    sub: "Den komplette platform til at drive en moderne restaurant — flot, alt ét sted, uden teknisk viden.",
  },

  heroMicrocopy: "{count} restauranter · 14 dage gratis · Intet kort",
  seeIncluded: "Se hvad der er med",

  trust: [
    { kind: "num", value: 35, label: "Sprog" },
    { kind: "text", value: "24/7", label: "Reservationer" },
    { kind: "num", value: 5, suffix: " min", label: "I gang" },
    { kind: "count", label: "Restauranter" },
  ],

  bundle: {
    heading: "Alt det din restaurant kører på.",
    headingAccent: "I én app.",
    sub: "Menu, køkken og reservationer ét sted — moderne, hurtigt og bygget til, hvordan restauranter faktisk arbejder. Ingen tilkøb, ingen pris pr. funktion.",
  },

  benefits: [
    { Icon: Languages, tag: "Digital menu", title: "En menu der sælger.", bullets: ["35 AI-sprog","Premium-design","Priser opdateret straks"], image: "/landing/feature-design.webp", imageAlt: "To telefoner på et cafébord: den digitale menus velkomstskærm og kontaktsiden med kort" },
    { Icon: ChefHat, tag: "Køkkenskærm", title: "Lav mad hurtigere, mis intet.", bullets: ["Live på skærmen","Noter & allergener","Tablet eller telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet på baren viser køkkenskærmen med bestillinger pr. bord" },
    { Icon: CalendarCheck, tag: "Reservationer", title: "Reservationer på autopilot.", bullets: ["Reservér selv","Automatisk bekræftelse","Kalender pr. bord"], image: "/landing/feature-booking-calendar.webp", imageAlt: "To tablets viser reservationskalenderen: dagsvisning pr. bord og månedsvisning" },
    { Icon: Receipt, tag: "Bestil ved bordet", title: "Bestillinger direkte til køkkenet.", bullets: ["Gæst eller tjener","Direkte til køkkenet","Til/fra når som helst"], image: "/landing/feature-orders.webp", imageAlt: "Tjener tager en bestilling ved bordet på telefonen, den lander på køkkenskærmen" },
  ],

  seeDetails: "Se detaljer",

  extras: {
    heading: "Og alt det andet er med.",
    items: [
      { Icon: ScanLine, label: "AI digitaliserer din papirmenu på 60 sekunder" },
      { Icon: QrCode, label: "En unik QR-kode til hvert bord" },
      { Icon: Smartphone, label: "Ingen app for gæster — åbner i browseren" },
      { Icon: Globe, label: "Dit eget domæne med SSL" },
      { Icon: BarChart3, label: "Salgsanalyse: omsætning, topretter, timer" },
      { Icon: Palette, label: "Allergen- og diættags at filtrere på" },
    ],
  },

  midCta: {
    heading: "Én app i stedet for fem.",
    sub: "Slut med at jonglere separate værktøjer til menu, køkken og reservationer — alt ét sted, på enhver telefon eller tablet, uden at installere noget.",
  },

  how: {
    heading: "Klar på 5 minutter",
    sub: "Fire trin. Ingen installation, ingen teknisk opsætning, intet kort.",
    steps: [
      { n: "1", t: "Type & navn", d: "Type sted og navn — det er hele tilmeldingen." },
      { n: "2", t: "Log ind", d: "E-mail eller Google. Intet kort." },
      { n: "3", t: "Tilføj menuen", d: "Skriv den ind, eller lad AI scanne din papirmenu." },
      { n: "4", t: "Du er live", d: "Menu, køkken og reservationer — klar." },
    ],
  },
};
