import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Meniu de restaurant brandat — Schemă personalizată de culori și temă",
    description:
      "Potrivește brandul restaurantului tău cu culori de accent personalizate. Temele light și dark se schimbă automat cu telefonul oaspetelui. Meniu QR brandat în secunde. 14 zile probă.",
    canonical: "https://iq-rest.com/ro/color-scheme",
    ogLocale: "ro_RO",
    ogTitle: "Schemă personalizată de culori — Meniu de restaurant brandat în secunde",
    ogDescription:
      "Alege culoarea de accent, primește un meniu de restaurant brandat. Mod light/dark auto se adaptează la telefonul fiecărui oaspete. Fără tools de design.",
  },

  hero: {
    title: "Meniul tău. Culorile tale. Brandul tău.",
    subtitle:
      "Alege o culoare de accent, pune-ți logo-ul, iar meniul tău QR arată instant ca un brand real în loc de un șablon. Temele light și dark se schimbă automat cu telefonul fiecărui oaspete — meniul tău arată întotdeauna intenționat.",
    trustLine: "4.9 · 500+ restaurante în 30+ țări",
  },

  seo: {
    description:
      "O schemă personalizată de culori este diferența între un meniu QR generic și o experiență de restaurant brandată. IQ Rest îți permite să alegi exact culoarea de accent (sau să copiezi un cod hex din ghidurile tale de brand), să pui logo-ul, iar întregul meniu — butoane, link-uri, accentuări, etichete de categorii — adoptă culoarea brandului tău în secunde.",
    fullDescription:
      "Majoritatea constructorilor de meniuri QR îți oferă o schemă fixă de culori: albastru sau roșu, ia-l sau lasă-l. IQ Rest tratează brandul tău ca și cum contează — alegi orice culoare de accent dintr-un color picker sau lipești codul hex exact din ghidurile tale de brand (același portocaliu ca pe firmă, același verde ca în logo). Fiecare accent din meniu — butoane primare, link-uri, accentuări de categorii, starea activă din selectorul de limbă — adoptă acea culoare instant.\n\nModurile light și dark sunt gestionate automat. Când telefonul unui oaspete este în mod dark (majoritatea telefoanelor la cină), meniul tău se afișează în mod dark cu culoarea de accent ridicată. Când sunt afară în soare puternic în mod light, meniul se adaptează. Tu nu alegi light sau dark — alegi o culoare de brand, iar meniul face ce trebuie pe fiecare dispozitiv.\n\nLogo-ul tău se află în partea de sus a meniului, pe șablonul de printare al stickerului QR, pe chitanța comenzii și pe email-ul de confirmare a rezervării. Fiecare punct de contact cu oaspetele se simte ca același brand pentru că este același brand. Fără designer, fără sesiune Photoshop, fără pachet scump de „branding pentru restaurant” — doar un color picker și un upload de logo.",
    benefitsHeading: "De ce o schemă de culori brandată convertește mai bine decât o temă implicită",
    benefits: [
      "Alegi orice culoare de accent — color picker sau lipești un cod hex",
      "Mod light/dark auto care se adaptează la telefonul fiecărui oaspete",
      "Plasare logo pe meniu, sticker QR, chitanțe și email-uri",
      "Aspect brandat din primul minut — fără Photoshop sau designer",
      "Schimbi culorile oricând pentru promoții sezoniere (roșu Sf. Valentin, verde Crăciun)",
      "Culoarea rămâne accesibilă — raportele de contrast se ajustează automat pentru lizibilitate",
    ],
  },

  pricing: {
    heading: "Un singur plan.",
    headingAccent: "Culorile brandului tău.",
    sub: "Schemă personalizată de culori plus meniu QR, comenzi online, traducere AI și rezervări — toate la un preț unic. Branding fără designer.",
  },

  faq: {
    sub: "Tot ce întreabă proprietarii de restaurante despre brandarea meniului. Nu vezi întrebarea ta? Scrie-ne pe WhatsApp — răspund oameni reali.",
    items: [
      {
        q: "Pot potrivi culoarea exactă a brandului meu de la logo sau firmă?",
        a: "Da — lipești codul hex exact (ex. #C24A2D), iar meniul folosește exact acea culoare pentru fiecare accent. Auto-generăm o nuanță mai întunecată pentru hover state și o nuanță mai deschisă pentru fundaluri, deci o singură culoare de brand primește o paletă UI completă fără să faci nimic.",
      },
      {
        q: "Suportă meniul mod light și dark?",
        a: "Da, automat. Meniul detectează tema telefonului fiecărui oaspete și schimbă între mod light și dark în timp real. Culoarea ta de accent rămâne aceeași; UI-ul din jur se inversează. Majoritatea restaurantelor nu setează niciodată light vs dark — aleg o culoare și lasă meniul să se adapteze.",
      },
      {
        q: "Pot schimba schema de culori mai târziu?",
        a: "Oricând. Deschizi setările de design, alegi o culoare nouă, salvezi. Fiecare pagină din meniul QR, fluxul de rezervare și UI-ul de comandă se actualizează în câteva secunde. Util pentru promoții sezoniere (roșu pentru Sf. Valentin, verde pentru Crăciun, auriu pentru Anul Nou) — schimbi pentru o săptămână, schimbi înapoi.",
      },
      {
        q: "Unde apare logo-ul meu?",
        a: "În partea de sus a meniului tău QR (lângă numele restaurantului), pe șablonul de printare al stickerului cu codul QR (ca stickerul de pe mese să se potrivească brandului tău), pe chitanțele de confirmare a comenzii și în email-urile de confirmare a rezervării. Îl încarci o dată în PNG sau SVG, este folosit peste tot automat.",
      },
      {
        q: "Ce se întâmplă dacă culoarea brandului meu este greu de citit pe fundalul meniului?",
        a: "Sistemul auto-verifică contrastul și întunecă sau luminează ușor culoarea ta pentru cazurile de utilizare ca text (ca o culoare de brand galben pal să nu apară ca text necitit), păstrând în același timp culoarea ta exactă pentru accente precum butoane și accentuări. Nu trebuie să te gândești la WCAG — meniul o face pentru tine.",
      },
    ],
  },

  finalCta: {
    heading: "Alege o culoare.",
    headingAccent: "Arată ca un brand real.",
    sub: "Schemă personalizată de culori, chitanțe brandate, mod light/dark auto. 14 zile probă gratuită, fără designer, fără card.",
  },
};
