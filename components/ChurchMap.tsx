import React, { useState } from 'react';
import { X, MapPin, Church, Calendar, Navigation2, Star, Users, Clock, Filter, ChevronRight, Phone, Globe, Award } from 'lucide-react';

const CHURCHES_MAP = [
  { id: 'c1', name: 'Igreja Batista Central', denomination: 'Batista', address: 'Rua Augusta, 1200 - São Paulo, SP', distance: '1.2 km', rating: 4.8, members: 450, verified: true, pastor: 'Pr. João Silva', phone: '(11) 3456-7890', lat: -23.55, lng: -46.65, services: ['Domingo 9h', 'Domingo 19h', 'Quarta 19:30'], events: 3 },
  { id: 'c2', name: 'Igreja Presbiteriana Renovada', denomination: 'Presbiteriana', address: 'Av. Paulista, 800 - São Paulo, SP', distance: '2.5 km', rating: 4.6, members: 320, verified: true, pastor: 'Pr. Carlos Mendes', phone: '(11) 3789-0123', lat: -23.56, lng: -46.66, services: ['Domingo 10h', 'Domingo 18h'], events: 1 },
  { id: 'c3', name: 'Assembleia de Deus Vitória', denomination: 'Assembleia de Deus', address: 'Rua da Consolação, 500 - São Paulo, SP', distance: '3.8 km', rating: 4.5, members: 680, verified: false, pastor: 'Pr. Marcos Oliveira', phone: '(11) 3234-5678', lat: -23.54, lng: -46.67, services: ['Domingo 9h', 'Domingo 18h', 'Terça 19:30', 'Quinta 19:30'], events: 2 },
  { id: 'c4', name: 'Comunidade Cristã Vida Nova', denomination: 'Não denominacional', address: 'Rua Oscar Freire, 300 - São Paulo, SP', distance: '4.1 km', rating: 4.9, members: 200, verified: true, pastor: 'Pr. André Lima', phone: '(11) 3567-8901', lat: -23.57, lng: -46.68, services: ['Domingo 10:30', 'Sexta 20h'], events: 5 },
  { id: 'c5', name: 'Igreja Metodista Central', denomination: 'Metodista', address: 'Av. Brigadeiro, 1500 - São Paulo, SP', distance: '5.3 km', rating: 4.4, members: 280, verified: true, pastor: 'Pra. Maria Costa', phone: '(11) 3678-9012', lat: -23.58, lng: -46.64, services: ['Domingo 9h', 'Domingo 18h', 'Quarta 19h'], events: 0 },
];

const NEARBY_EVENTS = [
  { id: 'ne1', title: 'Retiro de Solteiros 2026', church: 'Igreja Batista Central', date: '15 Mar', time: '08:00', location: 'Campos do Jordão, SP', distance: '180 km', attendees: 120, type: 'retiro', color: 'bg-emerald-500' },
  { id: 'ne2', title: 'Culto de Jovens Especial', church: 'Comunidade Cristã Vida Nova', date: '01 Mar', time: '19:30', location: 'Rua Oscar Freire, 300', distance: '4.1 km', attendees: 85, type: 'culto', color: 'bg-blue-500' },
  { id: 'ne3', title: 'Workshop: Relacionamentos Saudáveis', church: 'Igreja Presbiteriana Renovada', date: '08 Mar', time: '14:00', location: 'Av. Paulista, 800', distance: '2.5 km', attendees: 45, type: 'workshop', color: 'bg-purple-500' },
  { id: 'ne4', title: 'Louvor ao Pôr do Sol', church: 'Assembleia de Deus Vitória', date: '22 Fev', time: '17:00', location: 'Parque Ibirapuera', distance: '3.2 km', attendees: 200, type: 'louvor', color: 'bg-amber-500' },
];

interface ChurchMapProps {
  onClose: () => void;
}

const ChurchMap: React.FC<ChurchMapProps> = ({ onClose }) => {
  const [activeView, setActiveView] = useState<'map' | 'list' | 'events'>('map');
  const [selectedChurch, setSelectedChurch] = useState<typeof CHURCHES_MAP[0] | null>(null);
  const [filterDenomination, setFilterDenomination] = useState<string>('all');

  const denominations = ['all', ...new Set(CHURCHES_MAP.map(c => c.denomination))];
  const filteredChurches = filterDenomination === 'all' ? CHURCHES_MAP : CHURCHES_MAP.filter(c => c.denomination === filterDenomination);

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Mapa Cristão</h3>
              <p className="text-teal-100 text-sm">Igrejas e eventos perto de você</p>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'map', label: 'Mapa', icon: MapPin },
              { key: 'list', label: 'Igrejas', icon: Church },
              { key: 'events', label: 'Eventos', icon: Calendar },
            ].map(tab => (
              <button 
                key={tab.key}
                onClick={() => { setActiveView(tab.key as any); setSelectedChurch(null); }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                  activeView === tab.key ? 'bg-white text-teal-600' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Map View */}
          {activeView === 'map' && !selectedChurch && (
            <div className="space-y-4">
              {/* Map Simulation */}
              <div className="relative w-full h-64 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 rounded-2xl overflow-hidden border border-slate-200">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={`h${i}`} className="absolute w-full h-px bg-slate-400" style={{ top: `${(i + 1) * 12.5}%` }} />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div key={`v${i}`} className="absolute h-full w-px bg-slate-400" style={{ left: `${(i + 1) * 12.5}%` }} />
                  ))}
                </div>
                
                {/* User location */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                    <Navigation2 size={14} className="text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-blue-400/20 rounded-full animate-ping" />
                </div>

                {/* Church pins */}
                {CHURCHES_MAP.map((church, i) => {
                  const positions = [
                    { top: '25%', left: '30%' },
                    { top: '35%', left: '65%' },
                    { top: '60%', left: '20%' },
                    { top: '20%', left: '75%' },
                    { top: '70%', left: '60%' },
                  ];
                  const pos = positions[i] || positions[0];
                  return (
                    <button 
                      key={church.id}
                      onClick={() => setSelectedChurch(church)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-125 ${
                        church.verified ? 'bg-amber-500' : 'bg-slate-500'
                      }`}>
                        <Church size={14} className="text-white" />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-0.5 rounded-full shadow text-[9px] font-bold text-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
                        {church.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </button>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl text-[10px] space-y-1">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full" /> Você</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-500 rounded-full" /> Verificada</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-500 rounded-full" /> Igreja</div>
                </div>
              </div>

              <p className="text-slate-400 text-xs text-center">Toque em uma igreja no mapa para ver detalhes</p>

              {/* Quick list */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 text-sm">Mais próximas de você</h4>
                {CHURCHES_MAP.slice(0, 3).map(church => (
                  <button 
                    key={church.id}
                    onClick={() => setSelectedChurch(church)}
                    className="w-full p-3 bg-slate-50 rounded-xl flex items-center gap-3 text-left active:scale-[0.98] transition-all"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${church.verified ? 'bg-amber-100' : 'bg-slate-200'}`}>
                      <Church size={18} className={church.verified ? 'text-amber-600' : 'text-slate-500'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h5 className="font-bold text-slate-800 text-sm truncate">{church.name}</h5>
                        {church.verified && <Award size={12} className="text-amber-500 shrink-0" />}
                      </div>
                      <p className="text-slate-400 text-xs">{church.distance} · {church.denomination}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{church.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Church Detail */}
          {selectedChurch && (
            <div className="space-y-5">
              <button onClick={() => setSelectedChurch(null)} className="text-sm text-teal-500 font-bold flex items-center gap-1">
                ← Voltar
              </button>

              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 ${selectedChurch.verified ? 'bg-amber-100' : 'bg-slate-100'}`}>
                  <Church size={36} className={selectedChurch.verified ? 'text-amber-600' : 'text-slate-500'} />
                </div>
                <h4 className="text-xl font-bold text-slate-800">{selectedChurch.name}</h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-slate-400 text-sm">{selectedChurch.denomination}</span>
                  {selectedChurch.verified && (
                    <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Award size={10} /> VERIFICADA
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="font-bold text-sm">{selectedChurch.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Users size={14} />
                    <span>{selectedChurch.members} membros</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Navigation2 size={14} />
                    <span>{selectedChurch.distance}</span>
                  </div>
                </div>
              </div>

              {/* Info cards */}
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-teal-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Endereço</p>
                      <p className="text-slate-700 text-sm">{selectedChurch.address}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Users size={18} className="text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Pastor</p>
                      <p className="text-slate-700 text-sm">{selectedChurch.pastor}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Cultos</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedChurch.services.map((s, i) => (
                          <span key={i} className="bg-purple-50 text-purple-600 text-xs font-bold px-2 py-1 rounded-lg">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Contato</p>
                      <p className="text-slate-700 text-sm">{selectedChurch.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedChurch.events > 0 && (
                <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 text-center">
                  <Calendar size={20} className="mx-auto text-teal-500 mb-1" />
                  <p className="text-teal-700 font-bold text-sm">{selectedChurch.events} eventos próximos</p>
                </div>
              )}
            </div>
          )}

          {/* Churches List */}
          {activeView === 'list' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                {denominations.map(d => (
                  <button 
                    key={d}
                    onClick={() => setFilterDenomination(d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      filterDenomination === d ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {d === 'all' ? 'Todas' : d}
                  </button>
                ))}
              </div>

              {filteredChurches.map(church => (
                <button 
                  key={church.id}
                  onClick={() => { setSelectedChurch(church); setActiveView('map'); }}
                  className="w-full p-4 bg-slate-50 rounded-2xl flex items-center gap-3 text-left active:scale-[0.98] transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${church.verified ? 'bg-amber-100' : 'bg-slate-200'}`}>
                    <Church size={22} className={church.verified ? 'text-amber-600' : 'text-slate-500'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h5 className="font-bold text-slate-800 text-sm truncate">{church.name}</h5>
                      {church.verified && <Award size={12} className="text-amber-500 shrink-0" />}
                    </div>
                    <p className="text-slate-400 text-xs">{church.denomination} · {church.distance}</p>
                    <p className="text-slate-400 text-xs truncate">{church.address}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{church.rating}</span>
                    </div>
                    <p className="text-slate-300 text-[10px] mt-0.5">{church.members} membros</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Events View */}
          {activeView === 'events' && (
            <div className="space-y-4">
              <p className="text-slate-500 text-sm text-center">Eventos cristãos perto de você</p>
              {NEARBY_EVENTS.map(event => (
                <div key={event.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${event.color} rounded-xl flex flex-col items-center justify-center text-white shrink-0`}>
                      <span className="text-[10px] font-bold uppercase">{event.date.split(' ')[1]}</span>
                      <span className="text-lg font-black leading-none">{event.date.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-slate-800 text-sm">{event.title}</h5>
                      <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                        <Church size={10} /> {event.church}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                        <span className="flex items-center gap-1"><Navigation2 size={10} /> {event.distance}</span>
                        <span className="flex items-center gap-1"><Users size={10} /> {event.attendees}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2.5 bg-teal-500 text-white font-bold rounded-xl text-xs active:scale-95 transition-all">
                    Quero Participar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChurchMap;
