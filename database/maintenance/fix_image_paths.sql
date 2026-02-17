-- ============================================================
-- FIX: REPLACING PRIVATE PATHS WITH PUBLIC WEB ASSETS
-- ============================================================

-- Fix Series Thumbnails
UPDATE videos 
SET thumbnail_url = '/assets/cinema/atlas_audiovisual_cover_1771271528271.png'
WHERE title = 'Atlas Audiovisual de Aysén';

UPDATE videos 
SET thumbnail_url = '/assets/cinema/cortometrajes_patagonicos_cover_1771271545522.png'
WHERE title = 'Cortometrajes Patagónicos';

-- Fix Standalone Documentaries
UPDATE videos 
SET thumbnail_url = '/assets/cinema/thumb_historia_premium_1771272385715.png'
WHERE title = 'Puerto Aysén - 1940 (Aysén Tierra del Porvenir)';

UPDATE videos 
SET thumbnail_url = '/assets/cinema/thumb_historia_premium_1771272385715.png'
WHERE title = 'Aysén La Trapananda - Remasterizado';

UPDATE videos 
SET thumbnail_url = '/assets/cinema/thumb_historia_premium_1771272385715.png'
WHERE title = 'Pioneros de Aisén: El Despertar de la Patagonia';

UPDATE videos 
SET thumbnail_url = '/assets/cinema/thumb_naturaleza_premium_1771272369489.png'
WHERE title = 'Aysén Territorio de Conservación';

-- Fix Category Hub Icons (if any used local paths, though mostly they use Unsplash)
-- ...

-- General check for any other local paths and convert to asset folder pattern
UPDATE videos
SET thumbnail_url = REPLACE(thumbnail_url, '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/', '/assets/cinema/')
WHERE thumbnail_url LIKE '/Users/%';
