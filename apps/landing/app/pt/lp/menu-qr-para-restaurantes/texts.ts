import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /pt, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /pt page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menu QR para restaurantes",
    sub: "Mais de 500 restaurantes em 30+ países substituem o menu impresso por um menu QR, vendem mais a turistas e eliminam comissões de delivery. Online em 5 minutos — 14 dias grátis.",
    dynamicHeadlines: [],
    headlinePrefix: "Menu QR para ",
    accentWord: "restaurantes",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Eu e a minha mulher abrimos um café e passámos semanas à procura de um menu QR para restaurantes que tratasse também pedidos à mesa e reservas sem ser feio —",
    quoteAccent: "por isso construímos o menu QR que queríamos.",
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
        q: "O que é um menu QR para restaurantes?",
        a: "Um menu QR para restaurantes é o código QR imprimível na mesa que os clientes lêem com a câmara do telemóvel para abrir a carta no browser — sem app. Com a IQ Rest o menu QR inclui pedidos à mesa, reservas 24/7 e tradução IA em 35 idiomas, tudo atualizado do telemóvel.",
      },
      {
        q: "Quanto custa um menu QR para restaurantes?",
        a: "6,90 €/mês, tudo incluído. QR ilimitados para cada mesa, editor completo, pedidos diretos sem comissões, tradução IA em 35 idiomas, reservas e analytics. 14 dias grátis, sem cartão.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu QR para restaurantes.",
    headingAccent: "Pronto em 5 minutos.",
    sub: "14 dias grátis. Sem cartão. Mais de 500 restaurantes já usam o menu QR na IQ Rest.",
  },

  meta: {
    title: "Menu QR para Restaurantes — Pronto em 5 Min | IQ Rest",
    description: "Menu QR para restaurantes: QR code em cada mesa, pedidos diretos sem comissões, tradução IA em 35 idiomas. Online em 5 minutos, 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/lp/menu-qr-para-restaurantes",
    ogLocale: "pt_PT",
    ogTitle: "Menu QR para Restaurantes — Pronto em 5 Minutos",
    ogDescription: "Menu QR com pedidos diretos, 35 idiomas IA e reservas. Online em 5 minutos — 14 dias grátis.",
  },
};
