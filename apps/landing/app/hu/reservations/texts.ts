import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Étterem foglalási rendszer — 24/7 asztal foglalások, telefonálás nélkül",
    description:
      "Fogadjon étterem asztal foglalásokat 24/7 a QR étlapjáról és weboldaláról. White-label foglalási widget, e-mail emlékeztetők, kevesebb meg-nem-jelenés. 14 napos ingyenes próba.",
    canonical: "https://iq-rest.com/hu/reservations",
    ogLocale: "hu_HU",
    ogTitle: "Étterem foglalások — 24/7 asztal foglalási rendszer éttermek számára",
    ogDescription:
      "Hagyjon fel a foglalások elszalasztásával főzés közben. A vendégek 24/7 foglalnak a QR étlapjáról, e-mail emlékeztetőket kapnak, és Ön csökkenti a meg-nem-jelenéseket. 14 napos ingyenes próba.",
  },

  hero: {
    title: "Hagyjon fel a foglalások elszalasztásával főzés közben.",
    subtitle:
      "Fogadjon étterem asztal foglalásokat 24/7 — közvetlenül a QR étlapjáról, weboldaláról és Instagramról. A vendégek dátumot, időt és létszámot választanak, Ön egy koppintással megerősíti, az e-mail emlékeztetők automatikusan mennek ki. Kevesebb telefon, kevesebb meg-nem-jelenés, több vendég esténként.",
    trustLine: "500+ étterem 30+ országban",
  },

  seo: {
    description:
      "Teljes étterem foglalási rendszer beépítve a QR étlapjába. A vendégek asztalt foglalnak az étlapról, weboldaláról, Instagram bio linkről vagy egy Google Maps gombról — bármikor, nappal vagy éjjel. Az új foglalásokat valós időben látja, egy koppintással megerősíti vagy elutasítja, és a rendszer e-mail emlékeztetőket küld, amelyek drasztikusan csökkentik a meg-nem-jelenéseket. Nincs OpenTable levonás, nincs vendégenkénti jutalék, nincs szerződés.",
    fullDescription:
      "A telefonos foglalások haldokolnak. A turisták nem hívnak (más országhívó kód, nyelvi akadály), a millenniumiak nem hívnak (szöveg-első generáció), és Ön elveszíti a foglalások felét műszak közben, amikor senki sem veszi fel. Az IQ Rest foglalások ott élnek, ahol a vendégei már vannak: az étlapján, a telefonjuk böngészőjében, az Instagram bio linken.\n\nA foglalási folyamat két képernyő — válasszon dátumot és létszámot, hagyjon nevet és telefonszámot, opcionálisan adjon hozzá egy megjegyzést ('születésnap', 'allergia: dió', 'magas szék kérem'). A foglalást azonnal megkapja, egy koppintásos megerősítéssel/elutasítással. A megerősített vendégek automatikus e-mail emlékeztetőt kapnak 24 órával előtte, ami önmagában ~30%-kal csökkenti a meg-nem-jelenéseket. Beállíthat max. vendégszámot időpontonként, blackout dátumokat, és hogy mely asztalok foglalhatók vs. csak walk-in.\n\nAz OpenTable-lel vagy TheFork-kal ellentétben itt nincs vendégenkénti jutalék, nincs külön letöltendő alkalmazás, és nincs harmadik fél Ön és a vendég között. A foglalás az Öné, az adatok az Önéi, és a rendszer az előfizetés része — nem foglalási adó.",
    benefitsHeading: "Miért hagyják el az éttermek az OpenTable-t az IQ Rest foglalásokért",
    benefits: [
      "24/7 foglalások QR étlapról, weboldalról, Instagramról, Google Maps gombról",
      "Nincs vendégenkénti jutalék — fix előfizetés, a bevétel 100%-a Önnél marad",
      "Automatikus e-mail emlékeztetők átlagosan ~30%-kal csökkentik a meg-nem-jelenéseket",
      "Egy koppintásos megerősítés / elutasítás telefonjáról, várakozás nélkül",
      "Max vendégszám időpontonként, blackout dátumok, asztal szintű foglalási szabályok",
      "Speciális kérések (allergiák, születésnapok) tisztán rögzítve minden foglalással",
    ],
  },

  pricing: {
    heading: "Egy csomag.",
    headingAccent: "Korlátlan foglalások.",
    sub: "Foglalások, QR étlap, online rendelések és AI fordítás — mind egy fix árban. Nincsenek vendégenkénti díjak, nincs jutalék, nincs szerződés.",
  },

  faq: {
    sub: "Minden, amit étterem tulajdonosok kérdeznek az online foglalásokról. Nem látja a sajátját? Üzenjen nekünk WhatsApp-on — valódi emberek válaszolnak.",
    items: [
      {
        q: "Levonnak jutalékot foglalásonként, mint az OpenTable vagy TheFork?",
        a: "Nullát. A foglalások a fix havi előfizetés részei — foglaljon napi 10 vendéget vagy 1 000-et, az ár ugyanaz. Nincs vendégenkénti díj, nincs foglalási adó, nincs levonás a bevételeiből. Az OpenTable 1–2,50 €/vendég díjához képest egy napi 50 vendéges étterem havi 1 500–3 750 €-t spórol meg.",
      },
      {
        q: "Hogyan foglalnak a vendégek — kell letölteniük egy alkalmazást?",
        a: "Nincs alkalmazás. Beolvassák a QR-t vagy rákattintanak a foglalási linkre — dátum, idő, létszám, név, telefon, opcionális megjegyzés. Kész. Az egész folyamat 30 másodperc alatt és bármelyik böngészőben működik. A foglalási űrlapot közvetlenül a weboldalába is beágyazhatja, vagy megoszthat egy tiszta foglalási URL-t Instagramon.",
      },
      {
        q: "Megerősíthetem a foglalásokat manuálisan, vagy automatikusan megerősödnek?",
        a: "Mindkét mód — az Ön választása időponton vagy napon. Auto-megerősítés, ha bízik az elérhetőségében és 24/7 reszponzívnak akar tűnni. Manuális megerősítés, ha át akarja vizsgálni a foglalásokat (zsúfolt hétvégék, különleges események). A foglalást azonnal megkapja, és egy koppintással megerősíti telefonjáról.",
      },
      {
        q: "Hogyan kezeli a rendszer a meg-nem-jelenéseket?",
        a: "Automatikus e-mail emlékeztetők mennek ki 24 órával és (opcionálisan) 2 órával a foglalás előtt — ez önmagában ~30%-kal csökkenti a meg-nem-jelenéseket a hívásokhoz vagy emlékeztető nélküli rendszerekhez képest. Megkövetelheti a telefonszámot is, megjelölheti a vendégeket 'meg-nem-jelent'-ként a vezérlőpulton, és idővel a rendszer megjelöli az ismétlődő bűnösöket.",
      },
      {
        q: "Korlátozhatom, hány vendéget fogadok esténként?",
        a: "Igen. Állítson be max vendéget időpontonként, max vendéget naponta, és blackout dátumokat (zárások, privát események). Akár konkrét asztalokat is megjelölhet 'foglalható' vs. 'csak walk-in'-ként, így a prémium ablak melletti helyek szabadon maradnak a véletlenszerűségnek. A turisták és a helyiek ugyanabból a rendszerből foglalnak anélkül, hogy bármikor beletaposnának az alaprajzába.",
      },
    ],
  },

  finalCta: {
    heading: "Foglalások főzés közben.",
    headingAccent: "Emlékeztetők, hogy megjelenjenek.",
    sub: "Fogadjon foglalásokat 24/7 a QR étlapjáról, weboldaláról és Instagramról. 14 napos ingyenes próba, bankkártya nélkül, vendégenkénti jutalék nélkül.",
  },
};
