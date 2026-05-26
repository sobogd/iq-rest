import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lv",
  slug: "virtuves-ekrans",
  trackPrefix: "l_lv_kds",

  meta: {
    title: "Virtuves ekrāns (KDS) restorāniem | IQ Rest",
    description:
      "Virtuves ekrāns (KDS) restorāniem: pasūtījumi no zāles un QR ēdienkartes uzreiz nonāk šefpavāra ekrānā. Kolonnas pa galdiem, statusi Gaida / Gatavojas / Gatavs / Pasniegts, filtri pa zonām. Darbojas planšetdatorā vai telefonā.",
    canonical: "https://iq-rest.com/lv/virtuves-ekrans",
    ogLocale: "lv_LV",
    ogTitle: "Virtuves ekrāns (KDS) — Pasūtījumi šefpavāra ekrānā",
    ogDescription:
      "Pasūtījumi no zāles šefpavāra ekrānā. Kolonnas pa galdiem, statusi un taimers. Viens pieskāriens maina statusu.",
    brandLine: "IQ Rest — Virtuves ekrāns",
  },

  hero: {
    headline: "Virtuves ekrāns: pasūtījumi tieši uz šefpavāra ekrāna.",
    cta: "Iestatīt virtuves ekrānu",
    sub: "Papīra kvītis vairs nav nepieciešamas. Pasūtījumi no zāles vai QR ēdienkartes uzreiz nonāk virtuves ekrānā — ar piezīmēm, alergēniem un taimeri. Viens pieskāriens maina statusu. Darbojas planšetdatorā pie izsniegšanas loga vai viedtālrunī šefpavāra kabatā.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionāla virtuve ar planšetdatoru uz misiņa stenda, kas rāda virtuves ekrānu ar aktīviem pasūtījumiem",
  },

  scan: {
    heading: "Iestatiet virtuves ekrānu",
    headingAccent: "5 minūtēs.",
    sub: "Augšupielādējiet papīra ēdienkarti vai PDF — AI atpazīst ēdienus, kategorijas un alergēnus. Pievienojiet planšetdatoru virtuvē un sāciet pieņemt pasūtījumus.",
    cta: "Skenēt ēdienkarti",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Vadīklas un filtri",
      heading: "Vairāki ekrāni pa zonām: virtuve un bārs.",
      body: "Novietojiet atsevišķus planšetdatorus pie karstās līnijas, bārā vai konditorejā — katrs ekrāns rāda tikai tos ēdienus, kas tam pieder. Filtri pēc statusa (Gaida / Gatavojas / Gatavs / Pasniegts) un kategorijas noņem troksni: šefpavārs redz tikai to, kas ir aktuāls viņa postenim.",
      bullets: [
        "Vairāki KDS ekrāni ar kategoriju filtriem.",
        "Statusa filtrs: rādīt tikai Gatavojas un Gatavs.",
        "Katra zona redz tikai savu pasūtījumu plūsmu.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Planšetdators uz misiņa stenda pie virtuves izsniegšanas loga — KDS ar statusa filtru" },
    },
    {
      icon: Timer,
      eyebrow: "Kartītes un taimers",
      heading: "Viens pieskāriens maina statusu. Piezīmes un alergēni izcelti ar krāsām.",
      body: "Ēdiena kartīte parāda izvēlētās opcijas (bez sīpoliem, labi gatavots), viesa piezīmi, alergēnus un taimeri no pasūtījuma izveidošanas brīža. Pieskarieties kartītei, un statuss pāriet uz nākamo: Gaida → Gatavojas → Gatavs → Pasniegts. Saraksts tiek šķirots pēc prioritātes automātiski.",
      bullets: [
        "Pieskāriens kartītei — momentāna statusa maiņa.",
        "Opcijas, piezīmes un alergēni izcelti ar krāsām.",
        "Prioritātes šķirošana: ilgāk gaidošās vienības paceļas augšā.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Planšetdators uz misiņa stenda uz bāra letes — KDS ar pasūtījumu kartītēm pa galdiem" },
    },
  ],

  faq: {
    sub: "Ko restorāni jautā par virtuves ekrānu IQ Rest. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp.",
    items: [
      { q: "Kādi ēdienu statusi ir virtuvē?", a: "Četri statusi ar dažādām kartīšu krāsām: Gaida (pelēks) — pasūtījums ir pieņemts un gaida; Gatavojas (oranžs) — ēdiens tiek gatavots; Gatavs (zils) — gatavs pasniegšanai; Pasniegts (zaļš) — piegādāts viesim. Pieskāriens kartītei pārvieto to uz nākamo statusu, bez izvēlnēm vai apstiprināšanas." },
      { q: "Vai varu palaist vairākus KDS ekrānus dažādās zonās?", a: "Jā. Viens planšetdators pie karstās līnijas, otrs bārā, trešais konditorejā — katrs ar savu kategorijas filtru. Visi ekrāni ir sinhronizēti reāllaikā: viena ekrāna statusa maiņa atjaunina visur." },
      { q: "Kāda aparatūra man ir nepieciešama KDS palaišanai?", a: "KDS ir tīmekļa lietotne, kas darbojas jebkurā mūsdienu pārlūkprogrammā. Liela virtuve — planšetdators uz misiņa stenda pie izsniegšanas loga vai televizors uz sienas. Maza vieta — šefpavāra viedtālrunis. Bez īpašas aparatūras, bez instalēšanas: atveriet saiti un pieslēdzieties kontam." },
      { q: "No kurienes nāk pasūtījumi uz virtuves ekrāna?", a: "No visiem avotiem: viesis, kurš pasūtīja caur QR ēdienkarti pie galda; viesmīlis, kurš pieņēma pasūtījumu no sava telefona; viesis, kurš iesniedza pasūtījumu no vietnes. Visi nonāk KDS ar avota etiķeti un galda numuru. Bez manuālas pārcelšanas no POS." },
      { q: "Kas tiek parādīts pasūtījuma kartītē?", a: "Ēdiena nosaukums, izvēlētie modifikatori (bez sīpoliem, labi gatavots, pievienot mērci), viesa komentārs, izcelti alergēni, statuss (Gaida / Gatavojas / Gatavs / Pasniegts) un taimers, kas rāda, cik ilgi ēdiens gaida. Kartītes tiek šķirotas pēc prioritātes: jo ilgāka gaidīšana, jo augstāk kolonnā." },
      { q: "Vai varu filtrēt kartītes ekrānā?", a: "Jā. Divi filtri: pēc statusa (piemēram, rādīt tikai Gaida un Gatavojas, slēpt Pasniegts) un pēc kategorijas (tikai dzērieni bārā, tikai galvenie ēdieni virtuvē). Iestatījumi tiek saglabāti pēc ierīces — katra zona patur savu komplektu." },
    ],
  },
};
