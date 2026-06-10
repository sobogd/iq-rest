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

  platform: {
    hardwareTitle: "Jobb med ditt eget utstyr",
    hardwareSub: "Vi tvinger deg aldri til å kjøpe utstyr av oss. Bruk telefonene, nettbrettene og datamaskinene du allerede har.",
    anywhereTitle: "Fungerer overalt",
    anywhereSub: "Mobil, nettbrett, laptop, PC. Android, iOS, Windows, Mac, Linux. Fungerer i alle moderne nettlesere, uten installasjon.",
  },

  activities: {
    heading: "Ett system,",
    headingAccent: "hele restauranten din.",
    sub: "Raskere service, et roligere kjøkken, lavere kostnader og en gjesteopplevelse som huskes — alt i én plattform.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Ved bordet — gjester",
        bullets: [
          "QR-meny på 35 språk",
          "Bestill uten å vente på servitøren",
          "Tilkall servitøren eller be om regningen",
          "Book bord døgnet rundt",
          "En unik QR-kode for hvert bord",
          "Ingen app for gjester — åpnes i nettleseren",
          "Allergen- og diett-tagger å filtrere på",
        ],
      },
      {
        Icon: ChefHat,
        tag: "På kjøkkenet",
        bullets: [
          "Bestillinger kommer rett på skjermen",
          "Kolonner under tilberedning / klar / servert",
          "Allergener og notater uthevet",
          "Nettbrett eller telefon — ingen papirlapper",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Administrasjon",
        bullets: [
          "Meny- og prisendringer live med en gang",
          "AI-oversettelse med ett klikk",
          "Salgsanalyser og rapporter",
          "Flere restauranter på én konto",
          "AI digitaliserer papirmenyen din på 60 sekunder",
          "Ditt eget domene med SSL",
        ],
      },
    ],
  },
};
