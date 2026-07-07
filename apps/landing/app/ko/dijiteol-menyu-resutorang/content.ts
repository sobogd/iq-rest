import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "ko",
  slug: "dijiteol-menyu-resutorang",
  trackPrefix: "l_ko_digital",
  hideFeatureHeading: true,

  meta: {
    title: "레스토랑용 디지털 메뉴 | IQ Rest",
    description:
      "레스토랑용 디지털 메뉴: 사진, 알레르겐, AI 번역 및 실시간 가격 업데이트가 있는 온라인 메뉴. 14일 무료, 카드 불필요.",
    canonical: "https://iq-rest.com/ko/dijiteol-menyu-resutorang",
    ogLocale: "ko_KR",
    ogTitle: "레스토랑용 디지털 메뉴",
    ogDescription:
      "종이 메뉴의 온라인 버전 — 사진, 알레르겐, AI 번역, 실시간 업데이트.",
    brandLine: "IQ Rest — 레스토랑용 디지털 메뉴",
  },

  hero: {
    headline: "모든 것을 갖춘 디지털 메뉴",
    cta: "디지털 메뉴 만들기",
    sub: "사진, 알레르겐, 35개 언어 번역. 주문, WhatsApp, 좌석 예약까지 — 모두 하나의 IQ Rest에.",
  },

  scan: {
    heading: "종이 메뉴나 PDF가 있나요?",
    headingAccent: "AI가 60초 만에 디지털화합니다.",
    sub: "사진이나 문서를 업로드하세요 — AI가 카테고리, 요리 및 가격을 자동으로 인식합니다.",
    cta: "메뉴 스캔",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "AI 번역",
      heading: "35개 언어 메뉴",
      body: "하나의 QR로 35개 언어. AI가 요리 맥락을 살려 번역해 모든 메뉴가 자연스럽습니다. 관광객도 자신 있게 주문합니다.",
      bullets: [
        "요금제에 35개 언어 포함",
        "Google 아닌 미식 AI",
        "원 탭 언어 전환",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "두 명의 손님이 자신의 휴대폰으로 같은 디지털 메뉴를 다른 언어로 읽고 있는 모습" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "알레르겐",
      heading: "메뉴에 알레르겐과 식단 표시",
      body: "글루텐, 유당, 견과류, 비건, 글루텐프리를 태그하세요. 손님은 식단에 맞게 메뉴를 걸러 편하게 주문합니다.",
      bullets: [
        "14개 알레르겐 분류",
        "비건·글루텐프리 태그",
        "식단별 필터링",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "손님이 휴대폰에서 알레르겐으로 메뉴를 필터링하고, 소유자가 태블릿에서 알레르겐 목록을 편집하는 모습" },
    },
    {
      icon: Palette,
      eyebrow: "디자인과 브랜드",
      heading: "자체 도메인의 프리미엄 메뉴",
      body: "영상 환영 화면, 나만의 디자인, 그리고 지도와 SNS가 담긴 연락처 페이지 — PDF가 아닌 자체 도메인에.",
      bullets: [
        "영상과 프리미엄 디자인",
        "SSL 포함 자체 도메인",
        "연락처·지도·SNS",
      ],
      image: { src: "/landing/feature-design.webp", alt: "카페 테이블의 두 휴대폰: 비디오 배경의 메뉴 홈 화면과 지도가 있는 연락처 페이지" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "주문",
      heading: "수수료 0% 온라인 주문",
      body: "손님이 메뉴에서, 또는 바로 WhatsApp으로 주문합니다 — 홀이나 주방으로 전달되고, 매출에서 떼는 건 0%.",
      bullets: [
        "메뉴나 WhatsApp에서",
        "홀이나 주방으로, 0%",
        "설정에서 켜고 끄기",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "테이블의 두 휴대폰: 주문이 있는 장바구니와 주문 전송 확인" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "예약",
      heading: "좌석 예약, 24/7",
      body: "손님이 메뉴나 링크로 직접 좌석을 예약하고, 테이블별 캘린더를 보며 자동 또는 수동으로 확정합니다.",
      bullets: [
        "손님이 직접 예약",
        "테이블별 캘린더",
        "자동·수동 확정",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "관리",
      heading: "어디서든 관리",
      body: "관리자 패널은 어떤 브라우저에서도 실행됩니다 — 휴대폰, 태블릿, PC. 설치할 것 없이 기본 메뉴가 몇 분 만에 공개됩니다.",
      bullets: [
        "모든 기기, 모든 브라우저",
        "설치 불필요",
        "몇 분 만에 공개",
      ],
    },
  ],

  faq: {
    sub: "레스토랑 경영자가 IQ Rest의 디지털 메뉴에 대해 묻는 질문. 질문을 찾을 수 없나요? WhatsApp으로 메시지를 보내주세요.",
    items: [
      { q: "기술적 기술이나 CMS 경험이 필요합니까?", a: "아니요, 특별한 기술은 필요하지 않습니다. 관리 패널의 모든 작업은 클릭과 드래그 앤 드롭으로 — 코드 없이 이루어집니다. 메뉴에 항목을 추가하는 데 몇 초가 걸립니다: 이름, 가격, 사진. 완전한 메뉴 설정은 일반적으로 30분에서 1시간 정도 걸립니다." },
      { q: "IQ Rest의 디지털 메뉴란 무엇입니까?", a: "IQ Rest는 레스토랑용 클라우드 플랫폼입니다. 디지털 메뉴는 QR 코드 또는 직접 링크를 통해 손님이 사용할 수 있는 메뉴의 온라인 버전입니다: 요리 사진, 가격, 알레르겐, 35개 언어 AI 번역, 실시간 업데이트. 메뉴는 당사 서버에서 호스팅되며 소프트웨어를 설치하거나 유지 관리할 필요가 없습니다 — 브라우저만 열면 됩니다." },
      { q: "손님에게 앱이나 특별한 하드웨어가 필요합니까?", a: "아니요. 손님은 휴대폰 카메라를 QR 코드에 가리키면 브라우저에서 메뉴가 열립니다. 레스토랑의 관리 패널도 모든 현대 브라우저에서 작동합니다 — 휴대폰, 태블릿 또는 노트북. QR 코드는 모든 사무실 프린터로 인쇄할 수 있습니다." },
      { q: "자체 도메인에서 메뉴를 호스팅할 수 있습니까?", a: "예. SSL 인증서가 있는 사용자 정의 도메인을 지원합니다 — 손님은 레스토랑 주소(예: menu.yourrestaurant.kr)에서 메뉴를 볼 수 있습니다. DNS 설정을 도와드립니다; 일반적으로 5~10분 정도 걸립니다." },
      { q: "하나의 계정에서 여러 레스토랑을 관리할 수 있습니까?", a: "예, 요청 시. 하나의 계정으로 여러 레스토랑을 호스팅할 수 있습니다: 각 장소는 자체 메뉴, 디자인, QR 코드 및 분석을 가집니다. WhatsApp으로 메시지를 보내주시면 그룹을 위한 멀티 레스토랑 모드를 활성화하겠습니다." },
      { q: "메뉴를 처음부터 설정하는 것이 얼마나 어렵습니까?", a: "설정은 세 단계로 구성됩니다: (1) 카테고리 만들기, (2) 이름, 가격, 사진과 함께 항목 추가, (3) 테이블용 QR 코드 인쇄. 종이 메뉴나 PDF가 이미 있다면 업로드하세요 — AI가 카테고리, 이름, 가격을 인식하고 카드를 자동으로 채웁니다. 기본 메뉴는 5분 만에 온라인이 될 수 있습니다; 총 시간은 항목 수에 따라 다릅니다." },
      { q: "어떤 지원을 제공합니까?", a: "영업 시간 동안 WhatsApp으로 이용 가능하며 이메일에도 빠르게 응답합니다. 초기 설정, 도메인 구성, 메뉴 디자인 및 모든 비표준 상황을 도와드립니다. 출시 시 데모나 실제 지원이 필요한 경우 — 메시지를 보내주세요." },
    ],
  },
};
