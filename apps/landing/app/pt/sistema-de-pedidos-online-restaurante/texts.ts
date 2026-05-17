import { QrCode, MessageCircle, ChefHat, Settings2, Languages, BarChart3 } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /pt/sistema-de-pedidos-online-restaurante targets the broad-match
// Portuguese keyword family around "sistema de pedidos online para
// restaurante". NOT a delivery-aggregator competitor: the order goes
// from the guest's QR menu to your kitchen tablet or to your
// restaurant's WhatsApp number. Online card payment is opt-in custom
// integration, not enabled by default.
export const TEXTS: LandingTexts = {
  htmlLang: "pt",
  htmlDir: "ltr",

  meta: {
    title: "Sistema de Pedidos Online para Restaurante — QR e WhatsApp | IQ Rest",
    description:
      "Sistema de pedidos online para o seu restaurante: o cliente lê o QR, faz o pedido, e chega direto ao tablet da cozinha ou ao seu WhatsApp. Sem comissões, com número da mesa. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/sistema-de-pedidos-online-restaurante",
    ogLocale: "pt_PT",
    ogTitle: "Sistema de Pedidos Online para Restaurante — Direto à Cozinha",
    ogDescription:
      "O cliente lê o QR à mesa, faz o pedido e chega ao seu tablet ou WhatsApp — sem agregador, sem comissões, com número da mesa em cada comanda.",
  },

  ctaText: "Ativar pedidos",
  demoText: "Ver demo ao vivo",
  microcopy: "Desde 6,90€/mês · 14 dias grátis · Cancela quando quiseres",

  header: {
    navFeatures: "Funcionalidades",
    navHow: "Como funciona",
    navPricing: "Preços",
    navFaq: "FAQ",
    signIn: "Entrar",
    cta: "Testa grátis",
  },

  hero: {
    verticals: ["Restaurantes", "Cafés", "Bares", "Pizzarias", "Tabernas", "Cervejarias"],
    headline: "Sistema de Pedidos Online para Restaurante.",
    sub: "O cliente lê o QR da mesa, monta o pedido no telemóvel e a comanda chega direta ao tablet da cozinha ou ao WhatsApp do restaurante. Sem agregador, sem comissões, número da mesa em cada comanda.",
    dynamicHeadlines: [
      "Pedidos à mesa.",
      "Direto ao tablet da cozinha.",
      "Ou direto ao WhatsApp.",
      "Zero comissões.",
      "Com número da mesa.",
    ],
    painBullets: [
      "Sistema de pedidos online que o restaurante controla — sem intermediário, sem comissão.",
      "Os pedidos chegam ao tablet da cozinha ou do gerente com número da mesa, modificadores, alergénios e notas.",
      "Ou enviados ao WhatsApp do restaurante — perfeito para take-away e equipas pequenas.",
      "QR por mesa (ou um único para todo o local) gerado automaticamente.",
    ],
    rating: "+500 restaurantes em 30 países",
  },

  features: {
    heading: "Um sistema de pedidos",
    headingAccent: "pensado para a mesa.",
    sub: "Funcionalidade real, não um clone de agregador de entregas.",
    items: [
      {
        Icon: QrCode,
        title: "Menu QR com carrinho em cada mesa",
        desc: "O cliente lê o QR da mesa, navega o menu no seu idioma, adiciona pratos com modificadores, deixa nota para a cozinha e envia. Sem aplicação para instalar.",
        tag: "Pedidos QR",
      },
      {
        Icon: ChefHat,
        title: "Comandas no tablet da cozinha",
        desc: "Cada pedido aparece no separador Cozinha — no tablet que tem ao pass — com número da mesa, pratos, variantes, alergénios e comentário do cliente. Move de em curso para concluído num toque.",
        tag: "Vista cozinha",
      },
      {
        Icon: MessageCircle,
        title: "Ou envia para WhatsApp",
        desc: "Põe o restaurante em modo WhatsApp (ou ambos ao mesmo tempo) e cada pedido chega ao WhatsApp do local como mensagem formatada — ideal para take-away ou quando o gerente está fora.",
        tag: "Modo WhatsApp",
      },
      {
        Icon: Settings2,
        title: "Modificadores, variantes e alergénios",
        desc: "Cada prato leva os seus grupos de variantes (tamanho, ponto, extras) com diferença de preço, etiquetas de alergénios e descrição livre. O carrinho respeita tudo — a comanda no tablet não tem ambiguidade.",
        tag: "Carrinho real",
      },
      {
        Icon: Languages,
        title: "Checkout multilingue",
        desc: "Todo o fluxo de pedido — carrinho, modificadores, comentário, confirmação — está traduzido em 35 idiomas e adapta-se ao idioma do telemóvel do cliente. Os turistas pedem com confiança.",
        tag: "35 idiomas",
      },
      {
        Icon: BarChart3,
        title: "Numeração diária e registo",
        desc: "Cada pedido recebe número do dia para a cozinha, fica num registo com totais e timestamps e alimenta a analítica. Cancelamentos são soft-deleted — relatórios continuam limpos.",
        tag: "Registo de pedidos",
      },
    ],
  },

  founder: {
    eyebrow: "Construído por um dono de café, não por uma startup de entregas",
    quoteStart:
      "Eu e a minha mulher abrimos um café e passámos semanas à procura de uma forma de receber pedidos à mesa que não desse 30% a um agregador nem exigisse um POS de 1500€. Tudo o que experimentámos era pesado, caro ou sem o essencial —",
    quoteAccent: "então construímos o sistema de pedidos que gostaríamos de ter.",
    sign: "Bogdan Sokolov · fundador, ex-dono de café",
    photoAlt: "Bogdan, fundador da IQ Rest",
  },

  how: {
    heading: "Ativa o teu sistema de pedidos",
    headingAccent: "em 4 passos",
    sub: "Sem instalação, sem integrador, sem chamada ao informático. Só o telemóvel e 5 minutos.",
    steps: [
      { n: "1", t: "Cria o restaurante", d: "Email ou Google — 30 segundos." },
      { n: "2", t: "Adiciona o menu", d: "Drag-and-drop ou scan IA de menu em papel." },
      { n: "3", t: "Escolhe o canal", d: "Tablet de cozinha, WhatsApp ou ambos." },
      { n: "4", t: "Imprime o QR", d: "Um QR por mesa — clientes começam a pedir já." },
    ],
  },

  pricing: {
    badge: "Pedidos ilimitados · Zero comissões",
    heading: "Um plano.",
    headingAccent: "Sem custo por pedido.",
    sub: "Pedidos online, menu QR, modo WhatsApp, checkout multilingue e analítica — tudo numa só subscrição. Sem percentagem por transação.",
    monthlyLabel: "Mensal",
    yearlyLabel: "Anual",
    saveBadge: "Poupa 25%",
    perMonth: "por mês",
    billedAnnually: "Faturado anualmente {total}",
    youSave: "Poupas {amount}",
    trust: {
      secure: "Subscrição faturada via Stripe",
      noCommitment: "Sem compromisso",
      quick: "Ativo em minutos",
      restaurants: "+500 restaurantes",
    },
  },

  faq: {
    eyebrow: "Sistema de pedidos — perguntas frequentes",
    heading: "Sobre o sistema de",
    headingAccent: "pedidos.",
    sub: "O que os donos perguntam antes de ativar pedidos online com IQ Rest. Não vês a tua pergunta? Escreve no WhatsApp — respondem pessoas reais.",
    whatsappCta: "Pergunta no WhatsApp",
    whatsappPrefill: "Olá, tenho uma pergunta sobre os pedidos IQ Rest",
    items: [
      {
        q: "É uma plataforma de entregas como Uber Eats ou Glovo?",
        a: "Não, esse é precisamente o ponto. IQ Rest é o canal de pedidos próprio do restaurante — o cliente pede do teu QR, a comanda chega ao teu tablet ou WhatsApp, tu serves. Sem marketplace, sem catálogo de agregador, e nunca cobramos parte da conta.",
      },
      {
        q: "Onde aparecem exatamente os pedidos?",
        a: "No separador Cozinha do painel IQ Rest, em qualquer tablet ou telemóvel ao pass ou ao balcão. Cada pedido mostra número da mesa, pratos com variantes e alergénios, comentário do cliente e número do dia. Movimentas: novo → em curso → concluído num toque.",
      },
      {
        q: "Posso receber os pedidos no WhatsApp em vez disso?",
        a: "Sim. Cada restaurante tem três modos: interno (só tablet de cozinha), WhatsApp (pedido como mensagem ao WhatsApp do local) ou ambos ao mesmo tempo. O modo é um interruptor no painel — mudas quando quiseres.",
      },
      {
        q: "O que contém um pedido?",
        a: "Pratos com variantes e extras (com diferença de preço), alergénios, número da mesa, comentário livre e — se ativares os campos — nome, telefone e morada. Suficiente para enviar um take-away ou avisar a mesa de um alergénio.",
      },
      {
        q: "Os clientes podem pagar online no menu?",
        a: "Não por defeito. IQ Rest é pensado para pagamento à mesa — o cliente pede, levas a conta, paga como sempre. Se precisares de pagamento online (típico para take-away), pode-se integrar Stripe Connect a pedido; escreve no WhatsApp.",
      },
      {
        q: "Preciso de tablet especial, impressora ou hardware POS?",
        a: "Não. Qualquer tablet, portátil ou telemóvel com browser funciona — abre o painel, faz login, deixa o separador Cozinha aberto. Se já tens POS, IQ Rest convive com ele; não substitui a caixa.",
      },
      {
        q: "O que acontece depois dos 14 dias grátis?",
        a: "Sem método de pagamento, a conta pausa — nunca cobramos automaticamente. Menu, pedidos e definições ficam guardados; adiciona dados quando quiseres para reativar. Cancelas num clique, sem compromisso.",
      },
    ],
  },

  finalCta: {
    heading: "Ativa o teu sistema de pedidos.",
    headingAccent: "Pronto em 5 minutos.",
    sub: "14 dias grátis, sem cartão. Cancela quando quiseres. Junta-te a 500+ restaurantes que gerem os pedidos com IQ Rest.",
  },

  scan: {
    heading: "De menu de papel a sistema de pedidos",
    headingAccent: "em 60 segundos",
    sub: "Envia uma foto do menu — a IA extrai categorias, pratos e preços para o editor. A partir daí, carrinho e QR são um clique.",
    cta: "Digitalizar menu →",
  },

  footer: {
    featureLinks: [
      { href: "/pt/ai-translation", label: "Tradução com IA" },
      { href: "/pt/reservations", label: "Reservas" },
      { href: "/pt/mobile-management", label: "Gestão móvel" },
      { href: "/pt/easy-menu", label: "Editor de menu" },
      { href: "/pt/custom-design", label: "Fundos vídeo e foto" },
      { href: "/pt/color-scheme", label: "Cores da marca" },
      { href: "/pt/multilingual", label: "Menu multilingue" },
      { href: "/pt/ai-images", label: "Otimização de fotos IA" },
      { href: "/pt/analytics", label: "Analítica" },
      { href: "/pt/instant-setup", label: "Configuração instantânea" },
      { href: "/pt/personal-support", label: "Suporte pessoal" },
    ],
    navLinks: [
      { href: "#pricing", label: "Preços" },
      { href: "#faq", label: "Perguntas" },
      { href: "/pt/changelog", label: "Novidades" },
      { href: "/pt/languages", label: "Mudar idioma" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Todos os direitos reservados.",
  },
};
