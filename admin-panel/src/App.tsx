import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Shield, Plus, RefreshCw, Trash2, Smartphone, MessageSquare } from 'lucide-react';

// --- SUPABASE AYARLARI ---
// Bu bilgileri supabase.com'dan alıp buraya yapıştıracaksın.
// Güvenlik notu: Anon key public olarak client-side'da kullanılabilir.
const SUPABASE_URL = 'https://wxpkbziqobdcgluyiwar.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4TVY6GAVzk-kOXJkOJfRKg_HqV1_ggq';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Rules {
  phones: string[];
  keywords: string[];
}

function App() {
  const [rules, setRules] = useState<Rules>({ phones: [], keywords: [] });
  const [newValue, setNewValue] = useState('');
  const [type, setType] = useState<'PHONE' | 'KEYWORD'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Kuralları Yükle
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
    // URL kontrolü (Kullanıcı henüz girmemişse hata vermesin)
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
      fetchRules();
    }
  }, []);

  // Yeni Kural Ekle
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
      fetchRules(); // Listeyi yenile
      setMessage('Başarıyla eklendi!');
    } catch (err) {
      console.error(err);
      setMessage('Ekleme hatası!');
    }
  };

  // Kural Sil
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

  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Kurulum Gerekli</h1>
          <p className="text-gray-600 mb-4">
            Lütfen <code>App.tsx</code> dosyasını açıp Supabase URL ve Anon Key bilgilerinizi girin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Shield className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Spam Blocker Admin</h1>
              <p className="text-gray-500 text-sm">Supabase Cloud Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {message && <span className="text-green-600 font-medium animate-pulse">{message}</span>}
            <button 
              onClick={fetchRules} 
              disabled={loading}
              className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Ekleme Formu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-red-600" /> Yeni Kural Ekle
          </h2>
          <form onSubmit={handleAdd} className="flex gap-4">
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as 'PHONE' | 'KEYWORD')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="PHONE">Telefon Numarası</option>
              <option value="KEYWORD">Yasaklı Kelime</option>
            </select>
            <input 
              type="text" 
              placeholder={type === 'PHONE' ? "+90555..." : "Örn: bahis, bonus..."}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button 
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Ekle & Yayınla
            </button>
          </form>
        </div>

        {/* Listeler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Telefon Listesi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex justify-between items-center">
              <h3 className="font-semibold text-red-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5" /> Engellenen Numaralar
              </h3>
              <span className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                {rules.phones.length}
              </span>
            </div>
            <ul className="divide-y divide-gray-100">
              {rules.phones.map((phone, i) => (
                <li key={i} className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                  <span className="font-mono text-gray-700">{phone}</span>
                  <button 
                    onClick={() => handleDelete(phone, 'PHONE')}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
              {rules.phones.length === 0 && <li className="p-6 text-center text-gray-400">Liste boş</li>}
            </ul>
          </div>

          {/* Keyword Listesi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex justify-between items-center">
              <h3 className="font-semibold text-orange-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Yasaklı Kelimeler
              </h3>
              <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-bold">
                {rules.keywords.length}
              </span>
            </div>
            <ul className="divide-y divide-gray-100">
              {rules.keywords.map((kw, i) => (
                <li key={i} className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                  <span className="font-medium text-gray-700">{kw}</span>
                  <button 
                    onClick={() => handleDelete(kw, 'KEYWORD')}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
              {rules.keywords.length === 0 && <li className="p-6 text-center text-gray-400">Liste boş</li>}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
