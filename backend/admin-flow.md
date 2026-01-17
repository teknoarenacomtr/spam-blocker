# Web Admin Panel Akışı (React / Next.js)

Bu panel, operasyon ekibinin spam veritabanını yönetmesini sağlar.

## Ekranlar ve Fonksiyonlar

### 1. Dashboard (Ana Ekran)
- **Özet Kartlar:** Toplam Spam Numara, Toplam Keyword, Son Güncelleme Zamanı.
- **Canlı Durum:** Sistem sağlıklı mı? API yanıt süreleri.

### 2. Numara Yönetimi (Blacklist Manager)
- **Tablo Görünümü:** Eklenen numaralar, kategori (Kumar, Dolandırıcılık), ekleyen admin, tarih.
- **Aksiyonlar:**
  - **Yeni Ekle:** Modal açılır. Numara (+90...) ve kategori seçilir.
  - **Toplu Yükle (Bulk Import):** CSV/Excel'den binlerce numara yükleme.
  - **Sil/Pasife Al:** Hatalı eklenen numarayı listeden çıkarma.

### 3. Keyword Yönetimi
- **Tablo Görünümü:** Yasaklı kelimeler (Regex destekli olabilir).
- **Test Alanı:** Admin, bir metin girip "Bu keyword kurallarına takılıyor mu?" diye test edebilir.

### 4. Yayınlama (Deployment)
- Değişiklikler anında canlıya alınmaz (Staging mantığı).
- Admin "Değişiklikleri Yayınla" butonuna bastığında:
  1. Backend versiyon numarasını artırır (v1.0.4 -> v1.0.5).
  2. Firebase FCM ile topic: `spam_rules_update` olan tüm cihazlara "Silent Push" atılır.
  3. Cihazlar arka planda uyanıp yeni listeyi çeker.

## Teknoloji Yığını Önerisi
- **Frontend:** Next.js (App Router), Tailwind CSS, Shadcn/UI (Hızlı UI için).
- **State Management:** TanStack Query (Server state yönetimi için ideal).
- **Auth:** NextAuth.js (Google/Email login).
