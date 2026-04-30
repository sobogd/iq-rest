import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";
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
  ctaText: "無料で始める →",
  demoText: "ライブデモを見る", microcopy: "14日間無料 · カード不要 · いつでも解約",
  header: { navFeatures: "機能", navHow: "使い方", navPricing: "料金", navFaq: "FAQ", signIn: "ログイン", cta: "無料で始める →" },
  hero: {
    verticals: ["レストラン", "カフェ", "バー", "ホテル", "ピザ店"],
    variants: [
      { headline: "メニューを刷り続けるのをやめよう。", headlineAccent: "デリバリーアプリに30%払うのをやめよう。", sub: "QRメニュー、直接注文、予約、多言語サイト。2分で稼働 — カード不要。" },
      { headline: "あなたの店は", headlineAccent: "紙メニューと取り逃しの電話より上だ。", sub: "直接注文、即時メニュー更新、24時間予約。2分で設定完了。" },
      { headline: "QRコード一つ。", headlineAccent: "手数料ゼロ。紙にさよなら。", sub: "QRメニュー、オンライン注文、予約 — 全部一つに。14日間無料、カード不要。" },
      { headline: "直接注文を受け取ろう。", headlineAccent: "手数料はスキップ。", sub: "お客様がスキャンして注文・支払い — 直接あなたへ、Uber Eatsの取り分なし。2分で稼働。" },
      { headline: "もっと注文。もっと予約。", headlineAccent: "紙なし、アプリなし。", sub: "QRメニュー + 予約 + 多言語サイトを自動運転。14日間無料トライアル。" },
      { headline: "観光客がメニューを読めない？", headlineAccent: "2分で解決。", sub: "AIがメニュー全部を35言語へ翻訳。さらにQR注文と予約も込み。" },
      { headline: "紙メニューからQRコードへ、", headlineAccent: "エスプレッソが冷める前に。", sub: "QRメニュー、直接注文、24時間予約。2分で稼働 — カード不要。" },
      { headline: "驚くほどシンプルなQRメニュー。", headlineAccent: "中身は静かにパワフル。", sub: "直接注文、AI翻訳、予約、ウェブサイト — すべてスマホのワンタップで。" },
    ],
    painBullets: ["印刷不要 — 価格は今すぐ変更", "手数料ゼロ — 注文は直接あなたへ", "電話の取り逃しなし — 24時間予約", "35言語 — 観光客を逃さない"],
    rating: "4.9 · 30か国以上で500軒超のレストラン",
  },
  features: {
    heading: "必要なものすべて。", headingAccent: "余分なものは何も。",
    sub: "レストランのために。テーブルで使う。",
    items: [
      { Icon: ScanLine, title: "全注文の100%を自分のものに", desc: "お客様がスキャン、注文、支払い — 直接あなたへ。アプリのダウンロード不要、配達手数料30%もなし。すべての注文が卓番付きでリアルタイムにダッシュボードへ届きます。" },
      { Icon: Languages, title: "観光客に彼らの言葉で売る", desc: "ワンタップでメニュー全部を35言語へ翻訳。AIが料理の文脈を理解 — 料理を本当に理解した時、お客様は注文を増やします。" },
      { Icon: CalendarCheck, title: "調理中も予約を逃さない", desc: "お客様が24時間予約、電話不要。自動または手動確認、メールリマインダー込み — 無断キャンセル減、ストレスゼロ。" },
      { Icon: Palette, title: "1秒で忘れられない印象", desc: "厨房の動画や料理の写真をメニュー背景に。お客様はスクロールを止め、ブランドが心に残ります。" },
      { Icon: Smartphone, title: "数秒で更新、何日も待たない", desc: "価格、写真、本日のおすすめ — スマホから、テーブルの合間に。お客様には即時反映。再印刷は不要。" },
      { Icon: ListPlus, title: "LINEが送れれば使える", desc: "タップで料理追加。ドラッグで並べ替え。売り切れはオフ。マニュアルなし、チュートリアルなし、学習曲線なし。" },
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
      { q: "一つのアカウントで複数のレストランを管理できる？", a: "はい。Proプランで一つのアカウントに複数のレストラン — 別々のメニュー、別々のQR、別々の分析、ログインは一つ。2タップで切り替え。" },
      { q: "価格の変更や料理追加はどれくらい速い？", a: "即座。スマホで価格を変更、お客様には数秒で反映。新しい料理？タップ、入力、写真、完了 — 再印刷なし、デザイナー待ちなし。" },
      { q: "対応言語は？", a: "AI翻訳内蔵で35言語。ワンタップでメニュー全部を翻訳、AIが料理の文脈を理解 — 名前と説明がどの言語でも自然に響きます。観光客は本当に理解した時に注文を増やします。" },
    ],
  },
  finalCta: { heading: "2分で稼働。", headingAccent: "14日間無料。", sub: "カード不要。いつでもキャンセル。すでにIQ Restを使う500軒超のレストランに参加しよう。" },
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
    legalLinks: [
      { href: "/ja/terms", label: "利用規約" }, { href: "/ja/privacy", label: "プライバシー" },
      { href: "/ja/cookies", label: "Cookie" }, { href: "/sitemap.xml", label: "サイトマップ" },
    ],
    copyrightTemplate: "© {year} IQ Rest. 全著作権所有。",
  },
};
