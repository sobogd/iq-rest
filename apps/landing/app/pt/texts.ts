import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "pt",
  htmlDir: "ltr",

  meta: {
    title: "Menu QR para restaurantes — Pedidos diretos, sem comissões | IQ Rest",
    description:
      "Plataforma tudo-em-um para restaurantes: menu digital, pedidos QR, reserva de mesas e ecrã de cozinha. Arranque em 5 minutos. 14 dias grátis, sem cartão.",
    canonical: "https://iq-rest.com/pt",
    ogLocale: "pt_PT",
    ogTitle: "Menu QR para restaurantes — Pedidos diretos, sem comissões",
    ogDescription:
      "Menu digital, pedidos QR, reserva de mesas e tradução IA. Arranque em 5 minutos. 14 dias grátis.",
  },

  ctaText: "Começar grátis",
  homeCtaText: "Crie a sua plataforma",
  demoText: "Ver demonstração",
  microcopy: "14 dias grátis · Sem cartão · Cancela quando quiseres",

  header: {
    navFeatures: "Funcionalidades",
    navHow: "Como funciona",
    navPricing: "Preços",
    navFaq: "FAQ",
    signIn: "Entrar",
    viewFeatures: "Ver funcionalidades",
    cta: "Começar grátis",
  },

  hero: {
    verticals: ["Restaurantes", "Cafés", "Bares", "Hotéis", "Pizzarias"],
    headline: "Menu digital para restaurantes. Online em 5 minutos.",
    sub: "Menu digital para o teu restaurante em 5 minutos. Tudo incluído: editor sem código, reconhecimento IA do menu, códigos QR para as mesas e pedidos diretos sem comissões.",
    dynamicHeadlines: ["0 % de comissão.", "35 línguas IA.", "Pedidos online.", "Reservas 24/7.", "Design premium."],
    painBullets: [
      "0 % de comissão: cada pedido vai diretamente para o teu restaurante.",
      "Tradução IA em 35 línguas — os turistas percebem o menu e pedem mais.",
      "Reserva 24/7: os clientes reservam mesas sozinhos, sem chamadas em hora de ponta.",
      "Preços flexíveis: as alterações do menu ficam online em segundos.",
    ],
    rating: "Mais de 500 restaurantes em mais de 30 países",
  },

  features: {
    heading: "Tudo o que precisas.",
    headingAccent: "Nada a mais.",
    sub: "Feito para restaurantes. Usado todos os dias à mesa, na cozinha e na sala.",
    items: [
      { Icon: Monitor, title: "Menu digital", desc: "Menu no browser com fotos, preços, alergénios e descrições. Atualiza em tempo real a partir do telemóvel. Os clientes veem o menu na sua língua; o restaurante poupa em impressão.", tag: "Menu digital", href: "/pt/menu-digital-restaurantes" },
      { Icon: Receipt, title: "Receção de pedidos: cliente e empregado", desc: "Um código QR à mesa para o cliente, ou o empregado recebe o pedido pelo telemóvel — ambos vão diretamente para a cozinha ou para o WhatsApp. Sem comissões, com número de mesa em cada talão.", tag: "Pedidos", href: "/pt/sistema-de-pedidos-restaurante" },
      { Icon: CalendarCheck, title: "Reserva de mesas 24/7", desc: "Os clientes reservam mesas sozinhos através do site ou do menu QR enquanto estás ocupado na sala. Calendário por mesa, confirmações e lembretes automáticos. Nem um cliente perdido.", tag: "Reservas", href: "/pt/reserva-de-mesas" },
      { Icon: ChefHat, title: "Ecrã de cozinha (KDS)", desc: "Os talões de papel deixam de ser necessários. Os pedidos da sala vão diretamente para o ecrã do chef — colunas «em preparação / pronto / servido», alergénios e notas destacados a cores. Em tablet ou telemóvel.", tag: "KDS", href: "/pt/display-de-cozinha" },
    ],
  },

  founder: {
    eyebrow: "Construído por restaurantes",
    quoteStart:
      "A minha mulher e eu geríamos o nosso próprio café e sabemos em primeira mão como funciona um dia de restaurante — receção de pedidos, reservas, sala e cozinha. Queríamos uma única ferramenta: moderna, fácil de arrancar e clara à primeira vista —",
    quoteAccent: "foi assim que começámos a construir a plataforma que agora desenvolvemos para outros restauradores.",
    sign: "Bogdan Sokolov · fundador, antigo proprietário de café",
    photoAlt: "Bogdan Sokolov, fundador da IQ Rest",
  },

  how: {
    heading: "Online em 5 minutos",
    sub: "Quatro passos curtos. Sem instalações, sem configuração técnica.",
    steps: [
      { n: "1", t: "Tipo e nome", d: "Escolhe o tipo de estabelecimento e introduz o nome." },
      { n: "2", t: "Guardar", d: "Introduz o teu e-mail ou entra com a Google." },
      { n: "3", t: "Menu", d: "Adiciona os artigos manualmente ou carrega um menu impresso para reconhecimento IA." },
      { n: "4", t: "Pronto", d: "Partilha um link ou código QR e começa a receber pedidos." },
    ],
  },

  pricing: {
    badge: "Sem comissões · Sem contratos",
    heading: "Um único plano.",
    headingAccent: "Tudo incluído.",
    sub: "Menu QR, receção de pedidos, tradução IA, site do restaurante e reservas. Um único pagamento mensal transparente.",
    monthlyLabel: "Mensal",
    yearlyLabel: "Anual",
    saveBadge: "Poupa 25 %",
    perMonth: "por mês",
    billedAnnually: "Faturação anual: {total}",
    youSave: "Poupas {amount}",
    trust: { secure: "Pagamento seguro com Stripe", noCommitment: "Sem compromisso", quick: "Ativo em minutos", restaurants: "500+ restaurantes" },
  },

  faq: {
    eyebrow: "Tens dúvidas?",
    heading: "Perguntas",
    headingAccent: "frequentes.",
    sub: "O que os restauradores perguntam antes de se inscreverem. Não encontras a tua pergunta? Escreve-nos no WhatsApp — respondem pessoas reais, não um bot.",
    whatsappCta: "Perguntar no WhatsApp",
    whatsappPrefill: "Olá, tenho uma pergunta sobre o IQ Rest",
    items: [
      { q: "O que inclui o período de teste e o que acontece depois?", a: "Acesso completo a todas as funcionalidades durante 14 dias, sem cartão. Ao fim de 14 dias a conta é pausada se não estiver associado um método de pagamento — nunca cobramos automaticamente. Podes adicionar pagamento mais tarde e continuar onde paraste. Cancelas a qualquer momento com um clique." },
      { q: "Cobram comissão sobre os pedidos?", a: "Não. Cada pedido a partir do menu QR vai diretamente para o restaurante — sem percentagem do nosso lado, sem comissões de agregadores. Um único pagamento mensal fixo e mais nada." },
      { q: "Os clientes precisam de uma app? Precisamos de conhecimentos técnicos?", a: "Os clientes não precisam de app — apontam a câmara do telemóvel para o código QR e o menu abre no browser. Os restaurantes também não precisam de conhecimentos técnicos: o painel de administração corre em qualquer browser moderno em telemóvel, tablet ou computador. Cada ação é por clique e arrastar e largar, sem código." },
      { q: "Com que rapidez mudam os preços e aparecem novos pratos?", a: "Imediatamente. Muda um preço a partir do telemóvel — os clientes veem-no em segundos. Um novo prato leva alguns toques: nome, preço, foto. Sem reimpressão, sem esperar por um designer." },
      { q: "Quantas línguas são suportadas?", a: "35 línguas com tradução IA integrada. Um toque e todo o menu é traduzido; a IA percebe o contexto culinário — nomes e descrições soam naturais em qualquer língua. Os turistas pedem com mais confiança quando percebem realmente o menu." },
    ],
  },

  finalCta: {
    heading: "Online em 5 minutos.",
    headingAccent: "14 dias grátis.",
    sub: "Sem cartão, cancela quando quiseres. Junta-te a mais de 500 restaurantes que já trabalham com o IQ Rest.",
  },

  scan: {
    heading: "Tens um menu em papel ou PDF?",
    headingAccent: "A IA digitaliza-o em 60 segundos.",
    sub: "Carrega uma foto ou documento — a IA reconhece automaticamente categorias, pratos e preços.",
    cta: "Digitalizar menu →",
  },

  pricingHero: {
    chips: ["Sem comissões", "Sem contratos", "14 dias grátis"],
    heading: "Preços.",
    headingAccent: "Sem custos escondidos.",
    sub: "Um único pagamento mensal transparente. Sem percentagem sobre pedidos nem comissões de agregadores. Cancela a subscrição quando quiseres.",
    popularBadge: "Popular",
    perMonthSuffix: "/mês",
    whenAnnualTemplate: "faturação anual · {total} por ano",
    orMonthlyTemplate: "ou {price}/mês",
    savingsTemplate: "poupas {amount} por ano",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Menu, pedidos QR e tradução IA. Online em 5 minutos.",
        features: [
          "Menu QR para cada mesa",
          "Menu digital com fotos e alergénios",
          "Tradução IA em 35 línguas",
          "Pedidos a partir do menu (opcional)",
          "Geração IA de fotos de pratos",
          "Gestão a partir de qualquer telemóvel ou tablet",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Controlo total do restaurante: ecrã de cozinha e reservas.",
        features: [
          "Tudo no Basic",
          "Ecrã de cozinha (KDS)",
          "Reserva de mesas online 24/7",
          "Apoio prioritário no WhatsApp",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/pt/menu-digital-restaurantes", label: "Menu digital" },
      { href: "/pt/sistema-de-pedidos-restaurante", label: "Pedidos" },
      { href: "/pt/reserva-de-mesas", label: "Reservas" },
      { href: "/pt/display-de-cozinha", label: "Ecrã de cozinha" },
    ],
    navLinks: [
      { href: "/pt/precos", label: "Preços" },
      { href: "#faq", label: "FAQ" },
      { href: "/pt/languages", label: "Mudar idioma" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Todos os direitos reservados.",
  },
};
