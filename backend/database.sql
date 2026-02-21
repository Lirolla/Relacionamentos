-- =====================================================
-- CONEXÃO DIVINA - DATABASE SCHEMA v2.0
-- Melhor app de relacionamento cristão do Brasil
-- =====================================================

CREATE DATABASE IF NOT EXISTS conexao_divina;
USE conexao_divina;

-- =====================================================
-- TABELA DE USUÁRIOS
-- =====================================================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  birth_date DATE,
  gender ENUM('male','female') NOT NULL,
  denomination VARCHAR(100),
  church_name VARCHAR(200),
  church_role VARCHAR(100) DEFAULT 'Membro',
  church_frequency VARCHAR(50),
  bio TEXT,
  faith_journey TEXT,
  height INT,
  hair_color VARCHAR(50),
  eye_color VARCHAR(50),
  skin_tone VARCHAR(50),
  marital_status ENUM('single','divorced','widowed') DEFAULT 'single',
  has_children BOOLEAN DEFAULT FALSE,
  objective VARCHAR(100),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  city VARCHAR(100),
  state VARCHAR(50),
  location_verified BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  role ENUM('user','admin') DEFAULT 'user',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  verification_status ENUM('none','pending','verified','rejected') DEFAULT 'none',
  verification_photo VARCHAR(500),
  profile_views INT DEFAULT 0,
  likes_received INT DEFAULT 0,
  likes_given INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  block_reason TEXT,
  push_token VARCHAR(500),
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE FOTOS
-- =====================================================
CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABELA DE SWIPES
-- =====================================================
CREATE TABLE swipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  swiper_id INT NOT NULL,
  swiped_id INT NOT NULL,
  direction ENUM('like','dislike','superlike') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (swiper_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (swiped_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_swipe (swiper_id, swiped_id)
);

-- =====================================================
-- TABELA DE MATCHES
-- =====================================================
CREATE TABLE matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_match (user1_id, user2_id)
);

-- =====================================================
-- TABELA DE MENSAGENS
-- =====================================================
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  message_type ENUM('text','image','audio','icebreaker') DEFAULT 'text',
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABELA DE DENÚNCIAS
-- =====================================================
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reporter_id INT NOT NULL,
  reported_user_id INT NOT NULL,
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  evidence_url VARCHAR(500),
  status ENUM('pending','investigating','resolved','dismissed') DEFAULT 'pending',
  resolution ENUM('ban','warn','dismiss') NULL,
  admin_notes TEXT,
  resolved_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reported_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- TABELA DE IGREJAS
-- =====================================================
CREATE TABLE churches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  denomination VARCHAR(100),
  pastor VARCHAR(200),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(500),
  image_url VARCHAR(500),
  members_count INT DEFAULT 0,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE EVENTOS
-- =====================================================
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  end_date DATE,
  location VARCHAR(500),
  church_id INT,
  creator_id INT,
  category ENUM('retiro','social','conferencia','culto','estudo_biblico','jantar','voluntariado','outro') DEFAULT 'outro',
  image_url VARCHAR(500),
  max_participants INT DEFAULT 100,
  current_participants INT DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE SET NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- TABELA DE PARTICIPANTES DE EVENTOS
-- =====================================================
CREATE TABLE event_attendees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  status ENUM('confirmed','pending','cancelled') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_attendee (event_id, user_id)
);

-- =====================================================
-- TABELA DE STORIES
-- =====================================================
CREATE TABLE stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABELA DE VISUALIZAÇÕES DE STORIES
-- =====================================================
CREATE TABLE story_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  story_id INT NOT NULL,
  viewer_id INT NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
  FOREIGN KEY (viewer_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_view (story_id, viewer_id)
);

-- =====================================================
-- TABELA DE ASSINATURAS
-- =====================================================
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan ENUM('monthly','quarterly','annual') NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status ENUM('active','cancelled','expired','past_due') DEFAULT 'active',
  stripe_subscription_id VARCHAR(255),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cancelled_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABELA DE VERIFICAÇÕES DE IDENTIDADE
-- =====================================================
CREATE TABLE verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('selfie','document','video') DEFAULT 'selfie',
  photo_url VARCHAR(500),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  rejection_reason TEXT,
  reviewed_by INT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- TABELA DE RESET DE SENHA
-- =====================================================
CREATE TABLE password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABELA DE NOTIFICAÇÕES
-- =====================================================
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('match','message','like','event','system','verification') NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- TABELA DE BLOQUEIOS ENTRE USUÁRIOS
-- =====================================================
CREATE TABLE user_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blocker_id INT NOT NULL,
  blocked_id INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (blocked_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_block (blocker_id, blocked_id)
);

-- =====================================================
-- TABELA DE INTERESSES/TAGS
-- =====================================================
CREATE TABLE interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50),
  icon VARCHAR(50)
);

CREATE TABLE user_interests (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(latitude, longitude);
CREATE INDEX idx_users_denomination ON users(denomination);
CREATE INDEX idx_users_active ON users(is_active, is_blocked);
CREATE INDEX idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX idx_swipes_swiped ON swipes(swiped_id);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_stories_expires ON stories(expires_at);
CREATE INDEX idx_stories_user ON stories(user_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_active ON events(is_active);
CREATE INDEX idx_churches_verified ON churches(is_verified);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_verifications_status ON verifications(status);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

-- =====================================================
-- DADOS DE EXEMPLO
-- =====================================================

-- Admin
INSERT INTO users (name, email, password_hash, birth_date, gender, denomination, church_name, church_role, bio, faith_journey, height, hair_color, city, state, role, is_premium, verification_status) VALUES
('Admin', 'admin@conexaodivina.com.br', '$2b$10$adminHash', '1990-01-01', 'male', 'Batista', 'Batista Memorial', 'Administrador', 'Administrador do sistema', 'Servo de Deus', 180, 'Preto', 'São Paulo', 'SP', 'admin', TRUE, 'verified');

-- Usuários
INSERT INTO users (name, email, password_hash, birth_date, gender, denomination, church_name, church_role, bio, faith_journey, height, hair_color, objective, city, state, is_premium, verification_status) VALUES
('João Silva', 'joao@email.com', '$2b$10$example1', '1990-01-15', 'male', 'Batista', 'Igreja Batista Central', 'Membro', 'Servo de Deus buscando minha companheira na fé', 'Convertido há 15 anos', 178, 'Castanho', 'Casamento', 'São Paulo', 'SP', TRUE, 'verified'),
('Maria Santos', 'maria@email.com', '$2b$10$example2', '1993-06-20', 'female', 'Presbiteriana', 'Igreja Presbiteriana', 'Líder de Louvor', 'Apaixonada por Jesus e por servir ao próximo', 'Nascida em berço cristão', 165, 'Preto', 'Namoro sério', 'Rio de Janeiro', 'RJ', FALSE, 'verified'),
('Pedro Oliveira', 'pedro@email.com', '$2b$10$example3', '1988-03-10', 'male', 'Assembleia de Deus', 'AD Vitória', 'Diácono', 'Líder de louvor buscando alguém para caminhar junto', 'Caminhando com Cristo há 20 anos', 182, 'Loiro', 'Casamento', 'Belo Horizonte', 'MG', TRUE, 'none'),
('Ana Costa', 'ana@email.com', '$2b$10$example4', '1995-11-05', 'female', 'Católica', 'Paróquia São José', 'Professora EBD', 'Professora de escola dominical', 'Firme na rocha que é Cristo', 160, 'Ruivo', 'Namoro sério', 'Curitiba', 'PR', FALSE, 'pending'),
('Lucas Ferreira', 'lucas@email.com', '$2b$10$example5', '1991-08-22', 'male', 'Metodista', 'Igreja Metodista Central', 'Músico', 'Missionário e apaixonado por missões', 'Servindo a Deus desde jovem', 175, 'Preto', 'Amizade cristã', 'Salvador', 'BA', FALSE, 'none');

-- Igrejas
INSERT INTO churches (name, denomination, pastor, address, city, state, phone, email, members_count, is_verified) VALUES
('Igreja Batista Central', 'Batista', 'Pr. João Silva', 'Rua das Flores, 123', 'São Paulo', 'SP', '(11) 99999-0001', 'contato@batistamemorial.com.br', 350, TRUE),
('Igreja Presbiteriana do Brasil', 'Presbiteriana', 'Pr. Marcos Oliveira', 'Rua dos Pinheiros, 200', 'Rio de Janeiro', 'RJ', '(21) 99999-0002', 'contato@ipb.com.br', 600, TRUE),
('Assembleia de Deus Vitória', 'Assembleia de Deus', 'Pr. Samuel Ferreira', 'Rua do Brás, 500', 'Belo Horizonte', 'MG', '(31) 99999-0003', 'contato@advitoria.com.br', 5000, FALSE),
('Paróquia São José', 'Católica', 'Pe. Antônio', 'Av. Brasil, 1000', 'Curitiba', 'PR', '(41) 99999-0004', 'contato@saojose.com.br', 800, TRUE),
('Igreja Metodista Central', 'Metodista', 'Pr. Carlos Moura', 'Rua Vergueiro, 800', 'Salvador', 'BA', '(71) 99999-0005', 'contato@metodista.com.br', 400, FALSE);

-- Eventos
INSERT INTO events (title, description, date, time, end_date, location, church_id, creator_id, category, max_participants, current_participants, price, is_free) VALUES
('Retiro de Solteiros 2026', 'Um fim de semana especial para solteiros cristãos', '2026-03-15', '08:00', '2026-03-17', 'Sítio Recanto da Paz - Mairiporã, SP', 1, 1, 'retiro', 80, 45, 250.00, FALSE),
('Louvor & Café', 'Uma noite de louvor, café gourmet e networking cristão', '2026-03-01', '19:00', '2026-03-01', 'Café Cristão - Av. Paulista, 1000', 2, 2, 'social', 50, 32, 0, TRUE),
('Conferência Amor & Propósito', 'Palestrantes renomados falam sobre relacionamentos', '2026-04-10', '14:00', '2026-04-12', 'Centro de Convenções - São Paulo', 3, 3, 'conferencia', 500, 180, 120.00, FALSE);

-- Interesses
INSERT INTO interests (name, category, icon) VALUES
('Oração', 'Espiritual', 'pray'),
('Louvor', 'Espiritual', 'music'),
('Estudo Bíblico', 'Espiritual', 'book'),
('Missões', 'Espiritual', 'globe'),
('Voluntariado', 'Social', 'heart'),
('Esportes', 'Lazer', 'activity'),
('Viagens', 'Lazer', 'map'),
('Café', 'Lazer', 'coffee'),
('Leitura', 'Cultura', 'book-open'),
('Música', 'Cultura', 'headphones'),
('Tecnologia', 'Profissional', 'code'),
('Educação', 'Profissional', 'graduation-cap'),
('Culinária', 'Lazer', 'utensils'),
('Fotografia', 'Cultura', 'camera'),
('Teologia', 'Espiritual', 'cross');
