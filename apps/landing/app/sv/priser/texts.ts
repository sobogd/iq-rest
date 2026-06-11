import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Priser — En plan för din restaurang från 6,90 €/mån | IQ Rest",
    description:
      "En plan från 6,90 €/mån för restauranger: QR-meny, beställningar, AI-översättning, bokning, KDS, analys. Obegränsat. 14 dagar gratis, inget kort krävs, avsluta när som helst.",
    canonical: "https://iq-rest.com/sv/priser",
    ogLocale: "sv_SE",
    ogTitle: "Priser — En plan för din restaurang",
    ogDescription:
      "6,90 €/mån: QR-meny, beställningar, AI-översättning, bokning, KDS, analys. Inga dolda avgifter. 14 dagar gratis.",
  },
};
