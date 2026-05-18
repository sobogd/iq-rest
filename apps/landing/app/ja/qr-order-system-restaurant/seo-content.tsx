import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "テーブルごとに QR、スキャンして注文、アプリ不要",
  "リアルタイムでキッチン／マネージャーのタブレットに注文",
  "もしくは店舗の WhatsApp にルーティング",
  "モディファイア・バリエーション・アレルゲンが伝票に反映",
  "各注文にお客様の自由コメント",
  "キッチン用の日次番号付け",
  "35 言語の多言語チェックアウト、お客様の端末言語に自動対応",
  "注文ごとの手数料ゼロ — 月額固定サブスク",
];

const HOW_STEPS = [
  { title: "店舗で注文を有効化", desc: "店舗設定を開き、「注文を有効化」スイッチを ON。収集するお客様フィールド（氏名・電話・住所）を選択。" },
  { title: "配信チャネルを選ぶ", desc: "内部モードは新規注文を「キッチン」タブに送信。WhatsApp モードは整形メッセージとして店舗 WhatsApp に送信。あるいは両方並行。" },
  { title: "QR を印刷して設置", desc: "QR（テーブル毎または店舗共通）を PDF / PNG でダウンロードしてテーブルに貼付。お客様は標準カメラで読み取り — App Store も摩擦もなし。" },
  { title: "サービスを運営", desc: "注文がテーブル番号・商品・バリエーション・アレルゲン・コメント・日次番号付きで「キッチン」タブに表示。新規 → 対応中 → 完了。お客様のブラウザはリアルタイム更新。" },
];

const COMPARISON_ROWS = [
  ["注文ごと手数料", "20–30%", "0%", "0%（月額 6.90€ 固定）"],
  ["注文の届け先", "アグリゲーターアプリ", "自店レジ", "自店キッチンタブレット or WhatsApp"],
  ["伝票のテーブル番号", "なし", "手動", "あり、自動"],
  ["モディファイア／バリエーション", "限定的", "あり", "あり、アレルゲン付き"],
  ["多言語チェックアウト", "彼らのアプリ言語", "なし", "35 言語、自動"],
  ["必要なハードウェア", "アグリゲータータブレット", "POS 端末", "ブラウザのあるタブレット"],
  ["セットアップ時間", "オンボーディング電話", "数日〜数週", "5 分"],
];

export function SeoContent() {
  return (
    <>
      <Section noContainer dataSection="seo-intro">
        <div className="w-full">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-start">詳細</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-start">飲食店のオーダーシステムとは <span className="text-muted-foreground">何か</span></h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-start">マーケットプレイスでもなく、配達アグリゲーターでもない。テーブルにいるお客様のスマホからキッチンタブレット、または WhatsApp への直接的な線。</p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>IQ Rest が言う <strong>飲食店向けオーダーシステム</strong> とは、お客様がテーブルでスマホからメニューを開き、カートを作成し、キッチンに送信できるソフトウェアです — Uber Eats、出前館、Wolt などのマーケットプレイスを介しません。お客様はあなたの QR メニューから離れず、注文ごとの手数料も発生せず、伝票には本物のテーブル番号が記載されます。</p>
            <p>IQ Rest は 2 つのチャネルで動作します。デフォルトの <em>内部モード</em>：新規注文はキッチンタブレット／スマホ／ラップトップの「キッチン」タブに届きます — テーブル番号、商品とバリエーション、アレルゲン、お客様のコメント、キッチン用日次番号付き。代替の <em>WhatsApp モード</em>：同じ注文が整形メッセージとして店舗 WhatsApp に送信されます — 小規模チーム、テイクアウト中心、マネージャー不在の店舗に有用。両モード並行可能。</p>
          </div>
        </div>
      </Section>
      <Section noContainer dataSection="seo-benefits"><div className="w-full"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">実際に得られるもの</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">{BENEFITS.map((b) => (<div key={b} className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3"><div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="h-4 w-4" strokeWidth={2.5} /></div><p className="text-sm sm:text-base text-foreground/90 leading-snug">{b}</p></div>))}</div></div></Section>
      <Section noContainer dataSection="seo-how"><div className="w-full"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">IQ Rest 注文フローの仕組み</h3><p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-start">管理画面の 4 つのスイッチで稼働。インストーラー、POS ハードウェア、統合プロジェクト不要。</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">{HOW_STEPS.map((s, i) => (<div key={s.title} className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4"><div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">{i + 1}</div><div className="flex-1 min-w-0"><div className="text-base sm:text-lg font-semibold tracking-tight mb-1">{s.title}</div><p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p></div></div>))}</div></div></Section>
      <Section noContainer dataSection="seo-table"><div className="w-full"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-start">アグリゲーター、従来 POS、それともオーダーシステム</h3><div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto"><table className="w-full text-sm sm:text-base border-collapse"><thead><tr className="border-b border-border"><th className="text-left font-semibold py-3 pr-3 text-foreground">項目</th><th className="text-left font-semibold py-3 pr-3 text-muted-foreground">配達アグリゲーター</th><th className="text-left font-semibold py-3 pr-3 text-muted-foreground">従来 POS</th><th className="text-left font-semibold py-3 text-primary">IQ Rest 注文</th></tr></thead><tbody className="text-foreground/90">{COMPARISON_ROWS.map((row, i) => (<tr key={row[0]} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}><td className="py-3 pr-3 font-medium">{row[0]}</td><td className="py-3 pr-3 text-muted-foreground">{row[1]}</td><td className="py-3 pr-3 text-muted-foreground">{row[2]}</td><td className="py-3 text-foreground">{row[3]}</td></tr>))}</tbody></table></div><p className="text-sm text-muted-foreground leading-relaxed mt-6 text-start">飲食店が本当に所有するオーダーシステムは初週末で元を取ります — お客様が店で支払う 1 円 1 円が店に残り、レジ前の伝票は常に本物のテーブル番号付き。</p></div></Section>
    </>
  );
}
