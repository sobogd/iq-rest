import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pl",
  slug: "ekran-kuchenny",
  trackPrefix: "l_pl_kds",

  meta: {
    title: "Ekran kuchenny (KDS) dla restauracji | IQ Rest",
    description:
      "Ekran kuchenny (KDS) dla restauracji: zamówienia z sali i menu QR trafiają natychmiast na ekran szefa kuchni. Kolumny wg stolika, statusy Oczekuje / W przygotowaniu / Gotowe / Podane, filtry wg strefy. Działa na tablecie lub telefonie.",
    canonical: "https://iq-rest.com/pl/ekran-kuchenny",
    ogLocale: "pl_PL",
    ogTitle: "Ekran kuchenny (KDS) — Zamówienia na ekranie szefa kuchni",
    ogDescription:
      "Zamówienia z sali na ekranie szefa kuchni. Kolumny wg stolika, statusy i timer. Jedno dotknięcie zmienia status.",
    brandLine: "IQ Rest — Ekran kuchenny",
  },

  hero: {
    headline: "Ekran kuchenny: zamówienia bezpośrednio na ekran szefa kuchni.",
    sub: "Papierowe rachunki nie są już potrzebne. Zamówienia z sali lub menu QR trafiają natychmiast na ekran kuchenny — z notatkami, alergenami i timerem. Jedno dotknięcie zmienia status. Działa na tablecie przy ladzie wydawczej lub smartfonie w kieszeni szefa kuchni.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Profesjonalna kuchnia z tabletem na mosiężnym stojaku pokazującym ekran kuchenny z aktywnymi zamówieniami",
  },

  scan: {
    heading: "Skonfiguruj ekran kuchenny",
    headingAccent: "w 5 minut.",
    sub: "Prześlij papierowe menu lub PDF — AI rozpozna dania, kategorie i alergeny. Podłącz tablet w kuchni i zacznij odbierać zamówienia.",
    cta: "Skanuj menu",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontrolki i filtry",
      heading: "Kilka ekranów wg strefy: kuchnia i bar.",
      body: "Umieść osobne tablety przy gorącej linii, barze lub stanowisku cukierniczym — każdy ekran pokazuje tylko dania, które do niego należą. Filtry wg statusu (Oczekuje / W przygotowaniu / Gotowe / Podane) i kategorii usuwają szum: szef kuchni widzi tylko to, co istotne dla jego stanowiska.",
      bullets: [
        "Kilka ekranów KDS z filtrami wg kategorii.",
        "Filtr statusu: pokaż tylko W przygotowaniu i Gotowe.",
        "Każda strefa widzi tylko swój przepływ zamówień.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tablet na mosiężnym stojaku przy ladzie wydawczej kuchni — KDS z filtrem statusu" },
    },
    {
      icon: Timer,
      eyebrow: "Karty i timer",
      heading: "Jedno dotknięcie zmienia status. Notatki i alergeny podświetlone kolorem.",
      body: "Karta dania pokazuje wybrane opcje (bez cebuli, dobrze wysmażone), notatkę gościa, alergeny i timer od momentu złożenia zamówienia. Dotknij karty, a status przechodzi do następnego: Oczekuje → W przygotowaniu → Gotowe → Podane. Lista jest sortowana wg priorytetu automatycznie.",
      bullets: [
        "Dotknięcie karty — natychmiastowa zmiana statusu.",
        "Opcje, notatki i alergeny podświetlone kolorem.",
        "Sortowanie wg priorytetu: pozycje czekające dłużej idą na górę.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tablet na mosiężnym stojaku na barze — KDS z kartami zamówień wg stolika" },
    },
  ],

  faq: {
    sub: "Co restauratorzy pytają o ekran kuchenny w IQ Rest. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp.",
    items: [
      { q: "Jakie statusy dań są w kuchni?", a: "Cztery statusy z różnymi kolorami kart: Oczekuje (szary) — zamówienie zostało przyjęte i czeka; W przygotowaniu (pomarańczowy) — danie jest przygotowywane; Gotowe (niebieski) — gotowe do podania; Podane (zielony) — wydane gościowi. Dotknięcie karty przenosi ją do następnego statusu, bez menu ani potwierdzeń." },
      { q: "Czy mogę uruchomić kilka ekranów KDS w różnych strefach?", a: "Tak. Jeden tablet przy gorącej linii, drugi przy barze, trzeci w cukierni — każdy z własnym filtrem kategorii. Wszystkie ekrany są zsynchronizowane w czasie rzeczywistym: status zmieniony na jednym ekranie aktualizuje się wszędzie." },
      { q: "Jaki sprzęt potrzebuję do uruchomienia KDS?", a: "KDS to aplikacja webowa, która działa w każdej nowoczesnej przeglądarce. Duża kuchnia — tablet na mosiężnym stojaku przy ladzie wydawczej lub telewizor na ścianie. Małe miejsce — smartfon szefa kuchni. Bez specjalnego sprzętu, bez instalacji: otwórz link i zaloguj się do konta." },
      { q: "Skąd pochodzą zamówienia na ekranie kuchennym?", a: "Z wszystkich źródeł: gość, który zamówił przez menu QR przy stoliku; kelner, który przyjął zamówienie z telefonu; gość, który złożył zamówienie ze strony internetowej. Wszystkie trafiają do KDS z etykietą źródła i numerem stolika. Bez ręcznych transferów z POS." },
      { q: "Co jest wyświetlane na karcie zamówienia?", a: "Nazwa dania, wybrane modyfikatory (bez cebuli, dobrze wysmażone, dodaj sos), komentarz gościa, podświetlone alergeny, status (Oczekuje / W przygotowaniu / Gotowe / Podane) i timer pokazujący, jak długo danie czeka. Karty są sortowane wg priorytetu: im dłuższe oczekiwanie, tym wyżej w kolumnie." },
      { q: "Czy mogę filtrować karty na ekranie?", a: "Tak. Dwa filtry: wg statusu (np. pokaż tylko Oczekuje i W przygotowaniu, ukryj Podane) i wg kategorii (tylko napoje na barze, tylko dania główne w kuchni). Ustawienia są zapisywane na urządzenie — każda strefa zachowuje swój własny zestaw." },
    ],
  },
};
