import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "lv",
  htmlDir: "ltr",

  meta: {
    title: "QR ēdienkarte restorāniem — Tieši pasūtījumi, nulle komisijas | IQ Rest",
    description:
      "Viss-vienā platforma restorāniem: digitālā ēdienkarte, QR pasūtījumi, galdu rezervēšana un virtuves ekrāns. Sākt 5 minūtēs. 14 dienas bez maksas, bez kartes.",
    canonical: "https://iq-rest.com/lv",
    ogLocale: "lv_LV",
    ogTitle: "QR ēdienkarte restorāniem — Tieši pasūtījumi, nulle komisijas",
    ogDescription:
      "Digitālā ēdienkarte, QR pasūtījumi, galdu rezervēšana un AI tulkojums. Sākt 5 minūtēs. 14 dienas bez maksas.",
  },

  ctaText: "Izveidot digitālo ēdienkarti",
  demoText: "Skatīt demonstrāciju",
  microcopy: "14 dienas bez maksas · Bez kartes · Atcelt jebkurā laikā",

  header: {
    navFeatures: "Funkcijas",
    navHow: "Kā tas darbojas",
    navPricing: "Cenas",
    navFaq: "BUJ",
    signIn: "Pieslēgties",
    cta: "Izveidot ēdienkarti",
  },

  hero: {
    verticals: ["Restorāni", "Kafejnīcas", "Bāri", "Viesnīcas", "Picērijas"],
    headline: "Digitālā ēdienkarte restorānam. Tiešsaistē 5 minūtēs.",
    sub: "Digitālā ēdienkarte jūsu restorānam 5 minūtēs. Viss iekļauts: redaktors bez koda, AI atpazīšana drukātai ēdienkartei, QR kodi galdiem un tieši pasūtījumi bez komisijas.",
    dynamicHeadlines: ["0 % komisija.", "35 AI valodas.", "Tiešsaistes pasūtījumi.", "Rezervēšana 24/7.", "Premium dizains."],
    painBullets: [
      "0 % komisija: katrs pasūtījums tiek nosūtīts tieši jūsu restorānam.",
      "AI tulkojums 35 valodās — tūristi saprot ēdienkarti un pasūta vairāk.",
      "Rezervēšana 24/7: viesi paši rezervē galdus, bez zvaniem maksimumstundās.",
      "Elastīgas cenas: ēdienkartes izmaiņas tiešsaistē sekundēs.",
    ],
    rating: "Vairāk nekā 500 restorānu vairāk nekā 30 valstīs",
  },

  features: {
    heading: "Viss, kas jums nepieciešams.",
    headingAccent: "Nekā lieka.",
    sub: "Izveidots restorāniem. Tiek izmantots katru dienu pie galda, virtuvē un zālē.",
    items: [
      { Icon: Monitor, title: "Digitālā ēdienkarte", desc: "Ēdienkarte pārlūkprogrammā ar fotoattēliem, cenām, alergēniem un aprakstiem. Atjaunina reāllaikā no telefona. Viesi redz ēdienkarti savā valodā; restorāns ietaupa uz drukāšanu.", tag: "Digitālā ēdienkarte", href: "/lv/digitala-edienkarte-restorans" },
      { Icon: Receipt, title: "Pasūtījumu pieņemšana: viesis un viesmīlis", desc: "QR kods uz galda viesim vai viesmīlis pieņem pasūtījumu no telefona — abi nonāk tieši virtuvē vai WhatsApp. Bez komisijas, ar galda numuru uz katras kvīts.", tag: "Pasūtījumi", href: "/lv/pasutijumu-sistema-restorans" },
      { Icon: CalendarCheck, title: "Galdu rezervēšana 24/7", desc: "Viesi paši rezervē galdus, izmantojot vietni vai QR ēdienkarti, kamēr jūs esat aizņemts zālē. Kalendārs pa galdiem, automātiskas apstiprināšanas un atgādinājumi. Neviena zaudēta viesa.", tag: "Rezervēšana", href: "/lv/galdu-rezervesana" },
      { Icon: ChefHat, title: "Virtuves ekrāns (KDS)", desc: "Papīra kvītis vairs nav nepieciešamas. Pasūtījumi no zāles nonāk tieši šefpavāra ekrānā — kolonnas „gatavošanā / gatavs / pasniegts“, alergēni un piezīmes izceltas ar krāsām. Planšetdatorā vai telefonā.", tag: "KDS", href: "/lv/virtuves-ekrans" },
    ],
  },

  founder: {
    eyebrow: "Izveidoja restorāni",
    quoteStart:
      "Mēs ar sievu vadījām savu kafejnīcu un no pirmavota zinām, kā patiesībā izskatās restorāna diena — pasūtījumu pieņemšana, rezervācijas, zāles un virtuves plūsma. Mēs vēlējāmies vienu rīku: modernu, viegli palaižamu un saprotamu no pirmā acu uzmetiena —",
    quoteAccent: "tā mēs sākām būvēt platformu, kuru tagad attīstām citiem restorāniem.",
    sign: "Bogdans Sokolovs · dibinātājs, bijušais kafejnīcas īpašnieks",
    photoAlt: "Bogdans Sokolovs, IQ Rest dibinātājs",
  },

  how: {
    heading: "Tiešsaistē 5 minūtēs",
    sub: "Četri īsi soļi. Bez instalēšanas, bez tehniskās iestatīšanas.",
    steps: [
      { n: "1", t: "Tips un nosaukums", d: "Izvēlieties iestādes tipu un ievadiet nosaukumu." },
      { n: "2", t: "Saglabāt", d: "Ievadiet savu e-pastu vai piesakieties ar Google." },
      { n: "3", t: "Ēdienkarte", d: "Pievienojiet preces manuāli vai augšupielādējiet drukātu ēdienkarti AI atpazīšanai." },
      { n: "4", t: "Pabeigts", d: "Dalieties ar saiti vai QR kodu un sāciet pieņemt pasūtījumus." },
    ],
  },

  pricing: {
    badge: "Bez komisijas · Bez līgumiem",
    heading: "Viens plāns.",
    headingAccent: "Viss iekļauts.",
    sub: "QR ēdienkarte, pasūtījumu pieņemšana, AI tulkojums, restorāna vietne un rezervēšana. Viena caurspīdīga ikmēneša maksa.",
    monthlyLabel: "Ikmēneša",
    yearlyLabel: "Ikgadējs",
    saveBadge: "Ietaupiet 25 %",
    perMonth: "mēnesī",
    billedAnnually: "Ikgadējais rēķins: {total}",
    youSave: "Ietaupāt {amount}",
    trust: { secure: "Droša maksājuma apstrāde caur Stripe", noCommitment: "Bez saistībām", quick: "Aktīvs dažās minūtēs", restaurants: "500+ restorāni" },
  },

  faq: {
    eyebrow: "Vai jums ir jautājumi?",
    heading: "Bieži uzdoti",
    headingAccent: "jautājumi.",
    sub: "Ko restorāni jautā pirms reģistrēšanās. Nevarat atrast savu jautājumu? Rakstiet mums WhatsApp — atbild īsti cilvēki, nevis bots.",
    whatsappCta: "Jautājiet WhatsApp",
    whatsappPrefill: "Sveiki, man ir jautājums par IQ Rest",
    items: [
      { q: "Ko ietver izmēģinājuma periods un kas notiek pēc tā?", a: "Pilna piekļuve visām funkcijām 14 dienas, bez kartes. Pēc 14 dienām konts tiek apturēts, ja nav pievienots maksāšanas veids — mēs nekad neiekasējam automātiski. Jūs varat pievienot maksājumu vēlāk un turpināt no vietas, kur apstājāties. Atceliet jebkurā laikā ar vienu klikšķi." },
      { q: "Vai jūs iekasējat komisijas no pasūtījumiem?", a: "Nē. Katrs pasūtījums no QR ēdienkartes tiek nosūtīts tieši restorānam — bez procentiem no mūsu puses, bez agregatoru komisijas. Viena fiksēta ikmēneša maksa un nekas cits." },
      { q: "Vai viesiem ir nepieciešama lietotne, vai mums ir nepieciešamas tehniskās prasmes?", a: "Viesiem nav nepieciešama lietotne — viņi pavērš telefona kameru uz QR kodu un ēdienkarte atveras pārlūkprogrammā. Restorāniem arī nav nepieciešamas tehniskās prasmes: administrēšanas panelis darbojas jebkurā mūsdienu pārlūkprogrammā telefonā, planšetdatorā vai klēpjdatorā. Katra darbība tiek veikta ar klikšķi un vilkšanu, bez koda." },
      { q: "Cik ātri mainās cenas un parādās jauni ēdieni?", a: "Uzreiz. Mainiet cenu no telefona — viesi to redz sekundēs. Jauns ēdiens prasa dažus pieskārienus: nosaukums, cena, fotoattēls. Bez pārdrukāšanas, bez gaidīšanas pēc dizainera." },
      { q: "Cik valodas tiek atbalstītas?", a: "35 valodas ar iebūvētu AI tulkojumu. Viens pieskāriens, un visa ēdienkarte ir iztulkota; AI saprot kulinārijas kontekstu — nosaukumi un apraksti izklausās dabiski jebkurā valodā. Tūristi pasūta ar lielāku pārliecību, kad patiešām saprot ēdienkarti." },
    ],
  },

  finalCta: {
    heading: "Tiešsaistē 5 minūtēs.",
    headingAccent: "14 dienas bez maksas.",
    sub: "Bez kartes, atceliet jebkurā laikā. Pievienojieties 500+ restorāniem, kas jau izmanto IQ Rest.",
  },

  scan: {
    heading: "Vai jums ir papīra ēdienkarte vai PDF?",
    headingAccent: "AI to digitalizē 60 sekundēs.",
    sub: "Augšupielādējiet fotoattēlu vai dokumentu — AI automātiski atpazīst kategorijas, ēdienus un cenas.",
    cta: "Skenēt ēdienkarti →",
  },

  pricingHero: {
    chips: ["Bez komisijas", "Bez līgumiem", "14 dienas bez maksas"],
    heading: "Cenas.",
    headingAccent: "Bez slēptām maksām.",
    sub: "Viena caurspīdīga ikmēneša maksa. Bez procentiem no pasūtījumiem un bez agregatoru komisijas. Atceliet abonēšanu jebkurā laikā.",
    popularBadge: "Populārs",
    perMonthSuffix: "/mēn.",
    whenAnnualTemplate: "ikgadējais rēķins · {total} € gadā",
    orMonthlyTemplate: "vai {price} €/mēn.",
    savingsTemplate: "ietaupiet {amount} € gadā",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Ēdienkarte, QR pasūtījumi un AI tulkojums. Tiešsaistē 5 minūtēs.",
        features: [
          "QR ēdienkarte katram galdam",
          "Digitālā ēdienkarte ar fotoattēliem un alergēniem",
          "AI tulkojums 35 valodās",
          "Pasūtījumi no ēdienkartes (pēc izvēles)",
          "AI ēdienu fotoattēlu ģenerēšana",
          "Pārvaldība no jebkura telefona vai planšetdatora",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Pilnīga restorāna kontrole: virtuves ekrāns un rezervācijas.",
        features: [
          "Viss no Basic",
          "Virtuves ekrāns (KDS)",
          "Tiešsaistes galdu rezervēšana 24/7",
          "Prioritārs WhatsApp atbalsts",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/lv/digitala-edienkarte-restorans", label: "Digitālā ēdienkarte" },
      { href: "/lv/pasutijumu-sistema-restorans", label: "Pasūtījumi" },
      { href: "/lv/galdu-rezervesana", label: "Rezervēšana" },
      { href: "/lv/virtuves-ekrans", label: "Virtuves ekrāns" },
    ],
    navLinks: [
      { href: "/lv/cenas", label: "Cenas" },
      { href: "#faq", label: "BUJ" },
      { href: "/lv/languages", label: "Mainīt valodu" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Visas tiesības aizsargātas.",
  },
};
