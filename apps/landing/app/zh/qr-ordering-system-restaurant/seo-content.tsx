import { Check } from "lucide-react";
import { Section } from "@/app/_landing/components/section";

const BENEFITS = [
  "每桌一个二维码，扫码点餐，无需应用",
  "实时订单到厨房或经理平板",
  "或路由到餐厅 WhatsApp — 由您选择",
  "修饰符、变体和过敏原都传到单据",
  "每个订单都有客人自由备注",
  "厨房用每日编号",
  "35 种语言多语言结账，按客人手机自动识别",
  "零订单佣金 — 固定月度订阅",
];

const HOW_STEPS = [
  { title: "在餐厅启用点餐", desc: "打开餐厅设置，启用「点餐」开关，选择要收集的客人字段（姓名、电话、地址）。" },
  { title: "选择交付渠道", desc: "内部模式发送新订单到「厨房」标签。WhatsApp 模式作为格式化消息发送到餐厅 WhatsApp。或两者并行。" },
  { title: "打印并粘贴二维码", desc: "下载二维码（每桌一张或全店一张），PDF 或 PNG，贴到桌上。客人用原生相机扫描 — 无应用商店、无摩擦。" },
  { title: "运营服务", desc: "订单在「厨房」标签出现，含桌号、菜品、变体、过敏原、备注和每日编号。在「新 → 进行中 → 完成」间切换。客人浏览器实时更新。" },
];

const COMPARISON_ROWS = [
  ["订单佣金", "20–30%", "0%", "0%（€6.90/月固定）"],
  ["订单去向", "聚合应用", "您的收银机", "您的厨房平板或 WhatsApp"],
  ["单据桌号", "无", "手动", "有，自动"],
  ["修饰符 / 变体", "有限", "有", "有，含过敏原"],
  ["多语言结账", "他们应用的语言", "无", "35 种语言，自动"],
  ["所需硬件", "聚合方平板", "POS 终端", "任何带浏览器的平板"],
  ["设置时间", "入门电话", "数日至数周", "5 分钟"],
];

export function SeoContent() {
  return (
    <>
      <Section dataSection="seo-intro">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3 text-center">详细</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">餐厅在线点餐系统 <span className="text-muted-foreground">究竟是什么</span></h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">不是市场。不是配送聚合。客人坐在您桌边手机到您厨房平板 — 或您 WhatsApp 的直接通路。</p>
          <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed">
            <p>IQ Rest 意义上的<strong>餐厅在线点餐系统</strong>是允许客人坐在您餐桌上用手机打开菜单、组建购物车并将订单发送到您厨房的软件 — 不涉及 Uber Eats、美团、Wolt 或任何其他市场。客人从未离开您的二维码菜单，您不支付每单佣金，单据带真实桌号。</p>
            <p>IQ Rest 围绕两个交付渠道构建。默认<em>内部模式</em>：每个新订单进入仪表板「厨房」标签 — 显示桌号、菜品、变体、过敏原、客人备注和厨房用日编号。另一种是 <em>WhatsApp 模式</em>：同一订单作为格式化消息发送到餐厅 WhatsApp 号码 — 适合小团队、以外带为主或经理不在场的情况。两种模式可并行运行。</p>
          </div>
        </div>
      </Section>
      <Section dataSection="seo-benefits"><div className="max-w-4xl mx-auto"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">您实际得到的</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">{BENEFITS.map((b) => (<div key={b} className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-5 flex flex-row items-center gap-3"><div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="h-4 w-4" strokeWidth={2.5} /></div><p className="text-sm sm:text-base text-foreground/90 leading-snug">{b}</p></div>))}</div></div></Section>
      <Section dataSection="seo-how"><div className="max-w-4xl mx-auto"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">IQ Rest 点餐流程如何运作</h3><p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 text-center">仪表板里 4 个开关，您就上线了。无需安装、无 POS 硬件、无集成项目。</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">{HOW_STEPS.map((s, i) => (<div key={s.title} className="bg-muted/20 border border-border rounded-2xl p-5 flex flex-row items-start gap-4"><div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-base">{i + 1}</div><div className="flex-1 min-w-0"><div className="text-base sm:text-lg font-semibold tracking-tight mb-1">{s.title}</div><p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p></div></div>))}</div></div></Section>
      <Section dataSection="seo-table"><div className="max-w-4xl mx-auto"><h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-6 text-center">聚合方、经典 POS 或点餐系统</h3><div className="bg-muted/20 border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto"><table className="w-full text-sm sm:text-base border-collapse"><thead><tr className="border-b border-border"><th className="text-left font-semibold py-3 pr-3 text-foreground">特征</th><th className="text-left font-semibold py-3 pr-3 text-muted-foreground">配送聚合方</th><th className="text-left font-semibold py-3 pr-3 text-muted-foreground">经典 POS</th><th className="text-left font-semibold py-3 text-primary">IQ Rest 点餐</th></tr></thead><tbody className="text-foreground/90">{COMPARISON_ROWS.map((row, i) => (<tr key={row[0]} className={i < COMPARISON_ROWS.length - 1 ? "border-b border-border/50" : ""}><td className="py-3 pr-3 font-medium">{row[0]}</td><td className="py-3 pr-3 text-muted-foreground">{row[1]}</td><td className="py-3 pr-3 text-muted-foreground">{row[2]}</td><td className="py-3 text-foreground">{row[3]}</td></tr>))}</tbody></table></div><p className="text-sm text-muted-foreground leading-relaxed mt-6 text-center">真正归餐厅所有的在线点餐系统在第一个周末就能收回成本 — 客人在您餐厅花的每一块钱都留在您餐厅，备餐台单据始终带真实桌号。</p></div></Section>
    </>
  );
}
