import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Cene — Jedan paket za vaš restoran od 6,90 €/mes. | IQ Rest",
    description:
      "Jedan paket od 6,90 €/mes. za restorane: QR meni, primanje porudžbina, AI prevod, rezervacije, KDS, analitika. Bez ograničenja. 14 dana besplatno, bez kartice, otkažite bilo kada.",
    canonical: "https://iq-rest.com/sr/cene",
    ogLocale: "sr_RS",
    ogTitle: "Cene — Jedan paket za vaš restoran",
    ogDescription:
      "6,90 €/mes.: QR meni, porudžbine, AI prevod, rezervacije, KDS, analitika. Bez skrivenih troškova. 14 dana besplatno.",
  },
};
