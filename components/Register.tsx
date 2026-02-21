import React, { useState } from 'react';

interface RegisterProps { onRegister: (data: any) => void; onBack: () => void; }

const Register: React.FC<RegisterProps> = ({ onRegister, onBack }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', birthDate: '', gender: '', denomination: '', churchName: '', churchFrequency: '', bio: '', height: '', hairColor: '', objective: '' });
  const [error, setError] = useState('');
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const next = () => {
    if (step === 1 && (!form.name || !form.email || !form.password || !form.gender)) { setError('Preencha todos os campos'); return; }
    if (step === 1 && form.password !== form.confirmPassword) { setError('Senhas não conferem'); return; }
    setError(''); setStep(s => s + 1);
  };
  const denominations = ['Batista','Presbiteriana','Assembleia de Deus','Católica','Metodista','Adventista','Luterana','Pentecostal','Outra'];
  const frequencies = ['Toda semana','Quinzenal','Mensal','Ocasional'];
  const objectives = ['Namoro sério','Casamento','Amizade cristã'];
  const hairColors = ['Preto','Castanho','Loiro','Ruivo','Grisalho'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center gap-2 mb-6">
          {[1,2,3].map(s => <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>)}
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">{step === 1 ? 'Dados Pessoais' : step === 2 ? 'Sua Fé' : 'Sobre Você'}</h2>
        <p className="text-gray-500 text-center text-sm mb-6">Passo {step} de 3</p>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        {step === 1 && <div className="space-y-3">
          <input value={form.name} onChange={e=>set('name',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" placeholder="Nome completo"/>
          <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email"/>
          <input type="password" value={form.password} onChange={e=>set('password',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" placeholder="Senha"/>
          <input type="password" value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" placeholder="Confirmar senha"/>
          <input type="date" value={form.birthDate} onChange={e=>set('birthDate',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"/>
          <select value={form.gender} onChange={e=>set('gender',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"><option value="">Gênero</option><option value="male">Masculino</option><option value="female">Feminino</option></select>
        </div>}
        {step === 2 && <div className="space-y-3">
          <select value={form.denomination} onChange={e=>set('denomination',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"><option value="">Denominação</option>{denominations.map(d=><option key={d}>{d}</option>)}</select>
          <input value={form.churchName} onChange={e=>set('churchName',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500" placeholder="Nome da sua igreja"/>
          <select value={form.churchFrequency} onChange={e=>set('churchFrequency',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"><option value="">Frequência</option>{frequencies.map(f=><option key={f}>{f}</option>)}</select>
        </div>}
        {step === 3 && <div className="space-y-3">
          <textarea value={form.bio} onChange={e=>set('bio',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none" placeholder="Seu testemunho..."/>
          <select value={form.height} onChange={e=>set('height',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"><option value="">Altura</option>{Array.from({length:51},(_,i)=>150+i).map(h=><option key={h} value={h}>{h} cm</option>)}</select>
          <select value={form.hairColor} onChange={e=>set('hairColor',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"><option value="">Cor do cabelo</option>{hairColors.map(c=><option key={c}>{c}</option>)}</select>
          <select value={form.objective} onChange={e=>set('objective',e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"><option value="">Objetivo</option>{objectives.map(o=><option key={o}>{o}</option>)}</select>
        </div>}
        <div className="flex gap-3 mt-6">
          <button onClick={step===1?onBack:()=>setStep(s=>s-1)} className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50">Voltar</button>
          {step<3?<button onClick={next} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90">Próximo</button>
          :<button onClick={()=>{setError('');onRegister(form)}} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90">Criar Conta</button>}
        </div>
      </div>
    </div>
  );
};
export default Register;
