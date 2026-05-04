import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Wielojęzyczne menu restauracji — 35 języków, jedno kliknięcie",
    description:
      "Obsługuj zagranicznych gości w ich języku. Menu restauracji w 35 językach z przełączaniem jednym kliknięciem. Wsparcie RTL dla arabskiego i perskiego. 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/multilingual",
    ogLocale: "pl_PL",
    ogTitle: "Wielojęzyczna strona restauracji — 35 języków w standardzie",
    ogDescription:
      "Turyści skanują, widzą menu w swoim języku automatycznie. 35 języków, wsparcie RTL, auto-detekcja z ustawień telefonu. 14 dni za darmo.",
  },

  hero: {
    title: "Twoje menu mówi w języku każdego turysty.",
    subtitle:
      "Wielojęzyczne menu restauracji nie powinno być projektem. Z IQ Rest Twoje menu QR auto-wykrywa język telefonu gościa i wyświetla się w jednym z 35 języków — w tym arabskim i perskim z poprawnym renderowaniem od prawej do lewej.",
    trustLine: "4,9 · ponad 500 restauracji w 30+ krajach",
  },

  seo: {
    description:
      "Zbuduj menu raz, podaj je w 35 językach. IQ Rest auto-wykrywa język telefonu każdego gościa i renderuje menu w jego mowie — bez stukania w flagę, bez bariery językowej, bez niezręcznych momentów z Google Translate. Od hiszpańskiego i niemieckiego po japoński, arabski i mandaryński, goście widzą Twoją restaurację taką, jaka miała być widziana.",
    fullDescription:
      "Większość „wielojęzycznych\" menu to PDF-y popsutego Google Translate, wydrukowane raz i nigdy nieaktualizowane. Wielojęzyczna strona IQ Rest to prawdziwe i18n: każdy język ma swoją poprawnie przetłumaczoną treść, swój slug URL, swoje meta tagi do indeksowania przez Google i własny routing wewnątrz aplikacji menu.\n\nGdy turysta z francuskim iPhone'em zeskanuje Twój kod QR, menu otworzy się od razu po francusku — bez stukania, bez decyzji. Może przełączyć na inny język w przełączniku u góry, ale większość nigdy tego nie potrzebuje. To samo dotyczy tagów dietetycznych („wegańskie\" zmienia się w „vegano\" / „vegetarisch\" / „ヴィーガン\" zależnie od języka), komunikatów błędów, przycisków „dodaj do koszyka\", paragonów. Każdy string interfejsu w 35 językach, nie tylko treść menu.\n\nDla języków RTL — arabskiego i perskiego — cały układ obraca się: tekst wyrównany do prawej, menu otwierają się z prawej, ceny pojawiają się po nazwie dania. To nie hack CSS, to pełne wsparcie RTL, które sprawia, że arabscy i perscy goście czują się obsłużeni, a nie naciągnięci.",
    benefitsHeading: "Dlaczego prawdziwe wielojęzyczne menu bije PDF z tłumaczeniem",
    benefits: [
      "35 języków z prawdziwym tłumaczeniem UI — nie tylko pozycji menu",
      "Auto-wykrywanie języka telefonu gościa — bez stukania",
      "Ręczny przełącznik języka dla gości, którzy wolą inny",
      "Pełne wsparcie RTL dla arabskiego i perskiego — nie hack CSS",
      "Każdy język ma swój URL — Google indeksuje 35 wersji Twojej strony",
      "Zmień opis dania w swoim języku — tłumaczenia same się aktualizują",
    ],
  },

  pricing: {
    heading: "Jeden plan.",
    headingAccent: "Wszystkie 35 języków w cenie.",
    sub: "Wielojęzyczne menu, AI tłumaczenia, zamówienia QR i rezerwacje — wszystko w jednej stałej cenie. Bez opłat za język, bez dopłat za RTL.",
  },

  faq: {
    sub: "Wszystko, o co restauratorzy pytają o wielojęzyczne menu. Nie ma Twojego pytania? Napisz na WhatsApp — odpowiadają prawdziwi ludzie.",
    items: [
      {
        q: "Ile języków obsługuje menu?",
        a: "35 języków: angielski, hiszpański, niemiecki, francuski, włoski, portugalski, niderlandzki, polski, czeski, słowacki, węgierski, rumuński, bułgarski, chorwacki, serbski, słoweński, grecki, turecki, rosyjski, ukraiński, litewski, łotewski, estoński, fiński, szwedzki, norweski, duński, islandzki, kataloński, irlandzki, arabski, perski, japoński, koreański i chiński. Stringi UI są profesjonalnie przetłumaczone w każdym z nich.",
      },
      {
        q: "Jak goście zmieniają język?",
        a: "Na dwa sposoby: automatycznie (menu otwiera się w języku telefonu) i ręcznie (przełącznik u góry menu). 80% turystów nigdy nie dotyka ręcznego przełącznika — auto-detekcja po prostu działa, bo telefon i tak zna ich język.",
      },
      {
        q: "Czy obsługujecie języki od prawej do lewej, jak arabski i perski?",
        a: "Tak, z pełnym układem RTL. Całe menu się obraca: tekst wyrównany do prawej, kolumny odwrócone, panele nawigacyjne otwierają się z prawej, ceny pojawiają się po nazwie dania. To prawdziwe wsparcie RTL na poziomie układu, nie sztuczki z CSS direction.",
      },
      {
        q: "Czy Google zindeksuje moje menu we wszystkich 35 językach?",
        a: "Tak. Każdy język ma własny slug URL (np. /es, /fr, /de), poprawne tagi hreflang, lokalizowane meta-tytuły i opisy, oraz dane strukturalne specyficzne dla języka. Google traktuje każdy język jako osobną stronę dla danego locale, więc turyści szukający Twojej restauracji w swoim języku częściej Cię znajdą.",
      },
      {
        q: "A jeśli nie chcę wszystkich 35 języków, tylko swoje główne rynki?",
        a: "Wybierz, które języki są aktywne. Jeśli prowadzisz restaurację nadmorską w Grecji, obsługującą głównie brytyjskich, niemieckich i włoskich turystów, włącz tylko angielski, niemiecki i włoski — reszta nie pojawi się w przełączniku ani w auto-detekcji. Możesz dodawać kolejne, gdy zmieni się Twój turystyczny mix.",
      },
    ],
  },

  finalCta: {
    heading: "Język telefonu każdego turysty.",
    headingAccent: "Już obsługiwany.",
    sub: "Podawaj wielojęzyczne menu w 35 językach, w tym RTL arabski i perski. 14 dni za darmo, bez karty, bez opłat za język.",
  },
};
