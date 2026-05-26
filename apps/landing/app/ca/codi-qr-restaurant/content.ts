import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ca",
  slug: "codi-qr-restaurant",
  trackPrefix: "l_ca_qr",

  meta: {
    title: "Codi QR per a restaurants | IQ Rest",
    description:
      "Codi QR per a restaurants: el client escaneja el QR de la taula, obre la carta al navegador i demana en la seva llengua. 14 dies gratis, sense targeta.",
    canonical: "https://iq-rest.com/ca/codi-qr-restaurant",
    ogLocale: "ca_ES",
    ogTitle: "Codi QR per a restaurants",
    ogDescription:
      "Codi QR a la taula, carta al mòbil — fotos, al·lèrgens, 35 idiomes i actualitzacions en temps real.",
    brandLine: "IQ Rest — Codi QR per a restaurants",
  },

  hero: {
    headline: "Codi QR per a restaurants.",
    cta: "Crear menú QR",
    sub: "El client enfoca el codi QR de la taula i la carta s'obre a l'instant al navegador del mòbil: fotos dels plats, al·lèrgens, preus sempre al dia i traducció automàtica a 35 idiomes. Sense instal·lar aplicacions, sense reimprimir cartes cada vegada que canvia un preu.",
  },

  scan: {
    heading: "Ja tens una carta en paper o un PDF?",
    headingAccent: "La IA la converteix en codi QR en 60 segons.",
    sub: "Puja una foto de la carta o el PDF — la IA reconeix categories, plats i preus i els connecta immediatament al menú del codi QR.",
    cta: "Crea el menú QR",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Un QR, 35 idiomes",
      heading: "Un sol codi QR, la carta en 35 idiomes.",
      body: "El client escaneja el codi QR i tria la seva llengua: la traducció la fa una IA amb criteri gastronòmic, no un traductor genèric. Sense cartes separades per a turistes, sense fulls solts sobre la taula.",
      bullets: [
        "Una sola impressió del QR cobreix 35 idiomes, inclosos a la subscripció.",
        "La IA coneix el lèxic culinari — els plats sonen naturals en cada llengua.",
        "El client canvia d'idioma dins la pròpia carta, sense reescanejar el QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dos clients escanegen el mateix codi QR de la taula i llegeixen la carta en idiomes diferents" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Al·lèrgens al QR",
      heading: "Al·lèrgens i etiquetes dietètiques dins de la carta QR.",
      body: "Cada plat de la carta connectada al codi QR pot dur etiquetes de gluten, lactosa, fruita seca, marisc, opcions veganes i sense gluten. El client filtra des del mòbil els plats compatibles amb les seves restriccions, sense haver de demanar al personal.",
      bullets: [
        "14 categories d'al·lèrgens gestionades a nivell de plat.",
        "Etiquetes vegà, vegetarià i sense gluten amb un clic des del panell.",
        "El client filtra el menú QR segons les seves restriccions.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "El client filtra el menú QR per al·lèrgens al mòbil mentre el propietari edita la llista des d'una tauleta" },
    },
    {
      icon: Palette,
      eyebrow: "Més que un QR simple",
      heading: "Una carta amb codi QR cuidada com el web del restaurant.",
      body: "Després d'escanejar el codi, el client no es troba un PDF sec: veu una pantalla de benvinguda amb vídeo o foto en primer pla, la descripció del local i una pàgina de contacte amb mapa, telèfons i xarxes socials. El QR esdevé la porta d'entrada al restaurant en línia.",
      bullets: [
        "Fons de vídeo o foto gran a la pantalla inicial del menú QR.",
        "Espai per explicar el concepte del local i de cada categoria.",
        "Pàgina de contacte integrada: mapa, telèfon, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos mòbils sobre una taula: pantalla inicial del menú QR amb fons de vídeo i pàgina de contacte amb mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Comandes des del QR · opcional",
      heading: "Des del codi QR el client també pot demanar.",
      body: "A més de consultar la carta, el menú QR pot esdevenir un canal de comandes: el client afegeix els plats al carret i envia la sol·licitud. La comanda arriba al cambrer a la sala, al WhatsApp o a la pantalla de cuina. La funcionalitat s'activa o desactiva a la configuració quan calgui.",
      bullets: [
        "Carret, comentaris i enviament de la comanda directament des de l'escaneig del QR.",
        "La comanda arriba a l'instant a la sala, al WhatsApp o a la pantalla de cuina.",
        "Funcionalitat activable per horaris, sales o restaurants concrets.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dos mòbils sobre una taula: carret construït des del menú QR i confirmació de comanda enviada" },
    },
  ],

  faq: {
    sub: "El que els restauradors pregunten sobre el menú amb codi QR d'IQ Rest. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
    items: [
      { q: "Com funciona el menú amb codi QR d'IQ Rest?", a: "Cada taula té un codi QR imprès. El client l'enfoca amb la càmera del mòbil i el navegador obre el menú del restaurant — fotos, descripcions, al·lèrgens i preus actualitzats. No cal instal·lar cap aplicació, ni per al client ni per al personal." },
      { q: "Necessito coneixements tècnics per crear la carta QR?", a: "No. El panell funciona amb clic i arrossegar, sense codi ni configuracions complicades. Afegir un plat triga uns segons: nom, preu, foto. La configuració inicial sol durar entre 30 minuts i una hora; si ja tens un PDF de la carta, la IA la converteix automàticament." },
      { q: "Els clients han d'instal·lar cap app per llegir el QR?", a: "No. La càmera nativa de l'iPhone i de l'Android reconeix el codi QR en segons i obre el menú directament al navegador. El panell d'administració també funciona a qualsevol navegador modern — mòbil, tauleta o portàtil." },
      { q: "Com s'imprimeixen els codis QR per a les taules?", a: "Els codis QR es generen automàticament al panell (un per taula o un de sol per a tot el local) i es descarreguen en PDF a punt per imprimir. N'hi ha prou amb una impressora d'oficina i un suport: cavallet, adhesiu o sotagot." },
      { q: "Puc utilitzar un domini propi per al menú QR?", a: "Sí. Donem suport a un domini del restaurant amb certificat SSL (per exemple carta.elteurestaurant.cat): quan el client escaneja el QR, veu l'adreça del restaurant i no un subdomini genèric. La configuració del DNS triga entre 5 i 10 minuts i t'acompanyem en el procés." },
      { q: "Puc gestionar els QR de diversos restaurants des d'un sol compte?", a: "Sí, sota petició. Un compte pot agrupar diversos restaurants, cadascun amb els seus propis codis QR, carta, disseny i analítica. Escriu-nos per WhatsApp i activarem el mode multi-restaurant." },
      { q: "Com de difícil és llançar el menú QR des de zero?", a: "Tres passos: (1) crea les categories; (2) afegeix els plats amb nom, preu i foto; (3) imprimeix els QR i col·loca'ls a les taules. Si ja tens una carta en paper o un PDF, puja'l — la IA reconeix categories i preus i omple les fitxes. Una carta bàsica pot estar en línia en 5 minuts." },
    ],
  },
};
