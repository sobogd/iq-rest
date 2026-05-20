import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ca",
  slug: "sistema-comandes-restaurant",
  trackPrefix: "l_ca_orders",

  meta: {
    title: "Sistema de comandes per a restaurant — client i cambrer | IQ Rest",
    description:
      "Comandes al restaurant des de mòbil o tauleta: plànol de sala, divisió del compte, estats, opcions i notes. Els clients demanen a taula; el cambrer pren comandes des de qualsevol dispositiu. 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/sistema-comandes-restaurant",
    ogLocale: "ca_ES",
    ogTitle: "Sistema de comandes per a restaurant — client i cambrer",
    ogDescription:
      "Client a taula o cambrer amb el mòbil — la comanda arriba a l'instant a cuina. Plànol de sala, divisió del compte, estats, opcions i notes.",
    brandLine: "IQ Rest — Sistema de comandes per a restaurant",
  },

  hero: {
    headline: "Recepció de comandes: client i cambrer — directament a la cuina.",
    sub: "Els clients fan comanda a través de la carta QR a taula o el cambrer la pren des d'un mòbil o tauleta — la comanda arriba a la pantalla de cuina en segons. Plànol de sala amb taules codificades per color, divisió del compte, opcions flexibles i comentaris. Sense llibretes, sense anades i vingudes a la barra.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Cambrer prenent una comanda a taula amb un smartphone — la comanda arriba a la pantalla de cuina",
  },

  scan: {
    heading: "Configura el sistema de comandes",
    headingAccent: "en 5 minuts.",
    sub: "Puja una carta en paper o un PDF — la IA reconeix plats, preus i categories. Connecta una tauleta a la sala i comença a prendre comandes a les taules.",
    cta: "Escaneja la carta",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Llista i plànol de sala",
      heading: "Llista de comandes al costat del plànol de sala.",
      body: "Totes les comandes actives a la dreta: estat, total, hora, nombre d'articles. A l'esquerra — el plànol de sala: taules acolorides segons l'estat — buida, ocupada, requereix atenció. Toca una taula per obrir o crear una comanda; toca una fitxa per obrir la vista detallada. Sense saltar d'una pantalla a l'altra.",
      bullets: [
        "Plànol de sala: taules acolorides segons l'estat de la comanda.",
        "Llista de comandes al costat — total, hora, nombre d'articles.",
        "Toca una taula per obrir o crear una comanda.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tauleta a l'estació del cambrer: llista de comandes i plànol de sala amb taules acolorides" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Fitxa de comanda",
      heading: "Fitxa de comanda: estats, duplicar, eliminar — un sol toc.",
      body: "Cada article té el seu propi estat (Pendent / En preparació / A punt / Servit) — cuina i cambrer veuen la mateixa imatge en temps real. Tocar el punt obre el menú d'accions: canviar estat, duplicar l'article amb els mateixos modificadors i opcions, eliminar. Tot dins la fitxa.",
      bullets: [
        "Estat per article: Pendent / En preparació / A punt / Servit.",
        "Duplica un article amb un toc i les mateixes opcions.",
        "Elimina un article directament des de la fitxa.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tauleta amb la fitxa detallada de la comanda: estats dels articles, accions de duplicar i eliminar" },
    },
    {
      icon: Receipt,
      eyebrow: "Divideix el compte",
      heading: "Divideix el compte quan els clients paguen per separat.",
      body: "Els clients han decidit dividir — marca els articles que van a un nou tiquet; la resta es queda a l'actual. El sistema mostra els dos totals a l'instant. Un toc a «Divideix la comanda» i tens dues comandes independents amb els totals correctes, totes dues encara vinculades a les seves taules.",
      bullets: [
        "Tria els articles a dividir amb caselles de selecció.",
        "Els dos totals es mostren a l'instant.",
        "Un toc i la comanda queda dividida sense càlculs manuals.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tauleta en una taula de restaurant: modal de divisió de compte entre clients" },
    },
    {
      icon: Smartphone,
      eyebrow: "Flux d'afegit mòbil",
      heading: "Afegeix articles des del mòbil — en tres accions.",
      body: "El cambrer no està lligat a un sol dispositiu: obre la recepció de comandes al seu mòbil i afegeix un article en tres passos — categoria, plat, opcions (mida, punt, salsa o ingredient extra). El preu es recalcula automàticament. La nota per a la cuina es posa a l'últim pas.",
      bullets: [
        "Tres passos: categoria → plat → opcions.",
        "Opcions (mida, complements, extres) tarifades amb un clic.",
        "Camp de nota al pas final.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Quatre mòbils amb els passos per afegir un article a la comanda: categoria, plat, mida, comentari" },
    },
  ],

  faq: {
    sub: "El que els restauradors pregunten sobre la recepció de comandes a IQ Rest. No trobes la teva pregunta? Escriu-nos per WhatsApp.",
    items: [
      { q: "Poden treballar diversos cambrers alhora des de dispositius diferents?", a: "Sí. Cada cambrer entra al compte compartit del restaurant des del seu mòbil o tauleta — tothom veu les mateixes taules, comandes i estats en temps real. Els canvis fets per un cambrer apareixen a l'instant per als altres, sense conflictes ni bloqueigs." },
      { q: "Els cambrers poden fer servir els seus propis dispositius (BYOD)?", a: "Sí. És una aplicació web al navegador — res per instal·lar. El cambrer obre un enllaç, entra al compte del restaurant des del seu iPhone, Android o tauleta personal i comença a treballar. Al final del torn, simplement tanca sessió." },
      { q: "Es poden afegir opcions obligatòries als plats (mida, punt, etc.)?", a: "Sí. Cada plat pot tenir qualsevol nombre de grups d'opcions — obligatoris (per exemple «Mida»: Petit / Mitjà / Gran) i opcionals («Punt»: poc fet / al punt / molt fet). Les opcions poden canviar el preu (+1,00 €). Si un grup és obligatori, el sistema no permet que el client o el cambrer afegeixi el plat sense triar." },
      { q: "Els clients poden afegir notes o extres a un plat (pa, salsa)?", a: "Sí. L'últim pas d'afegir té un camp de nota lliure («sense ceba», «molt fet», «al·lèrgia a la fruita seca»). Els extres són modificadors separats amb preu («+ salsa BBQ +1,50 €», «+ Pa +2,00 €»). Les notes es mostren a la pantalla de cuina, destacades en color." },
      { q: "Hi ha estadístiques de comandes?", a: "Sí. La secció d'analítica mostra: ingressos per dia i hora, tiquet mitjà, plats més venuts, conversió client → comanda, velocitat de servei (temps de Pendent a Servit). Això ajuda a planificar torns, compres i a detectar plats de baix rendiment." },
      { q: "Es poden dividir o moure comandes entre taules?", a: "Sí, els dos casos estan suportats. Per dividir — marca els articles que van a un tiquet nou (per a clients que paguen per separat). Per moure — obre la fitxa de la comanda, tria una taula nova; tota la comanda s'hi mou. Sense càlculs manuals, sense sortir del panell." },
    ],
  },
};
