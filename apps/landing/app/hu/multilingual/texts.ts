import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Többnyelvű étterem étlap — 35 nyelv, egy koppintás a váltáshoz",
    description:
      "Szolgálja ki a nemzetközi vendégeket a saját nyelvükön. Étterem étlap 35 nyelven egy koppintásos váltással. RTL támogatás arabhoz és perzsához. 14 napos ingyenes próba.",
    canonical: "https://iq-rest.com/hu/multilingual",
    ogLocale: "hu_HU",
    ogTitle: "Többnyelvű étterem étlap weboldal — 35 nyelv beépítve",
    ogDescription:
      "A turisták beolvasnak, automatikusan saját nyelvükön látják az étlapot. 35 nyelv, RTL támogatás, automatikus érzékelés a telefon beállításaiból. 14 napos ingyenes próba.",
  },

  hero: {
    title: "Az étlapja minden turista nyelvén beszél.",
    subtitle:
      "Egy többnyelvű étterem étlap nem lehet projekt. Az IQ Rest-tel a QR étlapja automatikusan érzékeli minden vendég telefonjának nyelvét, és a 35 nyelv bármelyikén szolgálja ki — beleértve az arab és perzsa nyelvet is megfelelő jobbról-balra megjelenítéssel.",
    trustLine: "4.9 · 500+ étterem 30+ országban",
  },

  seo: {
    description:
      "Építse meg az étlapot egyszer, szolgálja ki 35 nyelven. Az IQ Rest automatikusan érzékeli minden vendég telefonjának nyelvét, és a saját nyelvükön renderel étlapot — nincs zászló koppintás, nincs nyelvi akadály, nincsenek kínos Google Translate pillanatok. A spanyoltól és némettől a japánig, arabig és mandarinig a vendégei úgy látják az éttermét, ahogy látniuk kell.",
    fullDescription:
      "A legtöbb 'többnyelvű' étlap törött Google Translate PDF-je, egyszer kinyomtatva és soha nem frissítve. Az IQ Rest többnyelvű étterem weboldala valódi i18n: minden nyelvnek saját, megfelelően lefordított példánya, saját URL slugja, saját meta tagjai vannak a Google indexeléséhez, és saját routing-ja az étlap alkalmazás belsejében.\n\nAmikor egy francia nyelvű iPhone-nal rendelkező turista beolvassa a QR-t, az étlap automatikusan franciául nyílik meg — nincs koppintás, nincs döntés. Bármikor más nyelvre válthatnak a felső nyelv választóval, de a legtöbbjüknek soha nincs rá szüksége. Ugyanez vonatkozik az étrendi címkékre ('vegan' lesz 'vegano' / 'vegetarisch' / 'ヴィーガン' nyelvtől függően), a hibaüzenetekre, a 'kosárba helyezés' gombokra, a nyugtákra. Minden UI string 35 nyelven, nem csak az étlap tartalom.\n\nRTL nyelvekhez — arab és perzsa — az egész elrendezés megfelelően megfordul: a szöveg jobbra igazodik, a menük jobbról nyílnak, az árak az ételnév után jelennek meg az elvárások szerint. Ez nem CSS hack, ez teljes RTL támogatás, amely az arab és perzsa vendégeket kiszolgáltnak érzi, nem utólag toldottnak.",
    benefitsHeading: "Miért győzi le egy valódi többnyelvű étlap a PDF fordítást",
    benefits: [
      "35 nyelv megfelelő UI fordítással — nem csak étlap tételek",
      "Automatikusan érzékeli a vendég telefonjának nyelvét — nincs koppintás",
      "Manuális nyelvváltó vendégeknek, akik másik nyelvet preferálnak",
      "Teljes RTL támogatás arabhoz és perzsához — nem CSS hack",
      "Minden nyelvnek saját URL-je van — a Google 35 verziót indexel",
      "Cseréljen le egy étel leírást anyanyelvén — a fordítások követik",
    ],
  },

  pricing: {
    heading: "Egy csomag.",
    headingAccent: "Mind a 35 nyelv benne.",
    sub: "Többnyelvű étlap, AI fordítás, QR rendelés és foglalások — mind egy fix árban. Nincsenek nyelvi díjak, nincsenek extrák RTL-ért.",
  },

  faq: {
    sub: "Minden, amit étterem tulajdonosok kérdeznek a többnyelvű étlapról. Nem látja a sajátját? Üzenjen nekünk WhatsApp-on — valódi emberek válaszolnak.",
    items: [
      {
        q: "Hány nyelvet támogat az étlap?",
        a: "35 nyelvet, beleértve az angol, spanyol, német, francia, olasz, portugál, holland, lengyel, cseh, szlovák, magyar, román, bolgár, horvát, szerb, szlovén, görög, török, orosz, ukrán, litván, lett, észt, finn, svéd, norvég, dán, izlandi, katalán, ír gael, arab, perzsa, japán, koreai és kínai nyelvet. Az UI string-ek mindegyikhez professzionálisan lefordítva.",
      },
      {
        q: "Hogyan váltanak nyelvet a vásárlók?",
        a: "Két módon: automatikusan (az étlap a telefonjuk nyelvén nyílik meg) és manuálisan (nyelv választó az étlap tetején). A turisták 80%-a soha nem nyúl a manuális választóhoz — az automatikus érzékelés egyszerűen működik, mert a telefonjuk már tudja a nyelvüket.",
      },
      {
        q: "Támogatnak jobbról-balra nyelveket, mint az arab és perzsa?",
        a: "Igen, teljes RTL elrendezéssel. Az egész étlap megfordul: a szöveg jobbra igazodik, az oszlopok megfordulnak, a navigációs fiókok a jobb oldalról nyílnak, az árak az ételnevek után jelennek meg. Ez valódi RTL támogatás, elrendezés szinten implementálva, nem csak CSS direction trükk.",
      },
      {
        q: "A Google indexelni fogja az étlapomat mind a 35 nyelven?",
        a: "Igen. Minden nyelvnek saját URL slugja (pl. /es, /fr, /de), megfelelő hreflang tagjai, lokalizált meta címei és leírásai, és nyelv-specifikus strukturált adatai vannak. A Google minden nyelvet külön oldalként kezel az adott locale-hoz, ami azt jelenti, hogy a saját nyelvükön kereső turisták nagyobb valószínűséggel találják meg.",
      },
      {
        q: "Mi van, ha nem akarom mind a 35 nyelvet — csak a fő piacaimat?",
        a: "Válassza ki, mely nyelvek aktívak. Ha tengerparti étterem Görögországban, főként brit, német és olasz turistákat kiszolgálva, csak az angolt, németet és olaszt engedélyezze — a többi nem jelenik meg a nyelv választóban vagy automatikus érzékelésben. Bármikor engedélyezhet többet később, ahogy a turista mix változik.",
      },
    ],
  },

  finalCta: {
    heading: "Minden turista telefon nyelve.",
    headingAccent: "Már támogatva.",
    sub: "Szolgáljon ki többnyelvű étlapot 35 nyelven, beleértve a RTL arabot és perzsát. 14 napos ingyenes próba, bankkártya nélkül, nyelvi díjak nélkül.",
  },
};
