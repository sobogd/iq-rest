import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lv",
  slug: "digitala-edienkarte-restorans",
  trackPrefix: "l_lv_digital",

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
    headline: "Digitālā ēdienkarte restorāniem.",
    sub: "Papīra ēdienkartes tiešsaistes versija ar fotoattēliem, alergēniem, aprakstiem un reāllaika cenu atjauninājumiem. Viesi redz ēdienkarti savā valodā; restorāns ietaupa uz drukāšanu.",
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
      heading: "35 AI valodas — katrs viesis lasa ēdienkarti savā valodā.",
      body: "Viens QR kods, 35 valodas. AI pārvalda kulinārijas kontekstu — ēdienu nosaukumi un apraksti izklausās dabiski. Tūristi pasūta ar lielāku pārliecību un vidējais čeks aug, nepieprasot viesmīlim tulkot katru ēdienu.",
      bullets: [
        "35 valodas iekļautas abonementā, bez papildu maksas.",
        "AI ar kulinārijas konteksta izpratni, nevis neapstrādāts Google Translate.",
        "Viesis maina valodu ar vienu pieskārienu ēdienkartē.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Divi viesi lasa to pašu digitālo ēdienkarti dažādās valodās savos telefonos" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergēni",
      heading: "Alergēnu un diētas etiķetes.",
      body: "Atzīmējiet ēdienus glutēnam, laktozei, riekstiem, jūras veltēm, vegānu un bezglutēna opcijām. Viesi filtrē ēdienkarti saskaņā ar saviem diētiskajiem vajadzībām un pasūta ar lielāku pārliecību.",
      bullets: [
        "14 standarta alergēnu kategorijas katrā ēdienā.",
        "Vegāns, veģetārietis un bezglutēna etiķetes ar vienu klikšķi.",
        "Viesi filtrē ēdienkarti saskaņā ar saviem diētas ierobežojumiem.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Viesis filtrē ēdienkarti pēc alergēniem telefonā, kamēr īpašnieks rediģē alergēnu sarakstu planšetdatorā" },
    },
    {
      icon: Palette,
      eyebrow: "Premium dizains",
      heading: "Premium dizains ar video fonu un kontaktu lapu.",
      body: "Video vai fotoattēls sveiciena ekrānā, restorāna apraksts, atsevišķa kontaktu lapa ar karti, tālruņu numuriem un sociālo tīklu profiliem. Digitālā ēdienkarte izskatās kā pilnvērtīga restorāna vietne, nevis PDF aiz QR koda.",
      bullets: [
        "Video fons vai liels fotoattēls sveiciena ekrānā.",
        "Restorāna un kategoriju apraksti — pastāstiet koncepcijas stāstu.",
        "Kontaktu lapa: karte, tālrunis, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Divi telefoni uz kafejnīcas galda: ēdienkartes sākuma ekrāns ar video fonu un kontaktu lapa ar karti" },
    },
    {
      icon: LayoutList,
      eyebrow: "Ēdienkarte bez fotoattēliem",
      heading: "Ēdienkarte bez fotoattēliem izskatās tikpat labi.",
      body: "Dažām precēm var nebūt fotoattēlu — un tas ir pilnīgi pieņemami. IQ Rest rāda kartītes ar attēliem un bez tiem konsekventi: tipogrāfija, alergēni un cenas saglabā premium sajūtu. Preču ar fotoattēliem un bez tiem maisījums paliek saskaņots.",
      bullets: [
        "Kartītes bez fotoattēliem neizskatās tukšas.",
        "Tipogrāfija pielāgojas kartītes saturam.",
        "Konsekvents stils precēm ar attēliem un bez tiem.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Divi telefoni uz galda: ēdienkarte ar ēdienu fotoattēliem un tikai teksta ēdienkarte" },
    },
    {
      icon: Smartphone,
      eyebrow: "Pārvaldīt no jebkura ierīces",
      heading: "Pārvaldiet ēdienkarti no jebkura ierīces.",
      body: "Viens panelis atveras pārlūkprogrammā telefonā, planšetdatorā vai klēpjdatorā. Mainiet cenu, izņemiet ēdienu no stop saraksta vai pievienojiet īpašu piedāvājumu — viesi redz izmaiņas sekundēs. Bez instalēšanas, bez integrācijām.",
      bullets: [
        "Bez instalējamas lietotnes — atveriet pārlūkprogrammu un esat iekšā.",
        "Cenas, fotoattēli un stop saraksts — daži pieskārieni no telefona.",
        "Pārvaldiet ēdienkarti no jebkuras vietas, ieskaitot zāli.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Klēpjdators un telefons uz kafejnīcas galda rediģē to pašu ēdienkartes elementu abās ierīcēs" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pasūtījumi no ēdienkartes · pēc izvēles",
      heading: "Viesi pasūta tieši no ēdienkartes.",
      body: "Viesi izveido grozu QR ēdienkartē un nosūta pasūtījumu — tas nonāk pie viesmīļa zālē vai virtuves planšetdatorā. Funkciju var ieslēgt vai izslēgt iestatījumos jebkurā laikā.",
      bullets: [
        "Grozs, komentāri un pasūtījuma nosūtīšana ar vienu pieskārienu.",
        "Pasūtījums uzreiz nonāk administrēšanas panelī, WhatsApp vai virtuves ekrānā.",
        "Funkcija tiek pārslēgta iestatījumos.",
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
