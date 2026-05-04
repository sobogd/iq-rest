import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "QR-ruokalistan verkkotilaukset — nollakomissio ravintolatilauksiin",
    description:
      "Ota suoria tilauksia QR-ruokalistastasi. Nollakomissio, ei Wolt- tai Uber Eats -leikkausta. Vieraat skannaavat, tilaavat, maksavat — suoraan sinulle. 14 päivän ilmainen kokeilu.",
    canonical: "https://iq-rest.com/fi/online-orders",
    ogLocale: "fi_FI",
    ogTitle: "Verkkotilauksia ilman komissiota — suorat tilaukset QR-ruokalistastasi",
    ogDescription:
      "Korvaa 30 % alustakomissiot suorilla tilauksilla. Vieraat skannaavat QR-koodin, tilaavat, maksavat — joka sentti tulee sinulle. 14 päivän ilmainen kokeilu, ei korttia.",
  },

  hero: {
    title: "Suorat tilaukset. Nollakomissio. Suoraan keittiöön.",
    subtitle:
      "Lopeta 30 prosentin maksaminen Uber Eatsille, Glovolle ja Woltille. IQ Restin avulla vieraasi skannaavat QR-koodin, kasaavat tilauksensa puhelimellaan, ja tilauslappu lentää keittiöösi — joka sentti jää sinulle.",
    trustLine: "4,9 · yli 500 ravintolaa yli 30 maassa",
  },

  seo: {
    description:
      "Muuta QR-ruokalistasi täysiveriseksi verkkotilausjärjestelmäksi luopumatta 30 prosentista alustoille. Vieraat skannaavat QR-koodin, selaavat ruokalistaa omalla kielellään, kasaavat ostoskorin, lähettävät tilauksen — ja sinä saat sen pöytänumerolla välittömästi. Ei sovelluslatauksia, ei komissioita, ei kolmatta osapuolta sinun ja vieraasi välissä.",
    fullDescription:
      "Useimmat ravintolat menettävät rahaa jo ennen kuin ruoka lähtee keittiöstä — Uber Eats ottaa 30 %, Glovo ottaa 30 %, Wolt ottaa 30 %. Verkkotilaukset IQ Restin kautta toimivat täysin eri tavalla. Tilaus menee suoraan vieraan puhelimesta hallintapaneeliisi, ja koko marginaali jää sinulle.\n\nTilaamiskokemus on rakennettu juuri ravintolakäyttöön: vieraat valitsevat pöydän, selaavat ruokalistaa, lisäävät tuotteita ostoskoriin, jättävät kommentin keittiölle ja lähettävät tilauksen. Näet uudet tilaukset reaaliajassa puhelimellasi tai keittiön näytöllä — pöytänumero, ruoat, lisukkeet ja muistiinpanot mukana. Merkitse ruoat valmiiksi, pöytä näkee tilan — ja säästät tarjoilijoilta kymmeniä juoksuja vuoroa kohden.\n\nToimii myös take-awayhin ja noutoihin: vieraat skannaavat oven QR-tarran, tekevät tilauksen ja maksavat — sinun ei tarvitse erillistä tilaussovellusta, erillistä sivustoa tai Stripe-integraatioprojektia.",
    benefitsHeading: "Miksi suora tilaaminen IQ Restin kautta voittaa alustasovellukset",
    benefits: [
      "Nollakomissio jokaisesta tilauksesta — pidät 100 % liikevaihdosta",
      "Tilaukset lentävät hallintapaneeliisi pöytänumeron kanssa reaaliajassa",
      "Ei sovellusta vieraille — he skannaavat QR-koodin ja tilaavat selaimessa",
      "Lisukkeet, kommentit, ruokavaliomerkinnät — kaikki taltioituvat selkeästi",
      "Toimii paikan päällä syömiseen, take-awayhin ja noutoon — yksi ruokalista, kolme virtaa",
      "Sisäänrakennetut lisämyyntiehdotukset kasvattavat keskiostoksen arvoa",
    ],
  },

  pricing: {
    heading: "Yksi paketti.",
    headingAccent: "Nollakomissio.",
    sub: "Suora tilaaminen, QR-ruokalista, ravintolasivusto ja varaukset — kaikki mukana. Ei tilauskohtaisia maksuja, ei Stripe-integraatioprojektia.",
  },

  faq: {
    sub: "Kaikki, mitä ravintoloitsijat kysyvät verkkotilauksista. Etkö löydä omaasi? Pingaa meitä WhatsAppissa — oikeat ihmiset vastaavat.",
    items: [
      {
        q: "Otatteko komissiota tilauksista?",
        a: "Nolla. Jokainen tilaus QR-ruokalistastasi menee suoraan sinulle — ei meidän osuutta, ei Glovon tai Uber Eatsin maksuja. Yksi kiinteä kuukausimaksu, siinä kaikki. Laskelma on yksinkertainen: jos otat 5 000 €/kk alustatilauksina, häviät 1 500 €. Vaihda suoraan tilaamiseen ja se 1 500 € jää taskuusi.",
      },
      {
        q: "Miten vieraat tekevät tilauksen — tarvitsevatko he sovelluksen?",
        a: "Eivät tarvitse sovellusta. Vieraat skannaavat QR-koodin puhelimensa kameralla, ruokalista avautuu selaimessa, he valitsevat pöydän, selaavat, lisäävät ostoskoriin ja lähettävät. Koko prosessi on kaksi napautusta skannauksen jälkeen. Ei App Store -hakuja, ei rekisteröitymistä, ei kitkaa.",
      },
      {
        q: "Miten vastaanotan tilaukset keittiössä?",
        a: "Tilaukset ilmestyvät välittömästi hallintapaneeliisi pöytänumeron, ruokien, lisukkeiden ja muistiinpanojen kanssa. Katso niitä puhelimella, tabletilla pass-tiskillä tai keittiön näytöllä. Merkitse tuotteet valmiiksi, ja pöytä näkee tilan — vähemmän 'tuleeko mun ruoka?' -kyselyitä, nopeammat kierrot.",
      },
      {
        q: "Voivatko vieraat maksaa QR-ruokalistan kautta vai vain pöydässä?",
        a: "Molemmat. He voivat lähettää tilauksen ja maksaa käteisellä tai kortilla pöydässä klassiseen tapaan, tai maksaa verkossa Stripen kautta suoraan ruokalistalla. Sinä päätät, mikä on käytössä. Verkkomaksun turvaa Stripe — IQ Rest ei koskaan pidä rahoja, ne menevät suoraan Stripe-tilillesi.",
      },
      {
        q: "Toimiiko tämä take-awayhin ja noutoon, ei vain paikan päällä syömiseen?",
        a: "Kyllä. Liimaa QR-tarra sisäänkäynnillesi take-awayta varten tai jaa ruokalistalinkkisi Instagramissa ja WhatsAppissa. Vieraat valitsevat 'nouto', tilaavat, maksavat — sinä valmistat, he hakevat. Sama järjestelmä, kolme erilaista tilausvirtaa: paikan päällä, take-away, nouto.",
      },
    ],
  },

  finalCta: {
    heading: "Lopeta alustasovellusten ruokkiminen.",
    headingAccent: "Pidä 100 %.",
    sub: "Korvaa 30 % komissiosi kiinteällä kuukausimaksulla. 14 päivän ilmainen kokeilu. Ei luottokorttia. Peru milloin tahansa.",
  },
};
