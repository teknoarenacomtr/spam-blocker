import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Shield, Plus, RefreshCw, Trash2, Smartphone,
  MessageSquare, Lock, LogOut, CheckCircle, Download,
  Menu, X, AlertTriangle, Phone, AlertOctagon,
  CreditCard, UserX, HelpCircle, Activity, Search,
  MessageCircle, User, ThumbsUp, ThumbsDown,
  Info, Calendar, Clock, Building2, Zap, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUPABASE AYARLARI ---
const SUPABASE_URL = 'https://wxpkbziqobdcgluyiwar.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4TVY6GAVzk-kOXJkOJfRKg_HqV1_ggq';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface RuleItem {
  value: string;
  description?: string;
}

interface Rules {
  phones: RuleItem[];
  keywords: RuleItem[];
}

interface UserReport {
  id: number;
  phone_number: string;
  category: string;
  comment?: string;
  reporter_name?: string;
  created_at: string;
  caller_name?: string;
  call_date?: string;
  call_time?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// -----------------------------------------------------------------------------
// BİLEŞEN: HAKKIMIZDA SAYFASI
// -----------------------------------------------------------------------------
function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6">
            <Info className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Hakkımızda</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Türkiye'nin en kapsamlı spam telefon numarası takip ve sorgulama platformu.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Nedir? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-blue-600">
              <HelpCircle className="w-6 h-6" /> SpamTakip.com Nedir?
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              SpamTakip.com, Türkiye'nin en kapsamlı spam telefon numarası sorgulama ve takip platformudur.
              Kullanıcılarımız, tanımadıkları numaralardan gelen aramaları sorgulayabilir, spam numaraları
              bildirebilir ve diğer kullanıcıların deneyimlerini okuyabilir.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 font-medium">
              Üye olmadan da spam bildirebilir ve yorum yapabilirsiniz! Platformumuz tamamen ücretsizdir ve topluluk tarafından desteklenmektedir.
            </div>
          </motion.div>

          {/* Misyonumuz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-green-600">
              <Shield className="w-6 h-6" /> Misyonumuz
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Telefon dolandırıcılığı ve spam aramalardan insanları korumak, kullanıcı topluluğunun gücüyle spam numaraların tespit edilmesini
              sağlamak ve güvenli bir iletişim ortamı oluşturmaktır.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mt-4">
              Her gün binlerce insan spam aramalara maruz kalıyor. Biz, bu soruna topluluk tabanlı bir çözüm sunarak, kullanıcıların birbirlerini
              uyarmasına ve korunmasına olanak sağlıyoruz.
            </p>
          </motion.div>

          {/* Nasıl Çalışır? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-purple-600">
              <Activity className="w-6 h-6" /> Nasıl Çalışır?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600 font-bold text-xl">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Rapor Gönderin</h3>
                  <p className="text-gray-600">Kullanıcılar spam olduğunu düşündükleri numaraları bildirir. Üye olmadan da rapor gönderebilirsiniz.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-xl">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Toplulukla Paylaşın</h3>
                  <p className="text-gray-600">Raporlar ve yorumlar toplulukla anında paylaşılır. Binlerce kullanıcı bu bilgilerden yararlanır.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-orange-600 font-bold text-xl">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Otomatik Skorlama</h3>
                  <p className="text-gray-600">Spam skorları otomatik olarak hesaplanır. Risk seviyeleri belirlenir ve kullanıcılar uyarılır.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 font-bold text-xl">4</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Kendinizi Koruyun</h3>
                  <p className="text-gray-600">Diğer kullanıcılar araştırma yaparak kendilerini korur. Bilinmeyen numaraları sorgulayın!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Özelliklerimiz */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <div className="font-bold mb-1">Ücretsiz</div>
              <div className="text-xs text-gray-500">Tüm özellikler tamamen ücretsiz</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="font-bold mb-1">Topluluk</div>
              <div className="text-xs text-gray-500">Gerçek kullanıcı deneyimleri</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <div className="font-bold mb-1">Hızlı</div>
              <div className="text-xs text-gray-500">Saniyeler içinde sonuç alın</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <User className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <div className="font-bold mb-1">Misafir Erişim</div>
              <div className="text-xs text-gray-500">Üye olmadan rapor ve yorum</div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-10 text-center text-white shadow-xl shadow-purple-200">
            <h2 className="text-3xl font-bold mb-4">Hemen Başlayın!</h2>
            <p className="text-purple-100 mb-8 text-lg">Spam numaraları bildirin veya bilinmeyen numaraları sorgulayın.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/#report" className="bg-white text-purple-600 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2">
                <AlertOctagon className="w-5 h-5" /> Spam Bildir
              </a>
              <a href="/#search" className="bg-purple-700 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-purple-800 transition shadow-lg border border-purple-500 flex items-center justify-center gap-2">
                <Search className="w-5 h-5" /> Numara Sorgula
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BİLEŞEN: LANDING PAGE (Modern & Interaktif)
// -----------------------------------------------------------------------------
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Rapor Formu State'leri
  const [reportPhone, setReportPhone] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [callerName, setCallerName] = useState('');
  const [callDate, setCallDate] = useState(new Date().toISOString().split('T')[0]);
  const [callTime, setCallTime] = useState('');

  const [isReporting, setIsReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Sorgulama & Akış State'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null); // null, 'CLEAN', 'SPAM', 'SUSPICIOUS'
  const [reportCount, setReportCount] = useState(0);
  const [recentReports, setRecentReports] = useState<UserReport[]>([]);

  useEffect(() => {
    fetchRecentReports();
  }, []);

  const fetchRecentReports = async () => {
    // Hem APPROVED hem PENDING olanları çekelim
    // APPROVED olanlar kesin spam, PENDING olanlar şüpheli
    const { data } = await supabase
      .from('user_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);

    if (data) setRecentReports(data);
  };

  const categories = [
    { id: 'SALES', label: 'Telemarketing / Pazarlama', icon: Phone, color: 'text-blue-600' },
    { id: 'SCAM', label: 'Dolandırıcılık / Sahte Arama', icon: AlertOctagon, color: 'text-red-600' },
    { id: 'GAMBLING', label: 'Bet Firması', icon: CreditCard, color: 'text-purple-600' },
    { id: 'SURVEY', label: 'Anket / Araştırma', icon: MessageSquare, color: 'text-orange-600' },
    { id: 'DEBT', label: 'Borç Tahsilatı', icon: Building2, color: 'text-green-600' },
    { id: 'POLITICAL', label: 'Siyasi Arama', icon: Activity, color: 'text-gray-600' },
    { id: 'CHARITY', label: 'Hayır Kurumu', icon: Users, color: 'text-pink-600' },
    { id: 'HARASSMENT', label: 'Şaka / Taciz', icon: UserX, color: 'text-yellow-600' },
    { id: 'OTHER', label: 'Diğer', icon: HelpCircle, color: 'text-gray-500' },
  ];

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportPhone || !reportCategory) return;

    setIsReporting(true);
    try {
      const { error } = await supabase
        .from('user_reports')
        .insert([{
          phone_number: reportPhone,
          category: reportCategory,
          comment: reportComment,
          caller_name: callerName,
          call_date: callDate,
          call_time: callTime || null, // Boşsa null gönder
          reporter_name: 'Misafir Kullanıcı',
          created_at: new Date().toISOString(),
          status: 'PENDING'
        }]);

      if (error) throw error;
      setReportStatus('success');
      setReportPhone('');
      setReportCategory('');
      setReportComment('');
      setCallerName('');
      setCallTime('');
      fetchRecentReports(); // Listeyi güncelle
      setTimeout(() => setReportStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setReportStatus('error');
    } finally {
      setIsReporting(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResult(null);
    setReportCount(0);

    // 1. Önce Kesinleşmiş Spam Kurallarına Bak
    const { data: spamData } = await supabase
      .from('spam_rules')
      .select('*')
      .eq('type', 'PHONE')
      .eq('value', searchQuery)
      .maybeSingle();

    if (spamData) {
      setSearchResult('SPAM');
      return;
    }

    // 2. Eğer Spam Listesinde Yoksa, Şikayetlere Bak (Henüz onaylanmamış ama raporlanmış mı?)
    const { count } = await supabase
      .from('user_reports')
      .select('*', { count: 'exact', head: true })
      .eq('phone_number', searchQuery);

    if (count && count > 0) {
      setReportCount(count);
      setSearchResult('SUSPICIOUS');
    } else {
      setSearchResult('CLEAN');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-tr from-red-600 to-orange-500 p-2 rounded-xl shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Spam Blocker
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-gray-600 hover:text-red-600 font-medium transition">Ana Sayfa</a>
              <a href="/#search" className="text-gray-600 hover:text-red-600 font-medium transition">Sorgula</a>
              <a href="/#report" className="text-gray-600 hover:text-red-600 font-medium transition">Spam Bildir</a>
              <a href="/about" className="text-gray-600 hover:text-red-600 font-medium transition">Hakkımızda</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition font-medium shadow-xl shadow-gray-200"
              >
                Uygulamayı İndir
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section & Search */}
      <div id="search" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
              🔍 Türkiye'nin En Kapsamlı Spam Veritabanı
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Bu Numara <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Güvenli mi?
              </span>
            </h1>
          </motion.div>

          {/* Search Box */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative mb-12"
          >
            <div className="relative group">
              <input
                type="tel"
                placeholder="Telefon Numarası Girin (Örn: 0555...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-32 py-5 bg-white border-2 border-gray-100 rounded-full text-lg outline-none focus:border-red-500 shadow-xl shadow-gray-200/50 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-red-600 text-white px-8 rounded-full font-bold hover:bg-red-700 transition flex items-center gap-2"
              >
                <Search className="w-5 h-5" /> Sorgula
              </button>
            </div>
          </motion.form>

          {/* Search Result */}
          <AnimatePresence>
            {searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`max-w-md mx-auto p-6 rounded-2xl border mb-12 ${searchResult === 'SPAM'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : searchResult === 'SUSPICIOUS'
                    ? 'bg-orange-50 border-orange-200 text-orange-800'
                    : 'bg-green-50 border-green-200 text-green-800'
                  }`}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  {searchResult === 'SPAM' && <AlertOctagon className="w-8 h-8" />}
                  {searchResult === 'SUSPICIOUS' && <AlertTriangle className="w-8 h-8" />}
                  {searchResult === 'CLEAN' && <CheckCircle className="w-8 h-8" />}

                  <h3 className="text-2xl font-bold">
                    {searchResult === 'SPAM' ? 'Tehlikeli Numara!' :
                      searchResult === 'SUSPICIOUS' ? 'Şüpheli Numara' : 'Temiz Görünüyor'}
                  </h3>
                </div>
                <p>
                  {searchResult === 'SPAM'
                    ? 'Bu numara sistemimizde SPAM olarak işaretlenmiş.'
                    : searchResult === 'SUSPICIOUS'
                      ? `Bu numara hakkında ${reportCount} adet şikayet var ancak henüz admin tarafından onaylanmamış. Dikkatli olun.`
                      : 'Veritabanımızda bu numarayla ilgili henüz bir kayıt yok.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Report Section */}
      <div id="report" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#D32F2F] p-4 flex items-center gap-2 text-white">
              <span className="font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🚩</span> Rapor Formu
              </span>
            </div>

            <div className="p-8">
              {reportStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold">Raporunuz Alındı!</h4>
                    <p className="text-sm">Geri bildiriminiz için teşekkürler. İncelendikten sonra yayınlanacaktır.</p>
                  </div>
                </motion.div>
              )}

              {reportStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3"
                >
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold">Bir Hata Oluştu!</h4>
                    <p className="text-sm">Lütfen internet bağlantınızı kontrol edip tekrar deneyin.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleReport} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Telefon Numarası <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="örn: 0212 922 42 89 veya 0555 123 45 67"
                    value={reportPhone}
                    onChange={(e) => setReportPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Numarayı istediğiniz formatta girebilirsiniz (boşluk, tire, parantez kullanabilirsiniz)</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Arama Türü <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none text-gray-700"
                      required
                    >
                      <option value="">Lütfen bir kategori seçin...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      ▼
                    </div>
                  </div>
                  {reportCategory && (
                    <p className={`text-xs mt-1 font-medium ${categories.find(c => c.id === reportCategory)?.color}`}>
                      {categories.find(c => c.id === reportCategory)?.label} seçildi
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Arayan Adı / Firma Adı
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: ABC Şirketi, Ahmet Yılmaz, vs."
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">Varsa arayan kişi veya firma adını yazın (isteğe bağlı)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Arama Tarihi</span>
                    </label>
                    <input
                      type="date"
                      value={callDate}
                      onChange={(e) => setCallDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Arama Saati</span>
                    </label>
                    <input
                      type="time"
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Detaylı Açıklama
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Arama hakkında detaylı bilgi verin... (Örn: Ne söylediler, ne istediler, nasıl davrandılar?)"
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-gray-700"
                    maxLength={500}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>{reportComment.length} / 500 karakter</span>
                    <span>{500 - reportComment.length} karakter kaldı</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setReportPhone('');
                      setReportCategory('');
                      setReportComment('');
                      setCallerName('');
                    }}
                    className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 font-medium transition flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> İptal
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isReporting}
                    type="submit"
                    className="bg-[#D32F2F] text-white px-8 py-2.5 rounded-md font-bold text-lg hover:bg-red-700 transition-colors shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isReporting ? <RefreshCw className="w-5 h-5 animate-spin" /> : (
                      <>
                        <span className="text-xl">🚩</span> Raporu Gönder
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-[#5E35B1] rounded-lg overflow-hidden text-white shadow-lg">
            <div className="p-4 bg-[#512DA8] font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> Spam Bildirimi Nasıl Yapılır?
            </div>
            <div className="p-6 text-sm leading-relaxed space-y-2 bg-[#5E35B1]">
              <p>1. <span className="font-bold">Telefon numarasını girin:</span> Sizi arayan numarayı yukarıdaki forma girin</p>
              <p>2. <span className="font-bold">Arama türünü seçin:</span> Telemarketing, dolandırıcılık, anket vb.</p>
              <p>3. <span className="font-bold">Detaylı açıklama ekleyin:</span> Ne söylediler, nasıl davrandılar? (İsteğe bağlı)</p>
              <p>4. <span className="font-bold">Raporu gönderin:</span> Raporu gönderin ve diğer kullanıcıları uyarın</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div id="recent" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <Activity className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Son Şikayetler</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recentReports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${report.status === 'APPROVED' ? 'border-green-200' : 'border-gray-100'
                  }`}
              >
                {report.status === 'APPROVED' && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> DOĞRULANMIŞ
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{report.reporter_name || 'Misafir'}</div>
                      <div className="text-xs text-gray-500">{new Date(report.created_at).toLocaleDateString('tr-TR')}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100`}>
                    {categories.find(c => c.id === report.category)?.label || report.category}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="font-mono text-lg font-bold text-gray-800 tracking-wide">
                    {report.phone_number}
                  </div>
                  {report.caller_name && (
                    <div className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                      <UserX className="w-3 h-3" /> Arayan: {report.caller_name}
                    </div>
                  )}
                </div>

                {report.comment && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                    "{report.comment}"
                  </p>
                )}

                <div className="flex gap-4 border-t border-gray-100 pt-4">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-green-600 text-sm transition">
                    <ThumbsUp className="w-4 h-4" /> Faydalı
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-600 text-sm transition">
                    <ThumbsDown className="w-4 h-4" /> Katılmıyorum
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Shield className="w-6 h-6" />
            <span className="font-bold text-lg">Spam Blocker</span>
          </div>
          <div className="text-sm">
            &copy; 2026 Spam Blocker. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BİLEŞEN: LOGIN PAGE (Admin Girişi)
// -----------------------------------------------------------------------------
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      onLogin(); // State'i güncelle
    } catch (err: any) {
      console.error(err);
      setError('Giriş başarısız. Bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Girişi</h2>
          <p className="text-gray-500 mt-2">Devam etmek için lütfen kimliğinizi doğrulayın.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2 border border-red-100">
            <Shield className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3.5 rounded-xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-100 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900">← Ana Sayfaya Dön</a>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BİLEŞEN: ADMIN PANEL (Mevcut Panel)
// -----------------------------------------------------------------------------
function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [rules, setRules] = useState<Rules>({ phones: [], keywords: [] });
  const [newValue, setNewValue] = useState('');
  const [type, setType] = useState<'PHONE' | 'KEYWORD'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Gelen Raporlar
  const [incomingReports, setIncomingReports] = useState<UserReport[]>([]);
  const [activeTab, setActiveTab] = useState<'RULES' | 'INBOX'>('RULES');

  const fetchRules = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('spam_rules')
        .select('type, value, description')
        .eq('is_active', true);

      if (error) throw error;

      const phones = data.filter((item: any) => item.type === 'PHONE').map((item: any) => ({ value: item.value, description: item.description }));
      const keywords = data.filter((item: any) => item.type === 'KEYWORD').map((item: any) => ({ value: item.value, description: item.description }));

      setRules({ phones, keywords });
      setMessage('Veriler güncellendi.');
    } catch (err) {
      console.error(err);
      setMessage('Bağlantı hatası!');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const fetchIncomingReports = async () => {
    // Sadece PENDING (Onay Bekleyen) raporları getir
    const { data } = await supabase
      .from('user_reports')
      .select('*')
      .eq('status', 'PENDING') // Filtre
      .order('created_at', { ascending: false });

    if (data) setIncomingReports(data);
  };

  useEffect(() => {
    fetchRules();
    fetchIncomingReports();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue) return;

    try {
      const { error } = await supabase
        .from('spam_rules')
        .insert([
          { type, value: newValue, category: 'SCAM', is_active: true }
        ]);

      if (error) throw error;

      setNewValue('');
      fetchRules();
      setMessage('Başarıyla eklendi!');
    } catch (err) {
      console.error(err);
      setMessage('Ekleme hatası!');
    }
  };

  const handleDelete = async (value: string, type: string) => {
    if (!confirm('Silmek istediğine emin misin?')) return;

    try {
      const { error } = await supabase
        .from('spam_rules')
        .delete()
        .eq('value', value)
        .eq('type', type);

      if (error) throw error;

      fetchRules();
      setMessage('Silindi.');
    } catch (err) {
      console.error(err);
      setMessage('Silme hatası!');
    }
  };

  const handleApproveReport = async (report: UserReport) => {
    // 1. spam_rules'a ekle (Mobil uygulama için)
    const { error: insertError } = await supabase
      .from('spam_rules')
      .insert([{
        type: 'PHONE',
        value: report.phone_number,
        category: report.category,
        description: report.comment,
        is_active: true
      }]);

    // Hata var mı? (Zaten ekliyse devam et, değilse dur)
    if (insertError && insertError.code !== '23505') {
      console.error(insertError);
      setMessage('Bir hata oluştu!');
      return;
    }

    // 2. user_reports durumunu GÜNCELLE (Silme YOK!)
    // Bu numara için gelen TÜM bekleyen raporları 'APPROVED' yap
    await supabase
      .from('user_reports')
      .update({ status: 'APPROVED' })
      .eq('phone_number', report.phone_number);

    setMessage(insertError?.code === '23505'
      ? 'Numara zaten listedeydi. Raporlar onaylandı.'
      : 'Rapor onaylandı ve spam listesine eklendi.');

    fetchRules();
    // Listeyi manuel olarak güncelle (Sunucudan gelmesini beklemeden arayüzü temizle)
    setIncomingReports(prev => prev.filter(r => r.phone_number !== report.phone_number));

    // Arkadan da güncelle
    fetchIncomingReports();
  };

  const handleDeleteAllReportsForNumber = async (phone: string) => {
    await supabase.from('user_reports').delete().eq('phone_number', phone);
    fetchIncomingReports();
  };

  const handleDeleteReport = async (id: number) => {
    await supabase.from('user_reports').delete().eq('id', id);
    fetchIncomingReports();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-red-600 p-2.5 rounded-xl shadow-md shadow-red-100">
              <Shield className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Yönetim Paneli</h1>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => setActiveTab('RULES')}
                  className={`text-sm font-medium pb-1 border-b-2 transition ${activeTab === 'RULES' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                >
                  Kurallar
                </button>
                <button
                  onClick={() => setActiveTab('INBOX')}
                  className={`text-sm font-medium pb-1 border-b-2 transition flex items-center gap-2 ${activeTab === 'INBOX' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                >
                  Gelen Kutusu
                  <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-xs font-bold">{incomingReports.length}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {message && (
              <span className="hidden md:flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-100">
                <CheckCircle className="w-4 h-4" /> {message}
              </span>
            )}
            <button
              onClick={() => { fetchRules(); fetchIncomingReports(); }}
              disabled={loading}
              title="Yenile"
              className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition text-gray-600"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition font-medium text-sm"
            >
              <LogOut className="w-4 h-4" /> Çıkış Yap
            </button>
          </div>
        </header>

        {activeTab === 'RULES' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sol Kolon: Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 pb-4 border-b border-gray-50">
                  <Plus className="w-5 h-5 text-red-600" /> Yeni Kural Ekle
                </h2>
                <form onSubmit={handleAdd} className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Kural Tipi</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as 'PHONE' | 'KEYWORD')}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
                    >
                      <option value="PHONE">Telefon Numarası</option>
                      <option value="KEYWORD">Yasaklı Kelime</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Değer</label>
                    <input
                      type="text"
                      placeholder={type === 'PHONE' ? "+90555..." : "Örn: bahis, bonus..."}
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-medium shadow-lg shadow-red-100 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Ekle & Yayınla
                  </button>
                </form>
              </div>
            </div>

            {/* Sağ Kolon: Listeler */}
            <div className="lg:col-span-2 space-y-6">
              {/* Telefon Listesi */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-white px-6 py-4 border-b border-red-100 flex justify-between items-center">
                  <h3 className="font-semibold text-red-900 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-red-600" /> Engellenen Numaralar
                  </h3>
                  <span className="bg-white border border-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    {rules.phones.length}
                  </span>
                </div>
                <ul className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {rules.phones.map((phone, i) => (
                    <li key={i} className="px-6 py-3.5 flex justify-between items-center hover:bg-red-50/30 transition group">
                      <div>
                        <div className="font-mono text-gray-700 font-medium">{phone.value}</div>
                        {phone.description && <div className="text-xs text-gray-400 italic">{phone.description}</div>}
                      </div>
                      <button
                        onClick={() => handleDelete(phone.value, 'PHONE')}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                  {rules.phones.length === 0 && (
                    <li className="p-8 text-center text-gray-400 flex flex-col items-center gap-2">
                      <Smartphone className="w-8 h-8 text-gray-200" />
                      Henüz numara eklenmemiş
                    </li>
                  )}
                </ul>
              </div>

              {/* Keyword Listesi */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-4 border-b border-orange-100 flex justify-between items-center">
                  <h3 className="font-semibold text-orange-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-orange-600" /> Yasaklı Kelimeler
                  </h3>
                  <span className="bg-white border border-orange-100 text-orange-700 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    {rules.keywords.length}
                  </span>
                </div>
                <ul className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {rules.keywords.map((kw, i) => (
                    <li key={i} className="px-6 py-3.5 flex justify-between items-center hover:bg-orange-50/30 transition group">
                      <div>
                        <div className="font-medium text-gray-700">{kw.value}</div>
                        {kw.description && <div className="text-xs text-gray-400 italic">{kw.description}</div>}
                      </div>
                      <button
                        onClick={() => handleDelete(kw.value, 'KEYWORD')}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                  {rules.keywords.length === 0 && (
                    <li className="p-8 text-center text-gray-400 flex flex-col items-center gap-2">
                      <MessageSquare className="w-8 h-8 text-gray-200" />
                      Henüz kelime eklenmemiş
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* --- INBOX (Gelen Şikayetler) --- */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Onay Bekleyen Şikayetler</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {incomingReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition flex flex-col md:flex-row gap-4 justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-gray-900 text-white px-3 py-1 rounded-md font-mono font-bold">
                        {report.phone_number}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {report.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(report.created_at).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    {report.comment && (
                      <p className="text-gray-600 italic mb-2">"{report.comment}"</p>
                    )}
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <User className="w-3 h-3" /> {report.reporter_name || 'Misafir'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-red-600 text-sm font-medium transition"
                    >
                      Sil
                    </button>
                    <button
                      onClick={() => handleApproveReport(report)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition shadow-lg shadow-green-100"
                    >
                      Onayla & Ekle
                    </button>
                  </div>
                </div>
              ))}
              {incomingReports.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Henüz yeni şikayet yok.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------------------------------
function App() {
  const [session, setSession] = useState<any>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // 1. Session Kontrolü
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 2. URL Kontrolü (Simple Router)
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      // /admin ile başlıyorsa admin moduna geç
      setIsAdminRoute(path.startsWith('/admin'));
    };

    // İlk yüklemede kontrol
    handleLocationChange();

    // Browser navigasyonunu dinle (Back/Forward butonları için)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Eğer admin rotasındaysak
  if (isAdminRoute) {
    if (!session) {
      return <LoginPage onLogin={() => { }} />; // Session değişince zaten App re-render olacak
    }
    return <AdminPanel onLogout={() => { }} />;
  }

  // Hakkımızda Sayfası
  if (currentPath === '/about') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
        {/* Navbar (About için tekrar kullanıyoruz, normalde component yapılmalıydı) */}
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <a href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-tr from-red-600 to-orange-500 p-2 rounded-xl shadow-lg shadow-red-200 group-hover:scale-105 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Spam Blocker
                </span>
              </a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <a href="/" className="text-gray-600 hover:text-red-600 font-medium transition">Ana Sayfa</a>
                <a href="/#search" className="text-gray-600 hover:text-red-600 font-medium transition">Sorgula</a>
                <a href="/#report" className="text-gray-600 hover:text-red-600 font-medium transition">Spam Bildir</a>
                <a href="/about" className="text-red-600 font-bold transition">Hakkımızda</a>
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition font-medium shadow-xl shadow-gray-200">
                  Uygulamayı İndir
                </button>
              </div>
            </div>
          </div>
        </nav>
        <AboutPage />
        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-6 h-6" />
              <span className="font-bold text-lg">Spam Blocker</span>
            </div>
            <div className="text-sm">
              &copy; 2026 Spam Blocker. Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Varsayılan olarak Landing Page göster
  return <LandingPage />;
}

export default App;
