import React, { useState, useEffect, useRef } from 'react';
import { X, Shield, MapPin, Phone, AlertTriangle, Clock, Share2, UserCheck, Navigation2, Bell, CheckCircle, Users } from 'lucide-react';

interface SafeModeProps {
  partnerName: string;
  partnerPhoto: string;
  onClose: () => void;
}

const SafeMode: React.FC<SafeModeProps> = ({ partnerName, partnerPhoto, onClose }) => {
  const [step, setStep] = useState<'setup' | 'active' | 'emergency'>('setup');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [contactName, setContactName] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');
  const [duration, setDuration] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);
  const [emergencySent, setEmergencySent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const activateSafeMode = () => {
    if (!contactName.trim()) return;
    setStep('active');
    setIsSharing(true);
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins.toString().padStart(2, '0')}m`;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerEmergency = () => {
    setEmergencySent(true);
    setShowEmergencyConfirm(false);
    // In production: send SMS, share location, alert contacts
  };

  const deactivate = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSharing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 text-white relative ${step === 'active' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : step === 'emergency' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Modo Seguro</h3>
              <p className="text-white/80 text-sm">
                {step === 'setup' ? 'Configure antes do encontro' : step === 'active' ? 'Proteção ativa' : 'Emergência'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Setup Step */}
          {step === 'setup' && (
            <div className="space-y-6">
              {/* Meeting info */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <img src={partnerPhoto} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Encontro com</p>
                    <p className="text-blue-600 font-bold">{partnerName}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Contato de Emergência</label>
                <input 
                  type="text" 
                  value={contactName} 
                  onChange={e => setContactName(e.target.value)}
                  placeholder="Nome do contato (ex: Mãe, Amiga)" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  value={emergencyContact} 
                  onChange={e => setEmergencyContact(e.target.value)}
                  placeholder="Telefone (ex: 11 99999-0000)" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              {/* Meeting Place */}
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Local do Encontro</label>
                <input 
                  type="text" 
                  value={meetingPlace} 
                  onChange={e => setMeetingPlace(e.target.value)}
                  placeholder="Ex: Café Central, Av. Paulista 1000" 
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              {/* Safety Tips */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <h5 className="font-bold text-amber-700 text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} /> Dicas de Segurança
                </h5>
                <div className="space-y-2 text-sm text-amber-600">
                  <p>- Sempre encontre em locais públicos</p>
                  <p>- Avise alguém de confiança sobre o encontro</p>
                  <p>- Tenha seu próprio transporte</p>
                  <p>- Confie nos seus instintos</p>
                </div>
              </div>

              <button 
                onClick={activateSafeMode} 
                disabled={!contactName.trim()}
                className={`w-full py-4 font-bold rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  contactName.trim() ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Shield size={20} /> Ativar Modo Seguro
              </button>
            </div>
          )}

          {/* Active Step */}
          {step === 'active' && (
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield size={32} className="text-emerald-500" />
                </div>
                <h4 className="font-bold text-emerald-700 text-lg">Proteção Ativa</h4>
                <p className="text-emerald-600 text-sm mt-1">Sua localização está sendo compartilhada</p>
                <div className="flex items-center justify-center gap-2 mt-3 bg-emerald-100 px-4 py-2 rounded-full">
                  <Clock size={14} className="text-emerald-600" />
                  <span className="text-emerald-700 font-bold text-sm">{formatDuration(duration)}</span>
                </div>
              </div>

              {/* Sharing with */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Compartilhando com</p>
                    <p className="font-bold text-slate-800">{contactName || 'Contato de emergência'}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-600 text-[10px] font-bold">AO VIVO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meeting info */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <img src={partnerPhoto} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Encontro com</p>
                    <p className="font-bold text-slate-800">{partnerName}</p>
                  </div>
                </div>
                {meetingPlace && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                    <MapPin size={14} /> {meetingPlace}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-blue-50 rounded-2xl text-center border border-blue-100 active:scale-95 transition-all">
                  <Share2 size={20} className="mx-auto text-blue-500 mb-1" />
                  <span className="text-xs font-bold text-blue-600">Compartilhar Local</span>
                </button>
                <button className="p-4 bg-purple-50 rounded-2xl text-center border border-purple-100 active:scale-95 transition-all">
                  <Phone size={20} className="mx-auto text-purple-500 mb-1" />
                  <span className="text-xs font-bold text-purple-600">Ligar Contato</span>
                </button>
              </div>

              {/* Emergency Button */}
              {!emergencySent ? (
                <button 
                  onClick={() => setShowEmergencyConfirm(true)}
                  className="w-full py-5 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <AlertTriangle size={24} /> EMERGÊNCIA
                </button>
              ) : (
                <div className="w-full py-5 bg-red-100 text-red-600 font-bold rounded-2xl text-center flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> Alerta enviado para {contactName}
                </div>
              )}

              {/* Deactivate */}
              <button onClick={deactivate} className="w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl active:scale-95 transition-all">
                Desativar Modo Seguro
              </button>
            </div>
          )}
        </div>

        {/* Emergency Confirmation Modal */}
        {showEmergencyConfirm && (
          <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-sm rounded-[32px] p-8 text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={40} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Confirmar Emergência</h3>
              <p className="text-slate-500 text-sm mb-6">
                Isso vai enviar sua localização atual e um alerta para <strong>{contactName}</strong>. Tem certeza?
              </p>
              <div className="space-y-3">
                <button onClick={triggerEmergency} className="w-full py-4 bg-red-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                  SIM, ENVIAR ALERTA
                </button>
                <button onClick={() => setShowEmergencyConfirm(false)} className="w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl active:scale-95 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeMode;
