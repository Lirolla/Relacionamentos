
import React, { useState, useEffect } from 'react';
import { Heart, Cross, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'loading' | 'ready'>('logo');

  useEffect(() => {
    // Phase 1: Logo animation
    const logoTimer = setTimeout(() => setPhase('loading'), 800);
    
    // Phase 2: Loading progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setPhase('ready');
          setTimeout(onFinish, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.1 + Math.random() * 0.15,
            }}
          >
            {i % 3 === 0 ? (
              <Heart size={16 + Math.random() * 24} className="text-white" fill="white" />
            ) : i % 3 === 1 ? (
              <Cross size={12 + Math.random() * 16} className="text-white" />
            ) : (
              <Sparkles size={12 + Math.random() * 16} className="text-white" />
            )}
          </div>
        ))}
      </div>

      {/* Glow effect */}
      <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />

      {/* Logo */}
      <div className={`relative transition-all duration-700 ${phase === 'logo' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="w-28 h-28 bg-white rounded-[36px] flex items-center justify-center shadow-2xl shadow-amber-900/30 mb-8 relative">
          <Heart size={56} className="text-amber-500" fill="currentColor" />
          {/* Cross overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Cross size={24} className="text-white" strokeWidth={3} />
          </div>
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 rounded-[36px] border-2 border-white/30 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* App Name */}
      <h1 className={`text-4xl font-serif font-bold text-white tracking-tight transition-all duration-500 ${phase !== 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Conexão Divina
      </h1>
      <p className={`text-white/70 text-xs font-bold uppercase tracking-[0.4em] mt-2 transition-all duration-500 delay-200 ${phase !== 'logo' ? 'opacity-100' : 'opacity-0'}`}>
        Namoro Cristão
      </p>

      {/* Tagline */}
      <p className={`text-white/50 text-sm mt-6 text-center max-w-xs transition-all duration-500 delay-300 ${phase !== 'logo' ? 'opacity-100' : 'opacity-0'}`}>
        Encontre alguém que compartilhe sua fé
      </p>

      {/* Loading bar */}
      <div className={`w-48 mt-12 transition-all duration-500 delay-500 ${phase !== 'logo' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-white/40 text-[10px] text-center mt-3 font-medium">
          {progress < 30 ? 'Preparando sua experiência...' :
           progress < 60 ? 'Carregando perfis...' :
           progress < 90 ? 'Quase pronto...' : 'Bem-vindo(a)!'}
        </p>
      </div>

      {/* Version */}
      <p className={`absolute bottom-8 text-white/30 text-[10px] transition-all duration-500 ${phase !== 'logo' ? 'opacity-100' : 'opacity-0'}`}>
        v5.0 · Feito com ❤️ e fé
      </p>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          75% { transform: translateY(-25px) rotate(2deg); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SplashScreen;
