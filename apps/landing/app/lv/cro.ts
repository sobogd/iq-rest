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
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restorāni","Kafejnīcas","Bāri","Picērijas"],
    title: "Jūsu restorāns,",
    titleAccent: "pilnībā digitāls 5 minūtēs.",
    sub: "Pilnīga platforma moderna restorāna vadīšanai — skaista, viss vienuviet, bez tehniskām zināšanām.",
  },

  heroMicrocopy: "{count} restorāni · 14 dienas bez maksas · Bez kartes",
  seeIncluded: "Kas iekļauts",

  trust: [
    { kind: "num", value: 35, label: "Valodas" },
    { kind: "text", value: "24/7", label: "Rezervācijas" },
    { kind: "num", value: 5, suffix: " min", label: "Palaišana" },
    { kind: "count", label: "Restorāni" },
  ],

  bundle: {
    heading: "Viss, uz kā balstās jūsu restorāns.",
    headingAccent: "Vienā lietotnē.",
    sub: "Ēdienkarte, virtuve un rezervācijas vienuviet — moderni, ātri un veidots tam, kā restorāni patiešām strādā. Bez papildinājumiem, bez maksas par funkciju.",
  },

  benefits: [
    { Icon: Languages, tag: "Digitālā ēdienkarte", title: "Ēdienkarte, kas pārdod.", bullets: ["35 valodas ar MI","Premium dizains","Cenas uzreiz aktuālas"], image: "/landing/feature-design.webp", imageAlt: "Divi telefoni uz kafejnīcas galda: digitālās ēdienkartes sākuma ekrāns un kontaktu lapa ar karti" },
    { Icon: ChefHat, tag: "Virtuves ekrāns", title: "Gatavojiet ātrāk, nepalaidiet garām neko.", bullets: ["Tiešraidē ekrānā","Piezīmes un alergēni","Planšete vai telefons"], image: "/landing/feature-kds-cards.webp", imageAlt: "Planšete pie bāra rāda virtuves ekrānu ar pasūtījumiem pa galdiem" },
    { Icon: CalendarCheck, tag: "Rezervācijas", title: "Rezervācijas autopilotā.", bullets: ["Pašapkalpošanās rezervācija","Automātisks apstiprinājums","Kalendārs pa galdiem"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Divas planšetes rāda rezervāciju kalendāru: dienas skats pa galdiem un mēneša skats" },
    { Icon: Receipt, tag: "Pasūtījumi pie galda", title: "Pasūtījumi tieši uz virtuvi.", bullets: ["Viesis vai viesmīlis","Tieši uz virtuvi","Ieslēdziet jebkurā laikā"], image: "/landing/feature-orders-map.webp", imageAlt: "Planšete ar pasūtījumu ekrānu: pasūtījumu saraksts un zāles plāns ar krāsainiem galdiem." },
  ],

  seeDetails: "Skatīt vairāk",

  extras: {
    heading: "Un viss pārējais iekļauts.",
    items: [
      { Icon: ScanLine, label: "MI digitalizē jūsu papīra ēdienkarti 60 sekundēs" },
      { Icon: QrCode, label: "Unikāls QR kods katram galdam" },
      { Icon: Smartphone, label: "Viesiem nav vajadzīga lietotne — atveras pārlūkā" },
      { Icon: Globe, label: "Jūsu paša domēns ar SSL" },
      { Icon: BarChart3, label: "Pārdošanas analītika: ieņēmumi, top ēdieni, stundas" },
      { Icon: Palette, label: "Alergēnu un diētu birkas filtrēšanai" },
    ],
  },

  midCta: {
    heading: "Viena lietotne piecu vietā.",
    sub: "Vairs nav jāžonglē ar atsevišķiem rīkiem ēdienkartei, virtuvei un rezervācijām — viss vienuviet, jebkurā telefonā vai planšetē, bez instalēšanas.",
  },

  how: {
    heading: "Gatavs 5 minūtēs",
    sub: "Četri soļi. Bez instalēšanas, bez tehniskas iestatīšanas, bez kartes.",
    steps: [
      { n: "1", t: "Veids un nosaukums", d: "Vietas veids un nosaukums — tā ir visa reģistrācija." },
      { n: "2", t: "Pieslēdzieties", d: "E-pasts vai Google. Bez kartes." },
      { n: "3", t: "Pievienojiet ēdienkarti", d: "Ierakstiet to vai ļaujiet MI noskenēt papīra ēdienkarti." },
      { n: "4", t: "Esat tiešsaistē", d: "Ēdienkarte, virtuve un rezervācijas — gatavs." },
    ],
  },
};
