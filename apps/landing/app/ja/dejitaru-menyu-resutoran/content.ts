import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ja",
  slug: "dejitaru-menyu-resutoran",
  trackPrefix: "l_ja_digital",
  hideFeatureHeading: true,

  meta: {
    title: "レストラン向けデジタルメニュー | IQ Rest",
    description:
      "レストラン向けデジタルメニュー:写真、アレルゲン、AI翻訳、リアルタイム価格更新付きオンラインメニュー。14日間無料、カード不要。",
    canonical: "https://iq-rest.com/ja/dejitaru-menyu-resutoran",
    ogLocale: "ja_JP",
    ogTitle: "レストラン向けデジタルメニュー",
    ogDescription:
      "紙のメニューのオンライン版 — 写真、アレルゲン、AI翻訳、リアルタイム更新。",
    brandLine: "IQ Rest — レストラン向けデジタルメニュー",
  },

  hero: {
    headline: "すべてが揃うデジタルメニュー",
    cta: "デジタルメニューを作成",
    sub: "写真、アレルゲン、35言語翻訳。さらに注文、WhatsApp、席予約まで — すべてIQ Rest一つで。",
  },

  scan: {
    heading: "紙のメニューまたはPDFをお持ちですか?",
    headingAccent: "AIが60秒でデジタル化します。",
    sub: "写真または文書をアップロード — AIがカテゴリ、料理、価格を自動的に認識します。",
    cta: "メニューをスキャン",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "AI 35言語",
      heading: "誰もが読める35言語",
      body: "1つのQRで35言語。AIが料理の文脈で翻訳し、どの料理も自然に伝わります。観光客も安心して注文できます。",
      bullets: [
        "プランに35言語込み",
        "GoogleではなくグルメAI",
        "ワンタップで言語切替",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "2人のお客様が自分のスマートフォンで同じデジタルメニューを異なる言語で読んでいる" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "アレルゲン",
      heading: "全料理にアレルゲン表示",
      body: "グルテン、乳糖、ナッツ、ヴィーガン、グルテンフリーをタグ付け。お客様は食事に合わせて絞り込み、楽に注文できます。",
      bullets: [
        "14のアレルゲン区分",
        "ヴィーガン・グルテンフリー表示",
        "食事制限で絞り込み",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "お客様がスマートフォンでアレルゲンによってメニューをフィルタリングし、オーナーがタブレットでアレルゲンリストを編集している" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "どの端末でも",
      heading: "どの端末でも管理できる",
      body: "管理画面はブラウザで動作 — メニュー、価格、写真をどこからでも編集。インストールは不要です。",
      bullets: [
        "どのブラウザでも動作",
        "スマホ・タブレット・PC",
        "インストール不要",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "手数料ゼロ",
      heading: "手数料ゼロ、追加費用なし",
      body: "明快なサブスク一つ。売上から一切徴収せず、隠れた費用もなし — すべてお店に残ります。",
      bullets: [
        "注文に0%",
        "隠れた追加費用なし",
        "定額ワンプライス",
      ],
    },
    {
      icon: Globe,
      eyebrow: "独自ドメイン",
      heading: "独自ドメインでメニュー公開",
      body: "SSL付きで独自ドメインを接続 — お客様はお店のアドレスでメニューを見られます。DNS設定も10分でサポート。",
      bullets: [
        "SSL付き独自ドメイン",
        "menu.restaurant.com",
        "DNS設定をサポート",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "自由なデザイン",
      heading: "お店に合う柔軟なデザイン",
      body: "複数の既製レイアウトとスタイル — 表紙、色、料理の見せ方をお店に合わせて選べます。",
      bullets: [
        "複数の既製レイアウト",
        "表紙と色を自由に",
        "数クリックで模様替え",
      ],
    },
    {
      icon: Contact,
      eyebrow: "連絡先",
      heading: "連絡先とSNSをメニューに",
      body: "地図、電話、InstagramとWhatsAppへのリンクを載せた専用ページ — お客様はワンタップでお店を見つけます。",
      bullets: [
        "地図・電話・住所",
        "InstagramとWhatsApp",
        "ワンタップで連絡",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp注文",
      heading: "WhatsAppで注文を受ける",
      body: "お客様はカートを作り、注文をそのままWhatsAppへ送信 — 別アプリ不要、いつものチャットで完結します。",
      bullets: [
        "WhatsAppへ注文",
        "別アプリ不要",
        "いつものチャットで",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "予約",
      heading: "電話なしで席予約",
      body: "お客様がメニューやリンクから自分で席を予約。テーブルごとのカレンダーを見て自動または手動で確定できます。",
      bullets: [
        "24/7予約、電話不要",
        "テーブル別カレンダー",
        "自動・手動で確定",
      ],
    },
    {
      icon: Palette,
      eyebrow: "プレミアムデザイン",
      heading: "PDFではなくサイトのよう",
      body: "ウェルカム画面の動画背景、コンセプトの説明、地図とSNS付きの独立した連絡先ページ。",
      bullets: [
        "ホーム画面に動画",
        "コンセプトと料理を紹介",
        "独立した連絡先ページ",
      ],
      image: { src: "/landing/feature-design.webp", alt: "カフェテーブルの2台のスマートフォン:ビデオ背景のメニューホーム画面と地図付き連絡先ページ" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "注文 · オプション",
      heading: "メニューから直接注文",
      body: "お客様はカートを作り注文を送信 — ホール、WhatsApp、厨房画面に届きます。オプション機能です。",
      bullets: [
        "タップでカート送信",
        "ホール・WhatsApp・厨房へ",
        "設定でオン・オフ",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "テーブルの2台のスマートフォン:注文付きカートと注文送信確認" },
    },
  ],

  faq: {
    sub: "レストラン経営者がIQ Restのデジタルメニューについて尋ねる質問。質問が見つからない場合は、WhatsAppでメッセージをお送りください。",
    items: [
      { q: "技術的なスキルやCMSの経験が必要ですか?", a: "いいえ、特別なスキルは必要ありません。管理パネルのすべての操作はクリックとドラッグ&ドロップで行います — コードは不要です。メニューに項目を追加するのに数秒かかります:名前、価格、写真。完全なメニュー設定は通常30分から1時間かかります。" },
      { q: "IQ Restのデジタルメニューとは何ですか?", a: "IQ Restはレストラン向けクラウドプラットフォームです。デジタルメニューは、QRコードまたは直接リンクを介してお客様が利用できるメニューのオンライン版です:料理の写真、価格、アレルゲン、35言語のAI翻訳、リアルタイム更新。メニューは当社のサーバーでホストされ、ソフトウェアのインストールやメンテナンスは不要 — ブラウザを開くだけです。" },
      { q: "お客様にはアプリや特別なハードウェアが必要ですか?", a: "いいえ。お客様はスマートフォンのカメラをQRコードに向けると、ブラウザでメニューが開きます。レストランの管理パネルもスマートフォン、タブレット、ノートパソコンの任意のモダンブラウザで動作します。QRコードはオフィスプリンタで印刷できます。" },
      { q: "独自のドメインでメニューをホストできますか?", a: "はい。SSL証明書付きのカスタムドメインをサポート — お客様はレストランのアドレスでメニューを表示できます(例:menu.yourrestaurant.jp)。DNS設定をお手伝いします;通常5〜10分かかります。" },
      { q: "1つのアカウントから複数のレストランを管理できますか?", a: "はい、リクエストに応じて。1つのアカウントで複数のレストランをホストできます:各店舗に独自のメニュー、デザイン、QRコード、分析。WhatsAppでメッセージをお送りいただければ、グループのマルチレストランモードを有効にします。" },
      { q: "メニューをゼロから設定するのはどれくらい難しいですか?", a: "設定は3つのステップで構成されます:(1) カテゴリを作成、(2) 名前、価格、写真を付けて項目を追加、(3) テーブル用のQRコードを印刷。すでに紙のメニューまたはPDFをお持ちの場合は、アップロードしてください — AIがカテゴリ、名前、価格を認識し、カードを自動的に入力します。基本的なメニューは5分でオンラインに公開できます。合計時間は項目数によって異なります。" },
      { q: "どのようなサポートを提供していますか?", a: "営業時間中はWhatsAppで対応可能で、メールにも迅速に対応します。初期設定、ドメイン設定、メニューデザイン、その他の非標準的な状況についてサポートします。立ち上げ時のデモまたはハンズオンサポートが必要な場合は、メッセージをお送りください。" },
    ],
  },
};
