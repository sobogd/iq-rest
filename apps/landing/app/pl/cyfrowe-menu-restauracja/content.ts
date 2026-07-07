import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pl",
  slug: "cyfrowe-menu-restauracja",
  trackPrefix: "l_pl_digital",
  hideFeatureHeading: true,

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
      eyebrow: "35 języków AI",
      heading: "35 języków dla każdego gościa",
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
      heading: "Alergeny i diety przy każdym daniu",
      body: "Oznacz gluten, laktozę, orzechy, wegańskie i bezglutenowe. Goście filtrują menu pod swoją dietę i zamawiają bez obaw.",
      bullets: [
        "14 kategorii alergenów",
        "Etykiety wegańskie i bezglutenowe",
        "Goście filtrują wg diety",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Gość filtruje menu po alergenach na telefonie, podczas gdy właściciel edytuje listę alergenów na tablecie" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Każde urządzenie",
      heading: "Zarządzaj z każdego urządzenia",
      body: "Panel działa w przeglądarce — edytuj menu, ceny i zdjęcia z dowolnego miejsca. Niczego nie trzeba instalować.",
      bullets: [
        "Działa w każdej przeglądarce",
        "Telefon, tablet lub PC",
        "Nic do instalacji",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Bez prowizji",
      heading: "Zero prowizji, bez dopłat",
      body: "Jeden przejrzysty abonament. Nie bierzemy udziału w Twoim obrocie i nie ukrywamy opłat — wszystko zostaje w restauracji.",
      bullets: [
        "Zero procent od zamówień",
        "Bez ukrytych dopłat",
        "Jedna stała cena",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Własna domena",
      heading: "Menu na Twojej własnej domenie",
      body: "Podłączamy Twoją domenę z SSL — goście widzą menu pod adresem restauracji. Pomagamy z DNS w 10 minut.",
      bullets: [
        "Twoja domena z SSL",
        "menu.twojarestauracja.com",
        "Pomagamy z konfiguracją DNS",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Twój design",
      heading: "Elastyczny design pod Ciebie",
      body: "Kilka gotowych układów i stylów — wybierz okładkę, kolory i sposób prezentacji dań pasujące do Twojego lokalu.",
      bullets: [
        "Kilka gotowych układów",
        "Twoja okładka i kolory",
        "Zmiana w kilka kliknięć",
      ],
    },
    {
      icon: Contact,
      eyebrow: "Kontakt",
      heading: "Kontakt i social media w menu",
      body: "Osobna strona z mapą, telefonem i linkami do Instagrama i WhatsApp — goście znajdą Cię jednym dotknięciem.",
      bullets: [
        "Mapa, telefon i adres",
        "Instagram i WhatsApp",
        "Kontakt jednym dotknięciem",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "Zamówienia na WhatsApp",
      heading: "Przyjmuj zamówienia przez WhatsApp",
      body: "Goście budują koszyk i wysyłają zamówienie prosto na Twój WhatsApp — bez osobnej aplikacji, w czacie, którego już używają.",
      bullets: [
        "Zamówienie na Twój WhatsApp",
        "Bez osobnej aplikacji",
        "Czat jak zwykle",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezerwacje",
      heading: "Rezerwacja stolika bez telefonów",
      body: "Goście sami rezerwują stolik przez menu lub link, Ty widzisz kalendarz wg stolików i potwierdzasz auto lub ręcznie.",
      bullets: [
        "Rezerwacje 24/7 bez telefonów",
        "Kalendarz wg stolików",
        "Auto i ręczne potwierdzenie",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Design premium",
      heading: "Wygląda jak strona, nie PDF",
      body: "Tło wideo na ekranie powitalnym, opisany koncept i osobna strona kontaktowa z mapą i mediami społecznościowymi.",
      bullets: [
        "Wideo na ekranie startowym",
        "Opisany koncept i dania",
        "Osobna strona kontaktowa",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dwa telefony na stoliku kawiarni: ekran startowy menu z tłem wideo i strona kontaktowa z mapą" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Zamówienia · opcjonalnie",
      heading: "Zamówienia prosto z menu",
      body: "Goście budują koszyk i wysyłają zamówienie — trafia na salę, WhatsApp lub ekran w kuchni. Opcjonalnie.",
      bullets: [
        "Koszyk i wysyłka dotknięciem",
        "Na salę, WhatsApp lub do kuchni",
        "Przełączasz w ustawieniach",
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
