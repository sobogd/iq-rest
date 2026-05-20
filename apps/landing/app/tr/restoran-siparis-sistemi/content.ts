import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "tr",
  slug: "restoran-siparis-sistemi",
  trackPrefix: "l_tr_orders",

  meta: {
    title: "Restoran sipariş sistemi — misafir ve garson | IQ Rest",
    description:
      "Telefon veya tabletten restoran siparişi: salon haritası, hesap bölme, durumlar, seçenekler ve notlar. Misafirler masada sipariş verir; garson herhangi bir cihazdan sipariş alır. 14 gün ücretsiz.",
    canonical: "https://iq-rest.com/tr/restoran-siparis-sistemi",
    ogLocale: "tr_TR",
    ogTitle: "Restoran sipariş sistemi — misafir ve garson",
    ogDescription:
      "Masada misafir veya telefondaki garson — sipariş anında mutfağa düşer. Salon haritası, hesap bölme, durumlar, seçenekler ve notlar.",
    brandLine: "IQ Rest — Restoran sipariş sistemi",
  },

  hero: {
    headline: "Sipariş alma: misafir ve garson — doğrudan mutfağa.",
    sub: "Misafirler masada QR menü üzerinden sipariş verir veya garson siparişi telefon ya da tabletten alır — sipariş saniyeler içinde mutfak ekranına düşer. Renk kodlu masalı salon haritası, hesap bölme, esnek seçenekler ve yorumlar. Defter yok, bara gidiş geliş yok.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Garson akıllı telefondan masada bir sipariş alıyor — sipariş mutfak ekranına düşüyor",
  },

  scan: {
    heading: "Sipariş sistemini kurun",
    headingAccent: "5 dakikada.",
    sub: "Kağıt menüyü veya PDF'yi yükleyin — AI yemekleri, fiyatları ve kategorileri tanır. Salona bir tablet bağlayın ve masalarda sipariş almaya başlayın.",
    cta: "Menüyü tara",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Liste ve salon haritası",
      heading: "Salon haritasının yanında sipariş listesi.",
      body: "Sağda tüm aktif siparişler: durum, toplam, süre, ürün sayısı. Solda — salon haritası: durumlarına göre renklendirilen masalar — boş, dolu, dikkat gerektiriyor. Bir masaya dokunarak sipariş açın veya oluşturun; bir karta dokunarak detay görünümünü açın. Ekranlar arasında geçiş yok.",
      bullets: [
        "Salon haritası: sipariş durumuna göre renk kodlu masalar.",
        "Yan tarafta sipariş listesi — toplam, süre, ürün sayısı.",
        "Bir masaya dokunarak sipariş açın veya oluşturun.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Garson istasyonundaki tablet: sipariş listesi ve renk kodlu masalı salon haritası" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Sipariş kartı",
      heading: "Sipariş kartı: durumlar, kopyalama, silme — tek dokunuş.",
      body: "Her ürünün kendi durumu vardır (Bekliyor / Hazırlanıyor / Hazır / Servis edildi) — mutfak ve garson aynı resmi gerçek zamanlı görür. Noktaya dokunmak eylem menüsünü açar: durumu değiştir, ürünü aynı değiştiriciler ve seçeneklerle kopyala, sil. Her şey kartın içinde.",
      bullets: [
        "Ürün başına durum: Bekliyor / Hazırlanıyor / Hazır / Servis edildi.",
        "Aynı seçeneklerle tek dokunuşla ürün kopyalama.",
        "Bir ürünü doğrudan karttan silin.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Sipariş detay kartlı tablet: ürün durumları, kopyalama ve silme eylemleri" },
    },
    {
      icon: Receipt,
      eyebrow: "Hesap bölme",
      heading: "Misafirler ayrı ödediğinde hesabı bölün.",
      body: "Misafirler bölmeye karar verdi — yeni bir fişe taşınacak ürünleri işaretleyin; geri kalanlar mevcut fişte kalır. Sistem her iki toplamı da anında gösterir. „Siparişi böl“ üzerine tek dokunuş ve doğru toplamlarla iki bağımsız siparişiniz olur, ikisi de hala masalarına bağlıdır.",
      bullets: [
        "Onay kutularıyla bölünecek ürünleri seçin.",
        "Her iki toplam anında gösterilir.",
        "Tek dokunuş ve sipariş manuel matematik olmadan bölünür.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Restoran masasındaki tablet: misafirler arası hesap bölme modeli" },
    },
    {
      icon: Smartphone,
      eyebrow: "Telefondan ekle",
      heading: "Telefondan ürün ekleyin — üç eylemde.",
      body: "Garson bir cihaza bağlı değildir: telefonunda sipariş almayı açar ve üç adımda bir ürün ekler — kategori, yemek, seçenekler (boyut, pişme derecesi, ekstra sos veya malzeme). Fiyat otomatik olarak yeniden hesaplanır. Mutfak için not son adımda gelir.",
      bullets: [
        "Üç adım: kategori → yemek → seçenekler.",
        "Tek tıklamayla fiyatlandırılan seçenekler (boyut, ekler, ekstralar).",
        "Son adımda not alanı.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Sipariş ürünü ekleme adımlı dört telefon: kategori, yemek, boyut, yorum" },
    },
  ],

  faq: {
    sub: "Restorancıların IQ Rest'teki sipariş alma hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
    items: [
      { q: "Birkaç garson farklı cihazlardan aynı anda çalışabilir mi?", a: "Evet. Her garson kendi telefonu veya tabletinden paylaşılan restoran hesabına giriş yapar — herkes aynı masaları, siparişleri ve durumları gerçek zamanlı görür. Bir garsonun yaptığı değişiklikler diğerleri için anında görünür, çakışma veya kilit olmadan." },
      { q: "Garsonlar kişisel cihazlarını kullanabilir mi (BYOD)?", a: "Evet. Bu tarayıcıda çalışan bir web uygulamasıdır — kurulacak bir şey yok. Garson bir bağlantı açar, iPhone, Android veya kişisel tabletinden restoran hesabına giriş yapar ve çalışmaya başlar. Vardiya sonunda sadece çıkış yapar." },
      { q: "Yemeklere zorunlu seçenekler eklenebilir mi (boyut, pişme derecesi vb.)?", a: "Evet. Her yemek istenildiği kadar seçenek grubuna sahip olabilir — zorunlu (örn. „Boyut“: Küçük / Orta / Büyük) ve isteğe bağlı („Pişme derecesi“: kanlı / orta / iyi pişmiş). Seçenekler fiyatı değiştirebilir (+1,00 €). Bir grup zorunluysa, sistem misafirin veya garsonun seçim yapmadan yemeği eklemesine izin vermez." },
      { q: "Misafirler bir yemeğe not veya ekstra ekleyebilir mi (ekmek, sos)?", a: "Evet. Ekleme işleminin son adımında serbest metin not alanı vardır („soğansız“, „iyi pişmiş“, „fındık alerjim var“). Ekstralar ayrı fiyatlandırılmış değiştiricilerdir („+ BBQ sos +1,50 €“, „+ Ekmek +2,00 €“). Notlar mutfak ekranında renkle vurgulanmış olarak gösterilir." },
      { q: "Sipariş istatistikleri var mı?", a: "Evet. Analitik bölümü şunları gösterir: güne ve saate göre gelir, ortalama hesap, en çok satan yemekler, misafir → sipariş dönüşümü, servis hızı (Bekliyor'dan Servis edildi'ye süre). Bu, vardiyaları, satın almaları planlamaya ve düşük performanslı yemekleri belirlemeye yardımcı olur." },
      { q: "Siparişler bölünebilir veya masalar arasında taşınabilir mi?", a: "Evet, her iki senaryo da desteklenir. Bölmek için — yeni bir fişe gidecek ürünleri işaretleyin (ayrı ödeyen misafirler için). Taşımak için — sipariş kartını açın, yeni bir masa seçin; tüm sipariş oraya taşınır. Manuel matematik yok, panelden çıkmak yok." },
    ],
  },
};
