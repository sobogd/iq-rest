import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Menú de restaurant amb la teva marca — esquema de colors i tema personalitzats",
    description:
      "Fes coincidir la marca del teu restaurant amb colors d'accent personalitzats. Els temes clar i fosc canvien automàticament amb el mòbil del client. Menú QR amb la teva marca en segons. 14 dies de prova.",
    canonical: "https://iq-rest.com/ca/color-scheme",
    ogLocale: "ca_ES",
    ogTitle: "Esquema de colors personalitzat — Menú de restaurant amb la teva marca en segons",
    ogDescription:
      "Tria el teu color d'accent, queda't amb un menú de restaurant amb la teva marca. Mode clar/fosc automàtic adaptat al mòbil de cada client. Sense eines de disseny.",
  },

  hero: {
    title: "El teu menú. Els teus colors. La teva marca.",
    subtitle:
      "Tria un color d'accent, posa el teu logo i el teu menú QR sembla immediatament una marca de debò en lloc d'una plantilla. Els temes clar i fosc canvien automàticament amb el mòbil de cada client — el teu menú sempre sembla intencional.",
    trustLine: "4,9 · més de 500 restaurants en més de 30 països",
  },

  seo: {
    description:
      "Un esquema de colors personalitzat és la diferència entre un menú QR genèric i una experiència de restaurant amb marca. IQ Rest et permet triar el color d'accent exacte (o enganxar un codi hex de les teves guidelines de marca), posar el teu logo, i tot el menú — botons, enllaços, ressaltats, etiquetes de categoria — adopta el teu color de marca en segons.",
    fullDescription:
      "La majoria de constructors de menús QR et donen un esquema de colors fix: blau o vermell, ho agafes o ho deixes. IQ Rest tracta la teva marca com si importés — tria qualsevol color d'accent d'un selector de colors o enganxa el teu codi hex exacte de les guidelines de marca (el mateix taronja que el teu rètol, el mateix verd que el teu logo). Cada accent del menú — botons primaris, enllaços, ressaltats de categoria, l'estat actiu del selector d'idioma — adopta aquest color a l'instant.\n\nEl mode clar i el mode fosc es gestionen automàticament. Quan el mòbil d'un client està en mode fosc (la majoria de mòbils a sopar), el teu menú es mostra en mode fosc amb el color d'accent realçat. Quan són al carrer al sol amb mode clar, el menú s'adapta. No tries clar o fosc — tries un color de marca i el menú fa la cosa correcta a cada dispositiu.\n\nEl teu logo s'asseu a la part superior del menú, a la plantilla d'impressió de l'adhesiu QR, al rebut de comanda i al correu de confirmació de reserva. Cada punt de contacte amb el client sembla la mateixa marca perquè és la mateixa marca. Sense dissenyador, sense sessió de Photoshop, sense 'pack de branding per a restaurant' car — només un selector de colors i una pujada de logo.",
    benefitsHeading: "Per què un esquema de colors amb marca converteix millor que un tema per defecte",
    benefits: [
      "Tria qualsevol color d'accent — selector de colors o enganxa un codi hex",
      "Mode clar/fosc automàtic que s'adapta al mòbil de cada client",
      "Col·locació del logo al menú, adhesiu QR, rebuts i correus",
      "Aspecte amb marca des del primer minut — sense Photoshop ni dissenyador",
      "Canvia colors quan vulguis per a promocions estacionals (vermell de Sant Valentí, verd de Nadal)",
      "El color es manté accessible — les ràtios de contrast s'ajusten automàticament per a la llegibilitat",
    ],
  },

  pricing: {
    heading: "Un sol pla.",
    headingAccent: "Els colors de la teva marca.",
    sub: "Esquema de colors personalitzat més menú QR, comandes en línia, traducció per IA i reserves — tot en un únic preu fix. Branding sense dissenyador.",
  },

  faq: {
    sub: "Tot el que els restauradors pregunten sobre marcar el menú. No hi veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    items: [
      {
        q: "Puc fer servir el color exacte de la meva marca a partir del logo o el rètol?",
        a: "Sí — enganxa el teu codi hex exacte (per exemple, #C24A2D) i el menú fa servir aquest color exacte per a cada accent. Generem automàticament un to més fosc per als estats de hover i un to més clar per als fons, perquè un sol color de marca aconsegueix una paleta d'UI completa sense que facis res.",
      },
      {
        q: "El menú admet mode clar i mode fosc?",
        a: "Sí, automàticament. El menú detecta el tema del mòbil de cada client i alterna entre clar i fosc en temps real. El teu color d'accent es manté igual; la UI del voltant s'inverteix. La majoria de restaurants no escullen mai clar vs fosc — trien un color i deixen que el menú s'adapti.",
      },
      {
        q: "Puc canviar l'esquema de colors més tard?",
        a: "Quan vulguis. Obre la configuració de disseny, tria un color nou, desa. Cada pàgina del menú QR, el flux de reserves i la UI de comandes s'actualitza en segons. Útil per a promocions estacionals (vermell per a Sant Valentí, verd per a Nadal, daurat per a Cap d'Any) — canvia per una setmana, torna enrere.",
      },
      {
        q: "On apareix el meu logo?",
        a: "A la part superior del menú QR (al costat del nom del restaurant), a la plantilla d'impressió de l'adhesiu del codi QR (perquè l'adhesiu de les taules combini amb la teva marca), als rebuts de confirmació de comanda i als correus de confirmació de reserva. Pugeu un cop en PNG o SVG, es fa servir a tot arreu automàticament.",
      },
      {
        q: "I si el color de la meva marca és difícil de llegir contra el fons del menú?",
        a: "El sistema comprova automàticament el contrast i enfosqueix o aclareix suaument el teu color per a casos d'ús de text (perquè un color de marca groc pàl·lid no aparegui com a text il·legible), tot mantenint el teu color exacte per a accents com botons i ressaltats. No has de pensar en WCAG — el menú ho fa per tu.",
      },
    ],
  },

  finalCta: {
    heading: "Tria un color.",
    headingAccent: "Sembla una marca de debò.",
    sub: "Esquema de colors personalitzat, rebuts amb la marca, mode clar/fosc automàtic. 14 dies gratis, sense dissenyador, sense targeta.",
  },
};
