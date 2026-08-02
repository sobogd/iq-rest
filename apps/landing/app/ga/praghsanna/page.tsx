import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ga";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Cad a fhiafraíonn bialannóirí faoi phraghsanna agus íocaíocht. Nach féidir leat do cheist a fháil? Cuir teachtaireacht chugainn ar WhatsApp.",
  items: [
    { q: "Conas a oibríonn an praghsáil?", a: "Tógann tú do phlean féin. Is é an biachlár digiteach QR an bonn — cuimsíonn sé aistriúchán le hintleacht shaorga i 35 teanga agus bainistíocht ó aon ghléas. Ansin ní chuireann tú leis ach an méid a theastaíonn uait: áirithintí bord, an scáileán cistine le glacadh orduithe, nó fearann saincheaptha. Tá an praghas in aghaidh na bialainne, agus cuirtear lascainí toirte i bhfeidhm go huathoibríoch ón dara bhialann amach." },
    { q: "An nglacann sibh coimisiún ar orduithe?", a: "Ní ghlacaimid. Téann gach ordú — cibé ó bhiachlár QR nó ordú a ghlacann freastalaí — díreach chuig an mbialann, gan céatadáin ná coimisiúin chomhthiomsóra. Bíonn táille mhíosúil sheasta agat gan aon asbhaintí eile." },
    { q: "Cad atá san áireamh sa tréimhse thrialach 14 lá?", a: "Rochtain iomlán ar gach gné, gan gá le cárta. Tar éis 14 lá cuirtear an cuntas ar sos go huathoibríoch mura bhfuil modh íocaíochta ceangailte. Níl aon táillí uathoibríocha ann gan do thoiliú." },
    { q: "Cad a tharlaíonn tar éis na 14 lá?", a: "Mura bhfuil modh íocaíochta ceangailte, cuirtear an cuntas ar sos go huathoibríoch. Fanann an painéal riaracháin ar fáil i mód léimh amháin, ach díchumasaítear an biachlár QR d'aíonna agus an glacadh orduithe go sealadach. Ní ghearraimid riamh gan do thoiliú." },
    { q: "Cad a tharlaíonn do mo bhiachlár, orduithe agus sonraí le linn an tsosa?", a: "Coinnítear gach rud ina iomláine: an biachlár, grianghraif na miasa, stair na n-orduithe, áirithintí, socruithe dearaidh, staitisticí. Ceangail íocaíocht fiú mí nó sé mhí ina dhiaidh sin — filleann gach rud mar a bhí, ní chailltear aon rud." },
    { q: "An oibreoidh na cóid QR ar na boird i gcónaí tar éis na trialach?", a: "Má bhíonn an cuntas ar sos, taispeánann na cóid QR teachtaireacht ‘ar fáil go sealadach’ do na haíonna. Ní gá duit cóid QR nua a phriontáil: chomh luath is a bheidh íocaíocht ceangailte, osclaíonn na cóid chéanna an biachlár arís." },
    { q: "An féidir liom mo phlean a athrú níos déanaí?", a: "Is féidir — cuir gnéithe leis nó bain díobh am ar bith sa phainéal riaracháin. Roinntear an difríocht go pro rata de réir na laethanta atá fágtha den tréimhse íoctha. Má bhaineann tú gné, múchtar í ach coinnítear a cuid sonraí ar fad." },
    { q: "Cé mhéad bialann is féidir liom a bhainistiú?", a: "An oiread agus a theastaíonn uait — roghnaigh líon na mbialann agus tú ag tógáil do phlean, iad go léir á mbainistiú ó aon deais amháin. Cuirtear lascainí toirte i bhfeidhm go huathoibríoch, suas le 50% as le 5+ bialann. An bhfuil grúpa níos mó á reáchtáil agat? Cuir teachtaireacht chugainn ar WhatsApp faoi phlean saincheaptha." },
    { q: "Cad é an lascaine bhliantúil?", a: "Thart ar 30% i gcomparáid leis an íocaíocht mhíosúil. Taispeántar an méid cruinn agus tú ag tógáil do phlean." },
    { q: "An féidir liom an síntiús a chealú am ar bith?", a: "Is féidir, is le haon chlic amháin sa phainéal riaracháin a dhéantar an cealú. Tar éis an chealaithe leanann an cuntas ag obair go dtí deireadh na tréimhse íoctha, agus ansin cuirtear ar sos é. Coinnítear na sonraí agus is féidir leat filleadh am ar bith is mian leat." },
    { q: "Cad iad na modhanna íocaíochta a ghlacann sibh?", a: "Visa, Mastercard agus American Express trí Stripe. Tacaítear le Apple Pay agus Google Pay chomh maith. San Eoraip — SEPA Direct Debit ar an bplean bliantúil." },
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
        { "@type": "Offer", name: "Biachlár digiteach", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_ga_pricing_hero"
    />
  );
}
