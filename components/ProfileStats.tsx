import React from 'react';
interface Props { stats: { views: number; likes: number; matches: number; matchRate: number; likedBy: number; }; isPremium: boolean; onUpgrade?: () => void; }
const ProfileStats: React.FC<Props> = ({ stats, isPremium, onUpgrade }) => {
  const items = [
    { label: 'Visualizações', value: stats.views, icon: '👁️' },
    { label: 'Curtidas recebidas', value: stats.likedBy, icon: '❤️' },
    { label: 'Matches', value: stats.matches, icon: '✨' },
    { label: 'Taxa de match', value: `${stats.matchRate}%`, icon: '📊' },
  ];
  if (!isPremium) return (
    <div className="p-4 relative">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Estatísticas do Perfil</h3>
      <div className="grid grid-cols-2 gap-3 filter blur-sm">
        {items.map((it,i) => <div key={i} className="bg-purple-50 rounded-xl p-4 text-center"><span className="text-2xl">{it.icon}</span><p className="text-2xl font-bold text-purple-700 mt-2">{it.value}</p><p className="text-xs text-gray-500">{it.label}</p></div>)}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <span className="text-4xl">🔒</span>
          <p className="font-bold text-gray-800 mt-2">Recurso Premium</p>
          <p className="text-sm text-gray-500 mt-1">Desbloqueie suas estatísticas</p>
          <button onClick={onUpgrade} className="mt-3 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-sm font-semibold">Seja Premium</button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Estatísticas do Perfil</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((it,i) => <div key={i} className="bg-purple-50 rounded-xl p-4 text-center"><span className="text-2xl">{it.icon}</span><p className="text-2xl font-bold text-purple-700 mt-2">{it.value}</p><p className="text-xs text-gray-500">{it.label}</p></div>)}
      </div>
    </div>
  );
};
export default ProfileStats;
