import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "es";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Lo que los restauradores preguntan sobre precios y pagos. ¿No encuentras tu pregunta? Escríbenos por WhatsApp.",
  items: [
    { q: "¿Cómo funcionan los precios?", a: "Tú creas tu propio plan. La carta digital QR es la base — incluye la traducción con IA en 35 idiomas y la gestión desde cualquier dispositivo. A partir de ahí añades solo lo que necesitas: las reservas de mesa, la pantalla de cocina con toma de pedidos o un dominio propio. El precio es por restaurante, y los descuentos por volumen se aplican automáticamente desde el segundo restaurante." },
    { q: "¿Cobráis comisión por los pedidos?", a: "No. Cada pedido — desde la carta QR o tomado por un camarero — llega directo al restaurante, sin porcentajes ni comisiones de agregadores. Pagas una cuota mensual fija y ninguna otra retención." },
    { q: "¿Qué incluye el periodo de prueba de 14 días?", a: "Acceso completo a todas las funciones, sin tarjeta. Pasados los 14 días la cuenta se pone en pausa automáticamente si no se ha conectado un método de pago. No hay cargos automáticos sin tu consentimiento." },
    { q: "¿Qué pasa al terminar los 14 días?", a: "Si no se ha conectado un método de pago, la cuenta se pone en pausa automáticamente. El panel de administración sigue accesible en modo lectura, pero la carta QR para los comensales y la toma de pedidos se desactivan temporalmente. Nunca cargamos sin tu consentimiento." },
    { q: "¿Qué pasa con mi carta, pedidos y datos durante la pausa?", a: "Se conserva todo en su totalidad: carta, fotos de los platos, historial de pedidos, reservas, ajustes de diseño, estadísticas. Aunque conectes el pago un mes o medio año más tarde, todo vuelve tal cual estaba y no se pierde nada." },
    { q: "¿Los QR de las mesas dejarán de funcionar tras la prueba?", a: "Si la cuenta está en pausa, los QR muestran a los comensales un aviso de «temporalmente no disponible». No hace falta imprimir nuevos QR: en cuanto se conecte el pago, los mismos códigos vuelven a abrir la carta." },
    { q: "¿Puedo cambiar mi plan más adelante?", a: "Sí — añade o quita funciones cuando quieras desde el panel. La diferencia se prorratea por los días que quedan del periodo pagado. Si quitas una función, se desactiva pero todos sus datos se conservan." },
    { q: "¿Cuántos restaurantes puedo gestionar?", a: "Los que necesites — elige el número de restaurantes al crear tu plan y gestiónalos todos desde un único panel. Los descuentos por volumen se aplican automáticamente, hasta un 50 % con 5 o más restaurantes. ¿Tienes un grupo más grande? Escríbenos por WhatsApp sobre un plan a medida." },
    { q: "¿Qué descuento tiene el plan anual?", a: "Alrededor del 30 % frente al pago mensual. El importe exacto se muestra mientras creas tu plan." },
    { q: "¿Puedo cancelar la suscripción en cualquier momento?", a: "Sí, la cancelación se hace con un clic desde el panel. Tras la cancelación la cuenta funciona hasta el final del periodo pagado y luego se pone en pausa. Los datos se conservan y puedes volver cuando quieras." },
    { q: "¿Qué métodos de pago aceptáis?", a: "Tarjetas Visa, Mastercard y American Express con Stripe. Apple Pay y Google Pay también están disponibles. En Europa — SEPA Direct Debit con el plan anual." },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Precios" }],
  },
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: `${SITE}/${LOCALE}` },
        { "@type": "ListItem", position: 2, name: "Precios", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      dateModified: SCHEMA_DATE_MODIFIED,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital menu", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <PricingTemplate
      locale={LOCALE}
      texts={DEFAULT}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      trackPrefix="l_es_pricing_hero"
    />
  );
}
