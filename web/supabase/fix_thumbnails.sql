-- ==============================================================================
-- SCRIPT DE ACTUALIZACIÓN DE MINIATURAS (Real Thumbnails)
-- Fecha: 2026-02-15
-- Propósito: Reemplazar las imágenes genéricas de Unsplash por las miniaturas 
--            REALES de YouTube en alta definición (Max Resolution).
-- ==============================================================================

-- 1. Actualizar videos de YouTube (Formato estándar watch?v=ID)
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/' || substring(url from 'v=([^&]*)') || '/maxresdefault.jpg'
WHERE url LIKE '%youtube.com/watch?v=%';

-- 2. Actualizar videos de YouTube (Formato corto youtu.be/ID - si existen)
UPDATE videos 
SET thumbnail_url = 'https://img.youtube.com/vi/' || substring(url from 'youtu.be/([^?]*)') || '/maxresdefault.jpg'
WHERE url LIKE '%youtu.be/%';

-- 3. (Opcional) Ajustes manuales para videos específicos si maxresdefault falla
-- Algunos videos viejos no tienen maxresdefault, en ese caso usar hqdefault.
-- Aquí podrías añadir correcciones manuales si ves alguna imagen gris.

-- Ejemplo de corrección (descomentar si es necesario):
-- UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/[ID]/hqdefault.jpg' WHERE url LIKE '%[ID]%';
