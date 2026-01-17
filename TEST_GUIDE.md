# Spam Filtreleme Sistemi Test Rehberi

## 1. Backend'i Başlatma
Terminale gidin ve aşağıdaki komutları çalıştırın:
```bash
cd backend
npm install
npm run start
```
API şu adreste çalışacak: `http://localhost:3000`
Swagger Dokümantasyonu: `http://localhost:3000/api`

## 2. Mobil Uygulamayı Çalıştırma (Android)
Emulator açıkken yeni bir terminalde:
```bash
cd mobile
flutter pub get
flutter run
```

## 3. Test Adımları (ADB Kullanarak)

### Adım 1: Uygulamayı Varsayılan Yapma
Uygulama açıldığında "Varsayılan Uygulama Yap" butonuna basın ve izin verin.

### Adım 2: Logları İzleme
Native taraftan gelen logları görmek için terminalde şu komutu çalıştırın:
```bash
adb logcat -s SpamBlocker
```

### Adım 3: Sahte SMS Gönderme
Başka bir terminal penceresinden aşağıdaki komutla emulator'e SMS gönderin.

**Senaryo A: Normal SMS (Inbox'a düşmeli)**
```bash
adb shell service call phone 1 s16 "com.android.mms" s16 "+905551234567" s16 "Merhaba, nasılsın?" i32 0 i32 0
```
*Beklenen:* Logcat'te "Clean message. Saving to Inbox." görmelisiniz.

**Senaryo B: Spam SMS (Engellenmeli)**
Backend'de tanımlı spam numara: `+905550000000` (veya `spam-controller.ts` içinde ne varsa).
```bash
adb shell service call phone 1 s16 "com.android.mms" s16 "+905550000000" s16 "Bu bir spam mesajıdır." i32 0 i32 0
```
*Beklenen:* Logcat'te "SPAM DETECTED! Dropping message." görmelisiniz.

**Senaryo C: Keyword Bazlı Spam**
Keyword: `bonus`
```bash
adb shell service call phone 1 s16 "com.android.mms" s16 "+905559998877" s16 "Tebrikler 500TL bonus kazandınız!" i32 0 i32 0
```
*Beklenen:* Logcat'te "SPAM DETECTED!" görmelisiniz.

### Adım 4: Arama Engelleme Testi
Emulator konsolundan (Extended Controls -> Phone) `+905550000000` numarasından arama yapın.
*Beklenen:* Arama anında reddedilmeli ve çağrı ekranı hiç görünmemeli veya anlık görünüp kapanmalı.

## Notlar
- `rules.json` dosyasının oluşması için uygulamada "Kuralları Şimdi Güncelle" butonuna basmayı unutmayın.
- Emulator'de internet erişimi olduğundan emin olun (Backend'e bağlanmak için).
- Localhost sorunu: Android Emulator için `localhost` yerine `10.0.2.2` kullanmanız gerekebilir. `sync_service.dart` dosyasında URL'i `http://10.0.2.2:3000/api/v1/rules/sync` olarak güncellemeniz gerekebilir.
