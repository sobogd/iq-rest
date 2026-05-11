import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

export const THEME: LandingTexts = {
  ...DEFAULT,
  meta: {
    ...DEFAULT.meta,
    title: "Código QR para tu Menú de Restaurante — 6,9€/mes | IQ Rest",
    description:
      "Genera tu código QR profesional para el menú de tu restaurante. Imprimible para mesas, escaneable sin apps, pedidos directos sin comisiones. Listo en 5 minutos.",
    ogTitle: "Código QR para tu Menú — 6,9€/mes",
    ogDescription:
      "Genera tu código QR para el menú de tu restaurante. Sin apps, pedidos directos. Listo en 5 minutos.",
  },
  hero: {
    ...DEFAULT.hero,
    qr: {
      headline: "Código QR para tu Menú de Restaurante",
      sub:
        "Genera tu código QR profesional en 5 minutos. Imprimible para las mesas, los clientes escanean con la cámara y el menú se abre al instante. Sin apps, sin comisiones.",
    },
  },
  scan: {
    ...DEFAULT.scan,
    heading: "¿Tienes un menú en papel?",
    headingAccent: "Lo convertimos en código QR en 60 segundos.",
  },
};
