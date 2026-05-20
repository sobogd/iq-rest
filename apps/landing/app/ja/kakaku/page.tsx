import type { Metadata } from "next";
import { LandingHeaderLp } from "@/app/_landing/components/header-lp";
import { LandingFooterLp } from "@/app/_landing/components/footer-lp";
import { FaqLp } from "@/app/_landing/components/faq-lp";
import { Section } from "@/app/_landing/components/section";
import { PageTracker } from "@/app/_landing/components/page-tracker";
import { PricingHero } from "@/app/_landing/components/pricing-hero";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ja";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "レストラン経営者が料金と支払いについて尋ねる質問。質問が見つからない場合は、WhatsAppでメッセージをお送りください。",
  items: [
    { q: "BasicとProの違いは何ですか?", a: "Basicはデジタル+QRメニュー、35言語のAI翻訳、メニューからの注文受付(オプション)、任意のデバイスからの管理を含みます。Proはキッチンディスプレイ(KDS)と24/7オンラインテーブル予約、優先WhatsAppサポートを追加します。キッチンワークフローと予約が不要な場合 — Basicですべてカバーされます。" },
    { q: "注文に手数料を取りますか?", a: "いいえ。QRメニューからまたはスタッフが受け付けたすべての注文はレストランに直接届きます。当社からのパーセンテージや集約サービスの手数料はありません。固定の月額料金のみで、その他の控除はありません。" },
    { q: "14日間のトライアルには何が含まれますか?", a: "両プランのすべての機能に完全アクセス、カード不要。14日後、支払い方法が接続されていない場合、アカウントは自動的に一時停止されます。同意なしの自動課金はありません。" },
    { q: "14日後はどうなりますか?", a: "支払い方法が接続されていない場合、アカウントは自動的に一時停止されます。管理パネルは読み取り専用モードで利用可能ですが、ゲスト用QRメニューと注文受付は一時的に無効になります。同意なしには課金しません。" },
    { q: "一時停止中、メニュー、注文、データはどうなりますか?", a: "すべて完全に保持されます:メニュー、料理の写真、注文履歴、予約、デザイン設定、統計。1か月後、6か月後でも支払いを接続すれば、すべて元のように戻ります。何も失われません。" },
    { q: "トライアル後、テーブルのQRコードはまだ機能しますか?", a: "アカウントが一時停止されている場合、QRコードはお客様に「一時的に利用不可」のメッセージを表示します。新しいQRコードを印刷する必要はありません:支払いが接続されるとすぐに同じコードでメニューが再び開きます。" },
    { q: "後でBasicからProに切り替えられますか?", a: "はい、アップグレードは管理パネルでワンクリックで行えます。追加料金は支払い済み期間の残り日数に応じて日割り計算されます。ProからBasicへのダウングレードも可能 — KDSと予約は無効になりますが、すべてのデータは保持されます。" },
    { q: "年間割引はいくらですか?", a: "月額プランと比較して約30%。正確な金額はプランページの支払い時に表示されます。" },
    { q: "いつでもサブスクリプションをキャンセルできますか?", a: "はい、キャンセルは管理パネルでワンクリックで行えます。キャンセル後、アカウントは支払い済み期間の終了まで動作し、その後一時停止されます。データは保持され、いつでも戻ることができます。" },
    { q: "どの支払い方法を受け付けていますか?", a: "Stripeを介したVisa、Mastercard、American Express。Apple PayとGoogle Payもサポート。ヨーロッパでは — 年間プランでSEPA Direct Debit。" },
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
        { "@type": "Offer", name: "Basic", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Pro", price: "24.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
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
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <LandingHeaderLp texts={DEFAULT.header} locale={LOCALE} featureLinks={DEFAULT.footer.featureLinks} />

      <Section dataSection="pricing_hero" noContainer>
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_ja_pricing_hero" />
      </Section>

      <Section id="faq" dataSection="faq" accent noContainer>
        <FaqLp texts={PRICING_FAQ} />
      </Section>

      <Section as="footer" dataSection="footer" noContainer className="!py-6 sm:!py-8">
        <LandingFooterLp texts={DEFAULT.footer} headerTexts={DEFAULT.header} locale={LOCALE} variant="lp" />
      </Section>
    </main>
  );
}
