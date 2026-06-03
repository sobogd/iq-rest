import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["レストラン","カフェ","バー","ピッツェリア"],
    title: "あなたのお店を、",
    titleAccent: "5分で完全デジタルに。",
    sub: "モダンな飲食店を運営するための完結型プラットフォーム。美しく、すべてが一つに、専門知識は不要です。",
  },

  heroMicrocopy: "{count} 店舗 · 14日間無料 · カード不要",
  seeIncluded: "含まれる内容を見る",

  trust: [
    { kind: "num", value: 35, label: "言語" },
    { kind: "text", value: "24/7", label: "予約" },
    { kind: "num", value: 5, suffix: " min", label: "開始" },
    { kind: "count", label: "店舗" },
  ],

  bundle: {
    heading: "お店の運営に必要なすべてを。",
    headingAccent: "一つのアプリで。",
    sub: "メニュー、キッチン、予約を一つに——モダンで速く、飲食店の実際の動き方に合わせて作られています。追加課金も機能ごとの料金もありません。",
  },

  benefits: [
    { Icon: Languages, tag: "デジタルメニュー", title: "売れるメニュー。", bullets: ["AIで35言語","上質なデザイン","価格を即時更新"], image: "/landing/feature-design.webp", imageAlt: "カフェのテーブルに2台のスマホ：デジタルメニューのウェルカム画面と地図付きの連絡先ページ" },
    { Icon: ChefHat, tag: "キッチンディスプレイ", title: "速く作り、見落とさない。", bullets: ["画面にリアルタイム","メモとアレルゲン","タブレットかスマホ"], image: "/landing/feature-kds-cards.webp", imageAlt: "カウンターのタブレットがテーブルごとの注文とともにキッチンディスプレイを表示" },
    { Icon: CalendarCheck, tag: "予約", title: "予約を自動操縦で。", bullets: ["セルフ予約","自動確認","テーブル別カレンダー"], image: "/landing/feature-booking-calendar.webp", imageAlt: "2台のタブレットが予約カレンダーを表示：テーブル別の日次ビューと月次ビュー" },
    { Icon: Receipt, tag: "テーブルで注文", title: "注文はまっすぐ厨房へ。", bullets: ["お客様かスタッフ","厨房へ直接","いつでもオン/オフ"], image: "/landing/feature-orders.webp", imageAlt: "スタッフがテーブルでスマホから注文を取り、キッチンディスプレイに届く" },
  ],

  seeDetails: "詳細を見る",

  extras: {
    heading: "その他すべても含まれます。",
    items: [
      { Icon: ScanLine, label: "AIが紙のメニューを60秒でデジタル化" },
      { Icon: QrCode, label: "各テーブルに固有のQRコード" },
      { Icon: Smartphone, label: "お客様にアプリ不要——ブラウザで開く" },
      { Icon: Globe, label: "独自ドメイン（SSL対応）" },
      { Icon: BarChart3, label: "売上分析：売上、人気メニュー、時間帯" },
      { Icon: Palette, label: "アレルゲン・食事タグで絞り込み" },
    ],
  },

  midCta: {
    heading: "5つではなく、1つのアプリで。",
    sub: "メニュー、キッチン、予約に別々のツールを使い分ける必要はもうありません——すべてが一つに、どのスマホやタブレットでも、インストール不要。",
  },

  how: {
    heading: "5分で公開",
    sub: "4ステップ。インストール不要、技術設定不要、カード不要。",
    steps: [
      { n: "1", t: "種類と名前", d: "店舗の種類と名前——登録はこれだけ。" },
      { n: "2", t: "ログイン", d: "メールまたはGoogle。カード不要。" },
      { n: "3", t: "メニューを追加", d: "入力するか、AIに紙のメニューをスキャンさせるだけ。" },
      { n: "4", t: "公開完了", d: "メニュー、キッチン、予約——準備完了。" },
    ],
  },
};
