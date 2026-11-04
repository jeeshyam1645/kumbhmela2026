-- Applied at runtime by ensureEpCamps() in lib/ep-tent.ts.
-- Keeps the existing Dormitory price (₹999 per person in production) and does not set a family price.
UPDATE camps
SET
  name_en = 'EP Tent – Dormitory (Shared, without beds (floor))',
  name_hi = 'ईपी टेंट – शयनगृह (साझा, बिना बिस्तर, फर्श)',
  description_en = 'The EP tent as a dormitory without beds: a per-person floor stay with a gadda, pillow and blanket, for budget pilgrims and groups.',
  description_hi = 'ईपी टेंट बिना बिस्तर के शयनगृह के रूप में: फर्श पर गद्दा, तकिया और कंबल के साथ प्रति व्यक्ति ठहराव।',
  capacity = 'Per person',
  features = ARRAY['Gadda (mattress)', 'Pillow', 'Blanket', 'Shared floor stay, without beds'],
  image_url = '/media/ep-tent-shared-exterior.webp'
WHERE lower(name_en) IN ('dormitory', 'dorm', 'ep tent – dormitory (shared)');

INSERT INTO camps (name_en, name_hi, description_en, description_hi, price, capacity, features, image_url, total_inventory)
SELECT
  'EP Tent – Family (with beds)',
  'ईपी टेंट – परिवार (बिस्तर के साथ)',
  'The same EP tent for one family, with beds: takht beds, pillows and blankets.',
  'वही ईपी टेंट एक परिवार के लिए, बिस्तर के साथ: तख्त, तकिए और कंबल।',
  0,
  'One family',
  ARRAY['Takht beds', 'Pillows', 'Blankets', 'Whole tent for one family'],
  '/media/ep-tent-family-exterior.webp',
  10
WHERE NOT EXISTS (
  SELECT 1 FROM camps WHERE name_en IN ('EP Tent – Family (with beds)', 'EP Tent – Family')
);

UPDATE camps
SET
  name_en = 'EP Tent – Family (with beds)',
  name_hi = 'ईपी टेंट – परिवार (बिस्तर के साथ)',
  description_en = 'The same EP tent for one family, with beds: takht beds, pillows and blankets.',
  description_hi = 'वही ईपी टेंट एक परिवार के लिए, बिस्तर के साथ: तख्त, तकिए और कंबल।',
  image_url = '/media/ep-tent-family-exterior.webp'
WHERE name_en = 'EP Tent – Family';
