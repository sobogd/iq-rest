import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "is";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Það sem veitingamenn spyrja um verð og greiðslu. Finnurðu ekki þína spurningu? Skrifaðu okkur á WhatsApp.",
  items: [
    { q: "Hver er munurinn á Basic og Pro?", a: "Basic inniheldur stafrænan + QR matseðil, gervigreindar þýðingu á 35 tungumál, pantanatöku úr matseðlinum (valfrjálst) og stjórnun úr hvaða tæki sem er. Pro bætir við eldhússkjánum (KDS) og borðabókun á netinu 24/7, auk forgangs WhatsApp aðstoðar. Ef þú þarft ekki eldhúsflæði og bókanir — Basic dekkar allt." },
    { q: "Takið þið þóknun af pöntunum?", a: "Nei. Hver pöntun — úr QR matseðli eða tekin af þjóni — fer beint til veitingastaðarins, án prósentu eða samanafnsþóknunar. Þú ert með fast mánaðargjald og engar aðrar frádrágur." },
    { q: "Hvað er innifalið í 14 daga prufutímabilinu?", a: "Fullur aðgangur að öllum eiginleikum í báðum áskriftum, ekkert kort krafist. Eftir 14 daga er reikningurinn settur sjálfkrafa á bið ef engin greiðsluaðferð er tengd. Engar sjálfvirkar greiðslur án þíns samþykkis." },
    { q: "Hvað gerist eftir 14 daga?", a: "Ef engin greiðsluaðferð er tengd er reikningurinn settur sjálfkrafa á bið. Stjórnborðið er aðgengilegt í lesa-aðeins hami, en QR matseðill fyrir gesti og pantanataka eru tímabundið óvirk. Við rukkum aldrei án þíns samþykkis." },
    { q: "Hvað verður um matseðilinn minn, pantanir og gögn meðan á hléi stendur?", a: "Allt er varðveitt að fullu: matseðill, myndir af réttum, pantanasaga, bókanir, hönnunarstillingar, tölfræði. Tengdu greiðslu jafnvel mánuði eða sex mánuðum síðar — allt kemur til baka eins og það var, ekkert tapast." },
    { q: "Munu QR kóðar á borðunum enn virka eftir prufutímabilið?", a: "Ef reikningurinn er á bið sýna QR kóðarnir gestum skilaboðin „tímabundið ekki tiltækt“. Þú þarft ekki að prenta nýja QR kóða: um leið og greiðsla er tengd opna sömu kóðar matseðilinn aftur." },
    { q: "Get ég skipt úr Basic í Pro síðar?", a: "Já, uppfærsla er með einum smelli í stjórnborðinu. Aukagjaldið er hlutfallslega reiknað út frá þeim dögum sem eftir eru af greidda tímabilinu. Niðurfærsla úr Pro í Basic er einnig í boði — KDS og bókun verða óvirk en öll gögn varðveitast." },
    { q: "Hver er árlegur afsláttur?", a: "Um 30% miðað við mánaðaráskrift. Nákvæmur fjárhæð er sýnd við greiðslu á áskriftarsíðunni." },
    { q: "Get ég sagt áskriftinni upp hvenær sem er?", a: "Já, uppsögn er með einum smelli í stjórnborðinu. Eftir uppsögn virkar reikningurinn til loka greidda tímabilsins, síðan er hann settur á bið. Gögn varðveitast og þú getur komið til baka hvenær sem þú vilt." },
    { q: "Hvaða greiðsluaðferðir takið þið?", a: "Visa, Mastercard og American Express í gegnum Stripe. Apple Pay og Google Pay eru einnig studd. Í Evrópu — SEPA Direct Debit á árlegri áskrift." },
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
        { "@type": "Offer", name: "Basic", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: SCHEMA_PRICE_PRO_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_is_pricing_hero" />
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
