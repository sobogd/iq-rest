import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restaurantes","Cafés","Bares","Pizzarias"],
    title: "O seu restaurante, digital",
    titleAccent: "em 5 min.",
    sub: "Menu digital, ecrã de cozinha e reservas 24/7 — tudo o que o seu restaurante precisa, pronto em 5 minutos.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurantes" },
      { icon: "cafe", label: "Cafés" },
      { icon: "bar", label: "Bares" },
      { icon: "pizza", label: "Pizzarias" },
    ],
    title: "Tudo o que o seu",
    titleAccent: "restaurante precisa!",
    sub: "Configure os processos em 10 minutos: lance o menu online, otimize a cozinha e acompanhe a ocupação das mesas.",
    primaryLabel: "Começar grátis",
    demoLabel: "Ver demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet com o display de cozinha: pedidos por mesa em colunas com estados" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet com o calendário de reservas: vista mensal e reservas à espera de confirmação" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefone com a página inicial do site de um restaurante: foto, reservas e menu online" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefone com a página de um prato: foto, preço e etiquetas de alérgenos" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "A funcionar em 10 minutos", sub: "Sem equipamento caro nem configurações demoradas" },
    { Icon: MessagesSquare, title: "Suporte rápido", sub: "Respondemos no chat em poucas horas" },
    { Icon: Globe, title: "A escolha de {count} estabelecimentos", sub: "Restaurantes e cafés em mais de 15 países confiam em nós" },
    { Icon: Palette, title: "100% com a sua marca", sub: "Adaptamos o design e a interface ao estilo do seu estabelecimento" },
  ],

  menu: {
    heading: "Site e menu digital",
    sub: {
      link: "Mais do que um menu QR!",
      rest: " Tenha um site completo com design único, página de contactos e reserva de mesas.",
    },
    moreLabel: "Saber mais",
    mockupAlt: "Dois telefones: a página inicial do site de um restaurante e a página de um prato",
    bullets: [
      { Icon: Languages, title: "Tradução automática para 35 idiomas", sub: "Atenda clientes estrangeiros sem barreira de idioma — a tradução automática faz tudo" },
      { Icon: ClipboardList, title: "Pedidos diretamente da mesa", sub: "Simplifique o serviço: receba pedidos da mesa, rápido e sem empregado" },
      { Icon: WheatOff, title: "Alérgenos e dietas", sub: "Marque alérgenos e preferências (vegano, picante) para uma escolha fácil e segura" },
    ],
  },

  reservations: {
    heading: "Reserva de mesas",
    sub: {
      link: "Reservas inteligentes de mesas!",
      rest: " Um sistema de reservas automático que controla sozinho as mesas livres e o seu horário.",
    },
    moreLabel: "Saber mais",
    mockupAlt: "Tablet com o calendário de reservas: mesas por dia e por horário",
    bullets: [
      { Icon: CalendarCheck, title: "Mapa de reservas claro", sub: "Uma grelha por dias e mesas — os lugares livres veem-se num relance" },
      { Icon: SlidersHorizontal, title: "Configuração flexível", sub: "Defina horários, duração dos períodos, fotos das mesas e recolha pedidos dos clientes" },
      { Icon: Users, title: "Controlo do fluxo de clientes", sub: "Escolha como gerir as reservas e mantenha o controlo total do fluxo" },
    ],
  },

  heroMicrocopy: "{count} restaurantes · 14 dias grátis · Sem cartão",
  seeIncluded: "Ver o que inclui",

  trust: [
    { kind: "num", value: 35, label: "Idiomas" },
    { kind: "text", value: "24/7", label: "Reservas" },
    { kind: "num", value: 5, suffix: " min", label: "Arranque" },
    { kind: "count", label: "Restaurantes" },
  ],

  bundle: {
    heading: "Tudo o que move o seu restaurante.",
    headingAccent: "Numa só app.",
    sub: "Menu, cozinha e reservas num único lugar — moderno, rápido e pensado para o dia a dia real de um restaurante. Sem extras, sem custo por funcionalidade.",
  },

  benefits: [
    { Icon: Languages, tag: "Menu digital", title: "Um menu que vende.", bullets: ["35 idiomas com IA","Design premium","Preços atualizados na hora"], image: "/landing/feature-design.webp", imageAlt: "Dois telemóveis na mesa de um café: o ecrã de boas-vindas do menu digital e a página de contactos com mapa" },
    { Icon: ChefHat, tag: "Ecrã de cozinha", title: "Cozinhe mais rápido, sem falhas.", bullets: ["Ao vivo no ecrã","Notas e alergénios","Tablet ou telemóvel"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet no balcão a mostrar o ecrã de cozinha com pedidos por mesa" },
    { Icon: CalendarCheck, tag: "Reservas", title: "Reservas em piloto automático.", bullets: ["Reserva sem chamadas","Confirmação automática","Calendário por mesa"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dois tablets a mostrar o calendário de reservas: vista diária por mesa e vista mensal" },
    { Icon: Receipt, tag: "Pedidos à mesa", title: "Pedidos diretos para a cozinha.", bullets: ["Cliente ou empregado","Direto para a cozinha","Ligue quando quiser"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet com o ecrã de pedidos: lista de pedidos e planta da sala com mesas por cores." },
  ],

  seeDetails: "Ver detalhes",

  extras: {
    heading: "E tudo o resto incluído.",
    items: [
      { Icon: ScanLine, label: "A IA digitaliza o seu menu em papel em 60 segundos" },
      { Icon: QrCode, label: "Um QR code único para cada mesa" },
      { Icon: Smartphone, label: "Sem app para os clientes — abre no navegador" },
      { Icon: Globe, label: "O seu próprio domínio com SSL" },
      { Icon: BarChart3, label: "Análises de vendas: receita, pratos top, horas" },
      { Icon: Palette, label: "Etiquetas de alergénios e dietas para filtrar" },
    ],
  },

  midCta: {
    heading: "Uma app em vez de cinco.",
    sub: "Sem malabarismos com ferramentas separadas para o menu, a cozinha e as reservas — está tudo num só lugar, em qualquer telemóvel ou tablet, sem instalar nada.",
  },

  platform: {
    hardwareTitle: "Trabalhe com o seu próprio hardware",
    hardwareSub: "Nunca o obrigamos a comprar hardware connosco. Use os telemóveis, tablets e computadores que já tem.",
    anywhereTitle: "Funciona em qualquer lugar",
    anywhereSub: "Telemóvel, tablet, portátil, PC. Android, iOS, Windows, Mac, Linux. Funciona em qualquer navegador moderno, sem instalação.",
  },

  activities: {
    heading: "Um só sistema,",
    headingAccent: "todo o seu restaurante.",
    sub: "Serviço mais rápido, uma cozinha mais tranquila, custos menores e uma experiência que os clientes recordam — tudo numa só plataforma.",
    groups: [
      {
        Icon: Smartphone,
        tag: "À mesa — clientes",
        bullets: [
          "Menu QR em 35 idiomas",
          "Pedir sem esperar pelo empregado",
          "Chamar o empregado ou pedir a conta",
          "Reservar mesa 24/7",
          "Um QR code único para cada mesa",
          "Sem app para os clientes — abre no navegador",
          "Etiquetas de alergénios e dietas para filtrar",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Na cozinha",
        bullets: [
          "Os pedidos chegam ao ecrã instantaneamente",
          "Colunas em preparação / pronto / servido",
          "Alérgenos e notas destacados",
          "Tablet ou telemóvel — sem talões em papel",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Gestão",
        bullets: [
          "Alterações de menu e preços em tempo real",
          "Tradução com IA num clique",
          "Análises de vendas e relatórios",
          "Vários restaurantes numa só conta",
          "A IA digitaliza o seu menu em papel em 60 segundos",
          "O seu próprio domínio com SSL",
        ],
      },
    ],
  },
};
