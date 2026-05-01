import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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

  ctaText: "Começar grátis →",
  demoText: "Ver demo ao vivo",
  microcopy: "14 dias grátis · Sem cartão · Cancela quando quiser",

  header: {
    navFeatures: "Funcionalidades",
    navHow: "Como funciona",
    navPricing: "Preços",
    navFaq: "FAQ",
    signIn: "Entrar",
    cta: "Começar grátis →",
  },

  hero: {
    verticals: ["Restaurantes", "Cafés", "Bares", "Hotéis", "Pizzarias"],
    variants: [
      {
        headline: "Pare de imprimir cardápios.",
        headlineAccent: "Pare de pagar 30% para apps de entrega.",
        sub: "Cardápio QR, pedidos diretos, reservas e site multilíngue. Pronto em 2 minutos — sem cartão.",
      },
      {
        headline: "Seu restaurante merece mais do que",
        headlineAccent: "cardápios de papel e ligações perdidas.",
        sub: "Pedidos diretos, atualizações instantâneas e reservas 24/7. Configurado em 2 minutos.",
      },
      {
        headline: "Um QR code.",
        headlineAccent: "Zero comissão. Adeus papel.",
        sub: "Cardápio QR, pedidos online e reservas — tudo no mesmo lugar. 14 dias grátis, sem cartão.",
      },
      {
        headline: "Receba pedidos diretos.",
        headlineAccent: "Pule a comissão.",
        sub: "Os clientes escaneiam, pedem e pagam — direto para você, sem o corte do iFood. Pronto em 2 minutos.",
      },
      {
        headline: "Mais pedidos. Mais reservas.",
        headlineAccent: "Sem papel, sem apps.",
        sub: "Cardápio QR + reservas + site multilíngue no piloto automático. 14 dias de teste grátis.",
      },
      {
        headline: "Turistas não entendem o cardápio?",
        headlineAccent: "Resolvido em 2 minutos.",
        sub: "A IA traduz todo o cardápio em 35 idiomas. Mais pedidos QR e reservas incluídos.",
      },
      {
        headline: "Do papel ao QR code,",
        headlineAccent: "antes do café esfriar.",
        sub: "Cardápio QR, pedidos diretos e reservas 24/7. Pronto em 2 minutos — sem cartão.",
      },
      {
        headline: "Cardápio QR refrescantemente simples.",
        headlineAccent: "Silenciosamente poderoso.",
        sub: "Pedidos diretos, tradução IA, reservas e site — tudo num toque no telemóvel.",
      },
    ],
    painBullets: [
      "Sem impressões — mude preços ao instante",
      "Zero comissão — pedidos chegam direto",
      "Sem ligações perdidas — reservas 24/7",
      "35 idiomas — nunca perca um turista",
    ],
    rating: "4,9 · mais de 500 restaurantes em 30+ países",
  },

  features: {
    heading: "Tudo o que precisa.",
    headingAccent: "Nada do que não precisa.",
    sub: "Feito para restaurantes. Usado à mesa.",
    items: [
      {
        Icon: ScanLine,
        title: "Fica com 100% de cada pedido",
        desc: "Os clientes escaneiam, pedem e pagam — direto para si. Sem apps para descarregar, sem 30% para a entrega. Cada pedido entra no painel com número da mesa em tempo real.",
      },
      {
        Icon: Languages,
        title: "Venda a turistas no idioma deles",
        desc: "Um toque traduz todo o cardápio em 35 idiomas. A IA pega o contexto culinário — clientes pedem mais quando entendem o prato.",
      },
      {
        Icon: CalendarCheck,
        title: "Pare de perder reservas enquanto cozinha",
        desc: "Clientes reservam 24/7, sem ligações. Confirmação automática ou manual, lembretes por email — menos no-shows, zero stress.",
      },
      {
        Icon: Palette,
        title: "Inesquecível em 1 segundo",
        desc: "Coloque um vídeo da cozinha ou uma foto do prato como fundo do cardápio. Clientes param de scrollar. A sua marca fica.",
      },
      {
        Icon: Smartphone,
        title: "Edita em segundos, não em dias",
        desc: "Mude preços, troque fotos, adicione o prato do dia — pelo telemóvel, entre mesas. Ao vivo para os clientes ao instante. Nunca mais reimprimir.",
      },
      {
        Icon: ListPlus,
        title: "Se sabe enviar WhatsApp, sabe usar",
        desc: "Toque para adicionar um prato. Arraste para reordenar. Desligue o que acabou. Sem manuais, sem tutoriais, sem curva de aprendizagem.",
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
        q: "Posso gerir vários restaurantes numa só conta?",
        a: "Sim. O plano Pro permite vários restaurantes na mesma conta — cardápios separados, QRs separados, estatísticas separadas, um login. Muda entre eles em dois toques.",
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
