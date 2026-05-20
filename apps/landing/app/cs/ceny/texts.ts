import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Ceny — Jeden tarif pro vaši restauraci od 6,90 €/měs. | IQ Rest",
    description:
      "Jeden tarif od 6,90 €/měs. pro restaurace: QR menu, příjem objednávek, AI překlad, rezervace, KDS, analytika. Bez limitů. 14 dní zdarma, bez karty, zrušení kdykoli.",
    canonical: "https://iq-rest.com/cs/ceny",
    ogLocale: "cs_CZ",
    ogTitle: "Ceny — Jeden tarif pro vaši restauraci",
    ogDescription:
      "6,90 €/měs.: QR menu, objednávky, AI překlad, rezervace, KDS, analytika. Žádné skryté poplatky. 14 dní zdarma.",
  },
};
