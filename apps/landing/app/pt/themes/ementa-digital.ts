import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Ementa Digital para Restaurantes — 6,9€/mês | IQ Rest",
    description:
      "Crie a sua ementa digital com código QR. Pedidos diretos sem comissões, 35 idiomas com IA, reservas 24/7. Pronta em 5 min. 14 dias teste sem cartão.",
    ogTitle: "Ementa Digital para Restaurantes — 6,9€/mês",
    ogDescription:
      "Ementa digital com código QR. Pedidos diretos sem comissões, 35 idiomas com IA. Pronta em 5 minutos.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Ementa Digital para Restaurantes",
    sub:
      "A sua ementa digital com código QR pronta em 5 minutos. Editor móvel, pedidos diretos sem comissões, reservas 24/7, tradução IA para 35 idiomas. Numa única assinatura.",
  },
};
