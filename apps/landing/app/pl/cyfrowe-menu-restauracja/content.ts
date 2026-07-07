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
  locale: "pl",
  slug: "cyfrowe-menu-restauracja",
  trackPrefix: "l_pl_digital",
  featureHeading: {
    heading: "Więcej niż menu",
    sub: "Wszystko, co zamienia menu QR w usługę dla Twojej sali i kuchni.",
  },

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
    headline: "Cyfrowe menu,\nktóre ma wszystko",
    cta: "Utwórz menu cyfrowe",
    sub: "Zdjęcia, alergeny i tłumaczenie na 35 języków. Plus zamówienia, WhatsApp i rezerwacja stolików — wszystko w jednym IQ Rest.",
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
      eyebrow: "Tłumaczenie AI",
      heading: "Menu w 35 językach",
      body: "Jeden QR, 35 języków. AI tłumaczy z kontekstem kulinarnym, więc każde danie brzmi naturalnie. Turyści zamawiają pewnie.",
      bullets: [
        "35 języków w abonamencie",
        "AI kulinarne, nie Google",
        "Zmiana języka jednym dotknięciem",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dwóch gości czyta to samo cyfrowe menu w różnych językach na swoich telefonach" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alergeny",
      heading: "Alergeny i diety przy daniach",
      body: "Oznacz gluten, laktozę, orzechy, wegańskie i bezglutenowe. Goście filtrują menu pod swoją dietę i zamawiają bez obaw.",
      bullets: [
        "14 kategorii alergenów",
        "Etykiety wegańskie i bezglutenowe",
        "Goście filtrują wg diety",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gość filtruje menu po alergenach na telefonie, podczas gdy właściciel edytuje listę alergenów na tablecie" },
    },
    {
      icon: Palette,
      eyebrow: "Design i marka",
      heading: "Menu premium na Twojej domenie",
      body: "Wideo na ekranie powitalnym, własny design i strona kontaktowa z mapą i social mediami — na Twojej domenie, nie PDF.",
      bullets: [
        "Wideo i design premium",
        "Twoja domena z SSL",
        "Kontakt, mapa i social media",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dwa telefony na stoliku kawiarni: ekran startowy menu z tłem wideo i strona kontaktowa z mapą" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Zamówienia",
      heading: "Zamówienia online, zero prowizji",
      body: "Goście zamawiają z menu lub prosto na Twój WhatsApp — trafia na salę lub do kuchni, z 0% od sprzedaży.",
      bullets: [
        "Z menu lub z WhatsApp",
        "Na salę lub do kuchni, 0%",
        "Przełączasz w ustawieniach",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dwa telefony na stoliku: koszyk z zamówieniem i potwierdzenie wysłania zamówienia" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezerwacje",
      heading: "Rezerwacja stolika, 24/7",
      body: "Goście sami rezerwują stolik przez menu lub link, Ty widzisz kalendarz wg stolików i potwierdzasz auto lub ręcznie.",
      bullets: [
        "Goście rezerwują sami",
        "Kalendarz wg stolików",
        "Auto i ręczne potwierdzenie",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Zarządzanie",
      heading: "Zarządzaj z dowolnego miejsca",
      body: "Panel działa w każdej przeglądarce — telefon, tablet lub PC. Nic do instalacji, a podstawowe menu ruszy w kilka minut.",
      bullets: [
        "Każde urządzenie i przeglądarka",
        "Nic do instalacji",
        "Start w kilka minut",
      ],
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
