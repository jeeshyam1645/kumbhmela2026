-- Applied at runtime by ensureEpCamps() in lib/ep-tent.ts.
-- Keeps the existing Dormitory price (₹999 per person in production) and does not set a family price.
UPDATE camps
SET
  name_en = 'EP Tent – Dormitory (Shared)',
  name_hi = 'ईपी टेंट – शयनगृह (साझा)',
  description_en = 'The EP tent as a dormitory: a per-person floor stay with a gadda, pillow and blanket, for budget pilgrims and groups.',
  description_hi = 'ईपी टेंट शयनगृह के रूप में: फर्श पर गद्दा, तकिया और कंबल के साथ प्रति व्यक्ति ठहराव, बजट तीर्थयात्रियों और समूहों के लिए।',
  capacity = 'Per person',
  features = ARRAY['Gadda (mattress)', 'Pillow', 'Blanket', 'Shared floor stay'],
  image_url = '/media/ep-tent-exterior.webp'
WHERE lower(name_en) IN ('dormitory', 'dorm');

INSERT INTO camps (name_en, name_hi, description_en, description_hi, price, capacity, features, image_url, total_inventory)
SELECT
  'EP Tent – Family',
  'ईपी टेंट – परिवार',
  'The same EP tent for one family, with takht beds, pillows and blankets.',
  'वही ईपी टेंट एक परिवार के लिए, तख्त, तकिए और कंबल के साथ।',
  0,
  'One family',
  ARRAY['Takht beds', 'Pillows', 'Blankets', 'Whole tent for one family'],
  '/media/ep-tent-exterior.webp',
  10
WHERE NOT EXISTS (
  SELECT 1 FROM camps WHERE name_en = 'EP Tent – Family'
);
