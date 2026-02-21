import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Garantir que a pasta de uploads existe
const uploadsDir = path.join(__dirname, '../../uploads/photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// =====================================================
// ===== DADOS EM MEMÓRIA (substituir por DB real) =====
// =====================================================

let users = [
  { id: '1', name: 'Usuário Premium', email: 'user@email.com', age: 27, denomination: 'Batista', churchName: 'Batista Memorial', churchRole: 'Membro', location: 'São Paulo, SP', status: 'active', isPremium: false, isVerified: false, isBlocked: false, createdAt: '2025-01-15', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Sarah Oliveira', email: 'sarah@email.com', age: 24, denomination: 'Batista', churchName: 'Batista da Lagoinha', churchRole: 'Líder de Louvor', location: 'São Paulo, SP', status: 'active', isPremium: true, isVerified: true, isBlocked: false, createdAt: '2025-01-20', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Gabriel Santos', email: 'gabriel@email.com', age: 28, denomination: 'Quadrangular', churchName: 'IEQ Sede', churchRole: 'Diácono', location: 'Rio de Janeiro, RJ', status: 'active', isPremium: false, isVerified: true, isBlocked: false, createdAt: '2025-02-01', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Rebeca Lima', email: 'rebeca@email.com', age: 26, denomination: 'Assembleia de Deus', churchName: 'AD Brás', churchRole: 'Professora EBD', location: 'Guarulhos, SP', status: 'active', isPremium: true, isVerified: false, isBlocked: false, createdAt: '2025-02-10', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Mateus Rocha', email: 'mateus@email.com', age: 30, denomination: 'Presbiteriana', churchName: 'IPB Pinheiros', churchRole: 'Músico', location: 'São Bernardo, SP', status: 'active', isPremium: false, isVerified: false, isBlocked: false, createdAt: '2025-02-15', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
];

let churches = [
  { id: 'ch1', name: 'Batista Memorial', denomination: 'Batista', pastor: 'Pr. João Silva', address: 'Rua das Flores, 123 - São Paulo, SP', phone: '(11) 99999-0001', email: 'contato@batistamemorial.com.br', members: 350, isVerified: true, createdAt: '2025-01-01', imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=400' },
  { id: 'ch2', name: 'Batista da Lagoinha', denomination: 'Batista', pastor: 'Pr. André Valadão', address: 'Av. Antônio Carlos, 5000 - Belo Horizonte, MG', phone: '(31) 99999-0002', email: 'contato@lagoinha.com', members: 12000, isVerified: true, createdAt: '2025-01-05', imageUrl: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&q=80&w=400' },
  { id: 'ch3', name: 'IEQ Sede', denomination: 'Quadrangular', pastor: 'Pr. Carlos Moura', address: 'Rua Vergueiro, 800 - São Paulo, SP', phone: '(11) 99999-0003', email: 'contato@ieqsede.com.br', members: 800, isVerified: true, createdAt: '2025-01-10', imageUrl: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=400' },
  { id: 'ch4', name: 'AD Brás', denomination: 'Assembleia de Deus', pastor: 'Pr. Samuel Ferreira', address: 'Rua do Brás, 500 - São Paulo, SP', phone: '(11) 99999-0004', email: 'contato@adbras.com.br', members: 5000, isVerified: false, createdAt: '2025-01-15', imageUrl: 'https://images.unsplash.com/photo-1491378630646-3440ced5f1af?auto=format&fit=crop&q=80&w=400' },
  { id: 'ch5', name: 'IPB Pinheiros', denomination: 'Presbiteriana', pastor: 'Pr. Marcos Oliveira', address: 'Rua dos Pinheiros, 200 - São Paulo, SP', phone: '(11) 99999-0005', email: 'contato@ipbpinheiros.com.br', members: 600, isVerified: false, createdAt: '2025-02-01', imageUrl: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0968?auto=format&fit=crop&q=80&w=400' },
];

let events = [
  { id: 'ev1', title: 'Retiro de Solteiros 2026', description: 'Um fim de semana especial para solteiros cristãos se conhecerem em um ambiente seguro e cheio da presença de Deus.', churchId: 'ch1', churchName: 'Batista Memorial', date: '2026-03-15', time: '08:00', endDate: '2026-03-17', location: 'Sítio Recanto da Paz - Mairiporã, SP', category: 'Retiro', maxParticipants: 80, currentParticipants: 45, price: 250, isFree: false, isActive: true, createdAt: '2025-12-01', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400' },
  { id: 'ev2', title: 'Louvor & Café - Encontro de Jovens', description: 'Uma noite de louvor, café gourmet e networking cristão. Venha conhecer pessoas incríveis!', churchId: 'ch2', churchName: 'Batista da Lagoinha', date: '2026-03-01', time: '19:00', endDate: '2026-03-01', location: 'Café Cristão - Av. Paulista, 1000', category: 'Social', maxParticipants: 50, currentParticipants: 32, price: 0, isFree: true, isActive: true, createdAt: '2026-01-10', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400' },
  { id: 'ev3', title: 'Conferência Amor & Propósito', description: 'Palestrantes renomados falam sobre relacionamentos saudáveis à luz da Bíblia.', churchId: 'ch3', churchName: 'IEQ Sede', date: '2026-04-10', time: '14:00', endDate: '2026-04-12', location: 'Centro de Convenções - São Paulo', category: 'Conferência', maxParticipants: 500, currentParticipants: 180, price: 120, isFree: false, isActive: true, createdAt: '2026-01-20', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400' },
];

let reports = [
  { id: 'rp1', reporterId: '2', reporterName: 'Sarah Oliveira', reportedUserId: '5', reportedUserName: 'Mateus Rocha', reason: 'Comportamento ofensivo', description: 'Enviou mensagens inapropriadas no chat.', status: 'pending', createdAt: '2026-02-18' },
  { id: 'rp2', reporterId: '4', reporterName: 'Rebeca Lima', reportedUserId: '3', reportedUserName: 'Gabriel Santos', reason: 'Perfil falso / Golpe', description: 'Suspeito que as fotos não são reais.', status: 'pending', createdAt: '2026-02-19' },
  { id: 'rp3', reporterId: '1', reporterName: 'Usuário Premium', reportedUserId: '5', reportedUserName: 'Mateus Rocha', reason: 'Spam ou propaganda', description: 'Está enviando links de vendas no chat.', status: 'pending', createdAt: '2026-02-20' },
];

let matches = [
  { id: 'mt1', user1Id: '1', user2Id: '2', user1Name: 'Usuário Premium', user2Name: 'Sarah Oliveira', createdAt: '2026-02-10', messagesCount: 15 },
  { id: 'mt2', user1Id: '3', user2Id: '4', user1Name: 'Gabriel Santos', user2Name: 'Rebeca Lima', createdAt: '2026-02-12', messagesCount: 8 },
];

let subscriptions = [
  { id: 'sub1', userId: '2', userName: 'Sarah Oliveira', plan: 'Premium Mensal', price: 29.90, status: 'active', startDate: '2026-01-20', endDate: '2026-02-20' },
  { id: 'sub2', userId: '4', userName: 'Rebeca Lima', plan: 'Premium Anual', price: 239.90, status: 'active', startDate: '2026-01-10', endDate: '2027-01-10' },
];

let verifications = [
  { id: 'vr1', userId: '3', userName: 'Gabriel Santos', type: 'selfie', status: 'approved', submittedAt: '2026-01-25', reviewedAt: '2026-01-26' },
  { id: 'vr2', userId: '2', userName: 'Sarah Oliveira', type: 'selfie', status: 'approved', submittedAt: '2026-01-22', reviewedAt: '2026-01-23' },
  { id: 'vr3', userId: '5', userName: 'Mateus Rocha', type: 'selfie', status: 'pending', submittedAt: '2026-02-19', reviewedAt: null },
];

// =====================================================
// ===== ADMIN LOGIN =====
// =====================================================
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'admin-token-' + Date.now(), message: 'Login realizado com sucesso' });
  } else {
    res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }
});

// =====================================================
// ===== ADMIN DASHBOARD / STATS =====
// =====================================================
app.get('/api/admin/stats', (req, res) => {
  const activeUsers = users.filter(u => !u.isBlocked).length;
  const premiumUsers = users.filter(u => u.isPremium).length;
  const verifiedUsers = users.filter(u => u.isVerified).length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const pendingVerifications = verifications.filter(v => v.status === 'pending').length;
  const totalRevenue = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0);
  
  res.json({
    totalUsers: users.length,
    activeUsers,
    premiumUsers,
    verifiedUsers,
    totalChurches: churches.length,
    verifiedChurches: churches.filter(c => c.isVerified).length,
    totalEvents: events.length,
    activeEvents: events.filter(e => e.isActive).length,
    totalMatches: matches.length,
    pendingReports,
    pendingVerifications,
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    monthlyRevenue: totalRevenue,
  });
});

// =====================================================
// ===== ADMIN USERS CRUD =====
// =====================================================
app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

app.get('/api/admin/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

app.put('/api/admin/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
  users[idx] = { ...users[idx], ...req.body };
  res.json({ message: 'Usuário atualizado', user: users[idx] });
});

app.put('/api/admin/users/:id/block', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  user.isBlocked = true;
  user.status = 'blocked';
  res.json({ message: 'Usuário bloqueado', user });
});

app.put('/api/admin/users/:id/unblock', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  user.isBlocked = false;
  user.status = 'active';
  res.json({ message: 'Usuário desbloqueado', user });
});

app.put('/api/admin/users/:id/verify', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  user.isVerified = true;
  res.json({ message: 'Usuário verificado', user });
});

app.delete('/api/admin/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
  users.splice(idx, 1);
  res.json({ message: 'Usuário excluído' });
});

// =====================================================
// ===== ADMIN CHURCHES CRUD =====
// =====================================================
app.get('/api/admin/churches', (req, res) => {
  res.json(churches);
});

app.get('/api/admin/churches/:id', (req, res) => {
  const church = churches.find(c => c.id === req.params.id);
  if (!church) return res.status(404).json({ error: 'Igreja não encontrada' });
  res.json(church);
});

app.post('/api/admin/churches', (req, res) => {
  const newChurch = {
    id: 'ch' + Date.now(),
    ...req.body,
    isVerified: false,
    createdAt: new Date().toISOString().split('T')[0],
  };
  churches.push(newChurch);
  res.status(201).json({ message: 'Igreja cadastrada com sucesso', church: newChurch });
});

app.put('/api/admin/churches/:id', (req, res) => {
  const idx = churches.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Igreja não encontrada' });
  churches[idx] = { ...churches[idx], ...req.body };
  res.json({ message: 'Igreja atualizada', church: churches[idx] });
});

app.put('/api/admin/churches/:id/verify', (req, res) => {
  const church = churches.find(c => c.id === req.params.id);
  if (!church) return res.status(404).json({ error: 'Igreja não encontrada' });
  church.isVerified = true;
  res.json({ message: 'Igreja verificada', church });
});

app.put('/api/admin/churches/:id/unverify', (req, res) => {
  const church = churches.find(c => c.id === req.params.id);
  if (!church) return res.status(404).json({ error: 'Igreja não encontrada' });
  church.isVerified = false;
  res.json({ message: 'Verificação removida', church });
});

app.delete('/api/admin/churches/:id', (req, res) => {
  const idx = churches.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Igreja não encontrada' });
  churches.splice(idx, 1);
  res.json({ message: 'Igreja excluída' });
});

// =====================================================
// ===== ADMIN EVENTS CRUD =====
// =====================================================
app.get('/api/admin/events', (req, res) => {
  res.json(events);
});

app.get('/api/admin/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
  res.json(event);
});

app.post('/api/admin/events', (req, res) => {
  const newEvent = {
    id: 'ev' + Date.now(),
    ...req.body,
    currentParticipants: 0,
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0],
  };
  events.push(newEvent);
  res.status(201).json({ message: 'Evento criado com sucesso', event: newEvent });
});

app.put('/api/admin/events/:id', (req, res) => {
  const idx = events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Evento não encontrado' });
  events[idx] = { ...events[idx], ...req.body };
  res.json({ message: 'Evento atualizado', event: events[idx] });
});

app.put('/api/admin/events/:id/toggle', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
  event.isActive = !event.isActive;
  res.json({ message: event.isActive ? 'Evento ativado' : 'Evento desativado', event });
});

app.delete('/api/admin/events/:id', (req, res) => {
  const idx = events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Evento não encontrado' });
  events.splice(idx, 1);
  res.json({ message: 'Evento excluído' });
});

// =====================================================
// ===== ADMIN REPORTS (DENÚNCIAS) =====
// =====================================================
app.get('/api/admin/reports', (req, res) => {
  res.json(reports);
});

app.put('/api/admin/reports/:id/resolve', (req, res) => {
  const report = reports.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ error: 'Denúncia não encontrada' });
  const { action } = req.body; // 'ban', 'warn', 'dismiss'
  report.status = 'resolved';
  report.resolution = action;
  if (action === 'ban') {
    const user = users.find(u => u.id === report.reportedUserId);
    if (user) { user.isBlocked = true; user.status = 'blocked'; }
  }
  res.json({ message: `Denúncia resolvida (${action})`, report });
});

app.put('/api/admin/reports/:id/dismiss', (req, res) => {
  const report = reports.find(r => r.id === req.params.id);
  if (!report) return res.status(404).json({ error: 'Denúncia não encontrada' });
  report.status = 'dismissed';
  res.json({ message: 'Denúncia descartada', report });
});

// =====================================================
// ===== ADMIN SUBSCRIPTIONS =====
// =====================================================
app.get('/api/admin/subscriptions', (req, res) => {
  res.json(subscriptions);
});

// =====================================================
// ===== ADMIN VERIFICATIONS =====
// =====================================================
app.get('/api/admin/verifications', (req, res) => {
  res.json(verifications);
});

app.put('/api/admin/verifications/:id/approve', (req, res) => {
  const v = verifications.find(x => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: 'Verificação não encontrada' });
  v.status = 'approved';
  v.reviewedAt = new Date().toISOString().split('T')[0];
  const user = users.find(u => u.id === v.userId);
  if (user) user.isVerified = true;
  res.json({ message: 'Verificação aprovada', verification: v });
});

app.put('/api/admin/verifications/:id/reject', (req, res) => {
  const v = verifications.find(x => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: 'Verificação não encontrada' });
  v.status = 'rejected';
  v.reviewedAt = new Date().toISOString().split('T')[0];
  res.json({ message: 'Verificação rejeitada', verification: v });
});

// =====================================================
// ===== ADMIN MATCHES =====
// =====================================================
app.get('/api/admin/matches', (req, res) => {
  res.json(matches);
});

// =====================================================
// ===== MODERATION (DENÚNCIA DO USUÁRIO) =====
// =====================================================
app.post('/api/moderation/report', (req, res) => {
  const { reporter_id, reported_user_id, reason, description, reporterName, reportedUserName } = req.body;
  const newReport = {
    id: 'rp' + Date.now(),
    reporterId: reporter_id,
    reporterName: reporterName || 'Anônimo',
    reportedUserId: reported_user_id,
    reportedUserName: reportedUserName || 'Desconhecido',
    reason,
    description,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
  };
  reports.push(newReport);
  res.json({ message: 'Denúncia registrada com sucesso', report: newReport });
});

// =====================================================
// ===== AUTH (REGISTRO / LOGIN) =====
// =====================================================
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, age, denomination, churchName } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }
  const newUser = {
    id: 'u' + Date.now(),
    name, email, age, denomination, churchName,
    churchRole: 'Membro',
    location: '',
    status: 'active',
    isPremium: false,
    isVerified: false,
    isBlocked: false,
    createdAt: new Date().toISOString().split('T')[0],
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
  };
  users.push(newUser);
  res.status(201).json({ message: 'Conta criada com sucesso', user: newUser, token: 'token-' + newUser.id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Email ou senha incorretos' });
  if (user.isBlocked) return res.status(403).json({ error: 'Conta bloqueada. Entre em contato com o suporte.' });
  res.json({ message: 'Login realizado', user, token: 'token-' + user.id });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'Email não encontrado' });
  res.json({ message: 'Email de recuperação enviado para ' + email });
});

// =====================================================
// ===== USERS =====
// =====================================================
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
  users[idx] = { ...users[idx], ...req.body };
  res.json({ message: 'Perfil atualizado', user: users[idx] });
});

app.put('/api/users/:id/location', (req, res) => {
  const { latitude, longitude } = req.body;
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    user.coordinates = { lat: latitude, lng: longitude };
  }
  res.json({ message: 'Localização atualizada', latitude, longitude });
});

app.get('/api/users/nearby', (req, res) => {
  res.json(users.filter(u => !u.isBlocked));
});

// =====================================================
// ===== MATCHES =====
// =====================================================
app.post('/api/matches', (req, res) => {
  const { user1Id, user2Id } = req.body;
  const existing = matches.find(m => 
    (m.user1Id === user1Id && m.user2Id === user2Id) || 
    (m.user1Id === user2Id && m.user2Id === user1Id)
  );
  if (existing) return res.json({ message: 'Match já existe', match: existing });
  
  const user1 = users.find(u => u.id === user1Id);
  const user2 = users.find(u => u.id === user2Id);
  const newMatch = {
    id: 'mt' + Date.now(),
    user1Id, user2Id,
    user1Name: user1?.name || 'Desconhecido',
    user2Name: user2?.name || 'Desconhecido',
    createdAt: new Date().toISOString().split('T')[0],
    messagesCount: 0,
  };
  matches.push(newMatch);
  res.status(201).json({ message: 'Match criado!', match: newMatch });
});

// =====================================================
// ===== MESSAGES =====
// =====================================================
app.post('/api/messages', (req, res) => {
  const { matchId, senderId, text } = req.body;
  const match = matches.find(m => m.id === matchId);
  if (match) match.messagesCount++;
  res.json({ message: 'Mensagem enviada', id: 'msg-' + Date.now() });
});

// =====================================================
// ===== EVENTS (PÚBLICO) =====
// =====================================================
app.get('/api/events', (req, res) => {
  res.json(events.filter(e => e.isActive));
});

app.post('/api/events/:id/join', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
  if (event.currentParticipants >= event.maxParticipants) {
    return res.status(400).json({ error: 'Evento lotado' });
  }
  event.currentParticipants++;
  res.json({ message: 'Inscrição realizada!', event });
});

// =====================================================
// ===== CHURCHES (PÚBLICO) =====
// =====================================================
app.get('/api/churches', (req, res) => {
  res.json(churches.filter(c => c.isVerified));
});

// =====================================================
// ===== VERIFICATION (USUÁRIO) =====
// =====================================================
app.post('/api/verification/submit', (req, res) => {
  const { userId, userName, type } = req.body;
  const newVerification = {
    id: 'vr' + Date.now(),
    userId, userName, type,
    status: 'pending',
    submittedAt: new Date().toISOString().split('T')[0],
    reviewedAt: null,
  };
  verifications.push(newVerification);
  res.json({ message: 'Verificação enviada para análise', verification: newVerification });
});

// =====================================================
// ===== STORIES =====
// =====================================================
app.post('/api/stories', (req, res) => {
  res.json({ message: 'Story publicado', id: 'story-' + Date.now() });
});

// =====================================================
// ===== UPLOAD DE FOTOS =====
// =====================================================
app.post('/api/photos/upload', (req, res) => {
  res.json({ message: 'Foto enviada', url: '/uploads/photos/default.jpg' });
});

app.delete('/api/photos/:id', (req, res) => {
  res.json({ message: 'Foto deletada' });
});

// =====================================================
// ===== PAYMENTS (STRIPE) =====
// =====================================================
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

app.post('/api/payments/create-checkout', async (req, res) => {
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe não configurado. Configure STRIPE_SECRET_KEY no .env' });
  }
  try {
    const stripe = (await import('stripe')).default(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/premium`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Erro Stripe:', error.message);
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento' });
  }
});

app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log('Webhook recebido');
  res.json({ received: true });
});

app.post('/api/payments/portal', async (req, res) => {
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe não configurado' });
  }
  try {
    const stripe = (await import('stripe')).default(STRIPE_SECRET_KEY);
    const session = await stripe.billingPortal.sessions.create({
      customer: req.body.customerId,
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/app`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar portal' });
  }
});

// =====================================================
// ===== HEALTH CHECK =====
// =====================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now(), version: '2.0.0' });
});

// =====================================================
// ===== START SERVER =====
// =====================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Conexão Divina API rodando na porta ${PORT}`);
  console.log(`📊 ${users.length} usuários | ${churches.length} igrejas | ${events.length} eventos`);
});
