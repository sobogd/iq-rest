import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "da",
  slug: "bordreservation",
  trackPrefix: "l_da_bookings",

  meta: {
    title: "Bordreservation 24/7 til restauranter | IQ Rest",
    description:
      "Bordreservation 24/7 til restauranter: gæsterne reserverer selv via QR-menuen eller hjemmesiden. Kalender pr. bord, automatiske bekræftelser og påmindelser. Ikke en eneste mistet gæst. 14 dage gratis.",
    canonical: "https://iq-rest.com/da/bordreservation",
    ogLocale: "da_DK",
    ogTitle: "Bordreservation 24/7 — gæsterne reserverer selv",
    ogDescription:
      "Gæsterne reserverer borde via QR-menuen eller hjemmesiden. Kalender, automatiske bekræftelser, påmindelser. Ikke en eneste mistet gæst.",
    brandLine: "IQ Rest — Bordreservation til restauranter",
  },

  hero: {
    headline: "Bordreservation 24/7 — gæsterne reserverer selv.",
    sub: "Gæsterne reserverer borde via QR-menuen eller et direkte link. Kalender pr. bord, automatiske bekræftelser og påmindelser. Ikke en eneste mistet gæst og ingen opkald i spidsbelastning.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Værtinde administrerer reservationer fra en tablet ved restaurantens indgang",
  },

  scan: {
    heading: "Start bordreservation",
    headingAccent: "på 5 minutter.",
    sub: "Tilslut kalenderen, tilføj borde med billeder og kapacitet — gæsterne begynder at reservere samme dag.",
    cta: "Aktivér reservation",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Reservationsformular",
      heading: "Gæsterne reserverer selv — efter dato, tidspunkt og antal personer.",
      body: "Gæsten åbner QR-menuen eller et direkte link, vælger dato, tidspunkt og antal personer — og ser straks de tilgængelige borde, hvert med billede, beskrivelse (terrasse, ved vinduet, sofakrog ved baren) og kapacitet. Bekræftelsen sendes automatisk pr. e-mail og WhatsApp.",
      bullets: [
        "Vælg et bord efter billede, beskrivelse og kapacitet.",
        "Automatisk bekræftelse og påmindelse en time før besøget.",
        "Minimale felter i formularen: navn, telefon, antal personer.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gæst reserverer et restaurantbord fra en telefon: dato, tidspunkt, antal personer og bordvælger" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Reservationskalender",
      heading: "Kalender pr. dag og bord — alt ved et blik.",
      body: "Administrationspanelet viser en reservationskalender opdelt efter bord, dag, uge og måned. Ledige tider, optagede borde, bekræftede og ubekræftede reservationer på én skærm. Fungerer på en tablet i restauranten og en computer på kontoret.",
      bullets: [
        "Visninger dag, uge og måned.",
        "Opdeling pr. bord: hvem, hvornår, hvor mange gæster.",
        "Flyt, annuller eller bekræft en reservation med ét tryk fra telefonen.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Reservationskalender i IQ Rest's administrationspanel på to tablets: daglig Gantt pr. borde og månedsvisning" },
    },
  ],

  faq: {
    sub: "Hvad restauratører spørger om bordreservation i IQ Rest. Kan du ikke finde dit spørgsmål? Skriv til os på WhatsApp.",
    items: [
      { q: "Kan jeg vælge, hvilke dage og timer der er tilgængelige for reservation?", a: "Ja. Administrationspanelet giver dig mulighed for at indstille åbningstider og tilgængelige ugedage — systemet viser ikke utilgængelige tider til gæsterne. Du kan lukke en bestemt dato (firmaarrangement, privat reservation) eller midlertidigt slå hele kalenderen fra." },
      { q: "Kan jeg uploade et billede for hvert bord?", a: "Ja. Hvert bord kan have et billede, en beskrivelse (terrasse, ved vinduet, sofakrog ved baren) og kapacitet. Gæsten ser præcis det bord, han eller hun reserverer, og træffer et oplyst valg — det reducerer ikke-opfyldte forventninger." },
      { q: "Kan jeg slå reservation fra på bestemte datoer?", a: "Ja. Kalenderen giver dig mulighed for at lukke bestemte datoer (helligdage, private arrangementer, renovering) eller hele ugedage. På disse datoer ser gæsterne en „reservation midlertidigt utilgængelig“-besked." },
      { q: "Kan jeg tilpasse, hvilke felter der indsamles fra gæsten?", a: "Ja. Standardsæt: navn, telefon, e-mail, antal personer. Du kan tilføje brugerdefinerede felter (anledning, allergier, særlige ønsker) eller fjerne unødvendige for at holde formularen så kort som muligt." },
      { q: "Kan jeg begrænse antallet af gæster pr. bord?", a: "Ja. Hvert bord har en „kapacitet“-indstilling — systemet tillader ikke, at et bord til 2 reserveres for 6. På større borde kan du angive et minimum, så små grupper ikke optager „bordet til otte“ fra større selskaber." },
      { q: "Hvor svær er reservationsopsætningen?", a: "Det tager meget kort tid. Tre trin: (1) tilføj borde med navne, billeder og kapacitet, (2) aktivér reservationstilstand i indstillingerne, (3) del linket eller QR-koden med gæsterne. Fuld lancering på 5–10 minutter." },
      { q: "Kan jeg bruge reservationssystemet på mit eget domæne?", a: "Ja. Vi understøtter et brugerdefineret domæne med SSL-certifikat: gæsterne reserverer på din restaurants adresse (f.eks. reservation.dinrestaurant.dk). Vi hjælper med DNS-opsætning; processen tager 5–10 minutter." },
      { q: "Kan jeg konfigurere automatisk eller manuel bekræftelse?", a: "Ja, tilstanden vælges i indstillingerne. Med automatisk bekræftelse modtager gæsten en bekræftelse straks efter at have indsendt formularen, og reservationen anses for accepteret. Med manuel bekræftelse lander anmodningen i administrationspanelet med status „afventer bekræftelse“ — administratoren gennemgår den og bekræfter eller afviser. Manuel tilstand er nyttig ved begrænset bordantal eller strenge gæstepolitikker." },
      { q: "Tager I kommission af reservationerne?", a: "Nej. Bordreservation er fuldt inkluderet i Pro-abonnementet — ingen procentdel af gæster, intet gebyr pr. slot, ingen aggregator-kommissioner. Et fast månedligt gebyr og ubegrænsede reservationer." },
    ],
  },
};
