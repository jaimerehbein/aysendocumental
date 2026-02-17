const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno desde .env.local
const envPath = path.resolve(__dirname, '../web/.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const env = {};
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getAllUrls() {
    const { data, error } = await supabase
        .from('videos')
        .select('url');

    if (error) {
        console.error('Error fetching URLs:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log("Encontradas " + data.length + " URLs.");
        const urls = data.map(v => v.url).filter(u => u).join('\n');
        fs.writeFileSync(path.resolve(__dirname, '../web/db_urls.txt'), urls);
        console.log("URLs guardadas en web/db_urls.txt");
    } else {
        console.log("No se encontraron URLs.");
    }
}

getAllUrls();
