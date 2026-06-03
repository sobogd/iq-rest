import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restaurantes","Cafés","Bares","Pizzarias"],
    title: "O seu restaurante,",
    titleAccent: "100% digital em 5 minutos.",
    sub: "A plataforma completa para gerir um restaurante moderno — bonita, tudo num só lugar, sem conhecimentos técnicos.",
  },

  heroMicrocopy: "{count} restaurantes · 14 dias grátis · Sem cartão",
  seeIncluded: "Ver o que inclui",

  trust: [
    { kind: "num", value: 35, label: "Idiomas" },
    { kind: "text", value: "24/7", label: "Reservas" },
    { kind: "num", value: 5, suffix: " min", label: "Arranque" },
    { kind: "count", label: "Restaurantes" },
  ],

  bundle: {
    heading: "Tudo o que move o seu restaurante.",
    headingAccent: "Numa só app.",
    sub: "Menu, cozinha e reservas num único lugar — moderno, rápido e pensado para o dia a dia real de um restaurante. Sem extras, sem custo por funcionalidade.",
  },

  benefits: [
    { Icon: Languages, tag: "Menu digital", title: "Um menu que parece um site, não um PDF.", bullets: ["35 idiomas com IA","Design premium","Preços atualizados na hora"], image: "/landing/feature-design.webp", imageAlt: "Dois telemóveis na mesa de um café: o ecrã de boas-vindas do menu digital e a página de contactos com mapa" },
    { Icon: ChefHat, tag: "Ecrã de cozinha", title: "A cozinha, finalmente sem papéis.", bullets: ["Ao vivo no ecrã","Notas e alergénios","Tablet ou telemóvel"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet no balcão a mostrar o ecrã de cozinha com pedidos por mesa" },
    { Icon: CalendarCheck, tag: "Reservas", title: "Mesas que se reservam sozinhas, 24/7.", bullets: ["Reserva sem chamadas","Confirmação automática","Calendário por mesa"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dois tablets a mostrar o calendário de reservas: vista diária por mesa e vista mensal" },
    { Icon: Receipt, tag: "Pedidos à mesa", title: "Tire pedidos sem bloco — opcional.", bullets: ["Cliente ou empregado","Direto para a cozinha","Ligue quando quiser"], image: "/landing/feature-orders.webp", imageAlt: "Empregado tira um pedido à mesa pelo telemóvel e chega ao ecrã de cozinha" },
  ],

  seeDetails: "Ver detalhes",

  extras: {
    heading: "E tudo o resto incluído.",
    items: [
      { Icon: ScanLine, label: "A IA digitaliza o seu menu em papel em 60 segundos" },
      { Icon: QrCode, label: "Um QR code único para cada mesa" },
      { Icon: Smartphone, label: "Sem app para os clientes — abre no navegador" },
      { Icon: Globe, label: "O seu próprio domínio com SSL" },
      { Icon: BarChart3, label: "Análises de vendas: receita, pratos top, horas" },
      { Icon: Palette, label: "Etiquetas de alergénios e dietas para filtrar" },
    ],
  },

  midCta: {
    heading: "Uma app em vez de cinco.",
    sub: "Sem malabarismos com ferramentas separadas para o menu, a cozinha e as reservas — está tudo num só lugar, em qualquer telemóvel ou tablet, sem instalar nada.",
  },

  how: {
    heading: "Pronto em 5 minutos",
    sub: "Quatro passos. Sem instalações, sem configuração técnica, sem cartão.",
    steps: [
      { n: "1", t: "Tipo e nome", d: "Tipo de espaço e nome — é todo o registo." },
      { n: "2", t: "Entrar", d: "Email ou Google. Sem cartão." },
      { n: "3", t: "Adicione o menu", d: "Escreva-o ou deixe a IA digitalizar o seu menu em papel." },
      { n: "4", t: "Está no ar", d: "Menu, cozinha e reservas — prontos." },
    ],
  },
};
