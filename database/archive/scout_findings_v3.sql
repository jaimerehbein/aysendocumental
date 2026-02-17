-- AGENTE SCOUT: REPORTE DE HALLAZGOS V3 (PATRICIO BLANCHE)
-- Fecha: 2026-02-17
-- Autor: Antigravity Scout Module
-- Descripción: Inserción de la filmografía del cineasta regional Patricio Blanche.

-- 1. CINE DE FICCIÓN (Director: Patricio Blanche)
-- "Ver de Lejos" (2018)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Ver de Lejos',
  'Cortometraje de ficción dirigido por Patricio Blanche, protagonizado por Alejandro Goic. Un viaje de un joven y su tío desde el campo a la ciudad en busca de un televisor, que se convierte en un viaje de entendimiento mutuo. Ganador Festival Patagonia Aysén.',
  'https://www.youtube.com/watch?v=OPReeiPFaqA', -- ID Verificado (Proporcionado por usuario)
  '/assets/cinema/thumb_cine_premium_1771272433928.png', -- Placeholder
  id, '2018-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Ver de Lejos');

-- "Las Huichas" (2019)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Las Huichas',
  'Cortometraje de ficción ambientado en Islas Huichas. Umberto carga con el duelo y el ataúd de su padre hasta su casa en la isla. Protagonizado por Alejandro Sieveking y Daniel Candia.',
  'https://www.youtube.com/watch?v=UaVKKFgkv4Y', -- ID Verificado (Canal Patricio Blanche)
  '/assets/cinema/thumb_cine_premium_1771272433928.png', -- Placeholder
  id, '2019-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Las Huichas');

-- Nota: "Aislamiento" (2020) no se encontró disponible públicamente en YouTube.
