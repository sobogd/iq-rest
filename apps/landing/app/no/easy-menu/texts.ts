import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Enkel restaurantmeny-editor — dra-og-slipp, live på sekunder",
    description:
      "Legg til kategorier, retter og bilder med dra-og-slipp-enkelhet. Endringer går live umiddelbart. Den enkleste restaurantmeny-editoren — ingen designferdigheter trengs.",
    canonical: "https://iq-rest.com/no/easy-menu",
    ogLocale: "no_NO",
    ogTitle: "Dra-og-slipp menyeditor — den enkleste måten å bygge en restaurantmeny på",
    ogDescription:
      "Lag en vakker restaurantmeny på minutter. Dra for å omorganisere, trykk for å legge til en rett, ta et bilde. Live for gjester på sekunder — ingen designverktøy trengs.",
  },

  hero: {
    title: "Bygg menyen på minutter. Rediger den for alltid.",
    subtitle:
      "Trykk for å legge til en kategori, trykk for å legge til en rett, dra for å omorganisere, ta et bilde med telefonen. Den enkleste restaurantmeny-editoren på markedet — og hver endring går live for gjester på sekunder.",
    trustLine: "4,9 · 500+ restauranter i 30+ land",
  },

  seo: {
    description:
      "Å bygge en restaurantmeny burde ikke kreve en designer, en utvikler eller et CMS-kurs. IQ Rests menyeditor er det motsatte av WordPress: trykk for å legge til, dra for å omorganisere, sveip for å slette. Kategorier inneholder retter, retter inneholder beskrivelser, priser, bilder og tilbehør — og gjester skanner QR-en for å se akkurat det du bygde, på sitt språk, på enhver telefon.",
    fullDescription:
      "De fleste restaurantmeny-byggere er enten for enkle (Google Sheets utkledd) eller for kompliserte (full CMS for ingeniører). IQ Rests editor er bygget for restauranteiere som ikke har tid til å lære programvare — hver handling er ett eller to trykk, og resultatet ser ut som en designer laget det.\n\nLegg til en kategori kalt «Forretter», dra den over «Hovedretter». Trykk «legg til rett», skriv «Bruschetta med kirsebærtomater», sett 8,50 €, ta et bilde. Trenger et veganmerke? Ett trykk. Allergen for nøtter? Ett trykk. Annen pris for lunsjmenyen? Bytt meny, sett en annen pris for samme rett. Utsolgt i kveld? Langtrykk, merk som utsolgt — den blir grå i menyen umiddelbart.\n\nSamme enkelhet gjelder for bestillingskategorier: dra retter mellom kategorier, omorganiser kategorier, skjul en hel seksjon under et privat arrangement uten å slette noe. Feil? Langtrykk, gjenopprett. Hele editoren ble designet med antakelsen om at du holder telefonen med én hånd mens du gjør noe annet med den andre — fordi det er slik restauranteiere faktisk jobber.",
    benefitsHeading: "Hvorfor IQ Rests menyeditor er raskere enn skrivingen din",
    benefits: [
      "Dra-og-slipp omorganisering for kategorier og retter",
      "Ta-og-last-opp bilder direkte fra telefonkameraet",
      "Allergener, kostholdsmerker, tilbehør og notater — alt med ett trykk",
      "Merk utsolgte retter umiddelbart uten å slette dem",
      "Multi-meny-støtte: lunsjmeny, middagsmeny, drikkemeny, helgemeny",
      "Hver endring live for gjester på sekunder — ingen publiseringssteg",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Ubegrenset antall menyendringer.",
    sub: "Enkel menyeditor pluss QR-bestilling, AI-oversettelse og reservasjoner — alt i én fast pris. Rediger så mye du vil, ingen grenser.",
  },

  faq: {
    sub: "Alt restauranteiere lurer på om menyeditoren. Ser du ikke ditt? Send oss en melding på WhatsApp — ekte mennesker svarer.",
    items: [
      {
        q: "Trenger jeg design- eller tekniske ferdigheter for å bygge menyen?",
        a: "Null. Hvis du kan bruke Instagram, kan du bygge en meny i IQ Rest. Trykk «legg til kategori», skriv et navn. Trykk «legg til rett», skriv navn og pris, ta et bilde. Det er ingen fontvelger, ingen fargehjul, ingen CSS — menyen din arver et rent design som allerede ser profesjonelt ut, og du kan endre aksentfarger senere med ett klikk.",
      },
      {
        q: "Hvor lang tid tar det å bygge min første meny?",
        a: "Omtrent 1–3 minutter per rett hvis du har bilder på telefonen. En meny med 30 retter tar 30–90 minutter første gang. Etter det tar det 30 sekunder å legge til en ny rett eller dagens spesial.",
      },
      {
        q: "Kan jeg ha en separat lunsjmeny og middagsmeny?",
        a: "Ja — multi-meny-støtte er innebygd. Lag så mange menyer du vil (lunsj, middag, brunsj, drikke, barnemeny, helgespesialer), tildel ulike åpningstider til hver, og riktig vises automatisk basert på tid på dagen. Du kan også gjenbruke samme rett på tvers av menyer med ulike priser (f.eks. 12 € til middag, 8 € til lunsj).",
      },
      {
        q: "Hva med allergener, veganmerker og kostholdsinfo?",
        a: "Innebygd. Hver rett har vekslebare merker for vegan, vegetar, glutenfri, laktosefri, pluss allergenflagg for nøtter, egg, skalldyr, osv. Gjester kan filtrere menyen for å bare vise retter de kan spise — øker komfort og fullføring av bestilling for gjester med kostholds­begrensninger.",
      },
      {
        q: "Kan jeg midlertidig skjule en rett uten å slette den?",
        a: "Ja. Langtrykk en rett og velg «merk som utsolgt» — den forblir i menyen, men blir grå for gjester med en «for tiden utilgjengelig»-etikett. Ett trykk for å hente den tilbake når lager fylles på. Det samme gjelder hele kategorier — skjul hele lunsjmenyen under middagsservice uten å miste noe.",
      },
    ],
  },

  finalCta: {
    heading: "Trykk. Skriv. Ferdig.",
    headingAccent: "Live på sekunder.",
    sub: "Den enkleste restaurantmeny-editoren telefonen din noensinne har møtt. 14 dagers gratis prøveperiode, uten kredittkort, ingen designferdigheter kreves.",
  },
};
