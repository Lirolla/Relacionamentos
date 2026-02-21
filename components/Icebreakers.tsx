import React, { useState } from 'react';
interface Props { targetName: string; targetChurch?: string; targetBio?: string; onSelectMessage: (msg: string) => void; }
const Icebreakers: React.FC<Props> = ({ targetName, targetChurch, targetBio, onSelectMessage }) => {
  const generateSuggestions = () => [
    `Oi ${targetName}! Vi que você frequenta ${targetChurch || 'uma igreja'}, como é a comunidade lá?`,
    `${targetName}, seu testemunho me tocou! Adoraria conversar mais sobre sua caminhada na fé.`,
    `Qual seu versículo favorito, ${targetName}? O meu é Jeremias 29:11 😊`,
    `Se Jesus te convidasse pra um café, qual seria sua primeira pergunta? 😄`,
  ];
  const [suggestions, setSuggestions] = useState(generateSuggestions());
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3"><span className="text-xl">💡</span><h3 className="font-bold text-gray-800">Sugestões de mensagem</h3></div>
      <div className="space-y-2">
        {suggestions.map((s,i) => (
          <button key={i} onClick={() => onSelectMessage(s)} className="w-full text-left p-3 bg-purple-50 rounded-xl text-sm text-gray-700 hover:bg-purple-100 transition">{s}</button>
        ))}
      </div>
      <button onClick={() => setSuggestions(generateSuggestions())} className="mt-3 w-full py-2 border border-purple-300 text-purple-600 rounded-xl text-sm">🔄 Gerar novas sugestões</button>
    </div>
  );
};
export default Icebreakers;
