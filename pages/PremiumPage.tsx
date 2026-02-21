import React from 'react';
import { Crown, Check, Heart, Star, Shield, Zap, ArrowLeft, Sparkles } from 'lucide-react';

const PremiumPage: React.FC = () => {
  const handleSubscribe = async () => {
    try {
      const res = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: '1' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erro ao criar sessao de pagamento. Tente novamente.');
      }
    } catch {
      alert('Servidor de pagamento indisponivel. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="px-6 py-4">
        <a href="/app" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} /> Voltar ao App
        </a>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-200">
            <Crown size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Conexao Divina Premium</h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">Desbloqueie todo o potencial do app e encontre sua conexao mais rapido.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border-2 border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-500 mb-4">Plano Gratuito</h3>
            <p className="text-3xl font-black text-gray-400 mb-6">R$ 0<span className="text-base font-normal">/mes</span></p>
            <ul className="space-y-3">
              {['5 likes por dia', 'Ver perfis proximos', 'Chat com matches', 'Filtros basicos'].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-500 text-sm"><Check size={16} className="text-gray-400" /> {f}</li>
              ))}
              {['Likes ilimitados', 'Ver quem curtiu voce', 'Filtros avancados', 'Destaque no perfil'].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm line-through"><Check size={16} className="text-gray-300" /> {f}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-3xl shadow-2xl shadow-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white/20 px-4 py-2 rounded-bl-2xl text-white text-xs font-bold flex items-center gap-1">
              <Sparkles size={14} /> RECOMENDADO
            </div>
            <h3 className="text-lg font-bold text-amber-100 mb-4">Plano Premium</h3>
            <p className="text-3xl font-black text-white mb-6">R$ 29,90<span className="text-base font-normal text-amber-100">/mes</span></p>
            <ul className="space-y-3 mb-8">
              {[
                { icon: Heart, text: 'Likes ilimitados' },
                { icon: Star, text: 'Ver quem curtiu voce' },
                { icon: Zap, text: 'Filtros avancados (altura, cor, etc.)' },
                { icon: Crown, text: 'Destaque no perfil' },
                { icon: Shield, text: 'Sem anuncios' },
                { icon: Sparkles, text: 'Suporte prioritario' },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-white text-sm"><f.icon size={16} className="text-amber-200" /> {f.text}</li>
              ))}
            </ul>
            <button onClick={handleSubscribe} className="w-full py-4 bg-white text-amber-600 font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-lg text-lg">
              Assinar Premium - R$ 29,90/mes
            </button>
            <p className="text-amber-200 text-xs text-center mt-3">Cancele quando quiser. Sem compromisso.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Perguntas Frequentes</h3>
          <div className="space-y-4">
            {[
              { q: 'Posso cancelar a qualquer momento?', a: 'Sim! Voce pode cancelar sua assinatura a qualquer momento. O acesso Premium continua ate o final do periodo pago.' },
              { q: 'Como funciona o pagamento?', a: 'O pagamento e processado de forma segura pelo Stripe. Aceitamos cartoes de credito e debito.' },
              { q: 'O que acontece se eu cancelar?', a: 'Seu perfil volta ao plano gratuito, mas seus matches e conversas sao mantidos.' },
              { q: 'Tem garantia?', a: 'Oferecemos 7 dias de garantia. Se nao gostar, devolvemos seu dinheiro.' },
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-4">
                <h4 className="font-bold text-gray-800 mb-1">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PremiumPage;
