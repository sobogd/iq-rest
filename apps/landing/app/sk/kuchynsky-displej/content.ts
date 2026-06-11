import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sk",
  slug: "kuchynsky-displej",
  trackPrefix: "l_sk_kds",

  meta: {
    title: "Kuchynský displej (KDS) pre reštaurácie | IQ Rest",
    description:
      "Kuchynský displej (KDS) pre reštaurácie: objednávky zo sály a z QR menu dorazia okamžite na obrazovku šéfkuchára. Stĺpce podľa stola, statusy Čaká / Pripravuje sa / Hotové / Podané, filtre podľa zóny. Funguje na tablete alebo telefóne.",
    canonical: "https://iq-rest.com/sk/kuchynsky-displej",
    ogLocale: "sk_SK",
    ogTitle: "Kuchynský displej (KDS) — Objednávky na obrazovke šéfkuchára",
    ogDescription:
      "Objednávky zo sály na obrazovke šéfkuchára. Stĺpce podľa stola, statusy a časovač. Jedno ťuknutie mení status.",
    brandLine: "IQ Rest — Kuchynský displej",
  },

  hero: {
    headline: "Kuchynský displej: objednávky rovno na obrazovku šéfkuchára.",
    cta: "Nastaviť kuchynský displej",
    sub: "Papierové bločky už nepotrebujete. Objednávky zo sály alebo z QR menu dorazia okamžite na kuchynskú obrazovku — s poznámkami, alergénmi a časovačom. Jedno ťuknutie mení status. Funguje na tablete pri výdajnom okne alebo na smartfóne vo vrecku šéfkuchára.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionálna kuchyňa s tabletom na mosadznom stojane zobrazujúcim kuchynský displej s aktívnymi objednávkami",
  },

  scan: {
    heading: "Nastavte kuchynský displej",
    headingAccent: "za 5 minút.",
    sub: "Nahrajte papierové menu alebo PDF — AI rozpozná jedlá, kategórie a alergény. Pripojte tablet v kuchyni a začnite prijímať objednávky.",
    cta: "Skenovať menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Ovládanie a filtre",
      heading: "Niekoľko obrazoviek podľa zóny: kuchyňa a bar.",
      body: "Umiestnite samostatné tablety na horúcu linku, k baru alebo k cukrárni — každá obrazovka zobrazí iba jedlá, ktoré tam patria. Filtre podľa statusu (Čaká / Pripravuje sa / Hotové / Podané) a kategórie odstránia šum: kuchár vidí len to, čo je dôležité pre jeho stanovište.",
      bullets: [
        "Niekoľko KDS obrazoviek s filtrami podľa kategórie.",
        "Filter statusu: zobraziť iba Pripravuje sa a Hotové.",
        "Každá zóna vidí iba vlastný tok objednávok.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet na mosadznom stojane pri výdajnom okne kuchyne — KDS s filtrom statusu" },
    },
    {
      icon: Timer,
      eyebrow: "Karty a časovač",
      heading: "Jedno ťuknutie mení status. Poznámky a alergény farebne zvýraznené.",
      body: "Karta jedla ukazuje vybrané varianty (bez cibule, dobre prepečené), poznámku hosťa, alergény a časovač od okamihu vytvorenia objednávky. Ťuknite na kartu a status sa zmení na ďalší: Čaká → Pripravuje sa → Hotové → Podané. Zoznam sa automaticky triedi podľa priority.",
      bullets: [
        "Ťuknutie na kartu — okamžitá zmena statusu.",
        "Varianty, poznámky a alergény farebne zvýraznené.",
        "Triedenie podľa priority: položky čakajúce dlhšie sa posúvajú nahor.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet na mosadznom stojane na barovom pulte — KDS s kartami objednávok podľa stola" },
    },
  ],

  faq: {
    sub: "Čo sa reštaurátori pýtajú o kuchynskom displeji v IQ Rest. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
    items: [
      { q: "Aké statusy jedál sú v kuchyni?", a: "Štyri statusy s rôznymi farbami kariet: Čaká (sivá) — objednávka je prijatá a čaká; Pripravuje sa (oranžová) — jedlo sa pripravuje; Hotové (modrá) — pripravené na podávanie; Podané (zelená) — odovzdané hosťovi. Ťuknutie na kartu ju posunie do ďalšieho statusu, bez menu alebo potvrdení." },
      { q: "Môžem prevádzkovať niekoľko KDS obrazoviek v rôznych zónach?", a: "Áno. Jeden tablet na horúcej linke, druhý pri bare, tretí v cukrárni — každý s vlastným filtrom kategórie. Všetky obrazovky sú synchronizované v reálnom čase: status zmenený na jednej obrazovke sa aktualizuje všade." },
      { q: "Aký hardvér potrebujem na spustenie KDS?", a: "KDS je webová aplikácia, ktorá beží v ľubovoľnom modernom prehliadači. Veľká kuchyňa — tablet na mosadznom stojane pri výdajnom okne alebo televízor na stene. Malá prevádzka — smartfón šéfkuchára. Žiadny špeciálny hardvér, žiadna inštalácia: otvorte odkaz a prihláste sa do účtu." },
      { q: "Odkiaľ prichádzajú objednávky na kuchynskú obrazovku?", a: "Zo všetkých zdrojov: hosť, ktorý objednal cez QR menu pri stole; čašník, ktorý prijal objednávku z telefónu; hosť, ktorý objednal z webu. Všetky dorazia na KDS s označením zdroja a číslom stola. Žiadne ručné prevody z POS." },
      { q: "Čo je zobrazené na karte objednávky?", a: "Názov jedla, vybrané modifikátory (bez cibule, dobre prepečené, pridať omáčku), komentár hosťa, zvýraznené alergény, status (Čaká / Pripravuje sa / Hotové / Podané) a časovač, ako dlho jedlo čaká. Karty sú zoradené podľa priority: čím dlhšie čakanie, tým vyššie v stĺpci." },
      { q: "Môžem karty na obrazovke filtrovať?", a: "Áno. Dva filtre: podľa statusu (napr. zobraziť iba Čaká a Pripravuje sa, skryť Podané) a podľa kategórie (iba nápoje na bare, iba hlavné jedlá v kuchyni). Nastavenia sa ukladajú pre každé zariadenie — každá zóna si drží vlastnú sadu." },
    ],
  },
};
