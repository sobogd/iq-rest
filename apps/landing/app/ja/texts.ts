import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ja",
  htmlDir: "ltr",

  meta: {
    title: "レストラン向けQRメニュー — 直接注文、手数料ゼロ | IQ Rest",
    description:
      "レストラン向けオールインワンプラットフォーム:デジタルメニュー、QR注文、テーブル予約、キッチンディスプレイ。5分で開始。14日間無料、カード不要。",
    canonical: "https://iq-rest.com/ja",
    ogLocale: "ja_JP",
    ogTitle: "レストラン向けQRメニュー — 直接注文、手数料ゼロ",
    ogDescription:
      "デジタルメニュー、QR注文、テーブル予約、AI翻訳。5分で開始。14日間無料。",
  },

  ctaText: "無料で始める",
  homeCtaText: "プラットフォームを構築",
  demoText: "デモを見る",
  microcopy: "14日間無料 · カード不要 · いつでもキャンセル可能",

  header: {
    navFeatures: "機能",
    navHow: "仕組み",
    navPricing: "料金",
    navFaq: "よくある質問",
    signIn: "サインイン",
    viewFeatures: "機能を見る",
    cta: "無料で始める",
  },

  hero: {
    verticals: ["レストラン", "カフェ", "バー", "ホテル", "ピッツェリア"],
    headline: "レストラン向けデジタルメニュー。5分でオンライン。",
    sub: "5分でお店のデジタルメニューを作成。すべて込み:ノーコードエディタ、AI印刷メニュー認識、テーブル用QRコード、手数料なしの直接注文。",
    dynamicHeadlines: ["手数料0%。", "AI 35言語。", "オンライン注文。", "24/7予約。", "プレミアムデザイン。"],
    painBullets: [
      "手数料0%:すべての注文が直接お店に届きます。",
      "AI翻訳35言語 — 観光客はメニューを理解し、より多く注文します。",
      "24/7予約:ピーク時に電話なしで、お客様自身がテーブルを予約。",
      "柔軟な価格設定:メニューの更新は数秒で公開。",
    ],
    rating: "30か国以上で500以上のレストランが導入",
  },

  features: {
    heading: "必要なものすべて。",
    headingAccent: "余計なものはなし。",
    sub: "レストラン向けに作られています。テーブル、キッチン、フロアで毎日使われています。",
    items: [
      { Icon: Monitor, title: "デジタルメニュー", desc: "ブラウザのメニューに写真、価格、アレルゲン、説明を表示。スマートフォンからリアルタイム更新。お客様は自分の言語でメニューを見ることができ、お店は印刷コストを節約。", tag: "デジタルメニュー", href: "/ja/dejitaru-menyu-resutoran" },
      { Icon: Receipt, title: "注文受付:お客様とスタッフ", desc: "テーブルのQRコードからお客様が、またはスタッフがスマートフォンから注文 — どちらもキッチンまたはWhatsAppへ直接送信。手数料なし、すべての伝票にテーブル番号付き。", tag: "注文", href: "/ja/chumon-shisutemu-resutoran" },
      { Icon: CalendarCheck, title: "テーブル予約24/7", desc: "フロアで忙しい間、お客様がウェブサイトやQRメニューから自分で予約。テーブルごとのカレンダー、自動確認とリマインダー。お客様を1人も逃しません。", tag: "予約", href: "/ja/tesuto-yoyaku" },
      { Icon: ChefHat, title: "キッチンディスプレイ(KDS)", desc: "紙の伝票はもう不要。フロアからの注文がシェフの画面に直接届きます — 「調理中/準備完了/提供済み」の列、アレルゲンと備考を色で強調表示。タブレットまたはスマートフォンで。", tag: "KDS", href: "/ja/chubo-disupurei" },
    ],
  },

  founder: {
    eyebrow: "レストラン経営者が作りました",
    quoteStart:
      "妻と私は自分たちのカフェを経営しており、レストランの1日が実際にどのように動くか — 注文受付、予約、フロアとキッチンの流れ — を身をもって知っています。私たちはたった1つのツールが欲しかった:モダンで、立ち上げが簡単で、一目で分かるもの —",
    quoteAccent: "そうして他のレストラン経営者のために開発しているプラットフォームの構築を始めました。",
    sign: "ボグダン・ソコロフ · 創業者、元カフェオーナー",
    photoAlt: "ボグダン・ソコロフ、IQ Rest創業者",
  },

  how: {
    heading: "5分でオンライン",
    sub: "4つの短いステップ。インストール不要、技術的なセットアップ不要。",
    steps: [
      { n: "1", t: "種類と名前", d: "店舗の種類を選び、名前を入力してください。" },
      { n: "2", t: "保存", d: "メールアドレスを入力するか、Googleでサインインしてください。" },
      { n: "3", t: "メニュー", d: "手動で商品を追加するか、AI認識用に印刷メニューをアップロード。" },
      { n: "4", t: "完了", d: "リンクまたはQRコードを共有し、注文受付を開始。" },
    ],
  },

  pricing: {
    badge: "手数料なし · 契約なし",
    heading: "1つのプラン。",
    headingAccent: "すべて込み。",
    sub: "QRメニュー、注文受付、AI翻訳、レストランウェブサイト、予約。透明な月額料金1つ。",
    monthlyLabel: "月額",
    yearlyLabel: "年額",
    saveBadge: "25%節約",
    perMonth: "/月",
    billedAnnually: "年間請求:{total}",
    youSave: "{amount}節約",
    trust: { secure: "Stripeによる安全な支払い", noCommitment: "コミットメントなし", quick: "数分で有効", restaurants: "500+レストラン" },
  },

  faq: {
    eyebrow: "ご質問はありますか?",
    heading: "よくある",
    headingAccent: "質問。",
    sub: "登録前にレストラン経営者がよく尋ねる質問。質問が見つからない場合は、WhatsAppでメッセージをお送りください — ボットではなく実際の人が回答します。",
    whatsappCta: "WhatsAppで質問",
    whatsappPrefill: "こんにちは、IQ Restについて質問があります",
    items: [
      { q: "トライアル期間には何が含まれ、その後はどうなりますか?", a: "14日間、カード不要ですべての機能に完全アクセス可能。14日後に支払い方法が追加されていない場合、アカウントは一時停止されます — 自動課金は一切行いません。後で支払いを追加して、中断したところから続けることができます。ワンクリックでいつでもキャンセル可能。" },
      { q: "注文に手数料を取りますか?", a: "いいえ。QRメニューからのすべての注文はレストランに直接届きます — 当社からのパーセンテージや集約サービスの手数料はありません。固定の月額料金のみ、それ以外は一切ありません。" },
      { q: "お客様にはアプリが必要ですか?私たちには技術的なスキルが必要ですか?", a: "お客様にアプリは不要 — スマートフォンのカメラをQRコードに向けると、ブラウザでメニューが開きます。レストランも技術的なスキルは不要:管理パネルはスマートフォン、タブレット、ノートパソコンの任意のモダンブラウザで動作します。すべての操作はクリックとドラッグ&ドロップで、コードは一切不要。" },
      { q: "価格はどれくらい速く変更され、新しい料理が表示されますか?", a: "瞬時に。スマートフォンから価格を変更 — お客様は数秒以内に確認できます。新しい料理は数タップ:名前、価格、写真。再印刷もデザイナーの待ち時間も不要。" },
      { q: "何言語に対応していますか?", a: "AI翻訳が組み込まれた35言語。1タップでメニュー全体が翻訳され、AIは料理のコンテキストを理解 — 名前と説明はどの言語でも自然に聞こえます。観光客は本当にメニューを理解しているときに、より自信を持って注文します。" },
    ],
  },

  finalCta: {
    heading: "5分でオンライン。",
    headingAccent: "14日間無料。",
    sub: "カード不要、いつでもキャンセル可能。すでにIQ Restを使用している500以上のレストランに参加してください。",
  },

  scan: {
    heading: "紙のメニューまたはPDFをお持ちですか?",
    headingAccent: "AIが60秒でデジタル化します。",
    sub: "写真または文書をアップロード — AIがカテゴリ、料理、価格を自動的に認識します。",
    cta: "メニューをスキャン →",
  },

  pricingHero: {
    chips: ["手数料なし", "契約なし", "14日間無料"],
    heading: "料金。",
    headingAccent: "隠れた料金なし。",
    sub: "透明な月額料金1つ。注文に対するパーセンテージや集約サービスの手数料はありません。いつでも購読をキャンセルできます。",
    popularBadge: "人気",
    perMonthSuffix: "/月",
    whenAnnualTemplate: "年間請求 · €{total}/年",
    orMonthlyTemplate: "または €{price}/月",
    savingsTemplate: "€{amount}/年節約",
    plans: {
      basic: {
        name: "Basic",
        tagline: "メニュー、QR注文、AI翻訳。5分でオンライン。",
        features: [
          "すべてのテーブルにQRメニュー",
          "写真とアレルゲン付きデジタルメニュー",
          "AI翻訳35言語",
          "メニューからの注文(オプション)",
          "AIによる料理写真生成",
          "任意のスマートフォンまたはタブレットから管理",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "レストラン全体の管理:キッチンディスプレイと予約。",
        features: [
          "Basicのすべて",
          "キッチンディスプレイ(KDS)",
          "オンラインテーブル予約24/7",
          "優先WhatsAppサポート",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/ja/dejitaru-menyu-resutoran", label: "デジタルメニュー" },
      { href: "/ja/chumon-shisutemu-resutoran", label: "注文" },
      { href: "/ja/tesuto-yoyaku", label: "予約" },
      { href: "/ja/chubo-disupurei", label: "キッチンディスプレイ" },
    ],
    navLinks: [
      { href: "/ja/kakaku", label: "料金" },
      { href: "#faq", label: "よくある質問" },
      { href: "/ja/languages", label: "言語を変更" },
    ],
    copyrightTemplate: "© {year} IQ Rest. All rights reserved.",
  },
};
