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
    verticals: ["Restoranai","Kavinės","Barai","Picerijos"],
    title: "Jūsų restoranas,",
    titleAccent: "skaitmeninis per 5 minutes.",
    sub: "Gražus skaitmeninis meniu, virtuvės ekranas ir rezervacijos visą parą — pilna platforma modernam restoranui.",
  },

  heroMicrocopy: "{count} restoranai · 14 dienų nemokamai · Be kortelės",
  seeIncluded: "Kas įskaičiuota",

  trust: [
    { kind: "num", value: 35, label: "Kalbos" },
    { kind: "text", value: "24/7", label: "Rezervacijos" },
    { kind: "num", value: 5, suffix: " min", label: "Paleidimas" },
    { kind: "count", label: "Restoranai" },
  ],

  bundle: {
    heading: "Viskas, kuo remiasi jūsų restoranas.",
    headingAccent: "Vienoje programėlėje.",
    sub: "Meniu, virtuvė ir rezervacijos vienoje vietoje — modernu, greita ir sukurta tam, kaip restoranai iš tikrųjų veikia. Jokių priedų, jokio mokesčio už funkciją.",
  },

  benefits: [
    { Icon: Languages, tag: "Skaitmeninis meniu", title: "Meniu, kuris parduoda.", bullets: ["35 kalbos su DI","Premium dizainas","Kainos iškart atnaujintos"], image: "/landing/feature-design.webp", imageAlt: "Du telefonai ant kavinės stalo: skaitmeninio meniu pasveikinimo ekranas ir kontaktų puslapis su žemėlapiu" },
    { Icon: ChefHat, tag: "Virtuvės ekranas", title: "Gaminkite greičiau, nieko nepraleiskite.", bullets: ["Tiesiogiai ekrane","Pastabos ir alergenai","Planšetė ar telefonas"], image: "/landing/feature-kds-cards.webp", imageAlt: "Planšetė prie baro rodo virtuvės ekraną su užsakymais pagal stalus" },
    { Icon: CalendarCheck, tag: "Rezervacijos", title: "Rezervacijos autopilotu.", bullets: ["Savitarnos rezervacija","Automatinis patvirtinimas","Kalendorius pagal stalus"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dvi planšetės rodo rezervacijų kalendorių: dienos rodinys pagal stalus ir mėnesio rodinys" },
    { Icon: Receipt, tag: "Užsakymai prie stalo", title: "Užsakymai tiesiai į virtuvę.", bullets: ["Svečias ar padavėjas","Tiesiai į virtuvę","Įjunkite bet kada"], image: "/landing/feature-orders-map.webp", imageAlt: "Planšetė su užsakymų ekranu: užsakymų sąrašas ir salės planas su spalvotais stalais." },
  ],

  seeDetails: "Daugiau",

  extras: {
    heading: "Ir visa kita įskaičiuota.",
    items: [
      { Icon: ScanLine, label: "DI suskaitmenina popierinį meniu per 60 sekundžių" },
      { Icon: QrCode, label: "Unikalus QR kodas kiekvienam stalui" },
      { Icon: Smartphone, label: "Svečiams nereikia programėlės — atsidaro naršyklėje" },
      { Icon: Globe, label: "Jūsų pačių domenas su SSL" },
      { Icon: BarChart3, label: "Pardavimų analitika: pajamos, populiariausi patiekalai, valandos" },
      { Icon: Palette, label: "Alergenų ir dietų žymos filtravimui" },
    ],
  },

  midCta: {
    heading: "Viena programėlė vietoj penkių.",
    sub: "Nebereikia žongliruoti atskirais įrankiais meniu, virtuvei ir rezervacijoms — viskas vienoje vietoje, bet kuriame telefone ar planšetėje, be diegimo.",
  },

  platform: {
    hardwareTitle: "Dirbkite su savo įranga",
    hardwareSub: "Niekada neverčiame pirkti įrangos iš mūsų. Naudokite telefonus, planšetes ir kompiuterius, kuriuos jau turite.",
    anywhereTitle: "Veikia bet kur",
    anywhereSub: "Telefonas, planšetė, nešiojamasis kompiuteris, PC. Android, iOS, Windows, Mac, Linux. Veikia bet kurioje šiuolaikinėje naršyklėje, be diegimo.",
  },

  activities: {
    heading: "Viena sistema,",
    headingAccent: "visas jūsų restoranas.",
    sub: "Greitesnis aptarnavimas, ramesnė virtuvė, mažesnės sąnaudos ir įspūdis, kurį svečias prisimena — viskas vienoje platformoje.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Prie stalo — svečiai",
        bullets: [
          "QR meniu 35 kalbomis",
          "Užsakymas nelaukiant padavėjo",
          "Padavėjo iškvietimas arba sąskaitos prašymas",
          "Stalo rezervacija visą parą",
        ],
      },
      {
        Icon: ChefHat,
        tag: "Virtuvėje",
        bullets: [
          "Užsakymai iškart pasirodo ekrane",
          "Stulpeliai ruošiama / paruošta / patiekta",
          "Alergenai ir pastabos paryškinti",
          "Planšetė ar telefonas — jokių popierinių kvitų",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Valdymas",
        bullets: [
          "Meniu ir kainų pakeitimai iškart",
          "DI vertimas vienu paspaudimu",
          "Pardavimų analitika ir ataskaitos",
          "Keli restoranai vienoje paskyroje",
        ],
      },
    ],
  },
};
