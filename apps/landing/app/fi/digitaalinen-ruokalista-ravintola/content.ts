import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fi",
  slug: "digitaalinen-ruokalista-ravintola",
  trackPrefix: "l_fi_digital",
  hideFeatureHeading: true,

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
    headline: "Digitaalinen ruokalista,\njossa on kaikki",
    cta: "Luo digitaalinen menu",
    sub: "Kuvat, allergeenit ja käännös 35 kielelle. Lisäksi tilaukset, WhatsApp ja pöytävaraus — kaikki yhdessä IQ Restissä.",
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
      heading: "35 kieltä jokaiselle vieraalle",
      body: "Yksi QR, 35 kieltä. AI kääntää kulinaarisella kontekstilla, joten jokainen ruoka kuulostaa luonnolliselta. Turistit tilaavat varmasti.",
      bullets: [
        "35 kieltä tilauksessasi",
        "Kulinaarinen AI, ei Google",
        "Kielen vaihto yhdellä napautuksella",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Kaksi vierasta lukee samaa digitaalista ruokalistaa eri kielillä omilla puhelimillaan" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeenit",
      heading: "Allergeenit ja ruokavaliot joka ruoassa",
      body: "Merkitse gluteeni, laktoosi, pähkinät, vegaani ja gluteeniton. Vieraat suodattavat ruokalistan ja tilaavat vaivattomasti.",
      bullets: [
        "14 allergeeniryhmää",
        "Vegaani- ja gluteeniton-merkit",
        "Vieraat suodattavat ruokavalion mukaan",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Vieras suodattaa ruokalistaa allergeenien mukaan puhelimella, kun omistaja muokkaa allergeenilistaa tabletilla" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Mikä tahansa laite",
      heading: "Hallitse miltä tahansa laitteelta",
      body: "Hallintapaneeli toimii selaimessa — muokkaa ruokalistaa, hintoja ja kuvia mistä tahansa. Mitään ei tarvitse asentaa.",
      bullets: [
        "Toimii missä tahansa selaimessa",
        "Puhelin, tabletti tai PC",
        "Mitään ei asenneta",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Ei provisiota",
      heading: "Nolla provisiota, ei lisiä",
      body: "Yksi läpinäkyvä tilaus. Emme ota osuutta liikevaihdostasi emmekä piilota maksuja — kaikki jää ravintolalle.",
      bullets: [
        "Nolla prosenttia tilauksista",
        "Ei piilokuluja",
        "Yksi kiinteä hinta",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Oma verkkotunnus",
      heading: "Ruokalista omalla verkkotunnuksellasi",
      body: "Yhdistämme verkkotunnuksesi SSL:llä — vieraat näkevät ruokalistan ravintolasi osoitteessa. Autamme DNS:ssä 10 minuutissa.",
      bullets: [
        "Oma verkkotunnus SSL:llä",
        "ruokalista.ravintolasi.fi",
        "Autamme DNS-asetuksissa",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Oma ilmeesi",
      heading: "Joustava ulkoasu juuri sinulle",
      body: "Useita valmiita pohjia ja tyylejä — valitse kansi, värit ja ruokien esitystapa, jotka sopivat ravintolaasi.",
      bullets: [
        "Useita valmiita pohjia",
        "Oma kansi ja omat värit",
        "Uusi ilme muutamalla klikkauksella",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Yhteystiedot",
      heading: "Yhteystiedot ja somet ruokalistassa",
      body: "Oma sivu kartalla, puhelimella ja linkeillä Instagramiin ja WhatsAppiin — vieraat löytävät sinut yhdellä napautuksella.",
      bullets: [
        "Kartta, puhelin ja osoite",
        "Instagram ja WhatsApp",
        "Tavoita meidät yhdellä napautuksella",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp-tilaukset",
      heading: "Ota tilauksia vastaan WhatsAppissa",
      body: "Vieraat kokoavat ostoskorin ja lähettävät tilauksen suoraan WhatsAppiisi — ei erillistä sovellusta, tutussa chatissa.",
      bullets: [
        "Tilaus WhatsAppiisi",
        "Ei erillistä sovellusta",
        "Chattaa kuten ennenkin",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Varaukset",
      heading: "Pöytävaraus ilman puheluita",
      body: "Vieraat varaavat pöydän itse ruokalistan tai linkin kautta, sinä näet kalenterin pöydittäin ja vahvistat auto- tai käsin.",
      bullets: [
        "Varaus 24/7, ilman puheluita",
        "Kalenteri kaikille pöydille",
        "Auto- ja käsivahvistus",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium-ilme",
      heading: "Näyttää sivustolta, ei PDF:ltä",
      body: "Videotausta tervetuloruudulla, konseptisi kuvattuna ja erillinen yhteystietosivu kartalla ja someilla.",
      bullets: [
        "Video etusivulla",
        "Konsepti ja ruoat kuvattuna",
        "Erillinen yhteystietosivu",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Kaksi puhelinta kahvilan pöydällä: ruokalistan etusivu videotaustalla ja yhteystietosivu kartalla" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Tilaukset · valinnainen",
      heading: "Tilaukset suoraan ruokalistasta",
      body: "Vieraat kokoavat ostoskorin ja lähettävät tilauksen — se saapuu saliin, WhatsAppiin tai keittiön näyttöön. Valinnainen.",
      bullets: [
        "Ostoskori ja lähetys napautuksella",
        "Saliin, WhatsAppiin tai keittiöön",
        "Kytke se asetuksissa",
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
