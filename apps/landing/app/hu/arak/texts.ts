import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Árak — Egy csomag az Ön éttermének 6,90 €/hó-tól | IQ Rest",
    description:
      "Egy csomag 6,90 €/hó-tól éttermeknek: QR étlap, rendelésfelvétel, AI fordítás, foglalás, KDS, analitika. Korlátok nélkül. 14 nap ingyenes, kártya nélkül, lemondás bármikor.",
    canonical: "https://iq-rest.com/hu/arak",
    ogLocale: "hu_HU",
    ogTitle: "Árak — Egy csomag az Ön éttermének",
    ogDescription:
      "6,90 €/hó: QR étlap, rendelések, AI fordítás, foglalás, KDS, analitika. Rejtett díjak nélkül. 14 nap ingyenes.",
  },
};
