import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Sistema de reservas para restaurante — Reservas de mesa 24/7, sem chamadas",
    description:
      "Aceita reservas de mesa para restaurante 24/7 a partir do teu menu QR e site. Widget de reservas com a tua marca, lembretes por email, menos faltas. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/reservations",
    ogLocale: "pt_PT",
    ogTitle: "Reservas de restaurante — sistema de reservas de mesa 24/7 para restaurantes",
    ogDescription:
      "Para de perder reservas enquanto cozinhas. Os clientes reservam 24/7 a partir do teu menu QR, recebem lembretes por email e tu reduzes faltas. 14 dias grátis.",
  },

  hero: {
    title: "Para de perder reservas enquanto cozinhas.",
    subtitle:
      "Aceita reservas de mesa para restaurante 24/7 — diretamente do teu menu QR, site e Instagram. Os clientes escolhem data, hora e número de pessoas, tu confirmas num toque, os lembretes por email saem automaticamente. Menos chamadas, menos faltas, mais clientes por noite.",
    trustLine: "Mais de 500 restaurantes em mais de 30 países",
  },

  seo: {
    description:
      "Um sistema completo de reservas de restaurante integrado no teu menu QR. Os clientes reservam mesa a partir do menu, do teu site, do link da bio do Instagram ou de um botão no Google Maps — a qualquer hora, dia ou noite. Tu vês reservas novas em tempo real, confirmas ou recusas num toque, e o sistema envia lembretes por email que cortam drasticamente as faltas. Sem corte do OpenTable, sem comissão por pessoa, sem contrato.",
    fullDescription:
      "As reservas por telefone estão a desaparecer. Os turistas não ligam (indicativo diferente, barreira linguística), os millennials não ligam (geração que prefere texto) e perdes metade das reservas durante o serviço quando ninguém atende. As reservas IQ Rest vivem onde os teus clientes já estão: no menu, no browser do telemóvel, no link da bio do Instagram.\n\nO fluxo de reserva são dois ecrãs — escolhem data e número de pessoas, deixam nome e telefone, opcionalmente adicionam uma nota ('aniversário', 'alergia: frutos secos', 'cadeira para bebé'). Recebes a reserva instantaneamente com confirmação/recusa num toque. Os clientes confirmados recebem um lembrete automático por email 24h antes, o que por si só reduz faltas em ~30%. Também podes definir o número máximo de lugares por turno, dias bloqueados e quais as mesas reserváveis vs só walk-in.\n\nAo contrário do OpenTable ou TheFork, não há comissão por pessoa, app separada para descarregar nem terceiros entre ti e o cliente. A reserva é tua, os dados são teus e o sistema faz parte da tua subscrição — não é um imposto por reserva.",
    benefitsHeading: "Porque é que os restaurantes trocam o OpenTable pelas reservas do IQ Rest",
    benefits: [
      "Reservas 24/7 a partir do menu QR, site, Instagram, botão Google Maps",
      "Sem comissão por pessoa — mensalidade fixa, fica com 100% da receita",
      "Lembretes automáticos por email cortam faltas em ~30% em média",
      "Confirmar / recusar num toque a partir do telemóvel, sem sala de espera",
      "Lugares máximos por turno, dias bloqueados, regras por mesa",
      "Pedidos especiais (alergias, aniversários) capturados de forma limpa em cada reserva",
    ],
  },

  pricing: {
    heading: "Um plano.",
    headingAccent: "Reservas ilimitadas.",
    sub: "Reservas, menu QR, pedidos online e tradução por IA — tudo num único preço fixo. Sem custos por pessoa, sem comissão, sem contrato.",
  },

  faq: {
    sub: "Tudo o que os donos de restaurantes perguntam sobre reservas online. Não vês a tua? Manda mensagem por WhatsApp — respondem pessoas reais.",
    items: [
      {
        q: "Cobram comissão por reserva, como o OpenTable ou o TheFork?",
        a: "Zero. As reservas fazem parte da tua mensalidade fixa — reservas 10 pessoas por dia ou 1.000, o preço é o mesmo. Sem custo por pessoa, sem imposto por reserva, sem corte na tua receita. Comparado com €1–€2,50 por pessoa do OpenTable, um restaurante que faça 50 pessoas por dia poupa €1.500–€3.750 por mês.",
      },
      {
        q: "Como é que os clientes reservam — precisam de descarregar uma app?",
        a: "Sem app. Digitalizam o teu QR ou clicam no link de reservas — data, hora, número de pessoas, nome, telefone, nota opcional. Pronto. O fluxo todo é menos de 30 segundos e funciona em qualquer browser. Também podes incorporar o formulário de reservas no teu site ou partilhar um URL limpo de reservas no Instagram.",
      },
      {
        q: "Posso confirmar reservas manualmente ou são autoconfirmadas?",
        a: "Os dois modos — à tua escolha por turno ou por dia. Autoconfirmar se confias na tua disponibilidade e queres parecer responsivo 24/7. Confirmação manual se quiseres filtrar reservas (fins de semana cheios, eventos especiais). Recebes a reserva na hora e confirmas com um toque no telemóvel.",
      },
      {
        q: "Como é que o sistema lida com faltas?",
        a: "Lembretes automáticos por email saem 24h e (opcionalmente) 2h antes da reserva — só isto reduz faltas em ~30% face a chamadas ou sistemas sem lembrete. Também podes exigir um número de telefone, marcar clientes como 'falta' no painel, e com o tempo o sistema sinaliza reincidentes.",
      },
      {
        q: "Posso limitar quantas pessoas aceito por noite?",
        a: "Sim. Define máximo de pessoas por turno, máximo por dia e dias bloqueados (encerramentos, eventos privados). Podes até marcar mesas específicas como 'reserváveis' vs 'só walk-in', para que as tuas mesas mais cobiçadas fiquem livres para quem aparece. Turistas e locais reservam pelo mesmo sistema sem nunca pisarem o teu plano de sala.",
      },
    ],
  },

  finalCta: {
    heading: "Reservas enquanto cozinhas.",
    headingAccent: "Lembretes para que apareçam.",
    sub: "Aceita reservas 24/7 a partir do menu QR, site e Instagram. 14 dias grátis, sem cartão, sem comissão por pessoa.",
  },
};
