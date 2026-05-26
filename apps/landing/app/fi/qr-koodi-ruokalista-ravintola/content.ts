import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fi",
  slug: "qr-koodi-ruokalista-ravintola",
  trackPrefix: "l_fi_qr",

  meta: {
    title: "QR-koodi ruokalista ravintoloille | IQ Rest",
    description:
      "QR-koodi ruokalista ravintoloille: asiakas skannaa pöydän QR-koodin, avaa ruokalistan selaimessa ja tilaa omalla kielellään. 14 päivää ilmaiseksi, ilman korttia.",
    canonical: "https://iq-rest.com/fi/qr-koodi-ruokalista-ravintola",
    ogLocale: "fi_FI",
    ogTitle: "QR-koodi ruokalista ravintoloille",
    ogDescription:
      "QR pöydällä, ruokalista puhelimessa — kuvat, allergeenit, 35 kieltä ja päivitykset reaaliajassa.",
    brandLine: "IQ Rest — QR-koodi ruokalista ravintoloille",
  },

  hero: {
    headline: "QR-koodi ruokalista ravintoloille.",
    cta: "Luo QR-menu",
    sub: "Asiakas suuntaa kameran pöydän QR-koodiin ja ruokalista avautuu heti puhelimen selaimessa: annosten kuvat, allergeenit, aina ajantasaiset hinnat ja automaattinen käännös 35 kielelle. Ilman sovellusten lataamista ja ilman ruokalistan uudelleentulostusta jokaisen hinnanmuutoksen yhteydessä.",
  },

  scan: {
    heading: "Onko sinulla jo paperinen tai PDF-ruokalista?",
    headingAccent: "Tekoäly muuttaa sen QR-ruokalistaksi 60 sekunnissa.",
    sub: "Lataa kuva ruokalistasta tai PDF — tekoäly poimii kategoriat, annokset ja hinnat ja liittää ne heti QR-ruokalistaan.",
    cta: "Luo QR-ruokalista",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Yksi QR, 35 kieltä",
      heading: "Yksi QR-koodi, ruokalista 35 kielellä.",
      body: "Asiakas skannaa QR-koodin ja valitsee kielensä: käännöksen hoitaa gastronomiaa ymmärtävä tekoäly, ei yleiskääntäjä. Loppu erillisille ruokalistoille turisteille ja irtolapuille pöydällä.",
      bullets: [
        "Yksi QR-tuloste kattaa 35 kieltä, sisältyy tilaukseen.",
        "Tekoäly ymmärtää keittiön kielen — annosten nimet kuulostavat luontevilta jokaisella kielellä.",
        "Asiakas vaihtaa kieltä ruokalistan sisällä ilman QR:n uudelleenskannausta.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Kaksi asiakasta skannaa saman pöydän QR-koodin ja lukee ruokalistaa eri kielillä" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeenit QR:ssä",
      heading: "Allergeenit ja ruokavaliomerkinnät QR-ruokalistan sisällä.",
      body: "Jokainen QR:ään liitetyn ruokalistan annos voi kantaa merkintöjä gluteenista, laktoosista, pähkinöistä, äyriäisistä sekä vegaanisista ja gluteenittomista vaihtoehdoista. Asiakas suodattaa puhelimesta rajoituksiinsa sopivat annokset kysymättä henkilökunnalta.",
      bullets: [
        "14 allergeenikategoriaa annoksen tasolla.",
        "Vegaani-, kasvis- ja gluteeniton-merkinnät yhdellä klikkauksella paneelissa.",
        "Asiakas suodattaa QR-ruokalistaa omien rajoitustensa mukaan.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Asiakas suodattaa QR-ruokalistaa allergeenien mukaan puhelimessa samalla kun omistaja muokkaa listaa tabletilla" },
    },
    {
      icon: Palette,
      eyebrow: "Enemmän kuin pelkkä QR",
      heading: "QR-ruokalista viimeistelty kuin ravintolan oma verkkosivu.",
      body: "Koodin skannattuaan asiakas ei päädy litteään PDF:ään: hän näkee tervetulonäytön videolla tai nostokuvalla, paikan kuvauksen ja yhteystietosivun kartalla, puhelinnumeroilla ja somelinkeillä. QR:stä tulee ravintolan etuovi verkossa.",
      bullets: [
        "Taustavideo tai nostokuva QR-ruokalistan aloitusnäytöllä.",
        "Tilaa kertoa paikan ja jokaisen kategorian konseptista.",
        "Sisäänrakennettu yhteystietosivu: kartta, puhelin, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Kaksi puhelinta pöydällä: QR-ruokalistan aloitusnäyttö taustavideolla ja yhteystietosivu kartalla" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Tilaus QR:stä · valinnainen",
      heading: "QR-koodista asiakas voi myös tilata.",
      body: "Ruokalistan selaamisen lisäksi QR-ruokalistasta voi tulla tilauskanava: asiakas lisää annokset ostoskoriin ja lähettää pyynnön. Tilaus tavoittaa tarjoilijan salissa, WhatsAppissa tai keittiönäytöllä. Toiminto kytketään päälle tai pois asetuksista tarpeen mukaan.",
      bullets: [
        "Ostoskori, huomautukset ja tilauksen lähetys suoraan QR-skannauksesta.",
        "Tilaus saapuu heti saliin, WhatsAppiin tai keittiönäytölle.",
        "Toiminto aktivoitavissa kellonaikojen, salien tai tiettyjen ravintoloiden mukaan.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Kaksi puhelinta pöydällä: QR-ruokalistasta luotu ostoskori ja vahvistus lähetetystä tilauksesta" },
    },
  ],

  faq: {
    sub: "Mitä ravintoloitsijat kysyvät IQ Restin QR-ruokalistasta. Etkö löydä kysymystäsi? Kirjoita meille WhatsAppissa.",
    items: [
      { q: "Miten IQ Restin QR-ruokalista toimii?", a: "Jokaisella pöydällä on tulostettu QR-koodi. Asiakas skannaa sen puhelimen kameralla, ja selain avaa ravintolan ruokalistan — kuvat, kuvaukset, allergeenit ja ajantasaiset hinnat. Mitään sovellusta ei tarvita, ei asiakkaalle eikä henkilökunnalle." },
      { q: "Tarvitsenko teknisiä taitoja QR-ruokalistan luomiseen?", a: "Et. Paneeli toimii klikkaamalla ja raahaamalla, ilman koodia tai monimutkaisia asetuksia. Annoksen lisääminen vie muutaman sekunnin: nimi, hinta, kuva. Alkuasetus kestää yleensä 30 minuutista tuntiin; jos sinulla on jo PDF-ruokalista, tekoäly muuntaa sen automaattisesti." },
      { q: "Pitääkö asiakkaiden asentaa sovellus QR:n lukemiseen?", a: "Ei. iPhonen ja Androidin natiivikamera tunnistaa QR-koodin sekunneissa ja avaa ruokalistan suoraan selaimessa. Hallintapaneeli toimii myös millä tahansa modernilla selaimella — puhelin, tabletti tai kannettava." },
      { q: "Miten pöytien QR-koodit tulostetaan?", a: "QR-koodit luodaan paneelissa automaattisesti (yksi pöytää kohti tai yksi koko paikalle) ja ladataan tulostusvalmiina PDF-tiedostoina. Tarvitset vain toimistotulostimen ja telineen: teline, tarra tai lasinalunen." },
      { q: "Voinko käyttää omaa verkkotunnusta QR-ruokalistalle?", a: "Kyllä. Tuemme ravintolan verkkotunnusta SSL-varmenteella (esimerkiksi menu.ravintolasi.fi): kun asiakas skannaa QR:n, hän näkee ravintolasi osoitteen yleisen aliverkkotunnuksen sijaan. DNS-asetus kestää 5–10 minuuttia, ja opastamme sinua." },
      { q: "Voinko hallita useamman ravintolan QR-koodeja yhdeltä tililtä?", a: "Kyllä, pyynnöstä. Yksi tili voi koota useita paikkoja, joilla kullakin on omat QR-koodit, ruokalista, suunnittelu ja analytiikka. Kirjoita meille WhatsAppissa, niin otamme käyttöön usean ravintolan tilan." },
      { q: "Onko QR-ruokalistan käynnistäminen alusta vaikeaa?", a: "Kolme vaihetta: (1) luo kategoriat; (2) lisää annokset nimellä, hinnalla ja kuvalla; (3) tulosta QR-koodit ja aseta ne pöydille. Jos sinulla on jo paperinen tai PDF-ruokalista, lataa se — tekoäly tunnistaa kategoriat ja hinnat ja täyttää kortit. Perusruokalista voi olla verkossa 5 minuutissa." },
    ],
  },
};
