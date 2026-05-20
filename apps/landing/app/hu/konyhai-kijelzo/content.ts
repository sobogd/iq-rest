import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hu",
  slug: "konyhai-kijelzo",
  trackPrefix: "l_hu_kds",

  meta: {
    title: "Konyhai kijelző (KDS) éttermeknek | IQ Rest",
    description:
      "Konyhai kijelző (KDS) éttermeknek: a teremből és QR étlapról érkező rendelések azonnal a séf képernyőjére kerülnek. Oszlopok asztalonként, állapotok Vár / Készül / Kész / Felszolgálva, zónánkénti szűrők. Működik táblagépen vagy telefonon.",
    canonical: "https://iq-rest.com/hu/konyhai-kijelzo",
    ogLocale: "hu_HU",
    ogTitle: "Konyhai kijelző (KDS) — Rendelések a séf képernyőjén",
    ogDescription:
      "A teremből érkező rendelések a séf képernyőjén. Oszlopok asztalonként, állapotok és időzítő. Egy érintés megváltoztatja az állapotot.",
    brandLine: "IQ Rest — Konyhai kijelző",
  },

  hero: {
    headline: "Konyhai kijelző: rendelések közvetlenül a séf képernyőjére.",
    sub: "A papír blokkok már nem szükségesek. A teremből vagy QR étlapról érkező rendelések azonnal a konyhai képernyőre kerülnek — megjegyzésekkel, allergénekkel és időzítővel. Egy érintés megváltoztatja az állapotot. Működik táblagépen a tálalópulton vagy okostelefonon a séf zsebében.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Professzionális konyha sárgaréz állványon lévő táblagéppel, amely a konyhai kijelzőt mutatja aktív rendelésekkel",
  },

  scan: {
    heading: "Állítsa be a konyhai kijelzőt",
    headingAccent: "5 perc alatt.",
    sub: "Töltsön fel papír étlapot vagy PDF-et — az AI felismeri az ételeket, kategóriákat és allergéneket. Csatlakoztasson táblagépet a konyhába és kezdje fogadni a rendeléseket.",
    cta: "Étlap szkennelése",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Vezérlők és szűrők",
      heading: "Több képernyő zónánként: konyha és bár.",
      body: "Helyezzen külön táblagépeket a meleg konyhára, a bárra vagy a cukrászatra — minden képernyő csak a hozzá tartozó ételeket mutatja. Az állapot (Vár / Készül / Kész / Felszolgálva) és kategória szerinti szűrők kiküszöbölik a zajt: a séf csak azt látja, ami a posztjához releváns.",
      bullets: [
        "Több KDS képernyő kategória szűrőkkel.",
        "Állapot szűrő: csak Készül és Kész megjelenítése.",
        "Minden zóna csak saját rendelési folyamát látja.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Sárgaréz állványon lévő táblagép a konyhai tálalópultnál — KDS állapot szűrővel" },
    },
    {
      icon: Timer,
      eyebrow: "Kártyák és időzítő",
      heading: "Egy érintés megváltoztatja az állapotot. A megjegyzések és allergének színnel kiemelve.",
      body: "Az étel kártyája megmutatja a kiválasztott opciókat (hagyma nélkül, jól átsütött), a vendég megjegyzését, az allergéneket és egy időzítőt a rendelés leadásának pillanatától. Érintse meg a kártyát és az állapot a következőre vált: Vár → Készül → Kész → Felszolgálva. A lista prioritás szerint automatikusan rendeződik.",
      bullets: [
        "Érintés a kártyán — azonnali állapotváltás.",
        "Opciók, megjegyzések és allergének színnel kiemelve.",
        "Prioritás szerinti rendezés: a hosszabb ideje várakozó tételek felül helyezkednek el.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Sárgaréz állványon lévő táblagép a bárpulton — KDS rendelési kártyákkal asztalonként" },
    },
  ],

  faq: {
    sub: "Amit a vendéglátósok az IQ Rest konyhai kijelzőjéről kérdeznek. Nem találja a kérdését? Írjon nekünk WhatsAppon.",
    items: [
      { q: "Milyen étel állapotok vannak a konyhában?", a: "Négy állapot különböző kártyaszínekkel: Vár (szürke) — a rendelés elfogadva és vár; Készül (narancs) — az étel készül; Kész (kék) — felszolgálásra kész; Felszolgálva (zöld) — átadva a vendégnek. A kártya érintése a következő állapotba viszi, menük vagy visszaigazolások nélkül." },
      { q: "Több KDS képernyőt futtathatok különböző zónákban?", a: "Igen. Egy táblagép a meleg konyhán, másik a bárnál, harmadik a cukrászatnál — mindegyik saját kategória szűrővel. Minden képernyő valós időben szinkronizált: az egyik képernyőn megváltoztatott állapot mindenhol frissül." },
      { q: "Milyen hardverre van szükségem a KDS futtatásához?", a: "A KDS egy webalkalmazás, amely bármely modern böngészőben fut. Nagy konyha — táblagép sárgaréz állványon a tálalópultnál vagy TV a falon. Kis hely — a séf okostelefonja. Speciális hardver nélkül, telepítés nélkül: nyisson meg egy linket és jelentkezzen be a fiókba." },
      { q: "Honnan érkeznek a rendelések a konyhai képernyőre?", a: "Minden forrásból: a vendég, aki a QR étlapról rendelt az asztalnál; a pincér, aki a telefonjáról vette fel a rendelést; a vendég, aki a weboldalról adta le a rendelést. Mindegyik a KDS-re érkezik forrás címkével és asztalszámmal. Nincsenek kézi átvitelek POS-ról." },
      { q: "Mit jelenít meg egy rendelési kártya?", a: "Az étel neve, a kiválasztott módosítók (hagyma nélkül, jól átsütött, szósz hozzáadása), a vendég megjegyzése, kiemelt allergének, állapot (Vár / Készül / Kész / Felszolgálva) és időzítő, amely megmutatja, mennyi ideje vár az étel. A kártyák prioritás szerint rendeződnek: minél hosszabb a várakozás, annál feljebb az oszlopban." },
      { q: "Szűrhetem a kártyákat a képernyőn?", a: "Igen. Két szűrő: állapot szerint (pl. csak Vár és Készül megjelenítése, Felszolgálva elrejtése) és kategória szerint (csak italok a bárnál, csak főételek a konyhán). A beállítások eszközönként mentésre kerülnek — minden zóna a saját készletét tartja." },
    ],
  },
};
