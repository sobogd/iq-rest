import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lt",
  slug: "staliuku-rezervacija",
  trackPrefix: "l_lt_bookings",

  meta: {
    title: "Staliukų rezervacija 24/7 restoranams | IQ Rest",
    description:
      "Staliukų rezervacija 24/7 restoranams: svečiai patys rezervuoja per QR meniu ar svetainę. Kalendorius pagal staliuką, automatiniai patvirtinimai ir priminimai. Nė vieno prarasto svečio. 14 dienų nemokamai.",
    canonical: "https://iq-rest.com/lt/staliuku-rezervacija",
    ogLocale: "lt_LT",
    ogTitle: "Staliukų rezervacija 24/7 — svečiai rezervuoja patys",
    ogDescription:
      "Svečiai rezervuoja staliukus per QR meniu ar svetainę. Kalendorius, automatiniai patvirtinimai, priminimai. Nė vieno prarasto svečio.",
    brandLine: "IQ Rest — Staliukų rezervacija restoranams",
  },

  hero: {
    headline: "Staliukų rezervacija 24/7 — svečiai rezervuoja patys.",
    sub: "Svečiai rezervuoja staliukus per QR meniu ar tiesioginę nuorodą. Kalendorius pagal staliuką, automatiniai patvirtinimai ir priminimai. Nė vieno prarasto svečio ir jokių skambučių piko valandomis.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Šeimininkė valdo rezervacijas iš planšetės prie restorano įėjimo",
  },

  scan: {
    heading: "Paleiskite staliukų rezervaciją",
    headingAccent: "per 5 minutes.",
    sub: "Prijunkite kalendorių, pridėkite staliukus su nuotraukomis ir talpa — svečiai pradeda rezervuoti tą pačią dieną.",
    cta: "Aktyvuoti rezervaciją",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Rezervacijos forma",
      heading: "Svečiai patys rezervuoja — pagal datą, laiką ir žmonių skaičių.",
      body: "Svečias atidaro QR meniu ar tiesioginę nuorodą, pasirenka datą, laiką ir žmonių skaičių — ir iš karto mato laisvus staliukus, kiekvienas su nuotrauka, aprašymu (terasa, prie lango, sofa prie baro) ir talpa. Patvirtinimas siunčiamas automatiškai el. paštu ir WhatsApp.",
      bullets: [
        "Staliuko pasirinkimas pagal nuotrauką, aprašymą ir talpą.",
        "Automatinis patvirtinimas ir priminimas valanda prieš apsilankymą.",
        "Minimalūs laukai formoje: vardas, telefonas, žmonių skaičius.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Svečias rezervuoja restorano staliuką iš telefono: data, laikas, žmonių skaičius ir staliuko pasirinkimas" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Rezervacijų kalendorius",
      heading: "Kalendorius pagal dieną ir staliuką — viskas iš pirmo žvilgsnio.",
      body: "Administravimo skydelis rodo rezervacijų kalendorių, suskirstytą pagal staliuką, dieną, savaitę ir mėnesį. Laisvi tarpai, užimti staliukai, patvirtintos ir nepatvirtintos rezervacijos viename ekrane. Veikia planšetėje salėje ir nešiojamajame kompiuteryje biure.",
      bullets: [
        "Dienos, savaitės ir mėnesio vaizdai.",
        "Suskirstymas pagal staliuką: kas, kada, kiek svečių.",
        "Rezervacijos perkėlimas, atšaukimas ar patvirtinimas vienu bakstelėjimu iš telefono.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Rezervacijų kalendorius IQ Rest administravimo skydelyje dviejose planšetėse: kasdieninis Gantt pagal staliukus ir mėnesio vaizdas" },
    },
  ],

  faq: {
    sub: "Ką restoratoriai klausia apie staliukų rezervaciją IQ Rest. Nerandate savo klausimo? Parašykite mums į WhatsApp.",
    items: [
      { q: "Ar galiu pasirinkti, kuriomis dienomis ir valandomis galima rezervuoti?", a: "Taip. Administravimo skydelyje galima nustatyti darbo valandas ir prieinamas savaitės dienas — sistema nerodys svečiams nepasiekiamų laikų. Galite uždaryti konkrečią datą (įmonės renginys, privati rezervacija) arba laikinai išjungti visą kalendorių." },
      { q: "Ar galiu įkelti nuotrauką kiekvienam staliukui?", a: "Taip. Kiekvienas staliukas gali turėti nuotrauką, aprašymą (terasa, prie lango, sofa prie baro) ir talpą. Svečias mato tikslų staliuką, kurį rezervuoja, ir priima informuotą sprendimą — tai mažina neįvykdytus lūkesčius." },
      { q: "Ar galiu išjungti rezervacijas konkrečiomis datomis?", a: "Taip. Kalendorius leidžia uždaryti konkrečias datas (šventes, privačius renginius, remontus) arba ištisas savaitės dienas. Tomis dienomis svečiai mato pranešimą „rezervacija laikinai nepasiekiama“." },
      { q: "Ar galiu pritaikyti, kokie laukai renkami iš svečio?", a: "Taip. Numatytasis rinkinys: vardas, telefonas, el. paštas, žmonių skaičius. Galite pridėti pasirinktinių laukų (proga, alergijos, specialūs prašymai) arba pašalinti nereikalingus, kad forma būtų kuo trumpesnė." },
      { q: "Ar galiu apriboti svečių skaičių staliukui?", a: "Taip. Kiekvienas staliukas turi „talpos“ nustatymą — sistema neleis 2 vietų staliuko rezervuoti 6 žmonėms. Didesniuose staliukuose galite nustatyti minimumą, kad mažos grupės nepasiimtų „aštuonių staliuko“ iš didesnių kompanijų." },
      { q: "Kaip sunku yra rezervacijos nustatymas?", a: "Trunka labai trumpai. Trys žingsniai: (1) pridėti staliukus su pavadinimais, nuotraukomis ir talpa, (2) aktyvuoti rezervacijos režimą nustatymuose, (3) pasidalinti nuoroda ar QR kodu su svečiais. Pilnas paleidimas per 5–10 minučių." },
      { q: "Ar galiu naudoti rezervacijos sistemą savo domene?", a: "Taip. Palaikome pasirinktinį domeną su SSL sertifikatu: svečiai rezervuoja jūsų restorano adresu (pvz., rezervacija.jusurestoranas.lt). Padedame su DNS nustatymu; procesas trunka 5–10 minučių." },
      { q: "Ar galiu konfigūruoti automatinį ar rankinį patvirtinimą?", a: "Taip, režimas nustatomas nustatymuose. Su automatiniu patvirtinimu svečias gauna patvirtinimą iškart po formos pateikimo ir rezervacija laikoma priimta. Su rankiniu patvirtinimu užklausa pasiekia administravimo skydelį su būsena „laukia patvirtinimo“ — vadovas peržiūri ir patvirtina arba atmeta. Rankinis režimas naudingas esant ribotam staliukų skaičiui ar griežtoms svečių politikoms." },
      { q: "Ar imate komisinį už rezervacijas?", a: "Ne. Staliukų rezervacija pilnai įtraukta į Pro planą — be procento nuo svečių, be mokesčio už laiko intervalą, be agregatorių komisinių. Fiksuotas mėnesio mokestis ir neribotos rezervacijos." },
    ],
  },
};
