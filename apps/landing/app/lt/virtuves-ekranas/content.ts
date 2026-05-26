import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "lt",
  slug: "virtuves-ekranas",
  trackPrefix: "l_lt_kds",

  meta: {
    title: "Virtuvės ekranas (KDS) restoranams | IQ Rest",
    description:
      "Virtuvės ekranas (KDS) restoranams: užsakymai iš salės ir QR meniu iškart pasiekia virėjo ekraną. Stulpeliai pagal staliuką, būsenos Laukia / Ruošiama / Paruošta / Patiekta, filtrai pagal zoną. Veikia planšetėje ar telefone.",
    canonical: "https://iq-rest.com/lt/virtuves-ekranas",
    ogLocale: "lt_LT",
    ogTitle: "Virtuvės ekranas (KDS) — Užsakymai virėjo ekrane",
    ogDescription:
      "Užsakymai iš salės virėjo ekrane. Stulpeliai pagal staliuką, būsenos ir laikmatis. Vienas bakstelėjimas keičia būseną.",
    brandLine: "IQ Rest — Virtuvės ekranas",
  },

  hero: {
    headline: "Virtuvės ekranas: užsakymai tiesiai į virėjo ekraną.",
    cta: "Nustatyti virtuvės ekraną",
    sub: "Popieriniai kvitai nebereikalingi. Užsakymai iš salės ar QR meniu iškart pasiekia virtuvės ekraną — su pastabomis, alergenais ir laikmačiu. Vienas bakstelėjimas keičia būseną. Veikia planšetėje prie išdavimo lango ar išmaniajame telefone virėjo kišenėje.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionali virtuvė su planšetė ant žalvarinio stovo, rodančia virtuvės ekraną su aktyviais užsakymais",
  },

  scan: {
    heading: "Nustatykite virtuvės ekraną",
    headingAccent: "per 5 minutes.",
    sub: "Įkelkite popierinį meniu ar PDF — AI atpažįsta patiekalus, kategorijas ir alergenus. Prijunkite planšetę virtuvėje ir pradėkite priimti užsakymus.",
    cta: "Skenuoti meniu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Valdikliai ir filtrai",
      heading: "Keli ekranai pagal zoną: virtuvė ir baras.",
      body: "Padėkite atskiras planšetes prie karštos linijos, bare ar konditerijoje — kiekvienas ekranas rodo tik patiekalus, kurie jam priklauso. Filtrai pagal būseną (Laukia / Ruošiama / Paruošta / Patiekta) ir kategoriją pašalina triukšmą: virėjas mato tik tai, kas svarbu jo postui.",
      bullets: [
        "Keli KDS ekranai su kategorijų filtrais.",
        "Būsenos filtras: rodyti tik Ruošiama ir Paruošta.",
        "Kiekviena zona mato tik savo užsakymų srautą.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Planšetė ant žalvarinio stovo prie virtuvės išdavimo lango — KDS su būsenos filtru" },
    },
    {
      icon: Timer,
      eyebrow: "Kortelės ir laikmatis",
      heading: "Vienas bakstelėjimas keičia būseną. Pastabos ir alergenai paryškinti spalvomis.",
      body: "Patiekalo kortelė rodo pasirinktas parinktis (be svogūnų, gerai iškepta), svečio pastabą, alergenus ir laikmatį nuo užsakymo pateikimo momento. Bakstelėkite kortelę ir būsena pereina į kitą: Laukia → Ruošiama → Paruošta → Patiekta. Sąrašas rūšiuojamas pagal prioritetą automatiškai.",
      bullets: [
        "Bakstelėjimas ant kortelės — momentinis būsenos pakeitimas.",
        "Parinktys, pastabos ir alergenai paryškinti spalvomis.",
        "Prioriteto rūšiavimas: ilgiau laukiantys elementai kyla į viršų.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Planšetė ant žalvarinio stovo ant baro prekystalio — KDS su užsakymo kortelėmis pagal staliuką" },
    },
  ],

  faq: {
    sub: "Ką restoratoriai klausia apie virtuvės ekraną IQ Rest. Nerandate savo klausimo? Parašykite mums į WhatsApp.",
    items: [
      { q: "Kokios patiekalų būsenos yra virtuvėje?", a: "Keturios būsenos su skirtingomis kortelės spalvomis: Laukia (pilka) — užsakymas priimtas ir laukia; Ruošiama (oranžinė) — patiekalas ruošiamas; Paruošta (mėlyna) — paruošta patiekimui; Patiekta (žalia) — pristatyta svečiui. Kortelės bakstelėjimas perkelia ją į kitą būseną, be meniu ar patvirtinimų." },
      { q: "Ar galiu paleisti kelis KDS ekranus skirtingose zonose?", a: "Taip. Viena planšetė prie karštos linijos, kita bare, trečia konditerijoje — kiekviena su savo kategorijos filtru. Visi ekranai sinchronizuojami realiu laiku: viename ekrane pakeista būsena atnaujinama visur." },
      { q: "Kokios įrangos man reikia KDS paleidimui?", a: "KDS yra žiniatinklio programa, veikianti bet kurioje moderniojoje naršyklėje. Didelė virtuvė — planšetė ant žalvarinio stovo prie išdavimo lango arba televizorius ant sienos. Maža vieta — virėjo išmanusis telefonas. Be specialios įrangos, be diegimo: atidarykite nuorodą ir prisijunkite prie paskyros." },
      { q: "Iš kur ateina užsakymai į virtuvės ekraną?", a: "Iš visų šaltinių: svečias, kuris užsakė per QR meniu prie staliuko; padavėjas, kuris priėmė užsakymą iš savo telefono; svečias, kuris pateikė užsakymą iš svetainės. Visi pasiekia KDS su šaltinio žyma ir staliuko numeriu. Be rankinio perdavimo iš POS." },
      { q: "Kas rodoma užsakymo kortelėje?", a: "Patiekalo pavadinimas, pasirinkti modifikatoriai (be svogūnų, gerai iškepta, pridėti padažą), svečio komentaras, paryškinti alergenai, būsena (Laukia / Ruošiama / Paruošta / Patiekta) ir laikmatis, rodantis, kiek laiko patiekalas laukia. Kortelės rūšiuojamos pagal prioritetą: kuo ilgesnis laukimas, tuo aukščiau stulpelyje." },
      { q: "Ar galiu filtruoti korteles ekrane?", a: "Taip. Du filtrai: pagal būseną (pvz., rodyti tik Laukia ir Ruošiama, slėpti Patiekta) ir pagal kategoriją (tik gėrimai bare, tik pagrindiniai patiekalai virtuvėje). Nustatymai išsaugomi pagal įrenginį — kiekviena zona laiko savo rinkinį." },
    ],
  },
};
