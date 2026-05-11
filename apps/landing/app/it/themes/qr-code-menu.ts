import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "QR Code Menu per il tuo Ristorante — 6,9€/mese | IQ Rest",
    description:
      "Genera il QR Code per il menu del tuo ristorante. Stampabile per i tavoli, scansionabile senza app, ordini diretti senza commissioni. Pronto in 5 minuti.",
    ogTitle: "QR Code Menu per il tuo Ristorante — 6,9€/mese",
    ogDescription:
      "QR Code per il menu del tuo ristorante. Stampabile, scansionabile senza app, ordini diretti.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "QR Code Menu per il tuo Ristorante",
    sub:
      "Genera il tuo QR Code in 5 minuti. Stampabile per i tavoli, i clienti scansionano con la fotocamera e il menu si apre subito. Senza app, senza commissioni.",
  },
};
