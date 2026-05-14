import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Spravujte restauraci z telefonu — mobilní dashboard pro restaurace",
    description:
      "Přidávejte pokrmy, měňte ceny, nahrávejte fotky, prohlížejte objednávky — vše z telefonu. Celý dashboard IQ Rest je mobile-first. Žádný počítač není potřeba, nikdy.",
    canonical: "https://iq-rest.com/cs/mobile-management",
    ogLocale: "cs_CZ",
    ogTitle: "Mobilní správa restaurace — řiďte své menu z telefonu",
    ogDescription:
      "Aktualizujte ceny mezi stoly. Nahrávejte fotky z fotoaparátu. Prohlížejte živé objednávky na lince. Celý dashboard IQ Rest běží na vašem telefonu.",
  },

  hero: {
    title: "Řiďte restauraci z telefonu. Mezi stoly.",
    subtitle:
      "Celý dashboard IQ Rest je postaven mobile-first — přidávejte pokrmy, měňte fotky, ceny a čtěte živé objednávky ze stejného telefonu v kapse zástěry. Žádný laptop, žádný počítač v kanceláři, žádné výmluvy.",
    trustLine: "500+ restaurací ve 30+ zemích",
  },

  seo: {
    description:
      "Majitelé restaurací nesedí u stolu — jsou za barem, v kuchyni, na place. IQ Rest je postaven na tuto realitu. Každá funkce dashboardu, od přidávání nových pokrmů po prohlížení živých objednávek, byla navržena pro palce a malé obrazovky jako první. Pokud umíte používat Instagram, zvládnete celou restauraci řídit z IQ Rest na telefonu.",
    fullDescription:
      "Většina softwaru pro správu restaurací je desktop-first s 'mobilní verzí' přilepenou jako dodatečný nápad — drobná tlačítka, rozbité layouty a funkce schované tři menu hluboko. IQ Rest byl navržen opačně: každá obrazovka funguje perfektně na telefonu a desktopová verze je jen totéž UI zvětšené.\n\nCo to v praxi znamená: vyfoťte dnešní specialitu fotoaparátem telefonu a nahrajte ji rovnou do menu. Všimněte si překlepu v popisu pokrmu při sklízení stolu — opravte na místě, změna je živá během sekund. Odchází vám kuchař? Stáhněte pokrm offline z telefonu, než další host naskenuje váš QR. Nový pokrm z kuchyně? Ťuk, napsat, vyfotit, nastavit cenu — hosté ho mohou objednat o 30 sekund později.\n\nTotéž platí pro objednávky, rezervace, analytiku a překlady. Seznam živých objednávek se obnovuje v reálném čase. Potvrzení rezervací jsou jedním ťuknutím. Denní tržby, top pokrmy a nejrušnější hodiny se vejdou na jednu obrazovku telefonu. Nikdy nemusíte chodit do back office cokoliv řešit.",
    benefitsHeading: "Proč mobile-first správa všechno mění",
    benefits: [
      "Plný přístup k dashboardu na jakémkoliv smartphonu nebo tabletu — žádná aplikace k instalaci",
      "Nahrávejte fotky pokrmů přímo z fotoaparátu telefonu dvěma ťuknutími",
      "Aktualizujte ceny, popisy, otevírací dobu odkudkoli",
      "Drag-and-drop přívětivý k dotyku pro kategorie a řazení pokrmů",
      "Živé objednávky, rezervace a analytika se vejdou na jednu obrazovku telefonu",
      "Funguje offline-tolerant — dokončete úpravy, sync při obnovení připojení",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Řiďte z telefonu.",
    sub: "Mobile-first dashboard plus QR menu, online objednávky, AI překlad a rezervace — vše v jedné paušální ceně.",
  },

  faq: {
    sub: "Vše, na co se majitelé restaurací ptají ohledně mobilní správy. Nevidíte ten svůj? Napište nám na WhatsApp — odpovídají skuteční lidé.",
    items: [
      {
        q: "Musím instalovat mobilní aplikaci?",
        a: "Ne. IQ Rest běží v prohlížeči vašeho telefonu — Safari, Chrome, cokoliv už používáte. Můžete ho přidat na domovskou obrazovku pro přístup jedním ťuknutím (bude to působit jako nativní aplikace), ale není co stahovat z App Store, žádná oprávnění k udělení, žádné aktualizace verzí k hlídání.",
      },
      {
        q: "Můžu opravdu nahrávat fotky menu přímo z telefonu?",
        a: "Ano — to je celý smysl. Ťukněte na 'přidat fotku' u pokrmu, otevře se fotoaparát telefonu, vyfoťte nebo vyberte z galerie, ťukněte nahrát. Obrázek se automaticky upraví velikost, optimalizuje pro web a je živý v menu během sekund. Žádný Lightroom, žádné přenášení souborů do počítače, žádné SFTP.",
      },
      {
        q: "Funguje to na tabletech a u recepce?",
        a: "Ano. Dashboard je optimalizován pro telefony, tablety i stolní počítače — stejné UI, stejné zkratky, stejná rychlost. Mnoho restaurací provozuje iPad u host stoonu pro rezervace, telefon v kapse kuchaře pro objednávky a laptop v kanceláři pro fakturaci — všechno stejné přihlášení.",
      },
      {
        q: "A co aktualizace cen během rušného provozu?",
        a: "Navrženo na to. Ťukněte na pokrm, upravte cenu, uložte — hosté vidí novou cenu během sekund bez aktualizace. Žádné opětovné publikování, žádné přebudování, žádné zpoždění synchronizace. Totéž pro označení pokrmu jako 'vyprodáno' (v menu okamžitě zšedne) nebo přidání denní speciality mezi nájezdy.",
      },
      {
        q: "Co když mi telefon zemře uprostřed úpravy?",
        a: "Úpravy se ukládají po polích, jak píšete — pokud vám telefon zemře nebo spadne internet, najdete své změny stále tam, když se přihlásíte na jakémkoli zařízení. Žádná ztracená práce.",
      },
    ],
  },

  finalCta: {
    heading: "Řiďte ji z kapsy zástěry.",
    headingAccent: "Vynechte back office.",
    sub: "Celý dashboard se vejde na váš telefon. 14denní zkušební verze zdarma, žádná kreditní karta, žádná aplikace k instalaci.",
  },
};
