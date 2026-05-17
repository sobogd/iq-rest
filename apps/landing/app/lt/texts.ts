import { QrCode, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "lt", htmlDir: "ltr",
  meta: {
    title: "QR Meniu Restoranams — Tiesioginiai Užsakymai, Nulis Komisinių | IQ Rest",
    description: "Pabaiga popieriniams meniu ir maisto pristatymo programėlių komisiniams. QR meniu, tiesioginiai užsakymai, rezervacijos ir daugiakalbis tinklalapis. 14 dienų nemokamai, be kortelės.",
    canonical: "https://iq-rest.com/lt", ogLocale: "lt_LT",
    ogTitle: "QR Meniu Restoranams — Tiesioginiai Užsakymai, Nulis Komisinių",
    ogDescription: "QR meniu, tiesioginiai užsakymai, rezervacijos ir AI vertimas. Paruošta per 5 minučių. 14 dienų nemokamai — be kortelės.",
  },
  ctaText: "Išbandyti nemokamai",
  demoText: "Žiūrėti demo", microcopy: "14 dienų nemokamai · Be kortelės · Atšauk bet kada",
  header: { navFeatures: "Funkcijos", navHow: "Kaip tai veikia", navPricing: "Kainos", navFaq: "FAQ", signIn: "Prisijungti", cta: "Išbandyti nemokamai" },
  hero: {
    verticals: ["Restoranai", "Kavinės", "Barai", "Viešbučiai", "Picerijos"],
    headline: "QR meniu per 5 minutes.",
    sub: "Paruošta jūsų restorano svetainė — be programuotojų ir rangovų. Tiesioginiai užsakymai, rezervacijos ir svečių analitika vienoje prenumeratoje.",
    dynamicHeadlines: ["0% komisinių.", "35 kalbos su DI.", "Užsakymai internetu.", "Rezervacijos 24/7.", "Premium dizainas."],
    painBullets: ["0% komisinių: Visi užsakymai keliauja tiesiai jums.", "AI vertimas: 35 kalbos didesnėms turistų sąskaitoms.", "Rezervacijos 24/7: Pilna salė be papildomų skambučių.", "Lanksčios kainos: Atnaujinkite meniu per kelias sekundes."],
    rating: "Daugiau nei 500 restoranų 30+ šalių",
  },
  features: {
    heading: "Viskas, ko reikia.", headingAccent: "Nieko nereikalingo.",
    sub: "Sukurta restoranams. Naudojama prie stalo.",
    items: [
      
      { Icon: QrCode, title: "Užsakymai nuo stalelio", desc: "Užsakymai akimirksniu ateina į WhatsApp arba pultą su stalo numeriu. Greitesnis aptarnavimas.", tag: "Tiesioginiai užsakymai", href: "/lt/internetine-uzsakymu-sistema-restoranui" },
      { Icon: Languages, title: "AI vertėjas (35 kalbos)", desc: "Mūsų AI supranta gastronomiją. Turistai užsisako 20% daugiau, kai supranta meniu sudėtį.", tag: "DI vertimas" },
      { Icon: CalendarCheck, title: "Stalų rezervacija", desc: "Sistemos priima rezervacijas, kol jūs virtuvėje. Nė vieno prarasto kliento.", tag: "Rezervacijos" },
      { Icon: Palette, title: "Modernus dizainas", desc: "Video fonai ir skanios nuotraukos. Jūsų meniu atrodo prabangiai ir žadina apetitą.", tag: "Pritaikytas dizainas" },
      { Icon: Smartphone, title: "Greitas redaktorius", desc: "Valdykite stop-sąrašą ir kainas tiesiai iš telefono. Pakeitimai svečiams matomi iškart.", tag: "Meniu redaktorius" },
      { Icon: ChefHat, title: "Greitai: Virtuvės ekranas", desc: "Pamirškite popierinius čekius. Užsakymai iš salės eina tiesiai į virėjo ekraną.", tag: "Netrukus" },
    
    ],
  },
  founder: {
    eyebrow: "Sukūrė restoratorius",
    quoteStart: "Su žmona atidarėme kavinę ir savaites ieškojome sistemos, kuri tvarkytų užsakymus internetu, rezervacijas ir atrodytų moderniai. Viskas, ką bandėme, buvo gremėzdiška, negraži arba trūko pusės funkcijų —",
    quoteAccent: "todėl pasistatėme tai, ko patys norėjome.",
    sign: "Bogdan Sokolov · įkūrėjas, buvęs kavinės savininkas",
    photoAlt: "Bogdan, IQ Rest įkūrėjas",
  },
  how: {
    heading: "Tiesiogiai per mažiau nei 5 minučių",
    sub: "Keturi trumpi žingsniai. Be diegimo, be techninės konfigūracijos.",
    steps: [
      { n: "1", t: "Tipas ir pavadinimas", d: "Pasirink tipą ir įvesk pavadinimą." },
      { n: "2", t: "Išsaugoti", d: "El. paštas arba prisijungimas per Google." },
      { n: "3", t: "Meniu", d: "Sukurk pats arba nuskaityk popierinį." },
      { n: "4", t: "Paruošta", d: "Žiūrėk, dalykis ir priimk užsakymus." },
    ],
  },
  pricing: {
    badge: "Nulis komisinių · Be sutarčių",
    heading: "Vienas planas.", headingAccent: "Viskas įtraukta.",
    sub: "QR meniu, užsakymai, AI vertimas, restorano tinklalapis ir rezervacijos. Viena paprasta kaina.",
    monthlyLabel: "Mėnesinis", yearlyLabel: "Metinis", saveBadge: "Sutaupyk 25%", perMonth: "per mėnesį",
    billedAnnually: "Metinis sąskaita {total}", youSave: "Sutaupai {amount}",
    trust: { secure: "Saugus mokėjimas su Stripe", noCommitment: "Be įsipareigojimų", quick: "Aktyvus per minutes", restaurants: "500+ restoranų" },
  },
  faq: {
    eyebrow: "Klausimai?", heading: "Dažniausiai užduodami", headingAccent: "klausimai.",
    sub: "Ką restoranų savininkai klausia prieš registruodamiesi. Nematai savo? Rašyk WhatsApp — atsako tikri žmonės.",
    whatsappCta: "Klausk WhatsApp", whatsappPrefill: "Sveiki, turiu klausimą apie IQ Rest",
    items: [
      { q: "Ką apima nemokamas bandymas ir kas po to?", a: "14 dienų pilna prieiga, be kortelės. Po 14 dienų paskyra sustabdoma, jei nepridėsi mokėjimo būdo — niekada nesinuskaitome automatiškai. Vėliau pridėk mokėjimą, kad atnaujintum. Atšauk vienu paspaudimu." },
      { q: "Ar imate komisinį nuo užsakymų?", a: "Nulį. Kiekvienas užsakymas iš tavo QR meniu eina tiesiai tau — be mūsų dalies, be Wolt / Bolt Food mokesčių. Viena fiksuota mėnesio kaina, ir viskas." },
      { q: "Ar svečiams reikia programėlės? Ar man reikia techninių įgūdžių?", a: "Be programėlių svečiams — nuskaito QR kamera, meniu atsidaro naršyklėje. Be techninių įgūdžių tau — visas panelis veikia telefone, palietk pridėti, tempk pertvarkyti, tokia visa kreivė." },
      { q: "Kaip greitai keičiu kainas ir pridedu patiekalų?", a: "Akimirksniu. Pakeisk kainą telefone, svečiai mato per sekundes. Naujas patiekalas? Palietk, įrašyk, nuotrauka, paruošta — be perspausdinimo, be dizainerio laukimo." },
      { q: "Kiek kalbų palaikote?", a: "35 kalbas su įdiegtu AI vertimu. Vienas palietimas išverčia visą meniu, AI supranta kulinarinį kontekstą — pavadinimai ir aprašymai skamba natūraliai kiekviena kalba. Turistai užsako daugiau, kai tikrai supranta." },
    ],
  },
  finalCta: { heading: "Paruošta per 5 minučių.", headingAccent: "Nemokamai 14 dienų.", sub: "Be kortelės. Atšauk bet kada. Prisijunk prie 500+ restoranų jau IQ Rest." },
  scan: {
    heading: "Popierinis meniu ar PDF?",
    headingAccent: "DI suskaitmenina jį per 60 sekundžių.",
    sub: "Įkelk — DI atpažįsta kategorijas, patiekalus ir kainas.",
    cta: "Skenuoti meniu →",
  },
  footer: {
    featureLinks: [
      { href: "/lt/internetine-uzsakymu-sistema-restoranui", label: "Internetinė užsakymų sistema" }, { href: "/lt/ai-translation", label: "AI vertimas" },
      { href: "/lt/reservations", label: "Rezervacijos" }, { href: "/lt/mobile-management", label: "Mobilus valdymas" },
      { href: "/lt/easy-menu", label: "Meniu redaktorius" }, { href: "/lt/custom-design", label: "Video ir foto fonai" },
      { href: "/lt/color-scheme", label: "Prekės ženklo spalvos" }, { href: "/lt/multilingual", label: "Daugiakalbis tinklalapis" },
      { href: "/lt/ai-images", label: "AI nuotraukų optimizavimas" }, { href: "/lt/analytics", label: "Statistika" },
      { href: "/lt/instant-setup", label: "Akimirksnio nustatymas" }, { href: "/lt/personal-support", label: "Asmeninė pagalba" },
    ],
    navLinks: [
      { href: "#pricing", label: "Kainos" }, { href: "#faq", label: "Klausimai" },
      { href: "/lt/languages", label: "Pakeisti kalbą" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Visos teisės saugomos.",
  },
};
