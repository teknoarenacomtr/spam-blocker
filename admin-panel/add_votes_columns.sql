-- user_reports tablosuna oylama sütunlarını ekle
ALTER TABLE user_reports 
ADD COLUMN IF NOT EXISTS votes_up int DEFAULT 0,
ADD COLUMN IF NOT EXISTS votes_down int DEFAULT 0;

-- Eğer mevcut kayıtlar varsa null olmasınlar diye 0 yap
UPDATE user_reports SET votes_up = 0 WHERE votes_up IS NULL;
UPDATE user_reports SET votes_down = 0 WHERE votes_down IS NULL;
