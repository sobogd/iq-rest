import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Lista zmian — Aktualizacje i nowe funkcje IQ Rest",
    description:
      "Każde wydanie IQ Rest w jednym miejscu. Nowe funkcje, ulepszenia AI i premiery produktowe dla menu QR, zamówień online i rezerwacji.",
  },
  pageTitle: "Lista zmian",
  pageSubtitle:
    "Każda aktualizacja, którą wydajemy, by uczynić Twoje menu QR, zamówienia online i rezerwacje płynniejszymi. Najnowsze najpierw.",
  readMore: "Czytaj więcej",
  backToList: "Wróć do listy zmian",
  publishedOn: "Opublikowano",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "Zdjęcia dań AI dla menu QR | IQ Rest",
        description:
          "Generuj jednym kliknięciem spójne stylowo zdjęcia dań dla całego menu QR. Bez zdjęć stockowych, bez fotografa, bez retuszu.",
      },
      title: "Zdjęcia dań generowane przez AI dla całego menu QR",
      subtitle:
        "Przestań szukać w galeriach stockowych i planować sesje fotograficzne. IQ Rest generuje teraz pełny zestaw apetycznych zdjęć dań w jednym spójnym stylu — prosto z nazw Twojego menu.",
      intro:
        "Fotografowanie każdego dania w menu jest drogie, wolne i rzadko spójne. Biblioteki stockowe zostawiają luki, a styl nigdy w pełni nie pasuje do Twojej marki. IQ Rest zamyka tę lukę dzięki wbudowanej fotografii dań AI.",
      sections: [
        {
          title: "Jeden styl fotografii w całym menu",
          body: "Gdy goście przewijają menu, niespójne style psują doświadczenie. IQ Rest generuje każde zdjęcie w jednym spójnym stylu marki: ten sam kierunek światła, ten sam język talerza, ten sam nastrój tła.",
        },
        {
          title: "Z nazwy dania na talerz w sekundach",
          body: "Nic do briefowania. Dodajesz danie, IQ Rest tworzy zdjęcie w tle, przesłane jako zoptymalizowany WebP. Jeśli zdjęcie nie pasuje, regenerujesz jednym tapnięciem.",
        },
        {
          title: "Zoptymalizowane pod mobile i SEO",
          body: "Każdy obraz jest kodowany jako skompresowany WebP w jakości 80%, serwowany z CDN Hetzner w Norymberdze. Strony pozostają szybkie na 4G. Zdjęcia są też indeksowalne przez Google Grafika.",
        },
      ],
      benefitsTitle: "Dlaczego zdjęcia dań AI mają znaczenie",
      benefits: [
        "Bez subskrypcji banków zdjęć i honorariów fotografa",
        "Spójny styl marki na wszystkich daniach",
        "Nowe dania automatycznie dostają pasujące zdjęcie",
        "Skompresowany WebP — szybko na mobile",
        "Darmowe generacje w każdym planie",
        "Regeneruj dowolne zdjęcie jednym tapnięciem",
      ],
      conclusionTitle: "Zdjęcie do każdego dania, bez produkcji",
      conclusionBody:
        "Restauracje ze zdjęciami sprzedają więcej dań o wysokiej marży. Powodem, dla którego większość menu nie ma zdjęć, są koszty produkcji. IQ Rest eliminuje ten koszt całkowicie.",
      ctaText: "Wygeneruj zdjęcia AI dla każdego dania w menu — za darmo podczas okresu próbnego.",
      ctaButton: "Wypróbuj za darmo",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "Generator tła okładki restauracji AI | IQ Rest",
        description:
          "Generuj automatycznie piękny obraz okładki dla swojego menu QR w sekundach.",
      },
      title: "Tło okładki restauracji generowane przez AI",
      subtitle:
        "Twoje menu QR przekazuje właściwy nastrój zanim goście przewiną. IQ Rest generuje teraz spersonalizowany obraz okładki — automatycznie.",
      intro:
        "Pierwsze wrażenie się liczy, zwłaszcza gdy gość skanuje QR przy stoliku. Generyczny obraz okładki podkopuje wszystko, co zainwestowałeś w wystrój. IQ Rest generuje teraz unikalny, klimatyczny obraz okładki dla każdej restauracji.",
      sections: [
        {
          title: "Dopasowane do Twojej kuchni i nastroju",
          body: "Gdy ukończysz kreatora rejestracji, IQ Rest bierze wybraną kuchnię i generuje pasującą okładkę. Włoska dostaje ciepłe światło trattorii. Japońska dostaje czyste linie. Meksykańska dostaje żywe kolory.",
        },
        {
          title: "Zoptymalizowane dla sekcji hero menu QR",
          body: "Obrazy okładek są generowane w dokładnym stosunku używanym przez hero menu QR. Kodowane jako WebP, lazy-loaded.",
        },
        {
          title: "Spójność marki od razu",
          body: "Styl obrazu okładki jest automatycznie sparowany ze zdjęciami dań generowanymi przez AI dla Twojego menu — ten sam język światła, ta sama paleta kolorów.",
        },
      ],
      benefitsTitle: "Dlaczego okładka AI bije stock",
      benefits: [
        "Unikalna dla Twojej restauracji",
        "Dopasowana do kuchni wybranej przy rejestracji",
        "Ten sam język wizualny co zdjęcia dań AI",
        "Poprawnie wymiarowana dla hero menu QR",
        "Skompresowany WebP",
        "Regeneruj kiedy chcesz jednym tapnięciem",
      ],
      conclusionTitle: "Okładka, która mówi 'wiemy, co robimy'",
      conclusionBody:
        "Gdy gość skanuje Twój QR, pierwszą rzeczą, którą widzi, jest okładka. Wypolerowany, klimatyczny obraz sygnalizuje jakość zanim przeczyta pierwszą nazwę dania.",
      ctaText: "Zdobądź spersonalizowaną okładkę AI dla menu QR w mniej niż minutę.",
      ctaButton: "Rozpocznij darmowy okres próbny",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Kreator rejestracji 3-krokowy dla menu QR | IQ Rest",
        description:
          "Wybierz kuchnię, nazwę restauracji, email — a IQ Rest zbuduje Twoje menu QR. Najszybsza rejestracja w branży.",
      },
      title: "Kreator 3-krokowy: od emaila do działającego menu QR w mniej niż minutę",
      subtitle:
        "Wybierz kuchnię. Wpisz nazwę restauracji. Potwierdź email. Gotowe — Twoje menu QR jest gotowe, z przykładowymi daniami i zdjęciami AI.",
      intro:
        "Właściciele restauracji nie mają czasu na formularz rejestracyjny z 10 ekranami. Skrócono go do trzech. Zanim się pierwszy raz zalogujesz, Twoje menu QR jest już wypełnione przykładowymi daniami pasującymi do kuchni i fotografią AI.",
      sections: [
        {
          title: "Krok 1 — Wybór kuchni",
          body: "Wybierz z szerokiej listy kuchni: włoska, hiszpańska, japońska, meksykańska, francuska, śródziemnomorska, indyjska, amerykańska, kawiarnia, bar, pizzeria.",
        },
        {
          title: "Krok 2 — Nazwa restauracji",
          body: "Wpisz nazwę tak, jak zobaczą ją goście. Używamy jej wszędzie: hero menu QR, tytuł strony, slug SEO, podgląd udostępnień społecznościowych.",
        },
        {
          title: "Krok 3 — Email lub logowanie Google",
          body: "Potwierdź emailem + jednorazowym kodem, lub tapnij 'Zaloguj się przez Google' dla natychmiastowego utworzenia konta. Bez hasła.",
        },
      ],
      benefitsTitle: "Dlaczego rejestracja 3-krokowa bije formularz",
      benefits: [
        "Poniżej 60 sekund od strony lądowania do działającego menu QR",
        "Zero decyzji, których nie można później zmienić",
        "Przykładowe dania wstępnie wypełnione według kuchni",
        "Zdjęcia AI i okładka gotowe gdy się logujesz",
        "Opcja Google sign-in",
        "Anonimowy postęp zapisany jeśli porzucisz w połowie",
      ],
      conclusionTitle: "Najszybsza rejestracja menu QR, kropka",
      conclusionBody:
        "Większość usług menu QR każe wypełnić dziesiątki pól zanim zobaczysz coś użytecznego. IQ Rest odwraca to.",
      ctaText: "Uruchom kreator 3-krokowy teraz — Twoje menu będzie online w 60 sekund.",
      ctaButton: "Rozpocznij darmowy okres próbny",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "Przykładowe menu generowane AI przy rejestracji | IQ Rest",
        description:
          "Pomiń pusty stan. IQ Rest automatycznie generuje startowe menu QR na podstawie Twojej kuchni — kategorie, dania, ceny i zdjęcia.",
      },
      title: "Przykładowe menu zbudowane przez AI tuż po rejestracji",
      subtitle:
        "Koniec z patrzeniem na pusty panel. IQ Rest zasiewa Twoje konto kategoriami, daniami i zdjęciami AI pasującymi do kuchni.",
      intro:
        "Najtrudniejszą częścią każdego nowego narzędzia jest pusty stan. IQ Rest rozwiązuje to wypełniając menu w momencie rejestracji.",
      sections: [
        {
          title: "Kategorie i dania świadome kuchni",
          body: "Seeder używa kuchni wybranej w kreatorze, by wyciągnąć wybrany zestaw kategorii sensownych dla Twojego typu restauracji. Pizzeria dostaje 'Pizza Classica', 'Antipasti', 'Bevande'.",
        },
        {
          title: "Zdjęcia i ceny od razu",
          body: "Każde startowe danie ma zdjęcie generowane przez AI w spójnym stylu i rozsądną cenę domyślną w lokalnej walucie. Ceny są placeholderami, ale sprawiają, że menu wygląda od razu prawdziwie.",
        },
        {
          title: "Edytuj, nie zaczynaj od zera",
          body: "Każde danie nosi flagę isExample. Gdy edytujesz danie, flaga znika. Pozostałe przykładowe dania wyróżniają się wizualnie.",
        },
      ],
      benefitsTitle: "Dlaczego wstępnie zbudowane menu wygrywa",
      benefits: [
        "Zero pustego stanu",
        "Kategorie i dania pasujące do wybranej kuchni",
        "Zdjęcia AI dla każdego startowego dania",
        "Lokalna waluta automatycznie wykryta",
        "Flaga przykładu blednie gdy edytujesz",
        "Pokaż interesariuszom realnie wyglądające menu w minutach",
      ],
      conclusionTitle: "Pomiń pustą stronę",
      conclusionBody:
        "Budowanie menu od zera onieśmiela. Edytowanie jest łatwe. IQ Rest daje Ci kompletne startowe menu w momencie rejestracji.",
      ctaText: "Zarejestruj się i zdobądź w pełni zbudowane startowe menu w swojej kuchni.",
      ctaButton: "Zbuduj moje menu",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Interaktywny tour po menu dla nowych użytkowników | IQ Rest",
        description:
          "Interaktywny przewodnik 7-krokowy prowadzi nowych właścicieli restauracji przez panel menu QR.",
      },
      title: "Interaktywny tour po menu w 7 krokach przy pierwszej wizycie",
      subtitle:
        "Nie zmuszamy Cię do czytania dokumentacji. Pierwszy raz, gdy otwierasz menu, IQ Rest prowadzi Cię — dodaj kategorię, dodaj danie, edytuj, sortuj, podgląd, udostępnij, w siedmiu tapnięciach.",
      intro:
        "Większość produktów SaaS chowa onboarding w centrum pomocy, którego nikt nie czyta. IQ Rest robi przeciwnie: pierwszy raz, gdy nowy użytkownik trafia na stronę menu, interaktywny tour podświetla każdą kluczową akcję.",
      sections: [
        {
          title: "W produkcie, nie w bazie wiedzy",
          body: "Każdy krok podświetla rzeczywisty element UI na Twoim ekranie. Nie ma zrzutów ekranu — zrzut ekranu to TWÓJ panel.",
        },
        {
          title: "Zaprojektowany wokół rzeczywistego workflow",
          body: "Siedem kroków odpowiada workflow, który nowa restauracja faktycznie wykonuje. Najpierw kategorie, potem dania, potem dopracowanie, potem porządkowanie, potem podgląd, potem udostępnienie przez QR.",
        },
        {
          title: "Zlokalizowany w 35 językach",
          body: "Tekst tour jest przetłumaczony na każdy język wspierany przez IQ Rest.",
        },
      ],
      benefitsTitle: "Dlaczego tour w produkcie bije centrum pomocy",
      benefits: [
        "Ucz się robiąc, nie czytając dokumentacji",
        "7 kroków pokrywa ~95% workflow",
        "Można odrzucić w każdej chwili",
        "Trwa między sesjami aż do ukończenia",
        "Zlokalizowany w 35 językach",
        "Bez wideo do załadowania",
      ],
      conclusionTitle: "Z zagubionego do pewnego siebie w siedmiu krokach",
      conclusionBody:
        "Najtrudniejszym momentem w każdym produkcie jest pierwsze 30 sekund. Interaktywny tour IQ Rest usuwa to ryzyko.",
      ctaText: "Zarejestruj się i daj się przeprowadzić przez pierwsze menu QR w siedmiu tapnięciach.",
      ctaButton: "Rozpocznij darmowy okres próbny",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Strony lądowania per kraj dla menu QR | IQ Rest",
        description:
          "Odwiedzający z Polski widzą stronę lądowania dostosowaną do polskich restauracji. 35 krajów, 35 stron zoptymalizowanych pod konwersję.",
      },
      title: "Spersonalizowana strona lądowania w każdym języku",
      subtitle:
        "Odwiedzający nie dostają już automatycznie tłumaczonej strony. Każdy z 35 wspieranych języków ma własną stronę lądowania.",
      intro:
        "Strony tłumaczone maszynowo konwertują słabo. IQ Rest wysyła teraz unikalną stronę lądowania dla każdego z 35 wspieranych języków — napisaną dla rynku.",
      sections: [
        {
          title: "Jedna strona na język, bez automatycznego tłumaczenia",
          body: "Każda strona lądowania żyje pod /<locale> jako niezależna trasa Next.js. Teksty są w obiektach TypeScript — wersjonowane, type-checked.",
        },
        {
          title: "Geolokalizacja kieruje odwiedzających automatycznie",
          body: "Pierwszy raz, gdy odwiedzający trafia na iq-rest.com, nasz moduł geo nginx czyta kod kraju i przekierowuje na właściwy /<locale>.",
        },
        {
          title: "Tagi hreflang i kanoniczne na poziomie marki",
          body: "Wszystkie 35 stron lądowania odwołuje się do siebie poprzez tagi hreflang, by Google indeksował właściwą dla każdego zapytania.",
        },
      ],
      benefitsTitle: "Dlaczego strony per kraj konwertują lepiej",
      benefits: [
        "Natywne sformułowania na każdym rynku",
        "Geo-routing serwuje właściwą stronę automatycznie",
        "hreflang i kanoniczne zgodne z wytycznymi Google",
        "Odwiedzający kataloński w Katalonii widzą kataloński",
        "Waluta, ceny i CTA zlokalizowane per rynek",
        "Niezależne testy A/B per język",
      ],
      conclusionTitle: "35 języków, 35 drzwi wejściowych",
      conclusionBody:
        "Jeśli polski właściciel restauracji trafi na półprzetłumaczoną angielską stronę z amerykańskimi cenami, ucieknie. Jeśli trafi na stronę, która mówi do niego po polsku, konwertuje.",
      ctaText: "Wypróbuj IQ Rest w swoim języku — strona lądowania szyta na miarę Twojego rynku.",
      ctaButton: "Otwórz mój język",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Zaloguj się przez Google do panelu menu QR | IQ Rest",
        description:
          "Pomiń hasła i kody emailowe. Tapnij 'Zaloguj się przez Google' by uzyskać dostęp do panelu menu QR w mniej niż sekundę.",
      },
      title: "Zaloguj się przez Google — dostęp jednym tapnięciem do menu QR",
      subtitle:
        "Pomiń emaile OTP i zapomniane hasła. Tapnij 'Kontynuuj z Google' i jesteś w panelu w mniej niż sekundę.",
      intro:
        "Uwierzytelnianie email + jednorazowy kod jest bezpieczne, ale wolne. IQ Rest oferuje teraz Zaloguj się przez Google jako alternatywę.",
      sections: [
        {
          title: "Natywny Google OAuth, bez pętli przekierowań",
          body: "Używamy oficjalnego SDK Google Identity Services z UI One Tap. Weryfikujemy ID token Google po stronie serwera.",
        },
        {
          title: "To samo konto, dowolna metoda",
          body: "Jeśli zarejestrowałeś się przez email-OTP i potem wybierzesz Google, łączymy konta przez email.",
        },
        {
          title: "Mobile-first — działa na iOS Safari i Android Chrome",
          body: "Nakładamy prawdziwy przycisk Google nad nasze UI zamiast wyzwalać kliknięcia programowe.",
        },
      ],
      benefitsTitle: "Dlaczego Google sign-in bije email OTP",
      benefits: [
        "Jedno tapnięcie by się zalogować",
        "Bez hasła do zapamiętywania",
        "To samo konto czy używasz emaila czy Google",
        "Zweryfikowane kryptograficznie po stronie serwera",
        "Działa niezawodnie na iOS Safari i Android Chrome",
        "Język przekazany dla emaili",
      ],
      conclusionTitle: "Najszybsza droga z powrotem do panelu",
      conclusionBody:
        "Właściciele restauracji sprawdzają menu dziesiątki razy w tygodniu. Google sign-in zamienia 30-sekundowy flow OTP w tapnięcie sekundowe.",
      ctaText: "Pomiń hasło — zaloguj się przez Google jednym tapnięciem.",
      ctaButton: "Otwórz panel",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Wielojęzyczne powiadomienia email w 35 językach | IQ Rest",
        description:
          "Przypomnienia o okresie próbnym, odpowiedzi wsparcia, emaile subskrypcyjne — każde powiadomienie IQ Rest przychodzi w języku Twojego panelu.",
      },
      title: "Wielojęzyczne powiadomienia email we wszystkich 35 językach",
      subtitle:
        "Każdy email wysyłany przez IQ Rest przychodzi w języku ustawionym w panelu. Wraz z układami od prawej do lewej.",
      intro:
        "Email w niewłaściwym języku to tarcie w najlepszym przypadku, usunięcie w najgorszym. IQ Rest wysyła teraz każdy email transakcyjny w języku ustawionym w panelu.",
      sections: [
        {
          title: "preferredLocale podróżuje z Twoim kontem",
          body: "Każdy użytkownik ma pole preferredLocale ustawione przy pierwszym logowaniu. Każda backendowa praca emitująca email wybiera odpowiedni szablon.",
        },
        {
          title: "Szablony RTL dla arabskiego i perskiego",
          body: "Układy od prawej do lewej to nie tylko tłumaczenie — cała hierarchia wizualna się odwraca. Wysyłamy dedykowane szablony RTL.",
        },
        {
          title: "Tłumaczone przez ekspertów z branży",
          body: "Tłumaczyliśmy każdy szablon z terminologią kuchenną i hotelarską brzmiącą naturalnie dla operatorów restauracji.",
        },
      ],
      benefitsTitle: "Dlaczego wielojęzyczne emaile mają znaczenie",
      benefits: [
        "Wszystkie emaile transakcyjne w języku Twojego panelu",
        "preferredLocale trwa między logowaniami",
        "Układy RTL dla arabskiego i perskiego",
        "Terminologia odpowiednia dla hotelarstwa per język",
        "Zmiana języka aktualizuje przyszłe emaile natychmiast",
        "35 języków włącznie z katalońskim, słoweńskim, estońskim, łotewskim",
      ],
      conclusionTitle: "Emaile, które mówią Twoim językiem",
      conclusionBody:
        "Komunikacja w niewłaściwym języku to komunikacja, która nie działa. IQ Rest wysyła każdy email w języku, którego rzeczywiście używasz.",
      ctaText: "Zarejestruj się i zdobądź panel oraz każdy email w swoim języku.",
      ctaButton: "Rozpocznij darmowy okres próbny",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "Natywne iOS odczucie panelu restauracji mobile | IQ Rest",
        description:
          "Nawigacja zakładkami u dołu, obsługa safe-area, inputy bez zoomu — mobilny panel IQ Rest sprawia wrażenie natywnej aplikacji na iPhone.",
      },
      title: "Natywne iOS odczucie na Twoim telefonie",
      subtitle:
        "Nawigacja zakładkami u dołu, pełna świadomość safe-area, inputy formularzy bez zoomu i natychmiastowe przejścia między stronami.",
      intro:
        "Większość paneli SaaS dla restauracji to dodatki desktop-first na mobilnym. IQ Rest jest przeciwnie — zaprojektowany dla właścicieli zarządzających menu z telefonu między obsługą.",
      sections: [
        {
          title: "Zakładki u dołu, bez hamburgera",
          body: "Menu hamburgera na mobilnym są wolne. Zastąpiliśmy desktopowy sidebar dolnym paskiem zakładek na telefonach: Menu, Zamówienia, Rezerwacje, Ustawienia.",
        },
        {
          title: "Safe-area insets i wskaźnik home",
          body: "Używamy env(safe-area-inset-*) wszędzie — dolny pasek siedzi nad wskaźnikiem home, padding treści uwzględnia dynamic island.",
        },
        {
          title: "Inputy bez zoomu i natychmiastowe wysyłanie formularzy",
          body: "Podnieśliśmy każdy input do 16px i skonfigurowaliśmy viewport z maximum-scale=1.",
        },
      ],
      benefitsTitle: "Dlaczego natywne odczucie ma znaczenie na mobilnym",
      benefits: [
        "Zakładki u dołu — dostęp jednym tapnięciem do każdej sekcji",
        "Świadome safe-area",
        "Inputy 16px — bez zoom-and-jump iOS",
        "Aktywna zakładka używa koloru akcentu Twojej marki",
        "Przejścia SPA — bez pełnych przeładowań",
        "Bez aplikacji do zainstalowania",
      ],
      conclusionTitle: "Panel webowy, który sprawia wrażenie aplikacji",
      conclusionBody:
        "Linia między webem a natywnym to głównie kwestia uwagi do detali. Mobilny panel IQ Rest płaci tę uwagę.",
      ctaText: "Otwórz IQ Rest na telefonie i poczuj różnicę.",
      ctaButton: "Wypróbuj 14 dni za darmo",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "Banner zgody na pliki cookie RODO dla strony restauracji | IQ Rest",
        description:
          "Banner zgody zgodny z prawem, zgodny z AEPD, bez skryptów stron trzecich.",
      },
      title: "Banner zgody na pliki cookie zgodny z RODO",
      subtitle:
        "Banner zgody zbudowany na zamówienie bez CMP stron trzecich, bez tagu skryptu Cookiebot lub OneTrust. Zgodny z AEPD i ePrivacy.",
      intro:
        "Każda komercyjna strona w UE potrzebuje bannera zgody na pliki cookie. Większość używa CMP stron trzecich, które ciągną ciężkie skrypty. IQ Rest zbudował własny, lekki, część bundla strony.",
      sections: [
        {
          title: "Zgodny z AEPD i ePrivacy",
          body: "Hiszpańska AEPD i szersza dyrektywa ePrivacy wymagają przycisków Akceptuj i Odrzuć o tej samej wyrazistości. Odrzucamy dark pattern 'ogromny akceptuj, mały odrzuć'.",
        },
        {
          title: "Bez skryptów stron trzecich",
          body: "Bez Cookiebot, bez OneTrust. Banner jest częścią bundla strony lądowania.",
        },
        {
          title: "Prywatność, cookies i warunki w modalach",
          body: "Kliknięcie linku prawnego w bannerze otwiera modal — bez nawigacji, bez utraty pozycji przewijania.",
        },
      ],
      benefitsTitle: "Dlaczego nasz banner bije CMP stron trzecich",
      benefits: [
        "Zgodny z AEPD i ePrivacy",
        "Bez skryptów stron trzecich",
        "Prywatność/Cookies/Warunki w modalach",
        "Cookieless analytics działa nawet przed zgodą",
        "Cookie pierwszej strony usunięte przy Odrzuć",
        "Lekki — część bundla strony lądowania",
      ],
      conclusionTitle: "Zgodność bez hamulca konwersji",
      conclusionBody:
        "Zgoda na cookies jest nienegocjowalna w UE, ale nie musi spowalniać Twojej strony. Banner IQ Rest jest szybki, sprawiedliwy i w pełni zgodny.",
      ctaText: "Zobacz przepływ zgody w akcji.",
      ctaButton: "Odwiedź stronę lądowania",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Prywatność i warunki w modalach — bez skoków stron | IQ Rest",
        description:
          "Polityka Prywatności, Warunki Świadczenia Usług i Polityka Cookies otwierają się teraz w modalach na stronie lądowania.",
      },
      title: "Prywatność, warunki i polityka cookies w modalach",
      subtitle:
        "Kliknij dowolny link prawny i polityka otworzy się w czystym modalu. Bez nawigacji, bez utraty pozycji przewijania.",
      intro:
        "Samodzielne strony /privacy, /terms i /cookies były standardowym wzorcem — i standardowym błędem. IQ Rest otwiera teraz wszystkie trzy dokumenty prawne jako modale.",
      sections: [
        {
          title: "Jeden komponent Modal, trzy dokumenty",
          body: "Tekst prawny żyje w współdzielonych stałych TypeScript, więc aktualizacja klauzuli raz propaguje się wszędzie.",
        },
        {
          title: "Stos modali",
          body: "Jeśli czytasz Politykę Cookies i chcesz przełączyć się na Politykę Prywatności, link wewnątrz modala otwiera następny modal na górze.",
        },
        {
          title: "Wszystkie 35 języków — ten sam tekst źródłowy",
          body: "Tekst prawny jest po angielsku (język naszej osobowości prawnej, autónomo zarejestrowany w Hiszpanii), ale chrome modala jest w pełni zlokalizowane.",
        },
      ],
      benefitsTitle: "Dlaczego modale biją samodzielne strony prawne",
      benefits: [
        "Bez utraty przewijania",
        "Wyższa konwersja",
        "Pojedynczy komponent, trzy dokumenty",
        "Stos modali",
        "Zlokalizowane chrome w 35 językach",
        "Pełna zgodność prawna zachowana",
      ],
      conclusionTitle: "Prawne bez tarcia",
      conclusionBody:
        "Prawnicy chcą, by polityka była czytelna. Marketerzy chcą, by odwiedzający konwertował. Modale czynią obu szczęśliwymi.",
      ctaText: "Wypróbuj nowy flow.",
      ctaButton: "Odwiedź stronę lądowania",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Automatyczny kataloński dla odwiedzających z Katalonii | IQ Rest",
        description:
          "Odwiedzający z Barcelony, Tarragony, Lleidy i Girony widzą IQ Rest automatycznie po katalońsku.",
      },
      title: "Automatyczne wykrywanie katalońskiego dla odwiedzających z Katalonii",
      subtitle:
        "Odwiedzający z Barcelony, Tarragony, Lleidy i Girony lądują domyślnie na katalońskiej wersji IQ Rest.",
      intro:
        "Katalonia ma silną tożsamość językową. IQ Rest szanuje teraz to rozróżnienie na poziomie geo.",
      sections: [
        {
          title: "Geo-detekcja na edge",
          body: "Czytamy kraj i region odwiedzającego z naszego modułu geo nginx. Jeśli kraj to Hiszpania a region pasuje do Barcelony, Tarragony, Lleidy lub Girony, przekierowujemy na /ca.",
        },
        {
          title: "Cookie języka nadpisuje geo",
          body: "Gdy wybierzesz język ręcznie, Twój wybór jest zapisany w cookie nadpisującym geo dla przyszłych wizyt.",
        },
        {
          title: "Pełne tłumaczenie katalońskie, nie automatyczne",
          body: "Strona /ca nie jest automatycznie tłumaczona z hiszpańskiego — każde słowo jest profesjonalnie przetłumaczone przez katalońskojęzycznych copywriterów branży gastronomicznej.",
        },
      ],
      benefitsTitle: "Dlaczego auto-kataloński ma znaczenie",
      benefits: [
        "Odwiedzający z Katalonii widzą kataloński automatycznie",
        "Reszta Hiszpanii dostaje kastylijski",
        "Ręczny wybór języka trwa przez cookie",
        "Pełne profesjonalne tłumaczenie",
        "Geo-detekcja na edge",
        "Ta sama zoptymalizowana strona lądowania",
      ],
      conclusionTitle: "Szacunek dla tożsamości językowej",
      conclusionBody:
        "Domyślnie kierowanie odwiedzających z Katalonii na kastylijski to mała rzecz technicznie, ale duża politycznie i kulturowo.",
      ctaText: "Odwiedź IQ Rest z Katalonii i zobacz stronę w swoim języku.",
      ctaButton: "Otwórz katalońską stronę lądowania",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modal wygasłego okresu próbnego — menu QR pozostaje publiczne | IQ Rest",
        description:
          "Gdy Twój okres próbny się kończy, menu nie znika. Goście mogą nadal skanować.",
      },
      title: "Wygasły okres próbny? Twoje menu QR pozostaje online dla gości",
      subtitle:
        "Wygaśnięcie okresu próbnego nie wyłącza już Twojego publicznego menu. Goście mogą nadal skanować.",
      intro:
        "Stare zachowanie wygaśnięcia okresu próbnego było ostre. Zmieniliśmy to. Teraz wygaśnięcie pokazuje modal w panelu, ale Twoje publiczne menu nadal obsługuje gości normalnie.",
      sections: [
        {
          title: "Publiczne menu pozostaje online",
          body: "14-dniowy okres próbny kończy się cicho z perspektywy gościa. Menu QR, zamówienia online, rezerwacje — wszystko nadal działa.",
        },
        {
          title: "Modal w panelu, nie twarde przekierowanie",
          body: "Pokazujemy czysty modal: 'Twój okres próbny się skończył. Wybierz plan, by kontynuować używanie zaawansowanych funkcji.'",
        },
        {
          title: "Podgląd zawsze dostępny",
          body: "Nawet z wygasłym okresem próbnym możesz nadal podglądać menu QR z panelu.",
        },
      ],
      benefitsTitle: "Dlaczego miękkie wygaśnięcie bije twardy cutoff",
      benefits: [
        "Publiczne menu QR pozostaje online dla gości",
        "Bez niespodziewanego downtime w środku obsługi",
        "Modal w panelu zamiast wymuszonego przekierowania na rozliczenia",
        "Podgląd zawsze dostępny",
        "Inline upsell hints",
        "Właściciel upgraduje według własnego harmonogramu",
      ],
      conclusionTitle: "Szanuj godziny pracy restauracji",
      conclusionBody:
        "Restauracje działają na ciasnych marżach. Miękkie wygaśnięcie zostawia światła zapalone dla gości, jednocześnie pchając właściciela w stronę płatnego planu.",
      ctaText: "Rozpocznij 14-dniowy okres próbny wiedząc, że Twoje menu pozostaje online.",
      ctaButton: "Rozpocznij darmowy okres próbny",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Danie: jaśniejsza terminologia edytora | IQ Rest",
        description:
          "Zmieniliśmy nazwę 'Item' na 'Danie' w całym panelu.",
      },
      title: "Item → Danie: jaśniejsza terminologia w całym edytorze",
      subtitle:
        "Zastąpiliśmy generyczną etykietę 'Item' przez 'Danie' na każdej powierzchni panelu.",
      intro:
        "Ludzie z software'u mówią 'item'. Ludzie z restauracji mówią 'danie'. Zmieniliśmy nazwy wszystkich.",
      sections: [
        {
          title: "Gdzie obowiązuje zmiana nazwy",
          body: "Każda powierzchnia użytkownika: przyciski, etykiety, toasty, breadcrumbs — wszystkie zaktualizowane. Wewnętrzna kolumna bazy danych nadal nazywa się 'item' dla wstecznej kompatybilności.",
        },
        {
          title: "Przetłumaczone na wszystkie 35 języków",
          body: "Hiszpański 'plato', francuski 'plat', niemiecki 'Gericht', włoski 'piatto', kataloński 'plat', japoński '料理'.",
        },
        {
          title: "Domyślna kategoria również auto-utworzona",
          body: "Auto-tworzymy domyślną kategorię 'Menu' przy pierwszej wizycie w panelu.",
        },
      ],
      benefitsTitle: "Dlaczego terminologia ma znaczenie",
      benefits: [
        "'Danie' odpowiada temu, jak mówią właściciele restauracji",
        "Zaktualizowane na każdej powierzchni panelu",
        "Przetłumaczone na 35 języków przez native reviewerów",
        "Domyślna kategoria auto-utworzona",
        "Szybciej od rejestracji do pierwszego dania",
        "Mniej mentalnego tłumaczenia",
      ],
      conclusionTitle: "Mów językiem użytkownika",
      conclusionBody:
        "Generyczna terminologia SaaS jest OK dla inżynierów. Właściciele restauracji potrzebują słów odpowiadających temu, co mówią w pracy.",
      ctaText: "Zarejestruj się i dodaj swoje pierwsze danie w mniej niż minutę.",
      ctaButton: "Zbuduj moje menu",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Auto-domyślna kategoria dla onboardingu menu | IQ Rest",
        description:
          "Nowi użytkownicy nie stają już przed pustym menu. IQ Rest auto-tworzy domyślną kategorię.",
      },
      title: "Auto-domyślna kategoria — pomiń puste menu",
      subtitle:
        "Nowi użytkownicy lądują na menu z domyślną kategorią już utworzoną.",
      intro:
        "Stary onboarding wymagał od użytkowników utworzenia kategorii zanim mogli dodać danie. IQ Rest auto-tworzy teraz domyślną kategorię 'Menu'.",
      sections: [
        {
          title: "Domyślna kategoria utworzona przy logowaniu",
          body: "Pierwszy raz, gdy logujesz się do świeżego panelu, IQ Rest sprawdza, czy masz kategorie. Jeśli nie, tworzy jedną nazwaną 'Menu'.",
        },
        {
          title: "Zmieniona nazwa, by pasowała do kuchni z kreatorem",
          body: "Jeśli używałeś kreatora 3-krokowego, seeder generuje kategorie pasujące do kuchni zamiast tego.",
        },
        {
          title: "Wstecznie kompatybilne",
          body: "Jeśli już masz kategorie, domyślna nie jest tworzona.",
        },
      ],
      benefitsTitle: "Dlaczego auto-domyślna przyspiesza onboarding",
      benefits: [
        "Bez bariery 'utwórz najpierw kategorię'",
        "Tapnij 'Dodaj danie' jako pierwszą akcję",
        "Kategoria nazwana w Twoim języku",
        "Flow kreatora nadal sieje pasujące kategorie",
        "Istniejące menu nietknięte",
        "Szybciej od logowania do pierwszego dania",
      ],
      conclusionTitle: "Eliminuj pusty stan",
      conclusionBody:
        "Puste stany to miejsca, gdzie nowi użytkownicy odbijają się. Auto-tworzenie domyślnej kategorii usuwa taką barierę.",
      ctaText: "Zarejestruj się i zacznij dodawać dania natychmiast.",
      ctaButton: "Zbuduj moje menu",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Pomiń krok nazwy restauracji w onboardingu | IQ Rest",
        description:
          "Usunęliśmy krok 'nazwa restauracji' z onboardingu.",
      },
      title: "Pomiń krok nazwy restauracji w onboardingu",
      subtitle:
        "Nie musisz wpisywać nazwy restauracji, by zacząć budować menu.",
      intro:
        "Flow onboardingowe wymagające informacji z góry sprawiają wrażenie wypełniania formularzy. Usunęliśmy krok.",
      sections: [
        {
          title: "Co dzieje się gdy pomijasz",
          body: "Jeśli pominiesz krok nazwy, restauracja dostaje placeholder ('Twoja restauracja') ukryty domyślnie na publicznym menu.",
        },
        {
          title: "Ustaw to z dowolnego miejsca",
          body: "Pole nazwy jest edytowalne z ustawień, z hero menu (tapnij by edytować inline).",
        },
        {
          title: "Bez kary SEO za domyślną wartość",
          body: "Używamy slugu jako fallback dla tytułu strony i meta tagów SEO.",
        },
      ],
      benefitsTitle: "Dlaczego pomijanie przyspiesza onboarding",
      benefits: [
        "Bez presji decyzji",
        "Ląduj w panelu szybciej",
        "Ustaw nazwę gdy przyjdzie inspiracja",
        "Edycja inline z hero menu",
        "Publiczne menu działa bez ustawionej nazwy",
        "Bez kary SEO",
      ],
      conclusionTitle: "Mniej decyzji, więcej zrobionego",
      conclusionBody:
        "Każde pole formularza w onboardingu to szansa, by użytkownik się odbił. Usuwając pole nazwy restauracji, usunęliśmy taką szansę.",
      ctaText: "Zarejestruj się w sekundach — nie wymagana nazwa restauracji.",
      ctaButton: "Rozpocznij darmowy okres próbny",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Wypróbuj menu QR przed rejestracją — Anonimowo | IQ Rest",
        description:
          "Zbuduj przykładowe menu zanim utworzysz konto.",
      },
      title: "Wypróbuj menu QR zanim się zarejestrujesz",
      subtitle:
        "Zbuduj przykładowe menu, zobacz jak wygląda Twój kod QR, zobacz podgląd doświadczenia na żywo — wszystko zanim utworzysz konto.",
      intro:
        "Większość usług menu QR wymaga utworzenia konta zanim cokolwiek zrobisz. IQ Rest pozwala teraz zbudować kompletne przykładowe menu anonimowo.",
      sections: [
        {
          title: "Anonimowa sesja przechowuje Twoją pracę",
          body: "Anonimowy ID sesji jest tworzony przy pierwszej wizycie i przechowywany w cookie. Trwamy sesję 7 dni.",
        },
        {
          title: "Zapisz postęp przez link emailowy",
          body: "Gdy zdecydujesz, że chcesz zachować menu, kliknij 'Zapisz postęp'. Wyślemy magic link.",
        },
        {
          title: "Redukuje lęk rejestracyjny do zera",
          body: "Restauracje, które próbują anonimowo, konwertują wyżej niż restauracje zmuszone do rejestracji najpierw.",
        },
      ],
      benefitsTitle: "Dlaczego anonimowy onboarding wygrywa",
      benefits: [
        "Zbuduj prawdziwe menu bez tworzenia konta",
        "Anonimowa sesja trwa 7 dni",
        "Zapisz postęp na email gdy zdecydujesz",
        "Bez ponownego wpisywania",
        "Bezfrykcyjna ocena produktu",
        "Wyższa ogólna konwersja rejestracji",
      ],
      conclusionTitle: "Pozwól produktowi sprzedać się samemu",
      conclusionBody:
        "Najlepszym sposobem przekonania właściciela restauracji, że IQ Rest jest dla niego, jest pozwolenie mu używać.",
      ctaText: "Wypróbuj IQ Rest teraz — bez konta.",
      ctaButton: "Wypróbuj za darmo",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Zapisz postęp menu przez link emailowy | IQ Rest",
        description:
          "Zbudowałeś przykładowe menu anonimowo? Zapisz je na email.",
      },
      title: "Zapisz postęp menu przez link emailowy",
      subtitle:
        "Zbudowałeś menu anonimowo i chcesz je zachować? Wpisz email. Wyślemy magic link, który zamieni anonimową pracę w prawdziwe konto jednym tapnięciem.",
      intro:
        "Funkcja 'Zapisz postęp' IQ Rest zamienia anonimową sesję w prawdziwe konto przez magic link.",
      sections: [
        {
          title: "Flow magic link — bez hasła",
          body: "Wysyłamy jednorazowy link na email. Kliknij w 10 minut i jesteś zalogowany w nowym koncie zawierającym anonimowo zbudowane menu.",
        },
        {
          title: "Zarządzanie konfliktami dla istniejących kont",
          body: "Jeśli email ma już konto, nie nadpisujemy go. Pytamy czy zlać anonimowe menu czy odrzucić.",
        },
        {
          title: "Rate-limited i odporny na spam",
          body: "Limitujemy żądania per IP i per email. Link wygasa w 10 minut i jest jednorazowy.",
        },
      ],
      benefitsTitle: "Dlaczego zapis przez magic link wygrywa",
      benefits: [
        "Bez hasła",
        "Anonimowa praca przenosi się nienaruszona",
        "Istniejące konta: wybierz zlanie lub odrzucenie",
        "Rate-limited i ograniczony czasowo",
        "Jedno tapnięcie by się zaangażować",
        "Sam email służy jako weryfikacja",
      ],
      conclusionTitle: "Konwersja bez tarcia",
      conclusionBody:
        "Magic linki zwijają długi formularz rejestracyjny w pojedyncze pole emaila plus kliknięcie w skrzynce. To flow konwersji o najmniejszym tarciu w branży.",
      ctaText: "Zbuduj menu anonimowo, potem zapisz je przez email gdy będziesz gotowy.",
      ctaButton: "Wypróbuj za darmo",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Checkout Stripe jednym kliknięciem dla powracających użytkowników | IQ Rest",
        description:
          "Już zalogowany? Kliknij plan w pricing i idź wprost do checkoutu Stripe.",
      },
      title: "Checkout Stripe jednym kliknięciem dla powracających użytkowników",
      subtitle:
        "Zalogowany użytkownik klika plan? Wprost do checkoutu Stripe. Dwa kliknięcia od strony pricing do aktywnej subskrypcji.",
      intro:
        "Powracający użytkownicy z istniejącym kontem IQ Rest nie powinni musieć niczego ponownie potwierdzać przy upgrade.",
      sections: [
        {
          title: "Wykrywanie stanu zalogowanego w pricing",
          body: "Nasza strona pricing sprawdza uwierzytelniony cookie sesji przy załadowaniu. Jeśli jesteś zalogowany, przyciski planu idą wprost do /api/stripe/checkout.",
        },
        {
          title: "Język UI przekazany do Stripe",
          body: "Twój język panelu jest przekazany do Stripe Checkout przez parametr locale.",
        },
        {
          title: "Return URL przenosi cię z powrotem do panelu",
          body: "Po udanej płatności Stripe przekierowuje na URL powrotu, który ustawiamy na root panelu w Twoim języku.",
        },
      ],
      benefitsTitle: "Dlaczego checkout jednym kliknięciem konwertuje",
      benefits: [
        "Dwa kliknięcia od pricing do aktywnej subskrypcji",
        "Bez interstycjału 'potwierdź konto' dla zalogowanych użytkowników",
        "Stripe checkout w języku panelu",
        "Return URL przenosi cię do upgradowanego panelu",
        "Webhook aktualizuje plan przed przybyciem",
        "Nowi użytkownicy nadal mają standardowy flow",
      ],
      conclusionTitle: "Spraw, by łatwa droga była trywialnie łatwa",
      conclusionBody:
        "Już przekonany użytkownik nie potrzebuje więcej przekonywania — potrzebuje mniej kliknięć.",
      ctaText: "Już użytkownik? Wybierz plan i upgraduj w dwóch kliknięciach.",
      ctaButton: "Zobacz ceny",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Redesign UI panelu: karty, nawigacja, formularze | IQ Rest",
        description:
          "Panel IQ Rest przeprojektowany ze spójnymi komponentami kart, trwałą nawigacją sidebara i ulepszonymi akcjami formularzy.",
      },
      title: "Redesign UI panelu: spójne karty, nawigacja i akcje formularzy",
      subtitle:
        "Wypolerowany panel z ujednoliconym stylem kart, trwałą nawigacją sidebara, kolorowymi akcentami stanów aktywnych.",
      intro:
        "IQ Rest przeszedł kompleksowy redesign UI panelu. Każda strona używa teraz spójnego stylu kart.",
      sections: [
        {
          title: "Spójny design kart na wszystkich stronach",
          body: "Każda strona panelu używa teraz ujednoliconego komponentu DashboardCard ze spójnymi zaokrąglonymi obramowaniami.",
        },
        {
          title: "Trwała nawigacja sidebara z aktywnymi stanami",
          body: "Na ekranach desktop trwała nawigacja sidebara jest teraz widoczna na każdej stronie. Aktywna strona jest podświetlona kolorowym akcentem tła.",
        },
        {
          title: "Ulepszone strony formularzy z dolnymi akcjami",
          body: "Wszystkie strony formularzy mają teraz zduplikowany przycisk zapisu na dole w kolorze akcentu.",
        },
      ],
      benefitsTitle: "Korzyści z redesignu UI",
      benefits: [
        "Ujednolicony styl kart na wszystkich stronach",
        "Trwała nawigacja sidebara na desktop",
        "Dolne przyciski zapisu na wszystkich formularzach",
        "Akcje usuwania i zapisu wyraźnie oddzielone",
        "Nagłówki sekcji na kartach formularzy",
        "Czystsza strona analytics",
      ],
      conclusionTitle: "Bardziej wypolerowane doświadczenie panelu",
      conclusionBody:
        "Ten redesign UI przynosi spójność wizualną i lepszą użyteczność do każdego zakątka panelu IQ Rest.",
      ctaText: "Doświadcz przeprojektowanego panelu",
      ctaButton: "Otwórz panel",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("Skaner menu AI — Stwórz cyfrowe menu QR z jednego zdjęcia"),
    "redesigned-dashboard-qr-menu-management": stub("Przeprojektowany panel do zarządzania menu QR"),
    "reservation-emails-analytics-digital-qr-menu": stub("Emaile rezerwacji i analityka dla cyfrowego menu QR"),
    "multi-currency-geo-pricing-qr-menu": stub("Wielowalutowe ceny geo dla menu QR"),
    "support-qr-menu-restaurant-cafe": stub("Zintegrowane wsparcie dla menu QR"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Szczegółowa analityka dla strony menu QR"),
    "instant-qr-menu-restaurant-website-generator": stub("Natychmiastowy generator menu QR i strony restauracji"),
    "subscription-plans-qr-menu-restaurant-website": stub("Plany subskrypcyjne dla menu QR"),
    "public-restaurant-qr-menu-website": stub("Publiczna strona menu QR restauracji"),
    "add-items-restaurant-qr-menu-website": stub("Dodaj dania do menu QR w sekundach"),
    "qr-menu-restaurant-categories": stub("Kategorie dla menu QR restauracji"),
    "easy-qr-menu-cafe-control-panel": stub("Łatwy panel sterowania menu QR dla kawiarni"),
    "faq-page-organization": stub("Organizacja strony FAQ"),
    "free-restaurant-website-improvements": stub("Ulepszenia bezpłatnej strony restauracji"),
    "user-authentication-interface": stub("Interfejs uwierzytelniania użytkownika"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Korzyści",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Wypróbuj IQ Rest",
    ctaButton: "Rozpocznij darmowy okres próbny",
  };
}
