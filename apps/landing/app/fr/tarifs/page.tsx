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

const LOCALE = "fr";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ce que les restaurateurs demandent sur les tarifs et le paiement. Vous ne trouvez pas votre question ? Écrivez-nous sur WhatsApp.",
  items: [
    { q: "Quelle est la différence entre Basic et Pro ?", a: "Basic comprend le menu numérique + QR, la traduction IA en 35 langues, la prise de commande depuis le menu (optionnelle) et la gestion depuis n'importe quel appareil. Pro ajoute l'écran de cuisine (KDS) et la réservation de tables en ligne 24/7, plus un support WhatsApp prioritaire. Si vous n'avez pas besoin du flux cuisine ni des réservations — Basic couvre tout." },
    { q: "Prenez-vous une commission sur les commandes ?", a: "Non. Chaque commande — depuis un menu QR ou prise par un serveur — va directement au restaurant, sans pourcentage ni commission d'agrégateur. Vous avez un tarif mensuel fixe et aucune autre déduction." },
    { q: "Que comprend l'essai de 14 jours ?", a: "Accès complet à toutes les fonctionnalités des deux plans, sans carte. Au bout de 14 jours, le compte est automatiquement mis en pause si aucun moyen de paiement n'est connecté. Aucun prélèvement automatique sans votre accord." },
    { q: "Que se passe-t-il après les 14 jours ?", a: "Si aucun moyen de paiement n'est connecté, le compte est automatiquement mis en pause. Le panneau d'administration reste disponible en lecture seule, mais le menu QR pour les clients et la prise de commande sont temporairement désactivés. Nous ne prélevons jamais sans votre accord." },
    { q: "Qu'arrive-t-il à mon menu, mes commandes et mes données pendant la pause ?", a: "Tout est conservé en intégralité : menu, photos des plats, historique des commandes, réservations, paramètres de design, statistiques. Connectez un moyen de paiement même un mois ou six mois plus tard — tout revient comme avant, rien n'est perdu." },
    { q: "Les codes QR sur les tables fonctionneront-ils encore après l'essai ?", a: "Si le compte est en pause, les codes QR affichent aux clients un message « temporairement indisponible ». Vous n'avez pas besoin d'imprimer de nouveaux codes QR : dès que le paiement est connecté, les mêmes codes rouvrent le menu." },
    { q: "Puis-je passer de Basic à Pro plus tard ?", a: "Oui, la mise à niveau se fait en un clic depuis le panneau d'administration. Le supplément est calculé au prorata des jours restants de la période payée. Le passage de Pro à Basic est également possible — KDS et réservation seront désactivés, mais toutes les données sont conservées." },
    { q: "Quelle est la remise annuelle ?", a: "Environ 30 % par rapport au plan mensuel. Le montant exact est affiché au paiement sur la page du plan." },
    { q: "Puis-je annuler l'abonnement à tout moment ?", a: "Oui, l'annulation se fait en un clic depuis le panneau d'administration. Après l'annulation, le compte fonctionne jusqu'à la fin de la période payée, puis il est mis en pause. Les données sont conservées et vous pouvez revenir quand vous voulez." },
    { q: "Quels moyens de paiement acceptez-vous ?", a: "Visa, Mastercard et American Express via Stripe. Apple Pay et Google Pay sont également pris en charge. En Europe — prélèvement SEPA pour le plan annuel." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_fr_pricing_hero" />
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
