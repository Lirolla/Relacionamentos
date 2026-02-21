import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, Video, Mic, MicOff, VideoOff, PhoneOff, Volume2, Maximize2, MessageSquare, Heart } from 'lucide-react';

interface AudioVideoChatProps {
  partnerName: string;
  partnerPhoto: string;
  callType: 'audio' | 'video';
  onClose: () => void;
}

const AudioVideoChat: React.FC<AudioVideoChatProps> = ({ partnerName, partnerPhoto, callType, onClose }) => {
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate connection after 2 seconds
    const connectTimer = setTimeout(() => {
      setCallState('connected');
    }, 2500);

    return () => {
      clearTimeout(connectTimer);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (callState === 'connected') {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setCallState('ended');
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-slate-900 flex flex-col">
      {/* Background */}
      {callType === 'video' && callState === 'connected' && !isVideoOff ? (
        <div className="absolute inset-0">
          <img src={partnerPhoto} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/20" />
          {/* Self view */}
          <div className="absolute top-16 right-4 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-slate-800">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white text-lg font-bold">Eu</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black" />
      )}

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10">
        {/* Partner Info */}
        {(callType === 'audio' || callState === 'ringing' || isVideoOff) && (
          <div className="text-center mb-8">
            <div className={`w-32 h-32 rounded-full overflow-hidden border-4 mx-auto mb-6 shadow-2xl ${
              callState === 'ringing' ? 'border-amber-400 animate-pulse' : 'border-white/30'
            }`}>
              <img src={partnerPhoto} className="w-full h-full object-cover" alt={partnerName} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{partnerName}</h2>
            <p className="text-white/60 text-sm font-medium">
              {callState === 'ringing' && (callType === 'video' ? 'Chamada de vídeo...' : 'Chamando...')}
              {callState === 'connected' && formatDuration(duration)}
              {callState === 'ended' && 'Chamada encerrada'}
            </p>
          </div>
        )}

        {/* Connected indicator for video */}
        {callType === 'video' && callState === 'connected' && !isVideoOff && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">{formatDuration(duration)}</span>
          </div>
        )}

        {/* Ringing animation */}
        {callState === 'ringing' && (
          <div className="flex items-center gap-2 bg-amber-500/20 px-6 py-3 rounded-full">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-amber-300 text-sm font-medium">Conectando...</span>
          </div>
        )}

        {/* Ended */}
        {callState === 'ended' && (
          <div className="bg-red-500/20 px-6 py-3 rounded-full">
            <span className="text-red-300 text-sm font-medium">Chamada encerrada - {formatDuration(duration)}</span>
          </div>
        )}
      </div>

      {/* Controls */}
      {callState !== 'ended' && (
        <div className="relative z-10 pb-12 pt-6 px-6">
          <div className="flex items-center justify-center gap-6">
            {/* Mute */}
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isMuted ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>

            {/* Video toggle (only for video calls) */}
            {callType === 'video' && (
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)} 
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isVideoOff ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                {isVideoOff ? <VideoOff size={22} /> : <Video size={22} />}
              </button>
            )}

            {/* End call */}
            <button 
              onClick={endCall} 
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/40 active:scale-90 transition-all"
            >
              <PhoneOff size={26} />
            </button>

            {/* Speaker */}
            <button 
              onClick={() => setIsSpeaker(!isSpeaker)} 
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isSpeaker ? 'bg-amber-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Volume2 size={22} />
            </button>

            {/* Chat shortcut */}
            <button className="w-14 h-14 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-all">
              <MessageSquare size={22} />
            </button>
          </div>

          {/* Labels */}
          <div className="flex items-center justify-center gap-6 mt-2">
            <span className="text-white/40 text-[10px] w-14 text-center">{isMuted ? 'Sem som' : 'Mudo'}</span>
            {callType === 'video' && <span className="text-white/40 text-[10px] w-14 text-center">{isVideoOff ? 'Sem vídeo' : 'Câmera'}</span>}
            <span className="text-white/40 text-[10px] w-16 text-center">Encerrar</span>
            <span className="text-white/40 text-[10px] w-14 text-center">Alto-falante</span>
            <span className="text-white/40 text-[10px] w-14 text-center">Chat</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVideoChat;
