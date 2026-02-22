import React, { useState } from 'react';
import { Heart, Shield, Church, MapPin, Star, Users, ChevronRight, Check, MessageCircle, Sparkles, Cross, Crown, Video, BookOpen, UserCheck, Bell, Award, Lock, FileText } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleStart = () => {
    window.location.href = '/app';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
              <Heart size={24} className="text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900">Conexão Divina</span>
              <p className="text-xs text-amber-600 font-bold">EXCLUSIVO & PREMIUM</p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#como-funciona" className="hover:text-amber-600 transition-colors">Como Funciona</a>
            <a href="#recursos" className="hover:text-amber-600 transition-colors">Recursos</a>
            <a href="#planos" className="hover:text-amber-600 transition-colors">Planos</a>
            <a href="/tutorial" className="hover:text-amber-600 transition-colors">Tutorial</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/app" className="text-sm font-bold text-gray-700 hover:text-amber-600 transition-colors">Entrar</a>
            <button onClick={handleStart} className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white text-sm font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-amber-300/50">
              Começar Grátis
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZiZjRlNCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-5 py-2.5 rounded-full text-sm font-black mb-8 shadow-md">
              <Sparkles size={18} className="animate-pulse" /> O MELHOR APP DE RELACIONAMENTO CRISTÃO DO BRASIL
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
              Encontre seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600">par perfeito</span> na fé
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              O Conexão Divina é o app premium que conecta cristãos solteiros que buscam um relacionamento sério, baseado em valores, propósito e amor genuíno. Encontre alguém que compartilhe sua fé e caminhe ao seu lado.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-10">
              <button onClick={handleStart} className="px-10 py-5 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-amber-300/50 flex items-center justify-center gap-3 text-lg">
                Criar Minha Conta Grátis <ChevronRight size={24} />
              </button>
              <a href="#como-funciona" className="px-10 py-5 bg-white text-gray-800 font-black rounded-2xl border-3 border-gray-300 hover:border-amber-400 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                Saiba Mais
              </a>
            </div>
            <div className="flex items-center gap-8 flex-wrap justify-center lg:justify-start text-sm font-bold text-gray-600">
              <span className="flex items-center gap-2"><Check size={20} className="text-green-600" /> Grátis para começar</span>
              <span className="flex items-center gap-2"><Shield size={20} className="text-blue-600" /> 100% Seguro e Verificado</span>
              <span className="flex items-center gap-2"><Heart size={20} className="text-red-600" /> Comunidade cristã ativa</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto">
              <img src="/images/hero-couple.jpg" className="w-full h-auto rounded-3xl shadow-2xl" alt="Casal cristão feliz" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center animate-bounce">
                <Heart size={40} className="text-red-500 fill-red-500" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Em poucos passos, você pode encontrar alguém especial que compartilha sua fé e valores cristãos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Users, title: 'Crie seu Perfil Premium', desc: 'Preencha suas informações, adicione fotos, conte sua história com Jesus, sua igreja, denominação e o que busca em um relacionamento.', color: 'from-purple-500 to-purple-700', bgColor: 'bg-purple-100' },
              { icon: Heart, title: 'Encontre Conexões Reais', desc: 'Navegue por perfis verificados de cristãos próximos a você, veja compatibilidade de fé e descubra afinidades espirituais profundas.', color: 'from-red-500 to-red-700', bgColor: 'bg-red-100' },
              { icon: MessageCircle, title: 'Converse e Construa', desc: 'Quando houver match, inicie uma conversa com icebreakers bíblicos, compartilhe devocionais e construa uma conexão genuína.', color: 'from-amber-500 to-amber-700', bgColor: 'bg-amber-100' },
            ].map((step, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all`}>
                  <step.icon size={36} className="text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-black text-white">{i + 1}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Por que Conexão Divina?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Diferente de outros apps, somos feitos exclusivamente para cristãos que buscam relacionamentos sérios e duradouros.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Church, title: 'Filtro por Igreja e Denominação', desc: 'Encontre pessoas da sua denominação, igreja específica ou que frequentam cultos próximos a você.', gradient: 'from-blue-500 to-blue-700' },
              { icon: MapPin, title: 'GPS Inteligente e Preciso', desc: 'Veja pessoas próximas a você com distância real verificada e eventos cristãos na sua região.', gradient: 'from-green-500 to-green-700' },
              { icon: Shield, title: 'Perfis 100% Verificados', desc: 'Sistema de verificação por vídeo selfie e aprovação pastoral para garantir perfis reais e seguros.', gradient: 'from-purple-500 to-purple-700' },
              { icon: Video, title: 'Reels Cristãos', desc: 'Vídeos curtos de testemunhos, louvores e momentos de fé. Conheça as pessoas de verdade.', gradient: 'from-pink-500 to-pink-700' },
              { icon: BookOpen, title: 'Devocional do Casal', desc: 'Versículos e reflexões diárias compartilhadas no chat para fortalecer a conexão espiritual.', gradient: 'from-amber-500 to-amber-700' },
              { icon: UserCheck, title: 'Sistema de Convites Exclusivo', desc: 'Comunidade exclusiva por convites, garantindo qualidade e segurança para todos os membros.', gradient: 'from-indigo-500 to-indigo-700' },
              { icon: Bell, title: 'Notificações Inteligentes', desc: 'Receba avisos de matches, mensagens, eventos próximos e pedidos de oração da comunidade.', gradient: 'from-red-500 to-red-700' },
              { icon: Award, title: 'Sistema de Reputação', desc: 'Avaliações após encontros garantem uma comunidade respeitosa e comprometida com valores cristãos.', gradient: 'from-yellow-500 to-yellow-700' },
              { icon: Crown, title: 'Plano Premium VIP', desc: 'Likes ilimitados, filtros avançados, destaque no perfil e acesso a recursos exclusivos.', gradient: 'from-orange-500 to-orange-700' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border-2 border-gray-200 hover:shadow-2xl hover:scale-105 transition-all group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="font-black text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imagem de Casal */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src="/images/couple-2.jpg" className="w-full h-auto rounded-3xl shadow-2xl" alt="Casal cristão lendo a Bíblia" />
            <div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">Construa um relacionamento com propósito</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                No Conexão Divina, acreditamos que relacionamentos cristãos devem ser fundamentados na Palavra de Deus. Por isso, oferecemos ferramentas exclusivas como devocionais compartilhados, planos de leitura bíblica em dupla e uma comunidade que ora e apoia uns aos outros.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Não é apenas um app de paquera. É uma plataforma completa para cristãos que desejam encontrar um parceiro para caminhar juntos na fé, servir a Deus e construir uma família alicerçada em valores eternos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      {/* Seção de depoimentos - será habilitada quando houver depoimentos reais */}

      {/* Planos */}
      <section id="planos" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Planos</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comece grátis e faça upgrade quando quiser para desbloquear recursos premium.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-3xl border-3 border-gray-300 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black text-gray-900 mb-3">Gratuito</h3>
              <p className="text-5xl font-black text-gray-900 mb-8">R$ 0<span className="text-xl font-normal text-gray-600">/mês</span></p>
              <ul className="space-y-4 mb-10">
                {['5 likes por dia', 'Ver perfis próximos', 'Chat com matches', 'Filtros básicos', 'Devocional do casal', 'Feed da comunidade'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-lg"><Check size={20} className="text-green-600" /> {f}</li>
                ))}
              </ul>
              <button onClick={handleStart} className="w-full py-4 bg-gray-200 text-gray-900 font-black rounded-2xl hover:bg-gray-300 transition-all text-lg">
                Começar Grátis
              </button>
            </div>
            <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 p-10 rounded-3xl shadow-2xl hover:scale-105 transition-all relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white text-amber-600 px-4 py-2 rounded-full text-xs font-black">MAIS POPULAR</div>
              <h3 className="text-2xl font-black text-white mb-3">Premium</h3>
              <p className="text-5xl font-black text-white mb-8">R$ 29,90<span className="text-xl font-normal text-white/80">/mês</span></p>
              <ul className="space-y-4 mb-10">
                {['Likes ilimitados', 'Filtros avançados', 'Ver quem curtiu você', 'Destaque no perfil', 'Sem anúncios', 'Reels exclusivos', 'Verificação prioritária', 'Suporte VIP'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-lg"><Check size={20} className="text-white" /> {f}</li>
                ))}
              </ul>
              <button onClick={handleStart} className="w-full py-4 bg-white text-amber-600 font-black rounded-2xl hover:scale-105 transition-all text-lg shadow-xl">
                Seja Premium Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Pronto para encontrar seu par na fé?</h2>
          <p className="text-xl mb-10 opacity-90">Junte-se à comunidade cristã que busca conexões reais e duradouras.</p>
          <button onClick={handleStart} className="px-12 py-5 bg-white text-amber-600 font-black rounded-2xl hover:scale-110 transition-all shadow-2xl text-xl">
            Criar Minha Conta Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
                  <Heart size={24} className="text-white fill-white" />
                </div>
                <span className="text-2xl font-black">Conexão Divina</span>
              </div>
              <p className="text-gray-400 leading-relaxed">O melhor app de relacionamento cristão do Brasil.</p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="/tutorial" className="hover:text-white transition-colors">Como Usar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Denunciar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Conexão Divina. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
