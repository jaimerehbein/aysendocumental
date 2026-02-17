-- 1. Update videos table schema for Series hierarchy
ALTER TABLE videos 
ADD COLUMN IF NOT EXISTS is_series BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS series_id INTEGER REFERENCES videos(id),
ADD COLUMN IF NOT EXISTS season_number INTEGER,
ADD COLUMN IF NOT EXISTS episode_number INTEGER;

-- 2. Create parent Series records (e.g., 'Atlas Audiovisual' as a series container)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Atlas Audiovisual de Aysén',
  'Una serie documental que cataloga la biodiversidad y tradiciones de la Patagonia chilena.',
  'https://www.youtube.com/playlist?list=PLUdhnSOJ45xXWqnl3HxkTjVjYVdf0Auec',
  'https://img.youtube.com/vi/DJRaxO3rYMo/maxresdefault.jpg',
  id, '2023-11-01', TRUE
FROM categories WHERE slug = 'series-atlas'
RETURNING id; -- Keep track of this ID for step 3

-- NOTE: If you run this in Supabase, check the generated ID and use it in the next step.
-- For this example, let's assume the ID is 1001.

-- 3. Link existing episodes to the Series
-- (Update the series_id with the ID returned above)
UPDATE videos 
SET 
  is_series = FALSE, 
  series_id = (SELECT id FROM videos WHERE title = 'Atlas Audiovisual de Aysén' LIMIT 1),
  season_number = 1,
  episode_number = 1
WHERE title = 'Atlas Audiovisual: Cantaria';

UPDATE videos 
SET 
  is_series = FALSE, 
  series_id = (SELECT id FROM videos WHERE title = 'Atlas Audiovisual de Aysén' LIMIT 1),
  season_number = 1,
  episode_number = 2
WHERE title = 'Atlas Audiovisual: Calafate';

UPDATE videos 
SET 
  is_series = FALSE, 
  series_id = (SELECT id FROM videos WHERE title = 'Atlas Audiovisual de Aysén' LIMIT 1),
  season_number = 1,
  episode_number = 3
WHERE title = 'Atlas Audiovisual: Arreo de Ovejas';
