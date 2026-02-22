import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Church, Calendar, Shield, BarChart3, Eye, Ban, Trash2, CheckCircle, XCircle, LogOut, Search, Flag, Star, MapPin, Mail, Clock, Plus, Edit3, TrendingUp, DollarSign, AlertTriangle, ShieldCheck, UserCheck, Image, X, Save, Phone, FileText, Activity, ArrowUpRight, ArrowDownRight, Filter, Download, RefreshCw, ChevronRight, Settings, Bell, Heart, MessageSquare, Zap } from 'lucide-react';

// ===== TIPOS =====
interface MockUser {
  id: string; name: string; email: string; age: number; gender: string;
  church: string; denomination: string; location: string; status: string;
  isPremium: boolean; createdAt: string; lastLogin: string;
  avatar: string; photos: string[]; bio: string; phone: string;
  verificationStatus: 'none' | 'pending' | 'verified' | 'rejected';
  matchCount: number; reportCount: number;
}

interface MockSubscription {
  id: string; userId: string; userName: string; plan: string; status: string;
  amount: string; startDate: string; nextBilling: string; stripeId: string;
}

interface MockChurch {
  id: string; name: string; denomination: string; city: string; state: string;
  members: number; verified: boolean; pastor: string; phone: string;
  address: string; email: string;
}

interface MockEvent {
  id: string; title: string; church: string; date: string; time: string;
  location: string; attendees: number; type: string; description: string;
  maxAttendees: number; status: string;
}

interface MockReport {
  id: string; reporterName: string; reportedName: string; reportedId: string;
  reportedAvatar: string; reason: string; description: string; date: string;
  status: string; reporterAvatar: string;
}

// ===== DADOS INICIAIS (VAZIOS) =====
const MOCK_USERS: MockUser[] = [];

const MOCK_SUBSCRIPTIONS: MockSubscription[] = [];

const initialChurches: MockChurch[] = [];

const initialEvents: MockEvent[] = [];

const MOCK_REPORTS: MockReport[] = [];

// ===== COMPONENTE PRINCIPAL =====
// Helper para carregar dados do localStorage ou usar default
const loadData = <T,>(key: string, defaultData: T): T => {
  try {
    const saved = localStorage.getItem('admin_' + key);
    return saved ? JSON.parse(saved) : defaultData;
  } catch { return defaultData; }
};

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<MockUser[]>(() => loadData('users', []));
  const [reports, setReports] = useState<MockReport[]>(() => loadData('reports', []));
  const [churches, setChurches] = useState<MockChurch[]>(() => loadData('churches', []));
  const [events, setEvents] = useState<MockEvent[]>(() => loadData('events', []));
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCleanConfirm, setShowCleanConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [churchSearch, setChurchSearch] = useState('');
  const [eventSearch, setEventSearch] = useState('');

  // Modais de criação/edição
  const [showCreateChurch, setShowCreateChurch] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [editingChurch, setEditingChurch] = useState<MockChurch | null>(null);
  const [editingEvent, setEditingEvent] = useState<MockEvent | null>(null);

  // Confirmação de ações
  const [confirmAction, setConfirmAction] = useState<{type: string; id: string; name: string} | null>(null);

  // Forms
  const [churchForm, setChurchForm] = useState({ name: '', denomination: '', city: '', state: '', pastor: '', phone: '', address: '', email: '' });
  const [eventForm, setEventForm] = useState({ title: '', church: '', date: '', time: '', location: '', type: 'Culto', description: '', maxAttendees: '100' });

  // Executar ação confirmada
  const executeConfirmedAction = () => {
    if (!confirmAction) return;
    const { type, id } = confirmAction;
    if (type === 'deleteUser') setUsers(prev => prev.filter(u => u.id !== id));
    if (type === 'blockUser') setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'blocked' } : u));
    if (type === 'unblockUser') setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' } : u));
    if (type === 'deleteChurch') setChurches(prev => prev.filter(c => c.id !== id));
    if (type === 'deleteEvent') setEvents(prev => prev.filter(e => e.id !== id));
    setConfirmAction(null);
  };

  // Salvar dados no localStorage sempre que mudam
  useEffect(() => { localStorage.setItem('admin_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('admin_reports', JSON.stringify(reports)); }, [reports]);
  useEffect(() => { localStorage.setItem('admin_churches', JSON.stringify(churches)); }, [churches]);
  useEffect(() => { localStorage.setItem('admin_events', JSON.stringify(events)); }, [events]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) setIsAuthenticated(true);
  }, []);

  // Limpar TODOS os dados (zerar para producao)
  const handleCleanAllData = () => {
    setUsers([]);
    setChurches([]);
    setEvents([]);
    setReports([]);
    localStorage.removeItem('admin_users');
    localStorage.removeItem('admin_reports');
    localStorage.removeItem('admin_churches');
    localStorage.removeItem('admin_events');
    setShowCleanConfirm(false);
  };



  const handleLogin = () => {
    if (loginUser === 'admin' && loginPass === 'admin123') {
      localStorage.setItem('admin_token', 'admin-authenticated');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  // CRUD Igrejas
  const handleSaveChurch = () => {
    if (!churchForm.name || !churchForm.denomination || !churchForm.city) return;
    if (editingChurch) {
      setChurches(prev => prev.map(c => c.id === editingChurch.id ? { ...c, ...churchForm, members: c.members, verified: c.verified } : c));
      setEditingChurch(null);
    } else {
      const newChurch: MockChurch = { id: String(Date.now()), ...churchForm, members: 0, verified: false };
      setChurches(prev => [...prev, newChurch]);
    }
    setChurchForm({ name: '', denomination: '', city: '', state: '', pastor: '', phone: '', address: '', email: '' });
    setShowCreateChurch(false);
  };

  const handleEditChurch = (church: MockChurch) => {
    setChurchForm({ name: church.name, denomination: church.denomination, city: church.city, state: church.state, pastor: church.pastor, phone: church.phone, address: church.address, email: church.email });
    setEditingChurch(church);
    setShowCreateChurch(true);
  };

  const handleDeleteChurch = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta igreja?')) {
      setChurches(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleVerifyChurch = (id: string) => {
    setChurches(prev => prev.map(c => c.id === id ? { ...c, verified: !c.verified } : c));
  };

  // CRUD Eventos
  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.location) return;
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...eventForm, maxAttendees: parseInt(eventForm.maxAttendees), attendees: e.attendees } : e));
      setEditingEvent(null);
    } else {
      const newEvent: MockEvent = { id: String(Date.now()), ...eventForm, attendees: 0, maxAttendees: parseInt(eventForm.maxAttendees), status: 'active' };
      setEvents(prev => [...prev, newEvent]);
    }
    setEventForm({ title: '', church: '', date: '', time: '', location: '', type: 'Culto', description: '', maxAttendees: '100' });
    setShowCreateEvent(false);
  };

  const handleEditEvent = (event: MockEvent) => {
    setEventForm({ title: event.title, church: event.church, date: event.date, time: event.time, location: event.location, type: event.type, description: event.description, maxAttendees: String(event.maxAttendees) });
    setEditingEvent(event);
    setShowCreateEvent(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleToggleEventStatus = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: e.status === 'active' ? 'canceled' : 'active' } : e));
  };

  // Verificação de usuário
  const handleVerifyUser = (userId: string, action: 'verified' | 'rejected') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, verificationStatus: action } : u));
  };

  // ===== TELA DE LOGIN =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-200">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-amber-600 text-sm font-bold mt-1">Conexão Divina</p>
          </div>
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 text-center font-medium">{loginError}</div>}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Usuário</label>
              <input type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Senha</label>
              <input type="password" placeholder="••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
            </div>
            <button onClick={handleLogin}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-amber-200">
              Entrar no Painel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== FILTROS =====
  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGender = filterGender === 'all' || u.gender === filterGender;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchGender && matchStatus;
  });

  const filteredChurches = churches.filter(c =>
    c.name.toLowerCase().includes(churchSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(churchSearch.toLowerCase()) ||
    c.denomination.toLowerCase().includes(churchSearch.toLowerCase())
  );

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
    e.church.toLowerCase().includes(eventSearch.toLowerCase()) ||
    e.location.toLowerCase().includes(eventSearch.toLowerCase())
  );

  const pendingReports = reports.filter(r => r.status === 'pending');
  const pendingVerifications = users.filter(u => u.verificationStatus === 'pending');
  const totalRevenue = MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length * 29.90;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const premiumUsers = users.filter(u => u.isPremium).length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users, badge: pendingVerifications.length },
    { id: 'subscriptions', label: 'Assinaturas', icon: CreditCard },
    { id: 'churches', label: 'Igrejas', icon: Church },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'moderation', label: 'Moderação', icon: Shield, badge: pendingReports.length },
  ];

  // ===== PAINEL PRINCIPAL =====
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-amber-800 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Painel Administrativo</h1>
              <p className="text-amber-300 text-xs font-bold">Conexão Divina</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
              <Bell size={18} />
              {pendingReports.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">{pendingReports.length}</span>}
            </button>

            <button onClick={handleLogout} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-all text-sm font-medium">
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex gap-1 px-4 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <tab.icon size={16} /> {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6">

        {/* ===== DASHBOARD ===== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center"><Users size={22} className="text-blue-600" /></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Total</span>
                </div>
                <p className="text-3xl font-black text-gray-800">{users.length}</p>
                <p className="text-sm text-gray-500 mt-1">Usuários Totais</p>
                <p className="text-xs text-gray-400 mt-0.5">{activeUsers} ativos</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center"><Crown size={22} className="text-amber-600" /></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Total</span>
                </div>
                <p className="text-3xl font-black text-gray-800">{premiumUsers}</p>
                <p className="text-sm text-gray-500 mt-1">Assinantes Premium</p>
                <p className="text-xs text-gray-400 mt-0.5">{users.length > 0 ? Math.round(premiumUsers/users.length*100) : 0}% dos usuários</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center"><DollarSign size={22} className="text-green-600" /></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Total</span>
                </div>
                <p className="text-3xl font-black text-gray-800">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Receita Mensal</p>
                <p className="text-xs text-gray-400 mt-0.5">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length} assinantes</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center"><AlertTriangle size={22} className="text-red-600" /></div>
                  {pendingReports.length > 0 && <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Urgente</span>}
                </div>
                <p className="text-3xl font-black text-gray-800">{pendingReports.length}</p>
                <p className="text-sm text-gray-500 mt-1">Denúncias Pendentes</p>
                <p className="text-xs text-gray-400 mt-0.5">{pendingVerifications.length} verificações pendentes</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Receita */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-500" /> Resumo Financeiro</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-sm text-gray-600">Receita Mensal</span>
                    <span className="font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="text-sm text-gray-600">Assinaturas Ativas</span>
                    <span className="font-bold text-blue-600">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                    <span className="text-sm text-gray-600">Cancelamentos</span>
                    <span className="font-bold text-red-600">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'canceled').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                    <span className="text-sm text-gray-600">Receita Anual (est.)</span>
                    <span className="font-bold text-amber-600">R$ {(totalRevenue * 12).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Zap size={18} className="text-amber-500" /> Ações Rápidas</h3>
                <div className="space-y-3">
                  <button onClick={() => { setActiveTab('moderation'); }} className="w-full flex items-center justify-between p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-all">
                    <div className="flex items-center gap-3">
                      <Flag size={18} className="text-red-500" />
                      <span className="text-sm font-medium text-gray-700">Revisar Denúncias</span>
                    </div>
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{pendingReports.length}</span>
                  </button>
                  <button onClick={() => { setActiveTab('users'); }} className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Verificar Identidades</span>
                    </div>
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{pendingVerifications.length}</span>
                  </button>
                  <button onClick={() => { setShowCreateChurch(true); setActiveTab('churches'); }} className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-all">
                    <div className="flex items-center gap-3">
                      <Church size={18} className="text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">Cadastrar Igreja</span>
                    </div>
                    <Plus size={16} className="text-amber-500" />
                  </button>
                  <button onClick={() => { setShowCreateEvent(true); setActiveTab('events'); }} className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">Criar Evento</span>
                    </div>
                    <Plus size={16} className="text-purple-500" />
                  </button>
                </div>
              </div>

              {/* Atividades Recentes */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-500" /> Atividades Recentes</h3>
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">Nenhuma atividade registrada ainda</p>
                  <p className="text-gray-300 text-xs mt-1">As atividades dos usuários aparecerão aqui</p>
                </div>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="grid lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl text-white">
                <Church size={24} className="mb-2 opacity-80" />
                <p className="text-2xl font-bold">{churches.length}</p>
                <p className="text-blue-100 text-sm">Igrejas Cadastradas</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl text-white">
                <Calendar size={24} className="mb-2 opacity-80" />
                <p className="text-2xl font-bold">{events.length}</p>
                <p className="text-purple-100 text-sm">Eventos Ativos</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-5 rounded-2xl text-white">
                <Heart size={24} className="mb-2 opacity-80" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-pink-100 text-sm">Matches Este Mês</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-2xl text-white">
                <MessageSquare size={24} className="mb-2 opacity-80" />
                <p className="text-2xl font-bold">0</p>
                <p className="text-emerald-100 text-sm">Mensagens Hoje</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== USUÁRIOS ===== */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Verificações Pendentes */}
            {pendingVerifications.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><ShieldCheck size={18} /> Verificações de Identidade Pendentes ({pendingVerifications.length})</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {pendingVerifications.map(u => (
                    <div key={u.id} className="bg-white p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleVerifyUser(u.id, 'verified')} className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600">Aprovar</button>
                        <button onClick={() => handleVerifyUser(u.id, 'rejected')} className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600">Rejeitar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar por nome, email ou cidade..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <select value={filterGender} onChange={e => setFilterGender(e.target.value)} className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                <option value="all">Todos os gêneros</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="blocked">Bloqueados</option>
              </select>
              <span className="text-sm text-gray-500 font-medium">{filteredUsers.length} usuários</span>
            </div>

            {/* Lista de Usuários */}
            {filteredUsers.map(user => (
              <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={user.avatar} className="w-14 h-14 rounded-2xl object-cover" />
                      {user.verificationStatus === 'verified' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"><CheckCircle size={12} className="text-white" /></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-800">{user.name}</h3>
                        {user.isPremium && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">PREMIUM</span>}
                        {user.status === 'blocked' && <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold">BLOQUEADO</span>}
                        {user.verificationStatus === 'pending' && <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-bold">VERIFICAÇÃO PENDENTE</span>}
                        {user.verificationStatus === 'verified' && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><ShieldCheck size={10} /> VERIFICADO</span>}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                        <span>{user.age} anos • {user.gender}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-0.5">
                        <span className="flex items-center gap-1"><Church size={11} /> {user.church}</span>
                        <span className="flex items-center gap-1"><MapPin size={11} /> {user.location}</span>
                        <span className="flex items-center gap-1"><Heart size={11} /> {user.matchCount} matches</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> Último: {user.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setSelectedUser(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl" title="Ver detalhes"><Eye size={18} /></button>
                    <button onClick={() => setConfirmAction({type: user.status === 'blocked' ? 'unblockUser' : 'blockUser', id: user.id, name: user.name})}
                      className={`p-2 rounded-xl ${user.status === 'blocked' ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'}`} title={user.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}>
                      <Ban size={18} />
                    </button>
                    <button onClick={() => setConfirmAction({type: 'deleteUser', id: user.id, name: user.name})}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl" title="Excluir"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== MODAL DETALHES USUÁRIO ===== */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {/* Header do perfil */}
              <div className="relative h-32 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-3xl">
                <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 p-2 bg-black/20 rounded-full text-white hover:bg-black/40"><X size={18} /></button>
              </div>
              <div className="px-6 pb-6 -mt-12">
                <div className="flex items-end gap-4 mb-4">
                  <img src={selectedUser.avatar} className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
                  <div className="pb-1">
                    <h2 className="text-xl font-bold text-gray-800">{selectedUser.name}</h2>
                    <p className="text-gray-500 text-sm">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-1">
                      {selectedUser.isPremium && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">PREMIUM</span>}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {selectedUser.status === 'active' ? 'ATIVO' : 'BLOQUEADO'}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        selectedUser.verificationStatus === 'verified' ? 'bg-blue-100 text-blue-700' :
                        selectedUser.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        selectedUser.verificationStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {selectedUser.verificationStatus === 'verified' ? 'VERIFICADO' :
                         selectedUser.verificationStatus === 'pending' ? 'PENDENTE' :
                         selectedUser.verificationStatus === 'rejected' ? 'REJEITADO' : 'NÃO VERIFICADO'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <p className="text-sm text-gray-600 italic">"{selectedUser.bio}"</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Idade</p><p className="font-bold text-gray-800 text-sm">{selectedUser.age} anos</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Gênero</p><p className="font-bold text-gray-800 text-sm">{selectedUser.gender}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Igreja</p><p className="font-bold text-gray-800 text-sm">{selectedUser.church}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Denominação</p><p className="font-bold text-gray-800 text-sm">{selectedUser.denomination}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Localização</p><p className="font-bold text-gray-800 text-sm">{selectedUser.location}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Telefone</p><p className="font-bold text-gray-800 text-sm">{selectedUser.phone}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Cadastro</p><p className="font-bold text-gray-800 text-sm">{selectedUser.createdAt}</p></div>
                  <div className="bg-gray-50 p-3 rounded-xl"><p className="text-[10px] text-gray-400 font-bold uppercase">Matches</p><p className="font-bold text-gray-800 text-sm">{selectedUser.matchCount}</p></div>
                </div>

                {/* Fotos do Usuário */}
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Image size={16} /> Fotos do Usuário</h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {selectedUser.photos.map((photo, i) => (
                    <img key={i} src={photo} className="w-full aspect-square rounded-xl object-cover" />
                  ))}
                </div>

                {/* Denúncias */}
                {selectedUser.reportCount > 0 && (
                  <div className="bg-red-50 p-3 rounded-xl mb-4">
                    <p className="text-sm text-red-600 font-bold flex items-center gap-2"><Flag size={14} /> {selectedUser.reportCount} denúncia(s) recebida(s)</p>
                  </div>
                )}

                {/* Ações */}
                <div className="flex gap-3">
                  {selectedUser.verificationStatus === 'pending' && (
                    <>
                      <button onClick={() => { handleVerifyUser(selectedUser.id, 'verified'); setSelectedUser(null); }}
                        className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2"><ShieldCheck size={16} /> Aprovar Verificação</button>
                      <button onClick={() => { handleVerifyUser(selectedUser.id, 'rejected'); setSelectedUser(null); }}
                        className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl text-sm">Rejeitar</button>
                    </>
                  )}
                  {selectedUser.verificationStatus !== 'pending' && (
                    <>
                      <button onClick={() => { setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u)); setSelectedUser(null); }}
                        className={`flex-1 py-3 font-bold rounded-xl text-sm ${selectedUser.status === 'blocked' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                        {selectedUser.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                      </button>
                      <button onClick={() => setSelectedUser(null)} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl text-sm">Fechar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ASSINATURAS ===== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-green-600">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-gray-500">Ativas</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-red-600">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'canceled').length}</p>
                <p className="text-sm text-gray-500">Canceladas</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-amber-600">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Receita Mensal</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-blue-600">R$ {(totalRevenue * 12).toFixed(2)}</p>
                <p className="text-sm text-gray-500">Receita Anual (est.)</p>
              </div>
            </div>
            {MOCK_SUBSCRIPTIONS.map(sub => (
              <div key={sub.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{sub.userName}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {sub.status === 'active' ? 'ATIVA' : 'CANCELADA'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                      <span>Plano: {sub.plan}</span>
                      <span className="font-bold text-green-600">{sub.amount}</span>
                      <span>Início: {sub.startDate}</span>
                      <span>Próx. cobrança: {sub.nextBilling}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Stripe ID: {sub.stripeId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== IGREJAS ===== */}
        {activeTab === 'churches' && (
          <div className="space-y-4">
            {/* Header com busca e botão */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar igrejas..." value={churchSearch} onChange={e => setChurchSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <button onClick={() => { setEditingChurch(null); setChurchForm({ name: '', denomination: '', city: '', state: '', pastor: '', phone: '', address: '', email: '' }); setShowCreateChurch(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-amber-200">
                <Plus size={18} /> Cadastrar Igreja
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border text-center">
                <p className="text-2xl font-bold text-gray-800">{churches.length}</p>
                <p className="text-xs text-gray-500">Total de Igrejas</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border text-center">
                <p className="text-2xl font-bold text-green-600">{churches.filter(c => c.verified).length}</p>
                <p className="text-xs text-gray-500">Verificadas</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border text-center">
                <p className="text-2xl font-bold text-yellow-600">{churches.filter(c => !c.verified).length}</p>
                <p className="text-xs text-gray-500">Pendentes</p>
              </div>
            </div>

            {/* Lista */}
            {filteredChurches.map(church => (
              <div key={church.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800 text-lg">{church.name}</h3>
                      {church.verified ? (
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={10} /> VERIFICADA</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-bold">PENDENTE</span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1.5"><Church size={13} /> Denominação: {church.denomination}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} /> Pastor: {church.pastor}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {church.city}, {church.state}</span>
                      <span className="flex items-center gap-1.5"><Phone size={13} /> {church.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail size={13} /> {church.email}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} /> {church.members} membros no app</span>
                    </div>
                    {church.address && <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin size={11} /> {church.address}</p>}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleVerifyChurch(church.id)}
                      className={`px-3 py-2 text-sm font-bold rounded-xl ${church.verified ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                      {church.verified ? 'Remover Verificação' : 'Verificar'}
                    </button>
                    <button onClick={() => handleEditChurch(church)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl" title="Editar"><Edit3 size={18} /></button>
                    <button onClick={() => setConfirmAction({type: 'deleteChurch', id: church.id, name: church.name})} className="p-2 text-red-600 hover:bg-red-50 rounded-xl" title="Excluir"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== MODAL CRIAR/EDITAR IGREJA ===== */}
        {showCreateChurch && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreateChurch(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">{editingChurch ? 'Editar Igreja' : 'Cadastrar Nova Igreja'}</h2>
                <button onClick={() => setShowCreateChurch(false)} className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome da Igreja *</label>
                  <input type="text" value={churchForm.name} onChange={e => setChurchForm(p => ({...p, name: e.target.value}))} placeholder="Ex: Igreja Batista Central" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Denominação *</label>
                    <select value={churchForm.denomination} onChange={e => setChurchForm(p => ({...p, denomination: e.target.value}))} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1 bg-white">
                      <option value="">Selecione</option>
                      <option>Batista</option><option>Assembleia de Deus</option><option>Presbiteriana</option>
                      <option>Metodista</option><option>Quadrangular</option><option>Adventista</option>
                      <option>Católica</option><option>Universal</option><option>Sara Nossa Terra</option>
                      <option>Bola de Neve</option><option>Congregação Cristã do Brasil</option><option>Maranata</option><option>Outra</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Pastor Responsável</label>
                    <input type="text" value={churchForm.pastor} onChange={e => setChurchForm(p => ({...p, pastor: e.target.value}))} placeholder="Pr. Nome" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cidade *</label>
                    <input type="text" value={churchForm.city} onChange={e => setChurchForm(p => ({...p, city: e.target.value}))} placeholder="São Paulo" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Estado</label>
                    <select value={churchForm.state} onChange={e => setChurchForm(p => ({...p, state: e.target.value}))} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1 bg-white">
                      <option value="">UF</option>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => <option key={uf}>{uf}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Endereço</label>
                  <input type="text" value={churchForm.address} onChange={e => setChurchForm(p => ({...p, address: e.target.value}))} placeholder="Rua, número, bairro" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Telefone</label>
                    <input type="text" value={churchForm.phone} onChange={e => setChurchForm(p => ({...p, phone: e.target.value}))} placeholder="(11) 3333-4444" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                    <input type="email" value={churchForm.email} onChange={e => setChurchForm(p => ({...p, email: e.target.value}))} placeholder="contato@igreja.com" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowCreateChurch(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancelar</button>
                <button onClick={handleSaveChurch} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 shadow-lg flex items-center justify-center gap-2">
                  <Save size={16} /> {editingChurch ? 'Salvar Alterações' : 'Cadastrar Igreja'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== EVENTOS ===== */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {/* Header com busca e botão */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar eventos..." value={eventSearch} onChange={e => setEventSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              <button onClick={() => { setEditingEvent(null); setEventForm({ title: '', church: '', date: '', time: '', location: '', type: 'Culto', description: '', maxAttendees: '100' }); setShowCreateEvent(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-amber-200">
                <Plus size={18} /> Criar Evento
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border text-center">
                <p className="text-2xl font-bold text-gray-800">{events.length}</p>
                <p className="text-xs text-gray-500">Total de Eventos</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border text-center">
                <p className="text-2xl font-bold text-green-600">{events.filter(e => e.status === 'active').length}</p>
                <p className="text-xs text-gray-500">Ativos</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border text-center">
                <p className="text-2xl font-bold text-blue-600">{events.reduce((sum, e) => sum + e.attendees, 0)}</p>
                <p className="text-xs text-gray-500">Total Participantes</p>
              </div>
            </div>

            {/* Lista */}
            {filteredEvents.map(event => (
              <div key={event.id} className={`bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all ${event.status === 'canceled' ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800 text-lg">{event.title}</h3>
                      <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{event.type}</span>
                      {event.status === 'canceled' && <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold">CANCELADO</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Church size={13} /> {event.church}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={13} /> {event.date} às {event.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {event.location}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} /> {event.attendees}/{event.maxAttendees} participantes</span>
                    </div>
                    {/* Barra de progresso */}
                    <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (event.attendees / event.maxAttendees) * 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{Math.round((event.attendees / event.maxAttendees) * 100)}% da capacidade</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleToggleEventStatus(event.id)}
                      className={`px-3 py-2 text-sm font-bold rounded-xl ${event.status === 'active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                      {event.status === 'active' ? 'Cancelar' : 'Reativar'}
                    </button>
                    <button onClick={() => handleEditEvent(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl" title="Editar"><Edit3 size={18} /></button>
                    <button onClick={() => setConfirmAction({type: 'deleteEvent', id: event.id, name: event.title})} className="p-2 text-red-600 hover:bg-red-50 rounded-xl" title="Excluir"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border">
                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Nenhum evento encontrado</p>
                <button onClick={() => setShowCreateEvent(true)} className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-xl font-bold text-sm">Criar Primeiro Evento</button>
              </div>
            )}
          </div>
        )}

        {/* ===== MODAL CRIAR/EDITAR EVENTO ===== */}
        {showCreateEvent && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreateEvent(false)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">{editingEvent ? 'Editar Evento' : 'Criar Novo Evento'}</h2>
                <button onClick={() => setShowCreateEvent(false)} className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Título do Evento *</label>
                  <input type="text" value={eventForm.title} onChange={e => setEventForm(p => ({...p, title: e.target.value}))} placeholder="Ex: Retiro de Solteiros 2026" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Descrição</label>
                  <textarea value={eventForm.description} onChange={e => setEventForm(p => ({...p, description: e.target.value}))} placeholder="Descreva o evento..." rows={3} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Igreja Organizadora</label>
                    <select value={eventForm.church} onChange={e => setEventForm(p => ({...p, church: e.target.value}))} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1 bg-white">
                      <option value="">Selecione</option>
                      {churches.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tipo</label>
                    <select value={eventForm.type} onChange={e => setEventForm(p => ({...p, type: e.target.value}))} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1 bg-white">
                      <option>Culto</option><option>Retiro</option><option>Conferência</option>
                      <option>Jantar</option><option>Estudo Bíblico</option><option>Louvor</option>
                      <option>Encontro de Solteiros</option><option>Workshop</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Data *</label>
                    <input type="date" value={eventForm.date} onChange={e => setEventForm(p => ({...p, date: e.target.value}))} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Horário</label>
                    <input type="time" value={eventForm.time} onChange={e => setEventForm(p => ({...p, time: e.target.value}))} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Local *</label>
                  <input type="text" value={eventForm.location} onChange={e => setEventForm(p => ({...p, location: e.target.value}))} placeholder="Ex: Chácara Esperança, Campos do Jordão, SP" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Capacidade Máxima</label>
                  <input type="number" value={eventForm.maxAttendees} onChange={e => setEventForm(p => ({...p, maxAttendees: e.target.value}))} placeholder="100" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none mt-1" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowCreateEvent(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancelar</button>
                <button onClick={handleSaveEvent} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:opacity-90 shadow-lg flex items-center justify-center gap-2">
                  <Save size={16} /> {editingEvent ? 'Salvar Alterações' : 'Criar Evento'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== MODERAÇÃO / DENÚNCIAS ===== */}
        {activeTab === 'moderation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Flag size={20} className="text-red-500" /> Denúncias ({pendingReports.length} pendentes)</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">{reports.filter(r => r.status === 'pending').length} Pendentes</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{reports.filter(r => r.status === 'resolved').length} Resolvidas</span>
              </div>
            </div>

            {reports.map(report => (
              <div key={report.id} className={`bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all ${report.status === 'pending' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-green-500'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex flex-col items-center gap-1">
                      <img src={report.reportedAvatar} className="w-14 h-14 rounded-2xl object-cover" />
                      <span className="text-[10px] text-gray-400 font-bold">DENUNCIADO</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-800">Denúncia contra: {report.reportedName}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${report.status === 'pending' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {report.status === 'pending' ? 'PENDENTE' : 'RESOLVIDA'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img src={report.reporterAvatar} className="w-6 h-6 rounded-full object-cover" />
                        <p className="text-sm text-gray-500">Denunciado por: <strong className="text-gray-700">{report.reporterName}</strong></p>
                      </div>
                      <div className="mt-3 p-3 bg-red-50 rounded-xl">
                        <p className="text-sm"><span className="font-bold text-red-600">Motivo:</span> {report.reason}</p>
                        <p className="text-sm text-gray-600 mt-1 italic">"{report.description}"</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock size={12} /> {report.date}</p>
                    </div>
                  </div>
                  {report.status === 'pending' && (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => { setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'resolved' } : r)); setUsers(prev => prev.map(u => u.id === report.reportedId ? { ...u, status: 'blocked' } : u)); }}
                        className="px-4 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 flex items-center gap-1.5 whitespace-nowrap">
                        <Ban size={14} /> Banir Usuário
                      </button>
                      <button onClick={() => setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'resolved' } : r))}
                        className="px-4 py-2.5 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-xl hover:bg-yellow-200 flex items-center gap-1.5 whitespace-nowrap">
                        <AlertTriangle size={14} /> Advertir
                      </button>
                      <button onClick={() => setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'resolved' } : r))}
                        className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 flex items-center gap-1.5 whitespace-nowrap">
                        <XCircle size={14} /> Descartar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Modal Confirmar Acao (Excluir/Bloquear/Desbloquear) */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setConfirmAction(null)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                confirmAction.type.includes('delete') ? 'bg-red-100' : confirmAction.type === 'blockUser' ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                {confirmAction.type.includes('delete') ? <Trash2 size={32} className="text-red-500" /> : confirmAction.type === 'blockUser' ? <Ban size={32} className="text-orange-500" /> : <CheckCircle size={32} className="text-green-500" />}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {confirmAction.type === 'deleteUser' && 'Excluir Usuario'}
                {confirmAction.type === 'blockUser' && 'Bloquear Usuario'}
                {confirmAction.type === 'unblockUser' && 'Desbloquear Usuario'}
                {confirmAction.type === 'deleteChurch' && 'Excluir Igreja'}
                {confirmAction.type === 'deleteEvent' && 'Excluir Evento'}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Tem certeza que deseja {confirmAction.type.includes('delete') ? 'excluir' : confirmAction.type === 'blockUser' ? 'bloquear' : 'desbloquear'} <strong className="text-gray-800">{confirmAction.name}</strong>?
              </p>
              {confirmAction.type.includes('delete') && <p className="text-red-500 text-xs mt-2 font-bold">Esta acao nao pode ser desfeita!</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction(null)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancelar</button>
              <button onClick={executeConfirmedAction} className={`flex-1 py-3 text-white font-bold rounded-xl flex items-center justify-center gap-2 ${
                confirmAction.type.includes('delete') ? 'bg-red-500 hover:bg-red-600' : confirmAction.type === 'blockUser' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
              }`}>
                {confirmAction.type.includes('delete') ? 'Excluir' : confirmAction.type === 'blockUser' ? 'Bloquear' : 'Desbloquear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Limpar Todos os Dados */}
      {showCleanConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCleanConfirm(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Limpar Todos os Dados</h2>
              <p className="text-gray-500 text-sm mt-2">Esta acao vai remover TODOS os dados do sistema:</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl mb-6">
              <ul className="space-y-2 text-sm text-red-700">
                <li className="flex items-center gap-2"><XCircle size={14} /> Todos os usuarios</li>
                <li className="flex items-center gap-2"><XCircle size={14} /> Todas as igrejas</li>
                <li className="flex items-center gap-2"><XCircle size={14} /> Todos os eventos</li>
                <li className="flex items-center gap-2"><XCircle size={14} /> Todas as denuncias</li>
              </ul>
              <p className="text-xs text-red-500 mt-3 font-bold">O sistema ficara zerado e pronto para uso real.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCleanConfirm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancelar</button>
              <button onClick={handleCleanAllData} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 flex items-center justify-center gap-2">
                <Trash2 size={16} /> Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};

// Crown icon component (inline since lucide might not have it)
const Crown: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
  </svg>
);

export default AdminPanel;
