import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurant­reservasjonssystem — bordbestilling 24/7, ingen telefon­samtaler",
    description:
      "Ta imot restaurant­bordbestillinger 24/7 fra QR-menyen og nettsiden. White-label bookingwidget, e-postpåminnelser, færre no-shows. 14 dagers gratis prøveperiode.",
    canonical: "https://iq-rest.com/no/reservations",
    ogLocale: "no_NO",
    ogTitle: "Restaurantreservasjoner — 24/7 bordbestillingssystem for restauranter",
    ogDescription:
      "Slutt å gå glipp av bestillinger mens du lager mat. Gjester bestiller 24/7 fra QR-menyen, får e-postpåminnelser, og du kutter no-shows. 14 dagers gratis prøveperiode.",
  },

  hero: {
    title: "Slutt å gå glipp av bestillinger mens du lager mat.",
    subtitle:
      "Ta imot restaurant­bordbestillinger 24/7 — direkte fra QR-menyen, nettsiden og Instagram. Gjester velger dato, tid og antall personer, du bekrefter med ett trykk, e-postpåminnelser sendes automatisk. Færre telefonsamtaler, færre no-shows, flere gjester per kveld.",
    trustLine: "4,9 · 500+ restauranter i 30+ land",
  },

  seo: {
    description:
      "Et komplett restaurant­reservasjonssystem bygget inn i QR-menyen din. Gjester bestiller bord fra menyen, nettsiden, Instagram-bio-lenken eller en Google Maps-knapp — når som helst, dag eller natt. Du ser nye bestillinger i sanntid, bekrefter eller avslår med ett trykk, og systemet sender e-postpåminnelser som drastisk reduserer no-shows. Ingen OpenTable-kutt, ingen provisjon per gjest, ingen kontrakt.",
    fullDescription:
      "Telefonreservasjoner er på vei ut. Turister vil ikke ringe (annet landskode, språkbarriere), millennials vil ikke ringe (tekstgenerasjon), og du mister halvparten av bestillingene under service når ingen tar telefonen. IQ Rest-reservasjoner lever der gjestene dine allerede er: på menyen, i nettleseren på telefonen, på Instagram-bio-lenken.\n\nBookingflyten er to skjermer — velg dato og antall personer, legg igjen navn og telefon, valgfritt med en notat («bursdag», «allergi: nøtter», «barnestol takk»). Du mottar bestillingen umiddelbart med ett-trykks bekreft/avslå. Bekreftede gjester får automatisk e-postpåminnelse 24 timer før, som alene reduserer no-shows med ~30 %. Du kan også sette maks antall gjester per slot, blokkerte datoer, og hvilke bord som er bestillbare versus kun walk-in.\n\nI motsetning til OpenTable eller TheFork er det ingen provisjon per gjest, ingen separat app å laste ned, og ingen tredjepart mellom deg og gjesten. Bestillingen er din, dataene er dine, og systemet er en del av abonnementet ditt — ikke en avgift per reservasjon.",
    benefitsHeading: "Hvorfor restauranter dropper OpenTable for IQ Rest-reservasjoner",
    benefits: [
      "24/7-bestillinger fra QR-meny, nettside, Instagram, Google Maps-knapp",
      "Ingen provisjon per gjest — fast abonnement, behold 100 % av inntektene",
      "Automatiske e-postpåminnelser kutter no-shows med ~30 % i snitt",
      "Ett-trykks bekreft / avslå fra telefonen, ingen venterom",
      "Maks gjester per slot, blokkerte datoer, regler per bord",
      "Spesialønsker (allergier, bursdager) fanges rent opp med hver bestilling",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Ubegrenset antall bestillinger.",
    sub: "Reservasjoner, QR-meny, nettbestilling og AI-oversettelse — alt i én fast pris. Ingen avgift per gjest, ingen provisjon, ingen kontrakt.",
  },

  faq: {
    sub: "Alt restauranteiere lurer på om nettreservasjoner. Ser du ikke ditt? Send oss en melding på WhatsApp — ekte mennesker svarer.",
    items: [
      {
        q: "Tar dere provisjon per bestilling som OpenTable eller TheFork?",
        a: "Null. Reservasjoner er en del av ditt faste månedsabonnement — bestill 10 gjester om dagen eller 1000, prisen er identisk. Ingen avgift per gjest, ingen avgift per reservasjon, ingen del av inntektene dine. Sammenlignet med OpenTables 1–2,50 € per gjest sparer en restaurant med 50 gjester om dagen 1500–3750 € i måneden.",
      },
      {
        q: "Hvordan bestiller gjester — må de laste ned en app?",
        a: "Ingen app. De skanner QR-en eller klikker på bookinglenken — dato, tid, antall personer, navn, telefon, valgfri notat. Ferdig. Hele flyten er under 30 sekunder og fungerer i alle nettlesere. Du kan også bygge inn bookingskjemaet direkte på nettsiden eller dele en ren booking-URL på Instagram.",
      },
      {
        q: "Kan jeg bekrefte bestillinger manuelt eller bekreftes de automatisk?",
        a: "Begge moduser — ditt valg per slot eller per dag. Auto-bekreft hvis du stoler på tilgjengeligheten din og vil se responsiv ut 24/7. Manuell bekreft hvis du vil sjekke bestillinger (travle helger, spesielle arrangementer). Du mottar bestillingen umiddelbart og bekrefter med ett trykk fra telefonen.",
      },
      {
        q: "Hvordan håndterer systemet no-shows?",
        a: "Automatiske e-postpåminnelser sendes 24 timer og (valgfritt) 2 timer før bestillingen — dette alene reduserer no-shows med ~30 % sammenlignet med samtaler eller systemer uten påminnelser. Du kan også kreve telefonnummer, merke gjester som «no-show» i dashbordet, og over tid flagger systemet gjengangere.",
      },
      {
        q: "Kan jeg begrense hvor mange gjester jeg tar imot per kveld?",
        a: "Ja. Sett maks gjester per tidsslot, maks gjester per dag og blokkerte datoer (stengninger, private arrangementer). Du kan til og med merke spesifikke bord som «bestillbare» eller «kun walk-in», slik at de beste vindusbordene står klare for tilfeldigheter. Turister og lokale bestiller fra samme system uten å gå utenom planløsningen din.",
      },
    ],
  },

  finalCta: {
    heading: "Bestillinger mens du lager mat.",
    headingAccent: "Påminnelser så de møter opp.",
    sub: "Ta imot reservasjoner 24/7 fra QR-menyen, nettsiden og Instagram. 14 dagers gratis prøveperiode, uten kredittkort, ingen provisjon per gjest.",
  },
};
