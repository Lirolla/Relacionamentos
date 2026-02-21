
import React, { useState } from 'react';
import { X, Shield, Flag, Ban, AlertTriangle, Check, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface BlockReportProps {
  userName: string;
  userPhoto: string;
  onBlock: () => void;
  onReport: (reason: string, description: string) => void;
  onClose: () => void;
}

const REPORT_REASONS = [
  { id: 'fake', label: 'Perfil falso', icon: '🎭', desc: 'A pessoa não é quem diz ser' },
  { id: 'inappropriate', label: 'Conteúdo inapropriado', icon: '🚫', desc: 'Fotos ou textos inadequados' },
  { id: 'harassment', label: 'Assédio ou ameaça', icon: '⚠️', desc: 'Comportamento agressivo ou ameaçador' },
  { id: 'scam', label: 'Golpe ou fraude', icon: '💰', desc: 'Tentativa de golpe financeiro' },
  { id: 'underage', label: 'Menor de idade', icon: '👶', desc: 'Pessoa aparenta ser menor de 18 anos' },
  { id: 'spam', label: 'Spam ou propaganda', icon: '📢', desc: 'Mensagens comerciais ou spam' },
  { id: 'not_christian', label: 'Não é cristão', icon: '⛪', desc: 'Não demonstra valores cristãos' },
  { id: 'other', label: 'Outro motivo', icon: '📝', desc: 'Descreva o problema' },
];

const BlockReport: React.FC<BlockReportProps> = ({ userName, userPhoto, onBlock, onReport, onClose }) => {
  const [mode, setMode] = useState<'menu' | 'block' | 'report' | 'reason' | 'success'>('menu');
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [blockConfirmed, setBlockConfirmed] = useState(false);

  const handleBlock = () => {
    onBlock();
    setBlockConfirmed(true);
    setMode('success');
  };

  const handleReport = () => {
    onReport(selectedReason, description);
    setMode('success');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Menu Principal */}
        {mode === 'menu' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">O que deseja fazer?</h2>
              <button onClick={onClose} className="p-2 text-slate-400"><X size={20} /></button>
            </div>

            {/* User info */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl mb-6">
              <img src={userPhoto} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <span className="font-bold text-slate-800">{userName}</span>
                <p className="text-xs text-slate-400">Perfil selecionado</p>
              </div>
            </div>

            <div className="space-y-2">
              <button onClick={() => setMode('block')} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Ban size={22} />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-bold text-slate-800">Bloquear</span>
                  <p className="text-xs text-slate-400">Essa pessoa não verá mais seu perfil</p>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>

              <button onClick={() => setMode('reason')} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <Flag size={22} />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-bold text-slate-800">Denunciar</span>
                  <p className="text-xs text-slate-400">Reportar comportamento inadequado</p>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>

              <button onClick={onClose} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <EyeOff size={22} />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-bold text-slate-800">Ocultar perfil</span>
                  <p className="text-xs text-slate-400">Não mostrar essa pessoa novamente</p>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            </div>
          </div>
        )}

        {/* Confirmar Bloqueio */}
        {mode === 'block' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Bloquear {userName}?</h2>
              <button onClick={() => setMode('menu')} className="p-2 text-slate-400"><X size={20} /></button>
            </div>

            <div className="bg-orange-50 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-orange-800 font-medium">Ao bloquear:</p>
                  <ul className="text-xs text-orange-600 mt-2 space-y-1">
                    <li>• {userName} não poderá ver seu perfil</li>
                    <li>• Vocês não poderão trocar mensagens</li>
                    <li>• Matches existentes serão removidos</li>
                    <li>• Essa ação pode ser desfeita nas configurações</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setMode('menu')} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl">
                Cancelar
              </button>
              <button onClick={handleBlock} className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                Bloquear
              </button>
            </div>
          </div>
        )}

        {/* Selecionar Motivo da Denúncia */}
        {mode === 'reason' && (
          <div className="p-6 flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Motivo da denúncia</h2>
              <button onClick={() => setMode('menu')} className="p-2 text-slate-400"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {REPORT_REASONS.map(reason => (
                <button
                  key={reason.id}
                  onClick={() => { setSelectedReason(reason.id); setMode('report'); }}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedReason === reason.id ? 'border-red-500 bg-red-50' : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{reason.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm text-slate-800">{reason.label}</span>
                    <p className="text-[10px] text-slate-400">{reason.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Descrição da Denúncia */}
        {mode === 'report' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Descreva o problema</h2>
              <button onClick={() => setMode('reason')} className="p-2 text-slate-400"><X size={20} /></button>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Motivo: <span className="font-bold text-slate-700">{REPORT_REASONS.find(r => r.id === selectedReason)?.label}</span>
            </p>

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descreva com mais detalhes o que aconteceu (opcional)..."
              className="w-full h-32 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm resize-none outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
            />

            <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-xl">
              <Shield size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-blue-600">Sua denúncia é confidencial. A pessoa denunciada não saberá quem fez a denúncia.</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setMode('reason')} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl">
                Voltar
              </button>
              <button onClick={handleReport} className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                Enviar Denúncia
              </button>
            </div>
          </div>
        )}

        {/* Sucesso */}
        {mode === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {blockConfirmed ? 'Usuário bloqueado' : 'Denúncia enviada'}
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              {blockConfirmed
                ? `${userName} não poderá mais ver seu perfil ou entrar em contato.`
                : 'Nossa equipe analisará sua denúncia em até 24 horas. Obrigado por ajudar a manter a comunidade segura.'}
            </p>
            <button onClick={onClose} className="w-full py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all">
              Entendi
            </button>
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

export default BlockReport;
