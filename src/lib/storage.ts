
import { createClient } from '@supabase/supabase-js';

// Use a singleton instance
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
    if (!supabaseInstance) {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error("Storage Utils: Missing env vars");
            throw new Error("Missing Supabase credentials");
        }
        supabaseInstance = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );
    }
    return supabaseInstance;
}

export async function uploadImageFromUrl(imageUrl: string, userId: string, folder: string = 'generated'): Promise<string | null> {
    try {
        const supabase = getSupabase();

        // 1. Download image
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 2. Generate filename
        const timestamp = Date.now();
        const filename = `${folder}/${userId}/${timestamp}.jpg`;

        // 3. Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('generated-images')
            .upload(filename, buffer, {
                contentType: 'image/jpeg',
                upsert: false
            });

        if (error) {
            console.error('Supabase Upload Error:', error);
            throw error;
        }

        // 4. Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from('generated-images')
            .getPublicUrl(filename);

        return publicUrlData.publicUrl;

    } catch (error) {
        console.error('Storage Upload Failed:', error);
        return null; // Fail safe, return null to use original URL if needed
    }
}
