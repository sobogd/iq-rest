import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /pt, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /pt page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Desde 6,90 €/mês · 14 dias grátis · Cancele quando quiser",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Menu Digital para Restaurantes. Pronto em 5 minutos.",
    sub: "Menu digital para o seu restaurante em 5 minutos. Tudo incluído: editor móvel sem código, leitura IA do menu, códigos QR para mesas e pedidos diretos sem comissões.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "A minha mulher e eu abrimos um café e passámos semanas à procura de um menu digital para restaurantes que também tratasse de pedidos à mesa e reservas, sem ser pesado ou feio —",
    quoteAccent: "então construímos o menu digital que queríamos para nós.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "O que é um menu digital para restaurantes?",
        a: "Um menu digital para restaurantes é a versão online da carta em papel: o cliente lê um QR code à mesa com o telemóvel e acede aos pratos, fotos, alergénios e preços no navegador — sem aplicação. Com IQ Rest o menu digital inclui também pedidos diretos à mesa, reservas 24/7 e tradução IA em 35 línguas — tudo atualizável em tempo real a partir do telemóvel.",
      },
      {
        q: "Quanto custa um menu digital para restaurantes?",
        a: "6,90 €/mês, tudo incluído (desconto no plano anual). Editor completo, QR codes ilimitados, pedidos diretos sem comissão, tradução IA em 35 línguas, reservas e analytics. 14 dias de teste grátis, sem cartão.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu digital para restaurantes.",
    headingAccent: "Pronto em 5 minutos.",
    sub: "14 dias grátis. Sem cartão. Junte-se a 500+ restaurantes que usam o seu menu digital com IQ Rest.",
  },

  meta: {
    title: "Menu Digital para Restaurantes — Pronto em 5 Min | IQ Rest",
    description: "Menu digital para restaurantes: QR code imprimível, pedidos diretos sem comissão, tradução IA em 35 línguas. 5 minutos, 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/lp/menu-digital-para-restaurantes",
    ogLocale: "pt_PT",
    ogTitle: "Menu Digital para Restaurantes — Pronto em 5 Minutos",
    ogDescription: "Menu digital para restaurantes com QR code, pedidos diretos e 35 línguas IA. No ar em 5 minutos — 14 dias grátis.",
  },
};
