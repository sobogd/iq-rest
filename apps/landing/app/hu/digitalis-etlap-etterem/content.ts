import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hu",
  slug: "digitalis-etlap-etterem",
  trackPrefix: "l_hu_digital",
  hideFeatureHeading: true,

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
    headline: "Digitális étlap,\namiben minden ott van",
    cta: "Digitális menü létrehozása",
    sub: "Fotók, allergének és fordítás 35 nyelvre. Plusz rendelések, WhatsApp és asztalfoglalás — mind egy IQ Restben.",
  },

  scan: {
    heading: "Van papír étlapja vagy PDF-je?",
    headingAccent: "Az AI 60 másodperc alatt digitalizálja.",
    sub: "Töltsön fel fotót vagy dokumentumot — az AI automatikusan felismeri a kategóriákat, ételeket és árakat.",
    cta: "Étlap szkennelése",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "AI fordítás",
      heading: "Étlap 35 nyelven",
      body: "Egy QR, 35 nyelv. Az AI kulináris kontextussal fordít, így minden étel természetesen hangzik. A turisták magabiztosan rendelnek.",
      bullets: [
        "35 nyelv az előfizetésben",
        "Kulináris AI, nem Google",
        "Nyelvváltás egy érintéssel",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Két vendég ugyanazt a digitális étlapot olvassa különböző nyelveken a saját telefonjukon" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Allergének",
      heading: "Allergének és diéták az ételeken",
      body: "Jelölje a glutént, laktózt, diót, vegán és gluténmentes opciókat. A vendégek diétára szűrik az étlapot és könnyen rendelnek.",
      bullets: [
        "14 allergén kategória",
        "Vegán és gluténmentes címkék",
        "A vendégek diétára szűrnek",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Vendég szűri az étlapot allergénekre telefonon, míg a tulajdonos az allergén listát szerkeszti táblagépen" },
    },
    {
      icon: Palette,
      eyebrow: "Dizájn és márka",
      heading: "Prémium étlap a saját domainen",
      body: "Videós üdvözlő képernyő, saját dizájn és kapcsolat oldal térképpel és közösségi linkekkel — a saját domainjén, nem PDF.",
      bullets: [
        "Videó és prémium dizájn",
        "Saját domain SSL-lel",
        "Kapcsolat, térkép és közösség",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Két telefon kávézó asztalon: étlap kezdőképernyője videó háttérrel és kapcsolat oldal térképpel" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Rendelések",
      heading: "Online rendelés, nulla jutalék",
      body: "A vendégek az étlapról vagy egyenesen a WhatsAppjára rendelnek — a terembe vagy konyhára érkezik, 0% levonással.",
      bullets: [
        "Étlapról vagy WhatsAppról",
        "Terembe vagy konyhára, 0%",
        "A beállításokban kapcsolható",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Két telefon asztalon: kosár rendeléssel és elküldött rendelés visszaigazolása" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Foglalások",
      heading: "Asztalfoglalás, 24/7",
      body: "A vendégek maguk foglalnak asztalt az étlapon vagy linken, ön asztalonként látja a naptárt és auto vagy kézzel erősít meg.",
      bullets: [
        "A vendégek maguk foglalnak",
        "Naptár asztalonként",
        "Auto és kézi megerősítés",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Kezelés",
      heading: "Kezelje bárhonnan",
      body: "Az adminfelület bármely böngészőben fut — telefon, tablet vagy PC. Nincs telepítés, egy alapétlap percek alatt élesben van.",
      bullets: [
        "Bármely eszköz, bármely böngésző",
        "Nincs telepítés",
        "Percek alatt élesben",
      ],
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
