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

const LOCALE = "zh";
const SITE = "https://iq-rest.com";

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: "餐厅老板关于价格和付款的常见问题。找不到您的问题?在 WhatsApp 上给我们留言。",
  items: [
    { q: "Basic 和 Pro 有什么区别?", a: "Basic 包括数字 + QR 菜单、35 种语言的 AI 翻译、从菜单接单(可选)以及从任何设备进行管理。Pro 增加了厨房显示屏 (KDS) 和 24/7 在线餐桌预订,还有 WhatsApp 优先支持。如果您不需要厨房工作流和预订 — Basic 涵盖一切。" },
    { q: "您从订单中收取佣金吗?", a: "不。每个订单 — 来自 QR 菜单或服务员接受 — 都直接到达餐厅,没有百分比或聚合器佣金。您有一笔固定的月费,没有其他扣款。" },
    { q: "14 天试用包含什么?", a: "两种计划中所有功能的完整访问权限,无需信用卡。14 天后,如果没有连接付款方式,账户会自动暂停。未经您同意,绝不自动扣款。" },
    { q: "14 天后会发生什么?", a: "如果没有连接付款方式,账户会自动暂停。管理面板仍以只读模式可用,但客人 QR 菜单和接单将暂时禁用。我们绝不在未经您同意的情况下扣款。" },
    { q: "暂停期间我的菜单、订单和数据会怎样?", a: "一切都完整保留:菜单、菜品照片、订单历史、预订、设计设置、统计数据。即使一个月或六个月后再连接付款 — 一切都会原样恢复,没有任何丢失。" },
    { q: "试用期后餐桌上的 QR 码还能使用吗?", a: "如果账户暂停,QR 码会向客人显示「暂时不可用」的占位符。您无需打印新的 QR 码:一旦连接付款,同样的 QR 码就会再次打开菜单。" },
    { q: "我以后可以从 Basic 切换到 Pro 吗?", a: "可以,升级只需在管理面板中点击一下。附加费按已付期间的剩余天数按比例计算。也可以从 Pro 降级到 Basic — KDS 和预订将被禁用,但所有数据都会保留。" },
    { q: "年度折扣是多少?", a: "比月度计划约低 30%。具体金额在计划页面结账时显示。" },
    { q: "我可以随时取消订阅吗?", a: "可以,取消只需在管理面板中点击一下。取消后,账户在已付期结束前继续工作,然后暂停。数据将保留,您可以随时回来。" },
    { q: "您接受哪些付款方式?", a: "通过 Stripe 接受 Visa、Mastercard 和 American Express。也支持 Apple Pay 和 Google Pay。在欧洲 — 年度计划支持 SEPA Direct Debit。" },
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
        <PricingHero locale={LOCALE} ctaText={DEFAULT.ctaText} demoText={DEFAULT.demoText} microcopy={DEFAULT.microcopy} texts={DEFAULT.pricingHero!} trackPrefix="l_zh_pricing_hero" />
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
