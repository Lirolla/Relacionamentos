
import React, { useState } from 'react';
import { Profile, Match } from '../types';
import { Users, Heart, ShieldAlert, BarChart3, Search, Info, Church, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminPanelProps {
  profiles: Profile[];
  matches: Match[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profiles, matches }) => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const chartData = [
    { name: 'Membros', value: profiles.length + 1 },
    { name: 'Matches', value: matches.length },
    { name: 'Ativos', value: Math.floor(profiles.length * 0.8) },
  ];

  const COLORS = ['#d97706', '#059669', '#2563eb'];

  return (
    <div className="p-6 pb-24 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-serif text-slate-800">Secretaria Digital</h1>
        <p className="text-slate-500">Gestão de solteiros e moderação pastoral.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-black text-amber-600">{profiles.length + 1}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Membros</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-black text-emerald-600">{matches.length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">União</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert size={20} className="text-amber-500"/> Moderação</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
            <input 
              type="text" 
              placeholder="Buscar fiel..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredProfiles.map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <img src={p.imageUrl} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">{p.denomination}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProfile(p)}
                className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
              >
                <Eye size={20}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedProfile && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl p-8 animate-scale-up">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img src={selectedProfile.imageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-amber-500" />
                <div>
                  <h3 className="text-xl font-bold">{selectedProfile.name}</h3>
                  <p className="text-amber-600 text-xs font-bold uppercase">{selectedProfile.churchRole}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProfile(null)} className="text-slate-300">X</button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><Church size={12}/> Congregação</h5>
                <p className="text-sm font-semibold">{selectedProfile.denomination}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><Info size={12}/> Caminhada de Fé</h5>
                <p className="text-xs text-slate-600 leading-relaxed italic">"{selectedProfile.faithJourney}"</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="py-3 bg-rose-50 text-rose-600 font-bold rounded-2xl text-sm">Bloquear</button>
              <button onClick={() => setSelectedProfile(null)} className="py-3 bg-slate-800 text-white font-bold rounded-2xl text-sm">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
