Bu proje için uçtan uca güvenli, ölçeklenebilir ve Google Play politikalarına uygun bir spam filtreleme sistemi tasarlayacağım. Planım şu adımları içermektedir:

## 1. Sistem Mimarisi ve Veri Akışı Tasarımı
- **Mimari:** Backend (NestJS) -> Mobile Sync (Flutter + Hive) -> Native Enforcement (Kotlin BroadcastReceiver & CallScreeningService).
- **Gizlilik:** Kullanıcı verilerinin dışarı çıkmadığı, tek yönlü (Server -> Client) veri akış şeması.

## 2. Backend & Admin Panel Tasarımı
- **API:** Spam kuralları için salt okunur (read-only) JSON endpoint yapısı.
- **Admin Panel:** Numara/Keyword yönetimi ve versiyonlama mantığı.

## 3. Flutter (Client) Uygulama Mimarisi
- **Veri Katmanı:** Hive ile offline-first kural saklama.
- **Sync Mekanizması:** Periyodik güncelleme ve MethodChannel köprüsü.

## 4. Android Native Entegrasyonu (Kotlin)
- **SMS Filtreleme:** `BroadcastReceiver` ile gelen SMS'i yakalama ve yerel veritabanına göre sessizce engelleme.
- **Arama Engelleme:** `CallScreeningService` API'si ile gelen aramaları reject etme.
- **İzin Yönetimi:** `AndroidManifest.xml` ve Runtime Permission yönetimi.

## 5. Güvenlik ve Mağaza Politikaları
- **Hassas İzinler:** `READ_SMS`, `RECEIVE_SMS`, `CALL_PHONE` gibi izinlerin Google Play Console'da nasıl savunulacağı.
- **Hashleme:** Telefon numaralarının SHA-256 ile saklanması stratejisi.

Bu planı onaylarsanız, detaylı teknik dokümantasyonu, kod örneklerini ve yapılandırma dosyalarını hazırlayacağım.