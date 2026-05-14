import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analytika restauračního menu — QR skeny, top pokrmy, turistické jazyky",
    description:
      "Vidíte přesně, jak hosté používají vaše QR menu. Denní skeny, nejprohlíženější pokrmy, jazykové preference, špičkové hodiny. Rozhodování založená na datech pro vaši restauraci.",
    canonical: "https://iq-rest.com/cs/analytics",
    ogLocale: "cs_CZ",
    ogTitle: "Restaurační analytika — sledujte skeny QR menu, pokrmy a jazyky",
    ogDescription:
      "Zjistěte, na které pokrmy se hosté skutečně dívají, kdy jsou špičkové hodiny a jaká turistická národnost je dnes večer ve vaší jídelně. 14denní zkušební verze zdarma.",
  },

  hero: {
    title: "Přestaňte hádat. Vězte, co hosté skutečně dělají.",
    subtitle:
      "Sledujte analytiku restauračního menu v reálném čase — QR skeny za hodinu, pokrmy, na kterých hosté zůstávají, jazyky turistů, nejpomalejší den v týdnu — a použijte ta data k tisku méně menu, chytřejšímu plánování, propagaci správných specialit.",
    trustLine: "500+ restaurací ve 30+ zemích",
  },

  seo: {
    description:
      "Restaurační analytika, která nevyžaduje datový tým. IQ Rest sleduje každý sken, prohlížení, přepnutí jazyka a objednávku z vašeho QR menu a zviditelňuje vzorce, které jsou důležité: nejprohlíženější pokrmy, špičkové hodiny skenování, nejrušnější den v týdnu, jazykové rozdělení vašeho turistického davu. Dělejte rozhodování založená na datech, aniž byste otevřeli tabulku.",
    fullDescription:
      "Většina restaurací běží na intuici — 'cítíme, že úterky jsou pomalé', 'myslím, že těstoviny jdou dobře'. Intuice je dobrá, ale data jsou lepší. IQ Rest sleduje každou interakci s vaším QR menu, abyste nemuseli hádat: kolikrát byl váš QR dnes naskenován, na které pokrmy hosté nejdéle hleděli, které pokrmy přidali do košíku, ale neobjednali, jaký jazyk turisté používali.\n\nDashboard analytiky zobrazuje odpovědi ve třech pohledech: dnes (živé skeny, aktuální objednávky, co se právě teď objednává), tento týden (top 10 pokrmů, rušné hodiny, jazykové rozdělení, no-show u rezervací) a trendy (růst měsíc po měsíci, sezónnost, vzorce dnů v týdnu). Můžete se zanořit do jakéhokoli pokrmu a vidět, jak často je prohlížen vs. objednán (pokrm prohlížený 200krát, ale objednaný 5krát má problém s textem nebo fotkou), nebo do jakéhokoli jazyka a vidět, jaký turistický mix skutečně obsluhujete.\n\nCílem jsou rozhodnutí, ne dashboardy: 'příští úterý je historicky pomalé → spustit happy hour push notifikaci', 'italští turisté objednávají těstoviny 3krát víc než místní → dejte těstoviny první, když jazyk=it', 'tento pokrm má 90% míru prohlížení, ale 5% míru objednání → vylepšete fotku'. Skutečné změny, skutečné příjmy, žádné MBA potřeba.",
    benefitsHeading: "Proč restaurace milují analytiku IQ Rest oproti Google Analytics",
    benefits: [
      "Živý čítač QR skenů — vidíte, jak se vám večer plní v reálném čase",
      "Nejprohlíženější a nejobjednávanější pokrmy — všimněte si, co funguje a co ne",
      "Jazykové rozdělení — vězte, kteří turisté jsou ve vaší jídelně",
      "Špičkové hodiny a vzorce dnů — plánujte chytřeji, připravujte chytřeji",
      "Konverze prohlížení na objednávku na pokrm — opravte špatné fotky a slabé popisy",
      "Analytika rezervací — zdroje rezervací, míra no-show, mix velikosti skupin",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Plná analytika v ceně.",
    sub: "Restaurační analytika, QR objednávky, AI překlad a rezervace — vše v jedné paušální ceně. Žádný prémiový tier pro data, nikdy.",
  },

  faq: {
    sub: "Vše, na co se majitelé restaurací ptají ohledně analytiky menu. Nevidíte ten svůj? Napište nám na WhatsApp — odpovídají skuteční lidé.",
    items: [
      {
        q: "Co vlastně mohu vidět v dashboardu analytiky?",
        a: "Živé QR skeny (dnes, tento týden, tento měsíc), nejprohlíženější pokrmy, nejobjednávanější pokrmy, konverze prohlížení na objednávku na pokrm, jazykové rozdělení hostů, špičkové hodiny podle dne v týdnu, průměrnou hodnotu objednávky, nejrušnější stoly, míru no-show u rezervací a trendy v čase. Vše na jednom dashboardu, bez nutnosti nastavení.",
      },
      {
        q: "Jak to skutečně použiji k růstu příjmů?",
        a: "Tři vzorce fungují pro většinu restaurací: (1) přeřaďte menu, aby se nejlépe konvertující pokrmy objevovaly první; (2) opravte fotku nebo popis u pokrmů s vysokým prohlížením, ale nízkým objednáváním; (3) propagujte happy hour nebo specialitu v historicky pomalých dnech/hodinách. Viděli jsme restaurace zvýšit příjmy v týdnu o 15–30 % jen z těchto tří změn.",
      },
      {
        q: "Je to anonymní, nebo sledujete jednotlivce?",
        a: "Anonymní a agregované. Sledujeme prohlížení menu a objednávky podle session, ne podle identifikovatelného uživatele. Žádné e-maily, žádná telefonní čísla, žádné IP adresy uchovávané dlouhodobě. Dashboard ukazuje vzorce ('200 skenů v pátek'), ne lidi. Plně GDPR-kompatibilní by design.",
      },
      {
        q: "Mohu data exportovat?",
        a: "Ano. Exportujte jakýkoliv pohled jako CSV (top pokrmy, denní skeny, hodinové rozdělení atd.) a otevřete v Excelu nebo Google Sheets. Užitečné pro sdílení s investory, účetními nebo pro kombinování s daty vašeho POS.",
      },
      {
        q: "Potřebuji nějaké technické nastavení k získání analytiky?",
        a: "Žádné. Analytika je zapnutá ve výchozím nastavení v okamžiku, kdy je vaše QR menu živé — každý sken, prohlížení a objednávka se sleduje automaticky. Dashboard je součástí standardního předplatného, ne upsell, a užitečná data uvidíte první den, kdy hosté skenují.",
      },
    ],
  },

  finalCta: {
    heading: "Přestaňte hádat.",
    headingAccent: "Začněte měřit.",
    sub: "Živá analytika QR skenů, top pokrmy, špičkové hodiny, jazykové rozdělení turistů. 14denní zkušební verze zdarma, žádná kreditní karta.",
  },
};
