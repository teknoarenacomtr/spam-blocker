import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import 'dart:io';
import 'dart:async';
import 'package:path_provider/path_provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:permission_handler/permission_handler.dart';
import 'sync_service.dart';
import 'background_service.dart';
import 'subscription_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await BackgroundService.initialize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0F172A),
          primary: const Color(0xFF0F172A),
          secondary: const Color(0xFFDC2626),
        ),
        textTheme: GoogleFonts.interTextTheme(),
      ),
      home: const DashboardScreen(),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen>
    with WidgetsBindingObserver {
  static const platform = MethodChannel('com.example.spamblocker/native');

  String _status = 'Kontrol ediliyor...';
  bool _isProtected = false;
  bool _isPremium = false;
  List<dynamic> _blockedList = [];
  Map<String, int> _stats = {'phones': 0, 'keywords': 0};
  DateTime? _lastSync;
  bool _isLoading = false;
  List<String> _userKeywords = [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initApp();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      _autoSync();
      _loadBlockedHistory();
    }
  }

  Future<void> _initApp() async {
    await _checkPermissions();
    await _checkPremiumStatus();
    await _loadUserKeywords();
    await _loadStats();
    await _loadBlockedHistory();
    await _autoSync();
  }

  Future<void> _checkPremiumStatus() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _isPremium = prefs.getBool('is_premium') ?? false;
    });
  }

  // DEBUG AMAÇLI: Premium Durumunu Sıfırla
  Future<void> _resetPremiumStatus() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('is_premium', false);
    await _checkPremiumStatus();
    await _autoSync(); // Kuralları yeniden yükle (Admin verisi silinsin)

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('DEBUG: Premium sıfırlandı. Free moda geçildi.'),
          backgroundColor: Colors.orange,
        ),
      );
    }
  }

  Future<void> _loadUserKeywords() async {
    final keywords = await SyncService.getUserKeywords();
    setState(() {
      _userKeywords = keywords;
    });
  }

  Future<void> _autoSync() async {
    if (_isLoading) return;
    setState(() => _isLoading = true);
    try {
      await SyncService.syncRules();
      await _loadStats();
      await _loadUserKeywords();

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('last_sync_ui', DateTime.now().toIso8601String());
      setState(() => _lastSync = DateTime.now());
    } catch (e) {
      print("Sync hatası: $e");
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _checkPermissions() async {
    try {
      final bool hasPermissions = await platform.invokeMethod(
        'checkPermissions',
      );
      setState(() {
        _isProtected = hasPermissions;
        _status = hasPermissions ? 'Aktif' : 'Pasif';
      });
    } catch (e) {
      print(e);
    }
  }

  Future<void> _enableProtectionWizard() async {
    Map<Permission, PermissionStatus> statuses = await [
      Permission.sms,
      Permission.phone,
      Permission.contacts,
    ].request();

    bool allGranted = statuses.values.every((status) => status.isGranted);
    if (!allGranted) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Uygulamanın çalışması için bu izinler gereklidir!'),
            backgroundColor: Colors.red,
          ),
        );
      }
      return;
    }

    try {
      await platform.invokeMethod('requestDefaultApp');
    } catch (e) {
      print("SMS Default error: $e");
    }

    await Future.delayed(const Duration(seconds: 1));

    try {
      await platform.invokeMethod('requestCallScreeningRole');
    } catch (e) {
      print("Call Screening error: $e");
    }

    await Future.delayed(const Duration(seconds: 2));
    await _checkPermissions();
  }

  Future<void> _loadStats() async {
    try {
      final directory = await getApplicationSupportDirectory();
      final file = File('${directory.path}/spam_rules.json');
      if (await file.exists()) {
        final content = await file.readAsString();
        final json = jsonDecode(content);
        setState(() {
          _stats = {
            'phones': (json['phones'] as List).length,
            'keywords': (json['keywords'] as List).length,
          };
        });
      }
    } catch (e) {
      print("İstatistik hatası: $e");
    }
  }

  Future<void> _loadBlockedHistory() async {
    try {
      final directory = await getApplicationSupportDirectory();
      final file = File('${directory.path}/blocked_history.json');
      if (await file.exists()) {
        final content = await file.readAsString();
        setState(() {
          _blockedList = json.decode(content);
        });
      }
    } catch (e) {
      print("Log okuma hatası: $e");
    }
  }

  void _showAddKeywordDialog() {
    if (!_isPremium && _userKeywords.length >= 3) {
      _showPremiumWall();
      return;
    }

    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Yasaklı Kelime Ekle'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(hintText: 'Örn: bahis, kumar...'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('İptal'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (controller.text.isNotEmpty) {
                await SyncService.addUserKeyword(controller.text);
                await _loadUserKeywords();
                await _loadStats();
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Kelime eklendi ve kurallar güncellendi.'),
                  ),
                );
              }
            },
            child: const Text('Ekle'),
          ),
        ],
      ),
    );
  }

  void _showPremiumWall() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => SubscriptionScreen(
          onPurchaseSuccess: () {
            _checkPremiumStatus();
            _autoSync(); // Premium olunca kuralları çek
          },
        ),
      ),
    );
  }

  void _deleteKeyword(String keyword) async {
    await SyncService.removeUserKeyword(keyword);
    await _loadUserKeywords();
    await _loadStats();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text(
          'Güvenlik Merkezi',
          style: GoogleFonts.inter(
            color: const Color(0xFF0F172A),
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          if (!_isPremium)
            TextButton.icon(
              onPressed: _showPremiumWall,
              icon: const Icon(Icons.star, color: Colors.amber),
              label: const Text(
                "Premium",
                style: TextStyle(
                  color: Colors.amber,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

          // Debug Menüsü
          PopupMenuButton<String>(
            icon: Icon(Icons.settings, color: Colors.grey[600]),
            onSelected: (value) {
              if (value == 'reset') _resetPremiumStatus();
              if (value == 'setup') _enableProtectionWizard();
            },
            itemBuilder: (BuildContext context) => [
              const PopupMenuItem(
                value: 'setup',
                child: Text('Kurulum Sihirbazı'),
              ),
              const PopupMenuItem(
                value: 'reset',
                child: Text(
                  'DEBUG: Premium Sıfırla',
                  style: TextStyle(color: Colors.red),
                ),
              ),
            ],
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _autoSync,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildStatusCard(),
              const SizedBox(height: 24),
              _buildStatsRow(),
              const SizedBox(height: 24),
              _buildUserKeywordsSection(),
              const SizedBox(height: 24),
              _buildBlockedListSection(),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddKeywordDialog,
        backgroundColor: const Color(0xFF0F172A),
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildStatusCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: _isProtected ? const Color(0xFF0F172A) : Colors.red[50],
        borderRadius: BorderRadius.circular(20),
        border: _isProtected ? null : Border.all(color: Colors.red),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: _isProtected
                      ? Colors.green.withOpacity(0.2)
                      : Colors.red.withOpacity(0.2),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  _isProtected ? Icons.shield : Icons.shield_outlined,
                  color: _isProtected ? Colors.greenAccent : Colors.red,
                  size: 32,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _isProtected ? 'Tam Koruma Aktif' : 'Koruma Devre Dışı',
                      style: GoogleFonts.inter(
                        color: _isProtected ? Colors.white : Colors.red[900],
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      _isProtected
                          ? 'Spam mesajlar engelleniyor'
                          : 'Varsayılan SMS uygulaması yapın',
                      style: GoogleFonts.inter(
                        color: _isProtected
                            ? Colors.grey[400]
                            : Colors.red[700],
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          if (!_isProtected) ...[
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _enableProtectionWizard,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Korumayı Etkinleştir'),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildStatsRow() {
    return Row(
      children: [
        // Arama Engelleme Kartı (Freemium Kilitli)
        Expanded(
          child: GestureDetector(
            onTap: !_isPremium ? _showPremiumWall : null,
            child: Stack(
              children: [
                _buildStatCard(
                  'Engellenen Numaralar',
                  _isPremium ? _stats['phones'].toString() : "0",
                  Icons.phone_locked,
                  _isPremium ? Colors.blue : Colors.grey,
                ),
                if (!_isPremium)
                  Positioned(
                    top: 8,
                    right: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 6,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.amber,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.lock, size: 10, color: Colors.black),
                          SizedBox(width: 2),
                          Text(
                            "PRO",
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildStatCard(
            'Yasaklı Kelimeler',
            _stats['keywords'].toString(),
            Icons.abc,
            Colors.orange,
          ),
        ),
      ],
    );
  }

  Widget _buildStatCard(
    String title,
    String value,
    IconData icon,
    Color color,
  ) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey[200]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color),
          const SizedBox(height: 12),
          Text(
            value,
            style: GoogleFonts.inter(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: const Color(0xFF0F172A),
            ),
          ),
          Text(
            title,
            style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[500]),
          ),
        ],
      ),
    );
  }

  Widget _buildUserKeywordsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Kendi Yasaklı Kelimelerim',
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF0F172A),
              ),
            ),
            if (!_isPremium)
              Text(
                "${_userKeywords.length}/3",
                style: TextStyle(
                  color: _userKeywords.length >= 3 ? Colors.red : Colors.grey,
                ),
              ),
          ],
        ),
        const SizedBox(height: 4),
        if (!_isPremium)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text(
              "Ücretsiz planda sadece 3 kelime ekleyebilirsiniz.",
              style: TextStyle(
                color: Colors.orange[800],
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),

        const SizedBox(height: 8),
        if (_userKeywords.isEmpty)
          Container(
            padding: const EdgeInsets.all(20),
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey[200]!),
            ),
            child: const Text(
              "Henüz özel kural eklemediniz.",
              style: TextStyle(color: Colors.grey),
              textAlign: TextAlign.center,
            ),
          )
        else
          Wrap(
            spacing: 8,
            children: _userKeywords
                .map(
                  (kw) => Chip(
                    label: Text(kw),
                    onDeleted: () => _deleteKeyword(kw),
                    deleteIcon: const Icon(Icons.close, size: 16),
                    backgroundColor: Colors.white,
                    side: BorderSide(color: Colors.grey[300]!),
                  ),
                )
                .toList(),
          ),
      ],
    );
  }

  Widget _buildBlockedListSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Son Engellenenler',
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF0F172A),
              ),
            ),
            TextButton.icon(
              onPressed: !_isPremium ? _showPremiumWall : _loadBlockedHistory,
              icon: Icon(
                Icons.refresh,
                size: 16,
                color: !_isPremium ? Colors.amber : Colors.blue,
              ),
              label: Text(
                "Yenile",
                style: TextStyle(
                  color: !_isPremium ? Colors.amber : Colors.blue,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),

        if (!_isPremium)
          GestureDetector(
            onTap: _showPremiumWall,
            child: Container(
              padding: const EdgeInsets.all(30),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.amber[50],
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.amber.withOpacity(0.5)),
              ),
              child: Column(
                children: [
                  const Icon(Icons.lock, size: 48, color: Colors.amber),
                  const SizedBox(height: 10),
                  const Text(
                    "Engellenenleri Görmek İçin Premium'a Geçin",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    "Spam geçmişinizi detaylı inceleyin",
                    style: TextStyle(color: Colors.grey[600], fontSize: 12),
                  ),
                ],
              ),
            ),
          )
        else if (_blockedList.isEmpty)
          Container(
            padding: const EdgeInsets.all(30),
            alignment: Alignment.center,
            child: Column(
              children: [
                Icon(Icons.inbox, size: 48, color: Colors.grey[300]),
                const SizedBox(height: 10),
                Text(
                  "Henüz spam yakalanmadı",
                  style: TextStyle(color: Colors.grey[400]),
                ),
              ],
            ),
          )
        else
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _blockedList.length,
            itemBuilder: (context, index) {
              final item = _blockedList[index];
              final timestamp = DateTime.fromMillisecondsSinceEpoch(
                item['timestamp'] ?? 0,
              );

              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey[100]!),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.02),
                      blurRadius: 5,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: ListTile(
                  leading: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.red[50],
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.block, color: Colors.red),
                  ),
                  title: Text(
                    item['sender'] ?? 'Bilinmeyen',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(
                    "${item['content']}\n${item['reason']}",
                    style: TextStyle(color: Colors.grey[600], fontSize: 12),
                  ),
                  trailing: Text(
                    DateFormat('HH:mm').format(timestamp),
                    style: TextStyle(color: Colors.grey[400], fontSize: 12),
                  ),
                ),
              );
            },
          ),
      ],
    );
  }
}
