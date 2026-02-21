import React, { useState } from 'react';
interface Event { id: string; title: string; description: string; date: string; time: string; location: string; church: string; attendees: number; type: string; imageUrl?: string; }
interface Props { events: Event[]; onJoinEvent: (id: string) => void; onCreateEvent: (data: any) => void; }
const Events: React.FC<Props> = ({ events, onJoinEvent, onCreateEvent }) => {
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title:'', description:'', date:'', time:'', location:'', type:'culto' });
  const types = ['culto','retiro','conferencia','jantar','estudo_biblico'];
  const typeLabels: Record<string,string> = { culto:'Culto', retiro:'Retiro', conferencia:'Conferência', jantar:'Jantar', estudo_biblico:'Estudo Bíblico' };
  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Eventos Cristãos</h2>
        <button onClick={()=>setShowCreate(true)} className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl">+</button>
      </div>
      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        <button onClick={()=>setFilter('all')} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter==='all'?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>Todos</button>
        {types.map(t => <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${filter===t?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{typeLabels[t]}</button>)}
      </div>
      <div className="space-y-4">
        {filtered.map(e => (
          <div key={e.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
            {e.imageUrl && <img src={e.imageUrl} alt="" className="w-full h-32 object-cover"/>}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{e.title}</h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{typeLabels[e.type]||e.type}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{e.description}</p>
              <div className="text-xs text-gray-500 space-y-1 mb-3">
                <p>📅 {e.date} às {e.time}</p><p>📍 {e.location}</p><p>⛪ {e.church}</p><p>👥 {e.attendees} participantes</p>
              </div>
              <button onClick={()=>onJoinEvent(e.id)} className="w-full py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700">Participar</button>
            </div>
          </div>
        ))}
      </div>
      {showCreate && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Criar Evento</h3>
          <div className="space-y-3">
            <input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} className="w-full px-3 py-2 border rounded-xl" placeholder="Título"/>
            <textarea value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} className="w-full px-3 py-2 border rounded-xl h-20 resize-none" placeholder="Descrição"/>
            <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} className="w-full px-3 py-2 border rounded-xl"/>
            <input type="time" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} className="w-full px-3 py-2 border rounded-xl"/>
            <input value={form.location} onChange={e=>setForm(p=>({...p,location:e.target.value}))} className="w-full px-3 py-2 border rounded-xl" placeholder="Local"/>
            <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} className="w-full px-3 py-2 border rounded-xl">
              {types.map(t=><option key={t} value={t}>{typeLabels[t]}</option>)}
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={()=>setShowCreate(false)} className="flex-1 py-2 border rounded-xl">Cancelar</button>
            <button onClick={()=>{onCreateEvent(form);setShowCreate(false)}} className="flex-1 py-2 bg-purple-600 text-white rounded-xl">Criar</button>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default Events;
