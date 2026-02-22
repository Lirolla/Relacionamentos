import React, { useState, useRef } from 'react';

interface PhotoUploadProps { currentPhotos: string[]; onUpload: (file: File) => void; onDelete: (index: number) => void; }
const PhotoUpload: React.FC<PhotoUploadProps> = ({ currentPhotos, onUpload, onDelete }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checking, setChecking] = useState(false);
  const [nsfwError, setNsfwError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkImageNSFW = async (file: File): Promise<{safe: boolean; reason?: string}> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/check-image', { method: 'POST', body: formData });
      const data = await res.json();
      return data;
    } catch {
      return { safe: true }; // fail-open
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Apenas imagens'); return; }
    if (file.size > 5*1024*1024) { alert('Max 5MB'); return; }
    
    setNsfwError(null);
    setChecking(true);
    const result = await checkImageNSFW(file);
    setChecking(false);
    
    if (!result.safe) {
      setNsfwError(result.reason || 'Conteúdo impróprio detectado.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    
    const r = new FileReader(); r.onload = () => setPreview(r.result as string); r.readAsDataURL(file);
  };

  const confirmUpload = async () => {
    const file = inputRef.current?.files?.[0]; if (!file) return;
    setUploading(true); const iv = setInterval(() => setProgress(p => Math.min(p+10,90)), 200);
    try { await onUpload(file); setProgress(100); } catch(e) { alert('Erro'); }
    clearInterval(iv); setTimeout(() => { setUploading(false); setProgress(0); setPreview(null); }, 500);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Suas Fotos</h3>
      
      {nsfwError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <span className="text-lg">🚫</span> {nsfwError}
          </p>
          <p className="text-red-400 text-xs mt-1">Envie uma foto apropriada para uma comunidade cristã.</p>
        </div>
      )}
      
      {checking && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-blue-600 text-sm font-medium flex items-center gap-2">
            <span className="animate-spin">⏳</span> Verificando imagem...
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-3">
        {currentPhotos.map((p,i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
            <img src={p} alt="" className="w-full h-full object-cover"/>
            <button onClick={()=>onDelete(i)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">✕</button>
            {i===0 && <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Principal</span>}
          </div>
        ))}
        {currentPhotos.length < 6 && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-purple-300 flex items-center justify-center cursor-pointer hover:bg-purple-50">
            <div className="text-center"><span className="text-3xl text-purple-400">+</span><p className="text-xs text-purple-400 mt-1">Adicionar</p></div>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden"/>
          </label>
        )}
      </div>
      {preview && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
          <img src={preview} alt="" className="w-full aspect-square object-cover rounded-xl mb-4"/>
          {uploading && <div className="w-full bg-gray-200 rounded-full h-2 mb-4"><div className="bg-purple-600 h-2 rounded-full transition-all" style={{width:`${progress}%`}}/></div>}
          <div className="flex gap-3">
            <button onClick={()=>{setPreview(null);if(inputRef.current)inputRef.current.value='';}} className="flex-1 py-2 border rounded-xl">Cancelar</button>
            <button onClick={confirmUpload} disabled={uploading} className="flex-1 py-2 bg-purple-600 text-white rounded-xl disabled:opacity-50">{uploading?'Enviando...':'Enviar'}</button>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default PhotoUpload;
