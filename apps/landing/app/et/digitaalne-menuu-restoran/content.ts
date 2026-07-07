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
  locale: "et",
  slug: "digitaalne-menuu-restoran",
  trackPrefix: "l_et_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Digitaalne menüü restoranidele | IQ Rest",
    description:
      "Digitaalne menüü restoranidele: veebipõhine menüü fotode, allergeenide, AI-tõlke ja hindade reaalajauuendustega. 14 päeva tasuta, ilma kaardita.",
    canonical: "https://iq-rest.com/et/digitaalne-menuu-restoran",
    ogLocale: "et_EE",
    ogTitle: "Digitaalne menüü restoranidele",
    ogDescription:
      "Sinu paberitkartmenüü veebiversioon — fotod, allergeenid, AI-tõlge, uuendused reaalajas.",
    brandLine: "IQ Rest — Digitaalne menüü restoranidele",
  },

  hero: {
    headline: "Digitaalne menüü,\nkus on kõik olemas",
    cta: "Loo digitaalne menüü",
    sub: "Fotod, allergeenid ja tõlge 35 keelde. Lisaks tellimused, WhatsApp ja lauabroneering — kõik ühes IQ Restis.",
  },

  scan: {
    heading: "On sul paberil menüü või PDF?",
    headingAccent: "AI digiteerib selle 60 sekundiga.",
    sub: "Lae üles foto või dokument — AI tuvastab kategooriad, road ja hinnad automaatselt.",
    cta: "Skanni menüü",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI-keelt",
      heading: "35 keelt igale külalisele",
      body: "Üks QR, 35 keelt. AI tõlgib kulinaarse kontekstiga, nii et iga roog kõlab loomulikult. Turistid tellivad kindlalt.",
      bullets: [
        "35 keelt sinu paketis",
        "Kulinaarne AI, mitte Google",
        "Keelevahetus ühe puudutusega",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Kaks külalist loevad sama digitaalset menüüd erinevates keeltes oma telefonides" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergeenid",
      heading: "Allergeenid ja dieedid igal rool",
      body: "Märgi gluteen, laktoos, pähklid, vegan ja gluteenivaba. Külalised filtreerivad menüüd oma dieedi järgi ja tellivad hõlpsalt.",
      bullets: [
        "14 allergeenikategooriat",
        "Vegan- ja gluteenivaba märgised",
        "Külalised filtreerivad dieedi järgi",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Külaline filtreerib menüüd allergeenide järgi telefonis, samal ajal kui omanik muudab allergeenide loendit tahvelarvutis" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Iga seade",
      heading: "Halda seda igast seadmest",
      body: "Halduspaneel töötab brauseris — muuda menüüd, hindu ja fotosid kõikjalt. Midagi pole vaja installida.",
      bullets: [
        "Töötab igas brauseris",
        "Telefon, tahvel või arvuti",
        "Midagi pole vaja installida",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Ei mingit vahendustasu",
      heading: "Null vahendustasu, ei lisatasusid",
      body: "Üks läbipaistev tellimus. Me ei võta osa sinu käibest ega peida tasusid — kõik jääb restoranile.",
      bullets: [
        "Null protsenti tellimustelt",
        "Ei peidetud lisatasusid",
        "Üks kindel hind",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Oma domeen",
      heading: "Menüü sinu oma domeenil",
      body: "Ühendame sinu domeeni SSL-iga — külalised näevad menüüd sinu restorani aadressil. Aitame DNS-iga 10 minutiga.",
      bullets: [
        "Sinu domeen SSL-iga",
        "menu.sinurestoran.ee",
        "Aitame DNS-i seadistada",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Sinu disain",
      heading: "Paindlik disain just sulle",
      body: "Mitu valmis paigutust ja stiili — vali kaas, värvid ja roogade esitlus, mis sobivad sinu restoraniga.",
      bullets: [
        "Mitu valmis paigutust",
        "Sinu kaas ja värvid",
        "Uus ilme mõne klikiga",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontaktid",
      heading: "Kontaktid ja sotsiaalmeedia menüüs",
      body: "Eraldi leht kaardi, telefoni ja linkidega Instagrami ja WhatsAppi — külalised leiavad sind ühe puudutusega.",
      bullets: [
        "Kaart, telefon ja aadress",
        "Instagram ja WhatsApp",
        "Võta ühendust ühe puudutusega",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsAppi tellimused",
      heading: "Võta tellimusi vastu WhatsAppis",
      body: "Külalised koostavad korvi ja saadavad tellimuse otse sinu WhatsAppi — ilma eraldi rakenduseta, tuttavas vestluses.",
      bullets: [
        "Tellimus sinu WhatsAppi",
        "Ilma eraldi rakenduseta",
        "Vestle nagu tavaliselt",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Broneeringud",
      heading: "Lauabroneering ilma kõnedeta",
      body: "Külalised broneerivad laua ise menüü või lingi kaudu, sina näed kalendrit laua kaupa ja kinnitad auto- või käsitsi.",
      bullets: [
        "Broneering 24/7, ilma kõnedeta",
        "Kalender kõigi laudade järgi",
        "Auto- ja käsitsi kinnitus",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium-disain",
      heading: "Näeb välja nagu sait, mitte PDF",
      body: "Videotaust tervituskuval, sinu kontseptsioon kirjeldatud ja eraldi kontaktileht kaardi ja sotsiaalmeediaga.",
      bullets: [
        "Video avakuval",
        "Kontseptsioon ja road kirjeldatud",
        "Eraldi kontaktileht",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Kaks telefoni kohvikulaual: menüü avakuva video taustaga ja kontaktileht kaardiga" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Tellimused · valikuline",
      heading: "Tellimused otse menüüst",
      body: "Külalised koostavad korvi ja saadavad tellimuse — see jõuab saali, WhatsAppi või köögiekraanile. Valikuline.",
      bullets: [
        "Korv ja saatmine ühe puudutusega",
        "Saali, WhatsAppi või kööki",
        "Lülita see seadetes sisse",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Kaks telefoni laual: korv tellimusega ja tellimuse saatmise kinnitus" },
    },
  ],

  faq: {
    sub: "Mida restoranipidajad küsivad digitaalse menüü kohta IQ Restis. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
    items: [
      { q: "Kas ma vajan tehnilisi oskusi või CMS-kogemust?", a: "Ei, eriteadmisi pole vaja. Iga toiming halduspaneelis on klikiga ja lohistamisega — ilma koodita. Toote lisamine menüüsse võtab paar sekundit: nimi, hind, foto. Menüü täielik seadistamine võtab tavaliselt 30 minutit kuni tund." },
      { q: "Mis on IQ Resti digitaalne menüü?", a: "IQ Rest on pilvelplatvorm restoranidele. Digitaalne menüü on sinu menüü veebipõhine versioon, mis on külalistele saadaval QR-koodi või otseselt lingi kaudu: roogade fotod, hinnad, allergeenid, AI-tõlge 35 keelde, uuendused reaalajas. Menüüd majutatakse meie serverites; sa ei pea installima ega hooldama tarkvara — ava lihtsalt brauser." },
      { q: "Kas külalised vajavad rakendust või eririistvara?", a: "Ei. Külalised suunavad telefoni kaamera QR-koodile ja menüü avaneb brauseris. Restorani halduspaneel töötab samuti igas kaasaegses brauseris — telefonis, tahvelarvutis või sülearvutis. QR-koodid trükitakse igal bürooprinterilt." },
      { q: "Kas ma saan menüüd majutada oma domeenis?", a: "Jah. Toetame kohandatud domeeni SSL-sertifikaadiga — külalised näevad menüüd sinu restorani aadressil (nt menu.sinurestoran.ee). Aitame DNS-i seadistamisel; see võtab tavaliselt 5–10 minutit." },
      { q: "Kas ma saan ühest kontost mitut restorani hallata?", a: "Jah, soovi korral. Üks konto võib majutada mitut restorani: iga koht oma menüü, disaini, QR-koodide ja analüütikaga. Kirjuta meile WhatsAppi ja me aktiveerime sinu grupile mitme restorani režiimi." },
      { q: "Kui keeruline on menüü algusest peale seadistada?", a: "Seadistus koosneb kolmest sammust: (1) loo kategooriad; (2) lisa tooted nimede, hindade ja fotodega; (3) trüki QR-koodid laudadele. Kui sul on juba paberil menüü või PDF, laadi see üles — AI tunneb kategooriad, nimed ja hinnad ära ning täidab kaardid automaatselt. Põhiline menüü võib veebi minna 5 minutiga; täielik seadistusaeg sõltub toodete arvust." },
      { q: "Millist tuge te pakute?", a: "Oleme WhatsAppis kättesaadavad tööajal ja vastame kiiresti e-posti teel. Aitame esmase seadistuse, domeeni konfiguratsiooni, menüü disaini ja kõikide ebastandardsete olukordadega. Kui vajad demot või praktilist tuge käivitamise ajal — kirjuta meile." },
    ],
  },
};
