import 'package:workmanager/workmanager.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'sync_service.dart';

const simpleTaskKey = "simpleTask";
const periodicTaskKey = "periodicTask";

@pragma('vm:entry-point') 
void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    print("Workmanager görevi çalıştı: $task");
    
    try {
      // Kuralları güncelle
      await SyncService.syncRules();
      
      // Son güncelleme zamanını kaydet (UI göstermek isterse diye)
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('last_bg_sync', DateTime.now().toIso8601String());
      
      return Future.value(true);
    } catch (e) {
      print("Workmanager hatası: $e");
      return Future.value(false);
    }
  });
}

class BackgroundService {
  static Future<void> initialize() async {
    await Workmanager().initialize(
      callbackDispatcher, 
      isInDebugMode: true // Test ederken logları görmek için true
    );
    
    // Periyodik görev (15 dakikada bir)
    await Workmanager().registerPeriodicTask(
      periodicTaskKey, 
      "syncRulesPeriodic",
      frequency: const Duration(minutes: 15),
      constraints: Constraints(
        networkType: NetworkType.connected, // İnternet varken çalış
      ),
      initialDelay: const Duration(seconds: 10), // İlk çalışma gecikmesi
    );
  }
}
