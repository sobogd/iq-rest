import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "cs",
  slug: "objednavkovy-system-restaurace",
  trackPrefix: "l_cs_orders",

  meta: {
    title: "Objednávkový systém pro restauraci — host a číšník | IQ Rest",
    description:
      "Objednávky v restauraci z telefonu nebo tabletu: plán sálu, dělení účtu, stavy, varianty a poznámky. Hosté objednávají u stolu; číšník přijímá objednávky z jakéhokoli zařízení. 14 dní zdarma.",
    canonical: "https://iq-rest.com/cs/objednavkovy-system-restaurace",
    ogLocale: "cs_CZ",
    ogTitle: "Objednávkový systém pro restauraci — host a číšník",
    ogDescription:
      "Host u stolu nebo číšník na telefonu — objednávka dorazí okamžitě do kuchyně. Plán sálu, dělení účtu, stavy, varianty a poznámky.",
    brandLine: "IQ Rest — Objednávkový systém pro restauraci",
  },

  hero: {
    headline: "Příjem objednávek: host a číšník — rovnou do kuchyně.",
    sub: "Hosté objednávají přes QR menu u stolu nebo číšník přijímá objednávku z telefonu či tabletu — objednávka dorazí na kuchyňský displej během několika sekund. Plán sálu s barevně označenými stoly, dělení účtu, flexibilní varianty a poznámky. Žádné bloky, žádné cesty k baru.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Číšník přijímá objednávku u stolu ze smartphonu — objednávka dorazí na kuchyňský displej",
  },

  scan: {
    heading: "Nastavte objednávkový systém",
    headingAccent: "za 5 minut.",
    sub: "Nahrajte papírové menu nebo PDF — AI rozpozná jídla, ceny a kategorie. Připojte tablet v sále a začněte přijímat objednávky u stolů.",
    cta: "Skenovat menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Seznam a plán sálu",
      heading: "Seznam objednávek vedle plánu sálu.",
      body: "Všechny aktivní objednávky vpravo: stav, součet, čas, počet položek. Vlevo — plán sálu: stoly barevně podle stavu — volný, obsazený, vyžaduje pozornost. Ťukněte na stůl a otevřete nebo vytvořte objednávku; ťukněte na kartu a otevře se detail. Žádné přepínání obrazovek.",
      bullets: [
        "Plán sálu: stoly barevně podle stavu objednávky.",
        "Seznam objednávek vedle — součet, čas, počet položek.",
        "Ťukněte na stůl pro otevření nebo vytvoření objednávky.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet u číšnické stanice: seznam objednávek a plán sálu s barevnými stoly" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Karta objednávky",
      heading: "Karta objednávky: stavy, duplikace, mazání — jedno ťuknutí.",
      body: "Každá položka má svůj stav (Čeká / Připravuje se / Hotovo / Vydáno) — kuchyně i číšník vidí stejný obraz v reálném čase. Ťuknutí na tečku otevře menu akcí: změna stavu, duplikace položky se stejnými modifikátory a variantami, smazání. Vše uvnitř karty.",
      bullets: [
        "Stav po položkách: Čeká / Připravuje se / Hotovo / Vydáno.",
        "Duplikujte položku jedním ťuknutím se stejnými variantami.",
        "Smažte položku přímo z karty.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet s detailní kartou objednávky: stavy položek, akce duplikace a smazání" },
    },
    {
      icon: Receipt,
      eyebrow: "Rozdělit účet",
      heading: "Rozdělte účet, když hosté platí zvlášť.",
      body: "Hosté se rozhodli rozdělit — zaškrtněte položky, které jdou na nový lístek; zbytek zůstává na aktuálním. Systém okamžitě zobrazí oba součty. Jedno ťuknutí na „Rozdělit objednávku“ a máte dvě samostatné objednávky se správnými součty, obě stále přiřazené ke svým stolům.",
      bullets: [
        "Vyberte položky k rozdělení zaškrtávátky.",
        "Oba součty se zobrazí okamžitě.",
        "Jedno ťuknutí a objednávka je rozdělená bez ručního počítání.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet na stole v restauraci: modální okno rozdělení účtu mezi hosty" },
    },
    {
      icon: Smartphone,
      eyebrow: "Přidání z telefonu",
      heading: "Přidejte položky z telefonu — ve třech krocích.",
      body: "Číšník není vázaný na jedno zařízení: otevře příjem objednávek na svém telefonu a přidá položku ve třech krocích — kategorie, jídlo, varianty (velikost, propečení, extra omáčka nebo přísada). Cena se přepočítá automaticky. Poznámka pro kuchyni je v posledním kroku.",
      bullets: [
        "Tři kroky: kategorie → jídlo → varianty.",
        "Varianty (velikost, doplňky, extra) s cenou jedním klikem.",
        "Pole poznámky v posledním kroku.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Čtyři telefony s kroky přidání položky objednávky: kategorie, jídlo, velikost, komentář" },
    },
  ],

  faq: {
    sub: "Co se restauratéři ptají na příjem objednávek v IQ Rest. Nenašli jste svůj dotaz? Napište nám na WhatsApp.",
    items: [
      { q: "Může pracovat několik číšníků současně z různých zařízení?", a: "Ano. Každý číšník se přihlásí ke sdílenému účtu restaurace ze svého telefonu nebo tabletu — všichni vidí stejné stoly, objednávky a stavy v reálném čase. Změny jednoho číšníka se zobrazí ostatním okamžitě, bez konfliktů a zamknutí." },
      { q: "Můžou číšníci používat vlastní zařízení (BYOD)?", a: "Ano. Je to webová aplikace v prohlížeči — není co instalovat. Číšník otevře odkaz, přihlásí se k účtu restaurace ze svého iPhonu, Androidu nebo osobního tabletu a začne pracovat. Na konci směny se odhlásí." },
      { q: "Můžou se k jídlům přidat povinné varianty (velikost, propečení atd.)?", a: "Ano. Každé jídlo může mít libovolný počet skupin variant — povinné (např. „Velikost“: malá / střední / velká) i volitelné („Propečení“: krvavý / medium / dobře propečený). Varianty mohou měnit cenu (+1,00 €). Pokud je skupina povinná, systém hostovi ani číšníkovi neumožní přidat jídlo bez výběru." },
      { q: "Můžou hosté přidat poznámku nebo extra k jídlu (pečivo, omáčka)?", a: "Ano. Poslední krok přidání má pole pro volnou poznámku („bez cibule“, „dobře propečené“, „alergie na ořechy“). Extra jsou samostatné placené modifikátory („+ BBQ omáčka +1,50 €“, „+ Pečivo +2,00 €“). Poznámky se zobrazují na kuchyňském displeji, barevně zvýrazněné." },
      { q: "Jsou k dispozici statistiky objednávek?", a: "Ano. Sekce analytiky zobrazuje: tržby podle dne a hodiny, průměrný účet, top jídla, konverze host → objednávka, rychlost obsluhy (čas od Čeká k Vydáno). To pomáhá plánovat směny, nákupy a odhalit slabě prodejná jídla." },
      { q: "Můžou se objednávky rozdělit nebo přesunout mezi stoly?", a: "Ano, oba scénáře jsou podporované. Pro rozdělení — zaškrtněte položky, které jdou na nový lístek (pro hosty platící zvlášť). Pro přesun — otevřete kartu objednávky, vyberte nový stůl; celá objednávka se přesune. Bez ručního počítání, bez opuštění panelu." },
    ],
  },
};
