-- =====================================================
-- CONEXÃO DIVINA - DATABASE COMPLETO v6.0
-- Para importar no phpMyAdmin da Hostinger
-- Banco: u219024948_cristo
-- =====================================================

-- =====================================================
-- TABELA DE USUÁRIOS
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
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
  favorite_verse TEXT,
  worship_style VARCHAR(100),
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
  video_verification_status ENUM('none','pending','verified','rejected') DEFAULT 'none',
  video_verification_url VARCHAR(500),
  pastor_verification_status ENUM('none','pending','verified','rejected') DEFAULT 'none',
  pastor_name VARCHAR(200),
  pastor_church VARCHAR(200),
  reputation_score DECIMAL(3,2) DEFAULT 0.00,
  reputation_count INT DEFAULT 0,
  profile_views INT DEFAULT 0,
  likes_received INT DEFAULT 0,
  likes_given INT DEFAULT 0,
  invite_code VARCHAR(20) UNIQUE,
  invited_by INT NULL,
  invite_status ENUM('invited','waiting','approved','rejected') DEFAULT 'waiting',
  invites_available INT DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  block_reason TEXT,
  deletion_requested_at TIMESTAMP NULL,
  deletion_scheduled_at TIMESTAMP NULL,
  push_token VARCHAR(500),
  dark_mode BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE FOTOS
-- =====================================================
CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE SWIPES
-- =====================================================
CREATE TABLE IF NOT EXISTS swipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  swiper_id INT NOT NULL,
  swiped_id INT NOT NULL,
  direction ENUM('like','dislike','superlike') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (swiper_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (swiped_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_swipe (swiper_id, swiped_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE MATCHES
-- =====================================================
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_match (user1_id, user2_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE MENSAGENS
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  message_type ENUM('text','image','audio','icebreaker','devotional','sticker','gif') DEFAULT 'text',
  audio_url VARCHAR(500),
  audio_duration INT DEFAULT 0,
  sticker_id VARCHAR(50),
  gif_url VARCHAR(500),
  status ENUM('sent','delivered','read') DEFAULT 'sent',
  read_at TIMESTAMP NULL,
  reactions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE DENÚNCIAS
-- =====================================================
CREATE TABLE IF NOT EXISTS reports (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE IGREJAS
-- =====================================================
CREATE TABLE IF NOT EXISTS churches (
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
  worship_times TEXT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE EVENTOS
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE PARTICIPANTES DE EVENTOS
-- =====================================================
CREATE TABLE IF NOT EXISTS event_attendees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  status ENUM('confirmed','pending','cancelled') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_attendee (event_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE STORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  media_type ENUM('photo','video','text') DEFAULT 'photo',
  media_url VARCHAR(500),
  caption TEXT,
  filter_name VARCHAR(50),
  stickers JSON,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE VISUALIZAÇÕES DE STORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS story_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  story_id INT NOT NULL,
  viewer_id INT NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
  FOREIGN KEY (viewer_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_view (story_id, viewer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE ASSINATURAS
-- =====================================================
CREATE TABLE IF NOT EXISTS subscriptions (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE VERIFICAÇÕES DE IDENTIDADE
-- =====================================================
CREATE TABLE IF NOT EXISTS verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('selfie','document','video','pastoral') DEFAULT 'selfie',
  photo_url VARCHAR(500),
  video_url VARCHAR(500),
  phrase_used TEXT,
  pastor_name VARCHAR(200),
  pastor_church VARCHAR(200),
  pastor_phone VARCHAR(20),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  rejection_reason TEXT,
  reviewed_by INT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE RESET DE SENHA
-- =====================================================
CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE NOTIFICAÇÕES
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('match','message','like','event','system','verification','prayer','community','devotional','premium') NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE BLOQUEIOS ENTRE USUÁRIOS
-- =====================================================
CREATE TABLE IF NOT EXISTS user_blocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blocker_id INT NOT NULL,
  blocked_id INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (blocked_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_block (blocker_id, blocked_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE INTERESSES/TAGS
-- =====================================================
CREATE TABLE IF NOT EXISTS interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50),
  icon VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_interests (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE POSTS DA COMUNIDADE (Feed tipo Instagram)
-- =====================================================
CREATE TABLE IF NOT EXISTS community_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  category ENUM('testemunho','devocional','louvor','reflexao','evento','oracao','geral') DEFAULT 'geral',
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE LIKES EM POSTS
-- =====================================================
CREATE TABLE IF NOT EXISTS post_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_like (post_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE COMENTÁRIOS EM POSTS
-- =====================================================
CREATE TABLE IF NOT EXISTS post_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE PEDIDOS DE ORAÇÃO
-- =====================================================
CREATE TABLE IF NOT EXISTS prayer_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  category ENUM('saude','familia','trabalho','relacionamento','espiritual','financeiro','outro') DEFAULT 'outro',
  is_urgent BOOLEAN DEFAULT FALSE,
  is_anonymous BOOLEAN DEFAULT FALSE,
  prayer_count INT DEFAULT 0,
  is_answered BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE ORAÇÕES (quem orou por quem)
-- =====================================================
CREATE TABLE IF NOT EXISTS prayers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  prayer_request_id INT NOT NULL,
  user_id INT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prayer_request_id) REFERENCES prayer_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_prayer (prayer_request_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE DEVOCIONAIS DO CASAL
-- =====================================================
CREATE TABLE IF NOT EXISTS couple_devotionals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  verse TEXT NOT NULL,
  verse_reference VARCHAR(100) NOT NULL,
  reflection TEXT,
  question TEXT,
  prayer TEXT,
  shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE REELS CRISTÃOS
-- =====================================================
CREATE TABLE IF NOT EXISTS reels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  caption TEXT,
  category ENUM('louvor','testemunho','devocional','igreja','reflexao','humor','geral') DEFAULT 'geral',
  music_name VARCHAR(200),
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  views_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE LIKES EM REELS
-- =====================================================
CREATE TABLE IF NOT EXISTS reel_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reel_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reel_id) REFERENCES reels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_reel_like (reel_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE COMENTÁRIOS EM REELS
-- =====================================================
CREATE TABLE IF NOT EXISTS reel_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reel_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reel_id) REFERENCES reels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE AVALIAÇÕES (Sistema de Reputação)
-- =====================================================
CREATE TABLE IF NOT EXISTS reputation_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reviewer_id INT NOT NULL,
  reviewed_id INT NOT NULL,
  match_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  traits JSON,
  comment TEXT,
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  UNIQUE KEY unique_review (reviewer_id, reviewed_id, match_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE PLANOS DE LEITURA BÍBLICA
-- =====================================================
CREATE TABLE IF NOT EXISTS bible_reading_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  total_days INT NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS bible_reading_days (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_id INT NOT NULL,
  day_number INT NOT NULL,
  verse TEXT NOT NULL,
  verse_reference VARCHAR(100) NOT NULL,
  reflection TEXT,
  question TEXT,
  FOREIGN KEY (plan_id) REFERENCES bible_reading_plans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_bible_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  match_id INT,
  plan_id INT NOT NULL,
  current_day INT DEFAULT 1,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE SET NULL,
  FOREIGN KEY (plan_id) REFERENCES bible_reading_plans(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE CONVITES (Sistema estilo Orkut)
-- =====================================================
CREATE TABLE IF NOT EXISTS invites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inviter_id INT NOT NULL,
  invite_code VARCHAR(20) NOT NULL UNIQUE,
  invitee_email VARCHAR(255),
  invitee_name VARCHAR(100),
  status ENUM('pending','accepted','expired') DEFAULT 'pending',
  accepted_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  FOREIGN KEY (inviter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (accepted_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE FILA DE ESPERA (quem se cadastrou sem convite)
-- =====================================================
CREATE TABLE IF NOT EXISTS waiting_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  denomination VARCHAR(100),
  church_name VARCHAR(200),
  reason TEXT,
  status ENUM('waiting','approved','rejected') DEFAULT 'waiting',
  approved_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE CHAMADAS (Áudio/Vídeo)
-- =====================================================
CREATE TABLE IF NOT EXISTS calls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  caller_id INT NOT NULL,
  receiver_id INT NOT NULL,
  match_id INT NOT NULL,
  call_type ENUM('audio','video') NOT NULL,
  status ENUM('ringing','active','ended','missed','rejected') DEFAULT 'ringing',
  started_at TIMESTAMP NULL,
  ended_at TIMESTAMP NULL,
  duration INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caller_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE MODO SEGURO (Acompanhante)
-- =====================================================
CREATE TABLE IF NOT EXISTS safe_mode_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  match_id INT NOT NULL,
  emergency_contact_name VARCHAR(100) NOT NULL,
  emergency_contact_phone VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  last_checkin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABELA DE CONFIGURAÇÕES DO USUÁRIO
-- =====================================================
CREATE TABLE IF NOT EXISTS user_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  push_matches BOOLEAN DEFAULT TRUE,
  push_messages BOOLEAN DEFAULT TRUE,
  push_likes BOOLEAN DEFAULT TRUE,
  push_events BOOLEAN DEFAULT TRUE,
  push_prayers BOOLEAN DEFAULT TRUE,
  push_community BOOLEAN DEFAULT TRUE,
  push_devotional BOOLEAN DEFAULT TRUE,
  sound_enabled BOOLEAN DEFAULT TRUE,
  vibration_enabled BOOLEAN DEFAULT TRUE,
  show_online_status BOOLEAN DEFAULT TRUE,
  show_last_seen BOOLEAN DEFAULT TRUE,
  show_read_receipts BOOLEAN DEFAULT TRUE,
  show_distance BOOLEAN DEFAULT TRUE,
  show_age BOOLEAN DEFAULT TRUE,
  profile_visibility ENUM('everyone','matches','nobody') DEFAULT 'everyone',
  language VARCHAR(10) DEFAULT 'pt-BR',
  dark_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(latitude, longitude);
CREATE INDEX idx_users_denomination ON users(denomination);
CREATE INDEX idx_users_active ON users(is_active, is_blocked);
CREATE INDEX idx_users_invite_code ON users(invite_code);
CREATE INDEX idx_users_invite_status ON users(invite_status);
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
CREATE INDEX idx_community_posts_user ON community_posts(user_id);
CREATE INDEX idx_community_posts_category ON community_posts(category);
CREATE INDEX idx_prayer_requests_user ON prayer_requests(user_id);
CREATE INDEX idx_prayer_requests_category ON prayer_requests(category);
CREATE INDEX idx_reels_user ON reels(user_id);
CREATE INDEX idx_reels_category ON reels(category);
CREATE INDEX idx_invites_code ON invites(invite_code);
CREATE INDEX idx_waiting_list_status ON waiting_list(status);

-- =====================================================
-- DADOS DE EXEMPLO
-- =====================================================

-- Admin
INSERT INTO users (name, email, password_hash, birth_date, gender, denomination, church_name, church_role, bio, faith_journey, height, hair_color, city, state, role, is_premium, verification_status, invite_code, invite_status) VALUES
('Admin', 'admin@conexaodivina.com.br', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1990-01-01', 'male', 'Batista', 'Batista Memorial', 'Administrador', 'Administrador do sistema', 'Servo de Deus', 180, 'Preto', 'São Paulo', 'SP', 'admin', TRUE, 'verified', 'ADMIN2026', 'approved');

-- (Dados de exemplo removidos - usar apenas dados reais do banco)

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

-- Planos de Leitura Bíblica
INSERT INTO bible_reading_plans (title, description, total_days) VALUES
('21 Dias sobre o Amor', 'Um plano de 21 dias explorando o amor de Deus e o amor entre casais na Bíblia', 21),
('14 Dias de Fé a Dois', 'Fortaleça sua fé como casal em 14 dias de leitura bíblica', 14),
('7 Dias de Propósito', 'Descubra o propósito de Deus para seu relacionamento em 7 dias', 7);
