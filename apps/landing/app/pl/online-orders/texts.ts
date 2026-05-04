import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Zamówienia online z menu QR — restauracja bez prowizji",
    description:
      "Przyjmuj zamówienia bezpośrednio z menu QR. Zero prowizji, bez prowizji Uber Eats / Glovo. Goście skanują, zamawiają, płacą — wprost do Ciebie. 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/online-orders",
    ogLocale: "pl_PL",
    ogTitle: "Zamówienia online bez prowizji — bezpośrednie zamówienia z menu QR",
    ogDescription:
      "Zastąp 30% prowizji z aplikacji dostawczych zamówieniami bezpośrednimi. Goście skanują QR, zamawiają, płacą — każdy grosz trafia do Ciebie. 14 dni za darmo, bez karty.",
  },

  hero: {
    title: "Zamówienia bezpośrednie. Zero prowizji. Prosto do kuchni.",
    subtitle:
      "Przestań oddawać 30% Uber Eats, Glovo i Wolt. Z IQ Rest goście skanują kod QR, składają zamówienie z telefonu, a bonik trafia prosto do Twojej kuchni — każdy grosz zostaje u Ciebie.",
    trustLine: "4,9 · ponad 500 restauracji w 30+ krajach",
  },

  seo: {
    description:
      "Zamień menu QR w pełnoprawny system zamówień online bez oddawania 30% aplikacjom dostawczym. Goście skanują kod, przeglądają menu w swoim języku, kompletują koszyk, składają zamówienie — a Ty otrzymujesz je z numerem stolika, natychmiast. Bez instalowania aplikacji, bez prowizji, bez pośrednika między Tobą a gościem.",
    fullDescription:
      "Większość restauracji traci pieniądze, zanim jedzenie wyjedzie z kuchni — Uber Eats bierze 30%, Glovo bierze 30%, Wolt bierze 30%. Zamówienia online przez IQ Rest działają zupełnie inaczej. Zamówienie trafia prosto z telefonu gościa do Twojego panelu, a cała marża zostaje u Ciebie.\n\nUX zamówień został zaprojektowany specjalnie pod restaurację: gość wybiera stolik, przegląda menu, dodaje pozycje do koszyka, dopisuje uwagę dla kuchni i wysyła. Nowe zamówienia widzisz w czasie rzeczywistym na telefonie lub ekranie kuchennym, z numerem stolika, pozycjami, modyfikatorami i notatkami. Oznaczasz danie jako gotowe — gość widzi status, a Twoi kelnerzy oszczędzają dziesiątki kursów na zmianę.\n\nDziała też dla zamówień na wynos i odbiór: goście skanują naklejkę QR przy wejściu, składają zamówienie i płacą — nie potrzebujesz osobnej aplikacji, osobnej strony ani projektu integracji ze Stripe.",
    benefitsHeading: "Dlaczego zamówienia bezpośrednie przez IQ Rest biją aplikacje dostawcze",
    benefits: [
      "Zero prowizji od każdego zamówienia — zatrzymujesz 100% przychodu",
      "Zamówienia lecą do panelu z numerem stolika w czasie rzeczywistym",
      "Bez aplikacji dla gości — skanują QR i zamawiają w przeglądarce",
      "Modyfikatory, komentarze, uwagi dietetyczne — wszystko czytelnie",
      "Działa na sali, na wynos i przy odbiorze — jedno menu, trzy ścieżki",
      "Wbudowane podpowiedzi up-sellingu zwiększają wartość zamówienia",
    ],
  },

  pricing: {
    heading: "Jeden plan.",
    headingAccent: "Zero prowizji.",
    sub: "Zamówienia bezpośrednie, menu QR, strona restauracji i rezerwacje — wszystko w cenie. Bez opłat za zamówienie, bez projektu integracji Stripe.",
  },

  faq: {
    sub: "Wszystko, o co restauratorzy pytają o zamówienia online. Nie ma Twojego pytania? Napisz do nas na WhatsApp — odpowiadają prawdziwi ludzie.",
    items: [
      {
        q: "Czy bierzecie prowizję od zamówień?",
        a: "Zero. Każde zamówienie z menu QR trafia prosto do Ciebie — bez naszej prowizji i bez opłat dla Glovo / Uber Eats. Jedna stała miesięczna subskrypcja, koniec. Matematyka jest prosta: jeśli masz 25 000 zł miesięcznie z aplikacji dostawczych, tracisz 7 500 zł. Przejdź na zamówienia bezpośrednie i te 7 500 zł zostaje w Twojej kieszeni.",
      },
      {
        q: "Jak goście składają zamówienie — czy potrzebują aplikacji?",
        a: "Bez aplikacji. Gość skanuje kod QR aparatem telefonu, menu otwiera się w przeglądarce, wybiera stolik, przegląda, dodaje do koszyka i wysyła. Cały proces to dwa stuknięcia po skanowaniu. Bez App Store, bez rejestracji, bez tarcia.",
      },
      {
        q: "Jak odbieram zamówienia w kuchni?",
        a: "Zamówienia pojawiają się od razu w panelu, z numerem stolika, pozycjami, modyfikatorami i uwagami. Wyświetlasz je na telefonie, na tablecie przy wydawce lub na ekranie kuchennym. Oznacz pozycje jako gotowe — gość widzi status, mniej pytań „czy jedzenie już idzie?\", szybsza rotacja stolików.",
      },
      {
        q: "Czy goście mogą płacić przez menu QR, czy tylko przy stoliku?",
        a: "Jedno i drugie. Mogą złożyć zamówienie i zapłacić gotówką lub kartą przy stoliku, albo zapłacić online przez Stripe bezpośrednio z menu. Ty decydujesz, co jest włączone. Płatności online zabezpiecza Stripe — IQ Rest nigdy nie trzyma Twoich pieniędzy, idą prosto na Twoje konto Stripe.",
      },
      {
        q: "Czy działa też dla na wynos i odbioru, nie tylko na sali?",
        a: "Tak. Naklej naklejkę QR przy wejściu na zamówienia na wynos albo udostępnij link do menu na Instagramie i WhatsApp. Goście wybierają „odbiór\", zamawiają, płacą — Ty przygotowujesz, oni odbierają. Ten sam system, trzy różne ścieżki: na miejscu, na wynos, odbiór.",
      },
    ],
  },

  finalCta: {
    heading: "Przestań karmić aplikacje dostawcze.",
    headingAccent: "Zacznij zatrzymywać 100%.",
    sub: "Zamień 30% prowizji na stałą miesięczną opłatę. 14 dni za darmo. Bez karty kredytowej. Anuluj kiedy chcesz.",
  },
};
