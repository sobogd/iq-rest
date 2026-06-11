import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_BASIC_EUR, SCHEMA_PRICE_PRO_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "tr";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "Restorancıların fiyatlar ve ödeme hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
  items: [
    { q: "Basic ile Pro arasındaki fark nedir?", a: "Basic; dijital + QR menü, 35 dile AI çevirisi, menüden sipariş alma (isteğe bağlı) ve herhangi bir cihazdan yönetim içerir. Pro, mutfak ekranı (KDS) ve 7/24 online masa rezervasyonunu ekler, ayrıca öncelikli WhatsApp desteği. Mutfak akışı ve rezervasyonlara ihtiyacınız yoksa — Basic her şeyi kapsar." },
    { q: "Siparişlerden komisyon alıyor musunuz?", a: "Hayır. Her sipariş — QR menüden veya bir garson tarafından alınan — doğrudan restorana gider, yüzde veya aracı komisyonu olmadan. Sabit bir aylık ücretiniz var ve başka kesinti yok." },
    { q: "14 günlük deneme süresi neleri içeriyor?", a: "Her iki plandaki tüm özelliklere tam erişim, kart gerekmez. 14 gün sonra ödeme yöntemi bağlanmazsa hesap otomatik olarak duraklatılır. Onayınız olmadan otomatik tahsilat yapılmaz." },
    { q: "14 günden sonra ne olur?", a: "Ödeme yöntemi bağlanmazsa hesap otomatik olarak duraklatılır. Yönetim paneli salt okunur modda kullanılabilir kalır, ancak misafir QR menüsü ve sipariş alma geçici olarak devre dışı bırakılır. Asla onayınız olmadan tahsilat yapmıyoruz." },
    { q: "Duraklatma sırasında menüm, siparişlerim ve verilerim ne olur?", a: "Her şey tam olarak korunur: menü, yemek fotoğrafları, sipariş geçmişi, rezervasyonlar, tasarım ayarları, istatistikler. Bir ay veya altı ay sonra bile ödemeyi bağlayın — her şey eskisi gibi döner, hiçbir şey kaybolmaz." },
    { q: "Masalardaki QR kodları deneme süresinden sonra çalışmaya devam eder mi?", a: "Hesap duraklatılırsa QR kodları misafirlere „geçici olarak kullanılamıyor“ mesajı gösterir. Yeni QR kodları basmanıza gerek yok: ödeme bağlanır bağlanmaz aynı kodlar menüyü tekrar açar." },
    { q: "Daha sonra Basic'ten Pro'ya geçebilir miyim?", a: "Evet, yükseltme yönetim panelinde tek tıklamadır. Ek ücret, ödenmiş dönemin kalan günlerine göre orantılı olarak hesaplanır. Pro'dan Basic'e düşürme de mevcuttur — KDS ve rezervasyon devre dışı bırakılır, ancak tüm veriler korunur." },
    { q: "Yıllık indirim nedir?", a: "Aylık plana kıyasla yaklaşık %30. Kesin tutar, plan sayfasında ödeme sırasında gösterilir." },
    { q: "Aboneliği istediğim zaman iptal edebilir miyim?", a: "Evet, iptal yönetim panelinde tek tıklamadır. İptal sonrası hesap, ödenmiş dönemin sonuna kadar çalışır, ardından duraklatılır. Veriler korunur ve istediğiniz zaman geri dönebilirsiniz." },
    { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Stripe üzerinden Visa, Mastercard ve American Express. Apple Pay ve Google Pay da destekleniyor. Avrupa'da — yıllık planda SEPA Direct Debit." },
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest — Pricing" }],
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
        { "@type": "ListItem", position: 2, name: "Pricing", item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Basic", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: SCHEMA_PRICE_PRO_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
      trackPrefix="l_tr_pricing_hero"
    />
  );
}
