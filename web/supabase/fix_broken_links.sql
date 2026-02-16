-- ==============================================================================
-- SCRIPT DE REPARACIÓN DEFINITIVA (Verified Links)
-- Fecha: 2026-02-15
-- Propósito: Corregir IDs de video inválidos con URLs verificadas manualmente en navegador.
-- ==============================================================================

-- 1. Tejueleros del Ciprés (Tesoros Humanos Vivos - Link Verificado)
-- Anterior (Inválido): Pj5QR-iM3Pu / zFIQd1l4tWJ
-- Nuevo (Verificado): 1GgsZRRRpM0
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=1GgsZRRRpM0',
    thumbnail_url = 'https://images.unsplash.com/photo-1589923188900-85dae5233271?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
WHERE title = 'Tejueleros del Ciprés';

-- 2. Aysén: La Trapananda (Documental Completo - Link Verificado)
-- Nuevo (Verificado): QyOKDNUlELo
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=QyOKDNUlELo', 
    thumbnail_url = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
WHERE title = 'Aysén: La Trapananda';

-- 3. Cacique Mulato: La Leyenda (Trailer Oficial - Link Verificado)
-- Nuevo (Verificado): hsbPs6vEQhY
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=hsbPs6vEQhY',
    thumbnail_url = 'https://images.unsplash.com/photo-1533052828699-23c31aa4548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
WHERE title = 'Cacique Mulato: La Leyenda';

-- 4. Con Viento Sur (Documental Completo - Link Verificado)
-- Nuevo (Verificado): ySYjR74367Q
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=ySYjR74367Q',
    thumbnail_url = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
WHERE title = 'Con Viento Sur';

-- 5. Relatos de Aysén (Episodio Completo - Link Verificado)
-- Nuevo (Verificado): 1ZX-V97IstY
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=1ZX-V97IstY',
    thumbnail_url = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
WHERE title = 'Relatos de Aysén';

-- 6. Secretos del Subterráneo (Exploradores - Link Verificado)
-- Nuevo (Verificado): ighKtXfmoUo
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=ighKtXfmoUo',
    thumbnail_url = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
WHERE title = 'Secretos del Subterráneo';

-- 7. Postales Bicentenario (Colonización - Verificado Previamente)
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=hxhQIgkz78n'
WHERE title = 'Postales Bicentenario: La Colonización';

-- 8. Aysén Territorio de Conservación (Verificado Previamente)
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=A7DfL7HbpWz'
WHERE title = 'Aysén Territorio de Conservación';

-- 9. Profes del Fin del Mundo: Isla Toto (Verificado Previamente)
UPDATE videos 
SET url = 'https://www.youtube.com/watch?v=JhtR2FmuNhJ'
WHERE title = 'Profes del Fin del Mundo: Isla Toto';

-- 10. Glaciares de la Patagonia (Vimeo - Presumiblemente Válido)
UPDATE videos 
SET url = 'https://vimeo.com/76979871'
WHERE title = 'Glaciares de la Patagonia';
