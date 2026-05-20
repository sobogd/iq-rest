import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lv",
  slug: "pasutijumu-sistema-restorans",
  trackPrefix: "l_lv_orders",

  meta: {
    title: "Pasūtījumu sistēma restorānam — viesis un viesmīlis | IQ Rest",
    description:
      "Restorāna pasūtījumi no telefona vai planšetdatora: zāles plāns, rēķina sadalīšana, statusi, opcijas un piezīmes. Viesi pasūta pie galda; viesmīlis pieņem pasūtījumus no jebkuras ierīces. 14 dienas bez maksas.",
    canonical: "https://iq-rest.com/lv/pasutijumu-sistema-restorans",
    ogLocale: "lv_LV",
    ogTitle: "Pasūtījumu sistēma restorānam — viesis un viesmīlis",
    ogDescription:
      "Viesis pie galda vai viesmīlis telefonā — pasūtījums uzreiz nonāk virtuvē. Zāles plāns, rēķina sadalīšana, statusi, opcijas un piezīmes.",
    brandLine: "IQ Rest — Pasūtījumu sistēma restorānam",
  },

  hero: {
    headline: "Pasūtījumu pieņemšana: viesis un viesmīlis — tieši uz virtuvi.",
    sub: "Viesi pasūta caur QR ēdienkarti pie galda vai viesmīlis pieņem pasūtījumu no telefona vai planšetdatora — pasūtījums sekundēs nonāk virtuves ekrānā. Zāles plāns ar krāsotām galdiem, rēķina sadalīšana, elastīgas opcijas un komentāri. Bez piezīmju grāmatām, bez staigāšanas pie bāra.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Viesmīlis pieņem pasūtījumu pie galda no viedtālruņa — pasūtījums nonāk virtuves ekrānā",
  },

  scan: {
    heading: "Iestatiet pasūtījumu sistēmu",
    headingAccent: "5 minūtēs.",
    sub: "Augšupielādējiet papīra ēdienkarti vai PDF — AI atpazīst ēdienus, cenas un kategorijas. Pievienojiet planšetdatoru zālē un sāciet pieņemt pasūtījumus pie galdiem.",
    cta: "Skenēt ēdienkarti",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Saraksts un zāles plāns",
      heading: "Pasūtījumu saraksts blakus zāles plānam.",
      body: "Visi aktīvie pasūtījumi labajā pusē: statuss, kopsumma, laiks, vienību skaits. Kreisajā pusē — zāles plāns: galdi krāsoti pēc statusa — brīvs, aizņemts, nepieciešama uzmanība. Pieskarieties galdam, lai atvērtu vai izveidotu pasūtījumu; pieskarieties kartītei, lai atvērtu detalizētu skatu. Bez ekrānu maiņas.",
      bullets: [
        "Zāles plāns: galdi krāsoti pēc pasūtījuma statusa.",
        "Pasūtījumu saraksts blakus — kopsumma, laiks, vienību skaits.",
        "Pieskarieties galdam, lai atvērtu vai izveidotu pasūtījumu.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Planšetdators viesmīļa stacijā: pasūtījumu saraksts un zāles plāns ar krāsotām galdiem" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Pasūtījuma kartīte",
      heading: "Pasūtījuma kartīte: statusi, dublēšana, dzēšana — viens pieskāriens.",
      body: "Katrai vienībai ir savs statuss (Gaida / Gatavojas / Gatavs / Pasniegts) — virtuve un viesmīlis redz to pašu attēlu reāllaikā. Pieskāriens punktam atver darbību izvēlni: statusa maiņa, vienības dublēšana ar tiem pašiem modifikatoriem un opcijām, dzēšana. Viss kartītē.",
      bullets: [
        "Statuss pēc vienības: Gaida / Gatavojas / Gatavs / Pasniegts.",
        "Dublējiet vienību ar vienu pieskārienu ar tām pašām opcijām.",
        "Dzēsiet vienību tieši no kartītes.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Planšetdators ar detalizētu pasūtījuma kartīti: vienību statusi, dublēšanas un dzēšanas darbības" },
    },
    {
      icon: Receipt,
      eyebrow: "Sadalīt rēķinu",
      heading: "Sadaliet rēķinu, kad viesi maksā atsevišķi.",
      body: "Viesi nolēma sadalīt — atzīmējiet vienības, kas pārvietojas uz jaunu kvīti; pārējās paliek pašreizējā. Sistēma uzreiz parāda abas summas. Viens pieskāriens „Sadalīt pasūtījumu“ un jums ir divi neatkarīgi pasūtījumi ar pareizām summām, abi joprojām saistīti ar saviem galdiem.",
      bullets: [
        "Izvēlieties vienības sadalīšanai ar izvēles rūtiņām.",
        "Abas summas tiek parādītas uzreiz.",
        "Viens pieskāriens un pasūtījums tiek sadalīts bez manuālas aprēķināšanas.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Planšetdators uz restorāna galda: rēķina sadalīšanas dialogs starp viesiem" },
    },
    {
      icon: Smartphone,
      eyebrow: "Pievienošana no telefona",
      heading: "Pievienojiet vienības no telefona — trīs darbībās.",
      body: "Viesmīlis nav saistīts ar vienu ierīci: atver pasūtījumu pieņemšanu savā telefonā un pievieno vienību trīs soļos — kategorija, ēdiens, opcijas (izmērs, gatavošanas pakāpe, papildu mērce vai sastāvdaļa). Cena tiek pārrēķināta automātiski. Piezīme virtuvei tiek pievienota pēdējā solī.",
      bullets: [
        "Trīs soļi: kategorija → ēdiens → opcijas.",
        "Opcijas (izmērs, papildinājumi, papildu) ar cenu vienā klikšķī.",
        "Piezīmes lauks pēdējā solī.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Četri telefoni ar pasūtījuma vienības pievienošanas soļiem: kategorija, ēdiens, izmērs, komentārs" },
    },
  ],

  faq: {
    sub: "Ko restorāni jautā par pasūtījumu pieņemšanu IQ Rest. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp.",
    items: [
      { q: "Vai vairāki viesmīļi var strādāt vienlaikus no dažādām ierīcēm?", a: "Jā. Katrs viesmīlis pieslēdzas kopējam restorāna kontam no sava telefona vai planšetdatora — visi redz tos pašus galdus, pasūtījumus un statusus reāllaikā. Viena viesmīļa izmaiņas uzreiz parādās citiem, bez konfliktiem vai bloķēšanas." },
      { q: "Vai viesmīļi var izmantot savas personīgās ierīces (BYOD)?", a: "Jā. Tā ir tīmekļa lietotne pārlūkprogrammā — nekas nav jāinstalē. Viesmīlis atver saiti, pieslēdzas restorāna kontam no sava iPhone, Android vai personīgā planšetdatora un sāk darbu. Maiņas beigās vienkārši atslēdzas." },
      { q: "Vai ēdieniem var pievienot obligātas opcijas (izmērs, gatavošanas pakāpe utt.)?", a: "Jā. Katram ēdienam var būt jebkāds skaits opciju grupu — obligātas (piemēram, „Izmērs“: Mazs / Vidējs / Liels) un izvēles („Gatavošanas pakāpe“: jēls / vidēji / labi gatavots). Opcijas var mainīt cenu (+1,00 €). Ja grupa ir obligāta, sistēma neļaus viesim vai viesmīlim pievienot ēdienu bez izvēles." },
      { q: "Vai viesi var pievienot piezīmes vai papildu ēdienam (maize, mērce)?", a: "Jā. Pēdējā pievienošanas solī ir brīvs piezīmju lauks („bez sīpoliem“, „labi gatavots“, „alerģija pret riekstiem“). Papildu ir atsevišķi cenoti modifikatori („+ BBQ mērce +1,50 €“, „+ Maize +2,00 €“). Piezīmes parādās virtuves ekrānā, izceltas ar krāsu." },
      { q: "Vai ir pasūtījumu statistika?", a: "Jā. Analītikas sadaļa parāda: ieņēmumus pēc dienas un stundas, vidējo čeku, populārākos ēdienus, viesis → pasūtījums konversiju, apkalpošanas ātrumu (laiks no Gaida līdz Pasniegts). Tas palīdz plānot maiņas, pirkumus un identificēt vāji veicošos ēdienus." },
      { q: "Vai pasūtījumus var sadalīt vai pārvietot starp galdiem?", a: "Jā, abi scenāriji tiek atbalstīti. Sadalīšanai — atzīmējiet vienības, kas pārvietojas uz jaunu kvīti (viesiem, kuri maksā atsevišķi). Pārvietošanai — atveriet pasūtījuma kartīti, izvēlieties jaunu galdu; viss pasūtījums pārvietojas tur. Bez manuālas aprēķināšanas, bez paneļa pamešanas." },
    ],
  },
};
