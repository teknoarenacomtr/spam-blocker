Harika bir fikir! Landing page'i sadece bir vitrin olmaktan çıkarıp, kullanıcıların da katkıda bulunabileceği interaktif bir **"Topluluk Güvenlik Merkezi"ne** dönüştürelim. Tasarımı da `framer-motion` kütüphanesi kullanarak modern animasyonlar, glassmorphism (buzlu cam) efektleri ve canlı renk geçişleri ile "coşturacağız".

İşte yapacaklarımız:

### 1. Supabase Altyapısı (Yeni Tablo)
Kullanıcıların gönderdiği numaraları ana veritabanına (`spam_rules`) direkt karıştırmamak için **`user_reports`** adında yeni bir tablo kullanacağız.
*   **Yapı:** `telefon_numarasi`, `kategori` (Örn: Bahis, Dolandırıcılık, Taciz), `tarih`.
*   *Not:* Bu tabloyu Supabase panelinden oluşturmanız gerekecek (Size gerekli SQL kodunu vereceğim).

### 2. Modern UI & Animasyonlar (`framer-motion`)
Tasarımı baştan aşağı yenileyeceğiz:
*   **Hero Bölümü:** Kayan yazılar, gradient arka planlar ve dikkat çekici bir başlık.
*   **Şikayet Formu:** Sıkıcı inputlar yerine, büyük ve şık bir numara giriş alanı.
*   **Kategori Seçimi:** Yorum yazmak yerine, kullanıcıların tek tıkla seçebileceği renkli **"Suç Etiketleri"** (Chips UI).
    *   *Örn:* 🎰 Bahis/Kumar, 💰 Dolandırıcılık, 📞 Sahte Arama, 💳 Taahhüt/Satış.
*   **Canlı Akış (Opsiyonel):** "Son 5 Rapor" gibi anonim bir liste göstererek sitenin canlı olduğunu hissettireceğiz.

### 3. Teknik Kurulum
*   Animasyonlar için `framer-motion` paketini projeye dahil edeceğim.
*   `App.tsx` dosyasını güncelleyerek yeni tasarımı entegre edeceğim.

Onaylarsanız hemen gerekli paketi kurup kodlamaya başlıyorum! 🚀