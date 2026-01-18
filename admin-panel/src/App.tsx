import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Shield, Plus, RefreshCw, Trash2, Smartphone,
  MessageSquare, Lock, LogOut, CheckCircle, Download,
  Menu, X, AlertTriangle, Phone, AlertOctagon,
  CreditCard, UserX, HelpCircle, Activity, Search,
  MessageCircle, User, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUPABASE AYARLARI ---
const SUPABASE_URL = 'https://wxpkbziqobdcgluyiwar.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4TVY6GAVzk-kOXJkOJfRKg_HqV1_ggq';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Rules {
  phones: string[];
  keywords: string[];
}

interface UserReport {
  id: number;
  phone_number: string;
  category: string;
  comment?: string;
  reporter_name?: string;
  created_at: string;
}

// -----------------------------------------------------------------------------
// BİLEŞEN: LANDING PAGE (Modern & Interaktif)
// -----------------------------------------------------------------------------
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reportPhone, setReportPhone] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Sorgulama & Akış State'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null); // null, 'CLEAN', 'SPAM'
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
    { id: 'SCAM', label: 'Dolandırıcılık', icon: AlertOctagon, color: 'bg-red-100 text-red-700 border-red-200' },
    { id: 'GAMBLING', label: 'Bahis / Kumar', icon: CreditCard, color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { id: 'SALES', label: 'Tele-Satış', icon: Phone, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'HARASSMENT', label: 'Taciz', icon: UserX, color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { id: 'OTHER', label: 'Diğer', icon: HelpCircle, color: 'bg-gray-100 text-gray-700 border-gray-200' },
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
          reporter_name: 'Misafir Kullanıcı',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      setReportStatus('success');
      setReportPhone('');
      setReportCategory('');
      setReportComment('');
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
    // Basit bir simülasyon: Gerçekte spam_rules tablosuna bakılmalı
    const { data } = await supabase
      .from('spam_rules')
      .select('*')
      .eq('type', 'PHONE')
      .eq('value', searchQuery)
      .maybeSingle();

    if (data) {
      setSearchResult('SPAM');
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-tr from-red-600 to-orange-500 p-2 rounded-xl shadow-lg shadow-red-200">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Spam Blocker
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#search" className="text-gray-600 hover:text-red-600 font-medium transition">Sorgula</a>
              <a href="#report" className="text-gray-600 hover:text-red-600 font-medium transition">Şikayet Et</a>
              <a href="#recent" className="text-gray-600 hover:text-red-600 font-medium transition">Son Şikayetler</a>
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
                    : 'bg-green-50 border-green-200 text-green-800'
                  }`}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  {searchResult === 'SPAM' ? <AlertOctagon className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                  <h3 className="text-2xl font-bold">
                    {searchResult === 'SPAM' ? 'Tehlikeli Numara!' : 'Temiz Görünüyor'}
                  </h3>
                </div>
                <p>
                  {searchResult === 'SPAM'
                    ? 'Bu numara sistemimizde SPAM olarak işaretlenmiş.'
                    : 'Veritabanımızda bu numarayla ilgili henüz bir kayıt yok.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Report Section */}
      <div id="report" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>

            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Katkıda Bulun & Yorum Yap</h3>
              <p className="text-gray-500">Şüpheli numaraları bildirerek topluluğu koruyun.</p>
            </div>

            <form onSubmit={handleReport} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası</label>
                  <input
                    type="tel"
                    placeholder="0555 123 45 67"
                    value={reportPhone}
                    onChange={(e) => setReportPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İsim (İsteğe Bağlı)</label>
                  <input
                    type="text"
                    placeholder="Misafir Kullanıcı"
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Seçin</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setReportCategory(cat.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${reportCategory === cat.id
                          ? `${cat.color} ring-2 ring-offset-2 ring-red-100 scale-105 shadow-md`
                          : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                        }`}
                    >
                      <cat.icon className="w-5 h-5" />
                      <span className="text-[10px] font-bold text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yorumunuz (İsteğe Bağlı)</label>
                <textarea
                  rows={3}
                  placeholder="Beni arayıp bahis sitesine üye olmamı istediler..."
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isReporting}
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isReporting ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Raporu Gönder'}
              </motion.button>
            </form>
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
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
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

                <div className="bg-gray-50 p-3 rounded-lg font-mono text-lg font-bold text-gray-800 mb-3 tracking-wide">
                  {report.phone_number.substring(0, report.phone_number.length - 4)}****
                </div>

                {report.comment && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
            &copy; 2024 Spam Blocker. Tüm hakları saklıdır.
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
        .select('type, value')
        .eq('is_active', true);

      if (error) throw error;

      const phones = data.filter((item: any) => item.type === 'PHONE').map((item: any) => item.value);
      const keywords = data.filter((item: any) => item.type === 'KEYWORD').map((item: any) => item.value);

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
    const { data } = await supabase
      .from('user_reports')
      .select('*')
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
    // 1. spam_rules'a ekle
    const { error: insertError } = await supabase
      .from('spam_rules')
      .insert([{ type: 'PHONE', value: report.phone_number, category: report.category, is_active: true }]);

    if (insertError) {
      console.error(insertError);
      setMessage('Ekleme başarısız (Zaten ekli olabilir)');
      return;
    }

    // 2. user_reports'tan sil (veya işlendi olarak işaretle)
    await handleDeleteReport(report.id);

    setMessage('Rapor onaylandı ve spam listesine eklendi.');
    fetchRules();
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
                      <span className="font-mono text-gray-700 font-medium">{phone}</span>
                      <button
                        onClick={() => handleDelete(phone, 'PHONE')}
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
                      <span className="font-medium text-gray-700">{kw}</span>
                      <button
                        onClick={() => handleDelete(kw, 'KEYWORD')}
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

  // Varsayılan olarak Landing Page göster
  return <LandingPage />;
}

export default App;
