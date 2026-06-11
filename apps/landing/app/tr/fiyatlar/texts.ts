import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Fiyatlar — Restoranınız için tek plan 6,90 €/ay'dan | IQ Rest",
    description:
      "Restoranlar için 6,90 €/ay'dan tek plan: QR menü, sipariş alma, AI çevirisi, rezervasyon, KDS, analiz. Sınırsız. 14 gün ücretsiz, kart gerekmez, istediğiniz zaman iptal.",
    canonical: "https://iq-rest.com/tr/fiyatlar",
    ogLocale: "tr_TR",
    ogTitle: "Fiyatlar — Restoranınız için tek plan",
    ogDescription:
      "6,90 €/ay: QR menü, sipariş, AI çevirisi, rezervasyon, KDS, analiz. Gizli ücret yok. 14 gün ücretsiz.",
  },
};
