CREATE DATABASE IF NOT EXISTS conexao_divina;
USE conexao_divina;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  birth_date DATE,
  gender ENUM('male','female') NOT NULL,
  denomination VARCHAR(100),
  church_name VARCHAR(200),
  church_frequency VARCHAR(50),
  bio TEXT,
  height INT,
  hair_color VARCHAR(50),
  objective VARCHAR(100),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  city VARCHAR(100),
  state VARCHAR(50),
  location_verified BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  verification_status ENUM('none','pending','verified','rejected') DEFAULT 'none',
  verification_photo VARCHAR(500),
  profile_views INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  push_token VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE swipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  swiper_id INT NOT NULL,
  swiped_id INT NOT NULL,
  direction ENUM('like','dislike') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (swiper_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (swiped_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_swipe (swiper_id, swiped_id)
);

CREATE TABLE matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reporter_id INT NOT NULL,
  reported_user_id INT NOT NULL,
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('pending','resolved','dismissed') DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reported_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE churches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  denomination VARCHAR(100),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location VARCHAR(500),
  church_id INT,
  creator_id INT NOT NULL,
  type ENUM('culto','retiro','conferencia','jantar','estudo_biblico') DEFAULT 'culto',
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE SET NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE event_attendees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_attendee (event_id, user_id)
);

CREATE TABLE stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(latitude, longitude);
CREATE INDEX idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_stories_expires ON stories(expires_at);

-- Dados de exemplo
INSERT INTO users (name, email, password_hash, birth_date, gender, denomination, church_name, bio, height, hair_color, objective, city, state, is_premium, verification_status) VALUES
('João Silva', 'joao@email.com', '$2b$10$example1', '1990-01-15', 'male', 'Batista', 'Igreja Batista Central', 'Servo de Deus buscando minha companheira na fé', 178, 'Castanho', 'Casamento', 'São Paulo', 'SP', TRUE, 'verified'),
('Maria Santos', 'maria@email.com', '$2b$10$example2', '1993-06-20', 'female', 'Presbiteriana', 'Igreja Presbiteriana', 'Apaixonada por Jesus e por servir ao próximo', 165, 'Preto', 'Namoro sério', 'Rio de Janeiro', 'RJ', FALSE, 'verified'),
('Pedro Oliveira', 'pedro@email.com', '$2b$10$example3', '1988-03-10', 'male', 'Assembleia de Deus', 'AD Vitória', 'Líder de louvor buscando alguém para caminhar junto', 182, 'Loiro', 'Casamento', 'Belo Horizonte', 'MG', TRUE, 'none'),
('Ana Costa', 'ana@email.com', '$2b$10$example4', '1995-11-05', 'female', 'Católica', 'Paróquia São José', 'Professora de escola dominical', 160, 'Ruivo', 'Namoro sério', 'Curitiba', 'PR', FALSE, 'pending'),
('Lucas Ferreira', 'lucas@email.com', '$2b$10$example5', '1991-08-22', 'male', 'Metodista', 'Igreja Metodista Central', 'Missionário e apaixonado por missões', 175, 'Preto', 'Amizade cristã', 'Salvador', 'BA', FALSE, 'none');

INSERT INTO churches (name, denomination, city, state, verified) VALUES
('Igreja Batista Central', 'Batista', 'São Paulo', 'SP', TRUE),
('Igreja Presbiteriana do Brasil', 'Presbiteriana', 'Rio de Janeiro', 'RJ', TRUE),
('Assembleia de Deus Vitória', 'Assembleia de Deus', 'Belo Horizonte', 'MG', FALSE),
('Paróquia São José', 'Católica', 'Curitiba', 'PR', TRUE);

INSERT INTO events (title, description, date, time, location, church_id, creator_id, type) VALUES
('Retiro de Casais', 'Retiro especial para casais e solteiros que buscam relacionamento', '2026-03-15', '08:00', 'Chácara Esperança, SP', 1, 1, 'retiro'),
('Culto de Jovens', 'Culto especial para jovens com louvor e palavra', '2026-03-01', '19:30', 'Igreja Presbiteriana, RJ', 2, 2, 'culto'),
('Conferência de Solteiros', 'Conferência sobre relacionamentos cristãos', '2026-04-10', '14:00', 'Centro de Convenções, MG', 3, 3, 'conferencia');
