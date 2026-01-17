import { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Plus, RefreshCw, Trash2, Smartphone, MessageSquare } from 'lucide-react';

// API URL (Backend localhost:3000)
const API_URL = 'http://localhost:3000/api/v1/rules';

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
      const res = await axios.get(`${API_URL}/sync`);
      setRules({
        phones: res.data.phones,
        keywords: res.data.keywords
      });
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

  // Yeni Kural Ekle
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue) return;

    try {
      await axios.post(API_URL, {
        type,
        value: newValue,
        category: 'SCAM',
        isActive: true
      });
      setNewValue('');
      fetchRules(); // Listeyi yenile
      setMessage('Başarıyla eklendi!');
    } catch (err) {
      console.error(err);
      setMessage('Ekleme hatası!');
    }
  };

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
              <p className="text-gray-500 text-sm">Remote Rule Management System</p>
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
                  <button className="text-gray-400 hover:text-red-600">
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
                  <button className="text-gray-400 hover:text-red-600">
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
