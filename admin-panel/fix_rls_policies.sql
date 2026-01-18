-- user_reports tablosu için RLS politikaları
-- Bu tabloya herkesin (anonim kullanıcılar dahil) okuma (SELECT) ve yazma (INSERT) yetkisi olmalı.

-- RLS'i etkinleştir (zaten etkinse hata vermez)
alter table user_reports enable row level security;

-- 1. Okuma Politikası (Herkese Açık)
create policy "Public Select Access"
on user_reports
for select
to anon, authenticated
using (true);

-- 2. Yazma Politikası (Herkese Açık)
-- Not: Daha önce insert yapılabiliyordu ama garantiye alalım
create policy "Public Insert Access"
on user_reports
for insert
to anon, authenticated
with check (true);

-- spam_rules için okuma politikası (zaten vardır muhtemelen ama garanti olsun)
create policy "Public Read Spam Rules"
on spam_rules
for select
to anon, authenticated
using (true);
