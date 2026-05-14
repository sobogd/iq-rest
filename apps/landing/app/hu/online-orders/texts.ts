import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Online rendelések QR étlapon keresztül — éttermi rendelések jutalék nélkül",
    description:
      "Fogadjon közvetlen rendeléseket a QR étlapjáról. Nulla jutalék, nincs Uber Eats / Glovo levonás. A vendégek beolvasnak, rendelnek, fizetnek — egyenesen Önnek. 14 napos ingyenes próba.",
    canonical: "https://iq-rest.com/hu/online-orders",
    ogLocale: "hu_HU",
    ogTitle: "Online rendelés jutalék nélkül — közvetlen rendelések a QR étlapjáról",
    ogDescription:
      "Cserélje le a 30%-os szállítási alkalmazás jutalékokat közvetlen rendelésekre. A vendégek beolvassák a QR-t, rendelnek, fizetnek — minden fillér Önhöz kerül. 14 napos ingyenes próba, kártya nélkül.",
  },

  hero: {
    title: "Közvetlen rendelések. Nulla jutalék. Egyenesen a konyhába.",
    subtitle:
      "Hagyjon fel a 30%-os jutalék fizetésével az Uber Eats-nek, Glovonak és Woltnak. Az IQ Rest-tel a vendégek beolvassák a QR-t, telefonon összeállítják a rendelést, és a tikett a konyhájában landol — minden fillér Önnél marad.",
    trustLine: "500+ étterem 30+ országban",
  },

  seo: {
    description:
      "Alakítsa át QR étlapját teljes online rendelési rendszerré anélkül, hogy 30%-ot adna a szállítási alkalmazásoknak. A vendégek beolvassák a QR kódját, böngészik az étlapot a saját nyelvükön, kosárba pakolnak, elküldik a rendelést — és Ön azonnal megkapja az asztalszámmal. Nincs alkalmazás letöltés, nincs jutalék, nincs harmadik fél Ön és a vendég között.",
    fullDescription:
      "A legtöbb étterem már azelőtt veszít pénzt, hogy az étel elhagyná a konyhát — Uber Eats elviszi a 30%-ot, Glovo elviszi a 30%-ot, Wolt elviszi a 30%-ot. Az IQ Rest online rendelései teljesen másképp működnek. A rendelés egyenesen a vendég telefonjáról az Ön vezérlőpultjába kerül, és az egész árrés az Öné.\n\nA rendelési UX kifejezetten éttermi használatra készült: a vendégek asztalt választanak, böngészik az étlapot, kosárba tesznek tételeket, megjegyzést hagynak a konyhának, és elküldenek. Az új rendeléseket valós időben látja a telefonján vagy a konyhai képernyőn, asztalszámmal, tételekkel, módosítókkal és megjegyzésekkel. Megjelöli az ételeket készként, az asztal látja az állapotot — és tucatnyi utat spórol a pincéreknek műszakonként.\n\nMűködik elvitelre és felvételre is: a vendégek beolvassák a QR matricát az ajtónál, leadnak egy rendelést, és fizetnek — nincs szüksége külön rendelési alkalmazásra, külön weboldalra, vagy Stripe integrációs projektre.",
    benefitsHeading: "Miért győzik le a közvetlen rendelések az IQ Rest-en keresztül a szállítási alkalmazásokat",
    benefits: [
      "Nulla jutalék minden rendelés után — a bevétel 100%-a Önnél marad",
      "A rendelések valós időben repülnek a vezérlőpultjába asztalszámmal",
      "Nincs alkalmazás a vendégeknek — beolvassák a QR-t és böngészőben rendelnek",
      "Módosítók, megjegyzések, étrendi jegyzetek — minden tisztán rögzítve",
      "Helyben fogyasztásra, elvitelre és felvételre is működik — egy étlap, három folyamat",
      "A beépített upsell promtok növelik az átlagos rendelési értéket",
    ],
  },

  pricing: {
    heading: "Egy csomag.",
    headingAccent: "Nulla jutalék.",
    sub: "Közvetlen rendelés, QR étlap, étterem weboldal és foglalások — minden benne van. Nincsenek rendelésenkénti díjak, nincs Stripe integrációs projekt.",
  },

  faq: {
    sub: "Minden, amit étterem tulajdonosok kérdeznek az online rendelésről. Nem látja a sajátját? Üzenjen nekünk WhatsApp-on — valódi emberek válaszolnak.",
    items: [
      {
        q: "Levonnak jutalékot a rendelésekből?",
        a: "Nullát. Minden rendelés a QR étlapjáról egyenesen Önhöz kerül — nincs levonás nekünk, nincs Glovo / Uber Eats díj. Egy fix havi előfizetés, ennyi. A matek egyszerű: ha 5 000 €/hó-t hoz be szállítási alkalmazás rendelésekből, 1 500 €-t veszít. Váltson közvetlen rendelésre, és az 1 500 € a zsebében marad.",
      },
      {
        q: "Hogyan adnak le rendelést a vendégek — kell hozzá alkalmazás?",
        a: "Nincs alkalmazás. A vendégek beolvassák a QR kódot a telefon kamerájával, az étlap megnyílik a böngészőben, asztalt választanak, böngésznek, kosárba tesznek és elküldenek. Az egész folyamat két koppintás a beolvasás után. Nincs App Store keresés, nincs regisztráció, nincs súrlódás.",
      },
      {
        q: "Hogyan kapom meg a rendeléseket a konyhában?",
        a: "A rendelések azonnal megjelennek a vezérlőpulton, asztalszámmal, tételekkel, módosítókkal és bármilyen megjegyzéssel. Nézze meg telefonon, tableten az átadópult mellett, vagy egy konyhai képernyőn. Jelölje meg a tételeket készként, és az asztal látja az állapotot — kevesebb 'jön már az ételem?' kérdés, gyorsabb forgás.",
      },
      {
        q: "Tudnak a vendégek a QR étlapon keresztül fizetni, vagy csak az asztalnál?",
        a: "Mindkettő. Beadhatják és fizethetnek készpénzzel vagy kártyával az asztalnál a klasszikus módon, vagy online fizethetnek Stripe-on keresztül közvetlenül az étlapon. Ön dönti el, mi van engedélyezve. Az online fizetést a Stripe biztosítja — az IQ Rest soha nem tartja a pénzt, az egyenesen az Ön Stripe számlájára megy.",
      },
      {
        q: "Működik elvitelre és felvételre, nem csak helyben fogyasztásra?",
        a: "Igen. Ragasszon QR matricát a bejárathoz elvitelhez, vagy ossza meg az étlap linket Instagramon és WhatsApp-on. A vendégek 'felvétel'-t választanak, rendelnek, fizetnek — Ön elkészíti, ők elviszik. Ugyanaz a rendszer, három különböző rendelési folyamat: helyben, elvitel, felvétel.",
      },
    ],
  },

  finalCta: {
    heading: "Hagyjon fel a szállítási alkalmazások etetésével.",
    headingAccent: "Tartsa meg a 100%-ot.",
    sub: "Cserélje le a 30%-os jutalékait egy fix havi díjra. 14 napos ingyenes próba. Bankkártya nélkül. Bármikor lemondható.",
  },
};
