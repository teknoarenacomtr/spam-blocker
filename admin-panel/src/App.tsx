import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Shield, Plus, RefreshCw, Trash2, Smartphone,
  MessageSquare, Lock, LogOut, CheckCircle, Download,
  Menu, X, AlertTriangle, Phone, AlertOctagon,
  CreditCard, UserX, HelpCircle, Activity, Search
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

// -----------------------------------------------------------------------------
// BİLEŞEN: LANDING PAGE (Modern & Interaktif)
// -----------------------------------------------------------------------------
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reportPhone, setReportPhone] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      setReportStatus('success');
      setReportPhone('');
      setReportCategory('');
      setTimeout(() => setReportStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setReportStatus('error');
    } finally {
      setIsReporting(false);
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
              <a href="#report" className="text-gray-600 hover:text-red-600 font-medium transition">Şikayet Et</a>
              <a href="#features" className="text-gray-600 hover:text-red-600 font-medium transition">Özellikler</a>
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

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
              🚀 Yapay Zeka Destekli Koruma
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Spam Aramalara <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Dur De!
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Rahatsız edici aramaları, dolandırıcıları ve bahis mesajlarını saniyeler içinde engelleyin. Topluluk gücüyle güvende kalın.
            </p>
          </motion.div>

          {/* Reporting Card */}
          <motion.div
            id="report"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>

            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Şüpheli Numara Bildir</h3>
              <p className="text-gray-500">Topluluğu korumak için spam numaraları raporlayın.</p>
            </div>

            <form onSubmit={handleReport} className="space-y-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="tel"
                  placeholder="Örn: 0555 123 45 67"
                  value={reportPhone}
                  onChange={(e) => setReportPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-mono"
                  required
                />
              </div>

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
                    <cat.icon className="w-6 h-6" />
                    <span className="text-xs font-semibold text-center">{cat.label}</span>
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isReporting}
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-xl shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isReporting ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : reportStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-6 h-6" /> Rapor Gönderildi
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6" /> Şikayet Et
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden Spam Blocker?</h2>
            <p className="text-xl text-gray-500">Güvenliğiniz için geliştirilen modern teknolojiler.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Akıllı Filtreleme",
                desc: "Yapay zeka algoritmamız spam aramaları %99 doğrulukla analiz eder.",
                icon: Shield,
                color: "text-blue-600 bg-blue-50"
              },
              {
                title: "Canlı Veritabanı",
                desc: "Sizin gibi kullanıcıların raporlarıyla veritabanımız her saniye güncellenir.",
                icon: Activity,
                color: "text-green-600 bg-green-50"
              },
              {
                title: "SMS Kalkanı",
                desc: "Rahatsız edici pazarlama mesajlarını otomatik olarak engeller.",
                icon: MessageSquare,
                color: "text-purple-600 bg-purple-50"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/10 p-2 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl">Spam Blocker</span>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="hover:text-white transition">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition">Kullanım Şartları</a>
              <a href="#" className="hover:text-white transition">İletişim</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Spam Blocker. Tüm hakları saklıdır.
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

  useEffect(() => {
    fetchRules();
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-red-600 p-2.5 rounded-xl shadow-md shadow-red-100">
              <Shield className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Yönetim Paneli</h1>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Sistem Aktif
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {message && (
              <span className="hidden md:flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full border border-green-100">
                <CheckCircle className="w-4 h-4" /> {message}
              </span>
            )}
            <button
              onClick={fetchRules}
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
