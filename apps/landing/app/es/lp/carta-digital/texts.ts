import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /es. Inherits content from the indexed page (/es) and only
// overrides what should differ for the Google Ads landing: meta (canonical +
// og) and microcopy that surfaces the entry price.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Editor de carta digital creado por un hostelero",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  meta: {
    title: "Carta Digital para Restaurantes — Crear en 5 Min | IQ Rest",
    description:
      "Crear carta digital para restaurante en 5 minutos. Código QR para las mesas, pedidos directos sin comisiones, 35 idiomas con IA. 14 días gratis.",
    canonical: "https://iq-rest.com/es/lp/carta-digital",
    ogLocale: "es_ES",
    ogTitle: "Carta Digital para Restaurantes — Crear en 5 Min",
    ogDescription:
      "Carta digital para tu restaurante. Código QR, pedidos directos, 35 idiomas con IA. Lista en 5 minutos.",
  },
};
