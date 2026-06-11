import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "fi";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Mitä ravintoloitsijat kysyvät hinnoista ja maksusta. Etkö löydä omaa kysymystäsi? Kirjoita meille WhatsAppissa.",
  items: [
    { q: "Mikä on Basicin ja Pron ero?", a: "Basic sisältää digitaalisen + QR-ruokalistan, AI-käännöksen 35 kielelle, tilausten oton ruokalistasta (valinnainen) ja hallinnan mistä tahansa laitteesta. Pro lisää keittiön näytön (KDS) ja online-pöytävarauksen 24/7, plus prioriteetti-WhatsApp-tuen. Jos et tarvitse keittiövirtaa ja varauksia — Basic kattaa kaiken." },
    { q: "Otatteko provisiota tilauksista?", a: "Emme. Jokainen tilaus — QR-ruokalistasta tai tarjoilijan vastaanottama — menee suoraan ravintolalle, ilman prosenttiosuuksia tai välityspalkkioita. Sinulla on kiinteä kuukausimaksu eikä muita vähennyksiä." },
    { q: "Mitä 14 päivän kokeilu sisältää?", a: "Täysi pääsy kaikkiin ominaisuuksiin molemmissa paketeissa, ilman korttia. 14 päivän jälkeen tili keskeytetään automaattisesti, jos maksutapaa ei ole liitetty. Ei automaattisia veloituksia ilman suostumustasi." },
    { q: "Mitä tapahtuu 14 päivän jälkeen?", a: "Jos maksutapaa ei ole liitetty, tili keskeytetään automaattisesti. Hallintapaneeli pysyy käytettävissä vain luku -tilassa, mutta vieras-QR-ruokalista ja tilausten otto ovat tilapäisesti pois käytöstä. Emme veloita koskaan ilman suostumustasi." },
    { q: "Mitä tapahtuu ruokalistalle, tilauksille ja datalle tauon aikana?", a: "Kaikki säilytetään täydellisesti: ruokalista, ruokien kuvat, tilaushistoria, varaukset, suunnitteluasetukset, tilastot. Liitä maksu vaikka kuukauden tai puolen vuoden kuluttua — kaikki palautuu sellaisena kuin oli, mitään ei menetetä." },
    { q: "Toimivatko QR-koodit pöydissä vielä kokeilun jälkeen?", a: "Jos tili on keskeytetty, QR-koodit näyttävät vieraille viestin ”tilapäisesti ei käytettävissä”. Sinun ei tarvitse tulostaa uusia QR-koodeja: kun maksu on liitetty, samat koodit avaavat ruokalistan jälleen." },
    { q: "Voinko vaihtaa Basicista Prohon myöhemmin?", a: "Kyllä, päivitys tapahtuu yhdellä klikkauksella hallintapaneelissa. Lisämaksu lasketaan suhteessa maksetun jakson jäljellä oleviin päiviin. Alennus Prosta Basiciksi on myös mahdollista — KDS ja varaus poistuvat käytöstä, mutta kaikki data säilyy." },
    { q: "Mikä on vuosialennus?", a: "Noin 30 % verrattuna kuukausipakettiin. Tarkka summa näytetään maksun yhteydessä paketin sivulla." },
    { q: "Voinko peruuttaa tilauksen koska tahansa?", a: "Kyllä, peruutus tapahtuu yhdellä klikkauksella hallintapaneelissa. Peruutuksen jälkeen tili toimii maksetun jakson loppuun, sitten se keskeytetään. Data säilyy ja voit palata milloin haluat." },
    { q: "Mitä maksutapoja hyväksytte?", a: "Visa, Mastercard ja American Express Stripen kautta. Apple Pay ja Google Pay ovat myös tuettuja. Euroopassa — SEPA-suoraveloitus vuosipaketissa." },
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
    <PricingTemplate
      locale={LOCALE}
      texts={DEFAULT}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      trackPrefix="l_fi_pricing_hero"
    />
  );
}
