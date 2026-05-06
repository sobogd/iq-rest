import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ja", htmlDir: "ltr",
  meta: {
    title: "レストラン向けQRメニュー — 直接注文、手数料ゼロ | IQ Rest",
    description: "紙のメニューとデリバリーアプリの手数料に終止符を。QRメニュー、直接注文、予約、多言語サイト。14日間無料、カード不要。",
    canonical: "https://iq-rest.com/ja", ogLocale: "ja_JP",
    ogTitle: "レストラン向けQRメニュー — 直接注文、手数料ゼロ",
    ogDescription: "QRメニュー、直接注文、予約、AI翻訳。2分で稼働。14日間無料 — カード不要。",
  },
  ctaText: "無料で試す", ctaSite: "サイト作成",
  demoText: "ライブデモを見る", microcopy: "14日間無料 · カード不要 · いつでも解約",
  header: { navFeatures: "機能", navHow: "使い方", navPricing: "料金", navFaq: "FAQ", signIn: "ログイン", cta: "無料で試す" },
  hero: {
    verticals: ["レストラン", "カフェ", "バー", "ホテル", "ピザ店"],
    qr: { headline: "5分でQRメニュー作成。", sub: "レストランの完成済みウェブサイト — 開発者も外注も不要。直接注文、予約、ゲスト分析が一つのサブスクで。" },
    web: { headline: "5分でレストランサイト公開。", sub: "レストランの完成済みウェブサイト — 開発者も外注も不要。直接注文、予約、ゲスト分析が一つのサブスクで。" },
    dynamicHeadlines: ["手数料0%。", "35言語対応 AIで。", "オンライン注文。", "24時間予約受付。", "高級感あるデザイン。"],
    painBullets: ["手数料0%：すべての注文は直接あなたに届きます。", "AI翻訳：観光客の客単価を上げる35言語対応。", "24時間予約：電話応対なしで満席を実現。", "柔軟な価格設定：メニューを数秒で更新。"],
    rating: "4.9 · 30か国以上で500軒超のレストラン",
  },
  features: {
    heading: "必要なものすべて。", headingAccent: "余分なものは何も。",
    sub: "レストランのために。テーブルで使う。",
    items: [
      
      { Icon: ScanLine, title: "テーブル注文", desc: "注文はテーブル番号と共にWhatsAppや管理画面に即座に届きます。接客を効率化し、売上アップ。", tag: "直接注文" },
      { Icon: Languages, title: "AI翻訳（35言語）", desc: "食の文脈を理解するAI。メニューの内容が伝わると、観光客の注文数は20%増加します。", tag: "AI翻訳" },
      { Icon: CalendarCheck, title: "テーブル予約", desc: "忙しい調理中でもシステムが自動で予約受付。顧客を逃しません。", tag: "予約" },
      { Icon: Palette, title: "モダンなデザイン", desc: "動画背景とシズル感のある写真。一目で食欲をそそる高級感のあるメニューを。", tag: "カスタムデザイン" },
      { Icon: Smartphone, title: "クイック編集", desc: "売り切れ設定や価格改定もスマホで完結。変更は即座に反映されます。", tag: "メニューエディタ" },
      { Icon: ChefHat, title: "近日公開：キッチンディスプレイ", desc: "紙の伝票は不要。ホールの注文が即座に調理場の画面に表示されます。", tag: "近日公開" },
    
    ],
  },
  founder: {
    eyebrow: "レストランオーナーが作った",
    quoteStart: "妻と私は小さなカフェを開き、オンライン注文・予約・モダンなデザインを兼ね備えたシステムを何週間も探しました。試したものはすべて重く、見栄えが悪く、半分の機能が抜けていました —",
    quoteAccent: "そこで自分たちが欲しかったものを作りました。",
    sign: "ボグダン・ソコロフ · 創業者、元カフェオーナー",
    photoAlt: "ボグダン、IQ Rest の創業者",
  },
  how: {
    heading: "2分以内で稼働",
    sub: "短い4ステップ。インストール不要、技術設定不要。",
    steps: [
      { n: "1", t: "登録", d: "メールかGoogle。カード不要。10秒で完了。" },
      { n: "2", t: "店名を入力", d: "店名を入れるだけ。メニュー上部に表示。" },
      { n: "3", t: "最初の料理を追加", d: "カテゴリ、名前、価格、写真。それだけ。" },
      { n: "4", t: "背景を選んでQRを印刷", d: "背景を選び、QRを取り、テーブルに貼る。" },
    ],
  },
  pricing: {
    badge: "手数料ゼロ · 契約なし",
    heading: "プランは一つ。", headingAccent: "すべて込み。",
    sub: "QRメニュー、注文、AI翻訳、レストランサイト、予約。シンプルな一つの価格。",
    monthlyLabel: "月額", yearlyLabel: "年額", saveBadge: "25%お得", perMonth: "/月",
    billedAnnually: "年一括 {total}", youSave: "{amount} お得",
    trust: { secure: "Stripeで安全決済", noCommitment: "縛りなし", quick: "数分で稼働", restaurants: "500軒以上のレストラン" },
  },
  faq: {
    eyebrow: "ご質問？", heading: "よくある", headingAccent: "ご質問。",
    sub: "登録前にレストランオーナーが尋ねること。あなたのが見当たらない？WhatsAppに送ってください — 本物の人間が返信します。",
    whatsappCta: "WhatsAppで聞く", whatsappPrefill: "こんにちは、IQ Restについて質問があります",
    items: [
      { q: "無料トライアルに含まれるものと、その後はどうなる？", a: "14日間フルアクセス、カード不要。14日後に支払い方法を追加しなければアカウントは停止 — 自動課金は一切しません。後で支払い情報を追加すれば再有効化。ワンクリックでキャンセル。" },
      { q: "注文に手数料はかかる？", a: "ゼロ。QRメニューからの注文はすべて直接あなたへ — 当社の取り分なし、Uber Eats / 出前館の手数料もなし。月額固定の一つの価格、それだけ。" },
      { q: "お客様にアプリは必要？技術スキルは必要？", a: "お客様にアプリは不要 — カメラでQRを読み、ブラウザでメニューが開きます。あなたに技術スキルは不要 — ダッシュボードはスマホで動作、タップで追加、ドラッグで並べ替え、これが学習曲線のすべて。" },
      { q: "価格の変更や料理追加はどれくらい速い？", a: "即座。スマホで価格を変更、お客様には数秒で反映。新しい料理？タップ、入力、写真、完了 — 再印刷なし、デザイナー待ちなし。" },
      { q: "対応言語は？", a: "AI翻訳内蔵で35言語。ワンタップでメニュー全部を翻訳、AIが料理の文脈を理解 — 名前と説明がどの言語でも自然に響きます。観光客は本当に理解した時に注文を増やします。" },
    ],
  },
  finalCta: { heading: "2分で稼働。", headingAccent: "14日間無料。", sub: "カード不要。いつでもキャンセル。すでにIQ Restを使う500軒超のレストランに参加しよう。" },
  scan: {
    heading: "紙のメニューや PDF をお持ちですか？",
    headingAccent: "AI が 60 秒でデジタル化します。",
    sub: "アップロードするだけ — AI がカテゴリー、料理、価格を抽出します。",
    cta: "メニューをスキャン →",
  },
  footer: {
    featureLinks: [
      { href: "/ja/online-orders", label: "オンライン注文" }, { href: "/ja/ai-translation", label: "AI翻訳" },
      { href: "/ja/reservations", label: "予約" }, { href: "/ja/mobile-management", label: "スマホ管理" },
      { href: "/ja/easy-menu", label: "メニューエディタ" }, { href: "/ja/custom-design", label: "動画・写真背景" },
      { href: "/ja/color-scheme", label: "ブランドカラー" }, { href: "/ja/multilingual", label: "多言語サイト" },
      { href: "/ja/ai-images", label: "AI画像最適化" }, { href: "/ja/analytics", label: "アナリティクス" },
      { href: "/ja/instant-setup", label: "即時セットアップ" }, { href: "/ja/personal-support", label: "個別サポート" },
    ],
    navLinks: [
      { href: "#pricing", label: "料金" }, { href: "#faq", label: "質問" },
      { href: "/ja/languages", label: "言語を変更" },
    ],
    copyrightTemplate: "© {year} IQ Rest. 全著作権所有。",
  },
};
