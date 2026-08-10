import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import { TEXTS as DEFAULT } from "../texts";
import { TEXTS } from "./texts";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ja";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "レストラン経営者が料金と支払いについてよく尋ねる質問。お探しの質問が見つからない場合は、WhatsAppでお気軽にメッセージをお送りください。",
  items: [
    { q: "料金はどのような仕組みですか?", a: "プランはご自身で組み立てます。ベースとなるのはデジタルQRメニューで、35言語のAI翻訳と任意のデバイスからの管理が含まれます。そこに必要な機能だけを追加します:テーブル予約、注文受付付きのキッチンディスプレイ、独自ドメインなど。料金は1店舗ごとで、2店舗目からはボリューム割引が自動的に適用されます。" },
    { q: "注文に手数料を取りますか?", a: "いいえ。QRメニューからの注文でも、スタッフが受け付けた注文でも、すべてレストランに直接届きます。パーセンテージや集約サービスの手数料は一切ありません。固定の月額料金のみで、その他の控除はありません。" },
    { q: "14日間のトライアルには何が含まれますか?", a: "すべての機能に完全アクセスでき、カードの登録は不要です。14日後、支払い方法が接続されていない場合、アカウントは自動的に一時停止されます。同意なしに自動課金されることはありません。" },
    { q: "14日後はどうなりますか?", a: "支払い方法が接続されていない場合、アカウントは自動的に一時停止されます。管理パネルは読み取り専用モードで引き続き利用できますが、ゲスト用QRメニューと注文受付は一時的に無効になります。同意なしに課金することはありません。" },
    { q: "一時停止中、メニュー、注文、データはどうなりますか?", a: "すべて完全に保持されます:メニュー、料理の写真、注文履歴、予約、デザイン設定、統計。1か月後でも半年後でも、支払いを接続すればすべて元どおりに戻り、何も失われません。" },
    { q: "トライアル後、テーブルのQRコードはまだ機能しますか?", a: "アカウントが一時停止されている場合、QRコードはお客様に「一時的に利用できません」という表示を見せます。新しいQRコードを印刷する必要はありません:支払いを接続すればすぐに、同じコードで再びメニューが開きます。" },
    { q: "あとでプランを変更できますか?", a: "はい。管理パネルでいつでも機能を追加・削除できます。差額は支払い済み期間の残り日数に応じて日割り計算されます。機能を削除した場合、その機能はオフになりますが、データはすべて保持されます。" },
    { q: "何店舗まで管理できますか?", a: "必要なだけ管理できます。プランを組み立てる際に店舗数を選び、すべてを1つのダッシュボードから管理します。ボリューム割引が自動的に適用され、5店舗以上で最大50%オフになります。より大規模なグループを運営されていますか?カスタムプランについてはWhatsAppでお気軽にご連絡ください。" },
    { q: "年間割引はどのくらいですか?", a: "月額払いと比べて約30%です。正確な金額はプランを組み立てる際に表示されます。" },
    { q: "いつでもサブスクリプションをキャンセルできますか?", a: "はい、キャンセルは管理パネルでワンクリックです。キャンセル後、アカウントは支払い済み期間の終了まで利用でき、その後一時停止されます。データは保持され、いつでも再開できます。" },
    { q: "どの支払い方法に対応していますか?", a: "StripeによるVisa、Mastercard、American Express。Apple PayとGoogle Payにも対応しています。ヨーロッパでは、年間プランでSEPA Direct Debitをご利用いただけます。" },
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
    />
  );
}
