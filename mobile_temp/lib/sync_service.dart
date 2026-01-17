import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

class SyncService {
  static const String API_URL = 'https://api.your-backend.com/api/v1/rules/sync';
  static const String RULES_FILENAME = 'spam_rules.json';

  /// Kuralları sunucudan çeker ve yerel dosyaya yazar.
  /// Bu dosya Native Kotlin tarafı tarafından da okunacaktır.
  static Future<void> syncRules() async {
    try {
      // 1. Sunucudan veriyi çek
      final response = await http.get(Uri.parse(API_URL));
      
      if (response.statusCode == 200) {
        final data = response.body; // JSON String
        
        // 2. Dosya yolunu bul
        // Not: getApplicationSupportDirectory() Android'de files dizinini verir.
        // Native taraf: context.filesDir + "/spam_rules.json"
        final directory = await getApplicationSupportDirectory();
        final file = File('${directory.path}/$RULES_FILENAME');
        
        // 3. Dosyaya yaz
        await file.writeAsString(data);
        print('Kurallar başarıyla güncellendi: ${file.path}');
        
        // 4. (Opsiyonel) Native tarafa "güncelleme bitti" haberi ver
        // MethodChannel ile...
      } else {
        print('Sunucu hatası: ${response.statusCode}');
      }
    } catch (e) {
      print('Sync hatası: $e');
    }
  }
}
