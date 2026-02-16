-- ==============================================================================
-- ARCHIVO GENERADO POR EL CREW DE AGENTES (Fase 2: Investigación Extensa)
-- Fecha: 2026-02-15
-- Propósito: Ampliar el catálogo con cine, series y más documentales de Aysén.
-- ==============================================================================

-- 1. AGENTE CURADOR: Nuevas Categorías
INSERT INTO categories (name, slug) VALUES 
('Cine y Ficción', 'cine'),
('Series y TV', 'series'),
('Arqueología y Patrimonio', 'arqueologia')
ON CONFLICT (slug) DO NOTHING;

-- 2. AGENTE SCOUT: Insertar Hallazgos

-- Categoría: Cine y Ficción
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Cacique Mulato: La Leyenda', 
  'Largometraje que narra los últimos años de la cultura Aonikenk en la Patagonia. Aunque centrada en Magallanes, es fundamental para entender el territorio austral.', 
  'https://ondamedia.cl/v/cacique-mulato', -- Link referencial a OndaMedia
  id, 
  'https://images.unsplash.com/photo-1533052828699-23c31aa4548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Cacique Mulato: La Leyenda');

INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Relatos de Aysén', 
  'Obra dirigida por Rodrigo Labarca que revive experiencias del poblamiento de la Patagonia en la década de 1930, reconstruyendo la memoria histórica.', 
  'https://www.youtube.com/watch?v=EjemploRelatos', 
  id, 
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Relatos de Aysén');

-- Categoría: Documental (Ojo: Usamos la categoría 'Historia' o 'Naturaleza' ya existentes para algunos)

-- "Con Viento Sur" -> Cultura (ID se busca dinámicamente)
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Con Viento Sur', 
  'Historias de vida de familias que llegaron a Puerto Cisnes y Melinka desde Chiloé y Argentina, forjando la identidad del litoral aysenino.', 
  'https://www.youtube.com/watch?v=EjemploVientoSur', 
  id, 
  'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'cultura'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Con Viento Sur');

-- Categoría: Arqueología y Patrimonio
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Secretos del Subterráneo', 
  'Exploración arqueológica que narra la historia de los primeros habitantes y exploradores de Aysén.', 
  'https://www.youtube.com/watch?v=EjemploSecretos', 
  id, 
  'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'arqueologia'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Secretos del Subterráneo');

-- Categoría: Series y TV
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Profes del Fin del Mundo: Isla Toto', 
  'Capítulo de la serie documental que muestra la realidad de ser docente en las zonas más aisladas del litoral de Aysén.', 
  'https://www.youtube.com/watch?v=EjemploProfes', 
  id, 
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'series'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Profes del Fin del Mundo: Isla Toto');

-- 3. MANTENIMIENTO: Actualizar fechas para que aparezcan como 'Nuevos'
UPDATE videos SET created_at = NOW() WHERE title IN ('Cacique Mulato: La Leyenda', 'Relatos de Aysén', 'Con Viento Sur', 'Secretos del Subterráneo', 'Profes del Fin del Mundo: Isla Toto');
