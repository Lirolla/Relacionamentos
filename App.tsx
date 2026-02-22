
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_STATE } from './constants';
import { Profile, Match, UserRole, Message, AppFilters } from './types';
import Navigation from './components/Navigation';
import SwipeCard from './components/SwipeCard';
import AdminPanel from './components/AdminPanel';
import Onboarding from './components/Onboarding';
import IdentityVerification from './components/IdentityVerification';
import Stories from './components/Stories';
import Events from './components/Events';
import ProfileStats from './components/ProfileStats';
import Icebreakers from './components/Icebreakers';
import OfflineDetector from './components/OfflineDetector';
import ForgotPassword from './components/ForgotPassword';
import CommunityFeed from './components/CommunityFeed';
import PrayerMode from './components/PrayerMode';
import CoupleDevotional from './components/CoupleDevotional';
import NotificationCenter from './components/NotificationCenter';
import { ReputationDisplay, ReviewModal, SAMPLE_REPUTATION } from './components/ReputationSystem';
import VideoVerification from './components/VideoVerification';
import AudioVideoChat from './components/AudioVideoChat';
import SafeMode from './components/SafeMode';
import BibleReadingPlan from './components/BibleReadingPlan';
import ChurchMap from './components/ChurchMap';
import MatchAnimation from './components/MatchAnimation';
import ChristianReels from './components/ChristianReels';
import { VoiceMessageRecorder, VoiceMessagePlayer, VoiceButton } from './components/VoiceMessage';
import PhotoGallery from './components/PhotoGallery';
import AdvancedFilters from './components/AdvancedFilters';
import SplashScreen from './components/SplashScreen';
import BlockReport from './components/BlockReport';
import ShareProfile from './components/ShareProfile';
import SettingsPage from './components/SettingsPage';
import StoriesCamera from './components/StoriesCamera';
import ProfileDetail from './components/ProfileDetail';
import { MessageBubble, TypingIndicator, ChatInputBar, EnhancedMessage } from './components/EnhancedChat';
import OnboardingComplete from './components/OnboardingComplete';
import InviteSystem, { WaitingApproval } from './components/InviteSystem';
import { Heart, MessageSquare, Sparkles, Send, ArrowLeft, Church, ShieldCheck, Star, Camera, Save, MapPin, SlidersHorizontal, Ruler, UserCheck, X, Flag, AlertTriangle, Navigation2, Crown, Settings, LogOut, Bell, Lock, Eye, EyeOff, ChevronRight, Shield, Users, Calendar, BookOpen, Phone, Mail, User, Award, Video, Moon, Sun, Mic, Share2, Film, Image, Clock, CreditCard } from 'lucide-react';

// ===================== TELA DE ENTRADA =====================
const WelcomeScreen: React.FC<{ onLogin: () => void; onRegister: () => void }> = ({ onLogin, onRegister }) => (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex flex-col items-center justify-center p-8">
    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-amber-200 mb-8">
      <Heart size={48} fill="white" />
    </div>
    <h1 className="text-4xl font-serif font-bold text-slate-800 text-center">Conexão Divina</h1>
    <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mt-2">Namoro Cristão</p>
    <p className="text-slate-500 text-center mt-6 max-w-xs leading-relaxed">Encontre alguém que compartilhe sua fé, valores e propósito de vida.</p>
    
    <div className="w-full max-w-xs mt-12 space-y-4">
      <button onClick={onRegister} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all text-lg">
        Criar Minha Conta
      </button>
      <button onClick={onLogin} className="w-full py-5 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-200 active:scale-95 transition-all">
        Já Tenho Conta
      </button>
    </div>
    
    <div className="flex items-center gap-6 mt-12 text-xs text-slate-400">
      <span className="flex items-center gap-1"><Shield size={12}/> Seguro</span>
      <span className="flex items-center gap-1"><Users size={12}/> Membros verificados</span>
      <span className="flex items-center gap-1"><Church size={12}/> Cristão</span>
    </div>
  </div>
);

// ===================== TELA DE LOGIN =====================
const LoginScreen: React.FC<{ onLogin: (email: string, password: string) => void; onBack: () => void; onForgotPassword: () => void }> = ({ onLogin, onBack, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }
    setError('');
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-8">
      <button onClick={onBack} className="self-start p-3 bg-slate-50 rounded-2xl text-slate-400 mb-8"><ArrowLeft size={24}/></button>
      
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Bem-vindo de volta</h2>
        <p className="text-slate-400 mb-10">Entre com sua conta para continuar</p>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          
          <button onClick={onForgotPassword} className="text-amber-600 text-sm font-bold self-end">Esqueci minha senha</button>
          
          <button onClick={handleLogin} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all mt-4">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

// ===================== TELA DE REGISTRO =====================
const RegisterScreen: React.FC<{ onRegister: () => void; onBack: () => void }> = ({ onRegister, onBack }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', age: '', email: '', password: '',
    denomination: '', churchName: '', churchRole: '',
    location: '', bio: '', faithJourney: '',
    gender: '', maritalStatus: 'Solteiro(a)', hasChildren: false
  });
  
  return (
    <div className="min-h-screen bg-white flex flex-col p-8">
      <div className="flex items-center justify-between mb-8">
        <button onClick={step > 1 ? () => setStep(step - 1) : onBack} className="p-3 bg-slate-50 rounded-2xl text-slate-400"><ArrowLeft size={24}/></button>
        <div className="flex gap-2">
          {[1,2,3].map(s => (
            <div key={s} className={`w-12 h-1.5 rounded-full transition-all ${s <= step ? 'bg-amber-500' : 'bg-slate-200'}`}/>
          ))}
        </div>
        <div className="w-12"/>
      </div>
      
      <div className="flex-1 max-w-sm mx-auto w-full">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800">Dados Pessoais</h2>
            <p className="text-slate-400 text-sm">Conte-nos sobre você</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome Completo</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Seu nome" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Idade</label>
                  <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="25" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Gênero</label>
                  <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none appearance-none">
                    <option value="">Selecione</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">E-mail</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="seu@email.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Senha</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Mínimo 6 caracteres" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Estado Civil</label>
                  <select value={form.maritalStatus} onChange={e => setForm({...form, maritalStatus: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none appearance-none">
                    <option>Solteiro(a)</option>
                    <option>Divorciado(a)</option>
                    <option>Viúvo(a)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Tem Filhos?</label>
                  <select value={form.hasChildren ? 'sim' : 'nao'} onChange={e => setForm({...form, hasChildren: e.target.value === 'sim'})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none appearance-none">
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all mt-4">Próximo</button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800">Sua Fé</h2>
            <p className="text-slate-400 text-sm">Informações sobre sua vida cristã</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Denominação</label>
                <select value={form.denomination} onChange={e => setForm({...form, denomination: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none appearance-none">
                  <option value="">Selecione</option>
                  <option>Batista</option>
                  <option>Assembleia de Deus</option>
                  <option>Presbiteriana</option>
                  <option>Metodista</option>
                  <option>Quadrangular</option>
                  <option>Adventista</option>
                  <option>Católica</option>
                  <option>Universal</option>
                  <option>Sara Nossa Terra</option>
                  <option>Bola de Neve</option>
                  <option>Congregação Cristã do Brasil</option>
                  <option>Outra</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome da Sua Igreja</label>
                <input type="text" value={form.churchName} onChange={e => setForm({...form, churchName: e.target.value})} placeholder="Ex: Batista Central da Lagoinha" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Função na Igreja</label>
                <select value={form.churchRole} onChange={e => setForm({...form, churchRole: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none appearance-none">
                  <option value="">Selecione</option>
                  <option>Membro</option>
                  <option>Líder de Louvor</option>
                  <option>Diácono(a)</option>
                  <option>Professor(a) EBD</option>
                  <option>Músico(a)</option>
                  <option>Obreiro(a)</option>
                  <option>Pastor(a)</option>
                  <option>Missionário(a)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua Cidade</label>
                <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Ex: São Paulo, SP" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
            </div>
            <button onClick={() => setStep(3)} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all mt-4">Próximo</button>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800">Sobre Você</h2>
            <p className="text-slate-400 text-sm">Conte mais sobre sua história</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua Bio</label>
                <textarea rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="Fale um pouco sobre você..." className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua História com Jesus</label>
                <textarea rows={4} value={form.faithJourney} onChange={e => setForm({...form, faithJourney: e.target.value})} placeholder="Conte como Jesus transformou sua vida..." className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
              </div>
              
              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-amber-700 text-xs font-medium leading-relaxed">
                  <strong>Ao criar sua conta, você concorda</strong> com nossos Termos de Uso e Política de Privacidade. Seus dados são protegidos e nunca serão compartilhados.
                </p>
              </div>
            </div>
            <button onClick={onRegister} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all mt-4">
              Criar Minha Conta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ===================== APP PRINCIPAL =====================
const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<'welcome' | 'login' | 'register' | 'app'>('welcome');
  const [state, setState] = useState(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'swipe' | 'chat' | 'profile' | 'admin' | 'favorites' | 'community' | 'prayer'>('swipe');
  const [activeChat, setActiveChat] = useState<Match | null>(null);
  const [matchModal, setMatchModal] = useState<Profile | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(state.currentUser);
  
  // Denúncia
  const [showReport, setShowReport] = useState(false);
  const [reportTarget, setReportTarget] = useState<Profile | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSent, setReportSent] = useState(false);
  
  // GPS
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'granted' | 'denied'>('idle');
  
  // Configurações
  const [showSettings, setShowSettings] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Igrejas
  const [showChurches, setShowChurches] = useState(false);

  // Onboarding
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboarding_done'));

  // Verificação de Identidade
  const [showVerification, setShowVerification] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'none'|'pending'|'verified'|'rejected'>('none');

  // Stories
  const [stories, setStories] = useState<any[]>([]);

  // Events
  const [showEvents, setShowEvents] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  // Forgot Password
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Icebreakers
  const [showIcebreakers, setShowIcebreakers] = useState(false);

  // Novas funcionalidades
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDevotional, setShowDevotional] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<{name: string; photo: string} | null>(null);

  // Funcionalidades v3
  const [showVideoVerification, setShowVideoVerification] = useState(false);
  const [videoVerificationStatus, setVideoVerificationStatus] = useState<'none'|'pending'|'verified'|'rejected'>('none');
  const [showAudioVideoCall, setShowAudioVideoCall] = useState(false);
  const [callType, setCallType] = useState<'audio'|'video'>('audio');
  const [showSafeMode, setShowSafeMode] = useState(false);
  const [showBiblePlan, setShowBiblePlan] = useState(false);
  const [showChurchMap, setShowChurchMap] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Funcionalidades v5
  const [showReels, setShowReels] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceMessages, setVoiceMessages] = useState<{[chatId: string]: {duration: number; waveform: number[]; isSent: boolean}[]}>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showBlockReport, setShowBlockReport] = useState(false);
  const [blockReportTarget, setBlockReportTarget] = useState<{name: string; photo: string} | null>(null);
  const [showShareProfile, setShowShareProfile] = useState(false);
  const [shareTarget, setShareTarget] = useState<{name: string; photo: string; age: number; church: string} | null>(null);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [userPhotos, setUserPhotos] = useState<string[]>([]);

  // Funcionalidades v6
  const [showStoriesCamera, setShowStoriesCamera] = useState(false);
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [profileDetailTarget, setProfileDetailTarget] = useState<any>(null);
  const [showInviteSystem, setShowInviteSystem] = useState(false);
  const [showOnboardingComplete, setShowOnboardingComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<EnhancedMessage[]>([]);

  // ===== ADMIN GERAL =====
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('is_admin') === 'true');

  // ===== TRIAL + PAYWALL =====
  const [trialStartDate] = useState<string | null>(localStorage.getItem('trial_start'));
  const [isPaid, setIsPaid] = useState(localStorage.getItem('subscription_active') === 'true');

  // Calcular dias restantes do trial
  const getTrialDaysLeft = (): number => {
    const start = localStorage.getItem('trial_start');
    if (!start) return 7;
    const startDate = new Date(start);
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(0, 7 - diffDays);
  };

  const trialDaysLeft = getTrialDaysLeft();
  const isTrialExpired = trialDaysLeft <= 0 && !isPaid && !isAdmin;
  const isVerified = verificationStatus === 'verified' || localStorage.getItem('identity_verified') === 'true' || isAdmin;

  // Login handler
  const handleLogin = (email: string, password: string) => {
    // Admin geral - bypass total
    if (email === 'contato@lirolla.com' && password === 'Pagotto24') {
      localStorage.setItem('is_admin', 'true');
      localStorage.setItem('identity_verified', 'true');
      setIsAdmin(true);
      setVerificationStatus('verified');
      setState(prev => ({
        ...prev,
        currentUser: { ...prev.currentUser, name: 'Admin', role: UserRole.ADMIN }
      }));
      setScreen('app');
      setActiveTab('swipe');
      return;
    }
    // Login normal
    setScreen('app');
  };

  // Quando verificação é aprovada, iniciar trial
  useEffect(() => {
    if (verificationStatus === 'verified') {
      localStorage.setItem('identity_verified', 'true');
      if (!localStorage.getItem('trial_start')) {
        localStorage.setItem('trial_start', new Date().toISOString());
      }
    }
  }, [verificationStatus]);

  // Carregar status de verificação do localStorage
  useEffect(() => {
    const savedVerification = localStorage.getItem('identity_verified');
    if (savedVerification === 'true') {
      setVerificationStatus('verified');
    }
    // Restaurar sessão admin
    if (localStorage.getItem('is_admin') === 'true') {
      setIsAdmin(true);
      setVerificationStatus('verified');
      setState(prev => ({
        ...prev,
        currentUser: { ...prev.currentUser, name: 'Admin', role: UserRole.ADMIN }
      }));
    }
  }, []);

  // Persistir dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // GPS - Pegar localização automaticamente
  const requestLocation = () => {
    setLocationStatus('loading');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(loc);
          setLocationStatus('granted');
          setState(prev => ({
            ...prev,
            currentUser: { ...prev.currentUser, coordinates: loc }
          }));
        },
        () => {
          setLocationStatus('denied');
          // Se negou, tenta de novo em 30 segundos
          setTimeout(() => requestLocation(), 30000);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationStatus('denied');
    }
  };

  // Pegar localização automaticamente ao abrir o app
  useEffect(() => {
    requestLocation();
    // Atualizar localização a cada 5 minutos
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLocation(loc);
            setLocationStatus('granted');
            setState(prev => ({
              ...prev,
              currentUser: { ...prev.currentUser, coordinates: loc }
            }));
          },
          () => {},
          { enableHighAccuracy: true }
        );
      }
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // Cálculo de distância
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const filteredAndSortedProfiles = useMemo(() => {
    return state.profiles
      .filter(p => {
        if (state.swipedLeft.includes(p.id) || state.swipedRight.includes(p.id)) return false;
        const distance = p.coordinates && state.currentUser.coordinates ? calculateDistance(
          state.currentUser.coordinates.lat, state.currentUser.coordinates.lng,
          p.coordinates.lat, p.coordinates.lng
        ) : 999;
        if (distance > state.filters.maxDistance) return false;
        if (p.age < state.filters.minAge || p.age > state.filters.maxAge) return false;
        if (state.filters.preferredHeight && p.physical?.height && p.physical.height < state.filters.preferredHeight) return false;
        if (state.filters.preferredHairColor && p.physical?.hairColor !== state.filters.preferredHairColor) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.churchName === state.currentUser.churchName) return -1;
        if (b.churchName === state.currentUser.churchName) return 1;
        const distA = a.coordinates && state.currentUser.coordinates ? calculateDistance(state.currentUser.coordinates.lat, state.currentUser.coordinates.lng, a.coordinates.lat, a.coordinates.lng) : 999;
        const distB = b.coordinates && state.currentUser.coordinates ? calculateDistance(state.currentUser.coordinates.lat, state.currentUser.coordinates.lng, b.coordinates.lat, b.coordinates.lng) : 999;
        return distA - distB;
      });
  }, [state.profiles, state.swipedLeft, state.swipedRight, state.filters, state.currentUser]);

  const currentProfile = filteredAndSortedProfiles[0];

  const handleSwipeRight = async (profileId: string) => {
    setState(prev => ({ ...prev, swipedRight: [...prev.swipedRight, profileId] }));
    if (Math.random() > 0.6) {
      const profile = state.profiles.find(p => p.id === profileId);
      if (profile) {
        const newMatch: Match = { id: `match-${Date.now()}`, users: [state.currentUser.id, profileId], messages: [], lastInteraction: Date.now() };
        setState(prev => ({ ...prev, matches: [newMatch, ...prev.matches] }));
        setMatchModal(profile);
      }
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    const msg: Message = { id: `msg-${Date.now()}`, senderId: state.currentUser.id, text: newMessage, timestamp: Date.now() };
    setState(prev => ({
      ...prev,
      matches: prev.matches.map(m => m.id === activeChat.id ? { ...m, messages: [...m.messages, msg], lastInteraction: Date.now() } : m)
    }));
    setActiveChat(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
    setNewMessage('');
  };

  const handleReport = () => {
    if (!reportReason) return;
    setReportSent(true);
    setTimeout(() => {
      setShowReport(false);
      setReportSent(false);
      setReportReason('');
      setReportDescription('');
      setReportTarget(null);
    }, 2000);
  };

  // ===================== TELAS DE ENTRADA =====================
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;
  if (showOnboarding) return <Onboarding onComplete={() => { setShowOnboarding(false); localStorage.setItem('onboarding_done', 'true'); }} />;
  if (showForgotPassword) return <ForgotPassword onSubmit={(email) => { alert('Email de recuperação enviado para ' + email); setShowForgotPassword(false); }} onBack={() => setShowForgotPassword(false)} />;
  if (screen === 'welcome') return <WelcomeScreen onLogin={() => setScreen('login')} onRegister={() => setScreen('register')} />;
  if (screen === 'login') return <LoginScreen onLogin={handleLogin} onBack={() => setScreen('welcome')} onForgotPassword={() => setShowForgotPassword(true)} />;
  if (screen === 'register') return <RegisterScreen onRegister={() => setScreen('app')} onBack={() => setScreen('welcome')} />;

  // ===================== TELA DE VERIFICAÇÃO OBRIGATÓRIA =====================
  if (!isVerified && screen === 'app') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-500/30">
          <ShieldCheck size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">Verificação Obrigatória</h1>
        <p className="text-slate-400 text-lg mb-3">Para sua segurança e de todos os membros, precisamos verificar sua identidade antes de continuar.</p>
        <p className="text-slate-500 text-sm mb-10">Tire uma selfie segurando seu documento (RG ou CNH). Nossa equipe analisa em até 24h.</p>
        
        {verificationStatus === 'none' && (
          <button onClick={() => setShowVerification(true)} className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all">
            <ShieldCheck size={22} className="inline mr-3" />Verificar Minha Identidade
          </button>
        )}
        {verificationStatus === 'pending' && (
          <div className="w-full py-5 bg-yellow-500/20 text-yellow-400 font-bold text-lg rounded-2xl border border-yellow-500/30">
            <Clock size={22} className="inline mr-3" />Verificação em Análise...
            <p className="text-yellow-500/70 text-sm font-normal mt-2">Você será notificado quando for aprovado</p>
          </div>
        )}
        {verificationStatus === 'rejected' && (
          <div>
            <div className="w-full py-4 bg-red-500/20 text-red-400 font-bold rounded-2xl border border-red-500/30 mb-4">
              Verificação recusada. Tente novamente.
            </div>
            <button onClick={() => { setVerificationStatus('none'); setShowVerification(true); }} className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-2xl shadow-xl active:scale-95 transition-all">
              Tentar Novamente
            </button>
          </div>
        )}

        <button onClick={() => setScreen('welcome')} className="mt-6 text-slate-500 hover:text-slate-400 transition-colors text-sm">
          <ArrowLeft size={16} className="inline mr-2" />Voltar
        </button>
      </div>

      {showVerification && (
        <IdentityVerification 
          onClose={() => setShowVerification(false)} 
          onSubmit={(file) => { 
            setVerificationStatus('pending'); 
            setShowVerification(false);
            // Simular aprovação automática após 3 segundos (remover quando tiver backend)
            setTimeout(() => {
              setVerificationStatus('verified');
              localStorage.setItem('identity_verified', 'true');
              if (!localStorage.getItem('trial_start')) {
                localStorage.setItem('trial_start', new Date().toISOString());
              }
            }, 3000);
          }} 
          status={verificationStatus}
        />
      )}
    </div>
  );

  // ===================== TELA DE PAYWALL (TRIAL EXPIRADO) =====================
  if (isTrialExpired && screen === 'app') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-500/30">
          <Crown size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">Seu período grátis acabou</h1>
        <p className="text-slate-400 text-lg mb-8">Seus 7 dias de teste terminaram. Assine o Conexão Divina Premium para continuar encontrando seu par na fé.</p>
        
        <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700 mb-8">
          <div className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Premium Mensal</div>
          <div className="text-5xl font-black text-white mb-2">R$ 29,90</div>
          <div className="text-slate-500 mb-6">/mês • cancele quando quiser</div>
          
          <div className="space-y-3 text-left mb-8">
            {['Likes ilimitados', 'Ver quem curtiu você', 'Filtros avançados', 'Destaque no perfil', 'Chat ilimitado', 'Sem anúncios', 'Suporte prioritário'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                <span className="text-slate-300 text-sm">{f}</span>
              </div>
            ))}
          </div>

          <button 
            id="stripe-checkout-btn"
            onClick={() => {
              // Quando tiver Stripe configurado, redirecionar para checkout
              // window.location.href = 'URL_DO_STRIPE_CHECKOUT';
              alert('Pagamento via Stripe será configurado em breve. Entre em contato com o suporte.');
            }} 
            className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <CreditCard size={22} /> Assinar Agora
          </button>
        </div>

        <button onClick={() => setScreen('welcome')} className="text-slate-500 hover:text-slate-400 transition-colors text-sm">
          <ArrowLeft size={16} className="inline mr-2" />Sair
        </button>
      </div>
    </div>
  );

  // ===================== APP PRINCIPAL =====================
  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-100 transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <header className={`backdrop-blur-md px-6 py-4 flex justify-between items-center border-b sticky top-0 z-40 transition-colors duration-300 ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'}`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-200">
            <Heart size={20} fill="white" />
          </div>
          <div>
            <h1 className={`text-xl font-serif font-bold tracking-tight leading-none ${darkMode ? 'text-white' : 'text-slate-800'}`}>Conexão Divina</h1>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest mt-1">Exclusivo & Premium</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowNotifications(true)} className={`relative p-2 rounded-xl transition-all border ${darkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:text-amber-400' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-amber-600'}`}>
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">4</span>
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all border ${darkMode ? 'bg-amber-500 text-white border-amber-400' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-amber-600'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setShowAdvancedFilters(true)} className={`p-2 rounded-xl transition-all border ${darkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:text-amber-400' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-amber-600'}`}>
            <SlidersHorizontal size={20} />
          </button>
          <button onClick={() => setShowReels(true)} className={`p-2 rounded-xl transition-all border ${darkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:text-amber-400' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-amber-600'}`}>
            <Film size={20} />
          </button>
          <button onClick={() => setShowSettingsPage(true)} className={`p-2 rounded-xl transition-all border ${darkMode ? 'bg-slate-700 text-slate-300 border-slate-600 hover:text-amber-400' : 'bg-slate-50 text-slate-500 border-slate-100 hover:text-amber-600'}`}>
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Banner Trial */}
      {!isPaid && trialDaysLeft > 0 && trialDaysLeft <= 7 && isVerified && (
        <div className={`px-4 py-2.5 flex items-center justify-between text-sm ${trialDaysLeft <= 2 ? 'bg-red-500 text-white' : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'}`}>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span className="font-bold">{trialDaysLeft} {trialDaysLeft === 1 ? 'dia restante' : 'dias restantes'} do teste grátis</span>
          </div>
          <button onClick={() => setShowPremiumModal(true)} className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold hover:bg-white/30 transition-all">
            Assinar
          </button>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden pb-20">
        {/* ===================== ABA EXPLORAR ===================== */}
        {activeTab === 'swipe' && (
          <div className="h-full flex flex-col items-center p-4">
            {/* Stories */}
            <Stories stories={stories} currentUserId={state.currentUser.id} onPostStory={() => setShowStoriesCamera(true)} onViewStory={(id) => console.log('view story', id)} />

            {currentProfile ? (
              <div className="relative w-full max-w-sm">
                <SwipeCard profile={currentProfile} onSwipeRight={handleSwipeRight} onSwipeLeft={(id) => setState(p => ({ ...p, swipedLeft: [...p.swipedLeft, id] }))} />
                <button 
                  onClick={() => setState(prev => ({ ...prev, favorites: prev.favorites.includes(currentProfile.id) ? prev.favorites.filter(id => id !== currentProfile.id) : [...prev.favorites, currentProfile.id] }))}
                  className={`absolute top-4 right-4 p-4 rounded-full backdrop-blur-xl transition-all shadow-2xl z-10 ${state.favorites.includes(currentProfile.id) ? 'bg-amber-500 text-white' : 'bg-white/30 text-white border border-white/40'}`}
                >
                  <Star size={24} fill={state.favorites.includes(currentProfile.id) ? 'currentColor' : 'none'} />
                </button>
                {/* Botão Bloquear/Denunciar */}
                <button 
                  onClick={() => { setBlockReportTarget({name: currentProfile.name, photo: currentProfile.photoUrl}); setShowBlockReport(true); }}
                  className="absolute top-4 left-4 p-3 rounded-full bg-white/20 backdrop-blur-xl text-white/70 hover:text-red-400 transition-all z-10 border border-white/20"
                >
                  <Flag size={18} />
                </button>
                {/* Botão Compartilhar Perfil */}
                <button 
                  onClick={() => { setShareTarget({name: currentProfile.name, photo: currentProfile.photoUrl, age: currentProfile.age, church: currentProfile.churchName || 'Igreja Cristã'}); setShowShareProfile(true); }}
                  className="absolute top-16 left-4 p-3 rounded-full bg-white/20 backdrop-blur-xl text-white/70 hover:text-blue-400 transition-all z-10 border border-white/20"
                >
                  <Share2 size={18} />
                </button>
                {/* Botão Ver Perfil Detalhado */}
                <button 
                  onClick={() => { setProfileDetailTarget(currentProfile); setShowProfileDetail(true); }}
                  className="absolute bottom-32 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/20 backdrop-blur-xl text-white rounded-full text-xs font-bold border border-white/30 z-10 active:scale-95 transition-all"
                >
                  Ver Perfil Completo
                </button>
                {/* Badge mesma igreja */}
                {currentProfile.churchName === state.currentUser.churchName && (
                  <div className="absolute top-20 left-4 px-4 py-2 bg-emerald-500/90 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-emerald-400 z-10">
                    <Church size={12}/> Mesma Igreja
                  </div>
                )}
                {/* Badge distância */}
                {currentProfile.coordinates && state.currentUser.coordinates && (
                  <div className="absolute top-20 right-4 px-3 py-2 bg-blue-500/90 backdrop-blur-md text-white rounded-full text-[10px] font-bold flex items-center gap-1 z-10">
                    <MapPin size={12}/> {Math.round(calculateDistance(state.currentUser.coordinates.lat, state.currentUser.coordinates.lng, currentProfile.coordinates.lat, currentProfile.coordinates.lng))} km
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-[40px] shadow-2xl border border-slate-100 max-w-sm mx-auto">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                  <Sparkles size={40} className="animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Paciência é uma Virtude</h2>
                <p className="text-slate-500 mt-4 text-sm leading-relaxed">Não há mais perfis que coincidam com seus filtros.</p>
                <button onClick={() => setState(p => ({ ...p, filters: INITIAL_STATE.filters, swipedLeft: [], swipedRight: [] }))} className="mt-8 px-10 py-4 bg-amber-500 text-white rounded-2xl font-bold shadow-xl shadow-amber-200 active:scale-95 transition-all">Redefinir Filtros</button>
              </div>
            )}
          </div>
        )}

        {/* ===================== ABA FAVORITOS ===================== */}
        {activeTab === 'favorites' && (
          <div className="p-8 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Pessoas de Interesse</h2>
            {state.favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 text-center opacity-40">
                <Star size={64} className="text-slate-200 mb-6" />
                <p className="text-slate-500">Ninguém em destaque ainda.<br/>Explore perfis e use a estrela.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {state.favorites.map(id => {
                  const p = state.profiles.find(x => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={p.id} className="relative rounded-[32px] overflow-hidden shadow-lg bg-white group border border-slate-100">
                      <img src={p.imageUrl} className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                        <p className="text-white font-bold text-sm leading-tight">{p.name}, {p.age}</p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-tight mt-1">{p.churchName}</p>
                      </div>
                      <button onClick={() => setState(prev => ({ ...prev, favorites: prev.favorites.filter(fid => fid !== id) }))} className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================== ABA CHAT ===================== */}
        {activeTab === 'chat' && !activeChat && (
          <div className="p-8 animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">Conversas</h2>
            {state.matches.length === 0 ? (
              <div className="text-center py-20 opacity-30">
                <MessageSquare size={64} className="mx-auto text-slate-300 mb-6" />
                <p className="text-slate-500">Aguardando um match!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.matches.map(m => {
                  const other = state.profiles.find(p => m.users.includes(p.id));
                  return (
                    <button key={m.id} onClick={() => setActiveChat(m)} className="w-full flex items-center gap-5 p-5 bg-white rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95 text-left">
                      <div className="relative">
                        <img src={other?.imageUrl} className="w-16 h-16 rounded-3xl object-cover border-2 border-white shadow-lg" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-lg">{other?.name}</h4>
                        <p className="text-xs text-slate-400 font-medium truncate">{m.messages.length > 0 ? m.messages[m.messages.length - 1].text : 'Envie uma saudação!'}</p>
                      </div>
                      <div className="text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg uppercase">Match</div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Chat ativo */}
        {activeTab === 'chat' && activeChat && (
          <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
            {(() => {
              const other = state.profiles.find(p => activeChat.users.includes(p.id));
              return (
                <>
                  <div className="flex items-center gap-4 p-5 bg-white border-b border-slate-100">
                    <button onClick={() => setActiveChat(null)} className="p-2 text-slate-400"><ArrowLeft size={24}/></button>
                    <img src={other?.imageUrl} className="w-12 h-12 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{other?.name}</h4>
                      <p className="text-xs text-emerald-500 font-bold">Online agora</p>
                    </div>
                    <button onClick={() => { setCallType('audio'); setShowAudioVideoCall(true); }} className="p-2 text-blue-500 hover:text-blue-600" title="Chamada de Áudio">
                      <Phone size={18}/>
                    </button>
                    <button onClick={() => { setCallType('video'); setShowAudioVideoCall(true); }} className="p-2 text-purple-500 hover:text-purple-600" title="Chamada de Vídeo">
                      <Video size={18}/>
                    </button>
                    <button onClick={() => setShowSafeMode(true)} className="p-2 text-emerald-500 hover:text-emerald-600" title="Modo Seguro">
                      <Shield size={18}/>
                    </button>
                    <button onClick={() => setShowDevotional(true)} className="p-2 text-amber-500 hover:text-amber-600" title="Devocional do Casal">
                      <BookOpen size={18}/>
                    </button>
                    <button onClick={() => setShowBiblePlan(true)} className="p-2 text-indigo-500 hover:text-indigo-600" title="Plano de Leitura">
                      <Calendar size={18}/>
                    </button>
                    <button onClick={() => { setReviewTarget({ name: other?.name || '', photo: other?.imageUrl || '' }); setShowReviewModal(true); }} className="p-2 text-amber-600 hover:text-amber-700" title="Avaliar Encontro">
                      <Award size={18}/>
                    </button>
                    <button onClick={() => { setReportTarget(other || null); setShowReport(true); }} className="p-2 text-slate-300 hover:text-red-400">
                      <Flag size={18}/>  
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {activeChat.messages.length === 0 && (
                      <div>
                        <div className="text-center py-6 opacity-40">
                          <Heart size={32} className="mx-auto text-amber-300 mb-3"/>
                          <p className="text-slate-400 text-sm">Vocês deram match! Comece a conversa.</p>
                        </div>
                        <Icebreakers targetName={other?.name || 'essa pessoa'} targetChurch={other?.churchName} onSelectMessage={(text) => { setNewMessage(text); }} />
                      </div>
                    )}
                    {activeChat.messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.senderId === state.currentUser.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-5 py-3 rounded-3xl text-sm font-medium ${
                          msg.senderId === state.currentUser.id 
                            ? 'bg-amber-500 text-white rounded-br-lg' 
                            : 'bg-white text-slate-700 border border-slate-100 rounded-bl-lg'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-white border-t border-slate-100">
                    {isRecordingVoice ? (
                      <VoiceMessageRecorder
                        onSend={(duration, waveform) => {
                          const chatId = activeChat.id;
                          setVoiceMessages(prev => ({
                            ...prev,
                            [chatId]: [...(prev[chatId] || []), { duration, waveform, isSent: true }]
                          }));
                          setIsRecordingVoice(false);
                        }}
                        onCancel={() => setIsRecordingVoice(false)}
                      />
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => setIsRecordingVoice(true)} className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-amber-50 hover:text-amber-600 transition-all">
                          <Mic size={20}/>
                        </button>
                        <input 
                          type="text" 
                          value={newMessage} 
                          onChange={e => setNewMessage(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Digite sua mensagem..." 
                          className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-amber-500" 
                        />
                        <button onClick={handleSendMessage} className="p-4 bg-amber-500 text-white rounded-2xl shadow-lg active:scale-90 transition-all">
                          <Send size={20}/>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* ===================== ABA PERFIL ===================== */}
        {activeTab === 'profile' && (
          <div className="p-8 animate-fade-in max-w-lg mx-auto">
            {!isEditing ? (
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="w-40 h-40 rounded-[48px] p-1.5 bg-gradient-to-tr from-amber-200 to-amber-500 shadow-2xl">
                    <img src={state.currentUser.imageUrl} className="w-full h-full rounded-[42px] object-cover border-4 border-white" />
                  </div>
                  <button onClick={() => setIsEditing(true)} className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-4 rounded-3xl shadow-2xl hover:bg-slate-800 transition-all">
                    <Camera size={20} />
                  </button>
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-800">{state.currentUser.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100">{state.currentUser.churchRole}</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{state.currentUser.denomination}</span>
                </div>

                {/* GPS Status - pega automaticamente */}
                <div className="w-full mt-6">
                  {locationStatus === 'loading' && (
                    <div className="w-full flex items-center justify-center gap-3 py-4 bg-blue-50 text-blue-500 rounded-2xl border border-blue-100">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/> Obtendo localização...
                    </div>
                  )}
                  {locationStatus === 'granted' && (
                    <div className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-50 text-emerald-600 font-bold rounded-2xl border border-emerald-100">
                      <MapPin size={18}/> Localização ativa
                    </div>
                  )}
                  {(locationStatus === 'denied' || locationStatus === 'idle') && (
                    <div className="w-full flex items-center justify-center gap-3 py-4 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 text-sm">
                      <Navigation2 size={18}/> Obtendo localização...
                    </div>
                  )}
                </div>

                {/* Verificação de Identidade */}
                {verificationStatus === 'none' && (
                  <button onClick={() => setShowVerification(true)} className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-emerald-50 text-emerald-600 font-bold rounded-2xl border border-emerald-100 active:scale-95 transition-all">
                    <ShieldCheck size={18}/> Verificar Minha Identidade
                  </button>
                )}
                {verificationStatus === 'pending' && (
                  <div className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-yellow-50 text-yellow-600 font-bold rounded-2xl border border-yellow-100">
                    <ShieldCheck size={18}/> Verificação em Análise...
                  </div>
                )}
                {verificationStatus === 'verified' && (
                  <div className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-emerald-50 text-emerald-600 font-bold rounded-2xl border border-emerald-100">
                    <ShieldCheck size={18}/> Perfil Verificado ✓
                  </div>
                )}

                {/* Verificação por Vídeo */}
                {videoVerificationStatus === 'none' && (
                  <button onClick={() => setShowVideoVerification(true)} className="w-full mt-3 flex items-center justify-center gap-3 py-4 bg-teal-50 text-teal-600 font-bold rounded-2xl border border-teal-100 active:scale-95 transition-all">
                    <Video size={18}/> Verificação por Vídeo Selfie
                  </button>
                )}
                {videoVerificationStatus === 'pending' && (
                  <div className="w-full mt-3 flex items-center justify-center gap-3 py-4 bg-yellow-50 text-yellow-600 font-bold rounded-2xl border border-yellow-100">
                    <Video size={18}/> Vídeo em Análise...
                  </div>
                )}
                {videoVerificationStatus === 'verified' && (
                  <div className="w-full mt-3 flex items-center justify-center gap-3 py-4 bg-teal-50 text-teal-600 font-bold rounded-2xl border border-teal-100">
                    <Video size={18}/> Vídeo Verificado ✓
                  </div>
                )}

                {/* Botão Premium */}
                <button onClick={() => setShowPremiumModal(true)} className="w-full mt-4 flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all">
                  <Crown size={20}/> Seja Premium - R$ 29,90/mês
                </button>

                {/* Galeria de Fotos */}
                <div className="w-full mt-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Image size={14}/> Minhas Fotos</h3>
                  <PhotoGallery photos={userPhotos} onUpdatePhotos={setUserPhotos} editable={false} maxPhotos={9} />
                </div>

                {/* Estatísticas do Perfil */}
                <ProfileStats stats={{ views: state.currentUser.profile_views || 0, likes: state.currentUser.likes_given || 0, matches: state.matches.length, matchRate: 0, likedBy: state.currentUser.likes_received || 0 }} isPremium={state.currentUser.is_premium || false} onUpgrade={() => setShowPremiumModal(true)} />

                {/* Reputação */}
                <div className="w-full mt-4">
                  <ReputationDisplay {...SAMPLE_REPUTATION} userName={state.currentUser.name} isOwnProfile={true} />
                </div>

                {/* Eventos Cristãos e Mapa */}
                <div className="w-full mt-4 grid grid-cols-2 gap-3">
                  <button onClick={() => setShowEvents(true)} className="flex items-center justify-center gap-2 py-4 bg-purple-50 text-purple-600 font-bold rounded-2xl border border-purple-100 active:scale-95 transition-all text-sm">
                    <Calendar size={16}/> Eventos
                  </button>
                  <button onClick={() => setShowChurchMap(true)} className="flex items-center justify-center gap-2 py-4 bg-teal-50 text-teal-600 font-bold rounded-2xl border border-teal-100 active:scale-95 transition-all text-sm">
                    <MapPin size={16}/> Mapa Cristão
                  </button>
                  <button onClick={() => setShowInviteSystem(true)} className="flex items-center justify-center gap-2 py-4 bg-amber-50 text-amber-600 font-bold rounded-2xl border border-amber-100 active:scale-95 transition-all text-sm">
                    <Users size={16}/> Convidar
                  </button>
                  <button onClick={() => setShowVideoVerification(true)} className="flex items-center justify-center gap-2 py-4 bg-green-50 text-green-600 font-bold rounded-2xl border border-green-100 active:scale-95 transition-all text-sm">
                    <Video size={16}/> Verificar
                  </button>
                </div>

                <div className="w-full mt-8 grid grid-cols-1 gap-4">
                  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"><Church size={24}/></div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Minha Congregação</h4>
                      <p className="text-slate-800 font-bold">{state.currentUser.churchName}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500"><MapPin size={24}/></div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Localização</h4>
                      <p className="text-slate-800 font-bold">{state.currentUser.location}</p>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> Testemunho</h4>
                    <p className="text-slate-600 text-sm leading-relaxed italic font-medium">"{state.currentUser.faithJourney}"</p>
                  </div>
                  <button onClick={() => setIsEditing(true)} className="mt-4 w-full py-5 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all">Editar Perfil Completo</button>
                  <button onClick={() => setShowSettingsPage(true)} className="mt-3 w-full py-5 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    <Settings size={18}/> Configurações
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <button onClick={() => setIsEditing(false)} className="p-3 bg-white rounded-2xl shadow-sm text-slate-400"><ArrowLeft size={24}/></button>
                  <h2 className="text-2xl font-serif font-bold text-slate-800">Meus Dados</h2>
                  <div className="w-12 h-12"></div>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Nome</label>
                      <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Idade</label>
                      <input type="number" value={editForm.age} onChange={e => setEditForm({...editForm, age: parseInt(e.target.value)})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua Igreja</label>
                    <input type="text" value={editForm.churchName} onChange={e => setEditForm({...editForm, churchName: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Altura (cm)</label>
                      <input type="number" value={editForm.physical?.height} onChange={e => setEditForm({...editForm, physical: { ...editForm.physical, height: parseInt(e.target.value) }})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Cor do Cabelo</label>
                      <select value={editForm.physical?.hairColor} onChange={e => setEditForm({...editForm, physical: { ...editForm.physical, hairColor: e.target.value }})} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm appearance-none">
                        <option>Morena/Moreno</option>
                        <option>Loira/Loiro</option>
                        <option>Ruiva/Ruivo</option>
                        <option>Castanho</option>
                        <option>Preto</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Sua História com Jesus</label>
                    <textarea rows={4} value={editForm.faithJourney} onChange={e => setEditForm({...editForm, faithJourney: e.target.value})} className="w-full bg-white border border-slate-100 rounded-[32px] px-6 py-5 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none resize-none shadow-sm" />
                  </div>
                  <button onClick={() => { setState(p => ({...p, currentUser: editForm})); setIsEditing(false); }} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <Save size={20} /> Salvar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== ABA COMUNIDADE ===================== */}
        {activeTab === 'community' && (
          <CommunityFeed 
            currentUserId={state.currentUser.id}
            currentUserName={state.currentUser.name}
            currentUserPhoto={state.currentUser.imageUrl}
          />
        )}

        {/* ===================== ABA ORAÇÃO ===================== */}
        {activeTab === 'prayer' && (
          <PrayerMode 
            currentUserId={state.currentUser.id}
            currentUserName={state.currentUser.name}
            currentUserPhoto={state.currentUser.imageUrl}
          />
        )}

        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} role={state.currentUser.role} />

      {/* ===================== MODAL DE FILTROS ===================== */}
      {showFilter && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-[40px] p-8 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-slate-800">Busca Refinada</h3>
              <button onClick={() => setShowFilter(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 pb-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-slate-700">Raio de Distância</span>
                  <span className="text-sm text-amber-600 font-bold">{state.filters.maxDistance} km</span>
                </div>
                <input type="range" min="1" max="500" value={state.filters.maxDistance} onChange={e => setState(p => ({ ...p, filters: { ...p.filters, maxDistance: parseInt(e.target.value) } }))} className="w-full accent-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Ruler size={14}/> Preferência de Altura</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 160, 170, 180].map(h => (
                    <button key={h} onClick={() => setState(p => ({ ...p, filters: { ...p.filters, preferredHeight: h || undefined } }))}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${state.filters.preferredHeight === h ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      {h === 0 ? 'Tanto faz' : `+${h}cm`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><UserCheck size={14}/> Característica Física</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['Morena', 'Moreno', 'Loira', 'Loiro', 'Ruiva', 'Ruivo'].map(c => (
                    <button key={c} onClick={() => setState(p => ({ ...p, filters: { ...p.filters, preferredHairColor: state.filters.preferredHairColor === c ? undefined : c } }))}
                      className={`py-3 rounded-2xl text-xs font-bold transition-all border ${state.filters.preferredHairColor === c ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-slate-700">Faixa de Idade</span>
                  <span className="text-sm text-amber-600 font-bold">{state.filters.minAge} - {state.filters.maxAge}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="range" min="18" max="60" value={state.filters.minAge} onChange={e => setState(p => ({ ...p, filters: { ...p.filters, minAge: parseInt(e.target.value) } }))} className="w-full accent-amber-500" />
                  <input type="range" min="18" max="60" value={state.filters.maxAge} onChange={e => setState(p => ({ ...p, filters: { ...p.filters, maxAge: parseInt(e.target.value) } }))} className="w-full accent-amber-500" />
                </div>
              </div>
            </div>
            <button onClick={() => setShowFilter(false)} className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl mt-4 active:scale-95 transition-all">Aplicar Filtros</button>
          </div>
        </div>
      )}

      {/* ===================== MODAL DE DENÚNCIA ===================== */}
      {showReport && (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-scale-up">
            {!reportSent ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500"><Flag size={24}/></div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Denunciar Usuário</h3>
                    <p className="text-slate-400 text-xs">{reportTarget?.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Motivo da Denúncia</label>
                    <select value={reportReason} onChange={e => setReportReason(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none appearance-none">
                      <option value="">Selecione um motivo</option>
                      <option>Perfil falso / Golpe</option>
                      <option>Fotos inapropriadas</option>
                      <option>Comportamento ofensivo</option>
                      <option>Assédio ou ameaça</option>
                      <option>Spam ou propaganda</option>
                      <option>Menor de idade</option>
                      <option>Conteúdo impróprio</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Descreva o problema</label>
                    <textarea rows={3} value={reportDescription} onChange={e => setReportDescription(e.target.value)} placeholder="Conte o que aconteceu..." className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none resize-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button onClick={() => { setShowReport(false); setReportReason(''); setReportDescription(''); }} className="py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl">Cancelar</button>
                  <button onClick={handleReport} className="py-4 bg-red-500 text-white font-bold rounded-2xl active:scale-95 transition-all">Denunciar</button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                  <ShieldCheck size={32}/>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Denúncia Enviada</h3>
                <p className="text-slate-400 mt-2 text-sm">Nossa equipe vai analisar o caso. Obrigado por ajudar a manter a comunidade segura.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== MODAL PREMIUM ===================== */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-scale-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-xl"><Crown size={32}/></div>
              <h3 className="text-2xl font-serif font-bold text-slate-800">Conexão Divina Premium</h3>
              <p className="text-slate-400 mt-2">Desbloqueie todas as funcionalidades</p>
            </div>
            <div className="space-y-3 mb-8">
              {['Likes ilimitados', 'Ver quem curtiu você', 'Filtros avançados', 'Destaque no perfil', 'Sem anúncios', 'Suporte prioritário'].map(f => (
                <div key={f} className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                  <span className="text-sm font-medium text-slate-700">{f}</span>
                </div>
              ))}
            </div>
            <div className="text-center mb-6">
              <span className="text-4xl font-black text-slate-800">R$ 29,90</span>
              <span className="text-slate-400">/mês</span>
            </div>
            <button onClick={() => window.location.href = '/premium'} className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-all">
              Assinar Agora
            </button>
            <button onClick={() => setShowPremiumModal(false)} className="w-full py-4 text-slate-400 font-bold mt-2">Depois</button>
          </div>
        </div>
      )}

      {/* ===================== MODAL CONFIGURAÇÕES ===================== */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-[40px] p-8 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-slate-800">Configurações</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3"><Bell size={20} className="text-slate-400"/> <span className="font-medium text-slate-700">Notificações</span></div>
                <ChevronRight size={18} className="text-slate-300"/>
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3"><Lock size={20} className="text-slate-400"/> <span className="font-medium text-slate-700">Privacidade</span></div>
                <ChevronRight size={18} className="text-slate-300"/>
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3"><Shield size={20} className="text-slate-400"/> <span className="font-medium text-slate-700">Segurança</span></div>
                <ChevronRight size={18} className="text-slate-300"/>
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3"><BookOpen size={20} className="text-slate-400"/> <span className="font-medium text-slate-700">Termos de Uso</span></div>
                <ChevronRight size={18} className="text-slate-300"/>
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <div className="flex items-center gap-3"><Phone size={20} className="text-slate-400"/> <span className="font-medium text-slate-700">Suporte</span></div>
                <ChevronRight size={18} className="text-slate-300"/>
              </button>
              <button onClick={() => { setScreen('welcome'); setShowSettings(false); }} className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-500 font-bold rounded-2xl mt-4 hover:bg-red-100 transition-all">
                <LogOut size={20}/> Sair da Conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VERIFICAÇÃO DE IDENTIDADE ===================== */}
      {showVerification && (
        <IdentityVerification 
          onClose={() => setShowVerification(false)} 
          onSubmit={(file) => { setVerificationStatus('pending'); setShowVerification(false); }} 
          status={verificationStatus}
        />
      )}

      {/* ===================== EVENTOS CRISTÃOS ===================== */}
      {showEvents && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Eventos</h2>
            <button onClick={() => setShowEvents(false)} className="p-2 text-slate-500"><X size={24}/></button>
          </div>
          <Events events={events} onJoinEvent={(id) => alert('Inscrito no evento!')} onCreateEvent={(data) => alert('Evento criado!')} />
        </div>
      )}

      {/* ===================== NOTIFICAÇÕES ===================== */}
      {showNotifications && (
        <NotificationCenter 
          onClose={() => setShowNotifications(false)}
          onNavigate={(tab) => { setActiveTab(tab as any); setShowNotifications(false); }}
        />
      )}

      {/* ===================== DEVOCIONAL DO CASAL ===================== */}
      {showDevotional && activeChat && (() => {
        const other = state.profiles.find(p => activeChat.users.includes(p.id));
        return (
          <CoupleDevotional
            partnerName={other?.name || 'Parceiro(a)'}
            partnerPhoto={other?.imageUrl || ''}
            onClose={() => setShowDevotional(false)}
            onShareInChat={(text) => {
              const msg: Message = { id: `msg-${Date.now()}`, senderId: state.currentUser.id, text, timestamp: Date.now() };
              setState(prev => ({
                ...prev,
                matches: prev.matches.map(m => m.id === activeChat.id ? { ...m, messages: [...m.messages, msg], lastInteraction: Date.now() } : m)
              }));
              setActiveChat(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
            }}
          />
        );
      })()}

      {/* ===================== AVALIAÇÃO DE ENCONTRO ===================== */}
      {showReviewModal && reviewTarget && (
        <ReviewModal
          partnerName={reviewTarget.name}
          partnerPhoto={reviewTarget.photo}
          onClose={() => { setShowReviewModal(false); setReviewTarget(null); }}
          onSubmit={(review) => { console.log('Review submitted:', review); }}
        />
      )}

      {/* ===================== OFFLINE DETECTOR ===================== */}
      <OfflineDetector><></></OfflineDetector>

      {/* ===================== MATCH ANIMATION ELABORADA ===================== */}
      {matchModal && (
        <MatchAnimation
          currentUserPhoto={state.currentUser.imageUrl}
          matchedUserPhoto={matchModal.imageUrl}
          matchedUserName={matchModal.name}
          onStartChat={() => { setActiveTab('chat'); setMatchModal(null); setActiveChat(state.matches.find(m => m.users.includes(matchModal.id)) || null); }}
          onClose={() => setMatchModal(null)}
        />
      )}

      {/* ===================== VERIFICAÇÃO POR VÍDEO ===================== */}
      {showVideoVerification && (
        <VideoVerification
          onClose={() => setShowVideoVerification(false)}
          onSubmit={(status) => setVideoVerificationStatus(status as any)}
          currentStatus={videoVerificationStatus}
        />
      )}

      {/* ===================== CHAMADA DE ÁUDIO/VÍDEO ===================== */}
      {showAudioVideoCall && activeChat && (() => {
        const other = state.profiles.find(p => activeChat.users.includes(p.id));
        return (
          <AudioVideoChat
            partnerName={other?.name || 'Parceiro(a)'}
            partnerPhoto={other?.imageUrl || ''}
            callType={callType}
            onClose={() => setShowAudioVideoCall(false)}
          />
        );
      })()}

      {/* ===================== MODO SEGURO ===================== */}
      {showSafeMode && activeChat && (() => {
        const other = state.profiles.find(p => activeChat.users.includes(p.id));
        return (
          <SafeMode
            partnerName={other?.name || 'Parceiro(a)'}
            partnerPhoto={other?.imageUrl || ''}
            onClose={() => setShowSafeMode(false)}
          />
        );
      })()}

      {/* ===================== PLANO DE LEITURA BÍBLICA ===================== */}
      {showBiblePlan && (() => {
        const other = activeChat ? state.profiles.find(p => activeChat.users.includes(p.id)) : null;
        return (
          <BibleReadingPlan
            onClose={() => setShowBiblePlan(false)}
            partnerName={other?.name}
          />
        );
      })()}

      {/* ===================== MAPA DE IGREJAS ===================== */}
      {showChurchMap && (
        <ChurchMap onClose={() => setShowChurchMap(false)} />
      )}

      {/* ===================== REELS CRISTÃOS ===================== */}
      {showReels && (
        <ChristianReels onClose={() => setShowReels(false)} />
      )}

      {/* ===================== FILTROS AVANÇADOS ===================== */}
      {showAdvancedFilters && (
        <AdvancedFilters
          onApply={(filters) => console.log('Filters applied:', filters)}
          onClose={() => setShowAdvancedFilters(false)}
        />
      )}

      {/* ===================== BLOQUEAR/DENUNCIAR ===================== */}
      {showBlockReport && blockReportTarget && (
        <BlockReport
          userName={blockReportTarget.name}
          userPhoto={blockReportTarget.photo}
          onBlock={() => { console.log('User blocked'); setShowBlockReport(false); setBlockReportTarget(null); }}
          onReport={(reason, desc) => { console.log('Report:', reason, desc); setShowBlockReport(false); setBlockReportTarget(null); }}
          onClose={() => { setShowBlockReport(false); setBlockReportTarget(null); }}
        />
      )}

      {/* ===================== COMPARTILHAR PERFIL ===================== */}
      {showShareProfile && shareTarget && (
        <ShareProfile
          userName={shareTarget.name}
          userPhoto={shareTarget.photo}
          userAge={shareTarget.age}
          userChurch={shareTarget.church}
          onClose={() => { setShowShareProfile(false); setShareTarget(null); }}
        />
      )}

      {/* ===================== CONFIGURAÇÕES COMPLETAS ===================== */}
      {showSettingsPage && (
        <SettingsPage
          onClose={() => setShowSettingsPage(false)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onLogout={() => { setScreen('welcome'); setShowSettingsPage(false); }}
        />
      )}

      {/* ===================== STORIES CAMERA ===================== */}
      {showStoriesCamera && (
        <StoriesCamera
          onClose={() => setShowStoriesCamera(false)}
          onPost={(storyData) => { console.log('Story posted:', storyData); setShowStoriesCamera(false); }}
        />
      )}

      {/* ===================== PERFIL DETALHADO ===================== */}
      {showProfileDetail && profileDetailTarget && (
        <ProfileDetail
          profile={profileDetailTarget}
          onClose={() => { setShowProfileDetail(false); setProfileDetailTarget(null); }}
          onLike={(id) => { handleSwipeRight(id); setShowProfileDetail(false); setProfileDetailTarget(null); }}
          onSuperLike={(id) => { handleSwipeRight(id); setShowProfileDetail(false); setProfileDetailTarget(null); }}
          onMessage={(id) => { setActiveTab('chat'); setShowProfileDetail(false); setProfileDetailTarget(null); }}
          isFavorite={state.favorites.includes(profileDetailTarget.id)}
          onToggleFavorite={(id) => setState(prev => ({ ...prev, favorites: prev.favorites.includes(id) ? prev.favorites.filter(fid => fid !== id) : [...prev.favorites, id] }))}
        />
      )}

      {/* ===================== SISTEMA DE CONVITES ===================== */}
      {showInviteSystem && (
        <InviteSystem
          onClose={() => setShowInviteSystem(false)}
          userName={state.currentUser.name}
          inviteCode="DIVINA2026"
          invitesSent={12}
          invitesAccepted={8}
        />
      )}

      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scale-up { animation: scaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes scaleUp { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%;
          background: #f59e0b; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4); cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default App;
