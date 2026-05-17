import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /it, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /it page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menu QR per ristoranti",
    sub: "Oltre 500 ristoranti in 30+ paesi sostituiscono il menu cartaceo con un menu QR, vendono di più ai turisti e azzerano le commissioni del delivery. Online in 5 minuti — 14 giorni gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "Menu QR per ",
    accentWord: "ristoranti",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Io e mia moglie abbiamo aperto un bar e passato settimane a cercare un menu QR per ristoranti che gestisse anche ordini al tavolo e prenotazioni senza essere brutto o complicato —",
    quoteAccent: "così abbiamo costruito il menu QR che volevamo noi stessi.",
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
        q: "Cos'è un menu QR per ristoranti?",
        a: "Un menu QR per ristoranti è il QR code stampabile sul tavolo che il cliente inquadra con il telefono per aprire il menu nel browser — nessuna app da installare. Con IQ Rest il menu QR include ordini al tavolo, prenotazioni 24/7 e traduzione AI in 35 lingue, tutto aggiornabile dal telefono.",
      },
      {
        q: "Quanto costa un menu QR per ristoranti?",
        a: "6,90 €/mese, tutto incluso. QR illimitati per ogni tavolo, editor completo, ordini diretti senza commissioni, traduzione AI in 35 lingue, prenotazioni e analytics. 14 giorni gratis, senza carta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu QR per ristoranti.",
    headingAccent: "Pronto in 5 minuti.",
    sub: "14 giorni gratis. Senza carta. Oltre 500 ristoranti usano già il menu QR su IQ Rest.",
  },

  meta: {
    title: "Menu QR per Ristoranti — Pronto in 5 Min | IQ Rest",
    description: "Menu QR per ristoranti: QR code su ogni tavolo, ordini diretti senza commissioni, traduzione AI in 35 lingue. Online in 5 minuti, 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/lp/menu-qr-per-ristoranti",
    ogLocale: "it_IT",
    ogTitle: "Menu QR per Ristoranti — Pronto in 5 Minuti",
    ogDescription: "Menu QR con ordini diretti, 35 lingue AI e prenotazioni. Online in 5 minuti — 14 giorni gratis.",
  },
};
