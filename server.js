import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mysql from 'mysql2/promise';

// =====================================================
// ===== CONEXÃO MYSQL - HOSTINGER =====
// =====================================================
const dbConfig = {
  host: 'localhost',
  user: 'u219024948_cristo',
  password: 'Pagotto24',
  database: 'u219024948_cristo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

let pool;
try {
  pool = mysql.createPool(dbConfig);
  console.log('✅ Pool de conexão MySQL criado com sucesso');
} catch (err) {
  console.error('❌ Erro ao criar pool MySQL:', err.message);
}

// Função helper para queries
async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error('❌ Erro na query:', err.message);
    throw err;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Garantir que a pasta de uploads existe
const uploadsDir = path.join(__dirname, 'uploads/photos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir frontend estático da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// =====================================================
// ===== DADOS EM MEMÓRIA (substituir por DB real) =====
// =====================================================

let users = [];

let churches = [];

let events = [];

let reports = [];

let matches = [];

let subscriptions = [];

let verifications = [];

// =====================================================
// ===== ADMIN LOGIN =====
// =====================================================
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'contato@lirolla.com' && password === 'Pagotto24') || (username === 'admin' && password === 'admin123')) {
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
// ===== COMMUNITY FEED (INSTAGRAM CRISTÃO) =====
// =====================================================
let communityPosts = [
  { id: 'fp1', userId: '2', userName: 'Sarah Oliveira', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', userChurch: 'Batista da Lagoinha', isVerified: true, isPastorVerified: true, content: 'Que culto abençoado ontem! O louvor tocou meu coração de uma forma especial.', imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600', category: 'testemunho', likes: 47, comments: [], location: 'São Paulo, SP', createdAt: new Date().toISOString() },
  { id: 'fp2', userId: '3', userName: 'Gabriel Santos', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', userChurch: 'IEQ Sede', isVerified: true, content: 'Devocional do dia: Provérbios 3:5-6', category: 'devocional', likes: 89, comments: [], createdAt: new Date().toISOString() },
];

app.get('/api/community/posts', (req, res) => {
  const { category } = req.query;
  let filtered = communityPosts;
  if (category && category !== 'todos') filtered = filtered.filter(p => p.category === category);
  res.json(filtered);
});

app.post('/api/community/posts', (req, res) => {
  const newPost = { id: 'fp' + Date.now(), ...req.body, likes: 0, comments: [], createdAt: new Date().toISOString() };
  communityPosts.unshift(newPost);
  res.status(201).json({ message: 'Post publicado', post: newPost });
});

app.post('/api/community/posts/:id/like', (req, res) => {
  const post = communityPosts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  post.likes++;
  res.json({ message: 'Curtido', likes: post.likes });
});

app.post('/api/community/posts/:id/comment', (req, res) => {
  const post = communityPosts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  const comment = { id: 'c' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  post.comments.push(comment);
  res.json({ message: 'Comentário adicionado', comment });
});

app.delete('/api/community/posts/:id', (req, res) => {
  const idx = communityPosts.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Post não encontrado' });
  communityPosts.splice(idx, 1);
  res.json({ message: 'Post excluído' });
});

// =====================================================
// ===== PRAYER MODE (MODO ORAÇÃO) =====
// =====================================================
let prayerRequests = [
  { id: 'pr1', userId: '2', userName: 'Sarah Oliveira', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', title: 'Cura para minha mãe', description: 'Minha mãe está internada e precisa de oração.', category: 'saude', prayerCount: 34, isAnonymous: false, responses: [], createdAt: new Date().toISOString(), isUrgent: true },
  { id: 'pr2', userId: '3', userName: 'Gabriel Santos', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', title: 'Direção profissional', description: 'Preciso de sabedoria para tomar decisões na carreira.', category: 'trabalho', prayerCount: 18, isAnonymous: false, responses: [], createdAt: new Date().toISOString(), isUrgent: false },
];

app.get('/api/prayers', (req, res) => {
  const { category } = req.query;
  let filtered = prayerRequests;
  if (category && category !== 'todos') filtered = filtered.filter(p => p.category === category);
  res.json(filtered);
});

app.post('/api/prayers', (req, res) => {
  const newPrayer = { id: 'pr' + Date.now(), ...req.body, prayerCount: 0, responses: [], createdAt: new Date().toISOString() };
  prayerRequests.unshift(newPrayer);
  res.status(201).json({ message: 'Pedido de oração criado', prayer: newPrayer });
});

app.post('/api/prayers/:id/pray', (req, res) => {
  const prayer = prayerRequests.find(p => p.id === req.params.id);
  if (!prayer) return res.status(404).json({ error: 'Pedido não encontrado' });
  prayer.prayerCount++;
  res.json({ message: 'Oração registrada', prayerCount: prayer.prayerCount });
});

app.post('/api/prayers/:id/respond', (req, res) => {
  const prayer = prayerRequests.find(p => p.id === req.params.id);
  if (!prayer) return res.status(404).json({ error: 'Pedido não encontrado' });
  const response = { id: 'r' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  prayer.responses.push(response);
  res.json({ message: 'Resposta adicionada', response });
});

// =====================================================
// ===== DEVOTIONAL (DEVOCIONAL DO CASAL) =====
// =====================================================
const devotionals = [
  { id: 'd1', date: new Date().toISOString().split('T')[0], verse: 'Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.', reference: 'Colossenses 3:14', reflection: 'O amor é o elo perfeito que une todas as virtudes.', question: 'De que forma prática você pode demonstrar amor ao outro hoje?', prayer: 'Senhor, ensina-nos a amar como Tu nos amas.', theme: 'Amor' },
  { id: 'd2', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], verse: 'Sejam completamente humildes e dóceis, e sejam pacientes, suportando uns aos outros com amor.', reference: 'Efésios 4:2', reflection: 'A paciência é uma das maiores provas de amor.', question: 'Em que área vocês precisam exercitar mais paciência?', prayer: 'Pai, dá-nos paciência para os momentos difíceis.', theme: 'Paciência' },
];

app.get('/api/devotionals', (req, res) => {
  res.json(devotionals);
});

app.get('/api/devotionals/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const devotional = devotionals.find(d => d.date === today) || devotionals[0];
  res.json(devotional);
});

// =====================================================
// ===== REPUTATION SYSTEM =====
// =====================================================
let reviews = [
  { id: 'rv1', fromUserId: '2', toUserId: '1', rating: 5, traits: ['Respeitoso(a)', 'Gentil', 'Fé genuína'], createdAt: new Date().toISOString() },
  { id: 'rv2', fromUserId: '4', toUserId: '1', rating: 4, traits: ['Boa conversa', 'Fotos reais', 'Pontual'], createdAt: new Date().toISOString() },
];

app.get('/api/reputation/:userId', (req, res) => {
  const userReviews = reviews.filter(r => r.toUserId === req.params.userId);
  const totalReviews = userReviews.length;
  const avgRating = totalReviews > 0 ? userReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
  
  // Count traits
  const traitCounts = {};
  userReviews.forEach(r => r.traits.forEach(t => { traitCounts[t] = (traitCounts[t] || 0) + 1; }));
  const traits = Object.entries(traitCounts).map(([name, count]) => ({
    name, count, percentage: Math.round((count / totalReviews) * 100)
  })).sort((a, b) => b.count - a.count);

  res.json({ userId: req.params.userId, overallRating: avgRating, totalReviews, traits });
});

app.post('/api/reputation/review', (req, res) => {
  const newReview = { id: 'rv' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  reviews.push(newReview);
  res.status(201).json({ message: 'Avaliação enviada', review: newReview });
});

// =====================================================
// ===== NOTIFICATIONS =====
// =====================================================
let notifications = [
  { id: 'n1', userId: '1', type: 'match', title: 'Novo Match!', description: 'Você e Sarah Oliveira deram match!', read: false, createdAt: new Date().toISOString() },
  { id: 'n2', userId: '1', type: 'devotional', title: 'Devocional do Dia', description: 'Medite no versículo de hoje com seu match!', read: false, createdAt: new Date().toISOString() },
  { id: 'n3', userId: '1', type: 'prayer', title: 'Pedido de oração', description: '12 pessoas oraram pelo seu pedido.', read: false, createdAt: new Date().toISOString() },
];

app.get('/api/notifications/:userId', (req, res) => {
  const userNotifs = notifications.filter(n => n.userId === req.params.userId);
  res.json(userNotifs);
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notif = notifications.find(n => n.id === req.params.id);
  if (!notif) return res.status(404).json({ error: 'Notificação não encontrada' });
  notif.read = true;
  res.json({ message: 'Marcada como lida', notification: notif });
});

app.put('/api/notifications/:userId/read-all', (req, res) => {
  notifications.filter(n => n.userId === req.params.userId).forEach(n => n.read = true);
  res.json({ message: 'Todas marcadas como lidas' });
});

app.delete('/api/notifications/:id', (req, res) => {
  const idx = notifications.findIndex(n => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Notificação não encontrada' });
  notifications.splice(idx, 1);
  res.json({ message: 'Notificação excluída' });
});

// =====================================================
// ===== PASTOR VERIFICATION (SELO PASTOR APROVA) =====
// =====================================================
let pastorVerifications = [
  { id: 'pv1', userId: '2', userName: 'Sarah Oliveira', pastorName: 'Pr. André Valadão', churchId: 'ch2', churchName: 'Batista da Lagoinha', status: 'approved', requestedAt: '2026-01-20', reviewedAt: '2026-01-22' },
];

app.get('/api/admin/pastor-verifications', (req, res) => {
  res.json(pastorVerifications);
});

app.post('/api/pastor-verification/request', (req, res) => {
  const newRequest = { id: 'pv' + Date.now(), ...req.body, status: 'pending', requestedAt: new Date().toISOString().split('T')[0], reviewedAt: null };
  pastorVerifications.push(newRequest);
  res.status(201).json({ message: 'Solicitação de verificação pastoral enviada', verification: newRequest });
});

app.put('/api/admin/pastor-verifications/:id/approve', (req, res) => {
  const pv = pastorVerifications.find(x => x.id === req.params.id);
  if (!pv) return res.status(404).json({ error: 'Verificação não encontrada' });
  pv.status = 'approved';
  pv.reviewedAt = new Date().toISOString().split('T')[0];
  const user = users.find(u => u.id === pv.userId);
  if (user) user.isPastorVerified = true;
  res.json({ message: 'Verificação pastoral aprovada', verification: pv });
});

app.put('/api/admin/pastor-verifications/:id/reject', (req, res) => {
  const pv = pastorVerifications.find(x => x.id === req.params.id);
  if (!pv) return res.status(404).json({ error: 'Verificação não encontrada' });
  pv.status = 'rejected';
  pv.reviewedAt = new Date().toISOString().split('T')[0];
  res.json({ message: 'Verificação pastoral rejeitada', verification: pv });
});

// =====================================================
// ===== VIDEO VERIFICATION =====
// =====================================================
let videoVerifications = [];

app.post('/api/video-verification/submit', (req, res) => {
  const { userId, phrase, videoUrl } = req.body;
  const newVerification = { id: 'vv' + Date.now(), userId, phrase, videoUrl, status: 'pending', submittedAt: new Date().toISOString(), reviewedAt: null };
  videoVerifications.push(newVerification);
  res.status(201).json({ message: 'Vídeo de verificação enviado para análise', verification: newVerification });
});

app.get('/api/admin/video-verifications', (req, res) => {
  res.json(videoVerifications);
});

app.put('/api/admin/video-verifications/:id/approve', (req, res) => {
  const vv = videoVerifications.find(x => x.id === req.params.id);
  if (!vv) return res.status(404).json({ error: 'Verificação não encontrada' });
  vv.status = 'verified';
  vv.reviewedAt = new Date().toISOString();
  const user = users.find(u => u.id === vv.userId);
  if (user) user.isVideoVerified = true;
  res.json({ message: 'Vídeo verificado com sucesso', verification: vv });
});

app.put('/api/admin/video-verifications/:id/reject', (req, res) => {
  const vv = videoVerifications.find(x => x.id === req.params.id);
  if (!vv) return res.status(404).json({ error: 'Verificação não encontrada' });
  vv.status = 'rejected';
  vv.reviewedAt = new Date().toISOString();
  res.json({ message: 'Vídeo rejeitado', verification: vv });
});

// =====================================================
// ===== COMMUNITY FEED (POSTS) =====
// =====================================================
let communityPosts = [
  { id: 'cp1', userId: '2', userName: 'Sarah Oliveira', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', content: 'Que culto maravilhoso ontem! Deus está fazendo coisas incríveis na nossa igreja.', category: 'testemunho', imageUrl: null, likes: 24, comments: [], isPastorVerified: true, createdAt: new Date().toISOString() },
  { id: 'cp2', userId: '3', userName: 'Gabriel Santos', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', content: 'Salmos 23:1 - O Senhor é o meu pastor e nada me faltará. Amém!', category: 'devocional', imageUrl: null, likes: 18, comments: [], isPastorVerified: false, createdAt: new Date().toISOString() },
];

app.get('/api/community/posts', (req, res) => {
  const { category } = req.query;
  let filtered = communityPosts;
  if (category && category !== 'all') filtered = filtered.filter(p => p.category === category);
  res.json(filtered);
});

app.post('/api/community/posts', (req, res) => {
  const newPost = { id: 'cp' + Date.now(), ...req.body, likes: 0, comments: [], createdAt: new Date().toISOString() };
  communityPosts.unshift(newPost);
  res.status(201).json(newPost);
});

app.post('/api/community/posts/:id/like', (req, res) => {
  const post = communityPosts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  post.likes++;
  res.json({ likes: post.likes });
});

app.post('/api/community/posts/:id/comment', (req, res) => {
  const post = communityPosts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Post não encontrado' });
  const comment = { id: 'cc' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  post.comments.push(comment);
  res.status(201).json(comment);
});

// =====================================================
// ===== PRAYER REQUESTS =====
// =====================================================
let prayerRequests = [
  { id: 'pr1', userId: '2', userName: 'Sarah Oliveira', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', content: 'Peço oração pela saúde da minha mãe que está internada.', category: 'saude', isUrgent: true, prayerCount: 15, responses: [], createdAt: new Date().toISOString() },
  { id: 'pr2', userId: '4', userName: 'Rebeca Lima', userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', content: 'Orem por mim, estou em busca de um novo emprego.', category: 'trabalho', isUrgent: false, prayerCount: 8, responses: [], createdAt: new Date().toISOString() },
];

app.get('/api/prayers', (req, res) => {
  const { category } = req.query;
  let filtered = prayerRequests;
  if (category && category !== 'all') filtered = filtered.filter(p => p.category === category);
  res.json(filtered);
});

app.post('/api/prayers', (req, res) => {
  const newPrayer = { id: 'pr' + Date.now(), ...req.body, prayerCount: 0, responses: [], createdAt: new Date().toISOString() };
  prayerRequests.unshift(newPrayer);
  res.status(201).json(newPrayer);
});

app.post('/api/prayers/:id/pray', (req, res) => {
  const prayer = prayerRequests.find(p => p.id === req.params.id);
  if (!prayer) return res.status(404).json({ error: 'Pedido não encontrado' });
  prayer.prayerCount++;
  res.json({ prayerCount: prayer.prayerCount });
});

app.post('/api/prayers/:id/respond', (req, res) => {
  const prayer = prayerRequests.find(p => p.id === req.params.id);
  if (!prayer) return res.status(404).json({ error: 'Pedido não encontrado' });
  const response = { id: 'prr' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  prayer.responses.push(response);
  res.status(201).json(response);
});

// =====================================================
// ===== BIBLE READING PLANS =====
// =====================================================
let userReadingProgress = [];

app.get('/api/bible-plans', (req, res) => {
  res.json([
    { id: 'love21', title: '21 Dias sobre o Amor', duration: '21 dias', totalDays: 21 },
    { id: 'faith14', title: '14 Dias de Fé a Dois', duration: '14 dias', totalDays: 14 },
    { id: 'purpose7', title: '7 Dias de Propósito', duration: '7 dias', totalDays: 7 },
  ]);
});

app.get('/api/bible-plans/:planId/progress/:userId', (req, res) => {
  const progress = userReadingProgress.filter(p => p.planId === req.params.planId && p.userId === req.params.userId);
  res.json(progress);
});

app.post('/api/bible-plans/:planId/complete-day', (req, res) => {
  const { userId, day, reflection } = req.body;
  const entry = { id: 'brp' + Date.now(), planId: req.params.planId, userId, day, reflection, completedAt: new Date().toISOString() };
  userReadingProgress.push(entry);
  res.status(201).json(entry);
});

// =====================================================
// ===== CHURCH MAP =====
// =====================================================
app.get('/api/churches/nearby', (req, res) => {
  const { lat, lng, radius } = req.query;
  // Return all churches with simulated distances
  const churchesWithDistance = churches.map(c => ({
    ...c,
    distance: (Math.random() * 10 + 0.5).toFixed(1) + ' km',
    rating: (4 + Math.random()).toFixed(1),
    services: ['Domingo 9h', 'Domingo 19h', 'Quarta 19:30'],
  }));
  res.json(churchesWithDistance);
});

app.get('/api/events/nearby', (req, res) => {
  const { lat, lng, radius } = req.query;
  const eventsWithDistance = events.filter(e => e.isActive).map(e => ({
    ...e,
    distance: (Math.random() * 15 + 1).toFixed(1) + ' km',
  }));
  res.json(eventsWithDistance);
});

// =====================================================
// ===== REPUTATION / REVIEWS =====
// =====================================================
let userReviews = [];

app.get('/api/users/:userId/reputation', (req, res) => {
  const reviews = userReviews.filter(r => r.reviewedUserId === req.params.userId);
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const traits = {};
  reviews.forEach(r => { r.traits.forEach(t => { traits[t] = (traits[t] || 0) + 1; }); });
  res.json({ averageRating: avgRating, totalReviews: reviews.length, traits, reviews });
});

app.post('/api/reviews', (req, res) => {
  const newReview = { id: 'rv' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  userReviews.push(newReview);
  res.status(201).json(newReview);
});

// =====================================================
// ===== SAFE MODE =====
// =====================================================
let safeModeAlerts = [];

app.post('/api/safe-mode/activate', (req, res) => {
  const { userId, contactName, contactPhone, partnerName, meetingLocation } = req.body;
  const alert = { id: 'sm' + Date.now(), userId, contactName, contactPhone, partnerName, meetingLocation, status: 'active', activatedAt: new Date().toISOString() };
  safeModeAlerts.push(alert);
  res.status(201).json({ message: 'Modo Seguro ativado! Seu contato de confiança será notificado.', alert });
});

app.post('/api/safe-mode/emergency', (req, res) => {
  const { userId } = req.body;
  const alert = safeModeAlerts.find(a => a.userId === userId && a.status === 'active');
  if (alert) {
    alert.status = 'emergency';
    alert.emergencyAt = new Date().toISOString();
  }
  res.json({ message: 'Alerta de emergência enviado! Seu contato de confiança foi notificado.' });
});

app.post('/api/safe-mode/deactivate', (req, res) => {
  const { userId } = req.body;
  const alert = safeModeAlerts.find(a => a.userId === userId && a.status === 'active');
  if (alert) alert.status = 'deactivated';
  res.json({ message: 'Modo Seguro desativado.' });
});

// =====================================================
// ===== DEVOTIONALS =====
// =====================================================
const dailyDevotionals = [
  { verse: 'O amor é paciente, o amor é bondoso.', reference: '1 Coríntios 13:4', reflection: 'Como vocês podem praticar a paciência hoje?', prayer: 'Senhor, nos ajude a amar com paciência e bondade.' },
  { verse: 'Dois são melhores do que um, porque têm melhor recompensa pelo seu trabalho.', reference: 'Eclesiastes 4:9', reflection: 'Qual é a força de vocês como dupla?', prayer: 'Pai, abençoe esta união e nos fortaleça juntos.' },
  { verse: 'Acima de tudo, revistam-se do amor, que é o elo perfeito.', reference: 'Colossenses 3:14', reflection: 'O que significa revestir-se de amor no relacionamento?', prayer: 'Deus, que o amor seja a base de tudo entre nós.' },
];

app.get('/api/devotional/daily', (req, res) => {
  const dayIndex = new Date().getDate() % dailyDevotionals.length;
  res.json({ date: new Date().toISOString().split('T')[0], ...dailyDevotionals[dayIndex] });
});

// =====================================================
// ===== CALL SIGNALING (simplified) =====
// =====================================================
let activeCalls = [];

app.post('/api/calls/initiate', (req, res) => {
  const { callerId, receiverId, type } = req.body;
  const call = { id: 'call' + Date.now(), callerId, receiverId, type, status: 'ringing', startedAt: new Date().toISOString() };
  activeCalls.push(call);
  res.status(201).json(call);
});

app.put('/api/calls/:id/answer', (req, res) => {
  const call = activeCalls.find(c => c.id === req.params.id);
  if (!call) return res.status(404).json({ error: 'Chamada não encontrada' });
  call.status = 'active';
  call.answeredAt = new Date().toISOString();
  res.json(call);
});

app.put('/api/calls/:id/end', (req, res) => {
  const call = activeCalls.find(c => c.id === req.params.id);
  if (!call) return res.status(404).json({ error: 'Chamada não encontrada' });
  call.status = 'ended';
  call.endedAt = new Date().toISOString();
  res.json(call);
});

// =====================================================
// ===== REELS CRISTÃOS =====
// =====================================================
let reels = [
  { id: 'r1', userId: '2', userName: 'Sarah Oliveira', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', description: 'Louvor na igreja hoje! 🎵', category: 'worship', likes: 234, comments: 45, shares: 12, views: 1520, createdAt: new Date().toISOString(), pastorVerified: true },
  { id: 'r2', userId: '3', userName: 'Gabriel Santos', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', videoUrl: '', thumbnailUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', description: 'Meu testemunho de vida', category: 'testimony', likes: 567, comments: 89, shares: 34, views: 3200, createdAt: new Date().toISOString(), pastorVerified: false },
];

app.get('/api/reels', (req, res) => {
  const { category } = req.query;
  let filtered = reels;
  if (category && category !== 'all') filtered = reels.filter(r => r.category === category);
  res.json(filtered);
});

app.post('/api/reels', (req, res) => {
  const reel = { id: `r${Date.now()}`, ...req.body, likes: 0, comments: 0, shares: 0, views: 0, createdAt: new Date().toISOString() };
  reels.unshift(reel);
  res.status(201).json(reel);
});

app.put('/api/reels/:id/like', (req, res) => {
  const reel = reels.find(r => r.id === req.params.id);
  if (!reel) return res.status(404).json({ error: 'Reel não encontrado' });
  reel.likes++;
  res.json(reel);
});

app.put('/api/reels/:id/view', (req, res) => {
  const reel = reels.find(r => r.id === req.params.id);
  if (!reel) return res.status(404).json({ error: 'Reel não encontrado' });
  reel.views++;
  res.json(reel);
});

app.delete('/api/reels/:id', (req, res) => {
  reels = reels.filter(r => r.id !== req.params.id);
  res.json({ success: true });
});

// =====================================================
// ===== VOICE MESSAGES =====
// =====================================================
let voiceMessages = [];

app.post('/api/voice-messages', (req, res) => {
  const msg = { id: `vm${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
  voiceMessages.push(msg);
  res.status(201).json(msg);
});

app.get('/api/voice-messages/:chatId', (req, res) => {
  const msgs = voiceMessages.filter(m => m.chatId === req.params.chatId);
  res.json(msgs);
});

// =====================================================
// ===== PHOTO GALLERY =====
// =====================================================
let userPhotos = {};

app.get('/api/users/:id/photos', (req, res) => {
  res.json(userPhotos[req.params.id] || []);
});

app.post('/api/users/:id/photos', (req, res) => {
  const userId = req.params.id;
  if (!userPhotos[userId]) userPhotos[userId] = [];
  const photo = { id: `ph${Date.now()}`, url: req.body.url, isMain: userPhotos[userId].length === 0, uploadedAt: new Date().toISOString() };
  userPhotos[userId].push(photo);
  res.status(201).json(photo);
});

app.delete('/api/users/:id/photos/:photoId', (req, res) => {
  const userId = req.params.id;
  if (userPhotos[userId]) {
    userPhotos[userId] = userPhotos[userId].filter(p => p.id !== req.params.photoId);
  }
  res.json({ success: true });
});

app.put('/api/users/:id/photos/:photoId/main', (req, res) => {
  const userId = req.params.id;
  if (userPhotos[userId]) {
    userPhotos[userId] = userPhotos[userId].map(p => ({ ...p, isMain: p.id === req.params.photoId }));
  }
  res.json({ success: true });
});

// =====================================================
// ===== ADVANCED FILTERS =====
// =====================================================
app.post('/api/search/advanced', (req, res) => {
  const { minAge, maxAge, maxDistance, denominations, churchFrequency, verified, pastorVerified, onlineNow, relationshipGoal, interests } = req.body;
  let filtered = users.filter(u => u.status === 'active' && !u.isBlocked);
  if (minAge) filtered = filtered.filter(u => u.age >= minAge);
  if (maxAge) filtered = filtered.filter(u => u.age <= maxAge);
  if (denominations && denominations.length > 0) filtered = filtered.filter(u => denominations.includes(u.denomination));
  if (verified) filtered = filtered.filter(u => u.isVerified);
  res.json({ results: filtered, total: filtered.length });
});

// =====================================================
// ===== BLOCK & REPORT =====
// =====================================================
let blockedUsers = [];

app.post('/api/users/:id/block', (req, res) => {
  const block = { id: `bl${Date.now()}`, blockerId: req.body.blockerId, blockedId: req.params.id, createdAt: new Date().toISOString() };
  blockedUsers.push(block);
  res.status(201).json({ success: true, message: 'Usuário bloqueado' });
});

app.delete('/api/users/:id/block', (req, res) => {
  blockedUsers = blockedUsers.filter(b => !(b.blockerId === req.body.blockerId && b.blockedId === req.params.id));
  res.json({ success: true, message: 'Usuário desbloqueado' });
});

app.get('/api/users/:id/blocked', (req, res) => {
  const blocked = blockedUsers.filter(b => b.blockerId === req.params.id);
  res.json(blocked);
});

// =====================================================
// ===== SHARE PROFILE =====
// =====================================================
app.post('/api/users/:id/share', (req, res) => {
  const { platform, sharedBy } = req.body;
  const shareLink = `https://conexaodivina.app/perfil/${req.params.id}`;
  res.json({ success: true, shareLink, platform });
});

// =====================================================
// ===== USER SETTINGS =====
// =====================================================
let userSettings = {};

app.get('/api/users/:id/settings', (req, res) => {
  res.json(userSettings[req.params.id] || {
    notifications: { matches: true, messages: true, likes: true, events: true, prayers: true, devotional: true, community: false, marketing: false, sound: true, vibration: true },
    privacy: { showOnline: true, showDistance: true, showAge: true, showChurch: true, readReceipts: true, profileVisible: true, showInSearch: true },
    darkMode: false,
    language: 'pt-BR',
  });
});

app.put('/api/users/:id/settings', (req, res) => {
  userSettings[req.params.id] = { ...userSettings[req.params.id], ...req.body };
  res.json(userSettings[req.params.id]);
});

app.delete('/api/users/:id/account', (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  delete userSettings[req.params.id];
  delete userPhotos[req.params.id];
  res.json({ success: true, message: 'Conta excluída permanentemente' });
});

// =====================================================
// ===== SISTEMA DE CONVITES (ESTILO ORKUT) =====
// =====================================================
let invites = [
  { id: 'inv1', code: 'DIVINA2026', createdBy: '1', usedBy: '2', createdAt: '2026-01-15', status: 'used' },
  { id: 'inv2', code: 'SARAH123', createdBy: '2', usedBy: null, createdAt: '2026-02-01', status: 'pending' },
];

let waitingList = [
  { id: 'wl1', name: 'Lucas Ferreira', email: 'lucas@email.com', reason: 'Membro da Igreja Batista Central', requestDate: '2026-02-20', status: 'pending' },
  { id: 'wl2', name: 'Camila Souza', email: 'camila@email.com', reason: 'Sou da Assembleia de Deus', requestDate: '2026-02-19', status: 'pending' },
];

// Gerar código de convite
app.post('/api/invites/generate', (req, res) => {
  const { userId } = req.body;
  const code = `CD${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const invite = { id: `inv-${Date.now()}`, code, createdBy: userId, usedBy: null, createdAt: new Date().toISOString(), status: 'pending' };
  invites.push(invite);
  res.json({ success: true, invite });
});

// Usar código de convite
app.post('/api/invites/use', (req, res) => {
  const { code, userId } = req.body;
  const invite = invites.find(i => i.code === code && i.status === 'pending');
  if (!invite) return res.status(404).json({ error: 'Código inválido ou já utilizado' });
  invite.usedBy = userId;
  invite.status = 'used';
  res.json({ success: true, message: 'Convite aceito! Acesso liberado automaticamente.', invite });
});

// Listar convites do usuário
app.get('/api/invites/user/:userId', (req, res) => {
  const userInvites = invites.filter(i => i.createdBy === req.params.userId);
  res.json({ invites: userInvites, sent: userInvites.length, accepted: userInvites.filter(i => i.status === 'used').length });
});

// Verificar se código é válido
app.get('/api/invites/verify/:code', (req, res) => {
  const invite = invites.find(i => i.code === req.params.code && i.status === 'pending');
  res.json({ valid: !!invite, invite: invite || null });
});

// Entrar na fila de espera (sem convite)
app.post('/api/waiting-list', (req, res) => {
  const { name, email, reason } = req.body;
  const entry = { id: `wl-${Date.now()}`, name, email, reason, requestDate: new Date().toISOString(), status: 'pending' };
  waitingList.push(entry);
  res.json({ success: true, entry, message: 'Você entrou na fila de espera. Aguarde aprovação.' });
});

// Admin: Listar fila de espera
app.get('/api/admin/waiting-list', (req, res) => {
  res.json({ waitingList, total: waitingList.length, pending: waitingList.filter(w => w.status === 'pending').length });
});

// Admin: Aprovar da fila
app.put('/api/admin/waiting-list/:id/approve', (req, res) => {
  const entry = waitingList.find(w => w.id === req.params.id);
  if (!entry) return res.status(404).json({ error: 'Não encontrado' });
  entry.status = 'approved';
  res.json({ success: true, entry });
});

// Admin: Rejeitar da fila
app.put('/api/admin/waiting-list/:id/reject', (req, res) => {
  const entry = waitingList.find(w => w.id === req.params.id);
  if (!entry) return res.status(404).json({ error: 'Não encontrado' });
  entry.status = 'rejected';
  res.json({ success: true, entry });
});

// =====================================================
// ===== STORIES CAMERA =====
// =====================================================
let userStories = [];

app.post('/api/stories', (req, res) => {
  const { userId, type, content, filter, stickers, caption } = req.body;
  const story = { id: `story-${Date.now()}`, userId, type, content, filter, stickers, caption, createdAt: new Date().toISOString(), views: [], likes: [] };
  userStories.push(story);
  res.json({ success: true, story });
});

app.get('/api/stories', (req, res) => {
  const activeStories = userStories.filter(s => {
    const created = new Date(s.createdAt);
    const now = new Date();
    return (now.getTime() - created.getTime()) < 24 * 60 * 60 * 1000;
  });
  res.json({ stories: activeStories });
});

app.post('/api/stories/:id/view', (req, res) => {
  const story = userStories.find(s => s.id === req.params.id);
  if (story && !story.views.includes(req.body.userId)) story.views.push(req.body.userId);
  res.json({ success: true });
});

// =====================================================
// ===== ONBOARDING COMPLETO =====
// =====================================================
app.post('/api/onboarding/complete', (req, res) => {
  const { userId, photos, name, age, gender, city, state, denomination, churchName, baptized, churchRole, bio, faithJourney, favoriteVerse, worshipStyle, relationshipGoal, interests, height } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) {
    Object.assign(user, { name, age, gender, city, location: `${city}, ${state}`, denomination, churchName, baptized, churchRole, bio, faithJourney, favoriteVerse, worshipStyle, relationshipGoal, interests, height, onboardingComplete: true });
    if (photos?.length) userPhotos[userId] = photos;
  }
  res.json({ success: true, user });
});

// =====================================================
// ===== ENHANCED CHAT (REACTIONS, TYPING) =====
// =====================================================
let messageReactions = {};
let typingStatus = {};

app.post('/api/messages/:messageId/react', (req, res) => {
  const { emoji, userId } = req.body;
  if (!messageReactions[req.params.messageId]) messageReactions[req.params.messageId] = [];
  messageReactions[req.params.messageId] = messageReactions[req.params.messageId].filter(r => r.userId !== userId);
  messageReactions[req.params.messageId].push({ emoji, userId, timestamp: Date.now() });
  res.json({ success: true });
});

app.post('/api/chat/:matchId/typing', (req, res) => {
  const { userId, isTyping } = req.body;
  typingStatus[`${req.params.matchId}_${userId}`] = { isTyping, timestamp: Date.now() };
  res.json({ success: true });
});

app.get('/api/chat/:matchId/typing/:userId', (req, res) => {
  const key = `${req.params.matchId}_${req.params.userId}`;
  const status = typingStatus[key];
  const isActive = status && status.isTyping && (Date.now() - status.timestamp) < 5000;
  res.json({ isTyping: isActive });
});

app.post('/api/messages/sticker', (req, res) => {
  const { matchId, senderId, stickerText, stickerBg } = req.body;
  const msg = { id: `msg-${Date.now()}`, matchId, senderId, type: 'sticker', stickerText, stickerBg, timestamp: Date.now(), status: 'sent' };
  res.json({ success: true, message: msg });
});

// =====================================================
// ===== DELETE ACCOUNT =====
// =====================================================
app.post('/api/account/delete', (req, res) => {
  const { userId, password } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
  }

  // Marcar conta para exclusão (30 dias)
  user.status = 'pending_deletion';
  user.deletionScheduledAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  
  console.log(`❌ Conta marcada para exclusão: ${user.name} (ID: ${user.id}) - Exclusão em 30 dias`);
  
  res.json({ 
    success: true, 
    message: 'Conta marcada para exclusão. Você tem 30 dias para cancelar fazendo login novamente.',
    deletionDate: user.deletionScheduledAt
  });
});

app.post('/api/account/cancel-deletion', (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
  }

  if (user.status === 'pending_deletion') {
    user.status = 'active';
    delete user.deletionScheduledAt;
    console.log(`✅ Exclusão cancelada: ${user.name} (ID: ${user.id})`);
    res.json({ success: true, message: 'Exclusão de conta cancelada com sucesso!' });
  } else {
    res.json({ success: false, message: 'Esta conta não está marcada para exclusão.' });
  }
});

app.delete('/api/account/permanent-delete/:userId', (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
  }

  const user = users[userIndex];
  
  // Excluir permanentemente
  users.splice(userIndex, 1);
  
  console.log(`🗑️ Conta permanentemente excluída: ${user.name} (ID: ${user.id})`);
  
  res.json({ 
    success: true, 
    message: 'Conta excluída permanentemente. Todos os dados foram removidos.'
  });
});

// =====================================================
// ===== HEALTH CHECK =====
// =====================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now(), version: '6.0.0' });
});

// =====================================================
// ===== SPA FALLBACK - Todas as rotas não-API servem o frontend =====
// =====================================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// =====================================================
// ===== START SERVER =====
// =====================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Conexão Divina API v7.0 rodando na porta ${PORT}`);
  console.log(`📊 Servidor unificado: API + Frontend`);
});
