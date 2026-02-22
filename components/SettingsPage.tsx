
import React, { useState } from 'react';
import { X, ChevronRight, Bell, Lock, Eye, Shield, Globe, Moon, Trash2, LogOut, HelpCircle, FileText, Heart, MessageCircle, Users, Volume2, Vibrate, MapPin, Camera, User, Mail, Phone, ChevronLeft, Check, AlertTriangle, Info, ExternalLink } from 'lucide-react';

interface SettingsPageProps {
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose, darkMode, onToggleDarkMode, onLogout }) => {
  const [activeSection, setActiveSection] = useState<string>('main');
  const [notifications, setNotifications] = useState({
    matches: true, messages: true, likes: true, events: true, prayers: true,
    devotional: true, community: false, marketing: false, sound: true, vibration: true,
  });
  const [privacy, setPrivacy] = useState({
    showOnline: true, showDistance: true, showAge: true, showChurch: true,
    readReceipts: true, profileVisible: true, showInSearch: true,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-12 h-7 rounded-full transition-all flex-shrink-0 ${value ? 'bg-amber-500' : 'bg-slate-300'}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const SettingItem = ({ icon, label, desc, onClick, danger, rightContent }: { icon: React.ReactNode; label: string; desc?: string; onClick?: () => void; danger?: boolean; rightContent?: React.ReactNode }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all ${danger ? 'hover:bg-red-50' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${danger ? 'bg-red-100 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <span className={`font-medium text-sm ${danger ? 'text-red-600' : 'text-slate-800'}`}>{label}</span>
        {desc && <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>}
      </div>
      {rightContent || <ChevronRight size={16} className="text-slate-300" />}
    </button>
  );

  // Main Menu
  if (activeSection === 'main') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="flex items-center gap-3 p-5 border-b">
          <button onClick={onClose} className="p-2 text-slate-400"><X size={22} /></button>
          <h1 className="text-xl font-bold text-slate-800">Configurações</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Account Section */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-4 pb-2">Conta</p>
          <SettingItem icon={<User size={18} />} label="Editar Perfil" desc="Nome, bio, fotos" onClick={() => setActiveSection('profile')} />
          <SettingItem icon={<Mail size={18} />} label="E-mail e Senha" desc="Alterar credenciais" onClick={() => setActiveSection('email')} />
          <SettingItem icon={<Phone size={18} />} label="Número de Telefone" desc="Verificação e recuperação" onClick={() => setActiveSection('phone')} />

          {/* Notifications */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-6 pb-2">Notificações</p>
          <SettingItem icon={<Bell size={18} />} label="Notificações Push" desc="Gerenciar alertas" onClick={() => setActiveSection('notifications')} />
          <SettingItem icon={<Volume2 size={18} />} label="Sons e Vibração" desc="Configurar alertas sonoros"
            rightContent={
              <div className="flex gap-2">
                <Toggle value={notifications.sound} onChange={() => setNotifications(p => ({ ...p, sound: !p.sound }))} />
              </div>
            }
          />

          {/* Privacy */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-6 pb-2">Privacidade</p>
          <SettingItem icon={<Lock size={18} />} label="Privacidade" desc="Controle quem vê suas informações" onClick={() => setActiveSection('privacy')} />
          <SettingItem icon={<Shield size={18} />} label="Segurança" desc="Verificação, bloqueios" onClick={() => setActiveSection('security')} />
          <SettingItem icon={<Eye size={18} />} label="Visibilidade do Perfil" desc={privacy.profileVisible ? 'Visível para todos' : 'Oculto'}
            rightContent={<Toggle value={privacy.profileVisible} onChange={() => setPrivacy(p => ({ ...p, profileVisible: !p.profileVisible }))} />}
          />

          {/* Appearance */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-6 pb-2">Aparência</p>
          <SettingItem icon={<Moon size={18} />} label="Modo Escuro" desc={darkMode ? 'Ativado' : 'Desativado'}
            rightContent={<Toggle value={darkMode} onChange={onToggleDarkMode} />}
          />
          <SettingItem icon={<Globe size={18} />} label="Idioma" desc="Português (Brasil)" onClick={() => {}} />

          {/* Support */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-6 pb-2">Suporte</p>
          <SettingItem icon={<HelpCircle size={18} />} label="Central de Ajuda" desc="Perguntas frequentes" onClick={() => setActiveSection('help')} />
          <SettingItem icon={<FileText size={18} />} label="Termos de Uso" onClick={() => setActiveSection('terms')} />
          <SettingItem icon={<Shield size={18} />} label="Política de Privacidade" onClick={() => setActiveSection('privacy_policy')} />
          <SettingItem icon={<Info size={18} />} label="Sobre o App" desc="v5.0 · Conexão Divina" onClick={() => setActiveSection('about')} />

          {/* Danger Zone */}
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest px-4 pt-6 pb-2">Zona de Perigo</p>
          <SettingItem icon={<LogOut size={18} />} label="Sair da Conta" danger onClick={() => setShowLogoutConfirm(true)} />
          <SettingItem icon={<Trash2 size={18} />} label="Excluir Minha Conta" desc="Ação irreversível" danger onClick={() => setShowDeleteConfirm(true)} />
        </div>

        {/* Logout Confirm */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Sair da conta?</h3>
              <p className="text-sm text-slate-500 mb-6">Você precisará fazer login novamente para acessar sua conta.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl">Cancelar</button>
                <button onClick={onLogout} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-2xl">Sair</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 text-center">Excluir Minha Conta</h3>
              <p className="text-sm text-slate-600 mb-4 text-center">Esta ação é <strong className="text-red-600">permanente e irreversível</strong>. Você não poderá recuperar sua conta ou dados.</p>
              
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
                <p className="text-xs font-bold text-red-800 mb-2">⚠️ O QUE SERÁ EXCLUÍDO:</p>
                <ul className="text-xs text-red-700 space-y-1.5 pl-4">
                  <li>• Seu perfil completo e todas as fotos</li>
                  <li>• Todos os matches e conversas</li>
                  <li>• Histórico de atividades e interações</li>
                  <li>• Posts, stories e reels da comunidade</li>
                  <li>• Pedidos de oração e devocionais</li>
                  <li>• Assinatura premium (sem reembolso)</li>
                  <li>• Verificações de identidade e pastoral</li>
                  <li>• Sistema de reputação e avaliações</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
                <p className="text-xs font-bold text-amber-800 mb-2">📋 IMPORTANTE:</p>
                <ul className="text-xs text-amber-700 space-y-1.5 pl-4">
                  <li>• Você terá 30 dias para cancelar a exclusão</li>
                  <li>• Durante este período, sua conta ficará desativada</li>
                  <li>• Após 30 dias, todos os dados serão excluídos permanentemente</li>
                  <li>• Você pode reativar fazendo login dentro de 30 dias</li>
                </ul>
              </div>

              <p className="text-xs text-center text-slate-500 mb-6">Tem certeza que deseja continuar?</p>
              
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3.5 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">Cancelar</button>
                <button onClick={() => { 
                  alert('Sua conta foi marcada para exclusão. Você tem 30 dias para cancelar fazendo login novamente. Após este período, todos os dados serão permanentemente excluídos.');
                  setShowDeleteConfirm(false); 
                  onLogout(); 
                }} className="flex-1 py-3.5 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg">Excluir Conta</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Sub-sections
  const SubPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex items-center gap-3 p-5 border-b">
        <button onClick={() => setActiveSection('main')} className="p-2 text-slate-400"><ChevronLeft size={22} /></button>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
    </div>
  );

  if (activeSection === 'notifications') {
    return (
      <SubPage title="Notificações Push">
        <div className="space-y-1">
          {[
            { key: 'matches', label: 'Novos Matches', desc: 'Quando alguém curtir você de volta' },
            { key: 'messages', label: 'Mensagens', desc: 'Novas mensagens no chat' },
            { key: 'likes', label: 'Curtidas', desc: 'Quando alguém curtir seu perfil' },
            { key: 'events', label: 'Eventos', desc: 'Novos eventos perto de você' },
            { key: 'prayers', label: 'Pedidos de Oração', desc: 'Novos pedidos da comunidade' },
            { key: 'devotional', label: 'Devocional Diário', desc: 'Lembrete do devocional' },
            { key: 'community', label: 'Comunidade', desc: 'Curtidas e comentários nos seus posts' },
            { key: 'marketing', label: 'Promoções', desc: 'Ofertas e novidades do app' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50">
              <div>
                <span className="font-medium text-sm text-slate-800">{item.label}</span>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
              <Toggle value={(notifications as any)[item.key]} onChange={() => setNotifications(p => ({ ...p, [item.key]: !(p as any)[item.key] }))} />
            </div>
          ))}
        </div>
      </SubPage>
    );
  }

  if (activeSection === 'privacy') {
    return (
      <SubPage title="Privacidade">
        <div className="space-y-1">
          {[
            { key: 'showOnline', label: 'Mostrar status online', desc: 'Outros verão quando você estiver online' },
            { key: 'showDistance', label: 'Mostrar distância', desc: 'Exibir distância no seu perfil' },
            { key: 'showAge', label: 'Mostrar idade', desc: 'Exibir sua idade no perfil' },
            { key: 'showChurch', label: 'Mostrar igreja', desc: 'Exibir nome da sua igreja' },
            { key: 'readReceipts', label: 'Confirmação de leitura', desc: 'Mostrar quando você leu uma mensagem' },
            { key: 'showInSearch', label: 'Aparecer nas buscas', desc: 'Seu perfil aparece para outros usuários' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50">
              <div>
                <span className="font-medium text-sm text-slate-800">{item.label}</span>
                <p className="text-[10px] text-slate-400">{item.desc}</p>
              </div>
              <Toggle value={(privacy as any)[item.key]} onChange={() => setPrivacy(p => ({ ...p, [item.key]: !(p as any)[item.key] }))} />
            </div>
          ))}
        </div>
      </SubPage>
    );
  }

  if (activeSection === 'help') {
    return (
      <SubPage title="Central de Ajuda">
        <div className="space-y-4">
          {[
            { q: 'Como funciona o match?', a: 'Quando duas pessoas se curtem mutuamente, acontece um match! Vocês podem então conversar pelo chat.' },
            { q: 'Como verificar meu perfil?', a: 'Vá em Perfil > Verificação por Vídeo. Grave um vídeo curto dizendo a frase exibida. Nossa equipe analisará em até 24h.' },
            { q: 'O que é o selo "Pastor Aprova"?', a: 'É uma verificação feita pelo pastor da sua igreja, confirmando que você realmente frequenta aquela comunidade.' },
            { q: 'Como funciona o Modo Seguro?', a: 'No chat, toque no ícone de escudo. Cadastre um contato de confiança que receberá sua localização em tempo real durante encontros.' },
            { q: 'Como cancelar minha assinatura Premium?', a: 'Vá em Configurações > Conta > Gerenciar Assinatura. Você pode cancelar a qualquer momento.' },
            { q: 'Posso bloquear alguém?', a: 'Sim! No perfil da pessoa, toque nos três pontos e selecione "Bloquear". A pessoa não saberá que foi bloqueada.' },
            { q: 'Como denunciar um perfil falso?', a: 'No perfil da pessoa, toque na bandeira vermelha e selecione o motivo. Sua denúncia é confidencial.' },
          ].map((faq, i) => (
            <details key={i} className="bg-slate-50 rounded-2xl overflow-hidden">
              <summary className="p-4 font-medium text-sm text-slate-800 cursor-pointer hover:bg-slate-100 transition-all">{faq.q}</summary>
              <p className="px-4 pb-4 text-sm text-slate-500">{faq.a}</p>
            </details>
          ))}
          
          <div className="mt-6 p-5 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <p className="text-sm text-amber-800 font-medium">Não encontrou sua resposta?</p>
            <p className="text-xs text-amber-600 mt-1">Entre em contato: suporte@conexaodivina.app</p>
          </div>
        </div>
      </SubPage>
    );
  }

  if (activeSection === 'terms') {
    return (
      <SubPage title="Termos de Uso">
        <div className="prose prose-sm max-w-none text-slate-600">
          <h3 className="text-lg font-bold text-slate-800">Termos de Uso - Conexão Divina</h3>
          <p className="text-xs text-slate-400">Última atualização: Fevereiro 2026</p>
          
          <h4 className="font-bold text-slate-700 mt-4">1. Aceitação dos Termos</h4>
          <p className="text-sm">Ao utilizar o aplicativo Conexão Divina, você concorda com estes termos de uso. O app é destinado exclusivamente a maiores de 18 anos que buscam relacionamentos baseados em valores cristãos.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">2. Conduta do Usuário</h4>
          <p className="text-sm">Você se compromete a: manter informações verdadeiras em seu perfil; tratar outros usuários com respeito e dignidade; não utilizar o app para fins comerciais ou fraudulentos; respeitar os valores cristãos da comunidade.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">3. Conteúdo</h4>
          <p className="text-sm">É proibido publicar conteúdo: sexualmente explícito; que promova violência ou discriminação; que viole direitos autorais; que contenha informações falsas.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">4. Privacidade</h4>
          <p className="text-sm">Seus dados são protegidos conforme nossa Política de Privacidade. Nunca compartilharemos suas informações pessoais com terceiros sem seu consentimento.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">5. Assinatura Premium</h4>
          <p className="text-sm">A assinatura Premium é renovada automaticamente. Você pode cancelar a qualquer momento. Não há reembolso para períodos já pagos.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">6. Limitação de Responsabilidade</h4>
          <p className="text-sm">O Conexão Divina não se responsabiliza por interações entre usuários fora do aplicativo. Recomendamos sempre utilizar o Modo Seguro em encontros presenciais.</p>
        </div>
      </SubPage>
    );
  }

  if (activeSection === 'privacy_policy') {
    return (
      <SubPage title="Política de Privacidade">
        <div className="prose prose-sm max-w-none text-slate-600">
          <h3 className="text-lg font-bold text-slate-800">Política de Privacidade</h3>
          <p className="text-xs text-slate-400">Última atualização: Fevereiro 2026</p>
          
          <h4 className="font-bold text-slate-700 mt-4">Dados que Coletamos</h4>
          <p className="text-sm">Nome, e-mail, fotos, localização (com permissão), informações do perfil, preferências de busca, histórico de matches e mensagens.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">Como Usamos seus Dados</h4>
          <p className="text-sm">Para: personalizar sua experiência; encontrar matches compatíveis; enviar notificações relevantes; melhorar o app; garantir a segurança da comunidade.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">Compartilhamento</h4>
          <p className="text-sm">Nunca vendemos seus dados. Compartilhamos apenas: informações do perfil visíveis a outros usuários; dados anonimizados para análise; quando exigido por lei.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">Seus Direitos</h4>
          <p className="text-sm">Você pode: acessar seus dados; solicitar correção; solicitar exclusão; revogar consentimento; exportar seus dados (LGPD).</p>
          
          <h4 className="font-bold text-slate-700 mt-4">Segurança</h4>
          <p className="text-sm">Utilizamos criptografia de ponta a ponta nas mensagens, armazenamento seguro e monitoramento contínuo contra acessos não autorizados.</p>
          
          <h4 className="font-bold text-slate-700 mt-4">Contato</h4>
          <p className="text-sm">DPO: privacidade@conexaodivina.app</p>
        </div>
      </SubPage>
    );
  }

  if (activeSection === 'about') {
    return (
      <SubPage title="Sobre o App">
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-amber-200 mx-auto mb-6">
            <Heart size={48} fill="white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">Conexão Divina</h2>
          <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mt-1">Namoro Cristão</p>
          <p className="text-slate-400 text-sm mt-4">Versão 5.0.0</p>
          
          <div className="mt-8 space-y-3 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-medium text-slate-700">Desenvolvido com ❤️ e fé</span>
              <p className="text-xs text-slate-400 mt-1">Para a glória de Deus e a edificação da Igreja</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-medium text-slate-700">Missão</span>
              <p className="text-xs text-slate-400 mt-1">Conectar cristãos solteiros que buscam relacionamentos sérios fundamentados na fé</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-medium text-slate-700">Contato</span>
              <p className="text-xs text-slate-400 mt-1">contato@conexaodivina.app</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-300 mt-8">© 2026 Conexão Divina. Todos os direitos reservados.</p>
        </div>
      </SubPage>
    );
  }

  // Default fallback for other sections
  return (
    <SubPage title="Em breve">
      <div className="text-center py-12">
        <p className="text-slate-400">Esta seção estará disponível em breve.</p>
        <button onClick={() => setActiveSection('main')} className="mt-4 px-6 py-3 bg-amber-500 text-white rounded-2xl font-bold">Voltar</button>
      </div>
    </SubPage>
  );
};

export default SettingsPage;
