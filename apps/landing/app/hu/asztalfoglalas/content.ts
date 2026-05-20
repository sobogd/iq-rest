import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hu",
  slug: "asztalfoglalas",
  trackPrefix: "l_hu_bookings",

  meta: {
    title: "Asztalfoglalás 24/7 éttermeknek | IQ Rest",
    description:
      "Asztalfoglalás 24/7 éttermeknek: a vendégek maguk foglalnak a QR étlapon vagy weboldalon keresztül. Asztal naptár, automatikus visszaigazolások és emlékeztetők. Egyetlen elveszített vendég sem. 14 nap ingyenes.",
    canonical: "https://iq-rest.com/hu/asztalfoglalas",
    ogLocale: "hu_HU",
    ogTitle: "Asztalfoglalás 24/7 — a vendégek maguk foglalnak",
    ogDescription:
      "A vendégek asztalt foglalnak a QR étlapon vagy weboldalon. Naptár, automatikus visszaigazolások, emlékeztetők. Egyetlen elveszített vendég sem.",
    brandLine: "IQ Rest — Asztalfoglalás éttermeknek",
  },

  hero: {
    headline: "Asztalfoglalás 24/7 — a vendégek maguk foglalnak.",
    sub: "A vendégek asztalt foglalnak a QR étlapon vagy közvetlen linken keresztül. Asztal naptár, automatikus visszaigazolások és emlékeztetők. Egyetlen elveszített vendég sem és nincs csúcsidőszaki telefonhívás.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostess foglalásokat kezel táblagépről az étterem bejáratánál",
  },

  scan: {
    heading: "Indítsa el az asztalfoglalást",
    headingAccent: "5 perc alatt.",
    sub: "Csatlakoztassa a naptárt, adjon hozzá asztalokat fotókkal és kapacitással — a vendégek aznap elkezdik a foglalást.",
    cta: "Foglalás aktiválása",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Foglalási űrlap",
      heading: "A vendégek maguk foglalnak — dátum, idő és személyszám alapján.",
      body: "A vendég megnyitja a QR étlapot vagy közvetlen linket, kiválasztja a dátumot, időt és személyszámot — és azonnal látja az elérhető asztalokat, mindegyiket fotóval, leírással (terasz, ablak mellett, kanapé a bárnál) és kapacitással. A visszaigazolás automatikusan küldésre kerül e-mailben és WhatsAppon.",
      bullets: [
        "Asztal választása fotó, leírás és kapacitás alapján.",
        "Automatikus visszaigazolás és emlékeztető egy órával a látogatás előtt.",
        "Minimális mezők az űrlapon: név, telefon, személyszám.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Vendég asztalt foglal éttermhez telefonról: dátum, idő, személyszám és asztal választó" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Foglalási naptár",
      heading: "Naptár nap és asztal szerint — minden egy pillantással.",
      body: "Az adminisztrációs panel a foglalások naptárát asztal, nap, hét és hónap szerint bontva jeleníti meg. Szabad időpontok, foglalt asztalok, visszaigazolt és nem visszaigazolt foglalások egy képernyőn. Működik táblagépen a teremben és laptopon az irodában.",
      bullets: [
        "Napi, heti és havi nézetek.",
        "Asztal szerinti bontás: ki, mikor, hány vendég.",
        "Foglalás áthelyezése, törlése vagy megerősítése egy érintéssel telefonról.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Foglalási naptár az IQ Rest adminisztrációs paneljén két táblagépen: napi Gantt asztalok szerint és havi nézet" },
    },
  ],

  faq: {
    sub: "Amit a vendéglátósok az IQ Rest asztalfoglalásáról kérdeznek. Nem találja a kérdését? Írjon nekünk WhatsAppon.",
    items: [
      { q: "Megválaszthatom, hogy mely napokon és órákban érhető el a foglalás?", a: "Igen. Az adminisztrációs panel lehetővé teszi a nyitvatartási idő és a rendelkezésre álló napok beállítását — a rendszer nem mutat nem elérhető időpontokat a vendégeknek. Bezárhat egy adott dátumot (céges esemény, magán foglalás) vagy átmenetileg kikapcsolhatja az egész naptárt." },
      { q: "Tudok fotót feltölteni minden asztalhoz?", a: "Igen. Minden asztalhoz tartozhat fotó, leírás (terasz, ablak mellett, kanapé a bárnál) és kapacitás. A vendég pontosan azt az asztalt látja, amit foglal, és tájékozott döntést hoz — ez csökkenti a nem teljesített elvárásokat." },
      { q: "Kikapcsolhatom a foglalásokat bizonyos napokon?", a: "Igen. A naptár lehetővé teszi bizonyos dátumok (ünnepek, magán események, felújítás) vagy egész napok bezárását. Ezeken a napokon a vendégek „a foglalás átmenetileg nem érhető el“ üzenetet látnak." },
      { q: "Testreszabhatom, milyen mezőket gyűjtsek a vendégtől?", a: "Igen. Alapértelmezett készlet: név, telefon, e-mail, személyszám. Hozzáadhat egyéni mezőket (alkalom, allergiák, különleges kérések) vagy eltávolíthatja a feleslegeseket, hogy az űrlap a lehető legrövidebb maradjon." },
      { q: "Korlátozhatom a vendégek számát asztalonként?", a: "Igen. Minden asztalnak van „kapacitás“ beállítása — a rendszer nem engedi, hogy egy 2-személyes asztalt 6-ra foglaljanak. Nagyobb asztalokon beállíthat minimumot, hogy a kis csoportok ne foglalják el a „nyolc személyes asztalt“ nagyobb társaságoktól." },
      { q: "Mennyire nehéz a foglalás beállítása?", a: "Nagyon kevés időt vesz igénybe. Három lépés: (1) adjon hozzá asztalokat nevekkel, fotókkal és kapacitással, (2) aktiválja a foglalási módot a beállításokban, (3) ossza meg a linket vagy QR kódot a vendégekkel. Teljes indítás 5–10 perc alatt." },
      { q: "Használhatom a foglalási rendszert saját domain-en?", a: "Igen. Támogatunk egyedi domain-t SSL tanúsítvánnyal: a vendégek az étterem címén foglalnak (pl. foglalas.azonetterme.hu). Segítünk a DNS beállításban; a folyamat 5–10 percig tart." },
      { q: "Konfigurálhatom az automatikus vagy kézi visszaigazolást?", a: "Igen, a mód a beállításokban állítható be. Automatikus visszaigazolással a vendég azonnal megerősítést kap az űrlap beküldése után és a foglalás elfogadottnak minősül. Kézi visszaigazolással a kérés az adminisztrációs panelre érkezik „visszaigazolásra vár“ állapotban — a kezelő áttekinti és visszaigazolja vagy elutasítja. A kézi mód korlátozott asztalszám vagy szigorú vendég politikák esetén hasznos." },
      { q: "Felszámítanak jutalékot a foglalásokra?", a: "Nem. Az asztalfoglalás teljesen benne van a Pro csomagban — nincs százalék a vendégekre, nincs időpontonkénti díj, nincsenek aggregátor jutalékok. Fix havi díj és korlátlan foglalások." },
    ],
  },
};
