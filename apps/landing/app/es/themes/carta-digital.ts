import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Carta Digital para Restaurantes — Crea la tuya en 5 min | IQ Rest",
    description:
      "Crea tu carta digital interactiva para tu restaurante. Sin agencias, sin programadores. Pedidos directos, reservas, 35 idiomas con IA. 6,9€/mes, 14 días prueba.",
    ogTitle: "Carta Digital para Restaurantes — Lista en 5 min",
    ogDescription:
      "Crea tu carta digital interactiva. Pedidos directos sin comisiones, reservas, 35 idiomas. 6,9€/mes.",
  },
  hero: {
    ...DEFAULT.hero,
    qr: {
      headline: "Carta Digital para Restaurantes",
      sub:
        "Crea tu carta digital interactiva en 5 minutos. Sin agencias ni diseñadores. Editor móvil, pedidos directos sin comisiones, reservas 24/7. Lista hoy.",
    },
  },
};
