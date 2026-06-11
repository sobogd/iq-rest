import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "cs",
  slug: "kuchynsky-displej",
  trackPrefix: "l_cs_kds",

  meta: {
    title: "Kuchyňský displej (KDS) pro restaurace | IQ Rest",
    description:
      "Kuchyňský displej (KDS) pro restaurace: objednávky ze sálu a z QR menu dorazí okamžitě na obrazovku šéfkuchaře. Sloupce podle stolu, stavy Čeká / Připravuje se / Hotovo / Vydáno, filtry podle zóny. Funguje na tabletu nebo telefonu.",
    canonical: "https://iq-rest.com/cs/kuchynsky-displej",
    ogLocale: "cs_CZ",
    ogTitle: "Kuchyňský displej (KDS) — Objednávky na obrazovce šéfkuchaře",
    ogDescription:
      "Objednávky ze sálu na obrazovce šéfkuchaře. Sloupce podle stolu, stavy a časovač. Jedno ťuknutí mění stav.",
    brandLine: "IQ Rest — Kuchyňský displej",
  },

  hero: {
    headline: "Kuchyňský displej: objednávky rovnou na obrazovku šéfkuchaře.",
    cta: "Nastavit kuchyňský displej",
    sub: "Papírové lístky už nepotřebujete. Objednávky ze sálu nebo z QR menu dorazí okamžitě na kuchyňskou obrazovku — s poznámkami, alergeny a časovačem. Jedno ťuknutí mění stav. Funguje na tabletu u výdejního pultu nebo na smartphonu v kapse kuchaře.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionální kuchyně s tabletem na mosazném stojanu zobrazujícím kuchyňský displej s aktivními objednávkami",
  },

  scan: {
    heading: "Nastavte kuchyňský displej",
    headingAccent: "za 5 minut.",
    sub: "Nahrajte papírové menu nebo PDF — AI rozpozná jídla, kategorie a alergeny. Připojte tablet v kuchyni a začněte přijímat objednávky.",
    cta: "Skenovat menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Ovládání a filtry",
      heading: "Několik obrazovek podle zóny: kuchyně a bar.",
      body: "Umístěte samostatné tablety na horkou linku, k baru nebo k cukrárně — každá obrazovka zobrazí pouze jídla, která tam patří. Filtry podle stavu (Čeká / Připravuje se / Hotovo / Vydáno) a kategorie odstraní šum: kuchař vidí jen to, co je pro jeho stanoviště relevantní.",
      bullets: [
        "Několik KDS obrazovek s filtry podle kategorie.",
        "Filtr stavu: zobraz jen Připravuje se a Hotovo.",
        "Každá zóna vidí jen vlastní tok objednávek.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet na mosazném stojanu u výdejního pultu — KDS s filtrem stavu" },
    },
    {
      icon: Timer,
      eyebrow: "Karty a časovač",
      heading: "Jedno ťuknutí mění stav. Poznámky a alergeny barevně zvýrazněné.",
      body: "Karta jídla ukazuje vybrané varianty (bez cibule, dobře propečené), poznámku hosta, alergeny a časovač od okamžiku, kdy byla objednávka vytvořena. Ťukněte na kartu a stav přejde na další: Čeká → Připravuje se → Hotovo → Vydáno. Seznam se automaticky řadí podle priority.",
      bullets: [
        "Ťuknutí na kartu — okamžitá změna stavu.",
        "Varianty, poznámky a alergeny barevně zvýrazněné.",
        "Řazení podle priority: položky, které čekají déle, se posunují nahoru.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet na mosazném stojanu na barovém pultu — KDS s kartami objednávek podle stolu" },
    },
  ],

  faq: {
    sub: "Co se restauratéři ptají na kuchyňský displej v IQ Rest. Nenašli jste svůj dotaz? Napište nám na WhatsApp.",
    items: [
      { q: "Jaké stavy jídel jsou v kuchyni?", a: "Čtyři stavy s různými barvami karet: Čeká (šedá) — objednávka je přijatá a čeká; Připravuje se (oranžová) — jídlo se vaří; Hotovo (modrá) — připraveno k servírování; Vydáno (zelená) — předáno hostovi. Ťuknutí na kartu posune ji do dalšího stavu, bez menu a potvrzení." },
      { q: "Můžu provozovat několik KDS obrazovek v různých zónách?", a: "Ano. Jeden tablet na horké lince, druhý u baru, třetí v cukrárně — každý s vlastním filtrem kategorie. Všechny obrazovky jsou synchronizované v reálném čase: stav změněný na jedné obrazovce se aktualizuje všude." },
      { q: "Jaký hardware potřebuju ke spuštění KDS?", a: "KDS je webová aplikace, která běží v jakémkoli moderním prohlížeči. Velká kuchyně — tablet na mosazném stojanu u výdejního pultu nebo TV na zdi. Menší provoz — smartphone kuchaře. Žádný speciální hardware, žádná instalace: otevřete odkaz a přihlaste se k účtu." },
      { q: "Odkud přicházejí objednávky na kuchyňskou obrazovku?", a: "Ze všech zdrojů: host, který objednal přes QR menu u stolu; číšník, který přijal objednávku z telefonu; host, který objednal z webu. Všechny dorazí na KDS s označením zdroje a číslem stolu. Žádné ruční převody z POS." },
      { q: "Co je zobrazeno na kartě objednávky?", a: "Název jídla, vybrané modifikátory (bez cibule, dobře propečené, přidat omáčku), komentář hosta, zvýrazněné alergeny, stav (Čeká / Připravuje se / Hotovo / Vydáno) a časovač, jak dlouho jídlo čeká. Karty jsou seřazené podle priority: čím delší čekání, tím výš ve sloupci." },
      { q: "Můžu karty na obrazovce filtrovat?", a: "Ano. Dva filtry: podle stavu (např. zobrazit jen Čeká a Připravuje se, skrýt Vydáno) a podle kategorie (jen nápoje na baru, jen hlavní jídla v kuchyni). Nastavení se ukládá pro každé zařízení — každá zóna si drží vlastní sadu." },
    ],
  },
};
