import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hu",
  slug: "qr-kod-etlap-etterem",
  trackPrefix: "l_hu_qr",

  meta: {
    title: "QR-kódos étlap éttermeknek | IQ Rest",
    description:
      "QR-kódos étlap éttermeknek: a vendég beolvassa az asztali QR-kódot, megnyitja az étlapot a böngészőben, és a saját nyelvén rendel. 14 nap ingyen, kártya nélkül.",
    canonical: "https://iq-rest.com/hu/qr-kod-etlap-etterem",
    ogLocale: "hu_HU",
    ogTitle: "QR-kódos étlap éttermeknek",
    ogDescription:
      "QR az asztalon, étlap a telefonon — fotók, allergének, 35 nyelv és valós idejű frissítések.",
    brandLine: "IQ Rest — QR-kódos étlap éttermeknek",
  },

  hero: {
    headline: "QR-kódos étlap éttermeknek.",
    sub: "A vendég ráirányítja a kamerát az asztali QR-kódra, és az étlap azonnal megnyílik a telefon böngészőjében: ételfotók, allergének, mindig friss árak és automatikus fordítás 35 nyelvre. Alkalmazás letöltése nélkül, és anélkül, hogy minden árváltozáskor újra kellene nyomtatni az étlapot.",
  },

  scan: {
    heading: "Van már papír vagy PDF étlapod?",
    headingAccent: "Az MI 60 másodperc alatt QR-étlappá alakítja.",
    sub: "Tölts fel egy fotót az étlapról vagy a PDF-et — az MI kiolvassa a kategóriákat, ételeket és árakat, és azonnal a QR-étlaphoz köti.",
    cta: "QR-étlap létrehozása",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Egy QR, 35 nyelv",
      heading: "Egyetlen QR-kód, az étlap 35 nyelven.",
      body: "A vendég beolvassa a QR-t és nyelvet választ: a fordítást gasztronómiai érzékkel bíró MI végzi, nem általános fordító. Vége a turistáknak szóló külön étlapoknak és az asztalon heverő papíroknak.",
      bullets: [
        "Egyetlen QR-nyomat 35 nyelvet fed le, az előfizetés tartalmazza.",
        "Az MI érti a konyhai nyelvet — az ételnevek minden nyelven természetesen hangzanak.",
        "A vendég az étlapon belül vált nyelvet, a QR újraolvasása nélkül.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Két vendég ugyanazt az asztali QR-kódot olvassa be, és különböző nyelveken nézi az étlapot" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergének a QR-ben",
      heading: "Allergének és étrendi címkék a QR-étlapon belül.",
      body: "A QR-hez kötött étlap minden étele kaphat címkéket gluténra, laktózra, diófélékre, tenger gyümölcseire, valamint vegán és gluténmentes opciókra. A vendég a telefonjáról szűri a korlátozásainak megfelelő ételeket, anélkül hogy a személyzetet kérdezné.",
      bullets: [
        "14 allergénkategória étel szinten.",
        "Vegán, vegetáriánus és gluténmentes címkék egy kattintással a panelen.",
        "A vendég saját korlátozásai szerint szűri a QR-étlapot.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "A vendég allergének szerint szűri a QR-étlapot a telefonon, miközben a tulajdonos táblagépen szerkeszti a listát" },
    },
    {
      icon: Palette,
      eyebrow: "Több mint egy egyszerű QR",
      heading: "Az étterem weboldalához hasonlóan kidolgozott QR-étlap.",
      body: "A kód beolvasása után a vendég nem egy lapos PDF-be botlik: üdvözlőképernyőt lát videóval vagy kiemelt fotóval, a hely bemutatkozását és egy kapcsolati oldalt térképpel, telefonszámokkal és közösségi linkekkel. A QR az étterem online bejáratává válik.",
      bullets: [
        "Háttérvideó vagy kiemelt fotó a QR-étlap nyitóképernyőjén.",
        "Tér a hely és minden kategória koncepciójának elmesélésére.",
        "Beépített kapcsolati oldal: térkép, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Két telefon az asztalon: a QR-étlap nyitóképernyője háttérvideóval és egy kapcsolati oldal térképpel" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Rendelés QR-ből · opcionális",
      heading: "A QR-kódból a vendég rendelni is tud.",
      body: "Az étlap böngészésén túl a QR-étlap rendelési csatornává is válhat: a vendég kosárba teszi az ételeket és elküldi a kérést. A rendelés a felszolgálóhoz a térbe, a WhatsAppra vagy a konyhai képernyőre érkezik. A funkció a beállításokban szükség szerint be- vagy kikapcsolható.",
      bullets: [
        "Kosár, megjegyzések és rendelésküldés közvetlenül a QR beolvasásából.",
        "A rendelés azonnal megérkezik a térbe, a WhatsAppra vagy a konyhai képernyőre.",
        "A funkció időszakok, termek vagy konkrét éttermek szerint aktiválható.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Két telefon az asztalon: a QR-étlapból összeállított kosár és az elküldött rendelés visszaigazolása" },
    },
  ],

  faq: {
    sub: "Amit a vendéglátósok az IQ Rest QR-étlapjáról kérdeznek. Nem találod a kérdésed? Írj nekünk WhatsAppon.",
    items: [
      { q: "Hogyan működik az IQ Rest QR-étlapja?", a: "Minden asztalon van egy nyomtatott QR-kód. A vendég beolvassa a telefon kamerájával, és a böngésző megnyitja az étterem étlapját — fotók, leírások, allergének és friss árak. Nincs szükség alkalmazásra, sem a vendégnek, sem a személyzetnek." },
      { q: "Kell technikai tudás a QR-étlap elkészítéséhez?", a: "Nem. A panel kattintással és húzással működik, kód és bonyolult beállítások nélkül. Egy étel hozzáadása pár másodperc: név, ár, fotó. A kezdeti beállítás általában 30 perc és egy óra között van; ha már van PDF étlapod, az MI automatikusan átalakítja." },
      { q: "Kell a vendégeknek alkalmazást telepíteniük a QR olvasásához?", a: "Nem. Az iPhone és az Android natív kamerája másodpercek alatt felismeri a QR-kódot, és közvetlenül a böngészőben nyitja meg az étlapot. Az adminpanel is bármely modern böngészőben működik — telefon, táblagép vagy laptop." },
      { q: "Hogyan nyomtatják ki az asztalokhoz a QR-kódokat?", a: "A QR-kódok a panelen automatikusan generálódnak (asztalonként egy, vagy egy az egész helyre), és nyomtatásra kész PDF-ként tölthetők le. Elég egy irodai nyomtató és egy tartó: asztali állvány, matrica vagy poháralátét." },
      { q: "Használhatok saját domaint a QR-étlaphoz?", a: "Igen. Támogatunk SSL-tanúsítvánnyal ellátott étterem-domaint (például menu.azettermed.hu): amikor a vendég beolvassa a QR-t, az étterem címét látja egy általános aldomain helyett. A DNS-beállítás 5–10 perc, és végigvezetünk rajta." },
      { q: "Kezelhetem több étterem QR-kódjait egy fiókból?", a: "Igen, kérésre. Egy fiók több helyet foghat össze, mindegyiknek saját QR-kódjai, étlapja, dizájnja és elemzése van. Írj nekünk WhatsAppon, és bekapcsoljuk a többéttermes módot." },
      { q: "Nehéz a nulláról elindítani a QR-étlapot?", a: "Három lépés: (1) hozd létre a kategóriákat; (2) add hozzá az ételeket névvel, árral és fotóval; (3) nyomtasd ki a QR-eket és tedd az asztalokra. Ha már van papír vagy PDF étlapod, töltsd fel — az MI felismeri a kategóriákat és árakat, és kitölti a kártyákat. Egy alap étlap 5 perc alatt online lehet." },
    ],
  },
};
