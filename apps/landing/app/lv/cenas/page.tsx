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

const LOCALE = "lv";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Ko restorāni jautā par cenām un maksāšanu. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp.",
  items: [
    { q: "Kāda atšķirība starp Basic un Pro?", a: "Basic ietver digitālo + QR ēdienkarti, AI tulkojumu 35 valodās, pasūtījumu pieņemšanu no ēdienkartes (pēc izvēles) un pārvaldību no jebkura ierīces. Pro pievieno virtuves ekrānu (KDS) un tiešsaistes galdu rezervēšanu 24/7, plus prioritāru WhatsApp atbalstu. Ja nav nepieciešama virtuves plūsma un rezervācijas — Basic pārklāj visu." },
    { q: "Vai jūs iekasējat komisiju no pasūtījumiem?", a: "Nē. Katrs pasūtījums — no QR ēdienkartes vai pieņemts ar viesmīli — tiek nosūtīts tieši restorānam, bez procentiem vai agregatoru komisijas. Jums ir fiksēta ikmēneša maksa un nekādu citu atskaitījumu." },
    { q: "Ko ietver 14 dienu izmēģinājums?", a: "Pilna piekļuve visām funkcijām abos plānos, bez kartes. Pēc 14 dienām konts tiek automātiski apturēts, ja nav pievienota maksāšanas metode. Bez automātiskām maksām bez jūsu piekrišanas." },
    { q: "Kas notiek pēc 14 dienām?", a: "Ja nav pievienota maksāšanas metode, konts tiek automātiski apturēts. Administrēšanas panelis paliek pieejams tikai lasīšanas režīmā, bet QR ēdienkarte viesiem un pasūtījumu pieņemšana ir uz laiku atspējoti. Mēs nekad neiekasējam bez jūsu piekrišanas." },
    { q: "Kas notiek ar manu ēdienkarti, pasūtījumiem un datiem pauzes laikā?", a: "Viss tiek pilnībā saglabāts: ēdienkarte, ēdienu fotoattēli, pasūtījumu vēsture, rezervācijas, dizaina iestatījumi, statistika. Pievienojiet maksājumu pat pēc mēneša vai sešiem mēnešiem — viss atgriežas tāds, kāds bija, nekas netiek zaudēts." },
    { q: "Vai QR kodi uz galdiem joprojām darbosies pēc izmēģinājuma?", a: "Ja konts ir apturēts, QR kodi rāda viesiem ziņojumu „uz laiku nav pieejams“. Jums nav jādrukā jauni QR kodi: tiklīdz maksājums ir pievienots, tie paši kodi atkal atver ēdienkarti." },
    { q: "Vai vēlāk varu pāriet no Basic uz Pro?", a: "Jā, jauninājums tiek veikts ar vienu klikšķi administrēšanas panelī. Papildmaksa tiek aprēķināta proporcionāli atlikušajām samaksātā perioda dienām. Pazemināšana no Pro uz Basic arī ir pieejama — KDS un rezervēšana tiks atspējoti, bet visi dati tiek saglabāti." },
    { q: "Kāda ir gada atlaide?", a: "Aptuveni 30 % salīdzinājumā ar ikmēneša plānu. Precīza summa tiek parādīta maksājuma laikā plāna lapā." },
    { q: "Vai varu atcelt abonementu jebkurā laikā?", a: "Jā, atcelšana tiek veikta ar vienu klikšķi administrēšanas panelī. Pēc atcelšanas konts darbojas līdz samaksātā perioda beigām, pēc tam tiek apturēts. Dati tiek saglabāti un jūs varat atgriezties, kad vēlaties." },
    { q: "Kādas maksāšanas metodes pieņemat?", a: "Visa, Mastercard un American Express caur Stripe. Apple Pay un Google Pay arī tiek atbalstīti. Eiropā — SEPA tiešais debets gada plānā." },
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

      <Section dataSection="pricing_hero" noContainer accent>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_lv_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
