-- ==============================================================================
-- SCRIPT DE EXPANSIÓN DE CATÁLOGO (Expansion Pack)
-- Fecha: 2026-02-15
-- Propósito: Agregar nuevas categorías y documentales sin borrar lo existente.
-- ==============================================================================

-- 1. NUEVA CATEGORÍA: Aventura y Deporte
INSERT INTO categories (name, slug) 
VALUES ('Aventura y Deporte', 'aventura')
ON CONFLICT (slug) DO NOTHING;

-- 2. INSERCIÓN DE NUEVO CONTENIDO

-- === SECCIÓN: AVENTURA Y DEPORTE ===

-- Pesca con Mosca en Río Baker (ESPN)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Pesca con Mosca: Río Baker', 
  'Especial de ESPN "Aguas Arriba". Una aventura de pesca deportiva en las aguas turquesas del río más caudaloso de Chile.', 
  'https://www.youtube.com/watch?v=qcNpogDLyXk', 
  id, 
  'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Fly fishing placeholder
  '2018-03-15'
FROM categories WHERE slug = 'aventura';

-- Carretera Austral: La Ruta Más Hermosa (TVN)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Carretera Austral: La Ruta Infinita', 
  'Documental de TVN que recorre los hitos más emblemáticos de la ruta 7, mostrando la experiencia de viajar por la Patagonia profunda.', 
  'https://www.youtube.com/watch?v=MZxsl4E_Uds', 
  id, 
  'https://images.unsplash.com/photo-1518182170546-07aa6ddb693d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Road trip placeholder
  '2020-01-20'
FROM categories WHERE slug = 'aventura';


-- === SECCIÓN: HISTORIA Y COLONIZACIÓN (Adiciones) ===

-- Pioneros de Aisén
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Pioneros de Aisén: El Despertar', 
  'Relatos de sacrificio y tenacidad. La historia no contada de las familias que forjaron la vida en los valles más inhóspitos.', 
  'https://www.youtube.com/watch?v=4dmHfGS0-o8', 
  id, 
  'https://images.unsplash.com/photo-1534234828569-1f3553d3b718?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Vintage/Cabin style
  '2017-09-10'
FROM categories WHERE slug = 'historia';


-- === SECCIÓN: NATURALEZA Y GEOGRAFÍA (Adiciones) ===

-- Rumbo al Corazón de la Patagonia (DW)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Rumbo al Corazón de la Patagonia', 
  'Producción internacional de DW Documental. Una mirada externa y maravillada sobre la naturaleza salvaje de Aysén.', 
  'https://www.youtube.com/watch?v=6_OFXBK37gs', 
  id, 
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Nature landscape
  '2022-05-05'
FROM categories WHERE slug = 'naturaleza';

-- Catedrales de Mármol 4K
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Catedrales de Mármol (4K)', 
  'Una experiencia visual inmersiva en ultra alta definición navegando por las formaciones minerales del Lago General Carrera.', 
  'https://www.youtube.com/watch?v=N2JC34fccmY', 
  id, 
  'https://images.unsplash.com/photo-1505566085116-43183594b29c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Marble caves placeholder (approx)
  '2023-11-12'
FROM categories WHERE slug = 'naturaleza';

-- Glaciar San Rafael
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Explorando el Glaciar San Rafael', 
  'Expedición a la pared de hielo más famosa de la corredera, testigo del cambio climático y la majestuosidad polar.', 
  'https://www.youtube.com/watch?v=XshFqY7A_c0', 
  id, 
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Glacier
  '2019-02-28'
FROM categories WHERE slug = 'naturaleza';


-- === SECCIÓN: CULTURA Y PATRIMONIO (Adiciones) ===

-- Villa Cerro Castillo (Sabingo)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Historias de Villa Cerro Castillo', 
  'Un recorrido íntimo por la vida de los habitantes a los pies del imponente macizo. Tradición, turismo y vida de montaña.', 
  'https://www.youtube.com/watch?v=5sndUZ_lLn8', 
  id, 
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Mountain village
  '2021-08-15'
FROM categories WHERE slug = 'cultura';
