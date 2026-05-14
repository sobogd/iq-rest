import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Monikielinen ravintolaruokalista — 35 kieltä, vaihto yhdellä napautuksella",
    description:
      "Palvele kansainvälisiä vieraita heidän kielellään. Ravintolan ruokalista 35 kielellä yhden napautuksen vaihdolla. RTL-tuki arabialle ja persialle. 14 päivän ilmainen kokeilu.",
    canonical: "https://iq-rest.com/fi/multilingual",
    ogLocale: "fi_FI",
    ogTitle: "Monikielinen ravintolaruokalista-sivusto — 35 kieltä mukana",
    ogDescription:
      "Turistit skannaavat, näkevät ruokalistasi automaattisesti kielellään. 35 kieltä, RTL-tuki, automaattinen tunnistus puhelimen asetuksista. 14 päivän ilmainen kokeilu.",
  },

  hero: {
    title: "Ruokalistasi puhuu jokaisen turistin kieltä.",
    subtitle:
      "Monikielisen ravintolaruokalistan ei pitäisi olla projekti. IQ Restillä QR-ruokalistasi tunnistaa automaattisesti jokaisen vieraan puhelimen kielen ja tarjoaa sen millä tahansa 35 kielestä — mukaan lukien arabia ja persia oikeanlaisella oikealta vasemmalle -renderöinnillä.",
    trustLine: "Yli 500 ravintolaa yli 30 maassa",
  },

  seo: {
    description:
      "Rakenna ruokalistasi kerran, palvele se 35 kielellä. IQ Rest tunnistaa automaattisesti jokaisen vieraan puhelimen kielen ja renderöi ruokalistan heidän kielellään — ei lipun napauttamista, ei kielimuuria, ei kiusallisia Google Translate -hetkiä. Espanjasta ja saksasta japaniin, arabiaan ja mandariiniin, vieraasi näkevät ravintolasi sellaisena kuin se oli tarkoitettu nähtäväksi.",
    fullDescription:
      "Useimmat 'monikieliset' ruokalistat ovat PDF-tiedostoja rikkonaisesta Google Translatesta, tulostettu kerran eikä koskaan päivitetty. IQ Restin monikielinen ravintolasivusto on oikeaa i18n:ää: jokaisella kielellä on oma kunnollisesti käännetty teksti, oma URL-slug, omat metatunnisteet Googlen indeksoitavaksi ja oma reititys ruokalistasovelluksen sisällä.\n\nKun ranskankielisellä iPhonella varustettu turisti skannaa QR-koodisi, ruokalista avautuu automaattisesti ranskaksi — ei napautuksia, ei päätöksiä. He voivat vaihtaa mihin tahansa muuhun kieleen yläosassa olevalla kielivalitsimella, mutta useimmat eivät koskaan tarvitse sitä. Sama pätee ruokavaliotunnisteisiin ('vegan' muuttuu muotoon 'vegano' / 'vegetarisch' / 'ヴィーガン' kielestä riippuen), virheilmoituksiin, 'lisää ostoskoriin' -painikkeisiin, kuitteihin. Jokainen käyttöliittymäteksti 35 kielellä, ei vain ruokalistan sisältö.\n\nRTL-kielille — arabialle ja persialle — koko asettelu kääntyy oikein: teksti tasautuu oikealle, valikot avautuvat oikealta, hinnat ilmestyvät ruoan nimen jälkeen kuten odotettua. Tämä ei ole CSS-temppu, vaan täysi RTL-tuki, joka saa arabian- ja persiankieliset vieraat tuntemaan itsensä palvelluiksi, ei jälkikäteen sovitelluiksi.",
    benefitsHeading: "Miksi oikea monikielinen ruokalista voittaa PDF-käännöksen",
    benefits: [
      "35 kieltä kunnollisella käyttöliittymäkäännöksellä — ei vain ruokalistan kohteilla",
      "Tunnistaa automaattisesti vieraan puhelimen kielen — ei napautuksia tarvita",
      "Manuaalinen kielenvaihto vieraille, jotka pitävät toisesta kielestä",
      "Täysi RTL-tuki arabialle ja persialle — ei CSS-temppu",
      "Jokaisella kielellä on oma URL — Google indeksoi sivustosi 35 versiota",
      "Vaihda ruoan kuvaus omalla kielelläsi — käännökset seuraavat",
    ],
  },

  pricing: {
    heading: "Yksi paketti.",
    headingAccent: "Kaikki 35 kieltä mukana.",
    sub: "Monikielinen ruokalista, AI-käännös, QR-tilaaminen ja varaukset — kaikki yhdellä kiinteällä hinnalla. Ei kielikohtaisia maksuja, ei lisämaksuja RTL:lle.",
  },

  faq: {
    sub: "Kaikki, mitä ravintoloitsijat kysyvät monikielisestä ruokalistasta. Etkö löydä omaasi? Pingaa meitä WhatsAppissa — oikeat ihmiset vastaavat.",
    items: [
      {
        q: "Kuinka montaa kieltä ruokalista tukee?",
        a: "35 kieltä, mukaan lukien englanti, espanja, saksa, ranska, italia, portugali, hollanti, puola, tšekki, slovakki, unkari, romania, bulgaria, kroatia, serbia, slovenia, kreikka, turkki, venäjä, ukraina, liettua, latvia, viro, suomi, ruotsi, norja, tanska, islanti, katalaani, iiri, arabia, persia, japani, korea ja kiina. Käyttöliittymätekstit on käännetty ammattimaisesti jokaiselle.",
      },
      {
        q: "Miten asiakkaat vaihtavat kieltä?",
        a: "Kahdella tavalla: automaattisesti (ruokalista avautuu heidän puhelimensa kielellä) ja manuaalisesti (kielivalitsin ruokalistan yläosassa). 80 % turisteista ei koskaan koske manuaaliseen valitsimeen — automaattinen tunnistus toimii, koska heidän puhelimensa tietää jo heidän kielensä.",
      },
      {
        q: "Tuetteko oikealta vasemmalle -kieliä kuten arabia ja persia?",
        a: "Kyllä, täydellä RTL-asettelulla. Koko ruokalista kääntyy: teksti tasautuu oikealle, sarakkeet kääntyvät, navigointilaatikot avautuvat oikealta puolelta, hinnat ilmestyvät ruokien nimien jälkeen. Tämä on oikeaa RTL-tukea, joka on toteutettu asettelutasolla, ei vain CSS-suuntatempuilla.",
      },
      {
        q: "Indeksoiko Google ruokalistani kaikilla 35 kielellä?",
        a: "Kyllä. Jokaisella kielellä on oma URL-slug (esim. /es, /fr, /de), kunnolliset hreflang-tunnisteet, paikallistetut metaotsikot ja -kuvaukset sekä kielikohtaiset rakennedatat. Google käsittelee jokaista kieltä erillisenä sivuna kyseiselle alueelle, mikä tarkoittaa, että ravintolaasi omalla kielellään etsivät turistit löytävät sinut todennäköisemmin.",
      },
      {
        q: "Mitä jos en halua kaikkia 35 kieltä — vain päämarkkinani?",
        a: "Valitse, mitkä kielet ovat aktiivisia. Jos olet rantaravintola Kreikassa, joka palvelee enimmäkseen brittiläisiä, saksalaisia ja italialaisia turisteja, ota käyttöön vain englanti, saksa ja italia — loput eivät näy kielivalitsimessa tai automaattitunnistuksessa. Voit aina ottaa lisää käyttöön myöhemmin, kun turistirakenteesi muuttuu.",
      },
    ],
  },

  finalCta: {
    heading: "Jokaisen turistin puhelimen kieli.",
    headingAccent: "Jo tuettu.",
    sub: "Tarjoa monikielinen ruokalista 35 kielellä, mukaan lukien RTL arabia ja persia. 14 päivän ilmainen kokeilu, ei luottokorttia, ei kielikohtaisia maksuja.",
  },
};
