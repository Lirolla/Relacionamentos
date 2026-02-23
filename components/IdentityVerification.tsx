import React, { useState, useRef } from 'react';

interface Props { onSubmit: (file: File) => void; onClose: () => void; status: 'none'|'pending'|'verified'|'rejected'; }
const IdentityVerification: React.FC<Props> = ({ onSubmit, onClose, status }) => {
  const [step, setStep] = useState(status === 'pending' ? 3 : status === 'verified' ? 4 : 0);
  const [preview, setPreview] = useState<string|null>(null);
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const [checking, setChecking] = useState(false);
  const [nsfwError, setNsfwError] = useState<string|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkImageNSFW = async (file: File): Promise<{safe: boolean; reason?: string}> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/check-image', { method: 'POST', body: formData });
      return await res.json();
    } catch { return { safe: true }; }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setNsfwError(null);
    setChecking(true);
    const result = await checkImageNSFW(f);
    setChecking(false);
    if (!result.safe) {
      setNsfwError(result.reason || 'Conteúdo impróprio detectado.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setSelectedFile(f);
    const r = new FileReader(); r.onload = () => { setPreview(r.result as string); setStep(2); }; r.readAsDataURL(f);
  };

  const submit = () => { 
    if (selectedFile) { 
      onSubmit(selectedFile); 
      setStep(3); 
    } 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Verificação de Identidade</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        {nsfwError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">🚫 {nsfwError}</p>
          </div>
        )}
        {checking && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-600 text-sm font-medium"><span className="animate-spin inline-block">⏳</span> Verificando imagem...</p>
          </div>
        )}
        {status === 'verified' ? (
          <div className="text-center py-8"><div className="text-6xl mb-4">✅</div><p className="text-lg font-bold text-green-600">Perfil Verificado!</p><p className="text-gray-500 mt-2">Seu perfil já está verificado.</p></div>
        ) : step === 0 ? (
          <div className="text-center py-4">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-700 mb-2 font-semibold">Como funciona:</p>
            <ol className="text-left text-gray-600 text-sm space-y-2 mb-6">
              <li>1. Tire uma selfie segurando seu documento (RG ou CNH)</li>
              <li>2. O documento deve estar visível e legível</li>
              <li>3. Seu rosto deve estar claramente visível</li>
              <li>4. Nossa equipe analisará em até 24h</li>
            </ol>
            <button onClick={()=>setStep(1)} className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold">Começar Verificação</button>
          </div>
        ) : step === 1 ? (
          <div className="text-center py-4">
            <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4"><span className="text-5xl">🤳</span></div>
            <p className="text-gray-600 mb-4">Tire uma selfie segurando seu documento</p>
            <label className="block w-full py-3 bg-purple-600 text-white rounded-xl font-semibold cursor-pointer text-center">
              Tirar Foto / Selecionar<input ref={inputRef} type="file" accept="image/*" capture="user" onChange={handleFile} className="hidden"/>
            </label>
          </div>
        ) : step === 2 ? (
          <div className="text-center py-4">
            {preview && <img src={preview} alt="" className="w-full aspect-square object-cover rounded-xl mb-4"/>}
            <div className="flex gap-3">
              <button onClick={()=>{ setStep(1); setSelectedFile(null); setPreview(null); }} className="flex-1 py-3 border border-gray-300 rounded-xl">Refazer</button>
              <button onClick={submit} className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-semibold">Enviar</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8"><div className="text-6xl mb-4">⏳</div><p className="text-lg font-bold text-yellow-600">Enviado!</p><p className="text-gray-500 mt-2">Aguardando análise da equipe. Você será notificado em até 24h.</p></div>
        )}
      </div>
    </div>
  );
};
export default IdentityVerification;
