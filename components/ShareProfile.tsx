
import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Send, Link, QrCode, Heart } from 'lucide-react';

interface ShareProfileProps {
  userName: string;
  userPhoto: string;
  userAge: number;
  userChurch: string;
  onClose: () => void;
}

const ShareProfile: React.FC<ShareProfileProps> = ({ userName, userPhoto, userAge, userChurch, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [shared, setShared] = useState(false);

  const profileLink = `https://conexaodivina.app/perfil/${userName.toLowerCase().replace(' ', '-')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    setShared(true);
    setTimeout(() => { setShared(false); onClose(); }, 1500);
  };

  const shareOptions = [
    { name: 'WhatsApp', color: 'bg-green-500', icon: '💬', action: () => handleShare('whatsapp') },
    { name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500', icon: '📸', action: () => handleShare('instagram') },
    { name: 'Telegram', color: 'bg-blue-500', icon: '✈️', action: () => handleShare('telegram') },
    { name: 'E-mail', color: 'bg-slate-600', icon: '📧', action: () => handleShare('email') },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl animate-slide-up">
        {!shared ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Compartilhar Perfil</h2>
              <button onClick={onClose} className="p-2 text-slate-400"><X size={20} /></button>
            </div>

            {/* Profile Preview Card */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 mb-6 border border-amber-200">
              <div className="flex items-center gap-4">
                <img src={userPhoto} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{userName}, {userAge}</h3>
                  <p className="text-xs text-amber-700 font-medium flex items-center gap-1">
                    <Heart size={10} fill="currentColor" /> {userChurch}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Conexão Divina - Namoro Cristão</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3 italic">
                "Olha esse perfil no Conexão Divina! Acho que combina com você 😊"
              </p>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {shareOptions.map(opt => (
                <button key={opt.name} onClick={opt.action} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 ${opt.color} rounded-full flex items-center justify-center text-2xl shadow-lg active:scale-90 transition-all`}>
                    {opt.icon}
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">{opt.name}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <Link size={16} className="text-slate-400 flex-shrink-0" />
              <span className="text-xs text-slate-500 truncate flex-1">{profileLink}</span>
              <button onClick={handleCopy} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                {copied ? <><Check size={12} className="inline mr-1" /> Copiado!</> : <><Copy size={12} className="inline mr-1" /> Copiar</>}
              </button>
            </div>

            {/* QR Code */}
            <button onClick={() => setShowQR(!showQR)} className="w-full mt-4 flex items-center justify-center gap-2 p-3 border-2 border-slate-200 rounded-2xl text-slate-600 font-medium text-sm hover:bg-slate-50 transition-all">
              <QrCode size={18} />
              {showQR ? 'Ocultar QR Code' : 'Mostrar QR Code'}
            </button>

            {showQR && (
              <div className="mt-4 flex flex-col items-center p-6 bg-white border-2 border-slate-100 rounded-2xl">
                {/* Simulated QR Code */}
                <div className="w-40 h-40 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-slate-200">
                  <div className="grid grid-cols-8 gap-0.5 w-32 h-32">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`w-full aspect-square rounded-sm ${Math.random() > 0.5 ? 'bg-slate-800' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-3">Escaneie para ver o perfil</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Compartilhado!</h3>
            <p className="text-sm text-slate-500 mt-2">O perfil foi compartilhado com sucesso.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default ShareProfile;
