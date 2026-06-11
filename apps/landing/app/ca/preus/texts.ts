import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Preus — Un sol pla per al teu restaurant des de 6,90 €/mes | IQ Rest",
    description:
      "Un sol pla des de 6,90 €/mes per a restaurants: carta QR, recepció de comandes, traducció IA, reserves, KDS, analítica. Sense límits. 14 dies gratis, sense targeta, cancel·la quan vulguis.",
    canonical: "https://iq-rest.com/ca/preus",
    ogLocale: "ca_ES",
    ogTitle: "Preus — Un sol pla per al teu restaurant",
    ogDescription:
      "6,90 €/mes: carta QR, comandes, traducció IA, reserves, KDS, analítica. Sense costos amagats. 14 dies gratis.",
  },
};
