
import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music2, ChevronUp, ChevronDown, Play, Pause, Volume2, VolumeX, Plus, Church, ShieldCheck, X, Send, MoreVertical, Flag, UserPlus } from 'lucide-react';

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

const SAMPLE_REELS: Reel[] = [];

const CATEGORIES = [
  { id: 'all', label: 'Para Você', icon: '✨' },
  { id: 'louvor', label: 'Louvor', icon: '🎵' },
  { id: 'testemunho', label: 'Testemunhos', icon: '🙏' },
  { id: 'devocional', label: 'Devocionais', icon: '📖' },
  { id: 'igreja', label: 'Igrejas', icon: '⛪' },
  { id: 'reflexao', label: 'Reflexões', icon: '💭' },
];

const ChristianReels: React.FC<{ onClose?: () => void; currentUserId?: string }> = ({ onClose, currentUserId }) => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Carregar reels do banco
  useEffect(() => {
    fetchReels();
  }, []);

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
      }
    } catch (err) { console.error('Erro ao carregar reels:', err); }
  };

  const handleUploadReel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUserId) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('userId', currentUserId);
      formData.append('description', '');
      formData.append('category', 'reflexao');
      const res = await fetch('/api/reels', { method: 'POST', body: formData });
      if (res.ok) {
        fetchReels();
        setShowUpload(false);
      }
    } catch (err) { console.error('Erro upload reel:', err); }
    finally { setUploading(false); }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMore, setShowMore] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredReels = selectedCategory === 'all' ? reels : reels.filter(r => r.category === selectedCategory);
  const currentReel = filteredReels[currentIndex] || filteredReels[0];

  const goNext = () => {
    if (currentIndex < filteredReels.length - 1) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientY;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
  };

  const toggleLike = () => {
    setReels(prev => prev.map(r => r.id === currentReel.id ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 } : r));
  };

  const toggleSave = () => {
    setReels(prev => prev.map(r => r.id === currentReel.id ? { ...r, isSaved: !r.isSaved } : r));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setReels(prev => prev.map(r => r.id === currentReel.id ? {
      ...r, comments: [...r.comments, { id: 'nc' + Date.now(), userName: 'Você', text: newComment, createdAt: 'agora' }]
    } : r));
    setNewComment('');
  };

  const formatNumber = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toString();

  if (!currentReel) return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {onClose && <button onClick={onClose} className="p-2 text-white"><X size={24} /></button>}
          <h2 className="text-white font-bold text-lg">Reels Crist\u00e3os</h2>
        </div>
        <button onClick={() => videoInputRef.current?.click()} className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm"><Plus size={22} /></button>
        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleUploadReel} className="hidden" />
      </div>
      {uploading ? (
        <div className="text-white text-center"><span className="animate-spin text-4xl">\u23F3</span><p className="mt-4 font-bold">Enviando reel...</p></div>
      ) : (
        <div className="text-center p-8">
          <p className="text-6xl mb-4">\uD83C\uDFAC</p>
          <h3 className="text-white text-xl font-bold mb-2">Nenhum Reel ainda</h3>
          <p className="text-white/60 text-sm mb-6">Seja o primeiro a compartilhar um reel!</p>
          <button onClick={() => videoInputRef.current?.click()} className="px-6 py-3 bg-amber-500 text-white font-bold rounded-2xl">Enviar V\u00eddeo</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col" ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          {onClose && (
            <button onClick={onClose} className="p-2 text-white">
              <X size={24} />
            </button>
          )}
          <h2 className="text-white font-bold text-lg">Reels Cristãos</h2>
        </div>
        <button onClick={() => videoInputRef.current?.click()} className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm">
          <Plus size={22} />
        </button>
        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleUploadReel} className="hidden" />
      </div>

      {/* Category Pills */}
      <div className="absolute top-16 left-0 right-0 z-30 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); fetchReels(cat.id); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id ? 'bg-amber-500 text-white' : 'bg-white/20 text-white/80 backdrop-blur-sm'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video/Image Content */}
      <div className="flex-1 relative" onClick={() => setIsPlaying(!isPlaying)}>
        <img
          src={currentReel.thumbnailUrl}
          alt={currentReel.caption}
          className="w-full h-full object-cover"
        />
        
        {/* Play/Pause overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play size={40} className="text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute top-28 left-4 right-4 z-30">
          <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-progress" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Navigation arrows */}
        <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute top-1/3 left-1/2 -translate-x-1/2 text-white/50 hover:text-white z-20">
          <ChevronUp size={32} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-white/50 hover:text-white z-20">
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-32 z-30 flex flex-col items-center gap-5">
        {/* Profile */}
        <div className="relative">
          <img src={currentReel.userPhoto} alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
          <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
            <Plus size={12} className="text-white" />
          </button>
        </div>

        {/* Like */}
        <button onClick={toggleLike} className="flex flex-col items-center gap-1">
          <div className={`p-2 rounded-full ${currentReel.isLiked ? 'text-red-500' : 'text-white'}`}>
            <Heart size={28} fill={currentReel.isLiked ? 'currentColor' : 'none'} className={currentReel.isLiked ? 'animate-bounce' : ''} />
          </div>
          <span className="text-white text-xs font-bold">{formatNumber(currentReel.likes)}</span>
        </button>

        {/* Comments */}
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1">
          <div className="p-2 text-white">
            <MessageCircle size={28} />
          </div>
          <span className="text-white text-xs font-bold">{currentReel.comments.length}</span>
        </button>

        {/* Share */}
        <button onClick={() => setShowShare(true)} className="flex flex-col items-center gap-1">
          <div className="p-2 text-white">
            <Share2 size={28} />
          </div>
          <span className="text-white text-xs font-bold">{formatNumber(currentReel.shares)}</span>
        </button>

        {/* Save */}
        <button onClick={toggleSave} className="flex flex-col items-center gap-1">
          <div className={`p-2 ${currentReel.isSaved ? 'text-amber-400' : 'text-white'}`}>
            <Bookmark size={28} fill={currentReel.isSaved ? 'currentColor' : 'none'} />
          </div>
        </button>

        {/* More */}
        <button onClick={() => setShowMore(!showMore)} className="p-2 text-white">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20 z-30">
        {/* User info */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-bold text-sm">@{currentReel.userName.replace(' ', '').toLowerCase()}</span>
          {currentReel.isPastorVerified && (
            <span className="px-2 py-0.5 bg-emerald-500/80 text-white text-[8px] font-bold rounded-full flex items-center gap-1 backdrop-blur-sm">
              <ShieldCheck size={8} /> PASTOR APROVA
            </span>
          )}
          <span className="text-white/60 text-xs">· {currentReel.createdAt}</span>
        </div>

        {/* Caption */}
        <p className="text-white text-sm leading-relaxed mb-3 line-clamp-2">{currentReel.caption}</p>

        {/* Church */}
        <div className="flex items-center gap-1 text-white/60 text-xs mb-2">
          <Church size={12} /> {currentReel.churchName}
        </div>

        {/* Music */}
        {currentReel.musicName && (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
            <Music2 size={12} className="text-white animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-white text-xs font-medium truncate max-w-[200px]">{currentReel.musicName}</span>
          </div>
        )}

        {/* Reel counter */}
        <div className="mt-2 text-white/40 text-[10px]">
          {currentIndex + 1} / {filteredReels.length}
        </div>
      </div>

      {/* Volume button */}
      <button onClick={() => setIsMuted(!isMuted)} className="absolute bottom-4 right-4 z-30 p-2 bg-white/20 rounded-full backdrop-blur-sm text-white">
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Comments Modal */}
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl max-h-[60vh] flex flex-col animate-slide-up">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Comentários ({currentReel.comments.length})</h3>
            <button onClick={() => setShowComments(false)} className="p-1 text-slate-400"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentReel.comments.map(c => (
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
            {currentReel.comments.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">Nenhum comentário ainda. Seja o primeiro!</p>
            )}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Adicione um comentário..."
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
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Compartilhar</h3>
            <button onClick={() => setShowShare(false)} className="p-1 text-slate-400"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'WhatsApp', color: 'bg-green-500', icon: '💬' },
              { name: 'Instagram', color: 'bg-pink-500', icon: '📸' },
              { name: 'Copiar Link', color: 'bg-slate-500', icon: '🔗' },
              { name: 'Mais', color: 'bg-blue-500', icon: '📤' },
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
      {showMore && (
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl p-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Opções</h3>
            <button onClick={() => setShowMore(false)} className="p-1 text-slate-400"><X size={20} /></button>
          </div>
          <div className="space-y-1">
            {[
              { icon: <Flag size={18} />, label: 'Denunciar', color: 'text-red-500' },
              { icon: <UserPlus size={18} />, label: 'Seguir @' + currentReel.userName.split(' ')[0].toLowerCase(), color: 'text-amber-600' },
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
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        .animate-progress { animation: progress 15s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChristianReels;
