import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Étterem étlap analitika — QR beolvasások, top ételek, turista nyelvek",
    description:
      "Lássa pontosan, hogyan használják a vendégek a QR étlapját. Napi beolvasások, legnézettebb ételek, nyelvi preferenciák, csúcsidők. Adat-vezérelt döntések éttermének.",
    canonical: "https://iq-rest.com/hu/analytics",
    ogLocale: "hu_HU",
    ogTitle: "Étterem analitika — kövesse a QR étlap beolvasásokat, ételeket és nyelveket",
    ogDescription:
      "Tudja, melyik ételeket nézik valóban a vendégei, mikor vannak a csúcsidők, és melyik turista nemzetiség van ma este az étkezőjében. 14 napos ingyenes próba.",
  },

  hero: {
    title: "Hagyjon fel a találgatással. Tudja, mit csinálnak valóban a vendégek.",
    subtitle:
      "Lássa az étterem étlap analitikát valós időben — óránkénti QR beolvasások, ételek, amelyeknél a vendégek időznek, nyelvek, amelyeket a turisták használnak, a leglassabb hétköznap — és használja ezeket az adatokat, hogy kevesebb étlapot nyomtasson, okosabban tervezzen, és a megfelelő különlegességeket promoválja.",
    trustLine: "500+ étterem 30+ országban",
  },

  seo: {
    description:
      "Étterem analitika, amelyhez nem kell adatcsapat. Az IQ Rest követ minden beolvasást, megtekintést, nyelvváltást és rendelést a QR étlapjáról, és felszínre hozza a fontos mintákat: legnézettebb ételek, csúcs beolvasási órák, hét legforgalmasabb napja, a turista tömeg nyelvi megoszlása. Hozzon adat-vezérelt döntéseket anélkül, hogy táblázatot nyitna meg.",
    fullDescription:
      "A legtöbb étterem ösztönből működik — 'úgy érezzük, a kedd lassú', 'azt hiszem, a tészta jól megy'. Az ösztön jó, de az adat jobb. Az IQ Rest követ minden interakciót a QR étlapjával, hogy ne kelljen találgatnia: hányszor olvasták be ma a QR-t, mely ételeket nézték a vendégek a leghosszabban, mely ételeket tették kosárba de nem rendelték meg, milyen nyelvet használtak a turisták.\n\nAz analitikai vezérlőpult három nézetben jeleníti meg a válaszokat: ma (élő beolvasások, jelenlegi rendelések, mit rendelnek éppen), a hét (top 10 étel, forgalmas órák, nyelvi megoszlás, foglalási meg-nem-jelenések), és trendek (havi növekedés, szezonalitás, hétköznapi minták). Bármelyik ételbe belemehet, hogy lássa, milyen gyakran nézik vs. rendelik (egy 200-szor megnézett, de csak 5-ször rendelt ételnek szöveg vagy fotó problémája van), vagy bármelyik nyelvbe, hogy lássa, milyen turista mixet szolgál ki valójában.\n\nA cél a döntések, nem a vezérlőpultok: 'a következő kedd történelmileg lassú → indítson happy hour push értesítést', 'olasz turisták 3-szor többször rendelnek tésztát, mint a helyiek → tegye a tésztát elsőre, ha nyelv=it', 'ennek az ételnek 90% megtekintési és 5% rendelési aránya van → javítsa a fotót'. Valódi változások, valódi bevétel, MBA nélkül.",
    benefitsHeading: "Miért szeretik az éttermek az IQ Rest analitikát a Google Analytics felett",
    benefits: [
      "Élő QR beolvasás számláló — lássa, ahogy az este telik, valós időben",
      "Legnézettebb és legrendeltebb ételek — vegye észre, mi működik és mi nem",
      "Nyelvi megoszlás — tudja, melyik turisták vannak az étkezőjében",
      "Csúcsidők és hétköznapi minták — okosabb tervezés, okosabb előkészület",
      "Megtekintés-rendelés konverzió ételenként — javítsa a rossz fotókat és gyenge leírásokat",
      "Foglalási analitika — foglalási források, meg-nem-jelenési arány, létszám mix",
    ],
  },

  pricing: {
    heading: "Egy csomag.",
    headingAccent: "Teljes analitika benne.",
    sub: "Étterem analitika, QR rendelés, AI fordítás és foglalások — minden egy fix árban. Nincs prémium szint az adatokért, soha.",
  },

  faq: {
    sub: "Minden, amit étterem tulajdonosok kérdeznek az étlap analitikáról. Nem látja a sajátját? Üzenjen nekünk WhatsApp-on — valódi emberek válaszolnak.",
    items: [
      {
        q: "Mit láthatok valójában az analitikai vezérlőpulton?",
        a: "Élő QR beolvasások (ma, ezen a héten, ebben a hónapban), legnézettebb ételek, legrendeltebb ételek, megtekintés-rendelés konverzió ételenként, vendégek nyelvi megoszlása, csúcsidők hét napja szerint, átlagos rendelési érték, legforgalmasabb asztalok, foglalási meg-nem-jelenési arány, és időbeli trendek. Minden egy vezérlőpulton, beállítás nélkül.",
      },
      {
        q: "Hogyan használjam ezt valóban a bevétel növelésére?",
        a: "Három minta működik a legtöbb étterem számára: (1) rendezze át az étlapot, hogy a legjobban konvertáló ételek elsőként jelenjenek meg; (2) javítsa a fotót vagy leírást a magas megtekintésű, de alacsony rendelésű ételeknél; (3) promováljon happy hour-t vagy különlegességet történelmileg lassú hétköznapokon/órákban. Láttunk éttermeket 15–30%-kal növelni a hétköznapi bevételüket csak ettől a három változástól.",
      },
      {
        q: "Ez névtelen, vagy egyéneket követ?",
        a: "Névtelen és összesített. A megtekintéseket és rendeléseket session szerint követjük, nem azonosítható felhasználó szerint. Nincsenek hosszú távon tárolt e-mailek, telefonszámok, IP címek. A vezérlőpult mintákat ('200 beolvasás pénteken') mutat, nem embereket. Teljes mértékben GDPR-kompatibilis tervezés alapján.",
      },
      {
        q: "Exportálhatom az adatokat?",
        a: "Igen. Exportáljon bármilyen nézetet CSV-ként (top ételek, napi beolvasások, óránkénti megoszlás stb.), és nyissa meg Excel-ben vagy Google Sheets-ben. Hasznos befektetőkkel, könyvelőkkel való megosztáshoz, vagy POS adatokkal való kombináláshoz.",
      },
      {
        q: "Szükségem van technikai beállításra az analitika megszerzéséhez?",
        a: "Nullára. Az analitika alapértelmezetten bekapcsolódik abban a pillanatban, amikor a QR étlap élesedik — minden beolvasás, megtekintés és rendelés automatikusan követődik. A vezérlőpult a standard előfizetés része, nem upsell, és hasznos adatokat fog látni az első napon, amikor a vendégek beolvasnak.",
      },
    ],
  },

  finalCta: {
    heading: "Hagyjon fel a találgatással.",
    headingAccent: "Kezdjen el mérni.",
    sub: "Élő QR beolvasási analitika, top ételek, csúcsidők, turista nyelvi megoszlás. 14 napos ingyenes próba, bankkártya nélkül.",
  },
};
