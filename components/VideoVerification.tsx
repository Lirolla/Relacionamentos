import React, { useState, useRef, useEffect } from 'react';
import { X, Video, Camera, RefreshCw, CheckCircle, AlertTriangle, Shield, Mic, StopCircle } from 'lucide-react';

const RANDOM_PHRASES = [
  'Eu sou uma pessoa real e busco conexões verdadeiras',
  'Deus é meu guia e confio no Seu plano para minha vida',
  'Estou aqui com sinceridade buscando alguém especial',
  'A fé me trouxe até aqui e acredito no amor verdadeiro',
  'Meu coração está aberto para o que Deus preparou',
  'Sou autêntico e busco uma conexão genuína na fé',
];

interface VideoVerificationProps {
  onClose: () => void;
  onSubmit: (status: string) => void;
  currentStatus: 'none' | 'pending' | 'verified' | 'rejected';
}

const VideoVerification: React.FC<VideoVerificationProps> = ({ onClose, onSubmit, currentStatus }) => {
  const [step, setStep] = useState<'intro' | 'phrase' | 'recording' | 'preview' | 'submitted'>(currentStatus === 'none' ? 'intro' : 'submitted');
  const [phrase] = useState(RANDOM_PHRASES[Math.floor(Math.random() * RANDOM_PHRASES.length)]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 10) {
          stopRecording();
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setHasRecording(true);
    setStep('preview');
  };

  const handleSubmit = () => {
    onSubmit('pending');
    setStep('submitted');
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Video size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Verificação por Vídeo</h3>
              <p className="text-emerald-100 text-sm">Prove que você é real</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step: Intro */}
          {step === 'intro' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                <Shield size={48} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">Verificação de Identidade</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Para garantir a segurança da comunidade, pedimos que você grave um vídeo curto dizendo uma frase que vamos te mostrar. Isso prova que você é uma pessoa real.
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <h5 className="font-bold text-amber-700 text-sm mb-2">Como funciona:</h5>
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-2 text-sm text-amber-600">
                    <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">1</span>
                    <span>Vamos te mostrar uma frase aleatória</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-amber-600">
                    <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">2</span>
                    <span>Grave um vídeo selfie dizendo a frase (5-10 segundos)</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-amber-600">
                    <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">3</span>
                    <span>Nossa equipe analisa e verifica em até 24h</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setStep('phrase')} className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 active:scale-95 transition-all">
                Começar Verificação
              </button>
            </div>
          )}

          {/* Step: Show Phrase */}
          {step === 'phrase' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <Mic size={32} className="text-blue-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Diga esta frase no vídeo:</h4>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl">
                  <p className="text-white text-lg font-medium italic leading-relaxed">"{phrase}"</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-sm text-blue-600 flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Memorize a frase antes de gravar. O vídeo deve ter entre 5 e 10 segundos.</span>
              </div>
              <button onClick={() => setStep('recording')} className="w-full py-4 bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-all">
                Estou Pronto para Gravar
              </button>
            </div>
          )}

          {/* Step: Recording */}
          {step === 'recording' && (
            <div className="text-center space-y-6">
              {/* Camera Preview Simulation */}
              <div className="relative w-64 h-64 mx-auto bg-slate-900 rounded-[32px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-white/40 flex items-center justify-center">
                    <Camera size={48} className="text-white/60" />
                  </div>
                </div>
                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-bold">REC {recordingTime}s</span>
                  </div>
                )}
                {/* Progress bar */}
                {isRecording && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${(recordingTime / 10) * 100}%` }} />
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-500 italic">"{phrase}"</p>

              {!isRecording && !hasRecording && (
                <button onClick={startRecording} className="w-full py-4 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Video size={20} /> Iniciar Gravação
                </button>
              )}
              {isRecording && (
                <button onClick={stopRecording} className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                  <StopCircle size={20} /> Parar Gravação ({10 - recordingTime}s restantes)
                </button>
              )}
            </div>
          )}

          {/* Step: Preview */}
          {step === 'preview' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">Vídeo Gravado!</h4>
                <p className="text-slate-500 text-sm">Revise e envie para análise, ou grave novamente.</p>
              </div>
              <div className="relative w-48 h-48 mx-auto bg-slate-100 rounded-[24px] overflow-hidden flex items-center justify-center">
                <Video size={48} className="text-slate-300" />
                <div className="absolute bottom-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">{recordingTime}s</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setHasRecording(false); setStep('recording'); }} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2">
                  <RefreshCw size={16} /> Regravar
                </button>
                <button onClick={handleSubmit} className="flex-1 py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 active:scale-95 transition-all">
                  Enviar para Análise
                </button>
              </div>
            </div>
          )}

          {/* Step: Submitted */}
          {step === 'submitted' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
                {currentStatus === 'verified' ? (
                  <CheckCircle size={40} className="text-emerald-500" />
                ) : currentStatus === 'rejected' ? (
                  <AlertTriangle size={40} className="text-red-500" />
                ) : (
                  <Shield size={40} className="text-amber-500" />
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  {currentStatus === 'verified' ? 'Verificado!' : currentStatus === 'rejected' ? 'Verificação Rejeitada' : 'Em Análise'}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {currentStatus === 'verified' 
                    ? 'Seu perfil foi verificado com sucesso! Agora você tem o selo de verificado.' 
                    : currentStatus === 'rejected'
                    ? 'Sua verificação foi rejeitada. Tente novamente com melhor iluminação e áudio claro.'
                    : 'Seu vídeo foi enviado e está sendo analisado pela nossa equipe. Você receberá uma notificação em até 24 horas.'}
                </p>
              </div>
              {currentStatus === 'rejected' && (
                <button onClick={() => setStep('intro')} className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                  Tentar Novamente
                </button>
              )}
              <button onClick={onClose} className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl active:scale-95 transition-all">
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoVerification;
