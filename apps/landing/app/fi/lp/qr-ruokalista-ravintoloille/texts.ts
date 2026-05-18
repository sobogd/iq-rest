import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /fi, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /fi page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-ruokalista ravintoloille. Valmis 5 minuutissa.",
    sub: "QR-ruokalista ravintolallesi 5 minuutissa. Kaikki sisältyy: mobiili koodaamaton editori, AI-ruokalistan skannaus, QR-koodit pöytiin ja suorat tilaukset ilman provisioita.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Vaimoni kanssa avasimme kahvilan ja vietimme viikkoja etsien QR-ruokalistaa ravintoloille pöytätilauksilla ja varauksilla ilman rumaa käyttöliittymää —",
    quoteAccent: "joten rakensimme haluamamme QR-ruokalistan itse.",
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
        q: "Mikä on QR-ruokalista ravintoloille?",
        a: "QR-ruokalista ravintoloille on pöydässä oleva tulostettava QR-koodi, jonka asiakas skannaa puhelimen kameralla avatakseen ruokalistan selaimessa — ei sovellusta. IQ Restin QR-ruokalista sisältää pöytätilaukset, varaukset 24/7 ja AI-käännökset 35 kielelle, kaikki päivitettävissä puhelimesta.",
      },
      {
        q: "Kuinka paljon QR-ruokalista ravintoloille maksaa?",
        a: "6,90 €/kk, kaikki sisältyy. Rajattomat QR-koodit jokaiseen pöytään, täysi editori, suorat tilaukset ilman provisiota, AI-käännökset 35 kielelle, varaukset ja analytiikka. 14 päivää ilmaiseksi, ei korttia.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-ruokalista ravintoloille.",
    headingAccent: "Valmis 5 minuutissa.",
    sub: "14 päivää ilmaiseksi. Ei korttia. Yli 500 ravintolaa käyttää jo QR-ruokalistaa IQ Restissä.",
  },

  meta: {
    title: "QR-ruokalista Ravintoloille — Valmis 5 Min | IQ Rest",
    description: "QR-ruokalista ravintoloille: QR-koodi jokaiseen pöytään, suorat tilaukset ilman provisiota, AI-käännökset 35 kielelle. Valmis 5 minuutissa, 14 päivää ilmaiseksi.",
    canonical: "https://iq-rest.com/fi/lp/qr-ruokalista-ravintoloille",
    ogLocale: "fi_FI",
    ogTitle: "QR-ruokalista Ravintoloille — Valmis 5 Minuutissa",
    ogDescription: "QR-ruokalista suorilla tilauksilla, 35 AI-kielellä ja varauksilla. Valmis 5 minuutissa — 14 päivää ilmaiseksi.",
  },
};
