# Google Play Store Politikaları ve Güvenlik Rehberi

## 1. Hassas İzinler (Sensitive Permissions)
Bu uygulama `READ_SMS`, `RECEIVE_SMS` ve `CALL_LOG` izinlerini kullanır. Google Play Console'da **Permissions Declaration Form** doldurulmalıdır.

### Form Yanıt Stratejisi
- **Core Functionality (Temel İşlev):** Uygulamanın temel amacı "Spam ve İstenmeyen Çağrı Engelleme"dir.
- **Exception Class:** "SMS/Call Blocker" veya "Caller ID" kategorisi seçilmelidir.
- **Kanıt Video:** Uygulamanın bir spam mesajı nasıl engellediğini gösteren kısa bir video çekip yüklenmelidir.

## 2. Kullanıcı Gizliliği (Privacy)
- **Veri Toplama:** Uygulama, kullanıcının SMS veya Arama kayıtlarını sunucuya **GÖNDERMEZ**.
- **Privacy Policy URL:** Web sitenizde açık bir gizlilik politikası olmalı ve şunları belirtmelidir:
  > "Bu uygulama, SMS ve Arama verilerini yalnızca cihaz üzerinde spam tespiti amacıyla işler. Bu veriler hiçbir şekilde dış sunuculara aktarılmaz veya 3. şahıslarla paylaşılmaz."

## 3. Güvenlik Önlemleri
- **Veri Minimizasyonu:** Backend sadece kural setlerini gönderir. Kullanıcıdan veri almaz.
- **Hashing:** Eğer veritabanında spam numaralar saklanıyorsa, bunlar SHA-256 ile hashlenerek saklanabilir. Mobil uygulama, gelen numarayı hashleyip listede hash kontrolü yapabilir.
  - *Not:* Regex/Keyword filtreleme için hashleme kullanılamaz, plaintext gerekir.
- **HTTPS:** Tüm API iletişimi SSL/TLS üzerinden yapılmalıdır.

## 4. Edge-Case Senaryoları
- **İnternet Yok:** Uygulama en son indirilen kurallarla çalışmaya devam eder (Offline-First).
- **Yanlış Pozitif (False Positive):** Normal bir mesaj spam olarak işaretlenirse, kullanıcı bunu "Spam Klasörü"nde görüp "Spam Değil" olarak işaretleyebilmelidir.
- **Dual SIM:** `SmsReceiver` çoklu SIM kartları destekleyecek şekilde `SubscriptionId` kontrolü yapmalıdır.
