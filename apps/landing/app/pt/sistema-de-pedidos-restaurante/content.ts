import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "sistema-de-pedidos-restaurante",
  trackPrefix: "l_pt_orders",

  meta: {
    title: "Sistema de pedidos para restaurante — cliente e empregado | IQ Rest",
    description:
      "Pedidos no restaurante a partir de telemóvel ou tablet: planta da sala, divisão da conta, estados, opções e notas. Os clientes pedem à mesa; o empregado recebe pedidos a partir de qualquer dispositivo. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/sistema-de-pedidos-restaurante",
    ogLocale: "pt_PT",
    ogTitle: "Sistema de pedidos para restaurante — cliente e empregado",
    ogDescription:
      "Cliente à mesa ou empregado no telemóvel — o pedido chega imediatamente à cozinha. Planta da sala, divisão de conta, estados, opções e notas.",
    brandLine: "IQ Rest — Sistema de pedidos para restaurante",
  },

  hero: {
    headline: "Receção de pedidos: cliente e empregado — diretamente para a cozinha.",
    cta: "Configurar pedidos online",
    sub: "Os clientes pedem através do menu QR à mesa ou o empregado recebe o pedido a partir de telemóvel ou tablet — o pedido chega ao ecrã de cozinha em segundos. Planta da sala com mesas coloridas, divisão de conta, opções flexíveis e comentários. Sem blocos de notas, sem idas ao bar.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Empregado recebe um pedido à mesa a partir de um smartphone — o pedido chega ao ecrã de cozinha",
  },

  scan: {
    heading: "Configura o sistema de pedidos",
    headingAccent: "em 5 minutos.",
    sub: "Carrega um menu em papel ou PDF — a IA reconhece pratos, preços e categorias. Liga um tablet na sala e começa a receber pedidos nas mesas.",
    cta: "Digitalizar menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista e planta da sala",
      heading: "Lista de pedidos ao lado da planta da sala.",
      body: "Todos os pedidos ativos à direita: estado, total, hora, número de artigos. À esquerda — a planta da sala: mesas coloridas conforme o estado — livre, ocupada, requer atenção. Toca numa mesa para abrir ou criar um pedido; toca num cartão para abrir a vista detalhada. Sem saltar entre ecrãs.",
      bullets: [
        "Planta da sala: mesas coloridas por estado do pedido.",
        "Lista de pedidos ao lado — total, hora, número de artigos.",
        "Toca numa mesa para abrir ou criar um pedido.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet na estação do empregado: lista de pedidos e planta da sala com mesas coloridas" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Cartão do pedido",
      heading: "Cartão do pedido: estados, duplicar, eliminar — um toque.",
      body: "Cada artigo tem o seu próprio estado (Em espera / Em preparação / Pronto / Servido) — cozinha e empregado veem a mesma imagem em tempo real. Tocar no ponto abre o menu de ações: mudar estado, duplicar artigo com os mesmos modificadores e opções, eliminar. Tudo dentro do cartão.",
      bullets: [
        "Estado por artigo: Em espera / Em preparação / Pronto / Servido.",
        "Duplica um artigo num toque com as mesmas opções.",
        "Elimina um artigo diretamente do cartão.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet com o cartão detalhado do pedido: estados dos artigos, ações de duplicar e eliminar" },
    },
    {
      icon: Receipt,
      eyebrow: "Dividir conta",
      heading: "Divide a conta quando os clientes pagam em separado.",
      body: "Os clientes decidiram dividir — marca os artigos que vão para um novo talão; o resto fica no atual. O sistema mostra imediatamente os dois totais. Um toque em «Dividir pedido» e ficas com dois pedidos independentes, com totais corretos, ambos ainda ligados às suas mesas.",
      bullets: [
        "Escolhe os artigos a dividir com caixas de seleção.",
        "Os dois totais são mostrados imediatamente.",
        "Um toque e o pedido fica dividido sem contas manuais.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet numa mesa de restaurante: janela de divisão de conta entre clientes" },
    },
    {
      icon: Smartphone,
      eyebrow: "Fluxo móvel",
      heading: "Adiciona artigos a partir do telemóvel — em três ações.",
      body: "O empregado não fica preso a um dispositivo: abre a receção de pedidos no seu telemóvel e adiciona um artigo em três passos — categoria, prato, opções (tamanho, ponto, molho ou ingrediente extra). O preço é recalculado automaticamente. A nota para a cozinha aparece no último passo.",
      bullets: [
        "Três passos: categoria → prato → opções.",
        "Opções (tamanho, extras, complementos) com preço num clique.",
        "Campo de nota no passo final.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Quatro telemóveis com os passos para adicionar um artigo ao pedido: categoria, prato, tamanho, comentário" },
    },
  ],

  faq: {
    sub: "O que os restauradores perguntam sobre a receção de pedidos no IQ Rest. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
    items: [
      { q: "Vários empregados podem trabalhar ao mesmo tempo a partir de diferentes dispositivos?", a: "Sim. Cada empregado inicia sessão na conta partilhada do restaurante a partir do seu próprio telemóvel ou tablet — todos veem as mesmas mesas, pedidos e estados em tempo real. As alterações de um empregado aparecem imediatamente para os outros, sem conflitos nem bloqueios." },
      { q: "Os empregados podem usar dispositivos pessoais (BYOD)?", a: "Sim. É uma aplicação web no browser — nada para instalar. O empregado abre um link, inicia sessão na conta do restaurante a partir do seu iPhone, Android ou tablet pessoal, e começa a trabalhar. No fim do turno, basta sair." },
      { q: "Podem adicionar-se opções obrigatórias aos pratos (tamanho, ponto, etc.)?", a: "Sim. Cada prato pode ter qualquer número de grupos de opções — obrigatórios (por exemplo «Tamanho»: Pequeno / Médio / Grande) e opcionais («Ponto»: mal-passado / médio / bem-passado). As opções podem alterar o preço (+1,00 €). Se um grupo for obrigatório, o sistema não deixa o cliente ou o empregado adicionar o prato sem escolher." },
      { q: "Os clientes podem adicionar notas ou extras a um prato (pão, molho)?", a: "Sim. O último passo de adicionar tem um campo de nota livre («sem cebola», «bem passado», «alérgico a frutos secos»). Os extras são modificadores separados com preço («+ molho BBQ +1,50 €», «+ Pão +2,00 €»). As notas aparecem no ecrã de cozinha, destacadas a cores." },
      { q: "Há estatísticas dos pedidos?", a: "Sim. A secção de analítica mostra: receita por dia e hora, ticket médio, pratos mais pedidos, conversão cliente → pedido, velocidade de serviço (tempo de Em espera a Servido). Isto ajuda a planear turnos, compras e identificar pratos com fraco desempenho." },
      { q: "Os pedidos podem ser divididos ou movidos entre mesas?", a: "Sim, ambos os cenários são suportados. Para dividir — marca os artigos que vão para um novo talão (para clientes que pagam em separado). Para mover — abre o cartão do pedido, escolhe uma nova mesa; o pedido todo vai para lá. Sem contas manuais, sem sair do painel." },
    ],
  },
};
