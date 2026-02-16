-- ==============================================================================
-- SCRIPT DE SELECCIÓN DEL EXPERTO (AysenGPT)
-- Fecha: 2026-02-15
-- Propósito: Ingestar contenido curado por el agente experto en cultura y geopolítica.
-- ==============================================================================

-- 1. NUEVA CATEGORÍA: Selección del Experto
INSERT INTO categories (name, slug) 
VALUES ('Selección del Experto', 'experto')
ON CONFLICT (slug) DO NOTHING;

-- 2. INSERCIÓN DE CONTENIDO CURADO

-- Patagonia sin Represas
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Patagonia sin Represas', 
  'Documental fundamental sobre el movimiento ciudadano que detuvo el proyecto HidroAysén. Un hito en la historia ambiental de Chile.', 
  'https://www.youtube.com/watch?v=p1x6rxERz-A', 
  id, 
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Dam/Protest placeholder
  '2016-01-01'
FROM categories WHERE slug = 'experto';

-- Chile: South America's Limitless Paradise (DW/Free Doc)
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Chile: Paraíso Sin Límites', 
  'Visión internacional sobre la Patagonia. Explora el Cabo de Hornos y los Andes con una cinematografía espectacular.', 
  'https://www.youtube.com/watch?v=OAovyopsgY8', 
  id, 
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Nature placeholder
  '2021-03-20'
FROM categories WHERE slug = 'experto';

-- Tejueleros Artesanales de Aysén
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'Tejueleros Artesanales de Aysén', 
  'Tesoro Humano Vivo. Documental etnográfico sobre el oficio de la tejuela de ciprés, vital para la arquitectura de la zona.', 
  'https://www.youtube.com/watch?v=R9YSFHWmK84', 
  id, 
  'https://images.unsplash.com/photo-1589923188900-85dae5233271?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Wood texture
  '2015-05-15'
FROM categories WHERE slug = 'experto';

-- En las profundidades de la Patagonia chilena
INSERT INTO videos (title, description, url, category_id, thumbnail_url, published_at) 
SELECT 
  'En las profundidades de la Patagonia', 
  'Exploración científica de los ecosistemas submarinos de los fiordos. Un mundo desconocido bajo el agua fría.', 
  'https://www.youtube.com/watch?v=-zETpEYt4Bk', 
  id, 
  'https://images.unsplash.com/photo-1551189671-d6ddb6b7cf9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', -- Underwater placeholder
  '2022-09-10'
FROM categories WHERE slug = 'experto';
