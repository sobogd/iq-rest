import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Цени — Един план за вашия ресторант 6,90 €/мес | IQ Rest",
    description:
      "Един план от 6,90 €/мес за ресторанти: QR меню, приемане на поръчки, ИИ превод, резервации, KDS, аналитика. Без лимити. 14 дни безплатно, без карта, отказ по всяко време.",
    canonical: "https://iq-rest.com/bg/tseni",
    ogLocale: "bg_BG",
    ogTitle: "Цени — Един план за вашия ресторант",
    ogDescription:
      "6,90 €/мес: QR меню, поръчки, ИИ превод, резервации, KDS, аналитика. Без скрити такси. 14 дни безплатно.",
  },
};
