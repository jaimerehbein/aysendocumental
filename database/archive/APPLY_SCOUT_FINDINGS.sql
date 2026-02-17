-- AGENTE SCOUT: MASTER SYNC V1.0
-- Fecha: 2026-02-17
-- Descripción: Consolida todos los hallazgos del Agente Scout (Documentales, Ficción, Blanche) y asegura dependencias.

-- 1. ASEGURAR CATEGORÍAS NECESARIAS
-- "Cine de Ficción" no existía en el Master Setup original.
INSERT INTO categories (name, slug)
VALUES ('Cine de Ficción', 'cine')
ON CONFLICT (slug) DO NOTHING;

-- 2. IMPORTAR HALLAZGOS V1 (Documentales Generales)
-- "La Batalla de Aysén"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'La Batalla de Aysén',
  'Documental que relata las históricas y masivas movilizaciones de 2012 en la región de Aysén, donde la comunidad se alzó para exigir mejores condiciones de vida y denunciar el abandono del Estado.',
  'https://www.youtube.com/watch?v=0kH8fN6XW_w',
  'https://img.youtube.com/vi/0kH8fN6XW_w/maxresdefault.jpg',
  id, '2012-01-01', FALSE
FROM categories WHERE slug = 'historia'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'La Batalla de Aysén');

-- "Relatos de Aysén"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Relatos de Aysén',
  'Cortometraje documental dirigido por Rodrigo Labarca. Un viaje a la memoria de los pioneros que habitaron estas tierras en los años 30, enfrentando la soledad y la naturaleza indómita.',
  'https://www.youtube.com/watch?v=u8gTnmP5_Z0',
  'https://img.youtube.com/vi/u8gTnmP5_Z0/maxresdefault.jpg',
  id, '2017-01-01', FALSE
FROM categories WHERE slug = 'historia'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Relatos de Aysén');

-- "Patagonia sin Represas"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Patagonia sin Represas',
  'El registro de la lucha ambiental más grande en la historia de Chile. La defensa de los ríos Baker y Pascua frente a la amenaza de megaproyectos hidroeléctricos. Dirigido por Marcelo Viñas.',
  'https://www.youtube.com/watch?v=A2vP8U61Q0c',
  'https://img.youtube.com/vi/A2vP8U61Q0c/maxresdefault.jpg',
  id, '2014-09-23', FALSE
FROM categories WHERE slug = 'naturaleza'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Patagonia sin Represas');

-- 3. IMPORTAR HALLAZGOS V2 (Ficción Regional)
-- "Descansar"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Descansar (Ficción)',
  'Drama dirigido por Ignacio Ruiz. Rodrigo y su padre Ramón, distanciados por años, se reencuentran en Isla Huar bajo la sombra de una enfermedad terminal. Protagonizado por Héctor Noguera.',
  'https://www.youtube.com/watch?v=1M0U0bl3WAU',
  'https://img.youtube.com/vi/1M0U0bl3WAU/maxresdefault.jpg', 
  id, '2018-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Descansar (Ficción)');

-- "Cacique Mulato"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Cacique Mulato: La Leyenda de Chumjaluwun',
  'Primer largometraje de ficción hablado en lengua Tehuelche. La historia de la resistencia del pueblo Aonikenk en la Patagonia frente a la colonización. (Trailer)',
  'https://www.youtube.com/watch?v=DSPBGqXPFuQ',
  'https://img.youtube.com/vi/DSPBGqXPFuQ/maxresdefault.jpg',
  id, '2022-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Cacique Mulato: La Leyenda de Chumjaluwun');

-- 4. IMPORTAR HALLAZGOS V3 (Patricio Blanche)
-- "Ver de Lejos"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Ver de Lejos',
  'Cortometraje de ficción dirigido por Patricio Blanche, protagonizado por Alejandro Goic. Un viaje de un joven y su tío desde el campo a la ciudad en busca de un televisor, que se convierte en un viaje de entendimiento mutuo. Ganador Festival Patagonia Aysén.',
  'https://www.youtube.com/watch?v=OPReeiPFaqA',
  'https://img.youtube.com/vi/OPReeiPFaqA/maxresdefault.jpg',
  id, '2018-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Ver de Lejos');

-- "Las Huichas"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Las Huichas',
  'Cortometraje de ficción ambientado en Islas Huichas. Umberto carga con el duelo y el ataúd de su padre hasta su casa en la isla. Protagonizado por Alejandro Sieveking y Daniel Candia.',
  'https://www.youtube.com/watch?v=UaVKKFgkv4Y',
  'https://img.youtube.com/vi/UaVKKFgkv4Y/maxresdefault.jpg',
  id, '2019-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Las Huichas');

-- 5. FUERZA DE ACTUALIZACIÓN (FIX-IT-ALL)
-- Si los registros ya existían con datos antiguos (placeholders o links rotos), el INSERT anterior los ignoró.
-- Estas sentencias UPDATE aseguran que se corrijan con la información verificada.

-- Documentales
UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=0kH8fN6XW_w', 
  thumbnail_url = 'https://img.youtube.com/vi/0kH8fN6XW_w/maxresdefault.jpg' 
WHERE title = 'La Batalla de Aysén';

UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=u8gTnmP5_Z0', 
  thumbnail_url = 'https://img.youtube.com/vi/u8gTnmP5_Z0/maxresdefault.jpg' 
WHERE title = 'Relatos de Aysén';

UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=A2vP8U61Q0c', 
  thumbnail_url = 'https://img.youtube.com/vi/A2vP8U61Q0c/maxresdefault.jpg' 
WHERE title = 'Patagonia sin Represas';

-- Ficción
UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=1M0U0bl3WAU', 
  thumbnail_url = 'https://img.youtube.com/vi/1M0U0bl3WAU/maxresdefault.jpg',
  category_id = (SELECT id FROM categories WHERE slug = 'cine')
WHERE title = 'Descansar (Ficción)';

UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=DSPBGqXPFuQ', 
  thumbnail_url = 'https://img.youtube.com/vi/DSPBGqXPFuQ/maxresdefault.jpg',
  category_id = (SELECT id FROM categories WHERE slug = 'cine')
WHERE title = 'Cacique Mulato: La Leyenda de Chumjaluwun';

UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=OPReeiPFaqA', 
  thumbnail_url = 'https://img.youtube.com/vi/OPReeiPFaqA/maxresdefault.jpg',
  category_id = (SELECT id FROM categories WHERE slug = 'cine')
WHERE title = 'Ver de Lejos';

UPDATE videos SET 
  url = 'https://www.youtube.com/watch?v=UaVKKFgkv4Y', 
  thumbnail_url = 'https://img.youtube.com/vi/UaVKKFgkv4Y/maxresdefault.jpg',
  category_id = (SELECT id FROM categories WHERE slug = 'cine')
WHERE title = 'Las Huichas';
