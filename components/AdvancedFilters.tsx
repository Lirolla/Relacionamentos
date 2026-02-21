
import React, { useState } from 'react';
import { X, SlidersHorizontal, MapPin, Church, Heart, Baby, GraduationCap, Briefcase, Music2, BookOpen, Check, RotateCcw } from 'lucide-react';

interface FilterValues {
  minAge: number;
  maxAge: number;
  maxDistance: number;
  denominations: string[];
  churchFrequency: string;
  hasChildren: string;
  wantsChildren: string;
  education: string;
  smoking: string;
  drinking: string;
  bodyType: string;
  minHeight: number;
  maxHeight: number;
  interests: string[];
  relationshipGoal: string;
  verified: boolean;
  pastorVerified: boolean;
  withPhoto: boolean;
  onlineNow: boolean;
}

const DEFAULT_FILTERS: FilterValues = {
  minAge: 18, maxAge: 45, maxDistance: 100,
  denominations: [], churchFrequency: '', hasChildren: '', wantsChildren: '',
  education: '', smoking: '', drinking: '', bodyType: '',
  minHeight: 150, maxHeight: 200, interests: [],
  relationshipGoal: '', verified: false, pastorVerified: false,
  withPhoto: true, onlineNow: false,
};

const DENOMINATIONS = [
  'Assembleia de Deus', 'Batista', 'Presbiteriana', 'Metodista', 'Católica',
  'Adventista', 'Luterana', 'Congregação Cristã', 'Universal', 'Sara Nossa Terra',
  'Bola de Neve', 'Lagoinha', 'Renascer', 'Internacional da Graça', 'Outra'
];

const INTERESTS = [
  'Louvor', 'Missões', 'Estudo Bíblico', 'Voluntariado', 'Esportes',
  'Música', 'Viagens', 'Culinária', 'Leitura', 'Cinema',
  'Natureza', 'Fotografia', 'Arte', 'Dança', 'Meditação'
];

interface AdvancedFiltersProps {
  onApply: (filters: FilterValues) => void;
  onClose: () => void;
  initialFilters?: Partial<FilterValues>;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApply, onClose, initialFilters }) => {
  const [filters, setFilters] = useState<FilterValues>({ ...DEFAULT_FILTERS, ...initialFilters });
  const [activeSection, setActiveSection] = useState<string>('basic');

  const toggleDenomination = (d: string) => {
    setFilters(prev => ({
      ...prev,
      denominations: prev.denominations.includes(d)
        ? prev.denominations.filter(x => x !== d)
        : [...prev.denominations, d]
    }));
  };

  const toggleInterest = (i: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(i)
        ? prev.interests.filter(x => x !== i)
        : [...prev.interests, i]
    }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const sections = [
    { id: 'basic', label: 'Básico', icon: <SlidersHorizontal size={16} /> },
    { id: 'faith', label: 'Fé', icon: <Church size={16} /> },
    { id: 'lifestyle', label: 'Estilo de Vida', icon: <Heart size={16} /> },
    { id: 'physical', label: 'Aparência', icon: <MapPin size={16} /> },
    { id: 'interests', label: 'Interesses', icon: <Music2 size={16} /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Filtros Avançados</h2>
            <p className="text-xs text-slate-400 mt-0.5">Encontre a pessoa ideal para você</p>
          </div>
          <div className="flex gap-2">
            <button onClick={resetFilters} className="p-2 text-slate-400 hover:text-amber-600 transition-colors">
              <RotateCcw size={18} />
            </button>
            <button onClick={onClose} className="p-2 text-slate-400">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1 p-3 overflow-x-auto border-b">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeSection === s.id ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Basic */}
          {activeSection === 'basic' && (
            <>
              {/* Age Range */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">
                  Idade: {filters.minAge} - {filters.maxAge} anos
                </label>
                <div className="flex gap-4 items-center">
                  <input type="range" min={18} max={60} value={filters.minAge}
                    onChange={e => setFilters(prev => ({ ...prev, minAge: +e.target.value }))}
                    className="flex-1 accent-amber-500" />
                  <input type="range" min={18} max={60} value={filters.maxAge}
                    onChange={e => setFilters(prev => ({ ...prev, maxAge: +e.target.value }))}
                    className="flex-1 accent-amber-500" />
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">
                  Distância máxima: {filters.maxDistance} km
                </label>
                <input type="range" min={5} max={500} value={filters.maxDistance}
                  onChange={e => setFilters(prev => ({ ...prev, maxDistance: +e.target.value }))}
                  className="w-full accent-amber-500" />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>5 km</span><span>100 km</span><span>500 km</span>
                </div>
              </div>

              {/* Relationship Goal */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Objetivo</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Namoro sério', 'Casamento', 'Amizade cristã', 'Qualquer'].map(goal => (
                    <button
                      key={goal}
                      onClick={() => setFilters(prev => ({ ...prev, relationshipGoal: prev.relationshipGoal === goal ? '' : goal }))}
                      className={`p-3 rounded-xl text-sm font-medium border-2 transition-all ${
                        filters.relationshipGoal === goal ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                {[
                  { key: 'verified', label: 'Apenas verificados', desc: 'Perfis com identidade verificada' },
                  { key: 'pastorVerified', label: 'Pastor aprova', desc: 'Verificados pelo pastor da igreja' },
                  { key: 'withPhoto', label: 'Com foto', desc: 'Apenas perfis com foto' },
                  { key: 'onlineNow', label: 'Online agora', desc: 'Pessoas ativas no momento' },
                ].map(toggle => (
                  <div key={toggle.key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <span className="text-sm font-medium text-slate-700">{toggle.label}</span>
                      <p className="text-[10px] text-slate-400">{toggle.desc}</p>
                    </div>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, [toggle.key]: !(prev as any)[toggle.key] }))}
                      className={`w-12 h-7 rounded-full transition-all ${(filters as any)[toggle.key] ? 'bg-amber-500' : 'bg-slate-300'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${(filters as any)[toggle.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Faith */}
          {activeSection === 'faith' && (
            <>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Denominação</label>
                <div className="flex flex-wrap gap-2">
                  {DENOMINATIONS.map(d => (
                    <button
                      key={d}
                      onClick={() => toggleDenomination(d)}
                      className={`px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                        filters.denominations.includes(d) ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {filters.denominations.includes(d) && <Check size={10} className="inline mr-1" />}
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Frequência na Igreja</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Todo domingo', '2-3x por mês', '1x por mês', 'Eventualmente'].map(freq => (
                    <button
                      key={freq}
                      onClick={() => setFilters(prev => ({ ...prev, churchFrequency: prev.churchFrequency === freq ? '' : freq }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${
                        filters.churchFrequency === freq ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Lifestyle */}
          {activeSection === 'lifestyle' && (
            <>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Tem filhos?</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Sim', 'Não', 'Tanto faz'].map(opt => (
                    <button key={opt} onClick={() => setFilters(prev => ({ ...prev, hasChildren: prev.hasChildren === opt ? '' : opt }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${filters.hasChildren === opt ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Quer filhos?</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Sim', 'Não', 'Tanto faz'].map(opt => (
                    <button key={opt} onClick={() => setFilters(prev => ({ ...prev, wantsChildren: prev.wantsChildren === opt ? '' : opt }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${filters.wantsChildren === opt ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Escolaridade</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Ensino Médio', 'Superior', 'Pós-graduação', 'Tanto faz'].map(opt => (
                    <button key={opt} onClick={() => setFilters(prev => ({ ...prev, education: prev.education === opt ? '' : opt }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${filters.education === opt ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Fuma?</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Não aceito', 'Aceito', 'Tanto faz'].map(opt => (
                    <button key={opt} onClick={() => setFilters(prev => ({ ...prev, smoking: prev.smoking === opt ? '' : opt }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${filters.smoking === opt ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Bebe?</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Não aceito', 'Socialmente', 'Tanto faz'].map(opt => (
                    <button key={opt} onClick={() => setFilters(prev => ({ ...prev, drinking: prev.drinking === opt ? '' : opt }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${filters.drinking === opt ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Physical */}
          {activeSection === 'physical' && (
            <>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">
                  Altura: {filters.minHeight}cm - {filters.maxHeight}cm
                </label>
                <div className="flex gap-4 items-center">
                  <input type="range" min={140} max={210} value={filters.minHeight}
                    onChange={e => setFilters(prev => ({ ...prev, minHeight: +e.target.value }))}
                    className="flex-1 accent-amber-500" />
                  <input type="range" min={140} max={210} value={filters.maxHeight}
                    onChange={e => setFilters(prev => ({ ...prev, maxHeight: +e.target.value }))}
                    className="flex-1 accent-amber-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Tipo Físico</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Magro(a)', 'Atlético(a)', 'Normal', 'Gordinho(a)', 'Tanto faz'].map(opt => (
                    <button key={opt} onClick={() => setFilters(prev => ({ ...prev, bodyType: prev.bodyType === opt ? '' : opt }))}
                      className={`p-3 rounded-xl text-xs font-medium border-2 transition-all ${filters.bodyType === opt ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Interests */}
          {activeSection === 'interests' && (
            <div>
              <label className="text-sm font-bold text-slate-700 mb-3 block">Interesses em comum</label>
              <p className="text-xs text-slate-400 mb-4">Selecione os interesses que você busca</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map(i => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`px-4 py-2.5 rounded-full text-xs font-medium border-2 transition-all ${
                      filters.interests.includes(i) ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    {filters.interests.includes(i) && <Check size={10} className="inline mr-1" />}
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-white flex gap-3">
          <button onClick={resetFilters} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl active:scale-95 transition-all">
            Limpar Tudo
          </button>
          <button onClick={() => { onApply(filters); onClose(); }} className="flex-1 py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all">
            Aplicar Filtros
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default AdvancedFilters;
