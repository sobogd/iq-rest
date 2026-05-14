import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Zarządzaj restauracją z telefonu — mobilny panel restauracji",
    description:
      "Dodawaj dania, zmieniaj ceny, dodawaj zdjęcia, sprawdzaj zamówienia — wszystko z telefonu. Cały panel IQ Rest działa mobilnie. Komputer już niepotrzebny.",
    canonical: "https://iq-rest.com/pl/mobile-management",
    ogLocale: "pl_PL",
    ogTitle: "Mobilne zarządzanie restauracją — prowadź menu z telefonu",
    ogDescription:
      "Aktualizuj ceny między stolikami. Dodawaj zdjęcia z aparatu. Sprawdzaj zamówienia na linii. Cały panel IQ Rest działa na Twoim telefonie.",
  },

  hero: {
    title: "Prowadź restaurację z telefonu. Między stolikami.",
    subtitle:
      "Cały panel IQ Rest został zbudowany mobilnie — dodawaj dania, zmieniaj zdjęcia, edytuj ceny i czytaj zamówienia z tego samego telefonu, który masz w kieszeni fartucha. Bez laptopa, bez komputera w zapleczu, bez wymówek.",
    trustLine: "Ponad 500 restauracji w 30+ krajach",
  },

  seo: {
    description:
      "Restauratorzy nie siedzą przy biurku — są za barem, w kuchni, na sali. IQ Rest jest zbudowany pod tę rzeczywistość. Każda funkcja panelu, od dodawania nowych dań po podgląd zamówień na żywo, została zaprojektowana najpierw pod kciuki i małe ekrany. Jeśli umiesz korzystać z Instagrama, poprowadzisz całą restaurację z IQ Rest na telefonie.",
    fullDescription:
      "Większość oprogramowania dla restauracji jest desktopowa, z „wersją mobilną\" doklejoną na ostatnią chwilę — drobne przyciski, popsute układy, funkcje schowane trzy menu głębiej. IQ Rest zaprojektowaliśmy odwrotnie: każdy ekran działa idealnie na telefonie, a wersja desktopowa to ten sam interfejs, tylko większy.\n\nW praktyce: zrób zdjęcie dania dnia aparatem telefonu i wgraj je bezpośrednio do menu. Zauważyłeś literówkę w opisie podczas sprzątania stolika — popraw na miejscu, zmiana jest na żywo w kilka sekund. Szef kuchni właśnie wyszedł? Wyłącz danie z menu z telefonu, zanim kolejny gość zeskanuje QR. Nowe danie z kuchni? Stuknij, wpisz, zrób zdjęcie, ustaw cenę — goście mogą je zamówić 30 sekund później.\n\nTo samo dotyczy zamówień, rezerwacji, analityki i tłumaczeń. Lista zamówień odświeża się w czasie rzeczywistym. Potwierdzanie rezerwacji to jedno kliknięcie. Dzienny utarg, top dania i godziny szczytu mieszczą się na jednym ekranie telefonu. Już nigdy nie musisz iść do zaplecza, żeby cokolwiek zarządzać.",
    benefitsHeading: "Dlaczego mobilność zmienia wszystko",
    benefits: [
      "Pełen dostęp do panelu z każdego smartfona lub tabletu — bez instalacji aplikacji",
      "Wgrywanie zdjęć dań prosto z aparatu telefonu w dwóch kliknięciach",
      "Aktualizacja cen, opisów i godzin otwarcia z dowolnego miejsca",
      "Drag-and-drop dotykowe dla kategorii i kolejności dań",
      "Zamówienia, rezerwacje i analityka mieszczą się na jednym ekranie",
      "Toleruje brak sieci — kończysz edycję, zsynchronizuje się po podłączeniu",
    ],
  },

  pricing: {
    heading: "Jeden plan.",
    headingAccent: "Prowadzony z telefonu.",
    sub: "Mobilny panel plus menu QR, zamówienia online, AI tłumaczenia i rezerwacje — wszystko w jednej stałej cenie.",
  },

  faq: {
    sub: "Wszystko, o co restauratorzy pytają o mobilne zarządzanie. Nie ma Twojego pytania? Napisz na WhatsApp — odpowiadają prawdziwi ludzie.",
    items: [
      {
        q: "Czy muszę instalować aplikację mobilną?",
        a: "Nie. IQ Rest działa w przeglądarce telefonu — Safari, Chrome, którą i tak masz. Możesz dodać go do ekranu głównego dla dostępu jednym stuknięciem (będzie wyglądał jak aplikacja natywna), ale nie ma niczego do pobierania z App Store, żadnych uprawnień do nadawania, żadnych aktualizacji wersji do pilnowania.",
      },
      {
        q: "Czy faktycznie mogę wgrywać zdjęcia menu prosto z telefonu?",
        a: "Tak — to cała idea. Stuknij „dodaj zdjęcie\" przy daniu, otwiera się aparat telefonu, robisz zdjęcie albo wybierasz z galerii, klikasz wyślij. Obraz auto-skaluje się, optymalizuje pod web i jest na żywo w menu w kilka sekund. Bez Lightroom, bez przerzucania plików na komputer, bez SFTP.",
      },
      {
        q: "Czy działa na tabletach i przy stanowisku hostowym?",
        a: "Tak. Panel jest zoptymalizowany pod telefony, tablety i komputery — ten sam interfejs, te same skróty, ta sama szybkość. Wiele restauracji ma iPada przy hostessie do rezerwacji, telefon w kieszeni szefa do zamówień i laptopa w zapleczu do faktur — wszystko na jednym loginie.",
      },
      {
        q: "A co z aktualizacją cen w trakcie ruchu?",
        a: "Pod to zaprojektowane. Stuknij danie, edytuj cenę, zapisz — goście widzą nową cenę w kilka sekund, bez odświeżania. Bez ponownej publikacji, bez przebudowywania, bez opóźnień synchronizacji. Tak samo z oznaczeniem dania jako „wyprzedane\" (wyszarzeje się w menu od razu) albo dodaniem dania dnia między rzutami.",
      },
      {
        q: "Co jeśli telefon padnie w trakcie edycji?",
        a: "Edycje zapisują się polowo w trakcie pisania — jeśli telefon padnie albo straci zasięg, znajdziesz swoje zmiany po zalogowaniu na dowolnym urządzeniu. Praca się nie traci.",
      },
    ],
  },

  finalCta: {
    heading: "Prowadź to z kieszeni fartucha.",
    headingAccent: "Pomiń zaplecze.",
    sub: "Cały panel mieści się w telefonie. 14 dni za darmo, bez karty, bez aplikacji do instalacji.",
  },
};
