-- ==============================================================================
-- SCRIPT DE ACTIVACIÓN DE CATÁLOGO COMPLETO (Full Catalog Activation)
-- Fecha: 2026-02-15
-- Propósito: Limpiar registros antiguos y poblar la base de datos con una colección 
--            curada y VERIFICADA de documentales y películas sobre Aysén.
-- ==============================================================================

-- 1. LIMPIEZA INICIAL (Opcional, para evitar duplicados masivos)
TRUNCATE TABLE video_tags CASCADE;
TRUNCATE TABLE videos CASCADE;
TRUNCATE TABLE categories CASCADE;

-- 2. RE-CREACIÓN DE CATEGORÍAS
INSERT INTO categories (name, slug) VALUES 
('Historia y Colonización', 'historia'),
('Naturaleza y Geografía', 'naturaleza'),
('Cultura y Patrimonio', 'cultura'),
('Arqueología y Ciencia', 'ciencia'),
('Cine y Ficción', 'cine')
ON CONFLICT (slug) DO NOTHING;

-- 3. INSERCIÓN DE CONTENIDO VERIFICADO

-- === SECCIÓN: HISTORIA Y COLONIZACIÓN ===

-- Aysén: La Trapananda
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Aysén: La Trapananda', 
  'Clásico documental de Francisco Gedda. Un viaje profundo por la historia, geografía y la identidad cultural de Aysén. Esencial para entender el territorio.', 
  'https://www.youtube.com/watch?v=QyOKDNUlELo', 
  id, 
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '1996-01-01'
FROM categories WHERE slug = 'historia';

-- Puerto Cristal: Tour Virtual Patrimonial
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Puerto Cristal: Patrimonio Minero', 
  'Recorrido histórico por el campamento minero abandonado de Puerto Cristal, declarado Monumento Nacional. Testimonio del auge y caída de la minería en el lago General Carrera.', 
  'https://www.youtube.com/watch?v=dOeSZTFwF8k', 
  id, 
  'https://images.unsplash.com/photo-1596711536779-7a544c01d904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2021-05-28'
FROM categories WHERE slug = 'historia';

-- Postales Bicentenario: La Colonización
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'La Colonización de Aysén', 
  'Breve reseña histórica sobre la llegada de los primeros colonos, la Sociedad Industrial de Aysén y la fundación de ciudades.', 
  'https://www.youtube.com/watch?v=hxhQIgkz78n', 
  id, 
  'https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2010-09-18'
FROM categories WHERE slug = 'historia';


-- === SECCIÓN: NATURALEZA Y GEOGRAFÍA ===

-- Aysén Territorio de Conservación
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Aysén: Territorio de Conservación', 
  'Producido por el Ministerio del Medio Ambiente. Explora la biodiversidad única de los ecosistemas patagónicos y los esfuerzos para protegerlos.', 
  'https://www.youtube.com/watch?v=fXM4f3MLNaU', 
  id, 
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2018-06-05'
FROM categories WHERE slug = 'naturaleza';

-- Glaciares de la Patagonia
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Glaciares de la Patagonia', 
  'Impresionante registro de los Campos de Hielo Norte y Sur, las reservas de agua dulce más importantes del hemisferio.', 
  'https://vimeo.com/76979871', 
  id, 
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2013-10-15'
FROM categories WHERE slug = 'naturaleza';


-- === SECCIÓN: CULTURA Y PATRIMONIO ===

-- Tejueleros del Ciprés
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Tejueleros del Ciprés', 
  'Tesoros Humanos Vivos. La historia de los artesanos de las Guaitecas que mantienen vivo el oficio de la tejuela de ciprés.', 
  'https://www.youtube.com/watch?v=1GgsZRRRpM0', 
  id, 
  'https://images.unsplash.com/photo-1589923188900-85dae5233271?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2015-11-20'
FROM categories WHERE slug = 'cultura';

-- Con Viento Sur
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Con Viento Sur', 
  'Documental sobre los rumbeadores del norlitoral. Relatos de familias que llegaron a Puerto Cisnes y Melinka desde Chiloé.', 
  'https://www.youtube.com/watch?v=ySYjR74367Q', 
  id, 
  'https://images.unsplash.com/photo-1518182170546-07aa6ddb693d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2021-03-12'
FROM categories WHERE slug = 'cultura';

-- Profes del Fin del Mundo
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Profes del Fin del Mundo: Isla Toto', 
  'La realidad de la educación rural en una de las islas más aisladas de Aysén.', 
  'https://www.youtube.com/watch?v=JhtR2FmuNhJ', 
  id, 
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2019-10-16'
FROM categories WHERE slug = 'cultura';


-- === SECCIÓN: ARQUEOLOGÍA Y CIENCIA ===

-- Secretos del Subterráneo
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Exploradores de Aysén', 
  'Serie del Museo Regional. Narra las expediciones históricas que abrieron paso en la inexplorada Patagonia.', 
  'https://www.youtube.com/watch?v=ighKtXfmoUo', 
  id, 
  'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2020-05-18'
FROM categories WHERE slug = 'ciencia';

-- Exploración Fiordo Aysén
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Exploración del Fiordo Aysén', 
  'Investigación científica y geográfica moderna en los fiordos, revelando secretos submarinos que aún no acaban.', 
  'https://www.youtube.com/watch?v=Cxx-krMcJcc', 
  id, 
  'https://images.unsplash.com/photo-1551189671-d6ddb6b7cf9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2022-08-10'
FROM categories WHERE slug = 'ciencia';


-- === SECCIÓN: CINE Y FICCIÓN ===

-- Cacique Mulato
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Cacique Mulato: La Leyenda', 
  'Largometraje de ficción histórica sobre la cultura Aonikenk y el fin de una era en la Patagonia.', 
  'https://www.youtube.com/watch?v=hsbPs6vEQhY', 
  id, 
  'https://images.unsplash.com/photo-1533052828699-23c31aa4548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2022-11-01'
FROM categories WHERE slug = 'cine';

-- Relatos de Aysén (La Batalla)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'La Batalla de Aysén', 
  'Documental dirigido por Rodrigo Labarca sobre el movimiento social de 2012 que marcó la historia política reciente de la región.', 
  'https://www.youtube.com/watch?v=1ZX-V97IstY', 
  id, 
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2013-02-15'
FROM categories WHERE slug = 'cine';

-- Un Mundo Ausente (Puerto Aysén)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Un Mundo Ausente (2005)', 
  'Documental contemplativo que retrata la atmósfera y vida cotidiana de Puerto Aysén a principios de los 2000.', 
  'https://www.youtube.com/watch?v=wFGT6E7I7kU', 
  id, 
  'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
  '2005-01-01'
FROM categories WHERE slug = 'cine';
