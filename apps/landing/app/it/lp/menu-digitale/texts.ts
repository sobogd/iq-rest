import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /it. Inherits content from the indexed page (/it) and only
// overrides what should differ for the Google Ads landing: meta (canonical +
// og) and microcopy that surfaces the entry price.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Da 6,90€/mese · 14 giorni gratis · Cancelli quando vuoi",

  hero: {
    ...DEFAULT.hero,
    sub: "Menu digitale = la carta del tuo ristorante online, accessibile dal QR sul tavolo senza app. Pronto in 5 minuti, ordini diretti senza commissioni, traduzione IA in 35 lingue.",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart:
      "Io e mia moglie abbiamo aperto un caffè e abbiamo passato settimane a cercare un menu digitale che gestisse anche ordini al tavolo e prenotazioni, senza essere pesante o brutto —",
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
        q: "Cos'è un menu digitale per ristorante?",
        a: "Il menu digitale è la versione online della carta del ristorante: il cliente inquadra un QR Code sul tavolo con la fotocamera e accede subito a piatti, foto, allergeni e prezzi nel browser, senza scaricare app. Con IQ Rest il menu digitale include anche ordini diretti al tavolo, prenotazioni 24/7 e traduzione IA in 35 lingue — aggiorni tutto dal telefono in tempo reale.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  meta: {
    title: "Menu Digitale per Ristoranti — Online in 5 Min | IQ Rest",
    description:
      "Crea il tuo menu digitale per ristorante online in 5 minuti. QR Code stampabile, ordini diretti senza commissioni, 35 lingue con IA. 14 giorni gratis.",
    canonical: "https://iq-rest.com/it/lp/menu-digitale",
    ogLocale: "it_IT",
    ogTitle: "Menu Digitale per Ristoranti — Online in 5 Min",
    ogDescription:
      "Menu digitale online per il tuo ristorante. QR Code, ordini diretti, 35 lingue con IA. Pronto in 5 minuti.",
  },
};
