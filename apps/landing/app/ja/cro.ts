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
    title: "あなたのお店を、5分で完全デジタルに。",
    titleAccent: "",
    sub: "美しいデジタルメニュー、キッチンディスプレイ、24時間予約——モダンな飲食店のための完結型プラットフォーム。",
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
    { Icon: Receipt, tag: "テーブルで注文", title: "注文はまっすぐ厨房へ。", bullets: ["お客様かスタッフ","厨房へ直接","いつでもオン/オフ"], image: "/landing/feature-orders-map.webp", imageAlt: "注文画面のタブレット：注文リストと、色分けされたテーブルのフロアマップ。" },
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

  platform: {
    hardwareTitle: "お手持ちの機器で利用可能",
    hardwareSub: "当社からの機器購入を強制することはありません。すでにお持ちのスマホ、タブレット、パソコンをそのままお使いいただけます。",
    anywhereTitle: "どこでも動作",
    anywhereSub: "スマホ、タブレット、ノートPC、デスクトップ。Android、iOS、Windows、Mac、Linux。最新のブラウザならインストール不要で動作します。",
  },

  activities: {
    heading: "ひとつのシステムで、",
    headingAccent: "レストランのすべてを。",
    sub: "より速い接客、落ち着いた厨房、コスト削減、そして記憶に残る体験 — すべてをひとつのプラットフォームで。",
    groups: [
      {
        Icon: Smartphone,
        tag: "テーブルで — お客様",
        bullets: [
          "35言語対応のQRメニュー",
          "店員を待たずに注文",
          "店員の呼び出しや会計のリクエスト",
          "24時間いつでもテーブル予約",
          "各テーブルに固有のQRコード",
          "お客様にアプリ不要——ブラウザで開く",
          "アレルゲン・食事タグで絞り込み",
        ],
      },
      {
        Icon: ChefHat,
        tag: "厨房で",
        bullets: [
          "注文が即座に画面に表示",
          "調理中／完成／提供済みの列表示",
          "アレルゲンとメモを強調表示",
          "タブレットやスマホで — 紙の伝票不要",
        ],
      },
      {
        Icon: BarChart3,
        tag: "管理",
        bullets: [
          "メニューと価格の変更が即時反映",
          "AI翻訳をワンクリックで",
          "売上分析とレポート",
          "1つのアカウントで複数店舗を管理",
          "AIが紙のメニューを60秒でデジタル化",
          "独自ドメイン（SSL対応）",
        ],
      },
    ],
  },
};
