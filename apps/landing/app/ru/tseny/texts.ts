import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Цены — Тариф для ресторана 6.90 €/мес | IQ Rest",
    description:
      "Один тариф 6.90 €/мес для ресторана: QR-меню, приём заказов, AI-перевод, бронирование, KDS, аналитика. Безлимит. 14 дней бесплатно, без карты, отмена в любой момент.",
    canonical: "https://iq-rest.com/ru/tseny",
    ogLocale: "ru_RU",
    ogTitle: "Цены — Один тариф для ресторана",
    ogDescription:
      "6.90 €/мес: QR-меню, заказы, AI-перевод, брони, KDS, аналитика. Без скрытых платежей. 14 дней бесплатно.",
  },
};
