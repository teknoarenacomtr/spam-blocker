-- user_reports tablosuna yeni alanlar ekleme
ALTER TABLE user_reports 
ADD COLUMN IF NOT EXISTS caller_name text,
ADD COLUMN IF NOT EXISTS call_date date,
ADD COLUMN IF NOT EXISTS call_time time,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'PENDING';

-- Mevcut kayıtların durumunu PENDING yap
UPDATE user_reports SET status = 'PENDING' WHERE status IS NULL;
