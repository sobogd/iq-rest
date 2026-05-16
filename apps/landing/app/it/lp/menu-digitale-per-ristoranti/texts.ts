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
    // SSR fallback — the Ads crawler reads `headline` as the keyword phrase.
    // Browsers also see this for one frame before the rotator boots, so
    // hydration matches and there is no flicker on the keyword form.
    headline: "Menu digitale per ristoranti",
    sub: "500+ ristoranti italiani servono più tavoli, vendono di più ai turisti e tagliano le commissioni a zero. Online in 5 minuti — 14 giorni gratis.",
    // Mobile renders these as an infinite-scroll marquee, desktop as a
    // static row. They advertise what ships with the system, not venue
    // types — the H1 already covers verticals via the accent-word rotator.
    verticals: [
      "Ordini online",
      "Prenotazioni",
      "Traduzioni IA",
      "Scanner menu",
      "Allergeni",
      "Design premium",
      "Analytics",
    ],
    // Second-line accent disabled — the H1 already swaps the last word.
    dynamicHeadlines: [],
    // After hydration the H1 last word cycles through these in order. Order
    // matches venue popularity in Italy. The first item must equal
    // `accentWord` so the initial frame keeps the keyword phrase intact.
    headlinePrefix: "Menu digitale per ",
    accentWord: "ristoranti",
    accentWordRotation: [
      "ristoranti",
      "pizzerie",
      "bar",
      "caffè",
      "trattorie",
      "osterie",
    ],
    headlineSuffix: "",
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
