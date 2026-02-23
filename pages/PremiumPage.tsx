import React from 'react';
import { Crown, Check, Heart, Star, Shield, Zap, ArrowLeft, Sparkles, Gift } from 'lucide-react';

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
        alert('Erro ao criar sessão de pagamento. Tente novamente.');
      }
    } catch {
      alert('Servidor de pagamento indisponível. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="px-6 py-4">
        <a href="/app" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} /> Voltar ao App
        </a>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-200">
            <Crown size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Conexão Divina Premium</h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">Desbloqueie todo o potencial do app e encontre sua conexão mais rápido.</p>
        </div>

        {/* Card único Premium com 7 dias grátis */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-3xl shadow-2xl shadow-amber-200 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 bg-white/20 px-4 py-2 rounded-bl-2xl text-white text-xs font-bold flex items-center gap-1">
            <Gift size={14} /> 7 DIAS GRÁTIS
          </div>
          <h3 className="text-lg font-bold text-amber-100 mb-4">Plano Premium</h3>
          <p className="text-4xl font-black text-white mb-1">R$ 29,90<span className="text-base font-normal text-amber-100">/mês</span></p>
          <p className="text-amber-100 text-sm mb-8">Após o período de teste gratuito de 7 dias</p>
          <ul className="space-y-3 mb-8">
            {[
              { icon: Heart, text: 'Likes ilimitados' },
              { icon: Star, text: 'Ver quem curtiu você' },
              { icon: Zap, text: 'Filtros avançados (altura, cor, etc.)' },
              { icon: Crown, text: 'Destaque no perfil' },
              { icon: Shield, text: 'Sem anúncios' },
              { icon: Sparkles, text: 'Reels exclusivos' },
              { icon: Check, text: 'Chat com matches' },
              { icon: Check, text: 'Ver perfis próximos' },
              { icon: Check, text: 'Devocional do casal' },
              { icon: Check, text: 'Feed da comunidade' },
              { icon: Check, text: 'Verificação prioritária' },
              { icon: Check, text: 'Suporte VIP' },
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-white text-sm"><f.icon size={16} className="text-amber-200" /> {f.text}</li>
            ))}
          </ul>
          <button onClick={handleSubscribe} className="w-full py-4 bg-white text-amber-600 font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-lg text-lg">
            Começar 7 Dias Grátis
          </button>
          <p className="text-amber-200 text-xs text-center mt-3">Cancele a qualquer momento durante o período de teste</p>
        </div>

        {/* FAQ */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Perguntas Frequentes</h3>
          <div className="space-y-4">
            {[
              { q: 'Como funciona o período grátis?', a: 'Você tem 7 dias para testar todos os recursos Premium sem pagar nada. Após os 7 dias, a assinatura de R$ 29,90/mês é ativada automaticamente.' },
              { q: 'Posso cancelar durante o período grátis?', a: 'Sim! Se cancelar nos primeiros 7 dias, você não será cobrado. Simples assim.' },
              { q: 'Posso cancelar a qualquer momento?', a: 'Sim! Você pode cancelar sua assinatura a qualquer momento. O acesso Premium continua até o final do período pago.' },
              { q: 'Como funciona o pagamento?', a: 'O pagamento é processado de forma segura pelo Stripe. Aceitamos cartões de crédito e débito.' },
              { q: 'O que acontece se eu cancelar?', a: 'Seu perfil volta ao plano gratuito, mas seus matches e conversas são mantidos.' },
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
