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
import './CelluloseTheme.css';

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
// BİLEŞEN: LANDING PAGE (CELLULOSE EDITION)
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

    // Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const fetchRecentReports = async () => {
    const { data } = await supabase
      .from('user_reports')
      .select('*')
      .neq('status', 'REJECTED')
      .order('created_at', { ascending: false })
      .limit(8);

    if (data) setRecentReports(data);
  };

  const categories = [
    { id: 'Telemarketing / Satış', label: 'Telemarketing / Satış' },
    { id: 'Dolandırıcılık / Fraud', label: 'Dolandırıcılık / Fraud' },
    { id: 'Anket / Araştırma', label: 'Anket / Araştırma' },
    { id: 'Siyasi Propaganda', label: 'Siyasi Propaganda' },
    { id: 'Bahis / Kumar', label: 'Bahis / Kumar' },
    { id: 'Borç Tahsilatı', label: 'Borç Tahsilatı' },
    { id: 'Taciz / Şaka', label: 'Taciz / Şaka' },
    { id: 'Diğer', label: 'Diğer' },
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
          status: 'PENDING'
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
      .eq('phone_number', searchQuery)
      .neq('status', 'REJECTED');

    if (count && count > 0) {
      setReportCount(count);
      setSearchResult('SUSPICIOUS');
    } else {
      setSearchResult('CLEAN');
    }
  };

  return (
    <>
      <svg className="texture-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <header>
        <div className="logo">
          <h2 style={{ fontSize: '1.5rem' }}>Spam Blocker</h2>
        </div>
        <nav>
          <a href="/">Ana Sayfa</a>
          <a href="#search">Sorgula</a>
          <a href="#report">Spam Bildir</a>
          <a href="/about">Hakkımızda</a>
          <a href="#" style={{ border: '2px solid var(--ink)', padding: '0.5rem 1rem' }}>Uygulamayı İndir</a>
        </nav>
      </header>

      <main className="container">
        {/* Hero Section */}
        <section className="hero" data-reveal>
          <div>
            <p className="mono" style={{ marginBottom: '1rem' }}>🔍 Türkiye'nin En Kapsamlı Veritabanı</p>
            <h1>Bu Numara Güvenli mi?</h1>

            {/* Search Result Display */}
            <AnimatePresence>
              {searchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 border-2 border-black"
                  style={{
                    background: searchResult === 'SPAM' ? 'var(--accent-red)' : searchResult === 'SUSPICIOUS' ? '#f1c40f' : '#2ecc71',
                    color: searchResult === 'SPAM' ? 'white' : 'black'
                  }}
                >
                  <h3 className="text-2xl mb-2">
                    {searchResult === 'SPAM' ? 'TEHLİKELİ NUMARA' : searchResult === 'SUSPICIOUS' ? 'ŞÜPHELİ NUMARA' : 'TEMİZ GÖRÜNÜYOR'}
                  </h3>
                  <p className="mono text-sm">
                    {searchResult === 'SPAM'
                      ? 'SİSTEM TARAFINDAN ONAYLANMIŞ SPAM KAYDI BULUNDU.'
                      : searchResult === 'SUSPICIOUS'
                        ? `BU NUMARA HAKKINDA ${reportCount} ADET DOĞRULANMAMIŞ ŞİKAYET MEVCUT.`
                        : 'VERİTABANINDA KAYIT BULUNAMADI.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="search-module">
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              <input
                type="text"
                placeholder="Telefon Numarası Girin (Örn: 0555...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Sorgula</button>
            </form>
          </div>
        </section>

        {/* Reporting Form & Instructions */}
        <div className="grid-layout">
          <aside data-reveal>
            <h3 style={{ marginBottom: '3rem', fontSize: '2rem' }}>Spam Bildirimi Nasıl Yapılır?</h3>
            <div className="instruction-step" data-step="01">
              <h4 className="mono">Numarayı Girin</h4>
              <p>Sizi arayan numarayı formdaki ilgili alana eksiksiz girin.</p>
            </div>
            <div className="instruction-step" data-step="02">
              <h4 className="mono">Kategori Seçin</h4>
              <p>Telemarketing, dolandırıcılık veya anket gibi türü belirleyin.</p>
            </div>
            <div className="instruction-step" data-step="03">
              <h4 className="mono">Detayları Paylaşın</h4>
              <p>Ne söylediler, nasıl davrandılar? Diğer kullanıcıları uyarın.</p>
            </div>
            <div className="instruction-step" data-step="04">
              <h4 className="mono">Raporu Gönderin</h4>
              <p>Onaylayın ve topluluğumuzu daha güvenli hale getirin.</p>
            </div>
          </aside>

          <section className="report-form" data-reveal id="report">
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent-red)' }}>🚩 Rapor Formu</h3>

            {reportStatus === 'success' && (
              <div style={{ padding: '1rem', background: '#2ecc71', color: 'white', fontWeight: 'bold' }}>
                RAPORUNUZ BAŞARIYLA ALINDI!
              </div>
            )}

            {reportStatus === 'error' && (
              <div style={{ padding: '1rem', background: 'var(--accent-red)', color: 'white', fontWeight: 'bold' }}>
                BİR HATA OLUŞTU. LÜTFEN TEKRAR DENEYİN.
              </div>
            )}

            <form onSubmit={handleReport} className="report-form">
              <div className="form-group">
                <label>Telefon Numarası *</label>
                <input
                  type="text"
                  placeholder="örn: 0212 922 42 89"
                  value={reportPhone}
                  onChange={(e) => setReportPhone(e.target.value)}
                  required
                />
                <small className="mono" style={{ opacity: 0.6, fontSize: '0.6rem' }}>Numarayı istediğiniz formatta girebilirsiniz (boşluk, tire kullanabilirsiniz)</small>
              </div>

              <div className="form-group">
                <label>Arama Türü *</label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  required
                >
                  <option value="">Lütfen bir kategori seçin...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="form-group">
                  <label>Arayan Adı / Firma</label>
                  <input
                    type="text"
                    placeholder="Örn: ABC Şirketi"
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Arama Tarihi & Saat</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="date"
                      value={callDate}
                      onChange={(e) => setCallDate(e.target.value)}
                      style={{ width: '60%' }}
                    />
                    <input
                      type="time"
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Detaylı Açıklama</label>
                <textarea
                  rows={4}
                  placeholder="Arama hakkında detaylı bilgi verin..."
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                ></textarea>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mono">
                  <span style={{ fontSize: '0.65rem' }}>{reportComment.length} / 500 karakter</span>
                  <span style={{ fontSize: '0.65rem' }}>{500 - reportComment.length} karakter kaldı</span>
                </div>
              </div>

              <div className="form-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setReportPhone('');
                    setReportCategory('');
                    setReportComment('');
                    setCallerName('');
                  }}
                >
                  İptal
                </button>
                <button type="submit" className="btn-primary" disabled={isReporting}>
                  {isReporting ? 'Gönderiliyor...' : '🚩 Raporu Gönder'}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Recent Complaints */}
        <section className="complaints-feed" data-reveal>
          <h3 style={{ marginBottom: '2rem', borderBottom: '2px solid var(--ink)', paddingBottom: '1rem' }}>Son Şikayetler</h3>

          {recentReports.map((report) => (
            <div key={report.id} className="complaint-card">
              <div className="complaint-meta">
                <span className="mono">{new Date(report.created_at).toLocaleDateString('tr-TR')}</span>
                <span className="tag" style={report.category.includes('Dolandırıcılık') ? { background: 'var(--accent-red)' } : {}}>
                  {report.category}
                </span>
                <strong style={{ marginTop: '0.5rem' }}>{report.phone_number}</strong>
                {report.status === 'APPROVED' && (
                  <span style={{ color: '#2ecc71', fontSize: '0.7rem', fontWeight: 'bold' }}>✓ DOĞRULANMIŞ</span>
                )}
              </div>
              <div className="complaint-body">
                <p style={{ fontStyle: 'italic' }}>
                  "{report.comment || 'Açıklama yok.'}"
                </p>
                <p className="mono" style={{ marginTop: '1rem', opacity: 0.6 }}>
                  — {report.caller_name ? `Arayan: ${report.caller_name}` : 'Bilinmeyen Arayan'} ({report.reporter_name || 'Misafir'})
                </p>
              </div>
              <div className="actions">
                <button className="action-btn">Faydalı</button>
                <button className="action-btn">Katılmıyorum</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Spam Blocker</h2>
            <p style={{ maxWidth: '400px', opacity: 0.7 }}>Spam numaraları ayıklamak, topluluğu bilgilendirmek ve huzurlu bir iletişim sağlamak için geliştirilmiş web ve mobil uygulaması.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="mono">© 2026 Spam Blocker. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </>
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
      <>
        <div className="texture-overlay"></div>
        <header className="cellulose-header">
          <div className="flex items-center gap-2">
            <div style={{ width: 24, height: 24, background: 'var(--accent-red)' }}></div>
            <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', fontSize: '1.2rem' }}>SPAM BLOCKER</span>
          </div>
          <nav className="cellulose-nav hidden md:block">
            <a href="/">ANA SAYFA</a>
            <a href="/#search">SORGULA</a>
            <a href="/#report">RAPOR ET</a>
            <a href="/about" className="font-bold">HAKKIMIZDA</a>
            <a href="/admin" className="mono" style={{ fontSize: '0.8rem', opacity: 0.5 }}>LOGIN</a>
          </nav>
        </header>
        <AboutPage />
        <footer className="mt-20 py-8 border-t-2 border-black text-center mono text-sm opacity-50">
          &copy; 2026 SPAM BLOCKER. CELLULOSE EDITION.
        </footer>
      </>
    );
  }

  // Varsayılan olarak Landing Page göster
  return <LandingPage />;
}

export default App;
