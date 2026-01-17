Kullanıcıların kendi yasaklı kelimelerini belirleyebileceği ve bu özelliğin limitli olduğu bir **Abonelik Sistemi** kuracağım.

Planım şu şekilde:

1.  **SyncService Güncellemesi (Kritik):**
    *   Mevcut sistem sadece sunucudan geleni yazıyordu.
    *   Yeni sistemde: `Sunucudan Gelenler` + `Kullanıcının Ekledikleri` birleştirilip `spam_rules.json` dosyasına yazılacak. Böylece Native taraf (Kotlin) hiçbir değişiklik yapmadan hem admin hem kullanıcı kurallarını uygulayabilecek.

2.  **Abonelik Ekranı (Paywall):**
    *   Şık bir "Premium'a Geç" ekranı tasarlayacağım.
    *   **Paketler:**
        *   Aylık: 49.99 ₺
        *   Yıllık: 400 ₺
        *   Ömür Boyu: 1000 ₺
    *   Satın alma işlemi simülasyonu (tıklayınca "Satın Alındı" diyecek ve Premium özelliği açılacak).

3.  **Dashboard Güncellemesi:**
    *   "Kendi Yasaklı Kelimelerim" bölümü eklenecek.
    *   Kullanıcı buradan kelime ekleyebilecek.
    *   **Mantık:** Eğer kullanıcı Premium değilse ve 3 kelime eklediyse, 4. kelimeyi eklemek istediğinde Abonelik Ekranına yönlendirilecek.

Bu geliştirmeyi yapıp uygulamayı tekrar çalıştıracağım. Onaylıyor musun?