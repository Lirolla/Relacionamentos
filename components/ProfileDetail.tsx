import React, { useState } from 'react';
import { X, Heart, MapPin, Church, Calendar, BookOpen, Music, Star, Shield, ShieldCheck, ChevronLeft, ChevronRight, Flag, Share2, MessageSquare, Award, Users, Coffee, Sparkles, Check } from 'lucide-react';

interface ProfileDetailProps {
  profile: {
    id: string;
    name: string;
    age: number;
    photo: string;
    photos?: string[];
    bio?: string;
    churchName?: string;
    denomination?: string;
    city?: string;
    state?: string;
    faithJourney?: string;
    interests?: string[];
    physical?: { height?: number; hairColor?: string; bodyType?: string };
    isVerified?: boolean;
    isPastorVerified?: boolean;
    baptized?: boolean;
    churchRole?: string;
    favoriteVerse?: string;
    worshipStyle?: string;
    relationshipGoal?: string;
    coordinates?: { lat: number; lng: number };
  };
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
  onReport: () => void;
  onShare: () => void;
  distance?: number;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile, onClose, onLike, onPass, onReport, onShare, distance }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = profile.photos?.length ? profile.photos : [profile.photo];

  const nextPhoto = () => setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);

  const compatibilityScore = Math.floor(70 + Math.random() * 25);

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 overflow-y-auto">
      {/* Photo Gallery */}
      <div className="relative w-full aspect-[3/4] max-h-[60vh]">
        <img src={photos[currentPhotoIndex]} className="w-full h-full object-cover" />
        
        {/* Photo indicators */}
        {photos.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {photos.map((_, i) => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i === currentPhotoIndex ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        )}

        {/* Navigation arrows */}
        {photos.length > 1 && (
          <>
            <button onClick={prevPhoto} className="absolute left-0 top-0 bottom-0 w-1/3" />
            <button onClick={nextPhoto} className="absolute right-0 top-0 bottom-0 w-1/3" />
          </>
        )}

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-xl rounded-full text-white z-10">
          <X size={24} />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {profile.isVerified && (
            <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-md px-3 py-1.5 rounded-full">
              <ShieldCheck size={14} className="text-white" />
              <span className="text-white text-xs font-bold">Verificado</span>
            </div>
          )}
          {profile.isPastorVerified && (
            <div className="flex items-center gap-1 bg-purple-500/90 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Church size={14} className="text-white" />
              <span className="text-white text-xs font-bold">Pastor Aprova</span>
            </div>
          )}
        </div>

        {/* Distance badge */}
        {distance !== undefined && (
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
            <span className="text-slate-800 text-xs font-bold">📍 {distance < 1 ? '< 1' : Math.round(distance)} km</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />
        
        {/* Name and age */}
        <div className="absolute bottom-4 left-4 z-10">
          <h1 className="text-white text-3xl font-bold">{profile.name}, {profile.age}</h1>
          <div className="flex items-center gap-2 mt-1">
            {profile.churchName && (
              <span className="text-white/80 text-sm flex items-center gap-1">
                <Church size={14} /> {profile.churchName}
              </span>
            )}
          </div>
          {profile.city && (
            <span className="text-white/60 text-sm flex items-center gap-1 mt-1">
              <MapPin size={14} /> {profile.city}{profile.state ? `, ${profile.state}` : ''}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 pb-32">
        {/* Compatibility Score */}
        <div className="flex justify-center -mt-6">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <Sparkles size={20} className="text-white" />
            <span className="text-white font-bold text-lg">{compatibilityScore}% Compatível na Fé</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Bio */}
          {profile.bio && (
            <div>
              <h3 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-2">Sobre mim</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Faith Journey */}
          {profile.faithJourney && (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="text-amber-800 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <BookOpen size={16} /> Minha História com Jesus
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed italic">"{profile.faithJourney}"</p>
            </div>
          )}

          {/* Favorite Verse */}
          {profile.favoriteVerse && (
            <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
              <h3 className="text-purple-800 font-bold text-sm uppercase tracking-wider mb-2">📖 Versículo Favorito</h3>
              <p className="text-purple-700 text-sm italic">"{profile.favoriteVerse}"</p>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {profile.denomination && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Denominação</span>
                <p className="text-slate-800 font-bold text-sm mt-1">{profile.denomination}</p>
              </div>
            )}
            {profile.churchRole && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Ministério</span>
                <p className="text-slate-800 font-bold text-sm mt-1">{profile.churchRole}</p>
              </div>
            )}
            {profile.worshipStyle && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Estilo de Louvor</span>
                <p className="text-slate-800 font-bold text-sm mt-1">{profile.worshipStyle}</p>
              </div>
            )}
            {profile.relationshipGoal && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Objetivo</span>
                <p className="text-slate-800 font-bold text-sm mt-1">{profile.relationshipGoal}</p>
              </div>
            )}
            {profile.physical?.height && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Altura</span>
                <p className="text-slate-800 font-bold text-sm mt-1">{profile.physical.height} cm</p>
              </div>
            )}
            {profile.baptized !== undefined && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Batizado</span>
                <p className="text-slate-800 font-bold text-sm mt-1 flex items-center gap-1">
                  {profile.baptized ? <><Check size={14} className="text-green-500" /> Sim</> : 'Não informado'}
                </p>
              </div>
            )}
          </div>

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div>
              <h3 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-3">Interesses</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <span key={i} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Report & Share */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button onClick={onShare} className="flex-1 py-3 bg-slate-50 rounded-2xl text-slate-600 text-sm font-bold flex items-center justify-center gap-2">
              <Share2 size={16} /> Compartilhar
            </button>
            <button onClick={onReport} className="flex-1 py-3 bg-red-50 rounded-2xl text-red-500 text-sm font-bold flex items-center justify-center gap-2">
              <Flag size={16} /> Denunciar
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 flex items-center justify-center gap-6 z-50">
        <button onClick={onPass} className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-lg">
          <X size={28} className="text-slate-400" />
        </button>
        <button onClick={onLike} className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-xl shadow-amber-200">
          <Heart size={36} fill="white" className="text-white" />
        </button>
        <button onClick={() => {}} className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-lg">
          <Star size={28} className="text-purple-500" />
        </button>
      </div>
    </div>
  );
};

export default ProfileDetail;
