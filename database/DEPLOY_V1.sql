-- AYSÉN DOCUMENTAL: MASTER DEPLOYMENT SCRIPT V1.0
-- Fecha: 2026-02-17
-- Descripción: Script único para inicializar, poblar y corregir la base de datos de producción.
-- NOTA: Este script es idempotente (usa IF NOT EXISTS y ON CONFLICT).

-- ============================================================
-- 1. ESQUEMA DE BASE DE DATOS
-- ============================================================

-- Tabla Categorías
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla Videos
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    category_id INTEGER REFERENCES categories(id),
    published_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_series BOOLEAN DEFAULT FALSE,
    series_id INTEGER REFERENCES videos(id),
    season_number INTEGER,
    episode_number INTEGER
);

-- Indices para rendimiento
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category_id);
CREATE INDEX IF NOT EXISTS idx_videos_series ON videos(series_id);

-- ============================================================
-- 2. SEMILLA DE CATEGORÍAS (MASTER)
-- ============================================================
INSERT INTO categories (name, slug) VALUES 
  ('Historia y Pioneros', 'historia'),
  ('Naturaleza y Medioambiente', 'naturaleza'),
  ('Cultura e Identidad', 'cultura'),
  ('Series: Documentales', 'series-documentales'),
  ('Series: Atlas Audiovisual', 'series-atlas'),
  ('Series: Cortometrajes', 'series-cortometrajes'),
  ('Cine de Ficción', 'cine')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 3. SEMILLA DE VIDEOS (HISTÓRICO + SCOUT)
-- ============================================================

-- 3.1 Clásicos Históricos
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'La Batalla de Aysén', 'Documental movilizaciones 2012.', 'https://www.youtube.com/watch?v=0kH8fN6XW_w', 'https://img.youtube.com/vi/0kH8fN6XW_w/maxresdefault.jpg', id, '2012-01-01'
FROM categories WHERE slug = 'historia' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'La Batalla de Aysén');

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'Relatos de Aysén', 'Memoria de colonos años 30.', 'https://www.youtube.com/watch?v=u8gTnmP5_Z0', 'https://img.youtube.com/vi/u8gTnmP5_Z0/maxresdefault.jpg', id, '2017-01-01'
FROM categories WHERE slug = 'historia' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Relatos de Aysén');

-- 3.2 Naturaleza
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'Patagonia sin Represas', 'Lucha ambiental Baker y Pascua.', 'https://www.youtube.com/watch?v=A2vP8U61Q0c', 'https://img.youtube.com/vi/A2vP8U61Q0c/maxresdefault.jpg', id, '2014-09-23'
FROM categories WHERE slug = 'naturaleza' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Patagonia sin Represas');

-- 3.3 Cine de Ficción (Hallazgos Scout)
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'Descansar (Ficción)', 'Drama de Ignacio Ruiz con Héctor Noguera.', 'https://www.youtube.com/watch?v=1M0U0bl3WAU', 'https://img.youtube.com/vi/1M0U0bl3WAU/maxresdefault.jpg', id, '2018-01-01'
FROM categories WHERE slug = 'cine' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Descansar (Ficción)');

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'Cacique Mulato: La Leyenda de Chumjaluwun', 'Largometraje Tehuelche (Trailer).', 'https://www.youtube.com/watch?v=DSPBGqXPFuQ', 'https://img.youtube.com/vi/DSPBGqXPFuQ/maxresdefault.jpg', id, '2022-01-01'
FROM categories WHERE slug = 'cine' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Cacique Mulato: La Leyenda de Chumjaluwun');

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'Ver de Lejos', 'Cortometraje con Alejandro Goic. Ganador Festival Patagonia.', 'https://www.youtube.com/watch?v=OPReeiPFaqA', 'https://img.youtube.com/vi/OPReeiPFaqA/maxresdefault.jpg', id, '2018-01-01'
FROM categories WHERE slug = 'cine' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Ver de Lejos');

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
SELECT 'Las Huichas', 'Ficción ambientada en Islas Huichas.', 'https://www.youtube.com/watch?v=UaVKKFgkv4Y', 'https://img.youtube.com/vi/UaVKKFgkv4Y/maxresdefault.jpg', id, '2019-01-01'
FROM categories WHERE slug = 'cine' AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Las Huichas');

-- ============================================================
-- 4. LIMPIEZA Y NORMALIZACIÓN FINAL
-- ============================================================

-- 4.1 Eliminar basura
DELETE FROM videos WHERE url LIKE '%VIDEO_ID%' OR url LIKE '%PENDING%';

-- 4.2 Forzar Thumbnails de YouTube (NUCLEAR OPTION)
-- Actualizamos TODOS los videos que tengan URL de YouTube.
-- No preguntamos si ya tienen imagen. Asumimos que queremos la mejor calidad de YouTube siempre.

-- Caso 1: URLs estándar (youtube.com/watch?v=...)
UPDATE videos
SET thumbnail_url = 'https://img.youtube.com/vi/' || substring(url from 'v=([^&]+)') || '/maxresdefault.jpg'
WHERE url LIKE '%youtube.com/watch?v=%';

-- Caso 2: URLs cortas (youtu.be/...)
UPDATE videos
SET thumbnail_url = 'https://img.youtube.com/vi/' || substring(url from 'youtu.be/([^?]+)') || '/maxresdefault.jpg'
WHERE url LIKE '%youtu.be/%';

-- Caso 3: Fallback para videos sin imagen (limpieza final)
UPDATE videos
SET thumbnail_url = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef'
WHERE thumbnail_url IS NULL OR thumbnail_url = '';

-- Fin del Script Maestro
