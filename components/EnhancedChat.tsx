import React, { useState, useRef, useEffect } from 'react';
import { Smile, Image, Mic, Send, Heart, ThumbsUp, Star, Flame, Check, CheckCheck, X, ChevronDown } from 'lucide-react';

// Emojis cristãos organizados por categoria
const EMOJI_CATEGORIES = [
  { name: '❤️ Amor', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '💕', '💖', '💗', '💘', '💝', '🥰', '😍', '😘'] },
  { name: '🙏 Fé', emojis: ['🙏', '✝️', '⛪', '📖', '🕊️', '👑', '🔥', '💒', '🙌', '📿', '🕯️', '⭐', '🌟', '✨', '💫'] },
  { name: '😊 Rostos', emojis: ['😊', '😇', '🤗', '😄', '😃', '😁', '🥹', '🤩', '😌', '🥺', '😢', '😭', '🤣', '😂', '😅'] },
  { name: '👋 Gestos', emojis: ['👋', '🤝', '👏', '🤲', '🫶', '💪', '👍', '👆', '🫂', '🤙', '✌️', '🤞', '🫡', '👐', '🙋'] },
  { name: '🎵 Louvor', emojis: ['🎵', '🎶', '🎤', '🎸', '🎹', '🥁', '🎺', '🎻', '🎼', '🎧', '🎙️', '📯', '🪘', '🎷', '🪗'] },
  { name: '🌸 Natureza', emojis: ['🌸', '🌹', '🌺', '🌻', '🌷', '🌿', '🍃', '🌈', '☀️', '🌙', '⭐', '🦋', '🕊️', '🌊', '🏔️'] },
];

const CHRISTIAN_STICKERS = [
  { id: 'st1', text: 'Deus é fiel! 🙏', bg: 'from-amber-400 to-amber-600' },
  { id: 'st2', text: 'Paz do Senhor! 🕊️', bg: 'from-blue-400 to-blue-600' },
  { id: 'st3', text: 'Abençoado(a)! ✨', bg: 'from-purple-400 to-purple-600' },
  { id: 'st4', text: 'Te amo em Cristo ❤️', bg: 'from-red-400 to-red-600' },
  { id: 'st5', text: 'Orando por você 📿', bg: 'from-green-400 to-green-600' },
  { id: 'st6', text: 'Glória a Deus! 🙌', bg: 'from-yellow-400 to-yellow-600' },
  { id: 'st7', text: 'Jesus te ama! 💕', bg: 'from-pink-400 to-pink-600' },
  { id: 'st8', text: 'Fé em Deus! 🔥', bg: 'from-orange-400 to-orange-600' },
  { id: 'st9', text: 'Bom dia com Deus ☀️', bg: 'from-cyan-400 to-cyan-600' },
  { id: 'st10', text: 'Boa noite, Deus abençoe 🌙', bg: 'from-indigo-400 to-indigo-600' },
  { id: 'st11', text: 'Tudo posso nEle! 💪', bg: 'from-emerald-400 to-emerald-600' },
  { id: 'st12', text: 'Amém! 🙏✨', bg: 'from-rose-400 to-rose-600' },
];

const REACTIONS = [
  { emoji: '❤️', label: 'Amor' },
  { emoji: '🙏', label: 'Amém' },
  { emoji: '😂', label: 'Haha' },
  { emoji: '😮', label: 'Uau' },
  { emoji: '😢', label: 'Triste' },
  { emoji: '🔥', label: 'Fogo' },
];

export interface EnhancedMessage {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'emoji' | 'sticker' | 'audio' | 'image';
  reaction?: string;
  stickerData?: { text: string; bg: string };
  audioDuration?: number;
}

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-white border-t border-slate-100 max-h-72">
      {/* Category tabs */}
      <div className="flex border-b border-slate-100 overflow-x-auto">
        {EMOJI_CATEGORIES.map((cat, i) => (
          <button key={i} onClick={() => setActiveCategory(i)} className={`flex-shrink-0 px-4 py-2 text-sm font-medium ${activeCategory === i ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>
            {cat.name.split(' ')[0]}
          </button>
        ))}
      </div>
      {/* Emojis grid */}
      <div className="p-3 grid grid-cols-8 gap-1 overflow-y-auto max-h-48">
        {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji, i) => (
          <button key={i} onClick={() => onSelect(emoji)} className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-slate-50 rounded-lg active:scale-90 transition-all">
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

interface StickerPickerProps {
  onSelect: (sticker: { text: string; bg: string }) => void;
  onClose: () => void;
}

const StickerPicker: React.FC<StickerPickerProps> = ({ onSelect, onClose }) => (
  <div className="bg-white border-t border-slate-100 max-h-72 overflow-y-auto p-3">
    <div className="flex items-center justify-between mb-3">
      <span className="text-slate-800 font-bold text-sm">Figurinhas Cristãs</span>
      <button onClick={onClose} className="text-slate-400"><X size={18} /></button>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {CHRISTIAN_STICKERS.map(sticker => (
        <button key={sticker.id} onClick={() => onSelect(sticker)} className={`bg-gradient-to-r ${sticker.bg} text-white font-bold text-sm py-4 px-4 rounded-2xl active:scale-95 transition-all shadow-md`}>
          {sticker.text}
        </button>
      ))}
    </div>
  </div>
);

interface MessageBubbleProps {
  message: EnhancedMessage;
  onReact: (messageId: string, emoji: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onReact }) => {
  const [showReactions, setShowReactions] = useState(false);

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const StatusIcon = () => {
    if (!message.isSent) return null;
    switch (message.status) {
      case 'sending': return <div className="w-3 h-3 border border-white/50 border-t-transparent rounded-full animate-spin" />;
      case 'sent': return <Check size={14} className="text-white/50" />;
      case 'delivered': return <CheckCheck size={14} className="text-white/50" />;
      case 'read': return <CheckCheck size={14} className="text-blue-300" />;
      default: return null;
    }
  };

  // Sticker message
  if (message.type === 'sticker' && message.stickerData) {
    return (
      <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-3 group`}>
        <div className="relative">
          <button onContextMenu={(e) => { e.preventDefault(); setShowReactions(true); }} onClick={() => setShowReactions(!showReactions)}
            className={`bg-gradient-to-r ${message.stickerData.bg} text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-md max-w-[250px]`}>
            {message.stickerData.text}
          </button>
          {message.reaction && (
            <div className="absolute -bottom-2 right-2 bg-white rounded-full px-1.5 py-0.5 shadow-md text-sm">
              {message.reaction}
            </div>
          )}
          {showReactions && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-2 flex gap-1 z-50">
              {REACTIONS.map(r => (
                <button key={r.emoji} onClick={() => { onReact(message.id, r.emoji); setShowReactions(false); }} className="w-10 h-10 flex items-center justify-center text-xl hover:bg-slate-50 rounded-full active:scale-90 transition-all">
                  {r.emoji}
                </button>
              ))}
            </div>
          )}
          <div className={`flex items-center gap-1 mt-1 ${message.isSent ? 'justify-end' : 'justify-start'}`}>
            <span className="text-slate-400 text-[10px]">{formatTime(message.timestamp)}</span>
            <StatusIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-3 group`}>
      <div className="relative max-w-[75%]">
        <button onContextMenu={(e) => { e.preventDefault(); setShowReactions(true); }} onClick={() => setShowReactions(!showReactions)}
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            message.isSent
              ? 'bg-amber-500 text-white rounded-br-md'
              : 'bg-slate-100 text-slate-800 rounded-bl-md'
          }`}>
          {message.text}
          <div className={`flex items-center gap-1 mt-1 ${message.isSent ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-[10px] ${message.isSent ? 'text-white/60' : 'text-slate-400'}`}>{formatTime(message.timestamp)}</span>
            <StatusIcon />
          </div>
        </button>
        
        {/* Reaction badge */}
        {message.reaction && (
          <div className={`absolute -bottom-2 ${message.isSent ? 'left-2' : 'right-2'} bg-white rounded-full px-1.5 py-0.5 shadow-md text-sm`}>
            {message.reaction}
          </div>
        )}

        {/* Reaction picker */}
        {showReactions && (
          <div className={`absolute bottom-full mb-2 ${message.isSent ? 'right-0' : 'left-0'} bg-white rounded-2xl shadow-xl p-2 flex gap-1 z-50`}>
            {REACTIONS.map(r => (
              <button key={r.emoji} onClick={() => { onReact(message.id, r.emoji); setShowReactions(false); }} className="w-10 h-10 flex items-center justify-center text-xl hover:bg-slate-50 rounded-full active:scale-90 transition-all">
                {r.emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface TypingIndicatorProps {
  name: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ name }) => (
  <div className="flex items-center gap-2 px-4 py-2">
    <div className="bg-slate-100 rounded-2xl px-4 py-3 flex items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-slate-400 text-xs">{name} está digitando...</span>
    </div>
  </div>
);

interface ChatInputBarProps {
  onSendMessage: (text: string) => void;
  onSendSticker: (sticker: { text: string; bg: string }) => void;
  onStartRecording: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({ onSendMessage, onSendSticker, onStartRecording }) => {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showStickers, setShowStickers] = useState(false);

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  return (
    <div>
      {/* Emoji Picker */}
      {showEmoji && (
        <EmojiPicker onSelect={(emoji) => setText(prev => prev + emoji)} onClose={() => setShowEmoji(false)} />
      )}

      {/* Sticker Picker */}
      {showStickers && (
        <StickerPicker onSelect={(sticker) => { onSendSticker(sticker); setShowStickers(false); }} onClose={() => setShowStickers(false)} />
      )}

      {/* Input Bar */}
      <div className="bg-white border-t border-slate-100 p-3 flex items-center gap-2">
        <button onClick={() => { setShowEmoji(!showEmoji); setShowStickers(false); }} className={`p-2.5 rounded-full transition-all ${showEmoji ? 'bg-amber-100 text-amber-600' : 'text-slate-400 hover:bg-slate-50'}`}>
          <Smile size={22} />
        </button>
        
        <button onClick={() => { setShowStickers(!showStickers); setShowEmoji(false); }} className={`p-2.5 rounded-full transition-all ${showStickers ? 'bg-purple-100 text-purple-600' : 'text-slate-400 hover:bg-slate-50'}`}>
          <Image size={22} />
        </button>

        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Digite uma mensagem..."
          className="flex-1 bg-slate-50 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200"
        />

        {text.trim() ? (
          <button onClick={handleSend} className="p-2.5 bg-amber-500 rounded-full text-white active:scale-90 transition-all shadow-md">
            <Send size={20} />
          </button>
        ) : (
          <button onClick={onStartRecording} className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-full transition-all">
            <Mic size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export { EmojiPicker, StickerPicker, REACTIONS, CHRISTIAN_STICKERS };
