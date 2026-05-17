import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /fi, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /fi page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Alkaen 6,90 €/kk · 14 päivää ilmaiseksi · Peru milloin haluat",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitaalinen ruokalista ravintoloille",
    sub: "500+ ravintolaa 30+ maassa palvelevat enemmän pöytiä, myyvät enemmän turisteille ja unohtavat toimitusprovisiot. Käytössä 5 minuutissa — 14 päivää ilmaiseksi.",
    verticals: ["Verkkotilaukset", "Varaukset", "AI-käännös", "Listan skanneri", "Allergeenit", "Premium-design", "Analytiikka"],
    dynamicHeadlines: [],
    headlinePrefix: "Digitaalinen ruokalista ",
    accentWord: "ravintoloille",
    accentWordRotation: ["ravintoloille", "kahviloille", "baareille", "pizzerioille", "bistroille", "pubeille"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Vaimoni ja minä avasimme kahvilan ja vietimme viikkoja etsien digitaalista ruokalistaa ravintoloille, joka käsittelee myös pöytätilaukset ja varaukset olematta kömpelö tai ruma —",
    quoteAccent: "joten rakensimme digitaalisen ruokalistan, jonka itse halusimme.",
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
        q: "Mikä on digitaalinen ruokalista ravintoloille?",
        a: "Digitaalinen ruokalista ravintoloille on paperilistan verkkoversio: asiakas skannaa QR-koodin pöydässä puhelimella ja näkee heti annokset, kuvat, allergeenit ja hinnat selaimessa — ilman sovellusta. IQ Restin kanssa digitaaliseen ruokalistaan sisältyy myös suora pöytätilaus, varaukset 24/7 ja AI-käännös 35 kielelle — kaikki päivittyy reaaliajassa puhelimesta.",
      },
      {
        q: "Mitä digitaalinen ruokalista ravintoloille maksaa?",
        a: "6,90 €/kk, kaikki mukana (alennus vuosisuunnitelmalla). Täysi editori, rajaton määrä QR-koodeja, suorat tilaukset ilman provisiota, AI-käännös 35 kielelle, varaukset ja analytiikka. 14 päivän ilmainen kokeilu, ei korttia.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitaalinen ruokalista ravintoloille.",
    headingAccent: "Valmis 5 minuutissa.",
    sub: "14 päivää ilmaiseksi. Ei korttia. Liity 500+ ravintolaan, jotka pyörittävät digitaalista ruokalistaa IQ Restissä.",
  },

  meta: {
    title: "Digitaalinen Ruokalista Ravintoloille — 5 Min | IQ Rest",
    description: "Digitaalinen ruokalista ravintoloille: tulostettava QR-koodi, suorat tilaukset ilman provisiota, AI-käännös 35 kielelle. 5 min, 14 päivää ilmaiseksi.",
    canonical: "https://iq-rest.com/fi/lp/digitaalinen-ruokalista-ravintoloille",
    ogLocale: "fi_FI",
    ogTitle: "Digitaalinen Ruokalista Ravintoloille — 5 Minuutissa",
    ogDescription: "Digitaalinen ruokalista ravintoloille QR-koodilla, suorilla tilauksilla ja 35 AI-kielellä. Käytössä 5 minuutissa — 14 päivää ilmaiseksi.",
  },
};
