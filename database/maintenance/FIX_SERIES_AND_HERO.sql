-- FIX: SERIES & HERO COVER IMAGES
-- Descripción: Asigna imágenes de portada manuales a las Series y Películas destacadas
-- que no tienen una URL de YouTube directa o cuya extracción falló.

-- 1. FIX: SERIES "Atlas Audiovisual de Aysén"
-- Al ser una serie, no tiene URL de video única. Asignamos una imagen representativa de naturaleza.
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop'
WHERE title LIKE '%Atlas Audiovisual%' AND is_series = TRUE;

-- 2. FIX: SERIES "Aysén: La Trapananda"
-- Asignamos imagen histórica/documental.
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop'
WHERE title LIKE '%Trapananda%' AND is_series = TRUE;

-- 3. FIX: SERIES "1940: La Población"
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1518298027796-03c031627931?q=80&w=1200&auto=format&fit=crop'
WHERE title LIKE '%1940%' AND is_series = TRUE;

-- 4. FIX: "Descansar" (Asegurar alta calidad)
-- Forzamos la imagen maxresdefault o una alternativa si sabemos que falla.
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/1M0U0bl3WAU/hqdefault.jpg' -- Usamos HQ porque a veces MaxRes falla
WHERE title LIKE '%Descansar%';

-- 5. FIX: "Cacique Mulato" 
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/DSPBGqXPFuQ/hqdefault.jpg'
WHERE title LIKE '%Cacique Mulato%';

-- 6. FIX: "Ver de Lejos"
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/OPReeiPFaqA/hqdefault.jpg'
WHERE title LIKE '%Ver de Lejos%';

-- 7. LIMPIEZA FINAL DE RUTAS LOCALES EN SERIES
-- Si queda alguna serie con ruta local, ponerle un placeholder genérico bonito.
UPDATE videos
SET thumbnail_url = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
WHERE is_series = TRUE AND thumbnail_url LIKE '/%';
