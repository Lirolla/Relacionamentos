import React, { useState } from 'react';
import { Heart, Shield, Church, MapPin, Star, Users, ChevronRight, Check, MessageCircle, Sparkles, Cross, Crown } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleStart = () => {
    window.location.href = '/app';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Cross size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Conexão Divina</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#como-funciona" className="hover:text-amber-600 transition-colors">Como Funciona</a>
            <a href="#recursos" className="hover:text-amber-600 transition-colors">Recursos</a>
            <a href="#depoimentos" className="hover:text-amber-600 transition-colors">Depoimentos</a>
            <a href="#planos" className="hover:text-amber-600 transition-colors">Planos</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/app" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">Entrar</a>
            <button onClick={handleStart} className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-amber-200">
              Começar Grátis
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} /> O app de relacionamentos para cristãos
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Encontre alguém que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">compartilhe sua fé</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Conexão Divina conecta cristãos solteiros que buscam um relacionamento sério, baseado em valores e propósito. Encontre seu par na fé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={handleStart} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-amber-200 flex items-center justify-center gap-2 text-lg">
                Criar Minha Conta <ChevronRight size={20} />
              </button>
              <a href="#como-funciona" className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-amber-300 transition-all flex items-center justify-center gap-2">
                Saiba Mais
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-gray-500">
              <span className="flex items-center gap-1"><Check size={16} className="text-green-500" /> Grátis para começar</span>
              <span className="flex items-center gap-1"><Shield size={16} className="text-blue-500" /> 100% Seguro</span>
              <span className="flex items-center gap-1"><Heart size={16} className="text-red-500" /> +5.000 membros</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-72 h-[500px] mx-auto bg-gradient-to-br from-amber-100 to-amber-50 rounded-[40px] shadow-2xl border border-amber-200 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white font-bold text-xl">Sarah, 24</h3>
                <p className="text-white/80 text-sm">Líder de Louvor • Batista</p>
                <p className="text-amber-300 text-xs mt-1 flex items-center gap-1"><MapPin size={12} /> 3 km de você</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce">
              <Heart size={32} className="text-red-500 fill-red-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"><Check size={16} className="text-green-600" /></div>
              <span className="text-sm font-bold text-gray-700">Novo Match!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-gray-600 max-w-lg mx-auto">Em poucos passos, você pode encontrar alguém especial que compartilha sua fé e valores.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Crie seu Perfil', desc: 'Preencha suas informações, igreja, denominação e o que busca em um relacionamento.', color: 'bg-purple-100 text-purple-600' },
              { icon: Heart, title: 'Encontre Conexões', desc: 'Navegue por perfis de cristãos próximos a você e descubra afinidades espirituais.', color: 'bg-red-100 text-red-600' },
              { icon: MessageCircle, title: 'Converse e Conheça', desc: 'Quando houver interesse mútuo, inicie uma conversa e construa uma conexão real.', color: 'bg-amber-100 text-amber-600' },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon size={28} />
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold text-gray-500">{i + 1}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Por que Conexão Divina?</h2>
            <p className="text-gray-600 max-w-lg mx-auto">Diferente de outros apps, somos feitos exclusivamente para cristãos que buscam relacionamentos sérios.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Church, title: 'Filtro por Igreja', desc: 'Encontre pessoas da sua denominação ou igreja específica.' },
              { icon: MapPin, title: 'GPS Inteligente', desc: 'Veja pessoas próximas a você com distância real verificada.' },
              { icon: Shield, title: 'Perfis Verificados', desc: 'Sistema de verificação para garantir perfis reais e seguros.' },
              { icon: Star, title: 'Match por Afinidade', desc: 'Algoritmo que considera valores espirituais e interesses.' },
              { icon: Heart, title: 'Discernimento Pastoral', desc: 'IA que oferece insights baseados em compatibilidade de fé.' },
              { icon: Crown, title: 'Premium', desc: 'Likes ilimitados, filtros avançados e destaque no perfil.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={22} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Histórias de Sucesso</h2>
            <p className="text-gray-600 max-w-lg mx-auto">Casais que se encontraram através da Conexão Divina.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Lucas & Amanda', time: 'Juntos há 1 ano', text: 'Nos conhecemos no app e hoje estamos noivos! Deus usou a tecnologia para nos unir.', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200' },
              { name: 'Rafael & Beatriz', time: 'Juntos há 8 meses', text: 'Frequentávamos igrejas diferentes mas o app nos conectou. Hoje servimos juntos!', img: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?auto=format&fit=crop&q=80&w=200' },
              { name: 'Daniel & Priscila', time: 'Casados há 6 meses', text: 'Achei que nunca encontraria alguém que compartilhasse meus valores. Deus é fiel!', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=200' },
            ].map((dep, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-600 italic mb-4">"{dep.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={dep.img} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{dep.name}</p>
                    <p className="text-xs text-gray-500">{dep.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Planos</h2>
            <p className="text-gray-600 max-w-lg mx-auto">Comece grátis e faça upgrade quando quiser.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border-2 border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Gratuito</h3>
              <p className="text-4xl font-black text-gray-900 mb-6">R$ 0<span className="text-lg font-normal text-gray-500">/mês</span></p>
              <ul className="space-y-3 mb-8">
                {['5 likes por dia', 'Ver perfis próximos', 'Chat com matches', 'Filtros básicos'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600"><Check size={16} className="text-green-500" /> {f}</li>
                ))}
              </ul>
              <button onClick={handleStart} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all">
                Começar Grátis
              </button>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-white text-xs font-bold">POPULAR</div>
              <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
              <p className="text-4xl font-black text-white mb-6">R$ 29,90<span className="text-lg font-normal text-amber-100">/mês</span></p>
              <ul className="space-y-3 mb-8">
                {['Likes ilimitados', 'Ver quem curtiu você', 'Filtros avançados', 'Destaque no perfil', 'Sem anúncios', 'Suporte prioritário'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-white"><Check size={16} className="text-amber-200" /> {f}</li>
                ))}
              </ul>
              <button onClick={handleStart} className="w-full py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-all">
                Assinar Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Pronto para encontrar seu par na fé?</h2>
          <p className="text-amber-100 text-lg mb-8">Junte-se a milhares de cristãos que já encontraram conexões significativas.</p>
          <button onClick={handleStart} className="px-10 py-4 bg-white text-amber-600 font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-xl text-lg flex items-center gap-2 mx-auto">
            Criar Minha Conta Grátis <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <Cross size={16} className="text-white" />
                </div>
                <span className="text-white font-bold">Conexão Divina</span>
              </div>
              <p className="text-sm">Conectando corações cristãos desde 2024.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#recursos" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#planos" className="hover:text-white transition-colors">Planos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Denunciar Abuso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Conexão Divina. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
