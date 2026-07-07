import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  MonitorSmartphone,
  BadgePercent,
  Globe,
  LayoutTemplate,
  Contact,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "tr",
  slug: "dijital-menu-restoran",
  trackPrefix: "l_tr_digital",
  hideFeatureHeading: true,

  meta: {
    title: "Restoranlar için dijital menü | IQ Rest",
    description:
      "Restoranlar için dijital menü: fotoğraflı, alerjenli online kart, AI çevirisi ve canlı fiyat güncellemeleri. 14 gün ücretsiz, kart gerekmez.",
    canonical: "https://iq-rest.com/tr/dijital-menu-restoran",
    ogLocale: "tr_TR",
    ogTitle: "Restoranlar için dijital menü",
    ogDescription:
      "Kağıt menünüzün online versiyonu — fotoğraflar, alerjenler, AI çevirisi, gerçek zamanlı güncellemeler.",
    brandLine: "IQ Rest — Restoranlar için dijital menü",
  },

  hero: {
    headline: "Her şeyi olan\ndijital menü",
    cta: "Dijital menü oluştur",
    sub: "Fotoğraflar, alerjenler ve 35 dile çeviri. Ayrıca siparişler, WhatsApp ve masa rezervasyonu — hepsi tek bir IQ Rest'te.",
  },

  scan: {
    heading: "Kağıt menünüz veya PDF'iniz mi var?",
    headingAccent: "AI bunu 60 saniyede dijitalleştirir.",
    sub: "Bir fotoğraf veya belge yükleyin — AI kategorileri, yemekleri ve fiyatları otomatik olarak tanır.",
    cta: "Menüyü tara",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 AI dili",
      heading: "Her misafire 35 dil",
      body: "Tek QR, 35 dil. AI mutfak bağlamıyla çevirir, böylece her yemek doğal görünür. Turistler güvenle sipariş verir.",
      bullets: [
        "Planınızda 35 dil",
        "Mutfak AI'ı, Google değil",
        "Tek dokunuşla dil değiştirme",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "İki misafir aynı dijital menüyü kendi telefonlarında farklı dillerde okuyor" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alerjenler",
      heading: "Her yemekte alerjen ve diyet",
      body: "Gluten, laktoz, kuruyemiş, vegan ve glutensizi etiketleyin. Misafirler menüyü diyetine göre filtreler ve rahatça sipariş verir.",
      bullets: [
        "14 alerjen kategorisi",
        "Vegan ve glutensiz etiketleri",
        "Diyete göre filtreleme",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Misafir telefonda menüyü alerjenlere göre filtrelerken sahip alerjen listesini bir tablette düzenliyor" },
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Her cihaz",
      heading: "Her cihazdan yönetin",
      body: "Yönetim paneli tarayıcıda çalışır — menüyü, fiyatları ve fotoğrafları her yerden düzenleyin. Kurulum gerekmez.",
      bullets: [
        "Her tarayıcıda çalışır",
        "Telefon, tablet veya PC",
        "Kurulum gerekmez",
      ],
    },
    {
      icon: BadgePercent,
      eyebrow: "Komisyon yok",
      heading: "Sıfır komisyon, ek ücret yok",
      body: "Tek şeffaf abonelik. Gelirinizden pay almayız ve gizli ücret koymayız — hepsi restoranda kalır.",
      bullets: [
        "Siparişlerde sıfır yüzde",
        "Gizli ek ücret yok",
        "Tek sabit fiyat",
      ],
    },
    {
      icon: Globe,
      eyebrow: "Özel alan adı",
      heading: "Menü kendi alan adınızda",
      body: "Alan adınızı SSL ile bağlarız — misafirler menüyü restoranınızın adresinde görür. DNS'te 10 dakikada yardımcı oluruz.",
      bullets: [
        "SSL'li kendi alan adınız",
        "menu.restoraniniz.com",
        "DNS kurulumunda yardım",
      ],
    },
    {
      icon: LayoutTemplate,
      eyebrow: "Sizin tasarımınız",
      heading: "Size uygun esnek tasarım",
      body: "Birkaç hazır düzen ve stil — mekanınıza uyan kapağı, renkleri ve yemek sunumunu seçin.",
      bullets: [
        "Birkaç hazır düzen",
        "Kendi kapak ve renkleriniz",
        "Birkaç tıkla yeni stil",
      ],
    },
    {
      icon: Contact,
      eyebrow: "İletişim",
      heading: "Menüde iletişim ve sosyal",
      body: "Harita, telefon ve Instagram ile WhatsApp bağlantıları olan özel bir sayfa — misafirler sizi tek dokunuşla bulur.",
      bullets: [
        "Harita, telefon ve adres",
        "Instagram ve WhatsApp",
        "Tek dokunuşla ulaşım",
      ],
    },
    {
      icon: MessageCircle,
      eyebrow: "WhatsApp siparişleri",
      heading: "WhatsApp üzerinden sipariş alın",
      body: "Misafirler sepet oluşturur ve siparişi doğrudan WhatsApp'ınıza gönderir — ayrı uygulama yok, zaten kullandıkları sohbette.",
      bullets: [
        "WhatsApp'ınıza sipariş",
        "Ayrı uygulama yok",
        "Her zamanki sohbet",
      ],
    },
    {
      icon: CalendarCheck,
      eyebrow: "Rezervasyonlar",
      heading: "Aramasız masa rezervasyonu",
      body: "Misafirler menü veya bağlantıyla kendileri masa ayırtır, siz masalara göre takvimi görür ve otomatik ya da elle onaylarsınız.",
      bullets: [
        "7/24 rezervasyon, aramasız",
        "Masalara göre takvim",
        "Otomatik ve elle onay",
      ],
    },
    {
      icon: Palette,
      eyebrow: "Premium tasarım",
      heading: "PDF değil, site gibi görünür",
      body: "Karşılama ekranında video arka plan, anlatılan konseptiniz ve harita ile sosyalin olduğu ayrı bir iletişim sayfası.",
      bullets: [
        "Ana ekranda video",
        "Konsept ve yemekler anlatılır",
        "Ayrı iletişim sayfası",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Bir kafe masasında iki telefon: video arka planlı menü ana ekranı ve haritalı iletişim sayfası" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Siparişler · isteğe bağlı",
      heading: "Doğrudan menüden sipariş",
      body: "Misafirler sepet oluşturur ve siparişi gönderir — salona, WhatsApp'a veya mutfak ekranına düşer. İsteğe bağlı.",
      bullets: [
        "Tek dokunuşla sepet ve gönderim",
        "Salona, WhatsApp'a veya mutfağa",
        "Ayarlardan açın",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Masada iki telefon: siparişli sepet ve sipariş onayı" },
    },
  ],

  faq: {
    sub: "Restorancıların IQ Rest'teki dijital menü hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
    items: [
      { q: "Teknik becerilere veya CMS deneyimine ihtiyacım var mı?", a: "Hayır, özel beceri gerekmez. Yönetim panelindeki her işlem kod olmadan tıklama ve sürükle-bırak ile yapılır. Bir menü ürünü eklemek birkaç saniye sürer: ad, fiyat, fotoğraf. Tam bir menü kurulumu genellikle 30 dakika ile bir saat arasında sürer." },
      { q: "IQ Rest dijital menü nedir?", a: "IQ Rest, restoranlar için bir bulut platformudur. Dijital menü, QR kodu veya doğrudan bağlantı aracılığıyla misafirlere sunulan menünüzün online versiyonudur: yemek fotoğrafları, fiyatlar, alerjenler, 35 dile AI çevirisi, gerçek zamanlı güncellemeler. Menü sunucularımızda barındırılır; yazılım kurmanıza veya bakımını yapmanıza gerek yoktur — sadece tarayıcıyı açın." },
      { q: "Misafirlerin uygulamaya veya özel donanıma ihtiyacı var mı?", a: "Hayır. Misafirler telefon kamerasını QR koduna doğrultur ve menü tarayıcıda açılır. Restoran için yönetim paneli de herhangi bir modern tarayıcıda çalışır — telefon, tablet veya dizüstü. QR kodlar herhangi bir ofis yazıcısında basılır." },
      { q: "Menüyü kendi alan adımda barındırabilir miyim?", a: "Evet. SSL sertifikalı özel alan adını destekliyoruz — misafirler menüyü restoranınızın adresinde görür (örn. menu.restoraniniz.com). DNS kurulumunda yardımcı oluyoruz; genellikle 5-10 dakika sürer." },
      { q: "Tek bir hesaptan birden fazla restoranı yönetebilir miyim?", a: "Evet, talep üzerine. Bir hesap birden fazla restoranı barındırabilir: her mekan kendi menüsü, tasarımı, QR kodları ve analitiği ile. WhatsApp'tan yazın, grubunuz için çoklu restoran modunu etkinleştirelim." },
      { q: "Menüyü sıfırdan kurmak ne kadar zor?", a: "Kurulum üç adımdan oluşur: (1) kategoriler oluşturun; (2) ad, fiyat ve fotoğraflarla ürünler ekleyin; (3) masalar için QR kodları basın. Zaten bir kağıt menüniz veya PDF'iniz varsa, yükleyin — AI kategorileri, adları ve fiyatları tanıyacak ve kartları otomatik olarak dolduracak. Temel bir menü 5 dakikada yayınlanabilir; tam kurulum süresi ürün sayısına bağlıdır." },
      { q: "Ne tür destek sunuyorsunuz?", a: "Çalışma saatlerinde WhatsApp'tayız ve e-postaya hızlı cevap veriyoruz. İlk kurulum, alan adı yapılandırması, menü tasarımı ve her türlü standart dışı durumlarda yardımcı oluyoruz. Demo veya lansman sırasında uygulamalı desteğe ihtiyacınız varsa — bize yazın." },
    ],
  },
};
