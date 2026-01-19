**1. Veritabanı Altyapısı (Oylama İçin)**
*   `user_reports` tablosuna `votes_up` (integer, default 0) ve `votes_down` (integer, default 0) sütunlarını ekleyen SQL kodunu hazırlayıp çalıştıracağım.
*   Supabase üzerinden oylama artırma (increment) fonksiyonunu hazırlayacağım (veya doğrudan update ile yöneteceğim).

**2. Tasarım Mimarisi (Vercel / Flash UI Stili)**
*   **Renk Paleti:** Beyaz zemin, `Inter` fontu, `#DC2626` (Red-600) ana aksan rengi.
*   **Layout:** Arkaplana `bg-grid-black/[0.02]` gibi ince bir ızgara deseni ekleyerek o teknik havayı vereceğim.
*   **Bileşenler:**
    *   **Kartlar:** Gölgesiz, ince gri kenarlıklı (`border border-gray-200`), üzerine gelince hafif "lift" (yükselme) efekti.
    *   **Inputlar:** Odaklanınca etrafında kırmızı bir "ring" (halka) oluşan geniş, ferah alanlar.

**3. Sayfa Revizyonları**
*   **Ana Sayfa:** Hero bölümünü sadeleştireceğim. Arama çubuğunu merkeze, dikkat çekici hale getireceğim.
*   **Hakkımızda:** Marka ismini kaldırıp "Platform Hakkında" genel başlığını kullanacağım.
*   **Rapor Formu:** Önceki detaylı formu, yeni minimal tasarıma uyarlayacağım.

**4. Etkileşim (Oylama)**
*   "Faydalı" ve "Katılmıyorum" butonlarına `onClick` fonksiyonu yazarak veritabanındaki sayıları güncelleyeceğim ve kullanıcıya anlık geri bildirim (renk değişimi) vereceğim.