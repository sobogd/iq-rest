import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Cennik — Jeden plan dla Twojej restauracji od 6,90 €/mies. | IQ Rest",
    description:
      "Jeden plan od 6,90 €/mies. dla restauracji: menu QR, przyjmowanie zamówień, tłumaczenie AI, rezerwacje, KDS, analityka. Bez limitów. 14 dni za darmo, bez karty, anuluj w każdej chwili.",
    canonical: "https://iq-rest.com/pl/cennik",
    ogLocale: "pl_PL",
    ogTitle: "Cennik — Jeden plan dla Twojej restauracji",
    ogDescription:
      "6,90 €/mies.: menu QR, zamówienia, tłumaczenie AI, rezerwacje, KDS, analityka. Bez ukrytych opłat. 14 dni za darmo.",
  },
};
