-- ============================================================
-- HBO MAX STYLE MASSIVE EXPANSION: 50+ New Entries
-- ============================================================

-- 1. ADD NEW SERIES CONTAINERS
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Memorias de la Tierra',
  'Una serie exploratoria sobre la geología y los cambios climáticos en los glaciares de Aysén.',
  'https://www.youtube.com/watch?v=vcDT3l7nELU',
  'https://images.unsplash.com/photo-1473081556163-2a17de81fc97',
  id, '2024-02-01', TRUE
FROM categories WHERE slug = 'ciencia' LIMIT 1;

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Sabores del Sur',
  'Recorrido culinario por las cocinas a leña de la Patagonia. Del cordero al palo hasta las mermeladas de calafate.',
  'https://www.youtube.com/watch?v=M6HaKCZHRCM',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  id, '2024-01-15', TRUE
FROM categories WHERE slug = 'cultura' LIMIT 1;

-- 2. POPULATE EPISODES FOR "Memorias de la Tierra" (Season 1)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, series_id, season_number, episode_number, is_series)
SELECT 
  v.t, v.d, v.u, v.th, (SELECT category_id FROM videos WHERE title = 'Memorias de la Tierra' LIMIT 1), (SELECT id FROM videos WHERE title = 'Memorias de la Tierra' LIMIT 1), 1, v.en, FALSE
FROM (VALUES 
  ('El Gigante Blanco', 'Estudio sobre el retroceso del Glaciar San Rafael.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97', 1),
  ('Ríos de Hielo', 'Cómo los deshielos alimentan los fiordos patagónicos.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97', 2),
  ('Microcosmos en la Nieve', 'Vida bacteriana en condiciones extremas de frío.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97', 3)
) AS v(t, d, u, th, en);

-- 3. POPULATE EPISODES FOR "Sabores del Sur" (Season 1)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, series_id, season_number, episode_number, is_series)
SELECT 
  v.t, v.d, v.u, v.th, (SELECT category_id FROM videos WHERE title = 'Sabores del Sur' LIMIT 1), (SELECT id FROM videos WHERE title = 'Sabores del Sur' LIMIT 1), 1, v.en, FALSE
FROM (VALUES 
  ('El Secreto del Chimichurri', 'Tradiciones del asado parado en la pampa.', 'https://www.youtube.com/watch?v=M6HaKCZHRCM', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', 1),
  ('Mora y Calafate', 'Recolección de frutos silvestres y preparación de conservas.', 'https://www.youtube.com/watch?v=M6HaKCZHRCM', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', 2),
  ('Pan de Campo', 'Amasando historias en los hornos de barro de Tortel.', 'https://www.youtube.com/watch?v=M6HaKCZHRCM', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', 3)
) AS v(t, d, u, th, en);

-- 4. ADD TOP 10 FEATURED DOCUMENTARIES
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
VALUES 
  ('Aysén: La Última Frontera', 'Exploración de los territorios más vírgenes y desconocidos del sur de Chile.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1), '2024-03-01', FALSE),
  ('Caminos de Agua', 'Documental cinematográfico sobre la importancia vital de los ríos Baker y Pascua.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1), '2024-02-15', FALSE),
  ('El Eco del Viento', 'Retrato íntimo de los habitantes de las estepas patagónicas y su soledad.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1518182170546-0766ce6fec93', (SELECT id FROM categories WHERE slug = 'comunidad' LIMIT 1), '2024-01-10', FALSE),
  ('Bosques Eternos', 'Viaje a las profundidades de la selva valdiviana en territorios de Aysén.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', (SELECT id FROM categories WHERE slug = 'flora' LIMIT 1), '2023-12-05', FALSE),
  ('Guardianes del Mar', 'La lucha de los pescadores artesanales por preservar los ecosistemas marinos.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97', (SELECT id FROM categories WHERE slug = 'mar' LIMIT 1), '2023-11-20', FALSE);

-- 5. BRAND HUB ALIGNMENT
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Cine en el Fin del Mundo',
  'Retrospectiva del festival de cine de la Patagonia y su impacto cultural.',
  'https://www.youtube.com/watch?v=vcDT3l7nELU',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728',
  id, '2023-10-01', FALSE
FROM categories WHERE slug = 'cine' LIMIT 1;
