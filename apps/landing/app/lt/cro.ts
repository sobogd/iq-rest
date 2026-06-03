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
    titleAccent: "visiškai skaitmeninis per 5 minutes.",
    sub: "Pilna platforma moderniam restoranui valdyti — graži, viskas vienoje vietoje, be techninių žinių.",
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
    { Icon: Receipt, tag: "Užsakymai prie stalo", title: "Užsakymai tiesiai į virtuvę.", bullets: ["Svečias ar padavėjas","Tiesiai į virtuvę","Įjunkite bet kada"], image: "/landing/feature-orders.webp", imageAlt: "Padavėjas priima užsakymą prie stalo telefonu, jis patenka į virtuvės ekraną" },
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

  how: {
    heading: "Paruošta per 5 minutes",
    sub: "Keturi žingsniai. Be diegimo, be techninio nustatymo, be kortelės.",
    steps: [
      { n: "1", t: "Tipas ir pavadinimas", d: "Įstaigos tipas ir pavadinimas — tai visa registracija." },
      { n: "2", t: "Prisijunkite", d: "El. paštas arba Google. Be kortelės." },
      { n: "3", t: "Pridėkite meniu", d: "Įveskite jį arba leiskite DI nuskaityti popierinį meniu." },
      { n: "4", t: "Esate gyvai", d: "Meniu, virtuvė ir rezervacijos — paruošta." },
    ],
  },
};
