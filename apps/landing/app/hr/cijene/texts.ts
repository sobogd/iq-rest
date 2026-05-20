import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Cijene — Jedan paket za vaš restoran od 6,90 €/mj. | IQ Rest",
    description:
      "Jedan paket od 6,90 €/mj. za restorane: QR jelovnik, primanje narudžbi, AI prijevod, rezervacije, KDS, analitika. Bez ograničenja. 14 dana besplatno, bez kartice, otkažite bilo kada.",
    canonical: "https://iq-rest.com/hr/cijene",
    ogLocale: "hr_HR",
    ogTitle: "Cijene — Jedan paket za vaš restoran",
    ogDescription:
      "6,90 €/mj.: QR jelovnik, narudžbe, AI prijevod, rezervacije, KDS, analitika. Bez skrivenih naknada. 14 dana besplatno.",
  },
};
