-- AGENTE SCOUT: REPORTE DE HALLAZGOS V2 (FICCIÓN)
-- Fecha: 2026-02-17
-- Autor: Antigravity Scout Module
-- Descripción: Inserción de cine de ficción y cortometrajes rodados o ambientados en la Patagonia/Aysén.

-- 1. CORTOMETRAJES DE FICCIÓN (Regional Aysén)
-- "Descansar" de Ignacio Ruiz (Niebla Producciones). Rodado en la región.
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Descansar (Ficción)',
  'Drama dirigido por Ignacio Ruiz. Rodrigo y su padre Ramón, distanciados por años, se reencuentran en Isla Huar bajo la sombra de una enfermedad terminal. Protagonizado por Héctor Noguera.',
  'https://www.youtube.com/watch?v=1M0U0bl3WAU', -- Cortometraje completo (Verificado)
  '/assets/cinema/thumb_cine_premium_1771272433928.png', -- Placeholder cine
  id, '2018-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Descansar (Ficción)');

-- 2. CINE PATAGÓNICO (Referente Regional)
-- "Cacique Mulato" (Magallanes/Patagonia) - Relevancia cultural Aysén/Patagonia.
INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, is_series)
SELECT 
  'Cacique Mulato: La Leyenda de Chumjaluwun',
  'Primer largometraje de ficción hablado en lengua Tehuelche. La historia de la resistencia del pueblo Aonikenk en la Patagonia frente a la colonización. (Trailer)',
  'https://www.youtube.com/watch?v=DSPBGqXPFuQ', -- Trailer Oficial UMAG TV (Verificado)
  '/assets/cinema/thumb_historia_premium_1771272385715.png',
  id, '2022-01-01', FALSE
FROM categories WHERE slug = 'cine'
AND NOT EXISTS (SELECT 1 FROM videos WHERE title = 'Cacique Mulato: La Leyenda de Chumjaluwun');

-- Nota: "Casimira" (Cortometraje coyhaiquino) mencionado en scout, pendiente de URL pública estable.
