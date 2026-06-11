import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ca",
  slug: "pantalla-de-cuina",
  trackPrefix: "l_ca_kds",

  meta: {
    title: "Pantalla de cuina (KDS) per a restaurants | IQ Rest",
    description:
      "Pantalla de cuina (KDS) per a restaurants: les comandes de la sala i de la carta QR arriben a l'instant a la pantalla del xef. Columnes per taula, estats Pendent / En preparació / A punt / Servit, filtres per zona. Funciona en tauleta o mòbil.",
    canonical: "https://iq-rest.com/ca/pantalla-de-cuina",
    ogLocale: "ca_ES",
    ogTitle: "Pantalla de cuina (KDS) — Comandes a la pantalla del xef",
    ogDescription:
      "Comandes de la sala a la pantalla del xef. Columnes per taula, estats i temporitzador. Un toc canvia l'estat.",
    brandLine: "IQ Rest — Pantalla de cuina",
  },

  hero: {
    headline: "Pantalla de cuina: comandes directament a la pantalla del xef.",
    cta: "Configurar pantalla de cuina",
    sub: "Els tiquets de paper ja no calen. Les comandes de la sala o de la carta QR arriben a l'instant a la pantalla de cuina — amb notes, al·lèrgens i temporitzador. Un toc canvia l'estat. Funciona en una tauleta al pas o en un smartphone a la butxaca del xef.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Cuina professional amb una tauleta sobre un suport de llautó mostrant la pantalla de cuina amb comandes actives",
  },

  scan: {
    heading: "Configura la pantalla de cuina",
    headingAccent: "en 5 minuts.",
    sub: "Puja una carta en paper o un PDF — la IA reconeix plats, categories i al·lèrgens. Connecta una tauleta a la cuina i comença a rebre comandes.",
    cta: "Escaneja la carta",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Controls i filtres",
      heading: "Diverses pantalles per zona: cuina i barra.",
      body: "Col·loca tauletes separades a la línia calenta, la barra o la pastisseria — cada pantalla només mostra els plats que li corresponen. Els filtres per estat (Pendent / En preparació / A punt / Servit) i per categoria eliminen el soroll: el xef només veu el que és rellevant per al seu lloc.",
      bullets: [
        "Diverses pantalles KDS amb filtres per categoria.",
        "Filtre d'estat: mostra només En preparació i A punt.",
        "Cada zona només veu el seu propi flux de comandes.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tauleta sobre suport de llautó al pas de cuina — KDS amb filtre d'estat" },
    },
    {
      icon: Timer,
      eyebrow: "Fitxes i temporitzador",
      heading: "Un toc canvia l'estat. Notes i al·lèrgens destacats en color.",
      body: "La fitxa del plat mostra les opcions triades (sense ceba, molt fet), la nota del client, els al·lèrgens i un temporitzador des del moment en què s'ha fet la comanda. Toca la fitxa i l'estat passa al següent: Pendent → En preparació → A punt → Servit. La llista s'ordena per prioritat automàticament.",
      bullets: [
        "Toc a la fitxa — canvi d'estat instantani.",
        "Opcions, notes i al·lèrgens destacats en color.",
        "Ordenació per prioritat: els articles que esperen més temps pugen a dalt.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tauleta sobre suport de llautó a la barra — KDS amb fitxes de comanda per taula" },
    },
  ],

  faq: {
    sub: "El que els restauradors pregunten sobre la pantalla de cuina a IQ Rest. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
    items: [
      { q: "Quins estats de plat hi ha a la cuina?", a: "Quatre estats amb colors diferents a la fitxa: Pendent (gris) — la comanda s'ha acceptat i espera; En preparació (taronja) — el plat s'està preparant; A punt (blau) — llest per servir; Servit (verd) — lliurat al client. Tocar la fitxa la mou a l'estat següent, sense menús ni confirmacions." },
      { q: "Puc tenir diverses pantalles KDS en zones diferents?", a: "Sí. Una tauleta a la línia calenta, una altra a la barra, una tercera a la pastisseria — cadascuna amb el seu filtre de categoria. Totes les pantalles estan sincronitzades en temps real: un estat canviat en una pantalla s'actualitza a totes." },
      { q: "Quin maquinari necessito per fer funcionar el KDS?", a: "El KDS és una aplicació web que funciona a qualsevol navegador modern. Cuina gran — una tauleta sobre suport de llautó al pas o un televisor a la paret. Local petit — el smartphone del xef. Sense maquinari especial, sense instal·lació: obre un enllaç i entra al compte." },
      { q: "D'on vénen les comandes a la pantalla de cuina?", a: "De totes les fonts: el client que ha demanat per la carta QR a taula; el cambrer que ha pres la comanda des del mòbil; el client que ha fet la comanda des del web. Tots arriben al KDS amb una etiqueta de procedència i el número de taula. Sense transferències manuals des d'un POS." },
      { q: "Què es mostra en una fitxa de comanda?", a: "Nom del plat, modificadors seleccionats (sense ceba, molt fet, afegir salsa), comentari del client, al·lèrgens destacats, estat (Pendent / En preparació / A punt / Servit) i un temporitzador que mostra quant fa que el plat espera. Les fitxes s'ordenen per prioritat: com més espera, més amunt a la columna." },
      { q: "Puc filtrar les fitxes de la pantalla?", a: "Sí. Dos filtres: per estat (per exemple mostrar només Pendent i En preparació, amagar Servit) i per categoria (només begudes a la barra, només plats principals a la cuina). La configuració es desa per dispositiu — cada zona manté el seu propi conjunt." },
    ],
  },
};
