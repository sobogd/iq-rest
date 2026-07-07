import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "menu-digital-restaurantes",
  trackPrefix: "l_pt_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Menu digital para restaurantes | IQ Rest",
    description:
      "Menu digital para restaurantes: carta online com fotos, alergénios, tradução IA e atualizações de preços em tempo real. 14 dias grátis, sem cartão.",
    canonical: "https://iq-rest.com/pt/menu-digital-restaurantes",
    ogLocale: "pt_PT",
    ogTitle: "Menu digital para restaurantes",
    ogDescription:
      "Versão online da tua carta em papel — fotos, alergénios, tradução IA, atualizações em tempo real.",
    brandLine: "IQ Rest — Menu digital para restaurantes",
  },

  hero: {
    headline: "Um menu digital\nque tem tudo",
    cta: "Criar menu digital",
    sub: "Fotos, alergénios e tradução em 35 idiomas. Mais pedidos, WhatsApp e reserva de mesa — tudo num só IQ Rest.",
  },

  scan: {
    heading: "Tens um menu em papel ou PDF?",
    headingAccent: "A IA digitaliza-o em 60 segundos.",
    sub: "Carrega uma foto ou documento — a IA reconhece automaticamente categorias, pratos e preços.",
    cta: "Digitalizar menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 idiomas com IA",
      heading: "35 idiomas que todos leem",
      body: "Um QR, 35 idiomas. A IA traduz com contexto culinário, cada prato soa natural. Os turistas pedem com confiança.",
      bullets: [
        "35 idiomas no teu plano",
        "IA culinária, não Google",
        "Troca de idioma num toque",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dois clientes leem o mesmo menu digital em idiomas diferentes nos seus próprios telemóveis" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergénios",
      heading: "Alergénios e dietas em cada prato",
      body: "Marca glúten, lactose, frutos secos, vegano e sem glúten. Os clientes filtram o menu à sua dieta e pedem sem problemas.",
      bullets: [
        "14 categorias de alergénios",
        "Etiquetas vegano e sem glúten",
        "Filtram pela sua dieta",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Cliente filtra o menu por alergénios no telemóvel enquanto o proprietário edita a lista de alergénios num tablet" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Qualquer dispositivo",
      heading: "Gere de qualquer dispositivo",
      body: "O painel corre no browser — edita menu, preços e fotos onde estiveres. Não há nada para instalar.",
      bullets: [
        "Corre em qualquer browser",
        "Telemóvel, tablet ou PC",
        "Nada para instalar",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Sem comissão",
      heading: "Zero comissão, sem extras",
      body: "Uma subscrição transparente. Não ficamos com parte das tuas receitas nem escondemos taxas — fica tudo no restaurante.",
      bullets: [
        "Zero por cento nos pedidos",
        "Sem extras escondidos",
        "Um preço único",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Domínio próprio",
      heading: "Menu no teu próprio domínio",
      body: "Ligamos o teu domínio com SSL — os clientes veem o menu na morada do restaurante. Ajudamos com o DNS em 10 minutos.",
      bullets: [
        "O teu domínio com SSL",
        "menu.oteurestaurante.pt",
        "Ajudamos com o DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "O teu design",
      heading: "Design flexível à tua medida",
      body: "Vários layouts e estilos prontos — escolhe a capa, as cores e a apresentação dos pratos que combinam com o teu espaço.",
      bullets: [
        "Vários layouts prontos",
        "A tua capa e cores",
        "Muda o estilo em cliques",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Contactos",
      heading: "Contactos e redes no menu",
      body: "Uma página com mapa, telefone e links para Instagram e WhatsApp — os clientes encontram-te num só toque.",
      bullets: [
        "Mapa, telefone e morada",
        "Instagram e WhatsApp",
        "Chega a ti num toque",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Pedidos por WhatsApp",
      heading: "Recebe pedidos por WhatsApp",
      body: "Os clientes montam o carrinho e enviam o pedido direto para o teu WhatsApp — sem outra app, no chat que já usam.",
      bullets: [
        "Pedido ao teu WhatsApp",
        "Sem outra app",
        "O chat do costume",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservas",
      heading: "Reserva de mesa sem chamadas",
      body: "Os clientes reservam mesa pelo menu ou por um link, vês o calendário por mesa e confirmas auto ou manualmente.",
      bullets: [
        "Reservas 24/7, sem chamadas",
        "Calendário por mesa",
        "Confirmação auto ou manual",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Parece um site, não um PDF",
      body: "Vídeo de fundo no ecrã de boas-vindas, o teu conceito descrito e uma página de contactos à parte com mapa e redes.",
      bullets: [
        "Vídeo no ecrã inicial",
        "Conceito e pratos descritos",
        "Página de contactos à parte",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dois telemóveis numa mesa de café: ecrã inicial do menu com fundo em vídeo e página de contactos com mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos · opcional",
      heading: "Pedidos direto do menu",
      body: "Os clientes montam o carrinho e enviam o pedido — chega à sala, ao WhatsApp ou ao ecrã de cozinha. Opcional.",
      bullets: [
        "Carrinho e envio num toque",
        "Sala, WhatsApp ou cozinha",
        "Ativa nas definições",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dois telemóveis numa mesa: carrinho com pedido e confirmação de envio" },
    },
  ],

  faq: {
    sub: "O que os restauradores perguntam sobre o menu digital no IQ Rest. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
    items: [
      { q: "Preciso de conhecimentos técnicos ou experiência com CMS?", a: "Não, não são necessários conhecimentos específicos. Cada ação no painel de admin é por clique e arrastar e largar — sem código. Adicionar um artigo ao menu leva alguns segundos: nome, preço, foto. A configuração completa de um menu costuma demorar 30 minutos a uma hora." },
      { q: "O que é o menu digital do IQ Rest?", a: "O IQ Rest é uma plataforma cloud para restaurantes. O menu digital é a versão online do teu menu, disponível para os clientes através de código QR ou link direto: fotos de pratos, preços, alergénios, tradução IA em 35 línguas, atualizações em tempo real. O menu está alojado nos nossos servidores; não tens de instalar nem manter software — basta abrir um browser." },
      { q: "Os clientes precisam de uma app ou hardware especial?", a: "Não. Os clientes apontam a câmara do telemóvel para o código QR e o menu abre no browser. O painel de admin do restaurante também corre em qualquer browser moderno — telemóvel, tablet ou computador. Os códigos QR imprimem-se em qualquer impressora de escritório." },
      { q: "Posso alojar o menu no meu próprio domínio?", a: "Sim. Suportamos um domínio personalizado com certificado SSL — os clientes veem o menu na morada do teu restaurante (por exemplo menu.oteurestaurante.pt). Ajudamos com a configuração de DNS; costuma demorar 5 a 10 minutos." },
      { q: "Posso gerir vários restaurantes a partir de uma conta?", a: "Sim, mediante pedido. Uma conta pode alojar vários restaurantes: cada estabelecimento com o seu próprio menu, design, códigos QR e analítica. Escreve-nos no WhatsApp e ativamos o modo multi-restaurante para o teu grupo." },
      { q: "Quão difícil é configurar o menu de raiz?", a: "A configuração tem três passos: (1) criar categorias; (2) adicionar artigos com nomes, preços e fotos; (3) imprimir códigos QR para as mesas. Se já tens um menu em papel ou PDF, carrega-o — a IA reconhece categorias, nomes e preços e preenche as cartas automaticamente. Um menu básico pode ficar online em 5 minutos; o tempo total depende do número de artigos." },
      { q: "Que tipo de apoio oferecem?", a: "Estamos disponíveis no WhatsApp em horário de expediente e respondemos rapidamente por e-mail. Ajudamos na configuração inicial, configuração de domínio, design do menu e em qualquer situação fora do comum. Se precisares de uma demonstração ou apoio durante o lançamento — escreve-nos." },
    ],
  },
};
