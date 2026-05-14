import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Brandowane menu restauracji — własna kolorystyka i motyw",
    description:
      "Dopasuj menu do marki restauracji własnymi kolorami akcentów. Tryb jasny i ciemny przełącza się automatycznie z telefonem gościa. Brandowane menu QR w sekundy. 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/color-scheme",
    ogLocale: "pl_PL",
    ogTitle: "Własna kolorystyka — brandowane menu restauracji w sekundy",
    ogDescription:
      "Wybierz kolor akcentu, dostań brandowane menu restauracji. Auto-tryb jasny/ciemny dopasowuje się do telefonu gościa. Bez narzędzi projektowych.",
  },

  hero: {
    title: "Twoje menu. Twoje kolory. Twoja marka.",
    subtitle:
      "Wybierz kolor akcentu, wgraj logo, a Twoje menu QR od razu wygląda jak prawdziwa marka, a nie szablon. Tryb jasny i ciemny auto-przełącza się z telefonem każdego gościa — Twoje menu zawsze wygląda zaplanowanie.",
    trustLine: "Ponad 500 restauracji w 30+ krajach",
  },

  seo: {
    description:
      "Własna kolorystyka to różnica między genericznym menu QR a brandowanym doświadczeniem restauracyjnym. IQ Rest pozwala wybrać dokładny kolor akcentu (albo wkleić kod hex z brand booka), wgrać logo, a całe menu — przyciski, linki, podkreślenia, etykiety kategorii — przyjmuje Twój kolor marki w kilka sekund.",
    fullDescription:
      "Większość kreatorów menu QR daje stałą paletę: niebieska albo czerwona, bierz albo zostaw. IQ Rest traktuje Twoją markę poważnie — wybierz dowolny kolor akcentu z color pickera albo wklej dokładny hex z brand booka (ten sam pomarańczowy, co Twój szyld, ten sam zielony, co logo). Każdy akcent w menu — przyciski podstawowe, linki, podkreślenia kategorii, aktywny stan w przełączniku języka — od razu przyjmuje ten kolor.\n\nTryb jasny i ciemny obsługiwany automatycznie. Gdy telefon gościa jest w trybie ciemnym (większość telefonów na kolacji), menu pokazuje się ciemne z mocniejszym akcentem. Gdy są na zewnątrz w jasnym słońcu w trybie jasnym, menu się dostosowuje. Nie wybierasz jasnego ani ciemnego — wybierasz kolor marki, a menu zachowuje się odpowiednio na każdym urządzeniu.\n\nTwoje logo siedzi u góry menu, na szablonie wydruku naklejki QR, na paragonie zamówienia i w mailu potwierdzającym rezerwację. Każdy punkt styku z gościem wygląda jak ta sama marka, bo nią jest. Bez projektanta, bez sesji w Photoshopie, bez drogiego „pakietu brandingowego restauracji\" — tylko color picker i wgrane logo.",
    benefitsHeading: "Dlaczego brandowana kolorystyka konwertuje lepiej niż domyślny motyw",
    benefits: [
      "Wybierz dowolny kolor akcentu — color picker albo wklej hex",
      "Auto-tryb jasny/ciemny dopasowany do telefonu każdego gościa",
      "Logo na menu, naklejce QR, paragonach i mailach",
      "Brandowany wygląd od pierwszej minuty — bez Photoshopa i projektanta",
      "Zmieniaj kolory pod sezon (Walentynki czerwone, święta zielone)",
      "Kolor zawsze czytelny — kontrasty auto-dopasowane do czytelności",
    ],
  },

  pricing: {
    heading: "Jeden plan.",
    headingAccent: "Twoje kolory marki.",
    sub: "Własna kolorystyka plus menu QR, zamówienia online, AI tłumaczenia i rezerwacje — wszystko w jednej stałej cenie. Branding bez projektanta.",
  },

  faq: {
    sub: "Wszystko, o co restauratorzy pytają o branding menu. Nie ma Twojego pytania? Napisz na WhatsApp — odpowiadają prawdziwi ludzie.",
    items: [
      {
        q: "Czy mogę dopasować dokładny kolor marki z logo albo szyldu?",
        a: "Tak — wklej dokładny kod hex (np. #C24A2D), a menu używa tego dokładnego koloru na każdym akcencie. Auto-generujemy ciemniejszy odcień dla stanów hover i jaśniejszy do teł, więc jeden kolor marki dostaje pełną paletę UI bez dodatkowej pracy.",
      },
      {
        q: "Czy menu obsługuje tryb jasny i ciemny?",
        a: "Tak, automatycznie. Menu wykrywa motyw telefonu każdego gościa i przełącza się między jasnym a ciemnym w czasie rzeczywistym. Twój kolor akcentu zostaje ten sam, a otaczający UI się odwraca. Większość restauracji nigdy nie ustawia jasny vs ciemny — wybierają kolor i pozwalają menu się dostosować.",
      },
      {
        q: "Czy mogę zmienić kolorystykę później?",
        a: "Kiedy chcesz. Otwórz ustawienia designu, wybierz nowy kolor, zapisz. Każda strona w menu QR, formularz rezerwacji i UI zamówień aktualizuje się w kilka sekund. Przydatne na sezonowe akcje (czerwony na Walentynki, zielony na święta, złoty na Nowy Rok) — zmień na tydzień, wróć.",
      },
      {
        q: "Gdzie pojawia się moje logo?",
        a: "U góry menu QR (obok nazwy restauracji), na szablonie wydruku naklejki QR (żeby naklejka na stoliku pasowała do marki), na paragonach potwierdzenia zamówienia i w mailach potwierdzających rezerwację. Wgraj raz w PNG albo SVG, używamy wszędzie automatycznie.",
      },
      {
        q: "A jeśli mój kolor marki jest słabo czytelny na tle menu?",
        a: "System auto-sprawdza kontrast i delikatnie przyciemnia lub rozjaśnia kolor do zastosowań tekstowych (żeby blada żółć marki nie była nieczytelnym tekstem), zachowując dokładny kolor dla akcentów takich jak przyciski i podkreślenia. Nie musisz myśleć o WCAG — menu robi to za Ciebie.",
      },
    ],
  },

  finalCta: {
    heading: "Wybierz kolor.",
    headingAccent: "Wyglądaj jak prawdziwa marka.",
    sub: "Własna kolorystyka, brandowane paragony, auto-tryb jasny/ciemny. 14 dni za darmo, bez projektanta, bez karty.",
  },
};
