import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /et, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /et page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Alates 6,90 €/kuus · 14 päeva tasuta · Tühista millal soovid",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitaalne menüü restoranidele",
    sub: "500+ restorani 30+ riigis teenindavad rohkem laudu, müüvad rohkem turistidele ja kaotavad kohaletoimetuskomisjonid. Töös 5 minutiga — 14 päeva tasuta.",
    verticals: ["Veebitellimused", "Broneeringud", "AI tõlge", "Menüü skanner", "Allergeenid", "Premium disain", "Analüütika"],
    dynamicHeadlines: [],
    headlinePrefix: "Digitaalne menüü ",
    accentWord: "restoranidele",
    accentWordRotation: ["restoranidele", "kohvikutele", "baaridele", "pitsabaaridele", "bistroodele", "kõrtsidele"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Minu naine ja mina avasime kohviku ning otsisime nädalaid digitaalset menüüd restoranidele, mis tuleks toime ka lauatellimuste ja broneeringutega, olemata kohmakas ega kole —",
    quoteAccent: "seega ehitasime digitaalse menüü, mida ise tahtsime.",
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
        q: "Mis on digitaalne menüü restoranidele?",
        a: "Digitaalne menüü restoranidele on paberkandjal menüü veebiversioon: külaline skannib telefoniga laua peal QR-koodi ja näeb kohe roogasid, fotosid, allergeene ja hindu brauseris — ilma rakenduseta. IQ Restis sisaldab digitaalne menüü ka otsetellimusi laualt, broneeringuid 24/7 ja AI-tõlget 35 keelde — kõik on uuendatav reaalajas telefonist.",
      },
      {
        q: "Mis maksab digitaalne menüü restoranidele?",
        a: "6,90 €/kuus, kõik sees (allahindlus aastaplaanil). Täielik redaktor, piiramatud QR-koodid, otsetellimused ilma komisjonita, AI-tõlge 35 keelde, broneeringud ja analüütika. 14-päevane tasuta proov, kaardita.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitaalne menüü restoranidele.",
    headingAccent: "Valmis 5 minutiga.",
    sub: "14 päeva tasuta. Kaardita. Liitu 500+ restoraniga, kes peavad digitaalset menüüd IQ Restis.",
  },

  meta: {
    title: "Digitaalne Menüü Restoranidele — 5 Min | IQ Rest",
    description: "Digitaalne menüü restoranidele: prinditav QR-kood, otsetellimused ilma komisjonita, AI-tõlge 35 keelde. 5 min, 14 päeva tasuta.",
    canonical: "https://iq-rest.com/et/lp/digitaalne-menuu-restoranidele",
    ogLocale: "et_EE",
    ogTitle: "Digitaalne Menüü Restoranidele — 5 Minutiga",
    ogDescription: "Digitaalne menüü restoranidele QR-koodiga, otsetellimustega ja 35 AI-keelega. Töös 5 minutiga — 14 päeva tasuta.",
  },
};
