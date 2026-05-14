import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Editor fàcil de menú de restaurant — drag-and-drop, en directe en segons",
    description:
      "Afegeix categories, plats i fotos amb la simplicitat del drag-and-drop. Els canvis es publiquen a l'instant. L'editor de menú de restaurant més senzill — sense habilitats de disseny.",
    canonical: "https://iq-rest.com/ca/easy-menu",
    ogLocale: "ca_ES",
    ogTitle: "Editor de menú drag-and-drop — La forma més senzilla de muntar un menú de restaurant",
    ogDescription:
      "Crea un menú de restaurant bonic en minuts. Arrossega per reordenar, toca per afegir un plat, fes la foto. En directe per als clients en segons — sense eines de disseny.",
  },

  hero: {
    title: "Munta el menú en minuts. Edita'l per sempre.",
    subtitle:
      "Toca per afegir una categoria, toca per afegir un plat, arrossega per reordenar, fes la foto des del mòbil. L'editor de menú per a restaurant més senzill del mercat — i cada canvi és en directe per als clients en segons.",
    trustLine: "Més de 500 restaurants en més de 30 països",
  },

  seo: {
    description:
      "Muntar un menú de restaurant no hauria d'exigir un dissenyador, un desenvolupador ni un curs de CMS. L'editor de menú d'IQ Rest és el contrari de WordPress: toca per afegir, arrossega per reordenar, llisca per esborrar. Les categories agrupen plats, els plats tenen descripcions, preus, fotos i modificadors — i els clients escanegen el teu QR per veure exactament el que has muntat, en la seva llengua, a qualsevol mòbil.",
    fullDescription:
      "La majoria de constructors de menús per a restaurants són o massa simples (Google Sheets disfressat) o massa complicats (CMS complet per a enginyers). L'editor d'IQ Rest està fet per a restauradors que no tenen temps d'aprendre programari — cada acció és un o dos tocs, i el resultat sembla fet per un dissenyador.\n\nAfegeix una categoria que es digui 'Entrants', arrossega-la per sobre de 'Principals'. Toca 'afegir plat', escriu 'Bruschetta amb tomàquet cherry', posa 8,50 €, fes la foto. Et fa falta una etiqueta vegana? Un toc. Al·lergen per fruits secs? Un toc. Preu diferent per al menú del migdia? Canvies de menú, poses un altre preu per al mateix plat. Esgotat aquesta nit? Pressió llarga, marca com a esgotat — surt en gris al menú a l'instant.\n\nLa mateixa simplicitat s'aplica a l'organització: arrossega plats entre categories, reordena categories, amaga una secció sencera durant un esdeveniment privat sense esborrar res. Error? Pressió llarga, restaura. Tot l'editor s'ha dissenyat assumint que tens el mòbil amb una mà mentre fas alguna altra cosa amb l'altra — perquè és com treballen realment els restauradors.",
    benefitsHeading: "Per què l'editor de menú d'IQ Rest és més ràpid que escriure",
    benefits: [
      "Reordenació drag-and-drop per a categories i plats",
      "Foto i pujada directament des de la càmera del mòbil",
      "Al·lèrgens, etiquetes dietètiques, modificadors i notes — tot d'un toc",
      "Marca plats com a esgotats a l'instant sense esborrar-los",
      "Suport multi-menú: menú del migdia, sopar, carta de begudes, menú de cap de setmana",
      "Cada canvi és en directe per als clients en segons — sense pas de publicació",
    ],
  },

  pricing: {
    heading: "Un sol pla.",
    headingAccent: "Canvis de menú il·limitats.",
    sub: "Editor de menú fàcil més comandes QR, traducció per IA i reserves — tot en un únic preu fix. Edita tant com vulguis, sense límits.",
  },

  faq: {
    sub: "Tot el que els restauradors pregunten sobre l'editor de menú. No hi veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    items: [
      {
        q: "Necessito habilitats de disseny o tècniques per muntar el menú?",
        a: "Cap. Si saps fer servir Instagram, saps muntar un menú a IQ Rest. Toca 'afegir categoria', escriu un nom. Toca 'afegir plat', escriu el nom i el preu, fes la foto. No hi ha selector de tipografia, ni roda de colors, ni CSS — el teu menú hereta un disseny net que ja sembla professional, i pots canviar els colors d'accent més tard amb un clic.",
      },
      {
        q: "Quant triga muntar el primer menú?",
        a: "Uns 1–3 minuts per plat si tens fotos al mòbil. Un menú de 30 plats triga 30–90 minuts el primer cop. Després, afegir un plat nou o un plat del dia triga 30 segons.",
      },
      {
        q: "Puc tenir un menú del migdia i un de sopar separats?",
        a: "Sí — el suport multi-menú està integrat. Crea tants menús com vulguis (migdia, sopar, brunch, begudes, menú infantil, especials de cap de setmana), assigna horaris diferents a cadascun, i el correcte es mostra automàticament segons l'hora del dia. També pots reutilitzar el mateix plat a diversos menús amb preus diferents (per exemple 12 € al sopar, 8 € al migdia).",
      },
      {
        q: "I al·lèrgens, etiquetes veganes i informació dietètica?",
        a: "Integrat. Cada plat té etiquetes activables per a vegà, vegetarià, sense gluten, sense lactosa, més senyals d'al·lèrgens per a fruits secs, ous, marisc, etc. Els clients poden filtrar el menú per veure només plats que poden menjar — augmentant el confort i la finalització de comandes per a clients amb restriccions alimentàries.",
      },
      {
        q: "Puc amagar un plat temporalment sense esborrar-lo?",
        a: "Sí. Pressió llarga sobre un plat i tria 'marcar com a esgotat' — es queda al menú però surt en gris per als clients amb l'etiqueta 'no disponible'. Un toc per tornar-lo quan tinguis estoc. El mateix s'aplica a categories senceres — amaga el menú del migdia durant el servei de sopar sense perdre res.",
      },
    ],
  },

  finalCta: {
    heading: "Toca. Escriu. Fet.",
    headingAccent: "En directe en segons.",
    sub: "L'editor de menú per a restaurant més senzill que ha conegut el teu mòbil. 14 dies gratis, sense targeta, sense habilitats de disseny.",
  },
};
