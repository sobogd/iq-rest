import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "pl",
  slug: "rezerwacja-stolikow",
  trackPrefix: "l_pl_bookings",

  meta: {
    title: "Rezerwacja stolików 24/7 dla restauracji | IQ Rest",
    description:
      "Rezerwacja stolików 24/7 dla restauracji: goście sami rezerwują przez menu QR lub stronę. Kalendarz wg stolika, automatyczne potwierdzenia i przypomnienia. Ani jednego straconego gościa. 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/rezerwacja-stolikow",
    ogLocale: "pl_PL",
    ogTitle: "Rezerwacja stolików 24/7 — goście rezerwują sami",
    ogDescription:
      "Goście rezerwują stoliki przez menu QR lub stronę. Kalendarz, automatyczne potwierdzenia, przypomnienia. Ani jednego straconego gościa.",
    brandLine: "IQ Rest — Rezerwacja stolików dla restauracji",
  },

  hero: {
    headline: "Rezerwacja stolików 24/7 — goście rezerwują sami.",
    sub: "Goście rezerwują stoliki przez menu QR lub bezpośredni link. Kalendarz wg stolika, automatyczne potwierdzenia i przypomnienia. Ani jednego straconego gościa i bez telefonów w godzinach szczytu.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostessa zarządza rezerwacjami z tabletu przy wejściu do restauracji",
  },

  scan: {
    heading: "Uruchom rezerwację stolików",
    headingAccent: "w 5 minut.",
    sub: "Podłącz kalendarz, dodaj stoliki ze zdjęciami i pojemnością — goście zaczynają rezerwować tego samego dnia.",
    cta: "Aktywuj rezerwację",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Formularz rezerwacji",
      heading: "Goście rezerwują sami — według daty, godziny i liczby osób.",
      body: "Gość otwiera menu QR lub bezpośredni link, wybiera datę, godzinę i liczbę osób — i natychmiast widzi dostępne stoliki, każdy ze zdjęciem, opisem (taras, przy oknie, kanapa przy barze) i pojemnością. Potwierdzenie wysyłane jest automatycznie e-mailem i WhatsApp.",
      bullets: [
        "Wybór stolika po zdjęciu, opisie i pojemności.",
        "Automatyczne potwierdzenie i przypomnienie godzinę przed wizytą.",
        "Minimalne pola w formularzu: imię, telefon, liczba osób.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Gość rezerwuje stolik restauracji z telefonu: data, godzina, liczba osób i wybór stolika" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Kalendarz rezerwacji",
      heading: "Kalendarz wg dnia i stolika — wszystko jednym spojrzeniem.",
      body: "Panel administracyjny pokazuje kalendarz rezerwacji w rozbiciu na stolik, dzień, tydzień i miesiąc. Wolne sloty, zajęte stoliki, potwierdzone i niepotwierdzone rezerwacje na jednym ekranie. Działa na tablecie na sali i laptopie w biurze.",
      bullets: [
        "Widoki dzienny, tygodniowy i miesięczny.",
        "Rozbicie wg stolika: kto, kiedy, ile osób.",
        "Przeniesienie, anulowanie lub potwierdzenie rezerwacji jednym dotknięciem z telefonu.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Kalendarz rezerwacji w panelu administracyjnym IQ Rest na dwóch tabletach: dzienny Gantt wg stolików i widok miesięczny" },
    },
  ],

  faq: {
    sub: "Co restauratorzy pytają o rezerwację stolików w IQ Rest. Nie znajdujesz swojego pytania? Napisz do nas na WhatsApp.",
    items: [
      { q: "Czy mogę wybrać, w które dni i godziny rezerwacja jest dostępna?", a: "Tak. Panel administracyjny pozwala ustawić godziny otwarcia i dostępne dni tygodnia — system nie pokaże gościom niedostępnych slotów. Możesz zamknąć konkretną datę (wydarzenie firmowe, rezerwacja prywatna) lub tymczasowo wyłączyć cały kalendarz." },
      { q: "Czy mogę przesłać zdjęcie dla każdego stolika?", a: "Tak. Każdy stolik może mieć zdjęcie, opis (taras, przy oknie, kanapa przy barze) i pojemność. Gość widzi dokładnie stolik, który rezerwuje, i podejmuje świadomą decyzję — to zmniejsza niespełnione oczekiwania." },
      { q: "Czy mogę wyłączyć rezerwacje w określone dni?", a: "Tak. Kalendarz pozwala zamknąć określone daty (święta, prywatne wydarzenia, remont) lub całe dni tygodnia. W tych dniach goście widzą komunikat „rezerwacja tymczasowo niedostępna“." },
      { q: "Czy mogę dostosować, jakie pola są zbierane od gościa?", a: "Tak. Domyślny zestaw: imię, telefon, e-mail, liczba osób. Możesz dodać niestandardowe pola (okazja, alergie, specjalne prośby) lub usunąć niepotrzebne, aby formularz był jak najkrótszy." },
      { q: "Czy mogę ograniczyć liczbę gości na stolik?", a: "Tak. Każdy stolik ma ustawienie „pojemności“ — system nie pozwoli zarezerwować stolika dla 2 osób dla 6. Na większych stolikach możesz ustawić minimum, aby małe grupy nie zajmowały „stolika dla ośmiu“ większym towarzystwom." },
      { q: "Jak trudna jest konfiguracja rezerwacji?", a: "Zajmuje bardzo mało czasu. Trzy kroki: (1) dodaj stoliki z nazwami, zdjęciami i pojemnością, (2) aktywuj tryb rezerwacji w ustawieniach, (3) udostępnij link lub kod QR gościom. Pełne uruchomienie w 5–10 minut." },
      { q: "Czy mogę używać systemu rezerwacji na własnej domenie?", a: "Tak. Wspieramy niestandardową domenę z certyfikatem SSL: goście rezerwują pod adresem Twojej restauracji (np. rezerwacja.twojarestauracja.pl). Pomagamy w konfiguracji DNS; proces trwa 5–10 minut." },
      { q: "Czy mogę skonfigurować automatyczne lub ręczne potwierdzenie?", a: "Tak, tryb ustawiany jest w ustawieniach. Z automatycznym potwierdzeniem gość otrzymuje potwierdzenie natychmiast po wysłaniu formularza i rezerwacja jest uznawana za przyjętą. Z ręcznym potwierdzeniem prośba trafia do panelu administracyjnego ze statusem „oczekuje na potwierdzenie“ — menedżer ją przegląda i potwierdza lub odrzuca. Tryb ręczny przydaje się przy ograniczonej liczbie stolików lub surowych politykach gości." },
      { q: "Pobieracie prowizję od rezerwacji?", a: "Nie. Rezerwacja stolików jest w pełni zawarta w planie Pro — bez procentów od gości, bez opłaty za slot, bez prowizji agregatorów. Stała opłata miesięczna i nieograniczona liczba rezerwacji." },
    ],
  },
};
