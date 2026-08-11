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
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Ravintolat","Kahvilat","Baarit","Pizzeriat"],
    title: "Digitaalinen ravintola",
    titleAccent: "5 minuutissa",
    sub: "Digitaalinen ruokalista, keittiönäyttö ja ajanvaraus 24/7 — kaikki mitä ravintolasi tarvitsee, 5 minuutissa.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Ravintolat" },
      { icon: "cafe", label: "Kahvilat" },
      { icon: "bar", label: "Baarit" },
      { icon: "pizza", label: "Pizzeriat" },
    ],
    title: "Kaikki mitä",
    titleAccent: "ravintolasi tarvitsee!",
    sub: "Määritä prosessit 10 minuutissa: julkaise verkkomenu, tehosta keittiön työtä ja pidä pöytien varaustilanne hallinnassa.",
    primaryLabel: "Aloita ilmaiseksi",
    demoLabel: "Katso demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tabletti keittiönäytöllä: tilaukset pöydittäin sarakkeissa tiloineen" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tabletti varauskalenterilla: kuukausinäkymä ja vahvistusta odottavat varaukset" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Puhelin, jossa ravintolan verkkosivuston etusivu: kuva, varaukset ja verkkomenu" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Puhelin, jossa annossivu: kuva, hinta ja allergeenimerkinnät" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Käytössä 10 minuutissa", sub: "Ei kalliita laitteita eikä pitkää käyttöönottoa" },
    { Icon: MessagesSquare, title: "Nopea tuki", sub: "Vastaamme chatissa muutamassa tunnissa" },
    { Icon: Globe, title: "{count} ravintolan valinta", sub: "Meihin luottavat ravintolat ja kahvilat yli 15 maassa" },
    { Icon: Palette, title: "100 % sinun brändisi", sub: "Sovitamme ulkoasun ja käyttöliittymän ravintolasi tyyliin" },
  ],

  menu: {
    heading: "Verkkosivusto ja digitaalinen menu",
    sub: {
      link: "Enemmän kuin QR-menu!",
      rest: " Saat täysimittaisen sivuston, jossa on oma ilme, yhteystiedot ja pöytävaraukset.",
    },
    moreLabel: "Lue lisää",
    mockupAlt: "Kaksi puhelinta: ravintolan verkkosivuston etusivu ja annossivu",
    bullets: [
      { Icon: Languages, title: "Automaattinen käännös 35 kielelle", sub: "Palvele ulkomaisia vieraita ilman kielimuuria — automaattinen käännös hoitaa kaiken" },
      { Icon: ClipboardList, title: "Tilaukset suoraan pöydästä", sub: "Kevennä palvelua: vastaanota tilaukset pöydistä nopeasti ja ilman tarjoilijaa" },
      { Icon: WheatOff, title: "Allergeenit ja ruokavaliot", sub: "Merkitse allergeenit ja mieltymykset (vegaaninen, tulinen), jotta valinta on helppoa ja turvallista" },
    ],
  },

  reservations: {
    heading: "Pöytävaraukset",
    sub: {
      link: "Älykäs pöytävaraus!",
      rest: " Automaattinen varausjärjestelmä, joka seuraa itse vapaita pöytiä ja aikataulujasi.",
    },
    moreLabel: "Lue lisää",
    mockupAlt: "Tabletti varauskalenterilla: pöydät päivittäin ja aikaväleittäin",
    bullets: [
      { Icon: CalendarCheck, title: "Selkeä varauskartta", sub: "Havainnollinen ruudukko päivittäin ja pöydittäin — vapaat paikat näkyvät heti" },
      { Icon: SlidersHorizontal, title: "Joustavat asetukset", sub: "Määritä aukioloajat, aikavälien pituus ja pöytien kuvat sekä kerää vieraiden toiveet" },
      { Icon: Users, title: "Vierasvirran hallinta", sub: "Valitse sopiva varausten käsittelytapa ja pidä vierasvirta täysin hallinnassa" },
    ],
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
