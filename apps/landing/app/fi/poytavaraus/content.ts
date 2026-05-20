import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "fi",
  slug: "poytavaraus",
  trackPrefix: "l_fi_bookings",

  meta: {
    title: "Pöytävaraus 24/7 ravintoloille | IQ Rest",
    description:
      "Pöytävaraus 24/7 ravintoloille: vieraat varaavat itse QR-ruokalistan tai verkkosivun kautta. Pöytäkalenteri, automaattiset vahvistukset ja muistutukset. Ei yhtään menetettyä vierasta. 14 päivää ilmaiseksi.",
    canonical: "https://iq-rest.com/fi/poytavaraus",
    ogLocale: "fi_FI",
    ogTitle: "Pöytävaraus 24/7 — vieraat varaavat itse",
    ogDescription:
      "Vieraat varaavat pöydät QR-ruokalistan tai verkkosivun kautta. Kalenteri, automaattiset vahvistukset, muistutukset. Ei yhtään menetettyä vierasta.",
    brandLine: "IQ Rest — Pöytävaraus ravintoloille",
  },

  hero: {
    headline: "Pöytävaraus 24/7 — vieraat varaavat itse.",
    sub: "Vieraat varaavat pöydät QR-ruokalistan tai suoran linkin kautta. Pöytäkalenteri, automaattiset vahvistukset ja muistutukset. Ei yhtään menetettyä vierasta eikä ruuhka-aikojen puheluita.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hovimestari hallitsee varauksia tabletista ravintolan sisäänkäynnillä",
  },

  scan: {
    heading: "Käynnistä pöytävaraus",
    headingAccent: "5 minuutissa.",
    sub: "Yhdistä kalenteri, lisää pöydät kuvilla ja kapasiteetilla — vieraat aloittavat varaamisen samana päivänä.",
    cta: "Aktivoi varaus",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Varauslomake",
      heading: "Vieraat varaavat itse — päivän, ajan ja henkilömäärän mukaan.",
      body: "Vieras avaa QR-ruokalistan tai suoran linkin, valitsee päivän, ajan ja henkilömäärän — ja näkee välittömästi vapaat pöydät, jokaisen kuvalla, kuvauksella (terassi, ikkunan vieressä, sohva baarin vieressä) ja kapasiteetilla. Vahvistus lähetetään automaattisesti sähköpostilla ja WhatsAppilla.",
      bullets: [
        "Pöydän valinta kuvan, kuvauksen ja kapasiteetin mukaan.",
        "Automaattinen vahvistus ja muistutus tunti ennen vierailua.",
        "Vähimmäiskentät lomakkeessa: nimi, puhelin, henkilömäärä.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Vieras varaa ravintolapöydän puhelimesta: päivä, aika, henkilömäärä ja pöydän valitsin" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Varauskalenteri",
      heading: "Kalenteri päivän ja pöydän mukaan — kaikki yhdellä silmäyksellä.",
      body: "Hallintapaneeli näyttää varauskalenterin jaoteltuna pöydän, päivän, viikon ja kuukauden mukaan. Vapaat slotit, varatut pöydät, vahvistetut ja vahvistamattomat varaukset yhdellä näytöllä. Toimii tabletilla salissa ja läppärillä toimistolla.",
      bullets: [
        "Päivä-, viikko- ja kuukausinäkymät.",
        "Jaottelu pöydän mukaan: kuka, milloin, montako vierasta.",
        "Siirrä, peruuta tai vahvista varaus yhdellä näpäytyksellä puhelimesta.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Varauskalenteri IQ Restin hallintapaneelissa kahdella tabletilla: päivittäinen Gantt pöytien mukaan ja kuukausinäkymä" },
    },
  ],

  faq: {
    sub: "Mitä ravintoloitsijat kysyvät pöytävarauksesta IQ Restissä. Etkö löydä omaa kysymystäsi? Kirjoita meille WhatsAppissa.",
    items: [
      { q: "Voinko valita, minä päivinä ja tunteina varaus on käytettävissä?", a: "Kyllä. Hallintapaneeli mahdollistaa aukioloaikojen ja saatavilla olevien viikonpäivien asettamisen — järjestelmä ei näytä vieraille epäkäytettäviä slottia. Voit sulkea tietyn päivän (yritystapahtuma, yksityinen varaus) tai sulkea koko kalenterin väliaikaisesti." },
      { q: "Voinko ladata kuvan jokaiselle pöydälle?", a: "Kyllä. Jokaisella pöydällä voi olla kuva, kuvaus (terassi, ikkunan vieressä, sohva baarin vieressä) ja kapasiteetti. Vieras näkee tarkalleen pöydän, jonka hän varaa, ja tekee tietoisen valinnan — tämä vähentää täyttymättömiä odotuksia." },
      { q: "Voinko poistaa varauksen käytöstä tiettyinä päivinä?", a: "Kyllä. Kalenteri mahdollistaa tiettyjen päivien (juhlapyhät, yksityiset tapahtumat, remontti) tai kokonaisten viikonpäivien sulkemisen. Näinä päivinä vieraat näkevät viestin ”varaus tilapäisesti ei käytettävissä”." },
      { q: "Voinko mukauttaa, mitä kenttiä vieraalta kerätään?", a: "Kyllä. Oletusjoukko: nimi, puhelin, sähköposti, henkilömäärä. Voit lisätä mukautettuja kenttiä (tilaisuus, allergiat, erityispyynnöt) tai poistaa tarpeettomat pitääksesi lomakkeen mahdollisimman lyhyenä." },
      { q: "Voinko rajoittaa vieraiden määrää pöytää kohti?", a: "Kyllä. Jokaisella pöydällä on ”kapasiteetti”-asetus — järjestelmä ei salli 2-paikkaisen pöydän varaamista 6 hengelle. Suuremmilla pöydillä voit asettaa minimin, jotta pienet ryhmät eivät vie ”kahdeksan pöytää” suuremmilta seurueilta." },
      { q: "Kuinka vaikeaa varauksen asetus on?", a: "Se vie hyvin vähän aikaa. Kolme vaihetta: (1) lisää pöydät nimillä, kuvilla ja kapasiteetilla, (2) aktivoi varaustila asetuksissa, (3) jaa linkki tai QR-koodi vieraiden kanssa. Täysi käyttöönotto 5–10 minuutissa." },
      { q: "Voinko käyttää varausjärjestelmää omalla verkkotunnuksellani?", a: "Kyllä. Tuemme omaa verkkotunnusta SSL-sertifikaatilla: vieraat varaavat ravintolasi osoitteessa (esim. varaus.ravintolasi.fi). Autamme DNS:n asetuksessa; prosessi kestää 5–10 minuuttia." },
      { q: "Voinko konfiguroida automaattisen tai manuaalisen vahvistuksen?", a: "Kyllä, tila valitaan asetuksissa. Automaattisella vahvistuksella vieras saa vahvistuksen heti lomakkeen lähetyksen jälkeen ja varaus katsotaan hyväksytyksi. Manuaalisella vahvistuksella pyyntö saapuu hallintapaneeliin tilassa ”odottaa vahvistusta” — johtaja tarkistaa sen ja vahvistaa tai hylkää. Manuaalinen tila on hyödyllinen rajoitetuilla pöytämäärillä tai tiukoilla vieraspolitiikoilla." },
      { q: "Otatteko provisiota varauksista?", a: "Emme. Pöytävaraus sisältyy täysin Pro-pakettiin — ei prosenttia vieraista, ei maksua slotia kohti, ei välityspalkkioita. Kiinteä kuukausimaksu ja rajoittamaton määrä varauksia." },
    ],
  },
};
