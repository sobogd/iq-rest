import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sl, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /sl page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR jedilnik za restavracije",
    sub: "Več kot 500 restavracij v 30+ državah nadomešča tiskan jedilnik z QR jedilnikom, več prodaja turistom in odpravlja provizije za dostavo. Pripravljen v 5 minutah — 14 dni brezplačno.",
    dynamicHeadlines: [],
    headlinePrefix: "QR jedilnik za ",
    accentWord: "restavracije",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Z ženo sva odprla kavarno in tedne iskala QR jedilnik za restavracije z naročili za mizo in rezervacijami brez grdega vmesnika —",
    quoteAccent: "zato sva QR jedilnik naredila sama.",
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
        q: "Kaj je QR jedilnik za restavracije?",
        a: "QR jedilnik za restavracije je natisljiva QR koda na mizi, ki jo gost skenira s kamero telefona, da odpre jedilnik v brskalniku — brez aplikacije. Z IQ Rest QR jedilnik vključuje naročila za mizo, rezervacije 24/7 in AI prevod v 35 jezikov, vse posodobljeno iz telefona.",
      },
      {
        q: "Koliko stane QR jedilnik za restavracije?",
        a: "6,90 €/mesec, vse vključeno. Neomejene QR kode za vsako mizo, popoln urejevalnik, neposredna naročila brez provizije, AI prevod v 35 jezikov, rezervacije in analitika. 14 dni brezplačno, brez kartice.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR jedilnik za restavracije.",
    headingAccent: "Pripravljen v 5 minutah.",
    sub: "14 dni brezplačno. Brez kartice. Več kot 500 restavracij uporablja QR jedilnik na IQ Rest.",
  },

  meta: {
    title: "QR Jedilnik za Restavracije — 5 Min | IQ Rest",
    description: "QR jedilnik za restavracije: QR koda na vsaki mizi, neposredna naročila brez provizije, AI prevod v 35 jezikov. Pripravljen v 5 minutah, 14 dni brezplačno.",
    canonical: "https://iq-rest.com/sl/lp/qr-jedilnik-za-restavracije",
    ogLocale: "sl_SI",
    ogTitle: "QR Jedilnik za Restavracije — Pripravljen v 5 Minutah",
    ogDescription: "QR jedilnik z neposrednimi naročili, 35 AI jeziki in rezervacijami. Pripravljen v 5 minutah — 14 dni brezplačno.",
  },
};
