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
    titleAccent: "digitaalinen 5 minuutissa.",
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

  platform: {
    hardwareTitle: "Käytä omia laitteitasi",
    hardwareSub: "Emme koskaan pakota ostamaan laitteita meiltä. Käytä puhelimia, tabletteja ja tietokoneita, joita sinulla jo on.",
    anywhereTitle: "Toimii missä tahansa",
    anywhereSub: "Puhelin, tabletti, kannettava, PC. Android, iOS, Windows, Mac, Linux. Toimii kaikissa nykyaikaisissa selaimissa, ilman asennusta.",
  },

  activities: {
    heading: "Yksi järjestelmä,",
    headingAccent: "koko ravintolasi.",
    sub: "Nopeampi palvelu, rauhallisempi keittiö, pienemmät kustannukset ja vieraskokemus, joka jää mieleen — kaikki yhdellä alustalla.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Pöydässä — asiakkaat",
        bullets: [
          "QR-menu 35 kielellä",
          "Tilaa odottamatta tarjoilijaa",
          "Kutsu tarjoilija tai pyydä lasku",
          "Varaa pöytä ympäri vuorokauden",
          "Oma QR-koodi jokaiselle pöydälle",
          "Ei sovellusta asiakkaille — aukeaa selaimessa",
          "Allergeeni- ja ruokavaliotagit suodatukseen",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Keittiössä",
        bullets: [
          "Tilaukset näkyvät heti ruudulla",
          "Sarakkeet valmistuu / valmis / tarjoiltu",
          "Allergeenit ja muistiinpanot korostettu",
          "Tabletti tai puhelin — ei paperilappuja",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Hallinta",
        bullets: [
          "Menu- ja hintamuutokset heti käyttöön",
          "Tekoälykäännös yhdellä klikkauksella",
          "Myyntianalytiikka ja raportit",
          "Useita ravintoloita yhdellä tilillä",
          "Tekoäly digitoi paperimenun 60 sekunnissa",
          "Oma verkkotunnus SSL:llä",
        ],
      },
    ],
  },
};
