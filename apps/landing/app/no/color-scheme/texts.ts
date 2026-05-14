import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Merket restaurantmeny — tilpasset fargeskjema og tema",
    description:
      "Match restaurantmerket ditt med tilpassede aksentfarger. Lyse og mørke temaer veksler automatisk med gjestens telefon. Merket QR-meny på sekunder. 14 dagers prøveperiode.",
    canonical: "https://iq-rest.com/no/color-scheme",
    ogLocale: "no_NO",
    ogTitle: "Tilpasset fargeskjema — merket restaurantmeny på sekunder",
    ogDescription:
      "Velg aksentfargen din, få en merket restaurantmeny. Auto lys/mørk-modus tilpasser seg hver gjests telefon. Ingen designverktøy trengs.",
  },

  hero: {
    title: "Din meny. Dine farger. Ditt merke.",
    subtitle:
      "Velg en aksentfarge, slipp inn logoen din, og QR-menyen din ser umiddelbart ut som et ekte merke i stedet for en mal. Lyse og mørke temaer veksler automatisk med hver gjests telefon — menyen din ser alltid intensjonell ut.",
    trustLine: "500+ restauranter i 30+ land",
  },

  seo: {
    description:
      "Et tilpasset fargeskjema er forskjellen mellom en generisk QR-meny og en merket restaurantopplevelse. IQ Rest lar deg velge nøyaktig aksentfarge (eller lime inn en hex-kode fra merkeretningslinjene dine), slippe inn logoen, og hele menyen — knapper, lenker, framhevinger, kategorimerker — adopterer merkefargen din på sekunder.",
    fullDescription:
      "De fleste QR-meny-byggere gir deg et fast fargeskjema: blå eller rød, ta det eller la det. IQ Rest behandler merket ditt som om det betyr noe — velg en aksentfarge fra fargevelgeren eller lim inn nøyaktig hex-kode fra merkeretningslinjene dine (samme oransje som skiltet ditt, samme grønne som logoen). Hver aksent på menyen — primærknapper, lenker, kategori­framhevinger, aktiv tilstand i språkvelgeren — adopterer den fargen umiddelbart.\n\nLys og mørk modus håndteres automatisk. Når gjestens telefon er i mørk modus (de fleste telefoner ved middag), vises menyen i mørk modus med aksentfargen din punchet opp. Når de er ute i sterkt sollys i lys modus, tilpasser menyen seg. Du velger ikke lys eller mørk — du velger en merkefarge, og menyen gjør det riktige på hver enhet.\n\nLogoen din sitter øverst på menyen, på QR-klistre­merke-utskrifts­malen, på bestillings­kvitteringen og i reservasjons­bekreftelses-e-posten. Hvert gjeste­kontaktpunkt føles som det samme merket fordi det er det samme merket. Ingen designer kreves, ingen Photoshop-økt, ingen dyr «restaurant­merke­pakke» — bare en fargevelger og logo­opplasting.",
    benefitsHeading: "Hvorfor et merket fargeskjema konverterer bedre enn et standardtema",
    benefits: [
      "Velg en hvilken som helst aksentfarge — fargevelger eller hex-kode",
      "Auto lys/mørk-modus som tilpasser seg hver gjests telefon",
      "Logo­plassering på meny, QR-klistre­merke, kvitteringer og e-poster",
      "Merket utseende fra første minutt — ingen Photoshop eller designer kreves",
      "Bytt farger når som helst for sesong­kampanjer (Valentin-rød, jule-grønn)",
      "Farge forblir tilgjengelig — kontrastforhold justeres automatisk for lesbarhet",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Dine merkefarger.",
    sub: "Tilpasset fargeskjema pluss QR-meny, nettbestilling, AI-oversettelse og reservasjoner — alt i én fast pris. Branding uten designer.",
  },

  faq: {
    sub: "Alt restauranteiere lurer på om branding av menyen. Ser du ikke ditt? Send oss en melding på WhatsApp — ekte mennesker svarer.",
    items: [
      {
        q: "Kan jeg matche min nøyaktige merkefarge fra logoen eller skiltet?",
        a: "Ja — lim inn nøyaktig hex-kode (f.eks. #C24A2D) og menyen bruker akkurat den fargen for hver aksent. Vi auto-genererer en mørkere nyanse for hover-tilstander og en lysere nyanse for bakgrunner, så en enkelt merkefarge får en full UI-palett uten at du gjør noe.",
      },
      {
        q: "Støtter menyen lys og mørk modus?",
        a: "Ja, automatisk. Menyen oppdager hver gjests telefontema og veksler mellom lys og mørk modus i sanntid. Aksentfargen din forblir den samme; det omkringliggende UI-et inverteres. De fleste restauranter setter aldri lys vs mørk — de velger en farge og lar menyen tilpasse seg.",
      },
      {
        q: "Kan jeg endre fargeskjemaet senere?",
        a: "Når som helst. Åpne designinnstillingene, velg en ny farge, lagre. Hver side på QR-menyen, reservasjons­flyten og bestillings-UI-et oppdateres innen sekunder. Nyttig for sesong­kampanjer (rødt for Valentin, grønt for jul, gull for nyttår) — bytt for en uke, bytt tilbake.",
      },
      {
        q: "Hvor vises logoen min?",
        a: "Øverst på QR-menyen (ved siden av restaurantnavnet), på QR-kode-klistre­merke-utskrifts­malen (slik at klistre­merket på bordene matcher merket ditt), på bestillings­bekreftelses­kvitteringer og i reservasjons­bekreftelses-e-poster. Last den opp én gang i PNG eller SVG, så brukes den overalt automatisk.",
      },
      {
        q: "Hva om merkefargen min er vanskelig å lese mot menybakgrunnen?",
        a: "Systemet sjekker kontrast automatisk og mørkner eller lysner fargen din skånsomt for tekst­bruk (slik at en blek gul merkefarge ikke vises som uleselig tekst), samtidig som den nøyaktige fargen beholdes for aksenter som knapper og framhevinger. Du trenger ikke tenke på WCAG — menyen gjør det for deg.",
      },
    ],
  },

  finalCta: {
    heading: "Velg en farge.",
    headingAccent: "Se ut som et ekte merke.",
    sub: "Tilpasset fargeskjema, merkede kvitteringer, auto lys/mørk-modus. 14 dagers gratis prøveperiode, ingen designer, uten kredittkort.",
  },
};
