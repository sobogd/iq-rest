import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "lt", htmlDir: "ltr",
  meta: {
    title: "QR Meniu Restoranams — Tiesioginiai Užsakymai, Nulis Komisinių | IQ Rest",
    description: "Pabaiga popieriniams meniu ir maisto pristatymo programėlių komisiniams. QR meniu, tiesioginiai užsakymai, rezervacijos ir daugiakalbis tinklalapis. 14 dienų nemokamai, be kortelės.",
    canonical: "https://iq-rest.com/lt", ogLocale: "lt_LT",
    ogTitle: "QR Meniu Restoranams — Tiesioginiai Užsakymai, Nulis Komisinių",
    ogDescription: "QR meniu, tiesioginiai užsakymai, rezervacijos ir AI vertimas. Paruošta per 2 minutes. 14 dienų nemokamai — be kortelės.",
  },
  ctaText: "Pradėk nemokamai →", microcopy: "14 dienų nemokamai · Be kortelės · Atšauk bet kada",
  header: { navFeatures: "Funkcijos", navHow: "Kaip tai veikia", navPricing: "Kainos", navFaq: "FAQ", signIn: "Prisijungti", cta: "Pradėk nemokamai →" },
  hero: {
    verticals: ["Restoranai", "Kavinės", "Barai", "Viešbučiai", "Picerijos"],
    variants: [
      { headline: "Liaukis spausdinęs meniu.", headlineAccent: "Liaukis mokėjęs 30% pristatymo programėlėms.", sub: "QR meniu, tiesioginiai užsakymai, rezervacijos ir daugiakalbis tinklalapis. Paruošta per 2 minutes — be kortelės." },
      { headline: "Tavo restoranas nusipelno daugiau nei", headlineAccent: "popierinių meniu ir praleistų skambučių.", sub: "Tiesioginiai užsakymai, momentiniai meniu atnaujinimai ir rezervacijos 24/7. Sukonfigūruota per 2 minutes." },
      { headline: "Vienas QR kodas.", headlineAccent: "Nulis komisinių. Sudie popieriui.", sub: "QR meniu, internetiniai užsakymai ir rezervacijos — viskas vienoje vietoje. 14 dienų nemokamai, be kortelės." },
      { headline: "Gauk tiesioginius užsakymus.", headlineAccent: "Praleisk komisinį.", sub: "Svečiai nuskaito, užsako ir sumoka — tiesiai tau, be Wolt dalies. Paruošta per 2 minutes." },
      { headline: "Daugiau užsakymų. Daugiau rezervacijų.", headlineAccent: "Be popieriaus, be programėlių.", sub: "QR meniu + rezervacijos + daugiakalbis tinklalapis automatiniu pilotu. 14 dienų nemokamas bandymas." },
      { headline: "Turistai nesupranta meniu?", headlineAccent: "Išspręsta per 2 minutes.", sub: "AI verčia visą meniu į 35 kalbas. Plius QR užsakymai ir rezervacijos įtraukti." },
      { headline: "Iš popierinio meniu į QR kodą,", headlineAccent: "kol neatvėso espresas.", sub: "QR meniu, tiesioginiai užsakymai ir rezervacijos 24/7. Paruošta per 2 minutes — be kortelės." },
      { headline: "Gaivinančiai paprastas QR meniu.", headlineAccent: "Tyliai galingas viduje.", sub: "Tiesioginiai užsakymai, AI vertimas, rezervacijos ir tinklalapis — viskas vienu palietimu telefone." },
    ],
    painBullets: ["Be spaudos — kainas keisk akimirksniu", "Nulis komisinių — užsakymai tiesiai tau", "Be praleistų skambučių — rezervacijos 24/7", "35 kalbos — niekada neprarask turisto"],
    rating: "4,9 · daugiau nei 500 restoranų 30+ šalių",
  },
  features: {
    heading: "Viskas, ko reikia.", headingAccent: "Nieko nereikalingo.",
    sub: "Sukurta restoranams. Naudojama prie stalo.",
    items: [
      { Icon: ScanLine, title: "Pasilik 100% kiekvieno užsakymo", desc: "Svečiai nuskaito, užsako ir sumoka — tiesiai tau. Be programėlių atsiuntimo, be 30% pristatymo dalies. Kiekvienas užsakymas atkeliauja realiu laiku su staliuko numeriu į panelį." },
      { Icon: Languages, title: "Parduok turistams jų kalba", desc: "Vienas palietimas išverčia visą meniu į 35 kalbas. AI supranta kulinarinį kontekstą — svečiai užsako daugiau, kai tikrai supranta patiekalą." },
      { Icon: CalendarCheck, title: "Neprarask rezervacijų gamindamas", desc: "Svečiai rezervuoja 24/7, be skambučių. Auto arba rankinis patvirtinimas, el. paštas priminimai — mažiau neatvykimų, nulis streso." },
      { Icon: Palette, title: "Nepamirštama per 1 sekundę", desc: "Įdėk virtuvės video ar patiekalo nuotrauką kaip meniu foną. Svečiai nustoja slinkti. Tavo prekės ženklas išlieka." },
      { Icon: Smartphone, title: "Keisk per sekundes, ne per dienas", desc: "Kainos, nuotraukos, dienos pasiūlymas — iš telefono, tarp staliukų. Tiesiogiai svečiams iškart. Niekada daugiau spaudos." },
      { Icon: ListPlus, title: "Jei moki rašyti WhatsApp, mokėsi naudoti", desc: "Palietk patiekalui pridėti. Tempk pertvarkyti. Išjunk, kas pasibaigė. Be vadovų, be mokomųjų vaizdo įrašų, be mokymosi kreivės." },
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
    heading: "Tiesiogiai per mažiau nei 2 minutes",
    sub: "Keturi trumpi žingsniai. Be diegimo, be techninės konfigūracijos.",
    steps: [
      { n: "1", t: "Užsiregistruok", d: "El. paštas arba Google. Be kortelės. Atlikta per 10 sekundžių." },
      { n: "2", t: "Restorano pavadinimas", d: "Tiesiog įvesk pavadinimą. Pasirodo meniu viršuje." },
      { n: "3", t: "Pridėk pirmą patiekalą", d: "Kategorija, pavadinimas, kaina, nuotrauka. Tai ir viskas." },
      { n: "4", t: "Pasirink foną ir spausdink QR", d: "Pasirink foną. Paimk QR. Priklijuok ant staliukų." },
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
      { q: "Ar galiu valdyti kelis restoranus iš vienos paskyros?", a: "Taip. Pro planas leidžia kelis restoranus toje pačioje paskyroje — atskiri meniu, atskiri QR, atskira statistika, vienas prisijungimas. Persijungi dviem palietimais." },
      { q: "Kaip greitai keičiu kainas ir pridedu patiekalų?", a: "Akimirksniu. Pakeisk kainą telefone, svečiai mato per sekundes. Naujas patiekalas? Palietk, įrašyk, nuotrauka, paruošta — be perspausdinimo, be dizainerio laukimo." },
      { q: "Kiek kalbų palaikote?", a: "35 kalbas su įdiegtu AI vertimu. Vienas palietimas išverčia visą meniu, AI supranta kulinarinį kontekstą — pavadinimai ir aprašymai skamba natūraliai kiekviena kalba. Turistai užsako daugiau, kai tikrai supranta." },
    ],
  },
  finalCta: { heading: "Paruošta per 2 minutes.", headingAccent: "Nemokamai 14 dienų.", sub: "Be kortelės. Atšauk bet kada. Prisijunk prie 500+ restoranų jau IQ Rest." },
  footer: {
    featureLinks: [
      { href: "/lt/online-orders", label: "Internetiniai užsakymai" }, { href: "/lt/ai-translation", label: "AI vertimas" },
      { href: "/lt/reservations", label: "Rezervacijos" }, { href: "/lt/mobile-management", label: "Mobilus valdymas" },
      { href: "/lt/easy-menu", label: "Meniu redaktorius" }, { href: "/lt/custom-design", label: "Video ir foto fonai" },
      { href: "/lt/color-scheme", label: "Prekės ženklo spalvos" }, { href: "/lt/multilingual", label: "Daugiakalbis tinklalapis" },
      { href: "/lt/ai-images", label: "AI nuotraukų optimizavimas" }, { href: "/lt/analytics", label: "Statistika" },
      { href: "/lt/instant-setup", label: "Akimirksnio nustatymas" }, { href: "/lt/personal-support", label: "Asmeninė pagalba" },
    ],
    navLinks: [
      { href: "#pricing", label: "Kainos" }, { href: "#faq", label: "Klausimai" },
      { href: "/lt/contacts", label: "Kontaktai" }, { href: "/lt/changelog", label: "Naujienos" },
      { href: "/lt/languages", label: "Pakeisti kalbą" },
    ],
    legalLinks: [
      { href: "/lt/terms", label: "Sąlygos" }, { href: "/lt/privacy", label: "Privatumas" },
      { href: "/lt/cookies", label: "Slapukai" }, { href: "/sitemap.xml", label: "Svetainės žemėlapis" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Visos teisės saugomos.",
  },
};
