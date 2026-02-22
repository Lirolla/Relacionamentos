import React, { useState } from 'react';
import { Heart, ArrowLeft, Users, MessageCircle, Church, MapPin, Video, BookOpen, Shield, Bell, Award, Camera, Phone, Map, UserCheck, Gift, Crown, Sparkles } from 'lucide-react';

const Tutorial: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  const sections = [
    { id: 'inicio', title: 'Começando', icon: Heart },
    { id: 'perfil', title: 'Seu Perfil', icon: Users },
    { id: 'explorar', title: 'Explorar', icon: Sparkles },
    { id: 'comunidade', title: 'Comunidade', icon: Video },
    { id: 'oracao', title: 'Oração', icon: BookOpen },
    { id: 'chat', title: 'Chat', icon: MessageCircle },
    { id: 'recursos', title: 'Recursos', icon: Crown },
    { id: 'seguranca', title: 'Segurança', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Heart size={20} className="text-white fill-white" />
            </div>
            <span className="text-xl font-black text-gray-900">Conexão Divina</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors font-semibold">
            <ArrowLeft size={18} /> Voltar
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">Como Usar o Conexão Divina</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guia completo com todas as funcionalidades do melhor app de relacionamento cristão do Brasil
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <h3 className="font-black text-gray-900 mb-4">Navegação</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100 font-semibold'
                    }`}
                  >
                    <section.icon size={20} />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg p-10 space-y-12">
              
              {/* Começando */}
              {activeSection === 'inicio' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Heart size={36} className="text-amber-600" />
                    Começando no Conexão Divina
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">1. Criar sua Conta</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        O Conexão Divina funciona com um <strong>sistema de convites exclusivo</strong> para garantir uma comunidade segura e de qualidade:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li><strong>Com Convite:</strong> Se você recebeu um código de convite de um amigo, use-o no cadastro para ser aprovado automaticamente</li>
                        <li><strong>Sem Convite:</strong> Você pode se cadastrar e entrar em uma fila de espera. Nossa equipe analisará seu perfil em até 48 horas</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">2. Onboarding Completo</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Após aprovação, você passará por um <strong>cadastro passo a passo</strong> de 8 etapas:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 1: Fotos</p>
                          <p className="text-sm text-gray-600">Adicione até 6 fotos suas</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 2: Dados Pessoais</p>
                          <p className="text-sm text-gray-600">Nome, idade, gênero</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 3: Localização</p>
                          <p className="text-sm text-gray-600">Cidade e estado</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 4: Fé</p>
                          <p className="text-sm text-gray-600">Denominação, igreja, batismo</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 5: Sobre Você</p>
                          <p className="text-sm text-gray-600">Bio e história com Jesus</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 6: Preferências</p>
                          <p className="text-sm text-gray-600">Estilo de louvor, objetivo</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 7: Interesses</p>
                          <p className="text-sm text-gray-600">Hobbies e atividades</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900">Etapa 8: Revisão</p>
                          <p className="text-sm text-gray-600">Confirme suas informações</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">3. Verificação (Recomendado)</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Para aumentar sua credibilidade e segurança, recomendamos fazer a <strong>verificação de identidade</strong>:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li><strong>Verificação por Vídeo Selfie:</strong> Grave um vídeo curto dizendo uma frase aleatória</li>
                        <li><strong>Verificação Pastoral:</strong> Peça ao pastor da sua igreja para confirmar que você frequenta a congregação</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Perfis verificados recebem um <strong>selo especial</strong> e têm mais visibilidade!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Perfil */}
              {activeSection === 'perfil' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Users size={36} className="text-amber-600" />
                    Seu Perfil
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Galeria de Fotos</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Você pode adicionar até <strong>9 fotos</strong> no seu perfil. A primeira foto é a <strong>foto principal</strong> que aparece nos cards de swipe.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque em qualquer foto para visualizar em tela cheia</li>
                        <li>Deslize para navegar entre as fotos</li>
                        <li>Use fotos claras e que mostrem seu rosto</li>
                        <li>Evite fotos em grupo ou com filtros excessivos</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Sistema de Reputação</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Seu perfil exibe uma <strong>nota de reputação</strong> baseada em avaliações de outros usuários após encontros presenciais:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <p className="font-bold text-green-900">4.5 - 5.0</p>
                          <p className="text-sm text-green-700">Excelente</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <p className="font-bold text-blue-900">3.5 - 4.4</p>
                          <p className="text-sm text-blue-700">Muito Bom</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <p className="font-bold text-yellow-900">2.5 - 3.4</p>
                          <p className="text-sm text-yellow-700">Bom</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Botões do Perfil</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <Church size={24} className="text-amber-600 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Eventos Cristãos</p>
                            <p className="text-sm text-gray-600">Veja eventos próximos a você</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <Map size={24} className="text-amber-600 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Mapa Cristão</p>
                            <p className="text-sm text-gray-600">Igrejas e eventos no mapa</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <Gift size={24} className="text-amber-600 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Convidar</p>
                            <p className="text-sm text-gray-600">Convide amigos para o app</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <UserCheck size={24} className="text-amber-600 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900">Verificar</p>
                            <p className="text-sm text-gray-600">Verificação de identidade</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Explorar */}
              {activeSection === 'explorar' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Sparkles size={36} className="text-amber-600" />
                    Explorar e Dar Match
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Como Funciona o Swipe</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Na aba <strong>Explorar</strong>, você vê cards de perfis de outros cristãos próximos a você:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-200">
                          <p className="text-4xl mb-2">❌</p>
                          <p className="font-bold text-gray-900 mb-2">Deslizar para Esquerda ou ❌</p>
                          <p className="text-sm text-gray-600">Passar para o próximo perfil</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                          <p className="text-4xl mb-2">❤️</p>
                          <p className="font-bold text-gray-900 mb-2">Deslizar para Direita ou ❤️</p>
                          <p className="text-sm text-gray-600">Curtir o perfil</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                          <p className="text-4xl mb-2">⭐</p>
                          <p className="font-bold text-gray-900 mb-2">Botão Estrela</p>
                          <p className="text-sm text-gray-600">Super Like (destaque especial)</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
                          <p className="text-4xl mb-2">👤</p>
                          <p className="font-bold text-gray-900 mb-2">Ver Perfil Completo</p>
                          <p className="text-sm text-gray-600">Ver todas as fotos e informações</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Match!</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Quando você e outra pessoa se curtem mutuamente, acontece um <strong>MATCH</strong>! 🎉
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Você verá uma animação especial com confetes e um versículo bíblico</li>
                        <li>A pessoa aparecerá na sua aba de Chat</li>
                        <li>Você pode enviar a primeira mensagem</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Filtros Avançados</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Use os <strong>filtros</strong> para encontrar exatamente o que você procura:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Idade (18-99 anos)</li>
                        <li>Distância (até 100 km)</li>
                        <li>Denominação (Batista, Assembleia, Católica, etc.)</li>
                        <li>Frequência na igreja</li>
                        <li>Verificação (apenas verificados)</li>
                        <li>Objetivo (namoro, casamento)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Compatibilidade de Fé</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Cada perfil exibe um <strong>percentual de compatibilidade</strong> baseado em:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
                        <li>Denominação e igreja</li>
                        <li>Valores e objetivos</li>
                        <li>Interesses em comum</li>
                        <li>Estilo de louvor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Comunidade */}
              {activeSection === 'comunidade' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Video size={36} className="text-amber-600" />
                    Feed da Comunidade
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">O que é o Feed da Comunidade?</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        O Feed da Comunidade é como um <strong>Instagram cristão</strong> dentro do app. Você pode:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Postar fotos, textos e testemunhos</li>
                        <li>Curtir, comentar e salvar posts</li>
                        <li>Ver posts de outros membros da comunidade</li>
                        <li>Filtrar por categorias (Testemunhos, Devocionais, Louvor, etc.)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Reels Cristãos</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Os <strong>Reels Cristãos</strong> são vídeos curtos verticais (15-60 segundos) estilo TikTok/Instagram Reels:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Testemunhos em vídeo</li>
                        <li>Momentos de louvor</li>
                        <li>Devocionais rápidos</li>
                        <li>Reflexões bíblicas</li>
                        <li>Momentos na igreja</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Acesse os Reels pelo botão no header do app!
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Stories com Câmera</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Publique <strong>Stories</strong> que desaparecem em 24 horas:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no botão "+" nos stories</li>
                        <li>Escolha entre Foto, Vídeo ou Texto</li>
                        <li>Aplique filtros visuais</li>
                        <li>Adicione stickers cristãos ("Deus é Fiel", "Abençoado", etc.)</li>
                        <li>Escreva uma legenda</li>
                        <li>Publique!</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Selo "Pastor Aprova"</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Usuários com <strong>verificação pastoral</strong> recebem um selo verde <strong>"PASTOR APROVA"</strong> nos posts, indicando que são membros ativos de uma igreja verificada.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Oração */}
              {activeSection === 'oracao' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <BookOpen size={36} className="text-amber-600" />
                    Modo Oração
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">O que é o Modo Oração?</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        O Modo Oração é um espaço especial onde a comunidade pode:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Compartilhar pedidos de oração</li>
                        <li>Orar pelos pedidos de outros membros</li>
                        <li>Deixar mensagens de encorajamento</li>
                        <li>Ver o versículo do dia para oração</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Como Fazer um Pedido de Oração</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>Vá para a aba <strong>Oração</strong></li>
                        <li>Toque no botão <strong>"Pedir Oração"</strong></li>
                        <li>Escolha uma categoria (Saúde, Família, Trabalho, Relacionamento, Espiritual, Financeiro)</li>
                        <li>Escreva seu pedido</li>
                        <li>Marque como urgente se necessário</li>
                        <li>Publique</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Como Orar por Alguém</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Quando você vê um pedido de oração:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no botão <strong>"Orar"</strong> para registrar sua intercessão</li>
                        <li>Deixe uma mensagem de encorajamento nos comentários</li>
                        <li>O autor do pedido será notificado que você orou</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat */}
              {activeSection === 'chat' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <MessageCircle size={36} className="text-amber-600" />
                    Chat e Mensagens
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Chat Completo</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        O chat do Conexão Divina possui recursos avançados:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900 mb-2">😊 Emojis</p>
                          <p className="text-sm text-gray-600">Painel com 50+ emojis</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900 mb-2">🎬 GIFs Animados</p>
                          <p className="text-sm text-gray-600">GIFs por categoria</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900 mb-2">🙏 Figurinhas Cristãs</p>
                          <p className="text-sm text-gray-600">8 figurinhas exclusivas</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900 mb-2">🎤 Áudio</p>
                          <p className="text-sm text-gray-600">Mensagens de voz</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900 mb-2">✏️ Digitando...</p>
                          <p className="text-sm text-gray-600">Indicador em tempo real</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="font-bold text-gray-900 mb-2">✓✓ Visto</p>
                          <p className="text-sm text-gray-600">Status de entrega e leitura</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Chamadas de Áudio e Vídeo</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Você pode fazer chamadas diretamente no app:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no ícone de <strong>telefone</strong> para chamada de áudio</li>
                        <li>Toque no ícone de <strong>vídeo</strong> para chamada de vídeo</li>
                        <li>Durante a chamada: mute, alto-falante, trocar câmera</li>
                        <li>Não precisa compartilhar WhatsApp antes de se sentir seguro!</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Devocional do Casal</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Após o match, você pode fazer <strong>devocionais juntos</strong>:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no ícone de <strong>livro</strong> no chat</li>
                        <li>Escolha um plano de leitura bíblica (21 dias, 14 dias, 7 dias)</li>
                        <li>Leia o versículo, reflexão e pergunta do dia</li>
                        <li>Compartilhe suas reflexões no chat</li>
                        <li>Acompanhe o progresso juntos</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Modo Acompanhante (Segurança)</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Ao encontrar alguém pessoalmente pela primeira vez, ative o <strong>Modo Acompanhante</strong>:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no ícone de <strong>escudo</strong> no chat</li>
                        <li>Cadastre um contato de confiança (nome + telefone)</li>
                        <li>Compartilhe sua localização em tempo real</li>
                        <li>Botão de emergência vermelho disponível</li>
                        <li>Check-in periódico de segurança</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Recursos */}
              {activeSection === 'recursos' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Crown size={36} className="text-amber-600" />
                    Recursos Especiais
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Sistema de Convites</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Convide amigos para o Conexão Divina:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Vá para Perfil → Convidar</li>
                        <li>Copie seu código de convite personalizado</li>
                        <li>Compartilhe via WhatsApp, Telegram ou email</li>
                        <li>Quem usar seu convite é aprovado automaticamente</li>
                        <li>Gerencie a fila de espera (aprovar/rejeitar)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Mapa Cristão</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Encontre igrejas e eventos próximos:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Veja igrejas no mapa interativo</li>
                        <li>Filtre por denominação</li>
                        <li>Veja distância, avaliação e horários de culto</li>
                        <li>Botão "Como Chegar" e "Ligar"</li>
                        <li>Lista de eventos cristãos próximos</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Notificações Inteligentes</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Receba notificações sobre:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Novos matches</li>
                        <li>Mensagens recebidas</li>
                        <li>Devocional do dia</li>
                        <li>Eventos próximos</li>
                        <li>Pedidos de oração</li>
                        <li>Curtidas e comentários em posts</li>
                        <li>Verificação pastoral aprovada</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Plano Premium</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Desbloqueie recursos exclusivos com o <strong>Plano Premium</strong> (R$ 29,90/mês):
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                          <p className="font-bold text-gray-900">❤️ Likes Ilimitados</p>
                          <p className="text-sm text-gray-600">Sem limite de likes por dia</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                          <p className="font-bold text-gray-900">🔍 Filtros Avançados</p>
                          <p className="text-sm text-gray-600">Todos os filtros disponíveis</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                          <p className="font-bold text-gray-900">👀 Ver Quem Curtiu</p>
                          <p className="text-sm text-gray-600">Veja quem deu like em você</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                          <p className="font-bold text-gray-900">⭐ Destaque no Perfil</p>
                          <p className="text-sm text-gray-600">Apareça mais nos swipes</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                          <p className="font-bold text-gray-900">🚫 Sem Anúncios</p>
                          <p className="text-sm text-gray-600">Experiência premium</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                          <p className="font-bold text-gray-900">🎬 Reels Exclusivos</p>
                          <p className="text-sm text-gray-600">Acesso a conteúdo premium</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Segurança */}
              {activeSection === 'seguranca' && (
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <Shield size={36} className="text-amber-600" />
                    Segurança e Privacidade
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Dicas de Segurança</h3>
                      <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                        <li><strong>Nunca compartilhe</strong> informações financeiras, senhas ou dados bancários</li>
                        <li><strong>Use o Modo Acompanhante</strong> ao encontrar alguém pessoalmente pela primeira vez</li>
                        <li><strong>Encontre-se em locais públicos</strong> e seguros</li>
                        <li><strong>Informe amigos ou familiares</strong> sobre seus planos</li>
                        <li><strong>Confie em seus instintos</strong> e denuncie comportamentos suspeitos</li>
                        <li><strong>Não compartilhe seu endereço</strong> antes de conhecer bem a pessoa</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Como Denunciar</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Se você encontrar um perfil ou comportamento inadequado:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no ícone de <strong>flag (bandeira)</strong> no perfil ou chat</li>
                        <li>Escolha o motivo da denúncia</li>
                        <li>Adicione detalhes (opcional)</li>
                        <li>Envie a denúncia</li>
                        <li>Nossa equipe analisará em até 24 horas</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Como Bloquear</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Para bloquear um usuário:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Vá para o perfil da pessoa</li>
                        <li>Toque no ícone de <strong>flag</strong></li>
                        <li>Escolha <strong>"Bloquear"</strong></li>
                        <li>A pessoa não poderá mais ver seu perfil ou entrar em contato</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Sistema de Reputação</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Após encontros presenciais, você pode avaliar a pessoa:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Toque no ícone de <strong>troféu</strong> no chat</li>
                        <li>Dê uma nota de 1 a 5 estrelas</li>
                        <li>Selecione traits (Respeitoso, Gentil, Fé genuína, Pontual)</li>
                        <li>As avaliações são anônimas</li>
                        <li>Isso ajuda a manter a comunidade segura e respeitosa</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-red-50 rounded-2xl border-2 border-red-200">
                      <h4 className="font-black text-red-900 mb-3 text-xl">⚠️ Sinais de Alerta</h4>
                      <p className="text-red-800 mb-3">Fique atento a estes comportamentos:</p>
                      <ul className="list-disc list-inside space-y-2 text-red-800 ml-4">
                        <li>Pedir dinheiro ou empréstimos</li>
                        <li>Pressionar para encontros rápidos</li>
                        <li>Recusar-se a fazer videochamada</li>
                        <li>Histórias inconsistentes</li>
                        <li>Linguagem ofensiva ou desrespeitosa</li>
                        <li>Tentar mover a conversa para fora do app rapidamente</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
