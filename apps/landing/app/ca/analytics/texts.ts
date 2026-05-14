import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analítica de menú de restaurant — escaneigs QR, plats top, idiomes dels turistes",
    description:
      "Veu exactament com els clients fan servir el teu menú QR. Escaneigs diaris, plats més vistos, preferències d'idioma, hores punta. Decisions basades en dades per al teu restaurant.",
    canonical: "https://iq-rest.com/ca/analytics",
    ogLocale: "ca_ES",
    ogTitle: "Analítica de restaurant — Segueix escaneigs de menú QR, plats i idiomes",
    ogDescription:
      "Sàpigues quins plats miren els teus clients, quines són les hores punta i quina nacionalitat de turistes tens a la sala aquesta nit. 14 dies gratis.",
  },

  hero: {
    title: "Deixa d'endevinar. Sàpigues què fan realment els clients.",
    subtitle:
      "Veu analítica del menú del restaurant en temps real — escaneigs QR per hora, plats on els clients s'aturen, idiomes que fan servir els turistes, el dia més fluix de la setmana — i fes servir aquestes dades per imprimir menys menús, planificar millor els torns, empènyer els plats del dia adequats.",
    trustLine: "Més de 500 restaurants en més de 30 països",
  },

  seo: {
    description:
      "Analítica de restaurant que no requereix un equip de dades. IQ Rest segueix cada escaneig, visualització, canvi d'idioma i comanda del teu menú QR i mostra els patrons que importen: plats més vistos, hores punta d'escaneigs, dia més actiu de la setmana, distribució d'idiomes dels teus turistes. Pren decisions basades en dades sense obrir mai un full de càlcul.",
    fullDescription:
      "La majoria de restaurants funcionen per intuïció — 'tenim la sensació que els dimarts són fluixos', 'crec que la pasta es ven bé'. La intuïció és bona, però les dades són millors. IQ Rest segueix cada interacció amb el teu menú QR perquè no hagis d'endevinar: quants cops s'ha escanejat el QR avui, quins plats s'han mirat més estona, quins han afegit a la cistella però no han demanat, quins idiomes han fet servir els turistes.\n\nEl panell d'analítica mostra les respostes en tres vistes: avui (escaneigs en directe, comandes actuals, què s'està demanant ara), aquesta setmana (top 10 de plats, hores punta, distribució d'idiomes, absències a reserves) i tendències (creixement mes a mes, estacionalitat, patrons per dia de la setmana). Pots entrar a qualsevol plat per veure quants cops es mira vs es demana (un plat vist 200 cops però demanat 5 té un problema de copy o foto), o a qualsevol idioma per veure quina barreja de turistes estàs servint realment.\n\nL'objectiu són decisions, no dashboards: 'el dimarts vinent és històricament fluix → llança una notificació push d'happy hour', 'els turistes italians demanen pasta 3x més que els locals → posa la pasta primer quan idioma=it', 'aquest plat té un 90% de visualitzacions però un 5% de comandes → millora la foto'. Canvis reals, ingressos reals, sense MBA.",
    benefitsHeading: "Per què els restaurants prefereixen l'analítica d'IQ Rest a Google Analytics",
    benefits: [
      "Comptador d'escaneigs QR en directe — veu com s'omple la teva nit en temps real",
      "Plats més vistos i més demanats — detecta què funciona i què no",
      "Distribució d'idiomes — sàpigues quins turistes tens a la sala",
      "Hores punta i patrons per dia de la setmana — planifica torns i preparació amb cap",
      "Conversió de visualització a comanda per plat — corregeix fotos dolentes i descripcions febles",
      "Analítica de reserves — fonts de reserva, taxa d'absències, barreja de mides de grup",
    ],
  },

  pricing: {
    heading: "Un sol pla.",
    headingAccent: "Analítica completa inclosa.",
    sub: "Analítica de restaurant, comandes QR, traducció per IA i reserves — tot en un únic preu fix. Sense nivell premium per a dades, mai.",
  },

  faq: {
    sub: "Tot el que els restauradors pregunten sobre l'analítica del menú. No hi veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    items: [
      {
        q: "Què puc veure realment al panell d'analítica?",
        a: "Escaneigs QR en directe (avui, aquesta setmana, aquest mes), plats més vistos, plats més demanats, conversió de visualització a comanda per plat, distribució d'idiomes dels clients, hores punta per dia de la setmana, tiquet mitjà, taules més actives, taxa d'absències a reserves i tendències al llarg del temps. Tot a un sol panell, sense configuració.",
      },
      {
        q: "Com faig servir això per fer créixer els ingressos?",
        a: "Tres patrons funcionen per a la majoria de restaurants: (1) reordena el menú perquè els plats amb millor conversió surtin primer; (2) corregeix la foto o descripció dels plats amb moltes visualitzacions però poques comandes; (3) llança un happy hour o un especial en dies/hores històricament fluixos. Hem vist restaurants augmentar els ingressos entre setmana entre un 15–30% només amb aquests tres canvis.",
      },
      {
        q: "Això és anònim o esteu seguint persones individualment?",
        a: "Anònim i agregat. Seguim visualitzacions de menú i comandes per sessió, no per usuari identificable. Sense correus, sense telèfons, sense adreces IP guardades a llarg termini. El panell mostra patrons ('200 escaneigs el divendres'), no persones. Compatible amb el RGPD per disseny.",
      },
      {
        q: "Puc exportar les dades?",
        a: "Sí. Exporta qualsevol vista com a CSV (top de plats, escaneigs diaris, distribució horària, etc.) i obre-la a Excel o Google Sheets. Útil per compartir amb inversors, comptables o per combinar amb les dades del POS.",
      },
      {
        q: "Cal alguna configuració tècnica per tenir analítica?",
        a: "Cap. L'analítica està activada per defecte des del moment en què el teu menú QR és en directe — cada escaneig, visualització i comanda se segueix automàticament. El panell forma part de la subscripció estàndard, no és un upsell, i veuràs dades útils el primer dia que els clients comencin a escanejar.",
      },
    ],
  },

  finalCta: {
    heading: "Deixa d'endevinar.",
    headingAccent: "Comença a mesurar.",
    sub: "Analítica en directe d'escaneigs QR, plats top, hores punta, distribució d'idiomes dels turistes. 14 dies gratis, sense targeta.",
  },
};
