import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "tr", htmlDir: "ltr",
  meta: {
    title: "Restoranlar için QR Menü — Direkt Siparişler, Sıfır Komisyon | IQ Rest",
    description: "Basılı menülere ve teslimat uygulaması komisyonlarına son. QR menü, direkt siparişler, rezervasyonlar ve çok dilli web sitesi. 14 gün ücretsiz, kart gerekmez.",
    canonical: "https://iq-rest.com/tr", ogLocale: "tr_TR",
    ogTitle: "Restoranlar için QR Menü — Direkt Siparişler, Sıfır Komisyon",
    ogDescription: "QR menü, direkt siparişler, rezervasyonlar ve AI çeviri. 5 dakikada hazır. 14 gün ücretsiz — kart gerekmez.",
  },
  ctaText: "Ücretsiz dene",
  demoText: "Canlı demoyu gör", microcopy: "14 gün ücretsiz · Kart gerekmez · İstediğin zaman iptal",
  header: { navFeatures: "Özellikler", navHow: "Nasıl çalışır", navPricing: "Fiyatlar", navFaq: "SSS", signIn: "Giriş", cta: "Ücretsiz dene" },
  hero: {
    verticals: ["Restoranlar", "Kafeler", "Barlar", "Oteller", "Pizzacılar"],
    headline: "5 dakikada QR Menü.",
    sub: "Restoranınız için hazır web sitesi — geliştirici ve yüklenici gerekmez. Doğrudan siparişler, rezervasyonlar ve misafir analizleri tek abonelikte.",
    dynamicHeadlines: ["%0 Komisyon.", "35 Dil YZ ile.", "Online sipariş.", "24/7 Rezervasyon.", "Premium Tasarım."],
    painBullets: ["0% Komisyon: Tüm siparişler doğrudan size gelir.", "AI Çeviri: Turist satışlarını artıracak 35 dil desteği.", "24/7 Rezervasyon: Telefon trafiği olmadan tam doluluk.", "Esnek Fiyatlar: Menünüzü saniyeler içinde güncelleyin."],
    rating: "30+ ülkede 500'den fazla restoran",
  },
  features: {
    heading: "İhtiyacın olan her şey.", headingAccent: "Olmayan hiçbir şey.",
    sub: "Restoranlar için yapıldı. Masada kullanılır.",
    items: [
      
      { Icon: ScanLine, title: "Masadan Sipariş", desc: "Siparişler masa numarasıyla birlikte anında WhatsApp'a veya panele düşer. Daha hızlı servis.", tag: "Doğrudan sipariş" },
      { Icon: Languages, title: "AI Çevirmen (35 Dil)", desc: "Yapay zekamız gastronomiden anlar. Turistler menüyü anladıklarında %20 daha fazla sipariş verir.", tag: "AI çevirisi" },
      { Icon: CalendarCheck, title: "Masa Rezervasyonu", desc: "Siz mutfakta meşgulken sistem rezervasyonları kabul eder. Hiçbir müşteriyi kaçırmazsınız.", tag: "Rezervasyonlar" },
      { Icon: Palette, title: "Modern Tasarım", desc: "Video arka planlar ve iştah açıcı görseller. Menünüz premium görünür ve siparişi tetikler.", tag: "Özel tasarım" },
      { Icon: Smartphone, title: "Hızlı Editör", desc: "Stok listesini ve fiyatları akıllı telefonunuzdan yönetin. Değişiklikler anında yayına girer.", tag: "Menü editörü" },
      { Icon: ChefHat, title: "Yakında: Mutfak Ekranı", desc: "Kağıt adisyonları unutun. Siparişler doğrudan mutfaktaki ekrana iletilir.", tag: "Yakında" },
    
    ],
  },
  founder: {
    eyebrow: "Bir restoran sahibi tarafından yapıldı",
    quoteStart: "Eşim ve ben bir kafe açtık ve haftalarca online sipariş, rezervasyon alabilen ve modern görünen bir sistem aradık. Denediğimiz her şey hantal, çirkin veya özelliklerin yarısı eksikti —",
    quoteAccent: "biz de istediğimiz olanı kendimiz yaptık.",
    sign: "Bogdan Sokolov · kurucu, eski kafe sahibi",
    photoAlt: "Bogdan, IQ Rest kurucusu",
  },
  how: {
    heading: "5 dakikadan kısa sürede yayında",
    sub: "Dört kısa adım. Kurulum yok, teknik ayar yok.",
    steps: [
      { n: "1", t: "Tür ve ad", d: "Türü seçin ve ad girin." },
      { n: "2", t: "Kayıt", d: "E-posta veya Google ile giriş." },
      { n: "3", t: "Menü", d: "Kendin oluştur veya kağıt menüyü tara." },
      { n: "4", t: "Hazır", d: "Görüntüle, paylaş ve sipariş al." },
    ],
  },
  pricing: {
    badge: "Sıfır komisyon · Sözleşme yok",
    heading: "Tek plan.", headingAccent: "Hepsi dahil.",
    sub: "QR menü, siparişler, AI çeviri, restoran sitesi ve rezervasyonlar. Tek basit fiyat.",
    monthlyLabel: "Aylık", yearlyLabel: "Yıllık", saveBadge: "%25 tasarruf", perMonth: "ayda",
    billedAnnually: "Yıllık fatura {total}", youSave: "{amount} tasarruf",
    trust: { secure: "Stripe ile güvenli ödeme", noCommitment: "Bağlılık yok", quick: "Dakikalar içinde aktif", restaurants: "500+ restoran" },
  },
  faq: {
    eyebrow: "Sorular?", heading: "Sıkça sorulan", headingAccent: "sorular.",
    sub: "Restoran sahiplerinin kayıt olmadan önce sorduğu şeyler. Seninkini görmüyor musun? WhatsApp'tan yaz — gerçek insanlar cevaplar.",
    whatsappCta: "WhatsApp'tan sor", whatsappPrefill: "Merhaba, IQ Rest hakkında bir sorum var",
    items: [
      { q: "Ücretsiz deneme neyi içeriyor ve sonrası ne olur?", a: "14 gün tam erişim, kart yok. 14 gün sonunda ödeme yöntemi eklemezsen hesabın duraklar — asla otomatik tahsil etmiyoruz. Sonra ödeme bilgisi ekleyip tekrar aktive edebilirsin. Tek tıkla iptal et." },
      { q: "Siparişlerden komisyon alıyor musunuz?", a: "Sıfır. QR menünden gelen her sipariş direkt sana gelir — bizden pay yok, Yemeksepeti / Trendyol Yemek ücretleri yok. Tek sabit aylık fiyat, hepsi bu." },
      { q: "Misafirler için uygulama gerekli mi? Teknik bilgi gerekli mi?", a: "Misafirler için sıfır uygulama — kamerayla QR'ı tarıyor, menü tarayıcıda açılıyor. Senin için sıfır teknik beceri — tüm panel telefonda çalışıyor, eklemek için dokun, sıralamak için sürükle, öğrenme eğrisi bu kadar." },
      { q: "Fiyatları ve yemekleri ne kadar hızlı değiştirebilirim?", a: "Anında. Telefonda fiyatı değiştir, misafirler saniyeler içinde görür. Yeni yemek? Dokun, yaz, fotoğraf, hazır — yeniden basım yok, tasarımcı beklemek yok." },
      { q: "Kaç dil destekleniyor?", a: "Yerleşik AI çeviriyle 35 dil. Tek dokunuş tüm menüyü çeviriyor, AI mutfak bağlamını anlıyor — adlar ve tarifler her dilde doğal görünür. Turistler gerçekten anladıklarında daha çok sipariş verir." },
    ],
  },
  finalCta: { heading: "5 dakikada hazır.", headingAccent: "14 gün ücretsiz.", sub: "Kart yok. İstediğin zaman iptal. IQ Rest'te zaten 500+ restorana katıl." },
  scan: {
    heading: "Kâğıt menü veya PDF?",
    headingAccent: "Yapay zekâ 60 saniyede dijitalleştirir.",
    sub: "Yükle — AI kategorileri, ürünleri ve fiyatları çıkarır.",
    cta: "Menüyü tara →",
  },
  footer: {
    featureLinks: [
      { href: "/tr/online-orders", label: "Online siparişler" }, { href: "/tr/ai-translation", label: "AI çeviri" },
      { href: "/tr/reservations", label: "Rezervasyonlar" }, { href: "/tr/mobile-management", label: "Mobil yönetim" },
      { href: "/tr/easy-menu", label: "Menü editörü" }, { href: "/tr/custom-design", label: "Video ve foto arka planlar" },
      { href: "/tr/color-scheme", label: "Marka renkleri" }, { href: "/tr/multilingual", label: "Çok dilli site" },
      { href: "/tr/ai-images", label: "AI fotoğraf optimizasyonu" }, { href: "/tr/analytics", label: "Analitik" },
      { href: "/tr/instant-setup", label: "Anında kurulum" }, { href: "/tr/personal-support", label: "Kişisel destek" },
    ],
    navLinks: [
      { href: "#pricing", label: "Fiyatlar" }, { href: "#faq", label: "Sorular" },
      { href: "/tr/languages", label: "Dil değiştir" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Tüm hakları saklıdır.",
  },
};
