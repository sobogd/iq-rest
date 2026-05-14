import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Flerspråklig restaurantmeny — 35 språk, ett trykk for å bytte",
    description:
      "Server internasjonale gjester på deres språk. Restaurantmeny på 35 språk med ett-trykks bytting. RTL-støtte for arabisk og persisk. 14 dagers gratis prøveperiode.",
    canonical: "https://iq-rest.com/no/multilingual",
    ogLocale: "no_NO",
    ogTitle: "Flerspråklig restaurantmeny-nettside — 35 språk innebygd",
    ogDescription:
      "Turister skanner, ser menyen din på sitt språk automatisk. 35 språk, RTL-støtte, auto-detektering fra telefoninnstillinger. 14 dagers gratis prøveperiode.",
  },

  hero: {
    title: "Menyen din snakker hver turists språk.",
    subtitle:
      "En flerspråklig restaurantmeny burde ikke være et prosjekt. Med IQ Rest auto-detekterer QR-menyen telefonspråket til hver gjest og serverer den på ett av 35 språk — inkludert arabisk og persisk med riktig høyre-mot-venstre-gjengivelse.",
    trustLine: "500+ restauranter i 30+ land",
  },

  seo: {
    description:
      "Bygg menyen én gang, server den på 35 språk. IQ Rest auto-detekterer telefonspråket til hver gjest og gjengir menyen på deres tungemål — ingen flagg-trykking, ingen språkbarriere, ingen pinlige Google Translate-øyeblikk. Fra spansk og tysk til japansk, arabisk og mandarin — gjestene ser restauranten din slik den skulle ses.",
    fullDescription:
      "De fleste «flerspråklige» menyer er PDF-er av ødelagt Google Translate, trykket én gang og aldri oppdatert. IQ Rests flerspråklige restaurantnettside er ekte i18n: hvert språk har sin egen ordentlig oversatte tekst, sin egen URL-slug, sine egne metatagger for Google å indeksere, og sin egen ruting i menyappen.\n\nNår en turist med fransk iPhone skanner QR-koden din, åpnes menyen automatisk på fransk — ingen trykk, ingen avgjørelser. De kan bytte til et annet språk med språkvelgeren øverst, men de fleste trenger det aldri. Det samme gjelder kostholdsmerker («vegan» blir «vegano» / «vegetarisch» / «ヴィーガン» avhengig av språk), feilmeldinger, «legg til i kurv»-knapper, kvitteringer. Hver UI-streng på 35 språk, ikke bare menyinnhold.\n\nFor RTL-språk — arabisk og persisk — snur hele oppsettet seg riktig: tekst justeres til høyre, menyer åpnes fra høyre, priser vises etter rettnavnet som forventet. Dette er ikke en CSS-hack, det er full RTL-støtte som får arabiske og persiske gjester til å føle seg betjent, ikke ettermontert.",
    benefitsHeading: "Hvorfor en ekte flerspråklig meny slår en PDF-oversettelse",
    benefits: [
      "35 språk med ordentlig UI-oversettelse — ikke bare menyelementer",
      "Auto-detekterer gjestens telefonspråk — ingen trykk kreves",
      "Manuell språkvelger for gjester som foretrekker et annet språk",
      "Full RTL-støtte for arabisk og persisk — ikke en CSS-hack",
      "Hvert språk har sin egen URL — Google indekserer 35 versjoner av nettsiden",
      "Endre rettbeskrivelse på morsmålet — oversettelser følger med",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Alle 35 språk inkludert.",
    sub: "Flerspråklig meny, AI-oversettelse, QR-bestilling og reservasjoner — alt i én fast pris. Ingen avgift per språk, ingen ekstra for RTL.",
  },

  faq: {
    sub: "Alt restauranteiere lurer på om en flerspråklig meny. Ser du ikke ditt? Send oss en melding på WhatsApp — ekte mennesker svarer.",
    items: [
      {
        q: "Hvor mange språk støtter menyen?",
        a: "35 språk inkludert engelsk, spansk, tysk, fransk, italiensk, portugisisk, nederlandsk, polsk, tsjekkisk, slovakisk, ungarsk, rumensk, bulgarsk, kroatisk, serbisk, slovensk, gresk, tyrkisk, russisk, ukrainsk, litauisk, latvisk, estisk, finsk, svensk, norsk, dansk, islandsk, katalansk, irsk-gælisk, arabisk, persisk, japansk, koreansk og kinesisk. UI-strenger er profesjonelt oversatt for hvert språk.",
      },
      {
        q: "Hvordan bytter kunder språk?",
        a: "To måter: automatisk (menyen åpnes på telefonens språk) og manuelt (en språkvelger øverst i menyen). 80 % av turister rører aldri den manuelle velgeren — auto-detektering bare fungerer fordi telefonen allerede vet språket deres.",
      },
      {
        q: "Støtter dere høyre-mot-venstre-språk som arabisk og persisk?",
        a: "Ja, med fullt RTL-oppsett. Hele menyen snur seg: tekst justeres til høyre, kolonner reverseres, navigasjons­skuffer åpnes fra høyre side, priser vises etter rettnavn. Dette er ekte RTL-støtte implementert på layoutnivå, ikke bare CSS-direction-triks.",
      },
      {
        q: "Vil Google indeksere menyen min på alle 35 språk?",
        a: "Ja. Hvert språk har sin egen URL-slug (f.eks. /es, /fr, /de), riktige hreflang-tagger, lokaliserte metatitler og beskrivelser, og språkspesifikke strukturerte data. Google behandler hvert språk som en egen side for den lokalen, noe som betyr at turister som søker etter restauranten din på sitt språk har større sannsynlighet for å finne deg.",
      },
      {
        q: "Hva om jeg ikke vil ha alle 35 språk — bare hovedmarkedene mine?",
        a: "Velg hvilke språk som er aktive. Er du en strandrestaurant i Hellas som hovedsakelig betjener britiske, tyske og italienske turister, aktiver bare engelsk, tysk og italiensk — resten vises ikke i språkvelgeren eller auto-deteksjon. Du kan alltid aktivere flere senere når turistmiksen din endrer seg.",
      },
    ],
  },

  finalCta: {
    heading: "Hver turists telefonspråk.",
    headingAccent: "Allerede støttet.",
    sub: "Server en flerspråklig meny på 35 språk, inkludert RTL arabisk og persisk. 14 dagers gratis prøveperiode, uten kredittkort, ingen avgift per språk.",
  },
};
