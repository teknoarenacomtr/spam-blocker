Harika bir strateji! Uygulamayı tam bir "Freemium" modeline dönüştürüyoruz.

Planım şu şekilde:

1.  **Debug Modu (Geliştirici Özelliği):**
    *   Ayarlar menüsüne gizli bir "Premium'u Sıfırla" butonu ekleyeceğim. Böylece test ederken tekrar tekrar satın alma senaryosunu deneyebileceksin.

2.  **Yeni Free Plan Kısıtlamaları:**
    *   **Admin Verisi (Veritabanı):** Free kullanıcılar için Admin panelinden gelen "Hazır Yasaklı Kelimeler" ve "Engelli Numaralar" **KAPALI** olacak. Yani uygulama bomboş gelecek.
    *   **Özel Kelime Hakkı:** Kullanıcı sadece kendi elle 3 tane kelime ekleyebilecek. (Mevcut mantık korunuyor).
    *   **Arama Engelleme:** Free planda arama engelleme tamamen devre dışı olacak. "Arama Koruması" kartının üzerine "Premium Özellik" etiketi ve kilit ikonu koyacağım. Tıklayınca abonelik ekranına atacak.

3.  **Premium Avantajları:**
    *   Admin panelinden gelen binlerce spam numarası ve kelimesi anında aktif olacak.
    *   Sınırsız kelime ekleme hakkı.
    *   Arama engelleme özelliği açılacak.

Bu değişiklikleri `SyncService` ve `DashboardScreen` üzerinde uygulayacağım. Onaylıyor musun?