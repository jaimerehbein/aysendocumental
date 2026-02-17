const fs = require('fs');
const path = require('path');

// 1. Load Data
const dbUrlsRaw = fs.readFileSync('db_urls.txt', 'utf8');
const pdfUrlsRaw = fs.readFileSync('url_list.txt', 'utf8');

const dbUrls = dbUrlsRaw.split('\n').filter(u => u);
const pdfUrls = pdfUrlsRaw.split('\n').filter(u => u);

// 2. Helper to get ID
function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// 3. Extract IDs
const dbIds = new Set(dbUrls.map(getYouTubeId).filter(id => id));
const newVideos = [];

pdfUrls.forEach(url => {
    const id = getYouTubeId(url);
    if (id && !dbIds.has(id)) {
        newVideos.push({ id, url });
        dbIds.add(id); // Avoid duplicates within list
    }
});

console.log(`Found ${newVideos.length} new YouTube videos to import.`);

// 4. Fetch Metadata and Generate SQL
async function generateSql() {
    console.log("Generating SQL...");
    let sql = `-- Script generado automáticamente para importar videos del PDF\n-- Ejecutar en Supabase SQL Editor\n\n`;

    for (const vid of newVideos) {
        let title = `Video ${vid.id}`;
        let description = 'Importado desde PDF (Metadata fallida)';
        const thumb = `https://img.youtube.com/vi/${vid.id}/sddefault.jpg`;
        const cleanUrl = `https://www.youtube.com/watch?v=${vid.id}`;

        try {
            const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid.id}&format=json`;
            const res = await fetch(oembedUrl);
            if (res.ok) {
                const data = await res.json();
                title = data.title.replace(/'/g, "''"); // Escape quotes
                description = 'Importado desde PDF (Análisis Automático)';
            }
        } catch (e) {
            console.warn(`Error fetching metadata for ${vid.id}: ${e.message}`);
        }

        // Generate SQL
        sql += `INSERT INTO videos (title, description, url, thumbnail_url, category_id, published_at, created_at, is_series)
VALUES ('${title}', '${description}', '${cleanUrl}', '${thumb}', 10, NOW(), NOW(), false);\n`;

        console.log(`Prepared: ${title}`);

        // Be nice to API
        await new Promise(r => setTimeout(r, 200));
    }

    fs.writeFileSync('../database/ingest_pdf_v1.sql', sql);
    console.log("SQL generated at database/ingest_pdf_v1.sql");
}

generateSql();
