import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Camera, Heart, Church, BookOpen, Music, MapPin, User, Check, Star, Sparkles, Image, X, Plus } from 'lucide-react';

interface OnboardingCompleteProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

interface OnboardingData {
  photos: string[];
  name: string;
  age: string;
  gender: string;
  city: string;
  state: string;
  denomination: string;
  churchName: string;
  baptized: boolean;
  churchRole: string;
  bio: string;
  faithJourney: string;
  favoriteVerse: string;
  worshipStyle: string;
  relationshipGoal: string;
  interests: string[];
  height: string;
}

const DENOMINATIONS = [
  'Batista', 'Presbiteriana', 'Assembleia de Deus', 'Metodista', 'Católica',
  'Adventista', 'Luterana', 'Anglicana', 'Congregacional', 'Quadrangular',
  'Universal', 'Sara Nossa Terra', 'Bola de Neve', 'Lagoinha', 'Outra'
];

const WORSHIP_STYLES = [
  '🎵 Contemporâneo', '🎹 Tradicional', '🎸 Rock/Pop Cristão',
  '🎤 Gospel', '🎶 Louvor Espontâneo', '🎼 Hinos Clássicos'
];

const INTERESTS = [
  '📖 Estudo Bíblico', '🙏 Oração', '🎵 Louvor', '⛪ Células/Grupos',
  '🏃 Esportes', '🎬 Filmes', '📚 Leitura', '✈️ Viagens',
  '🍳 Culinária', '🎨 Arte', '🐕 Animais', '🌿 Natureza',
  '☕ Café', '🎮 Games', '📸 Fotografia', '🎭 Teatro'
];

const RELATIONSHIP_GOALS = [
  { id: 'serious', label: 'Relacionamento Sério', icon: '💍', desc: 'Busco alguém para casar' },
  { id: 'friendship', label: 'Amizade Cristã', icon: '🤝', desc: 'Quero fazer amigos na fé' },
  { id: 'dating', label: 'Conhecer Pessoas', icon: '💕', desc: 'Aberto a conhecer alguém especial' },
  { id: 'community', label: 'Comunidade', icon: '⛪', desc: 'Participar da comunidade cristã' },
];

const CHURCH_ROLES = [
  'Membro', 'Líder de Célula', 'Músico/Cantor', 'Diácono/Diaconisa',
  'Professor EBD', 'Intercessor', 'Obreiro', 'Missionário', 'Visitante'
];

const STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
];

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    photos: [],
    name: '',
    age: '',
    gender: '',
    city: '',
    state: '',
    denomination: '',
    churchName: '',
    baptized: false,
    churchRole: '',
    bio: '',
    faithJourney: '',
    favoriteVerse: '',
    worshipStyle: '',
    relationshipGoal: '',
    interests: [],
    height: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 7;
  const progress = ((step + 1) / totalSteps) * 100;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setData(prev => ({ ...prev, photos: [...prev.photos, ev.target?.result as string] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSamplePhoto = (url: string) => {
    if (data.photos.length < 6) {
      setData(prev => ({ ...prev, photos: [...prev.photos, url] }));
    }
  };

  const removePhoto = (index: number) => {
    setData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const toggleInterest = (interest: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return data.photos.length >= 1;
      case 1: return data.name && data.age && data.gender;
      case 2: return data.denomination;
      case 3: return data.relationshipGoal;
      case 4: return data.bio.length >= 10;
      case 5: return data.interests.length >= 3;
      case 6: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onComplete(data);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="p-2 text-slate-400">
            <ChevronLeft size={24} />
          </button>
        ) : <div className="w-10" />}
        <div className="flex-1 mx-4">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-slate-400 text-[10px] font-bold mt-1">{step + 1} de {totalSteps}</p>
        </div>
        <button onClick={onSkip} className="text-slate-400 text-sm font-medium">Pular</button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-32 overflow-y-auto">
        {/* Step 0: Photos */}
        {step === 0 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={28} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Suas Fotos</h2>
              <p className="text-slate-500 text-sm mt-2">Adicione pelo menos 1 foto (máximo 6)</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
                  <img src={photo} className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                    <X size={14} />
                  </button>
                  {i === 0 && <div className="absolute bottom-1 left-1 bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">PRINCIPAL</div>}
                </div>
              ))}
              {data.photos.length < 6 && (
                <button onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-2xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center bg-amber-50 active:scale-95 transition-all">
                  <Plus size={24} className="text-amber-500" />
                  <span className="text-amber-600 text-[10px] font-bold mt-1">Adicionar</span>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />

            <p className="text-slate-400 text-xs text-center mb-3">Ou escolha uma foto de exemplo:</p>
            <div className="flex gap-2 justify-center">
              {SAMPLE_PHOTOS.map((photo, i) => (
                <button key={i} onClick={() => addSamplePhoto(photo)} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-200 active:scale-90 transition-all">
                  <img src={photo} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={28} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Informações Básicas</h2>
              <p className="text-slate-500 text-sm mt-2">Conte um pouco sobre você</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome</label>
                <input type="text" value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Seu nome" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Idade</label>
                  <input type="number" value={data.age} onChange={e => setData({...data, age: e.target.value})} placeholder="25" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Altura (cm)</label>
                  <input type="number" value={data.height} onChange={e => setData({...data, height: e.target.value})} placeholder="170" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Gênero</label>
                <div className="flex gap-3 mt-2">
                  {['Masculino', 'Feminino'].map(g => (
                    <button key={g} onClick={() => setData({...data, gender: g})} className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${data.gender === g ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                      {g === 'Masculino' ? '👨' : '👩'} {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Cidade</label>
                  <input type="text" value={data.city} onChange={e => setData({...data, city: e.target.value})} placeholder="São Paulo" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Estado</label>
                  <select value={data.state} onChange={e => setData({...data, state: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1">
                    <option value="">Selecione</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Church */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Church size={28} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Sua Igreja</h2>
              <p className="text-slate-500 text-sm mt-2">Qual é sua denominação e igreja?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Denominação</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {DENOMINATIONS.map(d => (
                    <button key={d} onClick={() => setData({...data, denomination: d})} className={`py-3 px-4 rounded-2xl text-sm font-medium transition-all ${data.denomination === d ? 'bg-purple-500 text-white shadow-lg' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome da Igreja</label>
                <input type="text" value={data.churchName} onChange={e => setData({...data, churchName: e.target.value})} placeholder="Ex: Igreja Batista Central" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Função na Igreja</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {CHURCH_ROLES.map(r => (
                    <button key={r} onClick={() => setData({...data, churchRole: r})} className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${data.churchRole === r ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setData({...data, baptized: !data.baptized})} className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${data.baptized ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                {data.baptized ? <Check size={18} /> : null} {data.baptized ? 'Batizado(a) ✓' : 'Sou Batizado(a)'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Relationship Goal */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">O que você busca?</h2>
              <p className="text-slate-500 text-sm mt-2">Qual seu objetivo no Conexão Divina?</p>
            </div>

            <div className="space-y-3">
              {RELATIONSHIP_GOALS.map(goal => (
                <button key={goal.id} onClick={() => setData({...data, relationshipGoal: goal.label})} className={`w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 ${data.relationshipGoal === goal.label ? 'bg-amber-500 text-white shadow-xl' : 'bg-slate-50 text-slate-800 border border-slate-100'}`}>
                  <span className="text-3xl">{goal.icon}</span>
                  <div>
                    <p className="font-bold text-sm">{goal.label}</p>
                    <p className={`text-xs mt-0.5 ${data.relationshipGoal === goal.label ? 'text-white/80' : 'text-slate-500'}`}>{goal.desc}</p>
                  </div>
                  {data.relationshipGoal === goal.label && <Check size={20} className="ml-auto" />}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Estilo de Louvor Preferido</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {WORSHIP_STYLES.map(ws => (
                  <button key={ws} onClick={() => setData({...data, worshipStyle: ws})} className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${data.worshipStyle === ws ? 'bg-purple-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                    {ws}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Bio & Faith */}
        {step === 4 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Sua História</h2>
              <p className="text-slate-500 text-sm mt-2">Compartilhe um pouco sobre você e sua fé</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sobre Mim ({data.bio.length}/300)</label>
                <textarea rows={3} maxLength={300} value={data.bio} onChange={e => setData({...data, bio: e.target.value})} placeholder="Fale sobre você, seus hobbies, o que te faz feliz..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none resize-none mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Minha História com Jesus</label>
                <textarea rows={4} value={data.faithJourney} onChange={e => setData({...data, faithJourney: e.target.value})} placeholder="Conte como Jesus transformou sua vida..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none resize-none mt-1" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Versículo Favorito</label>
                <input type="text" value={data.favoriteVerse} onChange={e => setData({...data, favoriteVerse: e.target.value})} placeholder='Ex: "Porque Deus amou o mundo..." - João 3:16' className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Interests */}
        {step === 5 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Seus Interesses</h2>
              <p className="text-slate-500 text-sm mt-2">Selecione pelo menos 3 interesses</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button key={interest} onClick={() => toggleInterest(interest)} className={`py-3 px-5 rounded-full text-sm font-medium transition-all ${data.interests.includes(interest) ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                  {interest} {data.interests.includes(interest) && '✓'}
                </button>
              ))}
            </div>
            <p className="text-center text-slate-400 text-xs mt-4">{data.interests.length} selecionados</p>
          </div>
        )}

        {/* Step 6: Review */}
        {step === 6 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Tudo Pronto!</h2>
              <p className="text-slate-500 text-sm mt-2">Confira seu perfil antes de começar</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
              {data.photos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto">
                  {data.photos.map((p, i) => (
                    <img key={i} src={p} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  ))}
                </div>
              )}
              <div>
                <p className="text-slate-800 font-bold text-lg">{data.name || 'Seu Nome'}, {data.age || '??'}</p>
                <p className="text-slate-500 text-sm">{data.city}{data.state ? `, ${data.state}` : ''}</p>
              </div>
              {data.denomination && <p className="text-purple-600 text-sm font-medium">⛪ {data.denomination} {data.churchName ? `- ${data.churchName}` : ''}</p>}
              {data.bio && <p className="text-slate-600 text-sm">{data.bio}</p>}
              {data.relationshipGoal && <p className="text-amber-600 text-sm font-medium">💕 {data.relationshipGoal}</p>}
              {data.interests.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {data.interests.map((i, idx) => (
                    <span key={idx} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{i}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4">
        <button onClick={handleNext} disabled={!canProceed()} className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${canProceed() ? 'bg-amber-500 text-white shadow-xl shadow-amber-200 active:scale-95' : 'bg-slate-100 text-slate-400'}`}>
          {step === totalSteps - 1 ? '🎉 Começar a Usar!' : 'Continuar'}
          {step < totalSteps - 1 && <ChevronRight size={20} className="inline ml-2" />}
        </button>
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default OnboardingComplete;
