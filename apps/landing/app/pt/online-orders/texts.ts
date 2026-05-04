import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Pedidos online com menu QR — Pedidos para restaurante sem comissão",
    description:
      "Recebe pedidos diretos a partir do teu menu QR. Zero comissão, sem corte do Uber Eats / Glovo. Os clientes digitalizam, pedem, pagam — direto para ti. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/online-orders",
    ogLocale: "pt_PT",
    ogTitle: "Pedidos online sem comissão — pedidos diretos do teu menu QR",
    ogDescription:
      "Substitui as comissões de 30% das apps de entrega por pedidos diretos. Os clientes digitalizam o teu QR, pedem, pagam — cada cêntimo é teu. 14 dias grátis, sem cartão.",
  },

  hero: {
    title: "Pedidos diretos. Zero comissão. Direto para a tua cozinha.",
    subtitle:
      "Para de pagar 30% ao Uber Eats, Glovo e Wolt. Com o IQ Rest os clientes digitalizam o QR, montam o pedido no telemóvel e o ticket cai na tua cozinha — cada cêntimo fica contigo.",
    trustLine: "4,9 · mais de 500 restaurantes em mais de 30 países",
  },

  seo: {
    description:
      "Transforma o teu menu QR num sistema completo de pedidos online sem dares 30% às apps de entrega. Os clientes digitalizam o código QR, navegam pelo menu na sua língua, montam um carrinho, enviam o pedido — e tu recebe-lo com o número da mesa, na hora. Sem instalação de apps, sem comissões, sem terceiros entre ti e o cliente.",
    fullDescription:
      "A maioria dos restaurantes perde dinheiro antes de a comida sair da cozinha — o Uber Eats fica com 30%, o Glovo fica com 30%, o Wolt fica com 30%. Os pedidos online através do IQ Rest funcionam de forma totalmente diferente. O pedido vai direto do telemóvel do cliente para o teu painel, e a margem inteira é tua.\n\nA experiência de encomenda foi construída especificamente para uso dentro do restaurante: os clientes escolhem uma mesa, navegam pelo teu menu, adicionam itens ao carrinho, deixam um comentário para a cozinha e submetem. Tu vês os novos pedidos em tempo real no telemóvel ou num ecrã de cozinha, com o número da mesa, itens, modificadores e notas. Marcas pratos como prontos, a mesa vê o estado — e poupas dezenas de viagens por turno aos empregados.\n\nTambém funciona para take-away e levantamento: os clientes digitalizam o autocolante QR à porta, fazem o pedido e pagam — não precisas de uma app de pedidos separada, de um site separado nem de um projeto de integração com Stripe.",
    benefitsHeading: "Porque é que os pedidos diretos com IQ Rest batem as apps de entrega",
    benefits: [
      "Zero comissão por pedido — fica com 100% da receita",
      "Pedidos chegam ao painel com o número da mesa em tempo real",
      "Sem app para os clientes — digitalizam o QR e pedem no browser",
      "Modificadores, comentários, notas dietéticas — tudo capturado de forma limpa",
      "Funciona para sala, take-away e levantamento — um menu, três fluxos",
      "Sugestões de upsell integradas aumentam o ticket médio",
    ],
  },

  pricing: {
    heading: "Um plano.",
    headingAccent: "Zero comissão.",
    sub: "Pedidos diretos, menu QR, site para restaurante e reservas — tudo incluído. Sem comissões por pedido, sem projeto de integração com Stripe.",
  },

  faq: {
    sub: "Tudo o que os donos de restaurantes perguntam sobre pedidos online. Não vês a tua? Manda mensagem por WhatsApp — respondem pessoas reais.",
    items: [
      {
        q: "Cobram comissão sobre os pedidos?",
        a: "Zero. Cada pedido do teu menu QR vai direto para ti — sem corte para nós, sem taxas Glovo / Uber Eats. Uma única mensalidade fixa, e é só isso. As contas são simples: se faturas €5.000/mês em pedidos por apps de entrega, estás a perder €1.500. Passa para pedidos diretos e esses €1.500 ficam no teu bolso.",
      },
      {
        q: "Como é que os clientes fazem o pedido — precisam de uma app?",
        a: "Não precisam de app. Os clientes digitalizam o teu QR com a câmara do telemóvel, o menu abre no browser, escolhem a mesa, navegam, adicionam ao carrinho e submetem. O fluxo todo são dois toques depois de digitalizar. Sem pesquisa na App Store, sem registo, sem fricção.",
      },
      {
        q: "Como recebo os pedidos na cozinha?",
        a: "Os pedidos aparecem instantaneamente no teu painel, com o número da mesa, itens, modificadores e notas. Vê-os no telemóvel, num tablet junto ao passe ou num ecrã de cozinha. Marca itens como prontos e a mesa vê o estado — menos chamadas a perguntar 'já está?' e mais rotação.",
      },
      {
        q: "Os clientes podem pagar pelo menu QR ou só à mesa?",
        a: "Os dois. Podem submeter e pagar em dinheiro ou cartão à mesa da forma clássica, ou pagar online via Stripe diretamente pelo menu. Tu decides o que está ativo. O pagamento online é seguro pelo Stripe — o IQ Rest nunca fica com o dinheiro, vai direto para a tua conta Stripe.",
      },
      {
        q: "Funciona para take-away e levantamento, ou só para a sala?",
        a: "Sim. Cola um autocolante QR à entrada para take-away ou partilha o link do menu no Instagram e WhatsApp. Os clientes escolhem 'levantamento', pedem, pagam — tu preparas, eles levantam. O mesmo sistema, três fluxos diferentes: sala, take-away, levantamento.",
      },
    ],
  },

  finalCta: {
    heading: "Para de alimentar as apps de entrega.",
    headingAccent: "Começa a ficar com 100%.",
    sub: "Substitui as comissões de 30% por uma mensalidade fixa. 14 dias grátis. Sem cartão. Cancela quando quiseres.",
  },
};
