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

const LOCALE = "pl";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Co restauratorzy pytają o cennik i płatności. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp.",
  items: [
    { q: "Jaka jest różnica między Basic a Pro?", a: "Basic obejmuje cyfrowe + menu QR, tłumaczenie AI na 35 języków, przyjmowanie zamówień z menu (opcjonalnie) i zarządzanie z dowolnego urządzenia. Pro dodaje ekran kuchenny (KDS) i rezerwację stolików online 24/7, plus priorytetowe wsparcie WhatsApp. Jeśli nie potrzebujesz przepływu kuchennego i rezerwacji — Basic pokrywa wszystko." },
    { q: "Pobieracie prowizję od zamówień?", a: "Nie. Każde zamówienie — z menu QR lub przyjęte przez kelnera — trafia bezpośrednio do restauracji, bez procentów ani prowizji agregatorów. Masz stałą opłatę miesięczną i żadnych innych potrąceń." },
    { q: "Co obejmuje 14-dniowy okres próbny?", a: "Pełny dostęp do wszystkich funkcji w obu planach, bez karty. Po 14 dniach konto jest automatycznie wstrzymane, jeśli nie podłączono metody płatności. Nie ma automatycznych obciążeń bez Twojej zgody." },
    { q: "Co się dzieje po 14 dniach?", a: "Jeśli nie podłączono metody płatności, konto jest automatycznie wstrzymane. Panel administracyjny pozostaje dostępny w trybie tylko do odczytu, ale menu QR dla gości i przyjmowanie zamówień są tymczasowo wyłączone. Nigdy nie obciążamy bez Twojej zgody." },
    { q: "Co dzieje się z moim menu, zamówieniami i danymi podczas wstrzymania?", a: "Wszystko jest w pełni zachowane: menu, zdjęcia dań, historia zamówień, rezerwacje, ustawienia projektu, statystyki. Podłącz płatność nawet po miesiącu lub sześciu miesiącach — wszystko wraca jak było, nic nie jest tracone." },
    { q: "Czy kody QR na stolikach nadal będą działać po okresie próbnym?", a: "Jeśli konto jest wstrzymane, kody QR pokazują gościom komunikat „tymczasowo niedostępne“. Nie musisz drukować nowych kodów QR: gdy tylko płatność zostanie podłączona, te same kody ponownie otwierają menu." },
    { q: "Czy mogę później przejść z Basic na Pro?", a: "Tak, aktualizacja to jedno kliknięcie w panelu administracyjnym. Dopłata jest naliczana proporcjonalnie do pozostałych dni opłaconego okresu. Obniżenie z Pro do Basic jest również dostępne — KDS i rezerwacja zostaną wyłączone, ale wszystkie dane są zachowane." },
    { q: "Jaka jest roczna zniżka?", a: "Około 30% w porównaniu z planem miesięcznym. Dokładna kwota jest pokazana przy płatności na stronie planu." },
    { q: "Czy mogę anulować subskrypcję w każdej chwili?", a: "Tak, anulowanie to jedno kliknięcie w panelu administracyjnym. Po anulowaniu konto działa do końca opłaconego okresu, a następnie jest wstrzymane. Dane są zachowane i możesz wrócić, kiedy chcesz." },
    { q: "Jakie metody płatności akceptujecie?", a: "Visa, Mastercard i American Express przez Stripe. Apple Pay i Google Pay również są wspierane. W Europie — SEPA Direct Debit w planie rocznym." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_pl_pricing_hero" />
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
