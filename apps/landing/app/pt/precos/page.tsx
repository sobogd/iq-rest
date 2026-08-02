import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "pt";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "O que os restauradores perguntam sobre preços e pagamento. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
  items: [
    { q: "Como funcionam os preços?", a: "Constróis o teu próprio plano. O menu digital QR é a base — inclui a tradução IA em 35 línguas e a gestão a partir de qualquer dispositivo. Depois adicionas apenas o que precisas: reserva de mesas, o ecrã de cozinha com receção de pedidos ou um domínio personalizado. O preço é por restaurante e os descontos por volume aplicam-se automaticamente a partir do segundo restaurante." },
    { q: "Cobram comissão sobre os pedidos?", a: "Não. Cada pedido — a partir do menu QR ou recebido por um empregado — vai diretamente para o restaurante, sem percentagens nem comissões de agregadores. Tens um pagamento mensal fixo e nenhuma outra dedução." },
    { q: "O que inclui o período de teste de 14 dias?", a: "Acesso completo a todas as funcionalidades, sem cartão. Ao fim de 14 dias a conta é pausada automaticamente se nenhum método de pagamento estiver associado. Não há cobranças automáticas sem o teu consentimento." },
    { q: "O que acontece depois dos 14 dias?", a: "Se nenhum método de pagamento estiver associado, a conta é pausada automaticamente. O painel de administração mantém-se disponível em modo de leitura, mas o menu QR para clientes e a receção de pedidos ficam temporariamente desativados. Nunca cobramos sem o teu consentimento." },
    { q: "O que acontece ao meu menu, pedidos e dados durante a pausa?", a: "Fica tudo preservado por inteiro: menu, fotos de pratos, histórico de pedidos, reservas, definições de design, estatísticas. Associa o pagamento até um mês ou seis meses depois — tudo regressa como estava, nada se perde." },
    { q: "Os códigos QR nas mesas continuam a funcionar depois do teste?", a: "Se a conta estiver pausada, os códigos QR mostram aos clientes a mensagem «temporariamente indisponível». Não precisas de imprimir novos códigos QR: assim que o pagamento for associado, os mesmos códigos voltam a abrir o menu." },
    { q: "Posso mudar o meu plano mais tarde?", a: "Sim — adiciona ou remove funcionalidades a qualquer momento no painel de administração. A diferença é calculada proporcionalmente aos dias restantes do período pago. Se removeres uma funcionalidade, ela é desativada mas todos os seus dados são preservados." },
    { q: "Quantos restaurantes posso gerir?", a: "Tantos quantos precisares — escolhes o número de restaurantes ao construir o teu plano, todos geridos a partir de um único painel. Os descontos por volume aplicam-se automaticamente, até 50 % com 5 ou mais restaurantes. Tens um grupo maior? Envia-nos uma mensagem no WhatsApp sobre um plano personalizado." },
    { q: "Qual é o desconto anual?", a: "Cerca de 30 % face ao plano mensal. O valor exato é apresentado enquanto constróis o teu plano." },
    { q: "Posso cancelar a subscrição a qualquer momento?", a: "Sim, o cancelamento é feito num clique no painel de administração. Após o cancelamento a conta funciona até ao fim do período pago e depois é pausada. Os dados são preservados e podes regressar quando quiseres." },
    { q: "Que métodos de pagamento aceitam?", a: "Visa, Mastercard e American Express através do Stripe. Apple Pay e Google Pay também são suportados. Na Europa — débito direto SEPA no plano anual." },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Pricing" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/${LOCALE}` },
        { "@type": "ListItem", position: 2, name: "Pricing", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Menu digital", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <PricingTemplate
      locale={LOCALE}
      texts={DEFAULT}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      trackPrefix="l_pt_pricing_hero"
    />
  );
}
