import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Carta multilingüe de restaurante — 35 idiomas, un toque para cambiar",
    description:
      "Atiende a clientes internacionales en su idioma. Carta de restaurante en 35 idiomas con cambio de un toque. Soporte RTL para árabe y persa. 14 días gratis.",
    canonical: "https://iq-rest.com/es/multilingual",
    ogLocale: "es_ES",
    ogTitle: "Web de carta de restaurante multilingüe — 35 idiomas integrados",
    ogDescription:
      "Los turistas escanean y ven tu carta en su idioma automáticamente. 35 idiomas, soporte RTL, autodetección desde la configuración del móvil. 14 días gratis.",
  },

  hero: {
    title: "Tu carta habla el idioma de cada turista.",
    subtitle:
      "Una carta multilingüe de restaurante no debería ser un proyecto. Con IQ Rest, tu menú QR autodetecta el idioma del móvil de cada cliente y la sirve en cualquiera de 35 idiomas — incluidos árabe y persa con renderizado correcto de derecha a izquierda.",
    trustLine: "4,9 · más de 500 restaurantes en más de 30 países",
  },

  seo: {
    description:
      "Monta tu carta una vez, sírvela en 35 idiomas. IQ Rest autodetecta el idioma del móvil de cada cliente y renderiza la carta en su lengua — sin tocar banderas, sin barreras idiomáticas, sin momentos incómodos con Google Translate. De español y alemán a japonés, árabe y mandarín, tus clientes ven tu restaurante como debería verse.",
    fullDescription:
      "La mayoría de cartas 'multilingües' son PDFs de Google Translate roto, impresos una vez y nunca actualizados. La web multilingüe de restaurante de IQ Rest es i18n de verdad: cada idioma tiene su copia traducida correctamente, su slug de URL, sus meta-tags para que Google los indexe y su routing dentro de la app de la carta.\n\nCuando un turista con un iPhone en francés escanea tu QR, la carta se abre en francés automáticamente — sin toques, sin decisiones. Pueden cambiar a otro idioma con el selector de la parte de arriba, pero la mayoría no necesitan hacerlo. Lo mismo aplica a etiquetas dietéticas ('vegan' se convierte en 'vegano' / 'vegetarisch' / 'ヴィーガン' según el idioma), a mensajes de error, a botones de 'añadir al carrito', a recibos. Cada cadena de UI en 35 idiomas, no solo el contenido de la carta.\n\nPara los idiomas RTL — árabe y persa — todo el layout se invierte adecuadamente: el texto se alinea a la derecha, los menús se abren desde la derecha, los precios aparecen tras el nombre del plato como corresponde. Esto no es un truco de CSS, es soporte RTL completo que hace que los clientes árabes y persas se sientan atendidos, no apañados.",
    benefitsHeading: "Por qué una carta multilingüe real supera a un PDF traducido",
    benefits: [
      "35 idiomas con UI traducida correctamente — no solo los platos",
      "Autodetecta el idioma del móvil del cliente — sin toques",
      "Selector manual de idioma para los que prefieran otro",
      "Soporte RTL completo para árabe y persa — no un truco de CSS",
      "Cada idioma tiene su URL — Google indexa 35 versiones de tu sitio",
      "Cambia la descripción de un plato en tu idioma — las traducciones siguen",
    ],
  },

  pricing: {
    heading: "Un plan.",
    headingAccent: "Los 35 idiomas incluidos.",
    sub: "Carta multilingüe, traducción con IA, pedidos QR y reservas — todo en un precio único. Sin coste por idioma, sin extras por RTL.",
  },

  faq: {
    sub: "Todo lo que los hosteleros preguntan sobre una carta multilingüe. ¿No ves la tuya? Escríbenos por WhatsApp — responden personas reales.",
    items: [
      {
        q: "¿Cuántos idiomas soporta la carta?",
        a: "35 idiomas: inglés, español, alemán, francés, italiano, portugués, neerlandés, polaco, checo, eslovaco, húngaro, rumano, búlgaro, croata, serbio, esloveno, griego, turco, ruso, ucraniano, lituano, letón, estonio, finés, sueco, noruego, danés, islandés, catalán, gaélico irlandés, árabe, persa, japonés, coreano y chino. Las cadenas de UI están profesionalmente traducidas en cada uno.",
      },
      {
        q: "¿Cómo cambian de idioma los clientes?",
        a: "De dos formas: automática (la carta se abre en el idioma del móvil) y manual (selector de idioma en la parte alta de la carta). El 80% de los turistas no toca el selector manual — la autodetección funciona porque su móvil ya conoce su idioma.",
      },
      {
        q: "¿Soportáis idiomas de derecha a izquierda como árabe y persa?",
        a: "Sí, con layout RTL completo. Toda la carta se invierte: el texto se alinea a la derecha, las columnas se reordenan, los cajones de navegación se abren desde la derecha y los precios aparecen tras el nombre del plato. Es soporte RTL real implementado a nivel de layout, no solo trucos de dirección de CSS.",
      },
      {
        q: "¿Indexará Google mi carta en los 35 idiomas?",
        a: "Sí. Cada idioma tiene su slug de URL (p. ej., /es, /fr, /de), tags hreflang correctos, títulos y descripciones meta localizadas y datos estructurados específicos del idioma. Google trata cada idioma como una página separada para esa locale, lo que significa que los turistas que buscan tu restaurante en su idioma tienen más probabilidades de encontrarte.",
      },
      {
        q: "¿Y si no quiero los 35 idiomas — solo mis mercados principales?",
        a: "Elige qué idiomas activar. Si eres un chiringuito en Grecia que sirve sobre todo a turistas británicos, alemanes e italianos, activa solo inglés, alemán e italiano — el resto no aparecen en el selector ni en la autodetección. Siempre puedes activar más cuando cambie tu mezcla de turistas.",
      },
    ],
  },

  finalCta: {
    heading: "El idioma de cada turista.",
    headingAccent: "Ya soportado.",
    sub: "Sirve una carta multilingüe en 35 idiomas, incluidos árabe y persa en RTL. 14 días gratis, sin tarjeta, sin coste por idioma.",
  },
};
