import React, { useState } from 'react';
import { X, Send, Copy, Check, Users, Clock, UserPlus, Shield, Gift, Share2, Mail, MessageSquare, ChevronRight, Star, Crown, Heart, QrCode, Link2 } from 'lucide-react';

interface InviteSystemProps {
  onClose: () => void;
  userName: string;
  inviteCode: string;
  invitesSent: number;
  invitesAccepted: number;
}

interface PendingUser {
  id: string;
  name: string;
  email: string;
  photo: string;
  requestDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const SAMPLE_PENDING: PendingUser[] = [];

const InviteSystem: React.FC<InviteSystemProps> = ({ onClose, userName, inviteCode, invitesSent, invitesAccepted }) => {
  const [activeTab, setActiveTab] = useState<'invite' | 'pending' | 'history'>('invite');
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;
    setSendingInvite(true);
    setTimeout(() => {
      setSendingInvite(false);
      setInviteSent(true);
      setInviteEmail('');
      setInviteMessage('');
      setTimeout(() => setInviteSent(false), 3000);
    }, 1500);
  };

  const handleApprove = (userId: string) => {
    setPendingUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'approved' } : u));
  };

  const handleReject = (userId: string) => {
    setPendingUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
  };

  const inviteLink = `https://conexaodivina.app/convite/${inviteCode}`;

  return (
    <div className="fixed inset-0 z-[150] bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-slate-100 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={onClose} className="p-2 text-slate-400">
            <X size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Sistema de Convites</h1>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {[
            { id: 'invite', label: 'Convidar', icon: Send },
            { id: 'pending', label: `Fila (${pendingUsers.filter(u => u.status === 'pending').length})`, icon: Clock },
            { id: 'history', label: 'Histórico', icon: Users },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold transition-all ${activeTab === tab.id ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Invite Tab */}
        {activeTab === 'invite' && (
          <div className="space-y-6">
            {/* Exclusive Badge */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl p-6 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold">Comunidade Exclusiva</h2>
              <p className="text-white/80 text-sm mt-2">O Conexão Divina funciona por convite, garantindo uma comunidade segura e de qualidade.</p>
              
              <div className="flex justify-center gap-8 mt-6">
                <div>
                  <p className="text-2xl font-bold">{invitesSent}</p>
                  <p className="text-white/60 text-xs">Enviados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{invitesAccepted}</p>
                  <p className="text-white/60 text-xs">Aceitos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">∞</p>
                  <p className="text-white/60 text-xs">Disponíveis</p>
                </div>
              </div>
            </div>

            {/* Invite Code */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <h3 className="text-slate-800 font-bold text-sm mb-3 flex items-center gap-2">
                <QrCode size={16} className="text-amber-600" /> Seu Código de Convite
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white rounded-xl px-5 py-4 text-center">
                  <span className="text-2xl font-mono font-bold text-amber-600 tracking-[0.3em]">{inviteCode}</span>
                </div>
                <button onClick={handleCopyCode} className={`p-4 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'} active:scale-90`}>
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              {copied && <p className="text-green-600 text-xs font-bold text-center mt-2">Código copiado!</p>}
            </div>

            {/* Share Link */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <h3 className="text-slate-800 font-bold text-sm mb-3 flex items-center gap-2">
                <Link2 size={16} className="text-amber-600" /> Link de Convite
              </h3>
              <div className="bg-white rounded-xl px-4 py-3 text-sm text-slate-500 break-all mb-3">
                {inviteLink}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => window.open(`https://wa.me/?text=Ei! Te convido para o Conexão Divina, o melhor app de namoro cristão! Use meu código: ${inviteCode} ${inviteLink}`)} className="py-3 bg-green-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all">
                  WhatsApp
                </button>
                <button onClick={() => window.open(`https://t.me/share/url?url=${inviteLink}&text=Te convido para o Conexão Divina! Código: ${inviteCode}`)} className="py-3 bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all">
                  Telegram
                </button>
                <button onClick={handleCopyCode} className="py-3 bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all">
                  Copiar Link
                </button>
              </div>
            </div>

            {/* Send by Email */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <h3 className="text-slate-800 font-bold text-sm mb-3 flex items-center gap-2">
                <Mail size={16} className="text-amber-600" /> Convidar por E-mail
              </h3>
              <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="email@exemplo.com" className="w-full bg-white rounded-xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-amber-200 mb-3" />
              <textarea value={inviteMessage} onChange={e => setInviteMessage(e.target.value)} placeholder="Mensagem personalizada (opcional)..." rows={2} className="w-full bg-white rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200 resize-none mb-3" />
              <button onClick={handleSendInvite} disabled={!inviteEmail.trim() || sendingInvite} className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl active:scale-95 transition-all disabled:opacity-50">
                {sendingInvite ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enviando...
                  </span>
                ) : inviteSent ? (
                  <span className="flex items-center justify-center gap-2"><Check size={18} /> Convite Enviado!</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><Send size={18} /> Enviar Convite</span>
                )}
              </button>
            </div>

            {/* How it works */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="text-amber-800 font-bold text-sm mb-4">Como funciona?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <p className="text-amber-800 font-bold text-sm">Convide um irmão(ã)</p>
                    <p className="text-amber-700 text-xs">Envie seu código ou link de convite</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <p className="text-amber-800 font-bold text-sm">Acesso automático</p>
                    <p className="text-amber-700 text-xs">Quem usar seu código entra automaticamente!</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <p className="text-amber-800 font-bold text-sm">Sem convite? Fila de espera</p>
                    <p className="text-amber-700 text-xs">Quem não tem convite vai para aprovação manual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pending Tab - Approval Queue */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mb-4">
              <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
                <Shield size={16} /> Estas pessoas se cadastraram <strong>sem convite</strong> e aguardam aprovação manual.
              </p>
            </div>

            {pendingUsers.filter(u => u.status === 'pending').length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-slate-400" />
                </div>
                <p className="text-slate-500 font-bold">Nenhum pedido pendente</p>
                <p className="text-slate-400 text-sm mt-1">Todos os pedidos foram processados</p>
              </div>
            ) : (
              pendingUsers.filter(u => u.status === 'pending').map(user => (
                <div key={user.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <img src={user.photo} className="w-14 h-14 rounded-full object-cover" />
                    <div className="flex-1">
                      <h3 className="text-slate-800 font-bold text-sm">{user.name}</h3>
                      <p className="text-slate-400 text-xs">{user.email}</p>
                      <p className="text-slate-400 text-[10px] mt-1">Solicitou em {new Date(user.requestDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 mt-3">
                    <p className="text-slate-600 text-xs italic">"{user.reason}"</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleReject(user.id)} className="flex-1 py-3 bg-red-50 text-red-500 font-bold text-sm rounded-xl active:scale-95 transition-all">
                      Rejeitar
                    </button>
                    <button onClick={() => handleApprove(user.id)} className="flex-1 py-3 bg-green-500 text-white font-bold text-sm rounded-xl active:scale-95 transition-all">
                      <Check size={16} className="inline mr-1" /> Aprovar
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Approved/Rejected */}
            {pendingUsers.filter(u => u.status !== 'pending').length > 0 && (
              <div className="mt-6">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Processados</h3>
                {pendingUsers.filter(u => u.status !== 'pending').map(user => (
                  <div key={user.id} className="flex items-center gap-3 py-3 border-b border-slate-50">
                    <img src={user.photo} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-slate-800 text-sm font-medium">{user.name}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${user.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                      {user.status === 'approved' ? '✓ Aprovado' : '✕ Rejeitado'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
              <h3 className="text-green-800 font-bold text-sm mb-2">Seus Convites</h3>
              <div className="flex gap-6">
                <div>
                  <p className="text-green-800 text-2xl font-bold">{invitesSent}</p>
                  <p className="text-green-600 text-xs">Enviados</p>
                </div>
                <div>
                  <p className="text-green-800 text-2xl font-bold">{invitesAccepted}</p>
                  <p className="text-green-600 text-xs">Aceitos</p>
                </div>
                <div>
                  <p className="text-green-800 text-2xl font-bold">{invitesSent - invitesAccepted}</p>
                  <p className="text-green-600 text-xs">Pendentes</p>
                </div>
              </div>
            </div>

            {/* Recent invites */}
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Convites Recentes</h3>
            <div className="py-8 text-center">
              <p className="text-slate-400 text-sm">Nenhum convite enviado ainda</p>
              <p className="text-slate-300 text-xs mt-1">Convide amigos para ganhar benefícios!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Tela de espera para quem não tem convite
export const WaitingApproval: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex flex-col items-center justify-center p-8 text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-amber-200 mb-8">
      <Clock size={48} />
    </div>
    <h1 className="text-3xl font-bold text-slate-800">Fila de Espera</h1>
    <p className="text-slate-500 mt-4 max-w-xs leading-relaxed">
      O Conexão Divina é uma comunidade exclusiva. Seu cadastro foi recebido e está aguardando aprovação.
    </p>
    <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 mt-8 max-w-xs">
      <p className="text-amber-800 text-sm font-medium">
        <strong>Tem um código de convite?</strong> Quem recebe um convite de um membro entra automaticamente!
      </p>
    </div>
    <div className="mt-8 space-y-3 w-full max-w-xs">
      <input type="text" placeholder="Digite seu código de convite" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm text-center font-mono tracking-widest outline-none focus:ring-2 focus:ring-amber-500" />
      <button className="w-full py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all">
        Usar Código de Convite
      </button>
    </div>
    <button onClick={onBack} className="mt-6 text-slate-400 text-sm">← Voltar</button>
  </div>
);

export default InviteSystem;
