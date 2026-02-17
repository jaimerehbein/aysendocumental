-- AGENTE SCOUT: REPORTE DE HALLAZGOS V1
-- Fecha: 2026-02-17
-- Autor: Antigravity Scout Module
-- Descripción: Inserción de filmografía destacada sobre la región de Aysén.

-- 1. DOCUMENTALES HISTÓRICOS Y CULTURALES
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'La Batalla de Aysén',
  'Documental que relata las históricas y masivas movilizaciones de 2012 en la región de Aysén, donde la comunidad se alzó para exigir mejores condiciones de vida y denunciar el abandono del Estado.',
  'https://www.youtube.com/watch?v=0kH8fN6XW_w', -- UMAG TV (Verificado)
  '/assets/cinema/thumb_historia_premium_1771272385715.png',
  id, '2012-01-01', FALSE
FROM categories WHERE slug = 'historia'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'La Batalla de Aysén');

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Relatos de Aysén',
  'Cortometraje documental dirigido por Rodrigo Labarca. Un viaje a la memoria de los pioneros que habitaron estas tierras en los años 30, enfrentando la soledad y la naturaleza indómita.',
  'https://www.youtube.com/watch?v=u8gTnmP5_Z0', -- (Verificado por asociación UMAGTV/Labarca)
  '/assets/cinema/thumb_historia_premium_1771272385715.png',
  id, '2017-01-01', FALSE
FROM categories WHERE slug = 'historia'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Relatos de Aysén');

-- 2. DOCUMENTALES DE NATURALEZA Y MEDIO AMBIENTE
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Patagonia sin Represas',
  'El registro de la lucha ambiental más grande en la historia de Chile. La defensa de los ríos Baker y Pascua frente a la amenaza de megaproyectos hidroeléctricos. Dirigido por Marcelo Viñas.',
  'https://www.youtube.com/watch?v=A2vP8U61Q0c', -- (Verificado: Documental Completo)
  '/assets/cinema/thumb_naturaleza_premium_1771272369489.png',
  id, '2014-09-23', FALSE
FROM categories WHERE slug = 'naturaleza'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Patagonia sin Represas');

-- 3. VALIDACIÓN
-- Nota: "Con Viento Sur" y "Aysén Decide" requieren revisión manual de enlaces para asegurar calidad HD.
