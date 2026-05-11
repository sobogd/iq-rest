import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Menú Digital para Restaurantes — 6,9€/mes | IQ Rest",
    description:
      "Crea tu menú digital con código QR para tu restaurante. Pedidos directos sin comisiones, 35 idiomas IA, reservas 24/7. Listo en 5 min. 14 días prueba sin tarjeta.",
    ogTitle: "Menú Digital para Restaurantes — 6,9€/mes",
    ogDescription:
      "Menú digital con código QR. Pedidos directos sin comisiones, 35 idiomas IA. Listo en 5 minutos.",
  },
  hero: {
    ...DEFAULT.hero,
    qr: {
      headline: "Menú Digital para Restaurantes",
      sub:
        "Tu menú digital con código QR listo en 5 minutos. Editor móvil, pedidos directos sin comisiones, reservas 24/7, traducción IA a 35 idiomas. Una sola suscripción.",
    },
  },
};
