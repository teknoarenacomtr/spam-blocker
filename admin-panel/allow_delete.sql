-- user_reports tablosu için DELETE (Silme) izni
-- Şu an muhtemelen sadece SELECT ve INSERT açık, DELETE kapalı olduğu için silemiyorsunuz.

create policy "Public Delete Access"
on user_reports
for delete
to anon, authenticated
using (true);
