import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "pt";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "O que os restauradores perguntam sobre preços e pagamento. Não encontras a tua pergunta? Escreve-nos no WhatsApp.",
  items: [
    { q: "Qual é a diferença entre Basic e Pro?", a: "O Basic inclui o menu digital + QR, tradução IA em 35 línguas, receção de pedidos a partir do menu (opcional) e gestão a partir de qualquer dispositivo. O Pro adiciona o ecrã de cozinha (KDS) e a reserva de mesas online 24/7, mais apoio prioritário no WhatsApp. Se não precisares do fluxo de cozinha nem de reservas — o Basic cobre tudo." },
    { q: "Cobram comissão sobre os pedidos?", a: "Não. Cada pedido — a partir do menu QR ou recebido por um empregado — vai diretamente para o restaurante, sem percentagens nem comissões de agregadores. Tens um pagamento mensal fixo e nenhuma outra dedução." },
    { q: "O que inclui o período de teste de 14 dias?", a: "Acesso completo a todas as funcionalidades em ambos os planos, sem cartão. Ao fim de 14 dias a conta é pausada automaticamente se nenhum método de pagamento estiver associado. Não há cobranças automáticas sem o teu consentimento." },
    { q: "O que acontece depois dos 14 dias?", a: "Se nenhum método de pagamento estiver associado, a conta é pausada automaticamente. O painel de administração mantém-se disponível em modo de leitura, mas o menu QR para clientes e a receção de pedidos ficam temporariamente desativados. Nunca cobramos sem o teu consentimento." },
    { q: "O que acontece ao meu menu, pedidos e dados durante a pausa?", a: "Fica tudo preservado por inteiro: menu, fotos de pratos, histórico de pedidos, reservas, definições de design, estatísticas. Associa o pagamento até um mês ou seis meses depois — tudo regressa como estava, nada se perde." },
    { q: "Os códigos QR nas mesas continuam a funcionar depois do teste?", a: "Se a conta estiver pausada, os códigos QR mostram aos clientes a mensagem «temporariamente indisponível». Não precisas de imprimir novos códigos QR: assim que o pagamento for associado, os mesmos códigos voltam a abrir o menu." },
    { q: "Posso mudar de Basic para Pro mais tarde?", a: "Sim, o upgrade é feito num clique no painel de administração. O acréscimo é proporcional aos dias restantes do período pago. O downgrade de Pro para Basic também está disponível — KDS e reservas serão desativados, mas todos os dados são preservados." },
    { q: "Qual é o desconto anual?", a: "Cerca de 30 % face ao plano mensal. O valor exato é apresentado no checkout, na página do plano." },
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
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Basic", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: "24.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={DEFAULT.header} locale={LOCALE} featureLinks={DEFAULT.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_pt_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" accent noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
