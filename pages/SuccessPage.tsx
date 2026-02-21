import React from 'react';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Pagamento Confirmado!</h1>
        <p className="text-gray-600 mb-6">Parabens! Voce agora e um membro Premium do Conexao Divina.</p>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown size={24} className="text-amber-600" />
            <span className="font-bold text-amber-700 text-lg">Premium Ativo</span>
          </div>
          <p className="text-sm text-amber-600">Todos os recursos premium foram desbloqueados para voce.</p>
        </div>
        <ul className="text-left space-y-2 mb-8">
          {['Likes ilimitados', 'Ver quem curtiu voce', 'Filtros avancados', 'Destaque no perfil', 'Sem anuncios'].map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle size={16} className="text-green-500" /> {f}
            </li>
          ))}
        </ul>
        <a href="/app" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg">
          Voltar ao App <ArrowRight size={20} />
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
