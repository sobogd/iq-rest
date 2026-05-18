import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /cs, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /cs page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR menu pro restaurace. Hotové za 5 minut.",
    sub: "QR menu pro vaši restauraci za 5 minut. Vše v ceně: mobilní editor bez kódu, AI skenování menu, QR kódy pro stoly a přímé objednávky bez provizí.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "S manželkou jsme otevřeli kavárnu a týdny hledali QR menu pro restaurace s objednávkami u stolu a rezervacemi bez ošklivého rozhraní —",
    quoteAccent: "tak jsme QR menu udělali sami.",
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
        q: "Co je QR menu pro restaurace?",
        a: "QR menu pro restaurace je tisknutelný QR kód u stolu, který host naskenuje fotoaparátem telefonu a otevře jídelní lístek v prohlížeči — bez aplikace. S IQ Rest QR menu obsahuje objednávky u stolu, rezervace 24/7 a AI překlad do 35 jazyků, vše aktualizované z mobilu.",
      },
      {
        q: "Kolik stojí QR menu pro restaurace?",
        a: "6,90 €/měsíc, vše v ceně. Neomezené QR kódy pro každý stůl, kompletní editor, přímé objednávky bez provize, AI překlad do 35 jazyků, rezervace a analytika. 14 dní zdarma, bez karty.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR menu pro restaurace.",
    headingAccent: "Hotovo za 5 minut.",
    sub: "14 dní zdarma. Bez karty. Více než 500 restaurací používá QR menu na IQ Rest.",
  },

  meta: {
    title: "QR Menu pro Restaurace — Hotovo za 5 Min | IQ Rest",
    description: "QR menu pro restaurace: QR kód u každého stolu, přímé objednávky bez provize, AI překlad do 35 jazyků. Hotovo za 5 minut, 14 dní zdarma.",
    canonical: "https://iq-rest.com/cs/lp/qr-menu-pro-restaurace",
    ogLocale: "cs_CZ",
    ogTitle: "QR Menu pro Restaurace — Hotovo za 5 Minut",
    ogDescription: "QR menu s přímými objednávkami, 35 AI jazyky a rezervacemi. Hotovo za 5 minut — 14 dní zdarma.",
  },
};
