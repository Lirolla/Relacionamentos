import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, MessageSquare, X } from 'lucide-react';

const MATCH_VERSES = [
  { text: 'Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.', ref: 'Colossenses 3:14' },
  { text: 'Onde estiver o teu tesouro, aí estará também o teu coração.', ref: 'Mateus 6:21' },
  { text: 'O amor é paciente, o amor é bondoso.', ref: '1 Coríntios 13:4' },
  { text: 'Dois são melhores do que um, porque têm melhor recompensa pelo seu trabalho.', ref: 'Eclesiastes 4:9' },
  { text: 'O que Deus uniu, ninguém separe.', ref: 'Mateus 19:6' },
  { text: 'Amem-se uns aos outros com amor fraternal.', ref: 'Romanos 12:10' },
];

interface MatchAnimationProps {
  currentUserPhoto: string;
  matchedUserPhoto: string;
  matchedUserName: string;
  onStartChat: () => void;
  onClose: () => void;
}

const MatchAnimation: React.FC<MatchAnimationProps> = ({ currentUserPhoto, matchedUserPhoto, matchedUserName, onStartChat, onClose }) => {
  const [phase, setPhase] = useState<'entrance' | 'hearts' | 'reveal' | 'verse' | 'actions'>('entrance');
  const [verse] = useState(MATCH_VERSES[Math.floor(Math.random() * MATCH_VERSES.length)]);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number; color: string; size: number; type: string }>>([]);

  useEffect(() => {
    // Generate confetti
    const colors = ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#fbbf24'];
    const types = ['circle', 'square', 'heart'];
    const particles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 10,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setConfetti(particles);

    // Phase transitions
    const t1 = setTimeout(() => setPhase('hearts'), 400);
    const t2 = setTimeout(() => setPhase('reveal'), 1200);
    const t3 = setTimeout(() => setPhase('verse'), 2200);
    const t4 = setTimeout(() => setPhase('actions'), 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/90 to-slate-900 animate-matchBgPulse" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[100px] animate-matchGlow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[80px] animate-matchGlow2" />

      {/* Confetti */}
      {phase !== 'entrance' && confetti.map(p => (
        <div
          key={p.id}
          className="absolute top-0 animate-confettiFall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.type === 'heart' ? (
            <Heart size={p.size} fill={p.color} color={p.color} />
          ) : (
            <div style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.type === 'circle' ? '50%' : '2px',
              transform: `rotate(${Math.random() * 360}deg)`,
            }} />
          )}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm px-8 text-center">
        {/* Cross / Church bell icon */}
        {(phase === 'hearts' || phase === 'reveal' || phase === 'verse' || phase === 'actions') && (
          <div className="mb-6 animate-matchBounceIn">
            <div className="relative inline-block">
              <Sparkles size={56} className="text-amber-400 animate-matchSparkle" />
              <div className="absolute -inset-3 bg-amber-400/20 rounded-full animate-ping" />
            </div>
          </div>
        )}

        {/* "É um Match!" text */}
        {(phase === 'reveal' || phase === 'verse' || phase === 'actions') && (
          <div className="mb-8 animate-matchTextReveal">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 mb-2 tracking-tight" style={{ fontFamily: 'serif' }}>
              É um Match!
            </h1>
            <p className="text-white/60 text-sm font-medium">Deus preparou este encontro</p>
          </div>
        )}

        {/* Photos */}
        {(phase === 'reveal' || phase === 'verse' || phase === 'actions') && (
          <div className="flex justify-center items-center -space-x-6 mb-8 animate-matchPhotosIn">
            <div className="relative">
              <div className="w-28 h-28 rounded-[36px] border-4 border-amber-400 shadow-2xl shadow-amber-500/30 overflow-hidden transform -rotate-6 hover:rotate-0 transition-all duration-500">
                <img src={currentUserPhoto} className="w-full h-full object-cover" alt="Você" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart size={14} className="text-white" fill="white" />
              </div>
            </div>
            
            {/* Heart connector */}
            <div className="relative z-10 mx-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 animate-matchHeartBeat">
                <Heart size={24} className="text-white" fill="white" />
              </div>
            </div>

            <div className="relative">
              <div className="w-28 h-28 rounded-[36px] border-4 border-amber-400 shadow-2xl shadow-amber-500/30 overflow-hidden transform rotate-6 hover:rotate-0 transition-all duration-500">
                <img src={matchedUserPhoto} className="w-full h-full object-cover" alt={matchedUserName} />
              </div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart size={14} className="text-white" fill="white" />
              </div>
            </div>
          </div>
        )}

        {/* Verse */}
        {(phase === 'verse' || phase === 'actions') && (
          <div className="mb-8 animate-matchVerseIn">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              <p className="text-white/90 text-sm italic leading-relaxed">"{verse.text}"</p>
              <p className="text-amber-400 text-xs font-bold mt-2">— {verse.ref}</p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {phase === 'actions' && (
          <div className="space-y-3 animate-matchActionsIn">
            <button 
              onClick={onStartChat}
              className="w-full py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-black rounded-2xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <MessageSquare size={22} /> Iniciar Conversa
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 text-white/50 font-bold hover:text-white/80 transition-all"
            >
              Mais Tarde
            </button>
          </div>
        )}
      </div>

      {/* Close button */}
      <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all z-20">
        <X size={20} />
      </button>

      <style>{`
        @keyframes matchBgPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        @keyframes matchGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
        }
        @keyframes matchGlow2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.4; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes matchBounceIn {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes matchSparkle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(10deg) scale(1.1); }
          75% { transform: rotate(-10deg) scale(1.1); }
        }
        @keyframes matchTextReveal {
          0% { transform: translateY(30px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes matchPhotosIn {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes matchHeartBeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.3); }
          30% { transform: scale(1); }
          45% { transform: scale(1.2); }
        }
        @keyframes matchVerseIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes matchActionsIn {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-matchBgPulse { animation: matchBgPulse 3s ease-in-out infinite; }
        .animate-matchGlow { animation: matchGlow 4s ease-in-out infinite; }
        .animate-matchGlow2 { animation: matchGlow2 3.5s ease-in-out infinite; }
        .animate-confettiFall { animation: confettiFall linear forwards; }
        .animate-matchBounceIn { animation: matchBounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-matchSparkle { animation: matchSparkle 2s ease-in-out infinite; }
        .animate-matchTextReveal { animation: matchTextReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-matchPhotosIn { animation: matchPhotosIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-matchHeartBeat { animation: matchHeartBeat 1.5s ease-in-out infinite; }
        .animate-matchVerseIn { animation: matchVerseIn 0.6s ease-out forwards; }
        .animate-matchActionsIn { animation: matchActionsIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default MatchAnimation;
