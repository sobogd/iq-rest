import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "et",
  slug: "laudade-broneerimine",
  trackPrefix: "l_et_bookings",

  meta: {
    title: "Laudade broneerimine 24/7 restoranidele | IQ Rest",
    description:
      "Laudade broneerimine 24/7 restoranidele: külalised broneerivad ise QR-menüü või veebilehe kaudu. Lauakalender, automaatsed kinnitused ja meeldetuletused. Mitte ühtegi kaotsi läinud külalist. 14 päeva tasuta.",
    canonical: "https://iq-rest.com/et/laudade-broneerimine",
    ogLocale: "et_EE",
    ogTitle: "Laudade broneerimine 24/7 — külalised broneerivad ise",
    ogDescription:
      "Külalised broneerivad lauad QR-menüü või veebilehe kaudu. Kalender, automaatsed kinnitused, meeldetuletused. Mitte ühtegi kaotsi läinud külalist.",
    brandLine: "IQ Rest — Laudade broneerimine restoranidele",
  },

  hero: {
    headline: "Laudade broneerimine 24/7 — külalised broneerivad ise.",
    cta: "Seadista lauabroneeringud",
    sub: "Külalised broneerivad lauad QR-menüü või otselingi kaudu. Lauakalender, automaatsed kinnitused ja meeldetuletused. Mitte ühtegi kaotsi läinud külalist ja ei mingeid kõnesid tipptundidel.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Perenaine haldab broneeringuid tahvelarvutist restorani sissepääsu juures",
  },

  scan: {
    heading: "Käivita laudade broneerimine",
    headingAccent: "5 minutiga.",
    sub: "Ühenda kalender, lisa lauad fotode ja mahuga — külalised hakkavad broneerima samal päeval.",
    cta: "Aktiveeri broneerimine",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Broneerimise vorm",
      heading: "Külalised broneerivad ise — kuupäeva, kellaaja ja inimeste arvu järgi.",
      body: "Külaline avab QR-menüü või otselingi, valib kuupäeva, kellaaja ja inimeste arvu — ning näeb kohe vabu laudu, igaüks fotoga, kirjeldusega (terrass, akna juures, diivan baari kõrval) ja mahuga. Kinnitus saadetakse automaatselt e-posti ja WhatsAppi.",
      bullets: [
        "Laua valik foto, kirjelduse ja mahu järgi.",
        "Automaatne kinnitus ja meeldetuletus üks tund enne külastust.",
        "Minimaalsed väljad vormis: nimi, telefon, inimeste arv.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Külaline broneerib restoranilaua telefonist: kuupäev, kellaaeg, inimeste arv ja laua valija" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Broneeringute kalender",
      heading: "Kalender päeva ja laua järgi — kõik ühe pilguga.",
      body: "Halduspaneel kuvab broneeringute kalendri, mis on jagatud laua, päeva, nädala ja kuu järgi. Vabad ajavahemikud, hõivatud lauad, kinnitatud ja kinnitamata broneeringud ühel ekraanil. Toimib tahvelarvutil saalis ja sülearvutil kontoris.",
      bullets: [
        "Päeva, nädala ja kuu vaated.",
        "Jaotus laua järgi: kes, millal, kui palju külalisi.",
        "Liiguta, tühista või kinnita broneering ühe puudutusega telefonist.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Broneeringute kalender IQ Resti halduspaneelis kahel tahvelarvutil: päevane Gantt laudade järgi ja kuu vaade" },
    },
  ],

  faq: {
    sub: "Mida restoranipidajad küsivad laudade broneerimise kohta IQ Restis. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
    items: [
      { q: "Kas ma saan valida, millistel päevadel ja kellaaegadel on broneerimine saadaval?", a: "Jah. Halduspaneel võimaldab määrata lahtiolekuajad ja saadaolevad nädalapäevad — süsteem ei kuva külalistele saadaolemataid ajavahemikke. Saad sulgeda konkreetse kuupäeva (ettevõtte üritus, privaatbroneering) või ajutiselt välja lülitada kogu kalendri." },
      { q: "Kas ma saan iga laua jaoks foto üles laadida?", a: "Jah. Igal laual võib olla foto, kirjeldus (terrass, akna juures, diivan baari kõrval) ja maht. Külaline näeb täpselt seda lauda, mida ta broneerib, ja teeb teadliku valiku — see vähendab ootuste mittetäitmist." },
      { q: "Kas ma saan broneeringu kindlate kuupäevadel välja lülitada?", a: "Jah. Kalender võimaldab sulgeda konkreetseid kuupäevi (riigipühad, eraüritused, remont) või terveid nädalapäevi. Nendel kuupäevadel näevad külalised teadet „broneerimine ajutiselt pole saadaval“." },
      { q: "Kas ma saan kohandada, milliseid välju külaliselt kogutakse?", a: "Jah. Vaikekomplekt: nimi, telefon, e-post, inimeste arv. Saad lisada kohandatud välju (sündmus, allergiad, eritaotlused) või eemaldada mittevajalikke, et hoida vorm võimalikult lühikesena." },
      { q: "Kas ma saan piirata külaliste arvu laua kohta?", a: "Jah. Igal laual on „mahu“ säte — süsteem ei luba 2-kohalise laua broneerimist 6 inimese jaoks. Suurematel laudadel saad määrata miinimumi, et väiksed grupid ei võtaks „kaheksakohalist lauda“ suurematelt kompaniidelt." },
      { q: "Kui keeruline on broneerimise seadistus?", a: "See võtab väga vähe aega. Kolm sammu: (1) lisa lauad nimede, fotode ja mahuga, (2) lülita broneerimise režiim seadetes sisse, (3) jaga link või QR-kood külalistega. Täielik käivitamine 5-10 minutiga." },
      { q: "Kas ma saan broneerimissüsteemi kasutada oma domeenis?", a: "Jah. Toetame kohandatud domeeni SSL-sertifikaadiga: külalised broneerivad sinu restorani aadressil (nt booking.sinurestoran.ee). Aitame DNS-i seadistamisel; protsess võtab 5-10 minutit." },
      { q: "Kas ma saan konfigureerida automaatse või käsitsi kinnituse?", a: "Jah, režiim määratakse seadetes. Automaatse kinnitusega saab külaline kinnituse kohe pärast vormi esitamist ja broneering loetakse vastuvõetuks. Käsitsi kinnitusega jõuab taotlus halduspaneeli olekuga „ootab kinnitust“ — haldaja vaatab selle üle ja kinnitab või lükkab tagasi. Käsitsi režiim on kasulik piiratud laudade arvu või rangete külalistepoliitikate korral." },
      { q: "Kas võtate broneeringutelt komisjoni?", a: "Ei. Laudade broneerimine on täielikult Pro-plaanis sisaldas — ei mingit protsenti külalistelt, ei mingit tasu ajavahemiku kohta, ei mingeid agregaatorite komisjoni. Kindel kuutasu ja piiramatu arv broneeringuid." },
    ],
  },
};
