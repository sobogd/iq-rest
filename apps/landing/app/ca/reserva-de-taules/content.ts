import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ca",
  slug: "reserva-de-taules",
  trackPrefix: "l_ca_bookings",

  meta: {
    title: "Reserva de taules 24/7 per a restaurants | IQ Rest",
    description:
      "Reserva de taules 24/7 per a restaurants: els clients reserven ells mateixos a través de la carta QR o el web. Calendari per taula, confirmacions i recordatoris automàtics. Cap client perdut. 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/reserva-de-taules",
    ogLocale: "ca_ES",
    ogTitle: "Reserva de taules 24/7 — els clients reserven sols",
    ogDescription:
      "Els clients reserven taules via carta QR o web. Calendari, confirmacions automàtiques, recordatoris. Cap client perdut.",
    brandLine: "IQ Rest — Reserva de taules per a restaurants",
  },

  hero: {
    headline: "Reserva de taules 24/7 — els clients reserven sols.",
    sub: "Els clients reserven taules a través de la carta QR o un enllaç directe. Calendari per taula, confirmacions i recordatoris automàtics. Cap client perdut i sense trucades en hores punta.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostessa gestionant reserves des d'una tauleta a l'entrada del restaurant",
  },

  scan: {
    heading: "Engega la reserva de taules",
    headingAccent: "en 5 minuts.",
    sub: "Connecta el calendari, afegeix les taules amb fotos i aforament — els clients comencen a reservar el mateix dia.",
    cta: "Activa les reserves",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Formulari de reserva",
      heading: "Els clients reserven sols — per data, hora i nombre de comensals.",
      body: "El client obre la carta QR o un enllaç directe, tria la data, l'hora i el nombre de comensals — i veu a l'instant les taules disponibles, cadascuna amb foto, descripció (terrassa, vora la finestra, banc al costat de la barra) i aforament. La confirmació s'envia automàticament per correu i WhatsApp.",
      bullets: [
        "Tria de taula per foto, descripció i aforament.",
        "Confirmació automàtica i recordatori una hora abans de la visita.",
        "Camps mínims al formulari: nom, telèfon, nombre de comensals.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Client reservant una taula de restaurant des del mòbil: data, hora, nombre de comensals i selector de taula" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Calendari de reserves",
      heading: "Calendari per dia i per taula — tot d'una ullada.",
      body: "El panell d'administració mostra un calendari de reserves desglossat per taula, dia, setmana i mes. Franges lliures, taules ocupades, reserves confirmades i no confirmades a una sola pantalla. Funciona en una tauleta a la sala i en un portàtil a l'oficina.",
      bullets: [
        "Vistes de dia, setmana i mes.",
        "Desglossament per taula: qui, quan, quants comensals.",
        "Mou, cancel·la o confirma una reserva amb un toc des del mòbil.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Calendari de reserves al panell d'administració d'IQ Rest a dues tauletes: Gantt diari per taules i vista mensual" },
    },
  ],

  faq: {
    sub: "El que els restauradors pregunten sobre la reserva de taules a IQ Rest. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
    items: [
      { q: "Puc triar quins dies i hores estan disponibles per a reserva?", a: "Sí. El panell d'administració permet definir l'horari d'obertura i els dies de la setmana disponibles — el sistema no mostrarà franges no disponibles als clients. Pots tancar una data concreta (esdeveniment d'empresa, reserva privada) o desactivar tot el calendari temporalment." },
      { q: "Puc pujar una foto per a cada taula?", a: "Sí. Cada taula pot tenir foto, descripció (terrassa, vora la finestra, banc al costat de la barra) i aforament. El client veu la taula exacta que reserva i fa una tria informada — això redueix les expectatives no acomplertes." },
      { q: "Puc desactivar les reserves en dates concretes?", a: "Sí. El calendari permet tancar dates concretes (festius, esdeveniments privats, reformes) o dies sencers de la setmana. En aquestes dates, els clients veuen un missatge «reserva no disponible temporalment»." },
      { q: "Puc personalitzar quins camps es recullen del client?", a: "Sí. Conjunt per defecte: nom, telèfon, correu, nombre de comensals. Pots afegir camps personalitzats (ocasió, al·lèrgies, peticions especials) o eliminar els innecessaris per mantenir el formulari el més curt possible." },
      { q: "Puc limitar el nombre de comensals per taula?", a: "Sí. Cada taula té una configuració d'«aforament» — el sistema no permet que una taula de 2 es reservi per a 6. A taules més grans pots fixar un mínim perquè els grups petits no ocupin la «taula de vuit» a grups més grans." },
      { q: "Com de difícil és la configuració de la reserva?", a: "Costa molt poc temps. Tres passos: (1) afegir taules amb noms, fotos i aforament, (2) activar el mode de reserva a la configuració, (3) compartir l'enllaç o el codi QR amb els clients. Posada en marxa completa en 5-10 minuts." },
      { q: "Puc fer servir el sistema de reserves al meu propi domini?", a: "Sí. Donem suport a un domini personalitzat amb certificat SSL: els clients reserven a l'adreça del teu restaurant (per exemple reserves.elteurestaurant.cat). T'ajudem amb la configuració del DNS; el procés dura entre 5 i 10 minuts." },
      { q: "Puc configurar confirmació automàtica o manual?", a: "Sí, el mode es defineix a la configuració. Amb confirmació automàtica, el client rep la confirmació immediatament en enviar el formulari i la reserva es considera acceptada. Amb confirmació manual, la sol·licitud arriba al panell d'administració amb l'estat «pendent de confirmació» — el responsable la revisa i confirma o rebutja. El mode manual és útil amb pocs llocs o polítiques estrictes." },
      { q: "Cobreu comissió sobre les reserves?", a: "No. La reserva de taules està totalment inclosa al pla Pro — sense percentatges sobre els clients, sense quotes per franja, sense comissions d'agregadors. Una tarifa mensual fixa i reserves il·limitades." },
    ],
  },
};
