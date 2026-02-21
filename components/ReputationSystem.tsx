
import React, { useState } from 'react';
import { Star, Heart, Shield, MessageCircle, ThumbsUp, X, Check, ChevronRight, Award } from 'lucide-react';

interface ReputationReview {
  id: string;
  fromUserId: string;
  fromUserName: string;
  traits: string[];
  rating: number;
  createdAt: string;
}

interface ReputationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  total: number;
}

interface ReputationProps {
  userName: string;
  overallRating: number;
  totalReviews: number;
  traits: { name: string; count: number; percentage: number }[];
  badges: ReputationBadge[];
  isOwnProfile: boolean;
}

// Componente para exibir a reputação no perfil
const ReputationDisplay: React.FC<ReputationProps> = ({ userName, overallRating, totalReviews, traits, badges, isOwnProfile }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-500';
    if (rating >= 3.5) return 'text-amber-500';
    if (rating >= 2.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excelente';
    if (rating >= 3.5) return 'Muito Bom';
    if (rating >= 2.5) return 'Bom';
    return 'Regular';
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-amber-500" />
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Reputação</h4>
          </div>
          {totalReviews > 0 && (
            <button onClick={() => setShowDetails(!showDetails)} className="text-xs text-amber-600 font-bold flex items-center gap-1">
              Ver detalhes <ChevronRight size={14} className={`transition-transform ${showDetails ? 'rotate-90' : ''}`}/>
            </button>
          )}
        </div>

        {totalReviews === 0 ? (
          <div className="text-center py-4 opacity-50">
            <Star size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm text-slate-400">Ainda sem avaliações</p>
            <p className="text-[11px] text-slate-300 mt-1">Avaliações aparecem após encontros</p>
          </div>
        ) : (
          <>
            {/* Rating Summary */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className={`text-4xl font-black ${getRatingColor(overallRating)}`}>{overallRating.toFixed(1)}</p>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} className={s <= Math.round(overallRating) ? 'text-amber-400' : 'text-slate-200'} fill={s <= Math.round(overallRating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">{totalReviews} avaliações</p>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${getRatingColor(overallRating)}`}>{getRatingLabel(overallRating)}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {isOwnProfile ? 'Sua reputação na comunidade' : `Reputação de ${userName}`}
                </p>
              </div>
            </div>

            {/* Top Traits */}
            {traits.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {traits.slice(0, 5).map(trait => (
                  <div key={trait.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                    <span className="text-xs">{trait.name}</span>
                    <span className="text-[10px] font-bold text-amber-500">{trait.percentage}%</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detalhes expandidos */}
      {showDetails && totalReviews > 0 && (
        <div className="border-t border-slate-100 p-5">
          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Conquistas</p>
              <div className="grid grid-cols-2 gap-2">
                {badges.map(badge => (
                  <div key={badge.id} className={`p-3 rounded-2xl border ${badge.earned ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{badge.icon}</span>
                      <span className={`text-xs font-bold ${badge.earned ? 'text-slate-800' : 'text-slate-400'}`}>{badge.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{badge.description}</p>
                    {!badge.earned && (
                      <div className="mt-2">
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(badge.progress / badge.total) * 100}%` }} />
                        </div>
                        <p className="text-[9px] text-slate-300 mt-1">{badge.progress}/{badge.total}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trait Bars */}
          <div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Qualidades mais citadas</p>
            <div className="space-y-2.5">
              {traits.map(trait => (
                <div key={trait.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">{trait.name}</span>
                    <span className="text-xs font-bold text-slate-400">{trait.count}x ({trait.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all" style={{ width: `${trait.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal de avaliação após encontro
interface ReviewModalProps {
  partnerName: string;
  partnerPhoto: string;
  onClose: () => void;
  onSubmit: (review: { traits: string[]; rating: number }) => void;
}

const AVAILABLE_TRAITS = [
  { emoji: '😊', label: 'Gentil' },
  { emoji: '🙏', label: 'Respeitoso(a)' },
  { emoji: '💬', label: 'Boa conversa' },
  { emoji: '😄', label: 'Divertido(a)' },
  { emoji: '🤝', label: 'Confiável' },
  { emoji: '📸', label: 'Fotos reais' },
  { emoji: '⏰', label: 'Pontual' },
  { emoji: '✝️', label: 'Fé genuína' },
  { emoji: '❤️', label: 'Carinhoso(a)' },
  { emoji: '🎯', label: 'Intencional' },
  { emoji: '👂', label: 'Bom ouvinte' },
  { emoji: '🌟', label: 'Autêntico(a)' },
];

const ReviewModal: React.FC<ReviewModalProps> = ({ partnerName, partnerPhoto, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]);
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit({ traits: selectedTraits, rating });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Obrigado!</h3>
            <p className="text-slate-500 text-sm">Sua avaliação ajuda a manter a comunidade segura e respeitosa.</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl">Fechar</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-slate-800">Avaliar Encontro</h3>
              <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={18}/></button>
            </div>

            {/* Partner */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
              <img src={partnerPhoto} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-bold text-slate-800">{partnerName}</p>
                <p className="text-xs text-slate-400">Como foi o encontro?</p>
              </div>
            </div>

            {/* Rating */}
            <div className="text-center mb-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Avaliação Geral</p>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map(s => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className="transition-all active:scale-90"
                  >
                    <Star size={36} className={s <= rating ? 'text-amber-400' : 'text-slate-200'} fill={s <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2 font-medium">
                {rating === 0 && 'Toque para avaliar'}
                {rating === 1 && 'Não foi bom'}
                {rating === 2 && 'Poderia ser melhor'}
                {rating === 3 && 'Foi ok'}
                {rating === 4 && 'Muito bom!'}
                {rating === 5 && 'Incrível!'}
              </p>
            </div>

            {/* Traits */}
            <div className="mb-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Qualidades (selecione as que se aplicam)</p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TRAITS.map(trait => (
                  <button
                    key={trait.label}
                    onClick={() => toggleTrait(trait.label)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                      selectedTraits.includes(trait.label)
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    <span>{trait.emoji}</span> {trait.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
              <div className="flex items-start gap-2">
                <Shield size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-600">Sua avaliação é <strong>anônima</strong>. {partnerName} verá apenas as qualidades e a nota geral, sem saber quem avaliou.</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 active:scale-95 transition-all disabled:opacity-40"
            >
              Enviar Avaliação
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Dados de exemplo para reputação
const SAMPLE_REPUTATION: ReputationProps = {
  userName: '',
  overallRating: 4.7,
  totalReviews: 8,
  isOwnProfile: true,
  traits: [
    { name: '🙏 Respeitoso(a)', count: 7, percentage: 88 },
    { name: '😊 Gentil', count: 6, percentage: 75 },
    { name: '✝️ Fé genuína', count: 6, percentage: 75 },
    { name: '💬 Boa conversa', count: 5, percentage: 63 },
    { name: '📸 Fotos reais', count: 5, percentage: 63 },
    { name: '🤝 Confiável', count: 4, percentage: 50 },
    { name: '🌟 Autêntico(a)', count: 3, percentage: 38 },
  ],
  badges: [
    { id: 'b1', name: 'Primeiro Encontro', description: 'Completou o primeiro encontro', icon: '☕', earned: true, progress: 1, total: 1 },
    { id: 'b2', name: '5 Estrelas', description: 'Recebeu 5 avaliações de 5 estrelas', icon: '⭐', earned: true, progress: 5, total: 5 },
    { id: 'b3', name: 'Respeitoso', description: 'Citado como respeitoso 10 vezes', icon: '🙏', earned: false, progress: 7, total: 10 },
    { id: 'b4', name: 'Popular', description: 'Recebeu 20 avaliações', icon: '🔥', earned: false, progress: 8, total: 20 },
  ],
};

export { ReputationDisplay, ReviewModal, SAMPLE_REPUTATION };
export type { ReputationProps, ReviewModalProps };
