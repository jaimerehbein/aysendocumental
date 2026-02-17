const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
let supabaseUrl = '';
let supabaseKey = '';

try {
    console.log("Leyendo env desde:", envPath);
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
                supabaseUrl = line.split('=')[1].replace(/"/g, '').trim();
            }
            if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
                supabaseKey = line.split('=')[1].replace(/"/g, '').trim();
            }
        });
    } else {
        console.error("NO EXISTE .env.local");
    }
} catch (e) { console.error("Error reading env", e); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("🔍 Buscando 'Atlas' y 'Calafate'...");

    const { data: videos, error } = await supabase
        .from('videos')
        .select('*')
        .or('title.ilike.%Atlas%,title.ilike.%Calafate%');

    if (error) console.error(error);

    if (videos) {
        videos.forEach(v => {
            const type = v.is_series ? 'SERIE' : 'VIDEO';
            console.log("[" + type + "] ID: " + v.id + " | Title: " + v.title);
            console.log("   URL: " + v.url);
            console.log("   Thumb: " + v.thumbnail_url);
            console.log("---");
        });
    } else {
        console.log("No se encontraron resultados.");
    }
}

main();
