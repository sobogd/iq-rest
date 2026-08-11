import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restauracje","Kawiarnie","Bary","Pizzerie"],
    title: "Twoja restauracja, cyfrowo",
    titleAccent: "w 5 min",
    sub: "Cyfrowe menu, ekran kuchenny i rezerwacje 24/7 — wszystko dla restauracji, gotowe w 5 minut.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restauracje" },
      { icon: "cafe", label: "Kawiarnie" },
      { icon: "bar", label: "Bary" },
      { icon: "pizza", label: "Pizzerie" },
    ],
    title: "Wszystko, czego potrzebuje",
    titleAccent: "Twoja restauracja!",
    sub: "Skonfiguruj procesy w 10 minut: uruchom menu online, usprawnij pracę kuchni i kontroluj obłożenie stolików.",
    primaryLabel: "Zacznij za darmo",
    demoLabel: "Zobacz demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tablet z ekranem kuchennym: zamówienia według stolików w kolumnach ze statusami" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tablet z kalendarzem rezerwacji: widok miesiąca i rezerwacje oczekujące na potwierdzenie" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Telefon ze stroną główną witryny restauracji: zdjęcie, rezerwacje i menu online" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Telefon z kartą dania: zdjęcie, cena i oznaczenia alergenów" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "Start w 10 minut", sub: "Bez drogiego sprzętu i długiej konfiguracji" },
    { Icon: MessagesSquare, title: "Szybkie wsparcie", sub: "Odpowiadamy na czacie w ciągu kilku godzin" },
    { Icon: Globe, title: "Wybór {count} lokali", sub: "Ufają nam restauracje i kawiarnie w ponad 15 krajach" },
    { Icon: Palette, title: "100% w Twoim stylu", sub: "Dopasowujemy design i interfejs do stylu Twojego lokalu" },
  ],

  menu: {
    heading: "Strona www i cyfrowe menu",
    sub: {
      link: "Więcej niż menu QR!",
      rest: " Zyskaj pełną stronę internetową z unikalnym designem, kontaktem i rezerwacją stolików.",
    },
    moreLabel: "Dowiedz się więcej",
    mockupAlt: "Dwa telefony: strona główna witryny restauracji i karta dania",
    bullets: [
      { Icon: Languages, title: "Automatyczne tłumaczenie na 35 języków", sub: "Obsługuj zagranicznych gości bez bariery językowej — automatyczne tłumaczenie zrobi wszystko" },
      { Icon: ClipboardList, title: "Zamówienia prosto ze stolika", sub: "Uprość obsługę: przyjmuj zamówienia ze stolików szybko i bez udziału kelnera" },
      { Icon: WheatOff, title: "Alergeny i diety", sub: "Oznaczaj alergeny i preferencje (wegańskie, ostre), aby goście wybierali łatwo i bezpiecznie" },
    ],
  },

  reservations: {
    heading: "Rezerwacja stolików",
    sub: {
      link: "Inteligentna rezerwacja stolików!",
      rest: " Automatyczny system rezerwacji, który sam pilnuje wolnych stolików i Twojego grafiku.",
    },
    moreLabel: "Dowiedz się więcej",
    mockupAlt: "Tablet z kalendarzem rezerwacji: stoliki według dni i przedziałów czasowych",
    bullets: [
      { Icon: CalendarCheck, title: "Czytelna mapa rezerwacji", sub: "Przejrzysty grafik według dni i stolików — wolne miejsca widać od razu" },
      { Icon: SlidersHorizontal, title: "Elastyczna konfiguracja", sub: "Ustawiaj godziny pracy, długość slotów, zdjęcia stolików i zbieraj życzenia gości" },
      { Icon: Users, title: "Kontrola przepływu gości", sub: "Wybierz wygodny tryb obsługi rezerwacji i miej pełną kontrolę nad przepływem gości" },
    ],
  },

  heroMicrocopy: "{count} restauracji · 14 dni za darmo · Bez karty",
  seeIncluded: "Zobacz, co zawiera",

  trust: [
    { kind: "num", value: 35, label: "Języki" },
    { kind: "text", value: "24/7", label: "Rezerwacje" },
    { kind: "num", value: 5, suffix: " min", label: "Start" },
    { kind: "count", label: "Restauracje" },
  ],

  bundle: {
    heading: "Wszystko, na czym działa twoja restauracja.",
    headingAccent: "W jednej aplikacji.",
    sub: "Menu, kuchnia i rezerwacje w jednym miejscu — nowocześnie, szybko i z myślą o tym, jak naprawdę pracują restauracje. Bez dodatków, bez opłat za funkcję.",
  },

  benefits: [
    { Icon: Languages, tag: "Menu cyfrowe", title: "Menu, które sprzedaje.", bullets: ["35 języków z AI","Premium design","Ceny od razu aktualne"], image: "/landing/feature-design.webp", imageAlt: "Dwa telefony na stoliku w kawiarni: ekran powitalny menu cyfrowego i strona kontaktu z mapą" },
    { Icon: ChefHat, tag: "Ekran kuchni", title: "Gotuj szybciej, nic nie przeocz.", bullets: ["Na żywo na ekranie","Notatki i alergeny","Tablet lub telefon"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet na barze pokazujący ekran kuchni z zamówieniami według stolika" },
    { Icon: CalendarCheck, tag: "Rezerwacje", title: "Rezerwacje na autopilocie.", bullets: ["Samodzielna rezerwacja","Automatyczne potwierdzenie","Kalendarz po stolikach"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dwa tablety pokazujące kalendarz rezerwacji: widok dzienny po stolikach i widok miesięczny" },
    { Icon: Receipt, tag: "Zamówienia przy stoliku", title: "Zamówienia prosto do kuchni.", bullets: ["Gość lub kelner","Prosto do kuchni","Włącz, kiedy chcesz"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet z ekranem zamówień: lista zamówień i plan sali z kolorowymi stolikami." },
  ],

  seeDetails: "Zobacz szczegóły",

  extras: {
    heading: "I cała reszta w zestawie.",
    items: [
      { Icon: ScanLine, label: "AI cyfryzuje papierowe menu w 60 sekund" },
      { Icon: QrCode, label: "Unikalny kod QR dla każdego stolika" },
      { Icon: Smartphone, label: "Bez aplikacji dla gości — otwiera się w przeglądarce" },
      { Icon: Globe, label: "Własna domena z SSL" },
      { Icon: BarChart3, label: "Analizy sprzedaży: przychód, topowe dania, godziny" },
      { Icon: Palette, label: "Etykiety alergenów i diet do filtrowania" },
    ],
  },

  midCta: {
    heading: "Jedna aplikacja zamiast pięciu.",
    sub: "Koniec żonglowania osobnymi narzędziami do menu, kuchni i rezerwacji — wszystko w jednym miejscu, na każdym telefonie lub tablecie, bez instalacji.",
  },

  platform: {
    hardwareTitle: "Pracuj na własnym sprzęcie",
    hardwareSub: "Nigdy nie zmuszamy do kupowania sprzętu od nas. Korzystaj z telefonów, tabletów i komputerów, które już masz.",
    anywhereTitle: "Działa wszędzie",
    anywhereSub: "Telefon, tablet, laptop, PC. Android, iOS, Windows, Mac, Linux. Działa w każdej nowoczesnej przeglądarce, bez instalacji.",
  },

  activities: {
    heading: "Jeden system,",
    headingAccent: "cała Twoja restauracja.",
    sub: "Szybsza obsługa, spokojniejsza kuchnia, niższe koszty i obsługa, którą gość zapamięta — wszystko na jednej platformie.",
    groups: [
      {
        Icon: Smartphone,
        tag: "Przy stoliku — goście",
        bullets: [
          "Menu QR w 35 językach",
          "Zamawianie bez czekania na kelnera",
          "Wezwanie kelnera lub prośba o rachunek",
          "Rezerwacja stolika 24/7",
          "Unikalny kod QR dla każdego stolika",
          "Bez aplikacji dla gości — otwiera się w przeglądarce",
          "Etykiety alergenów i diet do filtrowania",
        ],
      },
      {
        Icon: ChefHat,
        tag: "W kuchni",
        bullets: [
          "Zamówienia trafiają na ekran natychmiast",
          "Kolumny w przygotowaniu / gotowe / podane",
          "Alergeny i uwagi wyróżnione",
          "Tablet lub telefon — bez papierowych bonów",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Zarządzanie",
        bullets: [
          "Zmiany menu i cen od razu na żywo",
          "Tłumaczenie AI jednym kliknięciem",
          "Analizy sprzedaży i raporty",
          "Kilka restauracji na jednym koncie",
          "AI cyfryzuje papierowe menu w 60 sekund",
          "Własna domena z SSL",
        ],
      },
    ],
  },
};
