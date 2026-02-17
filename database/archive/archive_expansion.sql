-- Insert the new batch of documentaries researched by the Aysén Archive Crew (Scout & Curator)

INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)
VALUES 
  -- 1. Historia y Colonización
  (
    'Puerto Aysén - 1940 (Aysén Tierra del Porvenir)', 
    'Este documental histórico captura el desarrollo temprano de Puerto Aysén en 1940, mostrando el crecimiento de la ciudad, sus habitantes y las actividades industriales fundacionales de la época. Es un registro de archivo vital restaurado y preservado para mostrar la vida regional de mediados del siglo XX.',
    'https://www.youtube.com/watch?v=jRdjc3fBp3k',
    'https://img.youtube.com/vi/jRdjc3fBp3k/maxresdefault.jpg',
    10, '1940-01-01'
  ),
  (
    'Aysén La Trapananda - Remasterizado',
    'Parte de la renombrada serie "Al Sur del Mundo", este film profundiza en la historia de la colonización en la mística "Trapananda" (Aysén). Explora los desafíos geográficos y los esfuerzos heroicos de los primeros colonos por habitar este paisaje accidentado.',
    'https://www.youtube.com/watch?v=QyOKDNUlELo',
    'https://img.youtube.com/vi/QyOKDNUlELo/maxresdefault.jpg',
    10, '1990-01-01'
  ),
  (
    'Pioneros de Aisén: El Despertar de la Patagonia',
    'Un documental exhaustivo que narra la llegada de las primeras familias al territorio de Aysén y la fundación de Puerto Aisén. Utiliza entrevistas e imágenes de archivo para retratar la resiliencia y el espíritu de los pioneros de principios del siglo XX.',
    'https://www.youtube.com/watch?v=4dmHfGS0-o8',
    'https://img.youtube.com/vi/4dmHfGS0-o8/maxresdefault.jpg',
    10, '2017-01-01'
  ),

  -- 2. Naturaleza y Geografía
  (
    'Aysén Territorio de Conservación', 
    'Producido por el Ministerio del Medio Ambiente (MMA), este documental destaca la extraordinaria biodiversidad y los ecosistemas prístinos de la región. Se centra en las iniciativas de conservación y la importancia de proteger una de las últimas fronteras salvajes del mundo.',
    'https://www.youtube.com/watch?v=fXM4f3MLNaU',
    'https://img.youtube.com/vi/fXM4f3MLNaU/maxresdefault.jpg',
    11, '2017-01-01'
  ),
  (
    'Los verdes senderos de Aysén | Chile Conectado',
    'Este episodio de "Chile Conectado" de TVN explora los exuberantes paisajes verdes de la región, enfocándose específicamente en las rutas rurales y las personas que viven en valles remotos. Muestra el esplendor natural y las historias locales que definen los "senderos verdes" de Aysén.',
    'https://www.youtube.com/watch?v=zBYTVKI8mYM',
    'https://img.youtube.com/vi/zBYTVKI8mYM/maxresdefault.jpg',
    11, '2020-01-01'
  ),

  -- 3. Cultura y Patrimonio
  (
    'Tejueleros Artesanales de Aysén',
    'Este film rinde homenaje a los artesanos tejueleros de Aysén, cuyo oficio define la identidad arquitectónica única de la Patagonia chilena. Captura las técnicas tradicionales de manipulación de la madera que han sido transmitidas de generación en generación.',
    'https://www.youtube.com/watch?v=R9YSFHWmK84',
    'https://img.youtube.com/vi/R9YSFHWmK84/maxresdefault.jpg',
    12, '2022-01-01'
  );
