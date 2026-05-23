import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pl",
  slug: "cyfrowe-menu-restauracja",
  trackPrefix: "l_pl_digital",

  meta: {
    title: "Cyfrowe menu dla restauracji | IQ Rest",
    description:
      "Cyfrowe menu dla restauracji: menu online ze zdjęciami, alergenami, tłumaczeniem AI i aktualizacjami cen na żywo. 14 dni za darmo, bez karty.",
    canonical: "https://iq-rest.com/pl/cyfrowe-menu-restauracja",
    ogLocale: "pl_PL",
    ogTitle: "Cyfrowe menu dla restauracji",
    ogDescription:
      "Internetowa wersja papierowego menu — zdjęcia, alergeny, tłumaczenie AI, aktualizacje w czasie rzeczywistym.",
    brandLine: "IQ Rest — Cyfrowe menu dla restauracji",
  },

  hero: {
    headline: "Cyfrowe menu dla restauracji.",
    sub: "Internetowa wersja Twojego papierowego menu ze zdjęciami, alergenami, opisami i aktualizacjami cen na żywo. Goście widzą menu w swoim języku; restauracja oszczędza na druku.",
    imageSrc: "/landing/hero-digital-menu.webp",
    imageAlt: "Two phones on a wooden restaurant table showing a digital menu with dish photos and prices",
  },

  scan: {
    heading: "Masz menu papierowe lub PDF?",
    headingAccent: "AI zdigitalizuje je w 60 sekund.",
    sub: "Prześlij zdjęcie lub dokument — AI rozpozna kategorie, dania i ceny automatycznie.",
    cta: "Skanuj menu",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 języków AI",
      heading: "35 języków AI — każdy gość czyta menu w swoim.",
      body: "Jeden kod QR, 35 języków. AI obsługuje kontekst kulinarny — nazwy dań i opisy brzmią naturalnie. Turyści zamawiają z większą pewnością, a średni rachunek rośnie bez konieczności tłumaczenia każdego dania przez kelnera.",
      bullets: [
        "35 języków w subskrypcji, bez dopłat.",
        "AI rozumiejące kontekst kulinarny, nie surowy Google Translate.",
        "Gość zmienia język jednym dotknięciem w samym menu.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dwóch gości czyta to samo cyfrowe menu w różnych językach na swoich telefonach" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeny",
      heading: "Etykiety alergenów i diet.",
      body: "Oznacz dania pod kątem glutenu, laktozy, orzechów, owoców morza, opcji wegańskich i bezglutenowych. Goście filtrują menu według swoich potrzeb dietetycznych i zamawiają z większą pewnością.",
      bullets: [
        "14 standardowych kategorii alergenów w każdym daniu.",
        "Etykiety wegańskie, wegetariańskie i bezglutenowe jednym kliknięciem.",
        "Goście filtrują menu według swoich ograniczeń dietetycznych.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gość filtruje menu po alergenach na telefonie, podczas gdy właściciel edytuje listę alergenów na tablecie" },
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Design premium z tłem wideo i stroną kontaktową.",
      body: "Film lub zdjęcie na ekranie powitalnym, opis restauracji, dedykowana strona kontaktowa z mapą, numerami telefonów i profilami w mediach społecznościowych. Cyfrowe menu wygląda jak pełna strona internetowa restauracji, a nie PDF za kodem QR.",
      bullets: [
        "Tło wideo lub duże zdjęcie na ekranie powitalnym.",
        "Opisy restauracji i kategorii — opowiedz historię konceptu.",
        "Strona kontaktowa: mapa, telefon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dwa telefony na stoliku kawiarni: ekran startowy menu z tłem wideo i strona kontaktowa z mapą" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Zamówienia z menu · opcjonalnie",
      heading: "Goście składają zamówienia bezpośrednio z menu.",
      body: "Goście budują koszyk w menu QR i wysyłają zamówienie — trafia ono do kelnera na sali lub na tablet w kuchni. Funkcję można włączać i wyłączać w ustawieniach w dowolnym momencie.",
      bullets: [
        "Koszyk, komentarze i wysyłka zamówienia jednym dotknięciem.",
        "Zamówienie trafia natychmiast do panelu administracyjnego, WhatsApp lub na ekran kuchenny.",
        "Funkcja przełączana w ustawieniach.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dwa telefony na stoliku: koszyk z zamówieniem i potwierdzenie wysłania zamówienia" },
    },
  ],

  faq: {
    sub: "Co restauratorzy pytają o cyfrowe menu w IQ Rest. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp.",
    items: [
      { q: "Czy potrzebuję umiejętności technicznych lub doświadczenia z CMS?", a: "Nie, specjalne umiejętności nie są wymagane. Każda akcja w panelu administracyjnym to kliknięcie i przeciąganie — bez kodu. Dodanie pozycji do menu zajmuje kilka sekund: nazwa, cena, zdjęcie. Pełna konfiguracja menu zazwyczaj zajmuje od 30 minut do godziny." },
      { q: "Czym jest cyfrowe menu IQ Rest?", a: "IQ Rest to platforma chmurowa dla restauracji. Cyfrowe menu to internetowa wersja Twojego menu, dostępna dla gości poprzez kod QR lub bezpośredni link: zdjęcia dań, ceny, alergeny, tłumaczenie AI na 35 języków, aktualizacje w czasie rzeczywistym. Menu jest hostowane na naszych serwerach; nie musisz instalować ani utrzymywać oprogramowania — wystarczy otworzyć przeglądarkę." },
      { q: "Czy goście potrzebują aplikacji lub specjalnego sprzętu?", a: "Nie. Goście kierują kamerę telefonu na kod QR i menu otwiera się w przeglądarce. Panel administracyjny restauracji również działa w każdej nowoczesnej przeglądarce — telefon, tablet lub laptop. Kody QR są drukowane na dowolnej drukarce biurowej." },
      { q: "Czy mogę hostować menu na własnej domenie?", a: "Tak. Wspieramy niestandardową domenę z certyfikatem SSL — goście widzą menu pod adresem Twojej restauracji (np. menu.twojarestauracja.pl). Pomagamy w konfiguracji DNS; trwa to zazwyczaj 5–10 minut." },
      { q: "Czy mogę zarządzać wieloma restauracjami z jednego konta?", a: "Tak, na życzenie. Jedno konto może hostować wiele restauracji: każde miejsce z własnym menu, designem, kodami QR i analityką. Napisz do nas na WhatsApp, a aktywujemy tryb multi-restauracyjny dla Twojej grupy." },
      { q: "Jak trudna jest konfiguracja menu od zera?", a: "Konfiguracja składa się z trzech kroków: (1) utworzenie kategorii; (2) dodanie pozycji z nazwami, cenami i zdjęciami; (3) wydrukowanie kodów QR dla stolików. Jeśli już masz papierowe menu lub PDF, prześlij je — AI rozpozna kategorie, nazwy i ceny i automatycznie wypełni karty. Podstawowe menu może być online w 5 minut; całkowity czas zależy od liczby pozycji." },
      { q: "Jakie wsparcie oferujecie?", a: "Jesteśmy dostępni na WhatsApp w godzinach pracy i szybko odpowiadamy na e-maile. Pomagamy w początkowej konfiguracji, konfiguracji domeny, projektowaniu menu i wszelkich niestandardowych sytuacjach. Jeśli potrzebujesz demo lub praktycznego wsparcia podczas uruchamiania — napisz do nas." },
    ],
  },
};
