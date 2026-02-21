
import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, Calendar, BookOpen, Users, ShieldCheck, Crown, X, Check, Trash2, Church } from 'lucide-react';

interface AppNotification {
  id: string;
  type: 'match' | 'message' | 'event' | 'devotional' | 'prayer' | 'verification' | 'premium' | 'community' | 'pastor';
  title: string;
  description: string;
  imageUrl?: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

interface NotificationCenterProps {
  onClose: () => void;
  onNavigate?: (tab: string) => void;
}

const SAMPLE_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1', type: 'match', title: 'Novo Match!',
    description: 'Você e Maria Santos deram match! Comece uma conversa agora.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    read: false, createdAt: '5 min'
  },
  {
    id: 'n2', type: 'message', title: 'Nova mensagem',
    description: 'Ana Costa enviou: "Oi! Vi que frequentamos a mesma denominação..."',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    read: false, createdAt: '15 min'
  },
  {
    id: 'n3', type: 'devotional', title: 'Devocional do Dia',
    description: '"Acima de tudo, revistam-se do amor..." - Colossenses 3:14. Medite com seu match!',
    read: false, createdAt: '1h'
  },
  {
    id: 'n4', type: 'event', title: 'Evento perto de você!',
    description: 'Retiro de Solteiros 2026 acontece em 15/03 em Campos do Jordão. Inscreva-se!',
    read: false, createdAt: '2h'
  },
  {
    id: 'n5', type: 'prayer', title: 'Pedido de oração',
    description: '12 pessoas já oraram pelo seu pedido "Direção profissional". A comunidade está com você!',
    read: true, createdAt: '3h'
  },
  {
    id: 'n6', type: 'community', title: 'Post em destaque',
    description: 'Seu testemunho recebeu 47 curtidas! A comunidade foi abençoada.',
    read: true, createdAt: '5h'
  },
  {
    id: 'n7', type: 'pastor', title: 'Verificação Pastoral',
    description: 'Pastor João da Igreja Batista Central verificou seu perfil! Agora você tem o selo "Pastor Aprova".',
    read: true, createdAt: '1d'
  },
  {
    id: 'n8', type: 'verification', title: 'Identidade Verificada',
    description: 'Sua verificação de identidade foi aprovada! Seu perfil agora tem o selo de verificado.',
    read: true, createdAt: '2d'
  },
  {
    id: 'n9', type: 'premium', title: 'Oferta Premium',
    description: 'Desbloqueie likes ilimitados, veja quem curtiu você e muito mais. 7 dias grátis!',
    read: true, createdAt: '3d'
  },
];

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose, onNavigate }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(SAMPLE_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: AppNotification['type']) => {
    const icons: Record<string, { icon: React.ReactNode; bg: string }> = {
      match: { icon: <Heart size={18} className="text-red-500" />, bg: 'bg-red-50' },
      message: { icon: <MessageCircle size={18} className="text-blue-500" />, bg: 'bg-blue-50' },
      event: { icon: <Calendar size={18} className="text-purple-500" />, bg: 'bg-purple-50' },
      devotional: { icon: <BookOpen size={18} className="text-amber-500" />, bg: 'bg-amber-50' },
      prayer: { icon: <Users size={18} className="text-indigo-500" />, bg: 'bg-indigo-50' },
      verification: { icon: <ShieldCheck size={18} className="text-emerald-500" />, bg: 'bg-emerald-50' },
      premium: { icon: <Crown size={18} className="text-amber-500" />, bg: 'bg-amber-50' },
      community: { icon: <Heart size={18} className="text-pink-500" />, bg: 'bg-pink-50' },
      pastor: { icon: <Church size={18} className="text-emerald-600" />, bg: 'bg-emerald-50' },
    };
    return icons[type] || icons.match;
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell size={24} className="text-slate-800" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
                )}
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-800">Notificações</h3>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={18}/></button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                Todas
              </button>
              <button onClick={() => setFilter('unread')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === 'unread' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                Não lidas ({unreadCount})
              </button>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-amber-600 font-bold">
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 opacity-40">
              <Bell size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 text-sm">Nenhuma notificação</p>
            </div>
          ) : (
            <div>
              {filteredNotifications.map(notification => {
                const { icon, bg } = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`flex gap-3 p-4 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50 ${!notification.read ? 'bg-amber-50/30' : ''}`}
                  >
                    {notification.imageUrl ? (
                      <img src={notification.imageUrl} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${!notification.read ? 'text-slate-800' : 'text-slate-600'}`}>{notification.title}</span>
                        {!notification.read && <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notification.description}</p>
                      <p className="text-[10px] text-slate-300 mt-1 font-medium">{notification.createdAt}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }} className="p-1.5 text-slate-200 hover:text-red-400 transition-all self-start flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
