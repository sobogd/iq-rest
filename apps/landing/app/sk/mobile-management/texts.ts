import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Spravujte reštauráciu z telefónu — mobilný dashboard pre reštaurácie",
    description:
      "Pridávajte jedlá, meňte ceny, nahrávajte fotky, prezerajte objednávky — všetko z telefónu. Celý dashboard IQ Rest je mobile-first. Žiadny počítač nie je potrebný, nikdy.",
    canonical: "https://iq-rest.com/sk/mobile-management",
    ogLocale: "sk_SK",
    ogTitle: "Mobilná správa reštaurácie — riaďte svoje menu z telefónu",
    ogDescription:
      "Aktualizujte ceny medzi stolmi. Nahrávajte fotky z fotoaparátu. Prezerajte živé objednávky na linke. Celý dashboard IQ Rest beží na vašom telefóne.",
  },

  hero: {
    title: "Riaďte reštauráciu z telefónu. Medzi stolmi.",
    subtitle:
      "Celý dashboard IQ Rest je postavený mobile-first — pridávajte jedlá, meňte fotky, ceny a čítajte živé objednávky z toho istého telefónu vo vrecku zástery. Žiadny laptop, žiadny počítač v kancelárii, žiadne výhovorky.",
    trustLine: "500+ reštaurácií v 30+ krajinách",
  },

  seo: {
    description:
      "Majitelia reštaurácií nesedia za stolom — sú za barom, v kuchyni, na place. IQ Rest je postavený na túto realitu. Každá funkcia dashboardu, od pridávania nových jedál po prezeranie živých objednávok, bola navrhnutá pre palce a malé obrazovky ako prvé. Ak viete používať Instagram, zvládnete celú reštauráciu riadiť z IQ Rest na telefóne.",
    fullDescription:
      "Väčšina softvéru pre správu reštaurácií je desktop-first s 'mobilnou verziou' prilepenou ako dodatočná myšlienka — drobné tlačidlá, rozbité layouty a funkcie skryté tri menu hlboko. IQ Rest bol navrhnutý opačne: každá obrazovka funguje perfektne na telefóne a desktopová verzia je len to isté UI zväčšené.\n\nČo to v praxi znamená: odfoťte dnešnú špecialitu fotoaparátom telefónu a nahrajte ju rovno do menu. Všimnite si preklepu v popise jedla pri zbieraní stola — opravte na mieste, zmena je živá počas sekúnd. Odchádza vám kuchár? Stiahnite jedlo offline z telefónu, kým ďalší hosť naskenuje váš QR. Nové jedlo z kuchyne? Ťuk, napísať, odfotiť, nastaviť cenu — hostia ho môžu objednať o 30 sekúnd neskôr.\n\nTo isté platí pre objednávky, rezervácie, analytiku a preklady. Zoznam živých objednávok sa obnovuje v reálnom čase. Potvrdenia rezervácií sú jedným ťuknutím. Denné tržby, top jedlá a najrušnejšie hodiny sa zmestia na jednu obrazovku telefónu. Nikdy nemusíte ísť do back office čokoľvek riešiť.",
    benefitsHeading: "Prečo mobile-first správa všetko mení",
    benefits: [
      "Plný prístup k dashboardu na akomkoľvek smartfóne alebo tablete — žiadna aplikácia na inštaláciu",
      "Nahrávajte fotky jedál priamo z fotoaparátu telefónu dvomi ťuknutiami",
      "Aktualizujte ceny, popisy, otváracie hodiny odkiaľkoľvek",
      "Drag-and-drop priateľský k dotyku pre kategórie a radenie jedál",
      "Živé objednávky, rezervácie a analytika sa zmestia na jednu obrazovku telefónu",
      "Funguje offline-tolerant — dokončite úpravy, sync pri obnovení pripojenia",
    ],
  },

  pricing: {
    heading: "Jeden plán.",
    headingAccent: "Riaďte z telefónu.",
    sub: "Mobile-first dashboard plus QR menu, online objednávky, AI preklad a rezervácie — všetko v jednej paušálnej cene.",
  },

  faq: {
    sub: "Všetko, na čo sa majitelia reštaurácií pýtajú ohľadom mobilnej správy. Nevidíte ten svoj? Napíšte nám na WhatsApp — odpovedajú skutoční ľudia.",
    items: [
      {
        q: "Musím inštalovať mobilnú aplikáciu?",
        a: "Nie. IQ Rest beží v prehliadači vášho telefónu — Safari, Chrome, čokoľvek už používate. Môžete ho pridať na domovskú obrazovku pre prístup jedným ťuknutím (bude to pôsobiť ako natívna aplikácia), ale nie je čo sťahovať z App Store, žiadne oprávnenia na udelenie, žiadne aktualizácie verzií na strážiť.",
      },
      {
        q: "Môžem skutočne nahrávať fotky menu priamo z telefónu?",
        a: "Áno — to je celý zmysel. Ťuknite na 'pridať fotku' pri jedle, otvorí sa fotoaparát telefónu, odfoťte alebo vyberte z galérie, ťuknite nahrať. Obrázok sa automaticky upraví veľkosť, optimalizuje pre web a je živý v menu počas sekúnd. Žiadny Lightroom, žiadne prenášanie súborov do počítača, žiadne SFTP.",
      },
      {
        q: "Funguje to na tabletoch a pri recepcii?",
        a: "Áno. Dashboard je optimalizovaný pre telefóny, tablety aj stolné počítače — rovnaké UI, rovnaké skratky, rovnaká rýchlosť. Mnoho reštaurácií prevádzkuje iPad pri host stoone pre rezervácie, telefón vo vrecku kuchára pre objednávky a laptop v kancelárii pre fakturáciu — všetko rovnaké prihlásenie.",
      },
      {
        q: "A čo aktualizácie cien počas rušnej prevádzky?",
        a: "Navrhnuté na to. Ťuknite na jedlo, upravte cenu, uložte — hostia vidia novú cenu počas sekúnd bez aktualizácie. Žiadne opätovné publikovanie, žiadne prebudovávanie, žiadne oneskorenie synchronizácie. To isté pre označenie jedla ako 'vypredané' (v menu okamžite zošedne) alebo pridanie dennej špeciality medzi nájazdmi.",
      },
      {
        q: "Čo ak mi telefón zomrie uprostred úpravy?",
        a: "Úpravy sa ukladajú po poliach, ako píšete — ak vám telefón zomrie alebo padne internet, nájdete svoje zmeny stále tam, keď sa prihlásite na akomkoľvek zariadení. Žiadna stratená práca.",
      },
    ],
  },

  finalCta: {
    heading: "Riaďte ju z vrecka zástery.",
    headingAccent: "Vynechajte back office.",
    sub: "Celý dashboard sa zmestí na váš telefón. 14-dňová skúšobná verzia zadarmo, žiadna kreditná karta, žiadna aplikácia na inštaláciu.",
  },
};
