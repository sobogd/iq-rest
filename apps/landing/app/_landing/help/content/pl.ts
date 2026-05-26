import type { HelpDoc } from "../types";

// PL help guide.
export const pl: HelpDoc = {
  metaTitle: "Jak korzystać z IQ Rest — przewodnik krok po kroku",
  metaDescription:
    "Pełny przewodnik po IQ Rest: rejestracja, menu, zamówienia, rezerwacje, ekran kuchenny i ustawienia — dla restauracji.",
  h1: "Pomoc",
  intro: "Szczegółowy przewodnik po IQ Rest — od rejestracji po najdrobniejsze ustawienia.",
  banner: {
    title: "To prostsze, niż się wydaje",
    sub: "Przewodnik krok po kroku: od rejestracji po najdrobniejsze ustawienia — poradzi sobie każdy.",
    cta: "Jak korzystać",
  },
  tipLabel: "Wskazówka",
  noteLabel: "Ważne",
  sections: [
    {
      id: "start",
      title: "1. Pierwsze kroki",
      blocks: [
        { type: "h3", text: "Czym jest ten system" },
        {
          type: "p",
          text: "IQ Rest to usługa dla restauracji: tworzysz menu online z kodem QR, przyjmujesz zamówienia i rezerwacje stolików bezpośrednio z telefonów gości, a w kuchni i u kelnerów działają tablety-terminale. Wszystkim zarządzasz z jednego panelu administracyjnego (pulpitu).",
        },
        { type: "h3", text: "Rejestracja i logowanie" },
        { type: "p", text: "Zalogować się można na trzy sposoby — wybierz dowolny na ekranie logowania:" },
        {
          type: "list",
          items: [
            "Przez Google — kliknij „Kontynuuj z Google” i wybierz konto.",
            "Przez Apple — kliknij „Kontynuuj z Apple”.",
            "Przez e-mail — kliknij „Kontynuuj z e-mailem”, wpisz adres, a wyślemy 6-cyfrowy kod. Wpisz go na następnym ekranie. Hasło nie jest potrzebne.",
          ],
        },
        {
          type: "note",
          text: "Na e-mail przychodzi tylko jednorazowy kod logowania — żadnego spamu ani newsletterów.",
        },
        { type: "h3", text: "Tworzenie restauracji (onboarding)" },
        {
          type: "p",
          text: "Przy pierwszym logowaniu system przeprowadzi Cię przez szybką konfigurację. Następnie automatycznie tworzy się restauracja z przykładowym szablonem menu, który później zastąpisz własnym.",
        },
        {
          type: "steps",
          items: [
            "Podaj nazwę restauracji.",
            "Wybierz typ kuchni (decyduje o początkowym szablonie menu).",
            "Gotowe: trafiasz do pulpitu z już wypełnionym przykładowym menu.",
          ],
        },
        {
          type: "note",
          text: "Waluta jest wykrywana automatycznie na podstawie Twojego regionu — nie trzeba jej wybierać na starcie. Zmienisz ją później w Ustawienia → Region.",
        },
        { type: "h3", text: "Przegląd pulpitu" },
        {
          type: "p",
          text: "Nawigacja między sekcjami: na komputerze to górny pasek, na telefonie dolny pasek. Sekcje: Menu, Zamówienia, Rezerwacje, Kuchnia, Analizy i Ustawienia.",
        },
        {
          type: "list",
          items: [
            "Obok nazwy restauracji na górnym pasku jest mały wskaźnik połączenia: zielona kropka oznacza, że zamówienia synchronizują się na żywo.",
            "Na stronie „Menu” u góry jest przycisk „Podgląd” — otwiera Twoje menu tak, jak widzi je gość.",
            "Tam też przycisk „Udostępnij” — pokazuje kod QR i link do menu (skopiuj link, pobierz QR lub otwórz menu).",
          ],
        },
        {
          type: "tip",
          text: "Naciskaj „Podgląd” po każdej zmianie menu — od razu widzisz, jak wygląda dla gościa.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menu",
      blocks: [
        {
          type: "p",
          text: "Sekcja „Menu” to serce systemu. Tutaj budujesz strukturę: kategorie → dania → opcje. Otwórz ją z nawigacji.",
        },
        { type: "h3", text: "Kategorie i podkategorie" },
        {
          type: "steps",
          items: [
            "Naciśnij „Dodaj kategorię” i wpisz nazwę (na przykład „Przystawki”).",
            "Aby edytować kategorię — najedź na nią i naciśnij „Edytuj kategorię”.",
            "Kolejność kategorii zmieniasz przyciskami „W górę” / „W dół” — gość zobaczy je dokładnie w tej kolejności.",
            "Możesz utworzyć „Grupę” (przez „Dodaj grupę”) — kategorię-sekcję, która zawiera inne kategorie.",
          ],
        },
        { type: "h3", text: "Dodawanie dań" },
        {
          type: "steps",
          items: [
            "Rozwiń kategorię (strzałka po lewej) i naciśnij „Dodaj danie”.",
            "Wypełnij nazwę, cenę i opis.",
            "Dodaj zdjęcie: „Dodaj zdjęcie” — wgraj własne lub naciśnij „Generuj” i opisz danie słowami, by AI stworzyło obraz.",
            "Zapisz. Danie pojawi się w kategorii.",
          ],
        },
        {
          type: "tip",
          text: "Zdjęcie można wygenerować przez AI: podaj ujęcie, oświetlenie lub tło (na przykład „Pizza Margherita na drewnianej desce, widok z góry”).",
        },
        { type: "h3", text: "Opcje i warianty (modyfikatory)" },
        {
          type: "p",
          text: "Opcje to wybory w obrębie dania: rozmiar, stopień wysmażenia, dodatkowe składniki. Każda opcja ma warianty, a do wariantu można dodać dopłatę (na przykład „+1.50 za sztukę”).",
        },
        {
          type: "list",
          items: [
            "Przykład: opcja „Rozmiar” z wariantami „Mała / Duża (+2.00)”.",
            "Przykład: opcja „Dodatki” z kilkoma wariantami, z których gość wybiera jeden lub więcej.",
          ],
        },
        { type: "h3", text: "Alergeny i diety" },
        {
          type: "p",
          text: "Przy daniu możesz oznaczyć alergeny (gluten, orzechy itd.) i etykiety dietetyczne (wegetariańskie, wegańskie). Gość zobaczy je jako ikony w menu publicznym.",
        },
        { type: "h3", text: "Widoczność dań" },
        {
          type: "p",
          text: "Przycisk „Ukryj danie” / „Pokaż danie” tymczasowo usuwa pozycję z menu publicznego bez jej kasowania — przydatne, gdy danie się skończyło.",
        },
        { type: "h3", text: "Wgranie papierowego menu (skan)" },
        {
          type: "p",
          text: "Jeśli masz już menu jako zdjęcie lub PDF — nie wpisuj go ręcznie. Skorzystaj ze skanowania:",
        },
        {
          type: "steps",
          items: [
            "Naciśnij baner „Wgraj menu” (lub „Wgraj swoje papierowe menu”).",
            "Dodaj do 5 plików (zdjęcie/skan, do 20 MB każdy) i naciśnij „Skanuj”.",
            "Poczekaj do minuty — AI rozpozna kategorie i dania.",
            "Sprawdź rozpoznane, zaznacz potrzebne pozycje i naciśnij „Kontynuuj”.",
            "Wybierz: zastąpić bieżące menu lub dodać nowe pozycje do istniejącego.",
          ],
        },
        {
          type: "note",
          text: "Przykłady z szablonu startowego są usuwane przy zapisie zeskanowanego menu — to normalne.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Stoliki i kody QR",
      blocks: [
        {
          type: "p",
          text: "Stoliki służą do przypisywania zamówień i rezerwacji do konkretnych miejsc oraz do drukowania osobistych kodów QR. Sekcja: Ustawienia → Stoliki.",
        },
        { type: "h3", text: "Tworzenie stolików" },
        {
          type: "steps",
          items: [
            "Otwórz Ustawienia → Stoliki i naciśnij „Dodaj stolik”.",
            "Podaj numer stolika, liczbę miejsc i (opcjonalnie) nazwę — na przykład „Okno”, „Bar”, „Taras”.",
            "Dodaj zdjęcie stolika — goście je widzą i rozumieją dokładnie, gdzie jest ich stolik.",
            "Ustaw kolor stolika — tym kolorem stolik jest podświetlany w kuchni i w sekcji „Zamówienia”, by personel szybko go znalazł.",
            "W razie potrzeby dodaj krótki opis.",
            "Zapisz.",
          ],
        },
        {
          type: "note",
          text: "Zdjęcie stolika jest dla gości (orientacja „gdzie jest mój stolik”). Kolor jest dla personelu (szybkie wizualne oznaczenie stolika w kuchni i w zamówieniach).",
        },
        { type: "h3", text: "Kod QR stolika" },
        {
          type: "p",
          text: "Każdy stolik ma własny kod QR. Gość skanuje go telefonem i od razu trafia do menu tego stolika — zamówienie automatycznie przypisuje się do właściwego stolika.",
        },
        {
          type: "steps",
          items: [
            "Naciśnij „Pokaż kod QR” przy wybranym stoliku.",
            "Naciśnij „Pobierz QR”, by zapisać obraz.",
            "Wydrukuj go i umieść na stoliku (na stojaku, w menu, na naklejce).",
          ],
        },
        {
          type: "tip",
          text: "„Link stolika” to ten sam link co w QR, ale jako tekst. Możesz wysłać go gościowi w komunikatorze.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Zamówienia",
      blocks: [
        { type: "h3", text: "Jak zamawia gość" },
        {
          type: "p",
          text: "Gość skanuje QR na stoliku → otwiera się menu → wybiera dania, opcje i ilość → składa zamówienie. Zamówienie natychmiast pojawia się w Twoim pulpicie i na terminalu kuchni/kelnera.",
        },
        {
          type: "note",
          text: "Aby goście mogli zamawiać, w Ustawienia → Zamówienia musi być włączone „Przyjmuj zamówienia”. Gdy wyłączone — gość widzi menu, ale nie ma przycisku zamówienia.",
        },
        { type: "h3", text: "Obsługa zamówień w pulpicie" },
        {
          type: "p",
          text: "Sekcja „Zamówienia” pokazuje plan sali. Zajęte stoliki są podświetlone i pokazują liczbę aktywnych zamówień. Dotknij stolika, by otworzyć jego zamówienia.",
        },
        {
          type: "steps",
          items: [
            "Dotknij stolika → „Rozpocznij zamówienie” (lub otwórz istniejące).",
            "„Dodaj pozycję” → wybierz kategorię → danie → opcje → w razie potrzeby podaj ilość i uwagi (na przykład „bez cebuli”).",
            "Naciśnij „Dodaj” — pozycja trafia do zamówienia.",
          ],
        },
        { type: "h3", text: "Statusy pozycji" },
        {
          type: "p",
          text: "Każda pozycja ma status: Oczekuje → W przygotowaniu → Gotowe → Podane. Dotknij pozycji, by zmienić status. Statusy synchronizują się z kuchnią na żywo.",
        },
        { type: "h3", text: "Rabaty, podział, zmiana stolika" },
        {
          type: "list",
          items: [
            "Rabat: „Dodaj rabat” — procent lub kwota stała, na całe zamówienie lub pojedynczą pozycję, z powodem.",
            "Podziel zamówienie: „Podziel zamówienie” — wybierz pozycje, które trafią na nowy, osobny rachunek.",
            "Zmień stolik: „Zmień stolik” — przenieś zamówienie na inny stolik.",
            "Duplikuj pozycję: szybko dodaj jeszcze jedną taką samą.",
          ],
        },
        { type: "h3", text: "Zamknięcie zamówienia" },
        {
          type: "steps",
          items: [
            "Gdy wszystkie pozycje są podane, naciśnij „Zamknij zamówienie”.",
            "Wybierz metodę płatności (jeśli metody są skonfigurowane).",
            "Zamówienie się zamknie i zniknie z aktywnych.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Kuchnia (KDS)",
      blocks: [
        {
          type: "p",
          text: "Ekran kuchenny (KDS) to ekran na tablecie dla kucharzy. Nowe zamówienia trafiają na niego na żywo, a kucharz oznacza dania jako gotowe.",
        },
        { type: "h3", text: "Co pokazuje ekran" },
        {
          type: "list",
          items: [
            "Karty zamówień z pozycjami, opcjami i czasem „na wydawce”.",
            "Kolorowe oznaczenie statusu: co jest w przygotowaniu, co gotowe.",
            "Sygnał dźwiękowy przy nowym zamówieniu.",
          ],
        },
        { type: "h3", text: "Jak korzystać" },
        {
          type: "steps",
          items: [
            "Dotknij pozycji, by przejść do następnego statusu (W przygotowaniu → Gotowe).",
            "Włącz dźwięk przyciskiem „Włącz dźwięk” — wtedy nowe zamówienia będą z sygnałem dźwiękowym.",
            "Zoomem dostosuj rozmiar kart do tabletu.",
            "Filtrami możesz pokazać tylko potrzebne kategorie (na przykład tylko linię ciepłą).",
          ],
        },
        {
          type: "note",
          text: "Jeśli tablet straci internet, pojawi się ostrzeżenie „Brak połączenia”. Połącz Wi-Fi, a zamówienia znów zaczną przychodzić.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezerwacje",
      blocks: [
        {
          type: "p",
          text: "Goście mogą zarezerwować stolik przez Twoje menu, a Ty zarządzasz rezerwacjami w sekcji „Rezerwacje” (widok „Miesiąc” / „Dzień”).",
        },
        { type: "h3", text: "Konfiguracja rezerwacji" },
        { type: "p", text: "Najpierw włącz i skonfiguruj rezerwacje: Ustawienia → Rezerwacje." },
        {
          type: "steps",
          items: [
            "Włącz „Włącz rezerwacje”.",
            "Wybierz tryb potwierdzania: „Automatyczny” (rezerwacje potwierdzają się same) lub „Ręczny” (każdą potwierdzasz sam).",
            "Ustaw „Czas trwania rezerwacji” — jak długo stolik jest trzymany dla gościa.",
            "Wypełnij „Harmonogram tygodniowy”: dla każdego dnia — otwarte/zamknięte, godziny pracy i w razie potrzeby przerwa obiadowa.",
          ],
        },
        {
          type: "note",
          text: "Do przyjmowania rezerwacji potrzebne są stoliki. Jeśli ich nie ma, system poprosi najpierw o ich dodanie.",
        },
        { type: "h3", text: "Obsługa rezerwacji" },
        {
          type: "list",
          items: [
            "Nowe rezerwacje czekające na decyzję zebrane są w bloku „Oczekują na potwierdzenie”.",
            "Przyciski „Potwierdź” / „Odrzuć” — dla każdej rezerwacji.",
            "„Zakończ” — oznacza, że gość przyszedł i rezerwacja jest zrealizowana.",
            "Przełączaj między „Miesiąc” i „Dzień”, przeglądaj okres przyciskami „Wstecz” / „Dalej”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Urządzenia (tablety)",
      blocks: [
        {
          type: "p",
          text: "Terminale kuchni, kelnera i rezerwacji to osobne tablety, które łączą się z Twoim kontem za pomocą kodu. Sekcja: Ustawienia → Urządzenia.",
        },
        {
          type: "note",
          text: "Urządzenia są dostępne w planie płatnym lub w trakcie aktywnego okresu próbnego.",
        },
        { type: "h3", text: "Podłączenie tabletu (parowanie)" },
        {
          type: "steps",
          items: [
            "W pulpicie: Ustawienia → Urządzenia → „Dodaj urządzenie”.",
            "Podaj nazwę (na przykład „Kuchnia — linia ciepła”) i typ: Kuchnia, Kelner lub Rezerwacje.",
            "Naciśnij „Wygeneruj kod” — pojawi się 6-cyfrowy kod (ważny 2 minuty).",
            "Na tablecie otwórz ekran łączenia i wpisz ten kod.",
            "Tablet się połączy i od razu zacznie działać w wybranej roli.",
          ],
        },
        { type: "tip", text: "Jeśli kod wygasł — po prostu naciśnij „Nowy kod” i wpisz świeży." },
        { type: "h3", text: "Zarządzanie urządzeniami" },
        {
          type: "list",
          items: [
            "Statusy: Online / Offline / Oczekuje na połączenie / Cofnięte.",
            "„Cofnij” — odłącza tablet (na przykład gdy zaginął). Do ponownego logowania potrzebny jest nowy kod.",
            "„Usuń” — trwale usuwa urządzenie z listy.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analizy",
      blocks: [
        {
          type: "p",
          text: "Sekcja „Analizy” pokazuje kluczowe liczby lokalu: przychód, liczbę zamówień i ich podział (na przykład według metody płatności i pory). Korzystaj z niej, by rozumieć, co i kiedy sprzedaje się najlepiej.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Ustawienia",
      blocks: [
        {
          type: "p",
          text: "Sekcja „Ustawienia” otwiera się jako zestaw kart-sekcji. U góry jest przełącznik aktywnej restauracji (jeśli masz więcej niż jedną). Poniżej — każda karta po kolei.",
        },
        { type: "h3", text: "Witryna" },
        {
          type: "list",
          items: [
            "URL menu publicznego — unikalny adres Twojego menu (możesz ustawić własny krótki slug i skopiować link).",
            "Nazwa (tytuł) lokalu na publicznej witrynie.",
            "Kolor akcentu — główny kolor przycisków i wyróżnień w menu.",
            "Tło — obraz lub wideo na stronie głównej; wgraj własne lub wygeneruj tło przez AI z opisu.",
            "Układ menu — jak dania są pokazywane gościowi.",
          ],
        },
        { type: "h3", text: "Kontakty i adres" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp i znacznik na mapie — wszystko pokazywane gościowi na stronie kontaktów Twojego menu.",
        },
        { type: "h3", text: "Region" },
        { type: "p", text: "Waluta (używana do wszystkich cen) i strefa czasowa lokalu." },
        { type: "h3", text: "Stoliki" },
        { type: "p", text: "Plan sali, miejsca i kody QR stolików — szczegółowo w sekcji 3." },
        { type: "h3", text: "Urządzenia" },
        {
          type: "p",
          text: "Podłączanie tabletów do ekranu kuchennego i terminali kelnerskich — szczegółowo w sekcji 7.",
        },
        { type: "h3", text: "Zamówienia" },
        {
          type: "list",
          items: [
            "„Przyjmuj zamówienia” — główny przełącznik przyjmowania zamówień.",
            "„Tryb zamówień” — Wewnętrzny i/lub WhatsApp.",
            "„Pola wymagane” — jakie dane gość musi podać (Imię, Telefon, Adres).",
            "„Metody płatności” — aby zintegrować system płatności restauracji, skontaktuj się ze wsparciem.",
          ],
        },
        { type: "h3", text: "Rezerwacje" },
        {
          type: "p",
          text: "Włączanie rezerwacji, potwierdzanie automatyczne lub ręczne, czas trwania i godziny pracy — szczegółowo w sekcji 6.",
        },
        { type: "h3", text: "Języki" },
        {
          type: "steps",
          items: [
            "Otwórz Ustawienia → Języki.",
            "Wybierz języki, na które tłumaczone jest menu publiczne (dotknij, by dodać/usunąć).",
            "Ustaw język domyślny.",
            "Teksty tłumaczy się ręcznie lub przyciskiem „Przetłumacz z AI” — system przetłumaczy nazwy i opisy dań na wybrane języki.",
          ],
        },
        { type: "h3", text: "Płatność" },
        { type: "p", text: "Plan subskrypcji, status okresu próbnego i zarządzanie płatnościami." },
        {
          type: "list",
          items: [
            "Rozliczenie miesięczne lub roczne (roczne taniej).",
            "„Subskrybuj” / „Zmień” — wybierz lub zmień plan.",
            "„Zarządzaj” — zmień metodę płatności lub anuluj subskrypcję.",
          ],
        },
        {
          type: "note",
          text: "Płatność jest w EUR. Aby zapłacić w innej walucie, skontaktuj się ze wsparciem.",
        },
        { type: "h3", text: "Wsparcie" },
        {
          type: "p",
          text: "Wbudowany czat z naszym zespołem na żywo. Napisz wiadomość — odpowiemy tu od razu.",
        },
        { type: "h3", text: "Przełączanie i dodawanie restauracji" },
        {
          type: "p",
          text: "Jeśli masz kilka lokali, przełącznik restauracji znajduje się u góry sekcji „Ustawienia”.",
        },
        {
          type: "steps",
          items: [
            "Otwórz przełącznik restauracji u góry „Ustawień”.",
            "„Dodaj restaurację” → wpisz nazwę.",
            "Wybierz „Zduplikuj bieżące menu i ustawienia” (szybki start) lub „Zacznij od zera” (pusta restauracja).",
            "Utwórz ją — i przełączaj się między restauracjami w dowolnej chwili tutaj.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Menu publiczne dla gości",
      blocks: [
        {
          type: "p",
          text: "Menu publiczne to to, co widzi gość po zeskanowaniu QR. Składa się automatycznie z Twojego menu, brandingu i kontaktów.",
        },
        {
          type: "list",
          items: [
            "Adres menu ustawia się w Ustawienia → Region („Link do menu”).",
            "Ogólny kod QR i link do menu pobierzesz przyciskiem „Udostępnij” na stronie „Menu”.",
            "Każdy stolik ma własny osobny QR (Ustawienia → Stoliki), który prowadzi do menu właśnie tego stolika.",
            "Wygląd (tło, kolor akcentu, układ) konfiguruje się w sekcji „Witryna”.",
            "Przycisk „Podgląd” otwiera menu tak, jak widzi je gość.",
          ],
        },
        {
          type: "tip",
          text: "Po każdej zmianie menu/ustawień naciśnij „Podgląd”, by sprawdzić, jak wygląda dla gościa.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Częste pytania i niuanse",
      blocks: [
        { type: "h3", text: "Gość nie może złożyć zamówienia" },
        {
          type: "p",
          text: "Sprawdź Ustawienia → Zamówienia → „Przyjmuj zamówienia” (musi być włączone) oraz że wybrany jest co najmniej jeden tryb zamówień.",
        },
        { type: "h3", text: "Nie przychodzą rezerwacje" },
        {
          type: "p",
          text: "Upewnij się, że rezerwacje są włączone w Ustawienia → Rezerwacje, że dodano stoliki i że dzień nie jest oznaczony jako „Zamknięte” w harmonogramie.",
        },
        { type: "h3", text: "Tablet się nie łączy" },
        {
          type: "p",
          text: "Kod jest ważny 2 minuty. Jeśli wygasł — wygeneruj nowy w Ustawienia → Urządzenia. Jeśli urządzenie zostało cofnięte — utwórz nowy kod.",
        },
        { type: "h3", text: "Danie się skończyło" },
        {
          type: "p",
          text: "Nie usuwaj go — naciśnij „Ukryj danie”. Zniknie z menu publicznego, a przywrócisz je przyciskiem „Pokaż danie”.",
        },
        { type: "h3", text: "Potrzebujesz urządzeń/terminali, a ich nie masz" },
        {
          type: "p",
          text: "Sekcja „Urządzenia” jest dostępna w planie płatnym lub w trakcie aktywnego okresu próbnego. Sprawdź Ustawienia → Płatność.",
        },
        { type: "h3", text: "Masz jeszcze pytania" },
        {
          type: "p",
          text: "Napisz do nas w Ustawienia → Wsparcie — to wbudowany czat z naszym zespołem.",
        },
      ],
    },
  ],
};
