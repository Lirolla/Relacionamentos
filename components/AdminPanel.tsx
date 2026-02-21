import React from 'react';
import { Profile, Match } from '../types';
import { Users, Heart, ShieldAlert, Search, Eye, Church, BarChart3, ExternalLink, Calendar, Flag, Crown, ArrowRight } from 'lucide-react';

interface AdminPanelProps {
  profiles: Profile[];
  matches: Match[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, matches }) => {
  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-serif text-slate-800">Secretaria Digital</h1>
        <p className="text-slate-500 text-sm mt-1">Visão rápida da comunidade</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center">
          <Users size={20} className="mx-auto text-amber-500 mb-2" />
          <p className="text-2xl font-black text-amber-600">{profiles.length + 1}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Membros</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center">
          <Heart size={20} className="mx-auto text-pink-500 mb-2" />
          <p className="text-2xl font-black text-pink-600">{matches.length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Matches</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center">
          <Church size={20} className="mx-auto text-blue-500 mb-2" />
          <p className="text-2xl font-black text-blue-600">4</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Igrejas</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center">
          <Calendar size={20} className="mx-auto text-purple-500 mb-2" />
          <p className="text-2xl font-black text-purple-600">3</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Eventos</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><BarChart3 size={18} className="text-amber-500"/> Ações Rápidas</h3>
        <div className="space-y-3">
          <a href="/admin" className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl hover:bg-amber-100 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white"><ShieldAlert size={18}/></div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Painel Administrativo Completo</p>
                <p className="text-xs text-slate-500">Gerenciar usuários, igrejas, eventos e denúncias</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-amber-500 group-hover:translate-x-1 transition-transform"/>
          </a>
          <a href="/admin" className="flex items-center justify-between p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white"><Flag size={18}/></div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Denúncias Pendentes</p>
                <p className="text-xs text-slate-500">Revisar e resolver denúncias de usuários</p>
              </div>
            </div>
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">3</span>
          </a>
          <a href="/admin" className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white"><Crown size={18}/></div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Assinaturas Premium</p>
                <p className="text-xs text-slate-500">Gerenciar assinantes e receita</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>
      </div>

      {/* Membros */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Users size={18} className="text-amber-500"/> Membros Recentes</h3>
        <div className="space-y-3">
          {profiles.slice(0, 4).map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <img src={p.imageUrl} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{p.name}, {p.age}</h4>
                  <p className="text-[10px] text-slate-400 font-medium uppercase flex items-center gap-1"><Church size={10}/> {p.churchName}</p>
                </div>
              </div>
              <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-full font-bold">{p.denomination}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
