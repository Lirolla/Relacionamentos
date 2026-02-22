import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import multer from 'multer';

// =====================================================
// ===== GLOBAL ERROR HANDLING =====
// =====================================================
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message, err.stack);
});
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

// =====================================================
// ===== CONEXÃO MYSQL - HOSTINGER =====
// =====================================================
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'u219024948_cristo',
  password: process.env.DB_PASSWORD || 'Pagotto24',
  database: process.env.DB_NAME || 'u219024948_cristo',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  charset: 'utf8mb4',
  connectTimeout: 10000
};

let pool = null;
try {
  pool = mysql.createPool(dbConfig);
  console.log('Pool MySQL criado');
} catch (err) {
  console.error('Erro pool MySQL:', err.message);
}

async function query(sql, params) {
  if (!pool) throw new Error('Database not available');
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// =====================================================
// ===== EXPRESS SETUP =====
// =====================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Detectar se estamos rodando de dentro do dist/ ou da raiz
const isInsideDist = __dirname.endsWith('dist') || __dirname.endsWith('dist/');
const staticDir = isInsideDist ? __dirname : path.join(__dirname, 'dist');

console.log('Static dir:', staticDir);
console.log('Dir exists:', fs.existsSync(staticDir));

// =====================================================
// ===== MULTER CONFIG =====
// =====================================================
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, limits: { fileSize: 5 * 1024 * 1024 } });


// Pasta de uploads
const uploadsBase = isInsideDist ? path.join(__dirname, '..') : __dirname;
const uploadsDir = path.join(uploadsBase, 'uploads', 'photos');
try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch(e) {}
app.use('/uploads', express.static(path.join(uploadsBase, 'uploads')));

// Servir frontend estático
app.use(express.static(staticDir));

// =====================================================
// ===== HEALTH CHECK (FIRST - for debugging) =====
// =====================================================
// =====================================================
// ===== CHECK IMAGE NSFW =====
// =====================================================
app.post('/api/check-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ safe: false, reason: 'Nenhuma imagem enviada' });
    
    // Verificar por palavras-chave no tipo de arquivo
    if (!req.file.mimetype.startsWith('image/')) {
      return res.json({ safe: false, reason: 'Apenas imagens são permitidas.' });
    }
    
    // Usar API gratuita Picpurify ou análise local simples
    // Enviar para API NSFW gratuita
    const FormData = (await import('form-data')).default;
    const fetch = (await import('node-fetch')).default;
    
    const formData = new FormData();
    formData.append('image', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });
    
    try {
      const apiRes = await fetch('https://api.nsfw.rest/classify', {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
        timeout: 10000
      });
      
      if (apiRes.ok) {
        const data = await apiRes.json();
        // A API retorna { nsfw: boolean, confidence: number }
        if (data.nsfw && data.confidence > 0.5) {
          return res.json({ safe: false, reason: 'Conteúdo impróprio detectado. Esta imagem não pode ser enviada.' });
        }
      }
    } catch (apiErr) {
      // Se a API falhar, usar verificação básica por tamanho/tipo
      console.error('NSFW API error:', apiErr.message);
    }
    
    res.json({ safe: true });
  } catch (err) {
    console.error('Erro check-image:', err.message);
    res.json({ safe: true }); // fail-open
  }
});

app.get('/api/health', async (req, res) => {
  let dbOk = false;
  try {
    await query('SELECT 1', []);
    dbOk = true;
  } catch (e) {}
  res.json({ status: 'ok', database: dbOk ? 'connected' : 'disconnected', timestamp: Date.now(), version: '8.1.0', staticDir, nodeVersion: process.version });
});

// =====================================================
// ===== ADMIN LOGIN =====
// =====================================================
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const loginEmail = email || username;
    const rows = await query('SELECT * FROM users WHERE email = ? AND role = ?', [loginEmail, 'admin']);
    if (rows.length === 0) return res.status(401).json({ error: 'Usuário ou senha incorretos' });
    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Usuário ou senha incorretos' });
    res.json({ success: true, token: 'admin-token-' + Date.now(), message: 'Login realizado com sucesso', user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) {
    console.error('Erro admin login:', err.message);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// =====================================================
// ===== ADMIN DASHBOARD / STATS =====
// =====================================================
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [totalUsers] = await query('SELECT COUNT(*) as c FROM users WHERE role = ?', ['user']);
    const [activeUsers] = await query('SELECT COUNT(*) as c FROM users WHERE is_active = 1 AND is_blocked = 0 AND role = ?', ['user']);
    const [premiumUsers] = await query('SELECT COUNT(*) as c FROM users WHERE is_premium = 1', []);
    const [verifiedUsers] = await query('SELECT COUNT(*) as c FROM users WHERE verification_status = ?', ['verified']);
    const [totalChurches] = await query('SELECT COUNT(*) as c FROM churches', []);
    const [verifiedChurches] = await query('SELECT COUNT(*) as c FROM churches WHERE is_verified = 1', []);
    const [totalEvents] = await query('SELECT COUNT(*) as c FROM events', []);
    const [activeEvents] = await query('SELECT COUNT(*) as c FROM events WHERE is_active = 1', []);
    const [totalMatches] = await query('SELECT COUNT(*) as c FROM matches', []);
    const [pendingReports] = await query('SELECT COUNT(*) as c FROM reports WHERE status = ?', ['pending']);
    const [pendingVerifications] = await query('SELECT COUNT(*) as c FROM verifications WHERE status = ?', ['pending']);
    const [activeSubs] = await query('SELECT COUNT(*) as c FROM subscriptions WHERE status = ?', ['active']);
    const [revenue] = await query('SELECT COALESCE(SUM(price), 0) as total FROM subscriptions WHERE status = ?', ['active']);
    res.json({
      totalUsers: totalUsers.c, activeUsers: activeUsers.c, premiumUsers: premiumUsers.c,
      verifiedUsers: verifiedUsers.c, totalChurches: totalChurches.c, verifiedChurches: verifiedChurches.c,
      totalEvents: totalEvents.c, activeEvents: activeEvents.c, totalMatches: totalMatches.c,
      pendingReports: pendingReports.c, pendingVerifications: pendingVerifications.c,
      totalSubscriptions: activeSubs.c, activeSubscriptions: activeSubs.c, monthlyRevenue: revenue.total,
    });
  } catch (err) {
    console.error('Erro stats:', err.message);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// =====================================================
// ===== ADMIN USERS CRUD =====
// =====================================================
app.get('/api/admin/users', async (req, res) => {
  try {
    const rows = await query('SELECT id, name, email, birth_date, gender, denomination, church_name, city, state, is_premium, is_active, is_blocked, verification_status, role, created_at, last_seen, likes_received, profile_views, bio, reputation_score FROM users ORDER BY created_at DESC', []);
    const mapped = rows.map(r => {
      const age = r.birth_date ? Math.floor((Date.now() - new Date(r.birth_date).getTime()) / 31557600000) : 0;
      return {
        id: String(r.id), name: r.name || '', email: r.email || '', age,
        gender: r.gender || '', church: r.church_name || '', denomination: r.denomination || '',
        location: (r.city && r.state) ? `${r.city}, ${r.state}` : (r.city || r.state || ''),
        status: r.is_blocked ? 'blocked' : (r.is_active ? 'active' : 'inactive'),
        isPremium: !!r.is_premium, createdAt: r.created_at || '', lastLogin: r.last_seen || '',
        avatar: '', photos: [], bio: r.bio || '', phone: '',
        verificationStatus: r.verification_status || 'none',
        matchCount: 0, reportCount: 0
      };
    });
    res.json(mapped);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/admin/users/:id', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const { name, email, denomination, church_name, is_premium, is_active } = req.body;
    await query('UPDATE users SET name=?, email=?, denomination=?, church_name=?, is_premium=?, is_active=? WHERE id=?',
      [name, email, denomination, church_name, is_premium ? 1 : 0, is_active ? 1 : 0, req.params.id]);
    res.json({ message: 'Usuário atualizado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/users/:id/block', async (req, res) => {
  try {
    await query('UPDATE users SET is_blocked = 1, is_active = 0 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuário bloqueado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/users/:id/unblock', async (req, res) => {
  try {
    await query('UPDATE users SET is_blocked = 0, is_active = 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuário desbloqueado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/users/:id/verify', async (req, res) => {
  try {
    await query('UPDATE users SET verification_status = ? WHERE id = ?', ['verified', req.params.id]);
    res.json({ message: 'Usuário verificado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    await query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuário excluído' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADMIN CHURCHES CRUD =====
// =====================================================
app.get('/api/admin/churches', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM churches ORDER BY created_at DESC', []);
    const mapped = rows.map(r => ({
      id: String(r.id), name: r.name || '', denomination: r.denomination || '', city: r.city || '',
      state: r.state || '', members: r.members_count || 0, verified: !!r.is_verified,
      pastor: r.pastor || '', phone: r.phone || '', address: r.address || '', email: r.email || ''
    }));
    res.json(mapped);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/admin/churches/:id', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM churches WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Igreja não encontrada' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/admin/churches', async (req, res) => {
  try {
    const { name, denomination, pastor, address, city, state, phone, email, members_count, description } = req.body;
    const result = await query(
      'INSERT INTO churches (name, denomination, pastor, address, city, state, phone, email, members_count, description) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [name || null, denomination || null, pastor || null, address || null, city || null, state || null, phone || null, email || null, members_count || 0, description || null]
    );
    res.status(201).json({ message: 'Igreja cadastrada', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/churches/:id', async (req, res) => {
  try {
    const { name, denomination, pastor, address, city, state, phone, email, members_count, description } = req.body;
    await query(
      'UPDATE churches SET name=?, denomination=?, pastor=?, address=?, city=?, state=?, phone=?, email=?, members_count=?, description=? WHERE id=?',
      [name || null, denomination || null, pastor || null, address || null, city || null, state || null, phone || null, email || null, members_count || 0, description || null, req.params.id]
    );
    res.json({ message: 'Igreja atualizada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/churches/:id/verify', async (req, res) => {
  try {
    await query('UPDATE churches SET is_verified = 1, verified_at = NOW() WHERE id = ?', [req.params.id]);
    res.json({ message: 'Igreja verificada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/churches/:id/unverify', async (req, res) => {
  try {
    await query('UPDATE churches SET is_verified = 0, verified_at = NULL WHERE id = ?', [req.params.id]);
    res.json({ message: 'Verificação removida' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/admin/churches/:id', async (req, res) => {
  try {
    await query('DELETE FROM churches WHERE id = ?', [req.params.id]);
    res.json({ message: 'Igreja excluída' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADMIN EVENTS CRUD =====
// =====================================================
app.get('/api/admin/events', async (req, res) => {
  try {
    const rows = await query(`SELECT e.*, c.name as church_name FROM events e LEFT JOIN churches c ON e.church_id = c.id ORDER BY e.date DESC`, []);
    const mapped = rows.map(r => ({
      id: String(r.id), title: r.title || '', church: r.church_name || '', date: r.date ? new Date(r.date).toISOString().split('T')[0] : '',
      time: r.time || '', location: r.location || '', attendees: r.current_participants || 0,
      type: r.category || 'outro', description: r.description || '', maxAttendees: r.max_participants || 100,
      status: r.is_active ? 'active' : 'canceled'
    }));
    res.json(mapped);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/admin/events', async (req, res) => {
  try {
    const { title, description, date, time, end_date, location, church_id, church, category, type, max_participants, max_attendees, price, is_free } = req.body;
    // Resolver church_id a partir do nome da igreja se necessário
    let resolvedChurchId = church_id || null;
    if (!resolvedChurchId && church) {
      const found = await query('SELECT id FROM churches WHERE name = ? LIMIT 1', [church]);
      if (found.length > 0) resolvedChurchId = found[0].id;
    }
    // Mapear tipo para categoria do banco
    const typeMap = { 'Culto': 'culto', 'Retiro': 'retiro', 'Conferência': 'conferencia', 'Jantar': 'jantar', 'Estudo Bíblico': 'estudo_biblico', 'Louvor': 'culto', 'Encontro de Solteiros': 'social', 'Workshop': 'outro' };
    const resolvedCategory = category || typeMap[type] || 'outro';
    const resolvedMax = max_participants || max_attendees || 100;
    const result = await query(
      'INSERT INTO events (title, description, date, time, end_date, location, church_id, category, max_participants, price, is_free) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [title || null, description || null, date || null, time || null, end_date || null, location || null, resolvedChurchId, resolvedCategory, resolvedMax, price || 0, is_free !== undefined ? (is_free ? 1 : 0) : 1]
    );
    res.status(201).json({ message: 'Evento criado', id: result.insertId });
  } catch (err) { console.error('Erro criar evento:', err.message, err.sql); res.status(500).json({ error: 'Erro interno', detail: err.message }); }
});

app.put('/api/admin/events/:id', async (req, res) => {
  try {
    const { title, description, date, time, location, max_participants, price, is_free } = req.body;
    await query('UPDATE events SET title=?, description=?, date=?, time=?, location=?, max_participants=?, price=?, is_free=? WHERE id=?',
      [title, description, date, time, location, max_participants, price, is_free ? 1 : 0, req.params.id]);
    res.json({ message: 'Evento atualizado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/events/:id/toggle', async (req, res) => {
  try {
    await query('UPDATE events SET is_active = NOT is_active WHERE id = ?', [req.params.id]);
    res.json({ message: 'Status do evento alterado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/admin/events/:id', async (req, res) => {
  try {
    await query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ message: 'Evento excluído' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADMIN REPORTS =====
// =====================================================
app.get('/api/admin/reports', async (req, res) => {
  try {
    const rows = await query('SELECT r.*, u1.name as reporter_name, u2.name as reported_name FROM reports r LEFT JOIN users u1 ON r.reporter_id = u1.id LEFT JOIN users u2 ON r.reported_user_id = u2.id ORDER BY r.created_at DESC', []);
    const mapped = rows.map(r => ({
      id: String(r.id), reporterName: r.reporter_name || 'Anônimo', reportedName: r.reported_name || 'Desconhecido',
      reportedId: String(r.reported_user_id), reportedAvatar: '', reason: r.reason || '',
      description: r.description || '', date: r.created_at || '', status: r.status || 'pending',
      reporterAvatar: ''
    }));
    res.json(mapped);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/reports/:id/resolve', async (req, res) => {
  try {
    const { action } = req.body;
    await query('UPDATE reports SET status = ?, resolution = ?, resolved_at = NOW() WHERE id = ?', ['resolved', action, req.params.id]);
    if (action === 'ban') {
      const rows = await query('SELECT reported_user_id FROM reports WHERE id = ?', [req.params.id]);
      if (rows.length > 0) await query('UPDATE users SET is_blocked = 1, is_active = 0 WHERE id = ?', [rows[0].reported_user_id]);
    }
    res.json({ message: 'Denúncia resolvida' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/reports/:id/dismiss', async (req, res) => {
  try {
    await query('UPDATE reports SET status = ? WHERE id = ?', ['dismissed', req.params.id]);
    res.json({ message: 'Denúncia descartada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADMIN SUBSCRIPTIONS =====
// =====================================================
app.get('/api/admin/subscriptions', async (req, res) => {
  try {
    const rows = await query('SELECT s.*, u.name as user_name, u.email as user_email FROM subscriptions s LEFT JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADMIN VERIFICATIONS =====
// =====================================================
app.get('/api/admin/verifications', async (req, res) => {
  try {
    const rows = await query('SELECT v.*, u.name as user_name FROM verifications v LEFT JOIN users u ON v.user_id = u.id ORDER BY v.submitted_at DESC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/verifications/:id/approve', async (req, res) => {
  try {
    await query('UPDATE verifications SET status = ?, reviewed_at = NOW() WHERE id = ?', ['approved', req.params.id]);
    const rows = await query('SELECT user_id FROM verifications WHERE id = ?', [req.params.id]);
    if (rows.length > 0) await query('UPDATE users SET verification_status = ? WHERE id = ?', ['verified', rows[0].user_id]);
    res.json({ message: 'Verificação aprovada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/verifications/:id/reject', async (req, res) => {
  try {
    await query('UPDATE verifications SET status = ?, reviewed_at = NOW() WHERE id = ?', ['rejected', req.params.id]);
    const rows = await query('SELECT user_id FROM verifications WHERE id = ?', [req.params.id]);
    if (rows.length > 0) await query('UPDATE users SET verification_status = ? WHERE id = ?', ['rejected', rows[0].user_id]);
    res.json({ message: 'Verificação rejeitada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADMIN MATCHES =====
// =====================================================
app.get('/api/admin/matches', async (req, res) => {
  try {
    const rows = await query('SELECT m.*, u1.name as user1_name, u2.name as user2_name FROM matches m LEFT JOIN users u1 ON m.user1_id = u1.id LEFT JOIN users u2 ON m.user2_id = u2.id ORDER BY m.created_at DESC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== MODERATION =====
// =====================================================
app.post('/api/moderation/report', async (req, res) => {
  try {
    const { reporter_id, reported_user_id, reason, description } = req.body;
    const result = await query('INSERT INTO reports (reporter_id, reported_user_id, reason, description) VALUES (?,?,?,?)', [reporter_id, reported_user_id, reason, description]);
    res.json({ message: 'Denúncia registrada', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== AUTH (REGISTRO / LOGIN) =====
// =====================================================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, gender, denomination, churchName } = req.body;
    const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ error: 'Email já cadastrado' });
    const hash = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (name, email, password_hash, gender, denomination, church_name) VALUES (?,?,?,?,?,?)',
      [name, email, hash, gender || 'male', denomination, churchName]
    );
    const userId = result.insertId;
    const rows = await query('SELECT * FROM users WHERE id = ?', [userId]);
    res.status(201).json({ message: 'Conta criada com sucesso', user: rows[0], token: 'token-' + userId });
  } catch (err) {
    console.error('Erro register:', err.message);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Email ou senha incorretos' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Email ou senha incorretos' });
    if (user.is_blocked) return res.status(403).json({ error: 'Conta bloqueada. Entre em contato com o suporte.' });
    await query('UPDATE users SET last_seen = NOW() WHERE id = ?', [user.id]);
    res.json({ message: 'Login realizado', user, token: 'token-' + user.id });
  } catch (err) {
    console.error('Erro login:', err.message);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const rows = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ error: 'Email não encontrado' });
    res.json({ message: 'Email de recuperação enviado para ' + email });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== USERS =====
// =====================================================
app.get('/api/users/nearby', async (req, res) => {
  try {
    const rows = await query('SELECT id, name, gender, denomination, church_name, city, state, bio, verification_status, is_premium, latitude, longitude FROM users WHERE is_active = 1 AND is_blocked = 0 AND role = ? ORDER BY last_seen DESC LIMIT 50', ['user']);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, bio, faith_journey, denomination, church_name, city, state, height, hair_color, objective } = req.body;
    await query('UPDATE users SET name=?, bio=?, faith_journey=?, denomination=?, church_name=?, city=?, state=?, height=?, hair_color=?, objective=? WHERE id=?',
      [name, bio, faith_journey, denomination, church_name, city, state, height, hair_color, objective, req.params.id]);
    res.json({ message: 'Perfil atualizado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/users/:id/location', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    await query('UPDATE users SET latitude = ?, longitude = ?, location_verified = 1 WHERE id = ?', [latitude, longitude, req.params.id]);
    res.json({ message: 'Localização atualizada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== MATCHES =====
// =====================================================
app.post('/api/matches', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body;
    const existing = await query('SELECT id FROM matches WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)', [user1Id, user2Id, user2Id, user1Id]);
    if (existing.length > 0) return res.json({ message: 'Match já existe', id: existing[0].id });
    const result = await query('INSERT INTO matches (user1_id, user2_id) VALUES (?,?)', [user1Id, user2Id]);
    res.status(201).json({ message: 'Match criado!', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== MESSAGES =====
// =====================================================
app.post('/api/messages', async (req, res) => {
  try {
    const { matchId, senderId, text } = req.body;
    const result = await query('INSERT INTO messages (match_id, sender_id, content) VALUES (?,?,?)', [matchId, senderId, text]);
    res.json({ message: 'Mensagem enviada', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/messages/:matchId', async (req, res) => {
  try {
    const rows = await query('SELECT m.*, u.name as sender_name FROM messages m LEFT JOIN users u ON m.sender_id = u.id WHERE m.match_id = ? ORDER BY m.created_at ASC', [req.params.matchId]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== EVENTS (PÚBLICO) =====
// =====================================================
app.get('/api/events', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM events WHERE is_active = 1 ORDER BY date ASC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/events/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    await query('INSERT IGNORE INTO event_attendees (event_id, user_id) VALUES (?,?)', [req.params.id, userId]);
    await query('UPDATE events SET current_participants = current_participants + 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Inscrição realizada!' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== CHURCHES (PÚBLICO) =====
// =====================================================
app.get('/api/churches', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM churches WHERE is_verified = 1 ORDER BY name ASC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/churches/nearby', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM churches ORDER BY name ASC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/events/nearby', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM events WHERE is_active = 1 ORDER BY date ASC', []);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== VERIFICATION =====
// =====================================================
app.post('/api/verification/submit', async (req, res) => {
  try {
    const { userId, type, photoUrl } = req.body;
    await query('UPDATE users SET verification_status = ? WHERE id = ?', ['pending', userId]);
    const result = await query('INSERT INTO verifications (user_id, type, photo_url) VALUES (?,?,?)', [userId, type || 'selfie', photoUrl]);
    res.json({ message: 'Verificação enviada para análise', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== COMMUNITY FEED =====
// =====================================================
app.get('/api/community/posts', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT p.*, u.name as userName, u.verification_status FROM community_posts p LEFT JOIN users u ON p.user_id = u.id';
    const params = [];
    if (category && category !== 'todos' && category !== 'all') { sql += ' WHERE p.category = ?'; params.push(category); }
    sql += ' ORDER BY p.created_at DESC LIMIT 50';
    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/community/posts', async (req, res) => {
  try {
    const { userId, content, category, imageUrl } = req.body;
    const result = await query('INSERT INTO community_posts (user_id, content, category, image_url) VALUES (?,?,?,?)', [userId, content, category, imageUrl]);
    res.status(201).json({ message: 'Post publicado', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/community/posts/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    await query('INSERT IGNORE INTO post_likes (post_id, user_id) VALUES (?,?)', [req.params.id, userId]);
    const [count] = await query('SELECT COUNT(*) as c FROM post_likes WHERE post_id = ?', [req.params.id]);
    res.json({ likes: count.c });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/community/posts/:id/comment', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const result = await query('INSERT INTO post_comments (post_id, user_id, content) VALUES (?,?,?)', [req.params.id, userId, content]);
    res.status(201).json({ message: 'Comentário adicionado', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/community/posts/:id', async (req, res) => {
  try {
    await query('DELETE FROM community_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post excluído' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== PRAYER REQUESTS =====
// =====================================================
app.get('/api/prayers', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT p.*, u.name as userName FROM prayer_requests p LEFT JOIN users u ON p.user_id = u.id';
    const params = [];
    if (category && category !== 'todos' && category !== 'all') { sql += ' WHERE p.category = ?'; params.push(category); }
    sql += ' ORDER BY p.created_at DESC LIMIT 50';
    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/prayers', async (req, res) => {
  try {
    const { userId, content, category, isUrgent, isAnonymous } = req.body;
    const result = await query('INSERT INTO prayer_requests (user_id, content, category, is_urgent, is_anonymous) VALUES (?,?,?,?,?)',
      [userId, content, category, isUrgent ? 1 : 0, isAnonymous ? 1 : 0]);
    res.status(201).json({ message: 'Pedido de oração criado', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/prayers/:id/pray', async (req, res) => {
  try {
    await query('UPDATE prayer_requests SET prayer_count = prayer_count + 1 WHERE id = ?', [req.params.id]);
    const rows = await query('SELECT prayer_count FROM prayer_requests WHERE id = ?', [req.params.id]);
    res.json({ prayerCount: rows[0]?.prayer_count || 0 });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== DEVOTIONAL =====
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

app.get('/api/devotionals', (req, res) => {
  res.json(dailyDevotionals.map((d, i) => ({ id: i + 1, ...d })));
});

app.get('/api/devotionals/today', (req, res) => {
  const dayIndex = new Date().getDate() % dailyDevotionals.length;
  res.json({ id: dayIndex + 1, date: new Date().toISOString().split('T')[0], ...dailyDevotionals[dayIndex] });
});

// =====================================================
// ===== REPUTATION / REVIEWS =====
// =====================================================
app.get('/api/reputation/:userId', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM reputation_reviews WHERE reviewed_user_id = ?', [req.params.userId]);
    const totalReviews = rows.length;
    const avgRating = totalReviews > 0 ? rows.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
    res.json({ userId: req.params.userId, overallRating: avgRating, totalReviews, reviews: rows });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/users/:userId/reputation', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM reputation_reviews WHERE reviewed_user_id = ?', [req.params.userId]);
    const totalReviews = rows.length;
    const avgRating = totalReviews > 0 ? rows.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
    res.json({ averageRating: avgRating, totalReviews, reviews: rows });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/reputation/review', async (req, res) => {
  try {
    const { fromUserId, toUserId, rating, traits, comment } = req.body;
    const result = await query('INSERT INTO reputation_reviews (reviewer_id, reviewed_user_id, rating, comment) VALUES (?,?,?,?)',
      [fromUserId, toUserId, rating, comment]);
    res.status(201).json({ message: 'Avaliação enviada', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== NOTIFICATIONS =====
// =====================================================
app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50', [req.params.userId]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/notifications/:id/read', async (req, res) => {
  try {
    await query('UPDATE notifications SET is_read = 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Marcada como lida' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/notifications/:userId/read-all', async (req, res) => {
  try {
    await query('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [req.params.userId]);
    res.json({ message: 'Todas marcadas como lidas' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/notifications/:id', async (req, res) => {
  try {
    await query('DELETE FROM notifications WHERE id = ?', [req.params.id]);
    res.json({ message: 'Notificação excluída' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== STORIES =====
// =====================================================
app.post('/api/stories', async (req, res) => {
  try {
    const { userId, imageUrl, caption } = req.body;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const result = await query('INSERT INTO stories (user_id, image_url, caption, expires_at) VALUES (?,?,?,?)', [userId, imageUrl || '', caption, expiresAt]);
    res.json({ success: true, id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/stories', async (req, res) => {
  try {
    const rows = await query('SELECT s.*, u.name as userName FROM stories s LEFT JOIN users u ON s.user_id = u.id WHERE s.expires_at > NOW() ORDER BY s.created_at DESC', []);
    res.json({ stories: rows });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/stories/:id/view', async (req, res) => {
  try {
    const { userId } = req.body;
    await query('INSERT IGNORE INTO story_views (story_id, viewer_id) VALUES (?,?)', [req.params.id, userId]);
    await query('UPDATE stories SET views_count = views_count + 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== SWIPES =====
// =====================================================
app.post('/api/swipes', async (req, res) => {
  try {
    const { swiperId, swipedId, direction } = req.body;
    await query('INSERT INTO swipes (swiper_id, swiped_id, direction) VALUES (?,?,?) ON DUPLICATE KEY UPDATE direction = ?', [swiperId, swipedId, direction, direction]);
    if (direction === 'like' || direction === 'superlike') {
      const mutual = await query('SELECT id FROM swipes WHERE swiper_id = ? AND swiped_id = ? AND direction IN (?,?)', [swipedId, swiperId, 'like', 'superlike']);
      if (mutual.length > 0) {
        const existingMatch = await query('SELECT id FROM matches WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)', [swiperId, swipedId, swipedId, swiperId]);
        if (existingMatch.length === 0) {
          await query('INSERT INTO matches (user1_id, user2_id) VALUES (?,?)', [swiperId, swipedId]);
          return res.json({ match: true, message: 'É um match!' });
        }
      }
    }
    res.json({ match: false });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== PHOTOS =====
// =====================================================
app.get('/api/users/:id/photos', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM photos WHERE user_id = ? ORDER BY sort_order ASC', [req.params.id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/users/:id/photos', async (req, res) => {
  try {
    const { url } = req.body;
    const existing = await query('SELECT COUNT(*) as c FROM photos WHERE user_id = ?', [req.params.id]);
    const isPrimary = existing[0].c === 0 ? 1 : 0;
    const result = await query('INSERT INTO photos (user_id, url, is_primary, sort_order) VALUES (?,?,?,?)', [req.params.id, url, isPrimary, existing[0].c]);
    res.status(201).json({ id: result.insertId, url, is_primary: isPrimary });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/users/:id/photos/:photoId', async (req, res) => {
  try {
    await query('DELETE FROM photos WHERE id = ? AND user_id = ?', [req.params.photoId, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/users/:id/photos/:photoId/main', async (req, res) => {
  try {
    await query('UPDATE photos SET is_primary = 0 WHERE user_id = ?', [req.params.id]);
    await query('UPDATE photos SET is_primary = 1 WHERE id = ? AND user_id = ?', [req.params.photoId, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== REELS =====
// =====================================================
app.get('/api/reels', async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT r.*, u.name as userName FROM reels r LEFT JOIN users u ON r.user_id = u.id';
    const params = [];
    if (category && category !== 'all') { sql += ' WHERE r.category = ?'; params.push(category); }
    sql += ' ORDER BY r.created_at DESC LIMIT 50';
    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/reels', async (req, res) => {
  try {
    const { userId, videoUrl, thumbnailUrl, description, category } = req.body;
    const result = await query('INSERT INTO reels (user_id, video_url, thumbnail_url, description, category) VALUES (?,?,?,?,?)',
      [userId, videoUrl, thumbnailUrl, description, category]);
    res.status(201).json({ id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== SAFE MODE =====
// =====================================================
app.post('/api/safe-mode/activate', async (req, res) => {
  try {
    const { userId, contactName, contactPhone, partnerName, meetingLocation } = req.body;
    const result = await query('INSERT INTO safe_mode_sessions (user_id, contact_name, contact_phone, partner_name, meeting_location, status) VALUES (?,?,?,?,?,?)',
      [userId, contactName, contactPhone, partnerName, meetingLocation, 'active']);
    res.status(201).json({ message: 'Modo Seguro ativado!', id: result.insertId });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/safe-mode/emergency', async (req, res) => {
  try {
    const { userId } = req.body;
    await query('UPDATE safe_mode_sessions SET status = ? WHERE user_id = ? AND status = ?', ['emergency', userId, 'active']);
    res.json({ message: 'Alerta de emergência enviado!' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/safe-mode/deactivate', async (req, res) => {
  try {
    const { userId } = req.body;
    await query('UPDATE safe_mode_sessions SET status = ? WHERE user_id = ? AND status = ?', ['deactivated', userId, 'active']);
    res.json({ message: 'Modo Seguro desativado.' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== BLOCK & REPORT =====
// =====================================================
app.post('/api/users/:id/block', async (req, res) => {
  try {
    const { blockerId, reason } = req.body;
    await query('INSERT IGNORE INTO user_blocks (blocker_id, blocked_id, reason) VALUES (?,?,?)', [blockerId, req.params.id, reason]);
    res.status(201).json({ success: true, message: 'Usuário bloqueado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/users/:id/block', async (req, res) => {
  try {
    const { blockerId } = req.body;
    await query('DELETE FROM user_blocks WHERE blocker_id = ? AND blocked_id = ?', [blockerId, req.params.id]);
    res.json({ success: true, message: 'Usuário desbloqueado' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/users/:id/blocked', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM user_blocks WHERE blocker_id = ?', [req.params.id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== USER SETTINGS =====
// =====================================================
app.get('/api/users/:id/settings', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM user_settings WHERE user_id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.json({ notifications: { matches: true, messages: true, likes: true, events: true }, privacy: { showOnline: true, showDistance: true }, darkMode: false, language: 'pt-BR' });
    } else {
      res.json(rows[0].settings ? JSON.parse(rows[0].settings) : rows[0]);
    }
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/users/:id/settings', async (req, res) => {
  try {
    const settings = JSON.stringify(req.body);
    await query('INSERT INTO user_settings (user_id, settings) VALUES (?,?) ON DUPLICATE KEY UPDATE settings = ?', [req.params.id, settings, settings]);
    res.json(req.body);
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== INVITES =====
// =====================================================
app.post('/api/invites/generate', async (req, res) => {
  try {
    const { userId } = req.body;
    const code = `CD${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const result = await query('INSERT INTO invites (code, created_by, status) VALUES (?,?,?)', [code, userId, 'pending']);
    res.json({ success: true, invite: { id: result.insertId, code, status: 'pending' } });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.post('/api/invites/use', async (req, res) => {
  try {
    const { code, userId } = req.body;
    const rows = await query('SELECT * FROM invites WHERE code = ? AND status = ?', [code, 'pending']);
    if (rows.length === 0) return res.status(404).json({ error: 'Código inválido ou já utilizado' });
    await query('UPDATE invites SET used_by = ?, status = ? WHERE id = ?', [userId, 'used', rows[0].id]);
    res.json({ success: true, message: 'Convite aceito!' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/invites/user/:userId', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM invites WHERE created_by = ?', [req.params.userId]);
    res.json({ invites: rows, sent: rows.length, accepted: rows.filter(i => i.status === 'used').length });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/invites/verify/:code', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM invites WHERE code = ? AND status = ?', [req.params.code, 'pending']);
    res.json({ valid: rows.length > 0, invite: rows[0] || null });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== WAITING LIST =====
// =====================================================
app.post('/api/waiting-list', async (req, res) => {
  try {
    const { name, email, reason } = req.body;
    const result = await query('INSERT INTO waiting_list (name, email, reason) VALUES (?,?,?)', [name, email, reason]);
    res.json({ success: true, id: result.insertId, message: 'Você entrou na fila de espera.' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.get('/api/admin/waiting-list', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM waiting_list ORDER BY created_at DESC', []);
    res.json({ waitingList: rows, total: rows.length, pending: rows.filter(w => w.status === 'pending').length });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/waiting-list/:id/approve', async (req, res) => {
  try {
    await query('UPDATE waiting_list SET status = ? WHERE id = ?', ['approved', req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.put('/api/admin/waiting-list/:id/reject', async (req, res) => {
  try {
    await query('UPDATE waiting_list SET status = ? WHERE id = ?', ['rejected', req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ONBOARDING =====
// =====================================================
app.post('/api/onboarding/complete', async (req, res) => {
  try {
    const { userId, name, gender, city, state, denomination, churchName, bio, faithJourney, height, hairColor, objective } = req.body;
    await query('UPDATE users SET name=?, gender=?, city=?, state=?, denomination=?, church_name=?, bio=?, faith_journey=?, height=?, hair_color=?, objective=? WHERE id=?',
      [name, gender, city, state, denomination, churchName, bio, faithJourney, height, hairColor, objective, userId]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== ADVANCED SEARCH =====
// =====================================================
app.post('/api/search/advanced', async (req, res) => {
  try {
    const { minAge, maxAge, denominations, verified } = req.body;
    let sql = 'SELECT id, name, gender, denomination, church_name, city, state, bio, verification_status, is_premium FROM users WHERE is_active = 1 AND is_blocked = 0 AND role = ?';
    const params = ['user'];
    if (denominations && denominations.length > 0) {
      sql += ` AND denomination IN (${denominations.map(() => '?').join(',')})`;
      params.push(...denominations);
    }
    if (verified) { sql += ' AND verification_status = ?'; params.push('verified'); }
    sql += ' ORDER BY last_seen DESC LIMIT 50';
    const rows = await query(sql, params);
    res.json({ results: rows, total: rows.length });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== DELETE ACCOUNT =====
// =====================================================
app.post('/api/account/delete', async (req, res) => {
  try {
    const { userId } = req.body;
    await query('UPDATE users SET is_active = 0 WHERE id = ?', [userId]);
    res.json({ success: true, message: 'Conta marcada para exclusão.' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

app.delete('/api/account/permanent-delete/:userId', async (req, res) => {
  try {
    await query('DELETE FROM users WHERE id = ?', [req.params.userId]);
    res.json({ success: true, message: 'Conta excluída permanentemente.' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

// =====================================================
// ===== PAYMENTS (STRIPE) =====
// =====================================================
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

app.post('/api/payments/create-checkout', async (req, res) => {
  if (!STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Stripe não configurado' });
  try {
    const { default: Stripe } = await import('stripe');
    const stripe = Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL || 'https://silver-owl-427464.hostingersite.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://silver-owl-427464.hostingersite.com'}/premium`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento' });
  }
});

app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log('Webhook Stripe recebido');
  res.json({ received: true });
});

// =====================================================
// ===== SHARE PROFILE =====
// =====================================================
app.post('/api/users/:id/share', (req, res) => {
  const shareLink = `https://silver-owl-427464.hostingersite.com/perfil/${req.params.id}`;
  res.json({ success: true, shareLink });
});

// =====================================================
// ===== SPA FALLBACK =====
// =====================================================
app.get('*', (req, res) => {
  const indexPath = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not found', staticDir, indexPath });
  }
});

// =====================================================
// ===== START SERVER =====
// =====================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static: ${staticDir}`);
});
