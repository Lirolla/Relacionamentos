
import React from 'react';
import { Heart, MessageCircle, User, Flame, Users, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

interface NavigationProps {
  activeTab: 'swipe' | 'chat' | 'profile' | 'favorites' | 'community' | 'prayer';
  setActiveTab: (tab: any) => void;
  role: UserRole;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, role }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2.5 flex justify-between items-center z-50 safe-area-bottom">
      <button 
        onClick={() => setActiveTab('swipe')}
        className={`flex flex-col items-center gap-0.5 transition-colors flex-1 ${activeTab === 'swipe' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <Flame size={20} />
        <span className="text-[8px] font-bold uppercase tracking-tight">Explorar</span>
      </button>

      <button 
        onClick={() => setActiveTab('community')}
        className={`flex flex-col items-center gap-0.5 transition-colors flex-1 ${activeTab === 'community' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <Users size={20} />
        <span className="text-[8px] font-bold uppercase tracking-tight">Comunidade</span>
      </button>

      <button 
        onClick={() => setActiveTab('prayer')}
        className={`flex flex-col items-center gap-0.5 transition-colors flex-1 ${activeTab === 'prayer' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <BookOpen size={20} />
        <span className="text-[8px] font-bold uppercase tracking-tight">Oração</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center gap-0.5 transition-colors flex-1 ${activeTab === 'chat' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <MessageCircle size={20} />
        <span className="text-[8px] font-bold uppercase tracking-tight">Chat</span>
      </button>

      <button 
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-0.5 transition-colors flex-1 ${activeTab === 'profile' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <User size={20} />
        <span className="text-[8px] font-bold uppercase tracking-tight">Perfil</span>
      </button>
    </nav>
  );
};

export default Navigation;
