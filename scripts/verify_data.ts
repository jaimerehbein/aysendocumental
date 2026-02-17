
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env.local del proyecto web
dotenv.config({ path: path.resolve(__dirname, '../../web/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Faltan variables de entorno SUPABASE_URL o SUPABASE_KEY.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
    console.log("🔍 Verificando estado de la Base de Datos...");

    const { data: videos, error } = await supabase
        .from('videos')
        .select('id, title, thumbnail_url, url')
        .order('id');

    if (error) {
        console.error("❌ Error al consultar Supabase:", error);
        return;
    }

    if (!videos || videos.length === 0) {
        console.log("⚠️ La tabla 'videos' está vacía.");
        return;
    }

    console.log(`✅ Se encontraron ${videos.length} videos.`);
    console.log("\n--- Muestra de Videos (Primeros 10) ---");

    videos.slice(0, 10).forEach(v => {
        const isYoutube = v.thumbnail_url && v.thumbnail_url.includes('img.youtube.com');
        const isUnsplash = v.thumbnail_url && v.thumbnail_url.includes('unsplash');
        const status = isYoutube ? "✅ YT" : (isUnsplash ? "✅ Unsplash" : "❌ ROTO/LOCAL");

        console.log(`[${status}] ID: ${v.id} | ${v.title.substring(0, 30)}...`);
        console.log(`       Thumb: ${v.thumbnail_url}`);
        console.log(`       Url:   ${v.url}`);
        console.log("---");
    });
}

verifyData();
