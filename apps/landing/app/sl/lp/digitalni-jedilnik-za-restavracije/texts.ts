import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sl, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /sl page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Od 6,90 €/mes · 14 dni brezplačno · Prekliči kadar koli",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitalni jedilnik za restavracije",
    sub: "500+ restavracij v 30+ državah streže več miz, prodaja več turistom in odpravlja provizije za dostavo. V živo v 5 minutah — 14 dni brezplačno.",
    verticals: ["Spletna naročila", "Rezervacije", "AI prevod", "Skener jedilnika", "Alergeni", "Premium oblikovanje", "Analitika"],
    dynamicHeadlines: [],
    headlinePrefix: "Digitalni jedilnik za ",
    accentWord: "restavracije",
    accentWordRotation: ["restavracije", "kavarne", "bare", "picerije", "bistroje", "gostilne"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Z ženo sva odprla kavarno in tedne iskala digitalni jedilnik za restavracije, ki obvladuje tudi naročila pri mizi in rezervacije, ne da bi bil okoren ali grd —",
    quoteAccent: "zato sva zgradila digitalni jedilnik, ki sva ga sama hotela.",
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
        q: "Kaj je digitalni jedilnik za restavracije?",
        a: "Digitalni jedilnik za restavracije je spletna različica papirnatega jedilnika: gost s telefonom skenira QR kodo pri mizi in v brskalniku takoj vidi jedi, fotografije, alergene in cene — brez aplikacije. Z IQ Rest digitalni jedilnik vključuje tudi neposredna naročila pri mizi, rezervacije 24/7 in AI prevod v 35 jezikov — vse je posodobljeno v realnem času s telefona.",
      },
      {
        q: "Koliko stane digitalni jedilnik za restavracije?",
        a: "6,90 €/mesec, vse vključeno (popust na letni paket). Popoln urejevalnik, neomejene QR kode, neposredna naročila brez provizije, AI prevod v 35 jezikov, rezervacije in analitika. 14 dni brezplačnega preizkusa, brez kartice.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitalni jedilnik za restavracije.",
    headingAccent: "Pripravljen v 5 minutah.",
    sub: "14 dni brezplačno. Brez kartice. Pridruži se 500+ restavracijam, ki digitalni jedilnik vodijo na IQ Rest.",
  },

  meta: {
    title: "Digitalni Jedilnik za Restavracije — 5 Min | IQ Rest",
    description: "Digitalni jedilnik za restavracije: tiskljiva QR koda, neposredna naročila brez provizije, AI prevod v 35 jezikov. 5 min, 14 dni brezplačno.",
    canonical: "https://iq-rest.com/sl/lp/digitalni-jedilnik-za-restavracije",
    ogLocale: "sl_SI",
    ogTitle: "Digitalni Jedilnik za Restavracije — V 5 Minutah",
    ogDescription: "Digitalni jedilnik za restavracije z QR kodo, neposrednimi naročili in 35 AI jeziki. V živo v 5 minutah — 14 dni brezplačno.",
  },
};
