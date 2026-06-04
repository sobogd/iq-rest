import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Ravintolat","Kahvilat","Baarit","Pizzeriat"],
    title: "Ravintolasi,",
    titleAccent: "täysin digitaalinen 5 minuutissa.",
    sub: "Tyylikäs digitaalinen menu, keittiönäyttö ja varaukset 24/7 — täydellinen alusta nykyaikaiselle ravintolalle.",
  },

  heroMicrocopy: "{count} ravintolaa · 14 päivää ilmaiseksi · Ei korttia",
  seeIncluded: "Katso mitä sisältyy",

  trust: [
    { kind: "num", value: 35, label: "Kieltä" },
    { kind: "text", value: "24/7", label: "Varaukset" },
    { kind: "num", value: 5, suffix: " min", label: "Käyttöön" },
    { kind: "count", label: "Ravintolaa" },
  ],

  bundle: {
    heading: "Kaikki, millä ravintolasi pyörii.",
    headingAccent: "Yhdessä sovelluksessa.",
    sub: "Menu, keittiö ja varaukset yhdessä paikassa — moderni, nopea ja tehty siihen, miten ravintolat oikeasti toimivat. Ei lisäosia, ei maksua per ominaisuus.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitaalinen menu", title: "Menu joka myy.", bullets: ["35 tekoälykieltä","Premium-design","Hinnat heti ajan tasalla"], image: "/landing/feature-design.webp", imageAlt: "Kaksi puhelinta kahvilan pöydällä: digitaalisen menun aloitusnäyttö ja yhteystietosivu kartalla" },
    { Icon: ChefHat, tag: "Keittiönäyttö", title: "Kokkaa nopeammin, älä missaa mitään.", bullets: ["Suoraan näytölle","Merkinnät ja allergeenit","Tabletti tai puhelin"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tabletti tiskillä näyttää keittiönäytön tilauksineen pöydittäin" },
    { Icon: CalendarCheck, tag: "Varaukset", title: "Varaukset autopilotilla.", bullets: ["Itsevaraus","Automaattinen vahvistus","Kalenteri pöydittäin"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Kaksi tablettia näyttää varauskalenterin: päivänäkymä pöydittäin ja kuukausinäkymä" },
    { Icon: Receipt, tag: "Tilaus pöydässä", title: "Tilaukset suoraan keittiöön.", bullets: ["Asiakas tai tarjoilija","Suoraan keittiöön","Päälle/pois milloin vain"], image: "/landing/feature-orders-map.webp", imageAlt: "Tabletti tilausnäytöllä: tilauslista ja pohjakartta värikoodatuilla pöydillä." },
  ],

  seeDetails: "Katso lisää",

  extras: {
    heading: "Ja kaikki muu sisältyy.",
    items: [
      { Icon: ScanLine, label: "Tekoäly digitoi paperimenun 60 sekunnissa" },
      { Icon: QrCode, label: "Oma QR-koodi jokaiselle pöydälle" },
      { Icon: Smartphone, label: "Ei sovellusta asiakkaille — aukeaa selaimessa" },
      { Icon: Globe, label: "Oma verkkotunnus SSL:llä" },
      { Icon: BarChart3, label: "Myyntianalytiikka: tuotto, suosituimmat annokset, tunnit" },
      { Icon: Palette, label: "Allergeeni- ja ruokavaliotagit suodatukseen" },
    ],
  },

  midCta: {
    heading: "Yksi sovellus viiden sijaan.",
    sub: "Ei tarvitse jongleerata erillisillä työkaluilla menulle, keittiölle ja varauksille — kaikki yhdessä paikassa, millä tahansa puhelimella tai tabletilla, ilman asennuksia.",
  },

  how: {
    heading: "Valmiina 5 minuutissa",
    sub: "Neljä vaihetta. Ei asennuksia, ei teknistä määritystä, ei korttia.",
    steps: [
      { n: "1", t: "Tyyppi ja nimi", d: "Paikan tyyppi ja nimi — siinä koko rekisteröinti." },
      { n: "2", t: "Kirjaudu", d: "Sähköposti tai Google. Ei korttia." },
      { n: "3", t: "Lisää menu", d: "Kirjoita se tai anna tekoälyn skannata paperimenu." },
      { n: "4", t: "Olet livenä", d: "Menu, keittiö ja varaukset — valmiina." },
    ],
  },
};
