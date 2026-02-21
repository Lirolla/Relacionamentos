import React, { useState } from 'react';
import { X, BookOpen, CheckCircle, Heart, MessageSquare, Calendar, ChevronRight, Star, Users, Clock, Award } from 'lucide-react';

const READING_PLANS = [
  {
    id: 'love21',
    title: '21 Dias sobre o Amor',
    description: 'Descubra juntos o que a Bíblia diz sobre o amor verdadeiro',
    duration: '21 dias',
    icon: '❤️',
    color: 'from-rose-400 to-pink-500',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    days: [
      { day: 1, title: 'O Amor é Paciente', verse: '1 Coríntios 13:4', text: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.', reflection: 'Como vocês podem praticar a paciência um com o outro no dia a dia?' },
      { day: 2, title: 'Amor Incondicional', verse: 'Romanos 8:38-39', text: 'Pois estou convencido de que nem morte nem vida, nem anjos nem demônios, poderá nos separar do amor de Deus.', reflection: 'O que significa para vocês um amor que nada pode separar?' },
      { day: 3, title: 'Amar como Cristo', verse: 'Efésios 5:25', text: 'Maridos, amem suas mulheres, assim como Cristo amou a igreja e entregou-se por ela.', reflection: 'Como vocês podem demonstrar amor sacrificial um pelo outro?' },
      { day: 4, title: 'O Maior Mandamento', verse: 'Mateus 22:37-39', text: 'Ame o Senhor, o seu Deus, de todo o seu coração. Este é o primeiro e maior mandamento. E o segundo é semelhante: Ame o seu próximo como a si mesmo.', reflection: 'Como o amor a Deus fortalece o amor entre vocês?' },
      { day: 5, title: 'Amor em Ação', verse: '1 João 3:18', text: 'Filhinhos, não amemos de palavra nem de boca, mas em ação e em verdade.', reflection: 'Que ação concreta de amor vocês podem fazer hoje um pelo outro?' },
    ]
  },
  {
    id: 'faith14',
    title: '14 Dias de Fé a Dois',
    description: 'Fortaleçam sua fé juntos com leituras diárias',
    duration: '14 dias',
    icon: '🙏',
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-100',
    days: [
      { day: 1, title: 'Fé como Semente', verse: 'Mateus 17:20', text: 'Se vocês tiverem fé do tamanho de um grão de mostarda, dirão a este monte: Mude daqui para lá, e ele mudará.', reflection: 'Qual é a montanha que vocês querem mover juntos pela fé?' },
      { day: 2, title: 'Confiar no Plano', verse: 'Jeremias 29:11', text: 'Pois eu sei os planos que tenho para vocês, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.', reflection: 'Como vocês podem confiar mais no plano de Deus para o relacionamento?' },
      { day: 3, title: 'Orar Juntos', verse: 'Mateus 18:20', text: 'Pois onde se reunirem dois ou três em meu nome, ali eu estou no meio deles.', reflection: 'Vocês já oraram juntos? Como foi essa experiência?' },
      { day: 4, title: 'Fé e Obras', verse: 'Tiago 2:17', text: 'Assim também a fé, por si só, se não for acompanhada de obras, está morta.', reflection: 'Que obras de fé vocês podem praticar juntos esta semana?' },
      { day: 5, title: 'Fortaleza na Fé', verse: 'Isaías 40:31', text: 'Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias.', reflection: 'Em que momento vocês precisaram esperar em Deus e foram fortalecidos?' },
    ]
  },
  {
    id: 'purpose7',
    title: '7 Dias de Propósito',
    description: 'Descubram juntos o propósito de Deus para vocês',
    duration: '7 dias',
    icon: '⭐',
    color: 'from-violet-400 to-purple-500',
    bgLight: 'bg-violet-50',
    borderLight: 'border-violet-100',
    days: [
      { day: 1, title: 'Criados com Propósito', verse: 'Efésios 2:10', text: 'Pois somos criação de Deus realizada em Cristo Jesus para fazermos boas obras, as quais Deus preparou antes para nós.', reflection: 'Qual propósito vocês acham que Deus tem para este relacionamento?' },
      { day: 2, title: 'Caminhar Juntos', verse: 'Amós 3:3', text: 'Andarão dois juntos, se não estiverem de acordo?', reflection: 'Em que valores e objetivos vocês estão de acordo?' },
      { day: 3, title: 'Servir Juntos', verse: 'Gálatas 5:13', text: 'Sirvam uns aos outros mediante o amor.', reflection: 'Como vocês podem servir a comunidade juntos?' },
    ]
  }
];

interface BibleReadingPlanProps {
  onClose: () => void;
  partnerName?: string;
}

const BibleReadingPlan: React.FC<BibleReadingPlanProps> = ({ onClose, partnerName }) => {
  const [selectedPlan, setSelectedPlan] = useState<typeof READING_PLANS[0] | null>(null);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState('');

  const toggleComplete = (planId: string, day: number) => {
    const key = `${planId}-${day}`;
    const newSet = new Set(completedDays);
    if (newSet.has(key)) newSet.delete(key); else newSet.add(key);
    setCompletedDays(newSet);
  };

  const getProgress = (plan: typeof READING_PLANS[0]) => {
    const completed = plan.days.filter(d => completedDays.has(`${plan.id}-${d.day}`)).length;
    return Math.round((completed / plan.days.length) * 100);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Leitura Bíblica a Dois</h3>
              <p className="text-indigo-100 text-sm">{partnerName ? `Com ${partnerName}` : 'Cresçam juntos na Palavra'}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Plan List */}
          {!selectedPlan && (
            <div className="space-y-4">
              <p className="text-slate-500 text-sm text-center mb-4">Escolha um plano de leitura para fazer juntos:</p>
              {READING_PLANS.map(plan => (
                <button 
                  key={plan.id} 
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-5 ${plan.bgLight} rounded-2xl border ${plan.borderLight} text-left active:scale-[0.98] transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{plan.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-lg">{plan.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                          <Calendar size={12} /> {plan.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                          <BookOpen size={12} /> {plan.days.length} leituras
                        </span>
                      </div>
                      {/* Progress bar */}
                      {getProgress(plan) > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span>Progresso</span>
                            <span className="font-bold">{getProgress(plan)}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${plan.color} rounded-full transition-all`} style={{ width: `${getProgress(plan)}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronRight size={20} className="text-slate-300 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Plan Detail */}
          {selectedPlan && activeDay === null && (
            <div className="space-y-4">
              <button onClick={() => setSelectedPlan(null)} className="text-sm text-indigo-500 font-bold flex items-center gap-1 mb-2">
                ← Voltar aos planos
              </button>
              <div className={`p-5 bg-gradient-to-r ${selectedPlan.color} rounded-2xl text-white text-center`}>
                <div className="text-4xl mb-2">{selectedPlan.icon}</div>
                <h4 className="text-xl font-bold">{selectedPlan.title}</h4>
                <p className="text-white/80 text-sm mt-1">{selectedPlan.description}</p>
                <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${getProgress(selectedPlan)}%` }} />
                </div>
                <p className="text-white/80 text-xs mt-2">{getProgress(selectedPlan)}% concluído</p>
              </div>

              {/* Days list */}
              <div className="space-y-2">
                {selectedPlan.days.map(day => {
                  const isCompleted = completedDays.has(`${selectedPlan.id}-${day.day}`);
                  return (
                    <button 
                      key={day.day}
                      onClick={() => setActiveDay(day.day)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 active:scale-[0.98] transition-all ${
                        isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isCompleted ? <CheckCircle size={20} /> : <span className="font-bold text-sm">{day.day}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-slate-800 text-sm">{day.title}</h5>
                        <p className="text-slate-400 text-xs">{day.verse}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Day Detail */}
          {selectedPlan && activeDay !== null && (
            <div className="space-y-6">
              <button onClick={() => { setActiveDay(null); setShowReflection(false); }} className="text-sm text-indigo-500 font-bold flex items-center gap-1">
                ← Voltar ao plano
              </button>
              
              {(() => {
                const day = selectedPlan.days.find(d => d.day === activeDay);
                if (!day) return null;
                const isCompleted = completedDays.has(`${selectedPlan.id}-${day.day}`);
                return (
                  <>
                    <div className="text-center">
                      <span className={`inline-block px-4 py-1 bg-gradient-to-r ${selectedPlan.color} text-white text-xs font-bold rounded-full mb-3`}>
                        DIA {day.day}
                      </span>
                      <h4 className="text-2xl font-bold text-slate-800">{day.title}</h4>
                      <p className="text-indigo-500 font-bold text-sm mt-1">{day.verse}</p>
                    </div>

                    {/* Verse */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl">
                      <p className="text-white text-lg leading-relaxed italic">"{day.text}"</p>
                      <p className="text-amber-400 text-sm font-bold mt-3">— {day.verse}</p>
                    </div>

                    {/* Reflection */}
                    <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                      <h5 className="font-bold text-indigo-700 text-sm mb-2 flex items-center gap-2">
                        <MessageSquare size={16} /> Reflexão para o Casal
                      </h5>
                      <p className="text-indigo-600 text-sm leading-relaxed">{day.reflection}</p>
                    </div>

                    {/* Write reflection */}
                    {showReflection ? (
                      <div>
                        <textarea 
                          value={reflectionText}
                          onChange={e => setReflectionText(e.target.value)}
                          placeholder="Escreva sua reflexão aqui..."
                          className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm h-24 resize-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                        <button 
                          onClick={() => setShowReflection(false)}
                          className="w-full mt-2 py-3 bg-indigo-500 text-white font-bold rounded-2xl text-sm active:scale-95 transition-all"
                        >
                          Salvar Reflexão
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowReflection(true)}
                        className="w-full py-3 bg-indigo-50 text-indigo-500 font-bold rounded-2xl text-sm border border-indigo-200 active:scale-95 transition-all"
                      >
                        ✍️ Escrever Minha Reflexão
                      </button>
                    )}

                    {/* Complete button */}
                    <button 
                      onClick={() => toggleComplete(selectedPlan.id, day.day)}
                      className={`w-full py-4 font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
                        isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-gradient-to-r ' + selectedPlan.color + ' text-white'
                      }`}
                    >
                      {isCompleted ? <><CheckCircle size={20} /> Concluído!</> : <><BookOpen size={20} /> Marcar como Lido</>}
                    </button>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BibleReadingPlan;
