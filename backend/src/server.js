import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir uploads de fotos
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// ===== ADMIN LOGIN =====
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'admin-token-' + Date.now(), message: 'Login realizado com sucesso' });
  } else {
    res.status(401).json({ error: 'Usuario ou senha incorretos' });
  }
});

// ===== ADMIN STATS =====
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalUsers: 5,
    activeSubscriptions: 3,
    totalChurches: 4,
    pendingReports: 2,
    monthlyRevenue: 89.70,
  });
});

// ===== ADMIN USERS =====
app.get('/api/admin/users', (req, res) => {
  res.json([]);
});

app.put('/api/admin/users/:id/block', (req, res) => {
  res.json({ message: 'Usuario bloqueado' });
});

app.put('/api/admin/users/:id/unblock', (req, res) => {
  res.json({ message: 'Usuario desbloqueado' });
});

app.delete('/api/admin/users/:id', (req, res) => {
  res.json({ message: 'Usuario excluido' });
});

// ===== ADMIN REPORTS (DENUNCIAS) =====
app.get('/api/admin/reports', (req, res) => {
  res.json([]);
});

app.put('/api/admin/reports/:id/resolve', (req, res) => {
  const { action } = req.body;
  res.json({ message: `Denuncia ${action === 'ban' ? 'resolvida com banimento' : 'descartada'}` });
});

// ===== MODERATION (DENUNCIA DO USUARIO) =====
app.post('/api/moderation/report', (req, res) => {
  const { reporter_id, reported_user_id, reason, description } = req.body;
  console.log('Nova denuncia:', { reporter_id, reported_user_id, reason, description });
  res.json({ message: 'Denuncia registrada com sucesso', id: 'report_' + Date.now() });
});

// ===== USERS =====
app.put('/api/users/:id/location', (req, res) => {
  const { latitude, longitude } = req.body;
  res.json({ message: 'Localizacao atualizada', latitude, longitude });
});

app.get('/api/users/nearby', (req, res) => {
  res.json([]);
});

// ===== PAYMENTS (STRIPE) =====
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

app.post('/api/payments/create-checkout', async (req, res) => {
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe nao configurado. Configure STRIPE_SECRET_KEY no .env' });
  }
  try {
    const stripe = (await import('stripe')).default(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/premium`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Erro Stripe:', error.message);
    res.status(500).json({ error: 'Erro ao criar sessao de pagamento' });
  }
});

app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log('Webhook recebido');
  res.json({ received: true });
});

app.post('/api/payments/portal', async (req, res) => {
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe nao configurado' });
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

// ===== ADMIN SUBSCRIPTIONS =====
app.get('/api/admin/subscriptions', (req, res) => {
  res.json([]);
});

// ===== ADMIN CHURCHES =====
app.get('/api/admin/churches', (req, res) => {
  res.json([]);
});

app.put('/api/admin/churches/:id/verify', (req, res) => {
  res.json({ message: 'Igreja verificada' });
});

// ===== ADMIN EVENTS =====
app.get('/api/admin/events', (req, res) => {
  res.json([]);
});

// ===== UPLOAD DE FOTOS =====
app.post('/api/photos/upload', (req, res) => {
  res.json({ message: 'Foto enviada', url: '/uploads/photos/default.jpg' });
});

app.delete('/api/photos/:id', (req, res) => {
  res.json({ message: 'Foto deletada' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
