import React, { useState, useRef, useEffect } from 'react';

interface Message { id: string; senderId: string; content: string; createdAt: string; }
interface Match { id: string; name: string; photo: string; lastMessage?: string; messages?: Message[]; }
interface ChatProps { matches: Match[]; currentUserId: string; onSendMessage: (matchId: string, content: string) => void; onSelectMatch: (matchId: string) => void; selectedMatch?: Match | null; }

const Chat: React.FC<ChatProps> = ({ matches, currentUserId, onSendMessage, onSelectMatch, selectedMatch }) => {
  const [msg, setMsg] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [selectedMatch?.messages]);

  const send = () => { if (!msg.trim() || !selectedMatch) return; onSendMessage(selectedMatch.id, msg); setMsg(''); };

  if (!selectedMatch) return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold p-4 text-gray-800">Bênçãos (Chat)</h2>
      {matches.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div><div className="text-6xl mb-4">💬</div><p className="text-gray-500">Aguardando um match divino...</p><p className="text-gray-400 text-sm mt-2">Continue explorando perfis!</p></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">{matches.map(m => (
          <div key={m.id} onClick={() => onSelectMatch(m.id)} className="flex items-center gap-3 p-4 hover:bg-purple-50 cursor-pointer border-b">
            <img src={m.photo} alt={m.name} className="w-12 h-12 rounded-full object-cover"/>
            <div className="flex-1"><p className="font-semibold text-gray-800">{m.name}</p><p className="text-sm text-gray-500 truncate">{m.lastMessage || 'Diga olá!'}</p></div>
          </div>
        ))}</div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b bg-white">
        <button onClick={() => onSelectMatch('')} className="text-purple-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg></button>
        <img src={selectedMatch.photo} alt={selectedMatch.name} className="w-10 h-10 rounded-full object-cover"/>
        <p className="font-semibold text-gray-800">{selectedMatch.name}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {(selectedMatch.messages || []).map(m => (
          <div key={m.id} className={`flex ${m.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${m.senderId === currentUserId ? 'bg-purple-600 text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm'}`}>
              <p>{m.content}</p>
              <p className={`text-xs mt-1 ${m.senderId === currentUserId ? 'text-purple-200' : 'text-gray-400'}`}>{new Date(m.createdAt).toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'})}</p>
            </div>
          </div>
        ))}
        <div ref={endRef}/>
      </div>
      <div className="p-4 bg-white border-t flex gap-2">
        <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} className="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" placeholder="Digite uma mensagem..."/>
        <button onClick={send} className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
      </div>
    </div>
  );
};
export default Chat;
