
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Camera, Image, Send, X, MapPin, Church, Smile, BookOpen, Flag } from 'lucide-react';

interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  userChurch?: string;
  isVerified?: boolean;
  isPastorVerified?: boolean;
  content: string;
  imageUrl?: string;
  category: 'testemunho' | 'louvor' | 'evento' | 'devocional' | 'foto' | 'reflexao';
  likes: number;
  comments: FeedComment[];
  liked: boolean;
  saved: boolean;
  location?: string;
  createdAt: string;
}

interface FeedComment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: string;
}

interface CommunityFeedProps {
  currentUserId: string;
  currentUserName: string;
  currentUserPhoto: string;
}

const SAMPLE_POSTS: FeedPost[] = [
  {
    id: 'fp1', userId: 'p1', userName: 'Maria Santos', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    userChurch: 'Igreja Presbiteriana Renovada', isVerified: true, isPastorVerified: true,
    content: 'Que culto abençoado ontem! O louvor tocou meu coração de uma forma especial. Deus é fiel em todas as circunstâncias. "Porque Dele, por Ele e para Ele são todas as coisas." Romanos 11:36',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600',
    category: 'testemunho', likes: 47, comments: [
      { id: 'c1', userId: 'p2', userName: 'Ana Costa', userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50', text: 'Amém! Que lindo testemunho! 🙏', createdAt: '2h' },
      { id: 'c2', userId: 'p3', userName: 'Pedro Oliveira', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50', text: 'Deus é maravilhoso! Glória a Deus!', createdAt: '1h' },
    ],
    liked: false, saved: false, location: 'São Paulo, SP', createdAt: '3h'
  },
  {
    id: 'fp2', userId: 'p4', userName: 'Lucas Ferreira', userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    userChurch: 'Batista da Lagoinha', isVerified: true,
    content: '📖 Devocional do dia: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e Ele endireitará as suas veredas." - Provérbios 3:5-6\n\nEsse versículo tem me sustentado nessa semana. Compartilhem o versículo que está no coração de vocês!',
    category: 'devocional', likes: 89, comments: [
      { id: 'c3', userId: 'p1', userName: 'Maria Santos', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50', text: 'Salmos 23 tem sido meu refúgio! ❤️', createdAt: '45min' },
    ],
    liked: true, saved: true, createdAt: '5h'
  },
  {
    id: 'fp3', userId: 'p2', userName: 'Ana Costa', userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    userChurch: 'Assembleia de Deus Vitória', isPastorVerified: true,
    content: 'Momento de louvor no grupo de jovens! 🎵 Nada melhor do que adorar ao Senhor com os irmãos. Venham participar toda quarta-feira às 19h30!',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
    category: 'louvor', likes: 63, comments: [],
    liked: false, saved: false, location: 'Belo Horizonte, MG', createdAt: '8h'
  },
  {
    id: 'fp4', userId: 'p5', userName: 'Rebeca Lima', userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    userChurch: 'AD Brás',
    content: '✨ Reflexão: Deus não nos chamou para sermos perfeitos, mas para sermos fiéis. Cada dia é uma nova oportunidade de recomeçar com Ele. Não desista dos seus sonhos, porque o Autor da vida está escrevendo a sua história!\n\n#FéEmDeus #VidaCristã #Esperança',
    category: 'reflexao', likes: 124, comments: [
      { id: 'c4', userId: 'p4', userName: 'Lucas Ferreira', userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50', text: 'Que palavra poderosa! Amém! 🔥', createdAt: '2h' },
      { id: 'c5', userId: 'p1', userName: 'Maria Santos', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50', text: 'Isso tocou meu coração! Obrigada por compartilhar!', createdAt: '1h' },
    ],
    liked: false, saved: false, createdAt: '12h'
  },
];

const CATEGORIES = [
  { key: 'todos', label: 'Todos', icon: '✨' },
  { key: 'testemunho', label: 'Testemunhos', icon: '🙏' },
  { key: 'devocional', label: 'Devocionais', icon: '📖' },
  { key: 'louvor', label: 'Louvor', icon: '🎵' },
  { key: 'reflexao', label: 'Reflexões', icon: '💭' },
  { key: 'foto', label: 'Fotos', icon: '📸' },
  { key: 'evento', label: 'Eventos', icon: '📅' },
];

const CommunityFeed: React.FC<CommunityFeedProps> = ({ currentUserId, currentUserName, currentUserPhoto }) => {
  const [posts, setPosts] = useState<FeedPost[]>(SAMPLE_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<FeedPost['category']>('reflexao');
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<string | null>(null);
  const [showPostMenu, setShowPostMenu] = useState<string | null>(null);

  const filteredPosts = selectedCategory === 'todos' ? posts : posts.filter(p => p.category === selectedCategory);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, saved: !p.saved } : p));
  };

  const handleComment = (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;
    const newComment: FeedComment = {
      id: `c-${Date.now()}`, userId: currentUserId, userName: currentUserName,
      userPhoto: currentUserPhoto, text: text.trim(), createdAt: 'agora'
    };
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
    setCommentText(prev => ({ ...prev, [postId]: '' }));
  };

  const handleNewPost = () => {
    if (!newPostContent.trim()) return;
    const newPost: FeedPost = {
      id: `fp-${Date.now()}`, userId: currentUserId, userName: currentUserName,
      userPhoto: currentUserPhoto, content: newPostContent, category: newPostCategory,
      likes: 0, comments: [], liked: false, saved: false, createdAt: 'agora'
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowNewPost(false);
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      testemunho: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      devocional: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      louvor: 'bg-purple-50 text-purple-600 border-purple-100',
      reflexao: 'bg-amber-50 text-amber-600 border-amber-100',
      foto: 'bg-pink-50 text-pink-600 border-pink-100',
      evento: 'bg-blue-50 text-blue-600 border-blue-100',
    };
    return colors[cat] || 'bg-slate-50 text-slate-600 border-slate-100';
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      testemunho: '🙏 Testemunho', devocional: '📖 Devocional', louvor: '🎵 Louvor',
      reflexao: '💭 Reflexão', foto: '📸 Foto', evento: '📅 Evento',
    };
    return labels[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-100 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif font-bold text-slate-800">Comunidade</h2>
          <button onClick={() => setShowNewPost(true)} className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 active:scale-95 transition-all text-sm">
            <Camera size={16}/> Publicar
          </button>
        </div>
        
        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-lg mx-auto">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white border-b border-slate-100">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
              <div className="relative">
                <img src={post.userPhoto} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow" />
                {post.isPastorVerified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Church size={10} className="text-white" />
                  </div>
                )}
                {post.isVerified && !post.isPastorVerified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white text-white text-[8px] font-bold">✓</div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-sm">{post.userName}</span>
                  {post.isPastorVerified && (
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded border border-emerald-100">Pastor Aprova</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  {post.userChurch && <span>{post.userChurch}</span>}
                  <span>· {post.createdAt}</span>
                </div>
              </div>
              <div className="relative">
                <button onClick={() => setShowPostMenu(showPostMenu === post.id ? null : post.id)} className="p-2 text-slate-300 hover:text-slate-500">
                  <MoreHorizontal size={18} />
                </button>
                {showPostMenu === post.id && (
                  <div className="absolute right-0 top-10 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 w-48 z-20">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
                      <Bookmark size={14}/> Salvar Post
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                      <Flag size={14}/> Denunciar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Category Badge */}
            <div className="px-4 pb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${getCategoryColor(post.category)}`}>
                {getCategoryLabel(post.category)}
              </span>
            </div>

            {/* Post Image */}
            {post.imageUrl && (
              <div className="relative">
                <img src={post.imageUrl} className="w-full aspect-square object-cover" />
              </div>
            )}

            {/* Post Content */}
            <div className="px-4 py-3">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{post.content}</p>
              {post.location && (
                <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-400">
                  <MapPin size={12}/> {post.location}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-50">
              <div className="flex items-center gap-5">
                <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 transition-all active:scale-90 ${post.liked ? 'text-red-500' : 'text-slate-400'}`}>
                  <Heart size={22} fill={post.liked ? 'currentColor' : 'none'} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button onClick={() => setShowComments(showComments === post.id ? null : post.id)} className="flex items-center gap-1.5 text-slate-400 active:scale-90 transition-all">
                  <MessageCircle size={22} />
                  <span className="text-xs font-bold">{post.comments.length}</span>
                </button>
                <button className="text-slate-400 active:scale-90 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
              <button onClick={() => handleSave(post.id)} className={`active:scale-90 transition-all ${post.saved ? 'text-amber-500' : 'text-slate-400'}`}>
                <Bookmark size={22} fill={post.saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Comments Section */}
            {showComments === post.id && (
              <div className="px-4 pb-4 border-t border-slate-50">
                {post.comments.length > 0 && (
                  <div className="space-y-3 py-3">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex gap-2.5">
                        <img src={comment.userPhoto} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        <div className="bg-slate-50 rounded-2xl px-3.5 py-2.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">{comment.userName}</span>
                            <span className="text-[10px] text-slate-300">{comment.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <img src={currentUserPhoto} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={commentText[post.id] || ''}
                      onChange={e => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                      placeholder="Escreva um comentário..."
                      className="flex-1 bg-slate-50 rounded-full px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-amber-500 border border-slate-100"
                    />
                    <button onClick={() => handleComment(post.id)} className="p-2 text-amber-500 active:scale-90 transition-all">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Novo Post */}
      {showNewPost && (
        <div className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-slate-800">Nova Publicação</h3>
              <button onClick={() => setShowNewPost(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={18}/></button>
            </div>

            {/* Categoria */}
            <div className="mb-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {(['testemunho', 'devocional', 'louvor', 'reflexao', 'foto', 'evento'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setNewPostCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      newPostCategory === cat ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="mb-4">
              <textarea
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                placeholder="Compartilhe seu testemunho, reflexão ou momento com a comunidade..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none h-32"
              />
            </div>

            {/* Ações */}
            <div className="flex items-center gap-3 mb-6">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold border border-slate-100">
                <Image size={16}/> Foto
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold border border-slate-100">
                <MapPin size={16}/> Local
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold border border-slate-100">
                <BookOpen size={16}/> Versículo
              </button>
            </div>

            <button
              onClick={handleNewPost}
              disabled={!newPostContent.trim()}
              className="w-full py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 active:scale-95 transition-all disabled:opacity-40 disabled:active:scale-100"
            >
              Publicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
