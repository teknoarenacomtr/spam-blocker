SpamTakip.com benzeri profesyonel bir yapıya geçmek için **"Sorgula & Katkıda Bulun"** modeline geçiyoruz. Sadece tek taraflı bir "form doldur gönder" yapısı yerine, kullanıcıların numaraları sorgulayabildiği, varsa geçmiş yorumları görebildiği ve misafir olarak yorum yapabildiği interaktif bir platform kuracağız.

### 1. Veritabanı Güncellemesi (Yorum Desteği)
Mevcut `user_reports` tablosuna **Yorum** ve **İsim** özellikleri ekleyeceğiz.
*   `comment`: Kullanıcının yazdığı detaylı açıklama.
*   `reporter_name`: "Misafir Kullanıcı" veya isteğe bağlı girilen isim.

### 2. Ana Sayfa: "Numara Sorgulama Merkezi"
Hero bölümünü **Google benzeri bir Arama Motoruna** dönüştüreceğim.
*   **Sorgulama:** Kullanıcı numarayı yazıp arattığında:
    *   **Durum:** Numara veritabanında "Spam" olarak kayıtlı mı? (Güvenli 🟢 / Şüpheli 🟡 / Tehlikeli 🔴)
    *   **Geçmiş:** Bu numara hakkında başkaları ne demiş? (Yorumlar listesi)
*   **Katkıda Bulun:** Eğer kayıt yoksa veya kullanıcı ekleme yapmak isterse, **"Yorum Yap & Şikayet Et"** butonu ile (Giriş yapmadan/Misafir olarak) sisteme katkı sağlayabilecek.
*   **Son Akış:** Sayfanın altına "Son Eklenen Şikayetler" akışı ekleyerek sitenin canlılığını göstereceğiz.

### 3. Admin Paneli: "Şikayet Onay Merkezi"
Admin paneline **"Gelen Kutusu"** benzeri yeni bir alan ekleyeceğim.
*   Kullanıcıların (Misafirlerin) gönderdiği yorumlar ve şikayetler buraya düşecek.
*   **Tek Tuşla İşlem:**
    *   ✅ **Onayla:** Numarayı kalıcı olarak kara listeye (`spam_rules`) ekler.
    *   🗑️ **Sil:** Gereksiz veya hatalı bildirimi siler.

Bu yapı ile siteniz tam anlamıyla bir **Spam İstihbarat Platformuna** dönüşecek.

Onaylıyorsanız veritabanını güncelleyip arayüzü bu yeni yapıya göre baştan tasarlıyorum! 🛠️