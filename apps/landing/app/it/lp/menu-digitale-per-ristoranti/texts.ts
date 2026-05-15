import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /it, tuned for the PHRASE keyword "menu digitale per
// ristoranti". Inherits content from the indexed /it page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq
// copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  hero: {
    ...DEFAULT.hero,
    // H1 carries the exact phrase keyword for ad-relevance scoring.
    headline: "Menu digitale per ristoranti.",
    sub: "Il menu digitale per ristoranti pronto in 5 minuti: QR Code stampabile per i tavoli, ordini diretti senza commissioni e traduzione IA in 35 lingue. Pensato per ristoratori, non per sviluppatori.",
    dynamicHeadlines: [
      "Online in 5 minuti.",
      "QR Code per i tavoli.",
      "Ordini diretti.",
      "35 lingue con IA.",
      "Prenotazioni 24/7.",
    ],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart:
      "Io e mia moglie abbiamo aperto un caffè e abbiamo passato settimane a cercare un menu digitale per ristoranti che gestisse anche ordini al tavolo e prenotazioni, senza essere pesante o brutto —",
    quoteAccent: "così abbiamo costruito il menu digitale che avremmo voluto.",
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
        q: "Cos'è un menu digitale per ristoranti?",
        a: "Un menu digitale per ristoranti è la versione online della carta cartacea: il cliente inquadra un QR Code sul tavolo con la fotocamera e accede subito a piatti, foto, allergeni e prezzi nel browser, senza scaricare app. Con IQ Rest il menu digitale per ristoranti include anche ordini diretti al tavolo, prenotazioni 24/7 e traduzione IA in 35 lingue — aggiorni tutto dal telefono in tempo reale.",
      },
      {
        q: "Quanto costa un menu digitale per ristoranti?",
        a: "6,90€/mese tutto incluso (sconto sul piano annuale). Editor completo, QR Code illimitato, ordini diretti senza commissioni, traduzione IA in 35 lingue, prenotazioni e analytics. 14 giorni di prova gratuita, senza carta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu digitale per ristoranti.",
    headingAccent: "Pronto in 5 minuti.",
    sub: "14 giorni gratis. Nessuna carta richiesta. Unisciti a 500+ ristoranti che usano il menu digitale di IQ Rest.",
  },

  meta: {
    title: "Menu Digitale per Ristoranti — Pronto in 5 Min | IQ Rest",
    description:
      "Menu digitale per ristoranti: QR Code stampabile, ordini diretti senza commissioni, traduzione IA in 35 lingue. Pronto in 5 minuti, 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/lp/menu-digitale-per-ristoranti",
    ogLocale: "it_IT",
    ogTitle: "Menu Digitale per Ristoranti — Pronto in 5 Minuti",
    ogDescription:
      "Menu digitale per ristoranti con QR Code, ordini diretti e 35 lingue con IA. Online in 5 minuti — 14 giorni gratis.",
  },
};
