import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'sync_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static const platform = MethodChannel('com.example.spamblocker/native');
  String _status = 'Hazır';

  @override
  void initState() {
    super.initState();
    _checkPermissions();
  }

  Future<void> _checkPermissions() async {
    // Native taraftan izin durumunu sor
    // (Gerçek uygulamada permission_handler paketi kullanılmalı)
    try {
      final bool hasPermissions = await platform.invokeMethod('checkPermissions');
      if (!hasPermissions) {
        setState(() => _status = 'İzinler eksik, lütfen verin.');
        // Kullanıcıyı izin ekranına yönlendir
        await platform.invokeMethod('requestDefaultApp');
      }
    } catch (e) {
      print(e);
    }
  }

  Future<void> _manualSync() async {
    setState(() => _status = 'Güncelleniyor...');
    await SyncService.syncRules();
    setState(() => _status = 'Kurallar güncellendi!');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Spam Blocker')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_status),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _manualSync,
              child: const Text('Kuralları Şimdi Güncelle'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Varsayılan SMS/Arama uygulaması yapma isteği
                platform.invokeMethod('requestDefaultApp');
              },
              child: const Text('Varsayılan Uygulama Yap'),
            ),
          ],
        ),
      ),
    );
  }
}
