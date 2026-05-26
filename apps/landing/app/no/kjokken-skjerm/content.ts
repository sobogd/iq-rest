import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "no",
  slug: "kjokken-skjerm",
  trackPrefix: "l_no_kds",

  meta: {
    title: "Kjøkkenskjerm (KDS) for restauranter | IQ Rest",
    description:
      "Kjøkkenskjerm (KDS) for restauranter: bestillinger fra salongen og QR-menyen lander umiddelbart på kokkens skjerm. Kolonner per bord, statuser Venter / Tilberedes / Klar / Servert, sonefiltre. Fungerer på nettbrett eller telefon.",
    canonical: "https://iq-rest.com/no/kjokken-skjerm",
    ogLocale: "nb_NO",
    ogTitle: "Kjøkkenskjerm (KDS) — Bestillinger på kokkens skjerm",
    ogDescription:
      "Bestillinger fra salongen på kokkens skjerm. Kolonner per bord, statuser og timer. Ett trykk endrer status.",
    brandLine: "IQ Rest — Kjøkkenskjerm",
  },

  hero: {
    headline: "Kjøkkenskjerm: bestillinger direkte til kokkens skjerm.",
    cta: "Sett opp kjøkkenskjerm",
    sub: "Papirkvitteringer er ikke lenger nødvendige. Bestillinger fra salongen eller QR-menyen lander umiddelbart på kjøkkenskjermen — med notater, allergener og timer. Ett trykk endrer status. Fungerer på et nettbrett ved utleveringsdisken eller en smarttelefon i kokkens lomme.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesjonelt kjøkken med et nettbrett på en messingstativ som viser kjøkkenskjermen med aktive bestillinger",
  },

  scan: {
    heading: "Sett opp kjøkkenskjermen",
    headingAccent: "på 5 minutter.",
    sub: "Last opp en papirmeny eller PDF — AI-en gjenkjenner retter, kategorier og allergener. Koble til et nettbrett på kjøkkenet og begynn å motta bestillinger.",
    cta: "Skann meny",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontroller og filtre",
      heading: "Flere skjermer per sone: kjøkken og bar.",
      body: "Plasser separate nettbrett ved den varme linjen, baren eller konditoristasjonen — hver skjerm viser kun rettene som hører til den. Filtre etter status (Venter / Tilberedes / Klar / Servert) og kategori fjerner støy: kokken ser kun det som er relevant for hans stasjon.",
      bullets: [
        "Flere KDS-skjermer med kategorifiltre.",
        "Statusfilter: vis kun Tilberedes og Klar.",
        "Hver sone ser kun sin egen bestillingsflyt.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Nettbrett på et messingstativ ved kjøkkenets utleveringsdisk — KDS med statusfilter" },
    },
    {
      icon: Timer,
      eyebrow: "Kort og timer",
      heading: "Ett trykk endrer status. Notater og allergener fremhevet med farger.",
      body: "Rettens kort viser de valgte alternativene (uten løk, godt stekt), gjestens notat, allergener og en timer fra det øyeblikket bestillingen ble lagt inn. Trykk på kortet og statusen går videre til neste: Venter → Tilberedes → Klar → Servert. Listen sorteres automatisk etter prioritet.",
      bullets: [
        "Trykk på kortet — umiddelbar statusendring.",
        "Alternativer, notater og allergener fremhevet med farger.",
        "Prioritetssortering: elementer som venter lenger stiger opp.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Nettbrett på et messingstativ på bardisken — KDS med bestillingskort per bord" },
    },
  ],

  faq: {
    sub: "Hva restauratører spør om kjøkkenskjermen i IQ Rest. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp.",
    items: [
      { q: "Hvilke rettstatuser har kjøkkenet?", a: "Fire statuser med forskjellige kortfarger: Venter (grå) — bestillingen er akseptert og venter; Tilberedes (oransje) — retten tilberedes; Klar (blå) — klar for servering; Servert (grønn) — levert til gjesten. Å trykke på kortet flytter det til neste status, uten menyer eller bekreftelser." },
      { q: "Kan jeg kjøre flere KDS-skjermer i forskjellige soner?", a: "Ja. Ett nettbrett ved den varme linjen, et annet ved baren, et tredje ved konditoriet — hver med sitt eget kategorifilter. Alle skjermer er synkronisert i sanntid: en status endret på én skjerm oppdateres alle steder." },
      { q: "Hvilken maskinvare trenger jeg for å kjøre KDS?", a: "KDS er en webapp som kjører i alle moderne nettlesere. Stort kjøkken — et nettbrett på et messingstativ ved utleveringsdisken eller en TV på veggen. Lite sted — kokkens smarttelefon. Ingen spesiell maskinvare, ingen installasjon: åpne en lenke og logg inn på kontoen." },
      { q: "Hvor kommer bestillingene på kjøkkenskjermen fra?", a: "Fra alle kilder: gjesten som bestilte via QR-menyen ved bordet; kelneren som tok bestillingen fra telefonen; gjesten som la inn bestillingen fra nettstedet. Alle ankommer KDS med kildeetikett og bordnummer. Ingen manuelle overføringer fra et POS." },
      { q: "Hva vises på et bestillingskort?", a: "Rettens navn, valgte modifikatorer (uten løk, godt stekt, legg til saus), gjestens kommentar, fremhevede allergener, status (Venter / Tilberedes / Klar / Servert) og en timer som viser hvor lenge retten har ventet. Kort sorteres etter prioritet: jo lenger venting, desto høyere i kolonnen." },
      { q: "Kan jeg filtrere kortene på skjermen?", a: "Ja. To filtre: etter status (f.eks. vis kun Venter og Tilberedes, skjul Servert) og etter kategori (kun drikke ved baren, kun hovedretter på kjøkkenet). Innstillingene lagres per enhet — hver sone beholder sitt eget sett." },
    ],
  },
};
