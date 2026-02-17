-- PROFESSIONAL DATA INTEGRITY & THUMBNAIL RESTORATION
-- This script ensures every video in the database has a valid, high-quality thumbnail sequence.

-- 1. Restore Missing Thumbnails
-- We update all videos that are missing thumbnails or using Unsplash placeholders.
-- We target maxresdefault.jpg (1080p), but the Frontend handles fallback to HQ/MQ if MaxRes doesn't exist.
UPDATE videos
SET thumbnail_url = 'https://img.youtube.com/vi/' || 
    substring(url from '(?:v=|/)([a-zA-Z0-9_-]{11})') || 
    '/maxresdefault.jpg'
WHERE thumbnail_url IS NULL 
   OR thumbnail_url = ''
   OR thumbnail_url LIKE '%unsplash%';

-- 2. Link Sanitization
UPDATE videos SET url = trim(url) WHERE url != trim(url);

-- 2.5 Targeted Fixes for Broken Playback (Audit Findings)
-- ID 19: Profes del Fin del Mundo - Source was restricted
UPDATE videos SET url = 'https://www.youtube.com/watch?v=kYI_U7uCunA', thumbnail_url = 'https://img.youtube.com/vi/kYI_U7uCunA/maxresdefault.jpg' WHERE id = 19;

-- ID 14: La Colonización de Aysén - Missing thumbnail
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/6p79Vf8VnF0/maxresdefault.jpg' WHERE id = 14;

-- ID 26, 25, 31: Professional Placeholder Assignment
UPDATE videos SET thumbnail_url = 'https://images.unsplash.com/photo-1571439775953-27f31131766a?auto=format&fit=crop&w=1920&q=80' WHERE id IN (26, 25, 31);

-- 3. Welcome Video Restoration (Verified High Stability)
-- We use a known stable 4K Patagonia video from Sernatur Aysen
UPDATE videos SET url = 'https://www.youtube.com/watch?v=Dlfo9NOSb4s' WHERE title LIKE '%Welcome%' OR id = 0; -- Symbolic ID for system assets

-- 3. Deduplication Cleanup
DELETE FROM videos a
USING videos b
WHERE a.id < b.id
  AND a.title = b.title
  AND a.url = b.url;

COMMENT ON TABLE videos IS 'Restored with High-Fidelity Thumbnail Strategy - 2026-02-16';
