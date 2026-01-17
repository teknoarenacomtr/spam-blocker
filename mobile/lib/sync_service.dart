import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SyncService {
  // --- CANLI SUNUCU AYARI ---
  // Render.com deploy sonrası burayı güncelleyeceğiz.
  // Örn: https://spam-blocker-backend.onrender.com/api/v1/rules/sync
  // Şimdilik test için localhost kalabilir veya .env ile yönetilebilir.
  // Ancak build alırken burayı değiştirmeyi UNUTMA!
  static const String API_URL =
      'https://spam-blocker-backend.onrender.com/api/v1/rules/sync';

  static const String RULES_FILENAME = 'spam_rules.json';
  static const String USER_KEYWORDS_KEY = 'user_custom_keywords';

  /// Hem sunucu kurallarını hem de kullanıcının yerel kurallarını birleştirip kaydeder.
  static Future<void> syncRules() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final bool isPremium = prefs.getBool('is_premium') ?? false;

      Map<String, dynamic> finalRules = {'phones': [], 'keywords': []};

      // 1. Sunucudan veriyi çek (SADECE PREMIUM KULLANICILAR İÇİN)
      if (isPremium) {
        try {
          final response = await http.get(Uri.parse(API_URL));
          if (response.statusCode == 200) {
            final apiData = jsonDecode(response.body);
            finalRules['phones'].addAll(
              List<String>.from(apiData['phones'] ?? []),
            );
            finalRules['keywords'].addAll(
              List<String>.from(apiData['keywords'] ?? []),
            );
            print('Premium kullanıcı: Admin kuralları eklendi.');
          } else {
            print('API Hatası: ${response.statusCode}');
          }
        } catch (e) {
          print('API Hatası (Offline modda devam ediliyor): $e');
        }
      } else {
        print('Free kullanıcı: Admin kuralları dahil edilmedi.');
      }

      // 2. Yerel Kullanıcı Kurallarını Ekle (HERKES İÇİN)
      final userKeywords = prefs.getStringList(USER_KEYWORDS_KEY) ?? [];

      // Admin keywordleri ile kullanıcı keywordlerini birleştir
      // (Set kullanarak duplicate'leri önle)
      final Set<String> allKeywords = Set<String>.from(finalRules['keywords']);
      allKeywords.addAll(userKeywords);

      finalRules['keywords'] = allKeywords.toList();

      // 3. Birleştirilmiş veriyi dosyaya yaz
      final directory = await getApplicationSupportDirectory();
      final file = File('${directory.path}/$RULES_FILENAME');

      await file.writeAsString(jsonEncode(finalRules));
      print(
        'Kurallar birleştirildi ve kaydedildi: ${finalRules['keywords'].length} kelime, ${finalRules['phones'].length} numara',
      );
    } catch (e) {
      print('SyncService Genel Hata: $e');
    }
  }

  // Kullanıcı yeni kelime eklediğinde çağrılır
  static Future<void> addUserKeyword(String keyword) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> current = prefs.getStringList(USER_KEYWORDS_KEY) ?? [];

    if (!current.contains(keyword)) {
      current.add(keyword);
      await prefs.setStringList(USER_KEYWORDS_KEY, current);
      // Dosyayı güncelle
      await syncRules();
    }
  }

  // Kullanıcı kelime sildiğinde çağrılır
  static Future<void> removeUserKeyword(String keyword) async {
    final prefs = await SharedPreferences.getInstance();
    final List<String> current = prefs.getStringList(USER_KEYWORDS_KEY) ?? [];

    current.remove(keyword);
    await prefs.setStringList(USER_KEYWORDS_KEY, current);
    // Dosyayı güncelle
    await syncRules();
  }

  static Future<List<String>> getUserKeywords() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getStringList(USER_KEYWORDS_KEY) ?? [];
  }
}
