import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurantmeny-analyse — QR-skanninger, topp­retter, turistspråk",
    description:
      "Se nøyaktig hvordan gjester bruker QR-menyen din. Daglige skanninger, mest sette retter, språkpreferanser, travleste timer. Datadrevne avgjørelser for restauranten din.",
    canonical: "https://iq-rest.com/no/analytics",
    ogLocale: "no_NO",
    ogTitle: "Restaurant­analyse — spor QR-meny-skanninger, retter og språk",
    ogDescription:
      "Vit hvilke retter gjestene faktisk ser på, når travleste timer er, og hvilken turistnasjonalitet som er i spisesalen i kveld. 14 dagers gratis prøveperiode.",
  },

  hero: {
    title: "Slutt å gjette. Vit hva gjestene faktisk gjør.",
    subtitle:
      "Se restaurantmeny-analyse i sanntid — QR-skanninger per time, rettene gjestene dveler ved, språkene turistene bruker, den treigeste hverdagen — og bruk dataene til å trykke færre menyer, planlegge smartere, dytte de rette spesialene.",
    trustLine: "4,9 · 500+ restauranter i 30+ land",
  },

  seo: {
    description:
      "Restaurantanalyse som ikke krever et datateam. IQ Rest sporer hver skanning, visning, språkbytte og bestilling fra QR-menyen din, og henter frem mønstrene som betyr noe: mest sette retter, travleste skanningstimer, travleste dag i uken, språkfordeling av turistmengden. Ta datadrevne avgjørelser uten å åpne et regneark.",
    fullDescription:
      "De fleste restauranter går på instinkt — «vi føler at tirsdager er trege», «jeg tror pastaen selger godt». Instinkt er bra, men data er bedre. IQ Rest sporer hver interaksjon med QR-menyen din, så du ikke trenger å gjette: hvor mange ganger QR-en ble skannet i dag, hvilke retter gjester så på lengst, hvilke retter de la i kurven, men ikke bestilte, hvilket språk turistene brukte.\n\nAnalyse-dashbordet henter frem svarene i tre visninger: i dag (livesokanninger, gjeldende bestillinger, hva som blir bestilt akkurat nå), denne uken (topp 10 retter, travle timer, språkfordeling, no-shows på reservasjoner), og trender (måned-over-måned-vekst, sesongvariasjoner, hverdagsmønstre). Du kan bore i en hvilken som helst rett for å se hvor ofte den vises vs bestilles (en rett vist 200 ganger, men bestilt 5 ganger har et tekst- eller bildeproblem), eller en hvilken som helst språk for å se hvilken turistmiks du faktisk betjener.\n\nMålet er beslutninger, ikke dashbord: «neste tirsdag er historisk treig → kjør en happy hour push-varsling», «italienske turister bestiller pasta 3x mer enn lokale → sett pasta først når språk=it», «denne retten har 90 % visning men 5 % bestilling → forbedre bildet». Ekte endringer, ekte inntekter, ingen MBA kreves.",
    benefitsHeading: "Hvorfor restauranter elsker IQ Rest-analyse fremfor Google Analytics",
    benefits: [
      "Live QR-skanningsteller — se kvelden fylles opp i sanntid",
      "Mest sette og mest bestilte retter — oppdag hva som fungerer og hva som ikke gjør det",
      "Språkfordeling — vit hvilke turister som er i spisesalen din",
      "Travleste timer og hverdagsmønstre — planlegg smartere, prep smartere",
      "Visning-til-bestilling-konvertering per rett — fiks dårlige bilder og svake beskrivelser",
      "Reservasjonsanalyse — bookingkilder, no-show-rate, miks av selskaps­størrelser",
    ],
  },

  pricing: {
    heading: "Én plan.",
    headingAccent: "Full analyse inkludert.",
    sub: "Restaurantanalyse, QR-bestilling, AI-oversettelse og reservasjoner — alt i én fast pris. Ingen premium-tier for data, noen gang.",
  },

  faq: {
    sub: "Alt restauranteiere lurer på om meny­analyse. Ser du ikke ditt? Send oss en melding på WhatsApp — ekte mennesker svarer.",
    items: [
      {
        q: "Hva kan jeg faktisk se i analyse-dashbordet?",
        a: "Live QR-skanninger (i dag, denne uken, denne måneden), mest sette retter, mest bestilte retter, visning-til-bestilling-konvertering per rett, språkfordeling av gjester, travleste timer per ukedag, gjennomsnittlig bestillingsverdi, travleste bord, no-show-rate for reservasjoner, og trender over tid. Alt på ett dashbord, ingen oppsett kreves.",
      },
      {
        q: "Hvordan bruker jeg dette til faktisk å øke inntektene?",
        a: "Tre mønstre fungerer for de fleste restauranter: (1) omorganiser menyen så at de best konverterende rettene vises først; (2) fiks bildet eller beskrivelsen på retter med høy visning men lav bestilling; (3) dytt en happy-hour eller spesial på historisk trege ukedager/timer. Vi har sett restauranter øke ukentlige inntekter med 15–30 % bare fra disse tre endringene.",
      },
      {
        q: "Er dette anonymt eller sporer dere enkeltpersoner?",
        a: "Anonymt og aggregert. Vi sporer menyvisninger og bestillinger per økt, ikke per identifiserbar bruker. Ingen e-poster, ingen telefonnumre, ingen IP-adresser lagret langsiktig. Dashbordet viser deg mønstre («200 skanninger på fredag»), ikke folk. Fullt GDPR-kompatibel ved design.",
      },
      {
        q: "Kan jeg eksportere dataene?",
        a: "Ja. Eksporter en hvilken som helst visning som CSV (topp­retter, daglige skanninger, time­fordeling, osv.) og åpne i Excel eller Google Sheets. Nyttig for deling med investorer, regnskapsførere eller for å kombinere med POS-data.",
      },
      {
        q: "Trenger jeg teknisk oppsett for å få analyse?",
        a: "Null. Analyse er på som standard i det øyeblikket QR-menyen er live — hver skanning, visning og bestilling spores automatisk. Dashbordet er en del av standard­abonnementet, ikke en oppsalg, og du vil se nyttige data innen den første dagen med gjester som skanner.",
      },
    ],
  },

  finalCta: {
    heading: "Slutt å gjette.",
    headingAccent: "Begynn å måle.",
    sub: "Live QR-skanningsanalyse, topp­retter, travleste timer, turistspråkfordeling. 14 dagers gratis prøveperiode, uten kredittkort.",
  },
};
