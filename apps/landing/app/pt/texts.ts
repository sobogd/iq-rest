import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "pt",
  htmlDir: "ltr",

  meta: {
    title: "Cardápio QR para Restaurantes — Pedidos Diretos, Zero Comissão | IQ Rest",
    description:
      "Chega de cardápios em papel e comissões dos apps de delivery. Cardápio QR, pedidos diretos, reservas e site multilíngue. 14 dias grátis, sem cartão.",
    canonical: "https://iq-rest.com/pt",
    ogLocale: "pt_PT",
    ogTitle: "Cardápio QR para Restaurantes — Pedidos Diretos, Zero Comissão",
    ogDescription:
      "Cardápio QR, pedidos diretos, reservas e tradução IA. Pronto em 2 minutos. 14 dias grátis — sem cartão.",
  },

  ctaText: "Testar grátis", ctaSite: "Criar site",
  demoText: "Ver demo ao vivo",
  microcopy: "14 dias grátis · Sem cartão · Cancela quando quiser",

  header: {
    navFeatures: "Funcionalidades",
    navHow: "Como funciona",
    navPricing: "Preços",
    navFaq: "FAQ",
    signIn: "Entrar",
    cta: "Testar grátis",
  },

  hero: {
    verticals: ["Restaurantes", "Cafés", "Bares", "Hotéis", "Pizzarias"],
    qr: { headline: "Menu QR para o seu restaurante em 5 minutos.", sub: "Pedidos diretos, reservas e 35 idiomas. Sem comissões ou programadores." },
    web: { headline: "Site profissional para restaurante em 5 minutos.", sub: "Pedidos diretos, reservas e 35 idiomas. Sem comissões ou programadores." },
    painBullets: ["0% Comissão: Todos os pedidos vão diretamente para si.", "Tradução IA: 35 idiomas para aumentar o gasto de turistas.", "Reservas 24/7: Casa cheia sem chamadas extras.", "Preços flexíveis: Atualize o menu em segundos."],
    rating: "4,9 · mais de 500 restaurantes em 30+ países",
  },

  features: {
    heading: "Tudo o que precisa.",
    headingAccent: "Nada do que não precisa.",
    sub: "Feito para restaurantes. Usado à mesa.",
    items: [
      
      {
        Icon: ScanLine,
        title: "Pedidos da mesa",
        desc: "Os pedidos chegam instantaneamente ao WhatsApp ou painel com o número da mesa. Serviço mais rápido.",
        tag: "Pedidos diretos",
      },
      {
        Icon: Languages,
        title: "Tradutor IA (35 idiomas)",
        desc: "A nossa IA entende de gastronomia. Os turistas pedem 20% mais quando entendem a ementa.",
        tag: "Tradução IA",
      },
      {
        Icon: CalendarCheck,
        title: "Reserva de mesas",
        desc: "O sistema aceita reservas enquanto está na cozinha. Nunca mais perca um cliente.",
        tag: "Reservas",
      },
      {
        Icon: Palette,
        title: "Design moderno",
        desc: "Fundos de vídeo e fotos apelativas. O seu menu parece premium e desperta o apetite.",
        tag: "Design personalizado",
      },
      {
        Icon: Smartphone,
        title: "Editor rápido",
        desc: "Gira a lista de esgotados e preços pelo telemóvel. Mudanças em tempo real para os clientes.",
        tag: "Editor de menu",
      },
      {
        Icon: ChefHat,
        title: "Brevemente: Ecrã de cozinha",
        desc: "Esqueça os talões de papel. Os pedidos da sala vão direto para o ecrã do chef.",
        tag: "Em breve",
      },
    
    ],
  },

  founder: {
    eyebrow: "Feito por um dono de restaurante",
    quoteStart:
      "A minha mulher e eu abrimos um café e passámos semanas à procura de um sistema que tivesse pedidos online, reservas e visual moderno. Tudo o que tentámos era pesado, feio ou faltava metade das funções —",
    quoteAccent: "então construímos o que gostaríamos de ter.",
    sign: "Bogdan Sokolov · fundador, ex-dono de café",
    photoAlt: "Bogdan, fundador do IQ Rest",
  },

  how: {
    heading: "Pronto em menos de 2 minutos",
    sub: "Quatro passos curtos. Sem instalações, sem configurações técnicas.",
    steps: [
      { n: "1", t: "Registe-se", d: "Email ou Google. Sem cartão. Em 10 segundos." },
      { n: "2", t: "Nome do restaurante", d: "Escreva o nome. Aparece no topo do cardápio." },
      { n: "3", t: "Adicione o primeiro prato", d: "Categoria, nome, preço, foto. É só isso." },
      { n: "4", t: "Escolha a capa e imprima o QR", d: "Escolha o fundo. Pegue o QR. Cole nas mesas." },
    ],
  },

  pricing: {
    badge: "Zero comissão · Zero contratos",
    heading: "Um plano.",
    headingAccent: "Tudo incluído.",
    sub: "Cardápio QR, pedidos, tradução IA, site do restaurante e reservas. Um preço simples.",
    monthlyLabel: "Mensal",
    yearlyLabel: "Anual",
    saveBadge: "Poupa 25%",
    perMonth: "por mês",
    billedAnnually: "Faturação anual {total}",
    youSave: "Poupa {amount}",
    trust: {
      secure: "Pagamento seguro com Stripe",
      noCommitment: "Sem fidelização",
      quick: "Ativo em minutos",
      restaurants: "+500 restaurantes",
    },
  },

  faq: {
    eyebrow: "Tem dúvidas?",
    heading: "Perguntas",
    headingAccent: "frequentes.",
    sub: "O que os donos perguntam antes de se registarem. Não vê a sua? Escreva pelo WhatsApp — respondem pessoas reais.",
    whatsappCta: "Pergunte no WhatsApp",
    whatsappPrefill: "Olá, tenho uma pergunta sobre o IQ Rest",
    items: [
      {
        q: "O que inclui a prova gratuita e o que acontece depois?",
        a: "14 dias, acesso total, sem cartão. Após 14 dias a sua conta pausa se não adicionar um método de pagamento — nunca cobramos automaticamente. Adicione depois para reativar. Cancele com um clique a qualquer altura.",
      },
      {
        q: "Cobram comissão pelos pedidos?",
        a: "Zero. Cada pedido do seu cardápio QR vai direto para si — sem fatia nossa, sem taxas iFood / Uber Eats. Um preço mensal fixo, é só.",
      },
      {
        q: "Os meus clientes precisam de uma app? Preciso de saber de tecnologia?",
        a: "Zero apps para os clientes — escaneiam o QR com a câmara, o cardápio abre no navegador. Zero técnica para si — todo o painel funciona no telemóvel, toca para adicionar, arrasta para reordenar, é isso.",
      },
      {
        q: "Quão rápido mudo preços e adiciono pratos?",
        a: "Ao instante. Mude um preço pelo telemóvel, os clientes vêem em segundos. Prato novo? Toca, escreve, foto, pronto — sem reimpressões, sem esperar pelo designer.",
      },
      {
        q: "Quantos idiomas suportam?",
        a: "35 idiomas com tradução IA integrada. Um toque traduz todo o cardápio, e a IA percebe o contexto culinário — nomes e descrições soam naturais em cada idioma. Os turistas pedem mais quando entendem mesmo.",
      },
    ],
  },

  finalCta: {
    heading: "Pronto em 2 minutos.",
    headingAccent: "Grátis por 14 dias.",
    sub: "Sem cartão. Cancele quando quiser. Junte-se a +500 restaurantes já com IQ Rest.",
  },

  scan: {
    heading: "Tens um menu em papel ou PDF?",
    headingAccent: "A IA digitaliza-o em 60 segundos.",
    sub: "Carrega — a IA extrai categorias, pratos e preços.",
    cta: "Digitalizar o menu →",
  },
  footer: {
    featureLinks: [
      { href: "/pt/online-orders", label: "Pedidos online" },
      { href: "/pt/ai-translation", label: "Tradução com IA" },
      { href: "/pt/reservations", label: "Reservas" },
      { href: "/pt/mobile-management", label: "Gestão pelo telemóvel" },
      { href: "/pt/easy-menu", label: "Editor do cardápio" },
      { href: "/pt/custom-design", label: "Fundos vídeo e foto" },
      { href: "/pt/color-scheme", label: "Cores da marca" },
      { href: "/pt/multilingual", label: "Site multilíngue" },
      { href: "/pt/ai-images", label: "Otimização de fotos com IA" },
      { href: "/pt/analytics", label: "Analytics" },
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
