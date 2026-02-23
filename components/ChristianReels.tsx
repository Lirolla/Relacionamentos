
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music2, Play, Pause, Volume2, VolumeX, Plus, Church, ShieldCheck, X, Send, MoreVertical, Flag, UserPlus } from 'lucide-react';

interface Reel {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  isPastorVerified: boolean;
  churchName: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  category: 'testemunho' | 'louvor' | 'devocional' | 'igreja' | 'humor' | 'reflexao';
  musicName?: string;
  likes: number;
  comments: { id: string; userName: string; text: string; createdAt: string }[];
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
}

const CATEGORIES = [
  { id: 'all', label: 'Para Voc\u00ea', icon: '\u2728' },
  { id: 'louvor', label: 'Louvor', icon: '\uD83C\uDFB5' },
  { id: 'testemunho', label: 'Testemunhos', icon: '\uD83D\uDE4F' },
  { id: 'devocional', label: 'Devocionais', icon: '\uD83D\uDCD6' },
  { id: 'igreja', label: 'Igrejas', icon: '\u26EA' },
  { id: 'reflexao', label: 'Reflex\u00f5es', icon: '\uD83D\uDCAD' },
];

const ReelItem: React.FC<{
  reel: Reel;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  onShowComments: (id: string) => void;
  onShowShare: () => void;
  onShowMore: () => void;
}> = ({ reel, isActive, isMuted, onToggleMute, onToggleLike, onToggleSave, onShowComments, onShowShare, onShowMore }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 800);
  };

  const formatNumber = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toString();

  return (
    <div className="reel-item w-full h-full flex-shrink-0 relative snap-start snap-always bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        onClick={togglePlay}
        poster={reel.thumbnailUrl !== reel.videoUrl ? reel.thumbnailUrl : undefined}
      />

      {/* Play/Pause overlay */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm animate-fade-out">
            {isPlaying ? <Pause size={36} className="text-white" fill="white" /> : <Play size={36} className="text-white ml-1" fill="white" />}
          </div>
        </div>
      )}

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-28 z-30 flex flex-col items-center gap-5">
        {/* Profile */}
        <div className="relative">
          {reel.userPhoto ? (
            <img src={reel.userPhoto} alt="" className="w-11 h-11 rounded-full border-2 border-white object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-white font-bold text-lg">
              {reel.userName[0]?.toUpperCase() || '?'}
            </div>
          )}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
            <Plus size={12} className="text-white" />
          </div>
        </div>

        {/* Like */}
        <button onClick={() => onToggleLike(reel.id)} className="flex flex-col items-center gap-1">
          <div className={`p-2 rounded-full ${reel.isLiked ? 'text-red-500' : 'text-white'}`}>
            <Heart size={28} fill={reel.isLiked ? 'currentColor' : 'none'} className={reel.isLiked ? 'animate-bounce' : ''} />
          </div>
          <span className="text-white text-xs font-bold">{formatNumber(reel.likes)}</span>
        </button>

        {/* Comments */}
        <button onClick={() => onShowComments(reel.id)} className="flex flex-col items-center gap-1">
          <div className="p-2 text-white"><MessageCircle size={28} /></div>
          <span className="text-white text-xs font-bold">{reel.comments.length}</span>
        </button>

        {/* Share */}
        <button onClick={onShowShare} className="flex flex-col items-center gap-1">
          <div className="p-2 text-white"><Share2 size={28} /></div>
          <span className="text-white text-xs font-bold">{formatNumber(reel.shares)}</span>
        </button>

        {/* Save */}
        <button onClick={() => onToggleSave(reel.id)} className="flex flex-col items-center gap-1">
          <div className={`p-2 ${reel.isSaved ? 'text-amber-400' : 'text-white'}`}>
            <Bookmark size={28} fill={reel.isSaved ? 'currentColor' : 'none'} />
          </div>
        </button>

        {/* More */}
        <button onClick={onShowMore} className="p-2 text-white">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20 z-30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-bold text-sm">@{reel.userName.replace(/\s/g, '').toLowerCase()}</span>
          {reel.isPastorVerified && (
            <span className="px-2 py-0.5 bg-emerald-500/80 text-white text-[8px] font-bold rounded-full flex items-center gap-1 backdrop-blur-sm">
              <ShieldCheck size={8} /> PASTOR
            </span>
          )}
          <span className="text-white/60 text-xs">{reel.createdAt}</span>
        </div>
        <p className="text-white text-sm leading-relaxed mb-2 line-clamp-2">{reel.caption}</p>
        {reel.churchName && (
          <div className="flex items-center gap-1 text-white/60 text-xs mb-2">
            <Church size={12} /> {reel.churchName}
          </div>
        )}
        {reel.musicName && (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
            <Music2 size={12} className="text-white animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-white text-xs font-medium truncate max-w-[200px]">{reel.musicName}</span>
          </div>
        )}
      </div>

      {/* Volume button */}
      <button onClick={onToggleMute} className="absolute bottom-4 right-4 z-30 p-2 bg-white/20 rounded-full backdrop-blur-sm text-white">
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};

const ChristianReels: React.FC<{ onClose?: () => void; currentUserId?: string }> = ({ onClose, currentUserId }) => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [activeReelId, setActiveReelId] = useState<string>('');
  const [newComment, setNewComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showShare, setShowShare] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState('reflexao');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchReels(); }, []);

  const fetchReels = async (category?: string) => {
    try {
      const url = category && category !== 'all' ? `/api/reels?category=${category}` : '/api/reels';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const mapped = (Array.isArray(data) ? data : []).map((r: any) => ({
          id: String(r.id),
          userId: String(r.user_id),
          userName: r.userName || 'Usu\u00e1rio',
          userPhoto: r.userPhoto || '',
          isPastorVerified: false,
          churchName: r.churchName || '',
          videoUrl: r.video_url || '',
          thumbnailUrl: r.thumbnail_url || r.video_url || '',
          caption: r.description || '',
          category: (r.category || 'reflexao') as any,
          likes: r.likes_count || 0,
          comments: [],
          shares: r.shares_count || 0,
          isLiked: false,
          isSaved: false,
          createdAt: r.created_at ? new Date(r.created_at).toLocaleDateString('pt-BR') : 'hoje'
        }));
        setReels(mapped);
        if (mapped.length > 0) setActiveReelId(mapped[0].id);
      }
    } catch (err) { console.error('Erro ao carregar reels:', err); }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setShowUploadForm(true);
    }
  };

  const handleUploadReel = async () => {
    if (!uploadFile || !currentUserId) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', uploadFile);
      formData.append('userId', currentUserId);
      formData.append('description', uploadCaption);
      formData.append('category', uploadCategory);
      const res = await fetch('/api/reels', { method: 'POST', body: formData });
      if (res.ok) {
        fetchReels();
        setShowUploadForm(false);
        setUploadFile(null);
        setUploadCaption('');
        setUploadCategory('reflexao');
      }
    } catch (err) { console.error('Erro upload reel:', err); }
    finally { setUploading(false); }
  };

  // Scroll snap observer - detectar qual reel est\u00e1 vis\u00edvel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reelId = entry.target.getAttribute('data-reel-id');
            if (reelId) setActiveReelId(reelId);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    const items = container.querySelectorAll('.reel-item');
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reels, selectedCategory]);

  const filteredReels = selectedCategory === 'all' ? reels : reels.filter(r => r.category === selectedCategory);

  const toggleLike = (id: string) => {
    setReels(prev => prev.map(r => r.id === id ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 } : r));
  };

  const toggleSave = (id: string) => {
    setReels(prev => prev.map(r => r.id === id ? { ...r, isSaved: !r.isSaved } : r));
  };

  const addComment = () => {
    if (!newComment.trim() || !activeReelId) return;
    setReels(prev => prev.map(r => r.id === activeReelId ? {
      ...r, comments: [...r.comments, { id: 'nc' + Date.now(), userName: 'Voc\u00ea', text: newComment, createdAt: 'agora' }]
    } : r));
    setNewComment('');
  };

  const activeReel = reels.find(r => r.id === activeReelId);

  // Tela vazia - sem reels
  if (filteredReels.length === 0 && !uploading) return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {onClose && <button onClick={onClose} className="p-2 text-white"><X size={24} /></button>}
          <h2 className="text-white font-bold text-lg">Reels</h2>
        </div>
        <button onClick={() => videoInputRef.current?.click()} className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm"><Plus size={22} /></button>
        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
          <Play size={40} className="text-white/60 ml-1" />
        </div>
        <h3 className="text-white text-xl font-bold mb-2">Nenhum Reel ainda</h3>
        <p className="text-white/60 text-sm mb-6">Seja o primeiro a compartilhar um reel!</p>
        <button onClick={() => videoInputRef.current?.click()} className="px-8 py-3 bg-amber-500 text-white font-bold rounded-2xl active:scale-95 transition-transform">
          Enviar V\u00eddeo
        </button>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6">
          <div className="bg-slate-900 rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-4">Novo Reel</h3>
            <p className="text-white/60 text-sm mb-4">{uploadFile?.name}</p>
            <input
              value={uploadCaption}
              onChange={e => setUploadCaption(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full px-4 py-3 bg-white/10 text-white rounded-xl mb-3 outline-none focus:ring-2 focus:ring-amber-500 placeholder-white/40"
            />
            <select
              value={uploadCategory}
              onChange={e => setUploadCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-xl mb-4 outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="reflexao">Reflex\u00e3o</option>
              <option value="louvor">Louvor</option>
              <option value="testemunho">Testemunho</option>
              <option value="devocional">Devocional</option>
              <option value="igreja">Igreja</option>
            </select>
            <div className="flex gap-3">
              <button onClick={() => { setShowUploadForm(false); setUploadFile(null); }} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl">Cancelar</button>
              <button onClick={handleUploadReel} disabled={uploading} className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-xl disabled:opacity-50">
                {uploading ? 'Enviando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Feed de Reels - scroll vertical snap (estilo Instagram)
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header fixo */}
      <div className="absolute top-0 left-0 right-0 z-40 p-4 flex justify-between items-center bg-gradient-to-b from-black/70 via-black/30 to-transparent">
        <div className="flex items-center gap-3">
          {onClose && <button onClick={onClose} className="p-2 text-white"><X size={24} /></button>}
          <h2 className="text-white font-bold text-lg">Reels</h2>
        </div>
        <button onClick={() => videoInputRef.current?.click()} className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm">
          <Plus size={22} />
        </button>
        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Category Pills */}
      <div className="absolute top-16 left-0 right-0 z-40 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); fetchReels(cat.id); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id ? 'bg-amber-500 text-white' : 'bg-white/20 text-white/80 backdrop-blur-sm'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Snap Container - feed vertical */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {filteredReels.map((reel) => (
          <div key={reel.id} data-reel-id={reel.id} className="w-full h-screen flex-shrink-0 snap-start snap-always">
            <ReelItem
              reel={reel}
              isActive={activeReelId === reel.id}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onShowComments={(id) => { setActiveReelId(id); setShowComments(true); }}
              onShowShare={() => setShowShare(true)}
              onShowMore={() => setShowMore(true)}
            />
          </div>
        ))}
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6">
          <div className="bg-slate-900 rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-4">Novo Reel</h3>
            <p className="text-white/60 text-sm mb-4">{uploadFile?.name}</p>
            <input
              value={uploadCaption}
              onChange={e => setUploadCaption(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full px-4 py-3 bg-white/10 text-white rounded-xl mb-3 outline-none focus:ring-2 focus:ring-amber-500 placeholder-white/40"
            />
            <select
              value={uploadCategory}
              onChange={e => setUploadCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-xl mb-4 outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="reflexao">Reflex\u00e3o</option>
              <option value="louvor">Louvor</option>
              <option value="testemunho">Testemunho</option>
              <option value="devocional">Devocional</option>
              <option value="igreja">Igreja</option>
            </select>
            <div className="flex gap-3">
              <button onClick={() => { setShowUploadForm(false); setUploadFile(null); }} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl">Cancelar</button>
              <button onClick={handleUploadReel} disabled={uploading} className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-xl disabled:opacity-50">
                {uploading ? 'Enviando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && activeReel && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[60vh] flex flex-col animate-slide-up">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Coment\u00e1rios ({activeReel.comments.length})</h3>
            <button onClick={() => setShowComments(false)} className="p-1 text-slate-400"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeReel.comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-xs flex-shrink-0">
                  {c.userName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{c.userName}</span>
                    <span className="text-slate-400 text-xs">{c.createdAt}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
            {activeReel.comments.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">Nenhum coment\u00e1rio ainda. Seja o primeiro!</p>
            )}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Adicione um coment\u00e1rio..."
              className="flex-1 px-4 py-3 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-300"
              onKeyDown={e => e.key === 'Enter' && addComment()}
            />
            <button onClick={addComment} className="p-3 bg-amber-500 text-white rounded-full">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Compartilhar</h3>
            <button onClick={() => setShowShare(false)} className="p-1 text-slate-400"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'WhatsApp', color: 'bg-green-500', icon: '\uD83D\uDCAC' },
              { name: 'Instagram', color: 'bg-pink-500', icon: '\uD83D\uDCF8' },
              { name: 'Copiar Link', color: 'bg-slate-500', icon: '\uD83D\uDD17' },
              { name: 'Mais', color: 'bg-blue-500', icon: '\uD83D\uDCE4' },
            ].map(opt => (
              <button key={opt.name} onClick={() => setShowShare(false)} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 ${opt.color} rounded-full flex items-center justify-center text-2xl`}>
                  {opt.icon}
                </div>
                <span className="text-xs text-slate-600">{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* More Options */}
      {showMore && activeReel && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Op\u00e7\u00f5es</h3>
            <button onClick={() => setShowMore(false)} className="p-1 text-slate-400"><X size={20} /></button>
          </div>
          <div className="space-y-1">
            {[
              { icon: <Flag size={18} />, label: 'Denunciar', color: 'text-red-500' },
              { icon: <UserPlus size={18} />, label: 'Seguir @' + activeReel.userName.split(' ')[0].toLowerCase(), color: 'text-amber-600' },
              { icon: <Bookmark size={18} />, label: 'Salvar Reel', color: 'text-slate-600' },
              { icon: <Share2 size={18} />, label: 'Compartilhar via...', color: 'text-slate-600' },
            ].map((opt, i) => (
              <button key={i} onClick={() => setShowMore(false)} className={`w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-all ${opt.color}`}>
                {opt.icon}
                <span className="font-medium text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        @keyframes fade-out { 0% { opacity: 1; } 100% { opacity: 0; } }
        .animate-fade-out { animation: fade-out 0.8s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChristianReels;
