import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Vícejazyčné restaurační menu — 35 jazyků, jedním ťuknutím",
    description:
      "Obsluhujte mezinárodní hosty v jejich jazyce. Restaurační menu ve 35 jazycích s přepínáním jedním ťuknutím. RTL podpora pro arabštinu a perštinu. 14denní zkušební verze zdarma.",
    canonical: "https://iq-rest.com/cs/multilingual",
    ogLocale: "cs_CZ",
    ogTitle: "Web vícejazyčného restauračního menu — 35 jazyků v základu",
    ogDescription:
      "Turisté skenují, vidí menu ve svém jazyce automaticky. 35 jazyků, RTL podpora, auto-detekce z nastavení telefonu. 14denní zkušební verze zdarma.",
  },

  hero: {
    title: "Vaše menu mluví jazykem každého turisty.",
    subtitle:
      "Vícejazyčné restaurační menu by nemělo být projekt. S IQ Rest vaše QR menu auto-detekuje jazyk telefonu každého hosta a obslouží ho v kterémkoli z 35 jazyků — včetně arabštiny a perštiny se správným vykreslením zprava doleva.",
    trustLine: "4.9 · 500+ restaurací ve 30+ zemích",
  },

  seo: {
    description:
      "Postavte menu jednou, obsluhujte ho ve 35 jazycích. IQ Rest auto-detekuje jazyk telefonu každého hosta a vykreslí menu v jejich jazyce — žádné ťukání na vlajky, žádná jazyková bariéra, žádné trapné momenty s Google Translate. Od španělštiny a němčiny po japonštinu, arabštinu a mandarínštinu vidí vaši hosté restauraci tak, jak má být viděna.",
    fullDescription:
      "Většina 'vícejazyčných' menu jsou PDF rozbitého Google Translate, vytištěná jednou a nikdy neaktualizovaná. Vícejazyčný restaurační web IQ Rest je skutečná i18n: každý jazyk má vlastní řádně přeloženou kopii, vlastní URL slug, vlastní meta tagy pro indexaci Googlem a vlastní routing uvnitř menu aplikace.\n\nKdyž turista s francouzským iPhonem naskenuje váš QR, menu se otevře ve francouzštině automaticky — žádná ťuknutí, žádná rozhodnutí. Můžou přepnout na jiný jazyk přepínačem v horní části, ale většina nemusí. Totéž platí pro dietní štítky ('vegan' se stává 'vegano' / 'vegetarisch' / 'ヴィーガン' podle jazyka), pro chybové hlášky, pro tlačítka 'přidat do košíku', pro účtenky. Každý UI řetězec ve 35 jazycích, ne jen obsah menu.\n\nPro RTL jazyky — arabštinu a perštinu — se celý layout správně otáčí: text se zarovná vpravo, menu se otevírají zprava, ceny se objevují za názvem pokrmu podle očekávání. Není to CSS hack, je to plná RTL podpora, která dělá arabské a perské hosty obsloužené, ne dodělané.",
    benefitsHeading: "Proč skutečné vícejazyčné menu poráží PDF překlad",
    benefits: [
      "35 jazyků se správným překladem UI — ne jen položky menu",
      "Auto-detekuje jazyk telefonu hosta — žádné ťuknutí",
      "Manuální přepínač jazyků pro hosty, kteří preferují jiný jazyk",
      "Plná RTL podpora pro arabštinu a perštinu — ne CSS hack",
      "Každý jazyk má vlastní URL — Google indexuje 35 verzí vašeho webu",
      "Změňte popis pokrmu v rodném jazyce — překlady následují",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Všech 35 jazyků v ceně.",
    sub: "Vícejazyčné menu, AI překlad, QR objednávky a rezervace — vše v jedné paušální ceně. Žádné poplatky za jazyk, žádné příplatky za RTL.",
  },

  faq: {
    sub: "Vše, na co se majitelé restaurací ptají ohledně vícejazyčného menu. Nevidíte ten svůj? Napište nám na WhatsApp — odpovídají skuteční lidé.",
    items: [
      {
        q: "Kolik jazyků menu podporuje?",
        a: "35 jazyků včetně angličtiny, španělštiny, němčiny, francouzštiny, italštiny, portugalštiny, holandštiny, polštiny, češtiny, slovenštiny, maďarštiny, rumunštiny, bulharštiny, chorvatštiny, srbštiny, slovinštiny, řečtiny, turečtiny, ruštiny, ukrajinštiny, litevštiny, lotyštiny, estonštiny, finštiny, švédštiny, norštiny, dánštiny, islandštiny, katalánštiny, irské gaelštiny, arabštiny, perštiny, japonštiny, korejštiny a čínštiny. UI řetězce jsou profesionálně přeložené pro každý.",
      },
      {
        q: "Jak zákazníci přepínají jazyky?",
        a: "Dva způsoby: automaticky (menu se otevře v jazyce telefonu) a manuálně (přepínač jazyků v horní části menu). 80 % turistů nikdy nesáhne na manuální přepínač — auto-detekce funguje, protože telefon už zná jejich jazyk.",
      },
      {
        q: "Podporujete jazyky zprava doleva jako arabštinu a perštinu?",
        a: "Ano, s plným RTL layoutem. Celé menu se otáčí: text se zarovnává vpravo, sloupce se obrací, navigační šuplíky se otevírají z pravé strany, ceny se objevují za názvy pokrmů. Je to skutečná RTL podpora implementovaná na úrovni layoutu, ne jen CSS direction triky.",
      },
      {
        q: "Bude Google indexovat moje menu ve všech 35 jazycích?",
        a: "Ano. Každý jazyk má vlastní URL slug (např. /es, /fr, /de), správné hreflang tagy, lokalizované meta titulky a popisy a strukturovaná data specifická pro jazyk. Google každý jazyk považuje za samostatnou stránku pro daný locale, což znamená, že turisté hledající vaši restauraci ve svém jazyce vás spíše najdou.",
      },
      {
        q: "Co když nechci všech 35 jazyků — jen své hlavní trhy?",
        a: "Vyberte, které jazyky jsou aktivní. Pokud jste plážová restaurace v Řecku obsluhující hlavně britské, německé a italské turisty, povolte jen angličtinu, němčinu a italštinu — ostatní se nezobrazí v přepínači jazyků ani auto-detekci. Můžete vždy povolit více později, jak se mění váš turistický mix.",
      },
    ],
  },

  finalCta: {
    heading: "Jazyk telefonu každého turisty.",
    headingAccent: "Už podporován.",
    sub: "Obsluhujte vícejazyčné menu ve 35 jazycích, včetně RTL arabštiny a perštiny. 14denní zkušební verze zdarma, žádná kreditní karta, žádné poplatky za jazyk.",
  },
};
