import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Shield, Plus, RefreshCw, Trash2, Smartphone, 
  MessageSquare, Lock, LogOut, CheckCircle, Download,
  Menu, X
} from 'lucide-react';

// --- SUPABASE AYARLARI ---
const SUPABASE_URL = 'https://wxpkbziqobdcgluyiwar.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4TVY6GAVzk-kOXJkOJfRKg_HqV1_ggq';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Rules {
  phones: string[];
  keywords: string[];
}

// -----------------------------------------------------------------------------
// BİLEŞEN: LANDING PAGE (SaaS Tanıtım Sayfası)
// -----------------------------------------------------------------------------
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-red-600 fill-red-100" />
              <span className="text-xl font-bold tracking-tight">Spam Blocker</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-red-600 transition">Özellikler</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-red-600 transition">Nasıl Çalışır?</a>
              <button className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition font-medium shadow-lg shadow-red-200">
                Hemen İndir
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
            <a href="#features" className="block text-gray-600 font-medium">Özellikler</a>
            <a href="#how-it-works" className="block text-gray-600 font-medium">Nasıl Çalışır?</a>
            <button className="w-full bg-red-600 text-white px-5 py-2 rounded-lg font-medium">
              Hemen İndir
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            İstenmeyen Aramalara <br />
            <span className="text-red-600">Kesin Çözüm</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Gelişmiş yapay zeka ve topluluk destekli veritabanı ile spam aramaları, dolandırıcıları ve rahatsız edici mesajları anında engelleyin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              <Download className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Google Play'den</div>
                <div className="text-lg font-bold leading-none">İndir</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              <Download className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400">App Store'dan</div>
                <div className="text-lg font-bold leading-none">İndir</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Spam Blocker?</h2>
            <p className="text-gray-600">Sizi güvende tutmak için en son teknolojiyi kullanıyoruz.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Akıllı Filtreleme",
                desc: "Yapay zeka destekli algoritmamız spam aramaları %99 doğrulukla tespit eder.",
                icon: Shield
              },
              {
                title: "Topluluk Veritabanı",
                desc: "Milyonlarca kullanıcıdan gelen geri bildirimlerle sürekli güncellenen kara liste.",
                icon: Smartphone
              },
              {
                title: "SMS Koruması",
                desc: "Dolandırıcılık ve bahis mesajlarını otomatik olarak gereksiz kutusuna taşır.",
                icon: MessageSquare
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition border border-gray-100">
                <div className="bg-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-red-600">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
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
      return <LoginPage onLogin={() => {}} />; // Session değişince zaten App re-render olacak
    }
    return <AdminPanel onLogout={() => {}} />;
  }

  // Varsayılan olarak Landing Page göster
  return <LandingPage />;
}

export default App;
