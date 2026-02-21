import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Church, Calendar, Shield, BarChart3, Eye, Ban, Trash2, CheckCircle, XCircle, LogOut, Search, Flag, Star, MapPin, Mail, Clock } from 'lucide-react';

// ===== TIPOS =====
interface MockUser {
  id: string; name: string; email: string; age: number; gender: string;
  church: string; denomination: string; location: string; status: string;
  isPremium: boolean; createdAt: string; lastLogin: string;
  avatar: string; photos: string[];
}

interface MockSubscription {
  id: string; userId: string; userName: string; plan: string; status: string;
  amount: string; startDate: string; nextBilling: string; stripeId: string;
}

interface MockChurch {
  id: string; name: string; denomination: string; city: string; state: string;
  members: number; verified: boolean; pastor: string;
}

interface MockEvent {
  id: string; title: string; church: string; date: string; location: string;
  attendees: number; type: string;
}

interface MockReport {
  id: string; reporterName: string; reportedName: string; reportedAvatar: string;
  reason: string; description: string; date: string; status: string;
}

// ===== DADOS MOCKADOS =====
const MOCK_USERS: MockUser[] = [
  { id: '1', name: 'João Silva', email: 'joao.silva@email.com', age: 35, gender: 'Masculino', church: 'Igreja Batista Central', denomination: 'Batista', location: 'São Paulo, SP', status: 'active', isPremium: true, createdAt: '2024-01-15', lastLogin: '2024-02-21', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', photos: [] },
  { id: '2', name: 'Maria Santos', email: 'maria.santos@email.com', age: 33, gender: 'Feminino', church: 'Igreja Presbiteriana', denomination: 'Presbiteriana', location: 'Rio de Janeiro, RJ', status: 'active', isPremium: false, createdAt: '2024-01-20', lastLogin: '2024-02-21', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', photos: [] },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', age: 37, gender: 'Masculino', church: 'Assembleia de Deus', denomination: 'Assembleia de Deus', location: 'Belo Horizonte, MG', status: 'active', isPremium: true, createdAt: '2024-02-01', lastLogin: '2024-02-20', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', photos: [] },
  { id: '4', name: 'Ana Costa', email: 'ana.costa@email.com', age: 30, gender: 'Feminino', church: 'Igreja Universal', denomination: 'Universal', location: 'Curitiba, PR', status: 'blocked', isPremium: false, createdAt: '2024-02-10', lastLogin: '2024-02-15', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', photos: [] },
  { id: '5', name: 'Lucas Ferreira', email: 'lucas.ferreira@email.com', age: 29, gender: 'Masculino', church: 'Batista da Lagoinha', denomination: 'Batista', location: 'Campinas, SP', status: 'active', isPremium: true, createdAt: '2024-01-05', lastLogin: '2024-02-21', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', photos: [] },
];

const MOCK_SUBSCRIPTIONS: MockSubscription[] = [
  { id: 'sub_1', userId: '1', userName: 'João Silva', plan: 'Premium Mensal', status: 'active', amount: 'R$ 29,90', startDate: '2024-01-15', nextBilling: '2024-03-15', stripeId: 'sub_1MowQVL2' },
  { id: 'sub_2', userId: '3', userName: 'Pedro Oliveira', plan: 'Premium Mensal', status: 'active', amount: 'R$ 29,90', startDate: '2024-02-01', nextBilling: '2024-03-01', stripeId: 'sub_2NpxRWM3' },
  { id: 'sub_3', userId: '5', userName: 'Lucas Ferreira', plan: 'Premium Mensal', status: 'active', amount: 'R$ 29,90', startDate: '2024-01-05', nextBilling: '2024-03-05', stripeId: 'sub_3OqySXN4' },
  { id: 'sub_4', userId: '6', userName: 'Carla Mendes', plan: 'Premium Mensal', status: 'canceled', amount: 'R$ 29,90', startDate: '2024-01-10', nextBilling: '-', stripeId: 'sub_4PrzTYO5' },
];

const MOCK_CHURCHES: MockChurch[] = [
  { id: '1', name: 'Igreja Batista Central', denomination: 'Batista', city: 'São Paulo', state: 'SP', members: 45, verified: true, pastor: 'Pr. Roberto Lima' },
  { id: '2', name: 'Igreja Presbiteriana Renovada', denomination: 'Presbiteriana', city: 'Rio de Janeiro', state: 'RJ', members: 32, verified: true, pastor: 'Pr. André Souza' },
  { id: '3', name: 'Assembleia de Deus Vitória', denomination: 'Assembleia de Deus', city: 'Belo Horizonte', state: 'MG', members: 28, verified: false, pastor: 'Pr. Marcos Silva' },
  { id: '4', name: 'Batista da Lagoinha', denomination: 'Batista', city: 'Campinas', state: 'SP', members: 67, verified: true, pastor: 'Pr. Felipe Rocha' },
];

const MOCK_EVENTS: MockEvent[] = [
  { id: '1', title: 'Retiro de Solteiros 2024', church: 'Igreja Batista Central', date: '2024-03-15', location: 'Campos do Jordão, SP', attendees: 45, type: 'Retiro' },
  { id: '2', title: 'Culto de Jovens', church: 'Assembleia de Deus Vitória', date: '2024-02-28', location: 'Belo Horizonte, MG', attendees: 120, type: 'Culto' },
  { id: '3', title: 'Conferência de Casais', church: 'Batista da Lagoinha', date: '2024-04-10', location: 'Campinas, SP', attendees: 200, type: 'Conferência' },
];

const MOCK_REPORTS: MockReport[] = [
  { id: '1', reporterName: 'Maria Santos', reportedName: 'Carlos Fake', reportedAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', reason: 'Perfil Falso', description: 'Fotos parecem ser de outra pessoa, perfil suspeito.', date: '2024-02-20', status: 'pending' },
  { id: '2', reporterName: 'João Silva', reportedName: 'Ana Costa', reportedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', reason: 'Comportamento Inadequado', description: 'Enviou mensagens ofensivas no chat.', date: '2024-02-19', status: 'pending' },
  { id: '3', reporterName: 'Pedro Oliveira', reportedName: 'Spam Bot', reportedAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', reason: 'Spam', description: 'Enviando links suspeitos para todos os matches.', date: '2024-02-18', status: 'resolved' },
];

// ===== COMPONENTE PRINCIPAL =====
const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState(MOCK_USERS);
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) setIsAuthenticated(true);
  }, []);

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

  // ===== TELA DE LOGIN =====
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <p className="text-gray-500 text-sm mt-1">Conexão Divina</p>
          </div>
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 text-center">{loginError}</div>}
          <div className="space-y-4">
            <input type="text" placeholder="Usuário" value={loginUser} onChange={e => setLoginUser(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
            <input type="password" placeholder="Senha" value={loginPass} onChange={e => setLoginPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
            <button onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-all">
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== FILTROS DE USUÁRIOS =====
  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGender = filterGender === 'all' || u.gender === filterGender;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchGender && matchStatus;
  });

  const pendingReports = reports.filter(r => r.status === 'pending');
  const totalRevenue = MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length * 29.90;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'subscriptions', label: 'Assinaturas', icon: CreditCard },
    { id: 'churches', label: 'Igrejas', icon: Church },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'moderation', label: 'Moderação', icon: Shield },
  ];

  // ===== PAINEL PRINCIPAL =====
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-purple-200 text-sm">Conexão Divina</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30 transition-all text-sm">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex gap-1 px-4 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <tab.icon size={16} /> {tab.label}
              {tab.id === 'moderation' && pendingReports.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingReports.length}</span>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center"><Users size={20} className="text-purple-600" /></div></div>
                <p className="text-3xl font-bold text-gray-800">{users.length}</p>
                <p className="text-sm text-gray-500">Usuários Totais</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"><CreditCard size={20} className="text-green-600" /></div></div>
                <p className="text-3xl font-bold text-gray-800">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-gray-500">Assinaturas Ativas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><Church size={20} className="text-amber-600" /></div></div>
                <p className="text-3xl font-bold text-gray-800">{MOCK_CHURCHES.length}</p>
                <p className="text-sm text-gray-500">Igrejas Cadastradas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><Flag size={20} className="text-red-600" /></div></div>
                <p className="text-3xl font-bold text-gray-800">{pendingReports.length}</p>
                <p className="text-sm text-gray-500">Denúncias Pendentes</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4">Receita Mensal</h3>
                <p className="text-4xl font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length} assinantes ativos</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4">Últimas Atividades</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600"><CheckCircle size={14} className="text-green-500" /> João Silva fez upgrade para Premium</div>
                  <div className="flex items-center gap-2 text-gray-600"><Flag size={14} className="text-red-500" /> Nova denúncia de Maria Santos</div>
                  <div className="flex items-center gap-2 text-gray-600"><Users size={14} className="text-blue-500" /> 3 novos usuários hoje</div>
                  <div className="flex items-center gap-2 text-gray-600"><Church size={14} className="text-amber-500" /> Igreja Batista Central verificada</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== USUÁRIOS ===== */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar por nome, email ou cidade..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <select value={filterGender} onChange={e => setFilterGender(e.target.value)} className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="all">Todos os gêneros</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="blocked">Bloqueados</option>
              </select>
            </div>

            {filteredUsers.map(user => (
              <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{user.name}</h3>
                      {user.isPremium && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">PREMIUM</span>}
                      {user.status === 'blocked' && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">BLOQUEADO</span>}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                      <span>Idade: {user.age} anos</span>
                      <span>Gênero: {user.gender}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1"><Church size={12} /> {user.church}</span>
                      <span>Denominação: {user.denomination}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {user.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> Cadastro: {user.createdAt}</span>
                      <span>Último acesso: {user.lastLogin}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedUser(user)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-full" title="Ver detalhes"><Eye size={20} /></button>
                  <button onClick={() => setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u))}
                    className={`p-2 rounded-full ${user.status === 'blocked' ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50'}`} title={user.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}>
                    <Ban size={20} />
                  </button>
                  <button onClick={() => { if (confirm('Tem certeza que deseja excluir este usuário?')) setUsers(prev => prev.filter(u => u.id !== user.id)); }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Excluir"><Trash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== MODAL DETALHES USUÁRIO ===== */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedUser.avatar} className="w-20 h-20 rounded-2xl object-cover" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedUser.name}</h2>
                  <p className="text-gray-500 text-sm">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-1">
                    {selectedUser.isPremium && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">PREMIUM</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedUser.status === 'active' ? 'ATIVO' : 'BLOQUEADO'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 font-bold uppercase">Idade</p><p className="font-bold text-gray-800">{selectedUser.age} anos</p></div>
                <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 font-bold uppercase">Gênero</p><p className="font-bold text-gray-800">{selectedUser.gender}</p></div>
                <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 font-bold uppercase">Igreja</p><p className="font-bold text-gray-800">{selectedUser.church}</p></div>
                <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 font-bold uppercase">Denominação</p><p className="font-bold text-gray-800">{selectedUser.denomination}</p></div>
                <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 font-bold uppercase">Localização</p><p className="font-bold text-gray-800">{selectedUser.location}</p></div>
                <div className="bg-gray-50 p-4 rounded-xl"><p className="text-xs text-gray-400 font-bold uppercase">Cadastro</p><p className="font-bold text-gray-800">{selectedUser.createdAt}</p></div>
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Fotos do Usuário</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <img src={selectedUser.avatar} className="w-full aspect-square rounded-xl object-cover" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u)); setSelectedUser(null); }}
                  className={`flex-1 py-3 font-bold rounded-xl ${selectedUser.status === 'blocked' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                  {selectedUser.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                </button>
                <button onClick={() => setSelectedUser(null)} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Fechar</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== ASSINATURAS ===== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-green-600">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-gray-500">Ativas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-red-600">{MOCK_SUBSCRIPTIONS.filter(s => s.status === 'canceled').length}</p>
                <p className="text-sm text-gray-500">Canceladas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <p className="text-3xl font-bold text-purple-600">R$ {totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Receita Mensal</p>
              </div>
            </div>
            {MOCK_SUBSCRIPTIONS.map(sub => (
              <div key={sub.id} className="bg-white p-5 rounded-2xl shadow-sm border flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{sub.userName}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {sub.status === 'active' ? 'ATIVA' : 'CANCELADA'}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>Plano: {sub.plan}</span>
                    <span>Valor: {sub.amount}</span>
                    <span>Início: {sub.startDate}</span>
                    <span>Próx. cobrança: {sub.nextBilling}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Stripe ID: {sub.stripeId}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== IGREJAS ===== */}
        {activeTab === 'churches' && (
          <div className="space-y-4">
            {MOCK_CHURCHES.map(church => (
              <div key={church.id} className="bg-white p-5 rounded-2xl shadow-sm border flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{church.name}</h3>
                    {church.verified ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCircle size={12} /> VERIFICADA</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-bold">PENDENTE</span>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>Denominação: {church.denomination}</span>
                    <span>Pastor: {church.pastor}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {church.city}, {church.state}</span>
                    <span>{church.members} membros no app</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!church.verified && (
                    <button className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600">Verificar</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== EVENTOS ===== */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="bg-white p-5 rounded-2xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{event.title}</h3>
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-bold">{event.type}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Church size={12} /> {event.church}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {event.attendees} participantes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== MODERAÇÃO / DENÚNCIAS ===== */}
        {activeTab === 'moderation' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Flag size={20} className="text-red-500" /> Denúncias ({pendingReports.length} pendentes)</h2>
            {reports.map(report => (
              <div key={report.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${report.status === 'pending' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-green-500'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <img src={report.reportedAvatar} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800">Denúncia contra: {report.reportedName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${report.status === 'pending' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {report.status === 'pending' ? 'PENDENTE' : 'RESOLVIDA'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Denunciado por: <strong>{report.reporterName}</strong></p>
                      <p className="text-sm mt-1"><span className="font-bold text-red-600">Motivo:</span> {report.reason}</p>
                      <p className="text-sm text-gray-600 mt-1 italic">"{report.description}"</p>
                      <p className="text-xs text-gray-400 mt-2">Data: {report.date}</p>
                    </div>
                  </div>
                  {report.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'resolved' } : r))}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 flex items-center gap-1">
                        <Ban size={14} /> Banir
                      </button>
                      <button onClick={() => setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'resolved' } : r))}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-300 flex items-center gap-1">
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
    </div>
  );
};

export default AdminPanel;
