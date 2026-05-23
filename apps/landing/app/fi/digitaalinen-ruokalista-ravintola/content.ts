import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fi",
  slug: "digitaalinen-ruokalista-ravintola",
  trackPrefix: "l_fi_digital",

  meta: {
    title: "Digitaalinen ruokalista ravintoloille | IQ Rest",
    description:
      "Digitaalinen ruokalista ravintoloille: online-ruokalista kuvilla, allergeeneilla, AI-käännöksellä ja reaaliaikaisilla hintapäivityksillä. 14 päivää ilmaiseksi, ilman korttia.",
    canonical: "https://iq-rest.com/fi/digitaalinen-ruokalista-ravintola",
    ogLocale: "fi_FI",
    ogTitle: "Digitaalinen ruokalista ravintoloille",
    ogDescription:
      "Paperisen ruokalistasi online-versio — kuvat, allergeenit, AI-käännös, reaaliaikaiset päivitykset.",
    brandLine: "IQ Rest — Digitaalinen ruokalista ravintoloille",
  },

  hero: {
    headline: "Digitaalinen ruokalista ravintoloille.",
    sub: "Paperisen ruokalistasi online-versio kuvilla, allergeeneilla, kuvauksilla ja reaaliaikaisilla hintapäivityksillä. Vieraat näkevät ruokalistan omalla kielellään; ravintola säästää tulostuksessa.",
  },

  scan: {
    heading: "Onko sinulla paperinen ruokalista tai PDF?",
    headingAccent: "AI digitoi sen 60 sekunnissa.",
    sub: "Lataa kuva tai dokumentti — AI tunnistaa kategoriat, ruoat ja hinnat automaattisesti.",
    cta: "Skannaa ruokalista",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI-kieltä",
      heading: "35 AI-kieltä — jokainen vieras lukee ruokalistan omallaan.",
      body: "Yksi QR-koodi, 35 kieltä. AI hallitsee kulinaarista kontekstia — ruokien nimet ja kuvaukset kuulostavat luonnollisilta. Turistit tilaavat varmemmin ja keskimääräinen lasku kasvaa, ilman että tarjoilijan tarvitsee kääntää jokaista ruokaa.",
      bullets: [
        "35 kieltä sisältyy tilaukseen, ilman lisämaksua.",
        "AI ymmärtää kulinaarisen kontekstin, ei pelkkä Google Translate.",
        "Vieras vaihtaa kielen yhdellä näpäytyksellä suoraan ruokalistassa.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Kaksi vierasta lukee samaa digitaalista ruokalistaa eri kielillä omilla puhelimillaan" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeenit",
      heading: "Allergeeni- ja ruokavalio-merkit.",
      body: "Merkitse ruoat gluteenille, laktoosille, pähkinöille, äyriäisille, vegaanisille ja gluteenittomille vaihtoehdoille. Vieraat suodattavat ruokalistan ruokavaliotarpeidensa mukaan ja tilaavat suuremmalla varmuudella.",
      bullets: [
        "14 vakioallergeenikategoriaa jokaisessa ruoassa.",
        "Vegaani-, kasvis- ja gluteeniton-merkit yhdellä klikkauksella.",
        "Vieraat suodattavat ruokalistan ruokavaliorajoitustensa mukaan.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Vieras suodattaa ruokalistaa allergeenien mukaan puhelimella, kun omistaja muokkaa allergeenilistaa tabletilla" },
    },
    {
      icon: Palette,
      eyebrow: "Premium-suunnittelu",
      heading: "Premium-suunnittelu videotaustalla ja yhteystietosivulla.",
      body: "Video tai kuva tervetuloruudulla, ravintolan kuvaus, oma yhteystietosivu kartalla, puhelinnumeroilla ja sosiaalisen median profiileilla. Digitaalinen ruokalista näyttää täydeltä ravintolasivustolta, ei PDF:ltä QR-koodin takana.",
      bullets: [
        "Videotausta tai iso kuva tervetuloruudulla.",
        "Ravintolan ja kategorioiden kuvaukset — kerro konseptin tarina.",
        "Yhteystietosivu: kartta, puhelin, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Kaksi puhelinta kahvilan pöydällä: ruokalistan etusivu videotaustalla ja yhteystietosivu kartalla" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Tilaukset ruokalistasta · valinnainen",
      heading: "Vieraat tilaavat suoraan ruokalistasta.",
      body: "Vieraat kokoavat ostoskorin QR-ruokalistassa ja lähettävät tilauksen — se saapuu tarjoilijalle salissa tai keittiön tabletille. Ominaisuus voidaan kytkeä päälle tai pois asetuksissa koska tahansa.",
      bullets: [
        "Ostoskori, kommentit ja tilauksen lähetys yhdellä näpäytyksellä.",
        "Tilaus saapuu välittömästi hallintapaneeliin, WhatsAppiin tai keittiön näyttöön.",
        "Ominaisuus kytketään asetuksissa.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Kaksi puhelinta pöydällä: ostoskori tilauksella ja tilauksen lähetyksen vahvistus" },
    },
  ],

  faq: {
    sub: "Mitä ravintoloitsijat kysyvät digitaalisesta ruokalistasta IQ Restissä. Etkö löydä omaa kysymystäsi? Kirjoita meille WhatsAppissa.",
    items: [
      { q: "Tarvitsenko teknisiä taitoja tai CMS-kokemusta?", a: "Et, erityistaitoja ei tarvita. Jokainen toiminto hallintapaneelissa tapahtuu klikkaamalla ja raahaamalla — ilman koodia. Tuotteen lisääminen ruokalistaan vie muutaman sekunnin: nimi, hinta, kuva. Koko ruokalistan asetus kestää yleensä 30 minuutista tuntiin." },
      { q: "Mikä on IQ Restin digitaalinen ruokalista?", a: "IQ Rest on pilvialusta ravintoloille. Digitaalinen ruokalista on ruokalistasi online-versio, joka on vieraiden saatavilla QR-koodin tai suoran linkin kautta: ruokakuvat, hinnat, allergeenit, AI-käännös 35 kielelle, reaaliaikaiset päivitykset. Ruokalista isännöidään meidän palvelimillamme; sinun ei tarvitse asentaa tai ylläpitää ohjelmistoa — avaa vain selain." },
      { q: "Tarvitsevatko vieraat sovelluksen tai erityislaitteita?", a: "Eivät. Vieraat osoittavat puhelimen kameraa QR-koodia kohti ja ruokalista aukeaa selaimessa. Ravintolan hallintapaneeli toimii myös missä tahansa modernissa selaimessa — puhelimessa, tabletissa tai läppärillä. QR-koodit tulostuvat millä tahansa toimistotulostimella." },
      { q: "Voinko isännöidä ruokalistan omalla verkkotunnuksellani?", a: "Kyllä. Tuemme omaa verkkotunnusta SSL-sertifikaatilla — vieraat näkevät ruokalistan ravintolasi osoitteessa (esim. ruokalista.ravintolasi.fi). Autamme DNS:n asetuksessa; se kestää yleensä 5–10 minuuttia." },
      { q: "Voinko hallita useita ravintoloita yhdestä tilistä?", a: "Kyllä, pyynnöstä. Yksi tili voi isännöidä useita ravintoloita: jokaisella paikalla oma ruokalista, suunnittelu, QR-koodit ja analytiikka. Kirjoita meille WhatsAppissa ja aktivoimme moniravintolatilan ryhmällesi." },
      { q: "Kuinka vaikeaa on perustaa ruokalista alusta alkaen?", a: "Asetus koostuu kolmesta vaiheesta: (1) luo kategoriat; (2) lisää tuotteet nimillä, hinnoilla ja kuvilla; (3) tulosta QR-koodit pöytiin. Jos sinulla on jo paperinen ruokalista tai PDF, lataa se — AI tunnistaa kategoriat, nimet ja hinnat ja täyttää kortit automaattisesti. Perusruokalista voi olla käytössä 5 minuutissa; kokonaisaika riippuu tuotteiden määrästä." },
      { q: "Millaista tukea tarjoatte?", a: "Olemme saatavilla WhatsAppissa toimistoaikoina ja vastaamme nopeasti sähköpostiin. Autamme alkuasetuksessa, verkkotunnuksen konfiguroinnissa, ruokalistan suunnittelussa ja kaikissa epätavallisissa tilanteissa. Jos tarvitset demon tai käytännön tukea käyttöönotossa — kirjoita meille." },
    ],
  },
};
