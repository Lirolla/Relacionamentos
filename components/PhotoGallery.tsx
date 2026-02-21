
import React, { useState } from 'react';
import { Camera, Plus, X, Trash2, Star, ChevronLeft, ChevronRight, ZoomIn, Move } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  onUpdatePhotos: (photos: string[]) => void;
  editable?: boolean;
  maxPhotos?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onUpdatePhotos, editable = false, maxPhotos = 9 }) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  ];

  const displayPhotos = photos.length > 0 ? photos : SAMPLE_PHOTOS;

  const handleAddPhoto = () => {
    // Simular adição de foto
    const newPhotos = [...displayPhotos, SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)]];
    onUpdatePhotos(newPhotos.slice(0, maxPhotos));
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = displayPhotos.filter((_, i) => i !== index);
    onUpdatePhotos(newPhotos);
  };

  const handleSetMain = (index: number) => {
    const newPhotos = [...displayPhotos];
    const [photo] = newPhotos.splice(index, 1);
    newPhotos.unshift(photo);
    onUpdatePhotos(newPhotos);
  };

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50 && viewerIndex < displayPhotos.length - 1) setViewerIndex(viewerIndex + 1);
    else if (diff < -50 && viewerIndex > 0) setViewerIndex(viewerIndex - 1);
  };

  return (
    <>
      {/* Grid de Fotos */}
      <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden">
        {displayPhotos.slice(0, maxPhotos).map((photo, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            onClick={() => !editable && openViewer(index)}
          >
            <img
              src={photo}
              alt={`Foto ${index + 1}`}
              className={`w-full object-cover ${index === 0 ? 'h-64' : 'h-32'}`}
            />
            
            {/* Overlay no hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              {!editable && (
                <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
              )}
            </div>

            {/* Badge foto principal */}
            {index === 0 && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-[8px] font-bold rounded-full flex items-center gap-1">
                <Star size={8} fill="white" /> PRINCIPAL
              </div>
            )}

            {/* Botões de edição */}
            {editable && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                {index !== 0 && (
                  <button onClick={(e) => { e.stopPropagation(); handleSetMain(index); }} className="p-2 bg-amber-500 text-white rounded-full" title="Definir como principal">
                    <Star size={14} />
                  </button>
                )}
                <button onClick={(e) => { e.stopPropagation(); handleRemovePhoto(index); }} className="p-2 bg-red-500 text-white rounded-full" title="Remover">
                  <Trash2 size={14} />
                </button>
                <button className="p-2 bg-white/80 text-slate-700 rounded-full" title="Mover">
                  <Move size={14} />
                </button>
              </div>
            )}

            {/* Número da foto */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-black/50 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {index + 1}
            </div>
          </div>
        ))}

        {/* Botão adicionar foto */}
        {editable && displayPhotos.length < maxPhotos && (
          <button
            onClick={handleAddPhoto}
            className="h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-amber-50 hover:border-amber-300 transition-all"
          >
            <Plus size={24} className="text-slate-400" />
            <span className="text-[10px] text-slate-400 font-medium">Adicionar</span>
          </button>
        )}
      </div>

      {/* Contador */}
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-xs text-slate-400">{displayPhotos.length}/{maxPhotos} fotos</span>
        {editable && (
          <span className="text-[10px] text-amber-600 font-medium">Dica: A primeira foto é a principal do perfil</span>
        )}
      </div>

      {/* Viewer Fullscreen */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 right-0 z-10">
            <span className="text-white font-bold">{viewerIndex + 1} / {displayPhotos.length}</span>
            <button onClick={() => setViewerOpen(false)} className="p-2 text-white">
              <X size={24} />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={displayPhotos[viewerIndex]}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation */}
          {viewerIndex > 0 && (
            <button onClick={() => setViewerIndex(viewerIndex - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white backdrop-blur-sm">
              <ChevronLeft size={24} />
            </button>
          )}
          {viewerIndex < displayPhotos.length - 1 && (
            <button onClick={() => setViewerIndex(viewerIndex + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white backdrop-blur-sm">
              <ChevronRight size={24} />
            </button>
          )}

          {/* Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {displayPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setViewerIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === viewerIndex ? 'bg-amber-500 w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
