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

async function checkThumbnails() {
    const { data: videos, error } = await supabase.from('videos').select('id, title, thumbnail_url, url');
    if (error) { console.error(error); return; }

    console.log(`Checking ${videos.length} thumbnails...`);
    const broken = [];

    // Delete broken Calafate first if found
    const calafate = videos.find(v => v.id === 39);
    if (calafate) {
        console.log("Deleting broken Calafate video (ID 39)...");
        await supabase.from('videos').delete().eq('id', 39);
    }

    // Check others
    for (const vid of videos) {
        if (vid.id === 39) continue; // Skip deleted
        if (!vid.thumbnail_url) continue;

        const isBroken = await new Promise(resolve => {
            if (!vid.thumbnail_url.startsWith('https')) { resolve(false); return; } // skip local or strange

            const req = https.request(vid.thumbnail_url, { method: 'HEAD' }, (res) => {
                if (res.statusCode === 404) resolve(true);
                else resolve(false);
            });
            req.on('error', () => resolve(true));
            req.end();
        });

        if (isBroken) {
            console.log(`BROKEN: [${vid.id}] ${vid.title} -> ${vid.thumbnail_url}`);
            broken.push(vid);
        }
    }

    console.log(`Found ${broken.length} broken thumbnails.`);

    // Fix strategy: Try to generate 'hqdefault' if 'maxresdefault' failed, or use generic
    for (const vid of broken) {
        if (vid.thumbnail_url.includes('maxresdefault')) {
            const newUrl = vid.thumbnail_url.replace('maxresdefault', 'hqdefault');
            console.log(`Fixing ${vid.id} -> ${newUrl}`);
            await supabase.from('videos').update({ thumbnail_url: newUrl }).eq('id', vid.id);
        }
    }
}

checkThumbnails();
