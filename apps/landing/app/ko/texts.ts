import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ko",
  htmlDir: "ltr",

  meta: {
    title: "레스토랑용 QR 메뉴 — 직접 주문, 수수료 제로 | IQ Rest",
    description:
      "레스토랑용 올인원 플랫폼: 디지털 메뉴, QR 주문, 테이블 예약 및 주방 디스플레이. 5분 만에 시작. 14일 무료, 카드 불필요.",
    canonical: "https://iq-rest.com/ko",
    ogLocale: "ko_KR",
    ogTitle: "레스토랑용 QR 메뉴 — 직접 주문, 수수료 제로",
    ogDescription:
      "디지털 메뉴, QR 주문, 테이블 예약 및 AI 번역. 5분 만에 시작. 14일 무료.",
  },

  ctaText: "디지털 메뉴 만들기",
  demoText: "데모 보기",
  microcopy: "14일 무료 · 카드 불필요 · 언제든지 취소",

  header: {
    navFeatures: "기능",
    navHow: "작동 방식",
    navPricing: "가격",
    navFaq: "자주 묻는 질문",
    signIn: "로그인",
    cta: "메뉴 만들기",
  },

  hero: {
    verticals: ["레스토랑", "카페", "바", "호텔", "피자집"],
    headline: "레스토랑용 디지털 메뉴. 5분 만에 온라인.",
    sub: "5분 만에 귀하의 레스토랑을 위한 디지털 메뉴. 모든 것 포함: 노코드 편집기, AI 인쇄 메뉴 인식, 테이블용 QR 코드 및 수수료 없는 직접 주문.",
    dynamicHeadlines: ["0% 수수료.", "AI 35개 언어.", "온라인 주문.", "예약 24/7.", "프리미엄 디자인."],
    painBullets: [
      "0% 수수료: 모든 주문이 귀하의 레스토랑으로 직접 전달됩니다.",
      "35개 언어 AI 번역 — 관광객이 메뉴를 이해하고 더 많이 주문합니다.",
      "예약 24/7: 손님이 피크 시간에 전화 없이 직접 테이블을 예약합니다.",
      "유연한 가격 책정: 메뉴 업데이트가 몇 초 안에 게시됩니다.",
    ],
    rating: "30개국 이상 500개 이상의 레스토랑",
  },

  features: {
    heading: "필요한 모든 것.",
    headingAccent: "불필요한 것 없음.",
    sub: "레스토랑을 위해 만들어졌습니다. 매일 테이블, 주방 및 홀에서 사용됩니다.",
    items: [
      { Icon: Monitor, title: "디지털 메뉴", desc: "사진, 가격, 알레르겐 및 설명이 있는 브라우저의 메뉴. 휴대폰에서 실시간으로 업데이트됩니다. 손님은 자신의 언어로 메뉴를 보고, 레스토랑은 인쇄 비용을 절약합니다.", tag: "디지털 메뉴", href: "/ko/dijiteol-menyu-resutorang" },
      { Icon: Receipt, title: "주문 받기: 손님과 직원", desc: "테이블의 QR 코드로 손님이 또는 직원이 휴대폰에서 주문을 받습니다 — 둘 다 직접 주방이나 WhatsApp으로 전송됩니다. 수수료 없이, 모든 영수증에 테이블 번호가 있습니다.", tag: "주문", href: "/ko/juneun-shiseutem-resutorang" },
      { Icon: CalendarCheck, title: "테이블 예약 24/7", desc: "홀에서 바쁘게 일하는 동안 손님이 웹사이트나 QR 메뉴를 통해 직접 테이블을 예약합니다. 테이블별 캘린더, 자동 확인 및 알림. 단 한 명의 손님도 놓치지 않습니다.", tag: "예약", href: "/ko/tebeul-yeyak" },
      { Icon: ChefHat, title: "주방 디스플레이 (KDS)", desc: "종이 영수증은 더 이상 필요하지 않습니다. 홀의 주문이 셰프 화면으로 직접 전달됩니다 — 「조리 중 / 준비됨 / 제공됨」 열, 알레르겐과 메모는 색상으로 강조 표시됩니다. 태블릿 또는 휴대폰에서.", tag: "KDS", href: "/ko/juhang-diseupeullei" },
    ],
  },

  founder: {
    eyebrow: "레스토랑 경영자가 만들었습니다",
    quoteStart:
      "아내와 저는 우리만의 카페를 운영했고, 레스토랑의 하루가 실제로 어떻게 진행되는지 — 주문 받기, 예약, 홀과 주방 흐름 — 직접 알고 있습니다. 우리는 단 하나의 도구를 원했습니다: 현대적이고, 시작하기 쉽고, 한눈에 명확한 것 —",
    quoteAccent: "그래서 우리는 다른 레스토랑 경영자들을 위해 개발하고 있는 플랫폼을 구축하기 시작했습니다.",
    sign: "보그단 소콜로프 · 창립자, 전 카페 소유자",
    photoAlt: "보그단 소콜로프, IQ Rest 창립자",
  },

  how: {
    heading: "5분 만에 온라인",
    sub: "네 가지 짧은 단계. 설치 없음, 기술적 설정 없음.",
    steps: [
      { n: "1", t: "유형 및 이름", d: "매장 유형을 선택하고 이름을 입력하세요." },
      { n: "2", t: "저장", d: "이메일을 입력하거나 Google로 로그인하세요." },
      { n: "3", t: "메뉴", d: "항목을 수동으로 추가하거나 AI 인식을 위해 인쇄된 메뉴를 업로드하세요." },
      { n: "4", t: "완료", d: "링크 또는 QR 코드를 공유하고 주문 받기를 시작하세요." },
    ],
  },

  pricing: {
    badge: "수수료 없음 · 계약 없음",
    heading: "하나의 플랜.",
    headingAccent: "모든 것 포함.",
    sub: "QR 메뉴, 주문 받기, AI 번역, 레스토랑 웹사이트 및 예약. 하나의 투명한 월 요금.",
    monthlyLabel: "월간",
    yearlyLabel: "연간",
    saveBadge: "25% 절약",
    perMonth: "월",
    billedAnnually: "연간 청구: {total}",
    youSave: "{amount} 절약",
    trust: { secure: "Stripe를 통한 안전한 결제", noCommitment: "약정 없음", quick: "몇 분 내 활성화", restaurants: "500+ 레스토랑" },
  },

  faq: {
    eyebrow: "질문이 있으신가요?",
    heading: "자주 묻는",
    headingAccent: "질문.",
    sub: "레스토랑 경영자가 등록 전에 묻는 질문. 질문을 찾을 수 없나요? WhatsApp으로 메시지를 보내주세요 — 봇이 아닌 실제 사람이 답변합니다.",
    whatsappCta: "WhatsApp에서 질문하기",
    whatsappPrefill: "안녕하세요, IQ Rest에 대해 질문이 있습니다",
    items: [
      { q: "체험판에는 무엇이 포함되며, 그 이후에는 어떻게 됩니까?", a: "14일 동안 카드 없이 모든 기능에 대한 완전한 접근. 14일 후 결제 방법이 추가되지 않으면 계정이 일시 중지됩니다 — 자동으로 청구하지 않습니다. 나중에 결제를 추가하고 중단한 지점부터 계속할 수 있습니다. 언제든지 한 번의 클릭으로 취소 가능." },
      { q: "주문에 대해 수수료를 받습니까?", a: "아니요. QR 메뉴의 모든 주문은 레스토랑으로 직접 전달됩니다 — 당사의 백분율이나 집계 수수료 없음. 고정 월 요금만 있고 그 외에는 없습니다." },
      { q: "손님에게 앱이 필요한가요, 우리에게 기술적 기술이 필요한가요?", a: "손님은 앱이 필요하지 않습니다 — 휴대폰 카메라를 QR 코드에 가리키면 브라우저에서 메뉴가 열립니다. 레스토랑도 기술적 기술이 필요하지 않습니다: 관리 패널은 휴대폰, 태블릿 또는 노트북의 모든 현대 브라우저에서 작동합니다. 모든 작업은 클릭과 드래그 앤 드롭으로, 코드 없이 이루어집니다." },
      { q: "가격이 얼마나 빨리 변경되고 새로운 요리가 나타납니까?", a: "즉시. 휴대폰에서 가격을 변경하면 — 손님은 몇 초 안에 볼 수 있습니다. 새로운 요리는 몇 번의 탭이 필요합니다: 이름, 가격, 사진. 재인쇄 없음, 디자이너 대기 없음." },
      { q: "얼마나 많은 언어가 지원됩니까?", a: "내장 AI 번역으로 35개 언어. 한 번의 탭으로 전체 메뉴가 번역됩니다; AI는 요리 컨텍스트를 이해합니다 — 이름과 설명은 어떤 언어에서도 자연스럽게 들립니다. 관광객은 메뉴를 진정으로 이해할 때 더 큰 자신감으로 주문합니다." },
    ],
  },

  finalCta: {
    heading: "5분 만에 온라인.",
    headingAccent: "14일 무료.",
    sub: "카드 없이, 언제든지 취소. 이미 IQ Rest를 사용 중인 500개 이상의 레스토랑에 참여하세요.",
  },

  scan: {
    heading: "종이 메뉴나 PDF가 있나요?",
    headingAccent: "AI가 60초 만에 디지털화합니다.",
    sub: "사진이나 문서를 업로드하세요 — AI가 카테고리, 요리 및 가격을 자동으로 인식합니다.",
    cta: "메뉴 스캔 →",
  },

  pricingHero: {
    chips: ["수수료 없음", "계약 없음", "14일 무료"],
    heading: "가격.",
    headingAccent: "숨겨진 비용 없음.",
    sub: "하나의 투명한 월 요금. 주문에 대한 백분율이나 집계 수수료 없음. 언제든지 구독을 취소하세요.",
    popularBadge: "인기",
    perMonthSuffix: "/월",
    whenAnnualTemplate: "연간 청구 · 연간 €{total}",
    orMonthlyTemplate: "또는 월 €{price}",
    savingsTemplate: "연간 €{amount} 절약",
    plans: {
      basic: {
        name: "Basic",
        tagline: "메뉴, QR 주문 및 AI 번역. 5분 만에 온라인.",
        features: [
          "모든 테이블용 QR 메뉴",
          "사진과 알레르겐이 있는 디지털 메뉴",
          "35개 언어 AI 번역",
          "메뉴에서 주문 (선택 사항)",
          "AI 요리 사진 생성",
          "모든 휴대폰 또는 태블릿에서 관리",
        ],
      },
      pro: {
        name: "Pro",
        tagline: "완전한 레스토랑 관리: 주방 디스플레이와 예약.",
        features: [
          "Basic의 모든 기능",
          "주방 디스플레이 (KDS)",
          "온라인 테이블 예약 24/7",
          "우선 WhatsApp 지원",
        ],
      },
    },
  },

  footer: {
    featureLinks: [
      { href: "/ko/dijiteol-menyu-resutorang", label: "디지털 메뉴" },
      { href: "/ko/juneun-shiseutem-resutorang", label: "주문" },
      { href: "/ko/tebeul-yeyak", label: "예약" },
      { href: "/ko/juhang-diseupeullei", label: "주방 디스플레이" },
    ],
    navLinks: [
      { href: "/ko/gagyeok", label: "가격" },
      { href: "#faq", label: "자주 묻는 질문" },
      { href: "/ko/languages", label: "언어 변경" },
    ],
    copyrightTemplate: "© {year} IQ Rest. 모든 권리 보유.",
  },
};
