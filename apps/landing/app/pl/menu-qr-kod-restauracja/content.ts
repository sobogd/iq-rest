import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pl",
  slug: "menu-qr-kod-restauracja",
  trackPrefix: "l_pl_qr",

  meta: {
    title: "Menu z kodem QR dla restauracji | IQ Rest",
    description:
      "Menu z kodem QR dla restauracji: gość skanuje kod QR na stoliku, otwiera menu w przeglądarce i zamawia w swoim języku. 14 dni za darmo, bez karty.",
    canonical: "https://iq-rest.com/pl/menu-qr-kod-restauracja",
    ogLocale: "pl_PL",
    ogTitle: "Menu z kodem QR dla restauracji",
    ogDescription:
      "QR na stoliku, menu w telefonie — zdjęcia, alergeny, 35 języków i aktualizacje na żywo.",
    brandLine: "IQ Rest — Menu z kodem QR dla restauracji",
  },

  hero: {
    headline: "Menu z kodem QR dla restauracji.",
    sub: "Gość kieruje aparat na kod QR na stoliku i menu otwiera się natychmiast w przeglądarce telefonu: zdjęcia dań, alergeny, zawsze aktualne ceny i automatyczne tłumaczenie na 35 języków. Bez pobierania aplikacji, bez przedruku menu przy każdej zmianie ceny.",
  },

  scan: {
    heading: "Masz już menu papierowe lub w PDF?",
    headingAccent: "AI zamieni je w menu z kodem QR w 60 sekund.",
    sub: "Prześlij zdjęcie menu lub plik PDF — AI rozpozna kategorie, dania i ceny i od razu połączy je z menu QR.",
    cta: "Utwórz menu QR",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Jeden QR, 35 języków",
      heading: "Jeden kod QR, menu w 35 językach.",
      body: "Gość skanuje QR i wybiera swój język: tłumaczenie obsługuje AI z wyczuciem kulinarnym, a nie ogólny translator. Koniec z osobnymi menu dla turystów i luźnymi kartkami na stoliku.",
      bullets: [
        "Jeden wydruk QR obejmuje 35 języków, w cenie abonamentu.",
        "AI rozumie język kuchni — nazwy dań brzmią naturalnie w każdym języku.",
        "Gość zmienia język w menu, bez ponownego skanowania QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dwóch gości skanuje ten sam kod QR ze stolika i czyta menu w różnych językach" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeny w QR",
      heading: "Alergeny i etykiety dietetyczne w menu QR.",
      body: "Każde danie w menu połączonym z QR może mieć etykiety: gluten, laktoza, orzechy, owoce morza, opcje wegańskie i bezglutenowe. Gość filtruje z telefonu dania zgodne ze swoimi ograniczeniami, bez pytania obsługi.",
      bullets: [
        "14 kategorii alergenów na poziomie dania.",
        "Etykiety wegańskie, wegetariańskie i bezglutenowe jednym kliknięciem w panelu.",
        "Gość filtruje menu QR według własnych ograniczeń.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gość filtruje menu QR pod kątem alergenów na telefonie, podczas gdy właściciel edytuje listę na tablecie" },
    },
    {
      icon: Palette,
      eyebrow: "Więcej niż zwykły QR",
      heading: "Menu QR dopracowane jak strona restauracji.",
      body: "Po zeskanowaniu kodu gość nie trafia na płaski PDF: widzi ekran powitalny z filmem lub wyróżnionym zdjęciem, opis lokalu oraz stronę kontaktową z mapą, telefonami i mediami społecznościowymi. QR staje się bramą do restauracji online.",
      bullets: [
        "Film w tle lub wyróżnione zdjęcie na ekranie startowym menu QR.",
        "Miejsce, by opowiedzieć koncepcję lokalu i każdej kategorii.",
        "Wbudowana strona kontaktowa: mapa, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dwa telefony na stole: ekran startowy menu QR z filmem w tle i strona kontaktowa z mapą" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Zamawianie z QR · opcjonalnie",
      heading: "Z kodu QR gość może też zamawiać.",
      body: "Poza przeglądaniem menu, menu QR może stać się kanałem zamówień: gość dodaje dania do koszyka i wysyła zgłoszenie. Zamówienie trafia do kelnera na sali, na WhatsApp lub na ekran kuchni. Funkcję włącza się lub wyłącza w ustawieniach, gdy trzeba.",
      bullets: [
        "Koszyk, uwagi i wysyłka zamówienia bezpośrednio po zeskanowaniu QR.",
        "Zamówienie natychmiast trafia na salę, na WhatsApp lub na ekran kuchni.",
        "Funkcję można włączać według godzin, sal lub konkretnych restauracji.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dwa telefony na stole: koszyk utworzony z menu QR i potwierdzenie wysłanego zamówienia" },
    },
  ],

  faq: {
    sub: "O co restauratorzy pytają w sprawie menu z kodem QR od IQ Rest. Nie ma Twojego pytania? Napisz do nas na WhatsApp.",
    items: [
      { q: "Jak działa menu z kodem QR od IQ Rest?", a: "Każdy stolik ma wydrukowany kod QR. Gość skanuje go aparatem telefonu, a przeglądarka otwiera menu restauracji — zdjęcia, opisy, alergeny i aktualne ceny. Nie trzeba pobierać żadnej aplikacji, ani gość, ani obsługa." },
      { q: "Czy potrzebuję wiedzy technicznej, by stworzyć menu QR?", a: "Nie. Panel działa na klikaniu i przeciąganiu, bez kodu i skomplikowanych ustawień. Dodanie dania zajmuje kilka sekund: nazwa, cena, zdjęcie. Wstępna konfiguracja trwa zwykle od 30 minut do godziny; jeśli masz już PDF z menu, AI przekonwertuje je automatycznie." },
      { q: "Czy goście muszą instalować aplikację, by odczytać QR?", a: "Nie. Natywny aparat iPhone'a i Androida rozpoznaje kod QR w kilka sekund i otwiera menu bezpośrednio w przeglądarce. Panel administracyjny również działa w każdej nowoczesnej przeglądarce — telefon, tablet lub laptop." },
      { q: "Jak drukuje się kody QR na stoliki?", a: "Kody QR są generowane automatycznie w panelu (jeden na stolik lub jeden dla całego lokalu) i pobierane jako gotowe do druku pliki PDF. Wystarczy drukarka biurowa i podstawka: stojak, naklejka lub podkładka." },
      { q: "Czy mogę użyć własnej domeny dla menu QR?", a: "Tak. Obsługujemy domenę restauracji z certyfikatem SSL (na przykład menu.twojarestauracja.pl): gdy gość skanuje QR, widzi adres Twojej restauracji zamiast ogólnej subdomeny. Konfiguracja DNS trwa 5–10 minut, a my Cię przez nią przeprowadzimy." },
      { q: "Czy mogę zarządzać kodami QR kilku restauracji z jednego konta?", a: "Tak, na życzenie. Jedno konto może łączyć kilka lokali, każdy z własnymi kodami QR, menu, projektem i analityką. Napisz do nas na WhatsApp, a włączymy tryb wielu restauracji." },
      { q: "Czy trudno uruchomić menu QR od zera?", a: "Trzy kroki: (1) utwórz kategorie; (2) dodaj dania z nazwą, ceną i zdjęciem; (3) wydrukuj kody QR i ustaw je na stolikach. Jeśli masz już menu papierowe lub w PDF, prześlij je — AI rozpozna kategorie i ceny i wypełni karty. Podstawowe menu może być online w 5 minut." },
    ],
  },
};
