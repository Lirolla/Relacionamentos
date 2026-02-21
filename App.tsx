
import React, { useState, useMemo } from 'react';
import { INITIAL_STATE } from './constants';
import { Profile, Match, UserRole, Message, AppFilters } from './types';
import Navigation from './components/Navigation';
import SwipeCard from './components/SwipeCard';
import AdminPanel from './components/AdminPanel';
import { getDivineInsight } from './services/geminiService';
import { Heart, MessageSquare, Sparkles, Send, ArrowLeft, Church, ShieldCheck, Star, Camera, Save, MapPin, SlidersHorizontal, Ruler, UserCheck, X } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'swipe' | 'chat' | 'profile' | 'admin' | 'favorites'>('swipe');
  const [activeChat, setActiveChat] = useState<Match | null>(null);
  const [matchModal, setMatchModal] = useState<Profile | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [insight, setInsight] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(state.currentUser);

  // Função simples de cálculo de distância (Haversine simplificado para demo)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredAndSortedProfiles = useMemo(() => {
    return state.profiles
      .filter(p => {
        if (state.swipedLeft.includes(p.id) || state.swipedRight.includes(p.id)) return false;
        
        // Filtros Ativos
        const distance = p.coordinates ? calculateDistance(
          state.currentUser.coordinates!.lat, state.currentUser.coordinates!.lng,
          p.coordinates.lat, p.coordinates.lng
        ) : 999;

        if (distance > state.filters.maxDistance) return false;
        if (p.age < state.filters.minAge || p.age > state.filters.maxAge) return false;
        
        if (state.filters.preferredHeight && p.physical?.height && p.physical.height < state.filters.preferredHeight) return false;
        if (state.filters.preferredHairColor && p.physical?.hairColor !== state.filters.preferredHairColor) return false;
        
        return true;
      })
      .sort((a, b) => {
        // Ordenação por Proximidade: mesma igreja primeiro
        if (a.churchName === state.currentUser.churchName) return -1;
        if (b.churchName === state.currentUser.churchName) return 1;
        
        const distA = a.coordinates ? calculateDistance(state.currentUser.coordinates!.lat, state.currentUser.coordinates!.lng, a.coordinates.lat, a.coordinates.lng) : 999;
        const distB = b.coordinates ? calculateDistance(state.currentUser.coordinates!.lat, state.currentUser.coordinates!.lng, b.coordinates.lat, b.coordinates.lng) : 999;
        return distA - distB;
      });
  }, [state.profiles, state.swipedLeft, state.swipedRight, state.filters, state.currentUser]);

  const currentProfile = filteredAndSortedProfiles[0];

  const handleSwipeRight = async (profileId: string) => {
    setState(prev => ({ ...prev, swipedRight: [...prev.swipedRight, profileId] }));
    if (Math.random() > 0.6) {
      const profile = state.profiles.find(p => p.id === profileId);
      if (profile) {
        const newMatch: Match = { id: `match-${Date.now()}`, users: [state.currentUser.id, profileId], messages: [], lastInteraction: Date.now() };
        setState(prev => ({ ...prev, matches: [newMatch, ...prev.matches] }));
        setMatchModal(profile);
        setInsight('Buscando discernimento...');
        const divineInsight = await getDivineInsight(state.currentUser, profile);
        setInsight(divineInsight || '');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100">
      <header className="bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-200">
            <Heart size={20} fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-800 tracking-tight leading-none">Conexão Divina</h1>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Exclusivo & Premium</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFilter(true)} className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:text-amber-600 transition-all border border-slate-100">
            <SlidersHorizontal size={20} />
          </button>
          <button onClick={() => setState(p => ({ ...p, currentUser: { ...p.currentUser, role: p.currentUser.role === UserRole.USER ? UserRole.ADMIN : UserRole.USER } }))}
            className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:text-amber-600 border border-slate-100 transition-all">
            <ShieldCheck size={20} className={state.currentUser.role === UserRole.ADMIN ? 'text-amber-600' : ''} />
          </button>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {activeTab === 'swipe' && (
          <div className="h-full flex flex-col items-center justify-center p-4">
            {currentProfile ? (
              <div className="relative w-full max-w-sm">
                <SwipeCard profile={currentProfile} onSwipeRight={handleSwipeRight} onSwipeLeft={(id) => setState(p => ({ ...p, swipedLeft: [...p.swipedLeft, id] }))} />
                <button 
                  onClick={() => setState(prev => ({ ...prev, favorites: prev.favorites.includes(currentProfile.id) ? prev.favorites.filter(id => id !== currentProfile.id) : [...prev.favorites, currentProfile.id] }))}
                  className={`absolute top-4 right-4 p-4 rounded-full backdrop-blur-xl transition-all shadow-2xl ${state.favorites.includes(currentProfile.id) ? 'bg-amber-500 text-white' : 'bg-white/30 text-white border border-white/40'}`}
                >
                  <Star size={24} fill={state.favorites.includes(currentProfile.id) ? 'currentColor' : 'none'} />
                </button>
                {currentProfile.churchName === state.currentUser.churchName && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-emerald-500/90 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-emerald-400">
                    <Church size={12}/> Mesma Igreja
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-[40px] shadow-2xl border border-slate-100 max-w-sm mx-auto">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <Sparkles size={40} className="animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Paciência é uma Virtude</h2>
                <p className="text-slate-500 mt-4 text-sm leading-relaxed">Expandimos sua busca para todas as cidades, mas no momento não há mais perfis que coincidam com seus filtros exclusivos.</p>
                <button onClick={() => setState(p => ({ ...p, filters: INITIAL_STATE.filters, swipedLeft: [], swipedRight: [] }))} className="mt-8 px-10 py-4 bg-amber-500 text-white rounded-2xl font-bold shadow-xl shadow-amber-200 active:scale-95 transition-all">Redefinir Filtros</button>
              </div>
            )}
          </div>
        )}

        {/* Modal de Filtros Refinados */}
        {showFilter && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-t-[40px] p-8 shadow-2xl animate-slide-up">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif font-bold text-slate-800">Busca Refinada</h3>
                <button onClick={() => setShowFilter(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
              </div>
              
              <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 pb-6">
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm font-bold text-slate-700">Raio de Distância</span>
                    <span className="text-sm text-amber-600 font-bold">{state.filters.maxDistance} km</span>
                  </div>
                  <input type="range" min="1" max="500" value={state.filters.maxDistance} onChange={e => setState(p => ({ ...p, filters: { ...p.filters, maxDistance: parseInt(e.target.value) } }))} className="w-full accent-amber-500" />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    <span>Próximo à Igreja</span>
                    <span>Outras Cidades</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Ruler size={14}/> Preferência de Altura</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 160, 170, 180].map(h => (
                      <button 
                        key={h}
                        onClick={() => setState(p => ({ ...p, filters: { ...p.filters, preferredHeight: h || undefined } }))}
                        className={`py-3 rounded-2xl text-xs font-bold transition-all border ${state.filters.preferredHeight === h ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                      >
                        {h === 0 ? 'Tanto faz' : `+${h}cm`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><UserCheck size={14}/> Característica Física</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Morena', 'Moreno', 'Loira', 'Loiro', 'Ruiva', 'Ruivo'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setState(p => ({ ...p, filters: { ...p.filters, preferredHairColor: state.filters.preferredHairColor === c ? undefined : c } }))}
                        className={`py-3 rounded-2xl text-xs font-bold transition-all border ${state.filters.preferredHairColor === c ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => setShowFilter(false)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl mt-4 active:scale-95 transition-all">Ver Resultados Abençoados</button>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="p-8 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Pessoas de Interesse</h2>
            {state.favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 text-center opacity-40">
                <Star size={64} className="text-slate-200 mb-6" />
                <p className="text-slate-500">Ninguém em destaque ainda.<br/>Explore perfis e use a estrela.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {state.favorites.map(id => {
                  const p = state.profiles.find(x => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={p.id} className="relative rounded-[32px] overflow-hidden shadow-lg bg-white group border border-slate-100">
                      <img src={p.imageUrl} className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                        <p className="text-white font-bold text-sm leading-tight">{p.name}, {p.age}</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-tight mt-1">{p.churchName}</p>
                      </div>
                      <button onClick={() => setState(prev => ({ ...prev, favorites: prev.favorites.filter(fid => fid !== id) }))} className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Abas Restantes (Chat, Profile, Admin) seguem a mesma lógica premium... */}
        {activeTab === 'chat' && !activeChat && (
          <div className="p-8 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Conversas Divinas</h2>
            {state.matches.length === 0 ? (
              <div className="text-center py-20 opacity-30">
                <MessageSquare size={64} className="mx-auto text-slate-300 mb-6" />
                <p className="text-slate-500">Aguardando o tempo de Deus e um match!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.matches.map(m => {
                  const other = state.profiles.find(p => m.users.includes(p.id));
                  return (
                    <button key={m.id} onClick={() => setActiveChat(m)} className="w-full flex items-center gap-5 p-5 bg-white rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95 text-left">
                      <div className="relative">
                        <img src={other?.imageUrl} className="w-16 h-16 rounded-3xl object-cover border-2 border-white shadow-lg" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-lg">{other?.name}</h4>
                        <p className="text-xs text-slate-400 font-medium truncate">{m.messages.length > 0 ? m.messages[m.messages.length - 1].text : 'Envie uma saudação abençoada!'}</p>
                      </div>
                      <div className="text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg uppercase">Match</div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-8 animate-fade-in max-w-lg mx-auto">
             {!isEditing ? (
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-40 h-40 rounded-[48px] p-1.5 bg-gradient-to-tr from-amber-200 to-amber-500 shadow-2xl">
                    <img src={state.currentUser.imageUrl} className="w-full h-full rounded-[42px] object-cover border-4 border-white" />
                  </div>
                  <button onClick={() => setIsEditing(true)} className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-4 rounded-3xl shadow-2xl hover:bg-slate-800 transition-all">
                    <Camera size={20} />
                  </button>
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-800">{state.currentUser.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100">{state.currentUser.churchRole}</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">ID #{state.currentUser.id}</span>
                </div>

                <div className="w-full mt-10 grid grid-cols-1 gap-4">
                  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                      <Church size={24}/>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Minha Congregação</h4>
                      <p className="text-slate-800 font-bold">{state.currentUser.churchName}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                      <MapPin size={24}/>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Localização</h4>
                      <p className="text-slate-800 font-bold">{state.currentUser.location}</p>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> Testemunho</h4>
                    <p className="text-slate-600 text-sm leading-relaxed italic italic font-medium">"{state.currentUser.faithJourney}"</p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="mt-4 w-full py-5 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all">Editar Perfil Completo</button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <button onClick={() => setIsEditing(false)} className="p-3 bg-white rounded-2xl shadow-sm text-slate-400"><ArrowLeft size={24}/></button>
                  <h2 className="text-2xl font-serif font-bold text-slate-800">Meus Dados</h2>
                  <div className="w-12 h-12"></div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome de Membro</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Idade</label>
                      <input type="number" value={editForm.age} onChange={e => setEditForm({...editForm, age: parseInt(e.target.value)})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua Igreja Específica</label>
                    <input type="text" value={editForm.churchName} onChange={e => setEditForm({...editForm, churchName: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" placeholder="Ex: Batista Central da Lagoinha" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Altura (cm)</label>
                      <input type="number" value={editForm.physical?.height} onChange={e => setEditForm({...editForm, physical: { ...editForm.physical, height: parseInt(e.target.value) }})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Cor do Cabelo</label>
                      <select value={editForm.physical?.hairColor} onChange={e => setEditForm({...editForm, physical: { ...editForm.physical, hairColor: e.target.value }})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm appearance-none">
                        <option>Morena/Moreno</option>
                        <option>Loira/Loiro</option>
                        <option>Ruiva/Ruivo</option>
                        <option>Castanho</option>
                        <option>Preto</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua História com Jesus</label>
                    <textarea rows={4} value={editForm.faithJourney} onChange={e => setEditForm({...editForm, faithJourney: e.target.value})} className="w-full bg-white border border-slate-100 rounded-[32px] px-6 py-5 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none resize-none shadow-sm" placeholder="Conte como Jesus transformou sua vida..." />
                  </div>

                  <button onClick={() => { setState(p => ({...p, currentUser: editForm})); setIsEditing(false); }} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <Save size={20} /> Consagrar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && <AdminPanel profiles={state.profiles} matches={state.matches} />}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} role={state.currentUser.role} />

      {/* Match Modal Premium */}
      {matchModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-8 bg-slate-900/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-[60px] overflow-hidden shadow-2xl p-10 text-center animate-scale-up">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200"></div>
            <Sparkles size={48} className="mx-auto text-amber-500 mb-4 animate-bounce" />
            <h2 className="text-4xl font-serif text-slate-900 font-bold mb-2">Um Propósito!</h2>
            <p className="text-slate-500 font-medium mb-10">Vocês têm afinidade espiritual e física.</p>
            
            <div className="flex justify-center -space-x-8 mb-10">
              <div className="w-28 h-28 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden rotate-[-6deg]">
                <img src={state.currentUser.imageUrl} className="w-full h-full object-cover" />
              </div>
              <div className="w-28 h-28 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden rotate-[6deg]">
                <img src={matchModal.imageUrl} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-amber-50/80 p-6 rounded-[32px] border border-amber-100 mb-10 text-left">
              <h5 className="text-[10px] font-black text-amber-600 uppercase mb-3 tracking-widest flex items-center gap-2"><UserCheck size={14}/> Discernimento Pastoral</h5>
              <p className="text-sm text-amber-900 leading-relaxed italic font-medium">{insight}</p>
            </div>

            <div className="space-y-4">
              <button onClick={() => { setActiveTab('chat'); setMatchModal(null); setActiveChat(state.matches.find(m => m.users.includes(matchModal.id)) || null); }} className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl hover:bg-slate-800 transition-all">Iniciar Conversa</button>
              <button onClick={() => setMatchModal(null)} className="w-full py-4 text-slate-400 font-bold hover:text-slate-600">Mais Tarde</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scale-up { animation: scaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes scaleUp { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default App;
