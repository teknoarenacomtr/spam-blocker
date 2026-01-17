## 1. Backend Güncellemesi (Canlı Veri Tutma)
- **Hafıza Yönetimi:** `SpamRulesController` içinde statik bir değişken (`inMemoryDb`) tanımlayarak eklenen kuralların sunucu kapanana kadar hafızada tutulmasını sağlayacağım.
- **CORS:** `main.ts` içinde `app.enableCors()` ekleyerek React uygulamasının (farklı porttan) backend'e erişmesine izin vereceğim.

## 2. Web Admin Paneli (React + Vite)
- `backend` klasörü yanına `admin-panel` klasörü oluşturacağım.
- **Teknoloji:** Vite (hızlı kurulum için), React, TailwindCSS (hızlı stil için) ve Axios.
- **Sayfalar:**
    - **Dashboard:** Mevcut kuralların listesi (Tablo).
    - **Ekleme Formu:** Numara veya Keyword girip "Ekle" butonu.
    - **API Entegrasyonu:** `GET /rules/sync` ve `POST /rules` endpointlerini bağlayacağım.

## 3. Entegrasyon Testi
- Backend'i yeniden başlatacağım.
- Admin panelini başlatacağım (`npm run dev`).
- Admin panelinden bir numara ekleyip, mobil uygulamadan "Güncelle" diyerek geldiğini teyit edeceğim.

Bu planla "Yönet -> Dağıt -> Engelle" döngüsünü tamamlamış olacağız. Başlıyorum.