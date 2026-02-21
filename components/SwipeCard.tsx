
import React, { useState } from 'react';
import { Profile } from '../types';
// Added Sparkles to the import list to fix the "Cannot find name 'Sparkles'" error on line 100
import { Heart, X, Info, MapPin, Church, Ruler, UserCheck, Sparkles } from 'lucide-react';

interface SwipeCardProps {
  profile: Profile;
  onSwipeRight: (id: string) => void;
  onSwipeLeft: (id: string) => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipeRight, onSwipeLeft }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full max-w-sm h-[650px] bg-white rounded-[48px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-[1.01]">
      <img 
        src={profile.imageUrl} 
        alt={profile.name} 
        className="w-full h-full object-cover select-none"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        {!showDetails ? (
          <div className="animate-fade-in">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-4xl font-serif font-bold tracking-tight">{profile.name}, {profile.age}</h2>
                <p className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-widest mt-2">
                  <Church size={16} />
                  {profile.churchName}
                </p>
                <div className="flex gap-4 mt-3">
                   <p className="flex items-center gap-1.5 text-slate-300 text-xs font-medium">
                    <MapPin size={14} className="text-slate-400" />
                    {profile.location}
                  </p>
                  {profile.physical?.height && (
                    <p className="flex items-center gap-1.5 text-slate-300 text-xs font-medium">
                      <Ruler size={14} className="text-slate-400" />
                      {profile.physical.height} cm
                    </p>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setShowDetails(true)}
                className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl hover:bg-white/20 transition-all pointer-events-auto border border-white/20"
              >
                <Info size={24} />
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-6 pt-4 pointer-events-auto">
              <button 
                onClick={() => onSwipeLeft(profile.id)}
                className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 hover:bg-rose-500 hover:border-rose-400 active:scale-90 transition-all"
              >
                <X size={32} />
              </button>
              <button 
                onClick={() => onSwipeRight(profile.id)}
                className="w-24 h-20 rounded-[32px] bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-90 transition-all"
              >
                <Heart size={42} fill="currentColor" />
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up pointer-events-auto h-full overflow-y-auto bg-slate-900/90 backdrop-blur-2xl rounded-t-[48px] p-10 -mx-10 -mb-10 min-h-[500px] border-t border-white/10 shadow-2xl">
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X size={28} />
            </button>
            <h3 className="text-3xl font-serif font-bold mb-2">{profile.name}</h3>
            <p className="text-amber-500 font-black text-xs uppercase tracking-widest mb-8">{profile.churchRole} em {profile.churchName}</p>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Altura</h4>
                  <p className="text-white font-bold">{profile.physical?.height || '---'} cm</p>
                </div>
                <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Cabelo</h4>
                  <p className="text-white font-bold">{profile.physical?.hairColor || '---'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Sobre Mim</h4>
                <p className="text-slate-200 leading-relaxed font-medium">{profile.bio}</p>
              </div>

              <div className="p-6 bg-amber-500/10 rounded-[32px] border border-amber-500/20">
                <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Sparkles size={14}/> Testemunho de Fé</h4>
                <p className="text-white text-sm italic leading-relaxed font-medium">"{profile.faithJourney}"</p>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Interesses</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <span key={interest} className="px-5 py-2 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeCard;
