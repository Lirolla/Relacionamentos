import React, { useState } from 'react';

interface Story { id: string; userId: string; userName: string; userPhoto: string; imageUrl: string; createdAt: string; viewed?: boolean; }
interface Props { stories: Story[]; onPostStory: (file: File) => void; onViewStory: (id: string) => void; currentUserId: string; }
const Stories: React.FC<Props> = ({ stories, onPostStory, onViewStory, currentUserId }) => {
  const [viewing, setViewing] = useState<Story|null>(null);
  const [progress, setProgress] = useState(0);
  const [checking, setChecking] = useState(false);

  const checkImageNSFW = async (file: File): Promise<{safe: boolean; reason?: string}> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/check-image', { method: 'POST', body: formData });
      return await res.json();
    } catch { return { safe: true }; }
  };

  const handleStoryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setChecking(true);
    const result = await checkImageNSFW(f);
    setChecking(false);
    if (!result.safe) {
      alert('🚫 ' + (result.reason || 'Conteúdo impróprio detectado. Esta imagem não pode ser enviada.'));
      e.target.value = '';
      return;
    }
    onPostStory(f);
  };

  const grouped = stories.reduce((acc: Record<string, Story[]>, s) => { (acc[s.userId] = acc[s.userId] || []).push(s); return acc; }, {});
  const openStory = (s: Story) => { setViewing(s); setProgress(0); onViewStory(s.id);
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); setTimeout(() => setViewing(null), 300); return 100; } return p + 2; }), 100);
  };
  return (
    <div>
      {checking && (
        <div className="mx-4 mb-2 p-2 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-blue-600 text-sm"><span className="animate-spin inline-block">⏳</span> Verificando imagem...</p>
        </div>
      )}
      <div className="flex gap-3 overflow-x-auto p-4 pb-2">
        <label className="flex-shrink-0 flex flex-col items-center cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl text-purple-600">+</div>
          </div>
          <span className="text-xs text-gray-500 mt-1">Seu story</span>
          <input type="file" accept="image/*" onChange={handleStoryUpload} className="hidden"/>
        </label>
        {Object.entries(grouped).filter(([uid]) => uid !== currentUserId).map(([uid, userStories]) => {
          const s = userStories[0]; const hasUnviewed = userStories.some(st => !st.viewed);
          return (
            <button key={uid} onClick={() => openStory(s)} className="flex-shrink-0 flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full p-0.5 ${hasUnviewed ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-gray-300'}`}>
                <img src={s.userPhoto} alt={s.userName} className="w-full h-full rounded-full object-cover border-2 border-white"/>
              </div>
              <span className="text-xs text-gray-500 mt-1 truncate w-16 text-center">{s.userName}</span>
            </button>
          );
        })}
      </div>
      {viewing && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col" onClick={() => setViewing(null)}>
          <div className="w-full h-1 bg-gray-700 mt-2 mx-2" style={{width:'calc(100% - 16px)'}}><div className="h-full bg-white transition-all" style={{width:`${progress}%`}}/></div>
          <div className="flex items-center gap-3 p-4">
            <img src={viewing.userPhoto} alt="" className="w-8 h-8 rounded-full object-cover"/>
            <span className="text-white font-semibold text-sm">{viewing.userName}</span>
            <span className="text-gray-400 text-xs">{new Date(viewing.createdAt).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</span>
            <button onClick={e=>{e.stopPropagation();setViewing(null)}} className="ml-auto text-white text-xl">✕</button>
          </div>
          <div className="flex-1 flex items-center justify-center"><img src={viewing.imageUrl} alt="" className="max-w-full max-h-full object-contain"/></div>
        </div>
      )}
    </div>
  );
};
export default Stories;
