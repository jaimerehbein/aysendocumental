-- ============================================================
-- CONSOLIDATED MASTER SQL: REPARACIÓN, ESQUEMA Y CARGA TOTAL
-- ============================================================

-- 1. ACTUALIZAR ESQUEMA (Soporte para Series y Jerarquía)
ALTER TABLE videos 
ADD COLUMN IF NOT EXISTS is_series BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS series_id INTEGER REFERENCES videos(id),
ADD COLUMN IF NOT EXISTS season_number INTEGER,
ADD COLUMN IF NOT EXISTS episode_number INTEGER;

-- 2. CREAR NUEVAS CATEGORÍAS DE SERIES
INSERT INTO categories (name, slug)
VALUES 
  ('Series: Documentales', 'series-documentales'),
  ('Series: Atlas Audiovisual', 'series-atlas'),
  ('Series: Cortometrajes', 'series-cortometrajes')
ON CONFLICT (slug) DO NOTHING;

-- 3. LIMPIEZA DE DATOS (Deduplicación Automática y Prevención)
-- Eliminamos duplicados basados en el título, manteniendo el registro más reciente
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY title ORDER BY created_at DESC) as row_num
    FROM videos
)
DELETE FROM videos
WHERE id IN (
    SELECT id FROM duplicates WHERE row_num > 1
);

-- Desvinculamos episodios para evitar errores de clave foránea antes de posibles limpiezas específicas
UPDATE videos SET series_id = NULL;

-- Limpiamos títulos específicos que sabemos que están duplicados o necesitan actualización de metadatos
DELETE FROM videos WHERE title IN (
  'Atlas Audiovisual de Aysén', 'Cortometrajes Patagónicos',
  'Puerto Aysén - 1940 (Aysén Tierra del Porvenir)', 'Aysén La Trapananda - Remasterizado',
  'Pioneros de Aisén: El Despertar de la Patagonia', 'Aysén Territorio de Conservación'
);

-- 4. CREAR CONTENEDORES DE SERIES (Nivel Padre)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Atlas Audiovisual de Aysén',
  'Serie documental sobre la biodiversidad y tradiciones de la Patagonia chilena. Descubre los secretos del Lago General Carrera y la selva valdiviana.',
  'https://www.youtube.com/playlist?list=PLUdhnSOJ45xXWqnl3HxkTjVjYVdf0Auec',
  '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/atlas_audiovisual_cover_1771271528271.png',
  id, '2023-11-01', TRUE
FROM categories WHERE slug = 'series-atlas';

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Cortometrajes Patagónicos',
  'Una colección de relatos breves sobre la vida, el mar y la conservación en Aysén. Tradiciones, asados y el alma de la Patagonia.',
  'https://www.youtube.com/playlist?list=PLUdhnSOJ45xVsIHJoTuOuChK3sqmd3rgp',
  '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/cortometrajes_patagonicos_cover_1771271545522.png',
  id, '2024-01-01', TRUE
FROM categories WHERE slug = 'series-cortometrajes';

-- 5. CARGAR EPISODIOS DE "CORTOMETRAJES PATAGÓNICOS"
INSERT INTO videos (title, description, url, thumbnail_url, category_id, series_id, season_number, episode_number, is_series)
SELECT 
  v.t, v.d, v.u, v.th, c.id, (SELECT id FROM videos WHERE title = 'Cortometrajes Patagónicos' LIMIT 1), 1, v.en, FALSE
FROM (VALUES 
  ('Drama marítimo en Aysén', 'Relatos sobre la vida y desafíos en el mar de Aysén.', 'https://www.youtube.com/watch?v=OMlHEosfd2g', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_mar_premium_1771272462537.png', 1),
  ('El Tesoro Submarino: El Papel Vital de las Macroalgas', 'Importancia de las macroalgas para la biodiversidad marina en la Patagonia.', 'https://www.youtube.com/watch?v=2de026SynRs', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_mar_premium_1771272462537.png', 2),
  ('Guardianes de la Costa: Puerto Raúl Marín Balmaceda', 'La comunidad de Puerto Raúl Marín Balmaceda y su relación con el entorno natural.', 'https://www.youtube.com/watch?v=6tDStP3RrkI', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_comunidad_premium_1771272476542.png', 3),
  ('Contaminación en la Patagonia: Residuos Industriales', 'Impacto de los residuos industriales en las playas vírgenes de Aysén.', 'https://www.youtube.com/watch?v=vcDT3l7nELU', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_cine_premium_1771272433928.png', 4),
  ('Del Río al Mar: La Vida del Huillín', 'El hábitat y comportamiento del huillín en los fiordos de la región de Aysén.', 'https://www.youtube.com/watch?v=QOofoFEXI00', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_flora_premium_1771272449395.png', 5),
  ('Maravillas Marinas: Mamíferos de la Patagonia', 'Un recorrido por la fauna marina y los grandes mamíferos de los canales australes.', 'https://www.youtube.com/watch?v=jPnLxbCi1MA', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_mar_premium_1771272462537.png', 6),
  ('Puerto Aysén: Transformación de Villas Unidas', 'Crónica sobre la transformación urbana y social de Puerto Aysén.', 'https://www.youtube.com/watch?v=dToaS9Bqw78', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_comunidad_premium_1771272476542.png', 7),
  ('Yuyos y Brujos: Medicina Tradicional', 'Descubriendo la medicina tradicional y los saberes ancestrales de la Patagonia.', 'https://www.youtube.com/watch?v=moG2-vX4V5w', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_cultura_premium_1771272401984.png', 8),
  ('Contaminación en los Fiordos: El Rastro Salmón', 'Análisis del impacto ambiental de la industria salmonera en los fiordos.', 'https://www.youtube.com/watch?v=f5AbKoGVs2k', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_mar_premium_1771272462537.png', 9),
  ('Nuestro Compromiso con la Naturaleza: Ecoturismo', 'Promoviendo el ecoturismo marino como herramienta de conservación en Aysén.', 'https://www.youtube.com/watch?v=Dy0Xz7rcy3M', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_naturaleza_premium_1771272369489.png', 10),
  ('Sembrando desde el mar', 'Actividades productivas sustentables y la vida marina en la Patagonia.', 'https://www.youtube.com/watch?v=jB7jObZqIIw', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_mar_premium_1771272462537.png', 11),
  ('Ecoturismo Marino en Aysén', 'Exploración y puesta en valor de la biodiversidad costera patagónica.', 'https://www.youtube.com/watch?v=OxKXq3IBM6w', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_mar_premium_1771272462537.png', 12),
  ('Los Cosechadores de Aysén: Historias de Vida', 'Relatos de vida y tradiciones de quienes trabajan en los bosques de Aysén.', 'https://www.youtube.com/watch?v=GyEdPyYBkMY', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_flora_premium_1771272449395.png', 13),
  ('Sabor a la Perfección: El Asado Patagónico', 'Preparación de chimichurri y tradiciones culinarias del asado patagónico.', 'https://www.youtube.com/watch?v=M6HaKCZHRCM', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_cultura_premium_1771272401984.png', 14),
  ('De Leña a Mate: Tradiciones de Aysén', 'Un viaje por la cultura del mate y la vida cotidiana en el sur de Chile.', 'https://www.youtube.com/watch?v=L2pZF0eVgN0', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_cultura_premium_1771272401984.png', 15)
) AS v(t, d, u, th, en)
JOIN categories c ON c.slug = 'series-cortometrajes';

-- 6. CARGAR ARCHIVO HISTÓRICO Y CONTEMPORÁNEO (Standalone)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
VALUES 
  ('Puerto Aysén - 1940 (Aysén Tierra del Porvenir)', 'Registro histórico de 1940 sobre el desarrollo temprano de Puerto Aysén.', 'https://www.youtube.com/watch?v=jRdjc3fBp3k', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_historia_premium_1771272385715.png', (SELECT id FROM categories WHERE slug = 'historia' LIMIT 1), '1940-01-01'),
  ('Aysén La Trapananda - Remasterizado', 'El clásico de "Al Sur del Mundo" sobre la colonización de la Trapananda.', 'https://www.youtube.com/watch?v=QyOKDNUlELo', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_historia_premium_1771272385715.png', (SELECT id FROM categories WHERE slug = 'historia' LIMIT 1), '1990-01-01'),
  ('Pioneros de Aisén: El Despertar de la Patagonia', 'La llegada de las primeras familias al territorio de Aysén.', 'https://www.youtube.com/watch?v=4dmHfGS0-o8', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_historia_premium_1771272385715.png', (SELECT id FROM categories WHERE slug = 'historia' LIMIT 1), '2017-01-01'),
  ('Aysén Territorio de Conservación', 'Documental del MMA sobre la biodiversidad de Aysén.', 'https://www.youtube.com/watch?v=fXM4f3MLNaU', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_naturaleza_premium_1771272369489.png', (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1), '2017-01-01'),
  ('Los verdes senderos de Aysén | Chile Conectado', 'Exploración de paisajes verdes y rutas rurales de TVN.', 'https://www.youtube.com/watch?v=zBYTVKI8mYM', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_flora_premium_1771272449395.png', (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1), '2020-01-01'),
  ('Tejueleros Artesanales de Aysén', 'Homenaje a los artesanos tejueleros de la Patagonia.', 'https://www.youtube.com/watch?v=R9YSFHWmK84', '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/thumb_cultura_premium_1771272401984.png', (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1), '2022-01-01');

-- 7. VINCULAR EPISODIOS DE "ATLAS" YA EXISTENTES
UPDATE videos 
SET 
  is_series = FALSE, 
  series_id = (SELECT id FROM videos WHERE title = 'Atlas Audiovisual de Aysén' LIMIT 1),
  season_number = 1,
  episode_number = (CASE 
    WHEN title LIKE '%Cantaria%' THEN 1 
    WHEN title LIKE '%Calafate%' THEN 2 
    WHEN title LIKE '%Arreo de Ovejas%' THEN 3 
    ELSE 1 END)
WHERE title LIKE 'Atlas Audiovisual:%';

-- 8. ESTRATEGIA DE IMAGEN CINEMÁTICA (Restauración de Thumbnails)
-- Aseguramos que ningún título tenga paths locales o vacíos, forzando assets del sistema
UPDATE videos
SET thumbnail_url = CASE 
    WHEN category_id = (SELECT id FROM categories WHERE slug = 'historia' LIMIT 1) THEN '/assets/cinema/thumb_historia_premium_1771272385715.png'
    WHEN category_id = (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1) THEN '/assets/cinema/thumb_naturaleza_premium_1771272369489.png'
    WHEN category_id = (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1) THEN '/assets/cinema/thumb_cultura_premium_1771272401984.png'
    ELSE '/assets/cinema/thumb_cine_premium_1771272433928.png'
END
WHERE thumbnail_url LIKE '/Users/%' 
   OR thumbnail_url IS NULL 
   OR thumbnail_url = '';

-- Normalización final de paths para el despliegue
UPDATE videos 
SET thumbnail_url = REPLACE(thumbnail_url, '/Users/machd/.gemini/antigravity/brain/345be474-9fec-4069-8ef0-f294f9e55d38/', '/assets/cinema/')
WHERE thumbnail_url LIKE '/Users/%';
