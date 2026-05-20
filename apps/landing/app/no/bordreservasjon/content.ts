import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "no",
  slug: "bordreservasjon",
  trackPrefix: "l_no_bookings",

  meta: {
    title: "Bordreservasjon 24/7 for restauranter | IQ Rest",
    description:
      "Bordreservasjon 24/7 for restauranter: gjester reserverer selv via QR-menyen eller nettstedet. Kalender per bord, automatiske bekreftelser og påminnelser. Ikke en eneste tapt gjest. 14 dager gratis.",
    canonical: "https://iq-rest.com/no/bordreservasjon",
    ogLocale: "nb_NO",
    ogTitle: "Bordreservasjon 24/7 — gjester reserverer selv",
    ogDescription:
      "Gjester reserverer bord via QR-menyen eller nettstedet. Kalender, automatiske bekreftelser, påminnelser. Ikke en eneste tapt gjest.",
    brandLine: "IQ Rest — Bordreservasjon for restauranter",
  },

  hero: {
    headline: "Bordreservasjon 24/7 — gjester reserverer selv.",
    sub: "Gjester reserverer bord via QR-menyen eller en direkte lenke. Kalender per bord, automatiske bekreftelser og påminnelser. Ikke en eneste tapt gjest og ingen samtaler i rushtidene.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Vertinne administrerer reservasjoner fra et nettbrett ved restaurantens inngang",
  },

  scan: {
    heading: "Start bordreservasjon",
    headingAccent: "på 5 minutter.",
    sub: "Koble til kalenderen, legg til bord med bilder og kapasitet — gjester begynner å reservere samme dag.",
    cta: "Aktiver reservasjon",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Reservasjonsskjema",
      heading: "Gjester reserverer selv — etter dato, tid og antall personer.",
      body: "Gjesten åpner QR-menyen eller en direkte lenke, velger dato, tid og antall personer — og ser umiddelbart tilgjengelige bord, hver med bilde, beskrivelse (terrasse, ved vinduet, sofa ved baren) og kapasitet. Bekreftelsen sendes automatisk via e-post og WhatsApp.",
      bullets: [
        "Valg av bord etter bilde, beskrivelse og kapasitet.",
        "Automatisk bekreftelse og påminnelse en time før besøket.",
        "Minimale felter i skjemaet: navn, telefon, antall personer.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gjest reserverer et restaurantbord fra en telefon: dato, tid, antall personer og bordvelger" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Reservasjonskalender",
      heading: "Kalender etter dag og bord — alt med ett blikk.",
      body: "Administrasjonspanelet viser en reservasjonskalender delt opp etter bord, dag, uke og måned. Ledige tider, opptatte bord, bekreftede og ubekreftede reservasjoner på én skjerm. Fungerer på et nettbrett i salongen og en bærbar PC på kontoret.",
      bullets: [
        "Dag-, uke- og månedsvisninger.",
        "Oppdeling etter bord: hvem, når, hvor mange gjester.",
        "Flytt, kanseller eller bekreft en reservasjon med ett trykk fra telefonen.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Reservasjonskalender i IQ Rest administrasjonspanel på to nettbrett: daglig Gantt per bord og månedsvisning" },
    },
  ],

  faq: {
    sub: "Hva restauratører spør om bordreservasjon i IQ Rest. Finner du ikke spørsmålet ditt? Send oss en melding på WhatsApp.",
    items: [
      { q: "Kan jeg velge hvilke dager og timer reservasjon er tilgjengelig?", a: "Ja. Administrasjonspanelet lar deg sette åpningstider og tilgjengelige ukedager — systemet vil ikke vise utilgjengelige tider til gjester. Du kan stenge en spesifikk dato (firmaarrangement, privat reservasjon) eller midlertidig slå av hele kalenderen." },
      { q: "Kan jeg laste opp et bilde for hvert bord?", a: "Ja. Hvert bord kan ha et bilde, beskrivelse (terrasse, ved vinduet, sofa ved baren) og kapasitet. Gjesten ser nøyaktig bordet han reserverer og tar et informert valg — dette reduserer ikke-oppfylte forventninger." },
      { q: "Kan jeg deaktivere reservasjoner på spesifikke datoer?", a: "Ja. Kalenderen lar deg stenge spesifikke datoer (helligdager, private arrangementer, oppussing) eller hele ukedager. På disse datoene ser gjester en melding „reservasjon midlertidig utilgjengelig“." },
      { q: "Kan jeg tilpasse hvilke felter som samles inn fra gjesten?", a: "Ja. Standard sett: navn, telefon, e-post, antall personer. Du kan legge til tilpassede felter (anledning, allergier, spesielle forespørsler) eller fjerne unødvendige for å holde skjemaet så kort som mulig." },
      { q: "Kan jeg begrense antall gjester per bord?", a: "Ja. Hvert bord har en „kapasitet“ innstilling — systemet tillater ikke et bord for 2 å reserveres for 6. På større bord kan du sette et minimum slik at små grupper ikke tar „bordet for åtte“ fra større selskaper." },
      { q: "Hvor vanskelig er reservasjonsoppsettet?", a: "Det tar svært kort tid. Tre trinn: (1) legg til bord med navn, bilder og kapasitet, (2) aktiver reservasjonsmodus i innstillingene, (3) del lenken eller QR-koden med gjester. Full lansering på 5–10 minutter." },
      { q: "Kan jeg bruke reservasjonssystemet på mitt eget domene?", a: "Ja. Vi støtter et tilpasset domene med SSL-sertifikat: gjester reserverer på restaurantens adresse (f.eks. reservasjon.dinrestaurant.no). Vi hjelper med DNS-oppsett; prosessen tar 5–10 minutter." },
      { q: "Kan jeg konfigurere automatisk eller manuell bekreftelse?", a: "Ja, modus settes i innstillingene. Med automatisk bekreftelse mottar gjesten en bekreftelse umiddelbart etter innsending av skjemaet og reservasjonen anses som akseptert. Med manuell bekreftelse lander forespørselen i administrasjonspanelet med status „venter på bekreftelse“ — lederen gjennomgår og bekrefter eller avviser. Manuell modus er nyttig ved begrenset bordantall eller strenge gjestepolitikk." },
      { q: "Tar dere provisjon på reservasjoner?", a: "Nei. Bordreservasjon er fullt inkludert i Pro-abonnementet — ingen prosent på gjester, ingen gebyr per tid, ingen aggregatorprovisjoner. Fast månedlig gebyr og ubegrensede reservasjoner." },
    ],
  },
};
