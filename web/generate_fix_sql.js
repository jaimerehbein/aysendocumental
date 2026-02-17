const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');

const envPath = path.resolve(__dirname, '.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const env = {};
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['NEXT_PUBLIC_SUPABASE_ANON_KEY']);

async function generateFixSql() {
    const { data: videos, error } = await supabase.from('videos').select('id, title, thumbnail_url');
    if (error) { console.error(error); return; }

    console.log(`Checking ${videos.length} videos...`);
    let sql = `-- Script de Corrección de Contenido (Generated)\n\n`;

    // 1. Delete Calafate
    sql += `-- Eliminar video roto 'Atlas Audiovisual: Calafate'\n`;
    sql += `DELETE FROM videos WHERE id = 39;\n\n`;

    // 2. Check broken thumbnails
    const broken = [];
    for (const vid of videos) {
        if (vid.id === 39) continue;
        if (!vid.thumbnail_url) continue;

        const isBroken = await new Promise(resolve => {
            if (!vid.thumbnail_url.startsWith('https')) { resolve(false); return; }
            const req = https.request(vid.thumbnail_url, { method: 'HEAD' }, (res) => {
                if (res.statusCode === 404) resolve(true);
                else resolve(false);
            });
            req.on('error', () => resolve(true));
            req.end();
        });

        if (isBroken) {
            console.log(`BROKEN: [${vid.id}] ${vid.title}`);
            broken.push(vid);
        }
    }

    // 3. Generate Updates
    sql += `-- Corregir thumbnails rotos (Fallback a hqdefault)\n`;
    for (const vid of broken) {
        if (vid.thumbnail_url.includes('maxresdefault')) {
            const newUrl = vid.thumbnail_url.replace('maxresdefault', 'hqdefault');
            sql += `UPDATE videos SET thumbnail_url = '${newUrl}' WHERE id = ${vid.id};\n`;
        }
    }

    fs.writeFileSync('../database/fix_content_v2.sql', sql);
    console.log("SQL generated at database/fix_content_v2.sql");
}

generateFixSql();
