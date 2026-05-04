import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analityka menu restauracji — skany QR, top dania, języki turystów",
    description:
      "Zobacz dokładnie, jak goście korzystają z menu QR. Dzienne skany, najczęściej oglądane dania, preferencje językowe, godziny szczytu. Decyzje oparte na danych.",
    canonical: "https://iq-rest.com/pl/analytics",
    ogLocale: "pl_PL",
    ogTitle: "Analityka restauracji — śledź skany menu QR, dania i języki",
    ogDescription:
      "Wiedz, na które dania goście naprawdę patrzą, kiedy są godziny szczytu i jaka narodowość turystów siedzi dziś u Ciebie. 14 dni za darmo.",
  },

  hero: {
    title: "Przestań zgadywać. Wiedz, co robią goście.",
    subtitle:
      "Zobacz analitykę menu restauracji w czasie rzeczywistym — skany QR na godzinę, dania, na których goście się zatrzymują, języki turystów, najwolniejszy dzień tygodnia — i użyj tych danych, żeby drukować mniej menu, lepiej grafikować, pchać właściwe specjalne pozycje.",
    trustLine: "4,9 · ponad 500 restauracji w 30+ krajach",
  },

  seo: {
    description:
      "Analityka restauracji bez potrzeby zespołu data. IQ Rest śledzi każdy skan, podgląd, zmianę języka i zamówienie z menu QR i pokazuje wzorce, które się liczą: top oglądane dania, godziny szczytu skanów, najbardziej obłożone dni tygodnia, podział językowy turystów. Decyzje oparte na danych — bez otwierania arkusza kalkulacyjnego.",
    fullDescription:
      "Większość restauracji jedzie na intuicji — „czujemy, że wtorki są wolne\", „myślę, że makaron sprzedaje się dobrze\". Intuicja to dobrze, ale dane są lepsze. IQ Rest śledzi każdą interakcję z menu QR, więc nie musisz zgadywać: ile razy QR był dziś zeskanowany, na które dania goście patrzyli najdłużej, które dania dodali do koszyka, ale nie zamówili, jakim językiem posługiwali się turyści.\n\nPanel analityki podaje odpowiedzi w trzech widokach: dziś (skany na żywo, bieżące zamówienia, co właśnie zamawiają), w tym tygodniu (top 10 dań, godziny szczytu, podział językowy, no-show z rezerwacji) i trendy (wzrost miesiąc do miesiąca, sezonowość, wzorce dni tygodnia). Możesz wejść w dowolne danie i zobaczyć, ile razy zostało obejrzane vs zamówione (danie obejrzane 200 razy, ale zamówione 5 razy ma problem z opisem albo zdjęciem) albo w dowolny język, żeby zobaczyć, jaki mix turystów faktycznie obsługujesz.\n\nCelem są decyzje, nie panele: „następny wtorek jest historycznie wolny → odpal happy hour\", „włoscy turyści zamawiają makaron 3x częściej niż lokalni → ustaw makaron pierwszy, gdy język=it\", „to danie ma 90% view-rate, ale 5% order-rate → popraw zdjęcie\". Realne zmiany, realny przychód, MBA niepotrzebne.",
    benefitsHeading: "Dlaczego restauracje kochają analitykę IQ Rest bardziej niż Google Analytics",
    benefits: [
      "Licznik skanów QR na żywo — patrz, jak wieczór się zapełnia w czasie rzeczywistym",
      "Top oglądane i top zamawiane dania — widzisz, co działa, a co nie",
      "Podział językowy — wiesz, jacy turyści siedzą u Ciebie",
      "Godziny szczytu i wzorce dni tygodnia — lepszy grafik, lepszy mise en place",
      "Konwersja widok → zamówienie per danie — naprawiaj słabe zdjęcia i opisy",
      "Analityka rezerwacji — źródła, no-show, mix wielkości stolika",
    ],
  },

  pricing: {
    heading: "Jeden plan.",
    headingAccent: "Pełna analityka w cenie.",
    sub: "Analityka restauracji, zamówienia QR, AI tłumaczenia i rezerwacje — wszystko w jednej stałej cenie. Bez tieru premium za dane, nigdy.",
  },

  faq: {
    sub: "Wszystko, o co restauratorzy pytają o analitykę menu. Nie ma Twojego pytania? Napisz na WhatsApp — odpowiadają prawdziwi ludzie.",
    items: [
      {
        q: "Co dokładnie widzę w panelu analityki?",
        a: "Skany QR na żywo (dziś, w tym tygodniu, w tym miesiącu), top oglądane dania, top zamawiane dania, konwersję widok → zamówienie per danie, podział językowy gości, godziny szczytu wg dnia tygodnia, średnią wartość zamówienia, najbardziej obłożone stoliki, wskaźnik no-show z rezerwacji oraz trendy w czasie. Wszystko na jednym panelu, bez konfiguracji.",
      },
      {
        q: "Jak to wykorzystać do realnego wzrostu przychodu?",
        a: "Trzy wzorce działają dla większości restauracji: (1) przestaw menu, żeby najlepiej konwertujące dania były pierwsze; (2) popraw zdjęcie lub opis na daniach z dużą oglądalnością i niską sprzedażą; (3) odpal happy hour albo specjalne pozycje w historycznie wolnych dniach/godzinach. Widzieliśmy restauracje, które zwiększały przychód w słabe dni o 15–30% tylko dzięki tym trzem zmianom.",
      },
      {
        q: "Czy to jest anonimowe, czy śledzicie konkretnych użytkowników?",
        a: "Anonimowe i zagregowane. Śledzimy podglądy menu i zamówienia per sesja, nie per identyfikowalny użytkownik. Żadnych e-maili, numerów telefonu ani adresów IP zapisywanych długoterminowo. Panel pokazuje wzorce („200 skanów w piątek\"), nie ludzi. W pełni zgodne z GDPR.",
      },
      {
        q: "Czy mogę eksportować dane?",
        a: "Tak. Eksportuj dowolny widok jako CSV (top dania, dzienne skany, podział godzinowy itd.) i otwórz w Excel albo Google Sheets. Przydatne do dzielenia się z inwestorami, księgowymi albo łączenia z danymi z POS.",
      },
      {
        q: "Czy potrzebuję jakiejś konfiguracji technicznej, żeby uruchomić analitykę?",
        a: "Zero. Analityka działa domyślnie od momentu, gdy menu QR jest na żywo — każdy skan, podgląd i zamówienie jest śledzone automatycznie. Panel jest częścią standardowej subskrypcji, nie upsellem, a użyteczne dane zobaczysz pierwszego dnia, gdy goście zaczną skanować.",
      },
    ],
  },

  finalCta: {
    heading: "Przestań zgadywać.",
    headingAccent: "Zacznij mierzyć.",
    sub: "Analityka skanów QR na żywo, top dania, godziny szczytu, podział językowy turystów. 14 dni za darmo, bez karty.",
  },
};
