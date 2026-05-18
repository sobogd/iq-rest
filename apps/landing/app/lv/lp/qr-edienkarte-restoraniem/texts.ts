import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /lv, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /lv page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR ēdienkarte restorāniem. Gatava 5 minūtēs.",
    sub: "QR ēdienkarte jūsu restorānam 5 minūtēs. Viss iekļauts: mobilais redaktors bez koda, AI ēdienkartes skenēšana, QR kodi galdiem un tiešie pasūtījumi bez komisijām.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Mēs ar sievu atvērām kafejnīcu un nedēļām meklējām QR ēdienkarti restorāniem ar pasūtījumiem pie galda un rezervācijām bez neglīta dizaina —",
    quoteAccent: "tāpēc paši uztaisījām QR ēdienkarti, kādu gribējām.",
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
        q: "Kas ir QR ēdienkarte restorāniem?",
        a: "QR ēdienkarte restorāniem ir uz galda izdrukājams QR kods, ko viesis noskannē ar telefona kameru, lai atvērtu ēdienkarti pārlūkprogrammā — bez lietotnes. Ar IQ Rest QR ēdienkarte ietver pasūtījumus pie galda, rezervācijas 24/7 un AI tulkojumu 35 valodās, viss atjaunināms no telefona.",
      },
      {
        q: "Cik maksā QR ēdienkarte restorāniem?",
        a: "6,90 €/mēnesī, viss iekļauts. Neierobežoti QR kodi katram galdam, pilns redaktors, tieši pasūtījumi bez komisijas, AI tulkojums 35 valodās, rezervācijas un analītika. 14 dienas bez maksas, bez kartes.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR ēdienkarte restorāniem.",
    headingAccent: "Gatava 5 minūtēs.",
    sub: "14 dienas bez maksas. Bez kartes. Vairāk nekā 500 restorānu izmanto QR ēdienkarti uz IQ Rest.",
  },

  meta: {
    title: "QR Ēdienkarte Restorāniem — 5 Min | IQ Rest",
    description: "QR ēdienkarte restorāniem: QR kods uz katra galda, tieši pasūtījumi bez komisijas, AI tulkojums 35 valodās. Gatava 5 minūtēs, 14 dienas bez maksas.",
    canonical: "https://iq-rest.com/lv/lp/qr-edienkarte-restoraniem",
    ogLocale: "lv_LV",
    ogTitle: "QR Ēdienkarte Restorāniem — Gatava 5 Minūtēs",
    ogDescription: "QR ēdienkarte ar tiešiem pasūtījumiem, 35 AI valodām un rezervācijām. Gatava 5 minūtēs — 14 dienas bez maksas.",
  },
};
