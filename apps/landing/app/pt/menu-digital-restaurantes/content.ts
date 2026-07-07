import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "menu-digital-restaurantes",
  trackPrefix: "l_pt_digital",
  featureHeading: {
    heading: "Mais do que um menu",
    sub: "Tudo o que transforma um menu QR num serviço para a sua sala e a sua cozinha.",
  },

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
      eyebrow: "Tradução IA",
      heading: "Menu em 35 idiomas",
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
      heading: "Alergénios e dietas nos pratos",
      body: "Marca glúten, lactose, frutos secos, vegano e sem glúten. Os clientes filtram o menu à sua dieta e pedem sem problemas.",
      bullets: [
        "14 categorias de alergénios",
        "Etiquetas vegano e sem glúten",
        "Filtram pela sua dieta",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Cliente filtra o menu por alergénios no telemóvel enquanto o proprietário edita a lista de alergénios num tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Design e marca",
      heading: "Menu premium no teu domínio",
      body: "Ecrã de boas-vindas em vídeo, o teu próprio design e uma página de contactos com mapa e redes — no teu domínio, não um PDF.",
      bullets: [
        "Vídeo e design premium",
        "O teu domínio com SSL",
        "Contactos, mapa e redes",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dois telemóveis numa mesa de café: ecrã inicial do menu com fundo em vídeo e página de contactos com mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos",
      heading: "Pedidos online, zero comissão",
      body: "Os clientes pedem pelo menu ou direto ao teu WhatsApp — chega à sala ou à cozinha, com 0% retido das vendas.",
      bullets: [
        "Pelo menu ou WhatsApp",
        "À sala ou cozinha, 0%",
        "Ativa nas definições",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dois telemóveis numa mesa: carrinho com pedido e confirmação de envio" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservas",
      heading: "Reserva de mesa, 24/7",
      body: "Os clientes reservam mesa pelo menu ou por um link, vês o calendário por mesa e confirmas auto ou manualmente.",
      bullets: [
        "Os clientes reservam sozinhos",
        "Calendário por mesa",
        "Confirmação auto ou manual",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Gestão",
      heading: "Gere de qualquer lugar",
      body: "O painel corre em qualquer browser — telemóvel, tablet ou PC. Nada para instalar e um menu básico fica online em minutos.",
      bullets: [
        "Qualquer dispositivo e browser",
        "Nada para instalar",
        "Online em minutos",
      ],
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
