import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /it, tuned for the BROAD-MATCH keyword cluster
// "qr code menu / menu qr code / qrcode ristorante / menu con qrcode".
// Inherits content from the indexed /it page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers "QR code" + "menu" + "ristorante" for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menu QR per Ristoranti. Pronto in 5 minuti.",
    sub: "Menu QR per il tuo ristorante in 5 minuti. Tutto incluso: editor mobile senza codice, scansione IA del menu, codici QR per i tavoli e ordini diretti senza commissioni.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Io e mia moglie abbiamo aperto un bar e passato settimane a cercare un menu QR code per ristoranti che gestisse anche ordini al tavolo e prenotazioni senza essere brutto o complicato —",
    quoteAccent: "così abbiamo costruito il menu QR code che volevamo noi stessi.",
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
        q: "Cos'è un menu QR code per ristoranti?",
        a: "Un menu QR code per ristoranti è il codice QR stampabile sul tavolo che il cliente inquadra con il telefono per aprire il menu nel browser — nessuna app da installare. Con IQ Rest il menu QR code include ordini al tavolo, prenotazioni 24/7 e traduzione AI in 35 lingue, tutto aggiornabile dal telefono.",
      },
      {
        q: "Quanto costa un menu QR code per ristoranti?",
        a: "6,90 €/mese, tutto incluso. QR code illimitati per ogni tavolo, editor completo, ordini diretti senza commissioni, traduzione AI in 35 lingue, prenotazioni e analytics. 14 giorni gratis, senza carta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu QR code per ristoranti.",
    headingAccent: "Pronto in 5 minuti.",
    sub: "14 giorni gratis. Senza carta. Oltre 500 ristoranti usano già il menu QR code su IQ Rest.",
  },

  meta: {
    title: "Menu QR Code Online per Ristoranti — 5 Min | IQ Rest",
    description: "Menu QR code online per ristoranti: codice QR su ogni tavolo, ordini diretti senza commissioni, traduzione AI in 35 lingue. Pronto in 5 minuti, 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/lp/menu-qr-code-online-per-ristoranti",
    ogLocale: "it_IT",
    ogTitle: "Menu QR Code Online per Ristoranti — 5 Minuti",
    ogDescription: "Menu QR code online con ordini diretti, 35 lingue AI e prenotazioni. Pronto in 5 minuti — 14 giorni gratis.",
  },
};
