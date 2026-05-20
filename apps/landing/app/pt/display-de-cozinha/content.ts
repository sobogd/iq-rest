import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "display-de-cozinha",
  trackPrefix: "l_pt_kds",

  meta: {
    title: "Ecrã de cozinha (KDS) para restaurantes | IQ Rest",
    description:
      "Ecrã de cozinha (KDS) para restaurantes: os pedidos da sala e do menu QR chegam imediatamente ao ecrã do chef. Colunas por mesa, estados Em espera / Em preparação / Pronto / Servido, filtros por zona. Funciona em tablet ou telemóvel.",
    canonical: "https://iq-rest.com/pt/display-de-cozinha",
    ogLocale: "pt_PT",
    ogTitle: "Ecrã de cozinha (KDS) — pedidos no ecrã do chef",
    ogDescription:
      "Pedidos da sala no ecrã do chef. Colunas por mesa, estados e cronómetro. Um toque muda o estado.",
    brandLine: "IQ Rest — Ecrã de cozinha",
  },

  hero: {
    headline: "Ecrã de cozinha: pedidos diretamente no ecrã do chef.",
    sub: "Os talões em papel deixam de ser necessários. Os pedidos da sala ou do menu QR chegam imediatamente ao ecrã da cozinha — com notas, alergénios e cronómetro. Um toque muda o estado. Funciona num tablet ao pass ou num smartphone no bolso do chef.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Cozinha profissional com um tablet num suporte em latão a mostrar o ecrã de cozinha com pedidos ativos",
  },

  scan: {
    heading: "Configura o ecrã de cozinha",
    headingAccent: "em 5 minutos.",
    sub: "Carrega um menu em papel ou PDF — a IA reconhece pratos, categorias e alergénios. Liga um tablet na cozinha e começa a receber pedidos.",
    cta: "Digitalizar menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Controlos e filtros",
      heading: "Vários ecrãs por zona: cozinha e bar.",
      body: "Coloca tablets separados na linha quente, no bar ou na pastelaria — cada ecrã mostra apenas os pratos que lhe pertencem. Os filtros por estado (Em espera / Em preparação / Pronto / Servido) e por categoria eliminam o ruído: o chef vê apenas o que é relevante para o seu posto.",
      bullets: [
        "Vários ecrãs KDS com filtros por categoria.",
        "Filtro de estado: mostra apenas Em preparação e Pronto.",
        "Cada zona vê apenas o seu próprio fluxo de pedidos.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet num suporte em latão no pass da cozinha — KDS com filtro de estado" },
    },
    {
      icon: Timer,
      eyebrow: "Cartões e cronómetro",
      heading: "Um toque muda o estado. Notas e alergénios destacados a cores.",
      body: "O cartão do prato mostra as opções escolhidas (sem cebola, bem passado), a nota do cliente, os alergénios e um cronómetro desde o momento em que o pedido foi feito. Toca no cartão e o estado avança para o seguinte: Em espera → Em preparação → Pronto → Servido. A lista é ordenada por prioridade automaticamente.",
      bullets: [
        "Toque no cartão — mudança imediata de estado.",
        "Opções, notas e alergénios destacados a cores.",
        "Ordenação por prioridade: artigos que esperam há mais tempo sobem para o topo.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet num suporte em latão no balcão do bar — KDS com cartões de pedido por mesa" },
    },
  ],

  faq: {
    sub: "O que os restauradores perguntam sobre o ecrã de cozinha no IQ Rest. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
    items: [
      { q: "Que estados de prato existem na cozinha?", a: "Quatro estados com cores diferentes no cartão: Em espera (cinzento) — o pedido foi aceite e aguarda; Em preparação (laranja) — o prato está a ser preparado; Pronto (azul) — pronto a servir; Servido (verde) — entregue ao cliente. Tocar no cartão move-o para o estado seguinte, sem menus nem confirmações." },
      { q: "Posso ter vários ecrãs KDS em zonas diferentes?", a: "Sim. Um tablet na linha quente, outro no bar, um terceiro na pastelaria — cada um com o seu próprio filtro de categoria. Todos os ecrãs estão sincronizados em tempo real: um estado alterado num ecrã atualiza-se em toda a parte." },
      { q: "Que hardware preciso para correr o KDS?", a: "O KDS é uma aplicação web que corre em qualquer browser moderno. Cozinha grande — um tablet num suporte em latão ao pass ou uma TV na parede. Local pequeno — o smartphone do chef. Sem hardware especial, sem instalação: abre um link e inicia sessão na conta." },
      { q: "De onde vêm os pedidos no ecrã de cozinha?", a: "De todas as fontes: o cliente que pediu pelo menu QR à mesa; o empregado que recebeu o pedido pelo telemóvel; o cliente que fez o pedido pelo site. Todos chegam ao KDS com indicação da origem e número de mesa. Sem transferências manuais a partir de um POS." },
      { q: "O que aparece num cartão de pedido?", a: "Nome do prato, modificadores selecionados (sem cebola, bem passado, adicionar molho), comentário do cliente, alergénios destacados, estado (Em espera / Em preparação / Pronto / Servido) e um cronómetro que mostra há quanto tempo o prato aguarda. Os cartões são ordenados por prioridade: quanto maior a espera, mais alto na coluna." },
      { q: "Posso filtrar os cartões no ecrã?", a: "Sim. Dois filtros: por estado (por exemplo mostrar apenas Em espera e Em preparação, esconder Servido) e por categoria (apenas bebidas no bar, apenas pratos principais na cozinha). As definições são guardadas por dispositivo — cada zona mantém o seu próprio conjunto." },
    ],
  },
};
