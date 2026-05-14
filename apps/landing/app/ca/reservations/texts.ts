import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Sistema de reserves per a restaurant — Reserves de taula 24/7, sense trucades",
    description:
      "Accepta reserves de taula per a restaurant 24/7 des del teu menú QR i web. Widget de reserves amb la teva marca, recordatoris per correu, menys absències. 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/reservations",
    ogLocale: "ca_ES",
    ogTitle: "Reserves de restaurant — Sistema de reserva de taules 24/7 per a restaurants",
    ogDescription:
      "Deixa de perdre reserves mentre cuines. Els clients reserven 24/7 des del teu menú QR, reben recordatoris per correu i tu redueixes les absències. 14 dies gratis.",
  },

  hero: {
    title: "Deixa de perdre reserves mentre cuines.",
    subtitle:
      "Accepta reserves de taula per a restaurant 24/7 — directament des del teu menú QR, web i Instagram. Els clients trien data, hora i nombre de comensals, tu confirmes amb un toc, els recordatoris per correu surten automàticament. Menys trucades, menys absències, més clients per nit.",
    trustLine: "Més de 500 restaurants en més de 30 països",
  },

  seo: {
    description:
      "Un sistema complet de reserves de restaurant integrat al teu menú QR. Els clients reserven taula des del menú, des de la teva web, des del link de la bio d'Instagram o d'un botó de Google Maps — a qualsevol hora, dia o nit. Tu veus les reserves noves en temps real, confirmes o rebutges amb un toc, i el sistema envia recordatoris per correu que retallen dràsticament les absències. Sense la part d'OpenTable, sense comissió per cobert, sense contracte.",
    fullDescription:
      "Les reserves per telèfon estan morint. Els turistes no truquen (codi de país diferent, barrera lingüística), els millennials no truquen (generació de text primer) i perds la meitat de les reserves durant el servei quan ningú agafa el telèfon. Les reserves d'IQ Rest viuen on els teus clients ja són: al menú, al navegador del mòbil, al link de la bio d'Instagram.\n\nEl flux de reserva són dues pantalles — trien data i nombre de comensals, deixen nom i telèfon, opcionalment afegeixen una nota ('aniversari', 'al·lèrgia: fruits secs', 'cadireta per a nadons'). Reps la reserva a l'instant amb confirmació/rebuig amb un toc. Els clients confirmats reben un recordatori automàtic per correu 24h abans, que ja sol per si mateix retalla les absències un ~30%. També pots establir el màxim de coberts per franja, dies bloquejats i quines taules són reservables vs només walk-in.\n\nA diferència d'OpenTable o TheFork, no hi ha cap comissió per cobert, ni una app a part per descarregar, ni terceres parts entre tu i el client. La reserva és teva, les dades són teves i el sistema forma part de la teva subscripció — no és un impost per reserva.",
    benefitsHeading: "Per què els restaurants deixen OpenTable per les reserves d'IQ Rest",
    benefits: [
      "Reserves 24/7 des del menú QR, web, Instagram, botó de Google Maps",
      "Sense comissió per cobert — quota fixa, queda't el 100% dels ingressos",
      "Recordatoris per correu automàtics retallen absències un ~30% de mitjana",
      "Confirmar / rebutjar amb un toc des del mòbil, sense sala d'espera",
      "Màxim de coberts per franja, dies bloquejats, regles per taula",
      "Peticions especials (al·lèrgies, aniversaris) capturades amb netedat a cada reserva",
    ],
  },

  pricing: {
    heading: "Un sol pla.",
    headingAccent: "Reserves il·limitades.",
    sub: "Reserves, menú QR, comandes en línia i traducció per IA — tot en un únic preu fix. Sense quotes per cobert, sense comissió, sense contracte.",
  },

  faq: {
    sub: "Tot el que els restauradors pregunten sobre reserves en línia. No hi veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    items: [
      {
        q: "Cobreu comissió per reserva com OpenTable o TheFork?",
        a: "Cap. Les reserves formen part de la teva subscripció mensual fixa — reserva 10 coberts al dia o 1.000, el preu és idèntic. Sense quota per cobert, sense impost per reserva, sense part dels teus ingressos. Comparat amb 1–2,50 €/cobert d'OpenTable, un restaurant que faci 50 coberts al dia s'estalvia 1.500–3.750 €/mes.",
      },
      {
        q: "Com reserven els clients — han de descarregar una app?",
        a: "Sense app. Escanegen el teu QR o fan clic al teu link de reserva — data, hora, nombre de comensals, nom, telèfon, nota opcional. Fet. Tot el flux és per sota dels 30 segons i funciona a qualsevol navegador. També pots incrustar el formulari de reserva directament a la teva web o compartir un URL net de reserves a Instagram.",
      },
      {
        q: "Puc confirmar reserves manualment o s'autoconfirmen?",
        a: "Tots dos modes — la teva tria per franja o per dia. Autoconfirmació si confies en la teva disponibilitat i vols semblar reactiu 24/7. Confirmació manual si vols filtrar reserves (caps de setmana plens, esdeveniments especials). Reps la reserva a l'instant i confirmes amb un toc al mòbil.",
      },
      {
        q: "Com gestiona el sistema les absències?",
        a: "Surten recordatoris automàtics per correu 24h i (opcionalment) 2h abans de la reserva — només això retalla les absències un ~30% respecte a trucades o sistemes sense recordatori. També pots exigir un número de telèfon, marcar clients com a 'absents' al panell, i amb el temps el sistema senyala reincidents.",
      },
      {
        q: "Puc limitar quants coberts accepto per nit?",
        a: "Sí. Estableix màxims de coberts per franja, màxims per dia i dies bloquejats (tancaments, esdeveniments privats). Fins i tot pots marcar taules concretes com a 'reservables' vs 'només walk-in', perquè les teves taules més cobejades quedin lliures per a qui aparegui. Turistes i locals reserven al mateix sistema sense trepitjar mai el teu pla de sala.",
      },
    ],
  },

  finalCta: {
    heading: "Reserves mentre cuines.",
    headingAccent: "Recordatoris perquè vinguin.",
    sub: "Accepta reserves 24/7 des del teu menú QR, web i Instagram. 14 dies gratis, sense targeta, sense comissió per cobert.",
  },
};
