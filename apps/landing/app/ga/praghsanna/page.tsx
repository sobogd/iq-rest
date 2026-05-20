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

const LOCALE = "ga";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Cad a fhiafraíonn bialannóirí faoi phraghsanna agus íocaíocht. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp.",
  items: [
    { q: "Cad é an difríocht idir Basic agus Pro?", a: "Cuimsíonn Basic an biachlár digiteach + QR, aistriúchán IS i 35 teanga, glacadh orduithe ón mbiachlár (roghnach) agus bainistíocht ó aon ghléas. Cuireann Pro an scáileán cistine (KDS) agus an curfha bord ar líne 24/7 leis, móide tacaíocht WhatsApp tosaíochta. Mura dteastaíonn sreabhadh cistine ná curfhaí uait — clúdaíonn Basic gach rud." },
    { q: "An nglacann sibh coimisiún ar orduithe?", a: "Ní ghlacaimid. Téann gach ordú — ó bhiachlár QR nó ón bhfreastalaí — díreach chuig an mbialann, gan céatadáin ná coimisiúin comhthiomsóra. Tá táille mhíosúil sheasta agat agus gan asbhaintí eile." },
    { q: "Cad atá san áireamh sa tréimhse trialach 14 lá?", a: "Rochtain iomlán ar gach gné sa dá phlean, gan cárta. Tar éis 14 lá cuirfear an cuntas ar shos go huathoibríoch mura bhfuil modh íocaíochta nasctha. Níl aon táillí uathoibríocha gan do thoiliú." },
    { q: "Cad a tharlóidh tar éis na 14 lá?", a: "Mura bhfuil modh íocaíochta nasctha, cuirfear an cuntas ar shos go huathoibríoch. Fanann an painéal riaracháin ar fáil i mód léitheoireachta amháin, ach tá an biachlár QR d'aíonna agus glacadh orduithe díchumasaithe go sealadach. Ní ghearraimid riamh gan do thoiliú." },
    { q: "Cad a tharlóidh do mo bhiachlár, orduithe agus sonraí le linn an tsosa?", a: "Coinnítear gach rud go hiomlán: biachlár, grianghraif miasa, stair orduithe, curfhaí, socruithe dearaidh, staitisticí. Nasc íocaíocht fiú mí nó sé mhí ina dhiaidh sin — filleann gach rud mar a bhí, ní chailltear tada." },
    { q: "An oibreoidh na cóid QR ar na boird tar éis na trialach?", a: "Má tá an cuntas ar shos, taispeánann na cóid QR teachtaireacht „ar fáil go sealadach“ d'aíonna. Ní gá duit cóid QR nua a phriontáil: chomh luath agus a bheidh íocaíocht nasctha, osclaíonn na cóid céanna an biachlár arís." },
    { q: "An féidir liom athrú ó Basic go Pro níos déanaí?", a: "Tá, déantar an t-uasghrádú le cliceáil amháin sa phainéal riaracháin. Ríomhtar an formhuirear go pro rata de réir laethanta atá fágtha den tréimhse íoctha. Tá ísliú ó Pro go Basic ar fáil freisin — díchumasófar KDS agus curfha, ach coinnítear gach sonra." },
    { q: "Cad é an lascaine bhliantúil?", a: "Thart ar 30% i gcomparáid leis an bplean míosúil. Taispeántar an méid cruinn ag an íocaíocht ar leathanach an phlean." },
    { q: "An féidir liom an síntiús a chealú aon uair?", a: "Tá, déantar an cealú le cliceáil amháin sa phainéal riaracháin. Tar éis an chealaithe oibríonn an cuntas go dtí deireadh na tréimhse íoctha, ansin cuirtear ar shos é. Coinnítear sonraí agus is féidir leat filleadh aon uair." },
    { q: "Cad iad na modhanna íocaíochta a ghlacann sibh?", a: "Visa, Mastercard agus American Express trí Stripe. Tacaítear le Apple Pay agus Google Pay freisin. San Eoraip — Dochar Díreach SEPA ar an bplean bliantúil." },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_ga_pricing_hero" />
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
