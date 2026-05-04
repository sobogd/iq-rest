import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analítica de menu de restaurante — leituras QR, pratos populares, idiomas dos turistas",
    description:
      "Vê exatamente como os clientes usam o teu menu QR. Leituras diárias, pratos mais vistos, preferências de idioma, horas de pico. Decisões orientadas por dados para o teu restaurante.",
    canonical: "https://iq-rest.com/pt/analytics",
    ogLocale: "pt_PT",
    ogTitle: "Analítica de restaurante — segue leituras de menu QR, pratos e idiomas",
    ogDescription:
      "Sabe que pratos os teus clientes realmente olham, quais as horas de pico e que nacionalidade de turistas está na tua sala esta noite. 14 dias grátis.",
  },

  hero: {
    title: "Para de adivinhar. Sabe o que os clientes mesmo fazem.",
    subtitle:
      "Vê analítica do menu de restaurante em tempo real — leituras QR por hora, pratos onde os clientes se demoram, idiomas que os turistas usam, o dia mais lento da semana — e usa esses dados para imprimir menos menus, escalar com cabeça, empurrar os pratos do dia certos.",
    trustLine: "4,9 · mais de 500 restaurantes em mais de 30 países",
  },

  seo: {
    description:
      "Analítica de restaurante que não exige uma equipa de dados. O IQ Rest segue cada leitura, visualização, mudança de idioma e pedido a partir do teu menu QR e mostra os padrões que importam: pratos mais vistos, horas de leitura de pico, dia mais movimentado da semana, distribuição de idiomas dos teus turistas. Toma decisões orientadas por dados sem nunca abrires uma folha de cálculo.",
    fullDescription:
      "A maioria dos restaurantes funciona por instinto — 'sentimos que as terças são lentas', 'acho que a massa está a vender bem'. O instinto é bom, mas os dados são melhores. O IQ Rest segue cada interação com o teu menu QR para que não tenhas de adivinhar: quantas vezes o QR foi digitalizado hoje, que pratos os clientes viram durante mais tempo, que pratos meteram no carrinho mas não pediram, que idiomas os turistas usaram.\n\nO painel de analítica mostra as respostas em três vistas: hoje (leituras ao vivo, pedidos atuais, o que está a ser pedido agora), esta semana (top 10 pratos, horas de pico, distribuição de idiomas, faltas em reservas) e tendências (crescimento mês a mês, sazonalidade, padrões por dia da semana). Podes entrar em qualquer prato para ver quantas vezes é visto vs pedido (um prato visto 200 vezes mas pedido 5 tem um problema de copy ou foto), ou em qualquer idioma para ver que mix de turistas estás a servir.\n\nO objetivo é decisões, não dashboards: 'a próxima terça é historicamente lenta → manda uma push de happy hour', 'turistas italianos pedem massa 3x mais que locais → coloca a massa primeiro quando idioma=it', 'este prato tem 90% de visualizações mas 5% de pedidos → melhora a foto'. Mudanças reais, receita real, sem MBA necessário.",
    benefitsHeading: "Porque é que os restaurantes adoram a analítica do IQ Rest mais que o Google Analytics",
    benefits: [
      "Contador de leituras QR ao vivo — vê a tua noite a encher em tempo real",
      "Pratos mais vistos e mais pedidos — sinaliza o que funciona e o que não",
      "Distribuição de idiomas — sabe que turistas estão na tua sala",
      "Horas de pico e padrões por dia da semana — escala com cabeça, prepara com cabeça",
      "Conversão visualização-para-pedido por prato — corrige fotos más e descrições fracas",
      "Analítica de reservas — fontes de reserva, taxa de faltas, mix de tamanho de grupo",
    ],
  },

  pricing: {
    heading: "Um plano.",
    headingAccent: "Analítica completa incluída.",
    sub: "Analítica de restaurante, pedidos QR, tradução por IA e reservas — tudo num único preço fixo. Sem nível premium para dados, nunca.",
  },

  faq: {
    sub: "Tudo o que os donos de restaurantes perguntam sobre analítica de menu. Não vês a tua? Manda mensagem por WhatsApp — respondem pessoas reais.",
    items: [
      {
        q: "O que posso mesmo ver no painel de analítica?",
        a: "Leituras QR ao vivo (hoje, esta semana, este mês), pratos mais vistos, pratos mais pedidos, conversão visualização-para-pedido por prato, distribuição de idiomas dos clientes, horas de pico por dia da semana, ticket médio, mesas mais movimentadas, taxa de faltas em reservas e tendências ao longo do tempo. Tudo num só painel, sem configuração.",
      },
      {
        q: "Como uso isto para mesmo aumentar a receita?",
        a: "Três padrões funcionam para a maioria dos restaurantes: (1) reorganiza o menu para os pratos com maior conversão aparecerem primeiro; (2) corrige a foto ou descrição em pratos com muitas visualizações mas poucos pedidos; (3) empurra um happy hour ou prato do dia em dias/horas historicamente lentos. Vimos restaurantes aumentarem a receita de meio de semana em 15–30% só com estas três mudanças.",
      },
      {
        q: "Isto é anónimo ou estão a seguir indivíduos?",
        a: "Anónimo e agregado. Seguimos visualizações de menu e pedidos por sessão, não por utilizador identificável. Sem emails, sem números de telefone, sem endereços IP guardados a longo prazo. O painel mostra padrões ('200 leituras à sexta'), não pessoas. Compatível com RGPD por desenho.",
      },
      {
        q: "Posso exportar os dados?",
        a: "Sim. Exporta qualquer vista como CSV (top de pratos, leituras diárias, distribuição horária, etc.) e abre em Excel ou Google Sheets. Útil para partilhar com investidores, contabilistas ou para combinar com os dados do POS.",
      },
      {
        q: "Preciso de alguma configuração técnica para ter analítica?",
        a: "Zero. A analítica está ligada por predefinição assim que o teu menu QR está online — cada leitura, visualização e pedido é seguido automaticamente. O painel faz parte da subscrição padrão, não é um upsell, e vais ver dados úteis no primeiro dia em que os clientes começarem a digitalizar.",
      },
    ],
  },

  finalCta: {
    heading: "Para de adivinhar.",
    headingAccent: "Começa a medir.",
    sub: "Analítica ao vivo de leituras QR, pratos populares, horas de pico, distribuição de idiomas dos turistas. 14 dias grátis, sem cartão.",
  },
};
