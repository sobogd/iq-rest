import type { HelpDoc } from "../types";

// TR help guide.
export const tr: HelpDoc = {
  metaTitle: "IQ Rest nasıl kullanılır — adım adım kılavuz",
  metaDescription:
    "Eksiksiz IQ Rest kılavuzu: kayıt, menü, siparişler, rezervasyonlar, mutfak ekranı ve ayarlar — restoranlar için.",
  h1: "Yardım",
  intro: "IQ Rest için ayrıntılı bir kılavuz — kayıttan en ince ayarlara kadar.",
  banner: {
    title: "Göründüğünden daha basit",
    sub: "Adım adım kılavuz: kayıttan en ince ayarlara kadar — herkes yapabilir.",
    cta: "Nasıl kullanılır",
  },
  tipLabel: "İpucu",
  noteLabel: "Önemli",
  sections: [
    {
      id: "start",
      title: "1. Başlangıç",
      blocks: [
        { type: "h3", text: "Bu sistem nedir" },
        {
          type: "p",
          text: "IQ Rest, restoranlar için bir hizmettir: QR kodlu bir çevrimiçi menü oluşturursunuz, siparişleri ve masa rezervasyonlarını doğrudan müşterilerin telefonundan alırsınız, mutfakta ve garsonlarda tablet terminaller çalışır. Her şey tek bir yönetim panelinden (panel) yönetilir.",
        },
        { type: "h3", text: "Kayıt ve giriş" },
        { type: "p", text: "Üç şekilde giriş yapabilirsiniz — giriş ekranında herhangi birini seçin:" },
        {
          type: "list",
          items: [
            "Google ile — “Google ile devam et”e tıklayın ve hesabı seçin.",
            "Apple ile — “Apple ile devam et”e tıklayın.",
            "E-posta ile — “E-posta ile devam et”e tıklayın, adresinizi girin, size 6 haneli bir kod gönderelim. Sonraki ekranda girin. Parola gerekmez.",
          ],
        },
        {
          type: "note",
          text: "E-posta ile yalnızca tek seferlik bir giriş kodu gelir — spam yok, bülten yok.",
        },
        { type: "h3", text: "Restoran oluşturma (kurulum)" },
        {
          type: "p",
          text: "İlk girişte sistem sizi hızlı bir kuruluma yönlendirir. Ardından, daha sonra kendinizinkiyle değiştireceğiniz örnek bir menü şablonuyla otomatik olarak bir restoran oluşturulur.",
        },
        {
          type: "steps",
          items: [
            "Restoran adını girin.",
            "Mutfak türünü seçin (başlangıç menü şablonunu belirler).",
            "Hazır: önceden doldurulmuş örnek menüyle panele girersiniz.",
          ],
        },
        {
          type: "note",
          text: "Para birimi bölgenize göre otomatik algılanır — başlangıçta seçmeniz gerekmez. Daha sonra Ayarlar → Bölge'den değiştirebilirsiniz.",
        },
        { type: "h3", text: "Panele genel bakış" },
        {
          type: "p",
          text: "Bölümler arası gezinme: bilgisayarda üst çubuk, telefonda alt çubuk. Bölümler: Menü, Siparişler, Rezervasyonlar, Mutfak, Analizler ve Ayarlar.",
        },
        {
          type: "list",
          items: [
            "Üst çubukta restoran adının yanında küçük bir bağlantı göstergesi var: yeşil nokta, siparişlerin gerçek zamanlı eşitlendiği anlamına gelir.",
            "“Menü” sayfasında üstte “Önizleme” düğmesi var — menünüzü müşterinin gördüğü gibi açar.",
            "Hemen yanında “Paylaş” düğmesi — QR kodunu ve menü bağlantısını gösterir (bağlantıyı kopyala, QR'ı indir veya menüyü aç).",
          ],
        },
        {
          type: "tip",
          text: "Her menü değişikliğinden sonra “Önizleme”ye basın — müşteriye nasıl göründüğünü anında görürsünüz.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menü",
      blocks: [
        {
          type: "p",
          text: "“Menü” bölümü sistemin kalbidir. Burada yapıyı kurarsınız: kategoriler → yemekler → seçenekler. Gezinmeden açın.",
        },
        { type: "h3", text: "Kategoriler ve alt kategoriler" },
        {
          type: "steps",
          items: [
            "“Kategori ekle”ye basın ve bir ad girin (örneğin “Başlangıçlar”).",
            "Bir kategoriyi düzenlemek için — üzerine gelin ve “Kategoriyi düzenle”ye basın.",
            "Kategorilerin sırasını “Yukarı” / “Aşağı” düğmeleriyle değiştirirsiniz — müşteri tam bu sırada görür.",
            "“Grup” oluşturabilirsiniz (“Grup ekle” ile) — içinde başka kategoriler bulunan bir bölüm-kategori.",
          ],
        },
        { type: "h3", text: "Yemek ekleme" },
        {
          type: "steps",
          items: [
            "Bir kategoriyi açın (soldaki ok) ve “Yemek ekle”ye basın.",
            "Adı, fiyatı ve açıklamayı doldurun.",
            "Fotoğraf ekleyin: “Fotoğraf ekle” — kendi fotoğrafınızı yükleyin veya “Oluştur”a basıp yemeği kelimelerle tarif edin, yapay zekâ görseli oluştursun.",
            "Kaydedin. Yemek kategoride görünür.",
          ],
        },
        {
          type: "tip",
          text: "Fotoğraf yapay zekâ ile oluşturulabilir: açıyı, ışığı veya arka planı belirtin (örneğin “Ahşap tahtada Margherita pizza, üstten görünüm”).",
        },
        { type: "h3", text: "Seçenekler ve varyantlar (değiştiriciler)" },
        {
          type: "p",
          text: "Seçenekler bir yemeğin içindeki tercihlerdir: boyut, pişirme derecesi, ek malzemeler. Her seçeneğin varyantları vardır ve bir varyanta fiyat farkı eklenebilir (örneğin “+1.50 her biri”).",
        },
        {
          type: "list",
          items: [
            "Örnek: “Boyut” seçeneği, “Küçük / Büyük (+2.00)” varyantlarıyla.",
            "Örnek: müşterinin birini veya birkaçını seçtiği birden çok varyantlı bir “Ekstra” seçeneği.",
          ],
        },
        { type: "h3", text: "Alerjenler ve diyetler" },
        {
          type: "p",
          text: "Bir yemekte alerjenleri (gluten, kuruyemiş vb.) ve diyet etiketlerini (vejetaryen, vegan) işaretleyebilirsiniz. Müşteri bunları herkese açık menüde simge olarak görür.",
        },
        { type: "h3", text: "Yemeklerin görünürlüğü" },
        {
          type: "p",
          text: "“Yemeği gizle” / “Yemeği göster” düğmesi, bir öğeyi silmeden herkese açık menüden geçici olarak kaldırır — bir yemek bittiğinde kullanışlıdır.",
        },
        { type: "h3", text: "Kâğıt menü yükleme (tarama)" },
        {
          type: "p",
          text: "Zaten fotoğraf veya PDF olarak bir menünüz varsa — elle girmeyin. Taramayı kullanın:",
        },
        {
          type: "steps",
          items: [
            "“Menü yükle” afişine basın (veya “Kâğıt menünüzü yükleyin”).",
            "En fazla 5 dosya ekleyin (fotoğraf/tarama, her biri en fazla 20 MB) ve “Tara”ya basın.",
            "Bir dakikaya kadar bekleyin — yapay zekâ kategorileri ve yemekleri tanır.",
            "Tanınanı kontrol edin, istediğiniz öğeleri işaretleyin ve “Devam et”e basın.",
            "Seçin: mevcut menüyü değiştirin veya yeni öğeleri mevcut menüye ekleyin.",
          ],
        },
        {
          type: "note",
          text: "Başlangıç şablonundaki örnekler, taranan menüyü kaydederken kaldırılır — bu normaldir.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Masalar ve QR kodları",
      blocks: [
        {
          type: "p",
          text: "Masalar, siparişleri ve rezervasyonları belirli yerlere bağlamak ve kişisel QR kodları yazdırmak için kullanılır. Bölüm: Ayarlar → Masalar.",
        },
        { type: "h3", text: "Masa oluşturma" },
        {
          type: "steps",
          items: [
            "Ayarlar → Masalar'ı açın ve “Masa ekle”ye basın.",
            "Masa numarasını, koltuk sayısını ve (isteğe bağlı) bir ad girin — örneğin “Pencere”, “Bar”, “Teras”.",
            "Bir masa fotoğrafı ekleyin — müşteriler görür ve masalarının tam olarak nerede olduğunu anlar.",
            "Bir masa rengi belirleyin — bu renkle masa mutfakta ve “Siparişler” bölümünde vurgulanır, böylece personel hızla bulur.",
            "İsterseniz kısa bir açıklama ekleyin.",
            "Kaydedin.",
          ],
        },
        {
          type: "note",
          text: "Masa fotoğrafı müşteriler içindir (“masam nerede” ipucu). Renk personel içindir (mutfakta ve siparişlerde masanın hızlı görsel işareti).",
        },
        { type: "h3", text: "Masa QR kodu" },
        {
          type: "p",
          text: "Her masanın kendi QR kodu vardır. Müşteri telefonuyla tarar ve doğrudan o masanın menüsüne girer — sipariş otomatik olarak doğru masaya bağlanır.",
        },
        {
          type: "steps",
          items: [
            "İstediğiniz masada “QR kodunu göster”e basın.",
            "Görüntüyü kaydetmek için “QR'ı indir”e basın.",
            "Yazdırın ve masaya yerleştirin (bir stant üzerine, menüye, bir etikete).",
          ],
        },
        {
          type: "tip",
          text: "“Masa bağlantısı”, QR ile aynı bağlantıdır ama metin olarak. Müşteriye mesajla gönderebilirsiniz.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Siparişler",
      blocks: [
        { type: "h3", text: "Müşteri nasıl sipariş verir" },
        {
          type: "p",
          text: "Müşteri masadaki QR'ı tarar → menü açılır → yemekleri, seçenekleri ve adedi seçer → siparişi verir. Sipariş anında panelinizde ve mutfak/garson terminalinde görünür.",
        },
        {
          type: "note",
          text: "Müşterilerin sipariş verebilmesi için Ayarlar → Siparişler'de “Siparişleri kabul et” açık olmalı. Kapalıysa müşteri menüyü görür ama sipariş düğmesi olmaz.",
        },
        { type: "h3", text: "Siparişleri panelde yönetme" },
        {
          type: "p",
          text: "“Siparişler” bölümü salon planını gösterir. Dolu masalar vurgulanır ve aktif sipariş sayısını gösterir. Siparişlerini açmak için bir masaya dokunun.",
        },
        {
          type: "steps",
          items: [
            "Bir masaya dokunun → “Sipariş başlat” (veya mevcut bir siparişi açın).",
            "“Öğe ekle” → kategori → yemek → seçenekler seçin → gerekirse adet ve not girin (örneğin “soğansız”).",
            "“Ekle”ye basın — öğe siparişe girer.",
          ],
        },
        { type: "h3", text: "Öğe durumları" },
        {
          type: "p",
          text: "Her öğenin bir durumu vardır: Beklemede → Pişiyor → Hazır → Servis edildi. Durumu değiştirmek için öğeye dokunun. Durumlar mutfakla gerçek zamanlı eşitlenir.",
        },
        { type: "h3", text: "İndirimler, bölme, masa değiştirme" },
        {
          type: "list",
          items: [
            "İndirim: “İndirim ekle” — yüzde veya sabit tutar, tüm siparişe veya tek bir öğeye, gerekçeyle.",
            "Siparişi böl: “Siparişi böl” — yeni, ayrı bir hesaba gidecek öğeleri seçin.",
            "Masa değiştir: “Masa değiştir” — siparişi başka bir masaya taşıyın.",
            "Öğeyi çoğalt: aynısından hızlıca bir tane daha ekleyin.",
          ],
        },
        { type: "h3", text: "Siparişi kapatma" },
        {
          type: "steps",
          items: [
            "Tüm öğeler servis edildiğinde “Siparişi kapat”a basın.",
            "Bir ödeme yöntemi seçin (yöntemler yapılandırıldıysa).",
            "Sipariş kapanır ve aktiflerden çıkar.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Mutfak (KDS)",
      blocks: [
        {
          type: "p",
          text: "Mutfak ekranı (KDS), aşçılar için bir tablette gösterilen ekrandır. Yeni siparişler gerçek zamanlı düşer ve aşçı yemekleri hazır olarak işaretler.",
        },
        { type: "h3", text: "Ekran neyi gösterir" },
        {
          type: "list",
          items: [
            "Öğeler, seçenekler ve “pasta” süresiyle sipariş kartları.",
            "Durumun renkli göstergesi: ne pişiyor, ne hazır.",
            "Yeni sipariş geldiğinde sesli uyarı.",
          ],
        },
        { type: "h3", text: "Nasıl kullanılır" },
        {
          type: "steps",
          items: [
            "Bir öğeyi sonraki duruma geçirmek için dokunun (Pişiyor → Hazır).",
            "“Sesi aç” düğmesiyle sesi etkinleştirin — böylece yeni siparişler sesli uyarıyla gelir.",
            "Yakınlaştırmayla kart boyutunu tablete göre ayarlayın.",
            "Filtrelerle yalnızca gereken kategorileri gösterin (örneğin yalnızca sıcak hat).",
          ],
        },
        {
          type: "note",
          text: "Tablet interneti kaybederse “Bağlantı yok” uyarısı çıkar. Wi-Fi'yi bağlayın, siparişler yeniden gelmeye başlar.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Rezervasyonlar",
      blocks: [
        {
          type: "p",
          text: "Müşteriler menünüzden masa rezerve edebilir, siz de rezervasyonları “Rezervasyonlar” bölümünde yönetirsiniz (“Ay” / “Gün” görünümü).",
        },
        { type: "h3", text: "Rezervasyonları ayarlama" },
        { type: "p", text: "Önce rezervasyonları açın ve yapılandırın: Ayarlar → Rezervasyonlar." },
        {
          type: "steps",
          items: [
            "“Rezervasyonları etkinleştir”i açın.",
            "Onay modunu seçin: “Otomatik” (rezervasyonlar kendiliğinden onaylanır) veya “Manuel” (her birini siz onaylarsınız).",
            "“Rezervasyon süresi”ni belirleyin — masa müşteri için ne kadar tutulur.",
            "“Haftalık programı” doldurun: her gün için — açık/kapalı, çalışma saatleri ve gerekirse öğle arası.",
          ],
        },
        {
          type: "note",
          text: "Rezervasyon kabul etmek için masalar gerekir. Yoksa sistem önce masa eklemenizi ister.",
        },
        { type: "h3", text: "Rezervasyonları yönetme" },
        {
          type: "list",
          items: [
            "Karar bekleyen yeni rezervasyonlar “Onay bekliyor” bloğunda toplanır.",
            "Her rezervasyon için “Onayla” / “Reddet” düğmeleri.",
            "“Tamamla” — müşterinin geldiğini ve rezervasyonun yerine getirildiğini işaretler.",
            "“Ay” ve “Gün” arasında geçiş yapın, dönemde “Geri” / “İleri” ile gezinin.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Cihazlar (tabletler)",
      blocks: [
        {
          type: "p",
          text: "Mutfak, garson ve rezervasyon terminalleri, hesabınıza bir kodla bağlanan ayrı tabletlerdir. Bölüm: Ayarlar → Cihazlar.",
        },
        {
          type: "note",
          text: "Cihazlar ücretli bir planda veya aktif bir deneme süresinde kullanılabilir.",
        },
        { type: "h3", text: "Tablet bağlama (eşleştirme)" },
        {
          type: "steps",
          items: [
            "Panelde: Ayarlar → Cihazlar → “Cihaz ekle”.",
            "Bir ad (örneğin “Mutfak — sıcak hat”) ve bir tür girin: Mutfak, Garson veya Rezervasyonlar.",
            "“Kod oluştur”a basın — 6 haneli bir kod görünür (2 dakika geçerli).",
            "Tablette bağlantı ekranını açın ve bu kodu girin.",
            "Tablet bağlanır ve seçilen rolde hemen çalışmaya başlar.",
          ],
        },
        { type: "tip", text: "Kodun süresi dolduysa — “Yeni kod”a basın ve yenisini girin." },
        { type: "h3", text: "Cihazları yönetme" },
        {
          type: "list",
          items: [
            "Durumlar: Çevrimiçi / Çevrimdışı / Bağlantı bekliyor / İptal edildi.",
            "“İptal et” — tableti bağlantıdan çıkarır (örneğin kaybolursa). Yeniden girmek için yeni bir kod gerekir.",
            "“Sil” — cihazı listeden kalıcı olarak kaldırır.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analizler",
      blocks: [
        {
          type: "p",
          text: "“Analizler” bölümü, işletmenin temel rakamlarını gösterir: ciro, sipariş sayısı ve bunların dağılımı (örneğin ödeme yöntemine ve saate göre). Neyin ne zaman daha iyi sattığını anlamak için kullanın.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Ayarlar",
      blocks: [
        {
          type: "p",
          text: "“Ayarlar” bölümü bir dizi bölüm kartı olarak açılır. Üstte aktif restoran değiştiricisi bulunur (birden fazla varsa). Altında — her kart sırayla.",
        },
        { type: "h3", text: "Site" },
        {
          type: "list",
          items: [
            "Herkese açık menü URL'si — menünüzün benzersiz adresi (kendi kısa slug'ınızı belirleyip bağlantıyı kopyalayabilirsiniz).",
            "İşletmenin herkese açık sitedeki adı (başlık).",
            "Vurgu rengi — menüdeki düğmelerin ve vurguların ana rengi.",
            "Arka plan — ana sayfada bir görsel veya video; kendinizinkini yükleyin veya bir açıklamadan yapay zekâ ile arka plan oluşturun.",
            "Menü düzeni — yemeklerin müşteriye nasıl gösterileceği.",
          ],
        },
        { type: "h3", text: "İletişim ve adres" },
        {
          type: "p",
          text: "Telefon, Instagram, WhatsApp ve haritada bir işaret — tümü menünüzün iletişim sayfasında müşteriye gösterilir.",
        },
        { type: "h3", text: "Bölge" },
        { type: "p", text: "Para birimi (tüm fiyatlar için kullanılır) ve işletmenin saat dilimi." },
        { type: "h3", text: "Masalar" },
        { type: "p", text: "Salon planı, koltuklar ve masa QR kodları — ayrıntılı olarak 3. bölümde." },
        { type: "h3", text: "Cihazlar" },
        {
          type: "p",
          text: "Mutfak ekranı ve garson terminalleri için tabletleri bağlama — ayrıntılı olarak 7. bölümde.",
        },
        { type: "h3", text: "Siparişler" },
        {
          type: "list",
          items: [
            "“Siparişleri kabul et” — sipariş almanın ana anahtarı.",
            "“Sipariş modu” — Dahili ve/veya WhatsApp.",
            "“Zorunlu alanlar” — müşterinin vermesi gereken bilgiler (Ad, Telefon, Adres).",
            "“Ödeme yöntemleri” — restoranınızın ödeme sağlayıcısını entegre etmek için destekle iletişime geçin.",
          ],
        },
        { type: "h3", text: "Rezervasyonlar" },
        {
          type: "p",
          text: "Rezervasyonları etkinleştirme, otomatik veya manuel onay, süre ve çalışma saatleri — ayrıntılı olarak 6. bölümde.",
        },
        { type: "h3", text: "Diller" },
        {
          type: "steps",
          items: [
            "Ayarlar → Diller'i açın.",
            "Herkese açık menünün çevrileceği dilleri seçin (eklemek/çıkarmak için dokunun).",
            "Varsayılan dili belirleyin.",
            "Metinler elle veya “Yapay zekâ ile çevir” düğmesiyle çevrilir — sistem yemeklerin adlarını ve açıklamalarını seçilen dillere çevirir.",
          ],
        },
        { type: "h3", text: "Ödeme" },
        { type: "p", text: "Abonelik planı, deneme süresi durumu ve ödeme yönetimi." },
        {
          type: "list",
          items: [
            "Aylık veya yıllık faturalandırma (yıllık daha ucuz).",
            "“Abone ol” / “Değiştir” — plan seçin veya değiştirin.",
            "“Yönet” — ödeme yöntemini değiştirin veya aboneliği iptal edin.",
          ],
        },
        {
          type: "note",
          text: "Ödeme EUR cinsindendir. Başka bir para biriminde ödemek için destekle iletişime geçin.",
        },
        { type: "h3", text: "Destek" },
        {
          type: "p",
          text: "Ekibimizle gerçek zamanlı entegre sohbet. Bir mesaj yazın — tam burada yanıtlarız.",
        },
        { type: "h3", text: "Restoran değiştirme ve ekleme" },
        {
          type: "p",
          text: "Birden fazla işletmeniz varsa, restoran değiştirici “Ayarlar” bölümünün üstündedir.",
        },
        {
          type: "steps",
          items: [
            "“Ayarlar”ın üstündeki restoran değiştiriciyi açın.",
            "“Restoran ekle” → bir ad girin.",
            "“Mevcut menü ve ayarları çoğalt” (hızlı başlangıç) veya “Sıfırdan başla” (boş bir restoran) seçin.",
            "Oluşturun — ve tam burada istediğiniz zaman restoranlar arasında geçiş yapın.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. Müşteriler için herkese açık menü",
      blocks: [
        {
          type: "p",
          text: "Herkese açık menü, müşterinin QR'ı taradıktan sonra gördüğü şeydir. Menünüzden, markanızdan ve iletişim bilgilerinizden otomatik olarak oluşturulur.",
        },
        {
          type: "list",
          items: [
            "Menü adresi Ayarlar → Bölge'de (“Menü bağlantısı”) belirlenir.",
            "Genel QR kodunu ve menü bağlantısını “Menü” sayfasındaki “Paylaş” düğmesiyle alırsınız.",
            "Her masanın kendi ayrı QR'ı vardır (Ayarlar → Masalar) ve tam o masanın menüsüne götürür.",
            "Görünüm (arka plan, vurgu rengi, düzen) “Site” bölümünde yapılandırılır.",
            "“Önizleme” düğmesi menüyü müşterinin gördüğü gibi açar.",
          ],
        },
        {
          type: "tip",
          text: "Menüde/ayarlarda herhangi bir değişiklikten sonra müşteriye nasıl göründüğünü kontrol etmek için “Önizleme”ye basın.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Sık sorulan sorular ve ayrıntılar",
      blocks: [
        { type: "h3", text: "Müşteri sipariş veremiyor" },
        {
          type: "p",
          text: "Ayarlar → Siparişler → “Siparişleri kabul et” (açık olmalı) ve en az bir sipariş modunun seçili olduğunu kontrol edin.",
        },
        { type: "h3", text: "Rezervasyon gelmiyor" },
        {
          type: "p",
          text: "Ayarlar → Rezervasyonlar'da rezervasyonların açık olduğundan, masaların eklendiğinden ve günün programda “Kapalı” işaretli olmadığından emin olun.",
        },
        { type: "h3", text: "Tablet bağlanmıyor" },
        {
          type: "p",
          text: "Kod 2 dakika geçerlidir. Süresi dolduysa — Ayarlar → Cihazlar'dan yeni bir tane oluşturun. Cihaz iptal edildiyse — yeni bir kod oluşturun.",
        },
        { type: "h3", text: "Bir yemek bitti" },
        {
          type: "p",
          text: "Silmeyin — “Yemeği gizle”ye basın. Herkese açık menüden kaybolur ve “Yemeği göster” ile geri getirirsiniz.",
        },
        { type: "h3", text: "Cihaz/terminal gerekiyor ama yok" },
        {
          type: "p",
          text: "“Cihazlar” bölümü ücretli bir planda veya aktif bir deneme süresinde kullanılabilir. Ayarlar → Ödeme'yi kontrol edin.",
        },
        { type: "h3", text: "Hâlâ sorunuz var" },
        {
          type: "p",
          text: "Bize Ayarlar → Destek'ten yazın — ekibimizle entegre bir sohbettir.",
        },
      ],
    },
  ],
};
