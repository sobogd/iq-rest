import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "sr",
  slug: "kuhinjski-ekran",
  trackPrefix: "l_sr_kds",

  meta: {
    title: "Kuhinjski ekran (KDS) za restorane | IQ Rest",
    description:
      "Kuhinjski ekran (KDS) za restorane: porudžbine iz sale i QR menija odmah stižu na ekran kuvara. Kolone po stolu, statusi Čeka / U pripremi / Spremno / Posluženo, filteri po zoni. Radi na tabletu ili telefonu.",
    canonical: "https://iq-rest.com/sr/kuhinjski-ekran",
    ogLocale: "sr_RS",
    ogTitle: "Kuhinjski ekran (KDS) — Porudžbine na ekranu kuvara",
    ogDescription:
      "Porudžbine iz sale na ekranu kuvara. Kolone po stolu, statusi i tajmer. Jedan dodir menja status.",
    brandLine: "IQ Rest — Kuhinjski ekran",
  },

  hero: {
    headline: "Kuhinjski ekran: porudžbine direktno na ekran kuvara.",
    cta: "Подеси кухињски екран",
    sub: "Papirni računi više nisu potrebni. Porudžbine iz sale ili QR menija odmah stižu na kuhinjski ekran — sa napomenama, alergenima i tajmerom. Jedan dodir menja status. Radi na tabletu kod pulta za izdavanje ili pametnom telefonu u džepu kuvara.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesionalna kuhinja sa tabletom na mesinganom stalku koji prikazuje kuhinjski ekran sa aktivnim porudžbinama",
  },

  scan: {
    heading: "Podesite kuhinjski ekran",
    headingAccent: "za 5 minuta.",
    sub: "Otpremite papirni meni ili PDF — AI prepoznaje jela, kategorije i alergene. Povežite tablet u kuhinji i počnite da primate porudžbine.",
    cta: "Skeniraj meni",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontrole i filteri",
      heading: "Više ekrana po zoni: kuhinja i bar.",
      body: "Postavite odvojene tablete na vrelu liniju, bar ili poslastičarnicu — svaki ekran prikazuje samo jela koja mu pripadaju. Filteri po statusu (Čeka / U pripremi / Spremno / Posluženo) i kategoriji uklanjaju buku: kuvar vidi samo ono što je relevantno za njegov posto.",
      bullets: [
        "Više KDS ekrana sa filterima po kategoriji.",
        "Filter statusa: prikaži samo U pripremi i Spremno.",
        "Svaka zona vidi samo svoj tok porudžbina.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet na mesinganom stalku kod pulta za izdavanje u kuhinji — KDS sa filterom statusa" },
    },
    {
      icon: Timer,
      eyebrow: "Kartice i tajmer",
      heading: "Jedan dodir menja status. Napomene i alergeni istaknuti bojama.",
      body: "Kartica jela prikazuje izabrane opcije (bez luka, dobro pečeno), napomenu gosta, alergene i tajmer od trenutka kada je porudžbina napravljena. Dodirnite karticu i status prelazi na sledeći: Čeka → U pripremi → Spremno → Posluženo. Lista se automatski sortira po prioritetu.",
      bullets: [
        "Dodir na karticu — trenutna promena statusa.",
        "Opcije, napomene i alergeni istaknuti bojama.",
        "Sortiranje po prioritetu: stavke koje čekaju duže idu na vrh.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet na mesinganom stalku na barskom pultu — KDS sa karticama porudžbina po stolu" },
    },
  ],

  faq: {
    sub: "Šta restorateri pitaju o kuhinjskom ekranu u IQ Rest. Ne nalazite svoje pitanje? Pišite nam na WhatsApp.",
    items: [
      { q: "Kakvi statusi jela postoje u kuhinji?", a: "Četiri statusa sa različitim bojama kartica: Čeka (siva) — porudžbina je prihvaćena i čeka; U pripremi (narandžasta) — jelo se priprema; Spremno (plava) — spremno za serviranje; Posluženo (zelena) — predato gostu. Dodir na karticu prebacuje je u sledeći status, bez menija ili potvrda." },
      { q: "Mogu li pokrenuti više KDS ekrana u različitim zonama?", a: "Da. Jedan tablet na vreloj liniji, drugi na baru, treći u poslastičarnici — svaki sa svojim filterom kategorije. Svi ekrani su sinhronizovani u realnom vremenu: status promenjen na jednom ekranu ažurira se svuda." },
      { q: "Koji hardver mi treba za pokretanje KDS-a?", a: "KDS je veb aplikacija koja radi u svakom modernom pretraživaču. Velika kuhinja — tablet na mesinganom stalku kod pulta za izdavanje ili televizor na zidu. Manji lokal — pametni telefon kuvara. Bez posebnog hardvera, bez instalacije: otvorite link i prijavite se na nalog." },
      { q: "Odakle dolaze porudžbine na kuhinjski ekran?", a: "Iz svih izvora: gost koji je poručio preko QR menija za stolom; konobar koji je primio porudžbinu sa svog telefona; gost koji je predao porudžbinu sa sajta. Svi stižu na KDS sa oznakom izvora i brojem stola. Bez ručnih prenosa sa POS-a." },
      { q: "Šta se prikazuje na kartici porudžbine?", a: "Ime jela, izabrani modifikatori (bez luka, dobro pečeno, dodaj sos), komentar gosta, istaknuti alergeni, status (Čeka / U pripremi / Spremno / Posluženo) i tajmer koji prikazuje koliko dugo jelo čeka. Kartice se sortiraju po prioritetu: što duže čekanje, to više u koloni." },
      { q: "Mogu li filtrirati kartice na ekranu?", a: "Da. Dva filtera: po statusu (npr. prikaži samo Čeka i U pripremi, sakrij Posluženo) i po kategoriji (samo pića na baru, samo glavna jela u kuhinji). Podešavanja se čuvaju po uređaju — svaka zona zadržava svoj skup." },
    ],
  },
};
