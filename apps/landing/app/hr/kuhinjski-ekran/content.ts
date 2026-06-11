import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "hr",
  slug: "kuhinjski-ekran",
  trackPrefix: "l_hr_kds",

  meta: {
    title: "Kuhinjski ekran (KDS) za restorane | IQ Rest",
    description:
      "Kuhinjski ekran (KDS) za restorane: narudžbe iz sale i QR jelovnika odmah stižu na ekran kuhara. Stupci po stolu, statusi Čeka / U pripremi / Spremno / Posluženo, filtri po zoni. Radi na tabletu ili telefonu.",
    canonical: "https://iq-rest.com/hr/kuhinjski-ekran",
    ogLocale: "hr_HR",
    ogTitle: "Kuhinjski ekran (KDS) — Narudžbe na ekranu kuhara",
    ogDescription:
      "Narudžbe iz sale na ekranu kuhara. Stupci po stolu, statusi i mjerač vremena. Jedan dodir mijenja status.",
    brandLine: "IQ Rest — Kuhinjski ekran",
  },

  hero: {
    headline: "Kuhinjski ekran: narudžbe izravno na ekran kuhara.",
    cta: "Postavi kuhinjski zaslon",
    sub: "Papirnati računi više nisu potrebni. Narudžbe iz sale ili QR jelovnika odmah stižu na kuhinjski ekran — s napomenama, alergenima i mjeračem vremena. Jedan dodir mijenja status. Radi na tabletu na šanku za izdavanje ili na smartphoneu u džepu kuhara.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionalna kuhinja s tabletom na mjedenom stalku koji prikazuje kuhinjski ekran s aktivnim narudžbama",
  },

  scan: {
    heading: "Postavite kuhinjski ekran",
    headingAccent: "za 5 minuta.",
    sub: "Učitajte papirni jelovnik ili PDF — AI prepoznaje jela, kategorije i alergene. Spojite tablet u kuhinji i počnite primati narudžbe.",
    cta: "Skeniraj jelovnik",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontrole i filtri",
      heading: "Više ekrana po zoni: kuhinja i šank.",
      body: "Postavite odvojene tablete na vrućoj liniji, šanku ili u slastičarnici — svaki ekran prikazuje samo jela koja mu pripadaju. Filtri po statusu (Čeka / U pripremi / Spremno / Posluženo) i kategoriji uklanjaju buku: kuhar vidi samo ono što je relevantno za njegovu stanicu.",
      bullets: [
        "Više KDS ekrana s filtrima po kategoriji.",
        "Filter statusa: prikaži samo U pripremi i Spremno.",
        "Svaka zona vidi samo svoj vlastiti tijek narudžbi.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet na mjedenom stalku na šanku za izdavanje — KDS s filtrom statusa" },
    },
    {
      icon: Timer,
      eyebrow: "Kartice i mjerač vremena",
      heading: "Jedan dodir mijenja status. Napomene i alergeni istaknuti bojama.",
      body: "Kartica jela prikazuje odabrane opcije (bez luka, dobro pečeno), napomenu gosta, alergene i mjerač vremena od trenutka kad je narudžba napravljena. Dodirnite karticu i status prelazi u sljedeći: Čeka → U pripremi → Spremno → Posluženo. Popis se automatski sortira po prioritetu.",
      bullets: [
        "Dodir na karticu — trenutna promjena statusa.",
        "Opcije, napomene i alergeni istaknuti bojama.",
        "Sortiranje po prioritetu: stavke koje duže čekaju idu na vrh.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet na mjedenom stalku na šanku — KDS s karticama narudžbi po stolu" },
    },
  ],

  faq: {
    sub: "Što restoratori pitaju o kuhinjskom ekranu u IQ Restu. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Koji statusi jela postoje u kuhinji?", a: "Četiri statusa s različitim bojama kartica: Čeka (siva) — narudžba je prihvaćena i čeka; U pripremi (narančasta) — jelo se priprema; Spremno (plava) — spremno za posluživanje; Posluženo (zelena) — predano gostu. Dodir na karticu premjesta je u sljedeći status, bez izbornika ili potvrda." },
      { q: "Mogu li pokretati više KDS ekrana u različitim zonama?", a: "Da. Jedan tablet na vrućoj liniji, drugi na šanku, treći u slastičarnici — svaki sa svojim filtrom kategorije. Svi ekrani su sinkronizirani u stvarnom vremenu: status promijenjen na jednom ekranu ažurira se posvuda." },
      { q: "Koji hardver mi treba za pokretanje KDS-a?", a: "KDS je web aplikacija koja radi u svakom modernom pregledniku. Velika kuhinja — tablet na mjedenom stalku na šanku za izdavanje ili televizor na zidu. Mali lokal — smartphone kuhara. Bez posebnog hardvera, bez instalacije: otvorite link i prijavite se u račun." },
      { q: "Odakle dolaze narudžbe na kuhinjski ekran?", a: "Iz svih izvora: gost koji je naručio putem QR jelovnika za stolom; konobar koji je preuzeo narudžbu s telefona; gost koji je narudžbu predao s web-stranice. Sve stižu na KDS s oznakom izvora i brojem stola. Bez ručnih prijenosa s POS-a." },
      { q: "Što se prikazuje na kartici narudžbe?", a: "Naziv jela, odabrani modifikatori (bez luka, dobro pečeno, dodaj umak), komentar gosta, istaknuti alergeni, status (Čeka / U pripremi / Spremno / Posluženo) i mjerač vremena koji prikazuje koliko jelo čeka. Kartice se sortiraju po prioritetu: što duže čekanje, to više u stupcu." },
      { q: "Mogu li filtrirati kartice na ekranu?", a: "Da. Dva filtra: po statusu (npr. prikaži samo Čeka i U pripremi, sakrij Posluženo) i po kategoriji (samo pića na šanku, samo glavna jela u kuhinji). Postavke se spremaju po uređaju — svaka zona ima svoj skup." },
    ],
  },
};
