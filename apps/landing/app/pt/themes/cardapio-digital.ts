import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Cardápio Digital para Restaurantes — 6,9€/mês | IQ Rest",
    description:
      "Crie o seu cardápio digital interativo. Pedidos online sem comissões, reservas 24/7, 35 idiomas com IA. Pronto em 5 minutos. 14 dias teste sem cartão.",
    ogTitle: "Cardápio Digital para Restaurantes — 6,9€/mês",
    ogDescription:
      "Cardápio digital com código QR. Pedidos online sem comissões, 35 idiomas. Pronto em 5 minutos.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Cardápio Digital para Restaurantes",
    sub:
      "Crie o seu cardápio digital com código QR em 5 minutos. Pedidos online sem comissões, reservas 24/7, 35 idiomas com IA. Sem agências, sem técnicas.",
  },
};
