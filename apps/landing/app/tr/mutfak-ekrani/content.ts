import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "tr",
  slug: "mutfak-ekrani",
  trackPrefix: "l_tr_kds",

  meta: {
    title: "Restoranlar için mutfak ekranı (KDS) | IQ Rest",
    description:
      "Restoranlar için mutfak ekranı (KDS): salondan ve QR menüden gelen siparişler anında aşçının ekranına düşer. Masaya göre sütunlar, durumlar Bekliyor / Hazırlanıyor / Hazır / Servis edildi, bölge filtreleri. Tablette veya telefonda çalışır.",
    canonical: "https://iq-rest.com/tr/mutfak-ekrani",
    ogLocale: "tr_TR",
    ogTitle: "Mutfak ekranı (KDS) — siparişler aşçının ekranında",
    ogDescription:
      "Salondan siparişler aşçının ekranında. Masaya göre sütunlar, durumlar ve zamanlayıcı. Tek dokunuş durumu değiştirir.",
    brandLine: "IQ Rest — Mutfak ekranı sistemi",
  },

  hero: {
    headline: "Mutfak ekranı: siparişler doğrudan aşçının ekranına.",
    sub: "Kağıt fişlere artık gerek yok. Salondan veya QR menüden gelen siparişler anında mutfak ekranına düşer — notlar, alerjenler ve zamanlayıcı ile. Tek dokunuş durumu değiştirir. Passteki tablette veya aşçının cebindeki akıllı telefonda çalışır.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Aktif siparişlerin olduğu mutfak ekranını gösteren pirinç stand üzerinde tablet bulunan profesyonel mutfak",
  },

  scan: {
    heading: "Mutfak ekranını kurun",
    headingAccent: "5 dakikada.",
    sub: "Kağıt menüyü veya PDF'yi yükleyin — AI yemekleri, kategorileri ve alerjenleri tanır. Mutfağa bir tablet bağlayın ve sipariş almaya başlayın.",
    cta: "Menüyü tara",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Kontroller ve filtreler",
      heading: "Bölgeye göre birden fazla ekran: mutfak ve bar.",
      body: "Sıcak hatta, bara veya pasta istasyonuna ayrı tabletler yerleştirin — her ekran yalnızca kendisine ait yemekleri gösterir. Duruma (Bekliyor / Hazırlanıyor / Hazır / Servis edildi) ve kategoriye göre filtreler gürültüyü ortadan kaldırır: aşçı yalnızca istasyonu için ilgili olanı görür.",
      bullets: [
        "Kategori filtreleriyle birden fazla KDS ekranı.",
        "Durum filtresi: yalnızca hazırlanıyor ve hazır gösterilsin.",
        "Her bölge yalnızca kendi sipariş akışını görür.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Mutfak passinde pirinç stand üzerinde tablet — durum filtreli KDS" },
    },
    {
      icon: Timer,
      eyebrow: "Kartlar ve zamanlayıcı",
      heading: "Tek dokunuş durumu değiştirir. Notlar ve alerjenler renkle vurgulanır.",
      body: "Yemek kartı seçilen seçenekleri (soğansız, iyi pişmiş), misafirin notunu, alerjenleri ve siparişin verildiği andan itibaren bir zamanlayıcıyı gösterir. Karta dokunun ve durum bir sonrakine geçer: Bekliyor → Hazırlanıyor → Hazır → Servis edildi. Liste otomatik olarak önceliğe göre sıralanır.",
      bullets: [
        "Karta dokunun — anında durum değişikliği.",
        "Seçenekler, notlar ve alerjenler renkle vurgulanır.",
        "Öncelik sıralaması: daha uzun bekleyen ürünler en üste çıkar.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Bar tezgahında pirinç stand üzerinde tablet — masaya göre sipariş kartlı KDS" },
    },
  ],

  faq: {
    sub: "Restorancıların IQ Rest'teki mutfak ekranı hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
    items: [
      { q: "Mutfağın hangi yemek durumları vardır?", a: "Farklı kart renkleriyle dört durum: Bekliyor (gri) — sipariş kabul edildi ve bekliyor; Hazırlanıyor (turuncu) — yemek hazırlanıyor; Hazır (mavi) — servise hazır; Servis edildi (yeşil) — misafire teslim edildi. Karta dokunmak bir sonraki duruma taşır, menüler veya onaylar olmadan." },
      { q: "Farklı bölgelerde birden fazla KDS ekranı çalıştırabilir miyim?", a: "Evet. Sıcak hatta bir tablet, barda bir başkası, pasta istasyonunda üçüncüsü — her biri kendi kategori filtresiyle. Tüm ekranlar gerçek zamanlı senkronize edilir: bir ekranda değiştirilen bir durum her yerde güncellenir." },
      { q: "KDS'yi çalıştırmak için hangi donanıma ihtiyacım var?", a: "KDS, herhangi bir modern tarayıcıda çalışan bir web uygulamasıdır. Büyük bir mutfak — passte pirinç stand üzerinde bir tablet veya duvarda bir TV. Küçük bir mekan — aşçının akıllı telefonu. Özel donanım yok, kurulum yok: bir bağlantı açın ve hesaba giriş yapın." },
      { q: "Mutfak ekranındaki siparişler nereden geliyor?", a: "Her kaynaktan: masada QR menü üzerinden sipariş veren misafir; siparişi telefonundan alan garson; siparişi web sitesinden veren misafir. Hepsi KDS'ye kaynak etiketi ve masa numarasıyla gelir. Bir POS'tan manuel transfer yok." },
      { q: "Sipariş kartında ne gösteriliyor?", a: "Yemek adı, seçilen değiştiriciler (soğansız, iyi pişmiş, sos ekle), misafir yorumu, vurgulanan alerjenler, durum (Bekliyor / Hazırlanıyor / Hazır / Servis edildi) ve yemeğin ne kadar süredir beklediğini gösteren bir zamanlayıcı. Kartlar önceliğe göre sıralanır: bekleme süresi ne kadar uzunsa, sütunda o kadar yukarıda." },
      { q: "Ekrandaki kartları filtreleyebilir miyim?", a: "Evet. İki filtre: duruma göre (örn. yalnızca Bekliyor ve Hazırlanıyor göster, Servis edildi'yi gizle) ve kategoriye göre (yalnızca barda içecekler, yalnızca mutfakta ana yemekler). Ayarlar cihaz başına kaydedilir — her bölge kendi setini tutar." },
    ],
  },
};
