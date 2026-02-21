import React, { useState, useEffect } from 'react';
const OfflineDetector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [online, setOnline] = useState(navigator.onLine);
  const [showReconnect, setShowReconnect] = useState(false);
  useEffect(() => {
    const on = () => { setOnline(true); setShowReconnect(true); setTimeout(() => setShowReconnect(false), 3000); };
    const off = () => { setOnline(false); setShowReconnect(false); };
    window.addEventListener('online', on); window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  return (
    <div>
      {!online && <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 text-sm z-50 flex items-center justify-center gap-2"><span>📵</span> Você está sem internet. Algumas funcionalidades podem não funcionar.</div>}
      {showReconnect && <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm z-50 flex items-center justify-center gap-2"><span>✅</span> Conexão restaurada!</div>}
      {children}
    </div>
  );
};
export default OfflineDetector;
