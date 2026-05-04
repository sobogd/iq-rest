import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menu de restaurante multilingue — 35 idiomas, um toque para mudar",
    description:
      "Serve clientes internacionais na sua língua. Menu de restaurante em 35 idiomas com mudança num toque. Suporte RTL para árabe e persa. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/multilingual",
    ogLocale: "pt_PT",
    ogTitle: "Site para restaurante e menu multilingue — 35 idiomas integrados",
    ogDescription:
      "Os turistas digitalizam, veem o menu na sua língua automaticamente. 35 idiomas, suporte RTL, deteção automática a partir das definições do telemóvel. 14 dias grátis.",
  },

  hero: {
    title: "O teu menu fala a língua de cada turista.",
    subtitle:
      "Um menu de restaurante multilingue não devia ser um projeto. Com o IQ Rest, o teu menu QR deteta automaticamente a língua do telemóvel de cada cliente e serve-o em qualquer um dos 35 idiomas — incluindo árabe e persa com renderização correta da direita para a esquerda.",
    trustLine: "4,9 · mais de 500 restaurantes em mais de 30 países",
  },

  seo: {
    description:
      "Constrói o teu menu uma vez, serve-o em 35 idiomas. O IQ Rest deteta automaticamente a língua do telemóvel de cada cliente e renderiza o menu na sua língua — sem tocar em bandeiras, sem barreira linguística, sem momentos constrangedores com Google Translate. De espanhol e alemão a japonês, árabe e mandarim, os teus clientes veem o teu restaurante como deve ser visto.",
    fullDescription:
      "A maioria dos menus 'multilingues' são PDFs com Google Translate partido, impressos uma vez e nunca atualizados. O site para restaurante multilingue do IQ Rest é i18n a sério: cada idioma tem a sua própria cópia traduzida corretamente, o seu próprio slug de URL, as suas próprias meta tags para o Google indexar e o seu próprio routing dentro da app do menu.\n\nQuando um turista com um iPhone em francês digitaliza o teu código QR, o menu abre em francês automaticamente — sem toques, sem decisões. Pode mudar para qualquer outra língua com o seletor de idioma no topo, mas a maioria nunca precisa. O mesmo se aplica a etiquetas dietéticas ('vegan' torna-se 'vegano' / 'vegetarisch' / 'ヴィーガン' conforme o idioma), a mensagens de erro, a botões 'adicionar ao carrinho', a recibos. Cada string de UI em 35 idiomas, não só o conteúdo do menu.\n\nPara idiomas RTL — árabe e persa — o layout inteiro inverte-se corretamente: o texto alinha à direita, os menus abrem da direita, os preços aparecem depois do nome do prato como esperado. Não é um truque de CSS, é suporte RTL completo que faz com que clientes árabes e persas se sintam servidos, não 'adaptados'.",
    benefitsHeading: "Porque é que um menu multilingue a sério bate uma tradução em PDF",
    benefits: [
      "35 idiomas com tradução de UI adequada — não só itens do menu",
      "Deteta automaticamente a língua do telemóvel — sem toques",
      "Seletor de idioma manual para clientes que prefiram outra língua",
      "Suporte RTL completo para árabe e persa — não é um truque de CSS",
      "Cada idioma tem o seu próprio URL — o Google indexa 35 versões do teu site",
      "Muda a descrição de um prato na tua língua — as traduções acompanham",
    ],
  },

  pricing: {
    heading: "Um plano.",
    headingAccent: "Os 35 idiomas incluídos.",
    sub: "Menu multilingue, tradução por IA, pedidos QR e reservas — tudo num único preço fixo. Sem custos por idioma, sem extras para RTL.",
  },

  faq: {
    sub: "Tudo o que os donos de restaurantes perguntam sobre menus multilingues. Não vês a tua? Manda mensagem por WhatsApp — respondem pessoas reais.",
    items: [
      {
        q: "Quantos idiomas suporta o menu?",
        a: "35 idiomas, incluindo inglês, espanhol, alemão, francês, italiano, português, neerlandês, polaco, checo, eslovaco, húngaro, romeno, búlgaro, croata, sérvio, esloveno, grego, turco, russo, ucraniano, lituano, letão, estoniano, finlandês, sueco, norueguês, dinamarquês, islandês, catalão, gaélico irlandês, árabe, persa, japonês, coreano e chinês. As strings de UI estão profissionalmente traduzidas para todos eles.",
      },
      {
        q: "Como é que os clientes mudam de idioma?",
        a: "De duas formas: automática (o menu abre na língua do telemóvel) e manual (um seletor de idioma no topo do menu). 80% dos turistas nunca tocam no seletor manual — a deteção automática funciona porque o telemóvel já sabe a língua deles.",
      },
      {
        q: "Suportam idiomas da direita para a esquerda como árabe e persa?",
        a: "Sim, com layout RTL completo. O menu inteiro vira-se: o texto alinha à direita, as colunas invertem-se, as gavetas de navegação abrem do lado direito, os preços aparecem depois dos nomes dos pratos. É suporte RTL real implementado ao nível do layout, não só truques de direção em CSS.",
      },
      {
        q: "O Google vai indexar o meu menu nos 35 idiomas?",
        a: "Sim. Cada idioma tem o seu próprio slug de URL (por exemplo /es, /fr, /de), tags hreflang corretas, meta títulos e descrições localizados e dados estruturados específicos do idioma. O Google trata cada idioma como uma página separada para essa região, o que significa que turistas a procurar pelo teu restaurante na sua língua têm mais probabilidade de te encontrar.",
      },
      {
        q: "E se eu não quiser os 35 idiomas — só os meus mercados principais?",
        a: "Escolhes que idiomas estão ativos. Se és um restaurante de praia na Grécia a servir sobretudo turistas britânicos, alemães e italianos, ativa só inglês, alemão e italiano — os outros não aparecem no seletor nem na deteção automática. Podes ativar mais a qualquer momento à medida que o teu mix de turistas mudar.",
      },
    ],
  },

  finalCta: {
    heading: "A língua do telemóvel de cada turista.",
    headingAccent: "Já suportada.",
    sub: "Serve um menu multilingue em 35 idiomas, incluindo árabe e persa em RTL. 14 dias grátis, sem cartão, sem custos por idioma.",
  },
};
