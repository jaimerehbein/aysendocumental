const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const env = {};
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['NEXT_PUBLIC_SUPABASE_ANON_KEY']);

async function checks() {
    // Check if ID 39 exists
    const { data: v39 } = await supabase.from('videos').select('*').eq('id', 39);
    console.log('ID 39 (Calafate):', v39);

    // Check if any other Calafate exists
    const { data: calafates } = await supabase.from('videos').select('*').ilike('title', '%Calafate%');
    console.log('All Calafates:', calafates);

    // Check ID 12 (Trapananda)
    const { data: v12 } = await supabase.from('videos').select('*').eq('id', 12);
    console.log('ID 12:', v12);
}

checks();
