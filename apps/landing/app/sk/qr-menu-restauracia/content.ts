import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sk",
  slug: "qr-menu-restauracia",
  trackPrefix: "l_sk_qr",

  meta: {
    title: "QR menu pre reštaurácie | IQ Rest",
    description:
      "QR menu pre reštaurácie: hosť naskenuje QR kód na stole, otvorí jedálny lístok v prehliadači a objedná vo svojom jazyku. 14 dní zadarmo, bez karty.",
    canonical: "https://iq-rest.com/sk/qr-menu-restauracia",
    ogLocale: "sk_SK",
    ogTitle: "QR menu pre reštaurácie",
    ogDescription:
      "QR na stole, lístok v telefóne — fotky, alergény, 35 jazykov a aktualizácie v reálnom čase.",
    brandLine: "IQ Rest — QR menu pre reštaurácie",
  },

  hero: {
    headline: "QR menu pre reštaurácie.",
    sub: "Hosť namieri fotoaparát na QR kód na stole a jedálny lístok sa okamžite otvorí v prehliadači telefónu: fotky jedál, alergény, vždy aktuálne ceny a automatický preklad do 35 jazykov. Bez sťahovania aplikácií, bez pretláčania lístka pri každej zmene ceny.",
  },

  scan: {
    heading: "Máte už papierový alebo PDF lístok?",
    headingAccent: "AI z neho urobí QR menu za 60 sekúnd.",
    sub: "Nahrajte fotku lístka alebo PDF — AI rozpozná kategórie, jedlá a ceny a hneď ich prepojí s QR menu.",
    cta: "Vytvoriť QR menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Jeden QR, 35 jazykov",
      heading: "Jeden QR kód, lístok v 35 jazykoch.",
      body: "Hosť naskenuje QR a vyberie si jazyk: preklad zabezpečuje AI s citom pre gastronómiu, nie všeobecný prekladač. Koniec samostatným lístkom pre turistov a voľným papierom na stole.",
      bullets: [
        "Jedna tlač QR pokryje 35 jazykov, je súčasťou predplatného.",
        "AI rozumie kuchárskemu jazyku — názvy jedál znejú v každom jazyku prirodzene.",
        "Hosť mení jazyk priamo v lístku, bez opätovného skenovania QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dvaja hostia skenujú rovnaký QR kód na stole a čítajú lístok v rôznych jazykoch" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergény v QR",
      heading: "Alergény a diétne štítky vnútri QR menu.",
      body: "Každé jedlo v lístku prepojenom s QR môže niesť štítky pre lepok, laktózu, orechy, morské plody, vegánske a bezlepkové možnosti. Hosť si z telefónu vyfiltruje jedlá zodpovedajúce jeho obmedzeniam, bez pýtania sa personálu.",
      bullets: [
        "14 kategórií alergénov na úrovni jedla.",
        "Vegánske, vegetariánske a bezlepkové štítky jedným klikom v paneli.",
        "Hosť filtruje QR menu podľa vlastných obmedzení.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Hosť filtruje QR menu podľa alergénov v telefóne, kým majiteľ upravuje zoznam na tablete" },
    },
    {
      icon: Palette,
      eyebrow: "Viac než len QR",
      heading: "QR menu vyladené ako web reštaurácie.",
      body: "Po naskenovaní kódu hosť nenarazí na ploché PDF: vidí uvítaciu obrazovku s videom alebo hlavnou fotkou, popis podniku a kontaktnú stránku s mapou, telefónmi a sociálnymi sieťami. QR sa stáva vstupnou bránou reštaurácie online.",
      bullets: [
        "Video na pozadí alebo hlavná fotka na úvodnej obrazovke QR menu.",
        "Priestor rozpovedať koncept podniku aj každej kategórie.",
        "Vstavaná kontaktná stránka: mapa, telefón, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefóny na stole: úvodná obrazovka QR menu s videom na pozadí a kontaktná stránka s mapou" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Objednávanie z QR · voliteľné",
      heading: "Z QR kódu môže hosť aj objednávať.",
      body: "Okrem prezerania lístka sa QR menu môže stať objednávacím kanálom: hosť pridá jedlá do košíka a odošle požiadavku. Objednávka dôjde čašníkovi na place, na WhatsApp alebo na kuchynskú obrazovku. Funkciu možno podľa potreby zapnúť či vypnúť v nastaveniach.",
      bullets: [
        "Košík, poznámky a odoslanie objednávky priamo z naskenovania QR.",
        "Objednávka dôjde okamžite na place, na WhatsApp alebo na kuchynskú obrazovku.",
        "Funkciu možno aktivovať podľa časov, miestností alebo konkrétnych reštaurácií.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefóny na stole: košík vytvorený z QR menu a potvrdenie odoslanej objednávky" },
    },
  ],

  faq: {
    sub: "Na čo sa reštaurátori pýtajú ohľadom QR menu od IQ Rest. Nenašli ste svoju otázku? Napíšte nám na WhatsApp.",
    items: [
      { q: "Ako funguje QR menu od IQ Rest?", a: "Každý stôl má vytlačený QR kód. Hosť ho naskenuje fotoaparátom telefónu a prehliadač otvorí jedálny lístok reštaurácie — fotky, popisy, alergény a aktuálne ceny. Žiadna aplikácia nie je potrebná, ani pre hosťa, ani pre personál." },
      { q: "Potrebujem technické znalosti na vytvorenie QR menu?", a: "Nie. Panel funguje na klikaní a presúvaní, bez kódu a zložitých nastavení. Pridanie jedla zaberie pár sekúnd: názov, cena, fotka. Prvotné nastavenie zvyčajne trvá 30 minút až hodinu; ak už máte PDF lístok, AI ho prevedie automaticky." },
      { q: "Musia si hostia inštalovať aplikáciu, aby prečítali QR?", a: "Nie. Natívny fotoaparát iPhonu aj Androidu rozpozná QR kód za sekundy a otvorí lístok priamo v prehliadači. Administračný panel funguje tiež v akomkoľvek modernom prehliadači — telefón, tablet alebo notebook." },
      { q: "Ako sa tlačia QR kódy pre stoly?", a: "QR kódy sa v paneli generujú automaticky (jeden na stôl alebo jeden pre celý podnik) a sťahujú sa v PDF pripravenom na tlač. Stačí kancelárska tlačiareň a stojanček: stojan, nálepka alebo podtácka." },
      { q: "Môžem pre QR menu použiť vlastnú doménu?", a: "Áno. Podporujeme doménu reštaurácie s SSL certifikátom (napríklad menu.vasareštauracia.sk): keď hosť naskenuje QR, vidí adresu vašej reštaurácie namiesto všeobecnej subdomény. Nastavenie DNS trvá 5–10 minút a prevedieme vás ním." },
      { q: "Môžem spravovať QR kódy viacerých reštaurácií z jedného účtu?", a: "Áno, na požiadanie. Jeden účet môže združovať viac podnikov, každý s vlastnými QR kódmi, lístkom, dizajnom a analytikou. Napíšte nám na WhatsApp a zapneme režim viacerých reštaurácií." },
      { q: "Je ťažké spustiť QR menu od nuly?", a: "Tri kroky: (1) vytvorte kategórie; (2) pridajte jedlá s názvom, cenou a fotkou; (3) vytlačte QR a umiestnite ich na stoly. Ak už máte papierový alebo PDF lístok, nahrajte ho — AI rozpozná kategórie a ceny a vyplní karty. Základný lístok môže byť online za 5 minút." },
    ],
  },
};
