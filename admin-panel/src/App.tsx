import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Shield, Plus, RefreshCw, Trash2, Smartphone,
  MessageSquare, Lock, LogOut, CheckCircle, Download,
  Menu, X, AlertTriangle, Phone, AlertOctagon,
  CreditCard, UserX, HelpCircle, Activity, Search,
  MessageCircle, User, ThumbsUp, ThumbsDown,
  Info, Calendar, Clock, Building2, Zap, Users,
  ArrowRight, Globe, Share2, BarChart2, Code
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
  votes_up?: number;
  votes_down?: number;
}

interface SpamPattern {
  id: number;
  pattern: string;
  type: 'KEYWORD' | 'REGEX';
  category: 'JUNK' | 'PROMOTION' | 'TRANSACTION' | 'NOTIFICATION' | 'GENERAL';
  is_active: boolean;
}

interface FilterResult {
  isBlocked: boolean;
  category: string;
  matchedRule?: string;
  confidence: number;
}

// -----------------------------------------------------------------------------
// JUNKBOY LOGIC ENTEGRASYONU (Client-Side Simulation)
// -----------------------------------------------------------------------------
const filterMessage = (message: string, patterns: SpamPattern[]): FilterResult => {
  const text = message.toLowerCase();

  // 1. Regex Kontrolü
  const regexPatterns = patterns.filter(p => p.type === 'REGEX' && p.is_active);
  for (const p of regexPatterns) {
    try {
      // Veritabanındaki string regex'i JS Regex nesnesine çevir
      const regex = new RegExp(p.pattern, 'i');
      if (regex.test(text)) {
        return { isBlocked: true, category: p.category, matchedRule: p.pattern, confidence: 0.95 };
      }
    } catch (e) {
      console.warn('Invalid regex:', p.pattern);
    }
  }

  // 2. Keyword Kontrolü
  const keywordPatterns = patterns.filter(p => p.type === 'KEYWORD' && p.is_active);
  for (const p of keywordPatterns) {
    if (text.includes(p.pattern.toLowerCase())) {
      return { isBlocked: true, category: p.category, matchedRule: p.pattern, confidence: 0.9 };
    }
  }

  // 3. Varsayılan (Temiz)
  return { isBlocked: false, category: 'GENERAL', confidence: 0.5 };
};

// -----------------------------------------------------------------------------
// BİLEŞEN: HAKKIMIZDA SAYFASI
// -----------------------------------------------------------------------------
function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-32 pb-20 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-2xl mb-8 border border-red-100">
            <Info className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Hakkımızda</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Topluluk gücüyle çalışan, şeffaf ve güvenilir numara sorgulama servisi.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {/* Nedir? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
                <HelpCircle className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
              </div>
              Platform Nedir?
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Tanımadığınız numaraları sorgulayabileceğiniz, spam aramaları raporlayabileceğiniz ve diğer kullanıcıların deneyimlerinden faydalanabileceğiniz açık kaynaklı bir veritabanıdır.
            </p>
          </motion.div>

          {/* Misyonumuz */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
                  <Shield className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
                </div>
                Misyonumuz
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Telefon dolandırıcılığı ve istenmeyen aramalarla mücadele ederek daha güvenli bir iletişim ortamı sağlamak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
                  <Users className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
                </div>
                Topluluk Gücü
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Her gün binlerce kullanıcı deneyimlerini paylaşarak birbirini uyarıyor. Biz sadece bu bilgi akışını organize ediyoruz.
              </p>
            </motion.div>
          </div>

          {/* Nasıl Çalışır? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-200 mt-8"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Sistem Nasıl İşler?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center mb-4 text-2xl font-bold text-gray-900">1</div>
                <h3 className="font-bold text-lg mb-2">Raporla</h3>
                <p className="text-gray-500 text-sm">Şüpheli numarayı sisteme bildir.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center mb-4 text-2xl font-bold text-gray-900">2</div>
                <h3 className="font-bold text-lg mb-2">Analiz</h3>
                <p className="text-gray-500 text-sm">Sistem ve topluluk veriyi doğrular.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center mb-4 text-2xl font-bold text-gray-900">3</div>
                <h3 className="font-bold text-lg mb-2">Korun</h3>
                <p className="text-gray-500 text-sm">Riskli numaralar engellenir.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BİLEŞEN: LANDING PAGE (Flash UI Design)
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
    const { data } = await supabase
      .from('user_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);

    if (data) setRecentReports(data);
  };

  const categories = [
    { id: 'SALES', label: 'Pazarlama', icon: Phone },
    { id: 'SCAM', label: 'Dolandırıcı', icon: AlertOctagon },
    { id: 'GAMBLING', label: 'Bahis', icon: CreditCard },
    { id: 'SURVEY', label: 'Anket', icon: MessageSquare },
    { id: 'DEBT', label: 'Tahsilat', icon: Building2 },
    { id: 'POLITICAL', label: 'Siyasi', icon: Activity },
    { id: 'CHARITY', label: 'Yardım', icon: Users },
    { id: 'HARASSMENT', label: 'Taciz', icon: UserX },
    { id: 'OTHER', label: 'Diğer', icon: HelpCircle },
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
          call_time: callTime || null,
          reporter_name: 'Misafir Kullanıcı',
          created_at: new Date().toISOString(),
          status: 'PENDING',
          votes_up: 0,
          votes_down: 0
        }]);

      if (error) throw error;
      setReportStatus('success');
      setReportPhone('');
      setReportCategory('');
      setReportComment('');
      setCallerName('');
      setCallTime('');
      fetchRecentReports();
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

  // Oylama Fonksiyonu
  const handleVote = async (reportId: number, type: 'up' | 'down') => {
    // UI'ı anında güncelle (Optimistic Update)
    setRecentReports(prev => prev.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          votes_up: type === 'up' ? (report.votes_up || 0) + 1 : report.votes_up,
          votes_down: type === 'down' ? (report.votes_down || 0) + 1 : report.votes_down
        };
      }
      return report;
    }));

    // Veritabanını güncelle
    const column = type === 'up' ? 'votes_up' : 'votes_down';
    // Not: Supabase RPC fonksiyonu daha güvenli olurdu ama şimdilik doğrudan alıp artıracağız
    // Basit çözüm: Mevcut değeri alıp 1 ekle
    const { data: currentData } = await supabase
      .from('user_reports')
      .select(column)
      .eq('id', reportId)
      .single();

    if (currentData) {
      await supabase
        .from('user_reports')
        .update({ [column]: (currentData as any)[column] + 1 })
        .eq('id', reportId);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden selection:bg-red-100 selection:text-red-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-red-600 p-1.5 rounded-lg shadow-sm group-hover:bg-red-700 transition-colors">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                SpamBlocker
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-red-600 transition">Ana Sayfa</a>
              <a href="/#search" className="text-sm font-medium text-gray-600 hover:text-red-600 transition">Sorgula</a>
              <a href="/#report" className="text-sm font-medium text-gray-600 hover:text-red-600 transition">Bildir</a>
              <a href="/about" className="text-sm font-medium text-gray-600 hover:text-red-600 transition">Hakkında</a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-black transition text-sm font-medium shadow-lg shadow-gray-200"
              >
                Uygulamayı İndir
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-8 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Canlı Veritabanı
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-none">
              Kim <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Arıyor?</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Türkiye'nin en gelişmiş spam numara veritabanında sorgulama yapın, dolandırıcıları tespit edin ve topluluğu koruyun.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative mb-16"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <input
                type="tel"
                placeholder="Numara Sorgula (0555...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full pl-8 pr-36 py-5 bg-white border border-gray-200 rounded-full text-lg outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-xl shadow-gray-200/50 transition-all placeholder:text-gray-400 font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-6 rounded-full font-bold hover:bg-black transition flex items-center gap-2"
              >
                <Search className="w-4 h-4" /> Ara
              </button>
            </div>
          </motion.form>

          {/* Search Result */}
          <AnimatePresence>
            {searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="max-w-md mx-auto mb-12"
              >
                <div className={`p-6 rounded-2xl border backdrop-blur-sm ${searchResult === 'SPAM'
                  ? 'bg-red-50/50 border-red-200 text-red-900'
                  : searchResult === 'SUSPICIOUS'
                    ? 'bg-orange-50/50 border-orange-200 text-orange-900'
                    : 'bg-green-50/50 border-green-200 text-green-900'
                  }`}>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {searchResult === 'SPAM' && <AlertOctagon className="w-8 h-8" />}
                    {searchResult === 'SUSPICIOUS' && <AlertTriangle className="w-8 h-8" />}
                    {searchResult === 'CLEAN' && <CheckCircle className="w-8 h-8" />}
                    <h3 className="text-xl font-bold">
                      {searchResult === 'SPAM' ? 'Tehlikeli Numara!' :
                        searchResult === 'SUSPICIOUS' ? 'Şüpheli Aktivite' : 'Temiz Görünüyor'}
                    </h3>
                  </div>
                  <p className="text-sm opacity-90">
                    {searchResult === 'SPAM' ? 'Bu numara veritabanımızda kayıtlı.' :
                      searchResult === 'SUSPICIOUS' ? `Hakkında ${reportCount} adet rapor var.` :
                        'Henüz bir kayıt bulunamadı.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Report Section */}
      <div id="report" className="py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Şüpheli Bildir</h3>
                <p className="text-gray-500">Topluluğu korumak için deneyimini paylaş.</p>
              </div>

              {reportStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-center gap-3 animate-pulse">
                  <CheckCircle className="w-5 h-5" /> Raporunuz başarıyla kaydedildi.
                </div>
              )}

              {reportStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" /> Bir hata oluştu.
                </div>
              )}

              <form onSubmit={handleReport} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Telefon Numarası</label>
                    <input
                      type="tel"
                      placeholder="0555 123 45 67"
                      value={reportPhone}
                      onChange={(e) => setReportPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Arayan Kişi/Firma</label>
                    <input
                      type="text"
                      placeholder="Örn: X Bankası"
                      value={callerName}
                      onChange={(e) => setCallerName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Kategori</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setReportCategory(cat.id)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${reportCategory === cat.id
                          ? 'bg-gray-900 border-gray-900 text-white shadow-lg'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <cat.icon className="w-5 h-5" />
                        <span className="text-[10px] font-bold">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Tarih</label>
                    <input
                      type="date"
                      value={callDate}
                      onChange={(e) => setCallDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Saat</label>
                    <input
                      type="time"
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Açıklama</label>
                  <textarea
                    rows={3}
                    placeholder="Detaylı bilgi..."
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all resize-none"
                  />
                </div>

                <button
                  disabled={isReporting}
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:opacity-70"
                >
                  {isReporting ? 'Gönderiliyor...' : 'Raporu Gönder'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Son Bildirimler</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-500">Canlı Akış</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recentReports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{report.reporter_name || 'Misafir'}</div>
                      <div className="text-xs text-gray-400">{new Date(report.created_at).toLocaleDateString('tr-TR')}</div>
                    </div>
                  </div>
                  {report.status === 'APPROVED' && (
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold border border-green-100 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> DOĞRULANMIŞ
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 group-hover:bg-red-50/50 group-hover:border-red-100 transition-colors">
                  <div className="font-mono text-lg font-bold text-gray-900 tracking-tight">
                    {report.phone_number}
                  </div>
                  {report.caller_name && (
                    <div className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                      <UserX className="w-3 h-3" /> {report.caller_name}
                    </div>
                  )}
                </div>

                {report.comment && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 pl-1 border-l-2 border-gray-100">
                    "{report.comment}"
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleVote(report.id, 'up')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700 transition text-xs font-bold group/btn"
                  >
                    <ThumbsUp className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    Faydalı ({report.votes_up || 0})
                  </button>
                  <button
                    onClick={() => handleVote(report.id, 'down')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-700 transition text-xs font-bold group/btn"
                  >
                    <ThumbsDown className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    Katılmıyorum ({report.votes_down || 0})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-gray-900 p-1.5 rounded-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">SpamBlocker</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2026 Tüm hakları saklıdır.
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
// BİLEŞEN: DASHBOARD (Junkboy Inspired Stats)
// -----------------------------------------------------------------------------
function DashboardPanel({ patterns }: { patterns: SpamPattern[] }) {
  const [stats, setStats] = useState({
    totalRules: 0,
    activeRegex: 0,
    activeKeywords: 0,
    underAttack: false
  });

  useEffect(() => {
    // İstatistikleri hesapla
    setStats({
      totalRules: patterns.length,
      activeRegex: patterns.filter(p => p.type === 'REGEX' && p.is_active).length,
      activeKeywords: patterns.filter(p => p.type === 'KEYWORD' && p.is_active).length,
      underAttack: false // TODO: DB'den çekilecek
    });
  }, [patterns]);

  return (
    <div className="grid gap-6 mb-8">
      {/* Üst Kartlar */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Toplam Kural</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalRules}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Regex Kalıpları</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeRegex}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Yasaklı Kelimeler</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeKeywords}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stats.underAttack ? 'bg-red-600' : 'bg-green-50'}`}>
              <Activity className={`w-6 h-6 ${stats.underAttack ? 'text-white' : 'text-green-600'}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Sistem Durumu</p>
              <h3 className={`text-xl font-bold ${stats.underAttack ? 'text-red-600' : 'text-green-600'}`}>
                {stats.underAttack ? 'SALDIRI ALTINDA' : 'Güvenli'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik Alanı (Mockup) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Kategori Dağılımı (Junkboy Analitiği)</h3>
        <div className="h-64 flex items-end justify-between gap-4 px-4">
          {[
            { label: 'Genel', h: '40%', color: 'bg-gray-200' },
            { label: 'Promosyon', h: '65%', color: 'bg-blue-400' },
            { label: 'İşlem', h: '30%', color: 'bg-green-400' },
            { label: 'Bildirim', h: '45%', color: 'bg-yellow-400' },
            { label: 'SPAM', h: '85%', color: 'bg-red-500' },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-full">
              <div className={`w-full rounded-t-xl transition-all duration-500 hover:opacity-80 ${bar.color}`} style={{ height: bar.h }}></div>
              <span className="text-xs font-bold text-gray-500">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BİLEŞEN: TEST FILTER (Canlı Simülasyon)
// -----------------------------------------------------------------------------
function TestFilterPanel({ patterns }: { patterns: SpamPattern[] }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState<FilterResult | null>(null);

  const handleTest = () => {
    if (!text) return;
    const res = filterMessage(text, patterns);
    setResult(res);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Zap className="w-6 h-6 text-yellow-500" /> Filtre Simülasyonu
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Test Edilecek Mesaj</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 transition h-32 resize-none"
            placeholder="Örn: Tebrikler! 1000 TL bonus kazandınız. Hemen tıkla: http://..."
          />
        </div>

        <button
          onClick={handleTest}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition shadow-lg"
        >
          Analiz Et
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-6 rounded-xl border ${result.isBlocked
              ? 'bg-red-50 border-red-200'
              : 'bg-green-50 border-green-200'
              }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${result.isBlocked ? 'bg-red-100' : 'bg-green-100'}`}>
                {result.isBlocked ? <AlertOctagon className="w-6 h-6 text-red-600" /> : <CheckCircle className="w-6 h-6 text-green-600" />}
              </div>
              <div>
                <h3 className={`text-lg font-bold ${result.isBlocked ? 'text-red-900' : 'text-green-900'}`}>
                  {result.isBlocked ? 'SPAM TESPİT EDİLDİ' : 'TEMİZ MESAJ'}
                </h3>
                <p className="text-sm opacity-80">Güven Skoru: %{(result.confidence * 100).toFixed(0)}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="opacity-60">Kategori:</span>
                <span className="font-bold">{result.category}</span>
              </div>
              {result.matchedRule && (
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="opacity-60">Eşleşen Kural:</span>
                  <span className="font-mono bg-white/50 px-2 rounded">{result.matchedRule}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BİLEŞEN: ADMIN PANEL (Mevcut Panel)
// -----------------------------------------------------------------------------
function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [rules, setRules] = useState<Rules>({ phones: [], keywords: [] });
  const [patterns, setPatterns] = useState<SpamPattern[]>([]);
  const [newValue, setNewValue] = useState('');
  const [type, setType] = useState<'PHONE' | 'KEYWORD'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Gelen Raporlar
  const [incomingReports, setIncomingReports] = useState<UserReport[]>([]);
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'RULES' | 'INBOX' | 'TEST'>('DASHBOARD');

  const fetchRules = async () => {
    setLoading(true);
    try {
      // 1. Eski kuralları çek
      const { data: oldRules } = await supabase
        .from('spam_rules')
        .select('type, value, description')
        .eq('is_active', true);

      if (oldRules) {
        const phones = oldRules.filter((item: any) => item.type === 'PHONE').map((item: any) => ({ value: item.value, description: item.description }));
        const keywords = oldRules.filter((item: any) => item.type === 'KEYWORD').map((item: any) => ({ value: item.value, description: item.description }));
        setRules({ phones, keywords });
      }

      // 2. Yeni Junkboy kurallarını çek
      const { data: newPatterns } = await supabase
        .from('spam_patterns')
        .select('*')
        .eq('is_active', true);

      if (newPatterns) {
        setPatterns(newPatterns as SpamPattern[]);
      }

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
    // Bu fonksiyonu artık KULLANMIYORUZ, ama kod içinde kalmış olabilir diye 
    // içeriğini "REJECTED" (Reddedildi) yapacak şekilde değiştiriyorum.
    // Böylece yanlışlıkla çağrılsa bile silmez, reddedildi olarak işaretler.
    await supabase
      .from('user_reports')
      .update({ status: 'REJECTED' })
      .eq('phone_number', phone);

    fetchIncomingReports();
  };

  const handleDeleteReport = async (id: number) => {
    // Sil butonu da artık silmesin, "REJECTED" (Reddedildi/Gizlendi) yapsın
    await supabase
      .from('user_reports')
      .update({ status: 'REJECTED' })
      .eq('id', id);

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
              <div className="flex gap-4 mt-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveTab('DASHBOARD')}
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition ${activeTab === 'DASHBOARD' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('RULES')}
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition ${activeTab === 'RULES' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                >
                  Kurallar
                </button>
                <button
                  onClick={() => setActiveTab('INBOX')}
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition flex items-center gap-2 ${activeTab === 'INBOX' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                >
                  Gelen Kutusu
                  <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-xs font-bold">{incomingReports.length}</span>
                </button>
                <button
                  onClick={() => setActiveTab('TEST')}
                  className={`text-sm font-medium whitespace-nowrap pb-1 border-b-2 transition flex items-center gap-2 ${activeTab === 'TEST' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                >
                  <Zap className="w-3 h-3" /> Test Et
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

        {activeTab === 'DASHBOARD' && (
          <DashboardPanel patterns={patterns} />
        )}

        {activeTab === 'TEST' && (
          <TestFilterPanel patterns={patterns} />
        )}

        {activeTab === 'RULES' && (
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
                        type="button"
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
                        type="button"
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
        )}

        {activeTab === 'INBOX' && (
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
// BİLEŞEN: MAIN APP COMPONENT
// -----------------------------------------------------------------------------
// Version: 1.0.2 (Force Rebuild)
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
