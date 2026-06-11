import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fi",
  slug: "keittion-naytto",
  trackPrefix: "l_fi_kds",

  meta: {
    title: "Keittiön näyttö (KDS) ravintoloille | IQ Rest",
    description:
      "Keittiön näyttö (KDS) ravintoloille: tilaukset salista ja QR-ruokalistasta saapuvat välittömästi kokin näyttöön. Sarakkeet pöydän mukaan, tilat Odottaa / Valmistetaan / Valmis / Tarjoiltu, suodattimet vyöhykkeen mukaan. Toimii tabletilla tai puhelimella.",
    canonical: "https://iq-rest.com/fi/keittion-naytto",
    ogLocale: "fi_FI",
    ogTitle: "Keittiön näyttö (KDS) — Tilaukset kokin näytöllä",
    ogDescription:
      "Tilaukset salista kokin näytöllä. Sarakkeet pöydän mukaan, tilat ja ajastin. Yksi näpäytys vaihtaa tilan.",
    brandLine: "IQ Rest — Keittiön näyttö",
  },

  hero: {
    headline: "Keittiön näyttö: tilaukset suoraan kokin näyttöön.",
    cta: "Ota keittiönäyttö käyttöön",
    sub: "Paperilappuja ei enää tarvita. Tilaukset salista tai QR-ruokalistasta saapuvat välittömästi keittiön näyttöön — muistiinpanoilla, allergeeneilla ja ajastimella. Yksi näpäytys vaihtaa tilan. Toimii tabletilla läpiantopisteellä tai älypuhelimella kokin taskussa.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Ammattikeittiö, jossa tabletti messinkitelineellä näyttää keittiön näyttöä aktiivisilla tilauksilla",
  },

  scan: {
    heading: "Aseta keittiön näyttö",
    headingAccent: "5 minuutissa.",
    sub: "Lataa paperinen ruokalista tai PDF — AI tunnistaa ruoat, kategoriat ja allergeenit. Liitä tabletti keittiöön ja aloita tilausten vastaanotto.",
    cta: "Skannaa ruokalista",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Ohjaimet ja suodattimet",
      heading: "Useita näyttöjä vyöhykkeen mukaan: keittiö ja baari.",
      body: "Sijoita erilliset tabletit kuumalle linjalle, baariin tai konditoriaan — jokainen näyttö näyttää vain siihen kuuluvat ruoat. Suodattimet tilan mukaan (Odottaa / Valmistetaan / Valmis / Tarjoiltu) ja kategorian mukaan poistavat hälyä: kokki näkee vain sen, mikä on hänen pisteelleen olennaista.",
      bullets: [
        "Useita KDS-näyttöjä kategoriasuodattimilla.",
        "Tilasuodatin: näytä vain Valmistetaan ja Valmis.",
        "Jokainen vyöhyke näkee vain oman tilausvirtansa.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tabletti messinkitelineellä keittiön läpiantopisteellä — KDS tilasuodattimella" },
    },
    {
      icon: Timer,
      eyebrow: "Kortit ja ajastin",
      heading: "Yksi näpäytys vaihtaa tilan. Muistiinpanot ja allergeenit korostettu väreillä.",
      body: "Ruoan kortti näyttää valitut vaihtoehdot (ei sipulia, kypsä), vieraan muistiinpanon, allergeenit ja ajastimen tilauksen tekemisestä lähtien. Näpäytä korttia ja tila siirtyy seuraavaan: Odottaa → Valmistetaan → Valmis → Tarjoiltu. Lista lajitellaan automaattisesti prioriteetin mukaan.",
      bullets: [
        "Näpäytys kortissa — välitön tilan muutos.",
        "Vaihtoehdot, muistiinpanot ja allergeenit korostettu väreillä.",
        "Prioriteetin mukaan lajittelu: pidempään odottavat tuotteet nousevat ylös.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tabletti messinkitelineellä baaritiskillä — KDS tilauskorteilla pöydän mukaan" },
    },
  ],

  faq: {
    sub: "Mitä ravintoloitsijat kysyvät keittiön näytöstä IQ Restissä. Etkö löydä omaa kysymystäsi? Kirjoita meille WhatsAppissa.",
    items: [
      { q: "Mitä ruokien tiloja keittiössä on?", a: "Neljä tilaa eri korttiväreillä: Odottaa (harmaa) — tilaus on hyväksytty ja odottaa; Valmistetaan (oranssi) — ruokaa valmistetaan; Valmis (sininen) — valmis tarjoiltavaksi; Tarjoiltu (vihreä) — toimitettu vieraalle. Kortin näpäyttäminen siirtää sen seuraavaan tilaan, ilman valikoita tai vahvistuksia." },
      { q: "Voinko käyttää useita KDS-näyttöjä eri vyöhykkeillä?", a: "Kyllä. Yksi tabletti kuumalla linjalla, toinen baarissa, kolmas konditoriassa — jokainen omalla kategoriasuodattimellaan. Kaikki näytöt ovat synkronoituja reaaliajassa: yhdellä näytöllä muutettu tila päivittyy kaikkialla." },
      { q: "Mitä laitteistoa tarvitsen KDS:n ajamiseen?", a: "KDS on verkkosovellus, joka toimii missä tahansa modernissa selaimessa. Iso keittiö — tabletti messinkitelineellä läpiantopisteellä tai TV seinällä. Pieni paikka — kokin älypuhelin. Ei erityislaitteistoa, ei asennusta: avaa linkki ja kirjaudu tilille." },
      { q: "Mistä tilaukset tulevat keittiön näytölle?", a: "Kaikista lähteistä: vieras, joka tilasi QR-ruokalistalla pöydässä; tarjoilija, joka otti tilauksen puhelimesta; vieras, joka teki tilauksen verkkosivulta. Kaikki saapuvat KDS:ään lähdemerkillä ja pöytänumerolla. Ei käsin siirtoja POS-järjestelmästä." },
      { q: "Mitä tilauskortilla näytetään?", a: "Ruoan nimi, valitut muutokset (ei sipulia, kypsä, lisää kastike), vieraan kommentti, korostetut allergeenit, tila (Odottaa / Valmistetaan / Valmis / Tarjoiltu) ja ajastin, joka näyttää kuinka kauan ruoka on odottanut. Kortit lajitellaan prioriteetin mukaan: mitä pidempi odotus, sitä korkeammalla sarakkeessa." },
      { q: "Voinko suodattaa kortit näytöllä?", a: "Kyllä. Kaksi suodatinta: tilan mukaan (esim. näytä vain Odottaa ja Valmistetaan, piilota Tarjoiltu) ja kategorian mukaan (vain juomat baarissa, vain pääruoat keittiössä). Asetukset tallennetaan laitekohtaisesti — jokainen vyöhyke säilyttää oman joukkonsa." },
    ],
  },
};
