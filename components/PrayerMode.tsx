
import React, { useState } from 'react';
import { Heart, Send, X, Plus, Clock, Users, BookOpen, ChevronDown, ChevronUp, Flag } from 'lucide-react';

interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  title: string;
  description: string;
  category: 'saude' | 'familia' | 'trabalho' | 'relacionamento' | 'espiritual' | 'financeiro' | 'outro';
  prayerCount: number;
  hasPrayed: boolean;
  isAnonymous: boolean;
  responses: PrayerResponse[];
  createdAt: string;
  isUrgent: boolean;
}

interface PrayerResponse {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: string;
}

interface PrayerModeProps {
  currentUserId: string;
  currentUserName: string;
  currentUserPhoto: string;
}

const SAMPLE_PRAYERS: PrayerRequest[] = [];

const CATEGORIES = [
  { key: 'todos', label: 'Todos', emoji: '🙏' },
  { key: 'saude', label: 'Saúde', emoji: '🏥' },
  { key: 'familia', label: 'Família', emoji: '👨‍👩‍👧‍👦' },
  { key: 'trabalho', label: 'Trabalho', emoji: '💼' },
  { key: 'relacionamento', label: 'Relacionamento', emoji: '💑' },
  { key: 'espiritual', label: 'Espiritual', emoji: '✝️' },
  { key: 'financeiro', label: 'Financeiro', emoji: '💰' },
];

const PrayerMode: React.FC<PrayerModeProps> = ({ currentUserId, currentUserName, currentUserPhoto }) => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showNewPrayer, setShowNewPrayer] = useState(false);
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<{ [key: string]: string }>({});
  
  // New prayer form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<PrayerRequest['category']>('espiritual');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const filteredPrayers = selectedCategory === 'todos' ? prayers : prayers.filter(p => p.category === selectedCategory);

  const handlePray = (prayerId: string) => {
    setPrayers(prev => prev.map(p => p.id === prayerId ? { ...p, hasPrayed: !p.hasPrayed, prayerCount: p.hasPrayed ? p.prayerCount - 1 : p.prayerCount + 1 } : p));
  };

  const handleResponse = (prayerId: string) => {
    const text = responseText[prayerId];
    if (!text?.trim()) return;
    const newResponse: PrayerResponse = {
      id: `r-${Date.now()}`, userId: currentUserId, userName: currentUserName,
      userPhoto: currentUserPhoto, text: text.trim(), createdAt: 'agora'
    };
    setPrayers(prev => prev.map(p => p.id === prayerId ? { ...p, responses: [...p.responses, newResponse] } : p));
    setResponseText(prev => ({ ...prev, [prayerId]: '' }));
  };

  const handleNewPrayer = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    const newPrayer: PrayerRequest = {
      id: `pr-${Date.now()}`, userId: isAnonymous ? 'anonymous' : currentUserId,
      userName: isAnonymous ? 'Anônimo' : currentUserName,
      userPhoto: isAnonymous ? '' : currentUserPhoto,
      title: newTitle, description: newDescription, category: newCategory,
      prayerCount: 0, hasPrayed: false, isAnonymous, responses: [],
      createdAt: 'agora', isUrgent
    };
    setPrayers([newPrayer, ...prayers]);
    setNewTitle(''); setNewDescription(''); setIsAnonymous(false); setIsUrgent(false);
    setShowNewPrayer(false);
  };

  const getCategoryEmoji = (cat: string) => {
    return CATEGORIES.find(c => c.key === cat)?.emoji || '🙏';
  };

  const totalPrayers = prayers.reduce((acc, p) => acc + p.prayerCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-slate-50">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">Modo Oração</h2>
            <p className="text-xs text-slate-400 mt-1">Ore e seja orado pela comunidade</p>
          </div>
          <button onClick={() => setShowNewPrayer(true)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-all text-sm">
            <Plus size={16}/> Pedir Oração
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-indigo-50 rounded-2xl p-3 text-center border border-indigo-100">
            <p className="text-2xl font-black text-indigo-600">{prayers.length}</p>
            <p className="text-[10px] font-bold text-indigo-400 uppercase">Pedidos</p>
          </div>
          <div className="flex-1 bg-amber-50 rounded-2xl p-3 text-center border border-amber-100">
            <p className="text-2xl font-black text-amber-600">{totalPrayers}</p>
            <p className="text-[10px] font-bold text-amber-400 uppercase">Orações</p>
          </div>
          <div className="flex-1 bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-100">
            <p className="text-2xl font-black text-emerald-600">{prayers.filter(p => p.isUrgent).length}</p>
            <p className="text-[10px] font-bold text-emerald-400 uppercase">Urgentes</p>
          </div>
        </div>

        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto mt-4 pb-1 -mx-2 px-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Versículo do dia */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Versículo para Oração</span>
        </div>
        <p className="text-sm font-medium leading-relaxed italic">"Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus."</p>
        <p className="text-xs mt-2 opacity-70 font-bold">Filipenses 4:6</p>
      </div>

      {/* Lista de Pedidos */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {filteredPrayers.map(prayer => (
          <div key={prayer.id} className={`bg-white rounded-3xl shadow-sm border overflow-hidden transition-all ${prayer.isUrgent ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-100'}`}>
            {prayer.isUrgent && (
              <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest text-center py-1.5">
                Pedido Urgente
              </div>
            )}
            
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                {prayer.isAnonymous ? (
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                    <Users size={18} />
                  </div>
                ) : (
                  <img src={prayer.userPhoto} className="w-10 h-10 rounded-full object-cover" />
                )}
                <div className="flex-1">
                  <span className="font-bold text-slate-800 text-sm">{prayer.userName}</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{getCategoryEmoji(prayer.category)} {CATEGORIES.find(c => c.key === prayer.category)?.label}</span>
                    <span>· {prayer.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <h4 className="font-bold text-slate-800 mb-1.5">{prayer.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{prayer.description}</p>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                <button
                  onClick={() => handlePray(prayer.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                    prayer.hasPrayed
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}
                >
                  🙏 {prayer.hasPrayed ? 'Orei!' : 'Orar'} · {prayer.prayerCount}
                </button>
                <button
                  onClick={() => setExpandedPrayer(expandedPrayer === prayer.id ? null : prayer.id)}
                  className="flex items-center gap-1.5 text-slate-400 text-sm font-medium"
                >
                  <span>{prayer.responses.length} respostas</span>
                  {expandedPrayer === prayer.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
              </div>

              {/* Responses */}
              {expandedPrayer === prayer.id && (
                <div className="mt-4 pt-3 border-t border-slate-50">
                  {prayer.responses.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {prayer.responses.map(resp => (
                        <div key={resp.id} className="flex gap-2.5">
                          <img src={resp.userPhoto} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                          <div className="bg-indigo-50/50 rounded-2xl px-3.5 py-2.5 flex-1 border border-indigo-50">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800">{resp.userName}</span>
                              <span className="text-[10px] text-slate-300">{resp.createdAt}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{resp.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={responseText[prayer.id] || ''}
                      onChange={e => setResponseText(prev => ({ ...prev, [prayer.id]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && handleResponse(prayer.id)}
                      placeholder="Deixe uma palavra de encorajamento..."
                      className="flex-1 bg-slate-50 rounded-full px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-100"
                    />
                    <button onClick={() => handleResponse(prayer.id)} className="p-2.5 bg-indigo-500 text-white rounded-full active:scale-90 transition-all shadow-lg">
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Novo Pedido */}
      {showNewPrayer && (
        <div className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-slate-800">Pedir Oração</h3>
              <button onClick={() => setShowNewPrayer(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={18}/></button>
            </div>

            {/* Categoria */}
            <div className="mb-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {(['saude', 'familia', 'trabalho', 'relacionamento', 'espiritual', 'financeiro', 'outro'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setNewCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      newCategory === cat ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    {getCategoryEmoji(cat)} {CATEGORIES.find(c => c.key === cat)?.label || 'Outro'}
                  </button>
                ))}
              </div>
            </div>

            {/* Título */}
            <div className="mb-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Título do Pedido</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Ex: Cura, direção, restauração..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Descrição */}
            <div className="mb-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Descrição</label>
              <textarea
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Compartilhe seu pedido de oração com a comunidade..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-28"
              />
            </div>

            {/* Opções */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all ${
                  isAnonymous ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <Users size={14}/> Anônimo
              </button>
              <button
                onClick={() => setIsUrgent(!isUrgent)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all ${
                  isUrgent ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <Clock size={14}/> Urgente
              </button>
            </div>

            <button
              onClick={handleNewPrayer}
              disabled={!newTitle.trim() || !newDescription.trim()}
              className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-all disabled:opacity-40"
            >
              Enviar Pedido de Oração
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerMode;
