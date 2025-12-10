// Script to upload generated photos to Supabase cloud storage
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tgrmzdecznxiympzedcf.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncm16ZGVjem54aXltcHplZGNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTIzNTAxMCwiZXhwIjoyMDgwODExMDEwfQ.9KbJK4iDrKwNaqzwFWcttvI-bIM6G1ybA_u2B16v67A';

const supabase = createClient(supabaseUrl, supabaseKey);

// Photos directory
const PHOTOS_DIR = 'C:/Users/roberto27979/.gemini/antigravity/brain/fd45ec5a-8eb7-4394-9594-01b3007af697';

// Generated photos to upload
const PHOTOS = [
    'couple_christmas_tree_1765397110451.png',
    'couple_snowy_outdoor_1765397125234.png',
    'couple_fireplace_cozy_1765397141876.png',
    'couple_vintage_christmas_1765397155300.png',
    'couple_luxury_christmas_1765397188224.png',
    'couple_christmas_market_1765397205644.png'
];

async function uploadPhotoToSupabase(filename) {
    try {
        const filepath = path.join(PHOTOS_DIR, filename);

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            console.log(`❌ File not found: ${filename}`);
            return null;
        }

        // Read file
        const fileBuffer = fs.readFileSync(filepath);

        // Upload to Supabase Storage
        const storagePath = `christmas-photos/ai-generated/${filename}`;

        const { data, error } = await supabase.storage
            .from('generated-images')
            .upload(storagePath, fileBuffer, {
                contentType: 'image/png',
                upsert: true // Overwrite if exists
            });

        if (error) {
            console.error(`❌ Upload failed for ${filename}:`, error.message);
            return null;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('generated-images')
            .getPublicUrl(storagePath);

        console.log(`✅ Uploaded: ${filename}`);
        console.log(`   URL: ${publicUrlData.publicUrl}`);

        return {
            filename,
            url: publicUrlData.publicUrl,
            path: storagePath
        };

    } catch (error) {
        console.error(`❌ Error uploading ${filename}:`, error.message);
        return null;
    }
}

async function uploadAllPhotos() {
    console.log('🚀 Starting upload of 6 generated photos to Supabase...\n');

    const results = [];

    for (const photo of PHOTOS) {
        const result = await uploadPhotoToSupabase(photo);
        if (result) {
            results.push(result);
        }
        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n✅ Upload complete!`);
    console.log(`📊 Uploaded: ${results.length}/${PHOTOS.length} photos`);

    // Save results to JSON
    const resultsFile = path.join(PHOTOS_DIR, 'supabase_uploads.json');
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`📁 Results saved to: ${resultsFile}`);

    return results;
}

// Run upload
uploadAllPhotos()
    .then(results => {
        console.log('\n🎉 All photos uploaded to Supabase cloud!');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    });
