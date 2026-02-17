-- ============================================================
-- ALGORITHMIC MATCHING: UPDATE YOUTUBE IDS & TITLES
-- ============================================================

-- Ensure Atlas ID is correct for previews
UPDATE videos SET url = 'https://www.youtube.com/watch?v=vcDT3l7nELU' 
WHERE title LIKE '%Atlas%' AND url IS NULL;

-- Fix redundant thumbnails by using specific frame extraction patterns
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/jRdjc3fBp3k/maxresdefault.jpg'
WHERE title = 'Puerto Aysén - 1940 (Aysén Tierra del Porvenir)';

UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/QyOKDNUlELU/maxresdefault.jpg'
WHERE title = 'Aysén La Trapananda - Remasterizado';

UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/4dmHfGS0-o8/maxresdefault.jpg'
WHERE title = 'Pioneros de Aisén: El Despertar de la Patagonia';

UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/fXM4f3MLNaU/maxresdefault.jpg'
WHERE title = 'Aysén Territorio de Conservación';

-- Assign specific frames to generic science videos
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/vcDT3l7nELU/hqdefault.jpg'
WHERE title LIKE '%Memorias de la Tierra%' AND (thumbnail_url LIKE 'https://images.unsplash%' OR thumbnail_url IS NULL);
