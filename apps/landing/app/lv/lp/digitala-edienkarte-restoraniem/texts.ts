import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /lv, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /lv page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "No 6,90 €/mēn · 14 dienas bez maksas · Atceltu jebkurā brīdī",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitālā ēdienkarte restorāniem",
    sub: "500+ restorāni 30+ valstīs apkalpo vairāk galdiņu, pārdod vairāk tūristiem un atsakās no piegādes komisijas. Tiešsaistē 5 minūtēs — 14 dienas bez maksas.",
    verticals: ["Tiešsaistes pasūtījumi", "Rezervācijas", "AI tulkojums", "Ēdienkartes skeneris", "Alergēni", "Premium dizains", "Analītika"],
    dynamicHeadlines: [],
    headlinePrefix: "Digitālā ēdienkarte ",
    accentWord: "restorāniem",
    accentWordRotation: ["restorāniem", "kafejnīcām", "bāriem", "picērijām", "bistro", "krodziņiem"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Mēs ar sievu atvērām kafejnīcu un nedēļām meklējām digitālo ēdienkarti restorāniem, kas tiek galā ar galdu pasūtījumiem un rezervācijām, neesot neveikla vai neglīta —",
    quoteAccent: "tāpēc uzbūvējām digitālo ēdienkarti, kādu paši gribējām.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "Kas ir digitālā ēdienkarte restorāniem?",
        a: "Digitālā ēdienkarte restorāniem ir papīra kartes tiešsaistes versija: viesis ar telefonu noskenē QR kodu pie galda un uzreiz pārlūkā redz ēdienus, fotoattēlus, alergēnus un cenas — bez aplikācijas. Ar IQ Rest digitālā ēdienkarte ietver arī tiešus pasūtījumus pie galda, rezervācijas 24/7 un AI tulkojumu 35 valodās — viss tiek atjaunināts reāllaikā no telefona.",
      },
      {
        q: "Cik maksā digitālā ēdienkarte restorāniem?",
        a: "6,90 €/mēnesī, viss iekļauts (atlaide gada plānam). Pilnvērtīgs redaktors, neierobežoti QR kodi, tieši pasūtījumi bez komisijas, AI tulkojums 35 valodās, rezervācijas un analītika. 14 dienu bezmaksas izmēģinājums, bez kartes.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitālā ēdienkarte restorāniem.",
    headingAccent: "Gatava 5 minūtēs.",
    sub: "14 dienas bez maksas. Bez kartes. Pievienojies 500+ restorāniem, kas digitālo ēdienkarti vada IQ Restā.",
  },

  meta: {
    title: "Digitālā Ēdienkarte Restorāniem — 5 Min | IQ Rest",
    description: "Digitālā ēdienkarte restorāniem: izdrukājams QR kods, tieši pasūtījumi bez komisijas, AI tulkojums 35 valodās. 5 min, 14 dienas bez maksas.",
    canonical: "https://iq-rest.com/lv/lp/digitala-edienkarte-restoraniem",
    ogLocale: "lv_LV",
    ogTitle: "Digitālā Ēdienkarte Restorāniem — 5 Minūtēs",
    ogDescription: "Digitālā ēdienkarte restorāniem ar QR kodu, tiešiem pasūtījumiem un 35 AI valodām. Tiešsaistē 5 minūtēs — 14 dienas bez maksas.",
  },
};
