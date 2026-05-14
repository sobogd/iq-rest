import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menu de restaurante com a tua marca — esquema de cores e tema personalizados",
    description:
      "Combina com a marca do teu restaurante usando cores de destaque personalizadas. Os temas claro e escuro mudam automaticamente com o telemóvel do cliente. Menu QR com a tua marca em segundos. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/color-scheme",
    ogLocale: "pt_PT",
    ogTitle: "Esquema de cores personalizado — menu de restaurante com a tua marca em segundos",
    ogDescription:
      "Escolhe a tua cor de destaque, fica com um menu de restaurante com a tua marca. Modo claro/escuro automático adapta-se ao telemóvel de cada cliente. Sem ferramentas de design.",
  },

  hero: {
    title: "O teu menu. As tuas cores. A tua marca.",
    subtitle:
      "Escolhe uma cor de destaque, mete o teu logo e o menu QR fica imediatamente com aspeto de marca a sério em vez de um template. Os temas claro e escuro mudam automaticamente com o telemóvel de cada cliente — o teu menu parece sempre intencional.",
    trustLine: "Mais de 500 restaurantes em mais de 30 países",
  },

  seo: {
    description:
      "Um esquema de cores personalizado é a diferença entre um menu QR genérico e uma experiência de restaurante com marca. O IQ Rest deixa-te escolher a cor exata de destaque (ou colar um código hex das tuas guidelines de marca), meter o teu logo, e todo o menu — botões, links, destaques, etiquetas de categoria — assume a tua cor de marca em segundos.",
    fullDescription:
      "A maioria dos construtores de menus QR dá-te um esquema de cores fixo: azul ou vermelho, é pegar ou largar. O IQ Rest trata a tua marca como se importasse — escolhe qualquer cor de destaque num seletor de cores ou cola o teu código hex exato das guidelines da marca (o mesmo laranja da tua tabuleta, o mesmo verde do teu logo). Cada destaque no menu — botões primários, links, destaques de categoria, o estado ativo no seletor de idioma — assume essa cor na hora.\n\nO modo claro e o escuro são tratados automaticamente. Quando o telemóvel de um cliente está em modo escuro (a maioria dos telemóveis ao jantar), o teu menu aparece em modo escuro com a cor de destaque destacada. Quando estão na rua ao sol em modo claro, o menu adapta-se. Não escolhes claro ou escuro — escolhes uma cor de marca e o menu faz a coisa certa em cada dispositivo.\n\nO teu logo aparece no topo do menu, no template de impressão do autocolante QR, no recibo do pedido e no email de confirmação de reserva. Cada ponto de contacto com o cliente parece a mesma marca porque é a mesma marca. Sem designer, sem sessão de Photoshop, sem 'pacote de branding para restaurante' caro — apenas um seletor de cores e um upload de logo.",
    benefitsHeading: "Porque é que um esquema de cores com marca converte melhor que um tema por defeito",
    benefits: [
      "Escolhe qualquer cor de destaque — seletor de cores ou cola um código hex",
      "Modo claro/escuro automático que se adapta ao telemóvel de cada cliente",
      "Posicionamento do logo no menu, autocolante QR, recibos e emails",
      "Aspeto com marca desde o minuto um — sem Photoshop nem designer",
      "Muda cores quando quiseres para promoções sazonais (vermelho Dia dos Namorados, verde Natal)",
      "A cor mantém-se acessível — rácios de contraste ajustam-se automaticamente para legibilidade",
    ],
  },

  pricing: {
    heading: "Um plano.",
    headingAccent: "As cores da tua marca.",
    sub: "Esquema de cores personalizado mais menu QR, pedidos online, tradução por IA e reservas — tudo num único preço fixo. Branding sem designer.",
  },

  faq: {
    sub: "Tudo o que os donos de restaurantes perguntam sobre marcar o menu. Não vês a tua? Manda mensagem por WhatsApp — respondem pessoas reais.",
    items: [
      {
        q: "Posso replicar a cor exata da minha marca a partir do logo ou da tabuleta?",
        a: "Sim — cola o teu código hex exato (por exemplo, #C24A2D) e o menu usa essa cor exata para cada destaque. Geramos automaticamente um tom mais escuro para estados de hover e um tom mais claro para fundos, por isso uma só cor de marca dá uma palete completa de UI sem fazeres nada.",
      },
      {
        q: "O menu suporta modo claro e modo escuro?",
        a: "Sim, automaticamente. O menu deteta o tema do telemóvel de cada cliente e alterna entre claro e escuro em tempo real. A tua cor de destaque mantém-se; a UI à volta inverte-se. A maioria dos restaurantes nunca define claro vs escuro — escolhem uma cor e deixam o menu adaptar-se.",
      },
      {
        q: "Posso mudar o esquema de cores mais tarde?",
        a: "A qualquer altura. Abres as definições de design, escolhes uma nova cor, gravas. Cada página no menu QR, fluxo de reservas e UI de pedidos atualiza-se em segundos. Útil para promoções sazonais (vermelho para Dia dos Namorados, verde para Natal, dourado para Ano Novo) — muda por uma semana, depois volta atrás.",
      },
      {
        q: "Onde aparece o meu logo?",
        a: "No topo do menu QR (ao lado do nome do restaurante), no template de impressão do autocolante do código QR (para que o autocolante nas mesas combine com a tua marca), nos recibos de confirmação de pedidos e nos emails de confirmação de reservas. Carregas uma vez em PNG ou SVG, é usado em todo o lado automaticamente.",
      },
      {
        q: "E se a minha cor de marca for difícil de ler contra o fundo do menu?",
        a: "O sistema verifica automaticamente o contraste e escurece ou clareia gentilmente a tua cor para casos de uso de texto (para que uma cor de marca amarela pálida não apareça como texto ilegível), mantendo a tua cor exata em destaques como botões. Não tens de pensar em WCAG — o menu pensa por ti.",
      },
    ],
  },

  finalCta: {
    heading: "Escolhe uma cor.",
    headingAccent: "Pareces uma marca a sério.",
    sub: "Esquema de cores personalizado, recibos com a marca, modo claro/escuro automático. 14 dias grátis, sem designer, sem cartão.",
  },
};
