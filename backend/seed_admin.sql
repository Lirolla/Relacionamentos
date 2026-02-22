-- =====================================================
-- INSERIR ADMIN: contato@lirolla.com / Pagotto24
-- Rodar no phpMyAdmin do banco u219024948_cristo
-- =====================================================

INSERT INTO users (name, email, password_hash, birth_date, gender, denomination, church_name, role, is_premium, is_active, verification_status)
VALUES ('Admin Lirolla', 'contato@lirolla.com', '$2b$10$z6hp416vKSAoMfeZao3f3uKIX3K1cDsmPOPSVPPwEkBf/ibVhU1UK', '1990-01-01', 'male', 'Outra', 'Administração', 'admin', TRUE, TRUE, 'verified')
ON DUPLICATE KEY UPDATE password_hash = '$2b$10$z6hp416vKSAoMfeZao3f3uKIX3K1cDsmPOPSVPPwEkBf/ibVhU1UK', role = 'admin', is_premium = TRUE, verification_status = 'verified';
