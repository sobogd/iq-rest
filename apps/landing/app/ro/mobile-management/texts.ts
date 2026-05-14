import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Gestionează-ți restaurantul de pe telefon — Dashboard mobil pentru restaurant",
    description:
      "Adaugă preparate, schimbă prețuri, încarcă poze, vezi comenzi — totul de pe telefon. Întregul dashboard IQ Rest este mobile-first. Fără calculator, niciodată.",
    canonical: "https://iq-rest.com/ro/mobile-management",
    ogLocale: "ro_RO",
    ogTitle: "Gestionare mobilă restaurant — Rulează-ți meniul de pe telefon",
    ogDescription:
      "Actualizezi prețuri între mese. Încărci poze din cameră. Vezi comenzi live pe linie. Întregul dashboard IQ Rest rulează pe telefonul tău.",
  },

  hero: {
    title: "Rulează-ți restaurantul de pe telefon. Între mese.",
    subtitle:
      "Întregul dashboard IQ Rest este construit mobile-first — adaugi preparate, schimbi poze, modifici prețuri și citești comenzi live de pe același telefon din buzunarul șorțului. Fără laptop, fără calculator de back-office, fără scuze.",
    trustLine: "500+ restaurante în 30+ țări",
  },

  seo: {
    description:
      "Proprietarii de restaurante nu stau la birou — sunt în spatele barului, în bucătărie, pe sală. IQ Rest este construit pentru această realitate. Fiecare funcție din dashboard, de la adăugarea de preparate noi la vizualizarea comenzilor live, a fost gândită pentru degete și ecrane mici în primul rând. Dacă știi să folosești Instagram, poți rula întregul restaurant din IQ Rest pe telefonul tău.",
    fullDescription:
      "Majoritatea software-urilor de gestionare a restaurantelor sunt desktop-first cu o „versiune mobilă” lipită ulterior — butoane mici, layout-uri stricate și funcții ascunse trei meniuri mai jos. IQ Rest a fost gândit invers: fiecare ecran funcționează perfect pe telefon, iar versiunea desktop este doar același UI scalat.\n\nCe înseamnă asta în practică: faci o poză specialității zilei cu camera telefonului și o încarci direct în meniu. Observi o greșeală de tipar la o descriere de preparat în timp ce strângi o masă — o repari pe loc, schimbarea este live în secunde. Pleacă un bucătar? Scoți preparatul offline de pe telefon înainte ca următorul oaspete să scaneze QR-ul. Preparat nou de la bucătărie? Atingi, scrii, faci o poză, setezi prețul — oaspeții pot comanda 30 de secunde mai târziu.\n\nLa fel pentru comenzi, rezervări, analize și traduceri. Lista de comenzi live se actualizează în timp real. Confirmările de rezervări sunt cu o singură atingere. Veniturile zilnice, top preparate și cele mai aglomerate ore încap pe un singur ecran de telefon. Nu mai trebuie să mergi vreodată la back-office să gestionezi ceva.",
    benefitsHeading: "De ce gestionarea mobile-first schimbă totul",
    benefits: [
      "Acces complet la dashboard de pe orice smartphone sau tabletă — fără aplicație de instalat",
      "Încarci poze de preparate direct din camera telefonului în două atingeri",
      "Actualizezi prețuri, descrieri, ore de funcționare de oriunde",
      "Drag-and-drop touch-friendly pentru categorii și ordonarea preparatelor",
      "Comenzi live, rezervări și analize încap pe un singur ecran de telefon",
      "Funcționează tolerant offline — termini editarea, se sincronizează la reconectare",
    ],
  },

  pricing: {
    heading: "Un singur plan.",
    headingAccent: "Rulează de pe telefon.",
    sub: "Dashboard mobile-first plus meniu QR, comenzi online, traducere AI și rezervări — toate la un preț unic.",
  },

  faq: {
    sub: "Tot ce întreabă proprietarii de restaurante despre gestionarea mobilă. Nu vezi întrebarea ta? Scrie-ne pe WhatsApp — răspund oameni reali.",
    items: [
      {
        q: "Trebuie să instalez o aplicație mobilă?",
        a: "Nu. IQ Rest rulează în browser-ul telefonului tău — Safari, Chrome, oricare folosești deja. Îl poți adăuga pe ecranul de start pentru acces într-o singură atingere (va părea o aplicație nativă), dar nu există nimic de descărcat din App Store, fără permisiuni de acordat, fără actualizări de versiune de gestionat.",
      },
      {
        q: "Pot încărca chiar poze de meniu direct de pe telefon?",
        a: "Da — exact ăsta e scopul. Atingi „adaugă poză” pe un preparat, camera telefonului se deschide, faci poza sau alegi din galerie, încarci. Imaginea se redimensionează automat, se optimizează pentru web și este live pe meniu în secunde. Fără Lightroom, fără transferuri de fișiere pe calculator, fără SFTP.",
      },
      {
        q: "Funcționează pe tablete și la recepție?",
        a: "Da. Dashboard-ul este optimizat pentru telefoane, tablete și calculatoare desktop — același UI, aceleași scurtături, aceeași viteză. Multe restaurante rulează un iPad la stația de gazdă pentru rezervări, un telefon în buzunarul bucătarului pentru comenzi și un laptop în back-office pentru facturare — toate cu același login.",
      },
      {
        q: "Cum stau lucrurile cu actualizarea prețurilor în timpul unui serviciu aglomerat?",
        a: "Conceput pentru asta. Atingi un preparat, editezi prețul, salvezi — oaspeții văd noul preț în câteva secunde fără reîmprospătare. Fără re-publicare, fără reconstrucție, fără întârziere de sincronizare. La fel pentru a marca un preparat ca „epuizat” (devine gri instant pe meniu) sau pentru a adăuga un special al zilei între ture.",
      },
      {
        q: "Ce se întâmplă dacă moare telefonul în timpul editării?",
        a: "Editările sunt salvate per câmp pe măsură ce scrii — dacă telefonul moare sau internetul cade, vei găsi modificările tot acolo când te reconectezi de pe orice dispozitiv. Fără pierderi de muncă.",
      },
    ],
  },

  finalCta: {
    heading: "Rulează-l din buzunarul șorțului.",
    headingAccent: "Sari peste back-office.",
    sub: "Întregul dashboard încape pe telefonul tău. 14 zile probă gratuită, fără card, fără aplicație de instalat.",
  },
};
