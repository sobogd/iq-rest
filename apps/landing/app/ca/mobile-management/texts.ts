import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Gestiona el teu restaurant des del mòbil — Panell mòbil per a restaurants",
    description:
      "Afegeix plats, canvia preus, puja fotos, mira comandes — tot des del mòbil. Tot el panell d'IQ Rest és mobile-first. No et fa falta ordinador, mai.",
    canonical: "https://iq-rest.com/ca/mobile-management",
    ogLocale: "ca_ES",
    ogTitle: "Gestió mòbil de restaurant — Porta el teu menú des del mòbil",
    ogDescription:
      "Actualitza preus entre taules. Puja fotos des de la càmera. Mira comandes en directe al pas. Tot el panell d'IQ Rest funciona al mòbil.",
  },

  hero: {
    title: "Porta el restaurant des del mòbil. Entre taules.",
    subtitle:
      "Tot el panell d'IQ Rest està construït mobile-first — afegeix plats, canvia fotos, modifica preus i llegeix comandes en directe des del mateix mòbil que portes a la butxaca del davantal. Sense portàtil, sense ordinador a la rebotiga, sense excuses.",
    trustLine: "4,9 · més de 500 restaurants en més de 30 països",
  },

  seo: {
    description:
      "Els restauradors no estan asseguts a un escriptori — estan darrere de la barra, a la cuina, a la sala. IQ Rest està fet per a aquesta realitat. Cada funció del panell, des d'afegir plats nous fins a veure comandes en directe, està dissenyada per a polzes i pantalles petites primer. Si saps fer servir Instagram, saps portar tot el teu restaurant amb IQ Rest des del mòbil.",
    fullDescription:
      "La majoria del programari de gestió de restaurants és desktop-first amb una 'versió mòbil' afegida com una idea de darrera hora — botons minúsculs, layouts trencats i funcions amagades tres menús més avall. IQ Rest s'ha dissenyat al revés: cada pantalla funciona perfectament al mòbil, i la versió d'escriptori és la mateixa interfície només escalada.\n\nQuè vol dir això a la pràctica: fes una foto del plat del dia amb la càmera del mòbil i puja-la directament al menú. Veus una errata en una descripció mentre desparances una taula — corregeix-la al moment, el canvi és en directe en segons. Et marxa un cuiner? Treu el plat del menú des del mòbil abans que el següent client escanegi el QR. Plat nou de la cuina? Toca, escriu, fes la foto, posa el preu — els clients el poden demanar 30 segons després.\n\nEl mateix s'aplica a comandes, reserves, analítica i traduccions. La llista de comandes en directe es refresca en temps real. Les confirmacions de reserva són d'un toc. Ingressos diaris, plats top i hores de més activitat caben en una pantalla de mòbil. Mai més has d'anar a la rebotiga per gestionar res.",
    benefitsHeading: "Per què la gestió mobile-first ho canvia tot",
    benefits: [
      "Accés complet al panell des de qualsevol smartphone o tauleta — sense app per instal·lar",
      "Pujar fotos de plats directament des de la càmera amb dos tocs",
      "Actualitzar preus, descripcions i horaris des d'on sigui",
      "Drag-and-drop tàctil per a categories i ordenació de plats",
      "Comandes en directe, reserves i analítica caben en una pantalla de mòbil",
      "Tolerant a falles de xarxa — acaba l'edició i sincronitza en reconnectar",
    ],
  },

  pricing: {
    heading: "Un sol pla.",
    headingAccent: "Porta'l des del mòbil.",
    sub: "Panell mobile-first més menú QR, comandes en línia, traducció per IA i reserves — tot en un únic preu fix.",
  },

  faq: {
    sub: "Tot el que els restauradors pregunten sobre la gestió mòbil. No hi veus la teva? Escriu-nos per WhatsApp — responen persones reals.",
    items: [
      {
        q: "He d'instal·lar una app mòbil?",
        a: "No. IQ Rest funciona al navegador del mòbil — Safari, Chrome, el que ja facis servir. Pots afegir-lo a la pantalla d'inici per tenir-lo a un toc (semblarà una app nativa), però no hi ha res per descarregar de l'App Store, ni permisos per atorgar, ni actualitzacions de versió per vigilar.",
      },
      {
        q: "Puc realment pujar fotos del menú directament des del mòbil?",
        a: "Sí — aquesta és tota la idea. Toca 'afegir foto' a un plat, s'obre la càmera del mòbil, fas o tries de la galeria, prems pujar. La imatge es redimensiona automàticament, s'optimitza per a web i és en directe al menú en segons. Sense Lightroom, sense transferir fitxers a un ordinador, sense SFTP.",
      },
      {
        q: "Funciona en tauletes i a la recepció?",
        a: "Sí. El panell està optimitzat per a mòbils, tauletes i ordinadors d'escriptori — mateixa interfície, mateixes dreceres, mateixa velocitat. Molts restaurants tenen un iPad a la recepció per a reserves, un mòbil a la butxaca del xef per a comandes i un portàtil a la rebotiga per a la facturació — tot amb el mateix login.",
      },
      {
        q: "I què passa amb actualitzar preus durant un servei ple?",
        a: "Pensat per a això. Toca un plat, edita el preu, desa — els clients veuen el nou preu en segons sense recarregar res. Sense republicar, sense reconstruir, sense retards de sincronització. El mateix per marcar un plat com a 'esgotat' (apareix gris al menú a l'instant) o afegir un plat del dia entre serveis.",
      },
      {
        q: "I si se m'apaga el mòbil enmig d'una edició?",
        a: "Les edicions es guarden camp a camp mentre escrius — si se't mor el mòbil o cau internet, trobaràs els canvis quan tornis a entrar des de qualsevol dispositiu. Sense feina perduda.",
      },
    ],
  },

  finalCta: {
    heading: "Porta'l des de la butxaca del davantal.",
    headingAccent: "Salta't la rebotiga.",
    sub: "Tot el panell cap al teu mòbil. 14 dies gratis, sense targeta, sense app per instal·lar.",
  },
};
