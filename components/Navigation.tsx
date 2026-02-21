
import React from 'react';
import { Heart, MessageCircle, User, LayoutDashboard, Flame, Star } from 'lucide-react';
import { UserRole } from '../types';

interface NavigationProps {
  activeTab: 'swipe' | 'chat' | 'profile' | 'admin' | 'favorites';
  setActiveTab: (tab: any) => void;
  role: UserRole;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, role }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex justify-between items-center z-50">
      <button 
        onClick={() => setActiveTab('swipe')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'swipe' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <Flame size={22} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Explorar</span>
      </button>

      <button 
        onClick={() => setActiveTab('favorites')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'favorites' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <Star size={22} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Favoritos</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'chat' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <MessageCircle size={22} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Bençãos</span>
      </button>

      {role === UserRole.ADMIN && (
        <button 
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'admin' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <LayoutDashboard size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tight">Gestão</span>
        </button>
      )}

      <button 
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-amber-600' : 'text-slate-400'}`}
      >
        <User size={22} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Perfil</span>
      </button>
    </nav>
  );
};

export default Navigation;
