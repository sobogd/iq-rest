import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hu",
  slug: "rendelesi-rendszer-etterem",
  trackPrefix: "l_hu_orders",

  meta: {
    title: "Rendelési rendszer étteremnek — vendég és pincér | IQ Rest",
    description:
      "Étterem rendelések telefonról vagy táblagépről: terem terve, számla felosztása, állapotok, opciók és megjegyzések. A vendégek az asztalnál rendelnek; a pincér rendeléseket vesz fel bármely eszközről. 14 nap ingyenes.",
    canonical: "https://iq-rest.com/hu/rendelesi-rendszer-etterem",
    ogLocale: "hu_HU",
    ogTitle: "Rendelési rendszer étteremnek — vendég és pincér",
    ogDescription:
      "Vendég az asztalnál vagy pincér a telefonon — a rendelés azonnal a konyhába érkezik. Terem terve, számla felosztása, állapotok, opciók és megjegyzések.",
    brandLine: "IQ Rest — Rendelési rendszer étteremnek",
  },

  hero: {
    headline: "Rendelésfelvétel: vendég és pincér — közvetlenül a konyhába.",
    cta: "Online rendelés beállítása",
    sub: "A vendégek a QR étlapon keresztül rendelnek az asztalnál vagy a pincér felveszi a rendelést telefonról vagy táblagépről — a rendelés másodpercek alatt a konyhai kijelzőre érkezik. Terem terve színkódolt asztalokkal, számla felosztása, rugalmas opciók és megjegyzések. Jegyzetfüzetek nélkül, bárhoz menés nélkül.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Pincér rendelést vesz fel az asztalnál okostelefonról — a rendelés a konyhai kijelzőre érkezik",
  },

  scan: {
    heading: "Állítsa be a rendelési rendszert",
    headingAccent: "5 perc alatt.",
    sub: "Töltsön fel papír étlapot vagy PDF-et — az AI felismeri az ételeket, árakat és kategóriákat. Csatlakoztasson táblagépet a terembe és kezdje fogadni a rendeléseket az asztaloknál.",
    cta: "Étlap szkennelése",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista és terem terve",
      heading: "Rendelési lista a terem terve mellett.",
      body: "Minden aktív rendelés jobbra: állapot, összesen, idő, tételszám. Balra — a terem terve: asztalok állapot szerint színezve — szabad, foglalt, figyelmet igényel. Érintsen meg egy asztalt a rendelés megnyitásához vagy létrehozásához; érintsen meg egy kártyát a részletes nézet megnyitásához. Képernyő ugrálás nélkül.",
      bullets: [
        "Terem terve: asztalok rendelés állapot szerint színezve.",
        "Rendelési lista mellette — összesen, idő, tételszám.",
        "Érintsen meg egy asztalt a rendelés megnyitásához vagy létrehozásához.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Táblagép a pincér állomásnál: rendelési lista és terem terve színezett asztalokkal" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Rendelési kártya",
      heading: "Rendelési kártya: állapotok, duplikálás, törlés — egy érintés.",
      body: "Minden tételnek saját állapota van (Vár / Készül / Kész / Felszolgálva) — a konyha és a pincér ugyanazt a képet látja valós időben. A pont érintése megnyitja a műveletek menüjét: állapotváltás, tétel duplikálása ugyanazokkal a módosítókkal és opciókkal, törlés. Minden a kártyán belül.",
      bullets: [
        "Állapot tételenként: Vár / Készül / Kész / Felszolgálva.",
        "Duplikáljon egy tételt egy érintéssel ugyanazokkal az opciókkal.",
        "Töröljön egy tételt közvetlenül a kártyáról.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Táblagép a rendelés részletes kártyájával: tétel állapotok, duplikálás és törlés műveletek" },
    },
    {
      icon: Receipt,
      eyebrow: "Számla felosztása",
      heading: "Ossza fel a számlát, ha a vendégek külön fizetnek.",
      body: "A vendégek úgy döntöttek, hogy felosztják — jelölje meg a tételeket, amelyek új nyugtára kerülnek; a többi marad az aktuálison. A rendszer azonnal mindkét összeget mutatja. Egy érintés a „Rendelés felosztása“-ra és két független rendelése van helyes összegekkel, mindkettő még mindig az asztalukhoz kötve.",
      bullets: [
        "Válasszon tételeket felosztáshoz jelölőnégyzetekkel.",
        "Mindkét összeg azonnal megjelenik.",
        "Egy érintés és a rendelés fel van osztva kézi számolás nélkül.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Táblagép étterem asztalon: számla felosztási ablak a vendégek között" },
    },
    {
      icon: Smartphone,
      eyebrow: "Mobil hozzáadás",
      heading: "Adjon hozzá tételeket telefonról — három műveletben.",
      body: "A pincér nincs egy eszközhöz kötve: megnyitja a rendelésfelvételt a telefonján és három lépésben ad hozzá tételt — kategória, étel, opciók (méret, sütöttség, extra szósz vagy hozzávaló). Az ár automatikusan újraszámolódik. A konyha megjegyzése az utolsó lépésnél jön.",
      bullets: [
        "Három lépés: kategória → étel → opciók.",
        "Opciók (méret, kiegészítők, extrák) árazva egy kattintással.",
        "Megjegyzés mező a végső lépésben.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Négy telefon rendelési tétel hozzáadás lépéseivel: kategória, étel, méret, megjegyzés" },
    },
  ],

  faq: {
    sub: "Amit a vendéglátósok az IQ Rest rendelésfelvételéről kérdeznek. Nem találja a kérdését? Írjon nekünk WhatsAppon.",
    items: [
      { q: "Több pincér dolgozhat egyszerre különböző eszközökről?", a: "Igen. Minden pincér saját telefonjáról vagy táblagépéről jelentkezik be a közös étterem fiókba — mindenki ugyanazokat az asztalokat, rendeléseket és állapotokat látja valós időben. Egy pincér változtatásai azonnal megjelennek a többieknél, konfliktusok vagy zárolások nélkül." },
      { q: "Használhatják a pincérek saját eszközeiket (BYOD)?", a: "Igen. Ez egy böngészős webalkalmazás — nincs mit telepíteni. A pincér megnyit egy linket, bejelentkezik az étterem fiókba saját iPhone-jából, Android-jából vagy személyes táblagépéről és elkezd dolgozni. A műszak végén egyszerűen kijelentkezik." },
      { q: "Hozzáadhatók kötelező opciók az ételekhez (méret, sütöttség stb.)?", a: "Igen. Minden étel tetszőleges számú opció csoporttal rendelkezhet — kötelezőkkel (pl. „Méret“: Kicsi / Közepes / Nagy) és opcionálisakkal („Sütöttség“: véres / közepes / jól átsütött). Az opciók megváltoztathatják az árat (+1,00 €). Ha egy csoport kötelező, a rendszer nem engedi, hogy a vendég vagy pincér válasz nélkül adja hozzá az ételt." },
      { q: "Hozzáadhatnak a vendégek megjegyzéseket vagy extrákat egy ételhez (kenyér, szósz)?", a: "Igen. A hozzáadás utolsó lépésében van egy szabad megjegyzés mező („hagyma nélkül“, „jól átsütött“, „diós allergia“). Az extrák külön árazott módosítók („+ BBQ szósz +1,50 €“, „+ Kenyér +2,00 €“). A megjegyzések megjelennek a konyhai kijelzőn, színnel kiemelve." },
      { q: "Van rendelési statisztika?", a: "Igen. Az analitika szekció megmutatja: bevétel napi és órás bontásban, átlagos számla, legnépszerűbb ételek, vendég → rendelés konverzió, kiszolgálási sebesség (idő a Vár-tól Felszolgálva-ig). Ez segít a műszakok, beszerzések tervezésében és a gyengén teljesítő ételek azonosításában." },
      { q: "Feloszthatók vagy áthelyezhetők a rendelések az asztalok között?", a: "Igen, mindkét forgatókönyv támogatott. Felosztáshoz — jelölje meg a tételeket, amelyek új nyugtára kerülnek (külön fizető vendégeknek). Áthelyezéshez — nyissa meg a rendelési kártyát, válasszon új asztalt; az egész rendelés odakerül. Kézi számolás nélkül, panel elhagyása nélkül." },
    ],
  },
};
