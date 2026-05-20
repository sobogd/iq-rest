import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pt",
  slug: "reserva-de-mesas",
  trackPrefix: "l_pt_bookings",

  meta: {
    title: "Reserva de mesas 24/7 para restaurantes | IQ Rest",
    description:
      "Reserva de mesas 24/7 para restaurantes: os clientes reservam sozinhos através do menu QR ou do site. Calendário por mesa, confirmações e lembretes automáticos. Nem um cliente perdido. 14 dias grátis.",
    canonical: "https://iq-rest.com/pt/reserva-de-mesas",
    ogLocale: "pt_PT",
    ogTitle: "Reserva de mesas 24/7 — os clientes reservam sozinhos",
    ogDescription:
      "Os clientes reservam mesas através do menu QR ou do site. Calendário, confirmações automáticas, lembretes. Nem um cliente perdido.",
    brandLine: "IQ Rest — Reserva de mesas para restaurantes",
  },

  hero: {
    headline: "Reserva de mesas 24/7 — os clientes reservam sozinhos.",
    sub: "Os clientes reservam mesas através do menu QR ou de um link direto. Calendário por mesa, confirmações e lembretes automáticos. Nem um cliente perdido e sem chamadas em hora de ponta.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hospedeira a gerir reservas a partir de um tablet à entrada do restaurante",
  },

  scan: {
    heading: "Lança a reserva de mesas",
    headingAccent: "em 5 minutos.",
    sub: "Liga o calendário, adiciona as mesas com fotos e capacidade — os clientes começam a reservar no próprio dia.",
    cta: "Ativar reservas",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Formulário de reserva",
      heading: "Os clientes reservam sozinhos — por data, hora e número de pessoas.",
      body: "O cliente abre o menu QR ou um link direto, escolhe data, hora e número de pessoas — e vê imediatamente as mesas disponíveis, cada uma com foto, descrição (esplanada, à janela, banca junto ao bar) e capacidade. A confirmação é enviada automaticamente por e-mail e WhatsApp.",
      bullets: [
        "Escolha de mesa por foto, descrição e capacidade.",
        "Confirmação automática e lembrete uma hora antes da visita.",
        "Campos mínimos no formulário: nome, telefone, número de pessoas.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Cliente reserva uma mesa de restaurante a partir do telemóvel: data, hora, número de pessoas e seletor de mesa" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Calendário de reservas",
      heading: "Calendário por dia e por mesa — tudo num só olhar.",
      body: "O painel de admin mostra um calendário de reservas dividido por mesa, dia, semana e mês. Slots livres, mesas ocupadas, reservas confirmadas e por confirmar num único ecrã. Funciona num tablet na sala e num computador no escritório.",
      bullets: [
        "Vistas diária, semanal e mensal.",
        "Divisão por mesa: quem, quando, quantos clientes.",
        "Mover, cancelar ou confirmar uma reserva num toque a partir do telemóvel.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Calendário de reservas no painel de admin do IQ Rest em dois tablets: Gantt diário por mesas e vista mensal" },
    },
  ],

  faq: {
    sub: "O que os restauradores perguntam sobre a reserva de mesas no IQ Rest. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
    items: [
      { q: "Posso escolher em que dias e horas é possível reservar?", a: "Sim. O painel de admin permite definir o horário de funcionamento e os dias da semana disponíveis — o sistema não mostra slots indisponíveis aos clientes. Podes fechar uma data específica (evento de empresa, reserva privada) ou desligar todo o calendário temporariamente." },
      { q: "Posso carregar uma foto para cada mesa?", a: "Sim. Cada mesa pode ter uma foto, descrição (esplanada, à janela, banca junto ao bar) e capacidade. O cliente vê a mesa exata que está a reservar e faz uma escolha informada — isso reduz expectativas não cumpridas." },
      { q: "Posso desativar reservas em datas específicas?", a: "Sim. O calendário permite fechar datas específicas (feriados, eventos privados, obras) ou dias inteiros da semana. Nessas datas, os clientes veem a mensagem «reserva temporariamente indisponível»." },
      { q: "Posso personalizar quais campos são recolhidos do cliente?", a: "Sim. Conjunto padrão: nome, telefone, e-mail, número de pessoas. Podes adicionar campos personalizados (ocasião, alergias, pedidos especiais) ou remover desnecessários para manter o formulário o mais curto possível." },
      { q: "Posso limitar o número de pessoas por mesa?", a: "Sim. Cada mesa tem uma definição de «capacidade» — o sistema não deixa uma mesa para 2 ser reservada para 6. Em mesas maiores podes definir um mínimo para que grupos pequenos não ocupem a «mesa de oito» a grupos maiores." },
      { q: "Quão difícil é a configuração das reservas?", a: "Demora muito pouco tempo. Três passos: (1) adicionar mesas com nomes, fotos e capacidade, (2) ativar o modo de reservas nas definições, (3) partilhar o link ou código QR com os clientes. Lançamento completo em 5-10 minutos." },
      { q: "Posso usar o sistema de reservas no meu próprio domínio?", a: "Sim. Suportamos um domínio personalizado com certificado SSL: os clientes reservam na morada do teu restaurante (por exemplo reservas.oteurestaurante.pt). Ajudamos com a configuração de DNS; o processo demora 5-10 minutos." },
      { q: "Posso configurar confirmação automática ou manual?", a: "Sim, o modo é definido nas definições. Com confirmação automática, o cliente recebe uma confirmação imediatamente após submeter o formulário e a reserva considera-se aceite. Com confirmação manual, o pedido chega ao painel de admin com o estado «a aguardar confirmação» — o gestor revê-o e confirma ou recusa. O modo manual é útil quando há um número limitado de mesas ou políticas estritas para clientes." },
      { q: "Cobram comissão sobre as reservas?", a: "Não. A reserva de mesas está totalmente incluída no plano Pro — sem percentagens sobre clientes, sem taxas por slot, sem comissões de agregadores. Um pagamento mensal fixo e reservas ilimitadas." },
    ],
  },
};
