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
    verticals: ["餐厅","咖啡馆","酒吧","披萨店"],
    title: "您的餐厅，5 分钟全面数字化。",
    titleAccent: "",
    sub: "精美的数字菜单、厨房显示屏与 24/7 预订——为现代餐厅打造的一体化平台。",
  },

  heroMicrocopy: "{count} 家餐厅 · 14 天免费 · 无需银行卡",
  seeIncluded: "查看包含内容",

  trust: [
    { kind: "num", value: 35, label: "种语言" },
    { kind: "text", value: "24/7", label: "预订" },
    { kind: "num", value: 5, suffix: " min", label: "启动" },
    { kind: "count", label: "家餐厅" },
  ],

  bundle: {
    heading: "餐厅运转所需的一切。",
    headingAccent: "尽在一个应用。",
    sub: "菜单、厨房与预订集于一处——现代、快速,为餐厅真实运作方式而打造。没有附加项,不按功能收费。",
  },

  benefits: [
    { Icon: Languages, tag: "数字菜单", title: "会卖货的菜单。", bullets: ["AI 35 种语言","高级设计","价格即时更新"], image: "/landing/feature-design.webp", imageAlt: "咖啡桌上的两部手机:数字菜单的欢迎页和带地图的联系页" },
    { Icon: ChefHat, tag: "厨房显示屏", title: "做得更快,零遗漏。", bullets: ["实时显示在屏","备注与过敏原","平板或手机"], image: "/landing/feature-kds-cards.webp", imageAlt: "吧台上的平板显示厨房屏,按桌位呈现订单" },
    { Icon: CalendarCheck, tag: "预订", title: "预订自动搞定。", bullets: ["自助预订","自动确认","按桌位日历"], image: "/landing/feature-booking-calendar.webp", imageAlt: "两台平板显示预订日历:按桌位的每日视图与每月视图" },
    { Icon: Receipt, tag: "桌边点单", title: "订单直达厨房。", bullets: ["顾客或服务员","直达厨房","随时开关"], image: "/landing/feature-orders-map.webp", imageAlt: "显示订单界面的平板:订单列表与按颜色区分餐桌的平面图。" },
  ],

  seeDetails: "查看详情",

  extras: {
    heading: "其余一切也都包含。",
    items: [
      { Icon: ScanLine, label: "AI 在 60 秒内将纸质菜单数字化" },
      { Icon: QrCode, label: "每张餐桌专属二维码" },
      { Icon: Smartphone, label: "顾客无需 App——浏览器即可打开" },
      { Icon: Globe, label: "您的专属域名,含 SSL" },
      { Icon: BarChart3, label: "销售分析:营收、热门菜品、时段" },
      { Icon: Palette, label: "可筛选的过敏原与饮食标签" },
    ],
  },

  midCta: {
    heading: "一个应用,而非五个。",
    sub: "无需在菜单、厨房和预订之间来回切换多个工具——一切集于一处,任何手机或平板皆可,无需安装。",
  },

  platform: {
    hardwareTitle: "使用您自己的设备",
    hardwareSub: "我们绝不强制您从我们这里购买设备。直接使用您现有的手机、平板和电脑即可。",
    anywhereTitle: "随处可用",
    anywhereSub: "手机、平板、笔记本、台式机。Android、iOS、Windows、Mac、Linux。在任何现代浏览器中无需安装即可运行。",
  },

  activities: {
    heading: "一个系统，",
    headingAccent: "管理整家餐厅。",
    sub: "更快的服务、更从容的厨房、更低的成本，以及让顾客难忘的体验 — 全部集于一个平台。",
    groups: [
      {
        Icon: Smartphone,
        tag: "餐桌旁 — 顾客",
        bullets: [
          "支持 35 种语言的二维码菜单",
          "无需等待服务员即可点餐",
          "呼叫服务员或请求结账",
          "24/7 在线订座",
          "每张餐桌专属二维码",
          "顾客无需 App——浏览器即可打开",
          "可筛选的过敏原与饮食标签",
        ],
      },
      {
        Icon: ChefHat,
        tag: "在厨房",
        bullets: [
          "订单即时显示在屏幕上",
          "制作中／已完成／已上菜 分栏",
          "过敏原与备注高亮显示",
          "平板或手机 — 无需纸质单据",
        ],
      },
      {
        Icon: BarChart3,
        tag: "管理",
        bullets: [
          "菜单与价格修改即时生效",
          "一键 AI 翻译",
          "销售分析与报表",
          "一个账户管理多家餐厅",
          "AI 在 60 秒内将纸质菜单数字化",
          "您的专属域名,含 SSL",
        ],
      },
    ],
  },
};
