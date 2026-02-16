-- 1. Find and keep only one instance of each video title
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at DESC) as row_num
    FROM videos
)
DELETE FROM videos
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);

-- 2. Identify and report broken URLs (empty or not YouTube)
SELECT id, title, url FROM videos 
WHERE url IS NULL 
   OR url = '' 
   OR NOT (url LIKE '%youtube.com%' OR url LIKE '%youtu.be%');

-- 3. Identify missing thumbnails
SELECT id, title FROM videos 
WHERE thumbnail_url IS NULL 
   OR thumbnail_url = '' 
   OR thumbnail_url LIKE '%placeholder%';
