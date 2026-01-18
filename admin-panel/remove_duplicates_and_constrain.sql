-- 1. Önce çift kayıtları temizle (Sadece en son ekleneni tut)
DELETE FROM spam_rules a USING spam_rules b
WHERE a.id < b.id 
AND a.value = b.value 
AND a.type = b.type;

-- 2. Unique Constraint Ekle (Artık aynı numara/değer tekrar eklenemez)
ALTER TABLE spam_rules 
ADD CONSTRAINT spam_rules_value_type_key UNIQUE (value, type);
