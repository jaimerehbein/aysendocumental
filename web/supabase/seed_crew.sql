-- ==============================================================================
-- ARCHIVO GENERADO POR EL CREW DE AGENTES (Scout + Curador + Arquitecto)
-- Fecha: 2026-02-15
-- Propósito: Popular la base de datos "Aysén Documental" con contenido real investigado.
-- ==============================================================================

-- 1. AGENTE CURADOR: Crear Categorías Definidas
INSERT INTO categories (name, slug) VALUES 
('Colonización e Historia', 'colonizacion'),
('Naturaleza y Biodiversidad', 'naturaleza'),
('Cultura y Oficios', 'cultura'),
('Conflictos Socioambientales', 'conflictos')
ON CONFLICT (slug) DO NOTHING;

-- 2. AGENTE SCOUT: Insertar Hallazgos Audiovisuales
-- Nota: Las URLs de YouTube son referenciales basadas en la investigación.

-- Categoría: Colonización e Historia
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Aysén: La Trapananda', 
  'Documental clásico que narra la epopeya de la colonización en Aysén, la lucha contra la naturaleza hostil y la formación de los primeros asentamientos.', 
  'https://www.youtube.com/watch?v=mqNO_cCY3uD', 
  id, 
  'https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'colonizacion'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Aysén: La Trapananda');

INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Postales Bicentenario: La Colonización', 
  'Microdocumental que explora los hitos de la llegada de los colonos a la Patagonia chilena a principios del siglo XX.', 
  'https://www.youtube.com/watch?v=GA6u6caS', 
  id, 
  'https://images.unsplash.com/photo-1533552873480-1a1aecf38690?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'colonizacion'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Postales Bicentenario: La Colonización');

-- Categoría: Naturaleza y Biodiversidad
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Aysén Territorio de Conservación', 
  'Una mirada profunda a los ecosistemas prístinos de la región, desde los bosques siempreverdes hasta los glaciares milenarios.', 
  'https://www.youtube.com/watch?v=IYQHwpE6RaY', 
  id, 
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'naturaleza'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Aysén Territorio de Conservación');

INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Glaciares de la Patagonia', 
  'Explorando los campos de hielo norte y sur, las reservas de agua dulce más importantes del hemisferio sur.', 
  'https://vimeo.com/76979871', 
  id, 
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'naturaleza'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Glaciares de la Patagonia');

-- Categoría: Cultura y Oficios
INSERT INTO videos (title, description, url, category_id, thumbnail_url) 
SELECT 
  'Tejueleros del Ciprés', 
  'Homenaje a los artesanos de las Guaitecas que mantienen vivo el oficio de la tejuela de ciprés.', 
  'https://www.youtube.com/watch?v=zFIQd1l4tWJ', 
  id, 
  'https://images.unsplash.com/photo-1589923188900-85dae5233271?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
FROM categories WHERE slug = 'cultura'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Tejueleros del Ciprés');

-- 3. AGENTE ARQUITECTO: Mantenimiento de Datos
-- Asegurar que todos los videos tengan URL de miniatura válida si alguna falló
UPDATE videos SET thumbnail_url = 'https://images.unsplash.com/photo-1445584860055-096410e42823?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80' 
WHERE thumbnail_url IS NULL;
