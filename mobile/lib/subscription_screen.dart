import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SubscriptionScreen extends StatefulWidget {
  final VoidCallback onPurchaseSuccess;

  const SubscriptionScreen({super.key, required this.onPurchaseSuccess});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  bool _isLoading = false;

  Future<void> _simulatePurchase(String plan) async {
    setState(() => _isLoading = true);
    
    // Mock ödeme süreci
    await Future.delayed(const Duration(seconds: 2));
    
    // Satın alma başarılı, kaydet
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('is_premium', true);
    
    if (mounted) {
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Tebrikler! Premium özellikler açıldı 🎉'), backgroundColor: Colors.green),
      );
      Navigator.pop(context);
      widget.onPurchaseSuccess();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.red[50],
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.star, color: Colors.red, size: 48),
            ),
            const SizedBox(height: 24),
            Text(
              "Premium'a Yükselt",
              style: GoogleFonts.inter(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF0F172A),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              "Sınırsız yasaklı kelime ekleyin ve tam korumanın keyfini çıkarın.",
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                fontSize: 16,
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 40),
            
            // Paketler
            _buildPackageCard(
              title: "Aylık",
              price: "49.99 ₺",
              period: "/ay",
              isPopular: false,
              onTap: () => _simulatePurchase("monthly"),
            ),
            const SizedBox(height: 16),
            _buildPackageCard(
              title: "Yıllık",
              price: "400 ₺",
              period: "/yıl",
              isPopular: true,
              saveText: "%33 Kazanç",
              onTap: () => _simulatePurchase("yearly"),
            ),
            const SizedBox(height: 16),
            _buildPackageCard(
              title: "Ömür Boyu",
              price: "1000 ₺",
              period: "tek seferlik",
              isPopular: false,
              onTap: () => _simulatePurchase("lifetime"),
            ),
            
            const SizedBox(height: 32),
            if (_isLoading)
              const CircularProgressIndicator(color: Colors.red)
            else
              Text(
                "Ödemeler güvenli altyapı ile korunmaktadır.",
                style: TextStyle(color: Colors.grey[400], fontSize: 12),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildPackageCard({
    required String title,
    required String price,
    required String period,
    required bool isPopular,
    required VoidCallback onTap,
    String? saveText,
  }) {
    return GestureDetector(
      onTap: _isLoading ? null : onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isPopular ? Colors.red : Colors.grey[200]!,
            width: isPopular ? 2 : 1,
          ),
          boxShadow: isPopular 
            ? [BoxShadow(color: Colors.red.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))]
            : [],
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        title,
                        style: GoogleFonts.inter(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: const Color(0xFF0F172A),
                        ),
                      ),
                      if (isPopular) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Text(
                            "Popüler",
                            style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ],
                  ),
                  if (saveText != null)
                    Text(
                      saveText,
                      style: const TextStyle(color: Colors.green, fontSize: 12, fontWeight: FontWeight.w600),
                    ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  price,
                  style: GoogleFonts.inter(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: isPopular ? Colors.red : const Color(0xFF0F172A),
                  ),
                ),
                Text(
                  period,
                  style: TextStyle(color: Colors.grey[500], fontSize: 12),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
