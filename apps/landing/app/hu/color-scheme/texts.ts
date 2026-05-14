import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Márkázott étterem étlap — egyedi színséma és téma",
    description:
      "Egyezzen az étterme márkájával egyedi kiemelő színekkel. A világos és sötét téma automatikusan vált a vendég telefonjával. Márkázott QR étlap másodpercek alatt. 14 napos próba.",
    canonical: "https://iq-rest.com/hu/color-scheme",
    ogLocale: "hu_HU",
    ogTitle: "Egyedi színséma — márkázott étterem étlap másodpercek alatt",
    ogDescription:
      "Válassza ki a kiemelő színét, kapjon márkázott étterem étlapot. Automatikus világos/sötét mód igazodik minden vendég telefonjához. Nincs szükség dizájn eszközökre.",
  },

  hero: {
    title: "Az étlapja. Az ön színei. Az ön márkája.",
    subtitle:
      "Válasszon egy kiemelő színt, dobja be a logóját, és a QR étlapja azonnal valódi márkának néz ki sablon helyett. A világos és sötét téma automatikusan vált minden vendég telefonjával — az étlapja mindig szándékosnak tűnik.",
    trustLine: "500+ étterem 30+ országban",
  },

  seo: {
    description:
      "Az egyedi színséma a különbség egy általános QR étlap és egy márkázott étterem élmény között. Az IQ Rest lehetővé teszi, hogy kiválassza a pontos kiemelő színét (vagy beillessze a márka guidelines-aiból egy hex kódot), bedobja a logóját, és az egész étlap — gombok, linkek, kiemelések, kategória címkék — másodpercek alatt felveszi a márkája színét.",
    fullDescription:
      "A legtöbb QR étlap készítő egy fix színsémát ad: kék vagy piros, ennyi. Az IQ Rest úgy kezeli a márkáját, mintha számítana — válasszon bármilyen kiemelő színt egy színválasztóból, vagy illessze be a pontos hex kódot a márka guidelines-aiból (ugyanaz a narancs, mint a táblája, ugyanaz a zöld, mint a logója). Az étlap minden kiemelése — elsődleges gombok, linkek, kategória kiemelések, az aktív állapot a nyelv választóban — azonnal felveszi azt a színt.\n\nA világos és sötét mód automatikusan kezelődik. Amikor egy vendég telefonja sötét módban van (a legtöbb telefon vacsoránál), az étlapja sötét módban jelenik meg felerősített kiemelő színnel. Amikor kint vannak fényes napsütésben világos módban, az étlap alkalmazkodik. Nem választ világosat vagy sötétet — egy márkaszínt választ, és az étlap a megfelelő dolgot teszi minden eszközön.\n\nA logója az étlap tetején ül, a QR matrica nyomtatási sablonon, a rendelési nyugtán és a foglalási megerősítő e-mailen. Minden vendég érintkezési pont ugyanannak a márkának érződik, mert ugyanaz a márka. Nincs szükség dizájnerre, nincs Photoshop munkamenet, nincs drága 'étterem márka csomag' — csak egy színválasztó és egy logó feltöltés.",
    benefitsHeading: "Miért konvertál jobban egy márkázott színséma az alapértelmezett témánál",
    benefits: [
      "Válasszon bármilyen kiemelő színt — színválasztó vagy hex kód beillesztése",
      "Automatikus világos/sötét mód, amely igazodik minden vendég telefonjához",
      "Logó elhelyezés étlapon, QR matricán, nyugtákon és e-maileken",
      "Márkázott kinézet az első perctől — Photoshop vagy dizájner nélkül",
      "Váltson színt bármikor szezonális promóciókhoz (Valentin piros, karácsonyi zöld)",
      "A szín hozzáférhető marad — a kontraszt arányok automatikusan beállítódnak az olvashatóságért",
    ],
  },

  pricing: {
    heading: "Egy csomag.",
    headingAccent: "Az ön márka színei.",
    sub: "Egyedi színséma plusz QR étlap, online rendelés, AI fordítás és foglalások — minden egy fix árban. Branding dizájner nélkül.",
  },

  faq: {
    sub: "Minden, amit étterem tulajdonosok kérdeznek az étlap brandelésről. Nem látja a sajátját? Üzenjen nekünk WhatsApp-on — valódi emberek válaszolnak.",
    items: [
      {
        q: "Megegyeztethetem a pontos márkaszínemet a logómról vagy táblámról?",
        a: "Igen — illessze be a pontos hex kódot (pl. #C24A2D), és az étlap pontosan azt a színt használja minden kiemeléshez. Automatikusan generálunk egy sötétebb árnyalatot a hover állapotokhoz és egy világosabbat a hátterekhez, így egy márkaszín teljes UI palettát kap anélkül, hogy bármit tennie kellene.",
      },
      {
        q: "Támogatja az étlap a világos és sötét módot?",
        a: "Igen, automatikusan. Az étlap érzékeli minden vendég telefon témáját, és valós időben vált a világos és sötét mód között. A kiemelő színe ugyanaz marad; a környező UI invertálódik. A legtöbb étterem soha nem állít be világosat vs. sötétet — kiválasztanak egy színt, és hagyják, hogy az étlap alkalmazkodjon.",
      },
      {
        q: "Megváltoztathatom a színsémát később?",
        a: "Bármikor. Nyissa meg a dizájn beállításokat, válasszon új színt, mentse. Minden oldal a QR étlapján, a foglalási folyamaton és a rendelési UI-on másodpercek alatt frissül. Hasznos szezonális promóciókhoz (piros Valentin-napra, zöld karácsonyra, arany új évre) — váltson egy hétre, váltson vissza.",
      },
      {
        q: "Hol jelenik meg a logóm?",
        a: "A QR étlapja tetején (az étterem neve mellett), a QR-kód matrica nyomtatási sablonon (hogy az asztalokon levő matrica egyezzen a márkájával), a rendelés megerősítő nyugtákon, és a foglalás megerősítő e-mailekben. Töltse fel egyszer PNG-ben vagy SVG-ben, mindenütt automatikusan használódik.",
      },
      {
        q: "Mi van, ha a márkaszínem nehezen olvasható az étlap háttér ellenében?",
        a: "A rendszer automatikusan ellenőrzi a kontrasztot, és finoman sötétíti vagy világosítja a színét szöveg felhasználási esetekhez (így egy halvány sárga márkaszín nem fog olvashatatlan szövegként megjelenni), miközben megtartja a pontos színt a kiemelésekhez, mint a gombok és kiemelések. Nem kell a WCAG-ra gondolnia — az étlap megteszi Önért.",
      },
    ],
  },

  finalCta: {
    heading: "Válasszon egy színt.",
    headingAccent: "Nézzen ki valódi márkaként.",
    sub: "Egyedi színséma, márkázott nyugták, automatikus világos/sötét mód. 14 napos ingyenes próba, dizájner nélkül, bankkártya nélkül.",
  },
};
