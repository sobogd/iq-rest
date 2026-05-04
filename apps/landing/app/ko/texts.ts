import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "ko", htmlDir: "ltr",
  meta: {
    title: "레스토랑용 QR 메뉴 — 직접 주문, 수수료 0% | IQ Rest",
    description: "종이 메뉴와 배달앱 수수료 끝. QR 메뉴, 직접 주문, 예약, 다국어 사이트. 14일 무료, 카드 불필요.",
    canonical: "https://iq-rest.com/ko", ogLocale: "ko_KR",
    ogTitle: "레스토랑용 QR 메뉴 — 직접 주문, 수수료 0%",
    ogDescription: "QR 메뉴, 직접 주문, 예약, AI 번역. 2분이면 시작. 14일 무료 — 카드 불필요.",
  },
  ctaText: "무료로 시작 →",
  demoText: "라이브 데모 보기", microcopy: "14일 무료 · 카드 불필요 · 언제든 취소",
  header: { navFeatures: "기능", navHow: "사용법", navPricing: "가격", navFaq: "FAQ", signIn: "로그인", cta: "무료로 시작 →" },
  hero: {
    verticals: ["레스토랑", "카페", "바", "호텔", "피자집"],
    variants: [
      { headline: "메뉴 인쇄, 그만.", headlineAccent: "배달앱에 30% 주는 거, 그만.", sub: "QR 메뉴, 직접 주문, 예약, 다국어 사이트. 2분이면 시작 — 카드 불필요." },
      { headline: "당신의 레스토랑은", headlineAccent: "종이 메뉴와 놓친 전화보다 더 가치 있습니다.", sub: "직접 주문, 즉시 메뉴 업데이트, 24시간 예약. 2분 안에 설정 완료." },
      { headline: "QR 코드 하나.", headlineAccent: "수수료 0%. 종이여 안녕.", sub: "QR 메뉴, 온라인 주문, 예약 — 한 곳에. 14일 무료, 카드 불필요." },
      { headline: "직접 주문 받으세요.", headlineAccent: "수수료는 건너뛰세요.", sub: "손님이 스캔하고 주문하고 결제 — 바로 당신에게, 배달의민족 몫 없이. 2분이면 시작." },
      { headline: "더 많은 주문. 더 많은 예약.", headlineAccent: "종이 없이, 앱 없이.", sub: "QR 메뉴 + 예약 + 다국어 사이트가 자동으로. 14일 무료 체험." },
      { headline: "관광객이 메뉴를 못 읽나요?", headlineAccent: "2분이면 해결.", sub: "AI가 메뉴 전체를 35개 언어로 번역. QR 주문과 예약도 포함." },
      { headline: "종이 메뉴에서 QR 코드까지,", headlineAccent: "에스프레소가 식기 전에.", sub: "QR 메뉴, 직접 주문, 24시간 예약. 2분이면 시작 — 카드 불필요." },
      { headline: "놀라울 만큼 단순한 QR 메뉴.", headlineAccent: "속은 조용히 강력합니다.", sub: "직접 주문, AI 번역, 예약, 웹사이트 — 모두 휴대폰 한 번 터치로." },
    ],
    painBullets: ["인쇄 없음 — 가격을 즉시 변경", "수수료 0% — 주문이 바로 당신에게", "놓친 전화 없음 — 24시간 예약", "35개 언어 — 관광객을 놓치지 않습니다"],
    rating: "4.9 · 30개국 이상 500개 이상 레스토랑",
  },
  features: {
    heading: "필요한 모든 것.", headingAccent: "필요 없는 건 없음.",
    sub: "레스토랑을 위해 만들었습니다. 테이블에서 사용합니다.",
    items: [
      { Icon: ScanLine, title: "모든 주문의 100%를 가져가세요", desc: "손님이 스캔하고 주문하고 결제 — 바로 당신에게. 앱 다운로드 없음, 30% 배달 몫 없음. 모든 주문이 테이블 번호와 함께 실시간으로 대시보드에 도착합니다.", tag: "직접 주문" },
      { Icon: Languages, title: "관광객에게 그들의 언어로 판매", desc: "한 번 터치로 전체 메뉴를 35개 언어로 번역. AI가 음식의 맥락을 이해 — 손님은 음식을 진짜 이해할 때 더 많이 주문합니다.", tag: "AI 번역" },
      { Icon: CalendarCheck, title: "요리 중에도 예약 놓치지 않기", desc: "손님이 24시간 예약, 전화 불필요. 자동 또는 수동 확인, 이메일 알림 포함 — 노쇼 감소, 스트레스 0.", tag: "예약" },
      { Icon: Palette, title: "1초 만에 잊을 수 없게", desc: "주방 영상이나 음식 사진을 메뉴 배경으로. 손님은 스크롤을 멈추고, 브랜드는 기억에 남습니다.", tag: "맞춤 디자인" },
      { Icon: Smartphone, title: "초 단위로 변경, 일 단위 아님", desc: "가격, 사진, 오늘의 메뉴 — 휴대폰에서, 테이블 사이에. 손님에게 즉시 반영. 다시는 인쇄 안 합니다.", tag: "메뉴 편집기" },
      { Icon: ChefHat, title: "매 시프트마다 더 빠른 서비스", desc: "손님이 확정하는 순간 주문이 주방 화면에 도착합니다. 종이 0, 외침 0, 놓친 주문 0 — 실수 감소, 회전 가속, 저녁당 더 많은 손님.", tag: "곧 출시" },
    ],
  },
  founder: {
    eyebrow: "레스토랑 사장이 만들었습니다",
    quoteStart: "아내와 저는 카페를 열었고, 온라인 주문, 예약을 처리하면서 모던하게 보이는 시스템을 몇 주 동안 찾았습니다. 시도한 모든 것이 무겁고, 보기 안 좋고, 절반의 기능이 부족했습니다 —",
    quoteAccent: "그래서 우리가 원했던 것을 직접 만들었습니다.",
    sign: "보그단 소콜로프 · 창립자, 전 카페 사장",
    photoAlt: "보그단, IQ Rest 창립자",
  },
  how: {
    heading: "2분 안에 시작",
    sub: "짧은 4단계. 설치 없음, 기술 설정 없음.",
    steps: [
      { n: "1", t: "가입", d: "이메일 또는 Google. 카드 불필요. 10초면 완료." },
      { n: "2", t: "레스토랑 이름", d: "이름을 입력하세요. 메뉴 상단에 표시됩니다." },
      { n: "3", t: "첫 메뉴 추가", d: "카테고리, 이름, 가격, 사진. 그게 다입니다." },
      { n: "4", t: "배경 선택 후 QR 인쇄", d: "배경 선택. QR 가져가기. 테이블에 붙이기." },
    ],
  },
  pricing: {
    badge: "수수료 0% · 계약 없음",
    heading: "단 하나의 플랜.", headingAccent: "모든 것 포함.",
    sub: "QR 메뉴, 주문, AI 번역, 레스토랑 웹사이트, 예약. 하나의 단순한 가격.",
    monthlyLabel: "월간", yearlyLabel: "연간", saveBadge: "25% 절약", perMonth: "월",
    billedAnnually: "연간 결제 {total}", youSave: "{amount} 절약",
    trust: { secure: "Stripe로 안전 결제", noCommitment: "약정 없음", quick: "몇 분 내 활성", restaurants: "500개 이상 레스토랑" },
  },
  faq: {
    eyebrow: "질문 있으신가요?", heading: "자주 묻는", headingAccent: "질문.",
    sub: "가입 전에 레스토랑 사장님들이 묻는 것. 본인 질문이 안 보이면 WhatsApp으로 보내주세요 — 진짜 사람이 답합니다.",
    whatsappCta: "WhatsApp으로 묻기", whatsappPrefill: "안녕하세요, IQ Rest에 대해 질문이 있습니다",
    items: [
      { q: "무료 체험에 무엇이 포함되고, 그 후엔 어떻게 되나요?", a: "14일 전체 액세스, 카드 불필요. 14일 후에 결제 수단을 추가하지 않으면 계정이 일시 정지됩니다 — 절대 자동 청구하지 않습니다. 나중에 결제 정보를 추가해 다시 활성화하세요. 클릭 한 번으로 취소." },
      { q: "주문에 수수료를 받나요?", a: "0%. QR 메뉴의 모든 주문이 바로 당신에게 — 우리 몫 없음, 배달의민족 / 요기요 수수료 없음. 한 가지 고정 월 가격, 그뿐입니다." },
      { q: "손님에게 앱이 필요한가요? 저에게 기술 능력이 필요한가요?", a: "손님에게 앱 불필요 — 카메라로 QR 스캔하면 브라우저에서 메뉴가 열립니다. 당신에게 기술 능력 불필요 — 모든 대시보드가 휴대폰에서 작동, 추가는 터치, 정렬은 드래그, 그게 전체 학습 곡선입니다." },
      { q: "가격 변경과 메뉴 추가가 얼마나 빠른가요?", a: "즉시. 휴대폰에서 가격 변경하면 손님에게 몇 초 안에 반영. 새 메뉴? 터치, 입력, 사진, 완료 — 재인쇄 없음, 디자이너 대기 없음." },
      { q: "몇 개 언어를 지원하나요?", a: "내장 AI 번역으로 35개 언어. 한 번 터치로 메뉴 전체 번역, AI가 음식 맥락을 이해 — 이름과 설명이 모든 언어에서 자연스럽게 들립니다. 관광객은 진짜 이해할 때 더 많이 주문합니다." },
    ],
  },
  finalCta: { heading: "2분이면 시작.", headingAccent: "14일 무료.", sub: "카드 불필요. 언제든 취소. 이미 IQ Rest를 사용하는 500개 이상의 레스토랑에 합류하세요." },
  footer: {
    featureLinks: [
      { href: "/ko/online-orders", label: "온라인 주문" }, { href: "/ko/ai-translation", label: "AI 번역" },
      { href: "/ko/reservations", label: "예약" }, { href: "/ko/mobile-management", label: "모바일 관리" },
      { href: "/ko/easy-menu", label: "메뉴 편집기" }, { href: "/ko/custom-design", label: "동영상·사진 배경" },
      { href: "/ko/color-scheme", label: "브랜드 색상" }, { href: "/ko/multilingual", label: "다국어 사이트" },
      { href: "/ko/ai-images", label: "AI 이미지 최적화" }, { href: "/ko/analytics", label: "분석" },
      { href: "/ko/instant-setup", label: "즉시 설정" }, { href: "/ko/personal-support", label: "개인 지원" },
    ],
    navLinks: [
      { href: "#pricing", label: "가격" }, { href: "#faq", label: "질문" },
      { href: "/ko/languages", label: "언어 변경" },
    ],
    copyrightTemplate: "© {year} IQ Rest. 모든 권리 보유.",
  },
};
