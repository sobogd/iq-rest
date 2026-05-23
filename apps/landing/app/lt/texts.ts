import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "lt",
  htmlDir: "ltr",

  meta: {
    title: "QR meniu restoranams — Tiesioginiai užsakymai, nulis komisinio | IQ Rest",
    description:
      "Viskas vienoje platforma restoranams: skaitmeninis meniu, QR užsakymai, staliukų rezervacija ir virtuvės ekranas. Paleidimas per 5 minutes. 14 dienų nemokamai, be kortelės.",
    canonical: "https://iq-rest.com/lt",
    ogLocale: "lt_LT",
    ogTitle: "QR meniu restoranams — Tiesioginiai užsakymai, nulis komisinio",
    ogDescription:
      "Skaitmeninis meniu, QR užsakymai, staliukų rezervacija ir AI vertimas. Paleidimas per 5 minutes. 14 dienų nemokamai.",
  },

  ctaText: "Sukurti skaitmeninį meniu",
  demoText: "Žiūrėti demonstraciją",
  microcopy: "14 dienų nemokamai · Be kortelės · Atšaukite bet kada",

  header: {
    navFeatures: "Funkcijos",
    navHow: "Kaip veikia",
    navPricing: "Kainos",
    navFaq: "DUK",
    signIn: "Prisijungti",
    cta: "Sukurti meniu",
  },

  hero: {
    verticals: ["Restoranai", "Kavinės", "Barai", "Viešbučiai", "Picerijos"],
    headline: "Skaitmeninis meniu restoranui. Veikia per 5 minutes.",
    sub: "Skaitmeninis meniu jūsų restoranui per 5 minutes. Viskas įtraukta: redaktorius be kodo, AI atpažinimas spausdintam meniu, QR kodai staliukams ir tiesioginiai užsakymai be komisinio.",
    dynamicHeadlines: ["0 % komisinis.", "35 AI kalbos.", "Užsakymai internetu.", "Rezervacijos 24/7.", "Premium dizainas."],
    painBullets: [
      "0 % komisinis: kiekvienas užsakymas patenka tiesiai į jūsų restoraną.",
      "AI vertimas į 35 kalbas — turistai supranta meniu ir užsako daugiau.",
      "Rezervacija 24/7: svečiai patys rezervuoja staliukus, be skambučių piko valandomis.",
      "Lankstus kainų nustatymas: meniu pakeitimai pasiekia internetą per sekundes.",
    ],
    rating: "Daugiau nei 500 restoranų daugiau nei 30 šalių",
  },

  features: {
    heading: "Viskas, ko reikia.",
    headingAccent: "Nieko per daug.",
    sub: "Sukurta restoranams. Naudojama kasdien prie stalo, virtuvėje ir salėje.",
    items: [
      { Icon: Monitor, title: "Skaitmeninis meniu", desc: "Meniu naršyklėje su nuotraukomis, kainomis, alergenais ir aprašymais. Atnaujinamas realiu laiku iš telefono. Svečiai mato meniu savo kalba; restoranas taupo spausdinimui.", tag: "Skaitmeninis meniu", href: "/lt/skaitmeninis-meniu-restoranas" },
      { Icon: Receipt, title: "Užsakymų priėmimas: svečias ir padavėjas", desc: "QR kodas ant staliuko svečiui arba padavėjas priima užsakymą iš telefono — abu patenka tiesiai į virtuvę arba WhatsApp. Be komisinio, su staliuko numeriu kiekviename kvite.", tag: "Užsakymai", href: "/lt/uzsakymu-sistema-restoranas" },
      { Icon: CalendarCheck, title: "Staliukų rezervacija 24/7", desc: "Svečiai patys rezervuoja staliukus per svetainę ar QR meniu, kol jūs užimti salėje. Kalendorius pagal staliuką, automatiniai patvirtinimai ir priminimai. Nė vieno prarasto svečio.", tag: "Rezervacija", href: "/lt/staliuku-rezervacija" },
      { Icon: ChefHat, title: "Virtuvės ekranas (KDS)", desc: "Popieriniai kvitai nebereikalingi. Užsakymai iš salės patenka tiesiai į virėjo ekraną — stulpeliai „gaminama / paruošta / patiekta“, alergenai ir pastabos paryškinti spalvomis. Planšetėje ar telefone.", tag: "KDS", href: "/lt/virtuves-ekranas" },
    ],
  },

  founder: {
    eyebrow: "Sukurta restoratorių",
    quoteStart:
      "Su žmona valdėme savo kavinę ir iš pirmų lūpų žinome, kaip iš tikrųjų atrodo restorano diena — užsakymų priėmimas, rezervacijos, salės ir virtuvės srautas. Norėjome vieno įrankio: modernaus, lengvai paleidžiamo ir aiškaus iš pirmo žvilgsnio —",
    quoteAccent: "todėl pradėjome kurti platformą, kurią dabar plėtojame kitiems restoratoriams.",
    sign: "Bogdan Sokolov · įkūrėjas, buvęs kavinės savininkas",
    photoAlt: "Bogdan Sokolov, IQ Rest įkūrėjas",
  },

  how: {
    heading: "Veikia per 5 minutes",
    sub: "Keturi trumpi žingsniai. Be diegimo, be techninio nustatymo.",
    steps: [
      { n: "1", t: "Tipas ir pavadinimas", d: "Pasirinkite įstaigos tipą ir įveskite pavadinimą." },
      { n: "2", t: "Išsaugoti", d: "Įveskite el. paštą arba prisijunkite su Google." },
      { n: "3", t: "Meniu", d: "Pridėkite prekes rankiniu būdu arba įkelkite spausdintą meniu AI atpažinimui." },
      { n: "4", t: "Baigta", d: "Pasidalykite nuoroda arba QR kodu ir pradėkite priimti užsakymus." },
    ],
  },

  pricing: {
    badge: "Be komisinio · Be sutarčių",
    heading: "Vienas planas.",
    headingAccent: "Viskas įtraukta.",
    sub: "QR meniu, užsakymų priėmimas, AI vertimas, restorano svetainė ir rezervacija. Vienas skaidrus mėnesio mokestis.",
    monthlyLabel: "Per mėnesį",
    yearlyLabel: "Per metus",
    saveBadge: "Sutaupykite 25 %",
    perMonth: "per mėnesį",
    billedAnnually: "Metinis atsiskaitymas: {total}",
    youSave: "Sutaupote {amount}",
    trust: { secure: "Saugus mokėjimas per Stripe", noCommitment: "Be įsipareigojimo", quick: "Aktyvus per minutes", restaurants: "500+ restoranų" },
  },

  faq: {
    eyebrow: "Turite klausimų?",
    heading: "Dažnai užduodami",
    headingAccent: "klausimai.",
    sub: "Ką restoratoriai klausia prieš registruodamiesi. Nerandate savo klausimo? Parašykite mums į WhatsApp — atsako tikri žmonės, ne robotas.",
    whatsappCta: "Klauskite WhatsApp",
    whatsappPrefill: "Sveiki, turiu klausimą apie IQ Rest",
    items: [
      { q: "Ką apima bandomasis laikotarpis ir kas vyksta po to?", a: "Pilna prieiga prie visų funkcijų 14 dienų, be kortelės. Po 14 dienų sąskaita pristabdoma, jei nepridėta mokėjimo priemonė — niekada neapmokestiname automatiškai. Mokėjimą galite pridėti vėliau ir tęsti nuo ten, kur sustojote. Atšaukite bet kada vienu spustelėjimu." },
      { q: "Ar imate komisinį už užsakymus?", a: "Ne. Kiekvienas užsakymas iš QR meniu patenka tiesiai į restoraną — be procentų iš mūsų pusės, be agregatorių komisinių. Vienas fiksuotas mėnesio mokestis ir nieko daugiau." },
      { q: "Ar svečiams reikia programėlės, ar mums reikia techninių įgūdžių?", a: "Svečiams nereikia programėlės — jie nukreipia telefono kamerą į QR kodą ir meniu atsidaro naršyklėje. Restoranams taip pat nereikia techninių įgūdžių: administravimo skydelis veikia bet kurioje moderniojoje naršyklėje telefone, planšetėje ar nešiojamajame kompiuteryje. Kiekvienas veiksmas atliekamas spustelėjimu ir vilkimu, be kodo." },
      { q: "Kaip greitai keičiasi kainos ir pasirodo nauji patiekalai?", a: "Iškart. Pakeiskite kainą iš telefono — svečiai pamatys per sekundes. Naujas patiekalas užima kelis bakstelėjimus: pavadinimas, kaina, nuotrauka. Be perspausdinimo, be laukimo dizainerio." },
      { q: "Kiek kalbų palaikoma?", a: "35 kalbos su integruotu AI vertimu. Vienas bakstelėjimas ir visas meniu išverstas; AI supranta kulinarinį kontekstą — pavadinimai ir aprašymai skamba natūraliai bet kuria kalba. Turistai užsako su didesniu pasitikėjimu, kai iš tikrųjų supranta meniu." },
    ],
  },

  finalCta: {
    heading: "Veikia per 5 minutes.",
    headingAccent: "14 dienų nemokamai.",
    sub: "Be kortelės, atšaukite bet kada. Prisijunkite prie 500+ restoranų, kurie jau naudoja IQ Rest.",
  },

  scan: {
    heading: "Turite popierinį meniu ar PDF?",
    headingAccent: "AI suskaitmenina jį per 60 sekundžių.",
    sub: "Įkelkite nuotrauką ar dokumentą — AI automatiškai atpažįsta kategorijas, patiekalus ir kainas.",
    cta: "Skenuoti meniu →",
  },

  pricingHero: {
    chips: ["Be komisinio", "Be sutarčių", "14 dienų nemokamai"],
    heading: "Kainos.",
    headingAccent: "Be paslėptų mokesčių.",
    sub: "Vienas skaidrus mėnesio mokestis. Be procentų nuo užsakymų ir be agregatorių komisinių. Atšaukite prenumeratą bet kada.",
    popularBadge: "Populiarus",
    perMonthSuffix: "/mėn.",
    whenAnnualTemplate: "metinis atsiskaitymas · {total} € per metus",
    orMonthlyTemplate: "arba {price} €/mėn.",
    savingsTemplate: "sutaupykite {amount} € per metus",
    plans: {
      basic: {
        name: "Basic",
        tagline: "Meniu, QR užsakymai ir AI vertimas. Veikia per 5 minutes.",
        features: [
          "QR meniu kiekvienam staliukui",
          "Skaitmeninis meniu su nuotraukomis ir alergenais",
          "AI vertimas į 35 kalbas",
          "Užsakymai iš meniu (pasirinktinai)",
          "AI patiekalų nuotraukų generavimas",
          "Valdymas iš bet kurio telefono ar planšetės",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "Pilna restorano kontrolė: virtuvės ekranas ir rezervacijos.",
        features: [
          "Viskas iš Basic",
          "Virtuvės ekranas (KDS)",
          "Internetinė staliukų rezervacija 24/7",
          "Prioritetinis WhatsApp palaikymas",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/lt/skaitmeninis-meniu-restoranas", label: "Skaitmeninis meniu" },
      { href: "/lt/uzsakymu-sistema-restoranas", label: "Užsakymai" },
      { href: "/lt/staliuku-rezervacija", label: "Rezervacija" },
      { href: "/lt/virtuves-ekranas", label: "Virtuvės ekranas" },
    ],
    navLinks: [
      { href: "/lt/kainos", label: "Kainos" },
      { href: "#faq", label: "DUK" },
      { href: "/lt/languages", label: "Keisti kalbą" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Visos teisės saugomos.",
  },
};
