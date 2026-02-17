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

async function findCalafate() {
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .ilike('title', '%Calafate%');

    if (error) console.error(error);
    else console.log(JSON.stringify(data, null, 2));
}

findCalafate();
