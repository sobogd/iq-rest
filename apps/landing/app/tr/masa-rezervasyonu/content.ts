import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "tr",
  slug: "masa-rezervasyonu",
  trackPrefix: "l_tr_bookings",

  meta: {
    title: "Restoranlar için 7/24 masa rezervasyonu | IQ Rest",
    description:
      "Restoranlar için 7/24 masa rezervasyonu: misafirler QR menü veya web sitesi üzerinden kendileri rezerve eder. Masaya göre takvim, otomatik onaylar ve hatırlatmalar. Tek bir misafir bile kaçmıyor. 14 gün ücretsiz.",
    canonical: "https://iq-rest.com/tr/masa-rezervasyonu",
    ogLocale: "tr_TR",
    ogTitle: "7/24 masa rezervasyonu — misafirler kendileri rezerve eder",
    ogDescription:
      "Misafirler QR menü veya web sitesi üzerinden masa rezerve eder. Takvim, otomatik onaylar, hatırlatmalar. Tek bir misafir bile kaçmıyor.",
    brandLine: "IQ Rest — Restoranlar için masa rezervasyonu",
  },

  hero: {
    headline: "7/24 masa rezervasyonu — misafirler kendileri rezerve eder.",
    cta: "Masa rezervasyonunu kur",
    sub: "Misafirler QR menü veya doğrudan bir bağlantı üzerinden masa rezerve eder. Masaya göre takvim, otomatik onaylar ve hatırlatmalar. Tek bir misafir bile kaçmıyor ve yoğun saatlerde telefon yok.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Hostes restoran girişindeki tabletten rezervasyonları yönetiyor",
  },

  scan: {
    heading: "Masa rezervasyonunu başlatın",
    headingAccent: "5 dakikada.",
    sub: "Takvimi bağlayın, fotoğraf ve kapasiteyle masalar ekleyin — misafirler aynı gün rezervasyon yapmaya başlar.",
    cta: "Rezervasyonu etkinleştir",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Rezervasyon formu",
      heading: "Misafirler kendileri rezerve eder — tarih, saat ve kişi sayısına göre.",
      body: "Misafir QR menüsünü veya doğrudan bir bağlantıyı açar, tarih, saat ve kişi sayısını seçer — ve hemen müsait masaları görür, her biri fotoğraf, açıklama (teras, pencere kenarı, bara yakın bank) ve kapasiteyle. Onay e-posta ve WhatsApp ile otomatik olarak gönderilir.",
      bullets: [
        "Fotoğraf, açıklama ve kapasiteyle masa seçimi.",
        "Otomatik onay ve ziyaretten bir saat önce hatırlatma.",
        "Formda minimum alan: ad, telefon, kişi sayısı.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Misafir telefondan restoran masası rezerve ediyor: tarih, saat, kişi sayısı ve masa seçici" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Rezervasyon takvimi",
      heading: "Güne ve masaya göre takvim — her şeyi bir bakışta görün.",
      body: "Yönetim paneli, masaya, güne, haftaya ve aya göre ayrılmış rezervasyon takvimini gösterir. Boş slotlar, dolu masalar, onaylı ve onaysız rezervasyonların hepsi tek bir ekranda. Salondaki tablette ve ofisteki dizüstünde çalışır.",
      bullets: [
        "Gün, hafta ve ay görünümleri.",
        "Masaya göre ayırma: kim, ne zaman, kaç misafir.",
        "Telefondan tek dokunuşla rezervasyon taşıma, iptal etme veya onaylama.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "İki tablette IQ Rest yönetim panelinde rezervasyon takvimi: masalara göre günlük Gantt ve aylık görünüm" },
    },
  ],

  faq: {
    sub: "Restorancıların IQ Rest'teki masa rezervasyonu hakkında sorduğu sorular. Sorunuzu bulamadınız mı? WhatsApp'tan yazın.",
    items: [
      { q: "Rezervasyon için hangi gün ve saatlerin müsait olduğunu seçebilir miyim?", a: "Evet. Yönetim paneli çalışma saatlerini ve müsait hafta günlerini ayarlamanıza olanak tanır — sistem misafirlere müsait olmayan slotları göstermez. Belirli bir tarihi (kurumsal etkinlik, özel rezervasyon) kapatabilir veya tüm takvimi geçici olarak kapatabilirsiniz." },
      { q: "Her masa için fotoğraf yükleyebilir miyim?", a: "Evet. Her masanın fotoğrafı, açıklaması (teras, pencere kenarı, bara yakın bank) ve kapasitesi olabilir. Misafir rezerve ettiği tam masayı görür ve bilinçli bir seçim yapar — bu, karşılanmayan beklentileri azaltır." },
      { q: "Belirli tarihlerde rezervasyonu devre dışı bırakabilir miyim?", a: "Evet. Takvim, belirli tarihleri (tatiller, özel etkinlikler, tadilat) veya tüm hafta günlerini kapatmanıza olanak tanır. Bu tarihlerde misafirler „rezervasyon geçici olarak kullanılamıyor“ mesajını görür." },
      { q: "Misafirden hangi alanların toplandığını özelleştirebilir miyim?", a: "Evet. Varsayılan set: ad, telefon, e-posta, kişi sayısı. Özel alanlar (durum, alerjiler, özel istekler) ekleyebilir veya formu mümkün olduğunca kısa tutmak için gereksizleri kaldırabilirsiniz." },
      { q: "Masa başına misafir sayısını sınırlayabilir miyim?", a: "Evet. Her masanın bir „kapasite“ ayarı vardır — sistem 2 kişilik bir masanın 6 kişi için rezerve edilmesine izin vermez. Daha büyük masalarda küçük grupların „sekiz kişilik“ masayı daha büyük gruplardan almasını önlemek için bir minimum belirleyebilirsiniz." },
      { q: "Rezervasyon kurulumu ne kadar zor?", a: "Çok az zaman alır. Üç adım: (1) ad, fotoğraf ve kapasiteyle masalar ekleyin, (2) ayarlarda rezervasyon modunu etkinleştirin, (3) bağlantıyı veya QR kodunu misafirlerle paylaşın. Tam lansman 5-10 dakika sürer." },
      { q: "Rezervasyon sistemini kendi alan adımda kullanabilir miyim?", a: "Evet. SSL sertifikalı özel alan adını destekliyoruz: misafirler restoranınızın adresinde rezerve eder (örn. rezervasyon.restoraniniz.com). DNS kurulumunda yardımcı oluyoruz; süreç 5-10 dakika sürer." },
      { q: "Otomatik veya manuel onayı yapılandırabilir miyim?", a: "Evet, mod ayarlarda belirlenir. Otomatik onay ile misafir formu gönderdikten hemen sonra onay alır ve rezervasyon kabul edilmiş sayılır. Manuel onay ile istek yönetim paneline „onay bekliyor“ durumuyla düşer — yönetici inceler ve onaylar veya reddeder. Manuel mod, sınırlı masa sayıları veya katı misafir politikaları için kullanışlıdır." },
      { q: "Rezervasyonlardan komisyon alıyor musunuz?", a: "Hayır. Masa rezervasyonu Pro planına tamamen dahildir — misafirler üzerinden yüzde yok, slot başına ücret yok, aracı komisyonu yok. Tek sabit aylık ücret ve sınırsız rezervasyon." },
    ],
  },
};
