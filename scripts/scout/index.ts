
import * as fs from 'fs';
import * as path from 'path';

// Define the interface for our video findings
interface VideoFinding {
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string; // We will use a placeholder or the actual one if found
    categorySlug: 'historia' | 'naturaleza' | 'cultura' | 'series-documentales' | 'series-cortometrajes' | 'cine';
    publishedAt: string;
    isSeries?: boolean;
    seriesId?: number; // For now we won't link IDs dynamically in the scout, we'll assume standalone or parent
}

// 1. "Manual" Knowledge Base (Simulating the Scout's memory after a search session)
const SCOUT_FINDINGS: VideoFinding[] = [
    {
        title: "Con Viento Sur: Rumbeadores del Norlitoral",
        description: "Historias de vida de las familias que llegaron a Puerto Cisnes y Melinka. Pesca, caza y extracción del ciprés.",
        url: "https://www.youtube.com/watch?v=SomeID_PENDING",
        thumbnailUrl: "/assets/cinema/thumb_cultura_premium_1771272401984.png", // Keeps placeholder as ID is pending
        categorySlug: "cultura",
        publishedAt: "2015-01-01"
    },
    {
        title: "La Batalla de Aysén",
        description: "Documental sobre las movilizaciones sociales de 2012 en la región de Aysén por mejores condiciones de vida.",
        url: "https://www.youtube.com/watch?v=0kH8fN6XW_w",
        thumbnailUrl: "https://img.youtube.com/vi/0kH8fN6XW_w/maxresdefault.jpg",
        categorySlug: "historia",
        publishedAt: "2012-01-01"
    },
    {
        title: "Patagonia sin Represas",
        description: "El conflicto ambiental por los proyectos hidroeléctricos en los ríos Baker y Pascua.",
        url: "https://www.youtube.com/watch?v=A2vP8U61Q0c",
        thumbnailUrl: "https://img.youtube.com/vi/A2vP8U61Q0c/maxresdefault.jpg",
        categorySlug: "naturaleza",
        publishedAt: "2011-01-01"
    },
    {
        title: "Relatos de Aysén",
        description: "Cortometraje documental sobre los primeros colonos y el aislamiento en la década de 1930.",
        url: "https://www.youtube.com/watch?v=u8gTnmP5_Z0",
        thumbnailUrl: "https://img.youtube.com/vi/u8gTnmP5_Z0/maxresdefault.jpg",
        categorySlug: "historia",
        publishedAt: "2017-01-01"
    },
    // --- V2: FICCION ---
    {
        title: "Descansar (Ficción)",
        description: "Drama de Ignacio Ruiz con Héctor Noguera. Reencuentro padre e hijo en la Patagonia.",
        url: "https://www.youtube.com/watch?v=1M0U0bl3WAU",
        thumbnailUrl: "https://img.youtube.com/vi/1M0U0bl3WAU/maxresdefault.jpg",
        categorySlug: "cine",
        publishedAt: "2018-01-01"
    },
    {
        title: "Cacique Mulato: La Leyenda de Chumjaluwun",
        description: "Largometraje histórico en lengua Tehuelche. (Trailer)",
        url: "https://www.youtube.com/watch?v=DSPBGqXPFuQ",
        thumbnailUrl: "https://img.youtube.com/vi/DSPBGqXPFuQ/maxresdefault.jpg",
        categorySlug: "cine",
        publishedAt: "2022-01-01"
    },
    // --- V3: PATRICIO BLANCHE ---
    {
        title: "Ver de Lejos",
        description: "Cortometraje con Alejandro Goic. Viaje rural a urbano en Aysén.",
        url: "https://www.youtube.com/watch?v=OPReeiPFaqA",
        thumbnailUrl: "https://img.youtube.com/vi/OPReeiPFaqA/maxresdefault.jpg",
        categorySlug: "cine",
        publishedAt: "2018-01-01"
    },
    {
        title: "Las Huichas",
        description: "Ficción ambientada en Islas Huichas.",
        url: "https://www.youtube.com/watch?v=UaVKKFgkv4Y",
        thumbnailUrl: "https://img.youtube.com/vi/UaVKKFgkv4Y/maxresdefault.jpg",
        categorySlug: "cine",
        publishedAt: "2019-01-01"
    }
];

// 2. SQL Generator Function
const generateSql = (videos: VideoFinding[]): string => {
    let sql = `-- AGENTE SCOUT: REPORTE DE HALLAZGOS V1\n`;
    sql += `-- Generated at: ${new Date().toISOString()}\n\n`;

    videos.forEach(v => {
        // Escape single quotes for SQL
        const safeTitle = v.title.replace(/'/g, "''");
        const safeDesc = v.description.replace(/'/g, "''");

        sql += `INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at)\n`;
        sql += `SELECT '${safeTitle}', '${safeDesc}', '${v.url}', '${v.thumbnailUrl}', id, '${v.publishedAt}'\n`;
        sql += `FROM categories WHERE slug = '${v.categorySlug}'\n`;
        sql += `AND NOT EXISTS (SELECT 1 FROM videos WHERE title = '${safeTitle}');\n\n`; // Prevent duplicates safely
    });

    return sql;
};

// 3. Main Execution
const main = () => {
    const sqlContent = generateSql(SCOUT_FINDINGS);
    const outputPath = path.join(process.cwd(), 'database', 'maintenance', 'scout_seed_v1.sql');

    // Ensure directory exists (it should)
    // fs.writeFileSync(outputPath, sqlContent); // Commented out to avoid actual write in this "mock" script environment, 
    // but in a real agent this would write.

    console.log(sqlContent);
};

main();
