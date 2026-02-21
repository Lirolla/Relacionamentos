import React, { useState } from 'react';
interface OnboardingProps { onComplete: () => void; }
const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [page, setPage] = useState(0);
  const slides = [
    { icon: '❤️', title: 'Bem-vindo ao Conexão Divina', text: 'Encontre seu par perfeito na fé. Um app feito para cristãos que buscam relacionamentos sérios.' },
    { icon: '🛡️', title: 'Perfis Verificados', text: 'Todos os perfis são verificados para sua segurança. Selfie + documento para garantir que é real.' },
    { icon: '⛪', title: 'Sua Comunidade', text: 'Conecte-se com pessoas da sua denominação e da sua região. Filtros por igreja, distância e mais.' },
    { icon: '🚀', title: 'Pronto para Começar?', text: 'Crie seu perfil, explore pessoas incríveis e encontre sua bênção!' }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-sm">
        <div className="text-8xl mb-8">{slides[page].icon}</div>
        <h1 className="text-2xl font-bold mb-4">{slides[page].title}</h1>
        <p className="text-purple-100 mb-8">{slides[page].text}</p>
      </div>
      <div className="flex gap-2 mb-8">
        {slides.map((_,i) => <div key={i} className={`w-3 h-3 rounded-full ${i===page?'bg-white':'bg-white/30'}`}/>)}
      </div>
      {page < 3 ? (
        <div className="flex gap-4 w-full max-w-sm">
          <button onClick={onComplete} className="flex-1 py-3 border-2 border-white/50 rounded-xl text-white/80 hover:bg-white/10">Pular</button>
          <button onClick={()=>setPage(p=>p+1)} className="flex-1 py-3 bg-white text-purple-700 rounded-xl font-bold hover:bg-purple-50">Próximo</button>
        </div>
      ) : (
        <button onClick={onComplete} className="w-full max-w-sm py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-50">Começar Agora!</button>
      )}
    </div>
  );
};
export default Onboarding;
