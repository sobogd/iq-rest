import { Languages, ShieldAlert, Palette, LayoutList, Smartphone, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hu",
  slug: "digitalis-etlap-etterem",
  trackPrefix: "l_hu_digital",

  meta: {
    title: "Digitális étlap éttermeknek | IQ Rest",
    description:
      "Digitális étlap éttermeknek: online étlap fotókkal, allergénekkel, AI fordítással és valós idejű árfrissítésekkel. 14 nap ingyenes, kártya nélkül.",
    canonical: "https://iq-rest.com/hu/digitalis-etlap-etterem",
    ogLocale: "hu_HU",
    ogTitle: "Digitális étlap éttermeknek",
    ogDescription:
      "A papír étlap online változata — fotók, allergének, AI fordítás, valós idejű frissítések.",
    brandLine: "IQ Rest — Digitális étlap éttermeknek",
  },

  hero: {
    headline: "Digitális étlap éttermeknek.",
    sub: "A papír étlap online változata fotókkal, allergénekkel, leírásokkal és valós idejű árfrissítésekkel. A vendégek a saját nyelvükön látják az étlapot; az étterem spórol a nyomtatáson.",
  },

  scan: {
    heading: "Van papír étlapja vagy PDF-je?",
    headingAccent: "Az AI 60 másodperc alatt digitalizálja.",
    sub: "Töltsön fel fotót vagy dokumentumot — az AI automatikusan felismeri a kategóriákat, ételeket és árakat.",
    cta: "Étlap szkennelése",
  },

  subFeatures: [
    {
      icon: LayoutList,
      eyebrow: "Étlap fotók nélkül",
      heading: "A fotók nélküli étlap is ugyanolyan jól néz ki.",
      body: "Egyes tételeknek nem biztos, hogy van fotójuk — és ez teljesen rendben van. Az IQ Rest a kártyákat képekkel és anélkül egységesen jeleníti meg: a tipográfia, allergének és árak megőrzik a prémium érzést. A fotókkal és anélküli tételek keverékét összefogottnak látszik.",
      bullets: [
        "A fotók nélküli kártyák nem tűnnek üresnek.",
        "A tipográfia alkalmazkodik a kártya tartalmához.",
        "Egységes stílus a képekkel és anélküli tételekhez.",
      ],
      image: { src: "/landing/feature-photos-optional.webp", alt: "Két telefon asztalon: étlap ételfotókkal és csak szöveges étlap" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergének",
      heading: "Allergén és diétás címkék.",
      body: "Jelölje meg az ételeket gluténra, laktózra, diófélékre, tengeri herkentyűkre, vegán és gluténmentes opciókra. A vendégek diétás igényeik szerint szűrik az étlapot és nagyobb biztonsággal rendelnek.",
      bullets: [
        "14 standard allergén kategória minden ételen.",
        "Vegán, vegetáriánus és gluténmentes címkék egy kattintással.",
        "A vendégek diétás korlátozásaik szerint szűrik az étlapot.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Vendég szűri az étlapot allergénekre telefonon, míg a tulajdonos az allergén listát szerkeszti táblagépen" },
    },
    {
      icon: Palette,
      eyebrow: "Prémium dizájn",
      heading: "Prémium dizájn videó háttérrel és kapcsolat oldallal.",
      body: "Videó vagy fotó az üdvözlő képernyőn, étterem leírása, dedikált kapcsolat oldal térképpel, telefonszámokkal és közösségi profilokkal. A digitális étlap teljes étterem weboldalnak tűnik, nem PDF-nek QR kód mögött.",
      bullets: [
        "Videó háttér vagy nagy fotó az üdvözlő képernyőn.",
        "Étterem és kategória leírások — mesélje el a koncepció történetét.",
        "Kapcsolat oldal: térkép, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Két telefon kávézó asztalon: étlap kezdőképernyője videó háttérrel és kapcsolat oldal térképpel" },
    },
    {
      icon: Languages,
      eyebrow: "35 AI nyelv",
      heading: "35 AI nyelv — minden vendég a saját nyelvén olvassa az étlapot.",
      body: "Egyetlen QR kód, 35 nyelv. Az AI kezeli a kulináris kontextust — az ételnevek és leírások természetesen hangzanak. A turisták magabiztosabban rendelnek és az átlagos számla nő, anélkül, hogy a pincér minden ételt lefordítana.",
      bullets: [
        "35 nyelv az előfizetésbe foglalva, felár nélkül.",
        "Kulináris kontextus megértésével rendelkező AI, nem nyers Google Translate.",
        "A vendég egy érintéssel vált nyelvet az étlapon belül.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Két vendég ugyanazt a digitális étlapot olvassa különböző nyelveken a saját telefonjukon" },
    },
    {
      icon: Smartphone,
      eyebrow: "Kezelés bármely eszközről",
      heading: "Kezelje az étlapot bármely eszközről.",
      body: "Egyetlen panel nyílik meg a böngészőben telefonon, táblagépen vagy laptopon. Változtassa meg az árat, vegyen le egy ételt a stop listáról vagy adjon hozzá specialitást — a vendégek másodpercek alatt látják a változást. Telepítés nélkül, integráció nélkül.",
      bullets: [
        "Nincs alkalmazás telepítése — nyissa meg a böngészőt és benn van.",
        "Árak, fotók és stop lista — néhány érintés a telefonról.",
        "Kezelje az étlapot bárhonnan, beleértve az éttermet is.",
      ],
      image: { src: "/landing/feature-mobile.webp", alt: "Laptop és telefon kávézó asztalon, ugyanazt az étlap tételt szerkesztik mindkét eszközön" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Rendelések az étlapról · opcionális",
      heading: "A vendégek közvetlenül az étlapról rendelnek.",
      body: "A vendégek kosarat építenek a QR étlapon és elküldik a rendelést — eljut a pincérhez az étteremben vagy a konyhai táblagéphez. A funkció a beállításokban bármikor be- vagy kikapcsolható.",
      bullets: [
        "Kosár, megjegyzések és rendelés küldése egy érintéssel.",
        "A rendelés azonnal megérkezik az adminisztrációs panelre, WhatsApp-ra vagy a konyhai kijelzőre.",
        "A funkció a beállításokban kapcsolható.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Két telefon asztalon: kosár rendeléssel és elküldött rendelés visszaigazolása" },
    },
  ],

  faq: {
    sub: "Amit a vendéglátósok az IQ Rest digitális étlapjáról kérdeznek. Nem találja a kérdését? Írjon nekünk WhatsAppon.",
    items: [
      { q: "Szükségem van technikai tudásra vagy CMS tapasztalatra?", a: "Nem, különleges tudás nem szükséges. Minden művelet az adminisztrációs panelben kattintással és húzással történik — kód nélkül. Egy tétel hozzáadása az étlaphoz néhány másodpercet vesz igénybe: név, ár, fotó. Egy teljes étlap beállítása általában 30 perctől egy óráig tart." },
      { q: "Mi az IQ Rest digitális étlapja?", a: "Az IQ Rest egy felhőalapú platform éttermeknek. A digitális étlap az Ön étlapjának online változata, amely a vendégek számára QR kódon vagy közvetlen linken keresztül érhető el: ételfotók, árak, allergének, AI fordítás 35 nyelvre, valós idejű frissítések. Az étlapot a mi szervereinken hosztoljuk; nem kell szoftvert telepítenie vagy karbantartania — csak nyissa meg a böngészőt." },
      { q: "Szükség van a vendégeknek alkalmazásra vagy speciális hardverre?", a: "Nem. A vendégek a telefon kameráját a QR kódra irányítják és az étlap megnyílik a böngészőben. Az étterem adminisztrációs panele is bármely modern böngészőben működik — telefonon, táblagépen vagy laptopon. A QR kódok bármely irodai nyomtatóval kinyomtathatók." },
      { q: "Hosztolhatom az étlapot saját domain-en?", a: "Igen. Támogatunk egyedi domain-t SSL tanúsítvánnyal — a vendégek az étlapot az étterem címén látják (pl. etlap.azonetterme.hu). Segítünk a DNS beállításban; általában 5–10 percig tart." },
      { q: "Kezelhetek több éttermet egy fiókból?", a: "Igen, kérésre. Egy fiók több éttermet is hosztolhat: minden hely saját étlappal, dizájnnal, QR kódokkal és analitikával. Írjon nekünk WhatsAppon és aktiváljuk a több éttermes módot a csoportja számára." },
      { q: "Mennyire nehéz az étlapot nulláról beállítani?", a: "A beállítás három lépésből áll: (1) hozza létre a kategóriákat; (2) adjon hozzá tételeket névvel, árral és fotóval; (3) nyomtasson QR kódokat az asztalokra. Ha már van papír étlapja vagy PDF-je, töltse fel — az AI felismeri a kategóriákat, neveket és árakat és automatikusan kitölti a kártyákat. Egy alapétlap 5 perc alatt élesben lehet; a teljes beállítási idő a tételek számától függ." },
      { q: "Milyen támogatást kínálnak?", a: "Munkaidőben WhatsAppon elérhetők vagyunk és gyorsan válaszolunk e-mailre. Segítünk a kezdeti beállításban, a domain konfigurációjában, az étlap dizájnjában és minden nem standard helyzetben. Ha demóra vagy gyakorlati támogatásra van szüksége az indításhoz — írjon nekünk." },
    ],
  },
};
