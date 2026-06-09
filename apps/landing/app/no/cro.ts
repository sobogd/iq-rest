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
    verticals: ["Restauranter","Kafeer","Barer","Pizzeriaer"],
    title: "Restauranten din,",
    titleAccent: "digital på 5 minutter.",
    sub: "En flott digital meny, en kjøkkenskjerm og reservasjoner døgnet rundt — den komplette plattformen for en moderne restaurant.",
  },

  heroMicrocopy: "{count} restauranter · 14 dager gratis · Uten kort",
  seeIncluded: "Se hva som er med",

  trust: [
    { kind: "num", value: 35, label: "Språk" },
    { kind: "text", value: "24/7", label: "Reservasjoner" },
    { kind: "num", value: 5, suffix: " min", label: "I gang" },
    { kind: "count", label: "Restauranter" },
  ],

  bundle: {
    heading: "Alt restauranten din går på.",
    headingAccent: "I én app.",
    sub: "Meny, kjøkken og reservasjoner på ett sted — moderne, raskt og bygget for hvordan restauranter faktisk jobber. Ingen tillegg, ingen pris per funksjon.",
  },

  benefits: [
    { Icon: Languages, tag: "Digital meny", title: "En meny som selger.", bullets: ["35 AI-språk","Premium-design","Priser oppdatert straks"], image: "/landing/feature-design.webp", imageAlt: "To telefoner på et kafébord: den digitale menyens velkomstskjerm og kontaktsiden med kart" },
    { Icon: ChefHat, tag: "Kjøkkenskjerm", title: "Lag mat raskere, gå glipp av ingenting.", bullets: ["Live på skjermen","Notater og allergener","Nettbrett eller telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Nettbrett på baren viser kjøkkenskjermen med bestillinger per bord" },
    { Icon: CalendarCheck, tag: "Reservasjoner", title: "Reservasjoner på autopilot.", bullets: ["Reserver selv","Automatisk bekreftelse","Kalender per bord"], image: "/landing/feature-booking-calendar.webp", imageAlt: "To nettbrett viser reservasjonskalenderen: dagsvisning per bord og månedsvisning" },
    { Icon: Receipt, tag: "Bestill ved bordet", title: "Bestillinger rett til kjøkkenet.", bullets: ["Gjest eller servitør","Rett til kjøkkenet","På/av når du vil"], image: "/landing/feature-orders-map.webp", imageAlt: "Nettbrett med bestillingsskjermen: ordreliste og plantegning med fargekodede bord." },
  ],

  seeDetails: "Se detaljer",

  extras: {
    heading: "Og alt annet er inkludert.",
    items: [
      { Icon: ScanLine, label: "AI digitaliserer papirmenyen din på 60 sekunder" },
      { Icon: QrCode, label: "En unik QR-kode for hvert bord" },
      { Icon: Smartphone, label: "Ingen app for gjester — åpnes i nettleseren" },
      { Icon: Globe, label: "Ditt eget domene med SSL" },
      { Icon: BarChart3, label: "Salgsanalyse: omsetning, topretter, timer" },
      { Icon: Palette, label: "Allergen- og diett-tagger å filtrere på" },
    ],
  },

  midCta: {
    heading: "Én app i stedet for fem.",
    sub: "Slutt å sjonglere separate verktøy for meny, kjøkken og reservasjoner — alt på ett sted, på hvilken som helst telefon eller nettbrett, uten å installere noe.",
  },

  how: {
    heading: "Klar på 5 minutter",
    sub: "Fire trinn. Ingen installasjon, ingen teknisk oppsett, uten kort.",
    steps: [
      { n: "1", t: "Type og navn", d: "Type sted og navn — det er hele registreringen." },
      { n: "2", t: "Logg inn", d: "E-post eller Google. Uten kort." },
      { n: "3", t: "Legg til menyen", d: "Skriv den inn, eller la AI skanne papirmenyen." },
      { n: "4", t: "Du er live", d: "Meny, kjøkken og reservasjoner — klare." },
    ],
  },
};
