import React, { useState, useRef } from 'react';
import { X, Camera, Type, Sticker, Sparkles, Send, Image, Palette } from 'lucide-react';

interface StoriesCameraProps {
  onClose: () => void;
  onPublish: (story: any) => void;
  userName: string;
  userPhoto: string;
  userId: string;
}

const STICKERS = [
  { id: 's1', emoji: '🙏', label: 'Oração' },
  { id: 's2', emoji: '✝️', label: 'Cruz' },
  { id: 's3', emoji: '❤️', label: 'Amor' },
  { id: 's4', emoji: '🕊️', label: 'Paz' },
  { id: 's5', emoji: '📖', label: 'Bíblia' },
  { id: 's6', emoji: '⛪', label: 'Igreja' },
  { id: 's7', emoji: '🎵', label: 'Louvor' },
  { id: 's8', emoji: '🌟', label: 'Estrela' },
  { id: 's9', emoji: '🔥', label: 'Fogo' },
  { id: 's10', emoji: '👑', label: 'Coroa' },
  { id: 's11', emoji: '🙌', label: 'Louvar' },
  { id: 's12', emoji: '💒', label: 'Casamento' },
];

const TEXT_STICKERS = [
  'Deus é fiel! 🙏', 'Abençoado(a) ✨', 'Jesus te ama ❤️', 'Fé em Deus 🕊️',
  'Gratidão 🙌', 'Tudo posso nEle! 💪', 'Paz do Senhor ☮️', 'Adoração 🎵',
  'Em oração 📿', 'Deus no controle 👑',
];

const FILTERS = [
  { id: 'none', name: 'Original', style: {} },
  { id: 'warm', name: 'Quente', style: { filter: 'sepia(0.3) saturate(1.4) brightness(1.1)' } },
  { id: 'cool', name: 'Frio', style: { filter: 'saturate(0.8) brightness(1.1) hue-rotate(20deg)' } },
  { id: 'vintage', name: 'Vintage', style: { filter: 'sepia(0.5) contrast(1.1) brightness(0.9)' } },
  { id: 'bright', name: 'Brilho', style: { filter: 'brightness(1.3) contrast(1.1)' } },
  { id: 'bw', name: 'P&B', style: { filter: 'grayscale(1) contrast(1.2)' } },
  { id: 'golden', name: 'Dourado', style: { filter: 'sepia(0.4) saturate(1.6) brightness(1.05) hue-rotate(-10deg)' } },
  { id: 'divine', name: 'Divino', style: { filter: 'brightness(1.2) saturate(1.3) contrast(0.95)' } },
];

const StoriesCamera: React.FC<StoriesCameraProps> = ({ onClose, onPublish, userName, userPhoto, userId }) => {
  const [step, setStep] = useState<'capture' | 'edit' | 'preview'>('capture');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [showStickers, setShowStickers] = useState(false);
  const [showTextStickers, setShowTextStickers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [addedStickers, setAddedStickers] = useState<{emoji: string; x: number; y: number}[]>([]);
  const [addedTexts, setAddedTexts] = useState<{text: string; x: number; y: number}[]>([]);
  const [customText, setCustomText] = useState('');
  const [showCustomText, setShowCustomText] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedPhoto(ev.target?.result as string);
        setStep('edit');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSticker = (emoji: string) => {
    setAddedStickers(prev => [...prev, { emoji, x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 }]);
  };

  const handleAddTextSticker = (text: string) => {
    setAddedTexts(prev => [...prev, { text, x: 10 + Math.random() * 30, y: 20 + Math.random() * 40 }]);
    setShowTextStickers(false);
  };

  const handlePublish = async () => {
    if (!selectedFile) return;
    setIsPublishing(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('media', selectedFile);
      formData.append('userId', userId);
      formData.append('type', 'image');
      const caption = addedTexts.map(t => t.text).join(' | ');
      if (caption) formData.append('caption', caption);

      const res = await fetch('/api/stories', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao publicar story');
      
      onPublish(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao publicar');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4">
        <button onClick={onClose} className="p-3 bg-black/40 backdrop-blur-xl rounded-full text-white">
          <X size={24} />
        </button>
        <span className="text-white font-bold text-lg">
          {step === 'capture' ? 'Novo Story' : step === 'edit' ? 'Editar' : 'Preview'}
        </span>
        <div className="w-12" />
      </div>

      {/* Error */}
      {error && (
        <div className="absolute top-20 left-4 right-4 z-50 bg-red-500/90 text-white p-3 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      {/* Capture Step */}
      {step === 'capture' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <Camera size={48} className="text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Criar Story</h2>
          <p className="text-white/60 text-sm text-center mb-8">Compartilhe um momento com a comunidade</p>
          <button onClick={() => fileInputRef.current?.click()} className="w-full max-w-xs py-5 bg-amber-500 text-white font-bold rounded-2xl mb-4 flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Image size={20} /> Escolher da Galeria
          </button>
          <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
        </div>
      )}

      {/* Edit Step */}
      {step === 'edit' && selectedPhoto && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative overflow-hidden mt-16">
            <img src={selectedPhoto} className="w-full h-full object-cover" style={selectedFilter.style} />
            {addedStickers.map((s, i) => (
              <div key={i} className="absolute text-5xl" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}>
                {s.emoji}
              </div>
            ))}
            {addedTexts.map((t, i) => (
              <div key={i} className="absolute px-4 py-2 bg-black/50 backdrop-blur-md rounded-2xl text-white font-bold text-sm" style={{ left: `${t.x}%`, top: `${t.y}%` }}>
                {t.text}
              </div>
            ))}
            {showCustomText && (
              <div className="absolute inset-x-0 top-1/3 flex items-center justify-center p-4">
                <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-4 w-full max-w-sm">
                  <input type="text" value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Digite seu texto..." className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none placeholder-white/40" autoFocus />
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setShowCustomText(false)} className="flex-1 py-2 bg-white/10 text-white rounded-xl text-sm">Cancelar</button>
                    <button onClick={() => { if (customText.trim()) { handleAddTextSticker(customText); setCustomText(''); setShowCustomText(false); } }} className="flex-1 py-2 bg-amber-500 text-white rounded-xl text-sm font-bold">Adicionar</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black/90 backdrop-blur-xl p-4">
            {!showStickers && !showTextStickers && !showFilters && (
              <div className="flex items-center justify-center gap-6 mb-4">
                <button onClick={() => setShowFilters(true)} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"><Palette size={20} /></div>
                  <span className="text-white/60 text-[10px] font-bold">Filtros</span>
                </button>
                <button onClick={() => setShowStickers(true)} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"><Sticker size={20} /></div>
                  <span className="text-white/60 text-[10px] font-bold">Stickers</span>
                </button>
                <button onClick={() => setShowTextStickers(true)} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"><Sparkles size={20} /></div>
                  <span className="text-white/60 text-[10px] font-bold">Frases</span>
                </button>
                <button onClick={() => setShowCustomText(true)} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"><Type size={20} /></div>
                  <span className="text-white/60 text-[10px] font-bold">Texto</span>
                </button>
              </div>
            )}

            {showFilters && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => setShowFilters(false)} className="text-white/60 text-sm">← Voltar</button>
                  <span className="text-white font-bold text-sm">Filtros</span>
                  <div className="w-12" />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {FILTERS.map(f => (
                    <button key={f.id} onClick={() => setSelectedFilter(f)} className={`flex-shrink-0 flex flex-col items-center gap-1 ${selectedFilter.id === f.id ? 'opacity-100' : 'opacity-50'}`}>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20" style={selectedFilter.id === f.id ? { borderColor: '#f59e0b' } : {}}>
                        <img src={selectedPhoto} className="w-full h-full object-cover" style={f.style} />
                      </div>
                      <span className="text-white text-[10px] font-bold">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showStickers && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => setShowStickers(false)} className="text-white/60 text-sm">← Voltar</button>
                  <span className="text-white font-bold text-sm">Stickers Cristãos</span>
                  <div className="w-12" />
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {STICKERS.map(s => (
                    <button key={s.id} onClick={() => handleAddSticker(s.emoji)} className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-xl active:scale-90 transition-all">
                      <span className="text-3xl">{s.emoji}</span>
                      <span className="text-white/40 text-[8px]">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showTextStickers && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button onClick={() => setShowTextStickers(false)} className="text-white/60 text-sm">← Voltar</button>
                  <span className="text-white font-bold text-sm">Frases de Fé</span>
                  <div className="w-12" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {TEXT_STICKERS.map((t, i) => (
                    <button key={i} onClick={() => handleAddTextSticker(t)} className="p-3 bg-white/5 rounded-xl text-white text-xs text-left active:scale-95 transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Publish button */}
            {!showStickers && !showTextStickers && !showFilters && !showCustomText && (
              <button onClick={handlePublish} disabled={isPublishing} className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">
                {isPublishing ? (
                  <><span className="animate-spin">⏳</span> Publicando...</>
                ) : (
                  <><Send size={18} /> Publicar Story</>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default StoriesCamera;
