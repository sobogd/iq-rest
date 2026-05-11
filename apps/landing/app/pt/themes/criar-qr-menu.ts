import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Criar Menu QR para Restaurante — 6,9€/mês | IQ Rest",
    description:
      "Crie o seu menu QR profissional em 5 minutos. Imprimível para as mesas, sem apps para clientes, pedidos diretos sem comissões. 14 dias teste.",
    ogTitle: "Criar Menu QR para Restaurante — 6,9€/mês",
    ogDescription:
      "Crie o seu menu QR em 5 minutos. Imprimível, sem apps, pedidos diretos sem comissões.",
  },
  hero: {
    ...DEFAULT.hero,
    headline: "Crie o seu Menu QR para Restaurante",
    sub:
      "Crie o seu menu QR profissional em 5 minutos. Imprimível para as mesas, os clientes escaneiam com a câmara e a ementa abre ao instante. Sem apps, sem comissões.",
  },
};
