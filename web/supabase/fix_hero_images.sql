-- ==============================================================================
-- SCRIPT DE ACTUALIZACIÓN DE PORTADAS (Hero Images)
-- Fecha: 2026-02-15
-- Propósito: Asignar fotografías de alta calidad (Unsplash) a los documentales
--            más importantes para que luzcan espectaculares en el "Hero" y Sliders.
-- ==============================================================================

-- 1. Catedrales de Mármol (Mármol 4K)
-- URL Unsplash: Marble Caves by @pabloheimplatz
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1549419137-0ea87e2b7218?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Mármol%' OR title ILIKE '%Marmol%';

-- 2. Cerro Castillo (Villa Cerro Castillo / Escalada)
-- URL Unsplash: Cerro Castillo by @ignacioceballos
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1571439775953-27f31131766a?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Castillo%';

-- 3. Ventisquero Colgante / Glaciares
-- URL Unsplash: Hanging Glacier by @ignacioceballos
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1548682855-f71bb4809e08?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Glaciar%' OR title ILIKE '%Hielo%';

-- 4. Río Baker / Pesca
-- URL Unsplash: Rio Baker by @ignacioceballos (Generic river flow)
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1510214690324-4f0525287317?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Baker%' OR title ILIKE '%Pesca%';

-- 5. Carretera Austral / Viajes
-- URL Unsplash: Winding Roadd
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1577908953920-d372c084f7f2?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Carretera%' OR title ILIKE '%Ruta%' OR title ILIKE '%Viaje%';

-- 6. Laguna San Rafael
-- URL Unsplash: Icebergs
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1544252631-096410e42823?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Rafael%';

-- 7. Aysén General (Para "Trapananda" o "Aysén Decide" si no tienen match específico)
-- URL Unsplash: Patagonia Landscape
UPDATE videos 
SET thumbnail_url = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80'
WHERE title ILIKE '%Trapananda%' OR title ILIKE '%Aysén Decide%';
