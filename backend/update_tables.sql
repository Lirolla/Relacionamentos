-- =====================================================
-- CONEXÃO DIVINA - UPDATE TABLES v2.1
-- Tabelas adicionais que faltam no banco
-- =====================================================

-- COMMUNITY POSTS
CREATE TABLE IF NOT EXISTS community_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'geral',
  image_url VARCHAR(500),
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- POST COMMENTS
CREATE TABLE IF NOT EXISTS post_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- POST LIKES
CREATE TABLE IF NOT EXISTS post_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_like (post_id, user_id)
);

-- PRAYER REQUESTS
CREATE TABLE IF NOT EXISTS prayer_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'geral',
  is_urgent BOOLEAN DEFAULT FALSE,
  is_anonymous BOOLEAN DEFAULT FALSE,
  prayer_count INT DEFAULT 0,
  status ENUM('active','answered','closed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- REELS
CREATE TABLE IF NOT EXISTS reels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  description TEXT,
  category VARCHAR(50) DEFAULT 'geral',
  likes_count INT DEFAULT 0,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- REEL COMMENTS
CREATE TABLE IF NOT EXISTS reel_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reel_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reel_id) REFERENCES reels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- REEL LIKES
CREATE TABLE IF NOT EXISTS reel_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reel_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reel_id) REFERENCES reels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_reel_like (reel_id, user_id)
);

-- REPUTATION REVIEWS
CREATE TABLE IF NOT EXISTS reputation_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reviewer_id INT NOT NULL,
  reviewed_user_id INT NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- SAFE MODE SESSIONS
CREATE TABLE IF NOT EXISTS safe_mode_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  contact_name VARCHAR(200),
  contact_phone VARCHAR(20),
  partner_name VARCHAR(200),
  meeting_location VARCHAR(500),
  status ENUM('active','deactivated','emergency') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- USER SETTINGS
CREATE TABLE IF NOT EXISTS user_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  settings JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- WAITING LIST
CREATE TABLE IF NOT EXISTS waiting_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  reason TEXT,
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BIBLE READING PLANS
CREATE TABLE IF NOT EXISTS bible_reading_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration_days INT DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BIBLE READING DAYS
CREATE TABLE IF NOT EXISTS bible_reading_days (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_id INT NOT NULL,
  day_number INT NOT NULL,
  passage VARCHAR(200) NOT NULL,
  reflection TEXT,
  FOREIGN KEY (plan_id) REFERENCES bible_reading_plans(id) ON DELETE CASCADE
);

-- USER BIBLE PLANS
CREATE TABLE IF NOT EXISTS user_bible_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id INT NOT NULL,
  current_day INT DEFAULT 1,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES bible_reading_plans(id) ON DELETE CASCADE
);

-- COUPLE DEVOTIONALS
CREATE TABLE IF NOT EXISTS couple_devotionals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  verse TEXT,
  reference VARCHAR(100),
  reflection TEXT,
  prayer TEXT,
  completed_by JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
);

-- CALLS
CREATE TABLE IF NOT EXISTS calls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  caller_id INT NOT NULL,
  receiver_id INT NOT NULL,
  type ENUM('audio','video') DEFAULT 'audio',
  status ENUM('ringing','active','ended','missed') DEFAULT 'ringing',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answered_at TIMESTAMP NULL,
  ended_at TIMESTAMP NULL,
  FOREIGN KEY (caller_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- PRAYERS (orações individuais)
CREATE TABLE IF NOT EXISTS prayers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  is_answered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- LIMPAR DADOS FAKE E INSERIR ADMIN REAL
-- =====================================================
DELETE FROM users WHERE email != 'contato@lirolla.com';
DELETE FROM churches;
DELETE FROM events;

-- INSERIR ADMIN (contato@lirolla.com / Pagotto24)
INSERT INTO users (name, email, password_hash, birth_date, gender, denomination, church_name, role, is_premium, is_active, verification_status)
VALUES ('Admin Lirolla', 'contato@lirolla.com', '$2b$10$z6hp416vKSAoMfeZao3f3uKIX3K1cDsmPOPSVPPwEkBf/ibVhU1UK', '1990-01-01', 'male', 'Outra', 'Administração', 'admin', TRUE, TRUE, 'verified')
ON DUPLICATE KEY UPDATE password_hash = '$2b$10$z6hp416vKSAoMfeZao3f3uKIX3K1cDsmPOPSVPPwEkBf/ibVhU1UK', role = 'admin', is_premium = TRUE, verification_status = 'verified';

-- INTERESSES PADRÃO
INSERT IGNORE INTO interests (name, category, icon) VALUES
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
