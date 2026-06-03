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
    verticals: ["Restauranger","Kaféer","Barer","Pizzerior"],
    title: "Din restaurang,",
    titleAccent: "helt digital på 5 minuter.",
    sub: "Den kompletta plattformen för en modern restaurang — snygg, allt på ett ställe, utan tekniska kunskaper.",
  },

  heroMicrocopy: "{count} restauranger · 14 dagar gratis · Inget kort",
  seeIncluded: "Se vad som ingår",

  trust: [
    { kind: "num", value: 35, label: "Språk" },
    { kind: "text", value: "24/7", label: "Bokningar" },
    { kind: "num", value: 5, suffix: " min", label: "Igång" },
    { kind: "count", label: "Restauranger" },
  ],

  bundle: {
    heading: "Allt din restaurang går på.",
    headingAccent: "I en app.",
    sub: "Meny, kök och bokningar på ett ställe — modernt, snabbt och byggt för hur restauranger faktiskt jobbar. Inga tillägg, ingen avgift per funktion.",
  },

  benefits: [
    { Icon: Languages, tag: "Digital meny", title: "En meny som ser ut som en sajt, inte en PDF.", bullets: ["35 AI-språk","Premiumdesign","Priser direkt"], image: "/landing/feature-design.webp", imageAlt: "Två telefoner på ett kafébord: den digitala menyns startskärm och kontaktsidan med karta" },
    { Icon: ChefHat, tag: "Köksskärm", title: "Köket, äntligen papperslöst.", bullets: ["Live på skärmen","Noteringar & allergener","Surfplatta eller telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Surfplatta på baren visar köksskärmen med beställningar per bord" },
    { Icon: CalendarCheck, tag: "Bokningar", title: "Bord som bokar sig själva, 24/7.", bullets: ["Boka själv","Automatisk bekräftelse","Kalender per bord"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Två surfplattor visar bokningskalendern: dagsvy per bord och månadsvy" },
    { Icon: Receipt, tag: "Beställ vid bordet", title: "Ta beställningar utan block — valfritt.", bullets: ["Gäst eller servitör","Direkt till köket","På/av när du vill"], image: "/landing/feature-orders.webp", imageAlt: "Servitör tar en beställning vid bordet med telefonen, den hamnar på köksskärmen" },
  ],

  seeDetails: "Se detaljer",

  extras: {
    heading: "Och allt annat ingår.",
    items: [
      { Icon: ScanLine, label: "AI digitaliserar din pappersmeny på 60 sekunder" },
      { Icon: QrCode, label: "En unik QR-kod för varje bord" },
      { Icon: Smartphone, label: "Ingen app för gäster — öppnas i webbläsaren" },
      { Icon: Globe, label: "Din egen domän med SSL" },
      { Icon: BarChart3, label: "Försäljningsanalys: intäkter, topprätter, timmar" },
      { Icon: Palette, label: "Allergen- och kosttaggar att filtrera på" },
    ],
  },

  midCta: {
    heading: "En app i stället för fem.",
    sub: "Slut på att jonglera separata verktyg för meny, kök och bokningar — allt på ett ställe, på vilken telefon eller surfplatta som helst, utan installation.",
  },

  how: {
    heading: "Igång på 5 minuter",
    sub: "Fyra steg. Ingen installation, ingen teknisk uppsättning, inget kort.",
    steps: [
      { n: "1", t: "Typ & namn", d: "Typ av ställe och namn — det är hela registreringen." },
      { n: "2", t: "Logga in", d: "E-post eller Google. Inget kort." },
      { n: "3", t: "Lägg till menyn", d: "Skriv in den eller låt AI skanna din pappersmeny." },
      { n: "4", t: "Du är live", d: "Meny, kök och bokningar — klara." },
    ],
  },
};
