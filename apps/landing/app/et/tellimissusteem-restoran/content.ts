import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "et",
  slug: "tellimissusteem-restoran",
  trackPrefix: "l_et_orders",

  meta: {
    title: "Tellimissüsteem restoranile — külaline ja kelner | IQ Rest",
    description:
      "Restorani tellimused telefonist või tahvelarvutist: saaliplaan, arve jagamine, olekud, valikud ja märkused. Külalised tellivad lauas; kelner võtab tellimusi vastu igast seadmest. 14 päeva tasuta.",
    canonical: "https://iq-rest.com/et/tellimissusteem-restoran",
    ogLocale: "et_EE",
    ogTitle: "Tellimissüsteem restoranile — külaline ja kelner",
    ogDescription:
      "Külaline lauas või kelner telefonis — tellimus jõuab kohe kööki. Saaliplaan, arve jagamine, olekud, valikud ja märkused.",
    brandLine: "IQ Rest — Tellimissüsteem restoranile",
  },

  hero: {
    headline: "Tellimuste vastuvõtmine: külaline ja kelner — otse kööki.",
    sub: "Külalised tellivad lauas QR-menüü kaudu või kelner võtab tellimuse vastu telefonist või tahvelarvutist — tellimus jõuab köögiekraanile sekunditega. Saaliplaan värvikoodiga laudadega, arve jagamine, paindlikud valikud ja kommentaarid. Ei mingeid märkmikke, ei mingeid käike baari.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Kelner võtab lauas tellimuse vastu nutitelefonist — tellimus jõuab köögiekraanile",
  },

  scan: {
    heading: "Seadista tellimissüsteem",
    headingAccent: "5 minutiga.",
    sub: "Lae üles paberil menüü või PDF — AI tunneb ära road, hinnad ja kategooriad. Ühenda tahvelarvuti saalis ja hakka lauas tellimusi vastu võtma.",
    cta: "Skanni menüü",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Loend ja saaliplaan",
      heading: "Tellimuste loend saaliplaani kõrval.",
      body: "Kõik aktiivsed tellimused paremal: olek, kogusumma, aeg, kaupade arv. Vasakul — saaliplaan: lauad värvikoodiga oleku järgi — vaba, hõivatud, vajab tähelepanu. Puuduta lauda, et avada või luua tellimus; puuduta kaarti, et avada üksikasjalik vaade. Ei mingit hüppamist ekraanide vahel.",
      bullets: [
        "Saaliplaan: lauad värvikoodiga tellimuse oleku järgi.",
        "Tellimuste loend kõrval — kogusumma, aeg, kaupade arv.",
        "Puuduta lauda, et avada või luua tellimus.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tahvelarvuti kelneri jaamas: tellimuste loend ja saaliplaan värvikoodiga laudadega" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Tellimuse kaart",
      heading: "Tellimuse kaart: olekud, kopeerimine, kustutamine — üks puudutus.",
      body: "Igal kaubal on oma olek (Ootel / Valmistatakse / Valmis / Serveeritud) — köök ja kelner näevad sama pilti reaalajas. Punkti puudutamine avab tegevuste menüü: oleku muutmine, kauba kopeerimine sama modifikaatorite ja valikutega, kustutamine. Kõik kaardi sees.",
      bullets: [
        "Olek kauba kohta: Ootel / Valmistatakse / Valmis / Serveeritud.",
        "Kopeeri kaup ühe puudutusega samade valikutega.",
        "Kustuta kaup otse kaardilt.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tahvelarvuti tellimuse üksikasjaliku kaardiga: kaupade olekud, kopeerimise ja kustutamise tegevused" },
    },
    {
      icon: Receipt,
      eyebrow: "Jaga arvet",
      heading: "Jaga arvet, kui külalised maksavad eraldi.",
      body: "Külalised otsustasid jagada — märgi tooted, mis liiguvad uuele tšekile; ülejäänu jääb praegusele. Süsteem näitab kohe mõlemat kogusummat. Üks puudutus „Jaga tellimust“ ja sul on kaks iseseisvat tellimust õigete kogusummadega, mõlemad endiselt oma laudade külge seotud.",
      bullets: [
        "Vali jagamiseks tooted märkeruutudega.",
        "Mõlemad kogusummad kuvatakse kohe.",
        "Üks puudutus ja tellimus on jagatud ilma käsitsi arvutamiseta.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tahvelarvuti restoranilaual: arve jagamise dialoog külaliste vahel" },
    },
    {
      icon: Smartphone,
      eyebrow: "Mobiilne lisamine",
      heading: "Lisa tooteid telefonist — kolme tegevusega.",
      body: "Kelner pole seotud ühe seadmega: avab tellimuste vastuvõtmise oma telefonis ja lisab toote kolmes sammus — kategooria, roog, valikud (suurus, küpsetusaste, lisakaste või koostisosa). Hind arvutatakse automaatselt ümber. Märkus köögile tuleb viimases sammus.",
      bullets: [
        "Kolm sammu: kategooria → roog → valikud.",
        "Valikud (suurus, lisad, ekstrad) hinnastatud ühe klikiga.",
        "Märkuse väli viimases sammus.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Neli telefoni tellimuse kauba lisamise sammudega: kategooria, roog, suurus, kommentaar" },
    },
  ],

  faq: {
    sub: "Mida restoranipidajad küsivad tellimuste vastuvõtmise kohta IQ Restis. Ei leia oma küsimust? Kirjuta meile WhatsAppi.",
    items: [
      { q: "Kas mitu kelnerit saavad korraga töötada erinevatest seadmetest?", a: "Jah. Iga kelner logib jagatud restorani kontosse oma telefonist või tahvelarvutist — kõik näevad samu laudu, tellimusi ja olekuid reaalajas. Ühe kelneri muudatused ilmuvad teistele kohe, ilma konfliktide ja lukustusteta." },
      { q: "Kas kelnerid saavad kasutada oma isiklikke seadmeid (BYOD)?", a: "Jah. See on brauseri veebirakendus — pole midagi installida. Kelner avab lingi, logib restorani kontosse oma iPhone'ist, Androidist või isiklikust tahvelarvutist ja hakkab tööle. Vahetuse lõpus lihtsalt logib välja." },
      { q: "Kas roogadele saab lisada kohustuslikke valikuid (suurus, küpsetusaste jne)?", a: "Jah. Igal roal võib olla suvaline arv valikute rühmi — kohustuslikud (nt „Suurus“: Väike / Keskmine / Suur) ja valikulised („Küpsetusaste“: harv / keskmine / hästi küpsetatud). Valikud võivad muuta hinda (+1,00 €). Kui rühm on kohustuslik, ei lase süsteem külalisel ega kelneril rooga ilma valikuta lisada." },
      { q: "Kas külalised saavad lisada märkusi või lisandeid roale (leib, kaste)?", a: "Jah. Lisamise viimases sammus on vaba märkuse väli („ilma sibulata“, „hästi küpsetatud“, „pähkliallergia“). Lisandid on eraldi hinnastatud modifikaatorid („+ BBQ-kaste +1,50 €“, „+ Leib +2,00 €“). Märkused kuvatakse köögiekraanil, värviga esile tõstetud." },
      { q: "Kas tellimuste statistika on olemas?", a: "Jah. Analüütika sektsioon näitab: tulud päeva ja tunni järgi, keskmine arve, populaarsemad road, külaline → tellimus konversioon, teenindamise kiirus (aeg Ootel kuni Serveeritud). See aitab planeerida vahetusi, oste ja avastada vähetõhusaid roogi." },
      { q: "Kas tellimusi saab jagada või laudade vahel liigutada?", a: "Jah, mõlemad stsenaariumid on toetatud. Jagamiseks — märgi tooted, mis lähevad uuele tšekile (külalistele, kes maksavad eraldi). Liigutamiseks — ava tellimuse kaart, vali uus laud; kogu tellimus liigub sinna. Ei mingit käsitsi arvutamist, ei mingit paneelilt lahkumist." },
    ],
  },
};
