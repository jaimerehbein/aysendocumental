-- AGENTE SCOUT: REPAIR & CLEANUP V1.0
-- Fecha: 2026-02-17
-- Autor: Antigravity Maintenance Module
-- Descripción: Script de "Sanación" de la base de datos. Elimina basura y repara visualización.

-- 1. ELIMINAR CONTENIDO "BASURA" (URLs Placeholder)
-- Elimina cualquier video que accidentalmente se haya insertado con "VIDEO_ID" o URLs de ejemplo
DELETE FROM videos 
WHERE url LIKE '%VIDEO_ID%' 
   OR url LIKE '%PENDING%'
   OR url LIKE '%SomeID%'
   OR url = 'https://www.youtube.com/watch?v=';

-- 2. REPARACIÓN MASIVA DE THUMBNAILS (La "Magia" del Regex)
-- Extrae el ID de YouTube de la URL del video y construye la URL de la imagen en alta calidad.
-- Esto arregla:
--    a) Thumbnails que apuntaban a rutas locales (/Users/...)
--    b) Thumbnails repetidos (placeholders genéricos)
--    c) Thumbnails rotos o vacíos
UPDATE videos
SET thumbnail_url = 'https://img.youtube.com/vi/' || substring(url from 'v=([^&]+)') || '/maxresdefault.jpg'
WHERE url LIKE '%youtube.com/watch?v=%' -- Solo videos de YouTube estándar
  AND (
      thumbnail_url IS NULL 
      OR thumbnail_url LIKE '/%' -- Paths locales/relativos
      OR thumbnail_url LIKE '%unsplash%' -- Placeholders genéricos antiguos
      OR thumbnail_url LIKE '%assets%' -- Assets estáticos antiguos
  );

-- 3. REPARACIÓN SECUNDARIA (Para URLs cortas youtu.be si existieran)
UPDATE videos
SET thumbnail_url = 'https://img.youtube.com/vi/' || substring(url from 'youtu.be/([^?]+)') || '/maxresdefault.jpg'
WHERE url LIKE '%youtu.be/%'
  AND (thumbnail_url LIKE '/%' OR thumbnail_url LIKE '%assets%');

-- 4. LIMPIEZA DE CATEGORÍAS HUÉRFANAS (Opcional, limpieza higiénica)
-- DELETE FROM categories WHERE id NOT IN (SELECT DISTINCT category_id FROM videos); -- Comentado por seguridad

-- 5. VERIFICACIÓN (Solo para log visual si se corriera en consola)
-- SELECT title, thumbnail_url FROM videos WHERE thumbnail_url LIKE 'https://img.youtube.com%';
