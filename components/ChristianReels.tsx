
import React, { useState, useRef } from 'react';
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

const SAMPLE_REELS: Reel[] = [
  {
    id: 'r1', userId: 'p1', userName: 'Maria Santos', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    isPastorVerified: true, churchName: 'Igreja Presbiteriana',
    videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600',
    caption: 'Que momento incrível de louvor! Deus é fiel em todas as circunstâncias. 🙏✨ #louvor #adoração',
    category: 'louvor', musicName: 'Lugar Secreto - Gabriela Rocha',
    likes: 1247, comments: [
      { id: 'c1', userName: 'Lucas Ferreira', text: 'Amém! Que lindo! 🙌', createdAt: '2h' },
      { id: 'c2', userName: 'Ana Costa', text: 'Glória a Deus!', createdAt: '1h' },
    ], shares: 89, isLiked: false, isSaved: false, createdAt: '3h'
  },
  {
    id: 'r2', userId: 'p2', userName: 'Lucas Ferreira', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    isPastorVerified: false, churchName: 'Batista da Lagoinha',
    videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    caption: 'Meu testemunho de como Deus transformou minha vida. De depressão para alegria plena! 💪🔥',
    category: 'testemunho', musicName: 'Deus é Deus - Delino Marçal',
    likes: 3456, comments: [
      { id: 'c3', userName: 'Sarah Oliveira', text: 'Que testemunho poderoso! 😭🙏', createdAt: '5h' },
    ], shares: 234, isLiked: false, isSaved: false, createdAt: '6h'
  },
  {
    id: 'r3', userId: 'p3', userName: 'Sarah Oliveira', userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    isPastorVerified: true, churchName: 'AD Brás',
    videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600',
    caption: '📖 Devocional do dia: "Porque Deus amou o mundo de tal maneira..." João 3:16. Reflita comigo!',
    category: 'devocional',
    likes: 892, comments: [
      { id: 'c4', userName: 'Gabriel Santos', text: 'Versículo que mudou minha vida!', createdAt: '2h' },
      { id: 'c5', userName: 'Rebeca Lima', text: 'Amém! Obrigada por compartilhar 🙏', createdAt: '1h' },
    ], shares: 156, isLiked: false, isSaved: false, createdAt: '8h'
  },
  {
    id: 'r4', userId: 'p4', userName: 'Gabriel Santos', userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    isPastorVerified: false, churchName: 'IEQ Sede',
    videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600',
    caption: 'Nossa igreja fez uma ação social incrível! Alimentamos 200 famílias. Deus usa quem se dispõe! 🤝❤️',
    category: 'igreja',
    likes: 2103, comments: [
      { id: 'c6', userName: 'Maria Santos', text: 'Que trabalho lindo! Parabéns! 👏', createdAt: '4h' },
    ], shares: 312, isLiked: false, isSaved: false, createdAt: '12h'
  },
  {
    id: 'r5', userId: 'p5', userName: 'Rebeca Lima', userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    isPastorVerified: false, churchName: 'Batista Memorial',
    videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600',
    caption: '✨ Reflexão: Deus não te trouxe até aqui para te abandonar. Confie no processo! #fé #confiança',
    category: 'reflexao', musicName: 'Confio em Ti - Isaías Saad',
    likes: 4521, comments: [
      { id: 'c7', userName: 'Lucas Ferreira', text: 'Exatamente o que eu precisava ouvir hoje! 🙌', createdAt: '1h' },
      { id: 'c8', userName: 'Sarah Oliveira', text: 'Amém! Deus é fiel! ❤️', createdAt: '30min' },
    ], shares: 567, isLiked: false, isSaved: false, createdAt: '1d'
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Para Você', icon: '✨' },
  { id: 'louvor', label: 'Louvor', icon: '🎵' },
  { id: 'testemunho', label: 'Testemunhos', icon: '🙏' },
  { id: 'devocional', label: 'Devocionais', icon: '📖' },
  { id: 'igreja', label: 'Igrejas', icon: '⛪' },
  { id: 'reflexao', label: 'Reflexões', icon: '💭' },
];

const ChristianReels: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [reels, setReels] = useState<Reel[]>(SAMPLE_REELS);
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

  if (!currentReel) return null;

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
        <button className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm">
          <Plus size={22} />
        </button>
      </div>

      {/* Category Pills */}
      <div className="absolute top-16 left-0 right-0 z-30 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); }}
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
