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
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restoranai","Kavinės","Barai","Picerijos"],
    title: "Restoranas skaitmeninis",
    titleAccent: "per 5 min",
    sub: "Skaitmeninis meniu, virtuvės ekranas ir rezervacija 24/7 — viskas, ko reikia restoranui, per 5 minutes.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restoranai" },
      { icon: "cafe", label: "Kavinės" },
      { icon: "bar", label: "Barai" },
      { icon: "pizza", label: "Picerijos" },
    ],
    title: "Viskas, ko reikia",
    titleAccent: "jūsų restoranui!",
    sub: "Sutvarkykite procesus per 10 minučių: paleiskite internetinį meniu, optimizuokite virtuvės darbą ir sekite staliukų užimtumą.",
    primaryLabel: "Pradėti nemokamai",
    demoLabel: "Žiūrėti demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Planšetė su virtuvės ekranu: užsakymai pagal staliukus stulpeliuose su būsenomis" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Planšetė su rezervacijų kalendoriumi: mėnesio vaizdas ir patvirtinimo laukiančios rezervacijos" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefonas su restorano svetainės pagrindiniu puslapiu: nuotrauka, rezervacijos ir internetinis meniu" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefonas su patiekalo puslapiu: nuotrauka, kaina ir alergenų žymos" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Paleidimas per 10 minučių", sub: "Be brangios įrangos ir ilgo diegimo" },
    { Icon: MessagesSquare, title: "Greita pagalba", sub: "Pokalbiuose atsakome per kelias valandas" },
    { Icon: Globe, title: "{count} įstaigų pasirinkimas", sub: "Mumis pasitiki restoranai ir kavinės daugiau nei 15 šalių" },
    { Icon: Palette, title: "100 % jūsų prekės ženklas", sub: "Dizainą ir sąsają pritaikome jūsų įstaigos stiliui" },
  ],

  menu: {
    heading: "Svetainė ir skaitmeninis meniu",
    sub: {
      link: "Daugiau nei QR meniu!",
      rest: " Gaukite visavertę svetainę su unikaliu dizainu, kontaktais ir staliukų rezervacija.",
    },
    moreLabel: "Sužinoti daugiau",
    mockupAlt: "Du telefonai: restorano svetainės pagrindinis puslapis ir patiekalo puslapis",
    bullets: [
      { Icon: Languages, title: "Automatinis vertimas į 35 kalbas", sub: "Aptarnaukite užsienio svečius be kalbos barjero — automatinis vertimas padarys viską" },
      { Icon: ClipboardList, title: "Užsakymai tiesiai nuo staliuko", sub: "Supaprastinkite aptarnavimą: priimkite užsakymus nuo staliukų greitai ir be padavėjo" },
      { Icon: WheatOff, title: "Alergenai ir dietos", sub: "Žymėkite alergenus ir pomėgius (veganiška, aštru), kad svečiai rinktųsi lengvai ir saugiai" },
    ],
  },

  reservations: {
    heading: "Staliukų rezervacija",
    sub: {
      link: "Išmani staliukų rezervacija!",
      rest: " Automatinė rezervacijų sistema, kuri pati seka laisvus staliukus ir jūsų grafiką.",
    },
    moreLabel: "Sužinoti daugiau",
    mockupAlt: "Planšetė su rezervacijų kalendoriumi: staliukai pagal dienas ir laiko intervalus",
    bullets: [
      { Icon: CalendarCheck, title: "Aiškus rezervacijų žemėlapis", sub: "Vaizdus grafikas pagal dienas ir staliukus — laisvos vietos matomos iš karto" },
      { Icon: SlidersHorizontal, title: "Lankstūs nustatymai", sub: "Nustatykite darbo laiką, intervalų trukmę, staliukų nuotraukas ir rinkite svečių pageidavimus" },
      { Icon: Users, title: "Svečių srauto valdymas", sub: "Pasirinkite patogų rezervacijų režimą ir visiškai kontroliuokite svečių srautą" },
    ],
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
          "Unikalus QR kodas kiekvienam stalui",
          "Svečiams nereikia programėlės — atsidaro naršyklėje",
          "Alergenų ir dietų žymos filtravimui",
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
          "DI suskaitmenina popierinį meniu per 60 sekundžių",
          "Jūsų pačių domenas su SSL",
        ],
      },
    ],
  },
};
