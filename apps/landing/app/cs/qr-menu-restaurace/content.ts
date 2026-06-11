import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "cs",
  slug: "qr-menu-restaurace",
  trackPrefix: "l_cs_qr",

  meta: {
    title: "QR menu pro restaurace | IQ Rest",
    description:
      "QR menu pro restaurace: host naskenuje QR kód na stole, otevře jídelní lístek v prohlížeči a objedná ve svém jazyce. 14 dní zdarma, bez karty.",
    canonical: "https://iq-rest.com/cs/qr-menu-restaurace",
    ogLocale: "cs_CZ",
    ogTitle: "QR menu pro restaurace",
    ogDescription:
      "QR na stole, lístek v telefonu — fotky, alergeny, 35 jazyků a aktualizace v reálném čase.",
    brandLine: "IQ Rest — QR menu pro restaurace",
  },

  hero: {
    headline: "QR menu pro restaurace.",
    cta: "Vytvořit QR menu",
    sub: "Host namíří fotoaparát na QR kód na stole a jídelní lístek se okamžitě otevře v prohlížeči telefonu: fotky jídel, alergeny, vždy aktuální ceny a automatický překlad do 35 jazyků. Bez stahování aplikací, bez přetiskování lístku při každé změně ceny.",
  },

  scan: {
    heading: "Máte už papírový nebo PDF lístek?",
    headingAccent: "AI z něj udělá QR menu za 60 sekund.",
    sub: "Nahrajte fotku lístku nebo PDF — AI rozpozná kategorie, jídla a ceny a hned je propojí s QR menu.",
    cta: "Vytvořit QR menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Jeden QR, 35 jazyků",
      heading: "Jeden QR kód, lístek ve 35 jazycích.",
      body: "Host naskenuje QR a vybere si jazyk: překlad zajišťuje AI s citem pro gastronomii, ne obecný překladač. Konec samostatným lístkům pro turisty a volným papírům na stole.",
      bullets: [
        "Jeden tisk QR pokryje 35 jazyků, je součástí předplatného.",
        "AI rozumí kuchařskému jazyku — názvy jídel zní v každém jazyce přirozeně.",
        "Host mění jazyk přímo v lístku, bez opětovného skenování QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dva hosté skenují stejný QR kód na stole a čtou lístek v různých jazycích" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeny v QR",
      heading: "Alergeny a dietní štítky uvnitř QR menu.",
      body: "Každé jídlo v lístku propojeném s QR může nést štítky pro lepek, laktózu, ořechy, mořské plody, veganské a bezlepkové možnosti. Host si z telefonu vyfiltruje jídla odpovídající jeho omezením, aniž by se ptal personálu.",
      bullets: [
        "14 kategorií alergenů na úrovni jídla.",
        "Veganské, vegetariánské a bezlepkové štítky jedním kliknutím v panelu.",
        "Host filtruje QR menu podle vlastních omezení.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Host filtruje QR menu podle alergenů v telefonu, zatímco majitel upravuje seznam na tabletu" },
    },
    {
      icon: Palette,
      eyebrow: "Víc než jen QR",
      heading: "QR menu vyladěné jako web restaurace.",
      body: "Po naskenování kódu host nenarazí na ploché PDF: vidí uvítací obrazovku s videem nebo hlavní fotkou, popis podniku a kontaktní stránku s mapou, telefony a sociálními sítěmi. QR se stává vstupní branou restaurace online.",
      bullets: [
        "Video na pozadí nebo hlavní fotka na úvodní obrazovce QR menu.",
        "Prostor vyprávět koncept podniku i každé kategorie.",
        "Vestavěná kontaktní stránka: mapa, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dva telefony na stole: úvodní obrazovka QR menu s videem na pozadí a kontaktní stránka s mapou" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Objednávání z QR · volitelné",
      heading: "Z QR kódu může host i objednávat.",
      body: "Kromě prohlížení lístku se QR menu může stát objednávacím kanálem: host přidá jídla do košíku a odešle požadavek. Objednávka dorazí číšníkovi na place, na WhatsApp nebo na kuchyňskou obrazovku. Funkci lze podle potřeby zapnout či vypnout v nastavení.",
      bullets: [
        "Košík, poznámky a odeslání objednávky přímo z naskenování QR.",
        "Objednávka dorazí okamžitě na place, na WhatsApp nebo na kuchyňskou obrazovku.",
        "Funkci lze aktivovat podle časů, místností nebo konkrétních restaurací.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dva telefony na stole: košík vytvořený z QR menu a potvrzení odeslané objednávky" },
    },
  ],

  faq: {
    sub: "Na co se restauratéři ptají ohledně QR menu od IQ Rest. Nenašli jste svou otázku? Napište nám na WhatsApp.",
    items: [
      { q: "Jak funguje QR menu od IQ Rest?", a: "Každý stůl má vytištěný QR kód. Host ho naskenuje fotoaparátem telefonu a prohlížeč otevře jídelní lístek restaurace — fotky, popisy, alergeny a aktuální ceny. Žádná aplikace není potřeba, ani pro hosta, ani pro personál." },
      { q: "Potřebuji technické znalosti k vytvoření QR menu?", a: "Ne. Panel funguje na klikání a přetahování, bez kódu a složitých nastavení. Přidání jídla zabere pár vteřin: název, cena, fotka. Prvotní nastavení obvykle trvá 30 minut až hodinu; pokud už máte PDF lístek, AI ho převede automaticky." },
      { q: "Musí si hosté instalovat aplikaci, aby přečetli QR?", a: "Ne. Nativní fotoaparát iPhonu i Androidu rozpozná QR kód během vteřin a otevře lístek přímo v prohlížeči. Administrační panel funguje také v jakémkoli moderním prohlížeči — telefon, tablet nebo notebook." },
      { q: "Jak se tisknou QR kódy pro stoly?", a: "QR kódy se v panelu generují automaticky (jeden na stůl nebo jeden pro celý podnik) a stahují se v PDF připraveném k tisku. Stačí kancelářská tiskárna a stojánek: stojan, samolepka nebo tácek." },
      { q: "Můžu pro QR menu použít vlastní doménu?", a: "Ano. Podporujeme doménu restaurace s SSL certifikátem (například menu.vaserestaurace.cz): když host naskenuje QR, vidí adresu vaší restaurace místo obecné subdomény. Nastavení DNS trvá 5–10 minut a provedeme vás jím." },
      { q: "Můžu spravovat QR kódy více restaurací z jednoho účtu?", a: "Ano, na požádání. Jeden účet může sdružovat více podniků, každý s vlastními QR kódy, lístkem, designem a analytikou. Napište nám na WhatsApp a zapneme režim více restaurací." },
      { q: "Je těžké spustit QR menu od nuly?", a: "Tři kroky: (1) vytvořte kategorie; (2) přidejte jídla s názvem, cenou a fotkou; (3) vytiskněte QR a umístěte je na stoly. Pokud už máte papírový nebo PDF lístek, nahrajte ho — AI rozpozná kategorie a ceny a vyplní karty. Základní lístek může být online za 5 minut." },
    ],
  },
};
