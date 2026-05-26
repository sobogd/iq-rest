import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pl",
  slug: "system-zamowien-restauracja",
  trackPrefix: "l_pl_orders",

  meta: {
    title: "System zamówień dla restauracji — gość i kelner | IQ Rest",
    description:
      "Zamówienia restauracyjne z telefonu lub tabletu: plan sali, podział rachunku, statusy, opcje i notatki. Goście zamawiają przy stoliku; kelner przyjmuje zamówienia z dowolnego urządzenia. 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/system-zamowien-restauracja",
    ogLocale: "pl_PL",
    ogTitle: "System zamówień dla restauracji — gość i kelner",
    ogDescription:
      "Gość przy stoliku lub kelner na telefonie — zamówienie trafia natychmiast do kuchni. Plan sali, podział rachunku, statusy, opcje i notatki.",
    brandLine: "IQ Rest — System zamówień dla restauracji",
  },

  hero: {
    headline: "Przyjmowanie zamówień: gość i kelner — bezpośrednio do kuchni.",
    cta: "Skonfiguruj zamówienia online",
    sub: "Goście zamawiają przez menu QR przy stoliku lub kelner przyjmuje zamówienie z telefonu lub tabletu — zamówienie trafia na ekran kuchenny w kilka sekund. Plan sali z kolorowymi stolikami, podział rachunku, elastyczne opcje i komentarze. Bez notesów, bez chodzenia do baru.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Kelner przyjmuje zamówienie przy stoliku ze smartfona — zamówienie trafia na ekran kuchenny",
  },

  scan: {
    heading: "Skonfiguruj system zamówień",
    headingAccent: "w 5 minut.",
    sub: "Prześlij papierowe menu lub PDF — AI rozpozna dania, ceny i kategorie. Podłącz tablet na sali i zacznij przyjmować zamówienia przy stolikach.",
    cta: "Skanuj menu",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista i plan sali",
      heading: "Lista zamówień obok planu sali.",
      body: "Wszystkie aktywne zamówienia po prawej: status, suma, czas, liczba pozycji. Po lewej — plan sali: stoliki pokolorowane według statusu — wolny, zajęty, wymaga uwagi. Dotknij stolika, aby otworzyć lub utworzyć zamówienie; dotknij karty, aby otworzyć widok szczegółowy. Bez przełączania ekranów.",
      bullets: [
        "Plan sali: stoliki pokolorowane według statusu zamówienia.",
        "Lista zamówień obok — suma, czas, liczba pozycji.",
        "Dotknij stolika, aby otworzyć lub utworzyć zamówienie.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tablet na stanowisku kelnera: lista zamówień i plan sali z kolorowymi stolikami" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Karta zamówienia",
      heading: "Karta zamówienia: statusy, duplikowanie, usuwanie — jedno dotknięcie.",
      body: "Każda pozycja ma swój status (Oczekuje / W przygotowaniu / Gotowe / Podane) — kuchnia i kelner widzą ten sam obraz w czasie rzeczywistym. Dotknięcie kropki otwiera menu akcji: zmiana statusu, duplikowanie pozycji z tymi samymi modyfikatorami i opcjami, usunięcie. Wszystko wewnątrz karty.",
      bullets: [
        "Status na pozycję: Oczekuje / W przygotowaniu / Gotowe / Podane.",
        "Duplikuj pozycję jednym dotknięciem z tymi samymi opcjami.",
        "Usuń pozycję bezpośrednio z karty.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tablet ze szczegółową kartą zamówienia: statusy pozycji, akcje duplikowania i usuwania" },
    },
    {
      icon: Receipt,
      eyebrow: "Podziel rachunek",
      heading: "Podziel rachunek, gdy goście płacą osobno.",
      body: "Goście zdecydowali się podzielić — zaznacz pozycje, które przechodzą na nowy paragon; reszta zostaje na bieżącym. System natychmiast pokazuje obie sumy. Jedno dotknięcie „Podziel zamówienie“ i masz dwa niezależne zamówienia z poprawnymi sumami, oba nadal powiązane ze swoimi stolikami.",
      bullets: [
        "Wybierz pozycje do podziału za pomocą pól wyboru.",
        "Obie sumy są wyświetlane natychmiast.",
        "Jedno dotknięcie i zamówienie jest podzielone bez ręcznych obliczeń.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tablet na stoliku restauracyjnym: okno podziału rachunku między gośćmi" },
    },
    {
      icon: Smartphone,
      eyebrow: "Dodawanie z telefonu",
      heading: "Dodawaj pozycje z telefonu — w trzech akcjach.",
      body: "Kelner nie jest przywiązany do jednego urządzenia: otwiera przyjmowanie zamówień na swoim telefonie i dodaje pozycję w trzech krokach — kategoria, danie, opcje (rozmiar, stopień wysmażenia, dodatkowy sos lub składnik). Cena jest przeliczana automatycznie. Notatka dla kuchni pojawia się w ostatnim kroku.",
      bullets: [
        "Trzy kroki: kategoria → danie → opcje.",
        "Opcje (rozmiar, dodatki, extra) wycenione jednym kliknięciem.",
        "Pole notatki w ostatnim kroku.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Cztery telefony z krokami dodawania pozycji zamówienia: kategoria, danie, rozmiar, komentarz" },
    },
  ],

  faq: {
    sub: "Co restauratorzy pytają o przyjmowanie zamówień w IQ Rest. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp.",
    items: [
      { q: "Czy kilku kelnerów może pracować jednocześnie z różnych urządzeń?", a: "Tak. Każdy kelner loguje się do wspólnego konta restauracji ze swojego telefonu lub tabletu — wszyscy widzą te same stoliki, zamówienia i statusy w czasie rzeczywistym. Zmiany jednego kelnera pojawiają się natychmiast u pozostałych, bez konfliktów i blokad." },
      { q: "Czy kelnerzy mogą używać swoich osobistych urządzeń (BYOD)?", a: "Tak. To aplikacja webowa w przeglądarce — nic do zainstalowania. Kelner otwiera link, loguje się do konta restauracji ze swojego iPhone'a, Androida lub osobistego tabletu i zaczyna pracę. Na koniec zmiany po prostu się wylogowuje." },
      { q: "Czy można dodać do dań obowiązkowe opcje (rozmiar, stopień wysmażenia itp.)?", a: "Tak. Każde danie może mieć dowolną liczbę grup opcji — obowiązkowe (np. „Rozmiar“: Mały / Średni / Duży) i opcjonalne („Stopień wysmażenia“: krwisty / średni / dobrze wysmażony). Opcje mogą zmieniać cenę (+1,00 €). Jeśli grupa jest obowiązkowa, system nie pozwoli gościowi ani kelnerowi dodać dania bez wyboru." },
      { q: "Czy goście mogą dodawać notatki lub dodatki do dania (chleb, sos)?", a: "Tak. Ostatni krok dodawania ma pole na swobodną notatkę („bez cebuli“, „dobrze wysmażone“, „alergia na orzechy“). Dodatki to oddzielne modyfikatory z ceną („+ sos BBQ +1,50 €“, „+ Chleb +2,00 €“). Notatki pojawiają się na ekranie kuchennym, podświetlone kolorem." },
      { q: "Czy są statystyki zamówień?", a: "Tak. Sekcja analityki pokazuje: przychody według dnia i godziny, średni rachunek, najczęściej zamawiane dania, konwersja gość → zamówienie, szybkość obsługi (czas od Oczekuje do Podane). To pomaga w planowaniu zmian, zakupów i identyfikacji słabo sprzedających się dań." },
      { q: "Czy można dzielić zamówienia lub przenosić między stolikami?", a: "Tak, oba scenariusze są wspierane. Aby podzielić — zaznacz pozycje, które przechodzą na nowy paragon (dla gości płacących osobno). Aby przenieść — otwórz kartę zamówienia, wybierz nowy stolik; całe zamówienie tam się przeniesie. Bez ręcznych obliczeń, bez opuszczania panelu." },
    ],
  },
};
