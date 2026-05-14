import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Flerspråkig restaurangmeny — 35 språk, en knapptryckning för att byta",
    description:
      "Servera internationella gäster på deras språk. Restaurangmeny på 35 språk med en-knapptrycks-byte. RTL-stöd för arabiska och persiska. 14 dagars gratis provperiod.",
    canonical: "https://iq-rest.com/sv/multilingual",
    ogLocale: "sv_SE",
    ogTitle: "Flerspråkig restaurangmeny-webbplats — 35 språk inbyggda",
    ogDescription:
      "Turister skannar, ser din meny på sitt språk automatiskt. 35 språk, RTL-stöd, auto-detektering från telefoninställningar. 14 dagars gratis provperiod.",
  },

  hero: {
    title: "Din meny talar varje turists språk.",
    subtitle:
      "En flerspråkig restaurangmeny borde inte vara ett projekt. Med IQ Rest auto-detekterar din QR-meny varje gästs telefonspråk och serverar den på något av 35 språk — inklusive arabiska och persiska med korrekt höger-till-vänster-rendering.",
    trustLine: "500+ restauranger i 30+ länder",
  },

  seo: {
    description:
      "Bygg din meny en gång, servera den på 35 språk. IQ Rest auto-detekterar varje gästs telefonspråk och renderar menyn på deras tungomål — inga flagg-tryckningar, ingen språkbarriär, inga pinsamma Google Translate-stunder. Från spanska och tyska till japanska, arabiska och mandarin — dina gäster ser din restaurang så som den var menad att ses.",
    fullDescription:
      "De flesta 'flerspråkiga' menyer är PDF:er av trasig Google Translate, tryckta en gång och aldrig uppdaterade. IQ Rests flerspråkiga restaurangwebbplats är riktig i18n: varje språk har sin egen ordentligt översatta text, sin egen URL-slug, sina egna metataggar för Google att indexera, och sin egen routning i menyappen.\n\nNär en turist med en fransk iPhone skannar din QR-kod öppnas menyn automatiskt på franska — inga tryck, inga beslut. De kan byta till vilket annat språk som helst med språkväljaren högst upp, men de flesta behöver det aldrig. Detsamma gäller kosttaggar ('vegan' blir 'vegano' / 'vegetarisch' / 'ヴィーガン' beroende på språk), felmeddelanden, 'lägg i varukorg'-knappar, kvitton. Varje UI-sträng på 35 språk, inte bara menyinnehåll.\n\nFör RTL-språk — arabiska och persiska — vänds hela layouten korrekt: text justeras höger, menyer öppnas från höger, priser visas efter rättnamnet som väntat. Det här är ingen CSS-fix, det är fullt RTL-stöd som får arabiska och persiska gäster att känna sig serverade, inte eftermonterade.",
    benefitsHeading: "Varför en riktig flerspråkig meny slår en PDF-översättning",
    benefits: [
      "35 språk med ordentlig UI-översättning — inte bara menypositioner",
      "Auto-detekterar gästens telefonspråk — inga tryck krävs",
      "Manuell språkväxlare för gäster som föredrar ett annat språk",
      "Fullt RTL-stöd för arabiska och persiska — ingen CSS-fix",
      "Varje språk har sin egen URL — Google indexerar 35 versioner av din webbplats",
      "Byt en rättbeskrivning på ditt modersmål — översättningarna följer med",
    ],
  },

  pricing: {
    heading: "En plan.",
    headingAccent: "Alla 35 språk ingår.",
    sub: "Flerspråkig meny, AI-översättning, QR-beställning och bokningar — allt i ett fast pris. Inga avgifter per språk, inga extra för RTL.",
  },

  faq: {
    sub: "Allt restaurangägare frågar om en flerspråkig meny. Ser du inte din? Skicka oss ett meddelande på WhatsApp — riktiga människor svarar.",
    items: [
      {
        q: "Hur många språk stöder menyn?",
        a: "35 språk inklusive engelska, spanska, tyska, franska, italienska, portugisiska, nederländska, polska, tjeckiska, slovakiska, ungerska, rumänska, bulgariska, kroatiska, serbiska, slovenska, grekiska, turkiska, ryska, ukrainska, litauiska, lettiska, estniska, finska, svenska, norska, danska, isländska, katalanska, irisk-gaeliska, arabiska, persiska, japanska, koreanska och kinesiska. UI-strängar är professionellt översatta för varje språk.",
      },
      {
        q: "Hur byter kunder språk?",
        a: "Två sätt: automatiskt (menyn öppnas på telefonens språk) och manuellt (en språkväljare högst upp i menyn). 80 % av turister rör aldrig den manuella väljaren — auto-detekteringen bara fungerar eftersom telefonen redan vet deras språk.",
      },
      {
        q: "Stöder ni höger-till-vänster-språk som arabiska och persiska?",
        a: "Ja, med fullt RTL-layout. Hela menyn vänds: text justeras till höger, kolumner reverseras, navigationslådor öppnas från höger sida, priser visas efter rättnamn. Det är riktigt RTL-stöd implementerat på layoutnivå, inte bara CSS-direction-trick.",
      },
      {
        q: "Kommer Google att indexera min meny på alla 35 språk?",
        a: "Ja. Varje språk har sin egen URL-slug (t.ex. /es, /fr, /de), korrekta hreflang-taggar, lokaliserade metatitlar och beskrivningar, och språkspecifika strukturerade data. Google behandlar varje språk som en separat sida för den lokalen, vilket betyder att turister som söker efter din restaurang på sitt språk har större chans att hitta dig.",
      },
      {
        q: "Vad om jag inte vill ha alla 35 språk — bara mina huvudmarknader?",
        a: "Välj vilka språk som är aktiva. Om du är en strandrestaurang i Grekland som mest betjänar brittiska, tyska och italienska turister, aktivera bara engelska, tyska och italienska — resten visas inte i språkväljaren eller auto-detektering. Du kan alltid aktivera fler senare när din turistmix förändras.",
      },
    ],
  },

  finalCta: {
    heading: "Varje turists telefonspråk.",
    headingAccent: "Redan stött.",
    sub: "Servera en flerspråkig meny på 35 språk, inklusive RTL arabiska och persiska. 14 dagars gratis provperiod, inget kreditkort, inga avgifter per språk.",
  },
};
