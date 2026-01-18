-- spam_rules tablosuna açıklama kolonu ekleme
alter table spam_rules 
add column if not exists description text;
