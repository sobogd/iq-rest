import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Verð — Ein áskrift fyrir veitingastað frá 6,90 €/mán | IQ Rest",
    description:
      "Ein áskrift frá 6,90 €/mán fyrir veitingastaði: QR matseðill, pantanataka, gervigreindar þýðing, bókun, KDS, greiningar. Ótakmarkað. 14 dagar ókeypis, ekkert kort, hætta hvenær sem er.",
    canonical: "https://iq-rest.com/is/verd",
    ogLocale: "is_IS",
    ogTitle: "Verð — Ein áskrift fyrir veitingastað",
    ogDescription:
      "6,90 €/mán: QR matseðill, pantanir, gervigreindar þýðing, bókun, KDS, greiningar. Engin falin gjöld. 14 dagar ókeypis.",
  },
};
