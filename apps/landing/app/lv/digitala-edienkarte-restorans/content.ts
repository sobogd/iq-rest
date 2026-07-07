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
  locale: "lv",
  slug: "digitala-edienkarte-restorans",
  trackPrefix: "l_lv_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Digitālā ēdienkarte restorāniem | IQ Rest",
    description:
      "Digitālā ēdienkarte restorāniem: tiešsaistes ēdienkarte ar fotoattēliem, alergēniem, AI tulkojumu un reāllaika cenu atjauninājumiem. 14 dienas bez maksas, bez kartes.",
    canonical: "https://iq-rest.com/lv/digitala-edienkarte-restorans",
    ogLocale: "lv_LV",
    ogTitle: "Digitālā ēdienkarte restorāniem",
    ogDescription:
      "Papīra ēdienkartes tiešsaistes versija — fotoattēli, alergēni, AI tulkojums, reāllaika atjauninājumi.",
    brandLine: "IQ Rest — Digitālā ēdienkarte restorāniem",
  },

  hero: {
    headline: "Digitālā ēdienkarte,\nkurā ir viss",
    cta: "Izveidot digitālo ēdienkarti",
    sub: "Foto, alergēni un tulkojums 35 valodās. Plus pasūtījumi, WhatsApp un galdiņu rezervēšana — viss vienā IQ Rest.",
  },

  scan: {
    heading: "Vai jums ir papīra ēdienkarte vai PDF?",
    headingAccent: "AI to digitalizē 60 sekundēs.",
    sub: "Augšupielādējiet fotoattēlu vai dokumentu — AI automātiski atpazīst kategorijas, ēdienus un cenas.",
    cta: "Skenēt ēdienkarti",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI valodas",
      heading: "35 valodas katram viesim",
      body: "Viens QR, 35 valodas. AI tulko ar kulinārijas kontekstu, tāpēc katrs ēdiens skan dabiski. Tūristi pasūta pārliecināti.",
      bullets: [
        "35 valodas tavā plānā",
        "Kulinārijas AI, nevis Google",
        "Valodas maiņa ar vienu pieskārienu",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Divi viesi lasa to pašu digitālo ēdienkarti dažādās valodās savos telefonos" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergēni",
      heading: "Alergēni un diētas katram ēdienam",
      body: "Atzīmē glutēnu, laktozi, riekstus, vegānu un bezglutēna. Viesi filtrē ēdienkarti pēc savas diētas un pasūta bez pūlēm.",
      bullets: [
        "14 alergēnu kategorijas",
        "Vegānu un bezglutēna atzīmes",
        "Viesi filtrē pēc diētas",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Viesis filtrē ēdienkarti pēc alergēniem telefonā, kamēr īpašnieks rediģē alergēnu sarakstu planšetdatorā" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Jebkura ierīce",
      heading: "Pārvaldi no jebkuras ierīces",
      body: "Administrēšanas panelis darbojas pārlūkā — rediģē ēdienkarti, cenas un foto no jebkurienes. Nekas nav jāinstalē.",
      bullets: [
        "Darbojas jebkurā pārlūkā",
        "Telefons, planšete vai dators",
        "Nekas nav jāinstalē",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Bez komisijas",
      heading: "Nulle komisijas, bez piemaksām",
      body: "Viens caurspīdīgs abonements. Mēs neņemam daļu no tavas apgrozības un neslēpjam maksas — viss paliek restorānam.",
      bullets: [
        "Nulle procentu no pasūtījumiem",
        "Bez slēptām piemaksām",
        "Viena fiksēta cena",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Savs domēns",
      heading: "Ēdienkarte tavā domēnā",
      body: "Mēs savienojam tavu domēnu ar SSL — viesi redz ēdienkarti tava restorāna adresē. Palīdzam ar DNS 10 minūtēs.",
      bullets: [
        "Tavs domēns ar SSL",
        "edienkarte.jusurestorans.lv",
        "Palīdzam ar DNS iestatīšanu",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Tavs dizains",
      heading: "Elastīgs dizains tieši tev",
      body: "Vairāki gatavi izkārtojumi un stili — izvēlies vāku, krāsas un ēdienu noformējumu, kas atbilst tavai vietai.",
      bullets: [
        "Vairāki gatavi izkārtojumi",
        "Tavs vāks un krāsas",
        "Jauns izskats dažos klikšķos",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontakti",
      heading: "Kontakti un sociālie tīkli ēdienkartē",
      body: "Atsevišķa lapa ar karti, tālruni un saitēm uz Instagram un WhatsApp — viesi atrod tevi ar vienu pieskārienu.",
      bullets: [
        "Karte, tālrunis un adrese",
        "Instagram un WhatsApp",
        "Sazinies ar vienu pieskārienu",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp pasūtījumi",
      heading: "Pieņem pasūtījumus caur WhatsApp",
      body: "Viesi izveido grozu un nosūta pasūtījumu tieši tavā WhatsApp — bez atsevišķas lietotnes, jau ierastajā sarunā.",
      bullets: [
        "Pasūtījums tavā WhatsApp",
        "Bez atsevišķas lietotnes",
        "Sarunājies kā ierasts",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervācijas",
      heading: "Galdiņu rezervēšana bez zvaniem",
      body: "Viesi rezervē galdiņu paši caur ēdienkarti vai saiti, tu redzi kalendāru pa galdiem un apstiprini auto vai manuāli.",
      bullets: [
        "Rezervācija 24/7, bez zvaniem",
        "Kalendārs visiem galdiem",
        "Auto un manuāls apstiprinājums",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium dizains",
      heading: "Izskatās kā vietne, nevis PDF",
      body: "Video fons sveiciena ekrānā, tava koncepcija aprakstīta un atsevišķa kontaktu lapa ar karti un sociālajiem tīkliem.",
      bullets: [
        "Video sākuma ekrānā",
        "Koncepcija un ēdieni aprakstīti",
        "Atsevišķa kontaktu lapa",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Divi telefoni uz kafejnīcas galda: ēdienkartes sākuma ekrāns ar video fonu un kontaktu lapa ar karti" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pasūtījumi · pēc izvēles",
      heading: "Pasūtījumi tieši no ēdienkartes",
      body: "Viesi izveido grozu un nosūta pasūtījumu — tas nonāk zālē, WhatsApp vai virtuves ekrānā. Pēc izvēles.",
      bullets: [
        "Grozs un sūtīšana ar pieskārienu",
        "Uz zāli, WhatsApp vai virtuvi",
        "Ieslēdz to iestatījumos",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Divi telefoni uz galda: grozs ar pasūtījumu un pasūtījuma nosūtīšanas apstiprinājums" },
    },
  ],

  faq: {
    sub: "Ko restorāni jautā par digitālo ēdienkarti IQ Rest. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp.",
    items: [
      { q: "Vai man ir nepieciešamas tehniskās prasmes vai CMS pieredze?", a: "Nē, īpašas prasmes nav nepieciešamas. Katra darbība administrēšanas panelī tiek veikta ar klikšķi un vilkšanu — bez koda. Preces pievienošana ēdienkartei prasa dažas sekundes: nosaukums, cena, fotoattēls. Pilnīga ēdienkartes iestatīšana parasti aizņem no 30 minūtēm līdz stundai." },
      { q: "Kas ir IQ Rest digitālā ēdienkarte?", a: "IQ Rest ir mākoņa platforma restorāniem. Digitālā ēdienkarte ir jūsu ēdienkartes tiešsaistes versija, pieejama viesiem ar QR kodu vai tiešo saiti: ēdienu fotoattēli, cenas, alergēni, AI tulkojums 35 valodās, reāllaika atjauninājumi. Ēdienkarte tiek mitināta mūsu serveros; jums nav jāinstalē vai jāuztur programmatūra — vienkārši atveriet pārlūkprogrammu." },
      { q: "Vai viesiem ir nepieciešama lietotne vai īpaša aparatūra?", a: "Nē. Viesi pavērš telefona kameru uz QR kodu un ēdienkarte atveras pārlūkprogrammā. Restorāna administrēšanas panelis arī darbojas jebkurā mūsdienu pārlūkprogrammā — telefonā, planšetdatorā vai klēpjdatorā. QR kodi tiek drukāti jebkurā biroja printerī." },
      { q: "Vai varu mitināt ēdienkarti savā domēnā?", a: "Jā. Mēs atbalstām pielāgotu domēnu ar SSL sertifikātu — viesi redz ēdienkarti jūsu restorāna adresē (piemēram, edienkarte.jusurestorans.lv). Mēs palīdzam ar DNS iestatīšanu; tas parasti aizņem 5–10 minūtes." },
      { q: "Vai varu pārvaldīt vairākus restorānus no viena konta?", a: "Jā, pēc pieprasījuma. Viens konts var mitināt vairākus restorānus: katra vieta ar savu ēdienkarti, dizainu, QR kodiem un analītiku. Rakstiet mums WhatsApp un mēs aktivizēsim daudzo restorānu režīmu jūsu grupai." },
      { q: "Cik grūti ir iestatīt ēdienkarti no nulles?", a: "Iestatīšana sastāv no trīs soļiem: (1) izveidot kategorijas; (2) pievienot preces ar nosaukumiem, cenām un fotoattēliem; (3) drukāt QR kodus galdiem. Ja jums jau ir papīra ēdienkarte vai PDF, augšupielādējiet to — AI atpazīs kategorijas, nosaukumus un cenas un automātiski aizpildīs kartītes. Pamata ēdienkarte var būt tiešsaistē 5 minūtēs; kopējais iestatīšanas laiks ir atkarīgs no preču skaita." },
      { q: "Kādu atbalstu piedāvājat?", a: "Mēs esam pieejami WhatsApp darba laikā un ātri atbildam pa e-pastu. Mēs palīdzam ar sākotnējo iestatīšanu, domēna konfigurāciju, ēdienkartes dizainu un jebkuru nestandarta situāciju. Ja jums nepieciešama demonstrācija vai praktisks atbalsts palaišanas laikā — rakstiet mums." },
    ],
  },
};
