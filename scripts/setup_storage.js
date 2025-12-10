
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
    console.log('Checking storage bucket: generated-images...');

    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('Error listing buckets:', listError);
        return;
    }

    const bucketName = 'generated-images';
    const existingBucket = buckets.find(b => b.name === bucketName);

    if (existingBucket) {
        console.log(`Bucket '${bucketName}' already exists.`);
    } else {
        console.log(`Creating bucket '${bucketName}'...`);
        const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
        });

        if (createError) {
            console.error('Error creating bucket:', createError);
        } else {
            console.log(`Bucket '${bucketName}' created successfully.`);
        }
    }
}

setupStorage();
