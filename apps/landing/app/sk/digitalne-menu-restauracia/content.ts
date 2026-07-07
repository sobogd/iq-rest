import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sk",
  slug: "digitalne-menu-restauracia",
  trackPrefix: "l_sk_digital",
  featureHeading: {
    heading: "Viac než len menu",
    sub: "Všetko, čo premení QR menu na službu pre vašu sálu aj kuchyňu.",
  },

  meta: {
    title: "Digitálne menu pre reštaurácie | IQ Rest",
    description:
      "Digitálne menu pre reštaurácie: online jedálny lístok s fotografiami, alergénmi, AI prekladom a okamžitými aktualizáciami cien. 14 dní zadarmo, bez karty.",
    canonical: "https://iq-rest.com/sk/digitalne-menu-restauracia",
    ogLocale: "sk_SK",
    ogTitle: "Digitálne menu pre reštaurácie",
    ogDescription:
      "Online verzia papierového menu — fotografie, alergény, AI preklad, aktualizácie v reálnom čase.",
    brandLine: "IQ Rest — Digitálne menu pre reštaurácie",
  },

  hero: {
    headline: "Digitálne menu,\nktoré vie všetko",
    cta: "Vytvoriť digitálne menu",
    sub: "Fotky, alergény a preklad do 35 jazykov. Plus objednávky, WhatsApp a rezervácie stolov — všetko v jednom IQ Rest.",
  },

  scan: {
    heading: "Máte papierové menu alebo PDF?",
    headingAccent: "AI ho digitalizuje za 60 sekúnd.",
    sub: "Nahrajte fotografiu alebo dokument — AI rozpozná kategórie, jedlá a ceny automaticky.",
    cta: "Skenovať menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Preklad s AI",
      heading: "Menu v 35 jazykoch",
      body: "Jeden QR, 35 jazykov. AI prekladá s kulinárskym kontextom, takže každé jedlo znie prirodzene. Turisti objednávajú s istotou.",
      bullets: [
        "35 jazykov v tarife",
        "Kulinárska AI, nie Google",
        "Zmena jazyka jedným ťuknutím",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dvaja hostia čítajú rovnaké digitálne menu v rôznych jazykoch na svojich telefónoch" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergény",
      heading: "Alergény a diéty pri jedlách",
      body: "Označte lepok, laktózu, orechy, vegán aj bezlepok. Hostia si menu vyfiltrujú podľa diéty a objednávajú bez starostí.",
      bullets: [
        "14 kategórií alergénov",
        "Štítky vegán a bezlepok",
        "Hostia filtrujú podľa diéty",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Hosť filtruje menu podľa alergénov na telefóne, zatiaľ čo majiteľ upravuje zoznam alergénov na tablete" },
    },
    {
      icon: Palette,
      eyebrow: "Dizajn a značka",
      heading: "Prémiové menu na vašej doméne",
      body: "Video úvodná obrazovka, vlastný dizajn a kontaktná stránka s mapou a sieťami — na vašej vlastnej doméne, nie PDF.",
      bullets: [
        "Video a prémiový dizajn",
        "Vaša doména s SSL",
        "Kontakty, mapa a siete",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefóny na stole v kaviarni: domovská obrazovka menu s videopozadím a kontaktná stránka s mapou" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Objednávky",
      heading: "Objednávky online, nulová provízia",
      body: "Hostia objednávajú z menu alebo rovno na váš WhatsApp — dorazí do sály či kuchyne, s 0 % z tržieb.",
      bullets: [
        "Z menu alebo z WhatsApp",
        "Do sály či kuchyne, 0 %",
        "Prepnete v nastaveniach",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefóny na stole: košík s objednávkou a potvrdenie o odoslaní objednávky" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervácie",
      heading: "Rezervácie stolov, 24/7",
      body: "Hostia si rezervujú stôl sami cez menu alebo odkaz, vy vidíte kalendár po stoloch a potvrdíte automaticky či ručne.",
      bullets: [
        "Hostia si rezervujú sami",
        "Kalendár po stoloch",
        "Auto aj ručné potvrdenie",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Správa",
      heading: "Spravujte odkiaľkoľvek",
      body: "Administrácia beží v každom prehliadači — telefón, tablet alebo PC. Nič na inštaláciu a základné menu je online za pár minút.",
      bullets: [
        "Akékoľvek zariadenie a prehliadač",
        "Nič na inštaláciu",
        "Online za pár minút",
      ],
    },
  ],

  faq: {
    sub: "Čo sa reštaurátori pýtajú o digitálnom menu v IQ Rest. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
    items: [
      { q: "Potrebujem technické znalosti alebo skúsenosti s CMS?", a: "Nie, žiadne špeciálne znalosti nie sú potrebné. Každá akcia v administračnom paneli je klikom a presúvaním — bez kódu. Pridanie položky do menu trvá pár sekúnd: názov, cena, fotografia. Plné nastavenie menu zvyčajne trvá 30 minút až hodinu." },
      { q: "Čo je digitálne menu IQ Rest?", a: "IQ Rest je cloudová platforma pre reštaurácie. Digitálne menu je online verzia vášho menu, dostupná hosťom cez QR kód alebo priamy odkaz: fotografie jedál, ceny, alergény, AI preklad do 35 jazykov, aktualizácie v reálnom čase. Menu je hostované na našich serveroch; nemusíte nič inštalovať ani udržiavať — stačí otvoriť prehliadač." },
      { q: "Potrebujú hostia aplikáciu alebo špeciálny hardvér?", a: "Nie. Hostia namieria kameru telefónu na QR kód a menu sa otvorí v prehliadači. Administračný panel pre reštauráciu tiež beží v ľubovoľnom modernom prehliadači — telefón, tablet alebo notebook. QR kódy sa tlačia na akejkoľvek kancelárskej tlačiarni." },
      { q: "Môžem hostovať menu na vlastnej doméne?", a: "Áno. Podporujeme vlastnú doménu s SSL certifikátom — hostia vidia menu na adrese vašej reštaurácie (napr. menu.vasarestauracia.sk). Pomáhame s nastavením DNS; zvyčajne to trvá 5–10 minút." },
      { q: "Môžem spravovať viac reštaurácií z jedného účtu?", a: "Áno, na požiadanie. Jeden účet môže hostovať viac reštaurácií: každá prevádzka s vlastným menu, dizajnom, QR kódmi a analytikou. Napíšte nám na WhatsApp a aktivujeme režim viacerých reštaurácií pre vašu skupinu." },
      { q: "Ako ťažké je nastaviť menu od nuly?", a: "Nastavenie má tri kroky: (1) vytvoriť kategórie; (2) pridať položky s názvami, cenami a fotografiami; (3) vytlačiť QR kódy pre stoly. Ak už máte papierové menu alebo PDF, nahrajte ho — AI rozpozná kategórie, názvy a ceny a vyplní karty automaticky. Základné menu môže byť online za 5 minút; celkový čas závisí od počtu položiek." },
      { q: "Akú podporu ponúkate?", a: "Sme dostupní na WhatsAppe v pracovných hodinách a rýchlo odpovedáme e-mailom. Pomáhame s prvotným nastavením, konfiguráciou domény, dizajnom menu a všetkými neštandardnými situáciami. Ak potrebujete demo alebo praktickú pomoc pri spustení — napíšte nám." },
    ],
  },
};
