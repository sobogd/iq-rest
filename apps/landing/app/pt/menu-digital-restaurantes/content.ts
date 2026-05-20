import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "menu-digital-restaurantes",
  trackPrefix: "l_pt_digital",

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
    headline: "Menu digital para restaurantes.",
    sub: "Versão online da tua carta em papel com fotos, alergénios, descrições e atualizações de preços em tempo real. Os clientes veem o menu na sua língua; o restaurante poupa em impressão.",
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
      eyebrow: "35 línguas IA",
      heading: "35 línguas IA — cada cliente lê o menu na sua própria.",
      body: "Um único código QR, 35 línguas. A IA percebe o contexto culinário — os nomes e descrições de pratos soam naturais. Os turistas pedem com mais confiança e o ticket médio cresce sem o empregado ter de traduzir cada prato.",
      bullets: [
        "35 línguas incluídas na subscrição, sem custo adicional.",
        "IA consciente do contexto culinário, não Google Translate em bruto.",
        "O cliente muda de língua com um toque dentro do próprio menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dois clientes leem o mesmo menu digital em línguas diferentes nos seus telemóveis" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergénios",
      heading: "Etiquetas de alergénios e dietas.",
      body: "Marca os pratos para glúten, lactose, frutos secos, mariscos, opções veganas e sem glúten. Os clientes filtram o menu segundo as suas necessidades alimentares e pedem com maior confiança.",
      bullets: [
        "14 categorias-padrão de alergénios em cada prato.",
        "Etiquetas vegano, vegetariano e sem glúten num único clique.",
        "Os clientes filtram o menu segundo as suas restrições alimentares.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Cliente filtra o menu por alergénios no telemóvel enquanto o proprietário edita a lista de alergénios num tablet" },
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Design premium com fundo em vídeo e página de contactos.",
      body: "Um vídeo ou foto no ecrã de boas-vindas, descrição do restaurante, página de contactos dedicada com mapa, números de telefone e perfis sociais. O menu digital parece um site completo do restaurante, não um PDF atrás de um código QR.",
      bullets: [
        "Fundo em vídeo ou foto grande no ecrã de boas-vindas.",
        "Descrições do restaurante e das categorias — conta a história do conceito.",
        "Página de contactos: mapa, telefone, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dois telemóveis numa mesa de café: ecrã inicial do menu com fundo em vídeo e página de contactos com mapa" },
    },
    {
      icon: LayoutList,
      eyebrow: "Menu sem fotos",
      heading: "Um menu sem fotos fica igualmente bem.",
      body: "Alguns artigos podem não ter fotos — e está perfeitamente bem. O IQ Rest mostra as cartas com e sem imagens de forma consistente: tipografia, alergénios e preços mantêm uma sensação premium. Uma mistura de pratos com e sem fotos mantém-se coesa.",
      bullets: [
        "Cartas sem fotos não parecem vazias.",
        "A tipografia adapta-se ao conteúdo da carta.",
        "Estilo consistente para pratos com e sem imagens.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Dois telemóveis numa mesa: menu com fotos de pratos e menu apenas com texto" },
    },
    {
      icon: Smartphone,
      eyebrow: "Gestão a partir de qualquer dispositivo",
      heading: "Gere o menu a partir de qualquer dispositivo.",
      body: "Um único painel abre no browser em telemóvel, tablet ou computador. Muda um preço, retira um prato da lista de stop ou adiciona um especial — os clientes veem a alteração em segundos. Sem instalações, sem integrações.",
      bullets: [
        "Sem app para instalar — abre um browser e estás dentro.",
        "Preços, fotos e lista de stop — alguns toques no telemóvel.",
        "Gere o menu a partir de qualquer lugar, incluindo a sala.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Computador e telemóvel numa mesa de café a editar o mesmo artigo do menu em ambos os dispositivos" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos a partir do menu · opcional",
      heading: "Os clientes fazem pedidos diretamente a partir do menu.",
      body: "Os clientes constroem um carrinho no menu QR e enviam o pedido — chega ao empregado na sala ou no tablet da cozinha. A funcionalidade pode ser ativada ou desativada nas definições a qualquer momento.",
      bullets: [
        "Carrinho, comentários e envio do pedido com um único toque.",
        "O pedido chega imediatamente ao painel de admin, ao WhatsApp ou ao ecrã de cozinha.",
        "Funcionalidade ativável nas definições.",
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
