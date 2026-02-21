import React, { useState } from 'react';
interface Props { onSubmit: (email: string) => void; onBack: () => void; }
const ForgotPassword: React.FC<Props> = ({ onSubmit, onBack }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handle = async () => {
    if (!email || !email.includes('@')) { setError('Digite um email válido'); return; }
    setLoading(true); setError('');
    try { await onSubmit(email); setSent(true); } catch(e: any) { setError(e.message || 'Erro'); }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {!sent ? (<>
          <div className="text-center mb-6"><span className="text-5xl">🔑</span><h2 className="text-xl font-bold text-gray-800 mt-3">Esqueceu sua senha?</h2><p className="text-gray-500 text-sm mt-1">Digite seu email para receber o link de recuperação</p></div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 mb-4" placeholder="seu@email.com"/>
          <button onClick={handle} disabled={loading} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold disabled:opacity-50">{loading?'Enviando...':'Enviar link de recuperação'}</button>
          <button onClick={onBack} className="w-full py-3 mt-3 text-purple-600 font-semibold">Voltar ao login</button>
        </>) : (<div className="text-center">
          <span className="text-5xl">📧</span>
          <h2 className="text-xl font-bold text-gray-800 mt-3">Email enviado!</h2>
          <p className="text-gray-500 mt-2">Verifique sua caixa de entrada em <strong>{email}</strong></p>
          <p className="text-gray-400 text-sm mt-2">Não recebeu? Verifique a pasta de spam.</p>
          <button onClick={onBack} className="w-full py-3 mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold">Voltar ao login</button>
        </div>)}
      </div>
    </div>
  );
};
export default ForgotPassword;
