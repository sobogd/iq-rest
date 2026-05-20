import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Kainos — Vienas planas jūsų restoranui nuo 6,90 €/mėn. | IQ Rest",
    description:
      "Vienas planas nuo 6,90 €/mėn. restoranams: QR meniu, užsakymų priėmimas, AI vertimas, rezervacija, KDS, analizė. Be apribojimų. 14 dienų nemokamai, be kortelės, atšaukite bet kada.",
    canonical: "https://iq-rest.com/lt/kainos",
    ogLocale: "lt_LT",
    ogTitle: "Kainos — Vienas planas jūsų restoranui",
    ogDescription:
      "6,90 €/mėn.: QR meniu, užsakymai, AI vertimas, rezervacija, KDS, analizė. Be paslėptų mokesčių. 14 dienų nemokamai.",
  },
};
