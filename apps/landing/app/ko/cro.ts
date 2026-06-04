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
    verticals: ["레스토랑","카페","바","피자집"],
    title: "당신의 매장을,",
    titleAccent: "5분 만에 완전히 디지털로.",
    sub: "아름다운 디지털 메뉴, 주방 디스플레이, 24/7 예약 — 현대적인 레스토랑을 위한 올인원 플랫폼.",
  },

  heroMicrocopy: "{count}개 매장 · 14일 무료 · 카드 불필요",
  seeIncluded: "포함 내용 보기",

  trust: [
    { kind: "num", value: 35, label: "언어" },
    { kind: "text", value: "24/7", label: "예약" },
    { kind: "num", value: 5, suffix: " min", label: "시작" },
    { kind: "count", label: "매장" },
  ],

  bundle: {
    heading: "매장 운영에 필요한 모든 것.",
    headingAccent: "하나의 앱으로.",
    sub: "메뉴, 주방, 예약을 한곳에 — 현대적이고 빠르며 레스토랑이 실제로 일하는 방식에 맞춰 만들었습니다. 추가 기능 요금도, 기능별 과금도 없습니다.",
  },

  benefits: [
    { Icon: Languages, tag: "디지털 메뉴", title: "팔리는 메뉴.", bullets: ["AI 35개 언어","프리미엄 디자인","가격 즉시 반영"], image: "/landing/feature-design.webp", imageAlt: "카페 테이블 위 두 대의 휴대폰: 디지털 메뉴 환영 화면과 지도가 있는 연락처 페이지" },
    { Icon: ChefHat, tag: "주방 디스플레이", title: "더 빨리 조리하고, 놓치지 않게.", bullets: ["화면에 실시간","메모와 알레르기","태블릿 또는 휴대폰"], image: "/landing/feature-kds-cards.webp", imageAlt: "바 위의 태블릿이 테이블별 주문과 함께 주방 디스플레이를 표시" },
    { Icon: CalendarCheck, tag: "예약", title: "예약은 자동으로.", bullets: ["셀프 예약","자동 확인","테이블별 캘린더"], image: "/landing/feature-booking-calendar.webp", imageAlt: "두 대의 태블릿이 예약 캘린더를 표시: 테이블별 일간 보기와 월간 보기" },
    { Icon: Receipt, tag: "테이블 주문", title: "주문은 곧장 주방으로.", bullets: ["손님 또는 직원","주방으로 바로","언제든 켜고 끄기"], image: "/landing/feature-orders-map.webp", imageAlt: "주문 화면의 태블릿: 주문 목록과 색상으로 구분된 테이블의 플로어 맵." },
  ],

  seeDetails: "자세히 보기",

  extras: {
    heading: "그 외 모든 것도 포함.",
    items: [
      { Icon: ScanLine, label: "AI가 종이 메뉴를 60초 만에 디지털화" },
      { Icon: QrCode, label: "각 테이블마다 고유 QR 코드" },
      { Icon: Smartphone, label: "손님용 앱 불필요 — 브라우저에서 열림" },
      { Icon: Globe, label: "SSL이 적용된 나만의 도메인" },
      { Icon: BarChart3, label: "매출 분석: 매출, 인기 메뉴, 시간대" },
      { Icon: Palette, label: "필터링용 알레르기·식단 태그" },
    ],
  },

  midCta: {
    heading: "다섯 개가 아닌 하나의 앱.",
    sub: "메뉴, 주방, 예약을 위해 따로따로 도구를 다룰 필요가 없습니다 — 모든 것이 한곳에, 어떤 휴대폰이나 태블릿에서도, 설치 없이.",
  },

  how: {
    heading: "5분 만에 오픈",
    sub: "네 단계. 설치 없음, 기술 설정 없음, 카드 없음.",
    steps: [
      { n: "1", t: "유형과 이름", d: "매장 유형과 이름 — 가입은 이게 전부입니다." },
      { n: "2", t: "로그인", d: "이메일 또는 Google. 카드 불필요." },
      { n: "3", t: "메뉴 추가", d: "입력하거나 AI가 종이 메뉴를 스캔하도록 하세요." },
      { n: "4", t: "오픈 완료", d: "메뉴, 주방, 예약 — 준비 완료." },
    ],
  },
};
