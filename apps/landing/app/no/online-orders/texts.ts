import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "QR-meny nettbestilling — restaurantbestillinger uten provisjon",
    description:
      "Ta direkte bestillinger fra QR-menyen. Null provisjon, ingen Wolt- eller Uber Eats-andel. Gjestene skanner, bestiller, betaler — rett til deg. 14 dagers gratis prøveperiode.",
    canonical: "https://iq-rest.com/no/online-orders",
    ogLocale: "no_NO",
    ogTitle: "Nettbestilling uten provisjon — direkte bestillinger fra QR-menyen",
    ogDescription:
      "Bytt ut 30 % leveringsappsprovisjon med direkte bestillinger. Gjestene skanner QR, bestiller, betaler — hver krone går til deg. 14 dagers gratis prøveperiode, ingen kort.",
  },

  hero: {
    title: "Direkte bestillinger. Null provisjon. Rett inn på kjøkkenet.",
    subtitle:
      "Slutt å betale 30 % til Uber Eats, Glovo og Wolt. Med IQ Rest skanner gjestene QR-koden, bygger bestillingen på mobilen, og kvitteringen lander på kjøkkenet ditt — hver krone blir hos deg.",
    trustLine: "4,9 · 500+ restauranter i 30+ land",
  },

  seo: {
    description:
      "Gjør QR-menyen til et fullverdig nettbestillingssystem uten å gi fra deg 30 % til leveringsappene. Gjestene skanner QR-koden, blar gjennom menyen på sitt eget språk, lager en handlekurv, sender bestillingen — og du mottar den med bordnummer, umiddelbart. Ingen apper å laste ned, ingen provisjon, ingen tredjepart mellom deg og gjesten.",
    fullDescription:
      "De fleste restauranter taper penger før maten i det hele tatt forlater kjøkkenet — Uber Eats tar 30 %, Glovo tar 30 %, Wolt tar 30 %. Nettbestilling gjennom IQ Rest fungerer helt annerledes. Bestillingen går rett fra gjestens mobil til dashbordet ditt, og hele marginen er din.\n\nBestillingsopplevelsen er bygget spesifikt for bruk i restaurant: gjestene velger bord, blar gjennom menyen, legger varer i handlekurven, legger igjen en kommentar til kjøkkenet og sender. Du ser nye bestillinger i sanntid på mobilen eller kjøkkenskjermen, med bordnummer, varer, tilvalg og notater. Marker retter som klare — bordet ser statusen, og du sparer servitørene for titalls turer per skift.\n\nDet fungerer også for takeaway og henting: gjestene skanner QR-klistremerket ved døra, legger inn en bestilling og betaler — du trenger ingen egen bestillingsapp, ingen separat nettside og ingen Stripe-integrasjonsprosjekt.",
    benefitsHeading: "Hvorfor direkte bestilling via IQ Rest slår leveringsappene",
    benefits: [
      "Null provisjon på hver bestilling — behold 100 % av inntekten",
      "Bestillinger flyr til dashbordet ditt med bordnummer i sanntid",
      "Ingen app for gjestene — de skanner QR og bestiller i nettleseren",
      "Tilvalg, kommentarer, dietter — alt fanges opp ryddig",
      "Fungerer for spise inne, takeaway og henting — én meny, tre flyt",
      "Innebygde mersalgshint øker gjennomsnittlig bestillingsverdi",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Null provisjon.",
    sub: "Direkte bestilling, QR-meny, restaurantnettsted og reservasjoner — alt inkludert. Ingen ordregebyr, ingen Stripe-integrasjonsprosjekt.",
  },

  faq: {
    sub: "Alt restauranteiere spør om nettbestilling. Finner du ikke ditt? Send oss en melding på WhatsApp — ekte mennesker svarer.",
    items: [
      {
        q: "Tar dere provisjon på bestillingene?",
        a: "Null. Hver bestilling fra QR-menyen går rett til deg — ingen andel til oss, ingen Glovo- eller Uber Eats-gebyrer. Ett fast månedsabonnement, det er alt. Regnestykket er enkelt: hvis du tar inn 50 000 kr/mnd via leveringsapper, taper du 15 000. Bytt til direkte bestilling, så blir de 15 000 i lomma.",
      },
      {
        q: "Hvordan legger gjestene inn en bestilling — trenger de en app?",
        a: "Ingen app. Gjestene skanner QR-koden med mobilkameraet, menyen åpnes i nettleseren, de velger bord, blar, legger i kurv og sender. Hele flyten er to trykk etter skanningen. Ingen søk i App Store, ingen registrering, ingen friksjon.",
      },
      {
        q: "Hvordan mottar jeg bestillinger på kjøkkenet?",
        a: "Bestillinger dukker opp umiddelbart i dashbordet, med bordnummer, varer, tilvalg og eventuelle notater. Se dem på mobilen, på et nettbrett ved passet eller på en kjøkkenskjerm. Marker retter som klare — bordet ser statusen, færre 'kommer maten snart?' og raskere omløp.",
      },
      {
        q: "Kan gjestene betale via QR-menyen, eller bare ved bordet?",
        a: "Begge. De kan sende bestillingen og betale kontant eller med kort ved bordet på klassisk vis, eller betale online via Stripe rett gjennom menyen. Du bestemmer hva som er aktivert. Online betaling sikres av Stripe — IQ Rest holder aldri pengene, de går rett til Stripe-kontoen din.",
      },
      {
        q: "Fungerer det for takeaway og henting, ikke bare spise inne?",
        a: "Ja. Sett en QR-klistremerke ved inngangen for takeaway, eller del menylenken på Instagram og WhatsApp. Gjestene velger 'henting', bestiller, betaler — du klargjør, de henter. Samme system, tre forskjellige bestillingsflyt: spise inne, takeaway, henting.",
      },
    ],
  },

  finalCta: {
    heading: "Slutt å fôre leveringsappene.",
    headingAccent: "Behold 100 %.",
    sub: "Bytt ut 30 % provisjon med en fast månedspris. 14 dagers gratis prøveperiode. Ingen kredittkort. Avbryt når som helst.",
  },
};
