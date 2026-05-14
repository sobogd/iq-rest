import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Vlastní design restauračního menu — video a fotopozadí",
    description:
      "Udělejte ohromující první dojem. Přidejte video nebo fotopozadí k vašemu restauračnímu QR menu. Vlastní design, kvůli kterému hosté zastaví scrollování. 14denní zkušební verze.",
    canonical: "https://iq-rest.com/cs/custom-design",
    ogLocale: "cs_CZ",
    ogTitle: "Video a fotopozadí pro vaše restaurační QR menu",
    ogDescription:
      "Přidejte video kuchyně nebo hero fotku jídla jako pozadí menu. Hosté zastaví scrollování. Vaše značka utkví. 14denní zkušební verze zdarma.",
  },

  hero: {
    title: "Vypadejte nezapomenutelně za jednu sekundu.",
    subtitle:
      "Přidejte video kuchyně, hero fotku jídla nebo náladový klip z jídelny jako pozadí QR menu. Hosté zastaví scrollování, vaše značka utkví a menu pod tím zůstává čisté a čitelné.",
    trustLine: "500+ restaurací ve 30+ zemích",
  },

  seo: {
    description:
      "Většina QR menu vypadá jako Google Doc. IQ Rest vám dá plný vlastní design restauračního menu — přidejte video kuchyně, hero fotku jídla nebo náladový klip z jídelny jako pozadí a menu okamžitě vypadá jako skutečná značka místo šablony. Hosté zastaví scrollování. Pamatují si zážitek. Vrací se.",
    fullDescription:
      "První dojmy z QR menu se dějí v milisekundách — hosté skenují, menu se načte a další rozhodnutí je, zda chtějí strávit čas ve vaší restauraci, nebo si jen rychle objednat a odejít. Menu s prázdnou šablonou posílá jednu zprávu; video praskajícího pekáče dřevěného ohně posílá zcela jinou.\n\nIQ Rest vám umožňuje nahrát buď statickou fotku, nebo krátký videoklip (5–15 sekund, auto-loop, ztlumeno) jako hero pozadí menu. Obrázek nebo video se přehrává full-bleed v horní části menu, plynule přechází do seznamu kategorií a zůstává jemné, jakmile hosté začnou prohlížet. Technické detaily jsou vyřešené — videa se automaticky komprimují, podávají z CDN a optimalizují pro pomalé turistické sítě. Statické fotky se konvertují do WebP a podávají ve správné velikosti pro každé zařízení.\n\nMůžete měnit pozadí na menu (polední menu vs. večerní menu vs. koktejl bar vs. víkendový brunch) a podle příležitosti (Valentýn, letní terasa, vánoční večeře), aniž byste se dotkli kódu. Výsledek je rozdíl mezi pocitem řetězového QR menu a pocitem destinace.",
    benefitsHeading: "Proč vlastní pozadí překonávají menu s čistou šablonou",
    benefits: [
      "Foto nebo video pozadí — nastavte náladu v sekundě, kdy hosté skenují",
      "Auto-komprimováno a podáváno z CDN — rychlé i na hotelové WiFi",
      "Pozadí na menu — jiná atmosféra pro oběd, večeři, brunch",
      "Sezónní výměny za 30 sekund — Valentýn, léto, Vánoce",
      "Navrženo zůstat čitelné — čitelnost menu nikdy nekompromitována",
      "Funguje perfektně na každém telefonu — iOS, Android, staré i nové",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Zapamatovatelný design v ceně.",
    sub: "Vlastní video a fotopozadí plus QR objednávky, AI překlad a rezervace — vše v jedné paušální ceně.",
  },

  faq: {
    sub: "Vše, na co se majitelé restaurací ptají ohledně vlastního designu menu. Nevidíte ten svůj? Napište nám na WhatsApp — odpovídají skuteční lidé.",
    items: [
      {
        q: "Jaký druh videí funguje nejlépe jako pozadí menu?",
        a: "Krátké smyčky (5–15 sekund), natočené z telefonu, zaměřené na pohyb: kuchař plotnující jídlo, pára stoupající z woku, svíčky blikající na stole za soumraku, led praskající v koktejlu. Vyhněte se talking-head videím a čemukoli s textem. Video se přehrává ztlumeně a auto-loop, takže jemnost vyhrává nad dramatem.",
      },
      {
        q: "Zpomalí videa načítání menu na špatné WiFi?",
        a: "Ne. Videa jsou auto-komprimovaná, podávaná z globálního CDN a načítá se okamžitě jen první snímek, zatímco se video streamuje. Na pomalých připojeních (jako hotelová WiFi nebo venkovské 3G) zůstává menu použitelné a video se objeví, jakmile je připraveno — nikdy neblokuje samotné menu.",
      },
      {
        q: "Mohu mít různá pozadí pro různá menu?",
        a: "Ano. Každé menu (oběd, večeře, brunch, koktejl bar, dětské menu) může mít vlastní foto nebo video pozadí. Většina restaurací nastavuje klidnou denní fotku pro oběd a náladové video pro večeři — hosté vidí správnou atmosféru ve správnou denní dobu.",
      },
      {
        q: "Co když nemám profesionální videa nebo fotky?",
        a: "Záběry z telefonu fungují skvěle — záleží víc na rámování než na vybavení. 10sekundový klip z vašeho iPhonu, jak pokrmy vyjíždějí z trouby, poráží stock fotku zeleniny v každém testu, který jsme provedli. Mnoho restaurací natáčí vlastní pozadí během přípravy a nikdy se neohlížejí.",
      },
      {
        q: "Snižuje pozadí čitelnost menu?",
        a: "Ne — to byla celá designová výzva. Obsah menu sedí na lehce ztlumeném overlay, který se přizpůsobuje jasu pozadí, zajišťuje, že text má vždy správný kontrast. Můžete také ztlumit nebo odstranit pozadí na stránku (např. nechat ho na domovské obrazovce, vypnout pro objednávkovou obrazovku).",
      },
    ],
  },

  finalCta: {
    heading: "Přestaňte vypadat jako šablona.",
    headingAccent: "Začněte být zapamatováni.",
    sub: "Vlastní video a fotopozadí pro vaše restaurační QR menu. 14denní zkušební verze zdarma, žádná kreditní karta.",
  },
};
