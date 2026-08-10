import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "pl";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Co restauratorzy pytają o cennik i płatności. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp.",
  items: [
    { q: "Jak działa cennik?", a: "Sam budujesz swój plan. Podstawą jest cyfrowe menu QR — zawiera tłumaczenie AI na 35 języków i zarządzanie z dowolnego urządzenia. Następnie dodajesz tylko to, czego potrzebujesz: rezerwację stolików, ekran kuchenny z przyjmowaniem zamówień albo własną domenę. Cena jest naliczana za restaurację, a rabaty ilościowe stosowane są automatycznie już od drugiej restauracji." },
    { q: "Pobieracie prowizję od zamówień?", a: "Nie. Każde zamówienie — z menu QR lub przyjęte przez kelnera — trafia bezpośrednio do restauracji, bez procentów ani prowizji agregatorów. Masz stałą opłatę miesięczną i żadnych innych potrąceń." },
    { q: "Co obejmuje 14-dniowy okres próbny?", a: "Pełny dostęp do wszystkich funkcji, bez podawania karty. Po 14 dniach konto zostaje automatycznie wstrzymane, jeśli nie podłączono metody płatności. Nie ma żadnych automatycznych obciążeń bez Twojej zgody." },
    { q: "Co się dzieje po 14 dniach?", a: "Jeśli nie podłączono metody płatności, konto zostaje automatycznie wstrzymane. Panel administracyjny pozostaje dostępny w trybie tylko do odczytu, ale menu QR dla gości i przyjmowanie zamówień są tymczasowo wyłączone. Nigdy nie obciążamy bez Twojej zgody." },
    { q: "Co dzieje się z moim menu, zamówieniami i danymi podczas wstrzymania?", a: "Wszystko jest w pełni zachowane: menu, zdjęcia dań, historia zamówień, rezerwacje, ustawienia projektu, statystyki. Podłącz płatność nawet po miesiącu czy pół roku — wszystko wraca w takim stanie, w jakim było, nic nie ginie." },
    { q: "Czy kody QR na stolikach nadal będą działać po okresie próbnym?", a: "Jeśli konto jest wstrzymane, kody QR pokazują gościom informację „tymczasowo niedostępne”. Nie musisz drukować nowych kodów QR: gdy tylko podłączysz płatność, te same kody ponownie otwierają menu." },
    { q: "Czy mogę później zmienić swój plan?", a: "Tak — możesz w każdej chwili dodawać lub usuwać funkcje w panelu administracyjnym. Różnica jest rozliczana proporcjonalnie do pozostałych dni opłaconego okresu. Jeśli usuniesz funkcję, zostaje ona wyłączona, ale wszystkie jej dane są zachowane." },
    { q: "Iloma restauracjami mogę zarządzać?", a: "Tyloma, iloma potrzebujesz — liczbę restauracji wybierasz podczas budowania planu, a wszystkimi zarządzasz z jednego panelu. Rabaty ilościowe stosowane są automatycznie, do 50% przy 5 i więcej restauracjach. Prowadzisz większą sieć? Napisz do nas na WhatsApp w sprawie indywidualnego planu." },
    { q: "Jaka jest roczna zniżka?", a: "Około 30% w porównaniu z rozliczeniem miesięcznym. Dokładną kwotę zobaczysz podczas budowania swojego planu." },
    { q: "Czy mogę anulować subskrypcję w każdej chwili?", a: "Tak, anulowanie to jedno kliknięcie w panelu administracyjnym. Po anulowaniu konto działa do końca opłaconego okresu, a następnie zostaje wstrzymane. Dane są zachowane i możesz wrócić, kiedy tylko chcesz." },
    { q: "Jakie metody płatności akceptujecie?", a: "Visa, Mastercard i American Express przez Stripe. Obsługiwane są także Apple Pay i Google Pay. W Europie — SEPA Direct Debit w planie rocznym." },
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
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    />
  );
}
