
import React, { useState } from 'react';
import { BookOpen, Heart, MessageCircle, Share2, ChevronRight, ChevronLeft, Sparkles, X } from 'lucide-react';

interface Devotional {
  id: string;
  date: string;
  verse: string;
  reference: string;
  reflection: string;
  question: string;
  prayer: string;
  theme: string;
}

interface CoupleDevotionalProps {
  partnerName: string;
  partnerPhoto: string;
  onClose: () => void;
  onShareInChat: (text: string) => void;
}

const DEVOTIONALS: Devotional[] = [
  {
    id: 'd1', date: 'Hoje',
    verse: '"Acima de tudo, porém, revistam-se do amor, que é o elo perfeito."',
    reference: 'Colossenses 3:14',
    reflection: 'O amor é descrito como o "elo perfeito" — aquilo que une todas as virtudes. Em um relacionamento cristão, o amor não é apenas um sentimento, mas uma decisão diária de escolher o outro, de perdoar, de servir. Quando colocamos o amor de Cristo como fundamento, tudo se conecta.',
    question: 'De que forma prática você pode demonstrar amor ao outro hoje?',
    prayer: 'Senhor, ensina-nos a amar como Tu nos amas. Que nosso relacionamento seja um reflexo do Teu amor incondicional. Ajuda-nos a escolher o amor todos os dias, mesmo quando for difícil. Amém.',
    theme: 'Amor'
  },
  {
    id: 'd2', date: 'Ontem',
    verse: '"Sejam completamente humildes e dóceis, e sejam pacientes, suportando uns aos outros com amor."',
    reference: 'Efésios 4:2',
    reflection: 'A paciência é uma das maiores provas de amor. Em um relacionamento, haverá momentos de divergência, de frustração, de espera. Mas é na paciência que demonstramos maturidade espiritual e amor verdadeiro. Suportar com amor não é aguentar calado, é escolher a graça.',
    question: 'Em que área do relacionamento vocês precisam exercitar mais paciência?',
    prayer: 'Pai, dá-nos paciência para os momentos difíceis. Que possamos suportar um ao outro com amor, assim como Tu nos suportas com graça infinita. Amém.',
    theme: 'Paciência'
  },
  {
    id: 'd3', date: 'Anteontem',
    verse: '"Confiem no Senhor de todo o coração e não se apoiem em seu próprio entendimento."',
    reference: 'Provérbios 3:5',
    reflection: 'Confiar em Deus juntos é o alicerce de um relacionamento forte. Quando colocamos nossa confiança no Senhor, deixamos de tentar controlar tudo e permitimos que Ele guie nossos passos. Juntos, podemos descansar na certeza de que Ele tem o melhor plano.',
    question: 'Qual decisão vocês precisam entregar nas mãos de Deus hoje?',
    prayer: 'Senhor, ensinamos a confiar em Ti acima de tudo. Que nossa confiança não esteja em nós mesmos, mas em Tua soberania e amor. Guia nossos passos juntos. Amém.',
    theme: 'Confiança'
  },
  {
    id: 'd4', date: '3 dias atrás',
    verse: '"Não se preocupem com nada, mas em tudo, pela oração e súplicas, com ação de graças, apresentem seus pedidos a Deus."',
    reference: 'Filipenses 4:6',
    reflection: 'A oração em casal é uma das práticas mais poderosas para fortalecer um relacionamento. Quando oramos juntos, nos tornamos vulneráveis diante de Deus e um do outro. Isso cria uma intimidade espiritual que nenhuma outra atividade pode proporcionar.',
    question: 'Vocês têm orado juntos regularmente? Como podem começar ou melhorar essa prática?',
    prayer: 'Deus, ensina-nos a orar juntos. Que a oração seja o primeiro recurso em nosso relacionamento, não o último. Une nossos corações em adoração a Ti. Amém.',
    theme: 'Oração'
  },
  {
    id: 'd5', date: '4 dias atrás',
    verse: '"Portanto, o que Deus uniu, ninguém separe."',
    reference: 'Marcos 10:9',
    reflection: 'Quando Deus está no centro de um relacionamento, Ele é quem sustenta. Não são apenas duas pessoas tentando fazer dar certo — é Deus trabalhando através de ambos. Protejam o que Deus está construindo entre vocês. Valorizem cada momento, cada aprendizado.',
    question: 'O que vocês podem fazer para proteger e fortalecer o relacionamento esta semana?',
    prayer: 'Senhor, protege nosso relacionamento de todo mal. Que sejamos fiéis um ao outro e a Ti. Fortalece o que Tu estás construindo entre nós. Amém.',
    theme: 'Compromisso'
  },
];

const THEME_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  'Amor': { bg: 'from-rose-500 to-pink-600', text: 'text-rose-50', accent: 'bg-rose-400/30' },
  'Paciência': { bg: 'from-emerald-500 to-teal-600', text: 'text-emerald-50', accent: 'bg-emerald-400/30' },
  'Confiança': { bg: 'from-blue-500 to-indigo-600', text: 'text-blue-50', accent: 'bg-blue-400/30' },
  'Oração': { bg: 'from-purple-500 to-violet-600', text: 'text-purple-50', accent: 'bg-purple-400/30' },
  'Compromisso': { bg: 'from-amber-500 to-orange-600', text: 'text-amber-50', accent: 'bg-amber-400/30' },
};

const CoupleDevotional: React.FC<CoupleDevotionalProps> = ({ partnerName, partnerPhoto, onClose, onShareInChat }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReflection, setShowReflection] = useState(false);
  const [myReflection, setMyReflection] = useState('');
  const [reflectionSent, setReflectionSent] = useState(false);

  const devotional = DEVOTIONALS[currentIndex];
  const colors = THEME_COLORS[devotional.theme] || THEME_COLORS['Amor'];

  const handleShareReflection = () => {
    if (myReflection.trim()) {
      onShareInChat(`📖 *Devocional: ${devotional.theme}*\n\n"${devotional.verse}"\n— ${devotional.reference}\n\n💭 Minha reflexão: ${myReflection}`);
      setReflectionSent(true);
      setTimeout(() => { setReflectionSent(false); setMyReflection(''); setShowReflection(false); }, 2000);
    }
  };

  const handleShareVerse = () => {
    onShareInChat(`📖 ${devotional.verse}\n— ${devotional.reference}\n\n🙏 Vamos meditar juntos nessa palavra?`);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl animate-scale-up max-h-[95vh] flex flex-col">
        {/* Header com gradiente */}
        <div className={`bg-gradient-to-br ${colors.bg} p-6 pb-8 relative`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 ${colors.accent} rounded-2xl`}>
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Devocional do Casal</h3>
                <p className="text-white/70 text-xs font-medium">{devotional.date} · Tema: {devotional.theme}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-white/20 rounded-full text-white">
              <X size={18} />
            </button>
          </div>

          {/* Partner info */}
          <div className="flex items-center gap-3 bg-white/15 rounded-2xl p-3 backdrop-blur-sm">
            <img src={partnerPhoto} className="w-10 h-10 rounded-full object-cover border-2 border-white/50" />
            <div>
              <p className="text-white text-sm font-bold">Devocional com {partnerName}</p>
              <p className="text-white/60 text-[11px]">Meditem juntos na Palavra</p>
            </div>
            <Sparkles size={20} className="text-white/50 ml-auto" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Versículo */}
          <div className="bg-slate-50 rounded-3xl p-6 mb-5 border border-slate-100">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Versículo do Dia</p>
            <p className="text-lg font-serif text-slate-800 leading-relaxed italic">{devotional.verse}</p>
            <p className="text-sm font-bold text-amber-600 mt-3">— {devotional.reference}</p>
          </div>

          {/* Reflexão */}
          <div className="mb-5">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Reflexão</p>
            <p className="text-sm text-slate-600 leading-relaxed">{devotional.reflection}</p>
          </div>

          {/* Pergunta */}
          <div className="bg-amber-50 rounded-2xl p-5 mb-5 border border-amber-100">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Pergunta para o Casal</p>
            <p className="text-sm font-medium text-slate-700">{devotional.question}</p>
          </div>

          {/* Oração */}
          <div className="bg-indigo-50 rounded-2xl p-5 mb-5 border border-indigo-100">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Oração Sugerida</p>
            <p className="text-sm text-slate-600 italic leading-relaxed">{devotional.prayer}</p>
          </div>

          {/* Reflexão pessoal */}
          {showReflection ? (
            <div className="mb-5">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Sua Reflexão</p>
              {reflectionSent ? (
                <div className="bg-emerald-50 rounded-2xl p-5 text-center border border-emerald-100">
                  <Heart size={32} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-emerald-600 font-bold">Reflexão enviada para {partnerName}!</p>
                </div>
              ) : (
                <>
                  <textarea
                    value={myReflection}
                    onChange={e => setMyReflection(e.target.value)}
                    placeholder={`Compartilhe sua reflexão com ${partnerName}...`}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24"
                  />
                  <button
                    onClick={handleShareReflection}
                    disabled={!myReflection.trim()}
                    className="w-full mt-3 py-3 bg-amber-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-40 text-sm"
                  >
                    Enviar Reflexão no Chat
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowReflection(true)}
              className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold text-sm hover:border-amber-300 hover:text-amber-600 transition-all mb-5"
            >
              <MessageCircle size={16} className="inline mr-2" /> Escrever Minha Reflexão
            </button>
          )}

          {/* Ações */}
          <div className="flex gap-3">
            <button
              onClick={handleShareVerse}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-2xl text-sm hover:bg-slate-200 transition-all"
            >
              <Share2 size={16}/> Enviar no Chat
            </button>
          </div>

          {/* Navegação entre devocionais */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(Math.min(currentIndex + 1, DEVOTIONALS.length - 1))}
              disabled={currentIndex >= DEVOTIONALS.length - 1}
              className="flex items-center gap-1 text-sm text-slate-400 font-medium disabled:opacity-30"
            >
              <ChevronLeft size={16}/> Anterior
            </button>
            <div className="flex gap-1.5">
              {DEVOTIONALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-amber-500 w-6' : 'bg-slate-200'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex(Math.max(currentIndex - 1, 0))}
              disabled={currentIndex <= 0}
              className="flex items-center gap-1 text-sm text-slate-400 font-medium disabled:opacity-30"
            >
              Próximo <ChevronRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupleDevotional;
