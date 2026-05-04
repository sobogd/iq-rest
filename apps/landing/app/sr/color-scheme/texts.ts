import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Brendirani restoranski meni — prilagođena šema boja i tema",
    description:
      "Uskladite brend svog restorana sa prilagođenim akcent bojama. Svetla i tamna tema se automatski prebacuju sa telefonom gosta. Brendirani QR meni za sekunde. 14-dnevna proba.",
    canonical: "https://iq-rest.com/sr/color-scheme",
    ogLocale: "sr_RS",
    ogTitle: "Prilagođena šema boja — brendirani restoranski meni za sekunde",
    ogDescription:
      "Izaberite svoju akcent boju, dobijte brendirani restoranski meni. Automatski svetli/tamni mod se prilagođava telefonu svakog gosta. Bez alata za dizajn.",
  },

  hero: {
    title: "Vaš meni. Vaše boje. Vaš brend.",
    subtitle:
      "Izaberite akcent boju, ubacite svoj logo, i vaš QR meni odmah izgleda kao pravi brend umesto šablona. Svetla i tamna tema se automatski prebacuju sa telefonom svakog gosta — vaš meni uvek izgleda namerno.",
    trustLine: "4.9 · 500+ restorana u 30+ zemalja",
  },

  seo: {
    description:
      "Prilagođena šema boja je razlika između generičkog QR menija i brendiranog restoranskog iskustva. IQ Rest vam omogućava da izaberete tačnu akcent boju (ili nalepite hex kod iz vaših smernica brenda), ubacite svoj logo, i ceo meni — dugmići, linkovi, isticanja, oznake kategorija — usvaja boju vašeg brenda za sekunde.",
    fullDescription:
      "Većina alata za pravljenje QR menija vam daje fiksnu šemu boja: plavu ili crvenu, uzmite ili ostavite. IQ Rest tretira vaš brend kao da je bitan — izaberite bilo koju akcent boju iz birača boja ili nalepite svoj tačan hex kod iz smernica brenda (ista narandžasta kao vaš znak, ista zelena kao vaš logo). Svaki akcent na meniju — primarni dugmići, linkovi, isticanja kategorija, aktivno stanje u biraču jezika — odmah usvaja tu boju.\n\nSvetli i tamni mod se obrađuju automatski. Kada je telefon gosta u tamnom modu (većina telefona za večerom), vaš meni se prikazuje u tamnom modu sa pojačanom akcent bojom. Kada su napolju na jakom suncu u svetlom modu, meni se prilagođava. Ne birate svetlo ili tamno — birate boju brenda, a meni radi pravu stvar na svakom uređaju.\n\nVaš logo stoji na vrhu menija, na šablonu za štampanje QR nalepnica, na računu narudžbine i na emailu za potvrdu rezervacije. Svaki dodir sa gostom se oseća kao isti brend jer jeste isti brend. Bez potrebe za dizajnerom, bez Photoshop sesije, bez skupog 'paketa za brendiranje restorana' — samo birač boja i otpremanje logoa.",
    benefitsHeading: "Zašto brendirana šema boja bolje konvertuje od podrazumevane teme",
    benefits: [
      "Izaberite bilo koju akcent boju — birač boja ili nalepite hex kod",
      "Automatski svetli/tamni mod koji se prilagođava telefonu svakog gosta",
      "Postavljanje logoa na meniju, QR nalepnici, računima i emailovima",
      "Brendirani izgled od prvog minuta — bez Photoshop-a ili dizajnera",
      "Promenite boje bilo kad za sezonske promocije (Dan zaljubljenih crveno, Božić zeleno)",
      "Boja ostaje pristupačna — odnosi kontrasta se automatski prilagođavaju za čitljivost",
    ],
  },

  pricing: {
    heading: "Jedan paket.",
    headingAccent: "Vaše boje brenda.",
    sub: "Prilagođena šema boja plus QR meni, onlajn poručivanje, AI prevod i rezervacije — sve u jednoj fiksnoj ceni. Brendiranje bez dizajnera.",
  },

  faq: {
    sub: "Sve što vlasnici restorana pitaju o brendiranju menija. Ne vidite svoje pitanje? Pošaljite nam poruku na WhatsApp — odgovaraju pravi ljudi.",
    items: [
      {
        q: "Mogu li uskladiti svoju tačnu boju brenda sa logoa ili znaka?",
        a: "Da — nalepite svoj tačan hex kod (npr. #C24A2D) i meni koristi tu tačnu boju za svaki akcent. Automatski generišemo tamniju nijansu za hover stanja i svetliju nijansu za pozadine, tako da jedna boja brenda dobija punu UI paletu bez vašeg ikakvog rada.",
      },
      {
        q: "Da li meni podržava svetli i tamni mod?",
        a: "Da, automatski. Meni prepoznaje temu telefona svakog gosta i prebacuje između svetlog i tamnog moda u realnom vremenu. Vaša akcent boja ostaje ista; okolni UI se invertuje. Većina restorana nikad ne podešava svetlo naspram tamnog — biraju boju i puštaju meni da se prilagodi.",
      },
      {
        q: "Mogu li promeniti svoju šemu boja kasnije?",
        a: "Bilo kad. Otvorite podešavanja dizajna, izaberite novu boju, sačuvajte. Svaka strana u vašem QR meniju, toku rezervacija i UI poručivanja se ažurira za sekunde. Korisno za sezonske promocije (crvena za Dan zaljubljenih, zelena za Božić, zlatna za Novu godinu) — promenite na nedelju, vratite.",
      },
      {
        q: "Gde se pojavljuje moj logo?",
        a: "Na vrhu vašeg QR menija (pored imena restorana), na šablonu za štampanje QR koda nalepnice (tako da nalepnica na stolovima odgovara vašem brendu), na računima za potvrdu narudžbine i u emailovima za potvrdu rezervacije. Otpremite ga jednom u PNG ili SVG, koristi se svuda automatski.",
      },
      {
        q: "Šta ako mi je boja brenda teško čitljiva u odnosu na pozadinu menija?",
        a: "Sistem automatski proverava kontrast i nežno zatamnjuje ili posvetljuje vašu boju za slučajeve upotrebe teksta (tako da bleda žuta boja brenda neće izgledati kao nečitljiv tekst), dok zadržava vašu tačnu boju za akcente kao što su dugmići i isticanja. Ne morate da razmišljate o WCAG — meni to radi za vas.",
      },
    ],
  },

  finalCta: {
    heading: "Izaberite boju.",
    headingAccent: "Izgledajte kao pravi brend.",
    sub: "Prilagođena šema boja, brendirani računi, automatski svetli/tamni mod. 14-dnevna besplatna proba, bez dizajnera, bez kreditne kartice.",
  },
};
