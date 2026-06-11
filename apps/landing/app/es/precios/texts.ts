import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Precios — Un único plan para tu restaurante desde 6,90 €/mes | IQ Rest",
    description:
      "Un único plan desde 6,90 €/mes para restaurantes: carta QR, pedidos, traducción con IA, reservas, KDS y analíticas. Ilimitado. 14 días gratis, sin tarjeta, cancelas cuando quieras.",
    canonical: "https://iq-rest.com/es/precios",
    ogLocale: "es_ES",
    ogTitle: "Precios — Un único plan para tu restaurante",
    ogDescription:
      "Desde 6,90 €/mes: carta QR, pedidos, traducción con IA, reservas, KDS y analíticas. Sin costes ocultos. 14 días gratis.",
  },
};
