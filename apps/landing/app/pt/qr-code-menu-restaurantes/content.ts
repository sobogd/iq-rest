import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "qr-code-menu-restaurantes",
  trackPrefix: "l_pt_qr",

  meta: {
    title: "QR code menu para restaurantes | IQ Rest",
    description:
      "QR code menu para restaurantes: o cliente lê o QR da mesa, abre a carta no browser e pede na sua língua. 14 dias grátis, sem cartão.",
    canonical: "https://iq-rest.com/pt/qr-code-menu-restaurantes",
    ogLocale: "pt_PT",
    ogTitle: "QR code menu para restaurantes",
    ogDescription:
      "QR na mesa, menu no telemóvel — fotos, alergénios, 35 línguas e atualizações em tempo real.",
    brandLine: "IQ Rest — QR code menu para restaurantes",
  },

  hero: {
    headline: "QR code menu para restaurantes.",
    sub: "O cliente aponta a câmara ao QR code da mesa e a carta abre de imediato no browser do telemóvel: fotos dos pratos, alergénios, preços sempre atualizados e tradução automática em 35 línguas. Sem instalar aplicações, sem reimprimir cartas cada vez que muda um preço.",
  },

  scan: {
    heading: "Já tens uma carta em papel ou em PDF?",
    headingAccent: "A IA transforma-a em QR code em 60 segundos.",
    sub: "Carrega uma foto da carta ou o PDF — a IA extrai categorias, pratos e preços e liga-os de imediato ao menu do QR code.",
    cta: "Criar QR code menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Um QR, 35 línguas",
      heading: "Um único QR code, o menu em 35 línguas.",
      body: "O cliente lê o QR code e escolhe a sua língua: a tradução é feita por uma IA com sensibilidade gastronómica, não por um tradutor genérico. Sem cartas separadas para turistas, sem folhas avulsas sobre a mesa.",
      bullets: [
        "Uma única impressão do QR cobre 35 línguas, incluídas na subscrição.",
        "A IA conhece o vocabulário culinário — os pratos soam naturais em cada língua.",
        "O cliente muda de língua dentro do próprio menu, sem voltar a ler o QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dois clientes leem o mesmo QR code da mesa e veem o menu em línguas diferentes" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergénios no QR menu",
      heading: "Alergénios e etiquetas dietéticas dentro do menu QR.",
      body: "Cada prato do menu ligado ao QR code pode levar etiquetas de glúten, lactose, frutos secos, marisco, opções veganas e sem glúten. O cliente filtra no próprio telemóvel os pratos compatíveis com as suas restrições, sem ter de perguntar ao empregado.",
      bullets: [
        "14 categorias de alergénios geridas ao nível de cada prato.",
        "Etiquetas vegano, vegetariano e sem glúten com um clique no painel.",
        "O cliente filtra o menu QR de acordo com as suas restrições.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Cliente filtra o menu QR por alergénios no telemóvel enquanto o proprietário atualiza a lista num tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Mais do que um QR simples",
      heading: "Um QR code menu cuidado como o site do restaurante.",
      body: "Depois de ler o código, o cliente não encontra um PDF cru: vê um ecrã de boas-vindas com vídeo ou foto em destaque, a descrição do restaurante e uma página de contactos com mapa, telefones e redes sociais. O QR torna-se a porta de entrada para o restaurante online.",
      bullets: [
        "Fundo em vídeo ou foto grande no ecrã inicial do menu QR.",
        "Espaço para contar o conceito do restaurante e de cada categoria.",
        "Página de contactos integrada: mapa, telefone, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dois telemóveis numa mesa: ecrã inicial do menu QR com fundo em vídeo e página de contactos com mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos pelo QR · opcional",
      heading: "Pelo QR code o cliente também pode fazer o pedido.",
      body: "Para além de consultar a carta, o menu QR pode tornar-se um canal de pedidos: o cliente acrescenta os pratos ao carrinho e envia o pedido. O pedido chega ao empregado na sala, ao WhatsApp ou ao ecrã da cozinha. A funcionalidade ativa-se ou desativa-se nas definições quando for preciso.",
      bullets: [
        "Carrinho, comentários e envio do pedido a partir do próprio QR.",
        "O pedido chega de imediato à sala, ao WhatsApp ou ao ecrã da cozinha.",
        "Funcionalidade ativável por horário, sala ou restaurante específico.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dois telemóveis numa mesa: carrinho construído a partir do menu QR e confirmação do pedido enviado" },
    },
  ],

  faq: {
    sub: "O que os restauradores perguntam sobre o QR code menu do IQ Rest. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
    items: [
      { q: "Como funciona o QR code menu do IQ Rest?", a: "Cada mesa tem um QR code impresso. O cliente aponta a câmara do telemóvel e o browser abre o menu do restaurante — fotos, descrições, alergénios e preços atualizados. Não é preciso instalar nenhuma aplicação, nem para o cliente nem para o pessoal." },
      { q: "Preciso de conhecimentos técnicos para criar o menu QR?", a: "Não. O painel funciona por clique e arrastar, sem código nem configurações complexas. Acrescentar um prato leva segundos: nome, preço, foto. A configuração inicial costuma demorar 30 minutos a uma hora; se já tens um PDF do menu, a IA converte-o automaticamente." },
      { q: "Os clientes têm de instalar uma app para ler o QR?", a: "Não. A câmara nativa do iPhone e do Android reconhece o QR code em segundos e abre o menu diretamente no browser. O painel de administração também corre em qualquer browser moderno — telemóvel, tablet ou computador." },
      { q: "Como se imprimem os QR codes para as mesas?", a: "Os QR codes são gerados automaticamente no painel (um por mesa ou um único para todo o restaurante) e descarregam-se em PDF prontos a imprimir. Basta uma impressora de escritório e um suporte: cavalete, autocolante ou base de copo." },
      { q: "Posso usar um domínio próprio para o menu QR?", a: "Sim. Suportamos um domínio do restaurante com certificado SSL (por exemplo menu.oteurestaurante.pt): quando o cliente lê o QR, vê o endereço do restaurante e não um subdomínio genérico. A configuração de DNS demora 5 a 10 minutos e ajudamos no processo." },
      { q: "Posso gerir os QR de vários restaurantes a partir de uma só conta?", a: "Sim, mediante pedido. Uma conta pode reunir vários restaurantes, cada um com os seus próprios QR codes, menu, design e analítica. Escreve-nos no WhatsApp e ativamos o modo multi-restaurante." },
      { q: "É complicado lançar o menu QR de raiz?", a: "Três passos: (1) cria as categorias; (2) acrescenta os pratos com nome, preço e foto; (3) imprime os QR codes e coloca-os nas mesas. Se já tens uma carta em papel ou um PDF, carrega-o — a IA reconhece categorias e preços e preenche as cartas. Um menu básico pode estar online em 5 minutos." },
    ],
  },
};
