import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Menu Digital para Restaurantes — 6,9€/mês | IQ Rest",
    description:
      "Crie o seu menu digital com código QR para o seu restaurante. Pedidos diretos sem comissões, 35 idiomas com IA, reservas 24/7. Pronto em 5 min.",
    ogTitle: "Menu Digital para Restaurantes — 6,9€/mês",
    ogDescription:
      "Menu digital com código QR. Pedidos diretos sem comissões, 35 idiomas. Pronto em 5 minutos.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Menu Digital para Restaurantes",
    sub:
      "O seu menu digital com código QR pronto em 5 minutos. Editor móvel, pedidos diretos sem comissões, reservas 24/7, tradução IA para 35 idiomas.",
  },
};
