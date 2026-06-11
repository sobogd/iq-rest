import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  meta: {
    title: "Preços — Um plano para o teu restaurante desde 6,90 €/mês | IQ Rest",
    description:
      "Um plano desde 6,90 €/mês para restaurantes: menu QR, receção de pedidos, tradução IA, reservas, KDS, analítica. Sem limites. 14 dias grátis, sem cartão, cancela quando quiseres.",
    canonical: "https://iq-rest.com/pt/precos",
    ogLocale: "pt_PT",
    ogTitle: "Preços — Um plano para o teu restaurante",
    ogDescription:
      "6,90 €/mês: menu QR, pedidos, tradução IA, reservas, KDS, analítica. Sem custos escondidos. 14 dias grátis.",
  },
};
