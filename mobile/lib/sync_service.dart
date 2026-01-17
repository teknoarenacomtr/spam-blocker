import 'dart:convert';
import 'dart:io';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SyncService {
  static const String RULES_FILENAME = 'spam_rules.json';
  static const String USER_KEYWORDS_KEY = 'user_custom_keywords';

  /// Hem sunucu kurallarını hem de kullanıcının yerel kurallarını birleştirip kaydeder.
  static Future<void> syncRules() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final bool isPremium = prefs.getBool('is_premium') ?? false;

      Map<String, dynamic> finalRules = {'phones': [], 'keywords': []};

      // 1. Supabase'den veriyi çek (SADECE PREMIUM KULLANICILAR İÇİN)
      if (isPremium) {
        try {
          final supabase = Supabase.instance.client;

          // Aktif kuralları çek
          final response = await supabase
              .from('spam_rules')
              .select('type, value')
              .eq('is_active', true);

          final List<dynamic> data = response as List<dynamic>;

          for (var item in data) {
            if (item['type'] == 'PHONE') {
              finalRules['phones'].add(item['value']);
            } else if (item['type'] == 'KEYWORD') {
              finalRules['keywords'].add(item['value']);
            }
          }

          print(
            'Premium kullanıcı: Supabase\'den ${data.length} kural çekildi.',
          );
        } catch (e) {
          print('Supabase Hatası (Offline modda devam ediliyor): $e');
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
