import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /et, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /et page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-menüü restoranidele",
    sub: "Üle 500 restorani 30+ riigis on asendanud paberi QR-menüüga, müüvad rohkem turistidele ja kaotanud tarnekomisjonid. Valmis 5 minutiga — 14 päeva tasuta.",
    dynamicHeadlines: [],
    headlinePrefix: "QR-menüü ",
    accentWord: "restoranidele",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Avasime abikaasaga kohviku ja otsisime nädalaid QR-menüüd restoranidele lauatellimuste ja broneeringutega ilma koleda kujunduseta —",
    quoteAccent: "nii et tegime QR-menüü ise.",
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
        q: "Mis on QR-menüü restoranidele?",
        a: "QR-menüü restoranidele on lauas olev trükitav QR-kood, mille külaline skannib telefoni kaameraga ja avab menüü brauseris — rakendus pole vajalik. IQ Restiga sisaldab QR-menüü lauatellimusi, broneeringuid 24/7 ja AI tõlget 35 keelde, kõik värskendatav telefonist.",
      },
      {
        q: "Kui palju maksab QR-menüü restoranidele?",
        a: "6,90 €/kuus, kõik sees. Piiramatud QR-koodid igale lauale, täielik redaktor, otsetellimused ilma komisjonita, AI tõlge 35 keelde, broneeringud ja analüütika. 14 päeva tasuta, ilma kaardita.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-menüü restoranidele.",
    headingAccent: "Valmis 5 minutiga.",
    sub: "14 päeva tasuta. Ilma kaardita. Üle 500 restorani kasutab juba QR-menüüd IQ Restis.",
  },

  meta: {
    title: "QR-menüü Restoranidele — Valmis 5 Min | IQ Rest",
    description: "QR-menüü restoranidele: QR-kood igal laual, otsetellimused ilma komisjonita, AI tõlge 35 keelde. Valmis 5 minutiga, 14 päeva tasuta.",
    canonical: "https://iq-rest.com/et/lp/qr-menuu-restoranidele",
    ogLocale: "et_EE",
    ogTitle: "QR-menüü Restoranidele — Valmis 5 Minutiga",
    ogDescription: "QR-menüü otsetellimustega, 35 AI keelt ja broneeringud. Valmis 5 minutiga — 14 päeva tasuta.",
  },
};
